// Copyright (c) 2026 Aukha Saukha and its affiliates.
// SPDX-License-Identifier: MIT

/** @type { import("cspell").CSpellSettings } */

const filesPatternsToCheck = [
  '**/*.{astro,css,html,js,json,jsonc,jsx,md,mdx,scss,ts,tsx}',
  '.github/**/*.{json,yaml,yml}',
  '.husky/*',
  '.vscode/**/*.{code-snippets,json}',
];

export default {
  dictionaries: ['domain-terms', 'engineering-terms', 'hindi', 'people', 'product-names'],
  dictionaryDefinitions: [
    {
      addWords: true,
      name: 'domain-terms',
      path: './.cspell/dictionaries/domain-terms.txt',
    },
    {
      addWords: true,
      name: 'engineering-terms',
      path: './.cspell/dictionaries/engineering-terms.txt',
    },
    {
      addWords: true,
      name: 'hindi',
      path: './.cspell/dictionaries/hindi.txt',
    },
    {
      addWords: true,
      name: 'people',
      path: './.cspell/dictionaries/people.txt',
    },
    {
      addWords: true,
      name: 'product-names',
      path: './.cspell/dictionaries/product-names.txt',
    },
  ],
  files: filesPatternsToCheck,
  ignorePaths: ['**/*.svg', '.pnpm-store/**', 'dist/**', 'node_modules/**', 'pnpm-lock.yaml'],
  ignoreRegExpList: [
    // Ignore color codes (6 or 8 hex characters)
    '[a-fA-F0-9]{6,8}\\b',
  ],
  overrides: [
    {
      filename: '.vscode/**/*.json',
      dictionaries: ['engineering-terms', 'product-names'],
    },
  ],
  useGitignore: true,
  version: '0.2',
};
