// Copyright (c) 2026 Aukha Saukha and its affiliates.
// SPDX-License-Identifier: MIT

import micromatch from 'micromatch';

const cspellCommand = 'cspell --cache --cache-strategy content --no-must-find-files --no-progress';

export default {
  '*.{astro,js,jsx,ts,tsx}': [cspellCommand, 'prettier --check'],

  '*.{css,scss}': [cspellCommand, 'prettier --check', 'stylelint'],

  '*.html': [cspellCommand, 'prettier --check'],

  '*.{json,jsonc}': (files) => {
    // Files to skip
    const ignoreList = [
      '**/package.json',
      '**/.vscode/extensions.json',
      '**/.vscode/settings.json',
    ];

    const filesToSpellcheck = micromatch.not(files, ignoreList, {
      dot: true,
    });

    const commands = [];
    const fileArgs = files.map((file) => `"${file}"`).join(' ');

    // Only spellcheck files not in the ignore list
    if (filesToSpellcheck.length > 0) {
      const spellcheckArgs = filesToSpellcheck.map((file) => `"${file}"`).join(' ');
      commands.push(`${cspellCommand} ${spellcheckArgs}`);
    }

    // Check format of all staged JSON files
    commands.push(`prettier --check ${fileArgs}`);

    return commands;
  },

  '*.{md,mdx}': [cspellCommand, 'markdownlint-cli2', 'prettier --check'],

  '.vscode/*.code-snippets': [cspellCommand],
};
