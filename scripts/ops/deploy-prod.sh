#!/usr/bin/env bash
# Deploy auf demenz-prod (91.99.99.177) — kein Server-Reboot
set -euo pipefail

PROD_IP="${PROD_IP:-91.99.99.177}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/demenz_prod_ed25519}"
REMOTE_DIR="${REMOTE_DIR:-/opt/demenz-schulungen}"
BRANCH="${BRANCH:-main}"

SSH_OPTS=(-o BatchMode=yes -o StrictHostKeyChecking=accept-new)
if [ -f "$SSH_KEY" ]; then
  SSH_OPTS+=(-i "$SSH_KEY")
fi

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

echo "==> Migration"
ssh "${SSH_OPTS[@]}" "$TARGET" bash -s <<REMOTE
set -euo pipefail
cd "${REMOTE_DIR}"
test -f .env || { echo "FEHLER: .env fehlt in ${REMOTE_DIR}"; exit 1; }
docker compose -f docker-compose.prod.yml run --rm migrate
REMOTE

echo "==> Build & Start"
ssh "${SSH_OPTS[@]}" "$TARGET" bash -s <<REMOTE
set -euo pipefail
cd "${REMOTE_DIR}"
docker compose -f docker-compose.prod.yml build app
docker compose -f docker-compose.prod.yml up -d
REMOTE

echo "==> Healthcheck"
ssh "${SSH_OPTS[@]}" "$TARGET" \
  "curl -sf http://127.0.0.1/api/health 2>/dev/null || curl -sf http://localhost/api/health || echo 'Healthcheck: Domain/TLS prüfen'"

echo "Deploy abgeschlossen."
