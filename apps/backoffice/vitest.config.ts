import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: __dirname,

  plugins: [
    react(),
    nxViteTsPaths(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    include: [
      '{src,__tests__}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    // alias: {
    //   'pdfjs-dist/build/pdf.worker.min.mjs': path.resolve(__dirname, '/mock-pdf-worker.ts'),
    // },
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/backoffice',
      provider: 'v8',
    },
  },
});
