import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

/**
 * Delikatny vignette + skanlinie na całym ekranie - jeden dodatkowy pełno-
 * ekranowy pass w istniejącym EffectComposer (main.js). Ma wzmocnić klimat
 * "retro-CRT sci-fi" spójny z estetyką Tronu, bez przesady - to NIE ma
 * wyglądać jak stary telewizor, tylko dodać ledwo zauważalne, ale spójne
 * przyciemnienie krawędzi i strukturę linii.
 *
 * Celowo bardzo tani: brak próbkowania sąsiednich pikseli (jak w bloomie),
 * tylko funkcja odległości od środka + jedna sinusoida na współrzędnej Y -
 * to pojedynczy fullscreen pass bez żadnego rozmycia, więc koszt jest
 * bliski zeru nawet na słabszym sprzęcie. Mimo to gaszony razem z bloomem
 * na "low" tierze (patrz main.js: `vignettePass.enabled = quality.bloom`) -
 * na tym tierze każdy dodatkowy pass się liczy.
 */
export const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    uResolution: { value: null }, // THREE.Vector2(width, height) w pikselach
    uVignetteStrength: { value: 0.35 }, // 0 = brak, 1 = bardzo mocne przyciemnienie na rogach
    uVignetteRadius: { value: 0.75 }, // od jakiej odległości od środka (0-1, znormalizowane) zaczyna działać
    uScanlineOpacity: { value: 0.06 } // 0 = brak skanlinii, trzymane nisko celowo (subtelność > efekciarstwo)
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uVignetteStrength;
    uniform float uVignetteRadius;
    uniform float uScanlineOpacity;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);

      // Vignette: odległość od środka ekranu (skorygowana o proporcje,
      // żeby na szerokich ekranach przyciemnienie było kołowe, nie
      // eliptyczne), smoothstep od uVignetteRadius do krawędzi kadru.
      vec2 centered = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
      float dist = length(centered);
      float vignette = smoothstep(uVignetteRadius, 1.1, dist);
      color.rgb *= 1.0 - vignette * uVignetteStrength;

      // Skanlinie: cienkie, poziome, ciemne paski co ok. 2px ekranu -
      // gęstość liczona z uResolution.y, więc gęstość linii nie zależy od
      // pixelRatio/rozmiaru okna.
      float scanline = sin(vUv.y * uResolution.y * 1.5) * 0.5 + 0.5;
      color.rgb *= 1.0 - uScanlineOpacity * scanline;

      gl_FragColor = color;
    }
  `
};

/** Tworzy gotowy ShaderPass z VignetteShader, dopasowany do rozmiaru w pikselach. */
export function createVignettePass(widthPx, heightPx) {
  const pass = new ShaderPass(VignetteShader);
  pass.uniforms.uResolution.value = new THREE.Vector2(widthPx, heightPx);
  return pass;
}
