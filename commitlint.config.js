// Copyright (c) 2026 Aukha Saukha and its affiliates.
// SPDX-License-Identifier: MIT

export default {
  extends: ['@commitlint/config-conventional'],
  helpUrl: 'https://www.conventionalcommits.org/en/v1.0.0/#summary',
  rules: {
    'subject-case': [2, 'never', ['pascal-case', 'sentence-case', 'start-case', 'upper-case']],
    'subject-full-stop': [2, 'never', '.'],
  },
};
