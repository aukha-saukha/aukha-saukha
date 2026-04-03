// Copyright (c) 2026 Aukha Saukha and its affiliates.
// SPDX-License-Identifier: MIT

/** @type {import('prettier').Config} */

export default {
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
  plugins: ['prettier-plugin-astro'],
  printWidth: 100,
  proseWrap: 'always',
  singleQuote: true,
};
