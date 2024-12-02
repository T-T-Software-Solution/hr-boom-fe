import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import type { Config } from 'tailwindcss';
import sharedPreset from '../../tailwind.preset';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: [
    path.join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.test).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [sharedPreset],
};

export default config;
