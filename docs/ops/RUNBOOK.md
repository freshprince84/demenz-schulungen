# Runbook — Betrieb Demenz-Schulungen

> **Version:** 1.0  
> **Datum:** 2026-07-05  
> **Zielgruppe:** Patrick (Betrieb)  
> **Status:** Verbindlich ab erstem Prod-Deploy

---

## 1. Server-Übersicht

| Server | IP / Host | Rolle | Dienste |
|--------|-----------|-------|---------|
| **claw-daniela** | 91.99.99.177 | Winston/Charlie (Assistenz) | Clawdbot, Node.js, MiniMax-Client |
| **Prod-App** | TBD (neuer Hetzner) | Lernplattform | Caddy, Next.js, PostgreSQL, Media-Volume |

**Regel:** Prod-Nutzerdaten **niemals** auf claw-daniela. Content-Entwürfe **niemals** unreviewed von Winston nach Prod.

Details Assistenz-Server: [SERVER-CLAW-DANIELA.md](SERVER-CLAW-DANIELA.md)

---

## 2. Zugriff

### 2.1 SSH

```bash
# Assistenz-Server
ssh -i ~/.ssh/demenz_claw_ed25519 root@91.99.99.177

# Prod (nach Provisionierung)
ssh -i ~/.ssh/demenz_prod_ed25519 root@<PROD-IP>
```

Nur Key-Auth. Passwort-Login deaktiviert.

### 2.2 Wichtige Pfade

| Pfad | Server | Inhalt |
|------|--------|--------|
| `/opt/demenz-schulungen/` | Prod | Docker Compose, `.env` |
| `/var/lib/docker/volumes/` | Prod | Postgres + Media |
| `/root/demenz-schulungen/` | claw-daniela | Repo-Klon (Assistenz) |
| `/root/.clawdbot/clawdbot.json` | claw-daniela | Charlie-Konfiguration |

---

## 3. Tägliche und wöchentliche Aufgaben

### 3.1 Täglich (automatisiert wo möglich)

| Aufgabe | Methode | Verantwortlich |
|---------|---------|----------------|
| DB-Backup (`pg_dump`) | Cron 03:00 UTC | Prod-Server |
| Healthcheck `/api/health` | Cron / Uptime | Prod-Server |
| Log-Rotation | logrotate / Docker | Prod-Server |

### 3.2 Wöchentlich

| Aufgabe | Beschreibung |
|---------|--------------|
| `npm audit` | CI + manueller Check Dependencies |
| Changelog-Review | CHANGELOG.md aktuell? |
| MiniMax-Key-Quota | API-Limits prüfen |

### 3.3 Monatlich

| Aufgabe | Beschreibung |
|---------|--------------|
| Backup-Restore-Test | DB aus Backup in Staging/Test wiederherstellen |
| TOM-Review | [compliance/TOMS.md](../compliance/TOMS.md) |
| OS-Security-Patches | `unattended-upgrades` + manueller Check |

### 3.4 Quartalsweise

| Aufgabe | Beschreibung |
|---------|--------------|
| Secrets-Rotation prüfen | MiniMax-Key, Session-Secret, DB-Passwort |
| DPIA-Status | Vor Phase-2-Go-Live finalisieren |
| Dependency Major-Updates | Next.js, Node LTS |

---

## 4. Deployment (Prod)

### 4.1 Standard-Deploy

**Auslöser:** Push auf `main` → GitHub Actions

Manuell (Notfall):

```bash
ssh prod
cd /opt/demenz-schulungen
git pull origin main          # falls Repo auf Server
docker compose pull
docker compose up -d --build
curl -sf https://<DOMAIN>/api/health | jq .
```

**Server-Neustart:** Nur durch Patrick — nicht durch Agenten automatisieren.

### 4.2 Pre-Deploy-Checkliste

- [ ] CI grün auf `main`
- [ ] Keine Secrets im Diff
- [ ] DB-Migrationen dokumentiert (`drizzle-kit migrate`)
- [ ] CHANGELOG aktualisiert (bei user-facing Changes)

### 4.3 Post-Deploy-Verifikation

```bash
curl -sf https://<DOMAIN>/api/health
# Erwartung: {"status":"ok","database":"connected",...}

# Logs (letzte 50 Zeilen)
docker compose logs --tail=50 app
docker compose logs --tail=20 caddy
```

Manuell: Kursübersicht laden, ein Modul öffnen, Quiz testen.

---

## 5. Rollback

### 5.1 Anwendung

```bash
cd /opt/demenz-schulungen
git checkout <previous-tag-or-commit>
docker compose up -d --build
curl -sf https://<DOMAIN>/api/health
```

### 5.2 Datenbank

Nur wenn Migration fehlgeschlagen:

1. App stoppen: `docker compose stop app`
2. Restore aus letztem Backup (§6)
3. App mit vorherigem Image starten

**Kein** `drizzle-kit` downgrade ohne Restore — Forward-only mit Backup.

---

## 6. Backup und Restore

### 6.1 Backup

```bash
# PostgreSQL (täglich per Cron)
docker compose exec -T postgres pg_dump -U demenz demenz_schulungen \
  | gzip > /backups/pg_$(date +%Y%m%d).sql.gz

# Media-Volume (wöchentlich)
tar czf /backups/media_$(date +%Y%m%d).tar.gz /var/lib/docker/volumes/media_data/
```

Retention: 30 Tage, dann Überschreibung.

### 6.2 Restore (Test)

```bash
gunzip -c /backups/pg_YYYYMMDD.sql.gz \
  | docker compose exec -T postgres psql -U demenz demenz_schulungen_restore_test
```

Dokumentiere Ergebnis und Datum im internen Log.

---

## 7. Logs und Monitoring

### 7.1 Log-Quellen

| Quelle | Befehl |
|--------|--------|
| App | `docker compose logs -f app` |
| Caddy | `docker compose logs -f caddy` |
| PostgreSQL | `docker compose logs -f postgres` |
| System | `journalctl -u docker -n 100` |

Kein US-SaaS-Monitoring (Sentry etc.). Strukturierte Logs (pino) in App.

### 7.2 Healthcheck

```
GET https://<DOMAIN>/api/health
```

| Feld | Erwartung |
|------|-----------|
| `status` | `ok` |
| `database` | `connected` |

### 7.3 Performance

- Lighthouse lokal oder wöchentlich: LCP < 2.5s (siehe UX-IMPLEMENTATION.md)
- Core Web Vitals bei Releases stichprobenartig

---

## 8. Secrets und Keys

| Secret | Speicherort | Rotation |
|--------|-------------|----------|
| `MINIMAX_API_KEY` | `.env` Prod + claw-daniela | Bei Verdacht / jährlich |
| `DATABASE_URL` | `.env` Prod | Bei Kompromittierung |
| `NEXTAUTH_SECRET` | `.env` Prod (Phase 2) | Bei Kompromittierung |
| SSH-Keys | `~/.ssh/` lokal | Bei Kompromittierung |

**MiniMax-Key:** Gleicher Key wie Winston/Intranet-Prod — nie ins Git-Repo.

GitHub Secrets: `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `ENV_PROD`

---

## 9. Winston / Charlie (Assistenz)

| Aufgabe | Aktion |
|---------|--------|
| Charlie antwortet nicht | `systemctl status` / `ps aux \| grep claw` auf claw-daniela |
| Config ändern | `/root/.clawdbot/clawdbot.json` — Backup vorher |
| Repo aktualisieren | `cd /root/demenz-schulungen && git pull` |
| Token kompromittiert | Bot-Token rotieren, Config aktualisieren |

Charlie ist **nicht** für Prod-Deploy oder Prod-DB zuständig.

---

## 10. Incidents

| Schweregrad | Beispiel | Aktion |
|-------------|----------|--------|
| P1 | Prod down, Datenpanne | Sofort: Eindämmung → INCIDENT-RESPONSE |
| P2 | MiniMax down | Content-Arbeit pausieren; Lernende unberührt (statische Assets) |
| P3 | CI rot | Kein Deploy bis grün |

Vollständiger Ablauf: [INCIDENT-RESPONSE.md](INCIDENT-RESPONSE.md)

---

## 11. Wartungsfenster

- **Bevorzugt:** Sonntag 02:00–04:00 UTC
- **Ankündigung:** Bei geplanter Downtime > 5 Min (später in App, Phase 2)

---

## 12. Referenzen

- [../DEPLOYMENT.md](../DEPLOYMENT.md)
- [../ARCHITECTURE.md](../ARCHITECTURE.md)
- [../compliance/TOMS.md](../compliance/TOMS.md)
- [INCIDENT-RESPONSE.md](INCIDENT-RESPONSE.md)
- [SERVER-CLAW-DANIELA.md](SERVER-CLAW-DANIELA.md)
