// Copyright (c) 2026 Aukha Saukha and its affiliates.
// SPDX-License-Identifier: MIT

export default {
  config: {
    default: true,
    MD003: {
      style: 'atx',
    },
    MD013: false,
    MD033: false,
    MD044: {
      code_blocks: false,
      names: [
        'API',
        'Astro',
        'CI/CD',
        'Cloudflare',
        'Cloudflare Workers',
        'CSS',
        'ESLint',
        'Firebase',
        'Firebase Cloud Messaging',
        'Firebase Realtime Database',
        'GitHub',
        'GitHub Actions',
        'HTML',
        'JavaScript',
        'Jest',
        'Markdown',
        'Next.js',
        'Node.js',
        'PostgreSQL',
        'Prettier',
        'React',
        'React Native',
        'Sass',
        'TypeScript',
        'Vite',
        'VS Code',
      ],
    },
    MD046: {
      style: 'fenced',
    },
  },
  gitignore: true,
  globs: ['**/*.md', '**/*.mdx'],
};
