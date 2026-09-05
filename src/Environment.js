import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { THEME_BACKGROUNDS } from './BackgroundThemes.js';

// Ta sama wartość co Grid(90, 45) w main.js - "długość sceny gry", używana
// jako wysokość światła punktowego (patrz _buildOverheadLight) i jako
// odniesienie dla zasięgu zanikania podłogi (patrz _buildHorizonFadeMask).
const ARENA_LENGTH = 90;

// Motywy, w których podłoga/lustro ma się WYRAŹNIE KOŃCZYĆ na granicy areny
// (zamiast ciągnąć się jak tafla jeziora aż po horyzont) i w których tło
// jest oświetlone punktowo z góry, z naturalnym, gradientowym zanikaniem
// wraz z odległością. Glacier i amber CELOWO zostają przy nieskończonej
// tafli - tam to pasuje do koncepcji (patrz komentarze w BackgroundThemes.js).
const BOUNDED_SCENE_THEMES = new Set(['classic', 'synthwave', 'matrix']);

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
    this._buildHorizonFadeMask();
    this._buildOverheadLight();

    // Gęstość nadpisywana przez setTheme() (patrz THEME_BACKGROUNDS) - kolor
    // nadpisywany przez setFogColor() (main.js, zgodnie z theme.bg).
    this.scene.fog = new THREE.FogExp2(0x0c0420, 0.004);

    this.scene.add(this.group);
  }

  _buildFloorBase() {
    // Lustrzana, przyciemniona podłoga TUŻ pod siatką gry - odbija neonowe
    // ślady i siatkę (Grid.js), dając klasyczny "glossy floor" ze
    // stylistyki synthwave/Tron. Wspólna dla wszystkich motywów tła -
    // to, czy WYGLĄDA jak nieskończona tafla czy kończy się na granicy
    // areny, zależy od _buildHorizonFadeMask() (widoczna tylko w części
    // motywów, patrz setTheme).
    const geometry = new THREE.PlaneGeometry(400, 400);
    this.floorBase = new Reflector(geometry, {
      color: 0x2c2c5e,
      textureWidth: 2048,
      textureHeight: 2048,
      clipBias: 0.003
    });
    this.floorBase.rotation.x = -Math.PI / 2;
    this.floorBase.position.y = -0.55;
    this.group.add(this.floorBase);
  }

  // Maska kończąca podłogę na granicy areny - płaska tafla z teksturą
  // radialnego gradientu (canvas): przezroczysta w środku (nad areną,
  // odbicie w pełni widoczne), płynnie, GRADIENTOWO (nie ostro/liniowo)
  // przechodząca w kolor tła motywu na zewnątrz. Leży tuż NAD Reflectorem
  // (ten sam Y + niewielki offset, żeby uniknąć z-fightingu), więc maskuje
  // lustro widziane z góry bez wpływu na samo odbicie pod areną.
  // Widoczna TYLKO dla BOUNDED_SCENE_THEMES (patrz setTheme) - w
  // glacier/amber podłoga celowo zostaje "nieskończoną taflą".
  _buildHorizonFadeMask() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const c = 256;
    // Przezroczysty środek do ok. 0.35 promienia (pokrywa całą arenę
    // ±45 - patrz Grid(90,45)), dalej płynne przejście do 0.85 promienia,
    // gdzie tekstura jest już w pełni nieprzezroczysta.
    const gradient = ctx.createRadialGradient(c, c, 512 * 0.35, c, c, 512 * 0.85);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      color: 0x0c0420, // nadpisywane przez setHorizonFadeColor() zgodnie z theme.bg
      fog: false
    });
    const geometry = new THREE.PlaneGeometry(320, 320);
    this.horizonFade = new THREE.Mesh(geometry, material);
    this.horizonFade.rotation.x = -Math.PI / 2;
    this.horizonFade.position.y = -0.54; // tuż nad Reflectorem (-0.55)
    this.horizonFade.visible = false;
    this.group.add(this.horizonFade);
  }

  // Światło punktowe zawieszone nad środkiem sceny gry, na wysokości równej
  // jej długości (ARENA_LENGTH) - naturalny, fizyczny spadek jasności wraz
  // z odległością (zanikanie kwadratowe, decay) daje GRADIENTOWE, a nie
  // ostro odcięte, przyciemnianie elementów tła im dalej/głębiej pod
  // posadzką (patrz "zakopane" elementy w BackgroundThemes.js). Widoczne
  // TYLKO dla BOUNDED_SCENE_THEMES - glacier/amber mają swój własny,
  // niezależny sposób oświetlenia (patrz komentarze tam).
  _buildOverheadLight() {
    this.overheadLight = new THREE.PointLight(0xffffff, 1.6, 0, 1.4);
    this.overheadLight.position.set(0, ARENA_LENGTH, 0);
    this.overheadLight.visible = false;
    this.scene.add(this.overheadLight);
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

    const bounded = BOUNDED_SCENE_THEMES.has(key);
    this.horizonFade.visible = bounded;
    this.overheadLight.visible = bounded;
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

  // Mgła ORAZ maska horyzontu mają kolor zgodny z tłem danego motywu
  // (theme.bg) - main.js wywołuje to razem ze zmianą scene.background,
  // żeby zarówno mgła, jak i miejsce, gdzie "kończy się" podłoga, płynnie
  // wtapiały się w niebo zamiast być niedopasowanym kolorem.
  setFogColor(hex) {
    if (this.scene.fog) this.scene.fog.color.set(hex);
    if (this.horizonFade) this.horizonFade.material.color.set(hex);
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scene.remove(this.group);
    if (this.overheadLight) this.scene.remove(this.overheadLight);
    this.scene.fog = null;
  }
}
