import { defineConfig } from 'vite';

export default defineConfig({
  // Wersja 3D będzie żyć pod https://z0z6.github.io/TRON/3d/
  // obok istniejącej gry 2D w korzeniu repo (index.html) - jej NIE ruszamy.
  base: '/TRON/3d/',
  build: {
    // Build ląduje w katalogu 3d/ w korzeniu repo (poza src/),
    // żeby GitHub Pages mogło go serwować bez dodatkowej konfiguracji.
    outDir: '../3d',
    emptyOutDir: true,
  },
});
