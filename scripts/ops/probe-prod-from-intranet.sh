#!/usr/bin/env bash
# Von Intranet-Prod: demenz-prod (91.99.99.177) erreichen und Public Key hinterlegen
set -euo pipefail

PROD_IP="${PROD_IP:-91.99.99.177}"
PROD_HOST="${PROD_HOST:-demenz-prod}"

echo "========== ${PROD_HOST} probe $(date -Is) =========="

if ssh -o BatchMode=yes -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new \
  "root@${PROD_IP}" "hostname && uptime"; then
  echo "OK: SSH to ${PROD_HOST} (${PROD_IP})"
  exit 0
fi

if [ -f /root/.ssh/id_ed25519.pub ]; then
  echo "Trying to install intranet public key..."
  ssh-copy-id -i /root/.ssh/id_ed25519.pub "root@${PROD_IP}" || true
  if ssh -o BatchMode=yes "root@${PROD_IP}" "echo OK"; then
    echo "OK: key installed"
    exit 0
  fi
fi

echo "FAIL: no ssh access to ${PROD_HOST} (${PROD_IP})"
exit 1
