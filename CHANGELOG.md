# Changelog

Alle wesentlichen Änderungen an diesem Projekt werden hier dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

---

## [Unreleased]

### Hinzugefügt

- Phase B: Next.js 15 App, Drizzle, UI-Komponenten, Quiz, APIs, CI mit Postgres
- Pilotmodul `handewaschen` (published); `medikamente`, `ernaehrung` (draft)
- Prod-Deploy: `Dockerfile`, `docker-compose.prod.yml`, `Caddyfile`, `scripts/ops/deploy-prod.sh`
- `docs/ops/SERVER-PROD.md` — Server-Dokumentation (ersetzt veraltete Benennung)

### Geändert

- Alle Verweise auf obsoleten Hostnamen entfernt; neutral: **demenz-prod** (`91.99.99.177`)
- `docs/DEPLOYMENT.md`, `docs/STATUS.md`, `docs/ARCHITECTURE.md`, RUNBOOK, Compliance-Docs
- `.env.example` um Prod-Variablen erweitert

### Entfernt

- `docs/ops/SERVER-CLAW-DANIELA.md`, `scripts/ops/probe-claw-daniela-from-intranet.sh`

---

## [0.1.0-app] — 2026-07-06

### Hinzugefügt

- Vollständige Projekt-Dokumentation (Phase A): ADRs, PRD, Architektur, API, Datenmodell
- Compliance-Dokumente (Entwurf): Datenschutzkonzept, VVZ, TOMs, DPIA, PRIVACY-POLICY
- `docs/ops/INCIDENT-RESPONSE.md`
- Quiz-Schema, Modul-Template, Content-Spec
- GitHub CI-Skeleton, Cursor Rules, CONTRIBUTING
- ADR-013: Drizzle ORM

### Geändert

- PROCESS-SPEC v2.0 und TECHNICAL-SPEC v1.0 — vollständige Bereinigung (kein H5P/ARASAAC/tRPC/Vercel im Leitfaden)
- ops/RUNBOOK.md — operatives Runbook
- DEFINITION-OF-DONE Phase A abgeschlossen

---

## [0.1.0-docs] — 2026-07-05

### Hinzugefügt

- Initiale Konzept-Specs: TECHNICAL-SPEC, DESIGN-SPEC, PROCESS-SPEC
- PIKTOGRAMM-TOOLS Recherche
- README, LICENSE
