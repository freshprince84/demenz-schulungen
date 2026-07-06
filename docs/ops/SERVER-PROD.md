# Server: Demenz-Schulungen Prod (Hetzner)

> **IP:** `91.99.99.177`  
> **SSH-Alias:** `demenz-prod`  
> **Rolle:** Lernplattform (Prod) + Winston/Clawdbot (Charlie) auf **demselben** Server  
> **Stand Inventar:** 2026-07-06

---

## 1. Server-Rolle

| Aufgabe | Server |
|---------|--------|
| Demenz-Schulungen Prod-App | **demenz-prod** (`91.99.99.177`) |
| Clawdbot Charlie, MiniMax-Assistenz | **demenz-prod** (gleicher Host) |
| Intranet-Prod | **Separat** (eigener Hetzner) |

**Intranet ≠ dieser Server.** Zugang von Intranet-Prod via `/root/.ssh/id_ed25519` auf Intranet-Prod.

**Hinweis:** Der frühere Hostname `claw-daniela` ist obsolet und darf in Doku, Skripten und Konfiguration nicht mehr vorkommen.

---

## 2. SSH-Zugang (Patrick lokal)

```bash
ssh -i ~/.ssh/demenz_prod_ed25519 root@91.99.99.177
```

Optional `~/.ssh/config`:

```
Host demenz-prod
    HostName 91.99.99.177
    User root
    IdentityFile ~/.ssh/demenz_prod_ed25519
```

Falls der Key lokal noch `demenz_claw_ed25519` heißt: umbenennen oder `IdentityFile` entsprechend setzen.

---

## 3. Inventar

| Prüfpunkt | Ergebnis |
|-----------|----------|
| SSH von Entwickler-Rechner | Key `demenz_prod_ed25519` |
| Disk `/` | 75G, ausreichend frei |
| Node.js | v22 |
| Docker | für Prod-Deploy installieren (siehe DEPLOYMENT.md) |
| Clawdbot | Charlie läuft (`clawdbot`, `clawdbot-gateway`) |
| Repo | `/opt/demenz-schulungen` (Prod) bzw. `/root/demenz-schulungen` (Dev-Klon) |
| Env | `/opt/demenz-schulungen/.env` (Prod, nicht im Git) |

---

## 4. Pfade

| Pfad | Inhalt |
|------|--------|
| `/opt/demenz-schulungen/` | Docker Compose Prod, `.env` |
| `/root/.clawdbot/clawdbot.json` | Charlie-Konfiguration |
| `/var/lib/docker/volumes/` | Postgres + Media |

---

## 5. MiniMax-Keys

Gleiche Keys wie Intranet-Prod — nur in `.env` / `.env.local`, nie im Git.

---

## 6. Domain

Noch offen — `APP_URL` / TLS vor Go-Live in `.env` und `Caddyfile` setzen.

---

## 7. Erst-Deploy

Siehe [DEPLOYMENT.md](../DEPLOYMENT.md) und `scripts/ops/deploy-prod.sh`.

Server-Neustart nur durch Patrick.
