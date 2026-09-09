// Prosty przełącznik logowania debugowego.
//
// Kod gry miał w sobie 32 wystąpienia console.log rozsiane po Game.js, AI.js
// i MultiplayerManager.js - w tym jedno logujące pozycję AI CO SEKUNDĘ przez
// całą rundę (AI.js#update). Nieszkodliwe funkcjonalnie, ale:
// - zapycha konsolę każdemu, kto ją otworzy (np. żeby zdiagnozować coś
//   innego), zagłuszając realne błędy/warningi,
// - budowanie stringów przez template literals + .toFixed() co klatkę w
//   AI.js to zbędna alokacja w hot path.
//
// Zamiast usuwać te logi całkowicie (są bywa przydatne przy realnym
// debugowaniu), chowamy je za jawnym przełącznikiem - domyślnie wyłączone.
//
// Włączanie (dowolne z):
//   - dopisanie ?debug=1 do adresu URL,
//   - w konsoli: localStorage.setItem('tron_debug', '1') i odświeżenie.
export const DEBUG = (() => {
  try {
    if (typeof window === 'undefined') return false;
    if (new URLSearchParams(window.location.search).get('debug') === '1') return true;
    return window.localStorage.getItem('tron_debug') === '1';
  } catch (e) {
    // Prywatne okno / localStorage zablokowane przez przeglądarkę - po
    // prostu zostajemy przy domyślnym "wyłączone", to nie jest błąd
    // krytyczny dla samej gry.
    return false;
  }
})();

export function debugLog(...args) {
  if (DEBUG) console.log(...args);
}
