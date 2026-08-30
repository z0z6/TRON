import * as THREE from 'three';

/**
 * Otoczenie areny w stylu synthwave/outrun (odtworzone proceduralnie na
 * podstawie referencyjnej grafiki - gradient nieba, słońce z poziomymi
 * paskami, druciankowe góry po bokach, pionowe belki światła).
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
    this._buildSun();
    this._buildMountains();
    this._buildLightBeams();

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

  _buildSun() {
    // Słońce: krąg z ciepłym gradientem promienistym od środka do brzegu,
    // plus poziome, ciemne paski w dolnej połowie (klasyczny retro-sun
    // efekt "scanline") i miękka poświata w tle (druga, większa, bardziej
    // przezroczysta tarcza).
    const geometry = new THREE.CircleGeometry(28, 64);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uCoreColor: { value: new THREE.Color(0xfff3c4) },
        uMidColor: { value: new THREE.Color(0xff9a5c) },
        uEdgeColor: { value: new THREE.Color(0xff2f9e) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uCoreColor;
        uniform vec3 uMidColor;
        uniform vec3 uEdgeColor;
        varying vec2 vUv;

        void main() {
          vec2 centered = vUv - 0.5;
          float dist = length(centered) * 2.0;
          if (dist > 1.0) discard;

          vec3 color = mix(uCoreColor, uMidColor, smoothstep(0.0, 0.6, dist));
          color = mix(color, uEdgeColor, smoothstep(0.6, 1.0, dist));

          // Poziome paski "wycinające" dolną część słońca - gęstsze bliżej
          // dołu, jak w klasycznym retro-sun.
          float y = vUv.y;
          float bandMask = 1.0;
          if (y < 0.45) {
            float bandPos = (0.45 - y) * 26.0;
            float band = fract(bandPos * bandPos * 0.05 + bandPos);
            bandMask = step(0.35, band);
          }

          float alpha = bandMask;
          gl_FragColor = vec4(color, alpha);
        }
      `
    });

    this.sunMesh = new THREE.Mesh(geometry, material);
    this.sunMesh.position.set(0, 6, -140);
    this.group.add(this.sunMesh);

    // Miękka poświata za słońcem (dodatkowa, większa, rozmyta tarcza)
    const glowGeometry = new THREE.CircleGeometry(46, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(0xff6fa3) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float alpha = smoothstep(1.0, 0.0, dist) * 0.35;
          gl_FragColor = vec4(uColor, alpha);
        }
      `
    });
    this.sunGlowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    this.sunGlowMesh.position.copy(this.sunMesh.position);
    this.sunGlowMesh.position.z -= 0.5;
    this.group.add(this.sunGlowMesh);
  }

  _buildMountains() {
    // Niskopoligonowe "góry" po obu stronach areny, renderowane jako
    // druciankowa siatka (EdgesGeometry) w cyanie. Celowo BARDZO mało
    // segmentów - gęsta siatka daje w EdgesGeometry chaotyczną plątaninę linii
    // zamiast czytelnej, kanciastej grani jak na referencyjnej grafice.
    this.mountainGroups = [];

    const buildRange = (xOffset, zStart, width, depth, peakHeight, widthSegments, color, opacity) => {
      const depthSegments = 3;
      const geometry = new THREE.PlaneGeometry(width, depth, widthSegments, depthSegments);
      const posAttr = geometry.attributes.position;

      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const localZ = posAttr.getY(i); // przed rotacją X, Y geometrii to lokalne Z
        // Zanikanie wysokości w stronę dalszej krawędzi (góry "wyrastają"
        // tylko od strony areny, płasko przy dalszej krawędzi płaszczyzny)
        const edgeFade = Math.max(0, Math.min(1, (localZ + depth / 2) / (depth * 0.7)));
        // Gładka sylwetka grani - tylko dwie częstotliwości, bez losowego
        // jittera per-wierzchołek (to on powodował chaos wcześniej)
        const ridge = Math.sin(x * 0.18 + xOffset * 0.5) * 0.6 + Math.sin(x * 0.42 + 1.3) * 0.4;
        const height = Math.max(0, ridge * peakHeight * (1 - edgeFade));
        posAttr.setZ(i, height);
      }
      geometry.computeVertexNormals();
      geometry.rotateX(-Math.PI / 2);

      const edges = new THREE.EdgesGeometry(geometry, 20);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity
      });
      const wireframe = new THREE.LineSegments(edges, material);
      wireframe.position.set(xOffset, 0, zStart);
      this.group.add(wireframe);
      this.mountainGroups.push(wireframe);
    };

    // Bliższa grań (ostrzejsza, jaśniejsza) + dalsza warstwa (niższa, cichsza) dla głębi
    buildRange(-70, -60, 90, 100, 22, 9, 0x29e0ff, 0.9);
    buildRange(70, -60, 90, 100, 22, 9, 0x29e0ff, 0.9);
    buildRange(-100, -100, 70, 90, 14, 7, 0x1f9fd6, 0.45);
    buildRange(100, -100, 70, 90, 14, 7, 0x1f9fd6, 0.45);
  }

  _buildLightBeams() {
    // Cienkie, świecące pionowe belki - pozycjonowane BLIŻEJ areny niż góry
    // (mniejsze |x|/|z|), żeby nie ginęły w gęstwinie drucianej grani, tak
    // jak w referencyjnej grafice, gdzie belki stoją wyraźnie przed górami.
    this.beamGroup = new THREE.Group();
    const positions = [
      [-38, -15], [-30, -35], [-48, -50], [-24, -55], [-42, -8],
      [38, -15], [30, -35], [48, -50], [24, -55], [42, -8]
    ];

    positions.forEach(([x, z], i) => {
      const height = 16 + pseudoRandomLocal(i) * 20;
      const geometry = new THREE.CylinderGeometry(0.35, 0.35, height, 6);
      const material = new THREE.MeshBasicMaterial({
        color: 0x8ff5ff,
        transparent: true,
        opacity: 0.85
      });
      const beam = new THREE.Mesh(geometry, material);
      beam.position.set(x, height / 2, z);
      this.beamGroup.add(beam);
    });

    function pseudoRandomLocal(seed) {
      const x = Math.sin(seed * 78.233) * 43758.5453;
      return x - Math.floor(x);
    }

    this.group.add(this.beamGroup);
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scene.remove(this.group);
  }
}
