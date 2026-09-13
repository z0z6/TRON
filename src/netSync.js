/**
 * Czysta logika korekty dryfu pozycji zdalnego gracza w multiplayerze - bez
 * zależności od THREE, socket.io ani DOM (ten sam wzorzec co collision.js),
 * żeby dało się ją testować jednostkowo (patrz tests/netSync.test.js).
 *
 * KONTEKST: RemotePlayer.js symuluje ruch przeciwnika lokalnie i
 * deterministycznie - stała prędkość, kierunek zmieniany wyłącznie
 * zdarzeniami skrętu ('player-input'), patrz komentarz na górze
 * RemotePlayer.js. W teorii obie strony powinny więc zawsze widzieć
 * identyczną pozycję przeciwnika, ale w praktyce małe różnice w deltaTime
 * między przeglądarkami/urządzeniami (różne odświeżanie ekranu, chwilowe
 * zacięcia) kumulują się w czasie dłuższego meczu i mogą dać zauważalny
 * dryf. Obie strony okresowo wysyłają WŁASNĄ pozycję przez istniejący
 * kanał 'game-state-update' (patrz Game.js#update i MultiplayerManager.js);
 * ten moduł liczy, jak z odebraną, "prawdziwą" pozycją pogodzić to, co
 * lokalnie już narysowaliśmy jako ślad przeciwnika.
 *
 * Ta logika NIE decyduje o wyniku rundy (patrz Game.js#checkCollisions,
 * które nadal liczy kolizje wyłącznie na podstawie lokalnej symulacji) -
 * poprawia tylko to, co gracz WIDZI na ekranie.
 */

// Powyżej tego dystansu (w jednostkach siatki) korekta nie jest już
// "drobnym dryfem", tylko realnym rozjazdem (np. zakładka przeglądarki w
// tle przez kilka sekund, chwilowy lag spike) - płynne dociąganie
// zajęłoby wtedy zbyt długo, a przez ten czas lokalna detekcja kolizji
// liczyłaby się względem ewidentnie błędnej pozycji przeciwnika. W takim
// przypadku robimy twardy snap zamiast płynnej korekty.
export const SNAP_DISTANCE = 6;

// Ułamek różnicy pozycji dociągany przy KAŻDYM odebranym stanie sieciowym
// (nie na klatkę!) - przy typowym interwale wysyłki ~400ms (patrz
// RESYNC_INTERVAL_MS w Game.js) daje to widoczną, ale niegwałtowną
// korektę, bez efektu "rubber-bandingu" ani skoków śladu.
export const DEFAULT_CORRECTION_FACTOR = 0.25;

/**
 * Liczy skorygowaną pozycję {x,z} na podstawie lokalnie zasymulowanej
 * pozycji i autorytatywnej pozycji odebranej od przeciwnika.
 *
 * @param {{x:number,z:number}} currentPos lokalnie zasymulowana pozycja
 * @param {{x:number,z:number}} authoritativePos pozycja odebrana z sieci
 * @param {number} correctionFactor ułamek [0,1] dystansu dociągany od razu
 * @returns {{x:number,z:number,snapped:boolean}}
 */
export function reconcilePosition(currentPos, authoritativePos, correctionFactor = DEFAULT_CORRECTION_FACTOR) {
  const dx = authoritativePos.x - currentPos.x;
  const dz = authoritativePos.z - currentPos.z;
  const dist = Math.sqrt(dx * dx + dz * dz);

  if (dist === 0) {
    return { x: currentPos.x, z: currentPos.z, snapped: false };
  }

  if (dist > SNAP_DISTANCE) {
    return { x: authoritativePos.x, z: authoritativePos.z, snapped: true };
  }

  return {
    x: currentPos.x + dx * correctionFactor,
    z: currentPos.z + dz * correctionFactor,
    snapped: false
  };
}
