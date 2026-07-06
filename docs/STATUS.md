# Projektstatus

> **Letzte Aktualisierung:** 2026-07-06  
> **Phase:** B abgeschlossen — Deploy-Vorbereitung

---

## Gesamtstatus

| Bereich | Status |
|---------|--------|
| Dokumentation Phase A + Option B | Abgeschlossen |
| Blocker Infrastruktur | Gelöst |
| **Code / Plattform (Phase B)** | **Abgeschlossen** |
| Prod-Deploy auf `91.99.99.177` | Vorbereitet (Docker, Skripte) |
| Domain / TLS | Offen |

---

## Server

| Rolle | IP | SSH-Alias |
|-------|-----|-----------|
| **Prod + Winston (Charlie)** | `91.99.99.177` | `demenz-prod` |
| Intranet | separater Host | — |

Details: [ops/SERVER-PROD.md](ops/SERVER-PROD.md)

**Obsolet:** Früherer Hostname `claw-daniela` — nicht mehr verwenden.

---

## Nächster Schritt

1. Auf Server: Docker installieren, `.env` in `/opt/demenz-schulungen/`
2. `bash scripts/ops/deploy-prod.sh` (kein Server-Reboot)
3. Domain + TLS in `Caddyfile` / `.env`
