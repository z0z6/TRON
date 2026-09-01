import * as THREE from 'three';

/**
 * Otoczenie areny w stylu synthwave/outrun - gradient nieba w formie kopuły
 * oraz nieprzezroczysta podłoga pod siatką gry.
 *
 * Celowo NIE używa żadnej bitmapy/zdjęcia - wszystko jest generowane przez
 * shadery i geometrię proceduralną. Dzięki temu skaluje się z kamerą bez
 * pikselozy/rozciągania, których nie dałoby się uniknąć przy nałożeniu
 * statycznego zdjęcia na sferę czy płaszczyznę tła.
 */
export class SynthwaveEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();

    this._buildSky();
    this._buildFloorBase();

    this.scene.add(this.group);
  }

  _buildFloorBase() {
    // Nieprzezroczysta, ciemnogranatowa płaszczyzna TUŻ pod siatką gry -
    // siatka (Grid.js) rysuje tylko linie z przezroczystymi przerwami między
    // nimi, więc bez tej bazy przez te przerwy byłoby widać odległą kopułę
    // nieba (różową blisko horyzontu) zamiast spójnej, ciemnej podłogi.
    const geometry = new THREE.PlaneGeometry(400, 400);
    const material = new THREE.MeshBasicMaterial({ color: 0x0a0a2e });
    this.floorBase = new THREE.Mesh(geometry, material);
    this.floorBase.rotation.x = -Math.PI / 2;
    this.floorBase.position.y = -0.55;
    this.group.add(this.floorBase);
  }

  _buildSky() {
    // Duża sfera (BackSide - renderujemy jej wnętrze) z pionowym gradientem:
    // ciemny fiolet na górze -> magenta bliżej horyzontu. To zastępuje płaskie
    // tło sceny.
    const geometry = new THREE.SphereGeometry(400, 32, 24);

    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTopColor: { value: new THREE.Color(0x0c0420) },
        uMidColor: { value: new THREE.Color(0x3a1259) },
        uHorizonColor: { value: new THREE.Color(0xd61f8a) }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uTopColor;
        uniform vec3 uMidColor;
        uniform vec3 uHorizonColor;
        varying vec3 vWorldPosition;

        void main() {
          float h = normalize(vWorldPosition).y;
          // Kamera jest wysoko i patrzy STROMO W DÓŁ na arenę (nigdy nie
          // celuje w prawdziwy zenit), więc cały widoczny pasek "nieba"
          // odpowiada UJEMNEMU zakresowi h - progi dobrane empirycznie pod
          // kątem patrzenia kamery zdefiniowany w main.js (pozycja (0,30,30)
          // patrząca na (0,0,0)), nie pod założeniem kamery poziomej.
          float tHorizon = smoothstep(-0.5, -0.08, h);
          float tTop = smoothstep(-0.08, 0.05, h);

          vec3 color = mix(uHorizonColor, uMidColor, tHorizon);
          color = mix(color, uTopColor, tTop);

          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    this.skyMesh = new THREE.Mesh(geometry, material);
    this.group.add(this.skyMesh);
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scene.remove(this.group);
  }
}
