/**
 * Czysta logika decyzyjna przeciwnika AI - wydzielona z AI.js tym samym
 * wzorcem co collision.js (patrz Game.js) i netSync.js. Bez THREE, bez
 * sceny, bez modelu GLTF (patrz LightCycleModel.js - ładowanie modelu jest
 * asynchroniczne i sięga po plik z dysku/sieci), więc dało się to
 * przetestować jednostkowo bez tworzenia prawdziwej instancji AI (patrz
 * tests/aiDecision.test.js).
 *
 * Kierunki i pozycje to zwykłe {x,z} (bez y - gra i tak działa wyłącznie w
 * płaszczyźnie XZ), nie THREE.Vector3 - identyczna konwencja jak w
 * collision.js/netSync.js.
 */

export const GRID_SIZE = 45;

export function getGridKey(x, z) {
  return `${Math.floor(x)},${Math.floor(z)}`;
}

/** Czy dana komórka siatki jest w granicach planszy i wolna od obu śladów. */
export function isCellFree(x, z, playerTrail, aiTrail, gridSize = GRID_SIZE) {
  if (Math.abs(x) > gridSize || Math.abs(z) > gridSize) {
    return false;
  }

  const key = getGridKey(x, z);
  if (playerTrail && playerTrail.has(key)) return false;
  if (aiTrail && aiTrail.has(key)) return false;

  return true;
}

/** Kierunek {x,z} po skręcie w lewo/prawo z bieżącego kierunku {x,z}. */
export function getTurnDirection(currentDir, turn) {
  if (turn === 'left') {
    if (currentDir.x === 1) return { x: 0, z: -1 };
    if (currentDir.x === -1) return { x: 0, z: 1 };
    if (currentDir.z === 1) return { x: -1, z: 0 };
    if (currentDir.z === -1) return { x: 1, z: 0 };
  } else {
    if (currentDir.x === 1) return { x: 0, z: 1 };
    if (currentDir.x === -1) return { x: 0, z: -1 };
    if (currentDir.z === 1) return { x: 1, z: 0 };
    if (currentDir.z === -1) return { x: -1, z: 0 };
  }
  return { x: currentDir.x, z: currentDir.z };
}

/**
 * Zlicza liczbę pustych, osiągalnych pól (BFS/DFS - kolejność odwiedzania
 * nie ma tu znaczenia, tylko sam policzony rozmiar) od danego punktu.
 * `limit` to twardy sufit liczby odwiedzonych pól (wydajność) - nie musimy
 * znać DOKŁADNEJ wielkości otwartej przestrzeni, tylko z grubsza porównać
 * kandydatów względem siebie.
 */
export function countReachableSpace(startX, startZ, playerTrail, aiTrail, limit = 400, gridSize = GRID_SIZE) {
  const visited = new Set();
  const startKey = getGridKey(startX, startZ);
  visited.add(startKey);
  const stack = [[Math.floor(startX), Math.floor(startZ)]];
  let count = 0;

  while (stack.length > 0 && count < limit) {
    const [x, z] = stack.pop();
    count++;

    const neighbors = [[x + 1, z], [x - 1, z], [x, z + 1], [x, z - 1]];
    for (const [nx, nz] of neighbors) {
      const key = `${nx},${nz}`;
      if (visited.has(key)) continue;
      if (!isCellFree(nx, nz, playerTrail, aiTrail, gridSize)) continue;
      visited.add(key);
      stack.push([nx, nz]);
    }
  }
  return count;
}

/**
 * Wybiera kierunek (null | 'left' | 'right') dla jednej "myśli" AI - czysty
 * odpowiednik oceniającej części AI.js#makeDecision, bez zależności od
 * zegara (performance.now()) ani stanu instancji (_lastSmartDecision) -
 * O TYM, CZY w ogóle warto to teraz policzyć, decyduje wywołujący
 * (AI.js#makeDecision, patrz needsUrgentDecision/dueForPeriodic tam).
 *
 * `random` jest wstrzykiwalny (domyślnie Math.random) - żeby dało się
 * przetestować deterministycznie ścieżkę "mistakeChance" bez migania
 * prawdziwym RNG.
 */
export function decideDirection({
  position,
  direction,
  playerPosition,
  playerTrail,
  aiTrail,
  settings,
  needsUrgentDecision,
  nearAheadDist = 2,
  random = Math.random
}) {
  const leftDir = getTurnDirection(direction, 'left');
  const rightDir = getTurnDirection(direction, 'right');
  const candidates = [
    { turn: null, dir: direction },
    { turn: 'left', dir: leftDir },
    { turn: 'right', dir: rightDir }
  ];

  const scored = [];
  for (const c of candidates) {
    const landing = {
      x: position.x + c.dir.x * nearAheadDist,
      z: position.z + c.dir.z * nearAheadDist
    };
    if (!isCellFree(landing.x, landing.z, playerTrail, aiTrail)) continue;

    const space = countReachableSpace(landing.x, landing.z, playerTrail, aiTrail, settings.lookahead);

    // chaseWeight>0 (medium/hard): premia za zbliżanie się do gracza, żeby
    // AI aktywnie ścigało/odcinało zamiast tylko unikać własnej śmierci.
    const currentDistToPlayer = Math.hypot(position.x - playerPosition.x, position.z - playerPosition.z);
    const landingDistToPlayer = Math.hypot(landing.x - playerPosition.x, landing.z - playerPosition.z);
    const chaseBonus = (currentDistToPlayer - landingDistToPlayer) * settings.chaseWeight;

    // Niewielka premia za jazdę na wprost, żeby przy remisach przestrzeni
    // AI nie skręcało bez potrzeby - to tylko remisołamacz, przestrzeń
    // zawsze wygrywa.
    const score = space + (c.turn === null ? 2 : 0) + chaseBonus;
    scored.push({ turn: c.turn, score });
  }

  if (scored.length === 0) {
    // Żaden kierunek nie jest bezpieczny - nieunikniona śmierć, AI i tak
    // nic więcej nie może zrobić.
    return null;
  }

  scored.sort((a, b) => b.score - a.score);

  // mistakeChance (głównie easy): w sytuacji NIE-nagłej, zamiast zawsze
  // brać najlepszy wynik, z pewnym prawdopodobieństwem AI bierze losowego
  // z bezpiecznych kandydatów. W sytuacji nagłej (needsUrgentDecision) ten
  // margines błędu jest wyłączony - inaczej AI na easy potrafiłoby
  // świadomie wjechać w przeszkodę tuż przed sobą.
  if (!needsUrgentDecision && settings.mistakeChance > 0 && random() < settings.mistakeChance) {
    const randomPick = scored[Math.floor(random() * scored.length)];
    return randomPick.turn;
  }

  return scored[0].turn;
}
