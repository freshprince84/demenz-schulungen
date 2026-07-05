# PROCESS-SPEC.md — Prozess- und Verfahrensspezifikation

> **Dokumentenstatus:** Verabschiedet  
> **Version:** 1.0  
> **Datum:** 05.07.2026  
> **Modell-Referenz:** MiniMax M2.7 (minimax/MiniMax-M2.7)  
> **Letztes Update durch:** Winston (Clawdbot Sub-Agent)

---

## Inhaltsverzeichnis

1. [Workflow-Übersicht (End-to-End)](#1-workflow-übersicht-end-to-end)
2. [Content-Erstellung Workflow](#2-content-erstellung-workflow)
3. [KI-Integration Workflows](#3-ki-integration-workflows)
4. [Review & QA Prozess](#4-review--qa-prozess)
5. [Änderungsprozess (Change Management)](#5-änderungsprozess-change-management)
6. [Multi-Sprachen-Prozess](#6-multi-sprachen-prozess)
7. [Deployment/Veröffentlichung](#7-deploymentveröffentlichung)
8. [Skills & Rollen](#8-skills--rollen)
9. [Clawdbot Integration](#9-clawdbot-integration)
10. [Error-Handling & Rollback](#10-error-handling--rollback)
11. [Dokumentationsstandards](#11-dokumentationsstandards)

---

## 1. Workflow-Übersicht (End-to-End)

### 1.1 Gesamtpipeline

```
Idee → Konzept → Pictogramme → Content → Video/Erstellung → QA → PUBLISH
```

### 1.2 Detaillierte Pipeline-Stufen

```
┌─────────────────────────────────────────────────────────────┐
│  STUFE 1: IDEE                                             │
│  Themenidentifikation, Bedarfsanalyse                      │
│  Output: Themenliste, Priorisierung                         │
└─────────────────────────────┬───────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STUFE 2: KONZEPT                                          │
│  Lernziele (SMART), Zielgruppe, Struktur, Storyboard       │
│  Output: Konzeptdokument, Modulstruktur                     │
└─────────────────────────────┬───────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STUFE 3: PICTOGRAMME                                      │
│  ARASAAC-Suche → KI-Generierung (Fallback) → Freigabe      │
│  Output: Pictogramm-Bibliothek pro Modul                   │
└─────────────────────────────┬───────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STUFE 4: CONTENT SCHREIBEN                                │
│  A2-Sprachniveau, ein Konzept pro Frame, Text+Bild        │
│  Output: Script, Sprechertext, Text-Overlays                │
└─────────────────────────────┬───────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STUFE 5: VIDEO/ERSTELLUNG                                 │
│  TTS → Animation → Schnitt → Untertitel                   │
│  Output: MP4-Videodatei(en)                                │
└─────────────────────────────┬───────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STUFE 6: INTERAKTIVE ELEMENTE (H5P)                       │
│  Quiz, Drag&Drop, Flashcards                               │
│  Output: H5P-Pakete                                        │
└─────────────────────────────┬───────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STUFE 7: QA                                               │
│  Peer-Review, Accessibility-Audit, Usability-Test          │
│  Output: Bug-Liste, Freigabe                               │
└─────────────────────────────┬───────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STUFE 8: PUBLISH                                          │
│  SCORM 2004 → LMS → Mobile-Test → Feedback                │
│  Output: Live-System, Feedback-Bericht                      │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Phasenmodell (Implementierungsreihenfolge)

| Phase | Zeitraum | Fokus | Output |
|-------|----------|-------|--------|
| **Phase 1: MVP** | Woche 1–4 | Manuelle Pipeline, 3 Pilot-Module | 3 fertige SCORM-Module |
| **Phase 2: Semi-Automation** | Woche 5–8 | LLM-Scripting, ARASAAC-API, FFmpeg-Pipeline | Template-System |
| **Phase 3: Vollautomatisierung** | Woche 9–16 | End-to-End-Pipeline, Voice Clone, Multi-Sprachen | Schulungsgenerator |

---

## 2. Content-Erstellung Workflow

### 2.1 Phase 1: Themen-Definition

**Bedarfsanalyse**

- Zielgruppe befragen: Was brauchen Demenz-Betreuer konkret?
- Existierende Demenz-Schulungen analysieren (Lücken identifizieren)
- Quellen: Demenz-Partner (demenz-partner.de), Deutsche Alzheimer Gesellschaft
- Ergebnis: Priorisierte Themenliste mit Begründung

**Lernziele definieren (SMART)**

| Kriterium | Bedeutung | Beispiel |
|-----------|-----------|---------|
| **S**pezifisch | Ein klar definiertes Lernergebnis | "Der Teilnehmer kann 3 Kommunikationstechniken benennen" |
| **M**essbar | Erfolg messbar (Quiz, Beobachtung) | Quiz mit Mindestpunktzahl 80% |
| **A**nnehmbar | Relevant für die Zielgruppe | Praxistaugliche Techniken, keine reine Theorie |
| **R**ealistisch | In der verfügbaren Zeit erreichbar | 1 Modul = 10–15 Minuten Lernzeit |
| **T**erminiert | Zeitraum definiert | Abschluss nach Modul-Durchlauf |

**Zielgruppe charakterisieren**

| Zielgruppe | Bedürfnisse | Pictogramm-Stil | Schulungsformat |
|------------|-------------|-----------------|-----------------|
| **Pflegefachpersonen** | Medizinisches Wissen, Handlungsanweisungen, Kommunikation | Klinisch, präzise, farbcodiert | Video + Quiz, Zertifikat |
| **Angehörige** | Empathie, Alltagssituationen, Entlastung | Emotional, warm, mit Fotos | Video + Selbsttest |
| **Laien/Interessierte** | Basiswissen, Sensibilisierung | Einfach, einladend | Kurzes Video, Überblick |

### 2.2 Phase 2: Pictogramme auswählen

**Suchreihenfolge:**

1. **ARASAAC** (primär) — 13.000+ Pictogramme, CC BY-NC-SA, 9+ Sprachen
2. **MiniMax Image-01** (Fallback) — für Lücken in ARASAAC
3. **Noun Project / Flaticon** (letzter Fallback) — nur wenn CC-Lizenz gesichert

**ARASAAC-Suche:**

```
URL: https://beta.arasaac.org/pictograms/{sprache}/search/{keyword}
Verfügbare Sprachen: ar, de, en, eu, fr, gl, hu, it, oc, pl, ro, ru, zh
Format: PNG (farbig/schwarz-weiß), SVG, PSD
Lizenz: CC BY-NC-SA (nicht-kommerziell, ShareAlike)
```

**MiniMax Image-01 (Fallback):**

Prompt-Template:
```
Style: Simple flat pictogram / icon / symbol
Design: Clean vector style, black stroke on white background
Features: High contrast, accessible icon design, minimal details
Category: [healthcare | food | hygiene | emotions | daily activities]
Context: For use by people with dementia
```

**Checkliste vor Freigabe:**

- [ ] Hoher Kontrast (schwarz-weiß oder blau-weiß)
- [ ] Mindestgröße: 7×5 cm digital, 512×512 px
- [ ] Einfache, klare Formen (keine Details, die ablenken)
- [ ] Text-Label vorhanden (DE + Zielland-Sprache)
- [ ] Von Domain-Expert freigegeben

### 2.3 Phase 3: Content schreiben

**Sprachliche Anforderungen:**

| Anforderung | Regel | Beispiel |
|-------------|-------|---------|
| **Sprachniveau** | A2 nach GER | "Das Medikament hilft." (statt "Die pharmakologische Intervention unterstützt die kognitive Funktion.") |
| **Satzlänge** | Max. 7–10 Wörter pro Satz | "Waschen Sie die Hände." |
| **Absätze** | Max. 2–3 Sätze | Eine Idee pro Absatz |
| **Wiederholung** | Wichtige Konzepte 3× präsentieren (unterschiedliche Modalitäten) | Bild + Text + Audio |
| **Ein Konzept** | Pro Slide/Frame genau ein Konzept | Nicht "Hände waschen + Zähne putzen" auf einer Folie |
| **Text+Bild** | Immer zusammen | Pictogramm mit kurzer Beschriftung darunter |

**Storyboard-Vorlage:**

```
Frame 01: [Pictogramm: Hände waschen] + Text: "Hände waschen ist wichtig."
Frame 02: [Pictogramm: Seife] + Text: "Nutzen Sie Seife."
Frame 03: [Pictogramm: Wasserhahn] + Text: "Spülen Sie die Hände ab."
...
```

### 2.4 Phase 4: Video/Erstellung

**Voice-over aufnehmen:**

| Engine | Modell | Sprache | Qualität |
|--------|--------|---------|----------|
| MiniMax TTS | `speech-02-hd` | DE, ES, FR, EN | HD |
| MiniMax TTS | `speech-02-turbo` | Alle | Standard |
| MiniMax Voice Clone | Custom | Alle | HD (nach Training) |

**Empfohlene Einstellungen:**

- Sprechgeschwindigkeit: Langsam (0.75xPlayback als Referenz)
- Pausen: Mindestens 3 Sekunden zwischen Info-Einheiten
- Format: MP3, 128 kbps, 44.1 kHz

**Untertitel generieren:**

1. Whisper (lokal, `faster-whisper`, base-Modell) für Transkription
2. OGG → WAV: `ffmpeg -i input.ogg -ar 16000 -ac 1 /tmp/audio.wav -y`
3. SRT-Datei erstellen (Zeitstempel + Text)
4. Manuelle Korrekturlesung (Pflicht!)

**Pictogramme animieren:**

| Engine | Modell | Dauer | Use Case |
|--------|--------|-------|----------|
| MiniMax Hailuo | `MiniMax-Hailuo-02` | 6s / 10s | Pictogramme animieren |
| MiniMax Hailuo | `MiniMax-Hailuo-2.3` | 6s | Schnellere Produktion |

**QC-Checkliste:**

- [ ] Untertitel lesbar (Kontrast, Größe, Position)
- [ ] Stimme klar und verständlich
- [ ] Kontrast zwischen Pictogramm und Hintergrund ausreichend
- [ ] Keine blinkenden oder schnell bewegten Elemente
- [ ] Gesamtlänge: Max. 10–15 Minuten pro Modul

### 2.5 Phase 5: Interaktive Elemente (H5P)

**H5P-Inhaltstypen:**

| Inhaltstyp | Use Case | Lernziel-Typ |
|------------|----------|--------------|
| **Course Presentation** | Hauptmodul, Slide-Show mit Quiz | Überblick + Verständnis |
| **Multiple Choice** | Wissen abfragen | Reproduktion |
| **Drag and Drop** | Begriffe zuordnen, Kategorisieren | Anwendung |
| **Flashcards** | Vokabeln, Schlüsselbegriffe | Merken |
| **Summary** | Zusammenfassung am Modulende | Reflexion |
| **Dialog Cards** | Kommunikationsübungen | Anwendung |

**H5P-Export-Einstellungen:**

- Format: SCORM 2004 (4th Edition)
- Tracking: completion + score
- Max. Attempt: 3 Versuche
- Show solutions: Nach letztem Versuch

### 2.6 Phase 6: Publishing

**LMS-Anforderungen:**

```
Empfohlen: Moodle (Self-hosted) oder WordPress + Sense LMS
Tracking: xAPI primär, SCORM 2004 als Fallback
Export: SCORM 2004 Package (.zip)
```

**Test-Prozedur:**

1. Auf Desktop (Chrome, Firefox, Safari) — vollständiger Durchlauf
2. Auf Tablet (iPad, Android) — Touch-Interaktion prüfen
3. Auf Mobile (Smartphone) — Lesebarkeit prüfen
4. Accessibility: Screenreader-Kompatibilität (NVDA, VoiceOver)

**Feedback einholen:**

- Strukturierte Feedback-Abfrage nach Abschluss des Moduls
- Pflichtfelder: Verständlichkeit (1–5), Relevanz (1–5), Kommentare (frei)
- Ergebnis: In DECISIONS.md als Feedback-Log dokumentieren

---

## 3. KI-Integration Workflows

### 3.1 Pictogramm-Generierung mit MiniMax Image-01

**Prompt-Template (verbindlich):**

```
[Objekt/Begiff] als einfaches, flaches Pictogramm.
Schwarze Umrisse auf weißem Hintergrund.
Klare, minimalistische Linien.
Für Menschen mit Demenz geeignet.
Barrierefreies Design mit hohem Kontrast.
```

**Style-Guide für Konsistenz:**

| Eigenschaft | Regel |
|-------------|-------|
| **Stil** | Flach, vektoriell, Umriss |
| **Hintergrund** | Weiß (#FFFFFF) |
| **Linien** | Schwarz (#000000), 2–3 px |
| **Größe** | 512×512 px (min. 1024×1024 für Print) |
| **Details** | Max. 3 Elemente pro Pictogramm |
| **Emotionen** | Warm, einladend (keine negativen Ausdrücke) |

**Batch-Generierung:**

```
model: image-01
aspect_ratio: 1:1 (Quadrat) oder 3:2 (Querformat)
response_format: url (oder base64 für Offline)
BATCH: Bis 9 Bilder pro Request (RPM: 10, TPM: 60)
```

**Human-Review-Schritt:**

1. Bild generiert → MiniMax-VL-01 analysieren lassen
2. Checkliste (Abschnitt 2.2) durchgehen
3. Bei Ablehnung: Prompt anpassen, neu generieren
4. Bei Annahme: In `/assets/pictograms/` speichern, metadata.json pflegen

### 3.2 Text-to-Speech Pipeline

**Sprachkonfiguration:**

| Sprache | Modell | Voice-ID (Beispiel) | Tempo |
|---------|--------|---------------------|-------|
| Deutsch (DE) | `speech-02-hd` | Stimme "de-DE-Standard-A" | 0.9x |
| Spanisch (ES) | `speech-02-hd` | Stimme "es-ES-Standard-A" | 0.9x |
| Französisch (FR) | `speech-02-hd` | Stimme "fr-FR-Standard-A" | 0.9x |
| Englisch (EN) | `speech-02-hd` | Stimme "en-US-Standard-A" | 0.9x |

**Voice-Clone (optional, für Marken-Stimme):**

```
Eingabe: 2+ Minuten Audio (MP3/WAV, hohe Qualität)
Nutzung: Konsistente Sprecherstimme über alle Module hinweg
Use Case: Schulung mit wechselnden Sprechern (Pflegekraft, Angehöriger)
Freigabe: Domain-Expert muss cloned voice abnehmen
```

**Pipeline:**

```
1. Script fertig (Phase 3)
2. Text in Sätze aufteilen (max. 50 Zeichen pro Segment)
3. TTS-Request pro Segment → MP3
4. Segmente zusammenfügen (FFmpeg)
5. Qualitätsprüfung (manuell anhören)
6. Bei Fehler: Segment neu generieren oder Text anpassen
```

### 3.3 Video-Generierung mit Hailuo-02

**Workflow: Pictogramme → Input-Frames → Video**

```
1. Pictogramm auswählen (ARASAAC oder Image-01)
2. Bild als first_frame an Hailuo senden
3. Animation-Prompt formulieren
4. 6s-Clip generieren (MiniMax-Hailuo-02)
5. Task pollen bis Status = Success
6. Video-URL speichern, in FFmpeg weiterverarbeiten
```

**Animation-Prompt-Templates:**

| Pictogramm | Animation-Prompt |
|------------|-----------------|
| Medikamente | "The pill bottle gently bobs up and down, soft lighting, calm movement" |
| Wasser | "The glass of water slightly trembles as if just placed down, then settles" |
| Hände waschen | "Water droplets slowly fall from the tap, gentle splashing effect" |
| Essen | "A plate of food slowly slides into view from the left side" |
| Person | "A person slowly nods in understanding, warm expression" |
| Kalender | "A calendar page slowly turns to reveal a new date" |

**Schnitt und Zusammenführung (FFmpeg):**

```
# Beispiel: Video + Audio + Text-Overlay zusammenführen
ffmpeg -i video.mp4 -i audio.mp3 -vf "drawtext=text='Hände waschen':fontsize=48:fontcolor=white:x=(w-text_w)/2:y=h-80" \
  -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k output.mp4
```

---

## 4. Review & QA Prozess

### 4.1 Peer-Review

**Reviewer-Konfiguration:**

| Rolle | Verantwortung | Frequenz |
|-------|---------------|----------|
| **Domain-Expert** | Fachliche Richtigkeit, didaktische Qualität | Jedes Modul |
| **Tech-Expert** | Technische Umsetzung, Barrierefreiheit | Jedes Modul |
| **UX-Tester** | Usability, Verständlichkeit (wenn möglich) | Vor Major-Releases |

**Review-Schritte:**

1. Autor übergibt Modul an Reviewer (GitHub PR oder geteiltes Laufwerk)
2. Reviewer prüft anhand der QC-Checkliste
3. Feedback via GitHub Issue oder Kommentar-Dokument
4. Autor setzt Feedback um
5. Reviewer bestätigt Freigabe
6. Domain-Expert gibt finale Freigabe (GitHub Merge)

### 4.2 Accessibility-Audit (WCAG)

**Checkliste (basierend auf WCAG 2.1 AA):**

| Kategorie | Anforderung | Prüfmethode |
|-----------|-------------|-------------|
| **Kontrast** | Text/Bild ≥ 4.5:1 | WebAIM Contrast Checker |
| **Alternativtext** | Alle Bilder mit Alt-Text | Manuelle Prüfung |
| **Tastaturnavigation** | Alle interaktiven Elemente per Tab erreichbar | Tab-Durchlauf |
| **Untertitel** | Alle Videos mit Untertiteln | Video abspielen |
| **Lesbarkeit** | Schriftgröße ≥ 18px (16px Minimum) | Visuelle Prüfung |
| **Bewegung** | Keine autofahrenden Animationen | Video prüfen |
| **Farbkontraste** | Pictogramme mind. 3:1 | Contrast Checker |

**Demenz-spezifische Accessibility:**

- [ ] Pictogramme mit Text-Label (nicht nur Symbol)
- [ ] Keine reinen Farbcodes (keine Rot-Grün-Unterscheidung)
- [ ] Langsames Tempo (Audio max. 1.0x Playback-Speed)
- [ ] Klare, konsistente Navigation (immer gleiche Positionen)

### 4.3 Usability-Test mit echten Nutzern

**Wenn möglich (nicht Pflicht für MVP):**

- 3–5 Teilnehmer aus der Zielgruppe
-think-aloud-Protokoll während Modul-Durchlauf
- Erfasst: Verständnisprobleme, Frustration, Zeit pro Slide
- Ergebnis: Usability-Bericht in `/docs/usability/`

### 4.4 Bug-Tracking (GitHub Issues)

**Issue-Template:**

```
## Beschreibung
[Kurze Beschreibung des Problems]

## Schritte zur Reproduktion
1. 
2. 
3. 

## Erwartetes Verhalten
[Was sollte passieren]

## Tatsächliches Verhalten
[Was passiert stattdessen]

## Schweregrad
- [ ] Kritisch (Module nicht nutzbar)
- [ ] Hoch (wichtige Funktion fehlerhaft)
- [ ] Mittel (kosmetisches Problem)
- [ ] Niedrig (kleine Verbesserung)

## Modul/Version
[z.B. v1.2, Modul: Medikamenteneinnahme]
```

---

## 5. Änderungsprozess (Change Management)

### 5.1 Versionierung

| Versionsschema | Bedeutung | Beispiel |
|----------------|-----------|----------|
| **vX.Y** | Hauptversion (große Änderungen) | `v2.0` — Komplettüberarbeitung |
| **vX.Y.Z** | Patch (Fehlerbehebungen) | `v2.1.1` — Bugfix ohne neue Features |
| **vX.Y.Z-alpha** | Vorabversion zum Testen | `v2.2.0-alpha` |

**Regeln:**

- **PATCH** (Z in vX.Y.Z): Bugfixes, kleine Korrekturen, kein Changelog-Eintrag nötig
- **MINOR** (Y in vX.Y.Z): Neue Features, rückwärtskompatibel, Changelog-Eintrag
- **MAJOR** (X in vX.Y): Breaking Changes, neue Struktur, Migration-Guide erforderlich

### 5.2 Changelog

**Datei:** `CHANGELOG.md` (im Repository-Root)

**Format:**

```
## [v1.2.0] — 2026-07-10

### Hinzugefügt
- Neues Modul: "Ernährung bei Demenz"
- H5P-Drag-and-Drop für Modul Medikamenteneinnahme

### Geändert
- Untertitel in Modul "Hände waschen" korrigiert (Rechtschreibfehler)
- TTS-Stimme von speech-01 auf speech-02-hd gewechselt

### Behoben
- [#12] Video-Kontrast in Modul "Kommunikation" war zu niedrig
- [#15] H5P-Quiz zeigte falsche Punktzahl bei 2. Versuch

### Entfernt
- Veraltetes Modul "Demenz-Stufen (veraltet)" (ersetzt durch "Krankheitsverlauf")
```

### 5.3 Breaking Changes

**Beispiele für Breaking Changes:**

- SCORM-Versionswechsel (z.B. 2004 3rd → 4th Edition)
- LMS-Wechsel (Moodle → WordPress)
- Namensänderung von Modulen
- Strukturänderung in der Pictogramm-Bibliothek

**Pflichten bei Breaking Changes:**

1. In `CHANGELOG.md` als `### ⚠️ BREAKING` markieren
2. `MIGRATION-GUIDE.md` erstellen (im `/docs/`-Ordner)
3. Alte Version min. 6 Monate parallel verfügbar halten
4. Nutzer per E-Mail/In-App über Migration informieren

### 5.4 Migration-Guide (bei größeren Updates)

**Template:**

```
# MIGRATION-GUIDE: v1.x → v2.0

## Was hat sich geändert
[Beschreibung der Änderungen]

## Warum
[Begründung]

## Was muss ich tun?
[Schritt-für-Schritt-Anleitung]

## Checkliste vor dem Update
- [ ] LMS-Backup erstellen
- [ ] Test-Umgebung prüfen
- [ ] ...

## Rollback (falls nötig)
[Anleitung zum Zurücksetzen]
```

---

## 6. Multi-Sprachen-Prozess

### 6.1 Sprachstrategie

| Priorität | Sprache | Region | Status |
|-----------|---------|--------|--------|
| **Primär** | Deutsch (DE) | DACH | Source of Truth |
| **Sekundär** | Spanisch (ES) | Südamerika, Mexico | Übersetzung aus DE |
| **Tertiär** | Französisch (FR) | Schweiz, Frankreich | Übersetzung aus DE |
| **Tertiär** | Italienisch (IT) | Schweiz | Übersetzung aus DE |
| **Optional** | Englisch (EN) | International | Übersetzung aus DE |

### 6.2 Übersetzungs-Workflow

**Prinzip: Deutsch ist Source of Truth**

```
1. DE-Modul komplett fertigstellen und freigeben
2. DE-Script + Assets in /i18n/{module}/de/ als Master hinterlegen
3. Fachübersetzer (oder Clawdbot) übersetzt Script in Zielsprache
4. Pictogramme: ARASAAC in Zielsprache suchen (oder behalten wie vorhanden)
   → ARASAAC bietet viele Pictogramme in DE/ES/FR gleichzeitig
5. TTS in Zielsprache generieren
6. H5P-Texte übersetzen (H5P unterstützt Mehrsprachigkeit)
7. Lokalisierungstest (native speaker prüft)
8. Freigabe durch Domain-Expert der Zielsprache
```

**Ordnerstruktur:**

```
/modules/{modul-name}/
├── de/
│   ├── script.md
│   ├── pictograms/
│   ├── audio/
│   ├── video/
│   └── h5p/
├── es/
│   ├── script.md
│   └── ...
├── fr/
│   └── ...
└── shared/
    ├── pictograms_arasaac/  (sprachunabhängige Pictogramme)
    └── video_master/        ( Roh-Clips vor Schnitt)
```

### 6.3 Pictogramme sprachunabhängig

**Pictogramme, die KEINE Übersetzung brauchen:**

- Medizinisches Equipment (Spritze, Pillendose, Thermometer)
- Grundlegende Aktivitäten (essen, trinken, schlafen, laufen)
- Emotionen (wenn mit universally erkennbaren Gesichtern)
- Körpersprache (Hände heben, nicken, schütteln)

**Pictogramme, die übersetzt werden müssen:**

- Text-Labels auf Pictogrammen (immer übersetzen!)
- Kontextspezifische Symbole (landestypische Lebensmittel, etc.)

---

## 7. Deployment/Veröffentlichung

### 7.1 Umgebungen

| Umgebung | URL (Beispiel) | Zweck | Zugang |
|----------|----------------|-------|--------|
| **Entwicklung** | Lokal (`localhost:3000`) | Einzelentwicklung | Entwickler |
| **Staging** | `staging.demenz-schulungen.ch` | Integration, QA | Team |
| **PROD** | `demenz-schulungen.ch` | Live für Endnutzer | Alle |

### 7.2 GitHub Flow

```
1. Branch erstellen: git checkout -b feature/{modul-name}
2. Änderungen implementieren
3. Lokal testen (H5P-Validierung, Link-Check)
4. Commit: git add . && git commit -m "feat: Neues Modul {name}"
5. Push: git push origin feature/{modul-name}
6. Pull Request öffnen (PR-Template ausfüllen)
7. Review durch Domain-Expert + Tech-Lead
8. Merge nach main (bei Genehmigung)
9. Auto-Deploy auf Staging (Vercel/Railway)
10. Manuelle Prüfung auf Staging
11. Deploy auf PROD (nach Freigabe)
```

### 7.3 Automatisierte Tests

| Test | Tool | Frequenz | Beschreibung |
|------|------|----------|--------------|
| **H5P-Validierung** | `h5p validate` (Lumi) | Bei jedem PR | H5P-Pakete auf strukturelle Korrektheit prüfen |
| **Link-Check** | `lychee` oder `broken-link-checker` | Bei jedem PR | Alle URLs in MD/MD-Dateien auf Erreichbarkeit prüfen |
| **Build-Test** | Next.js Build | Bei jedem PR | `next build` muss erfolgreich durchlaufen |
| **TypeScript** | `npx tsc --noEmit` | Bei jedem PR | Keine TypeScript-Fehler |

### 7.4 Vercel Auto-Deploy

```
Trigger: Push auf main
Workflow:
  1. Vercel erkennt Push auf main
  2. Läuft `npm install && npm run build`
  3. Bei Erfolg: Automatisches Deployment auf PROD
  4. Bei Fehler: Notification an Entwickler (Telegram)
  
Konfiguration (vercel.json):
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

---

## 8. Skills & Rollen

### 8.1 Rollendefinitionen

| Rolle | Verantwortlich | Aufgaben |
|-------|---------------|----------|
| **Domain-Expert (Demenz-Beratung)** | Externe Fachperson / Patrick | Fachliche Validierung, ethische Prüfung, Inhaltsfreigabe |
| **Content-Autor** | Content-Ersteller | Script schreiben, Pictogramme kuratieren, Storyboard erstellen |
| **KI-Operator** | Winston (Clawdbot) | MiniMax-API, ARASAAC-Suche, TTS, Hailuo, Clawdbot-Sub-Agents |
| **Tech-Lead** | Entwickler | Architektur, Next.js, LMS-Integration, Deployment |
| **QA-Tester** | Content-Autor + separate Person | Review, Accessibility-Audit, Bug-Tracking |

### 8.2 Schnittstellen

```
Domain-Expert ←→ Content-Autor: Themenplanung, Fachliche Inhalte
Content-Autor ←→ KI-Operator: Pictogramm-Anforderungen, Prompts
KI-Operator ←→ Tech-Lead: API-Integration, Deployment
Tech-Lead ←→ QA-Tester: Technische Tests, Deployment-Freigabe
Content-Autor ←→ QA-Tester: Inhaltliche Tests, Feedback
```

---

## 9. Clawdbot Integration

### 9.1 Winston als Projekt-Koordinator

Winston fungiert als zentrale Koordinationsinstanz:

- **Task-Koordination:** Sub-Agents für einzelne Arbeitsschritte spawnen
- **Dokumentation:** PROCESS-SPEC.md aktuell halten, DECISIONS.md pflegen
- **Status-Monitoring:** Offene Tasks im Auge behalten
- **Kommunikation:** Regelmäßige Status-Updates (per Memory/ContEXT)

**Winston-Konfiguration für dieses Projekt:**

```json
{
  "project": "demenz-schulungen",
  "repo": "freshprince84/demenz-schulungen",
  "ssh_key": "/root/.ssh/id_ed25519",
  "workdir": "/tmp/demenz-process-spec"
}
```

### 9.2 Sub-Agent-Nutzung

**Wann Sub-Agents nutzen:**

| Task | Sub-Agent-Typ | Beschreibung |
|------|--------------|--------------|
| Recherche (ARASAAC, Best Practices) | Research | Themenrecherche, Link-Sammlung |
| Pictogramm-Generierung | KI-Operator | Image-01 Calls, ARASAAC-Downloads |
| Content-Schreiben | Content-Autor | Scripts, Storyboards, Quizfragen |
| Video-Produktion | KI-Operator | TTS, Hailuo, FFmpeg-Scripts |
| Testing | QA-Tester | H5P-Validierung, Link-Check |
| Deployment | Tech-Lead | Build, Deploy, Monitoring |

**Sub-Agent-Kommando (Beispiel):**

```
Clawdbot Sub-Agent spawnen mit:
- sessionTarget: "isolated"
- payload.kind: "agentTurn"
- Instructions: Konkrete Aufgabe aus PROCESS-SPEC.md
- Kein timeout (Patrick's Regel!)
```

### 9.3 Cron-Jobs für regelmäßige Tasks

| Cron-ID | Schedule | Task | Beschreibung |
|---------|----------|------|-------------|
| TBD | Wöchentlich (Mo 08:00 UTC) | Pictogramm-Bibliothek prüfen | ARASAAC auf neue Pictogramme prüfen |
| TBD | Wöchentlich (Mo 09:00 UTC) | Changelog-Audit | Prüfen ob CHANGELOG.md aktuell ist |
| TBD | Monatlich | Content-Review | Alle Module auf Aktualität prüfen |

### 9.4 Memory-System für Kontext-Erhaltung

**Dateien, die Winston aktuell hält:**

| Datei | Inhalt | Max. Größe |
|-------|--------|------------|
| `CONTEXT.md` | Aktive Projekte, Blocker, Prioritäten | 3 KB |
| `MEMORY.md` | Langfristige Entscheidungen, Lessons | 4 KB |
| `memory/YYYY-MM-DD.md` | Tägliche Events, Arbeitsprotokoll | 8 KB |

**Für dieses Projekt zusätzlich:**

- `docs/PROCESS-SPEC.md` — Diese Datei (Prozess-Referenz)
- `docs/DECISIONS.md` — Architekturentscheidungen (ADR-Format)
- `CHANGELOG.md` — Versionshistorie
- `docs/STATUS.md` — Aktueller Stand aller Module

---

## 10. Error-Handling & Rollback

### 10.1 MiniMax API — Ausfall-Strategie

| Szenario | Handlung |
|----------|----------|
| **Image-01 API down** | ARASAAC-Fallback nutzen (manuell suchen) oder manuell erstellte Pictogramme verwenden |
| **TTS API down** | Lokale Audio-Aufnahme (Mikrofon) oder bestehende Audio-Dateien wiederverwenden |
| **Hailuo API down** | Statische Pictogramme ohne Animation verwenden (Screenshots als Slideshow) |
| **Rate-Limit erreicht (RPM/TPM)** | Request-Queue implementieren, Pausen zwischen Batch-Generierung |

**Fallback-Infrastruktur:**

```
/assets/fallback/
├── pictograms_manual/    (vom Content-Autor erstellt)
├── audio_prerecorded/    (vorproduzierte Audio-Segmente)
└── video_static/         (statische Slideshow-Versionen)
```

### 10.2 Backup: Manuell erstellter Content

**Regel:** Für jede KI-generierte Assets muss eine manuelle Alternative existieren (oder schnell erstellt werden können).

```
Backup-Prioritäten:
1. ARASAAC-Pictogramme (immer zuerst, CC BY-NC-SA, Offline-Cache)
2. Manuell erstellte Grafiken (in /assets/fallback/pictograms_manual/)
3. KI-generierte Assets (nur wenn oben nicht möglich)
```

### 10.3 Rollback auf vorherige Version

**GitHub Rollback:**

```bash
# Letzten funktionierenden Commit finden
git log --oneline

# Auf vorherigen Commit zurücksetzen (soft, behält Änderungen in Staging)
git reset --soft HEAD~1

# Oder: Bestimmte Datei auf vorherige Version
git checkout HEAD~1 -- pfad/zu/datei

# Oder: Revert eines bestimmten Commits
git revert <commit-hash>
```

**LMS Rollback:**

```
Staging: Einfach letzten funktionierenden Commit deployen
PROD: 
  1. LMS-Backup einspielen (vor dem Update erstellt)
  2. Oder: Vorheriges SCORM-Paket erneut hochladen
  3. Benachrichtigung an Nutzer senden
```

---

## 11. Dokumentationsstandards

### 11.1 DECISIONS.md — Architekturentscheidungen

**Datei:** `docs/DECISIONS.md`

**Format (ADR — Architecture Decision Record):**

```
# ADR-001: H5P als Quiz-Engine

## Status
Verabschiedet — 05.07.2026

## Kontext
Wir brauchen eine Möglichkeit, interaktive Quizze und Übungen zu erstellen.
Anforderungen: Open-Source, SCORM-Export, Moodle-Kompatibilität, niedrige Kosten.

## Entscheidung
Wir verwenden H5P (h5p.org) als primäre Quiz-Engine.
- Self-hosted (kostenlos) oder h5p.com Cloud ($15/Monat)
- Export nach SCORM 2004
- Integriert in Moodle

## Konsequenzen
### Positiv:
- Kostenlos (Self-hosted)
- Großes Ökosystem, viele Content-Typen
- Einfach zu bedienen für Content-Autoren

### Negativ:
- Abhängigkeit von H5P-Ökosystem
- LMS ohne H5P-Plugin braucht SCORM-Wrapper (z.B. Lumi)
- Styling eingeschränkt ohne Custom-CSS

## Alternative
- Articulate Storyline (kostenpflichtig, $1.399/Jahr) — verworfen wegen Kosten
- Custom Quiz (React-basiert) — verworfen wegen Entwicklungsaufwand
```

### 11.2 Inline-Code-Dokumentation

**JavaScript/TypeScript (JSDoc/TSDoc):**

```javascript
/**
 * Generiert ein Pictogramm-Prompt für MiniMax Image-01.
 *
 * @param {Object} options - Prompt-Optionen
 * @param {string} options.object - Das Haupt-Objekt (z.B. "pill bottle")
 * @param {string} options.category - Kategorie (healthcare, food, hygiene, etc.)
 * @param {string} [options.language='de'] - Sprache für Zusatzinfos
 * @returns {string} Fertiger Prompt-String
 *
 * @example
 * const prompt = generatePictogramPrompt({
 *   object: 'pill bottle',
 *   category: 'healthcare',
 *   language: 'de'
 * });
 */
function generatePictogramPrompt({ object, category, language = 'de' }) {
  return `${object} als einfaches, flaches Pictogramm. Schwarze Umrisse auf weißem Hintergrund.`;
}
```

**Python (Google Style):**

```python
def generate_audio(text: str, voice_id: str, model: str = "speech-02-hd") -> bytes:
    """Konvertiert Text zu Audio mittels MiniMax TTS.

    Args:
        text: Der zu vertonende Text (max. 50 Zeichen pro Segment).
        voice_id: ID der zu verwendenden Stimme.
        model: MiniMax TTS-Modell (Default: speech-02-hd).

    Returns:
        Base64-encodedes MP3 als Bytes.

    Raises:
        APIError: Wenn die MiniMax-API einen Fehler zurückgibt.
        ValueError: Wenn text leer ist oder voice_id unbekannt.
    """
    pass
```

### 11.3 Dateistruktur-Konventionen

```
demenz-schulungen/
├── docs/
│   ├── PROCESS-SPEC.md      ← Dieser Prozess-Standard
│   ├── DECISIONS.md         ← Architekturentscheidungen
│   ├── MIGRATION-GUIDE.md   ← Bei Bedarf (Breaking Changes)
│   └── STATUS.md            ← Aktueller Projektstand
├── assets/
│   ├── pictograms/          ← KI-generiert
│   │   ├── de/
│   │   ├── es/
│   │   └── shared/          ← Sprachunabhängig
│   ├── audio/
│   ├── video/
│   └── fallback/            ← Manuelle Fallbacks
├── modules/
│   └── {modul-name}/
│       ├── de/script.md
│       ├── de/pictograms/
│       ├── de/audio/
│       ├── de/video/
│       ├── de/h5p/
│       ├── es/
│       └── shared/
├── src/                     ← Next.js/App-Code
├── CHANGELOG.md
├── README.md
└── PIKTOGRAMM-TOOLS.md
```

---

## Anhang

### A. Checklisten-Sammlung

**Modul-Freigabe-Checkliste:**

- [ ] Alle Pictogramme freigegeben (Domain-Expert)
- [ ] Script von Domain-Expert geprüft
- [ ] TTS-Audio vollständig und fehlerfrei
- [ ] Video gerendert und QC bestanden
- [ ] H5P-Quiz funktionsfähig (alle Fragen beantwortbar)
- [ ] Accessibility-Audit bestanden
- [ ] Changelog aktualisiert
- [ ] Auf Staging getestet
- [ ] Feedback von 1+ Tester(n) eingeholt
- [ ] Auf PROD deployiert

**PR-Review-Checkliste:**

- [ ] Code kompiliert (`next build` / `npx tsc`)
- [ ] Keine neuen TypeScript-Fehler
- [ ] H5P-Validierung bestanden
- [ ] Keine toten Links
- [ ] CHANGELOG.md aktualisiert (falls nötig)
- [ ] PROCESS-SPEC.md konsistent (falls prozessrelevante Änderungen)

### B. Glossar

| Begriff | Bedeutung |
|---------|-----------|
| **ADR** | Architecture Decision Record — Dokumentation einer wichtigen Technologieentscheidung |
| **ARASAAC** | Aragonese Portal of Augmentative and Alternative Communication — Pictogramm-Datenbank |
| **GER** | Gemeinsamer Europäischer Referenzrahmen — Sprachniveau-Standard (A1–C2) |
| **H5P** | HTML5 Package — Open-Source-Authoring-Tool für interaktive Lerninhalte |
| **LMS** | Learning Management System — Plattform zur Verwaltung von Schulungen |
| **SCORM** | Sharable Content Object Reference Model — Standard für LMS-Content-Pakete |
| **TTS** | Text-to-Speech — Sprachsynthese |
| **xAPI** | Experience API (auch Tin Can) — modernes Tracking-Format für Lernerfolge |

### C. Externe Ressourcen

| Ressource | URL |
|-----------|-----|
| MiniMax API Docs | platform.minimax.io/docs |
| MiniMax MCP (Python) | github.com/MiniMax-AI/MiniMax-MCP |
| ARASAAC Pictograms | arasaac.org |
| ARASAAC Beta (API) | beta.arasaac.org |
| H5P | h5p.org |
| Demenz Partner | demenz-partner.de |
| Deutsche Alzheimer Gesellschaft | deutsche-alzheimer.de |
| WCAG 2.1 Guidelines | w3.org/WAI/WCAG21/quickref |
| Vercel Docs | vercel.com/docs |

---

*Dieses Dokument wurde erstellt und wird gepflegt mit MiniMax M2.7.*
*Letzte Aktualisierung: 05.07.2026*
