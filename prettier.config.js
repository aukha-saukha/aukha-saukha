/* -------------------------------------------------------------------------------------------------
 * @copyright: The Maryada Group and its affiliates.
 * @license: This source code is licensed under the MIT license found in the LICENSE file in the
 * root directory of this source tree.
 * ---------------------------------------------------------------------------------------------- */

export default {
  arrowParens: 'always',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  plugins: ['prettier-plugin-astro'],
  printWidth: 100,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
};
