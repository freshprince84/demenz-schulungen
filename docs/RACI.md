# RACI — Rollen & Verantwortlichkeiten

> **Version:** 1.0  
> **Datum:** 2026-07-05

---

## Rollen

| Rolle | Beschreibung |
|-------|--------------|
| **Patrick** | Projektinhaber, Prod-Server, Freigaben |
| **Cursor** | Entwicklung (Code, Doku) lokal |
| **Winston** | Content-Assistenz (Clawdbot, eigener Hetzner, nur MiniMax) |
| **Domain-Expert** | Fachliche Validierung Schulungsinhalte |

---

## RACI-Matrix

| Aufgabe | Patrick | Cursor | Winston | Domain-Expert |
|---------|---------|--------|---------|---------------|
| Architektur-Entscheidungen | A | R | I | C |
| Code-Entwicklung | A | R | — | — |
| Content-Entwürfe | A | C | R | C |
| Content-Freigabe | A | — | — | R |
| Prod-Server Setup | R/A | C | — | — |
| Deploy | A | R | — | — |
| DSGVO-Doku | R/A | C | — | — |
| MiniMax-Prompts | A | C | R | — |

**Legende:** R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## System-Grenzen

- **Cursor** läuft lokal — schreibt Code, committet zu GitHub
- **Winston** läuft auf **eigenem Hetzner** — keine Prod-Abhängigkeit
- **Prod-App** läuft auf **neuem Hetzner** — getrennt von Winston und Intranet
