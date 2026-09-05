import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

/**
 * Otoczenie areny w stylu synthwave/outrun - lustrzana podłoga pod siatką
 * gry i niska poligonowo sylwetka miasta w pierścieniu wokół areny, dająca
 * głębię tłu bez odciągania uwagi od samej rozgrywki.
 */
export class SynthwaveEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();

    this._buildFloorBase();
    this._buildSkyline();

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

  _buildSkyline() {
    // Sylwetka miasta w pierścieniu wokół areny (promień 140-230 - daleko
    // poza granicą planszy ±45, patrz Game.js/AI.js), żeby nie wchodziła w
    // drogę rozgrywce. Jeden InstancedMesh = jeden draw call niezależnie od
    // liczby budynków - ważne dla wydajności na telefonach (gra ma
    // sterowanie dotykowe). Deterministyczny generator liczb (stały seed)
    // zamiast Math.random(), żeby układ budynków nie zmieniał się między
    // przeładowaniami strony ani rundami gry, i odbijał się spójnie w
    // lustrzanej podłodze.
    const buildingCount = 40;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x070720 });
    this.skyline = new THREE.InstancedMesh(geometry, material, buildingCount);

    let seed = 1337;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const dummy = new THREE.Object3D();
    for (let i = 0; i < buildingCount; i++) {
      const angle = (i / buildingCount) * Math.PI * 2 + rand() * 0.15;
      const radius = 140 + rand() * 90;
      const width = 6 + rand() * 14;
      const depth = 6 + rand() * 14;
      const height = 20 + rand() * 90;

      dummy.position.set(
        Math.cos(angle) * radius,
        height / 2 - 0.55,
        Math.sin(angle) * radius
      );
      dummy.scale.set(width, height, depth);
      dummy.rotation.y = rand() * Math.PI;
      dummy.updateMatrix();
      this.skyline.setMatrixAt(i, dummy.matrix);
    }

    this.group.add(this.skyline);
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scene.remove(this.group);
  }
}
