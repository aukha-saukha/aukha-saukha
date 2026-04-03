// Copyright (c) 2026 Aukha Saukha and its affiliates.
// SPDX-License-Identifier: MIT

import micromatch from 'micromatch';

export default {
  '*.{astro,js,jsx,ts,tsx}': ['prettier --check'],

  '*.{css,scss}': ['prettier --check'],

  '*.html': ['prettier --check'],

  '*.{json,jsonc}': (files) => {
    // Files to skip
    const ignoreList = [
      '**/package.json',
      '**/.vscode/cspell.json',
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
      // TODO: Add cspell command once it is installed.
    }

    // Check format of all staged JSON files
    commands.push(`prettier --check ${fileArgs}`);

    return commands;
  },

  '*.{md,mdx}': ['prettier --check'],
};
