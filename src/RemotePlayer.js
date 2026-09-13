import * as THREE from 'three';
import { Trail } from './Trail.js';
import { createLightCycleMesh } from './LightCycleModel.js';
import { reconcilePosition } from './netSync.js';

/**
 * Przeciwnik sterowany przez sieć - odpowiednik AI.js dla trybu multiplayer.
 * Ma ten sam interfejs, którego oczekuje Game.js (position, mesh, trail,
 * update/reset/hide/show/getPosition), więc może zastąpić instancję AI bez
 * zmiany reszty Game.js - różnica jest tylko w tym, SKĄD biorą się skręty:
 * zamiast makeDecision() (lokalna logika), kierunek zmienia się wyłącznie
 * przez applyRemoteInput(), wywoływane z main.js po odebraniu zdarzenia
 * 'player-input' od przeciwnika przez WebSocket.
 *
 * Model ruchu: obie strony symulują ruch deterministycznie (stała
 * prędkość) i synchronizują kierunek zdarzeniami skrętu. Same zdarzenia
 * skrętu wystarczają w teorii do idealnej synchronizacji, ale w praktyce
 * małe różnice w deltaTime między przeglądarkami/urządzeniami mogą
 * kumulować niewielki dryf pozycji w dłuższym meczu. Dlatego obie strony
 * DODATKOWO okresowo wysyłają swoją własną, "prawdziwą" pozycję przez
 * kanał 'game-state-update' (patrz Game.js#update, RESYNC_INTERVAL_MS) -
 * applyRemoteState() poniżej odbiera to u przeciwnika i płynnie koryguje
 * lokalną symulację w jego stronę (patrz netSync.js po szczegóły algorytmu
 * korekty). To wciąż nie jest netcode klasy turniejowej z pełną
 * rekoncyliacją i przewidywaniem ruchu, ale usuwa akumulujący się dryf bez
 * gwałtownych skoków na ekranie.
 */
export class RemotePlayer {
  constructor(scene, startPosition, color = 0xff00ff) {
    this.scene = scene;
    this.color = color;
    this.speed = 10;
    this.visible = true;

    this.mesh = createLightCycleMesh(color);

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

  /**
   * Wywoływane z main.js po odebraniu 'game-state-update' od przeciwnika
   * przez WebSocket (patrz Game.js#update, gdzie druga strona okresowo
   * WYSYŁA tę samą strukturę o SOBIE). state = { position: {x,z},
   * direction: {x,z} } - dokładnie to, co druga strona wie o sobie
   * najlepiej, więc traktujemy to jako "prawdę" do której dociągamy naszą
   * lokalną symulację (patrz netSync.js po algorytm korekty).
   */
  applyRemoteState(state) {
    if (!this.visible || !state || !state.position) return;

    const corrected = reconcilePosition(
      { x: this.position.x, z: this.position.z },
      state.position
    );
    this.position.x = corrected.x;
    this.position.z = corrected.z;
    this.mesh.position.copy(this.position);

    // Kierunek jest już zsynchronizowany zdarzeniami skrętu
    // (applyRemoteInput) - to tylko zabezpieczenie na wypadek, gdyby
    // pojedyncze zdarzenie 'player-input' zgubiło się w sieci i lokalny
    // kierunek się rozjechał z rzeczywistym.
    if (state.direction) {
      const { x, z } = state.direction;
      if (x !== this.direction.x || z !== this.direction.z) {
        this.direction.set(x, 0, z);
        this.mesh.rotation.y = Math.atan2(x, z);
      }
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
    // this.mesh to teraz klon modelu GLTF (LightCycleModel.js) - GEOMETRIE
    // są współdzielone z szablonem i innymi motocyklami, więc NIE wolno
    // ich tu disposować (patrz identyczny komentarz w AI.js). Materiały są
    // już unikalnymi klonami per-instancja - te bezpiecznie sprzątamy.
    this.mesh.traverse((obj) => {
      if (obj.material) obj.material.dispose();
    });
    this.trail.dispose();
  }
}
