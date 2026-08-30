import * as THREE from 'three';
import { Trail } from './Trail.js';

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
    const geometry = new THREE.BoxGeometry(1, 0.5, 2);
    const material = new THREE.MeshStandardMaterial({
      color: this.color,
      emissive: this.color,
      emissiveIntensity: 0.5
    });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);
    
    console.log('AI mesh created and added to scene');
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

  makeDecision(playerPosition, playerTrail, aiTrail) {
    const lookAhead = 5;
    
    const forwardPos = this.position.clone().add(
      this.direction.clone().multiplyScalar(lookAhead)
    );
    
    const leftDir = this.getTurnDirection(this.direction, 'left');
    const rightDir = this.getTurnDirection(this.direction, 'right');
    
    const leftPos = this.position.clone().add(leftDir.clone().multiplyScalar(lookAhead));
    const rightPos = this.position.clone().add(rightDir.clone().multiplyScalar(lookAhead));
    
    const forwardFree = this.isCellFree(forwardPos.x, forwardPos.z, playerTrail, aiTrail);
    const leftFree = this.isCellFree(leftPos.x, leftPos.z, playerTrail, aiTrail);
    const rightFree = this.isCellFree(rightPos.x, rightPos.z, playerTrail, aiTrail);
    
    // Jeśli nie możemy jechać prosto, skręć
    if (!forwardFree) {
      if (leftFree) return 'left';
      if (rightFree) return 'right';
      return null;
    }
    
    // Losowe skręty co jakiś czas
    if (Math.random() < 0.02) {
      return Math.random() < 0.5 ? 'left' : 'right';
    }
    
    return null;
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
    this.show();
    console.log('AI reset to:', this.position);
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.trail.dispose();
  }
}
