import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { THEME_BACKGROUNDS } from './BackgroundThemes.js';

/**
 * Otoczenie areny - lustrzana podłoga pod siatką gry (wspólna dla
 * wszystkich motywów) + WYMIENNE tło tematyczne zależne od aktualnego
 * motywu kolorystycznego (patrz BackgroundThemes.js). setTheme(key)
 * podmienia tło na żywo - main.js wywołuje ją raz przy starcie i za
 * każdym razem, gdy gracz zmieni motyw w UI (theme-picker).
 */
export class SynthwaveEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.themeGroup = null;
    this.currentThemeKey = null;
    this._activeUpdate = null;

    this._buildFloorBase();

    // Gęstość nadpisywana przez setTheme() (patrz THEME_BACKGROUNDS) - kolor
    // nadpisywany przez setFogColor() (main.js, zgodnie z theme.bg).
    this.scene.fog = new THREE.FogExp2(0x0c0420, 0.004);

    this.scene.add(this.group);
  }

  _buildFloorBase() {
    // Lustrzana, przyciemniona podłoga TUŻ pod siatką gry - odbija neonowe
    // ślady i siatkę (Grid.js), dając klasyczny "glossy floor" ze
    // stylistyki synthwave/Tron. Wspólna dla wszystkich motywów tła.
    const geometry = new THREE.PlaneGeometry(400, 400);
    this.floorBase = new Reflector(geometry, {
      color: 0x1c1c48, // było 0x0a0a2e - jaśniejszy tint, żeby odbicie tła (słońca, gór, miasta...) było faktycznie widoczne, nie prawie czarne
      textureWidth: 1024,
      textureHeight: 1024,
      clipBias: 0.003
    });
    this.floorBase.rotation.x = -Math.PI / 2;
    this.floorBase.position.y = -0.55;
    this.group.add(this.floorBase);
  }

  // Podmienia aktywne tło tematyczne. Bezpieczne do wywołania wielokrotnie
  // (np. przy każdej zmianie motywu w UI) - poprzednie tło jest w pełni
  // sprzątane (geometrie/materiały) przed zbudowaniem nowego.
  setTheme(key) {
    const entry = THEME_BACKGROUNDS[key] || THEME_BACKGROUNDS.classic;
    if (key === this.currentThemeKey) return;

    if (this.themeGroup) {
      this.group.remove(this.themeGroup);
      this.themeGroup.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
    }

    this.themeGroup = entry.build();
    this.group.add(this.themeGroup);
    this.currentThemeKey = key;
    this._activeUpdate = entry.update || null;

    if (this.scene.fog) this.scene.fog.density = entry.fogDensity;
  }

  // Wywoływane co klatkę z main.js - deleguje do ewentualnego update() z
  // aktywnego motywu (np. animacja "deszczu" w matrix, opadającego śniegu
  // w glacier). Motywy bez animacji (classic, synthwave) po prostu nie
  // definiują update() w rejestrze - ten hak wtedy nic nie robi.
  update(elapsed, deltaTime) {
    if (this._activeUpdate && this.themeGroup) {
      this._activeUpdate(this.themeGroup, elapsed, deltaTime);
    }
  }

  // Mgła ma kolor zgodny z tłem danego motywu (theme.bg) - main.js wywołuje
  // to razem ze zmianą scene.background, żeby dalekie elementy tła płynnie
  // wtapiały się w niebo zamiast być ostro odcięte niedopasowanym kolorem.
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
