import * as THREE from 'three';
import { arenaVertexShader, arenaFragmentShader } from './ArenaShader.js';

export class Arena {
    constructor(options = {}) {
        // Duża płaszczyzna. Dzięki shaderowi nie potrzebujemy tysięcy segmentów!
        // 128x128 segmentów to optymalny kompromis dla efektu "wydłużenia w dół" na Androidzie.
        const geometry = new THREE.PlaneGeometry(200, 200, 128, 128);
        geometry.rotateX(-Math.PI / 2); // Położenie poziome

        this.material = new THREE.ShaderMaterial({
            vertexShader: arenaVertexShader,
            fragmentShader: arenaFragmentShader,
            uniforms: {
                uTheme: { value: 0 },          // 0: Żółty, 1: Tron, 2: Synthwave, 3: Matrix
                uGridScale: { value: 0.5 },    // Dostosuj gęstość siatki w razie potrzeby
                uDropRadius: { value: 25.0 },  // "Krótkie przy arenie" (płaski promień)
                uElongation: { value: 1.2 },   // "Wydłużone daleko w dół" (siła opadania)
                uFadeStart: { value: 40.0 },   // Dystans, od którego zaczyna się fade
                uFadeEnd: { value: 90.0 }      // Dystans, na którym fade jest całkowity
            },
            // side: THREE.DoubleSide // Odkomentuj, jeśli kamera może zejść pod arenę
        });

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.position.y = 0; // Ustaw wysokość areny
        this.mesh.receiveShadow = false; // Optymalizacja: cienie nie są potrzebne dla proceduralnej siatki
    }

    /**
     * Zmienia motyw wizualny areny
     * @param {string} themeName - 'preview', 'tron', 'synthwave', 'matrix'
     */
    setTheme(themeName) {
        switch (themeName.toLowerCase()) {
            case 'tron':
                this.material.uniforms.uTheme.value = 1;
                break;
            case 'synthwave':
                this.material.uniforms.uTheme.value = 2;
                break;
            case 'matrix':
                this.material.uniforms.uTheme.value = 3;
                break;
            case 'preview':
            default:
                this.material.uniforms.uTheme.value = 0;
                break;
        }
    }

    /**
     * Dostosowuje parametry przestrzeni w czasie rzeczywistym
     */
    adjustSpatialParams({ dropRadius, elongation, fadeStart, fadeEnd }) {
        if (dropRadius !== undefined) this.material.uniforms.uDropRadius.value = dropRadius;
        if (elongation !== undefined) this.material.uniforms.uElongation.value = elongation;
        if (fadeStart !== undefined) this.material.uniforms.uFadeStart.value = fadeStart;
        if (fadeEnd !== undefined) this.material.uniforms.uFadeEnd.value = fadeEnd;
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    removeFromScene(scene) {
        scene.remove(this.mesh);
        this.geometry.dispose();
        this.material.dispose();
    }
}
