# Projektstatus

> **Letzte Aktualisierung:** 2026-07-05  
> **Phase:** Blocker gelöst → Phase B als Nächstes

---

## Gesamtstatus

| Bereich | Status |
|---------|--------|
| Dokumentation Phase A + Option B | Abgeschlossen |
| **Blocker Infrastruktur** | **Gelöst** (2026-07-05) |
| Code / Plattform | Nicht gestartet — Phase B |
| Domain / TLS | Offen |

---

## Blocker — erledigt

| ID | Blocker | Ergebnis |
|----|---------|----------|
| B1 | SSH `claw-daniela` | Key installiert, `ssh -i ~/.ssh/demenz_claw_ed25519 root@91.99.99.177` OK |
| B2 | Prod-Server | **91.99.99.177** (`claw-daniela`) — neuer Hetzner, ≠ Intranet |
| B3 | MiniMax-Key | In `.env.local` (lokal + Server), von Intranet-Prod |
| B4 | Compliance-Freigabe | Entwurf — Domain/Kontakt vor Go-Live |

---

## Server

- **Prod + Winston:** `claw-daniela` — `91.99.99.177`
- **Intranet:** separater Server (nicht .177)
- Details: [ops/SERVER-CLAW-DANIELA.md](ops/SERVER-CLAW-DANIELA.md)

---

## Nächster Schritt

**Phase B:** Next.js + Drizzle + Docker Compose (lokal, dann Deploy auf `91.99.99.177`)
