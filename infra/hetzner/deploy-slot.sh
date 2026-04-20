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

if [[ ! -d "$app_dir" ]]; then
  echo "Expected slot directory $app_dir to exist"
  exit 1
fi

resolved_app_dir="$(readlink -f "$app_dir")"
if [[ "$resolved_app_dir" != "$app_dir" ]]; then
  echo "Expected $app_dir to be a real stable directory, but it resolves to $resolved_app_dir"
  echo "Replace the symlink with the actual release directory before deploying."
  exit 1
fi

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

# Automatically submit newly built sitemaps to IndexNow
npm run submit:indexnow

cat > "$app_dir/release-metadata.json" <<EOF
{
  "releaseId": "$release_id",
  "gitSha": "$git_sha",
  "slot": "$slot",
  "buildScope": "$build_scope",
  "deployTarget": "hetzner",
  "deployedAt": "$deployed_at"
}
EOF

run_pm2_with_release_env() {
  local pm2_action="$1"
  shift

  GALEO_RELEASE_SLOT="$slot" \
  GALEO_RELEASE_ID="$release_id" \
  GALEO_GIT_SHA="$git_sha" \
  GALEO_DEPLOYED_AT="$deployed_at" \
  GALEO_BUILD_SCOPE="$build_scope" \
  GALEO_DEPLOY_TARGET="hetzner" \
  PORT="$port" \
  pm2 "$pm2_action" "$@"
}

pm2_lookup_status=0
pm2_cwd=""

if pm2_cwd="$(
  pm2 jlist | node -e 'const fs = require("node:fs"); const name = process.argv[1]; const apps = JSON.parse(fs.readFileSync(0, "utf8")); const app = apps.find((entry) => entry.name === name); if (!app) process.exit(2); process.stdout.write((app.pm2_env?.pm_cwd || "").trim());' "$process_name"
)"; then
  :
else
  pm2_lookup_status=$?
fi

if [[ "$pm2_lookup_status" -eq 2 ]]; then
  echo "PM2 process $process_name was not found. Creating it with cwd=$app_dir"
  run_pm2_with_release_env start npm --name "$process_name" -- run start
elif [[ "$pm2_lookup_status" -ne 0 ]]; then
  echo "Unable to inspect PM2 state for $process_name"
  exit 1
elif [[ "$pm2_cwd" != "$app_dir" ]]; then
  echo "PM2 process $process_name uses cwd=$pm2_cwd, expected $app_dir"
  echo "Recreating $process_name so future deploys stay on the stable slot path."
  pm2 delete "$process_name"
  run_pm2_with_release_env start npm --name "$process_name" -- run start
else
  run_pm2_with_release_env restart "$process_name" --update-env
fi

sleep 5
curl --fail --silent "http://127.0.0.1:${port}/api/health"
echo
echo "Deployed $process_name with scope=$build_scope release=$release_id"
