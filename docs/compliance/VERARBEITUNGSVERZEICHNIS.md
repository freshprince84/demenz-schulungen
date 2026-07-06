# Verarbeitungsverzeichnis (Art. 30 DSGVO)

> **Version:** 1.1  
> **Datum:** 2026-07-05  
> **Status:** Entwurf

---

## Allgemeine Angaben

| Feld | Inhalt |
|------|--------|
| **Verantwortlicher** | Patrick |
| **Kontakt Verantwortlicher** | `privacy@<PROD-DOMAIN>` — vor Go-Live eintragen |
| **Datenschutzbeauftragter** | Nicht bestellt (siehe Datenschutzkonzept §2 — Begründung dokumentiert) |

---

## Verarbeitungstätigkeit 1: Schulungsplattform — Nutzung & Fortschritt

| Feld | Inhalt |
|------|--------|
| **Name** | Demenz-Schulungen — Lernfortschritt |
| **Zweck** | Bereitstellung von Demenz-Schulungen, Fortschrittserfassung |
| **Rechtsgrundlage** | Art. 6 Abs. 1 lit. f (berechtigtes Interesse) Phase 1; lit. b (Vertrag) ab Phase 2 — vor Go-Live festlegen |
| **Kategorien betroffener Personen** | Pflegefachkräfte, Angehörige (Lernende) — **nicht** die an Demenz erkrankten Personen selbst |
| **Kategorien personenbezogener Daten** | Lernfortschritt, Quiz-Ergebnisse; ab Phase 2 zusätzlich Name, E-Mail |
| **Kategorien von Empfängern** | Hetzner (Hosting EU), intern: Administrator (Patrick) |
| **Drittlandtransfer** | Nein für Nutzerdaten (Server EU) |
| **Löschfristen** | Siehe Datenschutzkonzept §7 |
| **TOMs** | Siehe TOMS.md |

---

## Verarbeitungstätigkeit 1b: Authentifizierung (Phase 2)

| Feld | Inhalt |
|------|--------|
| **Zweck** | Login, Zugriffskontrolle |
| **Rechtsgrundlage** | Art. 6 Abs. 1 lit. b DSGVO |
| **Daten** | E-Mail, Name, Passwort-Hash (bcrypt), Session-Token/Cookie |
| **Empfänger** | Hetzner (Hosting EU) |
| **Drittlandtransfer** | Nein |
| **Löschfristen** | Mit Kontolöschung |
| **TOMs** | TOMS.md §1 (bcrypt, HttpOnly-Cookies) |

---

## Verarbeitungstätigkeit 2: Technischer Betrieb (Logs)

| Feld | Inhalt |
|------|--------|
| **Zweck** | Fehleranalyse, Sicherheit, Missbrauchserkennung |
| **Daten** | IP-Adresse, Zeitstempel, Request-URL, User-Agent, HTTP-Status |
| **Rechtsgrundlage** | Art. 6 Abs. 1 lit. f DSGVO |
| **Speicherdauer** | Max. 30 Tage |
| **Empfänger** | Keine Weitergabe an Dritte |
| **Drittlandtransfer** | Nein |

---

## Verarbeitungstätigkeit 3: KI-gestützte Content-Erstellung (MiniMax)

| Feld | Inhalt |
|------|--------|
| **Zweck** | Generierung von Schulungstexten, Audio, Piktogrammen (Autorenzeit) |
| **Daten** | **Keine personenbezogenen Daten** — nur fiktive Schulungsinhalte und generische Prompts |
| **Empfänger** | MiniMax (API, Sitz Shanghai/China) |
| **Drittlandtransfer** | Technischer API-Aufruf in Drittland; **keine** personenbezogenen Daten übermittelt (organisatorisch + Prompt-Validierung) |
| **Rechtsgrundlage** | Nicht anwendbar auf personenbezogene Daten; bei Klärung Art. 28 prüfen |
| **Maßnahme** | Zod-Validierung, Review-Workflow, keine PII in Prompts (ADR-005) |
| **Hinweis** | Endnutzer-Lernflow nutzt statische Assets — kein Live-MiniMax für Lernende |

---

## Verarbeitungstätigkeit 4: Winston/Clawdbot (Assistenz)

| Feld | Inhalt |
|------|--------|
| **Zweck** | Unterstützung bei Content-Erstellung (Charlie auf `demenz-prod`) |
| **Server** | Hetzner VPS `91.99.99.177` (≠ Prod-Server, ≠ Intranet) |
| **Daten** | Keine Prod-Nutzerdaten; Content-Entwürfe, Repo-Zugriff |
| **KI** | Ausschließlich MiniMax (wie Tätigkeit 3) |
| **Drittlandtransfer** | Wie Tätigkeit 3 |

---

## Verarbeitungstätigkeit 5: Backups

| Feld | Inhalt |
|------|--------|
| **Zweck** | Wiederherstellung bei Ausfall |
| **Daten** | Vollständige DB-Kopie inkl. Nutzerdaten (ab Phase 2) |
| **Speicherort** | Hetzner EU (gleicher Anbieter oder separate Storage Box — vor Prod festlegen) |
| **Retention** | 30 Tage |
| **TOMs** | Verschlüsselung at-rest, Zugriff nur Patrick |

---

## Änderungshistorie

| Version | Datum | Änderung |
|---------|-------|----------|
| 1.0 | 2026-07-05 | Initiale Version |
| 1.1 | 2026-07-05 | Auth getrennt, MiniMax/Drittland, DSB, Kontakt, Backups |
