# Deployment

> **Version:** 1.1  
> **Datum:** 2026-07-06

---

## 1. Zielumgebung

- **Prod:** Hetzner `demenz-prod` — `91.99.99.177`
- **Deploy:** Docker Compose (`docker-compose.prod.yml`)
- **TLS:** Caddy + Let's Encrypt

---

## 2. Server-Anforderungen

| Spec | Ist-Stand |
|------|-----------|
| IP | `91.99.99.177` |
| OS | Ubuntu (Hetzner) |
| Docker | installieren falls noch nicht vorhanden |
| Ports | 22, 80, 443 |

```bash
# Einmalig auf demenz-prod
apt update && apt install -y docker.io docker-compose-plugin
```

**Server-Neustart nur durch Patrick.**

---

## 3. Erstinstallation

```bash
ssh -i ~/.ssh/demenz_prod_ed25519 root@91.99.99.177

mkdir -p /opt/demenz-schulungen
cd /opt/demenz-schulungen
git clone https://github.com/freshprince84/demenz-schulungen.git .

cp .env.example .env
# .env bearbeiten: POSTGRES_PASSWORD, MINIMAX_API_KEY, DOMAIN, APP_URL, NEXTAUTH_SECRET
```

---

## 4. Deploy

Lokal (nach Push auf `main`):

```bash
bash scripts/ops/deploy-prod.sh
```

Oder manuell auf dem Server:

```bash
cd /opt/demenz-schulungen
git pull
docker compose -f docker-compose.prod.yml run --rm migrate
docker compose -f docker-compose.prod.yml up -d --build
curl -f http://localhost/api/health
```

---

## 5. Services

| Service | Rolle |
|---------|-------|
| `caddy` | TLS, Reverse Proxy |
| `app` | Next.js (standalone) |
| `postgres` | PostgreSQL 16 (nur intern) |
| `migrate` | Einmalig: Schema + Seed |

---

## 6. CI/CD (GitHub Actions)

1. Push auf `main` → CI: lint, typecheck, build, validate:content
2. Deploy manuell via `deploy-prod.sh` (GitHub Deploy-Workflow optional später)

---

## 7. Rollback

```bash
cd /opt/demenz-schulungen
git checkout <previous-tag>
docker compose -f docker-compose.prod.yml up -d --build
```

---

## 8. Referenzen

- [ops/SERVER-PROD.md](ops/SERVER-PROD.md)
- [ops/RUNBOOK.md](ops/RUNBOOK.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
