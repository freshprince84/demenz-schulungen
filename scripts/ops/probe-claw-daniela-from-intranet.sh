#!/usr/bin/env bash
# Von Intranet-Prod: claw-daniela erreichen und Public Key hinterlegen
set -euo pipefail

TARGET="root@91.99.99.177"
PUBKEY="${1:-}"

echo "========== claw-daniela probe $(date -Is) =========="

echo "--- local ssh keys ---"
ls -la /root/.ssh/ 2>/dev/null || echo "no /root/.ssh"

for key in /root/.ssh/id_ed25519 /root/.ssh/id_rsa; do
  if [[ -f "$key" ]]; then
    echo "--- try key $key ---"
    ssh -o BatchMode=yes -o ConnectTimeout=10 -i "$key" "$TARGET" "hostname; df -h /; free -h; node -v 2>/dev/null; docker ps -a 2>/dev/null | head -3; ls -la /root/ | head -15" 2>&1 && exit 0
  fi
done

if [[ -n "$PUBKEY" ]]; then
  echo "--- try install pubkey with default keys ---"
  for key in /root/.ssh/id_ed25519 /root/.ssh/id_rsa; do
    if [[ -f "$key" ]]; then
      ssh -o BatchMode=yes -o ConnectTimeout=10 -i "$key" "$TARGET" \
        "mkdir -p /root/.ssh && chmod 700 /root/.ssh && echo '$PUBKEY' >> /root/.ssh/authorized_keys && chmod 600 /root/.ssh/authorized_keys && echo KEY_INSTALLED" 2>&1 && exit 0
    fi
  done
fi

echo "FAIL: no ssh access to claw-daniela"
exit 1
