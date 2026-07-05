# API-Spezifikation

> **Version:** 1.0  
> **Datum:** 2026-07-05  
> **Stil:** REST + JSON  
> **Validierung:** Zod

---

## 1. Basis

- **Base URL:** `https://{domain}/api`
- **Auth:** Session/JWT (Phase 2) — Phase 1 ohne Auth für Entwicklung
- **Content-Type:** `application/json`
- **Fehlerformat:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Beschreibung",
    "details": []
  }
}
```

---

## 2. Kurse & Module

### GET `/api/courses`

Liste aller Kurse.

**Response 200:**

```json
{
  "courses": [
    {
      "id": "uuid",
      "title": "Demenz-Basics",
      "description": "...",
      "moduleCount": 3,
      "language": "DE"
    }
  ]
}
```

### GET `/api/courses/:id`

Kursdetails inkl. Module.

### GET `/api/modules/:slug`

Modul-Details (Metadaten + Content-Referenzen).

---

## 3. Fortschritt

### GET `/api/progress`

Eigene Fortschritte (authentifizierter User).

### POST `/api/progress`

Fortschritt aktualisieren.

**Body:**

```json
{
  "moduleId": "uuid",
  "completed": true,
  "score": 80
}
```

### GET `/api/progress/course/:courseId`

Aggregierter Fortschritt pro Kurs.

---

## 4. MiniMax Proxy (serverseitig)

> API-Key **niemals** im Client. Keine PII in Prompts.

### POST `/api/generate/text`

Text generieren (Scripts, Quiz-Fragen).

### POST `/api/generate/speech`

TTS — Text zu MP3 (Base64 oder Speicherung).

**Body:**

```json
{
  "text": "Waschen Sie die Hände.",
  "voiceId": "de-standard",
  "model": "speech-02-hd"
}
```

### POST `/api/generate/image`

Pictogramm generieren (Image-01).

**Body:**

```json
{
  "prompt": "Simple flat pictogram of hand washing...",
  "aspectRatio": "1:1"
}
```

### Rate Limiting

- Max 60 Requests/Minute pro IP/User
- Debounce im Frontend: min. 1s zwischen Aufrufen

---

## 5. Health

### GET `/api/health`

**Response 200:**

```json
{
  "status": "ok",
  "database": "connected",
  "version": "0.1.0"
}
```

---

## 6. Sicherheit

- Alle Inputs via Zod validieren
- HTML-Sanitization für user-generated Content (später)
- CSP siehe [SECURITY.md](SECURITY.md)

---

## 7. Referenzen

- [ARCHITECTURE.md](ARCHITECTURE.md)
- [DECISIONS.md](DECISIONS.md) ADR-005
