# Quiz-Schema (`quiz.json`)

> **Version:** 1.0  
> **Datum:** 2026-07-05  
> **Format:** JSON Schema (vereinfacht)

---

## 1. Zweck

Definiert interaktive Übungen pro Modul. Wird von eigenen React-Komponenten gerendert — **kein H5P**.

---

## 2. Root-Objekt

```json
{
  "$schema": "demenz-schulungen/quiz/v1",
  "moduleSlug": "handewaschen",
  "language": "de",
  "passingScore": 80,
  "maxAttempts": 3,
  "questions": []
}
```

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `$schema` | string | ja | Schema-Version |
| `moduleSlug` | string | ja | Eindeutiger Modul-Slug |
| `language` | string | ja | `de`, `es` (später) |
| `passingScore` | number | ja | Mindest-% zum Bestehen (0–100) |
| `maxAttempts` | number | nein | Default: 3 |
| `questions` | array | ja | Fragenliste |

---

## 3. Fragetypen (Phase 1)

### 3.1 `multiple_choice`

```json
{
  "id": "q1",
  "type": "multiple_choice",
  "question": "Was ist der erste Schritt?",
  "pictogram": "/modules/handewaschen/de/pictograms/step1.png",
  "options": [
    { "id": "a", "text": "Hände nass machen", "correct": true },
    { "id": "b", "text": "Hände trocknen", "correct": false },
    { "id": "c", "text": "Seife weglegen", "correct": false }
  ],
  "feedback": {
    "correct": "Richtig! Zuerst werden die Hände nass.",
    "incorrect": "Nicht ganz. Zuerst nass machen."
  }
}
```

### 3.2 `true_false` (optional Phase 1)

```json
{
  "id": "q2",
  "type": "true_false",
  "question": "Seife ist wichtig.",
  "correct": true,
  "feedback": {
    "correct": "Ja, Seife entfernt Keime.",
    "incorrect": "Seife ist wichtig beim Händewaschen."
  }
}
```

---

## 4. Phase 2 (geplant)

- `drag_drop` — Begriffe zuordnen
- `categorize` — In Kategorien sortieren
- `dialog_card` — Kommunikationsübungen

---

## 5. Validierung

- Zod-Schema in `src/lib/schemas/quiz.ts`
- CI-Check: `npm run validate:content` prüft alle `quiz.json`

---

## 6. Barrierefreiheit

- Jede Frage: Text + optional Pictogramm mit `alt`-Text
- Feedback nie nur farblich (immer Text)
- Tastatur: Optionen per Tab + Enter wählbar

---

## 7. Beispiel (vollständig)

```json
{
  "$schema": "demenz-schulungen/quiz/v1",
  "moduleSlug": "handewaschen",
  "language": "de",
  "passingScore": 80,
  "maxAttempts": 3,
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "Was machen Sie zuerst?",
      "pictogram": "/modules/handewaschen/de/pictograms/water.png",
      "options": [
        { "id": "a", "text": "Hände nass machen", "correct": true },
        { "id": "b", "text": "Hände abtrocknen", "correct": false }
      ],
      "feedback": {
        "correct": "Richtig!",
        "incorrect": "Zuerst die Hände nass machen."
      }
    }
  ]
}
```
