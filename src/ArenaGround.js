import * as THREE from 'three';
import { createArenaGroundMaterial } from './ArenaGroundShader.js';

const THEME_TO_UNIFORM = { classic: 0, synthwave: 1, matrix: 2 };

/**
 * Duża, proceduralnie "zapadająca się" płaszczyzna wokół areny (patrz
 * ArenaGroundShader.js) - uzupełnienie osobnych brył z BackgroundThemes.js,
 * nie ich zamiennik. W pełni przezroczysta nad samą areną (nie zasłania
 * Reflectora/siatki gry), dopiero za jej krawędzią zaczyna być widoczna i
 * jednocześnie opadać w dół, dając wrażenie ciągłego terenu łączącego arenę
 * z odległymi bryłami zamiast pustej, płaskiej przerwy.
 */
export class ArenaGround {
  constructor(scene) {
    this.scene = scene;
    const geometry = new THREE.PlaneGeometry(1400, 1400, 160, 160);
    geometry.rotateX(-Math.PI / 2);

    this.material = createArenaGroundMaterial();
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.y = -0.53; // tuż nad Reflectorem/maską (-0.54/-0.55), pod siatką gry
    this.mesh.visible = false;

    this.scene.add(this.mesh);
  }

  // Widoczna TYLKO dla motywów, dla których ma sens (classic/synthwave/
  // matrix) - amber/glacier mają swój własny, już wypracowany sposób
  // (patrz komentarze w BackgroundThemes.js), tego się tu nie dotyka.
  setTheme(key) {
    if (key in THEME_TO_UNIFORM) {
      this.mesh.visible = true;
      this.material.uniforms.uTheme.value = THEME_TO_UNIFORM[key];
    } else {
      this.mesh.visible = false;
    }
  }

  // Dostrojenie parametrów przestrzeni w czasie rzeczywistym, gdyby efekt
  // okazał się za mocny/za słaby - bez przebudowy geometrii czy materiału.
  adjustSpatialParams({ dropRadius, elongation, fadeStart, fadeEnd, gridScale } = {}) {
    const u = this.material.uniforms;
    if (dropRadius !== undefined) u.uDropRadius.value = dropRadius;
    if (elongation !== undefined) u.uElongation.value = elongation;
    if (fadeStart !== undefined) u.uFadeStart.value = fadeStart;
    if (fadeEnd !== undefined) u.uFadeEnd.value = fadeEnd;
    if (gridScale !== undefined) u.uGridScale.value = gridScale;
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}
