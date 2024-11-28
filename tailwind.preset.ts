import type { Config } from 'tailwindcss';

import tailwindAnimate from 'tailwindcss-animate';

const config: Omit<Config, 'content'> = {
  mode: 'jit',
  darkMode: ['selector', '[data-mantine-color-scheme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [tailwindAnimate],
};

export default config;
