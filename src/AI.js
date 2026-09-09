import * as THREE from 'three';
import { Trail } from './Trail.js';
import { createLightCycleMesh } from './LightCycleModel.js';
import { debugLog } from './debug.js';

// Parametry per poziom trudności, użyte w makeDecision() poniżej.
// - lookahead: sufit BFS w countReachableSpace - jak "daleko" AI widzi, że
//   jakiś kierunek prowadzi w ślepy zaułek. Niski = AI reaguje dopiero
//   tuż przed ścianą; wysoki = planuje z dużym wyprzedzeniem.
// - decisionIntervalMs: jak często AI w ogóle "myśli" (poza reakcją na
//   przeszkodę tuż przed sobą, która zawsze jest natychmiastowa) - rzadziej
//   myślący przeciwnik jedzie bardziej "na pałę" między przeszkodami.
// - mistakeChance: szansa, że w NIEnagłej sytuacji (nie ma przeszkody tuż
//   przed nosem) AI zignoruje najlepszą opcję i wybierze losowo spośród
//   bezpiecznych kandydatów zamiast tej z największą przestrzenią - to
//   właśnie różnicuje "łatwy" od "trudny" tam, gdzie oba widzą to samo.
// - chaseWeight: dodatkowy bonus do wyniku kandydata za skracanie dystansu
//   do gracza - na wyższych poziomach AI nie tylko unika śmierci, ale
//   aktywnie ściga/odcina, zamiast błądzić po pustej przestrzeni.
const DIFFICULTY_SETTINGS = {
  easy:   { lookahead: 90,  decisionIntervalMs: 320, mistakeChance: 0.35, chaseWeight: 0 },
  medium: { lookahead: 400, decisionIntervalMs: 180, mistakeChance: 0.10, chaseWeight: 0.5 },
  hard:   { lookahead: 700, decisionIntervalMs: 90,  mistakeChance: 0,    chaseWeight: 1.5 }
};

export class AI {
  constructor(scene, startPosition, color = 0xff00ff, difficulty = 'medium') {
    this.scene = scene;
    this.position = startPosition.clone();
    this.direction = new THREE.Vector3(-1, 0, 0);
    this.color = color;
    this.speed = 10;
    this.visible = true;
    this.setDifficulty(difficulty);
    
    debugLog('AI created at:', this.position, 'direction:', this.direction);
    
    this.createMesh();
    this.trail = new Trail(this.scene, this.color);
    this.trail.start(this.position, this.direction);
  }

  createMesh() {
    this.mesh = createLightCycleMesh(this.color);
    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);
    
    debugLog('AI mesh created and added to scene');
  }

  setColor(color) {
    this.color = color;
    this.mesh.material.color.set(color);
    this.mesh.material.emissive.set(color);
    if (this.trail) this.trail.setColor(color);
  }

  getPosition() {
    return this.position.clone();
  }

  getGridKey(x, z) {
    return `${Math.floor(x)},${Math.floor(z)}`;
  }

  isCellFree(x, z, playerTrail, aiTrail) {
    const key = this.getGridKey(x, z);
    const gridSize = 45;
    
    if (Math.abs(x) > gridSize || Math.abs(z) > gridSize) {
      return false;
    }
    
    if (playerTrail && playerTrail.has(key)) return false;
    if (aiTrail && aiTrail.has(key)) return false;
    
    return true;
  }

  getTurnDirection(currentDir, turn) {
    if (turn === 'left') {
      if (currentDir.x === 1) return new THREE.Vector3(0, 0, -1);
      if (currentDir.x === -1) return new THREE.Vector3(0, 0, 1);
      if (currentDir.z === 1) return new THREE.Vector3(-1, 0, 0);
      if (currentDir.z === -1) return new THREE.Vector3(1, 0, 0);
    } else {
      if (currentDir.x === 1) return new THREE.Vector3(0, 0, 1);
      if (currentDir.x === -1) return new THREE.Vector3(0, 0, -1);
      if (currentDir.z === 1) return new THREE.Vector3(1, 0, 0);
      if (currentDir.z === -1) return new THREE.Vector3(-1, 0, 0);
    }
    return currentDir.clone();
  }

  // Zlicza liczbę pustych, osiągalnych pól (BFS) od danego punktu - daje AI
  // realne "wyczucie przestrzeni" zamiast reagowania tylko na przeszkodę
  // dosłownie przed nosem. `limit` to twardy sufit liczby odwiedzonych pól
  // (wydajność) - nie musimy znać DOKŁADNEJ wielkości otwartej przestrzeni,
  // tylko z grubsza porównać kandydatów względem siebie.
  countReachableSpace(startX, startZ, playerTrail, aiTrail, limit = 400) {
    const visited = new Set();
    const startKey = this.getGridKey(startX, startZ);
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
        if (!this.isCellFree(nx, nz, playerTrail, aiTrail)) continue;
        visited.add(key);
        stack.push([nx, nz]);
      }
    }
    return count;
  }

  makeDecision(playerPosition, playerTrail, aiTrail) {
    const nearAheadDist = 2;
    const forwardNear = this.position.clone().add(
      this.direction.clone().multiplyScalar(nearAheadDist)
    );
    const forwardNearFree = this.isCellFree(forwardNear.x, forwardNear.z, playerTrail, aiTrail);

    // Pełna ocena przestrzeni (flood-fill x3 kierunki) jest stosunkowo droga,
    // więc liczymy ją tylko gdy trzeba: albo mamy przeszkodę tuż przed sobą
    // (decyzja "na już" - ZAWSZE natychmiastowa, niezależnie od trudności,
    // inaczej AI dosłownie wjeżdżałoby w ściany na easy), albo minął kawałek
    // czasu od ostatniej oceny (ten odstęp zależy od trudności - patrz
    // DIFFICULTY_SETTINGS) - dzięki temu AI wciąż regularnie "rozgląda się",
    // zamiast jechać ślepo prosto aż w ścianę.
    const now = performance.now();
    const needsUrgentDecision = !forwardNearFree;
    const dueForPeriodic = !this._lastSmartDecision ||
      (now - this._lastSmartDecision) > this.settings.decisionIntervalMs;

    if (!needsUrgentDecision && !dueForPeriodic) {
      return null;
    }
    this._lastSmartDecision = now;

    const leftDir = this.getTurnDirection(this.direction, 'left');
    const rightDir = this.getTurnDirection(this.direction, 'right');
    const candidates = [
      { turn: null, dir: this.direction },
      { turn: 'left', dir: leftDir },
      { turn: 'right', dir: rightDir }
    ];

    const scored = [];
    for (const c of candidates) {
      const landing = this.position.clone().add(c.dir.clone().multiplyScalar(nearAheadDist));
      if (!this.isCellFree(landing.x, landing.z, playerTrail, aiTrail)) continue;

      const space = this.countReachableSpace(landing.x, landing.z, playerTrail, aiTrail, this.settings.lookahead);

      // chaseWeight>0 (medium/hard): premia za zbliżanie się do gracza, żeby
      // AI aktywnie ścigało/odcinało zamiast tylko unikać własnej śmierci.
      // Liczona jako "o ile ten kandydat skraca dystans do gracza względem
      // obecnej pozycji" - ujemna wartość (oddalanie się) obniża wynik.
      const currentDistToPlayer = this.position.distanceTo(playerPosition);
      const landingDistToPlayer = landing.distanceTo(playerPosition);
      const chaseBonus = (currentDistToPlayer - landingDistToPlayer) * this.settings.chaseWeight;

      // Niewielka premia za jazdę na wprost, żeby przy remisach przestrzeni
      // AI nie skręcało bez potrzeby (mniej "szarpane", bardziej naturalne
      // ruchy) - ale to tylko remisołamacz, przestrzeń zawsze wygrywa.
      const score = space + (c.turn === null ? 2 : 0) + chaseBonus;
      scored.push({ turn: c.turn, score });
    }

    if (scored.length === 0) {
      // Żaden kierunek nie jest bezpieczny - nieunikniona śmierć, jedziemy
      // dalej (i tak już nic nie pomoże).
      return null;
    }

    scored.sort((a, b) => b.score - a.score);

    // mistakeChance (głównie easy): w sytuacji NIE-nagłej, zamiast zawsze
    // brać najlepszy wynik, z pewnym prawdopodobieństwem AI bierze losowego
    // z bezpiecznych kandydatów - stąd "łatwy" przeciwnik czasem skręca w
    // gorszą stronę, mimo że widział lepszą opcję. W sytuacji nagłej
    // (needsUrgentDecision) ten margines błędu jest wyłączony - inaczej AI
    // na easy potrafiłoby świadomie wjechać w przeszkodę tuż przed sobą,
    // co wygląda na zepsute sterowanie, nie na "łatwy poziom".
    if (!needsUrgentDecision && this.settings.mistakeChance > 0 && Math.random() < this.settings.mistakeChance) {
      const randomPick = scored[Math.floor(Math.random() * scored.length)];
      return randomPick.turn;
    }

    return scored[0].turn;
  }

  update(deltaTime, playerPosition, playerTrail, aiTrail) {
    if (!this.visible) {
      debugLog('AI not visible, skipping update');
      return;
    }
    
    // Decyzja AI
    const decision = this.makeDecision(playerPosition, playerTrail, aiTrail);
    
    if (decision === 'left') {
      this.direction.copy(this.getTurnDirection(this.direction, 'left'));
    } else if (decision === 'right') {
      this.direction.copy(this.getTurnDirection(this.direction, 'right'));
    }
    
    // Ruch
    const movement = this.direction.clone().multiplyScalar(this.speed * deltaTime);
    this.position.add(movement);
    this.mesh.position.copy(this.position);
    this.trail.update(this.position, this.direction);
    
    // Rotacja
    const angle = Math.atan2(this.direction.x, this.direction.z);
    this.mesh.rotation.y = angle;
    
    // Debug co sekundę
    if (!this.lastDebug || performance.now() - this.lastDebug > 1000) {
      debugLog(
        'AI position:',
        `${this.position.x.toFixed(2)}, ${this.position.y.toFixed(2)}, ${this.position.z.toFixed(2)}`,
        'direction:', this.direction
      );
      this.lastDebug = performance.now();
    }
  }

  hide() {
    this.visible = false;
    this.mesh.visible = false;
  }

  show() {
    this.visible = true;
    this.mesh.visible = true;
  }

  reset(startPosition) {
    this.position.copy(startPosition);
    this.direction.set(-1, 0, 0);
    this.mesh.position.copy(this.position);
    this.trail.start(this.position, this.direction);
    this._lastSmartDecision = null;
    this.show();
    debugLog('AI reset to:', this.position);
  }

  setDifficulty(difficulty) {
    this.difficulty = DIFFICULTY_SETTINGS[difficulty] ? difficulty : 'medium';
    this.settings = DIFFICULTY_SETTINGS[this.difficulty];
  }

  dispose() {
    this.scene.remove(this.mesh);
    // this.mesh to teraz klon modelu GLTF (LightCycleModel.js) - GEOMETRIE
    // są współdzielone z szablonem (i ze wszystkimi INNYMI motocyklami!),
    // więc NIE wolno ich tu disposować - zniszczyłoby to renderowanie
    // pozostałych, wciąż żywych motocykli. Materiały są już unikalnymi
    // klonami per-instancja (patrz createLightCycleMesh) - te bezpiecznie
    // sprzątamy.
    this.mesh.traverse((obj) => {
      if (obj.material) obj.material.dispose();
    });
    this.trail.dispose();
  }
}
