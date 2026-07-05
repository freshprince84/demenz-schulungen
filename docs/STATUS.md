# Projektstatus

> **Letzte Aktualisierung:** 2026-07-05  
> **Phase:** A abgeschlossen → B als Nächstes

---

## Gesamtstatus

| Bereich | Status | Fortschritt |
|---------|--------|-------------|
| Dokumentation Phase A | **Abgeschlossen** | 100% |
| Compliance | Überarbeitet (v1.1) | Entwurf — Domain/Kontakt vor Go-Live |
| Server claw-daniela | SSH-Key generiert | Inventar ausstehend (Key auf Server) |
| ORM-Entscheidung | **Drizzle** (ADR-013) | Verabschiedet |
| Code / Plattform | Nicht gestartet | 0% |
| Content (3 Module) | Nicht gestartet | 0% |
| Prod-Server | Nicht provisioniert | 0% |

---

## Heute erledigt (2026-07-05)

1. **SSH:** Key `~/.ssh/demenz_claw_ed25519` — Public Key in [ops/SERVER-CLAW-DANIELA.md](ops/SERVER-CLAW-DANIELA.md)
2. **Compliance:** DATENSCHUTZKONZEPT, VVT, TOMS, DPIA, PRIVACY-POLICY, INCIDENT-RESPONSE
3. **ORM:** ADR-013 Drizzle — Doku angepasst

---

## Blocker

| ID | Blocker | Verantwortlich | Status |
|----|---------|----------------|--------|
| B1 | Public Key auf claw-daniela hinterlegen | Patrick | Offen |
| B2 | Prod-Server provisionieren | Patrick | Offen |
| B3 | MiniMax-Key (von Winston/Intranet übernehmen) | Patrick | Offen |
| B4 | Prod-Domain + `privacy@` / `security@` | Patrick | Offen |
| B5 | Compliance-Freigabe + MiniMax-Rechtslage | Patrick | Offen |

---

## Nächste Schritte

1. Public Key auf Server → Inventar ausfüllen
2. **Phase B:** Next.js 15 + Drizzle + Docker Compose
3. MiniMax-Key in `.env` (lokal + Server), nie ins Repo

---

## Referenzen

- [ROADMAP.md](ROADMAP.md)
- [DECISIONS.md](DECISIONS.md)
- [ops/SERVER-CLAW-DANIELA.md](ops/SERVER-CLAW-DANIELA.md)
- [compliance/](compliance/)
