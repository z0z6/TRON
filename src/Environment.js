import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { THEME_BACKGROUNDS } from './BackgroundThemes.js';

/**
 * Otoczenie areny - arena jest CZĘŚCIĄ ciągłej, lustrzanej tafli (jak
 * jezioro), z której w różnych, umownie większych odległościach "wystają"
 * budynki/bryły tła (patrz BackgroundThemes.js). Tafla NIE jest niczym
 * maskowana/ucinana - to prawdziwe lustro (THREE.Reflector), odbijające
 * wszystko powyżej niej (siatkę gry, motocykle, budynki, słońce w
 * synthwave/amber), dokładnie tak samo dla wszystkich pięciu motywów.
 * setTheme(key) podmienia tło na żywo - main.js wywołuje ją raz przy
 * starcie i za każdym razem, gdy gracz zmieni motyw w UI (theme-picker).
 */
export class SynthwaveEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.themeGroup = null;
    this.currentThemeKey = null;
    this._activeUpdate = null;
    // Gęstość dekoracyjnego tła (0-1, patrz PerformanceProfile.js) -
    // domyślnie 1 (pełna jakość) dopóki main.js nie ustawi jej jawnie przez
    // setQuality(). Wpływa TYLKO na motywy, które ją faktycznie odczytują
    // (classic, matrix - patrz build(density) w BackgroundThemes.js);
    // pozostałe motywy przyjmują ten argument i po prostu go ignorują.
    this._density = 1;

    this._buildFloorBase();

    // Gęstość nadpisywana przez setTheme() (patrz THEME_BACKGROUNDS) - kolor
    // nadpisywany przez setFogColor() (main.js, zgodnie z theme.bg).
    this.scene.fog = new THREE.FogExp2(0x0c0420, 0.004);

    this.scene.add(this.group);
  }

  _buildFloorBase() {
    // Lustro CELOWO MAŁE - dokładnie pod areną (90x90, patrz Grid(90,45) w
    // main.js) plus niewielki margines. To jest właściwa naprawa "efektu
    // tafli jeziora", nie kolejna maska na dużym lustrze: powierzchnia,
    // która jest zarazem duża, płaska i lustrzana, ZAWSZE będzie czytana
    // jako woda, niezależnie od tego, co się na nią nałoży - a próby
    // maskowania dużego lustra (dwie poprzednie iteracje) same w sobie
    // były źródłem realnych błędów (czarny zamiast białego stopień
    // gradientu, promień wychodzący poza canvas). Zamiast maskować, po
    // prostu nie budujemy dużej płaszczyzny - poza tym małym kwadratem
    // NIE MA żadnej geometrii, żadnego koloru - czysta pustka aż do brył
    // tła (patrz BackgroundThemes.js), które stoją setki jednostek dalej.
    // Lustro dokładnie w rozmiarze siatki gry (Grid(90,45) w main.js) - bez
    // marginesu. Wcześniejsze 130x130 dawało wąski, ciemny, częściowo
    // przezroczysty pas WOKÓŁ siatki, który nie był jej częścią i nie miał
    // uzasadnienia - arena to teraz dokładnie sama siatka świetlna, nic
    // więcej.
    const geometry = new THREE.PlaneGeometry(90, 90);
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

  // Ustawia gęstość dekoracyjnego tła dla WSZYSTKICH kolejnych setTheme() -
  // main.js woła to raz, zaraz po utworzeniu instancji, na podstawie
  // wykrytego tieru wydajności. Nie przebudowuje aktywnego tła samo z
  // siebie (celowo - patrz komentarz w PerformanceProfile.js o tym, że
  // gęstość jest decyzją WYŁĄCZNIE statyczną, ustaloną przed startem gry).
  setQuality(density) {
    this._density = density;
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

    this.themeGroup = entry.build(this._density);
    this.group.add(this.themeGroup);
    this.currentThemeKey = key;
    this._activeUpdate = entry.update || null;

    if (this.scene.fog) this.scene.fog.density = entry.fogDensity;
  }

  // Wywoływane co klatkę z main.js - deleguje do ewentualnego update() z
  // aktywnego motywu (np. animacja "deszczu" w matrix, opadającego śniegu
  // w glacier, migotu krawędzi w classic/synthwave). Motywy bez animacji
  // po prostu nie definiują update() w rejestrze - ten hak wtedy nic nie robi.
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
