import { buildClassicBackground, updateClassicBackground } from './classic.js';
import { buildSynthwaveBackground, updateSynthwaveBackground } from './synthwave.js';
import { buildMatrixBackground, updateMatrixBackground } from './matrix.js';
import { buildAmberBackground, updateAmberBackground } from './amber.js';
import { buildGlacierBackground, updateGlacierBackground } from './glacier.js';

// === PUBLICZNY REJESTR ===
// fogDensity per motyw - KOLOR mgły dalej pochodzi z theme.bg (main.js),
// tu ustalamy tylko, jak "gęsto"/szybko tło znika w oddali dla danego
// klimatu (matrix: bez mgły w ogóle, ostre krawędzie jak w filmie; glacier:
// gęściej, jak zamglona, mroźna dal).
//
// Każdy motyw to: build() -> THREE.Group (elementy sceny) i opcjonalnie
// update(group, elapsed, deltaTime) dla animowanych elementów (np. spadający
// "deszcz" w motywie matrix, migoczące światła w classic). Environment.js
// (setTheme) zarządza tym, KTÓRY motyw jest aktywny - ten plik (i moduły
// classic.js/synthwave.js/matrix.js/amber.js/glacier.js/shared.js, na które
// się rozpada) zna tylko, JAK zbudować każdy z nich.
export const THEME_BACKGROUNDS = {
  classic: { build: buildClassicBackground, fogDensity: 0.0022, update: updateClassicBackground },
  synthwave: { build: buildSynthwaveBackground, fogDensity: 0.0035, update: updateSynthwaveBackground },
  matrix: { build: buildMatrixBackground, fogDensity: 0.0, update: updateMatrixBackground },
  amber: { build: buildAmberBackground, fogDensity: 0.0035, update: updateAmberBackground },
  glacier: { build: buildGlacierBackground, fogDensity: 0.005, update: updateGlacierBackground }
};
