# Definition of Done

> **Version:** 1.0  
> **Datum:** 2026-07-05

---

## Phase A — Dokumentation

- [x] Alle P1-Dokumente im Repo
- [x] ADRs verabschiedet (001–013)
- [x] PROCESS-SPEC und TECHNICAL-SPEC bereinigt (v2.0 / v1.0)
- [x] RUNBOOK und INCIDENT-RESPONSE vorhanden
- [x] `.cursor/rules`, `.github/` vorhanden
- [x] STATUS.md aktuell

---

## Phase 1 MVP — Plattform + 3 Module

### Plattform

- [ ] Next.js App baut ohne Fehler
- [ ] DESIGN-SPEC Tokens in Tailwind/globals.css
- [ ] `prefers-reduced-motion` global aktiv
- [ ] Kursübersicht, Modul-Player, Quiz (MC)
- [ ] Fortschritt in PostgreSQL
- [ ] MiniMax-Proxy funktioniert
- [ ] Lighthouse Performance ≥ 90 (Kursübersicht, lokal)
- [ ] WCAG-Kontrast-Check Primär- und Semantic-Farben
- [ ] iPad-Test (768px) für Navigation und Touch-Targets
- [ ] CI grün

### Content (pro Modul)

- [ ] `metadata.json`, `script.md`, `quiz.json` vollständig
- [ ] Pictogramme (MiniMax/manual) mit Alt-Text
- [ ] Audio (TTS) + Video mit WebVTT
- [ ] Domain-Expert-Review bestanden
- [ ] WCAG Basis-Check bestanden

### Betrieb

- [ ] Prod auf neuem Hetzner erreichbar (HTTPS)
- [ ] Deploy reproduzierbar
- [ ] Backup + Restore getestet
- [ ] Compliance-Entwürfe vorhanden

---

## Pull Request DoD

- [ ] Lint + Typecheck + Build grün
- [ ] Keine Secrets im Diff
- [ ] CHANGELOG aktualisiert (bei User-facing Changes)
- [ ] Doku angepasst falls nötig

---

## Referenzen

- [PRD.md](PRD.md)
- [ROADMAP.md](ROADMAP.md)
- [DESIGN-SPEC.md](DESIGN-SPEC.md)
- [UX-IMPLEMENTATION.md](UX-IMPLEMENTATION.md)
