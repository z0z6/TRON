# TRON — Light Cycles

Przeglądarkowa gra w stylu klasycznych *Light Cycles* z filmu TRON: sterujesz
motocyklem zostawiającym za sobą świetlny ślad, przegrywa ten, kto wjedzie w
ślad (swój lub przeciwnika) albo w granicę planszy.

Repo zawiera dwie wersje gry pod jednym landing page'em (`index.html` w
korzeniu):

- **`2d/`** — prosta wersja 2D (statyczny HTML/JS, bez buildu).
- **`3d/`** — wersja 3D (Three.js), zbudowana z `src/` przez Vite; ma AI
  przeciwnika, multiplayer online, power-upy, system osiągnięć i motywy
  graficzne.

Kod źródłowy wersji 3D (ten, który się realnie edytuje) leży w `src/` —
`3d/` to zbudowany z niego bundle, generowany automatycznie przy każdym pushu
do `main` (patrz `.github/workflows/build-3d.yml`) i publikowany przez
GitHub Pages.

## Szybki start (wersja 3D, tryb dev)

```bash
cd src
npm install
npm run dev
```

Otwórz adres, który wypisze Vite (domyślnie `http://localhost:5173`).
W tym trybie **multiplayer online nie zadziała** — potrzebuje osobno
uruchomionego serwera WebSocket:

```bash
cd src
npm run start        # albo: npm run server-dev (z auto-restartem przez nodemon)
```

Serwer multiplayer nasłuchuje domyślnie na porcie `3000` (zmienna
środowiskowa `PORT`). Klient łączy się z nim przez `MultiplayerManager.js` —
adres serwera trzeba mieć osiągalny z przeglądarki (lokalnie to
`http://localhost:3000`).

### Zmienne środowiskowe serwera (`src/server.js`)

| Zmienna         | Domyślnie | Znaczenie                                                                 |
| --------------- | --------- | -------------------------------------------------------------------------- |
| `PORT`          | `3000`    | Port, na którym nasłuchuje serwer WebSocket.                              |
| `ALLOWED_ORIGIN`| `*`       | Origin dozwolony w CORS (na produkcji ustaw na dokładny adres frontendu). |
| `TRON_DEBUG`    | wyłączone | `1` włącza logowanie połączeń/pokoi w konsoli serwera.                    |

### Build produkcyjny wersji 3D

```bash
cd src
npm run build      # ląduje w ../3d (czyli w 3d/ w korzeniu repo)
npm run preview    # podgląd builda lokalnie
```

Zwykle nie trzeba tego odpalać ręcznie — robi to CI przy każdym pushu do
`main`, który dotyka `src/**` (patrz `.github/workflows/build-3d.yml`).

## Sterowanie (wersja 3D)

| Klawisz            | Akcja                                          |
| ------------------- | ----------------------------------------------- |
| Spacja / Enter       | Start rundy (single-player)                     |
| ← / A, → / D         | Skręt w lewo / w prawo                          |
| **1**                | Zmiana trudności AI (easy/medium/hard) przed startem rundy |
| R                    | Restart rundy (tylko single-player)             |
| C                    | Zmiana trybu kamery                             |
| M                    | Wyciszenie dźwięku                              |
| L                    | Otwórz lobby multiplayer                        |
| P                    | Pauza                                           |
| Esc                  | Wyjście do menu wyboru wersji                   |

Na urządzeniach dotykowych sterowanie dostępne jest przez wirtualny
D-pad i przyciski funkcyjne widoczne w grze.

## Debugowanie

Konsola przeglądarki domyślnie milczy poza jedną ściągawką sterowania przy
starcie. Żeby włączyć pełne logi diagnostyczne (pozycje jednostek, zdarzenia
sieciowe, stan pokoi):

- dopisz `?debug=1` do adresu URL, **albo**
- w konsoli: `localStorage.setItem('tron_debug', '1')` i odśwież stronę.

## Struktura repo

```
index.html          # landing page - wybór wersji 2D/3D
2d/                  # wersja 2D (statyczna)
3d/                  # ZBUDOWANA wersja 3D (generowana z src/, nie edytuj ręcznie)
src/                 # źródła wersji 3D
  main.js            # renderer, pętla gry, UI/HUD, sterowanie
  Game.js            # stan gry, ruch, kolizje, punktacja, przebieg rundy
  AI.js              # przeciwnik sterowany komputerowo (BFS + trudność)
  RemotePlayer.js     # przeciwnik sterowany siecią (multiplayer)
  MultiplayerManager.js # klient WebSocket (Socket.io)
  server.js          # serwer WebSocket - relay pokoi multiplayer
  Trail.js           # wizualny ślad świetlny (geometria)
  Grid.js, ArenaGround*.js, Environment.js, BackgroundThemes.js # scena i motywy
  PowerUpSystem.js, ScoringSystem.js, AchievementSystem.js      # systemy gry
  LightCycleModel.js # ładowanie modelu GLTF motocykla
  shaders/           # shadery GLSL siatki areny
CREDITS.md           # licencje zasobów zewnętrznych (model 3D)
```

## Wymagania

- Node.js 20.x (patrz `engines` w `src/package.json`)
- Nowoczesna przeglądarka ze wsparciem WebGL2

## Licencja zasobów

Model motocykla użyty w wersji 3D pochodzi spod licencji CC-BY-4.0 — pełne
informacje w [`CREDITS.md`](./CREDITS.md).
