import * as THREE from 'three';

/**
 * Widoczny, świecący ślad światła za motocyklem (klasyczna "ściana" z Tronu).
 *
 * Ślad przechowuje listę punktów: wszystkie utrwalone narożniki (miejsca
 * skrętów) plus jeden "żywy" punkt na końcu, który jest aktualizowany co
 * klatkę do bieżącej pozycji gracza.
 *
 * PERF: geometria NIE jest przebudowywana od zera co klatkę. Wszystkie
 * segmenty poza ostatnim są utrwalone raz (w momencie skrętu) i nigdy
 * więcej nie ruszane - tylko ostatni, "żywy" segment (quad) jest
 * nadpisywany co klatkę, bezpośrednio w prealokowanym buforze. To
 * sprowadza koszt update() z O(liczba dotychczasowych segmentów) do O(1)
 * i eliminuje alokację nowej tablicy/BufferAttribute 60x/s (poprzednia
 * wersja robiła `new Float32Array` + `new Float32BufferAttribute` przy
 * KAŻDYM wywołaniu update(), co przy dłuższej rundzie generowało rosnącą
 * presję na GC i mikro-przycięcia).
 *
 * Bufor rośnie (podwaja się) automatycznie, jeśli liczba segmentów
 * przekroczy prealokowaną pojemność - to zdarza się rzadko (dopiero przy
 * bardzo długiej rundzie z mnóstwem skrętów), więc nie jest to hot path.
 *
 * Uwaga: ta klasa NIE odpowiada za kolizje - te nadal są liczone osobno
 * (Set z kluczami siatki w Game.js/AI.js, patrz też collision.js).
 * Trail.js jest czysto wizualny. `this.points` (lista utrwalonych
 * narożników + żywy punkt) zostaje publiczne w tym samym kształcie co
 * wcześniej, bo Game.js._minDistanceToDanger() go czyta.
 */

const INITIAL_QUAD_CAPACITY = 512; // z zapasem - typowa runda ma kilkadziesiąt skrętów
const FLOATS_PER_QUAD = 18; // 2 trójkąty * 3 wierzchołki * 3 współrzędne

export class Trail {
  constructor(scene, color = 0x00ffff, height = 1.2) {
    this.scene = scene;
    this.color = color;
    this.height = height;

    this.points = [];
    this._lastDirectionKey = null;
    this._quadCount = 0;
    this._quadCapacity = INITIAL_QUAD_CAPACITY;

    this.geometry = new THREE.BufferGeometry();
    this._positions = new Float32Array(this._quadCapacity * FLOATS_PER_QUAD);
    this._positionAttribute = new THREE.BufferAttribute(this._positions, 3);
    this._positionAttribute.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('position', this._positionAttribute);
    this.geometry.setDrawRange(0, 0);

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

  setColor(color) {
    this.color = color;
    this.material.color.set(color);
  }

  _dirKey(direction) {
    return `${Math.round(direction.x)},${Math.round(direction.z)}`;
  }

  /** Rozpoczyna nowy ślad od zera w danej pozycji/kierunku (np. na starcie rundy). */
  start(position, direction) {
    this.points = [position.clone(), position.clone()];
    this._lastDirectionKey = direction ? this._dirKey(direction) : null;
    this._quadCount = 0;
    this.geometry.setDrawRange(0, 0);
  }

  /** Wywoływane co klatkę - wydłuża ślad do aktualnej pozycji gracza. */
  update(position, direction) {
    if (this.points.length === 0) {
      this.start(position, direction);
      return;
    }

    const dirKey = this._dirKey(direction);

    if (this._lastDirectionKey !== null && dirKey !== this._lastDirectionKey) {
      // Kierunek się zmienił - ostatni punkt zostaje na stałe jako narożnik
      // (jego quad już ma poprawną geometrię z poprzednich klatek, więc nic
      // tam nie trzeba dopisywać), a nowy "żywy" segment zaczyna się od
      // tego samego miejsca - to wymaga jednego nowego quada w buforze.
      this.points.push(this.points[this.points.length - 1].clone());
      this._ensureCapacity(this._quadCount + 1);
      this._quadCount++;
    }

    this._lastDirectionKey = dirKey;
    this.points[this.points.length - 1].copy(position);

    // Tylko ostatni (żywy) quad się zmienia klatka po klatce - reszta
    // bufora zostaje nietknięta.
    if (this.points.length >= 2) {
      const a = this.points[this.points.length - 2];
      const b = this.points[this.points.length - 1];
      this._writeQuad(this._quadCount - 1 >= 0 ? this._quadCount - 1 : 0, a, b);
      if (this._quadCount === 0) this._quadCount = 1;
    }

    this.geometry.setDrawRange(0, this._quadCount * 6);
    this._positionAttribute.needsUpdate = true;
  }

  /** Zapewnia, że bufor pomieści `requiredQuads` segmentów - podwaja pojemność w razie potrzeby. */
  _ensureCapacity(requiredQuads) {
    if (requiredQuads <= this._quadCapacity) return;

    let newCapacity = this._quadCapacity;
    while (newCapacity < requiredQuads) newCapacity *= 2;

    const newPositions = new Float32Array(newCapacity * FLOATS_PER_QUAD);
    newPositions.set(this._positions);

    this._positions = newPositions;
    this._quadCapacity = newCapacity;

    this._positionAttribute = new THREE.BufferAttribute(this._positions, 3);
    this._positionAttribute.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('position', this._positionAttribute);
  }

  /** Zapisuje pionowy prostokąt (dwa trójkąty) między punktami a i b pod indeksem `quadIndex` w buforze. */
  _writeQuad(quadIndex, a, b) {
    const offset = quadIndex * FLOATS_PER_QUAD;
    const h = this.height;
    this._positions.set([
      a.x, 0, a.z,
      b.x, 0, b.z,
      b.x, h, b.z,

      a.x, 0, a.z,
      b.x, h, b.z,
      a.x, h, a.z
    ], offset);
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
