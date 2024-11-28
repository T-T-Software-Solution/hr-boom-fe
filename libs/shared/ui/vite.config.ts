import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/shared/ui',

  plugins: [
    react(),
    nxViteTsPaths(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    watch: false,
    globals: true,
    testTransformMode: {
      web: ['node_modules/(?!pdfjs-dist)'],
    },
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/libs/shared/ui',
      provider: 'v8',
    },
  },
});
