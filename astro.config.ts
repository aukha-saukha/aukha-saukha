// Copyright (c) 2026 Aukha Saukha and its affiliates.
// SPDX-License-Identifier: MIT

import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],

  vite: {
    resolve: {
      // Please keep these aliases in sync with tsconfig.json (compilerOptions.paths)
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@pages': '/src/pages',
        '@types': '/src/types',
      },
    },
  },
});
