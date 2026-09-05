import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

/**
 * Otoczenie areny w stylu synthwave/outrun - lustrzana podłoga pod siatką
 * gry, dwuwarstwowa sylwetka miasta w pierścieniu wokół areny (bliższa +
 * dalsza warstwa, dla wyraźnej paralaksy przy skręcaniu kamery za graczem)
 * z drobnymi, świecącymi "oknami/danymi" na fasadach, i mgła atmosferyczna
 * dająca poczucie głębi bez odciągania uwagi od samej rozgrywki.
 */
export class SynthwaveEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();

    // Deterministyczny generator liczb (stały seed) - układ miasta i świateł
    // ma być identyczny między przeładowaniami strony/rundami, żeby spójnie
    // odbijał się też w lustrzanej podłodze.
    this._seed = 1337;

    this._buildFloorBase();
    this._buildSkylineLayer({ count: 26, radiusMin: 100, radiusMax: 155, heightMin: 15, heightMax: 70, color: 0x141440 });
    this._buildSkylineLayer({ count: 30, radiusMin: 190, radiusMax: 270, heightMin: 35, heightMax: 145, color: 0x0a0a24 });
    this._buildWindowLights();

    // Mgła gęstnieje dopiero za granicą areny (±45, patrz Game.js/AI.js -
    // przekątna do rogu to ok. 64) - w samej grze praktycznie niezauważalna,
    // ale przy dalszej warstwie miasta (promień do 270) daje wyraźną
    // recesję/głębię i wtapia najdalsze budynki w tło zamiast ostro je ucinać.
    this.scene.fog = new THREE.FogExp2(0x0c0420, 0.004);

    this.scene.add(this.group);
  }

  _rand() {
    this._seed = (this._seed * 9301 + 49297) % 233280;
    return this._seed / 233280;
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

  // Jedna "warstwa" pierścienia budynków - wywoływana dwa razy (bliżej/dalej)
  // z różnym zasięgiem, wysokością i kolorem, żeby przy obrocie kamery za
  // graczem (CameraController#follow) obie warstwy przesuwały się względem
  // siebie w innym tempie - to właśnie czytelny efekt paralaksy w prawdziwej
  // scenie 3D, bez sztuczek 2D. Jeden InstancedMesh na warstwę = jeden
  // dodatkowy draw call niezależnie od liczby budynków w niej.
  _buildSkylineLayer({ count, radiusMin, radiusMax, heightMin, heightMax, color }) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color, fog: true });
    const layer = new THREE.InstancedMesh(geometry, material, count);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + this._rand() * 0.15;
      const radius = radiusMin + this._rand() * (radiusMax - radiusMin);
      const width = 6 + this._rand() * 14;
      const depth = 6 + this._rand() * 14;
      const height = heightMin + this._rand() * (heightMax - heightMin);

      dummy.position.set(
        Math.cos(angle) * radius,
        height / 2 - 0.55,
        Math.sin(angle) * radius
      );
      dummy.scale.set(width, height, depth);
      dummy.rotation.y = this._rand() * Math.PI;
      dummy.updateMatrix();
      layer.setMatrixAt(i, dummy.matrix);
    }

    this.group.add(layer);
    if (!this.skylineLayers) this.skylineLayers = [];
    this.skylineLayers.push(layer);
  }

  // Drobne, jasne "okna/mikrodane" rozsiane po całej strefie miasta -
  // spłaszczone kostki z addytywnym blendingiem (łapią bloom z main.js),
  // dające wrażenie tętniącego, cyfrowego miasta bez modelowania każdej
  // fasady z osobna. Kolor każdej "plamki" zapamiętany w _lightIsP1, żeby
  // setAccentColors() mogło przemalować je zgodnie z motywem bez ponownego
  // losowania układu.
  _buildWindowLights() {
    const count = 260;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false, // te "iskry" mają zostać czytelne nawet w oddali, mgła by je zgasiła
      vertexColors: true
    });
    this.windowLights = new THREE.InstancedMesh(geometry, material, count);

    this._lightIsP1 = new Array(count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const angle = this._rand() * Math.PI * 2;
      const radius = 100 + this._rand() * 175;
      const height = 2 + this._rand() * 130;

      dummy.position.set(Math.cos(angle) * radius, height - 0.55, Math.sin(angle) * radius);
      const s = 0.5 + this._rand() * 1.3;
      dummy.scale.set(s, s * 0.35, 0.15); // spłaszczone - jak pasek światła/tekstu, nie kostka
      dummy.rotation.y = this._rand() * Math.PI;
      dummy.updateMatrix();
      this.windowLights.setMatrixAt(i, dummy.matrix);

      this._lightIsP1[i] = this._rand() < 0.5;
    }

    this._applyWindowColors(0x00ffff, 0xff00ff);
    this.group.add(this.windowLights);
  }

  _applyWindowColors(p1Hex, p2Hex) {
    const colorA = new THREE.Color(p1Hex);
    const colorB = new THREE.Color(p2Hex);
    for (let i = 0; i < this._lightIsP1.length; i++) {
      this.windowLights.setColorAt(i, this._lightIsP1[i] ? colorA : colorB);
    }
    this.windowLights.instanceColor.needsUpdate = true;
  }

  // Wywoływane razem z grid.setGlowColors()/game.applyThemeColors() przy
  // starcie i przy zmianie motywu w UI - trzyma iskry miasta spójne z
  // kolorami graczy.
  setAccentColors(p1Hex, p2Hex) {
    if (this.windowLights) this._applyWindowColors(p1Hex, p2Hex);
  }

  // Wywoływane razem ze zmianą scene.background przy starcie i przy zmianie
  // motywu - mgła musi mieć ten sam kolor co tło, inaczej dalekie budynki
  // wtapiałyby się w wyraźnie inny odcień zamiast płynnie znikać w dali.
  setFogColor(hex) {
    if (this.scene.fog) this.scene.fog.color.set(hex);
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scene.remove(this.group);
    this.scene.fog = null;
  }
}
