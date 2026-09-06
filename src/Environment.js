import * as THREE from 'three';
// Reflector jest zostawiony w importach, ale domyślnie go wyłączamy w kodzie 
// na rzecz wydajnościowego shadera. Jeśli bardzo chcesz odbić, odkomentuj jego użycie.
// import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { THEME_BACKGROUNDS } from './BackgroundThemes.js';

const ARENA_LENGTH = 90;
const BOUNDED_SCENE_THEMES = new Set(['classic', 'synthwave', 'matrix', 'preview']);

// --- SHADERY DEFINIUJĄCE MODEL PRZESTRZENI ---
const arenaVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  uniform float uDropRadius;   // "Krótkie przy arenie" (płaski promień)
  uniform float uElongation;   // "Wydłużone daleko w dół" (siła opadania)

  void main() {
    vUv = uv;
    vec3 pos = position;
    float dist = length(pos.xz);
    
    // Płaskie do uDropRadius, potem gładkie opadanie w dół
    float drop = smoothstep(uDropRadius, uDropRadius + 20.0, dist);
    pos.y -= drop * dist * uElongation;
    
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const arenaFragmentShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  
  uniform int uTheme;          // 0: Preview(Żółty), 1: Classic, 2: Synthwave, 3: Matrix
  uniform float uGridScale;    
  uniform float uFadeStart;    
  uniform float uFadeEnd;      
  uniform vec3 uColorGrid;     
  uniform vec3 uColorBg;       

  void main() {
    float dist = length(vWorldPos.xz);
    
    // 1. Proceduralna siatka (bardzo wydajna na Androidzie)
    float gridX = step(0.93, fract(vWorldPos.x * uGridScale));
    float gridZ = step(0.93, fract(vWorldPos.z * uGridScale));
    float gridPattern = max(gridX, gridZ);
    
    // 2. Horizon Fade (zanikanie w oddali) + Depth Fade (zanikanie w dół)
    float horizonFade = smoothstep(uFadeStart, uFadeEnd, dist);
    float depthFade = smoothstep(-80.0, -20.0, vWorldPos.y);
    float finalFade = max(horizonFade, depthFade);
    
    // 3. Mieszanie kolorów
    vec3 finalColor = mix(uColorGrid * gridPattern, uColorBg, finalFade);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export class SynthwaveEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.themeGroup = null;
    this.currentThemeKey = null;
    this._activeUpdate = null;
    this.arenaMesh = null;

    this._buildProceduralArena(); // Zastępuje _buildFloorBase i _buildHorizonFadeMask
    this._buildOverheadLight();

    this.scene.fog = new THREE.FogExp2(0x0c0420, 0.004);
    this.scene.add(this.group);
  }

  _buildProceduralArena() {
    // Duża płaszczyzna. Shader zadba o wygięcie i siatkę. 
    // 128x128 segmentów to optymalny balans dla wygięcia wierzchołków na Androidzie.
    const geometry = new THREE.PlaneGeometry(300, 300, 128, 128);
    geometry.rotateX(-Math.PI / 2);

    this.arenaMaterial = new THREE.ShaderMaterial({
      vertexShader: arenaVertexShader,
      fragmentShader: arenaFragmentShader,
      uniforms: {
        uTheme: { value: 0 },
        uGridScale: { value: 0.5 }, // Dostosuj gęstość siatki (mniejsza liczba = gęstsza)
        uDropRadius: { value: 45.0 }, // "Krótkie przy arenie" (połowa ARENA_LENGTH)
        uElongation: { value: 0.8 },  // "Wydłużone daleko w dół"
        uFadeStart: { value: 50.0 },
        uFadeEnd: { value: 110.0 },
        uColorGrid: { value: new THREE.Color(1.0, 0.9, 0.0) }, // Domyślny: Żółty (Preview)
        uColorBg: { value: new THREE.Color(0.05, 0.05, 0.1) }
      },
      // Opcjonalnie: jeśli chcesz, aby pod spodem było widać Reflector, 
      // ustaw transparent: true i opacity: 0.9. Dla maksymalnej wydajności na Androidzie zostaw false.
      transparent: false,
      fog: false // Mgła jest obsługiwana ręcznie w shaderze dla lepszej kontroli
    });

    this.arenaMesh = new THREE.Mesh(geometry, this.arenaMaterial);
    this.arenaMesh.position.y = -0.5;
    this.arenaMesh.receiveShadow = false;
    this.group.add(this.arenaMesh);

    /* 
      UWAGA: Oryginalny Reflector został usunięty/zakomentowany. 
      Powód: 1) Shader idealnie odwzorowuje model z pliku HTML. 
             2) Reflector jest bardzo ciężki dla GPU na Androidzie. 
             3) Siatka w shaderze jest emisyjna (świecąca), więc odbicia są mniej widoczne.
      Jeśli koniecznie chcesz odbić, odkomentuj import Reflector na górze i dodaj go tutaj 
      na pozycji y = -0.6, ale przetestuj wydajność na telefonie.
    */
  }

  _buildOverheadLight() {
    // Białe światło, obniżone i wzmocnione dla lepszego gradientu (zgodnie z komentarzem w oryginale)
    this.overheadLight = new THREE.PointLight(0xffffff, 3.2, 0, 1.4);
    this.overheadLight.position.set(0, ARENA_LENGTH * 0.6, 0);
    this.overheadLight.visible = false;
    this.scene.add(this.overheadLight);
  }

  setTheme(key) {
    const entry = THEME_BACKGROUNDS[key] || THEME_BACKGROUNDS.classic;
    if (key === this.currentThemeKey) return;

    // 1. Sprzątanie starego tła
    if (this.themeGroup) {
      this.group.remove(this.themeGroup);
      this.themeGroup.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
    }

    // 2. Dodawanie nowego tła
    this.themeGroup = entry.build();
    this.group.add(this.themeGroup);
    this.currentThemeKey = key;
    this._activeUpdate = entry.update || null;

    if (this.scene.fog) this.scene.fog.density = entry.fogDensity;

    // 3. Aktualizacja shadera areny pod kątem motywu
    const bounded = BOUNDED_SCENE_THEMES.has(key);
    this.overheadLight.visible = bounded;
    this.arenaMesh.visible = bounded; // W glacier/amber można ukryć tę siatkę, jeśli tło ma swoją własną

    if (bounded) {
      this._updateArenaTheme(key, entry.bg);
    }
  }

  _updateArenaTheme(key, bgColorHex) {
    const bgCol = new THREE.Color(bgColorHex);
    this.scene.fog.color.set(bgCol);

    switch (key.toLowerCase()) {
      case 'classic': // Tron Classic
        this.arenaMaterial.uniforms.uTheme.value = 1;
        this.arenaMaterial.uniforms.uColorGrid.value.set(0x0088ff); // Cyjan/Niebieski
        this.arenaMaterial.uniforms.uColorBg.value.copy(bgCol);
        break;
      case 'synthwave':
        this.arenaMaterial.uniforms.uTheme.value = 2;
        this.arenaMaterial.uniforms.uColorGrid.value.set(0xff00aa); // Magenta/Róż
        this.arenaMaterial.uniforms.uColorBg.value.copy(bgCol);
        break;
      case 'matrix':
        this.arenaMaterial.uniforms.uTheme.value = 3;
        this.arenaMaterial.uniforms.uColorGrid.value.set(0x00ff00); // Zielony
        this.arenaMaterial.uniforms.uColorBg.value.copy(bgCol);
        break;
      case 'preview':
      default:
        this.arenaMaterial.uniforms.uTheme.value = 0;
        this.arenaMaterial.uniforms.uColorGrid.value.set(0xffcc00); // Żółty (z pliku podglądu)
        this.arenaMaterial.uniforms.uColorBg.value.copy(bgCol);
        break;
    }
  }

  // Zachowujemy dla kompatybilności, choć kolor tła jest teraz synchronizowany w setTheme
  setFogColor(hex) {
    if (this.scene.fog) this.scene.fog.color.set(hex);
    if (this.arenaMaterial) {
      this.arenaMaterial.uniforms.uColorBg.value.set(hex);
    }
  }

  update(elapsed, deltaTime) {
    if (this._activeUpdate && this.themeGroup) {
      this._activeUpdate(this.themeGroup, elapsed, deltaTime);
    }
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scene.remove(this.group);
    if (this.overheadLight) this.scene.remove(this.overheadLight);
    if (this.arenaMaterial) this.arenaMaterial.dispose();
    this.scene.fog = null;
  }
}
