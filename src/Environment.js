import * as THREE from 'three';

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
    // Nieprzezroczysta, ciemnogranatowa płaszczyzna TUŻ pod siatką gry -
    // siatka (Grid.js) rysuje tylko linie z przezroczystymi przerwami między
    // nimi, więc bez tej bazy przez te przerwy byłoby widać domyślne tło
    // sceny zamiast spójnej, ciemnej podłogi.
    const geometry = new THREE.PlaneGeometry(400, 400);
    const material = new THREE.MeshBasicMaterial({ color: 0x0a0a2e });
    this.floorBase = new THREE.Mesh(geometry, material);
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
