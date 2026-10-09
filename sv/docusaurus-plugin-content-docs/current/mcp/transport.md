---
id: transport
title: Transport
description: "Kör WebdriverIO MCP-servern över standardtransporten stdio eller över Streamable HTTP, och välj rätt läge för din klient."
---

WebdriverIO MCP-servern stöder två transportlägen: **stdio** (standard) och **HTTP**.

## stdio (standard)

stdio är standardtransporten för MCP. AI-klienten startar servern som en underprocess och kommunicerar via stdin/stdout.

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

Använd stdio för lokala uppsättningar med Claude Desktop, Claude Code, Cursor och liknande klienter som själva hanterar serverns livscykel.

## HTTP (Streamable HTTP)

I HTTP-läge körs servern som en fristående process som lyssnar på en port. Klienter ansluter till den via HTTP i stället för att starta den som en underprocess. Använd detta när:

- Din klient inte stöder underprocessbaserad MCP (t.ex. llama.cpp:s webbgränssnitt)
- Du vill dela en serverinstans mellan flera klienter
- Du kör i Codex säkra läge där körning av underprocesser är begränsad
- Du vill att servern ska fortsätta köras över flera klientsessioner

### Starta i HTTP-läge

```bash
npx @wdio/mcp --http --port 3000
```

Servern exponerar en enda endpoint: `http://localhost:<port>/mcp`

### Alla alternativ

```bash
npx @wdio/mcp --http \
  --port 3000 \
  --allowedHosts "localhost,127.0.0.1,::1" \
  --allowedOrigins "http://localhost:5173,https://myapp.example.com"
```

| Flagga             | Standard                    | Beskrivning                                                                     |
| ------------------ | --------------------------- | ------------------------------------------------------------------------------- |
| `--http`           | —                           | Aktivera HTTP-transportläge                                                     |
| `--port`           | `3000`                      | Port att lyssna på                                                              |
| `--allowedHosts`   | `localhost,127.0.0.1,::1`   | Kommaseparerade tillåtna värden för `Host`-headern (skydd mot DNS rebinding)    |
| `--allowedOrigins` | _(inga — webbläsare blockeras)_ | Kommaseparerade tillåtna `Origin`-värden för CORS. Använd `*` för att tillåta alla origins. |

### Säkerhet

**`--allowedHosts`** — Skyddar mot DNS rebinding-attacker. Endast förfrågningar med en `Host`-header som matchar denna lista accepteras. Standardvärdet (`localhost,127.0.0.1,::1`) är säkert för lokal användning. Om du exponerar servern på ett publikt gränssnitt, lägg till ditt värdnamn här.

**`--allowedOrigins`** — Styr vilka webbläsar-origins som får göra cross-origin-förfrågningar (CORS). Som standard tillåts inga webbläsar-origins. Detta blockerar åtkomst från godtyckliga webbplatser men tillåter fortfarande klienter som inte är webbläsare (CLI-verktyg, API-klienter). Sätt till `*` för att tillåta alla origins, eller lista specifika origins.

Förfrågningar från klienter som inte är webbläsare (ingen `Origin`-header) omfattas inte av CORS-kontrollen; endast `--allowedHosts` gäller.

## Användningsfall

### llama.cpp webbgränssnitt

llama.cpp:s webbgränssnitt körs i webbläsaren och skickar en `Origin`-header med varje förfrågan. Starta servern med `--allowedOrigins` som matchar gränssnittets origin:

```bash
# llama.cpp web UI runs at http://localhost:8080
npx @wdio/mcp --http --port 3000 --allowedOrigins "http://localhost:8080"

# Or allow all local origins
npx @wdio/mcp --http --port 3000 --allowedOrigins "*"
```

I llama.cpp:s inställningar, lägg till en MCP-server som pekar på `http://localhost:3000/mcp`.

---

### Codex säkra läge

OpenAI Codex körs i en sandlådemiljö utan stöd för underprocesser. Använd HTTP-transport så att Codex kan nå MCP-servern som körs på din värddator:

```bash
# Start on your host
npx @wdio/mcp --http --port 3000
```

I din Codex MCP-konfiguration, ange serverns URL till `http://localhost:3000/mcp` (eller värdens IP-adress om Codex körs i en VM).

---

### Arkitektur per förfrågan

Varje HTTP-förfrågan skapar en ny MCP-serverinstans. Detta innebär:

- Klienter kan återansluta efter en tappad anslutning utan fel.
- Flera klienter kan ansluta samtidigt (var och en får en oberoende MCP-session).
- Sessionstillstånd (den aktiva webbläsaren/appen) delas via globalt tillstånd, inte transporttillstånd.

Det finns ingen mutex; förfrågningar hanteras parallellt. MCP-protokollets tillståndskänslighet (initialize → verktygsanrop) hanteras per förfrågan.