---
id: transport
title: Trasporto
description: "Esegui il server MCP di WebdriverIO tramite il trasporto stdio predefinito o tramite Streamable HTTP, e scegli la modalità giusta per il tuo client."
---

Il server MCP di WebdriverIO supporta due modalità di trasporto: **stdio** (predefinita) e **HTTP**.

## stdio (predefinita)

stdio è il trasporto MCP standard. Il client AI avvia il server come processo figlio e comunica tramite stdin/stdout.

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

Usa stdio per configurazioni locali con Claude Desktop, Claude Code, Cursor e client simili che gestiscono autonomamente il ciclo di vita del server.

## HTTP (Streamable HTTP)

La modalità HTTP esegue il server come processo autonomo in ascolto su una porta. I client si connettono tramite HTTP invece di avviarlo come sottoprocesso. Usala quando:

- Il tuo client non supporta MCP basato su sottoprocessi (ad es. la web UI di llama.cpp)
- Vuoi condividere un'unica istanza del server tra più client
- Stai eseguendo Codex in modalità sicura, dove l'esecuzione di sottoprocessi è limitata
- Vuoi mantenere il server in esecuzione tra più sessioni client

### Avvio in modalità HTTP

```bash
npx @wdio/mcp --http --port 3000
```

Il server espone un unico endpoint: `http://localhost:<port>/mcp`

### Opzioni complete

```bash
npx @wdio/mcp --http \
  --port 3000 \
  --allowedHosts "localhost,127.0.0.1,::1" \
  --allowedOrigins "http://localhost:5173,https://myapp.example.com"
```

| Flag               | Predefinito                     | Descrizione                                                                     |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------- |
| `--http`           | —                               | Abilita la modalità di trasporto HTTP                                           |
| `--port`           | `3000`                          | Porta su cui mettersi in ascolto                                                |
| `--allowedHosts`   | `localhost,127.0.0.1,::1`       | Valori consentiti dell'header `Host`, separati da virgola (protezione contro il DNS rebinding) |
| `--allowedOrigins` | _(nessuno — browser bloccati)_  | Valori `Origin` consentiti per CORS, separati da virgola. Usa `*` per consentire tutte le origini. |

### Sicurezza

**`--allowedHosts`** — Protegge dagli attacchi di DNS rebinding. Vengono accettate solo le richieste con un header `Host` corrispondente a questo elenco. Il valore predefinito (`localhost,127.0.0.1,::1`) è sicuro per l'uso locale. Se esponi il server su un'interfaccia pubblica, aggiungi qui il tuo hostname.

**`--allowedOrigins`** — Controlla quali origini del browser possono effettuare richieste cross-origin (CORS). Per impostazione predefinita, nessuna origine del browser è consentita. Questo blocca l'accesso da siti web arbitrari pur consentendo i client non browser (strumenti CLI, client API). Imposta `*` per consentire tutte le origini, oppure elenca origini specifiche.

Le richieste da client non browser (senza header `Origin`) non sono soggette al controllo CORS; si applica solo `--allowedHosts`.

## Casi d'uso

### Web UI di llama.cpp

La web UI di llama.cpp viene eseguita nel browser e invia un header `Origin` a ogni richiesta. Avvia il server con `--allowedOrigins` corrispondente all'origine della UI:

```bash
# llama.cpp web UI runs at http://localhost:8080
npx @wdio/mcp --http --port 3000 --allowedOrigins "http://localhost:8080"

# Or allow all local origins
npx @wdio/mcp --http --port 3000 --allowedOrigins "*"
```

Nelle impostazioni di llama.cpp, aggiungi un server MCP che punti a `http://localhost:3000/mcp`.

---

### Modalità sicura di Codex

OpenAI Codex viene eseguito in un ambiente sandbox senza supporto per i sottoprocessi. Usa il trasporto HTTP in modo che Codex possa raggiungere il server MCP in esecuzione sulla tua macchina host:

```bash
# Start on your host
npx @wdio/mcp --http --port 3000
```

Nella configurazione MCP di Codex, imposta l'URL del server su `http://localhost:3000/mcp` (o sull'IP del tuo host se Codex viene eseguito in una VM).

---

### Architettura per richiesta

Ogni richiesta HTTP crea una nuova istanza del server MCP. Questo significa che:

- I client possono riconnettersi senza errori dopo la caduta di una connessione.
- Più client possono connettersi contemporaneamente (ognuno ottiene una sessione MCP indipendente).
- Lo stato della sessione (il browser/app attivo) è condiviso tramite stato globale, non tramite lo stato del trasporto.

Non esiste un mutex; le richieste vengono gestite in modo concorrente. La gestione dello stato del protocollo MCP (initialize → chiamate ai tool) avviene per singola richiesta.