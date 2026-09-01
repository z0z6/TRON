import * as THREE from 'three';

/**
 * Otoczenie areny w stylu synthwave/outrun - proceduralne, animowane tło
 * (raymarching przez warstwy zniekształconego szumu, oryginalnie z
 * ShaderToy) oraz nieprzezroczysta podłoga pod siatką gry.
 *
 * Tło jest renderowane jako OSOBNY, pełnoekranowy przebieg w przestrzeni
 * ekranu (ortho kamera + quad na cały ekran), a nie jako geometria 3D w
 * świecie gry - dokładnie tak samo jak działał oryginalny shader na
 * ShaderToy, który sam definiuje "kierunek promienia" na podstawie piksela
 * (fragCoord/resolution), niezależnie od kamery/perspektywy właściwej sceny.
 *
 * Celowo NIE używa żadnej bitmapy/zdjęcia - wszystko jest generowane przez
 * shadery i geometrię proceduralną. Dzięki temu skaluje się z kamerą bez
 * pikselozy/rozciągania, których nie dałoby się uniknąć przy nałożeniu
 * statycznego zdjęcia na sferę czy płaszczyznę tła.
 */
export class SynthwaveEnvironment {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.group = new THREE.Group();

    // Ciężki shader (raymarching, 99 kroków x 5 oktaw szumu NA PIKSEL) -
    // na telefonie to realne obciążenie GPU obok samej gry. Na urządzeniach
    // dotykowych (typowo słabszy GPU niż desktop) używamy znacznie mniej
    // kroków, żeby nie ścinać klatek na Androidzie.
    const isTouchDevice = options.isTouchDevice ?? (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(hover: none) and (pointer: coarse)').matches
    );
    this.raymarchSteps = isTouchDevice ? 40 : 99;

    this._buildRaymarchBackground();
    this._buildFloorBase();

    this.scene.add(this.group);
  }

  _buildFloorBase() {
    // Nieprzezroczysta, ciemnogranatowa płaszczyzna TUŻ pod siatką gry -
    // siatka (Grid.js) rysuje tylko linie z przezroczystymi przerwami między
    // nimi, więc bez tej bazy przez te przerwy byłoby widać tło (teraz
    // shader tunelu) zamiast spójnej, ciemnej podłogi.
    const geometry = new THREE.PlaneGeometry(400, 400);
    const material = new THREE.MeshBasicMaterial({ color: 0x0a0a2e });
    this.floorBase = new THREE.Mesh(geometry, material);
    this.floorBase.rotation.x = -Math.PI / 2;
    this.floorBase.position.y = -0.55;
    this.group.add(this.floorBase);
  }

  _buildRaymarchBackground() {
    this.bgScene = new THREE.Scene();
    // Ortho kamera [-1,1]x[-1,1] + quad dokładnie wypełniający clip space -
    // to standardowy trik na "pełnoekranowy shader" w Three.js, odpowiednik
    // pełnoekranowego fragment shadera na ShaderToy.
    this.bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.bgMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      depthTest: false,
      uniforms: {
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_time: { value: 0 }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      // Shader wprost z ShaderToy (mainImage -> main, iResolution -> 
      // u_resolution, iTime -> u_time, fragCoord -> gl_FragCoord.xy).
      // JEDNA różnica: GLSL ES 1.00 (domyślny tryb ShaderMaterial w
      // Three.js) nie ma wbudowanego tanh() - to funkcja z GLSL ES 3.00.
      // Zamiast przełączać cały materiał na GLSL3 (więcej zmian składni,
      // wymaga WebGL2), dopisujemy własną, numerycznie bezpieczną
      // (clamp przed exp, żeby uniknąć Inf/NaN) implementację tanh dla vec4.
      fragmentShader: `
        precision highp float;

        uniform vec2 u_resolution;
        uniform float u_time;

        vec4 tanh4(vec4 x) {
          vec4 cx = clamp(x, -15.0, 15.0);
          vec4 e2x = exp(2.0 * cx);
          return (e2x - 1.0) / (e2x + 1.0);
        }

        void main() {
          vec4 O = vec4(0.0);
          float z = 0.0;
          float d = 0.0;

          vec2 R = u_resolution;
          float T = u_time;
          vec2 fragCoord = gl_FragCoord.xy;

          for (int i = 0; i < ${this.raymarchSteps}; i++) {
            vec3 p = z * normalize(vec3(2.0 * fragCoord - R, R.y));
            p.z -= T;

            d = 1.0;
            for (int j = 0; j < 5; j++) {
              d += d;
              p += sin(p * d + p.z * d) / d;
            }

            d = 0.1 * length(1.0 + p.xy * sin(p.z + vec2(0.0, 2.0)));
            z += d;

            O += (0.7 - p.y / z * vec4(0.0, 1.0, 2.0, 1.0)) / d;
          }

          gl_FragColor = tanh4(O / 2000.0);
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    this.bgMesh = new THREE.Mesh(geometry, this.bgMaterial);
    this.bgScene.add(this.bgMesh);
  }

  // Wywoływać co klatkę (np. z tym samym `timeInSeconds`, którego już
  // używa Grid.update() w main.js) - animuje przepływ tunelu.
  update(elapsedTime) {
    if (this.bgMaterial) {
      this.bgMaterial.uniforms.u_time.value = elapsedTime;
    }
  }

  // Wywoływać przy starcie i przy każdym resize/zmianie orientacji (razem
  // z renderer.setSize) - shader liczy proporcje piksela na podstawie
  // rozdzielczości, więc musi znać aktualny rozmiar canvasu.
  setSize(width, height) {
    if (this.bgMaterial) {
      this.bgMaterial.uniforms.u_resolution.value.set(width, height);
    }
  }

  // Renderuje tło JAKO OSOBNY PRZEBIEG. Samo NIE zarządza czyszczeniem
  // bufora - to robi wywołujący (main.js), bo autoClear jest ustawione na
  // false na cały czas działania gry (dwa kolejne przebiegi renderowania w
  // jednej klatce - tło, potem właściwa scena - wymagają ręcznej kontroli
  // nad tym, kiedy dokładnie czyścić color/depth, patrz animate() w main.js).
  renderBackground(renderer) {
    if (!this.bgScene) return;
    renderer.render(this.bgScene, this.bgCamera);
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scene.remove(this.group);

    if (this.bgMesh) {
      this.bgMesh.geometry.dispose();
      this.bgMesh.material.dispose();
    }
  }
}
