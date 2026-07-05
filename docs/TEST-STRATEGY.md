# Test-Strategie

> **Version:** 1.0  
> **Datum:** 2026-07-05

---

## 1. Ziele

- Regressionen früh erkennen
- Barrierefreiheit messbar prüfen
- Content-Schemas validieren

---

## 2. Test-Pyramide

| Ebene | Tool (geplant) | Umfang |
|-------|----------------|--------|
| Unit | Vitest | Utils, Zod-Schemas, Quiz-Logik |
| Integration | Vitest + Drizzle | API Routes, DB |
| E2E | Playwright | Kurs → Modul → Quiz Flow |
| A11y | axe-core / Playwright | WCAG 2.1 AA Basis |
| Content | Custom Script | `quiz.json`, `metadata.json` |

---

## 3. CI-Pipeline

Bei jedem PR:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test` (sobald vorhanden)
4. `npm run build`
5. `npm run validate:content`

---

## 4. Manuelle Tests

| Test | Wann | Wer |
|------|------|-----|
| Domain-Expert Content-Review | Jedes Modul | Extern |
| WCAG Checkliste | Vor Release | Dev |
| Tablet/Mobile Smoke | Vor Release | Dev |
| Backup-Restore | Monatlich | Patrick |

---

## 5. Accessibility

Checkliste aus [PROCESS-SPEC.md](PROCESS-SPEC.md) §4.2:

- Kontrast ≥ 4.5:1
- Tastatur-Navigation
- Untertitel vorhanden
- `prefers-reduced-motion`

---

## 6. Referenzen

- [DEFINITION-OF-DONE.md](DEFINITION-OF-DONE.md)
- [QUIZ-SCHEMA.md](QUIZ-SCHEMA.md)
