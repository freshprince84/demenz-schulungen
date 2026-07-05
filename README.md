# Demenz-Schulungen

Eigenständige, barrierefreie Schulungsplattform für Pflegefachkräfte und Angehörige im Demenzbereich — mit piktogrammgestützter Didaktik und eigener Content-Pipeline.

## Projektprinzipien

1. **Selbstbau** — Eigene Plattform, eigene Quiz-Komponenten, kein Moodle/H5P
2. **Keine Abos/Lizenzen** — Self-Hosted auf Hetzner; MiniMax als einzige KI-API
3. **Zeit keine Einschränkung** — Qualität vor Geschwindigkeit

## Systeme

| System | Rolle |
|--------|-------|
| **Cursor** (lokal) | Entwicklung |
| **Winston** (eigener Hetzner) | Content-Assistenz, nur MiniMax |
| **Prod-App** (neuer Hetzner) | Live-Plattform |

## Status

**Phase A** — Dokumentation & Architektur (in Arbeit)  
Siehe [docs/STATUS.md](docs/STATUS.md)

## Dokumentation

| Dokument | Beschreibung |
|----------|--------------|
| [docs/DECISIONS.md](docs/DECISIONS.md) | Architekturentscheidungen (ADRs) |
| [docs/PRODUCT-VISION.md](docs/PRODUCT-VISION.md) | Vision & Ziele |
| [docs/PRD.md](docs/PRD.md) | Anforderungen Phase 1 |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | C4-Architektur |
| [docs/DESIGN-SPEC.md](docs/DESIGN-SPEC.md) | UI/UX (verbindlich) |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phasen & Meilensteine |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Beitragsrichtlinien |

## Entwicklung (nach Phase B)

```bash
cp .env.example .env.local
docker compose -f docker-compose.dev.yml up -d postgres
npm install && npm run dev
```

Siehe [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Lizenz

Siehe [LICENSE](LICENSE).

---

*Letzte Aktualisierung: 2026-07-05*
