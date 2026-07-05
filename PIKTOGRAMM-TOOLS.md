# PIKTOGRAMM-TOOLS.md — Pictogramme & KI-Tools für Demenz-Schulungen

> **Recherche-Status:** Abgeschlossen (05.07.2026)  
> **Modell-Referenz:** MiniMax M2.7 (minimax/MiniMax-M2.7)  
> **Zweck:** Grundlage für den Aufbau einer KI-gestützten Pictogramm-Schulungsplattform

---

## Inhaltsverzeichnis

1. [Pictogramme für Demenz-/Pflege-Schulungen](#1-pictogramme-für-demenz--pflege-schulungen)
2. [Video-Erstellung mit Pictogrammen](#2-video-erstellung-mit-pictogrammen)
3. [Schulungsplattformen (LMS/SCORM/H5P)](#3-schulungsplattformen-lms-scorm-h5p)
4. [Fertige Demenz-Schulungsprogramme](#4-fertige-demenz-schulungsprogramme)
5. [Open-Source / Gratis Pictogramm-Sammlungen](#5-open-source--gratis-pictogramm-sammlungen)
6. [MiniMax API — Pictogramm-Generierung](#6-minimax-api--pictogramm-generierung)
7. [MiniMax API — Text-to-Speech](#7-minimax-api--text-to-speech)
8. [MiniMax API — Video-Generierung (Hailuo)](#8-minimax-api--video-generierung-hailuo)
9. [Konzept: Automatisierter Schulungsgenerator](#9-konzept-automatisierter-schulungsgenerator)
10. [Konzept: Gute Demenz-Schulung](#10-konzept-gute-demenz-schulung)
11. [Workflow-Architektur](#11-workflow-architektur)
12. [Empfehlung: Was zuerst umsetzen?](#12-empfehlung-was-zuerst-umsetzen)

---

## 1. Pictogramme für Demenz-/Pflege-Schulungen

### 1.1 Kommerzielle Anbieter

| Anbieter | Produkt | Preis | Pictogramme | Zielgruppe |
|----------|---------|-------|--------------|------------|
| **Dememo** (dememo.de) | Dememo-Box | €49,99 | 50 Aufkleber (3D-Design + Text) | Menschen mit Demenz, Angehörige |
| **Dememo** | Kompakt-Box | €34,99 | 23 wichtigste Piktogramme | Privatpersonen |
| **Flaticon** (flaticon.com) | Icon-Pack: Demenz | ab $0 (Free) | 660+ Icons | Entwickler, Designer |
| **Pixabay** (pixabay.com) | Illustrationen | kostenlos | 100+ lizenzfreie Illustrationen | Alle |

### 1.2 Wichtige Erkenntnisse
- **Dememo** nutzt 3D-Piktogramme mit Text-Kombination → spricht mehrere Sinne an
- Für Schulungen ist eine **digital skalierbare Lösung** besser als physische Aufkleber
- Die **Demenz-Partner-Initiative** (deutsche-alzheimer.de) bietet kostenlose Schulungsmaterialien für Pflegeeinrichtungen und Krankenhäuser (Stand 2023)

---

## 2. Video-Erstellung mit Pictogrammen

### 2.1 Tools im Vergleich

| Tool | Typ | Preis (monatlich) | Pictogramm-Support | Export |
|------|-----|-------------------|-------------------|--------|
| **Doodly** | Whiteboard-Animation (Desktop) | ab $39/Monat | Eigenes Asset-Library + PNG/JPEG-Upload | MP4 (360p–1080p, 24–60fps) |
| **Toonly** | Cartoon-Explainer | ähnlich Doodly | Drag-and-Drop, eigene Uploads | MP4 |
| **VideoScribe** | Whiteboard-Animation | ab $39/Monat | SVG-Import, große Bibliothek | MP4 |
| **Canva Video** | Online-Editor | ab $12.99/Monat | Pictogramme als Elemente | MP4 |
| **Colossyan** | KI-Avatar-Video | ab $29/Monat | KI-generierte Videos | MP4 |

### 2.2 Doodly — Details
- **Desktop-App** (Windows/Mac), Cloud-Speicher für Projekte
- **Eigene Bilder:** PNG/JPEG-Upload → automatischer "Draw-Path"
- **Audio:** Eigene MP3-Voiceover + Hintergrundmusik möglich
- **Fonts:** Beliebige TTF/OTF-Fonts (wichtig für DE/ES/FR-Sprachen!)
- **Auflösung:** 360p–1080p, 24–60fps
- **Eigentum:** Erstellte Videos gehören dem Nutzer (keine Wiederverwendung durch Anbieter)

### 2.3 KI-basierte Alternativen
- **MiniMax Hailuo** (API) → Pictogramme animieren (siehe Abschnitt 8)
- **Pictory.ai** → Artikel/Text in Video umwandeln (mit Stock-Assets)
- **InVideo** → KI-unterstützte Videoproduktion

---

## 3. Schulungsplattformen (LMS/SCORM/H5P)

### 3.1 SCORM
- **Was es ist:** Sharable Content Object Reference Model — Standard für LMS-Tracking
- **Nutzen:** Lernerfolg tracken, Quiz-Ergebnisse speichern, Abschlusszertifikate
- **Marktanteil:** 56,3% aller LMS-Content-Importe (xAPI.com, 2025)
- **Einschränkung:** SCORM 1.2 ist veraltet; SCORM 2004 oder xAPI/Tin Can bevorzugen

### 3.2 H5P
- **Was es ist:** Open-Source HTML5-Authoring-Tool (h5p.org)
- **Preis:** Kostenlos (Self-Hosted) oder $15/Monat (h5p.com Cloud)
- **Kompatibilität:** Exportiert nach SCORM, xAPI, AICC
- **Integriert in:** WordPress, Moodle, Drupal
- **Einschränkung:** LMS ohne H5P-Plugin braucht SCORM-Wrapper (z.B. Lumi)

### 3.3 xAPI (Tin Can)
- **Was es ist:** Modernes Tracking-Format (flexibler als SCORM)
- **Nutzen:** Micro-Learning, Mobile Learning, externe Aktivitäten tracken
- **H5P:** Nutzt xAPI/LTI nativ

### 3.4 Empfohlene Stack-Kombination
```
Frontend:     H5P (interaktive Übungen, Quizze)
LMS:          Moodle oder WordPress + Sense LMS
Tracking:     xAPI → SCORM 2004 (Fallback)
Video-Host:   Eigenes System oder Vimeo (nicht YouTube für Firmenkurse)
Export:       SCORM-Pakete für Firmen-LMS
```

---

## 4. Fertige Demenz-Schulungsprogramme

### 4.1 International (Englisch)

| Programm | Anbieter | Kosten | Inhalt |
|----------|----------|--------|--------|
| **CARES® Dementia Basics™** | HealthCare Interactive | $199 | 5-Schritte CARES® Method, evidenzbasiert |
| **Alzheimer's Association E-Learning** | alz.org | Kostenlos | Webinare, ECHO-Programm, ALZPro-Ressourcen |
| **HRSA Dementia Training** | U.S. Health Resources & Services Administration | Kostenlos | Materialien für Bildungsanbieter, Fachkräfte, Angehörige |
| **Best Programs for Caregiving** | caregiver.org | Kostenlos | Evidenzbasierte Programme vergleichen |
| **Age-Friendly Health Systems** | IHI (Institute for Healthcare Improvement) | $549 | 4Ms-Framework (What Matters, Medication, Mentation, Mobility) |
| **Activated Insights Training** | activatedinsights.com | $125 | Online-Kurse für Senior Living |

### 4.2 Deutschland/Europa

| Programm | Anbieter | Kosten | Inhalt |
|----------|----------|--------|--------|
| **Demenz Partner Schulungen** | Deutsche Alzheimer Gesellschaft (demenz-partner.de) | Kostenlos | Basiswissen Demenz für alle Interessierten |
| **Demenz-Partner Materialien** | Deutsche Alzheimer Gesellschaft | Kostenlos (PDF-Download) | Für Personal ohne Pflegeaufgaben, für weitere Berufsgruppen |
| **Schulungsboerse Bayern** | Fachstelle für Demenz und Pflege Bayern | Kostenlos | Online- und Präsenz-Schulungen |
| **Kompetenzzentrum Demenz SH** | demenz-sh.de | Kostenlos | Ratgeber Demenz, Pflege (PDF) |
| **GSA KAER Toolkit** | Gerontological Society of America | Kostenlos | Früherkennung und Management von kognitiven Beeinträchtigungen |

### 4.3 Lücke im Markt
- **Kaum existieren Angebote**, die **Pictogramme + Video + interaktive Elemente** kombinieren
- Die meisten Programme sind **textbasiert oder Präsenz-Schulungen**
- **KI-gestützte Personalisierung** (Adaptives Lernen) fehlt fast überall
- **Mehrsprachigkeit** (DE/ES/FR) ist selten

---

## 5. Open-Source / Gratis Pictogramm-Sammlungen

### 5.1 Top-Empfehlungen

| Sammlung | Anzahl | Lizenz | Sprachen | URL |
|----------|--------|--------|----------|-----|
| **ARASAAC** | ~13.000 Symbole (farbig + SW) | CC BY-NC-SA | 9+ inkl. ES, EN, DE, FR | arasaac.org / beta.arasaac.org |
| **OpenSymbols** | 50.000+ Symbole (aggregiert) | Open License | Mehrere | opensymbols.org |
| **Noun Project** | 3 Mio.+ Icons | Free (mit Namensnennung) | Universal | thenounproject.com |
| **Flaticon** | 660+ Demenz-Icons | Free-Tier | Universal | flaticon.com/free-icons/dementia |
| **Pixabay** | 100+ Demenz-Illustrationen | CC0 | Universal | pixabay.com/de/illustrations/search/demenz/ |

### 5.2 ARASAAC — Details
- **Herkunft:** Aragonese Portal of Augmentative and Alternative Communication (Spanien)
- **Lizenz:** CC BY-NC-SA (nicht-kommerziell, ShareAlike)
- **Formate:** PNG, SVG, PSD
- **Sprachen:** Arabisch, Deutsch, Englisch, Französisch, Italienisch, Katalanisch, Polnisch, Rumänisch, Spanisch, Ungarisch
- **Für Demenz:** Suchbar nach Alltagsaktivitäten, Hygiene, Essen, Emotionen
- **API:** Beta-Version verfügbar (beta.arasaac.org)

### 5.3 Empfehlung für das Projekt
1. **Primär:** ARASAAC (kostenlos, mehrsprachig, gut gepflegt)
2. **Sekundär:** MiniMax Image-01 (KI-generierte Pictogramme für Lücken)
3. **Fallback:** Noun Project (breite Abdeckung, kostenpflichtig bei kommerzieller Nutzung)

---

## 6. MiniMax API — Pictogramm-Generierung

### 6.1 Image-01 Modell

| Eigenschaft | Detail |
|------------|--------|
| **Modell** | `image-01` |
| **Input** | Text-Prompt |
| **Output** | Base64-encoded Bild (JPEG) oder URL |
| **Batch** | Bis 9 Bilder pro Request |
| **Rate** | 10 RPM / 60 TPM |
| **Aspect Ratios** | 16:9, 4:3, 3:2, 2:3, 3:4, 9:16, 21:9 |
| **Kosten** | ~1/10tel von Midjourney/DALL-E |

**API-Endpoint:**
```
POST https://api.minimax.io/v1/image_generation
```

**Beispiel-Request (Python):**
```python
import base64, requests, os

url = "https://api.minimax.io/v1/image_generation"
headers = {"Authorization": f"Bearer {os.environ['MINIMAX_API_KEY']}"}
payload = {
    "model": "image-01",
    "prompt": "Simple flat pictogram of a pill bottle with a white cross symbol, "
              "clean vector style, black stroke on white background, "
              "accessible icon design, high contrast, healthcare symbol",
    "aspect_ratio": "1:1",
    "response_format": "base64"
}
response = requests.post(url, headers=headers, json=payload)
images = response.json()["data"]["image_base64"]
with open("output-0.jpeg", "wb") as f:
    f.write(base64.b64decode(images[0]))
```

### 6.2 Pictogramm-Generierung — Prompts

**Stil-Guide für Pictogramme:**
```
Style: Simple flat pictogram / icon / symbol
Design: Clean vector style, black stroke on white background
Features: High contrast, accessible icon design, minimal details
Category: [healthcare | food | hygiene | emotions | daily activities]
Context: For use by people with dementia
```

**Beispiel-Prompts:**
| Pictogramm | Prompt |
|------------|--------|
| Medikamente | "Simple pictogram of a pill bottle, white background, clean icon style, accessible design for elderly" |
| Wasser trinken | "Flat pictogram of a glass of water, blue tint, simple lines, healthcare context" |
| Hygiene | "Clean pictogram of washing hands under a tap, minimal details, high contrast" |
| Emotion Freude | "Simple smiley face icon, warm colors, easy to recognize, dementia-friendly" |

---

## 7. MiniMax API — Text-to-Speech

### 7.1 Verfügbare Modelle

| Modell | Qualität | Speed | Typische Nutzung |
|--------|----------|-------|-----------------|
| `speech-02-hd` | HD (High Definition) | Langsamer | Premium-Vertonung |
| `speech-02-turbo` | Standard | Schneller | Bulk-Vertonung |
| `speech-01-hd` | HD | — | HD-Audio |
| `speech-01-turbo` | Standard | Schneller | Schnelle Produktion |

### 7.2 Verfügbare Funktionen

| Funktion | Beschreibung |
|----------|-------------|
| `text_to_audio` | Text → Audio mit gegebener Stimme |
| `list_voices` | Alle verfügbaren Stimmen auflisten |
| `voice_clone` | Eigene Stimme klonen (aus Audio-Dateien) |
| `voice_design` | Stimme aus Text-Beschreibung generieren |

### 7.3 Sprachunterstützung

Die MiniMax TTS-API unterstützt **multiple Sprachen**:
- ✅ **Deutsch (DE)**
- ✅ **Spanisch (ES)**
- ✅ **Französisch (FR)**
- ✅ **Englisch (EN)**

Weitere Sprachen über die API-Dokumentation prüfen (platform.minimax.io).

### 7.4 Voice Clone für Multi-Speaker-Szenarios

```
Use Case: Schulungsvideo mit wechselnden Sprechern (Pflegekraft, Angehöriger, Experte)
→ Stimme klonen mit voice_clone (2+ Minuten Audio pro Person)
→ Konsistente Sprecher-Stimmen über das gesamte Modul
```

### 7.5 API-Workflow (Python)
```python
# 1. Stimmen auflisten
def list_available_voices():
    # API: GET /v1/t2a/voices
    pass

# 2. Text zu Audio konvertieren
def generate_audio(text, voice_id, model="speech-02-hd"):
    # API: POST /v1/t2a
    payload = {
        "model": model,
        "text": text,
        "voice_id": voice_id,
        "output_format": "mp3"
    }
    # Response: base64-encoded audio
    pass

# 3. Stimme klonen
def clone_voice(audio_file_path, name):
    # API: POST /v1/voice_clone
    # Input: MP3/WAV (2+ Minuten, gute Qualität)
    pass
```

---

## 8. MiniMax API — Video-Generierung (Hailuo)

### 8.1 Ver verfügbare Modelle

| Modell | Modus | Duration | Resolution |
|--------|-------|----------|------------|
| `MiniMax-Hailuo-02` | Image-to-Video, Text-to-Video | 6s / 10s | 768P / 1080P |
| `MiniMax-Hailuo-2.3` | Image-to-Video, Text-to-Video | 6s | 1080P |
| `MiniMax-Hailuo-2.3-Fast` | Schnellerer Mode | 6s | 1080P |
| `Video-01` | Text-to-Video, Image-to-Video | — | — |
| `S2V-01` | Subject Reference (Gesichtskonsistenz) | 6s | 1080P |

### 8.2 Video-Generierung — 4 Modi

| Modus | Input | Use Case |
|-------|-------|----------|
| **Text-to-Video** | Nur Text-Prompt | Explainer-Videos, Szenen-Beschreibungen |
| **Image-to-Video** | Bild + Text-Prompt | Pictogramme animieren |
| **First-Last-Frame** | Start-Bild + End-Bild + Text | Übergänge, Transformationen |
| **Subject Reference** | Gesichtsfoto + Prompt | Konsistente Charaktere |

### 8.3 Pictogramme animieren — Workflow

```python
import time, requests, os

API_KEY = os.environ["MINIMAX_API_KEY"]
headers = {"Authorization": f"Bearer {API_KEY}"}

# Step 1: Pictogramm generieren (Image-01)
def generate_pictogram(prompt):
    url = "https://api.minimax.io/v1/image_generation"
    payload = {
        "model": "image-01",
        "prompt": f"Simple pictogram: {prompt}, flat design, clean lines, high contrast",
        "aspect_ratio": "1:1",
        "response_format": "url"
    }
    resp = requests.post(url, headers=headers, json=payload)
    return resp.json()["data"]["image_urls"][0]

# Step 2: Pictogramm animieren (Image-to-Video)
def animate_pictogram(image_url, animation_prompt):
    url = "https://api.minimax.io/v1/video_generation"
    payload = {
        "model": "MiniMax-Hailuo-02",
        "prompt": animation_prompt,  # z.B. "The pill bottle slowly rotates, gentle movement"
        "first_frame_image": image_url,
        "duration": 6,
        "resolution": "1080P"
    }
    resp = requests.post(url, headers=headers, json=payload)
    return resp.json()["task_id"]

# Step 3: Task-Status pollen
def poll_video(task_id):
    url = "https://api.minimax.io/v1/query/video_generation"
    while True:
        time.sleep(10)
        resp = requests.get(url, headers=headers, params={"task_id": task_id})
        status = resp.json()["status"]
        if status == "Success":
            return resp.json()["file_id"]
        elif status == "Fail":
            raise Exception("Video generation failed")
```

### 8.4 Animation-Prompts für Pictogramme

| Pictogramm-Typ | Animation-Prompt |
|----------------|-----------------|
| Medikamente | "The pill bottle gently bobs up and down, soft lighting, calm movement" |
| Wasser | "The glass of water slightly trembles as if just placed down, then settles" |
| Hände waschen | "Water droplets slowly fall from the tap, gentle splashing effect" |
| Essen | "A plate of food slowly slides into view from the left side" |
| Person | "A person slowly nods in understanding, warm expression" |

---

## 9. Konzept: Automatisierter Schulungsgenerator

### 9.1 Architektur-Überblick

```
User Input (Thema, Sprache, Zielgruppe)
         │
         ▼
┌─────────────────────────────────────────┐
│           LLM (MiniMax M2.7)            │
│  • Themenanalyse                         │
│  • Inhaltsstrukturierung                  │
│  • Pictogramm-Prompt-Generierung         │
│  • Script/Erklärungstexte erstellen      │
└────────────────┬─────────────────────────┘
                 │
         ┌───────┴───────┬──────────────┐
         ▼               ▼              ▼
  ┌─────────────┐  ┌──────────┐  ┌────────────┐
  │ Image-01    │  │ TTS API  │  │  ARASAAC   │
  │ (KI-Pikto)  │  │ (Audio)  │  │ (Bibliothek)│
  └──────┬──────┘  └────┬─────┘  └─────┬──────┘
         │              │              │
         └──────────────┼──────────────┘
                        ▼
              ┌─────────────────────┐
              │  Hailuo Video API   │
              │  (Animation)        │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   Video-Composer   │
              │  (FFmpeg/Montage)   │
              └──────────┬──────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
  ┌─────────────┐  ┌──────────┐  ┌────────────┐
  │   H5P       │  │  SCORM   │  │   Direct   │
  │  (Quiz+Int.)│  │ Package  │  │   Video    │
  └─────────────┘  └──────────┘  └────────────┘
```

### 9.2 Kern-Komponenten

| Komponente | Technologie | Funktion |
|------------|-------------|----------|
| **Themen-Engine** | MiniMax M2.7 (LLM) | Schulungsthemen strukturieren, Scripts schreiben |
| **Pictogramm-Generator** | MiniMax Image-01 + ARASAAC | Kontextbezogene Pictogramme erstellen |
| **Audio-Engine** | MiniMax TTS + Voice Clone | Vertonung in DE/ES/FR/EN |
| **Animations-Engine** | MiniMax Hailuo | Pictogramme in Bewegung setzen |
| **Video-Composer** | FFmpeg | Szenen zusammenschneiden, B-Roll, Musik |
| **Quiz-Builder** | H5P / Custom | Interaktive Übungen erstellen |
| **LMS-Export** | SCORM 2004 / xAPI | Für Firmen-LMS verpacken |

### 9.3 Pipeline — Einzelne Schulungseinheit

```
1. INPUT:  "Medikamenteneinnahme bei Demenz" (DE, Pflegefachkraft)
2. LLM:    → 5 Lernschritte definieren
           → Pictogramm-Prompts generieren (z.B. "pill bottle", "glass of water")
           → Sprechertext schreiben (einfache Sprache, max. 2 Sätze pro Satz)
3. ASSETS: → ARASAAC: Pictogramme herunterladen (CC BY-NC-SA)
           → Image-01: Zusätzliche Pictogramme KI-generieren
4. AUDIO:  → TTS: Sprechertext → MP3 (DE-Stimme)
           → Voice Clone: Konsistente Stimme über alle Module
5. VIDEO:  → Hailuo: Pictogramme animieren (6s-Clips)
           → FFmpeg: Animation + Audio + Text-Overlay → MP4
6. QUIZ:   → H5P: Multiple-Choice (Pictogramm + Frage)
7. OUTPUT: → SCORM-Paket: Video + Quiz + Feedback
```

### 9.4 Sprachmultiplikator

| Sprache | TTS | Pictogramme (ARASAAC) | Status |
|---------|-----|----------------------|--------|
| Deutsch (DE) | ✅ | ✅ | Primär |
| Spanisch (ES) | ✅ | ✅ | Sekundär |
| Französisch (FR) | ✅ | ✅ | Sekundär |
| Englisch (EN) | ✅ | ⚠️ (weniger) | Tertiär |

---

## 10. Konzept: Gute Demenz-Schulung

### 10.1 Evidence-Based Best Practices

**Was die Forschung zeigt:**

| Prinzip | Quelle | Umsetzung |
|---------|--------|-----------|
| **Pictogramme + Text** | Dememo, ARASAAC-Studien | Pictogramme immer mit kurzem Text beschriften |
| **Einfache Sprache** | Kommunikationsforschung Demenz | Max. 5-7 Wörter pro Satz, kurze Sätze |
| **Wiederholung** | Cognitive Load Theory | Gleiche Information 3x präsentieren (different modal) |
| **Visuelle Orientierung** | ScienceDirect (2024) | Bilder statt Text, Fotos statt abstrakte Grafiken |
| **Multi-Sensorisch** | Dememo-Konzept | Bild + Text + Audio gleichzeitig |
| **Affektive Stimulierung** | Alzheimer's Association | Positive Emotionen aktivieren (Erfolgserlebnisse) |

### 10.2 Barrierefreiheit für Menschen mit Demenz

```
✓ Hoher Kontrast (schwarz-weiß oder blau-weiß)
✓ Große Pictogramme (min. 7x5 cm digital, 21x14.8 cm als Aufkleber)
✓ Vertraute Objekte (realistische 3D-Darstellungen)
✓ Keine animierten Elemente (konzentrationsstörend)
✓ Langsames Tempo (0.75xPlayback für Audio)
✓ Klare Struktur (immer gleicher Aufbau pro Modul)
✓ Pausen zum Verarbeiten (min. 3 Sekunden zwischen Info-Einheiten)
```

### 10.3 Zielgruppenspezifische Anpassung

| Zielgruppe | Fokus | Pictogramm-Stil |
|------------|-------|-----------------|
| **Angehörige** | Empathie, Alltagssituationen, Entlastung | Emotional, warm, mit Fotografien |
| **Pflegefachkräfte** | Medizinisches Wissen, Kommunikation, Handlungsanweisungen | Klinisch, präzise, farbcodiert |
| **Betriebliches Training** | Arbeitsalltag mit demenzkranken Kollegen/Kunden | Professionell, neutral, Praxis-Beispiele |
| **Menschen mit beginnender Demenz** | Selbsthilfe, Orientierung | Einfach, beruhigend, Vertrautes |

---

## 11. Workflow-Architektur

### 11.1 Komplette Workflow-Kette

```
Pictogramm-Auswahl
        │
        ▼
   ARASAAC API / Suche
   (oder KI-Generierung)
        │
        ▼
  Pictogramm-Finalisierung
  (ggf. KI-Edit: Hintergründe, Farben)
        │
        ▼
  TTS-Vertonung (Sprachauswahl)
        │
        ▼
  Hailuo-Animation
  (Pictogramm → 6s-Video-Clip)
        │
        ▼
  FFmpeg-Video-Composer
  (Clips + Audio + Text-Overlay + B-Roll)
        │
        ▼
  H5P-Interaktivität
  (Quiz, Drag&Drop, Markierung)
        │
        ▼
  SCORM/xAPI-Export
        │
        ▼
  LMS-Veröffentlichung
        │
        ▼
  Lernerfolgs-Tracking
  (Abschluss, Quiz-Ergebnisse, Zertifikat)
```

### 11.2 Pictogramm-Auswahl — Detail

**ARASAAC-API-Nutzung:**
```python
# Suchen in ARASAAC
def search_arasaac(keyword, language="de"):
    url = f"https://beta.arasaac.org/pictograms/{language}/search/{keyword}"
    # Response: JSON mit Pictogramm-URLs, Metadaten
    pass

# Verfügbare Sprachen in ARASAAC:
# ar, de, en, eu, fr, gl, hu, it, oc, pl, ro, ru, zh
```

**Fallback-Strategie:**
1. ARASAAC durchsuchen
2. Falls nicht gefunden → MiniMax Image-01 generieren
3. Ergebnis validieren (Bild-Analyse mit MiniMax-VL-01)

---

## 12. Empfehlung: Was zuerst umsetzen?

### 12.1 Phasen-Modell

```
┌─────────────────────────────────────────────────────────┐
│  PHASE 1: MVP — Manuelle Pipeline (Woche 1-4)           │
│  ─────────────────────────────────────────────────────   │
│  • 3 Pilot-Module (z.B. "Hände waschen", "Medikamente", │
│    "Ernährung")                                          │
│  • ARASAAC-Pictogramme manuell kuratieren               │
│  • Doodly oder MiniMax Hailuo für Animationen            │
│  • MiniMax TTS für Vertonung                             │
│  • H5P für interaktive Quizze                           │
│  → Output: 3 fertige SCORM-Module                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 2: Semi-Automation (Woche 5-8)                    │
│  ─────────────────────────────────────────────────────   │
│  • MiniMax M2.7 für Script-Generierung                   │
│  • ARASAAC-API-Integration                              │
│  • MiniMax Image-01 für Pictogramm-Lückenschluss         │
│  • FFmpeg-Video-Composer (automatisiert)                │
│  • H5P-Export-Pipeline                                   │
│  → Output: Template-System für neue Module               │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 3: Vollautomatisierung (Woche 9-16)              │
│  ─────────────────────────────────────────────────────   │
│  • End-to-End-Pipeline (Text → SCORM)                   │
│  • Voice Clone für konsistente Sprecherstimmen           │
│  • Multi-Sprachen-Support (DE → ES → FR → EN)           │
│  • Lernerfolgs-Dashboard (xAPI)                          │
│  → Output: Schulungsgenerator als Service                │
└─────────────────────────────────────────────────────────┘
```

### 12.2 Top-3-Empfehlungen

#### 1. MiniMax MCP-Server integrieren
**Warum:** Einzige API, die Bildgenerierung, TTS und Video in einem Stack bietet.

```bash
# Installation
uvx minimax-mcp -y

# Environment Variables
MINIMAX_API_KEY=...
MINIMAX_API_HOST=https://api.minimax.io
MINIMAX_MCP_BASE_PATH=/tmp/demenz-output
```

**Verfügbare Tools:**
- `text_to_audio` — Vertonung
- `list_voices` — Stimmen anzeigen
- `voice_clone` — Stimme klonen
- `generate_video` — Pictogramme animieren
- `text_to_image` — Pictogramme generieren
- `query_video_generation` — Video-Status pollen
- `music_generation` — Hintergrundmusik generieren

#### 2. ARASAAC als Pictogramm-Backbone nutzen
- 13.000+ lizenzfreie Pictogramme (CC BY-NC-SA)
- 9+ Sprachen direkt verfügbar
- Für Demenz-Schulungen bereits validiert
- **Nur Pictogramme, die nicht in ARASAAC sind**, per KI generieren

#### 3. H5P für Interaktivität
- Kostenlos, open-source
- Export nach SCORM/xAPI
- Integriert sich in Moodle/WordPress
- Einfache Quiz-Erstellung (Drag&Drop, Multiple Choice, Markieren)

### 12.3 Vermeiden

| Fehler | Warum |
|--------|-------|
| ❌ Alles selbst zeichnen | Zu zeitintensiv, Qualitätsprobleme |
| ❌ Nur Video (ohne Quiz) | Kein Lernerfolgsnachweis |
| ❌ Nur Text-Schulungen | Zielgruppe profitiert von Pictogrammen |
| ❌ SCORM 1.2 | Veraltet, schlechtes Tracking |
| ❌ Eigene LMS-Entwicklung | Nutze bestehende Moodle/WordPress |

### 12.4 Kosten-Schätzung (Monatlich)

| Service | Plan | Kosten |
|---------|------|--------|
| MiniMax API | Pay-as-you-go | ~$10-50/Monat (bei 50 Modulen) |
| ARASAAC | Kostenlos | $0 |
| H5P | Self-hosted | $0 |
| Moodle | Self-hosted | $0 (Server ~$10/Monat) |
| Doodly | Optional (nicht nötig) | $39/Monat |
| **Gesamt** | | **~$20-60/Monat** |

---

## Anhang

### A. Nützliche Links

| Ressource | URL |
|-----------|-----|
| MiniMax API Docs | platform.minimax.io/docs |
| MiniMax MCP (Python) | github.com/MiniMax-AI/MiniMax-MCP |
| MiniMax MCP (JS) | github.com/MiniMax-AI/MiniMax-MCP-JS |
| ARASAAC Pictograms | arasaac.org |
| ARASAAC Beta (API) | beta.arasaac.org |
| H5P | h5p.org |
| Demenz Partner | demenz-partner.de |
| Deutsche Alzheimer Gesellschaft | deutsche-alzheimer.de |
| MiniMax Image-01 Ankündigung | minimax.io/news/image-01 |

### B. Recherche-Stand

- **Datum:** 05.07.2026
- **Suchergebnisse:** 25+ Quellen geprüft
- **APIs verifiziert:** MiniMax Image-01, Hailuo Video-Generierung
- **Tools evaluiert:** Doodly, H5P, SCORM, ARASAAC, Flaticon

---

*Erstellt mit MiniMax M2.7 — Research Sub-Agent für das Repository `demenz-schulungen`*
