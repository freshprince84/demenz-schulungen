# Datenschutzkonzept

> **Version:** 1.1  
> **Datum:** 2026-07-05  
> **Status:** Entwurf — vor Produktivbetrieb mit echten Nutzern freigeben  
> **Verantwortlicher:** Patrick (Projektinhaber)

---

## 1. Zweck und Geltungsbereich

Dieses Dokument beschreibt die datenschutzrechtlichen Grundsätze für die Plattform **Demenz-Schulungen**.

**Geltungsbereich:**

- Web-Plattform auf eigenem Hetzner-Server (EU-Region)
- Zugang nur mit Login (ab Phase 2, siehe ADR-012)
- Winston/Clawdbot (Assistenz-Server `claw-daniela`) — nur Content-Erstellung, keine Prod-Nutzerdaten

**Nicht Geltungsbereich:** Intranet-Server (separates Projekt).

---

## 2. Verantwortlicher

| Rolle | Name | Kontakt |
|-------|------|---------|
| Verantwortlicher (Art. 4 Nr. 7 DSGVO) | Patrick | `privacy@<PROD-DOMAIN>` — **vor Go-Live eintragen** |
| Technische Umsetzung | Patrick (Betrieb), Cursor (Entwicklung) | — |
| Datenschutzbeauftragter (Art. 37) | Nicht bestellt | Begründung: keine gesetzliche Pflicht bei erwarteter Datenmenge und Verarbeitungsart (interne Schulungsplattform, keine umfangreiche systematische Überwachung). **Bei Skalierung erneut prüfen.** |

**Zuständige Aufsichtsbehörde (Beispiel AT):** Österreichische Datenschutzbehörde — konkrete Zuständigkeit nach Sitz des Verantwortlichen festlegen.

---

## 3. Verarbeitungszwecke und Rechtsgrundlagen

| Zweck | Phase | Rechtsgrundlage (Art. 6 DSGVO) |
|-------|-------|-------------------------------|
| Bereitstellung von Schulungsinhalten | 1 | Berechtigtes Interesse (lit. f) / ggf. Vertrag mit Einrichtung (lit. b) |
| Fortschrittsspeicherung | 1 | Wie oben |
| Nutzerauthentifizierung | 2 | Vertrag (lit. b) oder Einwilligung bei freiwilliger Nutzung (lit. a) — **vor Go-Live festlegen** |
| Betrieb und Sicherheit (Logs) | 1 | Berechtigtes Interesse (lit. f) |
| Content-Erstellung via MiniMax | 1 (Autorenzeit) | Keine personenbezogenen Daten — siehe §5 |

---

## 4. Kategorien personenbezogener Daten

| Daten | Phase | Speicherort | Hinweis |
|-------|-------|-------------|---------|
| Name, E-Mail | 2 (Auth) | PostgreSQL (Hetzner EU) | Nur Lernende (Pflegekräfte, Angehörige) |
| Passwort-Hash (bcrypt) | 2 | PostgreSQL | Kein Klartext |
| Session-/Auth-Token (Cookie) | 2 | Browser + Server | HttpOnly, Secure, SameSite |
| Lernfortschritt, Quiz-Ergebnisse | 1 | PostgreSQL | Pseudonymisiert bis Auth (z. B. lokale Session-ID) |
| Technische Logs (IP, User-Agent, URL) | 1 | Server-Logs | Max. 30 Tage, siehe VVT #2 |
| MiniMax-API-Prompts | — | **Keine PII** | Nur fiktive Schulungsinhalte |

**Wichtig:** Personen mit Demenz sind **nicht** Betroffene im System — es werden nur Schulungsinhalte **über** Demenz-Themen vermittelt; Lernende sind Pflegefachkräfte und Angehörige.

---

## 5. Empfänger / Drittanbieter

| Empfänger | Zweck | Standort | Maßnahmen |
|-----------|-------|----------|-----------|
| Hetzner Online GmbH | Hosting Prod + Assistenz-Server | DE/EU | AV-Vertrag (Hetzner) |
| MiniMax (MiniMax AI / Shanghai) | KI: Text, TTS, Bild bei **Content-Erstellung** | China (Drittland) | **Keine personenbezogenen Daten** in Prompts; technische API-Aufrufe; Keys nur serverseitig; AVV/Drittlandtransfer **vor Phase 2 mit Live-Nutzern rechtlich klären** (siehe unten) |
| GitHub (Microsoft) | Code-Repository | USA | Nur Code/Doku, keine Prod-Nutzerdaten im Repo |

### MiniMax — Einordnung

- **Phase 1 (Entwicklung / Content-Pipeline):** MiniMax erhält ausschließlich fiktive Schulungstexte und Bild-Prompts — **keine** Namen, E-Mails oder sonstige personenbezogene Daten von Lernenden.
- **Prod-Laufzeit:** Lernende konsumieren **statische** Module (Video, Audio, Piktogramme). Kein Live-Proxy zu MiniMax für Endnutzer geplant (ADR-005).
- **Offen vor Go-Live:** Ob MiniMax als Auftragsverarbeiter (Art. 28) einzustufen ist, wenn ausschließlich nicht-personenbezogene Inhalte übermittelt werden — **rechtliche Gegenprüfung empfohlen**. Falls erforderlich: SCCs / AVV mit MiniMax.

**Keine Tracker:** Kein Google Analytics, kein Facebook Pixel, kein US-Tracking-SaaS.

---

## 6. Cookies und TTDSG

| Cookie/Storage | Typ | Zweck | Consent nötig? |
|----------------|-----|-------|----------------|
| Session-Cookie (Auth) | Technisch notwendig | Login | Nein (§ 25 Abs. 2 TTDSG) |
| Fortschritt (Phase 1 ohne Auth) | Technisch notwendig | Lernfortschritt | Nein |

Kein Marketing-, Tracking- oder Drittanbieter-Cookie geplant. **Kein Consent-Banner** für Phase 1–2 bei dieser Konfiguration.

---

## 7. Speicherdauer

| Daten | Dauer |
|-------|-------|
| Nutzerkonto | Bis Löschung durch Nutzer/Admin |
| Fortschritt | Bis Löschung des Kontos |
| Server-Logs | Max. 30 Tage |
| Backups | 30 Tage Rotation, dann Überschreibung |

---

## 8. Betroffenenrechte (Art. 15–22 DSGVO)

Nutzer können verlangen:

- Auskunft (Art. 15)
- Berichtigung (Art. 16)
- Löschung (Art. 17)
- Einschränkung (Art. 18)
- Datenübertragbarkeit (Art. 20)
- Widerspruch (Art. 21), soweit Rechtsgrundlage lit. f

**Kontakt:** `privacy@<PROD-DOMAIN>` — **vor Go-Live eintragen**

**Beschwerderecht:** Betroffene können sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO).

---

## 9. Datenpannen (Art. 33/34 DSGVO)

Prozess dokumentiert in [INCIDENT-RESPONSE.md](../ops/INCIDENT-RESPONSE.md):

- Meldung an Aufsichtsbehörde innerhalb **72 Stunden**, wenn Risiko für Betroffene
- Benachrichtigung Betroffener bei hohem Risiko

---

## 10. Technische Maßnahmen

Siehe [TOMS.md](TOMS.md).

---

## 11. Datenschutzerklärung und Impressum

- **Datenschutzerklärung:** Entwurf in [PRIVACY-POLICY.md](PRIVACY-POLICY.md) — wird in der App nach Login verlinkt.
- **Impressum:** Auch bei Login-only-Plattform kann eine Impressumspflicht bestehen (§ 5 DDG), wenn die Plattform **geschäftsmäßig** Dritten angeboten wird (z. B. externe Pflegeeinrichtungen). **Vor Go-Live rechtlich prüfen** — nicht pauschal ausschließen.

---

## 12. Folgenabschätzung

Siehe [DPIA.md](DPIA.md).

---

## 13. Referenzen

- [VERARBEITUNGSVERZEICHNIS.md](VERARBEITUNGSVERZEICHNIS.md)
- [PRIVACY-POLICY.md](PRIVACY-POLICY.md)
- [TOMS.md](TOMS.md)
- [../ops/INCIDENT-RESPONSE.md](../ops/INCIDENT-RESPONSE.md)
- [../SECURITY.md](../SECURITY.md)
