import * as THREE from 'three';
import { Trail } from './Trail.js';

/**
 * Przeciwnik sterowany przez sieć - odpowiednik AI.js dla trybu multiplayer.
 * Ma ten sam interfejs, którego oczekuje Game.js (position, mesh, trail,
 * update/reset/hide/show/getPosition), więc może zastąpić instancję AI bez
 * zmiany reszty Game.js - różnica jest tylko w tym, SKĄD biorą się skręty:
 * zamiast makeDecision() (lokalna logika), kierunek zmienia się wyłącznie
 * przez applyRemoteInput(), wywoływane z main.js po odebraniu zdarzenia
 * 'player-input' od przeciwnika przez WebSocket.
 *
 * WAŻNE OGRANICZENIE (świadomy kompromis, nie przeoczenie): to prosty model
 * peer-to-peer BEZ pełnej rekoncyliacji stanu. Obie strony symulują ruch
 * deterministycznie (stała prędkość) od tego samego punktu startowego,
 * synchronizując się wyłącznie zdarzeniami skrętu. Przy słabym połączeniu
 * lub dłuższym meczu możliwy jest niewielki dryf pozycji między stronami.
 * To NIE jest netcode klasy turniejowej - do pełnej synchronizacji
 * potrzebny byłby okresowy resync przez kanał 'game-state-update' (host),
 * który serwer już obsługuje, ale klient go jeszcze nie wykorzystuje.
 */
export class RemotePlayer {
  constructor(scene, startPosition, color = 0xff00ff) {
    this.scene = scene;
    this.color = color;
    this.speed = 10;
    this.visible = true;

    const geometry = new THREE.BoxGeometry(1, 0.5, 2);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 2.0
    });
    this.mesh = new THREE.Mesh(geometry, material);

    this.position = startPosition.clone();
    this.direction = new THREE.Vector3(-1, 0, 0);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = Math.atan2(this.direction.x, this.direction.z);
    this.scene.add(this.mesh);

    this.trail = new Trail(this.scene, color);
    this.trail.start(this.position, this.direction);
  }

  getPosition() {
    return this.position.clone();
  }

  /** Wywoływane z main.js po odebraniu 'player-input' od przeciwnika przez sieć. */
  applyRemoteInput(action) {
    if (!this.visible) return;
    if (action === 'turnLeft') this._turn('left');
    else if (action === 'turnRight') this._turn('right');
  }

  // Ta sama logika skrętu co Game.js#turnPlayer i AI.js#getTurnDirection -
  // celowo duplikowana (nie wydzielona do wspólnego modułu), żeby nie
  // wprowadzać dodatkowego sprzężenia między trybem single- i multiplayer
  // w tej fazie prac.
  _turn(direction) {
    const dir = this.direction;
    let newDir;

    if (direction === 'left') {
      if (dir.x === 1) newDir = new THREE.Vector3(0, 0, -1);
      else if (dir.x === -1) newDir = new THREE.Vector3(0, 0, 1);
      else if (dir.z === 1) newDir = new THREE.Vector3(1, 0, 0);
      else if (dir.z === -1) newDir = new THREE.Vector3(-1, 0, 0);
    } else {
      if (dir.x === 1) newDir = new THREE.Vector3(0, 0, 1);
      else if (dir.x === -1) newDir = new THREE.Vector3(0, 0, -1);
      else if (dir.z === 1) newDir = new THREE.Vector3(-1, 0, 0);
      else if (dir.z === -1) newDir = new THREE.Vector3(1, 0, 0);
    }

    if (newDir) {
      this.direction.copy(newDir);
      this.mesh.rotation.y = Math.atan2(newDir.x, newDir.z);
    }
  }

  update(deltaTime) {
    if (!this.visible) return;
    const movement = this.direction.clone().multiplyScalar(this.speed * deltaTime);
    this.position.add(movement);
    this.mesh.position.copy(this.position);
    this.trail.update(this.position, this.direction);
  }

  reset(startPosition) {
    this.position.copy(startPosition);
    this.direction.set(-1, 0, 0);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = Math.atan2(this.direction.x, this.direction.z);
    this.trail.start(this.position, this.direction);
    this.show();
  }

  hide() {
    this.visible = false;
    this.mesh.visible = false;
  }

  show() {
    this.visible = true;
    this.mesh.visible = true;
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.trail.dispose();
  }
}
