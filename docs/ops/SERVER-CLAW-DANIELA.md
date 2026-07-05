# Server: claw-daniela (Demenz Hetzner + Winston / Charlie)

> **IP:** `91.99.99.177`  
> **Hostname:** `claw-daniela`  
> **Rolle:** Demenz-Schulungen **Prod** (neuer Hetzner) + Winston/Clawdbot (Charlie)  
> **Stand Inventar:** 2026-07-05 — eingerichtet

---

## 1. Server-Rolle

| Aufgabe | Server |
|---------|--------|
| Demenz-Schulungen Prod-App (Phase B+) | **claw-daniela** (`91.99.99.177`) |
| Clawdbot Charlie, MiniMax-Assistenz | **claw-daniela** |
| Intranet-Prod | **Separat** (ubuntu-4gb-hel1-2) |

**Intranet ≠ dieser Server.** Zugang von Intranet-Prod zu claw-daniela via `/root/.ssh/id_ed25519` auf Intranet-Prod.

---

## 2. SSH-Zugang (Patrick lokal)

```bash
ssh -i ~/.ssh/demenz_claw_ed25519 root@91.99.99.177
```

Optional `~/.ssh/config`:

```
Host claw-daniela demenz-prod
    HostName 91.99.99.177
    User root
    IdentityFile ~/.ssh/demenz_claw_ed25519
```

---

## 3. Inventar (2026-07-05)

| Prüfpunkt | Ergebnis |
|-----------|----------|
| SSH von Entwickler-Rechner | **OK** (Key `demenz_claw_ed25519`) |
| Disk `/` | 75G, ~11% belegt, **65G frei** |
| RAM | 3.7G total, ~2.9G verfügbar |
| Node.js | v22.22.2 |
| Docker | nicht aktiv / nicht installiert |
| Clawdbot | `clawdbot` + `clawdbot-gateway` laufen |
| Sonstige schwere Dienste | **Keine** — Server weitgehend leer außer Charlie |
| Repo | `/root/demenz-schulungen` (geklont) |
| Env auf Server | `/root/demenz-schulungen/.env.local` (MiniMax von Intranet-Prod) |

---

## 4. Pfade

| Pfad | Inhalt |
|------|--------|
| `/root/.clawdbot/clawdbot.json` | Charlie-Konfiguration |
| `/root/demenz-schulungen/` | Git-Repo Demenz-Schulungen |
| `/root/demenz-schulungen/.env.local` | Secrets (nicht im Git) |

---

## 5. MiniMax-Keys

Gleiche Keys wie Intranet-Prod / Winston — aus `/var/www/intranet/backend/.env` übernommen.

Lokal: `demenz-schulungen/.env.local` (gitignored).

---

## 6. Domain

Noch offen — `APP_URL` / TLS vor Go-Live setzen.

---

## 7. Setup erneut ausführen

Von Intranet-Prod (MCP oder manuell):

```bash
bash /var/www/intranet/backend/scripts/setup-demenz-claw-daniela.sh
```
