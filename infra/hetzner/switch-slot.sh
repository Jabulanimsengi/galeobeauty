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
    process_name="galeobeauty-blue"
    inactive_slot="green"
    inactive_process_name="galeobeauty-green"
    ;;
  green)
    port="3001"
    process_name="galeobeauty-green"
    inactive_slot="blue"
    inactive_process_name="galeobeauty-blue"
    ;;
  *)
    echo "Invalid slot: $slot"
    exit 1
    ;;
esac

upstream_file="/etc/nginx/snippets/galeobeauty-upstream.conf"
health_url="http://127.0.0.1:${port}/api/health"
keep_inactive_slot="${GALEO_KEEP_INACTIVE_SLOT:-0}"

wait_for_health() {
  local url="$1"
  local description="$2"

  for attempt in {1..10}; do
    if curl --fail --silent --max-time 5 "$url" >/dev/null; then
      return 0
    fi

    if [[ "$attempt" -eq 10 ]]; then
      echo "${description} failed health checks at ${url}" >&2
      return 1
    fi

    sleep 1
  done
}

wait_for_health "$health_url" "Refusing to switch traffic because ${process_name}"

printf 'set $galeo_upstream http://127.0.0.1:%s;\n' "$port" | tee "$upstream_file" >/dev/null
nginx -t
systemctl reload nginx

wait_for_health "$health_url" "Switched Nginx to $slot, but ${process_name}"
echo "Live traffic now points to $slot on port $port"

if [[ "$keep_inactive_slot" == "1" ]]; then
  echo "Keeping inactive slot ${inactive_slot} online because GALEO_KEEP_INACTIVE_SLOT=1"
  exit 0
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "Traffic switched successfully, but pm2 is unavailable so ${inactive_process_name} was not stopped" >&2
  exit 1
fi

if ! pm2 describe "$inactive_process_name" >/dev/null 2>&1; then
  echo "Traffic switched successfully. Inactive PM2 process ${inactive_process_name} was not found."
  exit 0
fi

pm2 stop "$inactive_process_name"
echo "Stopped inactive slot ${inactive_slot} (${inactive_process_name}) to free server memory"
