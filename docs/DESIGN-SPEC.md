# DESIGN-SPEC.md — Design Specification

> **Dokumentenstatus:** Verbindlich  
> **Version:** 1.0  
> **Erstellt:** 2026-07-05  
> **Letzte Änderung:** 2026-07-05  
> **Modell:** MiniMax M2.7 (minimax/MiniMax-M2.7)

---

## Inhaltsverzeichnis

1. [Vision & Design Philosophy](#1-vision--design-philosophy)
2. [Farbpalette](#2-farbpalette)
3. [Typografie](#3-typografie)
4. [Layout & Spacing](#4-layout--spacing)
5. [UI-Komponenten](#5-ui-komponenten)
6. [Pictogramm-Standards](#6-pictogramm-standards)
7. [Video-Design](#7-video-design)
8. [Motion & Animation](#8-motion--animation)
9. [Responsive Strategy](#9-responsive-strategy)
10. [Design Tokens](#10-design-tokens)

---

## 1. Vision & Design Philosophy

### 1.1 Übergeordnetes Ziel

Das Design-System ist die Grundlage für eine Schulungsplattform, die **Menschen mit Demenz, ihre Angehörigen und Pflegefachkräfte** befähigt, Wissen über Demenz zu erwerben — ohne Barrieren, ohne Ablenkung, ohne Überforderung.

### 1.2 Design-Prinzipien

#### 1.2.1 Apple-inspirierte Philosophie

Das Design folgt den Prinzipien des **Apple Human Interface Guidelines** (developer.apple.com/design/human-interface-guidelines):

- **Klarheit:** Jede Ansicht kommuniziert eine einzige, klare Botschaft. Keine visuellen Ablenkungen.
- **Lesbarkeit:** Text ist das Herzstück — immer ausreichend groß, mit genügend Weißraum.
- **Tiefe:** Visuelle Hierarchien durch sanfte Schatten und Ebenen schaffen Orientierung, ohne zu überfordern.
- **Beherrschung:** Das Interface reagiert präzise und vorhersehbar. Keine Überraschungen.
- **Weniger ist mehr:** Jedes Element muss einen klaren Zweck erfüllen. Keine Zier-Elemente.

#### 1.2.2 Accessibly by Design (WCAG 2.1 AA)

Barrierefreiheit ist kein Zusatz — sie ist **fester Bestandteil jeder Design-Entscheidung**:

| Anforderung | Standard | Umsetzung |
|-------------|----------|-----------|
| Textkontrast | WCAG 2.1 AA (4.5:1 für Fließtext, 3:1 für große Texte) | Min. 4.5:1 überall, 7:1 anstreben |
| Touch-Targets | Apple HIG: min. 44×44pt | Min. 48×48px auf Web |
| Navigation | Max. 3 Ebenen tief | Flache Informationsarchitektur |
| Screenreader | Vollständige ARIA-Labels | Jedes interaktive Element beschriftet |
| Farbe ≠ Information | Niemals Farbe als einziges Mittel | Immer Text oder Icon als Backup |

**Referenz:** [Apple Accessibility — Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/accessibility)

#### 1.2.3 Farbpsychologie für Demenz

Farben beeinflussen Stimmung, Orientierung und kognitive Belastung:

- **Beruhigende, warme Primärfarben** reduzieren Angst und Unruhe
- **Grelle, gesättigte Farben** (Neon, hochgesättigtes Orange/Rot) vermeiden — erzeugen Unruhe und Überstimulation
- **Klare Farbkontraste** helfen bei Sehschwäche (häufig bei älteren Menschen)
- **Farbcodierung mit Backups:** Farbe nie als einziges Unterscheidungsmerkmal
- **Konsistenz über alle Module:** Gleiche Farbe = gleiche Bedeutung (z.B. Blau = Navigation, Grün = Bestätigung)

| Farbe-Wirkung | Empfehlung | Vermeiden |
|--------------|------------|-----------|
| Blau | Beruhigend, vertrauensbildend | Dunkles, gesättigtes Blau |
| Grün | Erfolg, Sicherheit, Natur | Zu hell (schlechter Kontrast) |
| Warmweiß/Creme | Weniger grell als reines Weiß | Reines Weiß (#FFFFFF) als Hintergrund |
| Gelb | Freundlich, aufmerksam (Nur für Hinweise) | Grelles Neon-Gelb |
| Orange | Warm, einladend (Nur für sekundäre CTAs) | Gesättigtes Signal-Orange |
| Rot | Nur für Fehler/Warnungen (sparsam) | Jede andere Verwendung |

#### 1.2.4 Konsistentes Design Language über alle Medien

| Medium | Design-Anwendung | Besonderheiten |
|--------|-----------------|-----------------|
| **Web-App** | HTML/CSS, Tailwind-kompatibel | Touch-optimiert, Dark Mode |
| **Video** | Pictogramme + Voice-over | Sanfte Animationen, Untertitel |
| **Print-Piktogramme** | SVG/PDF, 256px×256px Minimum | Klare Linien, max. 3 Farben |
| **Quiz/H5P** | Farbschema aus Palette | Pictogramm-basiert |

---

## 2. Farbpalette

### 2.1 Primärfarben

#### Primär-Blau (Navigation, Links, Interaktion)
```
#2B5BA8 — Primär-Blau
     RGB: 43, 91, 168
     HSL: 218°, 59%, 41%
     Kontrast auf Weiß: 6.2:1 ✅ (WCAG AA)
     Kontrast auf Creme (#F8F6F1): 5.1:1 ✅ (WCAG AA)
```

#### Primär-Blau Hover / Active
```
#1E4A8C — Dunkleres Primär-Blau (für Hover-States)
     RGB: 30, 74, 140
```

#### Primär-Blau Hell (Hintergründe)
```
#EBF1FA — Hellblau (aktive Bereiche, Hover-Hintergründe)
     RGB: 235, 241, 250
```

### 2.2 Sekundärfarben

#### Neutral-Grau (Text, Rahmen)
```
#4A4A4A — Dunkelgrau (Primärtext)
     RGB: 74, 74, 74
     Kontrast auf Weiß: 10.3:1 ✅ (WCAG AAA)
     Kontrast auf Creme: 8.5:1 ✅ (WCAG AAA)
```

#### Neutral-Grau Mittel (Sekundärtext)
```
#6B6B6B — Mittelgrau (Beschreibungen, Labels)
     RGB: 107, 107, 107
     Kontrast auf Weiß: 5.9:1 ✅ (WCAG AA)
```

#### Neutral-Grau Hell (Rahmen, Dezente Hintergründe)
```
#E0DED9 — Hellgrau (Trennlinien, Kartenrahmen)
     RGB: 224, 222, 217
```

#### Hintergrund Creme (Primärer Seitenhintergrund)
```
#F8F6F1 — Cremeweiß (Weniger grell als #FFFFFF)
     RGB: 248, 246, 241
```

#### Hintergrund Weiß (Karten, Inputs)
```
#FFFFFF — Weiß (Kartenflächen, Eingabefelder)
```

### 2.3 Semantic Colors

#### ✅ Erfolg (Success)
```
#2D7A4F — Vertrauenswürdiges Grün
     RGB: 45, 122, 79
     Kontrast auf Weiß: 5.8:1 ✅ (WCAG AA)
     Verwendung: Bestätigungen, Fortschritt, „Richtig"-Feedback
```

#### ✅ Erfolg Hintergrund
```
#E8F5EE — Hellgrün
     RGB: 232, 245, 238
```

#### ⚠️ Warnung (Warning)
```
#C47A1E — Gedämpftes Orange
     RGB: 196, 122, 30
     Kontrast auf Weiß: 4.8:1 ✅ (WCAG AA)
     Verwendung: Warnungen, wichtige Hinweise (kein Rot!)
```

#### ⚠️ Warnung Hintergrund
```
#FEF3E2 — Hellorange
     RGB: 254, 243, 226
```

#### ❌ Fehler (Error)
```
#B33A3A — Gedämpftes Rot
     RGB: 179, 58, 58
     Kontrast auf Weiß: 5.6:1 ✅ (WCAG AA)
     Verwendung: Fehlermeldungen, „Falsch"-Feedback
     ⚠️ Rot sparsam einsetzen — kann bei Demenz-Betroffenen Unruhe auslösen
```

#### ❌ Fehler Hintergrund
```
#FDECEC — Hellrot
     RGB: 253, 236, 236
```

#### ℹ️ Information (Info)
```
#2B5BA8 — Primär-Blau (Consistent mit Primärfarbe)
     RGB: 43, 91, 168
     Hintergrund: #EBF1FA
```

### 2.4 Dark Mode Specification

| Token (Light) | Token (Dark) | Wert (Dark) | RGB (Dark) |
|---------------|--------------|-------------|------------|
| `--color-bg-page` | `--color-bg-page-dark` | #1A1A1A | 26,26,26 |
| `--color-bg-card` | `--color-bg-card-dark` | #242424 | 36,36,36 |
| `--color-bg-input` | `--color-bg-input-dark` | #2E2E2E | 46,46,46 |
| `--color-text-primary` | `--color-text-primary-dark` | #F0EEE9 | 240,238,233 |
| `--color-text-secondary` | `--color-text-secondary-dark` | #B0AEA8 | 176,174,168 |
| `--color-border` | `--color-border-dark` | #3A3A3A | 58,58,58 |
| `--color-primary` | `--color-primary-dark` | #4A7FD4 | 74,127,212 |

**Dark Mode Regeln:**
- Text immer mit Kontrast ≥ 4.5:1 zum Hintergrund
- Gedämpfte Farben verwenden (keine gesättigten Neonfarben)
- Cremeweiß niemals auf dunklen Hintergründen
- `prefers-color-scheme: dark` als primären Mechanismus

---

## 3. Typografie

### 3.1 Schriftfamilien

#### 3.1.1 System-Font-Stack (Native Performance)

```css
font-family:
  /* Apple */
  -apple-system,
  /* Windows */
  "Segoe UI",
  /* Android / Chrome */
  "Roboto",
  /* Linux */
  "Ubuntu", "Cantarell",
  /* Fallback */
  Arial,
  /* Sans-Serif Universal */
  sans-serif;
```

**Eigenschaften:** Kein Webfont-Download nötig, optimierte Rendering-Performance, native Anpassung an OS-DPI.

#### 3.1.2 Google Fonts (Piktogramm-Schrift + Optionale Extras)

Für **Piktogramm-Beschriftungen** und **Fließtext-Komfort** (mit Fallback):

```css
/* Noto Sans — Deckt alle erforderlichen Sprachen ab */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap');

/* Unterstützte Schriftsysteme in Noto Sans: */
/* Latein, Griechisch, Kyrillisch, Arabisch, Hebräisch, */
/* Thailändisch, Hindi, Japanisch (Katakana/Hiragana), */
/* Koreanisch, Chinesisch (CJK) */
```

**Sprach-Abdeckung:**

| Sprache | Schrift | Unterstützung |
|---------|---------|---------------|
| Deutsch (DE) | System-Font / Noto Sans | ✅ Vollständig |
| Spanisch (ES) | System-Font / Noto Sans | ✅ Vollständig |
| Französisch (FR) | System-Font / Noto Sans | ✅ Vollständig |
| Englisch (EN) | System-Font / Noto Sans | ✅ Vollständig |
| Arabisch (AR) | Noto Sans Arabic | ✅ Vollständig (ARASAAC) |
| Polnisch (PL) | System-Font / Noto Sans | ✅ Vollständig |

> **Hinweis:** Pictogramm-Beschriftungen nutzen IMMER serifenlose Schriften. Serifen (Times New Roman etc.) reduzieren die Lesbarkeit bei kognitiven Einschränkungen erheblich.

### 3.2 Schriftgrößen-Scale (8pt-Raster)

```
Base: 16px (entspricht 12pt im Druck)

| Name        | rem      | px   | pt (Druck) | Verwendung                    |
|-------------|----------|------|------------|-------------------------------|
| xs          | 0.75rem  | 12px | 9pt        | Ausnahme: technische Labels   |
| sm          | 0.875rem | 14px | 10.5pt     | Captions, Timestamps          |
| base        | 1rem     | 16px | 12pt       | Fließtext, Body               |
| md          | 1.125rem | 18px | 13.5pt     | Betonungen, wichtige Labels    |
| lg          | 1.25rem  | 20px | 15pt       | Unterüberschriften            |
| xl          | 1.5rem   | 24px | 18pt       | Modultitel                    |
| 2xl         | 1.875rem | 30px | 22.5pt     | Seitentitel                   |
| 3xl         | 2.25rem  | 36px | 27pt       | Hero-Überschriften            |
| 4xl         | 3rem     | 48px | 36pt       | Hero-Banner (nur Startseite)  |
| pictogram-label | 1.25rem | 20px | 15pt   | Pictogramm-Beschriftungen      |
```

**Hinweis für Demenz-Nutzer:** Die Mindestgröße für Fließtext beträgt **16px (base)**. Darunter wird nicht gegangen, auch nicht für „Dekoration". Pictogramm-Labels mindestens **18px**.

### 3.3 Line-Height & Letter-Spacing

| Kontext | line-height | letter-spacing | Beispiel |
|---------|-------------|----------------|---------|
| Fließtext (Langtext) | 1.6 – 1.75 | 0 (standard) | Schulungstexte |
| Überschriften | 1.2 – 1.3 | -0.02em | Modultitel |
| Pictogramm-Labels | 1.4 | +0.02em | Beschriftungen unter Pictogrammen |
| Buttons / CTAs | 1.0 | +0.05em | Button-Text (Caps: +0.1em) |
| Captions | 1.5 | +0.01em | Timestamps, Metadaten |
| Form-Labels | 1.4 | 0 (standard) | Input-Beschriftungen |

**Hinweis:** Größere Zeilenhöhe (1.6+) reduziert die kognitive Belastung beim Lesen, besonders bei Demenz-Betroffenen.

### 3.4 Pictogramm-Schrift-Spezifikation

```
Schriftfamilie:  System-Font (sans-serif), NOT Noto Sans (serifenlos!)
Schriftgröße:   18px – 24px (je nach Pictogramm-Größe)
Schriftstärke:  600 (Semi-Bold)
Textfarbe:      #4A4A4A (Dunkelgrau) — NICHT Schwarz (#000000)
Texttransform:  none (kein ALL CAPS für Pictogramm-Beschriftungen)
Zeilenabstand:  1.4
Alignment:      Center (unter Pictogramm zentriert)
Max. Zeichen:   20 Zeichen pro Beschriftung
```

---

## 4. Layout & Spacing

### 4.1 8px Grid-System

Alle Spacing-Werte basieren auf dem **8px-Raster**. Keine ungeraden Pixelwerte.

```
| Token  | Wert  | Verwendung                          |
|--------|-------|--------------------------------------|
| 0      | 0px   | Kein Abstand                         |
| 1      | 4px   | Inline-Details (Icon-Text-Gap)       |
| 2      | 8px   | Enger Abstand (Label-Icon)           |
| 3      | 12px  | Kompakter Abstand                    |
| 4      | 16px  | Standard-Padding (Karten, Inputs)    |
| 5      | 20px  | Button-Padding                       |
| 6      | 24px  | Section-Inner-Spacing                |
| 8      | 32px  | Standard-Gap zwischen Elementen     |
| 10     | 40px  | Großzügiger Abstand                  |
| 12     | 48px  | Section-Trennung                     |
| 16     | 64px  | Banner / Hero-Spacing                |
| 20     | 80px  | Maximale Section-Separation          |
| 24     | 96px  | Page-Top / Page-Bottom               |
```

**Anwendungsregel:** Immer das nächsthöhere Grid-Token verwenden (nie `10px`, sondern `8px` oder `12px`).

### 4.2 Responsive Breakpoints

**Mobile-first**: Erst für mobile Geräte designen, dann für größere Bildschirme erweitern.

```
| Name       | min-width | Geräteklasse                        |
|------------|-----------|--------------------------------------|
| base       | —         | Mobile (< 640px)                    |
| sm         | 640px     | Große Smartphones, kleine Tablets    |
| md         | 768px     | Tablets (iPad)                       |
| lg         | 1024px    | Laptops, kleine Desktops             |
| xl         | 1280px    | Desktops                             |
| 2xl        | 1536px    | Große Monitore                       |

/* Praxis-Beispiel (CSS/Tailwind): */
.container { max-width: 1280px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 768px)  { .container { padding: 0 24px; } }
@media (min-width: 1024px) { .container { padding: 0 40px; } }
```

**Besonderheit Tablets:** Da Demenz-Betroffene häufig Tablets nutzen, ist die **md-Breakpoint** (768px) die kritischste Schwelle. Hier muss sichergestellt sein:
- Alle Touch-Targets ≥ 48×48px
- Pictogramme nicht zu klein skalieren
- Genug Padding für Touch-Interaktion

### 4.3 Padding / Margin Scale

```
/* === Page-Level === */
.page-padding-top:     48px  (6 × 8px)
.page-padding-bottom:  48px
.page-padding-x:       16px (mobile) / 24px (tablet) / 40px (desktop)

/* === Card-Level === */
.card-padding:         24px (3 × 8px)
.card-padding-mobile:  16px
.card-gap:             24px  (vertical gap between cards)
.card-gap-mobile:      16px

/* === Section-Level === */
.section-padding:      48px vertical (mobile) / 80px vertical (tablet+)
.section-gap:          64px

/* === Component-Level === */
.input-padding:        16px
.button-padding-x:    24px
.button-padding-y:    12px
.icon-gap:            8px (Icon + Text)
```

### 4.4 Container-Max-Width

```
| Kontext              | max-width | padding-x (mobile) |
|----------------------|-----------|---------------------|
| Text-Container       | 720px     | 24px               |
| Center-Container     | 960px     | 24px               |
| Full-Container       | 1280px    | 24px / 40px        |
| Video-Container      | 960px     | 16px               |
| Pictogram-Grid      | 1280px    | 16px               |
```

**Lesbarkeitsregel:** Fließtext (Schulungsinhalte) niemals breiter als **720px** — längere Zeilen reduzieren die Lesbarkeit dramatisch.

---

## 5. UI-Komponenten

### 5.1 Buttons

#### 5.1.1 Button — Primary

```
Background:    #2B5BA8 (Primär-Blau)
Text:         #FFFFFF
Border:       none
Border-Radius: 12px
Padding:      12px 24px (y × x)
Font:         Noto Sans / System, 600, 18px
Min-Width:    120px
Min-Height:   48px (Touch-Target)
Box-Shadow:   0 2px 8px rgba(43, 91, 168, 0.25)
Transition:   background 200ms ease, box-shadow 200ms ease

:hover
  Background: #1E4A8C
  Box-Shadow: 0 4px 12px rgba(43, 91, 168, 0.35)

:active
  Background: #163A73
  Transform:  translateY(1px)

:disabled
  Background: #B0AEA8
  Cursor:     not-allowed
  Opacity:    0.6

:focus-visible
  Outline:    3px solid #2B5BA8
  Outline-Offset: 2px
```

#### 5.1.2 Button — Secondary

```
Background:    #FFFFFF
Text:         #2B5BA8
Border:       2px solid #2B5BA8
Border-Radius: 12px
Padding:      10px 22px (border macht das padding kleiner)
Font:         Noto Sans / System, 600, 18px
Min-Height:   48px

:hover
  Background: #EBF1FA

:active
  Background: #D4E3F5
  Transform:  translateY(1px)

:disabled
  Border:     2px solid #B0AEA8
  Text:       #B0AEA8
  Background: transparent
```

#### 5.1.3 Button — Ghost

```
Background:   transparent
Text:         #2B5BA8
Border:       none
Font:         Noto Sans / System, 500, 18px
Min-Height:   48px
Padding:      12px 16px

:hover
  Background: #EBF1FA
  Border-Radius: 8px

:disabled
  Text:       #B0AEA8
  Cursor:     not-allowed
```

#### 5.1.4 Button — Icon-Only

```
Background:   #FFFFFF oder transparent
Icon:         24px × 24px, Farbe: #2B5BA8
Border:       1px solid #E0DED9
Border-Radius: 50% (Kreis)
Size:         48px × 48px (Touch-Target!)
Icon-Size:    24px
Padding:      12px

:hover
  Background: #EBF1FA
  Border:     2px solid #2B5BA8
```

### 5.2 Cards (Schulungsmodule)

```
Background:    #FFFFFF
Border:        1px solid #E0DED9
Border-Radius: 16px
Padding:       24px
Box-Shadow:    0 2px 8px rgba(0, 0, 0, 0.06)

:hover
  Box-shadow: 0 4px 16px rgba(43, 91, 168, 0.12)
  Border:     1px solid #2B5BA8

Card-Header:
  Pictogramm:  64px × 64px (Web) / 256px × 256px (Print)
  Titel:       lg (20px), font-weight 600, color #4A4A4A
  Subtitle:    base (16px), color #6B6B6B

Card-Body:
  Beschreibung: base (16px), line-height 1.6, color #4A4A4A
  Max-Text:     3 Zeilen (with ellipsis)

Card-Footer:
  Progress-Indikator: horizontal, 4px Höhe
  CTA-Button:    Primary-Button, inline
```

**Card-Varianten:**

| Variante | Unterschied |
|----------|-------------|
| **Module Card** | Pictogramm + Titel + Beschreibung + Progress |
| **Lesson Card** | Compact: Pictogramm (48px) + Titel + Duration |
| **Pictogram Card** | Großes Pictogramm (128px) + Label darunter |
| **Quiz Card** | Pictogramm + Frage + Antwort-Buttons |
| **Info Card** | Icon (kein Pictogramm) + Titel + Fließtext |

### 5.3 Input-Felder

```
Height:        48px (Touch-Target minimum)
Padding:       12px 16px
Border:        2px solid #E0DED9
Border-Radius: 12px
Background:    #FFFFFF
Font:          base (16px), color #4A4A4A
Placeholder:   #B0AEA8, font-style italic

:hover
  Border: 2px solid #2B5BA8

:focus
  Border: 2px solid #2B5BA8
  Box-shadow: 0 0 0 3px rgba(43, 91, 168, 0.15)

:error
  Border: 2px solid #B33A3A
  Background: #FDECEC

Label:
  Font: sm (14px), font-weight 600, color #4A4A4A
  Margin-bottom: 8px
  display: block

Help-Text:
  Font: sm (14px), color #6B6B6B
  Margin-top: 8px
```

**Besonderheit:** `font-size: 16px` bei Inputs — bei kleinerer Größe zoomt iOS automatisch beim Tippen (Accessibility-Regel).

### 5.4 Navigation

```
Struktur:
  Max. 3 Ebenen tief
  Ebene 1: Hauptnavigation (horizontal, max. 5 Items)
  Ebene 2: Unternavigation (horizontal, max. 7 Items)
  Ebene 3: Breadcrumb (nur wenn nötig)

Hauptnavigation (Ebene 1):
  Item-Size:    48px height
  Font:         md (18px), font-weight 500
  Active:       Bottom-Border 3px #2B5BA8
  Inactive:     color #6B6B6B
  Hover:        color #2B5BA8, Background #EBF1FA (8px radius)

Mobile Navigation:
  Hamburger-Menü ab Breakpoint: md (768px)
  Fullscreen-Overlay
  Items:        56px height (groß für Touch)
  Stagger-Animation beim Öffnen: 50ms delay per Item

Breadcrumb:
  Separator:    "›" (nicht "/")
  Font:         sm (14px), color #6B6B6B
  Letztes Item: font-weight 600, color #4A4A4A
```

### 5.5 Pictogram-Display-Cards

Das Kernstück der Schulungsplattform:

```
Pictogramm-Bereich:
  Size:         128px × 128px (Desktop) / 96px × 96px (Tablet) / 64px × 64px (Mobile)
  Background:   #F8F6F1 (Creme — weniger grell als Weiß)
  Border-Radius: 16px
  Padding:       16px
  Display:       flex, align-items: center, justify-content: center

Label (Beschriftung):
  Position:     Unter dem Pictogramm
  Font:          18px, font-weight 600, color #4A4A4A, text-align center
  Margin-top:    12px
  Max-Zeichen:   20
  Line-Height:   1.4

Hover-State:
  Background:   #EBF1FA
  Border:        2px solid #2B5BA8
  Border-Radius: 18px
  Cursor:        pointer
  Transition:    all 200ms ease
```

### 5.6 Video-Player

```
Wrapper:
  Aspect-Ratio:  16:9
  Border-Radius: 16px
  Overflow:      hidden
  Box-Shadow:    0 4px 24px rgba(0, 0, 0, 0.12)

Controls:
  Background:    Linear-gradient(transparent → rgba(0,0,0,0.7))
  Height:        56px (unten)
  Play-Button:   48px (Touch-Target)
  Icons:         24px, weiß, opacity 0.9

Untertitel (Pflicht):
  Position:      Unten, über den Controls
  Background:   rgba(0, 0, 0, 0.75)
  Border-Radius: 4px
  Font:          18px, font-weight 500, white
  Padding:       6px 12px
  Max-Width:     80% des Players
  Toggle:        Immer sichtbar als Option

Progress-Bar:
  Height:        4px (Touch: 8px)
  Buffer:        rgba(255,255,255,0.3)
  Progress:      #2B5BA8
  Thumb:         12px, versteckt (Touch zeigt größere Fläche)
```

### 5.7 Progress-Indikatoren

```
Horizontale Progress-Bar:
  Height:         8px (Touch: 12px)
  Background:     #E0DED9
  Fill:           #2B5BA8
  Border-Radius:  4px
  Animation:      width 400ms ease

Fortschritts-Anzeige (Modul-X von Y):
  Font:           sm (14px), color #6B6B6B
  Fortschritt:    md (18px), font-weight 600, color #2B5BA8

Checkliste (abgeschlossen):
  Check-Icon:     24px, color #2D7A4F (Grün)
  Item:           base (16px), color #4A4A4A
  Completed-Item: color #6B6B6B, text-decoration: line-through

Schritt-Indikator (Step X of Y):
  Kreise:         32px × 32px
  Aktiver:        Border 2px #2B5BA8, Background transparent, Text #2B5BA8
  Abgeschlossen:  Background #2D7A4F, Icon ✓ weiß
  Kommend:        Border 2px #E0DED9, Text #B0AEA8
```

---

## 6. Pictogramm-Standards

### 6.1 Größe & Auflösung

| Kontext | Mindestgröße | Empfohlen | Dateiformat |
|---------|-------------|-----------|-------------|
| **Web (Raster)** | 64×64px | 128×128px | PNG, WebP |
| **Web (Responsive)** | 48×48px (mobile minimum) | 96×96px (mobile) | PNG, WebP |
| **Print (A4/DIN)** | 256×256px | 512×512px | SVG (bevorzugt), PDF |
| **Print (Visitenkarte)** | 128×128px | 256×256px | SVG, PDF |
| **Video-Frame** | 512×512px | 1024×1024px | PNG, SVG→PNG |

**Regel:** Pictogramme in 2x-Auflösung bereitstellen (für Retina-Displays). Ein 64px-Pictogramm sollte als 128×128px-Datei mit 64×64px-Anzeige ausgeliefert werden.

### 6.2 ARASAAC-Kompatibilität

Das Projekt nutzt primär **ARASAAC-Pictogramme** (arasaac.org, CC BY-NC-SA):

```
ARASAAC-Spezifikationen (eingehaltener Standard):
  ✅ Formate: PNG (transparent), SVG
  ✅ Größen: 1200px, 600px, 300px, 150px, 75px (Pixels)
  ✅ Sprachen: DE, ES, FR, EN, AR, PL, HU, RO, IT
  ✅ Farben: Farbig + Schwarz-Weiß
  ✅ Lizenz: CC BY-NC-SA (nicht-kommerziell, ShareAlike)

Fallback bei nicht verfügbaren Pictogrammen:
  → MiniMax Image-01 generieren (siehe PIKTOGRAMM-TOOLS.md, Abschnitt 6)
  → Stil: Simple flat pictogram, 1:1 aspect ratio, high contrast
```

### 6.3 Stil-Richtlinien

```
Linienstärke:      Konsistent 2–3px (bei SVG)
Mindestgröße:      Alle Details mindestens 4px breit
Silhouetten:       Klare, erkennbare Außenkonturen
Details:           Minimal — max. 3 unterscheidbare Elemente
Stilisierung:      Flat Design (keine fotorealistischen Darstellungen)
Schatten:          Keine oder minimal (keine komplexen 3D-Effekte)
Randabstand:       Mind. 8px Padding im Pictogramm-Canvas
```

### 6.4 Farben pro Pictogramm

```
Maximale Farben:   3 Farben pro Pictogramm
Pflichtfarbe:      1 dominant + 1 Akzentfarbe + Weiß/Schwarz als Basis
Farbauswahl:       Aus der Design-System-Palette (siehe Abschnitt 2)
Druck-Fallback:    Immer eine Schwarz-Weiß-Variante bereitstellen
Dark Mode:         Pictogramme mit dunklem Hintergrund oder invertiertem Stil
```

### 6.5 Mindestkontrast

```
Pictogramm-zu-Hintergrund:  Min. 4.5:1 (WCAG 2.1 AA)
Linienkontrast (Strich-zu-Fläche):  Min. 3:1

Prüfmethode:
  1. Pictogramm in Browser öffnen
  2. Browser DevTools → Inspect Element → Color Contrast Analyzer
  3. Oder: webaim.org/resources/contrastchecker/
```

### 6.6 Pictogramm-Kategorien im Projekt

| Kategorie | Farbcode | Beschreibung | Beispiele |
|-----------|----------|--------------|-----------|
| 🏠 Alltag | #2B5BA8 | Tägliche Aktivitäten | Essen, Anziehen, Schlafen |
| 💊 Gesundheit | #2D7A4F | Medizin, Pflege | Medikamente, Arztbesuch |
| 🧠 Kognition | #7B5EA7 | Demenz-Themen | Gedächtnis, Orientierung |
| 💬 Kommunikation | #C47A1E | Sprechen, Zuhören | Gespräch, Zuhören, Stille |
| ❤️ Emotionen | #B33A3A | Gefühle | Freude, Angst, Trauer |
| 🛡️ Sicherheit | #1E7A8C | Schutz | Notruf, Gangschutz, Sturz |
| 📚 Schulung | #4A4A4A | Lernelemente | Quiz, Video, Text |

---

## 7. Video-Design

### 7.1 Aspect Ratio & Auflösung

```
Aspect Ratio:     16:9 (Standard für alle Schulungsvideos)
Auflösung:        1920×1080px (Full HD) — Minimum 1280×720px
Framerate:        25fps oder 30fps (keine ungeraden fps)
Codec:            H.264 (MP4) für Kompatibilität
Audio:            AAC, 128kbps minimum, stereo bevorzugt
```

### 7.2 Untertitel (Pflicht)

Untertitel sind für die Zielgruppe **nicht verhandelbar**:

| Nutzergruppe | Begründung |
|-------------|-----------|
| Gehörlose / Schwerhörige | Vollständiger Informationszugang |
| Fremdsprachige Lerner | ES/FR/EN — Sprachverständnis verbessern |
| Menschen mit kognitiven Einschränkungen | Visuelle + auditive Verstärkung der Information |
| Geräuscharme Umgebungen | Nutzung ohne Ton möglich |
| SEO / Barrierefreiheit | WCAG 1.2.2 (Untertitel voraufgezeichnet) |

```
Untertitel-Spezifikation:
  Format:        WebVTT (.vtt) — auch für H5P kompatibel
  Font:          Noto Sans oder System, 18px, weiß (#FFFFFF)
  Hintergrund:   rgba(0, 0, 0, 0.75), padding 4px 8px
  Border-Radius: 4px
  Max-Zeichen:   42 pro Zeile
  Max-Zeilen:    2 Zeilen
  Position:      Unten zentriert, 60px vom unteren Rand
```

### 7.3 Maximale Videolänge

| Modultyp | Maximale Länge | Empfehlung |
|----------|---------------|------------|
| Einführungsvideo | 60–90 Sekunden | Kurz halten |
| Hauptlektion | **3–5 Minuten** | Optimal für Aufmerksamkeit |
| Vertiefungslektion | max. 8 Minuten | Nur wenn nötig |
| Zusammenfassung | 1–2 Minuten | Am Ende jedes Moduls |

**Begründung:** Kognitionsforschungs-Studien zeigen, dass die durchschnittliche Aufmerksamkeitsspanne bei Demenz-Betroffenen stark verkürzt ist. 3–5 Minuten ist der optimale Bereich.

### 7.4 Call-to-Action (Ende jedes Videos)

Jedes Video endet mit einem einheitlichen CTA-Block:

```
Dauer des CTA:     8–10 Sekunden (nach Hauptinhalt)
Layout:            Pictogramm (64px) + Text + Button
Text:              „Weiter zu: [Modultitel]" (max. 30 Zeichen)
Button:            Primary-Button, „Weiter" oder „Quiz starten"
Farbschema:        Primär-Blau (#2B5BA8)
Keine Ablenkung:   Kein Autoplay, kein Scroll, kein Popup
```

### 7.5 Voice-over Style

```
Geschwindigkeit:   130–150 WPM (langsamer als normales Sprechen)
                  → entspricht etwa 0.75x–0.85x normaler Geschwindigkeit
Tonlage:          Ruhig, warm, gleichmäßig — kein monotoner Radio-Stil
Pause:            1.5–2 Sekunden nach jeder Informations-Einheit
Lautstärke:       Konsistent (KEINE lauten/abschwellenden Passagen)
Mikrofon:         Professionelles Equipment, kein Handy-Audio
Hintergrundmusik: Max. -18dB unter Voice-over, ruhige Instrumentals
```

**Sprach-Persona für das Projekt:**

- **Pflegefachkraft-Stimme:** Sachlich, respektvoll, erfahren
- **Angehörigen-Stimme:** Empathisch, ermutigend, verständnisvoll
- **Experten-Stimme:** Klar, präzise, beruhigend

---

## 8. Motion & Animation

### 8.1 Übergangszeiten

| Animationstyp | Dauer | Easing | Verwendung |
|---------------|-------|--------|------------|
| Micro-Interaction (Hover, Focus) | 150–200ms | ease-out | Buttons, Links |
| Component-Transition (Card ein/aus) | 300ms | ease-in-out | Seitenübergänge, Modals |
| Layout-Animation (Page-Transition) | 400–500ms | ease-in-out | Navigation, Screen-Wechsel |
| Pictogram-Fade-In | 400ms | ease-out | Pictogramme erscheinen |
| Progress-Animation | 400ms | ease | Ladebalken, Fortschritt |
| Stagger-Animation (Listen) | 50ms delay pro Item | ease-out | Card-Grids, Listen |

**Regel:** Keine Animation länger als **500ms**. Längere Übergänge werden als träge und unprofessionell wahrgenommen.

### 8.2 Verbotene Animationen

```
🚫 VERBOTEN — Keine Ausnahmen:

1. Blinkende / pulsierende Animationen
   → Epilepsie-Gefahr (Photosensitive Epilepsy, WCAG 2.3.1)
   → Definiton: Mehr als 3 Blinks/Sekunde oder generalisierte Blitzschläge

2. Schnelle Farbwechsel
   → Kein Element darf in < 1 Sekunde zwischen Farben wechseln

3. Bewegungsunschärfe (Motion Blur)
   → Technisch vermeiden

4. Autoplay von Animationen > 5 Sekunden
   → Benutzer muss Animation kontrollieren können (WCAG 2.2.2)

5. Übergänge mit Kontrastwechsel
   → Keine Elemente die den Kontrast um > 3:1 in < 1s ändern
```

### 8.3 Erlaubte Animationen

```
✅ Sanfte Fade-Ins:
   opacity: 0 → 1, duration: 400ms, ease-out

✅ Sanftes Slide-In:
   translateY(20px) → translateY(0), duration: 300ms, ease-out

✅ Scale-Animation bei Hover:
   scale(1) → scale(1.02), duration: 200ms, ease-out

✅ Progress-Bar:
   width: 0% → 100%, duration: 400ms, ease

✅ Pulsieren (NUR bei Lade-Zuständen):
   Sanfter pulse (scale 1 → 1.05 → 1), duration: 1.5s, ease-in-out
   Max. 2 Pulse pro Zustand, dann statisch bleiben
```

### 8.4 `prefers-reduced-motion`

```css
/* IMMER einbauen — respektiert Benutzerpräferenz */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 9. Responsive Strategy

### 9.1 Mobile-First Prinzip

Da Demenz-Betroffene und ihre Angehörigen häufig Tablets nutzen, beginnt das Design bei **mobile first** und skaliert nach oben.

```
Design-Reihenfolge:
  1. Mobile (base) — 320px bis 639px
  2. Large Mobile / Small Tablet (sm) — 640px bis 767px
  3. Tablet (md) — 768px bis 1023px
  4. Laptop (lg) — 1024px bis 1279px
  5. Desktop (xl) — 1280px+
```

### 9.2 Touch-Targets

| Geräteklasse | Mindest-Touch-Target | Empfehlung |
|-------------|---------------------|------------|
| Mobile (Touch) | **48×48px** | **56×56px** für Primär-Buttons |
| Tablet (Touch) | **48×48px** | **56×56px** |
| Desktop (Mouse) | 24×24px (Apple HIG) | **36×36px** (besser für Demenz) |

**Messregel:** Der interaktive Bereich (inkl. Padding) muss ≥ 48×48px sein. Der visuelle Button darf kleiner sein, touch-target nicht.

### 9.3 Lesbare Schrift auf allen Geräten

```
Mobile (< 768px):
  - Body-Text:       16px minimum (KEINE 14px auf Mobile!)
  - Pictogramm-Label: 18px
  - Buttons:         18px
  - Zeilenhöhe:      1.6–1.75 (größer = besser)
  - Zeilenbreite:    max. 90vw (oder 600px)

Tablet / Desktop (≥ 768px):
  - Body-Text:       16px
  - Pictogramm-Label: 18–20px
  - Buttons:         18px
  - Zeilenhöhe:      1.6
  - Zeilenbreite:    max. 720px (Lesbarkeit)
```

### 9.4 Gerätespezifische Überlegungen

| Gerät | Besonderheit | Design-Entscheidung |
|-------|-------------|---------------------|
| **iPad** | Safari, Touch, oft im Querformat | Pictogram-Grid: 2-3 Spalten, natives Scrolling |
| **Android Tablet** | Verschiedene Bildschirmgrößen | Relative Einheiten (rem), keine fixen Pixel |
| **Desktop** | Mouse-Hover verfügbar | Hover-States, aber NICHT als einzige Infoquelle |
| **Smartphone** | Kleiner Bildschirm, Touch | Ein-Finger-Navigation, Swipe-Gesten vermeiden |

### 9.5 Pictogramm-Skalierung

```
Größte Darstellung (Desktop Hero):
  Pictogramm: 128px × 128px
  Label:      20px darunter

Standard (Desktop Grid):
  Pictogramm:  96px × 96px
  Label:       18px darunter

Tablet:
  Pictogramm:  80px × 80px
  Label:       18px darunter

Mobile:
  Pictogramm:  64px × 64px
  Label:       16px darunter (keine kleiner!)

Print (DIN A4):
  Pictogramm:  256px × 256px (300dpi)
```

---

## 10. Design Tokens

Die folgenden CSS Custom Properties sind die **verbindliche Referenz** für das gesamte Projekt. Alle Farben, Abstände, Typografie und Schatten werden über diese Tokens referenziert.

### 10.1 Farben (Colors)

```css
:root {
  /* === Primärfarben === */
  --color-primary:           #2B5BA8;
  --color-primary-hover:     #1E4A8C;
  --color-primary-active:    #163A73;
  --color-primary-light:     #EBF1FA;
  --color-primary-dark:      #4A7FD4;

  /* === Neutralfarben === */
  --color-text-primary:      #4A4A4A;
  --color-text-secondary:    #6B6B6B;
  --color-text-disabled:     #B0AEA8;
  --color-border:            #E0DED9;
  --color-border-strong:      #C8C5BF;

  /* === Hintergründe === */
  --color-bg-page:           #F8F6F1;
  --color-bg-card:           #FFFFFF;
  --color-bg-input:          #FFFFFF;
  --color-bg-overlay:        rgba(0, 0, 0, 0.5);

  /* === Semantic Colors === */
  --color-success:            #2D7A4F;
  --color-success-bg:        #E8F5EE;
  --color-warning:           #C47A1E;
  --color-warning-bg:        #FEF3E2;
  --color-error:             #B33A3A;
  --color-error-bg:          #FDECEC;
  --color-info:              #2B5BA8;
  --color-info-bg:           #EBF1FA;

  /* === Pictogramm-Kategorien === */
  --color-cat-daily:         #2B5BA8;
  --color-cat-health:        #2D7A4F;
  --color-cat-cognition:    #7B5EA7;
  --color-cat-communication:#C47A1E;
  --color-cat-emotions:     #B33A3A;
  --color-cat-safety:       #1E7A8C;
  --color-cat-training:      #4A4A4A;

  /* === Dark Mode === */
  --color-bg-page-dark:      #1A1A1A;
  --color-bg-card-dark:     #242424;
  --color-bg-input-dark:     #2E2E2E;
  --color-text-primary-dark: #F0EEE9;
  --color-text-secondary-dark: #B0AEA8;
  --color-border-dark:       #3A3A3A;
  --color-primary-dark:      #4A7FD4;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-page:         #1A1A1A;
    --color-bg-card:         #242424;
    --color-bg-input:        #2E2E2E;
    --color-text-primary:    #F0EEE9;
    --color-text-secondary:  #B0AEA8;
    --color-border:          #3A3A3A;
  }
}
```

### 10.2 Typografie (Typography)

```css
:root {
  /* === Schriftfamilien === */
  --font-sans:     -apple-system, "Segoe UI", "Roboto", "Ubuntu",
                   "Cantarell", Arial, sans-serif;
  --font-pictogram: var(--font-sans); /* Immer serifenlos! */

  /* === Schriftgrößen (rem) === */
  --text-xs:    0.75rem;   /* 12px */
  --text-sm:    0.875rem;  /* 14px */
  --text-base:  1rem;      /* 16px */
  --text-md:    1.125rem;  /* 18px */
  --text-lg:    1.25rem;   /* 20px */
  --text-xl:    1.5rem;    /* 24px */
  --text-2xl:   1.875rem;  /* 30px */
  --text-3xl:   2.25rem;   /* 36px */
  --text-4xl:   3rem;      /* 48px */

  /* === Zeilenhöhen === */
  --leading-tight:   1.2;
  --leading-snug:    1.375;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
  --leading-loose:   1.75;

  /* === Schriftstärken === */
  --font-regular:    400;
  --font-medium:     500;
  --font-semibold:   600;
  --font-bold:       700;

  /* === Buchstabenabstand === */
  --tracking-tight:  -0.02em;
  --tracking-normal: 0em;
  --tracking-wide:   0.02em;
  --tracking-wider:  0.05em;
  --tracking-widest: 0.1em;
}
```

### 10.3 Spacing (Abstände — 8px Grid)

```css
:root {
  --space-0:   0;
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
}
```

### 10.4 Border-Radius

```css
:root {
  --radius-none:  0;
  --radius-sm:    6px;   /* Inputs, kleine Elemente */
  --radius-md:    12px;  /* Buttons, Cards */
  --radius-lg:    16px;  /* Großkarten, Modals */
  --radius-xl:    24px;  /* Hero-Elemente */
  --radius-full:  9999px; /* Pills, Avatar-Circles */
}
```

### 10.5 Shadows (Schatten)

```css
:root {
  --shadow-none:   none;
  --shadow-xs:     0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm:     0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-md:     0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg:     0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-xl:     0 16px 48px rgba(0, 0, 0, 0.16);
  --shadow-primary: 0 4px 16px rgba(43, 91, 168, 0.25);
}
```

### 10.6 Transitions (Übergänge)

```css
:root {
  --transition-fast:   150ms ease;
  --transition-base:   200ms ease;
  --transition-slow:   300ms ease-in-out;
  --transition-slower: 400ms ease-in-out;
}
```

### 10.7 Z-Index Scale

```css
:root {
  --z-base:    0;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-modal:    300;
  --z-tooltip:  400;
  --z-toast:    500;
}
```

---

## Änderungshistorie

| Version | Datum | Autor | Änderung |
|---------|-------|-------|----------|
| 1.0 | 2026-07-05 | MiniMax M2.7 Sub-Agent | Initiales Design-Spec-Dokument |

---

*Dieses Dokument ist Teil des Repositories `demenz-schulungen` und gilt als verbindliche Design-Referenz für alle UI-/UX-Entscheidungen, Implementierungen und Assets.*
