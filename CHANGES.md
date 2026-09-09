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

## Jak przetestować po podmianie

```bash
cd src
npm install
npm test        # 22 testy Vitest — wszystkie powinny przejść
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
