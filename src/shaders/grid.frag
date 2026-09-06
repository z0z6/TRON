uniform float uTime;
uniform vec3 uColor;
uniform float uPulseSpeed;
uniform float uGridSize;

uniform vec2 uPlayerPos;
uniform vec2 uOpponentPos;
uniform vec3 uPlayerColor;
uniform vec3 uOpponentColor;
uniform float uWaveRadius;

varying vec2 vUv;
varying vec3 vPosition;

// Ciągłe pierścienie światła rozchodzące się od pozycji pojazdu (jak sonar) -
// gasną z odległością (falloff) i są ograniczone promieniem uWaveRadius,
// żeby nie zalewać całej planszy naraz.
float rippleGlow(vec2 fragXZ, vec2 sourceXZ) {
  float dist = distance(fragXZ, sourceXZ);
  if (dist > uWaveRadius) return 0.0;
  float ring = sin(dist * 2.0 - uTime * 4.0) * 0.5 + 0.5;
  ring = pow(ring, 4.0); // węższe, wyraźniejsze pierścienie zamiast rozlanej fali
  float falloff = 1.0 - smoothstep(0.0, uWaveRadius, dist);
  return ring * falloff;
}

void main() {
  vec2 gridPos = vPosition.xz / uGridSize;

  vec2 grid = abs(fract(gridPos - 0.5) - 0.5) / fwidth(gridPos);
  float line = min(grid.x, grid.y);

  float pulse = sin(uTime * uPulseSpeed) * 0.5 + 0.5;
  float lineAlpha = 1.0 - min(line, 1.0);

  vec3 baseColor = uColor * (0.3 + pulse * 0.7);

  float glowP = rippleGlow(vPosition.xz, uPlayerPos);
  float glowO = rippleGlow(vPosition.xz, uOpponentPos);
  vec3 glowColor = uPlayerColor * glowP + uOpponentColor * glowO;

  vec3 finalColor = baseColor + glowColor;
  float finalAlpha = clamp(lineAlpha * 0.6 + glowP + glowO, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, finalAlpha);
}
