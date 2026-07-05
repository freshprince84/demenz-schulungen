# Technische Spezifikation — Demenz-Schulungen

> **Status:** Überarbeitung in Arbeit — siehe [DECISIONS.md](DECISIONS.md) für verbindliche ADRs  
> **Version:** 0.3.0  
> **Letzte Änderung:** 2026-07-05  
> **Verantwortlich:** Projektteam Demenz-Schulungen

> **⚠️ Hinweis (2026-07-05):** Veraltete Abschnitte (Vercel, Moodle, H5P, ARASAAC, Astro) sind durch [DECISIONS.md](DECISIONS.md) ersetzt. Maßgeblich: [ARCHITECTURE.md](ARCHITECTURE.md), [API-SPEC.md](API-SPEC.md), [DATA-MODEL.md](DATA-MODEL.md), [DEPLOYMENT.md](DEPLOYMENT.md), [UX-IMPLEMENTATION.md](UX-IMPLEMENTATION.md).

---

## Inhaltsverzeichnis

1. [Überblick](#1-überblick)
2. [Tech-Stack: Aktiv](#2-tech-stack-aktiv)
3. [Tech-Stack: Deaktiviert](#3-tech-stack-deaktiviert)
4. [Technische Constraints](#4-technische-constraints)
5. [Architektur-Entscheidungen](#5-architektur-entscheidungen)
6. [Datenmodell](#6-datenmodell)
7. [API-Design](#7-api-design)
8. [Deployment-Pipeline](#8-deployment-pipeline)
9. [Monitoring & Observability](#9-monitoring--observability)
10. [Security](#10-security)
11. [Offene Fragen](#11-offene-fragen)

---

## 1. Überblick

**Projekt:** Interaktive Demenz-Schulungsplattform für Pflegeeinrichtungen  
**Ziel:**barrierefreie, mehrsprachige (DE/ES) Schulungen mit Pictogrammen, Animationen und SCORM-Export  
**Nutzer:** Pflegekräfte, Angehörige, Betreuungspersonen  
**Kernprinzip:** Offline-fähig, DSGVO-konform, Open-Source-first, keine US-Cloud-Dienste

---

## 2. Tech-Stack: Aktiv

### 2.1 Frontend

| Technologie | Version | Verwendung | Status |
|-------------|---------|------------|--------|
| **Next.js** | 15.x | App Router, RSC default | ⭐ Pflicht (ADR-003) |
| **TypeScript** | ≥5.0 | Strict Mode | Pflicht |
| **Tailwind CSS** | ≥3.4 | Utility-First, mapped auf DESIGN-SPEC Tokens | Pflicht |
| **Framer Motion** | ≥11.0 | Nur komplexe UI-Transitions (LazyMotion) | Selektiv (ADR-003) |
| **Lucide React** | latest | Icons (MIT, tree-shakeable) | ⭐ Bevorzugt |
| **CSS Animations** | — | Hover, Focus, Progress, Fade-In | Primär (DESIGN-SPEC §8.5) |

> **Rendering:** Server Components für Kursübersicht und Metadaten; Client Components nur für Modul-Player, Quiz, Mobile-Nav. Siehe [UX-IMPLEMENTATION.md](UX-IMPLEMENTATION.md) §4.

### 2.2 Backend

| Technologie | Version | Verwendung | Status |
|-------------|---------|------------|--------|
| **Node.js** | ≥20 LTS | Laufzeitumgebung | ⭐ Bevorzugt |
| **Bun** | ≥1.0 | Alternative Laufzeit (Performance-Vorteile) | Alternative |
| **Next.js API Routes** | — | Backend-Logik (kein separates Backend nötig) | ⭐ Standard |
| **PostgreSQL** | ≥15 | Produktiv-Datenbank | ⭐ Produktiv |
| **SQLite** | — | Lokale Entwicklung | ⭐ Dev |
| **Drizzle ORM** | latest | ORM + Migrationen | Pflicht (ADR-013) |

### 2.3 KI / APIs

| Modell / API | Verwendung | Status |
|--------------|------------|--------|
| **MiniMax M2.7** | Textgenerierung, Schulungsinhalte | ⭐ Pflicht |
| **MiniMax Image-01** | Pictogramm-Generierung, Illustrationen | ⭐ Pflicht |
| **MiniMax Hailuo-02** | Video-Generierung | Optional |
| **MiniMax speech-02** | Text-to-Speech (Vorlesen von Texten) | ⭐ Pflicht |
| **MiniMax MCP** | Model Context Protocol für Agent-Integration | ⭐ Pflicht |
| **Clawdbot** | Orchestrierungs-Layer, Automatisierung | ⭐ Pflicht |

> **Hinweis:** OpenAI wird explizit NICHT verwendet (siehe [Tech-Stack: Deaktiviert](#3-tech-stack-deaktiviert)). MiniMax bietet vergleichbare oder bessere Qualität bei niedrigeren Kosten.

### 2.4 Hosting / Infrastruktur

| Dienst | Verwendung | Status |
|--------|------------|--------|
| **Hetzner VPS** | Prod-App (Docker Compose, Caddy) | ⭐ Pflicht (ADR-007) |
| **GitHub Actions** | CI/CD | ⭐ Pflicht |
| **Winston (Clawdbot)** | Content-Assistenz (eigener Hetzner, ≠ Prod) | Assistenz |

> **Verworfen:** Vercel, Netlify, Railway, US-Cloud-Hosting (ADR-007).

### 2.5 Content & Piktogramme

| Quelle | Verwendung | Status |
|--------|------------|--------|
| **MiniMax Image-01** | Piktogramm-Generierung | ⭐ Primär (ADR-009) |
| **Manuelle SVGs** | Piktogramme, Review vor Commit | Sekundär (ADR-009) |
| **quiz.json** | Quiz-Definition im Repo | Pflicht (ADR-011) |
| **Eigene React-Komponenten** | Quiz, Modul-Player | Pflicht (ADR-004) |

> **Verworfen:** ARASAAC, H5P, Moodle (ADR-002, ADR-004, ADR-009). SCORM-Export Phase 2.

### 2.6 Content Pipeline

| Technologie | Verwendung | Status |
|------------|------------|--------|
| **Figma** | Pictogramm-Bearbeitung, UI-Design | ⭐ Bevorzugt |
| **Canva** | Schnelle Grafik-Erstellung | Alternative |
| **FFmpeg** | Video-Post-Processing, Format-Konvertierung | Pflicht |
| **Whisper (lokal)** | Automatische Untertitel-Generierung | Pflicht |
| **MiniMax Image-01** | Eigene Pictogramm-Kreation | ⭐ Pflicht |

---

## 3. Tech-Stack: Deaktiviert

Die folgenden Technologien sind **explizit verboten** und dürfen nicht verwendet werden:

| Verbotene Technologie | Grund |
|----------------------|-------|
| **OpenAI** (ChatGPT, DALL·E etc.) | Keine Nutzung laut Projektanforderung |
| **Facebook / Meta** | Privacy-first, keine Meta-Dienste |
| **Google Analytics** | Privacy-first, keine third-party Tracker |
| **Google Fonts** | Datenschutzbedenken (US-Cloud) |
| **Adobe Creative Cloud** | Nur Open-Source / Freiraum-Tools erlaubt |
| **Third-Party Tracker** | DSGVO-Konformität |
| **Facebook Pixel** | Privacy-first |
| **US-Cloud-Dienste ohne Garantien** | DSGVO-Risiko |

---

## 4. Technische Constraints

### 4.1 DSGVO-Konformität

- **Keine US-Cloud-Dienste ohne Garantien:** Server ausschließlich in EU oder in Ländern mit angemessenem Datenschutzniveau (Adequacy Decision)
- **Keine third-party Tracker:** Weder Google Analytics noch vergleichbare Tools
- **Privacy by Design:** Alle personenbezogenen Daten werden minimiert (Art. 25 DSGVO)
- **Einwilligungsmanagement:** Falls technisch notwendig, nur DSGVO-konforme Consent-Lösungen
- **Hosting:** Neuer Hetzner-VPS in EU (ADR-007), Docker Compose, Caddy TLS

### 4.2 Lizenzen

- **Bilder/Videos:** Ausschließlich CC BY-NC-SA oder eigene Kreationen via MiniMax
- **Software:** Open-Source-Lizenzen bevorzugt (MIT, Apache 2.0, GPL)
- **Piktogramme:** MiniMax Image-01 oder manuelle SVGs (ADR-009)

### 4.3 Offline-Fähigkeit

- **PWA mit Service Workers:** Alle kritischen Schulungen müssen offline verfügbar sein
- **Service Worker Strategie:** Cache-First für statische Assets, Network-First für API-Daten mit Fallback
- **IndexedDB:** Lokale Speicherung von Fortschritt und Lesezeichen
- **Workbox:** Bibliothek für Service-Worker-Management

### 4.4 Verfügbarkeit

- **Keine externe Abhängigkeit für kritische Schulungen:** Selbst wenn MiniMax oder externe APIs ausfallen, müssen Kern-Schulungen weiterhin funktionieren
- **Graceful Degradation:** KI-Funktionen sind Nice-to-have; Kerninhalte müssen immer abrufbar sein

---

## 5. Architektur-Entscheidungen

### 5.1 Static-First: Next.js 15 (App Router)

> **Status:** Entschieden — ADR-003. Der folgende Abschnitt beschreibt die Begründung.

**Begründung:**

1. **API-Route-Integration:** Fortschritt, MiniMax-Proxy serverseitig
2. **React Server Components:** Minimales Client-JS, schnelles LCP
3. **Static/ISR:** Kursinhalte aus `modules/` können statisch generiert werden
4. **DSGVO:** Self-Host auf Hetzner EU (ADR-007)

**Entscheidung:** Next.js 15 App Router. Server Components default, Client Components nur bei Interaktion. Siehe [UX-IMPLEMENTATION.md](UX-IMPLEMENTATION.md).

### 5.2 MiniMax statt OpenAI

**Begründung:**

1. **Kostengünstiger:** Deutlich günstigere API-Preise als OpenAI
2. **Vergleichbare Qualität:** MiniMax M2.7 liefert für deutsche Schulungstexte vergleichbare oder bessere Ergebnisse
3. **Explizites Verbot:** OpenAI ist in den Projektanforderungen verboten
4. **Multimodal:** Ein Anbieter für Text, Bild, Video und TTS vereinfacht die Integration

### 5.3 Interaktivität — Eigenbau (kein H5P)

> **Status:** Entschieden — ADR-004. H5P wird nicht verwendet.

**Begründung:**

1. **Selbstbau-Vorgabe:** Volle Kontrolle über UX und Barrierefreiheit
2. **DESIGN-SPEC-konform:** Eigene React-Komponenten passen exakt zur Demenz-Zielgruppe
3. **Performance:** Kein iframe, kein H5P-Runtime-Overhead
4. **quiz.json:** Reproduzierbare, versionierte Quiz-Definitionen im Repo

**Phase 1:** Multiple Choice. **Phase 2:** Drag&Drop, SCORM-Export.

### 5.4 Clawdbot als Orchestrierungs-Layer

**Begründung:**

1. **Bereits vorhanden:** Clawdbot läuft bereits auf dem Ubuntu-Server
2. **Cron-Jobs:** Automatisierte Content-Updates, Übersetzungen, Performance-Checks
3. **Agent-Integration:** MiniMax MCP ermöglicht agent-basierte Workflows
4. **Keine额外 Kosten:** Nutzt bestehende Infrastruktur

---

## 6. Datenmodell

### 6.1 ER-Diagramm (Text-Notation)

```
┌──────────────────┐     ┌──────────────────┐
│      Users       │     │     Courses      │
├──────────────────┤     ├──────────────────┤
│ id (PK, UUID)    │     │ id (PK, UUID)    │
│ name             │     │ title            │
│ email            │     │ description      │
│ role             │     │ language         │
│ language_pref    │     │ difficulty_level │
│ created_at       │     │ created_at       │
│ updated_at       │     │ updated_at       │
└────────┬─────────┘     └────────┬─────────┘
         │                        │
         │ 1:N                    │ 1:N
         ▼                        ▼
┌──────────────────┐     ┌──────────────────┐
│    Progress      │     │    Modules       │
├──────────────────┤     ├──────────────────┤
│ id (PK, UUID)    │     │ id (PK, UUID)    │
│ user_id (FK)    │─────│ course_id (FK)   │─────
│ module_id (FK)  │     │ title            │
│ completed       │     │ order            │
│ score           │     │ content_type     │
│ completed_at    │     │ content_data     │
│                 │     │ estimated_time   │
└──────────────────┘     └──────────────────┘
                                  
┌──────────────────┐     ┌──────────────────┐
│   Pictograms     │     │   Modules_Tags   │
├──────────────────┤     ├──────────────────┤
│ id (PK, UUID)    │     │ module_id (FK)   │
│ arasaac_id       │     │ tag_id (FK)      │
│ keyword_de       │     └──────────────────┘
│ keyword_es       │              │
│ image_url        │              │ N:M
│ category         │              ▼
│ created_at       │     ┌──────────────────┐
└──────────────────┘     │      Tags        │
                        ├──────────────────┤
                        │ id (PK, UUID)    │
                        │ name              │
                        │ type              │
                        └──────────────────┘
```

### 6.2 Entitäten im Detail

#### Users
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| name | String | Anzeigename |
| email | String (unique) | E-Mail-Adresse |
| role | Enum | `learner`, `instructor`, `admin` |
| language_preference | Enum | `de`, `es`, `both` |
| created_at | DateTime | Erstellungszeitpunkt |
| updated_at | DateTime | Letzte Änderung |

#### Courses
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| title | String | Kurstitel |
| description | Text | Kursbeschreibung |
| language | Enum | `de`, `es`, `both` |
| difficulty_level | Enum | `beginner`, `intermediate`, `advanced` |
| created_at | DateTime | Erstellungszeitpunkt |
| updated_at | DateTime | Letzte Änderung |

#### Modules
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| course_id | UUID (FK) | Zugehöriger Kurs |
| title | String | Modultitel |
| order | Int | Reihenfolge im Kurs |
| content_type | Enum | `text`, `video`, `quiz`, `h5p`, `interactive` |
| content_data | JSON | Flexibles Content-Feld (H5P-ID, Video-URL, Text etc.) |
| estimated_time | Int | Geschätzte Zeit in Minuten |

#### Progress
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| user_id | UUID (FK) | Benutzer |
| module_id | UUID (FK) | Modul |
| completed | Boolean | Abgeschlossen ja/nein |
| score | Int (0-100) | Punktzahl |
| completed_at | DateTime | Abschlusszeitpunkt |

#### Pictograms
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| arasaac_id | Int | Original-ID von ARASAAC |
| keyword_de | String | Deutsches Schlüsselwort |
| keyword_es | String | Spanisches Schlüsselwort |
| image_url | String | URL zum Bild |
| category | String | Kategorie (z.B. "pflege", "emotionen", "alltag") |

### 6.3 Datenbank-Schema

Siehe [DATA-MODEL.md](DATA-MODEL.md) — Drizzle Schema (ADR-013). Historische Prisma-Auszüge in älteren Versionen verworfen.

---

## 7. API-Design

### 7.1 Architektur

**Primär:** tRPC (TypeScript-end-to-end) für type-safe API-Aufrufe  
**Sekundär:** REST für externe Integrationen (SCORM-LMS, H5P)

### 7.2 Authentifizierung

**Lösung:** NextAuth.js v5 (Auth.js) mit Credential-Provider

- **JWT-basiert:** Keine Sessions auf dem Server
- **Passwort-Hashing:** bcrypt (oder argon2)
- **Provider:** Credential-Login (E-Mail + Passwort)
- **MFA:** Empfohlen für Admin-Accounts (TOTP)

**Alternative:** Eigene JWT-Lösung falls NextAuth zu schwergewichtig ist.

### 7.3 Endpunkte (REST-Fallback)

```
Auth:
POST   /api/auth/register     Neuen Benutzer registrieren
POST   /api/auth/login        Anmelden (JWT zurückgeben)
POST   /api/auth/refresh      Token erneuern
POST   /api/auth/logout       Abmelden

Kurse:
GET    /api/courses           Alle Kurse auflisten
GET    /api/courses/:id       Kursdetails mit Modulen
POST   /api/courses           Neuen Kurs erstellen (Admin)
PUT    /api/courses/:id       Kurs aktualisieren (Admin)
DELETE /api/courses/:id       Kurs löschen (Admin)

Module:
GET    /api/modules/:id       Modul-Details
POST   /api/modules           Neues Modul erstellen
PUT    /api/modules/:id       Modul aktualisieren
DELETE /api/modules/:id       Modul löschen

Fortschritt:
GET    /api/progress          Eigene Fortschritte
POST   /api/progress          Fortschritt aktualisieren
GET    /api/progress/:courseId  Fortschritt für bestimmten Kurs

MiniMax Proxy (serverseitig):
POST   /api/generate/text     Text generieren
POST   /api/generate/image    Bild generieren
POST   /api/generate/speech   Sprache generieren
POST   /api/generate/video    Video generieren
```

### 7.4 Rate-Limiting

- **MiniMax API:** Max 60 Requests/Minute pro User
- **Implementierung:** In-Memory Store (Upstash Redis bei Bedarf)
- **Front-End:** Debouncing bei KI-Aufrufen (min. 1 Sekunde zwischen Anfragen)

### 7.5 MiniMax Proxy

Alle MiniMax-Aufrufe laufen über serverseitige API-Routes:
- API-Key wird NIEMALS an Frontend ausgeliefert
- Validierung der Prompts (keine PII, keine Injection)
- Caching von generierten Inhalten (Redis oder Dateisystem)
- Retry-Logik mit exponentiellem Backoff

---

## 8. Deployment-Pipeline

### 8.1 Pipeline-Übersicht

```
┌──────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Lokal       │     │  GitHub Actions │     │  Vercel/Netlify │
│  (Entwickler)│────▶│  CI/CD Pipeline  │────▶│  Auto-Deploy    │
└──────────────┘     └─────────────────┘     └─────────────────┘
                            │
                            ▼
                     ┌─────────────────┐
                     │  Clawdbot Cron   │
                     │  (Automatisierung)│
                     └─────────────────┘
```

### 8.2 GitHub Actions CI/CD

**.github/workflows/deploy.yml:**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

  build:
    needs: lint-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          CI: false  # Kritisch: React Scripts bricht bei CI=true ab

  deploy-vercel:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 8.3 Clawdbot Automatisierung

Folgende Tasks laufen via Clawdbot Cron:

| Task | Schedule | Beschreibung |
|------|----------|--------------|
| Content-Sync | Täglich 06:00 UTC | Prüft neue Pictogramme von ARASAAC |
| MiniMax-Check | Täglich 07:00 UTC | Validierung der API-Keys und Limits |
| Lighthouse-Audit | Wöchentlich So 20:00 UTC | Performance-Review via PageSpeed |
| DB-Backup | Täglich 03:00 UTC | SQLite/PostgreSQL Backup |
| Security-Scan | Wöchentlich Mo 08:00 UTC | Abhängigkeits-Audit (npm audit) |

---

## 9. Monitoring & Observability

### 9.1 Error-Tracking

**Kein Sentry** (US-basiert, Privacy-Bedenken)

**Alternative:**
- **Frontend:** Console-Logging + Custom Error Boundary mit lokaler Speicherung
- **Backend:** Structured Logging (pino) in Dateien, kein externer Service
- **Log-Aggregation:** Einfache Bash-Scripts zur Fehleranalyse

### 9.2 Verfügbarkeits-Monitoring

| Methode | Tool | Beschreibung |
|---------|------|--------------|
| Uptime | Clawdbot Heartbeat | Cron prüft alle 5 Min die Verfügbarkeit |
| GitHub Actions | Actions Logs | Automatische Benachrichtigung bei CI-Fails |
| Lighthouse | PageSpeed API | Wöchentlicher Performance-Check |
| Manual QA | — | Regelmäßige Tests auf TEST-Umgebung |

### 9.3 Key Metrics

- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1 (siehe [UX-IMPLEMENTATION.md](UX-IMPLEMENTATION.md) §7)
- **Offline-Funktionalität:** 100% der Kern-Schulungen offline verfügbar
- **Build-Zeit:** < 5 Minuten für Full-Build
- **API-Response-Time:** < 500ms für dynamische Endpunkte

---

## 10. Security

### 10.1 API-Keys Management

- **MiniMax-Key:** Ausschließlich in serverseitigen API-Routes (niemals im Browser)
- **Umgebungsvariablen:** `.env.local` (lokal), Docker Compose Env (Prod)
- **Secrets:** Niemals in Git, niemals in Frontend-Code

### 10.2 Content Security Policy (CSP)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';  # Tailwind braucht inline styles
  img-src 'self' data: https://*.minimax.io;
  font-src 'self';
  connect-src 'self' https://api.minimax.io;
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
```

### 10.3 Transport Security

- **HTTPS everywhere:** Alle Verbindungen verschlüsselt
- **HSTS:** Strict-Transport-Security Header aktiviert
- **TLS 1.3:** Minimale TLS-Version

### 10.4 Input Validation

- **Zod:** Schema-Validierung für alle API-Inputs
- **Sanitization:** HTML-Sanitization für benutzergenerierte Inhalte
- **Prompt-Injection-Schutz:** MiniMax-Prompts werden validiert (keine PII, keine System-Prompt-Injection)

### 10.5 Auth-Sicherheit

- **Passwort-Hashing:** bcrypt mit cost factor ≥ 12
- **JWT:** Kurze Lebensdauer (15 Min), Refresh-Token mit 7 Tagen
- **Rate-Limiting:** Login-Versuche max 5/Minute pro IP
- **Session:** HttpOnly, Secure, SameSite=Strict Cookies

---

## 11. Offene Fragen

> **Stand 2026-07-05:** Die meisten Punkte sind in [DECISIONS.md](DECISIONS.md) entschieden.

| # | Frage | Entscheidung | ADR |
|---|-------|--------------|-----|
| 1 | Tailwind vs. CSS Modules | Tailwind | ADR-003 |
| 2 | Next.js vs. Astro | Next.js 15 | ADR-003 |
| 3 | Hosting | Neuer Hetzner Self-Host | ADR-007 |
| 4 | Moodle vs. Eigenbau | Eigenbau, kein Moodle | ADR-002 |
| 5 | Datenbank | PostgreSQL Self-Hosted | ADR-006 |
| 6 | Interaktivität | Eigene React-Komponenten, kein H5P | ADR-004 |
| 7 | Pictogramme | MiniMax + manuell, kein ARASAAC | ADR-009 |
| 8 | SCORM | Phase 2, eigener Wrapper | ADR-002 |
| 9 | UX / Performance | CSS-first Animation, RSC | ADR-003, UX-IMPLEMENTATION |

---

## Changelog

| Version | Datum | Autor | Änderung |
|---------|-------|-------|----------|
| 0.1.0 | 2025-07-05 | Subagent | Initiale Version |

---

*Dieses Dokument wird bei Architektur-Entscheidungen und nach jedem Sprint aktualisiert.*
