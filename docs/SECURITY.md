# Security

> **Version:** 1.0  
> **Datum:** 2026-07-05

---

## 1. Threat Model (Kurz)

| Bedrohung | Mitigation |
|-----------|------------|
| API-Key-Leak (MiniMax) | Nur serverseitig, nie im Client |
| SQL Injection | Drizzle ORM, parametrisierte Queries |
| XSS | React escaping, CSP, Zod-Validierung |
| CSRF | SameSite Cookies (Phase 2 Auth) |
| Brute-Force Login | Rate Limiting (Phase 2) |
| PII an MiniMax | Prompt-Validierung, keine PII |

---

## 2. Content Security Policy

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://api.minimax.io;
font-src 'self';
connect-src 'self' https://api.minimax.io;
object-src 'none';
base-uri 'self';
```

---

## 3. Secrets Management

| Secret | Speicherort |
|--------|-------------|
| MINIMAX_API_KEY | `.env.local` / Server `.env` / GitHub Secrets |
| DATABASE_URL | Server `.env` |
| NEXTAUTH_SECRET | Server `.env` |

**Niemals** in Git, Frontend oder Logs.

---

## 4. Auth (Phase 2)

- bcrypt cost ≥ 12
- JWT kurze Lebensdauer oder Session
- HttpOnly, Secure, SameSite=Strict Cookies

---

## 5. Transport

- HTTPS everywhere (Caddy + Let's Encrypt)
- HSTS aktiviert
- TLS 1.3 minimum

---

## 6. Reporting

Sicherheitslücken bitte an: *(Kontakt in SECURITY.md Root eintragen)*

---

## 7. Referenzen

- [compliance/TOMS.md](compliance/TOMS.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
