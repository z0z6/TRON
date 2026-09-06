import * as THREE from 'three';
import { Trail } from './Trail.js';
import { createLightCycleMesh } from './LightCycleModel.js';

export class AI {
  constructor(scene, startPosition, color = 0xff00ff, difficulty = 'medium') {
    this.scene = scene;
    this.position = startPosition.clone();
    this.direction = new THREE.Vector3(-1, 0, 0);
    this.color = color;
    this.speed = 10;
    this.visible = true;
    this.difficulty = difficulty;
    
    console.log('AI created at:', this.position, 'direction:', this.direction);
    
    this.createMesh();
    this.trail = new Trail(this.scene, this.color);
    this.trail.start(this.position, this.direction);
  }

  createMesh() {
    this.mesh = createLightCycleMesh(this.color);
    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);
    
    console.log('AI mesh created and added to scene');
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
    // (decyzja "na już"), albo minął kawałek czasu od ostatniej oceny -
    // dzięki temu AI wciąż regularnie "rozgląda się", zamiast jechać ślepo
    // prosto aż w ścianę.
    const now = performance.now();
    const needsUrgentDecision = !forwardNearFree;
    const dueForPeriodic = !this._lastSmartDecision || (now - this._lastSmartDecision) > 180;

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

    let bestTurn = null;
    let bestScore = -1;
    for (const c of candidates) {
      const landing = this.position.clone().add(c.dir.clone().multiplyScalar(nearAheadDist));
      if (!this.isCellFree(landing.x, landing.z, playerTrail, aiTrail)) continue;

      const space = this.countReachableSpace(landing.x, landing.z, playerTrail, aiTrail);
      // Niewielka premia za jazdę na wprost, żeby przy remisach przestrzeni
      // AI nie skręcało bez potrzeby (mniej "szarpane", bardziej naturalne
      // ruchy) - ale to tylko remisołamacz, przestrzeń zawsze wygrywa.
      const score = space + (c.turn === null ? 2 : 0);
      if (score > bestScore) {
        bestScore = score;
        bestTurn = c.turn;
      }
    }

    // Żaden kierunek nie jest bezpieczny - nieunikniona śmierć, jedziemy
    // dalej (i tak już nic nie pomoże).
    return bestTurn;
  }

  update(deltaTime, playerPosition, playerTrail, aiTrail) {
    if (!this.visible) {
      console.log('AI not visible, skipping update');
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
      console.log(
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
    console.log('AI reset to:', this.position);
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
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
