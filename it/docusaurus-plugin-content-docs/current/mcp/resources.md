---
id: resources
title: Risorse
description: "Leggi lo stato della sessione attiva, la cronologia delle sessioni e i dettagli di configurazione dei cloud provider tramite le risorse wdio:// in sola lettura del server MCP di WebdriverIO."
---

Le risorse MCP forniscono accesso in sola lettura allo stato della sessione attiva. A differenza dei tool, le risorse vengono lette dal modello AI quando lo ritiene opportuno; non eseguono azioni. Tutte le risorse utilizzano lo schema URI `wdio://`.

## Quando usare le risorse e quando i tool

- **Risorse** — stato contestuale che cambia man mano che interagisci: elementi correnti, screenshot, cookie, albero di accessibilità. Leggile prima di agire per capire cosa c'è sullo schermo.
- **Tool** — azioni che modificano lo stato: clic, navigazione, impostazione di valori.

Preferisci `wdio://session/current/elements` a `get_screenshot` per individuare gli elementi; restituisce selettori pronti all'uso e consuma molti meno token.

## Cronologia delle sessioni

### `wdio://sessions`

Indice di tutte le sessioni browser e app con metadati e numero di step.

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

Log JSON degli step per la sessione attualmente attiva. Contiene tutti gli step di automazione registrati con nomi dei tool, parametri e timestamp.

---

### `wdio://session/current/code`

Codice JavaScript WebdriverIO generato per la sessione attualmente attiva. Generato automaticamente dagli step registrati. Incollalo in un file di test WebdriverIO per riprodurre la sessione.

---

### `wdio://session/{sessionId}/steps`

Log degli step per una sessione specifica tramite ID. Template URI — sostituisci `{sessionId}` con l'ID ottenuto da `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

Codice JavaScript WebdriverIO generato per una sessione specifica tramite ID. Template URI — sostituisci `{sessionId}` con l'ID ottenuto da `wdio://sessions`.

## Stato della pagina attiva (sessione corrente)

### `wdio://session/current/elements`

Elementi interagibili nella pagina corrente. Restituisce selettori pronti all'uso, testo degli elementi e informazioni sulla visibilità.

**Questa è la risorsa principale per capire cosa c'è sullo schermo.** Leggila prima di cliccare o digitare. È molto più veloce ed economica di uno screenshot.

Per filtri avanzati (solo viewport, contenitori, bounding box, paginazione), usa invece il tool `get_elements`.

---

### `wdio://session/current/accessibility`

Albero di accessibilità della pagina corrente. Per impostazione predefinita restituisce tutti i nodi con ruolo, nome, selettore e attributi di stato. Solo browser. Su mobile, usa `wdio://session/current/elements`.

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

Per risultati filtrati (per ruolo, paginati), usa il tool `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

Screenshot della pagina o dello schermo corrente come immagine codificata in base64. Ridimensionato automaticamente (max 2000px) e compresso (max 1 MB).

Usalo per la verifica visiva o per il debug del layout. Per individuare gli elementi, preferisci `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

Tutti i cookie della sessione browser corrente.

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

Tutte le schede del browser aperte nella sessione corrente. Solo browser.

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

Usala prima di `switch_tab` per trovare l'handle o l'indice di destinazione.

---

### `wdio://session/current/contexts`

Contesti di automazione disponibili (NATIVE_APP, WEBVIEW). Solo mobile.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

Contesto di automazione attualmente attivo. Solo mobile.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

Stato del ciclo di vita dell'app per un determinato bundle ID. Solo mobile. Template URI — sostituisci `{bundleId}` con un bundle ID iOS o un nome di pacchetto Android.

Restituisce uno dei seguenti valori:
- `0` — non installata
- `1` — non in esecuzione
- `2` — in esecuzione in background (sospesa)
- `3` — in esecuzione in background
- `4` — in esecuzione in primo piano

Per un output con nomi descrittivi, usa invece il tool `get_app_state`.

---

### `wdio://session/current/geolocation`

Override della geolocalizzazione del dispositivo attualmente impostato da `set_geolocation`.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

Log della sessione corrente. Restituisce i messaggi della console del browser e le eccezioni JavaScript (sessioni Chromium), l'output di logcat (Android) o i log di crash/syslog (iOS).

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

Capabilities grezze restituite dal server WebDriver o Appium per la sessione corrente. Utile per il debug; mostra i valori effettivi accettati dal driver, inclusi i valori predefiniti applicati dal cloud provider o da Appium.

## Cloud provider

### `wdio://browserstack/local-binary`

URL di download specifico per piattaforma e istruzioni di configurazione del daemon per il binario BrowserStack Local. Leggila prima di usare `tunnel: true` o `tunnel: "external"` con `provider: "browserstack"`; contiene i comandi esatti per il tuo sistema operativo e la tua architettura.

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

URL di download specifico per piattaforma e istruzioni di configurazione del daemon per Sauce Connect Proxy. Leggila prima di usare `tunnel: "external"` con `provider: "saucelabs"`; con `tunnel: true` l'SDK gestisce automaticamente Sauce Connect.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

URL di download specifico per piattaforma e istruzioni di configurazione del daemon per TestMu Tunnel. Necessaria solo per `tunnel: "external"` con `provider: "testmu"` — con `tunnel: true` l'SDK gestisce automaticamente il tunnel tramite `@lambdatest/node-tunnel`.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

URL di download e istruzioni di configurazione del daemon per TestingBot Tunnel. Il tunnel è un JAR Java multipiattaforma (richiede Java 11+). Necessaria solo per `tunnel: "external"` con `provider: "testingbot"` — con `tunnel: true` l'SDK gestisce automaticamente il tunnel tramite `testingbot-tunnel-launcher`.

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```