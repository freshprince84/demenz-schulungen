# Product Vision — Demenz-Schulungen

> **Version:** 1.0  
> **Datum:** 2026-07-05  
> **Status:** Verabschiedet

---

## Vision

Eine **vollständig eigenständige**, barrierefreie Schulungsplattform für Pflegefachkräfte und Angehörige im Demenzbereich — mit piktogrammgestützter Didaktik, ruhiger UX und reproduzierbarer Content-Pipeline.

## Problemstellung

- Bestehende Demenz-Schulungen sind oft textlastig, nicht barrierefrei genug und nicht auf Piktogramm-Didaktik optimiert.
- Fremde LMS-Produkte (Moodle etc.) binden an fremde UX, Lizenzen und Abhängigkeiten.
- Kaum Angebote kombinieren Piktogramme, Audio/Video und interaktive Übungen in konsistenter Qualität.

## Lösung

1. **Eigene Plattform** (Next.js, Self-Hosted auf Hetzner)
2. **Eigene Content-Pipeline** (Storyboard → MiniMax-Assets → eigene Quiz-Komponenten)
3. **Maximale Unabhängigkeit** (Selbstbau, keine Abos, keine fremden LMS)

## Zielgruppen

| Zielgruppe | Bedürfnis |
|------------|-----------|
| **Pflegefachkräfte** | Praxisnahes Wissen, klare Handlungsanweisungen |
| **Angehörige** | Verständliche Alltagshilfen, Entlastung |
| **Administratoren** (später) | Nutzerverwaltung, Fortschritt einsehen |

## Erfolgskriterien

- WCAG 2.1 AA Basis erfüllt
- A2-Sprachniveau in allen Modulen
- 3 Pilotmodule vollständig durchlaufbar (Phase 1)
- Reproduzierbarer Build + Deploy
- Formale DSGVO-Compliance dokumentiert

## Non-Goals (Phase 1)

- Kein SCORM-Export
- Kein Multi-Tenant / Mandantenfähigkeit
- Keine Zertifikate
- Kein öffentlicher Zugang ohne Login

## Projektprinzipien

Siehe [DECISIONS.md](DECISIONS.md) — Selbstbau, keine Abos, Zeit keine Einschränkung.
