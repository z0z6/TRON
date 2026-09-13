import * as THREE from 'three';
import { makeRand, disposeAwareAdd, applyHorizonFade, FLOOR_Y, ellipsePoint, buildStarfield } from './shared.js';

// === MATRIX: cyfrowy deszcz ===
// Wydzielone z pierwotnego BackgroundThemes.js - patrz shared.js po opis
// pomocniczych funkcji WSPÓLNYCH z innymi motywami.

// --- MATRIX: ściany cyfrowego deszczu -------------------------------------
// Prawdziwe znaki (cyfry/katakana-podobne symbole) wypalone w jednej,
// pionowej teksturze canvas, powielanej (RepeatWrapping) na wysokich,
// wąskich płaszczyznach ustawionych w pierścieniu wokół areny. Animacja
// "spadania" to przesuwanie texture.offset.y co klatkę - tanie, bez
// dotykania geometrii. Każda kolumna to DWIE płaszczyzny na krzyż (90°),
// żeby była widoczna z dowolnego kąta kamery, nie tylko "na wprost".
function buildMatrixCharacterTexture(rand, charSize = 26) {
  const canvas = document.createElement('canvas');
  // Szerokość canvasu skaluje się z rozmiarem znaku, żeby glify nie robiły
  // się ciasne/przycięte przy większej czcionce (wariant "dużych" strumieni).
  canvas.width = Math.round(80 * (charSize / 26));
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${charSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
  // Grupowanie znaków w cykliczne "komety" (jasne czoło -> gasnący ogon)
  // zamiast jednolicie losowej jasności każdego znaku z osobna. groupSize
  // znaków = jeden cykl; że tekstura powtarza się wiele razy wzdłuż
  // strumienia (repeat.set w addLayer niżej), na całej wysokości powstaje
  // kilka takich "komet" naraz, przesuwających się razem z przewijaniem
  // offsetu (updateMatrixBackground) - to właśnie daje wrażenie realnie
  // PRZESUWAJĄCYCH SIĘ znaków z wyraźnym czołem, a nie jednostajnego
  // skrzenia. trailFactor=1 na czole komety, opada do ~0 na jej końcu.
  const groupSize = 5 + Math.floor(rand() * 3); // 5-7 znaków na cykl
  let posInGroup = 0;
  for (let y = charSize / 2; y < canvas.height; y += charSize) {
    const ch = chars[Math.floor(rand() * chars.length)];
    const trailFactor = Math.pow(1 - posInGroup / groupSize, 2.2);
    const isHead = posInGroup === 0;

    if (isHead) {
      // Czoło komety: jaśniejszy kolor + delikatna poświata (shadowBlur,
      // tania w canvas 2D) - najbardziej "żywy" punkt cyklu.
      ctx.fillStyle = '#eaffea';
      ctx.shadowColor = '#aaffcc';
      ctx.shadowBlur = charSize * 0.5;
      ctx.globalAlpha = 0.95 + rand() * 0.05;
    } else {
      ctx.shadowBlur = 0;
      const bright = rand();
      ctx.fillStyle = bright < 0.08 ? '#eaffea' : '#3dff6e';
      // Baza jasności skalowana trailFactor (gasnący ogon), z minimalnym
      // podłogowym poziomem (0.1), żeby ogon nie znikał do zera nagle.
      ctx.globalAlpha = Math.max(0.1, trailFactor) * (0.75 + rand() * 0.25);
    }
    ctx.fillText(ch, canvas.width / 2, y);
    ctx.shadowBlur = 0;

    posInGroup = (posInGroup + 1) % groupSize;
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  // KLUCZOWA POPRAWKA: ta tekstura jest powtarzana WIELE razy wzdłuż
  // strumienia (texture.repeat.set(1, totalHeight/14) w addLayer niżej,
  // często 10+ powtórzeń). Domyślne mipmapowanie (generateMipmaps=true,
  // minFilter=LinearMipmapLinear) przy tylu powtórzeniach na stosunkowo
  // niewielkim obiekcie na ekranie ROZMYWA ciasno powtarzający się wzór w
  // gładką, prawie jednolitą barwę - to jest dokładnie ten efekt "prawie
  // jednolitych promieni bez widocznych znaków", o którym pisał użytkownik.
  // Wyłączenie mipmap + LinearFilter (zamiast domyślnego
  // LinearMipmapLinearFilter) trzyma wzór ostrym niezależnie od odległości.
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// density (0-1) skaluje liczbę strumieni (osobne Mesh, więc realny koszt
// draw calli - patrz PerformanceProfile.js) - szerokość poszczególnych
// strumieni zostaje bez zmian, jest mniej strumieni, nie węższe.
export function buildMatrixBackground(density = 1) {
  const rand = makeRand(7331);
  const group = new THREE.Group();
  // Spowalnia CAŁY deszcz (mnożnik na finalną prędkość każdego strumienia,
  // patrz "speed" w addLayer niżej) - na życzenie ZNACZNIE wolniej niż
  // wcześniej (0.14, było 0.35), żeby zamiast rozmytego, jednolitego
  // "skrzenia" dało się faktycznie odczytać przesuwające się pojedyncze
  // cyfry/litery/symbole (tekstura już ich używa - patrz
  // buildMatrixCharacterTexture powyżej - problemem była głównie zbyt
  // duża prędkość przewijania offsetu tekstury). Jeden wspólny mnożnik
  // zamiast osobnego przycinania speedMin/speedMax w każdym z trzech
  // wywołań addLayer niżej, żeby względne różnice prędkości między
  // warstwami (bliska/środkowa/daleka) zostały zachowane.
  const MATRIX_SPEED_MUL = 0.14;
  const baseTexture = buildMatrixCharacterTexture(rand, 26);
  // Wariant "dużych" strumieni - większe znaki (46px zamiast 26px), losowana
  // NIEZALEŻNIE dla części strumieni w każdej warstwie (patrz isBig w
  // addLayer niżej) i celowo dużo wolniejsza (patrz speed niżej) - efekt
  // kilku "ociężałych", grubszych sznurów znaków przebijających się przez
  // resztę, standardowej gęstości/prędkości deszczu.
  const bigTexture = buildMatrixCharacterTexture(rand, 46);
  // Wariant "małych" strumieni - mniejsze znaki (17px), na kontrast z
  // "dużymi" wyżej: razem dają wyraźniejsze wrażenie różnicy odległości od
  // widza (duże/bliskie vs małe/dalekie), niezależnie od samego promienia
  // warstwy (patrz isBig/isSmall w addLayer niżej).
  const smallTexture = buildMatrixCharacterTexture(rand, 17);
  const columns = [];

  // Jedna warstwa strumieni (wywoływana dwa razy - bliżej/dalej, patrz
  // niżej). Każdy strumień ma WŁASNY cykl życia (cycleDuration/cycleOffset)
  // - płynnie "rodzi się" (jakby zaczynał spływać z góry) i "kończy"
  // (zanika), zamiast być wiecznie niezmienną pętlą - patrz
  // updateMatrixBackground().
  function addLayer(count, radiusMin, radiusMax, heightMin, heightMax, opacity, speedMin, speedMax, widthMin, widthMax) {
    for (let c = 0; c < count; c++) {
      const angle = rand() * Math.PI * 2;
      const radius = radiusMin + rand() * (radiusMax - radiusMin);
      const visibleHeight = heightMin + rand() * (heightMax - heightMin);
      // Górna krawędź WSZYSTKICH strumieni w tej warstwie zaczyna się w tym
      // samym, stałym miejscu (FLOOR_Y + heightMax) - NIE przez
      // buryBelowFloor() (ta funkcja liczy topY = FLOOR_Y + visibleHeight,
      // co przy losowym visibleHeight per strumień dawało "postrzępioną",
      // niespójną górną krawędź całej warstwy - dokładnie to zgłosił
      // użytkownik: "niektóre zaczynają się coraz niżej"). visibleHeight
      // dalej losuje DŁUGOŚĆ widocznego odcinka (różne strumienie różnej
      // długości), ale odejmowaną w dół OD WSPÓLNEGO, stałego topu, a nie
      // przesuwającą sam top.
      // Fundamenty zejść niżej niż wcześniej (na życzenie: "niżej
      // fundamenty") - zakres podniesiony z 200-350 do 260-460.
      const buried = 260 + rand() * 200;
      const topY = FLOOR_Y + heightMax;
      const totalHeight = visibleHeight + buried;
      const centerY = topY - totalHeight / 2;

      // Trójwariantowy rozmiar (zamiast tylko duże/normalne): ~18% strumieni
      // wyraźnie WIĘKSZYCH (czyt. bliższych widzowi - duże, szerokie glify,
      // mocno spowolnione), ~18% wyraźnie MNIEJSZYCH (czyt. dalszych -
      // drobne, wąskie, przygaszone), reszta normalna. Razem z trzema
      // warstwami promienia (bliska/środkowa/daleka, patrz wywołania
      // addLayer niżej) daje to znacznie większe zróżnicowanie pozornej
      // odległości niż sama tylko odległość warstwy.
      const sizeRoll = rand();
      const isBig = sizeRoll < 0.18;
      const isSmall = !isBig && sizeRoll > 0.82;
      const texture = (isBig ? bigTexture : (isSmall ? smallTexture : baseTexture)).clone();
      texture.needsUpdate = true;
      texture.repeat.set(1, totalHeight / 14);
      texture.offset.y = rand();

      const material = new THREE.MeshBasicMaterial({
        map: texture, transparent: true, opacity: isSmall ? opacity * 0.75 : opacity,
        blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide
      });
      applyHorizonFade(material);
      const width = (widthMin + rand() * (widthMax - widthMin)) * (isBig ? 1.6 : (isSmall ? 0.65 : 1));
      const geometry = new THREE.PlaneGeometry(width, totalHeight);

      const cross = new THREE.Group();
      const plane1 = new THREE.Mesh(geometry, material);
      const plane2 = new THREE.Mesh(geometry, material);
      plane2.rotation.y = Math.PI / 2;
      cross.add(plane1, plane2);
      const { x: sx, z: sz } = ellipsePoint(angle, radius);
      cross.position.set(sx, centerY, sz);
      disposeAwareAdd(group, cross);

      const speed = isBig
        ? (speedMin * 0.35 + rand() * (speedMax - speedMin) * 0.35) * MATRIX_SPEED_MUL
        : (speedMin + rand() * (speedMax - speedMin)) * (isSmall ? 1.15 : 1) * MATRIX_SPEED_MUL;
      const cycleDuration = 5 + rand() * 12;
      columns.push({
        texture, material,
        speed,
        cycleDuration,
        cycleOffset: rand() * cycleDuration,
        baseOpacity: opacity
      });
    }
  }

  // Bliższa warstwa - mniej strumieni, ale szersze, jaśniejsze i szybsze.
  // Wierzchołki podniesione (heightMax 100→140 - na życzenie: "wyżej
  // wierzchołki") - promienie sięgają teraz wyraźnie wyżej ponad areną.
  addLayer(Math.max(20, Math.round(70 * density)), 300, 400, 55, 140, 0.9, 20, 45, 8, 15);
  // Środkowa warstwa - wypełnia lukę głębi między bliską a dalszą,
  // dodatkowo zagęszczając ścianę cyfr. Wierzchołki podniesione (120→170).
  addLayer(Math.max(15, Math.round(55 * density)), 380, 480, 60, 170, 0.65, 14, 32, 9, 16);
  // Dalsza warstwa - wolniejsze i przygaszone (głębia, paralaksa przy
  // skręcaniu kamery). Wierzchołki podniesione (150→200) - najdalsza
  // warstwa sięga teraz najwyżej, spójnie z bliższymi.
  addLayer(Math.max(25, Math.round(85 * density)), 480, 650, 70, 200, 0.42, 8, 20, 11, 19);

  group.userData.matrixColumns = columns;

  // Gwiazdy - deszcz sięga r=650/h=150 (patrz addLayer wyżej), więc gwiazdy
  // zaczynają się dopiero za nim. Ten motyw ma fogDensity=0.0 (bez mgły w
  // ogóle - patrz THEME_BACKGROUNDS niżej), więc bez tego pustka za
  // deszczem była całkiem czarna/pusta. Kolor ledwie muśnięty zielenią
  // (prawie biały) - to gwiazdy, nie kolejna warstwa deszczu, mają się od
  // niego odróżniać, nie z nim zlewać.
  disposeAwareAdd(group, buildStarfield(
    rand, Math.max(50, Math.round(140 * density)), 0xcdffd9, 700, 950, 170, 380
  ));

  return group;
}

export function updateMatrixBackground(group, elapsed, deltaTime) {
  const columns = group.userData.matrixColumns;
  if (!columns) return;
  for (const col of columns) {
    col.texture.offset.y -= col.speed * deltaTime;

    // Cykl życia strumienia - płynne pojawianie się (jakby zaczynał spływać
    // z góry) i zanikanie (jakby "kończył się"), zamiast wiecznie
    // niezmiennej pętli. Po dojściu do zera cykl zaczyna się od nowa w tym
    // samym miejscu - kolejny strumień "rodzi się" tam, gdzie poprzedni
    // właśnie zniknął.
    const t = (elapsed + col.cycleOffset) % col.cycleDuration;
    const fadeWindow = 1.0;
    const fadeIn = Math.min(1, t / fadeWindow);
    const fadeOut = Math.min(1, (col.cycleDuration - t) / fadeWindow);
    col.material.opacity = col.baseOpacity * Math.min(fadeIn, fadeOut);
  }
}

