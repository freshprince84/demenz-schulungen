#!/usr/bin/env bash
# Einmalig: MiniMax-Env aus Intranet-Prod lesen (nur MINIMAX_* Zeilen, für Demenz-Setup)
set -euo pipefail
ENV="/var/www/intranet/backend/.env"
if [[ ! -f "$ENV" ]]; then
  echo "ERROR: .env not found"
  exit 1
fi
grep -E '^MINIMAX_' "$ENV" || echo "WARN: no MINIMAX_ vars"
