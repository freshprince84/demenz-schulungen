# Projektstatus

> **Letzte Aktualisierung:** 2026-07-05  
> **Phase:** A abgeschlossen — bereit für Phase B

---

## Gesamtstatus

| Bereich | Status | Fortschritt |
|---------|--------|-------------|
| Dokumentation Phase A | **Abgeschlossen** | 100% |
| Doku-Qualität (Option B) | **Abgeschlossen** | PROCESS + TECHNICAL bereinigt, RUNBOOK |
| Compliance | Entwurf v1.1 | Freigabe vor Go-Live |
| Server claw-daniela | SSH-Key generiert | Inventar ausstehend |
| Code / Plattform | Nicht gestartet | 0% — **nächster Schritt** |
| Prod-Server | Nicht provisioniert | 0% |

---

## Option B erledigt (2026-07-05)

1. **PROCESS-SPEC.md v2.0** — vollständige Neufassung (Winston, MiniMax, eigenes Quiz, Hetzner-Deploy)
2. **TECHNICAL-SPEC.md v1.0** — REST, Drizzle, Hetzner-Pipeline, kein tRPC/Vercel/ARASAAC
3. **ops/RUNBOOK.md** — Betrieb, Deploy, Backup, Rollback, Monitoring
4. **DEFINITION-OF-DONE** — Phase A abgehakt
5. Querverweise in TOMS, DEPLOYMENT, README, DESIGN-SPEC bereinigt

---

## Maßgebliche Dokumente für Phase B

1. [DECISIONS.md](DECISIONS.md)
2. [ARCHITECTURE.md](ARCHITECTURE.md) + [API-SPEC.md](API-SPEC.md) + [DATA-MODEL.md](DATA-MODEL.md)
3. [DESIGN-SPEC.md](DESIGN-SPEC.md) + [UX-IMPLEMENTATION.md](UX-IMPLEMENTATION.md)
4. [PROCESS-SPEC.md](PROCESS-SPEC.md) + [CONTENT-SPEC.md](CONTENT-SPEC.md)
5. [ops/RUNBOOK.md](ops/RUNBOOK.md)

**Nicht als Leitfaden:** [PIKTOGRAMM-TOOLS.md](../PIKTOGRAMM-TOOLS.md) (historische Recherche)

---

## Blocker

| ID | Blocker | Verantwortlich |
|----|---------|----------------|
| B1 | Public Key auf claw-daniela | Patrick |
| B2 | Prod-Server + Domain | Patrick |
| B3 | MiniMax-Key in `.env` | Patrick |
| B4 | Compliance-Freigabe | Patrick |

---

## Nächster Schritt

**Phase B:** Next.js 15 + Drizzle + Docker Compose + Basis-UI
