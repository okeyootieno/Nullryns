#!/usr/bin/env bash
set -e

export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

echo "==> Installing pnpm"
npm install -g pnpm --prefix "$HOME/.local"

echo "==> Installing dependencies"
pnpm install --frozen-lockfile

echo "==> Building shared libs"
pnpm run typecheck:libs

echo "==> Building frontend (Vite)"
BASE_PATH="/" PORT=3000 NODE_ENV=production \
  pnpm --filter @workspace/nullryns-web run build

echo "==> Building API server (esbuild)"
pnpm --filter @workspace/api-server run build

echo "==> Build complete"
