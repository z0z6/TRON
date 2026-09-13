import * as THREE from 'three';
import { Trail } from './Trail.js';
import { createLightCycleMesh } from './LightCycleModel.js';
import { debugLog } from './debug.js';
import { isCellFree, getTurnDirection, countReachableSpace, decideDirection } from './aiDecision.js';

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

  // Deleguje do aiDecision.js (patrz tests/aiDecision.test.js) - logika
  // bez zmian, tylko wydzielona, żeby dało się ją testować bez tworzenia
  // prawdziwej instancji AI (constructor ładuje model GLTF asynchronicznie
  // z dysku/sieci, patrz LightCycleModel.js).
  isCellFree(x, z, playerTrail, aiTrail) {
    return isCellFree(x, z, playerTrail, aiTrail);
  }

  getTurnDirection(currentDir, turn) {
    const result = getTurnDirection(currentDir, turn);
    return new THREE.Vector3(result.x, 0, result.z);
  }

  // Zlicza liczbę pustych, osiągalnych pól (BFS) od danego punktu - daje AI
  // realne "wyczucie przestrzeni" zamiast reagowania tylko na przeszkodę
  // dosłownie przed nosem. Patrz aiDecision.js#countReachableSpace po
  // pełny komentarz o algorytmie.
  countReachableSpace(startX, startZ, playerTrail, aiTrail, limit = 400) {
    return countReachableSpace(startX, startZ, playerTrail, aiTrail, limit);
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

    // Sama ocena kandydatów i wybór (łącznie z chaseWeight/mistakeChance) -
    // patrz aiDecision.js#decideDirection po pełny komentarz.
    return decideDirection({
      position: this.position,
      direction: this.direction,
      playerPosition,
      playerTrail,
      aiTrail,
      settings: this.settings,
      needsUrgentDecision,
      nearAheadDist
    });
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
