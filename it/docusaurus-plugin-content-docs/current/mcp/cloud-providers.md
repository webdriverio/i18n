---
id: cloud-providers
title: Provider Cloud
description: "Esegui sessioni browser e mobile di WebdriverIO MCP su device farm cloud, incluse credenziali, caricamento delle app, tunnel e reportistica."
---

Il server WebdriverIO MCP offre supporto nativo per l'esecuzione di sessioni di automazione browser e mobile su device farm cloud. Non sono richiesti driver locali, emulatori o simulatori. Sono supportati quattro provider:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (browser) e [App Automate](https://www.browserstack.com/app-automate) (app mobile)
- **Sauce Labs** — cloud di dispositivi reali e browser virtuali di [Sauce Labs](https://saucelabs.com)
- **TestMu (precedentemente LambdaTest)** — cloud di dispositivi reali e browser di [TestMu](https://www.lambdatest.com)
- **TestingBot** — cloud di dispositivi reali e grid di browser di [TestingBot](https://testingbot.com)

Tutti e quattro i provider condividono lo stesso flusso di lavoro: imposta le credenziali, carica facoltativamente un'app mobile, quindi chiama `start_session` con il nome del provider. Le etichette di reportistica, la configurazione del tunnel e il ciclo di vita delle app mobile sono identici tra i provider.

## Prerequisiti

Imposta le tue credenziali come variabili d'ambiente prima di avviare il server MCP:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| Provider     | Variabile Username      | Variabile Access Key      | Dove trovarla                                                          |
| ------------ | ----------------------- | ------------------------- | ---------------------------------------------------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` | [Impostazioni account](https://www.browserstack.com/accounts/settings) |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        | [Impostazioni utente](https://app.saucelabs.com/user-settings)         |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       | [Impostazioni account](https://accounts.lambdatest.com/detail/profile) |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       | [Impostazioni account](https://testingbot.com/membership)              |

## Automazione browser

Esegui una sessione browser su qualsiasi provider cloud impostando `provider` in `start_session`:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

Tutti i provider supportano `browser`: `"chrome"`, `"firefox"`, `"edge"`, `"safari"`. Se ometti `os` / `osVersion`, il provider utilizza valori predefiniti ragionevoli (tipicamente l'ultima versione di Linux per le sessioni browser).

### Regioni di Sauce Labs

Sauce Labs supporta più regioni di data center. Imposta il parametro `region` in `start_session`:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

Valori supportati: `"us-west-1"`, `"eu-central-1"` (predefinito), `"apac-southeast-1"`.

## Automazione di app mobile

Il flusso di lavoro mobile prevede tre passaggi, identici per tutti i provider:

### Passaggio 1: Carica la tua app

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

Ciascuno restituisce un riferimento all'app che utilizzerai in `start_session`:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

Puoi facoltativamente impostare un `customId` per avere riferimenti stabili tra i vari caricamenti:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

Per Sauce Labs, aggiungi `region` in modo che corrisponda alla tua regione di storage (predefinita `"eu-central-1"`).

### Passaggio 2: Elenca le app disponibili

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

Parametri facoltativi per tutti i provider:
- `sortBy`: `"app_name"` o `"uploaded_at"` (predefinito)
- `limit`: numero massimo di risultati (predefinito 20)

BrowserStack supporta anche `organizationWide: true` per elencare tutti i caricamenti dell'organizzazione. Sauce Labs accetta `region`.

### Passaggio 3: Avvia la sessione

Usa il riferimento all'app restituito da `upload_app`, oppure un `customId`:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## Tunnel locale

Tutti e tre i provider supportano un tunnel locale, in modo che le sessioni cloud possano raggiungere i server sulla tua macchina (localhost, ambienti di staging, servizi interni).

Il server MCP utilizza un **parametro `tunnel` unificato** che funziona in modo identico per tutti i provider:

### Tunnel gestito automaticamente (consigliato)

Il server MCP avvia e arresta il tunnel automaticamente:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

Prima della tua prima sessione con `tunnel: true`, il server MCP si occupa di scaricare e avviare il binario del tunnel. Se vuoi verificare la configurazione manualmente, leggi la risorsa local-binary del provider:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

Il tunnel si arresta automaticamente quando chiudi la sessione.

### Tunnel esterno

Se stai già eseguendo il tunnel in un processo separato:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` indica al server MCP che un tunnel è già in esecuzione; imposta i flag di capability appropriati ma non avvia né arresta alcun processo. Imposta `tunnelName` in modo che corrisponda al tunnel in esecuzione.

### Configurazione manuale del tunnel

Se preferisci eseguire il tunnel manualmente, leggi le istruzioni di configurazione dalla risorsa MCP relativa al tuo provider e alla tua piattaforma. Ad esempio:

```text
// Leggi le istruzioni di configurazione (dal tuo client AI)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

Ogni risorsa restituisce l'URL di download, i comandi specifici per la piattaforma e le istruzioni per l'esecuzione come daemon.

## Reportistica

Contrassegna le sessioni con etichette di progetto, build e sessione per la dashboard del provider. Funziona in modo identico per tutti e tre i provider:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

Le sessioni compaiono nella dashboard del provider sotto il progetto e la build specificati:
- BrowserStack: [Dashboard Automate](https://automate.browserstack.com)
- Sauce Labs: [Risultati dei test](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Dashboard di automazione](https://automation.lambdatest.com)
- TestingBot: [Risultati dei test](https://testingbot.com/members)

## Note specifiche per provider

### BrowserStack

- Sessioni browser: `os` accetta `"Windows"` o `"OS X"`. Versioni di Windows: `"10"`, `"11"`. Versioni di macOS: `"Ventura"`, `"Sonoma"`, `"Sequoia"`.
- API di gestione delle app: `organizationWide: true` su `list_apps` elenca tutti i caricamenti del team.

### Sauce Labs

- **Le regioni sono importanti.** La regione predefinita è `eu-central-1`. Se il tuo account si trova in una regione diversa, imposta `region` su `start_session`, `list_apps` e `upload_app` in modo che corrisponda.
- Le sessioni mobile supportano `automationName` (`"XCUITest"` o `"UiAutomator2"`); i valori predefiniti sono adeguati per ciascuna piattaforma.
- Il tunnel Sauce Connect è gestito automaticamente tramite il pacchetto npm `saucelabs`. Non è necessario alcun binario esterno per `tunnel: true`.

### TestMu

- Il nome del provider è `"testmu"` in `start_session`, `list_apps` e `upload_app`.
- Le sessioni browser si connettono a `hub.lambdatest.com`; le sessioni mobile si connettono a `mobile-hub.lambdatest.com`; questo viene gestito automaticamente.
- Il tunnel è gestito automaticamente tramite il pacchetto npm `@lambdatest/node-tunnel`.
- La gestione delle app mobile recupera sia le app Android sia quelle iOS tramite chiamate API separate, quindi unisce i risultati.

### TestingBot

- Il nome del provider è `"testingbot"` in `start_session`, `list_apps` e `upload_app`.
- Le sessioni browser e mobile si connettono entrambe a `hub.testingbot.com` sulla porta 443 (gestito automaticamente).
- Le credenziali utilizzano `TESTINGBOT_KEY` e `TESTINGBOT_SECRET` (non una coppia username/access-key come gli altri provider).
- Il tunnel è gestito automaticamente tramite il pacchetto npm `testingbot-tunnel-launcher` (richiede Java 11+).
- Nessun parametro di regione: l'hub di TestingBot è globale.
- La modalità browser/emulatore mobile è supportata: imposta `platform: "android"` o `"ios"` con un nome di `browser` (ad es. `"chrome"`) invece di `app`.