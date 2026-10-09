---
id: transport
title: Transport
description: "Führen Sie den WebdriverIO MCP-Server über den standardmäßigen stdio-Transport oder über Streamable HTTP aus und wählen Sie den passenden Modus für Ihren Client."
---

Der WebdriverIO MCP-Server unterstützt zwei Transportmodi: **stdio** (Standard) und **HTTP**.

## stdio (Standard)

stdio ist der Standard-MCP-Transport. Der KI-Client startet den Server als Kindprozess und kommuniziert über stdin/stdout.

```json
{
  "mcpServers": {
    "webdriverio": {
      "command": "npx",
      "args": ["-y", "@wdio/mcp"]
    }
  }
}
```

Verwenden Sie stdio für lokale Setups mit Claude Desktop, Claude Code, Cursor und ähnlichen Clients, die den Lebenszyklus des Servers selbst verwalten.

## HTTP (Streamable HTTP)

Im HTTP-Modus läuft der Server als eigenständiger Prozess, der auf einem Port lauscht. Clients verbinden sich über HTTP mit ihm, anstatt ihn als Subprozess zu starten. Verwenden Sie diesen Modus, wenn:

- Ihr Client kein subprozessbasiertes MCP unterstützt (z. B. die Web-UI von llama.cpp)
- Sie eine Serverinstanz für mehrere Clients gemeinsam nutzen möchten
- Sie im Codex Secure Mode arbeiten, in dem die Ausführung von Subprozessen eingeschränkt ist
- Sie den Server über mehrere Client-Sitzungen hinweg laufen lassen möchten

### Start im HTTP-Modus

```bash
npx @wdio/mcp --http --port 3000
```

Der Server stellt einen einzigen Endpunkt bereit: `http://localhost:<port>/mcp`

### Alle Optionen

```bash
npx @wdio/mcp --http \
  --port 3000 \
  --allowedHosts "localhost,127.0.0.1,::1" \
  --allowedOrigins "http://localhost:5173,https://myapp.example.com"
```

| Flag               | Standard                    | Beschreibung                                                                    |
| ------------------ | --------------------------- | ------------------------------------------------------------------------------- |
| `--http`           | —                           | Aktiviert den HTTP-Transportmodus                                               |
| `--port`           | `3000`                      | Port, auf dem gelauscht wird                                                    |
| `--allowedHosts`   | `localhost,127.0.0.1,::1`   | Kommagetrennte erlaubte Werte für den `Host`-Header (Schutz vor DNS-Rebinding)  |
| `--allowedOrigins` | _(keine — Browser blockiert)_ | Kommagetrennte erlaubte `Origin`-Werte für CORS. Verwenden Sie `*`, um alle Origins zu erlauben. |

### Sicherheit

**`--allowedHosts`** — Schützt vor DNS-Rebinding-Angriffen. Es werden nur Anfragen akzeptiert, deren `Host`-Header mit einem Eintrag dieser Liste übereinstimmt. Der Standardwert (`localhost,127.0.0.1,::1`) ist für die lokale Nutzung sicher. Wenn Sie den Server auf einer öffentlichen Schnittstelle bereitstellen, fügen Sie hier Ihren Hostnamen hinzu.

**`--allowedOrigins`** — Legt fest, welche Browser-Origins Cross-Origin-Anfragen (CORS) stellen dürfen. Standardmäßig sind keine Browser-Origins erlaubt. Dies blockiert den Zugriff von beliebigen Websites, während Nicht-Browser-Clients (CLI-Tools, API-Clients) weiterhin zugelassen werden. Setzen Sie den Wert auf `*`, um alle Origins zu erlauben, oder listen Sie bestimmte Origins auf.

Anfragen von Nicht-Browser-Clients (ohne `Origin`-Header) unterliegen nicht der CORS-Prüfung; hier gilt nur `--allowedHosts`.

## Anwendungsfälle

### llama.cpp Web-UI

Die Web-UI von llama.cpp läuft im Browser und sendet bei jeder Anfrage einen `Origin`-Header. Starten Sie den Server mit einem `--allowedOrigins`-Wert, der dem Origin der UI entspricht:

```bash
# llama.cpp web UI runs at http://localhost:8080
npx @wdio/mcp --http --port 3000 --allowedOrigins "http://localhost:8080"

# Or allow all local origins
npx @wdio/mcp --http --port 3000 --allowedOrigins "*"
```

Fügen Sie in den Einstellungen von llama.cpp einen MCP-Server hinzu, der auf `http://localhost:3000/mcp` verweist.

---

### Codex Secure Mode

OpenAI Codex läuft in einer Sandbox-Umgebung ohne Unterstützung für Subprozesse. Verwenden Sie den HTTP-Transport, damit Codex den MCP-Server erreichen kann, der auf Ihrem Host-Rechner läuft:

```bash
# Start on your host
npx @wdio/mcp --http --port 3000
```

Setzen Sie in Ihrer Codex-MCP-Konfiguration die Server-URL auf `http://localhost:3000/mcp` (oder auf die IP-Adresse Ihres Hosts, falls Codex in einer VM läuft).

---

### Architektur pro Anfrage

Jede HTTP-Anfrage erzeugt eine neue MCP-Serverinstanz. Das bedeutet:

- Clients können sich nach einem Verbindungsabbruch ohne Fehler erneut verbinden.
- Mehrere Clients können sich gleichzeitig verbinden (jeder erhält eine unabhängige MCP-Sitzung).
- Der Sitzungszustand (der aktive Browser bzw. die aktive App) wird über einen globalen Zustand geteilt, nicht über den Transportzustand.

Es gibt keinen Mutex; Anfragen werden parallel verarbeitet. Die Zustandsbehaftung des MCP-Protokolls (initialize → Tool-Aufrufe) wird pro Anfrage gehandhabt.