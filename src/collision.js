/**
 * Czysta logika kolizji/geometrii siatki - bez zależności od THREE ani DOM.
 *
 * Wydzielone z Game.js (gdzie te same nazwy istniały jako metody prywatne
 * `_pointToSegmentDistance`, `_sweepCells`, `_cellsHitDanger`), żeby dało
 * się je testować jednostkowo (patrz tests/collision.test.js) bez
 * uruchamiania sceny/renderera. Game.js importuje te funkcje i deleguje
 * do nich - zachowanie jest identyczne jak wcześniej, to czysty refaktor.
 *
 * Punkty wejściowe to zwykłe obiekty {x, z} (albo THREE.Vector3, który ma
 * te same pola) - żadna z funkcji nie modyfikuje przekazanych argumentów.
 */

/** Najkrótsza odległość punktu p od odcinka a-b (w płaszczyźnie XZ). */
export function pointToSegmentDistance(p, a, b) {
  const abx = b.x - a.x, abz = b.z - a.z;
  const apx = p.x - a.x, apz = p.z - a.z;
  const lenSq = abx * abx + abz * abz;
  let t = lenSq > 0 ? (apx * abx + apz * abz) / lenSq : 0;
  t = Math.max(0, Math.min(1, t));
  const cx = a.x + abx * t, cz = a.z + abz * t;
  const dx = p.x - cx, dz = p.z - cz;
  return Math.sqrt(dx * dx + dz * dz);
}

/**
 * Zwraca listę komórek siatki (jako obiekty {x,z}), przez które PRZESZEDŁ
 * ruch od fromPos do toPos w tej klatce - łącznie z komórką docelową, ale
 * bez komórki startowej (tę dodaje wywołujący osobno). Ruch jest zawsze
 * osiowy (kierunek to jeden z 4 wektorów jednostkowych), więc to prosty
 * krok po jednej osi.
 */
export function sweepCells(fromPos, toPos) {
  const cells = [];
  const fx = Math.floor(fromPos.x), fz = Math.floor(fromPos.z);
  const tx = Math.floor(toPos.x), tz = Math.floor(toPos.z);
  if (fx === tx && fz === tz) return cells;

  if (fx !== tx) {
    const step = tx > fx ? 1 : -1;
    for (let x = fx + step; x !== tx + step; x += step) cells.push({ x, z: fz });
  } else {
    const step = tz > fz ? 1 : -1;
    for (let z = fz + step; z !== tz + step; z += step) cells.push({ x: fx, z });
  }
  return cells;
}

/**
 * Sprawdza tor ruchu (sweptCells, patrz sweepCells powyżej) wobec granicy
 * planszy i obu Setów śladu - zamiast tylko punktu końcowego. Jeśli w tej
 * klatce nie zmieniono komórki, sweptCells jest puste i sprawdzamy po
 * prostu bieżącą pozycję.
 *
 * ownNewCellKeys to komórki dopisane do WŁASNEGO śladu w TEJ WŁAŚNIE
 * klatce - są pomijane przy sprawdzaniu kolizji z własnym śladem, bo
 * inaczej jednostka "wjeżdżałaby" we własny, dopiero co położony
 * fragment śladu przy każdym skoku o więcej niż jedną komórkę na klatkę.
 * Kolizja ze śladem PRZECIWNIKA liczy się zawsze, bez wyjątków.
 *
 * @param {{x:number,z:number}} currentPos
 * @param {Array<{x:number,z:number}>} sweptCells
 * @param {Set<string>} ownTrail
 * @param {Set<string>} opponentTrail
 * @param {Set<string>=} ownNewCellKeys
 * @param {number} gridSize połowa boku kwadratowej areny (domyślnie 45)
 */
export function cellsHitDanger(currentPos, sweptCells, ownTrail, opponentTrail, ownNewCellKeys, gridSize = 45) {
  const cellsToCheck = sweptCells.length > 0
    ? sweptCells
    : [{ x: Math.floor(currentPos.x), z: Math.floor(currentPos.z) }];

  for (const cell of cellsToCheck) {
    if (Math.abs(cell.x) > gridSize || Math.abs(cell.z) > gridSize) {
      return { outOfBounds: true, hitTrail: false };
    }
    const key = `${cell.x},${cell.z}`;
    if (opponentTrail.has(key)) {
      return { outOfBounds: false, hitTrail: true };
    }
    if (ownTrail.has(key) && !(ownNewCellKeys && ownNewCellKeys.has(key))) {
      return { outOfBounds: false, hitTrail: true };
    }
  }
  return { outOfBounds: false, hitTrail: false };
}

/**
 * Najmniejsza odległość pozycji `p` od czegokolwiek, co mogłoby ją zabić:
 * granicy planszy lub śladu przeciwnika (`opponentTrailPoints`, lista
 * punktów {x,z} w kolejności narysowania). Świadomie NIE sprawdza
 * odległości do własnego śladu - patrz Game.js dla uzasadnienia.
 */
export function minDistanceToDanger(p, opponentTrailPoints, gridSize = 45) {
  let minDist = gridSize - Math.max(Math.abs(p.x), Math.abs(p.z));

  if (opponentTrailPoints) {
    for (let i = 0; i < opponentTrailPoints.length - 1; i++) {
      const d = pointToSegmentDistance(p, opponentTrailPoints[i], opponentTrailPoints[i + 1]);
      if (d < minDist) minDist = d;
    }
  }

  return minDist;
}
