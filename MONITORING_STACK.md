# Hetzner Monitoring Stack

This repo now includes a free self-hosted monitoring stack for a Hetzner VPS.

## Recommended stack

Use this core setup on the server:

- `Prometheus` for metrics collection
- `Grafana` for dashboards
- `Node Exporter` for CPU, RAM, disk, and load
- `Loki + Promtail` for logs
- `Alertmanager` for alerts

Use one external uptime monitor as a second line of defense:

- `Better Stack` if you want a cleaner UI and faster checks
- `UptimeRobot` if you want the simplest free setup

`Netdata` is optional. It is excellent for quick live inspection, but it overlaps with Prometheus + Grafana. For a cleaner long-term setup, do not install both unless you specifically want Netdata's real-time drill-down view.

## App health endpoint

The app now exposes:

- `GET /api/health`

Example response:

```json
{
  "ok": true,
  "service": "galeobeauty-next",
  "timestamp": "2026-03-24T12:00:00.000Z"
}
```

Point Better Stack or UptimeRobot at:

- `https://your-domain.com/api/health`

## Files added

- `infra/monitoring/docker-compose.yml`
- `infra/monitoring/prometheus/prometheus.yml`
- `infra/monitoring/prometheus/alerts/node-alerts.yml`
- `infra/monitoring/alertmanager/alertmanager.yml`
- `infra/monitoring/loki/loki-config.yml`
- `infra/monitoring/promtail/promtail-config.yml`
- `infra/monitoring/grafana/provisioning/datasources/datasources.yml`
- `infra/monitoring/monitoring.env.example`

## Hetzner install steps

Run these commands on the Hetzner server.

### 1. Install Docker and Compose

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable --now docker
```

### 2. Copy monitoring files to the server

Copy the `infra/monitoring` folder to a location such as:

```bash
/opt/galeo-monitoring
```

### 3. Create the environment file

```bash
cd /opt/galeo-monitoring
cp monitoring.env.example .env
nano .env
```

Change at least:

- `GRAFANA_ADMIN_PASSWORD`
- `GRAFANA_ROOT_URL`

### 4. Start the monitoring stack

```bash
cd /opt/galeo-monitoring
sudo docker compose up -d
sudo docker compose ps
```

Grafana will listen on:

- `127.0.0.1:3300`

Prometheus will listen on:

- `127.0.0.1:9090`

Alertmanager will listen on:

- `127.0.0.1:9093`

This localhost-only binding is intentional. Put Grafana behind your existing reverse proxy or tunnel into the server with SSH.

## Reverse proxy suggestion

Expose only Grafana publicly. Keep Prometheus and Alertmanager private.

Example Nginx upstream target:

- `http://127.0.0.1:3300`

If you already have Nginx on the server, create a protected subdomain such as:

- `grafana.your-domain.com`

Use one of:

- Cloudflare Zero Trust
- Nginx basic auth
- IP allowlisting

## PM2 and logs

Promtail is already configured to collect:

- system logs from `/var/log`
- Nginx logs from `/var/log/nginx`
- PM2 logs from `/root/.pm2/logs`
- Docker container JSON logs from `/var/lib/docker/containers`

If your app runs under a different Linux user, update the PM2 volume mount in `infra/monitoring/docker-compose.yml`.

Example:

```yaml
- /home/deploy/.pm2/logs:/host/pm2:ro
```

## Alerts

`Alertmanager` is included but starts with a no-op receiver so the stack boots cleanly.

Before enabling notifications, edit:

- `infra/monitoring/alertmanager/alertmanager.yml`

Typical free alert destinations:

- Telegram bot
- email SMTP
- Slack basic

Example Telegram receiver:

```yaml
receivers:
  - name: telegram
    telegram_configs:
      - bot_token: "123456:replace-me"
        chat_id: 123456789
```

Then update the top-level route receiver and restart Alertmanager:

```bash
sudo docker compose restart alertmanager
```

## What this stack covers

You will be able to monitor:

- server CPU, RAM, disk, and uptime
- basic infrastructure availability
- Nginx and PM2 logs in Grafana
- Docker logs if parts of the stack run in containers
- outage alerts through Alertmanager
- public uptime through Better Stack or UptimeRobot

## Best practical choice

If the goal is ease plus good visibility on a single Hetzner server, this is the best balance:

- `Grafana + Prometheus + Node Exporter + Loki + Promtail + Alertmanager` on the server
- `Better Stack` externally for uptime checks

That gives you internal observability plus independent outside-in monitoring without paying for a hosted platform.
