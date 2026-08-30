import * as THREE from 'three';

/**
 * Widoczny, świecący ślad światła za motocyklem (klasyczna "ściana" z Tronu).
 *
 * Ślad przechowuje listę punktów: wszystkie utrwalone narożniki (miejsca
 * skrętów) plus jeden "żywy" punkt na końcu, który jest aktualizowany co
 * klatkę do bieżącej pozycji gracza. Geometria (siatka prostokątów pionowych
 * między kolejnymi punktami) jest przebudowywana przy każdym update() - przy
 * typowej liczbie skrętów w jednej rundzie (kilkadziesiąt) to tanie
 * operacyjnie i dużo prostsze niż ręczne zarządzanie buforem przyrostowym.
 *
 * Uwaga: ta klasa NIE odpowiada za kolizje - te nadal są liczone osobno
 * (Set z kluczami siatki w Game.js/AI.js). Trail.js jest czysto wizualny.
 */
export class Trail {
  constructor(scene, color = 0x00ffff, height = 1.2) {
    this.scene = scene;
    this.color = color;
    this.height = height;

    this.points = [];
    this._lastDirectionKey = null;

    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false; // trasa mieści się w znanej planszy, nie trzeba liczyć bounding sphere co klatkę
    this.scene.add(this.mesh);
  }

  _dirKey(direction) {
    return `${Math.round(direction.x)},${Math.round(direction.z)}`;
  }

  /** Rozpoczyna nowy ślad od zera w danej pozycji/kierunku (np. na starcie rundy). */
  start(position, direction) {
    this.points = [position.clone(), position.clone()];
    this._lastDirectionKey = direction ? this._dirKey(direction) : null;
    this._rebuild();
  }

  /** Wywoływane co klatkę - wydłuża ślad do aktualnej pozycji gracza. */
  update(position, direction) {
    if (this.points.length === 0) {
      this.start(position, direction);
      return;
    }

    const dirKey = this._dirKey(direction);

    if (this._lastDirectionKey !== null && dirKey !== this._lastDirectionKey) {
      // Kierunek się zmienił - ostatni punkt zostaje na stałe jako narożnik,
      // a nowy "żywy" odcinek zaczyna się od tego samego miejsca.
      this.points.push(this.points[this.points.length - 1].clone());
    }

    this._lastDirectionKey = dirKey;
    this.points[this.points.length - 1].copy(position);

    this._rebuild();
  }

  _rebuild() {
    if (this.points.length < 2) {
      this.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
      return;
    }

    const positions = [];

    for (let i = 0; i < this.points.length - 1; i++) {
      const a = this.points[i];
      const b = this.points[i + 1];

      // Pionowy prostokąt (dwa trójkąty) między punktami a i b, od poziomu gruntu (y=0) w górę.
      positions.push(
        a.x, 0, a.z,
        b.x, 0, b.z,
        b.x, this.height, b.z,

        a.x, 0, a.z,
        b.x, this.height, b.z,
        a.x, this.height, a.z
      );
    }

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    this.geometry.attributes.position.needsUpdate = true;
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
