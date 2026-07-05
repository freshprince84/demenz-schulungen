# Contributing

Danke für dein Interesse am Projekt **Demenz-Schulungen**.

---

## Projektprinzipien

1. **Selbstbau** — Keine fremden LMS/SaaS-Abhängigkeiten
2. **Keine Abos/Lizenzen** — Open Source auf eigenem Server; MiniMax als einzige KI-API
3. **Qualität vor Geschwindigkeit**

Siehe [docs/DECISIONS.md](docs/DECISIONS.md).

---

## Branch-Strategie

- `main` — Produktionsstand (geschützt)
- `feature/{kurzbeschreibung}` — Neue Features
- `fix/{kurzbeschreibung}` — Bugfixes
- `docs/{kurzbeschreibung}` — Nur Dokumentation

---

## Commit-Konventionen

```
feat: Neues Feature
fix: Bugfix
docs: Dokumentation
refactor: Refactoring
test: Tests
chore: Wartung
```

Beispiel: `feat: Quiz-Komponente Multiple Choice`

---

## Pull Requests

1. Branch von `main` erstellen
2. Lokal testen (`npm run lint`, `npm run build` — sobald Code existiert)
3. PR mit Beschreibung öffnen (Template nutzen)
4. Mindestens 1 Review vor Merge
5. CI muss grün sein

---

## Content-Beiträge

- Module unter `modules/` gemäß [docs/MODULE-TEMPLATE.md](docs/MODULE-TEMPLATE.md)
- `quiz.json` muss Schema erfüllen
- Keine PII in MiniMax-Prompts
- Domain-Expert-Review vor `published`

---

## Server & Deploy

- **Server-Neustarts:** Nur Patrick — nicht durch Agenten
- Deploy nur über CI nach Merge auf `main`

---

## Referenzen

- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
- [docs/PROCESS-SPEC.md](docs/PROCESS-SPEC.md)
