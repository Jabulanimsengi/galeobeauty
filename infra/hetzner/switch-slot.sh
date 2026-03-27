#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: ./switch-slot.sh <blue|green>"
  exit 1
fi

slot="$1"

case "$slot" in
  blue)
    port="3000"
    ;;
  green)
    port="3001"
    ;;
  *)
    echo "Invalid slot: $slot"
    exit 1
    ;;
esac

upstream_file="/etc/nginx/snippets/galeobeauty-upstream.conf"

printf 'set $galeo_upstream http://127.0.0.1:%s;\n' "$port" | tee "$upstream_file" >/dev/null
nginx -t
systemctl reload nginx

echo "Live traffic now points to $slot on port $port"
