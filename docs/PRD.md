# Product Requirements Document (PRD)

> **Version:** 1.0  
> **Datum:** 2026-07-05  
> **Phase:** 1 (MVP)

---

## 1. Überblick

**Produkt:** Demenz-Schulungen — eigenständige Lernplattform  
**Phase 1 Ziel:** 3 Pilotmodule + funktionierende Plattform mit Login-Gate (Phase 2), Fortschritt in DB

---

## 2. User Stories (Phase 1)

### Lernende (Pflege / Angehörige)

| ID | Story | Priorität | Akzeptanzkriterium |
|----|-------|-----------|-------------------|
| US-01 | Als Lernende*r möchte ich alle Kurse auf einen Blick sehen | Must | Kursübersicht mit Titel, Dauer, Fortschritt |
| US-02 | Als Lernende*r möchte ich ein Modul Schritt für Schritt durchlaufen | Must | Storyboard-Frames mit Piktogramm + Text + Audio |
| US-03 | Als Lernende*r möchte ich mein Wissen in einem Quiz prüfen | Must | Multiple Choice, Feedback, Punktzahl |
| US-04 | Als Lernende*r möchte ich Untertitel zu Videos sehen | Must | WebVTT, ein/ausschaltbar |
| US-05 | Als Lernende*r möchte ich große, gut lesbare Inhalte | Must | DESIGN-SPEC: min. 16px, Kontrast 4.5:1 |
| US-06 | Als Lernende*r möchte ich meinen Fortschritt sehen | Must | Fortschrittsbalken pro Modul/Kurs |

### Content-Erstellung (Patrick + Winston)

| ID | Story | Priorität | Akzeptanzkriterium |
|----|-------|-----------|-------------------|
| US-10 | Als Autor möchte ich Module im Repo versionieren | Must | `modules/` Struktur laut MODULE-TEMPLATE |
| US-11 | Als Autor möchte ich Piktogramme per MiniMax erzeugen | Must | Proxy-API, Review vor Commit |
| US-12 | Als Autor möchte ich Quiz in JSON definieren | Must | `quiz.json` validiert gegen Schema |

### Betrieb

| ID | Story | Priorität | Akzeptanzkriterium |
|----|-------|-----------|-------------------|
| US-20 | Als Betreiber möchte ich reproduzierbar deployen | Must | Docker Compose, CI grün |
| US-21 | Als Betreiber möchte ich Backups haben | Must | DB + Media, Restore getestet |

---

## 3. MoSCoW Phase 1

### Must Have

- Kursübersicht, Modul-Player, Quiz (MC), Fortschritt (DB)
- 3 Pilotmodule (Hände waschen, Medikamente, Ernährung)
- MiniMax-Proxy (TTS, Image)
- DESIGN-SPEC umgesetzt
- WCAG 2.1 AA Basis

### Should Have

- PWA / Offline für 1 Modul
- Feedback-Formular nach Modulabschluss

### Could Have

- Dark Mode (DESIGN-SPEC vorbereitet)

### Won't Have (Phase 1)

- Login/Auth (Phase 2 — aktuell Entwicklung ohne Auth-Gate möglich)
- SCORM-Export
- Drag&Drop-Quiz
- Multi-Sprache (nur DE)

---

## 4. Pilotmodule

| Modul | Lernziel | Dauer |
|-------|----------|-------|
| Hände waschen | 3 Hygieneschritte benennen | 10–12 Min |
| Medikamenteneinnahme | Sichere Medikamentengabe erklären | 12–15 Min |
| Ernährung bei Demenz | 3 Ernährungsprinzipien benennen | 10–12 Min |

---

## 5. Abhängigkeiten

- Neuer Hetzner Prod-Server (Patrick provisioniert)
- MiniMax API-Key
- Domain + TLS (Caddy)

---

## 6. Referenzen

- [PRODUCT-VISION.md](PRODUCT-VISION.md)
- [DECISIONS.md](DECISIONS.md)
- [DESIGN-SPEC.md](DESIGN-SPEC.md)
- [UX-IMPLEMENTATION.md](UX-IMPLEMENTATION.md)
