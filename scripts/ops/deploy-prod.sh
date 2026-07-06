#!/usr/bin/env bash
# Deploy auf demenz-prod (91.99.99.177) — kein Server-Reboot
set -euo pipefail

PROD_IP="${PROD_IP:-91.99.99.177}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/demenz_prod_ed25519}"
[ -f "$SSH_KEY" ] || SSH_KEY="${HOME}/.ssh/demenz_claw_ed25519"
REMOTE_DIR="${REMOTE_DIR:-/opt/demenz-schulungen}"
BRANCH="${BRANCH:-main}"

if docker compose version >/dev/null 2>&1; then
  DC_LOCAL="docker compose -f docker-compose.prod.yml"
else
  DC_LOCAL="docker-compose -f docker-compose.prod.yml"
fi

SSH_OPTS=(-o BatchMode=yes -o StrictHostKeyChecking=accept-new)
[ -f "$SSH_KEY" ] && SSH_OPTS+=(-i "$SSH_KEY")

TARGET="root@${PROD_IP}"

echo "==> Git pull auf demenz-prod (${PROD_IP})"
ssh "${SSH_OPTS[@]}" "$TARGET" bash -s <<REMOTE
set -euo pipefail
mkdir -p "${REMOTE_DIR}"
cd "${REMOTE_DIR}"
if [ ! -d .git ]; then
  git clone https://github.com/freshprince84/demenz-schulungen.git .
fi
git fetch origin
git checkout "${BRANCH}"
git pull origin "${BRANCH}"
REMOTE

echo "==> Migration & Deploy"
ssh "${SSH_OPTS[@]}" "$TARGET" bash -s <<'REMOTE'
set -euo pipefail
cd /opt/demenz-schulungen
test -f .env || { echo "FEHLER: .env fehlt"; exit 1; }
if docker compose version >/dev/null 2>&1; then
  DC="docker compose -f docker-compose.prod.yml"
else
  DC="docker-compose -f docker-compose.prod.yml"
fi
$DC run --rm migrate
$DC build app
$DC up -d
sleep 5
curl -sf http://127.0.0.1/api/health || echo "Healthcheck: http://${PROD_IP}/api/health prüfen"
REMOTE

echo "Deploy abgeschlossen."
