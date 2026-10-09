---
id: configuration
title: Configurazione
description: "Configura il server MCP di WebdriverIO, incluse le opzioni di sessione, browser, mobile, cloud provider, rilevamento degli elementi e Appium."
---

Questa pagina documenta tutte le opzioni di configurazione per il server MCP di WebdriverIO.

## Configurazione del server MCP

Il server MCP viene configurato tramite i file di configurazione o i comandi.

### Configurazione di base

Modifica il tuo file di configurazione MCP (ad es. `./.mcp.json`) e aggiungi quanto segue:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

## Opzioni di sessione

Tutte le opzioni di sessione vengono passate al tool `start_session`. Esiste un unico tool unificato per le sessioni browser e mobile; il parametro `platform` determina il tipo di sessione.

### Opzioni comuni

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

La piattaforma da automatizzare.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

Dove viene eseguita la sessione. Usa il nome di un cloud provider per i dispositivi remoti; ognuno richiede le proprie variabili d'ambiente. Consulta [Cloud Providers](./cloud-providers) per i dettagli.

</Option>
## Opzioni della sessione browser

Opzioni per le sessioni `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

Browser da avviare.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

Versione del browser. Solo per i cloud provider (predefinito: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

Sistema operativo per le sessioni browser sui cloud provider. Esempi: `os: "Windows"`, `osVersion: "11"` oppure `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

Esegue il browser in modalità headless (nessuna finestra visibile). Imposta su `false` per vedere il browser.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **Intervallo:** `400` - `3840`

Larghezza iniziale della finestra del browser in pixel.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **Intervallo:** `400` - `2160`

Altezza iniziale della finestra del browser in pixel.

</Option>
### `navigationUrl`

<Option type="string" required="No">

URL a cui navigare subito dopo l'avvio del browser. Più efficiente che chiamare `start_session` seguito separatamente da `navigate`.

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

Si collega a un'istanza di Chrome esistente invece di avviarne una nuova. Da usare dopo `launch_chrome` per connettersi tramite CDP.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

Configurazione della connessione di debug remoto di Chrome. Si applica solo quando `attach: true`.

</Option>
## Opzioni della sessione mobile

Opzioni per le sessioni `platform: "ios"` o `platform: "android"`.

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

Nome del dispositivo, simulatore o emulatore.

**Esempi:**
-   Simulatore iOS: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Emulatore Android: `"Pixel 7"`, `"Nexus 5X"`
-   Dispositivo reale: il nome del dispositivo come mostrato nel tuo sistema

</Option>
### `platformVersion`

<Option type="string" required="No">

Versione del sistema operativo del dispositivo/simulatore/emulatore (ad es. `"18.0"` per iOS, `"14"` per Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

Driver di automazione. Il valore predefinito è `XCUITest` per iOS e `UiAutomator2` per Android.

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

Unique Device Identifier. Obbligatorio per i dispositivi iOS reali (identificatore di 40 caratteri).

**Come trovare l'UDID:**
-   **iOS:** Collega il dispositivo, apri il Finder, fai clic sul dispositivo → Numero di serie (fai clic per mostrare l'UDID)
-   **Android:** Esegui `adb devices` nel terminale

</Option>
### `appPath`

<Option type="string" required="No">

Percorso del file dell'applicazione da installare e avviare.

**Formati supportati:**
-   Simulatore iOS: directory `.app`
-   Dispositivo iOS reale: file `.ipa`
-   Android: file `.apk`

È necessario fornire `appPath`, oppure `noReset: true` per connettersi a un'app già in esecuzione.

</Option>
### `app`

<Option type="string" required="No">

URL dell'app sul cloud provider (`bs://...` per BrowserStack, `storage:filename=` per Sauce Labs, `lt://...` per TestMu, app_url di TestingBot) oppure `customId`. Usato al posto di `appPath` per le sessioni mobile in cloud.

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

Activity da attendere all'avvio dell'app. Se non specificata, viene usata l'activity principale/launcher dell'app.

**Esempio:** `"com.example.app.MainActivity"`

</Option>
### Opzioni dello stato della sessione

#### `noReset`

<Option type="boolean" required="No">

Preserva lo stato dell'app tra le sessioni. Quando è `true`:
-   I dati dell'app vengono preservati (stato di login, preferenze, ecc.)
-   La sessione verrà **scollegata (detach)** invece che chiusa (l'app resta in esecuzione)
-   Può essere usato senza `appPath` per connettersi a un'app già in esecuzione

</Option>
#### `fullReset`

<Option type="boolean" required="No">

Reimposta completamente l'app prima della sessione:
-   iOS: disinstalla e reinstalla l'app
-   Android: cancella i dati e la cache dell'app

Imposta `fullReset: false` con `noReset: true` per preservare completamente lo stato dell'app.

</Option>
### Timeout della sessione

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

Quanto tempo (in secondi) Appium attenderà un nuovo comando prima di terminare la sessione. Aumentalo per sessioni di debug più lunghe.

</Option>
### Gestione automatica

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

Concede automaticamente i permessi dell'app all'installazione/avvio (fotocamera, microfono, posizione, ecc.).

:::note Solo Android
Questa opzione riguarda principalmente Android. I permessi iOS devono essere gestiti diversamente a causa delle restrizioni di sistema.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

Accetta automaticamente gli avvisi di sistema (dialog) durante l'automazione ("Consentire le notifiche?", ecc.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

Rifiuta gli avvisi di sistema invece di accettarli. Ha la precedenza su `autoAcceptAlerts` quando è `true`.

</Option>
### Connessione al server Appium

Sovrascrivi la connessione al server Appium per singola sessione usando `appiumConfig`:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

Connessione al server Appium. Il valore predefinito è `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Opzioni dei cloud provider

### Credenziali

Ogni cloud provider richiede le proprie variabili d'ambiente:

| Provider     | Variabile username      | Variabile access key      |
| ------------ | ----------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       |

Impostale prima di avviare il server MCP.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

Regione del data center di Sauce Labs. Ignorata per gli altri provider.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

Abilita l'instradamento tramite tunnel locale per le sessioni sui cloud provider (accesso a localhost, ambienti di staging, servizi interni).

-   `true` — Avvia automaticamente il tunnel prima della sessione e lo arresta alla chiusura
-   `"external"` — Tunnel già in esecuzione esternamente; imposta solo i flag appropriati per il provider

Prima di usare `true`, leggi la risorsa local-binary del provider (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` o `wdio://testingbot/local-binary`) per le istruzioni di configurazione specifiche per il tuo sistema operativo e la tua architettura.

</Option>
### `tunnelName`

<Option type="string" required="No">

Nome identificativo del tunnel. Obbligatorio quando `tunnel: "external"` per corrispondere al tunnel in esecuzione. Quando `tunnel: true`, se non fornito viene generato automaticamente un nome univoco.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

Etichette della sessione del cloud provider visibili nella dashboard del provider. Funziona in modo identico su BrowserStack, Sauce Labs, TestMu e TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

Abilita la registrazione delle trace. Produce un file zip `.trace` compatibile con Playwright, salvato in `.trace/` al momento di `close_session`. Visualizza le trace su [player.vibium.dev](https://player.vibium.dev).

</Option>
## Opzioni di rilevamento degli elementi

Opzioni per il tool `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

Restituisce solo gli elementi visibili nel viewport corrente. Imposta su `true` per ridurre i risultati nelle pagine lunghe.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

Include gli elementi contenitore/di layout nei risultati:

**Contenitori Android:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**Contenitori iOS:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

Include nella risposta le coordinate del bounding box dell'elemento (x, y, larghezza, altezza).

</Option>
### Paginazione

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Numero massimo di elementi da restituire.

</Option>
#### `offset`

<Option type="number" default="0" required="No">

Numero di elementi da saltare prima di restituire i risultati.

**Esempio:** ottenere gli elementi dal 21 al 40:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Opzioni dell'albero di accessibilità

Opzioni per il tool `get_accessibility_tree` (solo browser).

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Numero massimo di nodi da restituire.

</Option>
### `offset`

<Option type="number" default="0" required="No">

Numero di nodi da saltare per la paginazione.

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

Filtra per ruoli di accessibilità specifici.

**Ruoli comuni:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Esempio:** ottenere solo pulsanti e link:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Screenshot

Il tool `get_screenshot` non accetta parametri. Gli screenshot vengono elaborati automaticamente:

| Ottimizzazione       | Valore   | Descrizione                                                     |
| -------------------- | -------- | --------------------------------------------------------------- |
| Dimensione massima   | 2000px   | Le immagini più grandi di 2000px vengono ridimensionate         |
| Dimensione file max  | 1MB      | Le immagini vengono compresse per restare sotto 1MB             |
| Formato              | PNG/JPEG | PNG con compressione massima; JPEG se necessario per le dimensioni |

## Comportamento della sessione

### Tipi di sessione

| Tipo      | Descrizione          | Auto-Detach                               |
| --------- | -------------------- | ----------------------------------------- |
| `browser` | Sessione browser     | No                                        |
| `ios`     | Sessione app iOS     | Sì (se `noReset: true` o senza `appPath`) |
| `android` | Sessione app Android | Sì (se `noReset: true` o senza `appPath`) |

### Modello a sessione singola

Il server MCP opera con un **modello a sessione singola**:

-   Può essere attiva una sola sessione browser OPPURE app alla volta
-   Avviare una nuova sessione chiuderà/scollegherà la sessione corrente
-   Lo stato della sessione viene mantenuto globalmente tra le chiamate ai tool

### Detach vs Close

| Azione     | `detach: false` (Close)              | `detach: true` (Detach)                            |
| ---------- | ------------------------------------ | -------------------------------------------------- |
| Browser    | Chiude completamente il browser      | Mantiene il browser in esecuzione, disconnette WebDriver |
| App mobile | Termina l'app                        | Mantiene l'app in esecuzione nello stato corrente  |
| Caso d'uso | Ripartire da zero per la sessione successiva | Preservare lo stato, ispezione manuale     |

## Considerazioni sulle prestazioni

### Automazione browser

-   La **modalità headless** è più veloce ma non esegue il rendering degli elementi visivi
-   **Finestre più piccole** riducono il tempo di acquisizione degli screenshot
-   Il **rilevamento degli elementi** è ottimizzato con un'unica esecuzione di script
-   L'**ottimizzazione degli screenshot** mantiene le immagini sotto 1MB per un'elaborazione efficiente

### Automazione mobile

-   Il **parsing del page source XML** usa solo 2 chiamate HTTP (contro le oltre 600 delle tradizionali query sugli elementi)
-   I **selettori Accessibility ID** sono i più veloci e affidabili
-   I **selettori XPath** sono i più lenti; usali solo come ultima risorsa
-   La **paginazione** (`limit` e `offset`) riduce l'uso di token per le schermate con molti elementi

### Suggerimenti sull'uso dei token

| Impostazione               | Impatto                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| `inViewportOnly: true`     | Filtra gli elementi fuori schermo, riducendo la dimensione della risposta |
| `includeContainers: false` | Esclude gli elementi di layout (ViewGroup, ecc.)                 |
| `includeBounds: false`     | Omette i dati x/y/larghezza/altezza                              |
| `limit` con paginazione    | Elabora gli elementi a blocchi invece che tutti insieme          |

## Configurazione del server Appium

Prima di usare l'automazione mobile, assicurati che Appium sia configurato correttamente.

### Configurazione di base

```sh
# Installa Appium globalmente
npm install -g appium

# Installa i driver
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Avvia il server
appium
```

### Configurazione personalizzata del server

```sh
# Avvia con host e porta personalizzati
appium --address 0.0.0.0 --port 4724

# Avvia con il logging
appium --log-level debug

# Avvia con un base path specifico
appium --base-path /wd/hub
```

### Verifica dell'installazione

```sh
# Controlla i driver installati
appium driver list --installed

# Controlla la versione di Appium
appium --version

# Testa la connessione
curl http://localhost:4723/status
```

## Risoluzione dei problemi di configurazione

### Il server MCP non si avvia

1. Verifica che npm/npx sia installato: `npm --version`
2. Prova a eseguirlo manualmente: `npx @wdio/mcp`
3. Controlla i log del tuo harness per eventuali errori

### Problemi di connessione ad Appium

1. Verifica che Appium sia in esecuzione: `curl http://localhost:4723/status`
2. Controlla che `appiumConfig` in `start_session` corrisponda alle impostazioni del server Appium
3. Assicurati che il firewall consenta le connessioni sulla porta di Appium

### La sessione non si avvia

1. **Browser:** assicurati che il browser di destinazione sia installato
2. **iOS:** verifica che Xcode e i simulatori siano disponibili
3. **Android:** controlla `ANDROID_HOME` e che l'emulatore sia in esecuzione
4. Esamina i log del server Appium per messaggi di errore dettagliati

### Timeout della sessione

Se le sessioni vanno in timeout durante il debug:
1. Aumenta `newCommandTimeout` quando avvii la sessione
2. Usa `noReset: true` per preservare lo stato tra le sessioni
3. Usa `detach: true` alla chiusura per mantenere l'app in esecuzione