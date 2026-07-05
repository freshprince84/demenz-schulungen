# Deployment

> **Version:** 1.0  
> **Datum:** 2026-07-05

---

## 1. Zielumgebung

- **Prod:** Neuer dedizierter Hetzner-VPS (EU)
- **Deploy:** Docker Compose
- **TLS:** Caddy + Let's Encrypt

---

## 2. Server-Anforderungen

| Spec | Empfehlung |
|------|------------|
| Typ | Hetzner CPX31 (4 vCPU, 8 GB RAM) |
| OS | Ubuntu 24.04 LTS |
| Ports | 22 (SSH), 80, 443 |

---

## 3. Erstinstallation (Patrick)

```bash
# Auf neuem Server (Beispiel)
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose-plugin
# SSH Key-only, ufw, fail2ban konfigurieren
```

---

## 4. Docker Compose (Prod)

Services: `caddy`, `app`, `postgres`, Volume `media_data`

```bash
cd /opt/demenz-schulungen
docker compose pull
docker compose up -d
```

**Wichtig:** Server-Neustarts nur durch Patrick.

---

## 5. CI/CD (GitHub Actions)

1. Push auf `main`
2. CI: lint, typecheck, build
3. Deploy: SSH → `docker compose pull && docker compose up -d`
4. Healthcheck: `curl -f https://domain/api/health`

Secrets in GitHub: `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `ENV_PROD`

---

## 6. Rollback

```bash
git checkout <previous-tag>
docker compose up -d --build
# Oder: vorheriges Docker-Image-Tag
```

DB-Restore aus Backup siehe Runbook.

---

## 7. Backups

- **PostgreSQL:** Täglicher `pg_dump`, 30 Tage Retention
- **Media:** Volume-Snapshot oder restic
- **Restore-Probe:** Monatlich manuell

---

## 8. Referenzen

- [ARCHITECTURE.md](ARCHITECTURE.md)
- [DEVELOPMENT.md](DEVELOPMENT.md)
- [compliance/TOMS.md](compliance/TOMS.md)
