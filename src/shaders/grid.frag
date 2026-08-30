uniform float uTime;
uniform vec3 uColor;
uniform float uPulseSpeed;
uniform float uGridSize;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  // Oblicz pozycję w siatce
  vec2 gridPos = vPosition.xz / uGridSize;
  
  // Linie siatki
  vec2 grid = abs(fract(gridPos - 0.5) - 0.5) / fwidth(gridPos);
  float line = min(grid.x, grid.y);
  
  // Pulsowanie
  float pulse = sin(uTime * uPulseSpeed) * 0.5 + 0.5;
  float alpha = 1.0 - min(line, 1.0);
  
  // Kolor z pulsowaniem
  vec3 finalColor = uColor * (0.3 + pulse * 0.7);
  
  gl_FragColor = vec4(finalColor, alpha * 0.6);
}
