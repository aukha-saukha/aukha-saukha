/* -------------------------------------------------------------------------------------------------
 * @copyright: The Maryada Group and its affiliates.
 * @license: This source code is licensed under the MIT license found in the LICENSE file in the
 * root directory of this source tree.
 * ---------------------------------------------------------------------------------------------- */

import micromatch from 'micromatch';

export default {
  '*.{js,jsx}': ['cspell', 'eslint', 'prettier'],
  '*.{json,jsonc}': (files) => {
    // ".vscode/extensions.json" in the match pattern (second array) doesn't seem to be working.
    // However, the absolute path works. That's why ${import.meta.dirname} is used.
    const filteredFiles = micromatch.not(
      files,
      [
        'package.json',
        `${import.meta.dirname}/.vscode/cspell.json`,
        `${import.meta.dirname}/.vscode/extensions.json`,
        `${import.meta.dirname}/.vscode/settings.json`,
      ],
      {
        basename: true,
        dot: true,
      }
    );

    if (Array.isArray(filteredFiles) && filteredFiles.length !== 0) {
      return [
        `cspell --quiet --no-must-find-files ${filteredFiles.join(' ')}`,
        `eslint ${files.join(' ')}`,
        `prettier ${files.join(' ')}`,
      ];
    } else {
      return [`eslint ${files.join(' ')}`, `prettier ${files.join(' ')}`];
    }
  },
  '*.{ts,tsx}': ['cspell', 'eslint', 'prettier'],
  '*.astro': ['cspell', 'eslint', 'prettier'],
  '*.css': ['cspell', 'prettier', 'stylelint'],
  '*.html': ['cspell', 'prettier'],
  '*.md': ['cspell', 'markdownlint-cli2', 'prettier'],
  '*.scss': ['cspell', 'prettier', 'stylelint'],
};
