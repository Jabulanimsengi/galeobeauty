#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: ./deploy-slot.sh <blue|green> [production|full-seo]"
  exit 1
fi

slot="$1"
build_scope="${2:-production}"

case "$slot" in
  blue)
    app_dir="/var/www/galeobeauty-blue"
    port="3000"
    process_name="galeobeauty-blue"
    ;;
  green)
    app_dir="/var/www/galeobeauty-green"
    port="3001"
    process_name="galeobeauty-green"
    ;;
  *)
    echo "Invalid slot: $slot"
    exit 1
    ;;
esac

case "$build_scope" in
  production|full-seo)
    ;;
  *)
    echo "Invalid build scope: $build_scope"
    exit 1
    ;;
esac

cd "$app_dir"
git pull --ff-only
npm ci

release_id="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
git_sha="$(git rev-parse HEAD 2>/dev/null || echo unknown)"
deployed_at="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

if [[ "$build_scope" == "full-seo" ]]; then
  npm run build:full-seo
else
  npm run build:production
fi

GALEO_RELEASE_SLOT="$slot" \
GALEO_RELEASE_ID="$release_id" \
GALEO_GIT_SHA="$git_sha" \
GALEO_DEPLOYED_AT="$deployed_at" \
GALEO_DEPLOY_TARGET="hetzner" \
PORT="$port" \
pm2 restart "$process_name" --update-env

sleep 5
curl --fail --silent "http://127.0.0.1:${port}/api/health"
echo
echo "Deployed $process_name with scope=$build_scope release=$release_id"
