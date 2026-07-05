# Content-Spezifikation

> **Version:** 1.1  
> **Datum:** 2026-07-05  
> **Bezug:** [PROCESS-SPEC.md](PROCESS-SPEC.md) v2.0

---

## 1. Didaktische Grundsätze

| Prinzip | Umsetzung |
|---------|-----------|
| Einfache Sprache | A2-Niveau (GER), max. 7–10 Wörter/Satz |
| Ein Konzept pro Frame | Storyboard: 1 Pictogramm + 1 Aussage |
| Multi-Modal | Bild + Text + Audio (+ Untertitel) |
| Wiederholung | Wichtige Konzepte 3× (unterschiedliche Modalitäten) |
| Barrierefreiheit | WCAG 2.1 AA, DESIGN-SPEC |

---

## 2. Zielgruppe

**Primär:** Pflegefachkräfte und Angehörige (Lernende)  
**Nicht primär:** Direkte Schulung für Menschen mit fortgeschrittener Demenz

---

## 3. Pictogramme

- **Quelle:** MiniMax Image-01 oder manuell (SVG)
- **Stil:** Flat, hoher Kontrast, max. 3 Farben
- **Größe:** Min. 128×128 px Web, 2× für Retina
- **Label:** Immer Text unter Pictogramm (18px+)

**Verworfen:** ARASAAC, lizenzierte Icon-Bibliotheken.

---

## 4. Audio (TTS)

- **Engine:** MiniMax `speech-02-hd`
- **Tempo:** Langsam (≈0.9×)
- **Format:** MP3, 128 kbps
- **Review:** Jedes Segment manuell anhören vor Commit

---

## 5. Video

- **Bevorzugt:** Statische Slideshow + TTS + Untertitel
- **Optional:** MiniMax Hailuo für sanfte Animation
- **Untertitel:** WebVTT, Pflicht, manuell korrigiert (Whisper als Entwurf)
- **Max. Länge:** 3–5 Min pro Hauptlektion

---

## 6. Quiz

- Format: [QUIZ-SCHEMA.md](QUIZ-SCHEMA.md)
- Eigene React-Komponenten, DESIGN-SPEC-konform
- Mindestpunktzahl: 80% (konfigurierbar in `quiz.json`)

---

## 7. Review-Prozess

1. Autor erstellt Modul (Cursor + optional Winston)
2. Domain-Expert prüft Fachlichkeit
3. Tech-Check: Schema-Validierung, WCAG
4. Status in `metadata.json` → `published`

---

## 8. Winston-Workflow

Winston (Clawdbot auf eigenem Hetzner) unterstützt:

- Script-Entwürfe (MiniMax Text)
- Pictogramm-Prompts und Generierung
- TTS-Segmentierung

**Output:** Dateien im Repo — Mensch reviewt vor Commit.

---

## 9. Referenzen

- [MODULE-TEMPLATE.md](MODULE-TEMPLATE.md)
- [DESIGN-SPEC.md](DESIGN-SPEC.md)
- [PROCESS-SPEC.md](PROCESS-SPEC.md)
