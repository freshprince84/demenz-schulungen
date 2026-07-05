# Datenschutz-Folgenabschätzung (DPIA)

> **Version:** 0.2 (Entwurf)  
> **Datum:** 2026-07-05  
> **Status:** Vor erstem produktivem Login mit echten Nutzern finalisieren

---

## 1. Notwendigkeit (Art. 35 DSGVO)

Eine DPIA ist durchzuführen, wenn eine Verarbeitung voraussichtlich ein **hohes Risiko** für die Rechte betroffener Personen zur Folge hat.

### Phase 1 (ohne Auth, keine echten Nutzerkonten)

**Keine vollständige DPIA erforderlich** — noch keine systematische Verarbeitung personenbezogener Daten von identifizierbaren Lernenden.

### Phase 2 (mit Auth und echten Nutzern)

**DPIA vor Go-Live finalisieren** — voraussichtlich **keine Pflicht-DPIA** nach Art. 35 Abs. 3, aber freiwillige Dokumentation empfohlen.

---

## 2. Prüfung nach Art. 35 Abs. 3 / WP248-Kriterien

| Kriterium | Zutreffend? | Begründung |
|-----------|-------------|------------|
| Systematische Bewertung (Scoring) | Nein | Kein Scoring, keine Leistungsbewertung von Personen |
| Automatisierte Entscheidung mit Rechtswirkung | Nein | — |
| Umfangreiche Verarbeitung sensibler Daten (Art. 9) | Nein | Keine Gesundheitsdaten der Lernenden; Inhalte **über** Demenz, nicht **von** Betroffenen mit Demenz |
| Umfangreiche systematische Überwachung | Nein | Kein Tracking, keine Videoüberwachung |
| Verarbeitung vulnerabler Personen | **Nein** | Lernende sind Pflegekräfte/Angehörige, nicht die demenzerkrankten Personen selbst |
| Innovative Technologie | Teilweise | MiniMax-KI nur bei Content-Erstellung, nicht im Lernflow |
| Datenübermittlung in Drittland | MiniMax (Content) | Keine PII — Risiko begrenzt |

**Vorläufiges Ergebnis:** Keine zwingende DPIA nach Art. 35 Abs. 3 — dennoch Risikodokumentation vor Phase 2.

---

## 3. Beschreibung der Verarbeitung

- Schulungsplattform mit Login (Phase 2)
- Speicherung: Name, E-Mail, Passwort-Hash, Lernfortschritt
- Hosting: Eigener Hetzner-Server (EU)
- Keine Profilbildung, kein Verhaltens-Tracking
- MiniMax: nur Autorenzeit, statische Assets für Lernende

---

## 4. Risiken

| Risiko | Eintritt | Schaden | Maßnahme |
|--------|----------|---------|----------|
| Unbefugter Zugriff | Mittel | Mittel | Auth, TLS, TOMs, Rate Limiting |
| Datenverlust | Niedrig | Mittel | Tägliche Backups, Restore-Tests |
| MiniMax — PII in Prompt | Niedrig | Hoch | Prompt-Validierung, Review, keine PII (ADR-005) |
| MiniMax — Drittlandtransfer | Niedrig | Mittel | Keine personenbezogenen Daten; rechtliche Klärung vor Go-Live |
| Server-Kompromittierung | Niedrig | Hoch | Hardening, Updates, Key-only SSH |
| Datenpanne unentdeckt | Niedrig | Mittel | Incident-Response-Prozess (72h) |

---

## 5. Fazit (vorläufig)

Mit geplanten TOMs ist das Risiko **beherrschbar**.

**Trigger für Finalisierung:** Vor erstem produktivem Login mit echten Nutzerkonten (Phase 2 Go-Live).

**Freigabe durch:** Patrick (Verantwortlicher)

---

## 6. Referenzen

- [DATENSCHUTZKONZEPT.md](DATENSCHUTZKONZEPT.md)
- [TOMS.md](TOMS.md)
- [VERARBEITUNGSVERZEICHNIS.md](VERARBEITUNGSVERZEICHNIS.md)
