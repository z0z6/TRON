import * as THREE from 'three';

export const arenaVertexShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    uniform float uDropRadius;   // Promień "krótkiej" płaskiej areny (np. 20.0)
    uniform float uElongation;   // Siła "wydłużenia w dół" (np. 1.5)

    void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Odległość od środka areny (0,0)
        float dist = length(pos.xz);
        
        // Efekt "wydłużone daleko w dół":
        // smoothstep zapewnia, że w promieniu uDropRadius podłoga jest płaska ("krótkie przy arenie"),
        // a dopiero poza tym promieniem zaczyna gwałtownie opadać w dół (oś Y).
        float dropFactor = smoothstep(uDropRadius, uDropRadius + 15.0, dist);
        pos.y -= dropFactor * dist * uElongation;
        
        // Przekazanie pozycji światowej do fragment shadera (do obliczeń fade i siatki)
        vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

export const arenaFragmentShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    uniform int uTheme;        // 0: Preview (Żółty), 1: Tron Classic, 2: Synthwave, 3: Matrix
    uniform float uGridScale;  // Gęstość siatki (np. 0.5)
    uniform float uFadeStart;  // Początek zanikania horyzontu (np. 30.0)
    uniform float uFadeEnd;    // Koniec zanikania horyzontu (np. 80.0)

    void main() {
        // Odległość od środka w poziomie (do fade)
        float dist = length(vWorldPosition.xz);
        
        // 1. Proceduralna siatka (maksymalna wydajność na Androidzie, bez fwidth)
        // Używamy vWorldPosition.xz, aby siatka była wyrównana do świata, a nie do UV
        float gridX = step(0.92, fract(vWorldPosition.x * uGridScale));
        float gridZ = step(0.92, fract(vWorldPosition.z * uGridScale));
        float gridPattern = max(gridX, gridZ);
        
        // 2. Definicja kolorów motywów
        vec3 gridColor = vec3(1.0, 0.9, 0.0); // Domyślny: Żółty (z podglądu)
        vec3 bgColor = vec3(0.05, 0.05, 0.1);
        
        if (uTheme == 1) {      // Tron Classic
            gridColor = vec3(0.0, 0.85, 1.0);
            bgColor = vec3(0.0, 0.0, 0.05);
        } else if (uTheme == 2) { // Synthwave
            gridColor = vec3(1.0, 0.0, 0.8);
            bgColor = vec3(0.15, 0.0, 0.25);
        } else if (uTheme == 3) { // Matrix
            gridColor = vec3(0.0, 1.0, 0.0);
            bgColor = vec3(0.0, 0.0, 0.0);
        }
        
        // 3. Horizon Fade (zanikanie w oddali)
        float horizonFade = smoothstep(uFadeStart, uFadeEnd, dist);
        
        // Dodatkowe zanikanie w dół, aby ukryć "dno" studni i uniknąć artefaktów
        float depthFade = smoothstep(-60.0, -15.0, vWorldPosition.y);
        float finalFade = max(horizonFade, depthFade);
        
        // 4. Mieszanie koloru siatki z tłem
        vec3 finalColor = mix(gridColor * gridPattern, bgColor, finalFade);
        
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;
