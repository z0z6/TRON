// === PROCEDURALNA "ZAPADAJĄCA SIĘ" PODŁOGA (shader) ===
// Alternatywne/uzupełniające podejście do tego samego problemu, co
// BackgroundThemes.js (bryły otaczające arenę) - tu zamiast osobnych
// obiektów, JEDNA duża płaszczyzna sama "opada" w dół i zanika wraz z
// odległością od areny, licząc to w shaderze (vertex: opadanie, fragment:
// proceduralna siatka + zanikanie). Zero dodatkowej geometrii poza samą
// płaszczyzną - tania metoda, dobra na słabszym sprzęcie (Android).
//
// CELOWO bez żadnych obliczeń oświetlenia (brak uniformów światła, brak
// odbicia się na normalnych) - to combackground, samogrający kolor, nie
// bryła reagująca na scenę. Blisko areny w pełni przezroczysta (żeby nie
// zasłaniać lustrzanej podłogi/Reflectora z Environment.js), dopiero od
// uDropRadius zaczyna być widoczna i jednocześnie zapadać się w dół.
import * as THREE from 'three';

export const arenaGroundVertexShader = /* glsl */ `
  varying vec3 vWorldPosition;
  varying float vDist;

  uniform float uDropRadius;   // promień "płaskiej" strefy przy arenie
  uniform float uElongation;   // siła zapadania się w dół

  void main() {
    vec3 pos = position;
    float dist = length(pos.xz);
    vDist = dist;

    // Płasko w promieniu areny, potem płynne (smoothstep, nie liniowe)
    // przejście do opadania - im dalej, tym głębiej, aż do granicy płaszczyzny.
    float dropFactor = smoothstep(uDropRadius, uDropRadius + 25.0, dist);
    float depth = min(dist - uDropRadius, 550.0);
    pos.y -= dropFactor * depth * 0.35 * uElongation;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const arenaGroundFragmentShader = /* glsl */ `
  varying vec3 vWorldPosition;
  varying float vDist;

  uniform int uTheme;        // 0: classic, 1: synthwave, 2: matrix
  uniform float uGridScale;
  uniform float uDropRadius; // ta sama wartość co w vertex - alpha=0 wewnątrz areny
  uniform float uFadeStart;  // dystans, od którego zaczyna się zanikanie w tło
  uniform float uFadeEnd;    // dystans, na którym zanikanie jest już całkowite

  void main() {
    // Proceduralna siatka - zero geometrii, tylko step()+fract() w shaderze.
    float gridX = step(0.94, fract(vWorldPosition.x * uGridScale));
    float gridZ = step(0.94, fract(vWorldPosition.z * uGridScale));
    float gridPattern = max(gridX, gridZ);

    vec3 gridColor = vec3(0.0, 0.95, 1.0);
    vec3 bgColor = vec3(0.02, 0.02, 0.07);

    if (uTheme == 0) {
      gridColor = vec3(0.0, 0.9, 1.0);
      bgColor = vec3(0.02, 0.02, 0.08);
    } else if (uTheme == 1) {
      gridColor = vec3(1.0, 0.16, 0.6);
      bgColor = vec3(0.06, 0.015, 0.12);
    } else if (uTheme == 2) {
      gridColor = vec3(0.15, 1.0, 0.35);
      bgColor = vec3(0.0, 0.015, 0.0);
    }

    // Zanikanie w oddali (poziome) + dodatkowe zanikanie w głąb (pionowe,
    // żeby ukryć "dno studni" i uniknąć ostrego urwania na krawędzi
    // płaszczyzny) - to samo połączone przez max(), co w oryginalnej wersji.
    float horizonFade = smoothstep(uFadeStart, uFadeEnd, vDist);
    float depthFade = smoothstep(-60.0, -15.0, vWorldPosition.y);
    float finalFade = max(horizonFade, 1.0 - depthFade);

    vec3 finalColor = mix(gridColor * gridPattern, bgColor, finalFade);

    // Alpha = 0 wewnątrz areny (żeby NIE zasłaniać Reflectora/siatki gry z
    // Environment.js/Grid.js), płynnie rośnie do 1 tuż za jej krawędzią.
    float alpha = smoothstep(uDropRadius - 5.0, uDropRadius + 15.0, vDist);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function createArenaGroundMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: arenaGroundVertexShader,
    fragmentShader: arenaGroundFragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTheme: { value: 0 },
      uGridScale: { value: 0.05 },
      uDropRadius: { value: 50.0 },
      uElongation: { value: 1.2 },
      uFadeStart: { value: 120.0 },
      uFadeEnd: { value: 420.0 }
    }
  });
}
