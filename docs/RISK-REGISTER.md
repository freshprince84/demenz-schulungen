# Risiko-Register

> **Version:** 1.0  
> **Datum:** 2026-07-05

---

| ID | Risiko | W | I | Mitigation | Status |
|----|--------|---|---|------------|--------|
| R1 | MiniMax API-Ausfall | M | H | Statische Assets im Repo, manuelle Fallbacks | Offen |
| R2 | Scope-Creep (eigenes LMS) | H | M | ADRs, Phasen-Roadmap, DoD | Beobachtet |
| R3 | PII an MiniMax | L | H | Prompt-Validierung, Code-Review | Mitigiert |
| R4 | Prod-Server nicht rechtzeitig | M | M | Phase B parallel ohne Prod möglich | Offen |
| R5 | WCAG nicht erfüllt | M | H | TEST-STRATEGY, A11y-Checks in CI | Offen |
| R6 | Video-Assets zu groß für Git | M | L | Git LFS oder Media-Volume | Offen |
| R7 | DSGVO-Lücken bei Auth Go-Live | M | H | DPIA vor Phase 2, TOMs | Beobachtet |
| R8 | Winston/Prod verwechselt | L | M | ARCHITECTURE.md, Cursor Rules | Mitigiert |

**W** = Wahrscheinlichkeit (L/M/H), **I** = Impact (L/M/H)
