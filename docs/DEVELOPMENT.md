# Entwicklung — Lokales Setup

> **Version:** 1.0  
> **Datum:** 2026-07-05

---

## 1. Voraussetzungen

- Node.js ≥ 20 LTS
- Docker & Docker Compose
- Git
- Cursor IDE

---

## 2. Repository klonen

```bash
git clone https://github.com/freshprince84/demenz-schulungen.git
cd demenz-schulungen
cp .env.example .env.local
```

---

## 3. Umgebungsvariablen

Siehe `.env.example`. Mindestens:

- `DATABASE_URL`
- `MINIMAX_API_KEY` (nur lokal/server, nie committen)

---

## 4. Datenbank (lokal)

```bash
docker compose -f docker-compose.dev.yml up -d postgres
npx drizzle-kit migrate
npm run db:seed   # sobald vorhanden
```

---

## 5. Entwicklungsserver

```bash
npm install
npm run dev
```

Öffnen: http://localhost:3000

---

## 6. Drei Systeme (nicht verwechseln)

| System | Wo | Aufgabe |
|--------|-----|---------|
| **Cursor** | Dein Rechner | Code schreiben |
| **Winston** | Eigener Hetzner (Clawdbot) | Content-Assistenz, nur MiniMax |
| **Prod-App** | Hetzner `demenz-prod` (`91.99.99.177`) | Plattform (noch aufzusetzen) |

Winston liefert Content-Entwürfe — du committest ins Repo nach Review.

---

## 7. Nützliche Befehle (nach Scaffolding)

```bash
npm run lint
npm run typecheck
npm run build
npm run validate:content   # quiz.json + metadata prüfen
```

---

## 8. Content lokal testen

Module liegen unter `modules/{slug}/de/`. Nach Änderung: Dev-Server neu laden oder Build.

---

## 9. Referenzen

- [DEPLOYMENT.md](DEPLOYMENT.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [MODULE-TEMPLATE.md](MODULE-TEMPLATE.md)
