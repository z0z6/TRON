// Ten plik był kiedyś jednym, 1515-liniowym modułem ze wszystkimi motywami
// tła naraz. Rozbity na backgroundThemes/{shared,classic,synthwave,matrix,
// amber,glacier,index}.js dla czytelności/łatwiejszego dodawania kolejnych
// motywów - ten plik zostaje jako cienki re-eksport pod TĄ SAMĄ ścieżką, o
// którą pyta Environment.js (jedyny zewnętrzny konsument, patrz
// `import { THEME_BACKGROUNDS } from './BackgroundThemes.js'`), żeby nie
// trzeba było niczego tam zmieniać.
export { THEME_BACKGROUNDS } from './backgroundThemes/index.js';
