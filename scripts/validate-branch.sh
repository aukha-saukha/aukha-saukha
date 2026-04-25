#!/usr/bin/env bash

# Copyright (c) 2026 Aukha Saukha and its affiliates.
# SPDX-License-Identifier: MIT

set -euo pipefail


BRANCH_REGEX="^(build|chore|ci|docs|feat|fix|hotfix|perf|refactor|release|revert|style|test)/[a-z0-9._-]+$"


fail() {
  echo "❌ $1" >&2
  exit 1
}


info() {
  echo "ℹ️ $1"
}


# Get branch name based on environment
get_branch_name() {
  # GitHub Actions PR context
  if [[ -n "${GITHUB_HEAD_REF:-}" ]]; then
    echo "$GITHUB_HEAD_REF"
    return
  fi

  # GitHub Actions push context
  if [[ -n "${GITHUB_REF_NAME:-}" ]]; then
    echo "$GITHUB_REF_NAME"
    return
  fi

  # Fallback: local git
  git symbolic-ref --quiet --short HEAD 2>/dev/null || true
}


branch="$(get_branch_name)"


# Handle detached HEAD or unknown
if [[ -z "$branch" ]]; then
  info "Skipping branch validation (detached HEAD or unknown context)."
  exit 0
fi


branch="$(echo "$branch" | tr -d '[:space:]')"


info "Validating branch: $branch"


# Skip main push validation noise
if [[ "$branch" == "main" && "${GITHUB_EVENT_NAME:-}" == "push" ]]; then
  info "Skipping validation on main branch push."
  exit 0
fi


# Prevent direct commits to main outside of the deployment workflow
if [[ "$branch" == "main" ]]; then
  fail "Direct commits to 'main' are not allowed. Use a feature branch: <type>/<description>"
fi


# Branch name validation
if [[ ! "$branch" =~ $BRANCH_REGEX ]]; then
  echo ""
  echo "❌ Invalid branch name: '$branch'"
  echo ""
  echo "Expected format:"
  echo "  <type>/<description>"
  echo ""
  echo "Allowed types:"
  echo "  build, chore, ci, docs, feat, fix, hotfix, perf,"
  echo "  refactor, release, revert, style, test"
  echo ""
  echo "Examples:"
  echo "  chore/update-deps"
  echo "  feat/login-flow"
  echo "  fix/navbar-alignment"
  echo ""
  fail "Branch validation failed"
fi


info "Branch name is valid ✅"
