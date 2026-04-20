// Copyright (c) 2026 Aukha Saukha and its affiliates.
// SPDX-License-Identifier: MIT

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import jsPlugin from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import astroPlugin from 'eslint-plugin-astro';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tsconfigPath = resolve(__dirname, 'tsconfig.json');

const reactFiles = ['**/*.{jsx,tsx}'];
const repoConfigFiles = [
  '*.config.js',
  '*.config.mjs',
  '*.config.ts',
  '.markdownlint-cli2.mjs',
  'lint-staged.config.js',
];
const typeCheckedTypeScriptFiles = ['**/*.{ts,tsx}'];

const tsConfigs = tsEslint.configs.strictTypeChecked;

/**
 * Escape a path alias so it can be used safely inside a RegExp source.
 *
 * @param {string} value
 * @returns {string}
 */
const escapeRegex = (value) => value.replace(/[|\\{}()[\]^$+?.]/g, '\\$&');

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
const isObjectRecord = (value) => typeof value === 'object' && value !== null;

/**
 * Strip `//` and `/* ... *\/` comments from `tsconfig.json` before parsing.
 *
 * @param {string} jsonText
 * @returns {string}
 */
const stripJsonComments = (jsonText) =>
  jsonText.replace(/\/\/[^\n\r]*|\/\*[\s\S]*?\*\//g, '').trim();

/**
 * @param {string} jsonText
 * @returns {string[]}
 */
const getInternalImportPatterns = (jsonText) => {
  const parsedConfig = JSON.parse(stripJsonComments(jsonText));

  if (!isObjectRecord(parsedConfig)) {
    return [];
  }

  const compilerOptions = parsedConfig.compilerOptions;

  if (!isObjectRecord(compilerOptions)) {
    return [];
  }

  const paths = compilerOptions.paths;

  if (!isObjectRecord(paths)) {
    return [];
  }

  return Object.keys(paths).map((alias) => `^${escapeRegex(alias).replace(/\\\*/g, '.*')}$`);
};

const internalPattern = getInternalImportPatterns(readFileSync(tsconfigPath, 'utf8'));

export default [
  jsPlugin.configs.recommended,
  {
    files: ['**/*.{astro,js,jsx,mjs,ts,tsx}'],
    ignores: ['scripts/**/*', ...repoConfigFiles],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      sourceType: 'module',
    },
  },
  {
    files: ['scripts/**/*.{js,mjs,ts}', ...repoConfigFiles],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...tsConfigs.map((config) => ({
    ...config,
    files: typeCheckedTypeScriptFiles,
  })),
  {
    files: typeCheckedTypeScriptFiles,
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.astro'],
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  ...astroPlugin.configs['flat/recommended'],
  ...astroPlugin.configs['flat/jsx-a11y-recommended'],
  {
    files: reactFiles,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ...reactPlugin.configs.flat.recommended.languageOptions?.parserOptions,
        ...jsxA11yPlugin.flatConfigs.recommended.languageOptions?.parserOptions,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.flat.recommended.rules,
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      perfectionist: perfectionistPlugin,
    },
    rules: {
      ...perfectionistPlugin.configs['recommended-alphabetical'].rules,
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: [
            {
              elementNamePattern: '^@fontsource/.*$',
              groupName: 'value-fonts',
              order: 'asc',
              type: 'alphabetical',
            },
          ],
          groups: [
            'value-builtin',
            ['value-external', 'type-import'],
            ['value-fonts', 'side-effect'],
            ['value-internal', 'type-internal'],
            ['value-parent', 'type-parent'],
            ['value-sibling', 'type-sibling'],
            ['value-index', 'type-index'],
            ['side-effect-style', 'style'],
            'ts-equals-import',
            'unknown',
          ],
          internalPattern,
          sortSideEffects: true,
          tsconfig: {
            rootDir: __dirname,
          },
          type: 'alphabetical',
        },
      ],
    },
  },
  {
    files: ['scripts/**/*.{js,mjs,ts}', ...repoConfigFiles],
    rules: {
      'perfectionist/sort-objects': 'off',
    },
  },
  {
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [
            '^README\\.md$',
            '^\\.markdownlint-cli2\\.mjs$',
            '^[a-z0-9-]+\\.config\\.(?:js|mjs|ts)$',
          ],
        },
      ],
      'unicorn/prefer-node-protocol': 'error',
    },
  },
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  prettierConfig,
];
