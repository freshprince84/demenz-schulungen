# Technische und organisatorische Maßnahmen (TOMs)

> **Version:** 1.1  
> **Datum:** 2026-07-05  
> **Art. 32 DSGVO**

---

## 1. Vertraulichkeit

| Maßnahme | Umsetzung |
|----------|-----------|
| Zugangskontrolle Server | SSH Key-only (ed25519), fail2ban, UFW (22, 80, 443) |
| Zugangskontrolle App | Login-Gate (Phase 2), Passwort-Hashing bcrypt (cost ≥ 12) |
| Session-Sicherheit | HttpOnly, Secure, SameSite=Lax Cookies |
| API-Keys | Nur serverseitig (`.env`, GitHub Secrets), nie im Client/Repo |
| Verschlüsselung Transport | TLS 1.3 (Caddy, Let's Encrypt) |
| Verschlüsselung Speicher | Hetzner Volume-Verschlüsselung (at-rest); Backups verschlüsselt (GPG oder Hetzner Storage verschlüsselt) — **vor Prod konfigurieren** |
| Datenbank-Exposition | PostgreSQL **nur** im Docker-internen Netz, Port 5432 nicht öffentlich |

---

## 2. Integrität

| Maßnahme | Umsetzung |
|----------|-----------|
| Input-Validierung | Zod für alle API-Inputs |
| CSP | Content-Security-Policy Header (siehe SECURITY.md) |
| Code-Review | PR-Pflicht vor Merge |
| CI | Lint, Typecheck, Build |
| SQL-Injection | Parametrisierte Queries (Drizzle ORM) |

---

## 3. Verfügbarkeit

| Maßnahme | Umsetzung |
|----------|-----------|
| Backups | Täglich DB + Media, 30 Tage Retention, Speicherort Hetzner EU |
| Restore-Probe | Monatlich manuell dokumentieren |
| Healthcheck | `GET /api/health` |
| Monitoring | Strukturierte Logs (Caddy + App), kein US-SaaS-Tracking |

---

## 4. Belastbarkeit

| Maßnahme | Umsetzung |
|----------|-----------|
| Rate Limiting | API + Login-Endpunkte |
| Graceful Degradation | Module ohne MiniMax nutzbar (statische Assets) |

---

## 5. Patch- und Update-Management

| Ebene | Kadenz |
|-------|--------|
| OS (Ubuntu) | `unattended-upgrades` für Security-Patches; monatlicher manueller Check |
| Docker-Images | Bei Security-Advisories zeitnah; quartalsweise Basis-Image-Update |
| npm-Dependencies | `npm audit` in CI; kritische CVEs innerhalb 7 Tage |

---

## 6. Datenpannen (Art. 33/34 DSGVO)

| Schritt | Maßnahme |
|---------|----------|
| Erkennung | Log-Monitoring, Nutzer-Meldungen, Security-Contact |
| Bewertung | Innerhalb 24h: Umfang, betroffene Daten, Risiko |
| Meldung Behörde | Innerhalb **72h** an zuständige Aufsichtsbehörde, wenn Risiko für Betroffene |
| Benachrichtigung Betroffener | Bei hohem Risiko ohne Verzug |
| Dokumentation | Vorfälle intern protokollieren (Datum, Art, Maßnahmen) |

Detailablauf: [../ops/INCIDENT-RESPONSE.md](../ops/INCIDENT-RESPONSE.md)

---

## 7. Verfahren zur regelmäßigen Überprüfung

- **Quartalsweise:** TOM-Review, Dependency-Audit
- **Bei Änderungen:** ADR + ggf. DPIA-Update
- **Jährlich:** Backup-Restore-Test, Secrets-Rotation prüfen

---

## 8. Organisatorisch

| Maßnahme | Umsetzung |
|----------|-----------|
| Zugriff Prod-Server | Nur Patrick (SSH-Key) |
| Zugriff Assistenz-Server | Patrick (claw-daniela) |
| Secrets-Rotation | Bei Verdacht oder jährlich (MiniMax-Key, Session-Secret) |
| Incident-Response | INCIDENT-RESPONSE.md |

---

## 9. Referenzen

- [DATENSCHUTZKONZEPT.md](DATENSCHUTZKONZEPT.md)
- [../SECURITY.md](../SECURITY.md)
- [../DEPLOYMENT.md](../DEPLOYMENT.md)
- [../ops/INCIDENT-RESPONSE.md](../ops/INCIDENT-RESPONSE.md)
