# Architekturentscheidungen (ADR)

> **Format:** Architecture Decision Records  
> **Projekt:** Demenz-Schulungen  
> **Letzte Aktualisierung:** 2026-07-05

---

## Projektprinzipien (verbindlich)

1. **Selbstbau ist Pflicht** — Plattform und Pipeline werden selbst gebaut.
2. **Keine Lizenzen, keine Abos, keine Dienstleistungen** — Open Source auf eigenem Server erlaubt. MiniMax-API ist die einzige erlaubte externe KI-Dienstleistung.
3. **Zeit ist keine Einschränkung** — Qualität und Unabhängigkeit vor Geschwindigkeit.
4. **Drei getrennte Systeme:** Cursor (lokal), Winston/Clawdbot (eigener Hetzner, Assistenz), Prod-App (neuer Hetzner-VPS).

---

## ADR-001: Phase-1-Scope (MVP)

**Status:** Verabschiedet — 2026-07-05

### Kontext

Repo startet als Dokumentation. Ziel ist maximale Content-Qualität bei kontrollierbarem Scope.

### Entscheidung

Phase 1 liefert parallel:

1. Content-Pipeline (3 Pilotmodule, MiniMax-Assets)
2. Eigene Plattform (Kursübersicht, Modul-Player, eigene Quiz-Komponenten, Fortschritt in DB)
3. **Kein SCORM-Export in Phase 1** — Phase 2 (eigener Wrapper)

**Nicht in Phase 1:** SCORM-Export, Auth/Rollen, Zertifikate, Reporting, Multi-Tenant.

### Konsequenzen

- Fokus auf Didaktik, Barrierefreiheit, reproduzierbare Pipeline
- LMS-Funktionen später ergänzbar ohne Content-Neubau

---

## ADR-002: Kein Moodle — eigene Plattform

**Status:** Verabschiedet — 2026-07-05

### Kontext

Selbstbau-Vorgabe. Moodle ist ein fremdes LMS-Produkt.

### Entscheidung

**Moodle wird nicht verwendet.** Alle LMS-Funktionen werden selbst gebaut:

| Funktion | Lösung | Phase |
|----------|--------|-------|
| Kursanzeige / Player | Eigene Next.js-App | 1 |
| Interaktive Übungen | Eigene React-Komponenten | 1–2 |
| Fortschritt | PostgreSQL + API | 1 |
| Enrollment / Rollen | NextAuth.js | 2 |
| Zertifikate | Eigene PDF-Generierung | 3 |
| Reporting | Eigene Dashboards | 3 |
| SCORM-Export | Eigener Wrapper | 2 |

### Verworfen

Moodle, WordPress+LMS, TalentLMS, jede SaaS-Lernplattform.

---

## ADR-003: Framework — Next.js 15

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

**Next.js 15** (App Router), TypeScript strict, Tailwind CSS.

### Stack

- ORM: **Drizzle** + PostgreSQL (siehe ADR-013)
- Validierung: Zod
- Auth: NextAuth.js v5 (Phase 2)
- Animation: **CSS primär**, Framer Motion nur für komplexe UI-Transitions (Mobile-Nav-Stagger, Page-Exit/Enter) — siehe DESIGN-SPEC §8.5, [UX-IMPLEMENTATION.md](UX-IMPLEMENTATION.md)
- Icons: Lucide React (MIT) oder inline SVG — kein Icon-Font
- Rendering: React Server Components default, Client Components nur bei Interaktion

### Animations-Policy

| Typ | Technologie |
|-----|-------------|
| Hover, Focus, Progress, Fade-In | CSS `transition` / `@keyframes` |
| `prefers-reduced-motion` | CSS global |
| Nav-Stagger, Page-Transitions | Framer Motion mit `LazyMotion` + `domAnimation` |

Framer Motion nie global im Root-Layout. Budget: < 20 KB gzipped auf animierten Routen.

### Verworfen

Astro, Vite-only SPA, Supabase Cloud, Firebase, Vercel-Hosting, shadcn/ui, Radix UI, MUI, Icon-Fonts.

---

## ADR-004: Interaktivität — Eigenbau statt H5P

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

- **Phase 1:** Eigene React-Komponenten (Multiple Choice, Schritt-Navigation, Fortschritt)
- **Phase 2:** Drag&Drop, Dialog-Karten, SCORM 2004 Export
- **Format:** `quiz.json` (siehe [QUIZ-SCHEMA.md](QUIZ-SCHEMA.md))

### Verworfen

H5P Runtime, H5P Cloud, Lumi, Articulate, Doodly.

---

## ADR-005: KI-Policy — MiniMax only

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

- **Erlaubt:** MiniMax (Text, TTS, Image, optional Video)
- **Verboten:** OpenAI, Anthropic, Google AI
- **Winston/Clawdbot:** Nur Content-Assistenz auf **eigenem Hetzner-Server** (≠ Prod-Server, ≠ Intranet)
- **API-Keys:** Nur serverseitig (`/api/generate/*`)
- **Keine PII** in MiniMax-Prompts

---

## ADR-006: Datenbank — PostgreSQL Self-Hosted

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

- **Lokal:** Docker-PostgreSQL
- **Prod:** PostgreSQL 16 im Docker Compose auf neuem Hetzner-VPS

Siehe [DATA-MODEL.md](DATA-MODEL.md).

---

## ADR-007: Hosting — Neuer Hetzner-Server

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

Dedizierter **neuer** Hetzner-VPS für die Prod-App. Docker Compose. EU-Region.

### Verworfen

Vercel, Netlify, Railway, Render, US-Cloud-Hosting.

---

## ADR-008: Schriften — System-Fonts

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

System-Font-Stack primär. Optional self-hosted Noto Sans. **Kein Google Fonts CDN.**

---

## ADR-009: Piktogramme — MiniMax / Eigenbau

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

- **Primär:** MiniMax Image-01
- **Sekundär:** Manuelle SVGs (Inkscape/Figma)
- **Metadaten:** `source: minimax | manual` in `metadata.json`

### Verworfen

ARASAAC (CC BY-NC-SA), Flaticon, Noun Project, Dememo.

---

## ADR-010: Zielgruppe & Animation

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

- **Primär:** Pflegefachkräfte und Angehörige
- **Motion:** Sanft, `prefers-reduced-motion` immer
- **Video:** Statische Slideshow + TTS bevorzugt

---

## ADR-011: Content-Formate & Repo-Struktur

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

Content im Repo unter `modules/{name}/de/`. Siehe [MODULE-TEMPLATE.md](MODULE-TEMPLATE.md).

**Kein H5P.** Quiz über `quiz.json`.

---

## ADR-012: Zugang — Login-only

**Status:** Verabschiedet — 2026-07-05

### Entscheidung

Plattform nur mit Login/Zugangscode erreichbar. Formale DSGVO-Doku trotzdem Pflicht. Datenschutzerklärung in der App.

---

## ADR-013: ORM — Drizzle statt Prisma

**Status:** Verabschiedet — 2026-07-05

### Kontext

PostgreSQL ist Pflicht (Fortschritt, Auth). Für TypeScript braucht es eine DB-Schicht. Prisma war initial vorgesehen; Projektinhaber bevorzugt bewusstere, SQL-nahe Lösung ohne zusätzliche Code-Generierung.

### Entscheidung

**Drizzle ORM** mit `drizzle-kit` für Migrationen.

| Kriterium | Drizzle | Prisma |
|-----------|---------|--------|
| SQL-Transparenz | Hoch (Schema ≈ SQL) | Abstrahiert |
| Bundle/Runtime | Leicht | Schwerer |
| Migrationen | drizzle-kit | prisma migrate |
| TypeScript | Nativ | Generierter Client |
| Lernkurve | SQL-Kenntnisse hilfreich | Eigene DSL |

### Konsequenzen

- Schema in `src/db/schema.ts`
- Migrationen in `drizzle/`
- Queries typsicher, parametrisiert (SQL-Injection-Schutz)

### Verworfen

Prisma, TypeORM, rohes SQL ohne ORM.

---

## Changelog

| ADR | Datum | Änderung |
|-----|-------|----------|
| 013 | 2026-07-05 | ORM: Drizzle statt Prisma |
| 003 | 2026-07-05 | Animations-Policy präzisiert (CSS primär, LazyMotion) |
| 001–011 | 2026-07-05 | Initiale Verabschiedung |
| 012 | 2026-07-05 | Login-only Zugang |
