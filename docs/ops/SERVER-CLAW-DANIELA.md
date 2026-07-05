# Server: claw-daniela (Winston / Charlie)

> **IP:** `91.99.99.177`  
> **Rolle:** Winston/Clawdbot Content-Assistenz (≠ Prod-App, ≠ Intranet)  
> **Bot:** Charlie (Clawdbot)  
> **Stand Inventar:** Ausstehend — SSH-Key muss auf Server hinterlegt werden

---

## 1. Zweck im Projekt

| Aufgabe | Server |
|---------|--------|
| Clawdbot (Charlie), MiniMax-Assistenz, Content-Entwürfe | **claw-daniela** |
| Demenz-Schulungen Prod-App (Next.js, Postgres) | **Separater neuer Hetzner-VPS** |

Charlie auf diesem Server ist **gewollt** und entspricht ADR-005 / ARCHITECTURE.md.

---

## 2. SSH-Zugang einrichten

### Schritt A — Public Key auf Server legen (einmalig)

Auf dem Server (z. B. per Hetzner-Konsole oder bestehendem Zugang):

```bash
mkdir -p /root/.ssh
chmod 700 /root/.ssh
echo 'PASTE_PUBLIC_KEY_HERE' >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
```

Public Key liegt lokal unter: `~/.ssh/demenz_claw_ed25519.pub` (vom Entwickler-Rechner generiert).

### Schritt B — Lokale SSH-Config (optional)

```
Host claw-daniela
    HostName 91.99.99.177
    User root
    IdentityFile ~/.ssh/demenz_claw_ed25519
```

### Schritt C — Verbindung testen

```bash
ssh claw-daniela "hostname && df -h / && free -h"
```

---

## 3. Inventar-Checkliste (nach erstem Zugang)

```bash
# Speicher & RAM
df -h /
free -h

# Laufende Dienste
systemctl list-units --type=service --state=running
docker ps -a 2>/dev/null || echo "kein Docker"

# Verzeichnisse
ls -la /root/
du -sh /root/* 2>/dev/null | sort -hr | head -20

# Clawdbot
cat /root/.clawdbot/clawdbot.json 2>/dev/null | head -5
ps aux | grep -i claw

# Ports
ss -tlnp
```

**Erwartung „mehr oder weniger leer“:** Neben Charlie/Clawdbot, Node.js und ggf. `/root/repos/` sollten keine schweren Prod-Dienste laufen.

---

## 4. Repo auf Server

```bash
cd /root
git clone git@github.com:freshprince84/demenz-schulungen.git
```

MiniMax-API-Key: **gleicher Key wie Winston/Intranet-Prod** — nur in Server-Umgebung, nie ins Git-Repo.

---

## 5. Inventar-Ergebnis

| Prüfpunkt | Ergebnis | Datum |
|-----------|----------|-------|
| SSH von Entwickler-Rechner | Ausstehend | — |
| Server „leer“ außer Charlie | Ausstehend | — |
| Node.js Version | Ausstehend | — |
| Freier Speicher | Ausstehend | — |

*Diese Tabelle wird nach erfolgreichem SSH-Check aktualisiert.*

---

## 6. Sicherheit

- Passwort-Login nach Key-Setup deaktivieren (`PasswordAuthentication no`)
- Bot-Token und API-Keys nur in Server-Config, nicht in Git/Chat
- Bei Kompromittierung: Token rotieren
