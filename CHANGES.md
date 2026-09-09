# Zmiany do podmiany

Wszystkie pliki w tym archiwum mają dokładnie tę samą ścieżkę względem
korzenia repo `TRON/`, więc wystarczy je nadpisać/dodać один po drugim.

## Nowe pliki
- `.gitignore`
- `src/collision.js` — czysta logika kolizji wydzielona z `Game.js`
- `src/eslint.config.mjs` — konfiguracja ESLint (flat config, ESLint 9)
- `src/.prettierrc.json`
- `src/tests/collision.test.js` — 17 testów Vitest
- `src/tests/trail.test.js` — 5 testów Vitest

## Zmienione pliki
- `src/Game.js` — deleguje `_sweepCells` / `_cellsHitDanger` /
  `_minDistanceToDanger` / `_pointToSegmentDistance` do `collision.js`
  zamiast trzymać zduplikowaną logikę. Zachowanie identyczne (build
  produkcyjny przechodzi bez zmian w API klasy `Game`).
- `src/Trail.js` — przepisany, żeby nie alokować nowej tablicy/
  `BufferAttribute` co klatkę. Publiczne API (`start`, `update`, `points`,
  `dispose`, `setColor`) bez zmian, więc nic innego w kodzie nie trzeba
  ruszać.
- `src/server.js` — walidacja `roomId`/`action` na wszystkich handlerach
  socketów + rate-limit na `create-room` (5/min/socket). WCIĄŻ jest to
  serwer typu "relay" — nie liczy kolizji ani nie rozstrzyga zwycięzcy po
  swojej stronie, więc klient modyfikujący lokalnie `Game.js` może wciąż
  oszukiwać co do WYNIKU rundy. To świadomie zaakceptowane ograniczenie
  tej wersji; pełne przeniesienie logiki gry na serwer (autorytatywny
  serwer) to osobna, dużo większa zmiana, o którą warto zapytać osobno,
  jeśli chcesz iść w tę stronę.
- `src/PowerUpSystem.js` — poprawka realnego błędu złapanego przez lint
  (`case 'speed':` bez `{}` wokół deklaracji `const` — potencjalny wyciek
  zmiennej między gałęziami `switch`).
- `src/package.json` — dodane `devDependencies` (`vitest`, `eslint`,
  `@eslint/js`, `globals`, `prettier`) i skrypty `test`, `test:watch`,
  `lint`, `format`.

## Runda 2 — poprawki graficzne (nowe/zmienione w tej paczce)
- `src/main.js` — `renderer.toneMapping = THREE.ACESFilmicToneMapping` +
  `toneMappingExposure = 1.1`. Jasne, addytywnie mieszane neony (ślady,
  bloom) teraz miękko wysycają się przy górnej granicy jasności zamiast
  się urywać do czystej bieli. `OutputPass`, już obecny w composerze,
  sam odczytuje to ustawienie z renderera — nic więcej nie trzeba było
  zmieniać.
- `src/Effects.js` — cząsteczki `DerezzEffect` mają teraz miękką,
  radialno-gradientową teksturę (`getParticleSpriteTexture()`, canvas
  generowany raz i współdzielony między wybuchami) zamiast domyślnych,
  twardych kwadratów z gołego `PointsMaterial`.
- `src/CameraController.js` — nowe `updateFov(speedRatio, deltaTime)`
  (płynnie poszerza FOV przy boostcie prędkości) i `resetFov()` (twardy
  reset na starcie rundy, żeby FOV nie "zamroziło się" szerokie po
  śmierci w trakcie boosta).
- `src/Game.js` — stała `BASE_PLAYER_SPEED = 10` (zamiast powielonych
  literałów `10`), wywołanie `cameraController.updateFov(...)` co klatkę
  obok `follow()`, oraz `cameraController.resetFov()` w
  `startSinglePlayer()`, `startMultiplayer()` i `restart()`.
- `src/tests/cameraFov.test.js` — 7 nowych testów Vitest na logikę FOV
  kicka (brak zmiany przy speedRatio=1, płynne dochodzenie do celu,
  clamp przy bardzo wysokim ratio, powrót do bazy, `resetFov()`
  natychmiastowy vs `updateFov()` wygładzany).

Łącznie testów w paczce: **29** (17 collision + 5 trail + 7 fov),
wszystkie zielone; `npm run lint` bez błędów; `npm run build` przechodzi.

## Runda 3 — dokończenie wizualnej listy (nowe/zmienione w tej paczce)

### Scena 3D
- `src/Trail.js` — materiał śladu zamieniony z `MeshBasicMaterial` na
  prosty `ShaderMaterial` z pionowym gradientem: jasny, rozjaśniony rdzeń
  koloru gracza blisko podłoża (y=0), gasnący do pełnej barwy i większej
  przezroczystości ku górze. Bufor geometrii/`drawRange` z Rundy 1 —
  bez zmian, tylko materiał się różni. `setColor()` zapisuje teraz do
  `material.uniforms.uColor` zamiast `material.color`.
- `src/LightCycleModel.js` — "blob shadow" (płaski, miękko rozmyty dysk
  cienia) pod każdym motocyklem (gracz/AI/przeciwnik sieciowy — dodany raz,
  w `createLightCycleMesh()`, więc automatycznie trafia do wszystkich
  trzech). Geometria WSPÓŁDZIELONA (jak geometrie modelu GLTF — nigdy nie
  disposowana per-instancja), materiał tworzony świeżo per motocykl (bo
  `AI.js`/`RemotePlayer.js` `dispose()` bezwarunkowo disposuje każdy
  materiał znaleziony przez `traverse()` — współdzielony materiał by się
  tu połamał przy zniszczeniu jednego motocykla).

### UI / HUD
- `src/index.html`:
  - Font **Orbitron** (Google Fonts, z fallbackiem identycznym jak
    poprzedni sztywny stos) przez nową zmienną `--font-display`,
    podmienioną we wszystkich 8 miejscach, gdzie wcześniej był
    zaszyty `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`. Liczby
    HUD-u (monospace/Courier) — bez zmian, to świadomy kontrast.
  - **Ekran ładowania** (`#loadingOverlay`) — widoczny od razu, ukrywany
    w `main.js` zaraz po `preloadLightCycleTemplate()`. Jeśli preload się
    nie powiedzie, globalny łapacz błędów w `index.html` też go chowa
    (żeby nie zasłaniał komunikatu o błędzie).
- `src/VignettePass.js` — nowy plik: tani fullscreen `ShaderPass`
  (vignette + bardzo subtelne skanlinie), dopięty w `main.js` do
  istniejącego `EffectComposer` między bloomem a `OutputPass`. Gaszony na
  "low" tierze tą samą flagą co bloom (`quality.bloom`). Aktualizowany
  przy resize razem z `bloomPass.setSize(...)`.

Testy jednostkowe bez zmian liczbowych względem Rundy 2 (29) — zmiany w
tej rundzie są czysto wizualne/DOM, poza zasięgiem obecnych testów, które
celowo sprawdzają tylko logikę, nie renderowanie. `npm run lint`: 0
błędów. `npm run build`: przechodzi (69 modułów, +1 za `VignettePass.js`).

## Jak przetestować po podmianie



```bash
cd src
npm install
npm test        # 29 testów Vitest — wszystkie powinny przejść
npm run lint     # 0 błędów, kilka niegroźnych warningów w niezmienionym kodzie
npm run build    # sanity check, że produkcyjny build wciąż się buduje
npm run dev      # zwykła gra w przeglądarce - single player powinien wyglądać identycznie
```

Multiplayer: `npm run start` (serwer) + `npm run dev` (klient) jak
dotychczas — zmiany w `server.js` są przezroczyste dla poprawnych
requestów, więc normalna rozgrywka 1v1 powinna działać tak jak wcześniej.
Różnica widoczna tylko przy nieprawidłowych/złośliwych danych (np. ktoś
ręcznie wywoła `socket.emit('join-room', {roomId: '<script>...'})` z
konsoli) — te teraz są grzecznie odrzucane zamiast przechodzić dalej.

Wszystko powyższe zostało już uruchomione i zweryfikowane w trakcie
przygotowywania tej paczki (testy, lint, build, oraz smoke test serwera
prawdziwym klientem socket.io) — patrz opis w rozmowie.
