#!/usr/bin/env bash

set -euo pipefail

if [[ $# -gt 2 ]]; then
  echo "Usage: ./release.sh [blue|green|auto] [production|full-seo]"
  exit 1
fi

slot_arg="${1:-auto}"
build_scope="${2:-production}"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
upstream_file="/etc/nginx/snippets/galeobeauty-upstream.conf"

case "$build_scope" in
  production|full-seo)
    ;;
  *)
    echo "Invalid build scope: $build_scope"
    exit 1
    ;;
esac

resolve_live_slot() {
  if [[ ! -f "$upstream_file" ]]; then
    echo "Unable to determine live slot because $upstream_file does not exist" >&2
    return 1
  fi

  if grep -q '127\.0\.0\.1:3000' "$upstream_file"; then
    echo "blue"
    return 0
  fi

  if grep -q '127\.0\.0\.1:3001' "$upstream_file"; then
    echo "green"
    return 0
  fi

  echo "Unable to determine live slot from $upstream_file" >&2
  return 1
}

resolve_target_slot() {
  local requested_slot="$1"
  local current_live_slot="$2"

  case "$requested_slot" in
    auto)
      if [[ "$current_live_slot" == "blue" ]]; then
        echo "green"
      else
        echo "blue"
      fi
      ;;
    blue|green)
      echo "$requested_slot"
      ;;
    *)
      echo "Invalid slot: $requested_slot" >&2
      return 1
      ;;
  esac
}

live_slot="$(resolve_live_slot)"
target_slot="$(resolve_target_slot "$slot_arg" "$live_slot")"

if [[ "$target_slot" == "$live_slot" ]]; then
  echo "Refusing to deploy to the live slot ($live_slot)."
  echo "Use the default auto mode or pick the inactive slot explicitly."
  exit 1
fi

echo "Live slot: $live_slot"
echo "Target slot: $target_slot"
echo "Build scope: $build_scope"

bash "$script_dir/deploy-slot.sh" "$target_slot" "$build_scope"
bash "$script_dir/switch-slot.sh" "$target_slot"
pm2 save

echo "Release complete. Traffic now points to $target_slot."
