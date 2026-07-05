# Modul-Template

> **Version:** 1.0  
> **Datum:** 2026-07-05

---

## 1. Ordnerstruktur

```
modules/{modul-slug}/
├── de/
│   ├── metadata.json       # Pflicht
│   ├── script.md           # Storyboard (Pflicht)
│   ├── quiz.json           # Quiz (Pflicht)
│   ├── pictograms/         # PNG/SVG
│   ├── audio/              # MP3 (TTS)
│   └── video/              # MP4 + .vtt Untertitel
└── shared/                 # Optional: sprachunabhängig
```

**Slug-Regeln:** Kleinbuchstaben, Bindestriche, z.B. `handewaschen`, `medikamente`, `ernaehrung`.

---

## 2. `metadata.json`

```json
{
  "slug": "handewaschen",
  "title": "Hände waschen",
  "description": "Hygiene bei der Demenzpflege.",
  "language": "de",
  "estimatedMinutes": 12,
  "difficulty": "beginner",
  "learningObjectives": [
    "Der Teilnehmer kann 3 Hygieneschritte benennen."
  ],
  "tags": ["hygiene", "alltag"],
  "version": "1.0.0",
  "status": "draft",
  "reviewedBy": null,
  "reviewedAt": null
}
```

| Feld | Pflicht | Beschreibung |
|------|---------|--------------|
| `slug` | ja | Eindeutig, gleich wie Ordner |
| `title` | ja | Anzeigename |
| `learningObjectives` | ja | SMART formuliert |
| `status` | ja | `draft`, `review`, `published` |

---

## 3. `script.md` (Storyboard)

```markdown
# Hände waschen

## Frame 01
- Pictogramm: `pictograms/water.png`
- Text: "Hände waschen ist wichtig."
- Audio: `audio/frame01.mp3`
- Dauer: 5s

## Frame 02
- Pictogramm: `pictograms/soap.png`
- Text: "Nutzen Sie Seife."
- Audio: `audio/frame02.mp3`
- Dauer: 5s
```

**Regeln:** A2-Sprache, max. 7–10 Wörter pro Satz, 1 Konzept pro Frame.

---

## 4. Pictogramm-Metadaten

Pro Bild optional `pictograms/manifest.json`:

```json
{
  "items": [
    {
      "file": "water.png",
      "keywordDe": "Wasser",
      "source": "minimax",
      "alt": "Glas Wasser",
      "generatedAt": "2026-07-05"
    }
  ]
}
```

`source`: `minimax` | `manual`

---

## 5. Video

- Format: MP4 (H.264), 16:9
- Untertitel: WebVTT (`.vtt`), Pflicht
- Max. Länge pro Modul: 15 Min (PROCESS-SPEC)

---

## 6. Freigabe-Checkliste

- [ ] Script Domain-Expert geprüft
- [ ] Alle Pictogramme mit Alt-Text
- [ ] Untertitel korrekt
- [ ] `quiz.json` validiert
- [ ] WCAG-Kontrast geprüft
- [ ] `metadata.json` status → `published`

---

## 7. Referenzen

- [CONTENT-SPEC.md](CONTENT-SPEC.md)
- [QUIZ-SCHEMA.md](QUIZ-SCHEMA.md)
- [PROCESS-SPEC.md](PROCESS-SPEC.md)
