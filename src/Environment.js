import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

/**
 * Otoczenie areny w stylu synthwave/outrun - nieprzezroczysta podłoga pod
 * siatką gry. Bez nieba/tła w tle (usunięte na życzenie), bez gór, słońca
 * i belek światła (usunięte wcześniej).
 */
export class SynthwaveEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();

    this._buildFloorBase();

    this.scene.add(this.group);
  }

  _buildFloorBase() {
    // Lustrzana, przyciemniona podłoga TUŻ pod siatką gry - odbija neonowe
    // ślady i siatkę (Grid.js), dając klasyczny "glossy floor" ze
    // stylistyki synthwave/Tron. Parametr color Reflectora przyciemnia i
    // barwi odbicie mnożnikowo, więc podłoga nie staje się jaskrawym
    // lustrem, tylko ciemną, subtelnie odbijającą taflą.
    const geometry = new THREE.PlaneGeometry(400, 400);
    this.floorBase = new Reflector(geometry, {
      color: 0x0a0a2e,
      textureWidth: 1024,
      textureHeight: 1024,
      clipBias: 0.003
    });
    this.floorBase.rotation.x = -Math.PI / 2;
    this.floorBase.position.y = -0.55;
    this.group.add(this.floorBase);
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scene.remove(this.group);
  }
}
