#!/usr/bin/env bash

# Copyright (c) 2026 Aukha Saukha and its affiliates.
# SPDX-License-Identifier: MIT

set -eou pipefail

error() {
  echo "❌ $1" >&2
  exit 1
}

branch="$(git rev-parse --abbrev-ref HEAD)"

# Skip detached HEAD
if [[ "$branch" == "HEAD" ]]; then
  echo "Skipping branch validation (detached HEAD)."
  exit 0
fi

# Enforce: no commits directly on main
if [[ "$branch" == "main" ]]; then
  error "Direct commits to 'main' are not allowed. Create a branch: <type>/<description>"
fi

pattern="^(build|chore|ci|docs|feat|fix|hotfix|perf|refactor|release|revert|style|test)/[a-z0-9._-]+$"

if [[ ! "$branch" =~ $pattern ]]; then
  error "Invalid branch name: '$branch'. Expected pattern: <type>/<description>"
fi

echo "✅ Branch name valid: $branch"
