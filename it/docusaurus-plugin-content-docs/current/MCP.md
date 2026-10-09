---
id: mcp
title: MCP (Model Context Protocol)
description: "Consenti agli assistenti AI di automatizzare browser e app mobili tramite il server MCP di WebdriverIO, inclusi installazione, utilizzo con Claude e strumenti disponibili."
---

## Cosa può fare?

WebdriverIO MCP è un **server Model Context Protocol (MCP)** che consente agli assistenti AI di automatizzare e interagire con browser web e applicazioni mobili.

### Perché WebdriverIO MCP?

-   **Mobile-First**: A differenza dei server MCP limitati ai browser, WebdriverIO MCP supporta l'automazione di app native iOS e Android tramite Appium
-   **Selettori multipiattaforma**: Il rilevamento intelligente degli elementi genera automaticamente molteplici strategie di localizzazione (accessibility ID, XPath, UiAutomator, iOS predicates)
-   **Ecosistema WebdriverIO**: Basato sul collaudato framework WebdriverIO con il suo ricco ecosistema di servizi e reporter

Fornisce un'interfaccia unificata per:

-   🖥️ **Browser desktop** (Chrome, Firefox, Edge, Safari, con interfaccia o headless)
-   📱 **App mobili native** (simulatori iOS / emulatori Android / dispositivi reali tramite Appium)
-   📳 **App mobili ibride** (cambio di contesto Native + WebView tramite Appium)
-   ☁️ **Dispositivi cloud** (cloud di dispositivi reali e browser BrowserStack, Sauce Labs, TestMu)

tramite il pacchetto [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Questo consente agli assistenti AI di:

-   **Avviare e controllare browser** con dimensioni configurabili, modalità headless e navigazione iniziale opzionale
-   **Navigare siti web** e interagire con gli elementi (clic, digitazione, scorrimento)
-   **Analizzare il contenuto della pagina** tramite l'albero di accessibilità e il rilevamento degli elementi visibili con supporto alla paginazione
-   **Acquisire screenshot** ottimizzati automaticamente (ridimensionati, compressi fino a un massimo di 1MB)
-   **Gestire i cookie** per la gestione delle sessioni
-   **Controllare dispositivi mobili** inclusi i gesti (tap, swipe, drag and drop)
-   **Cambiare contesto** nelle app ibride tra nativo e webview
-   **Eseguire script** - JavaScript nei browser, comandi mobili Appium sui dispositivi
-   **Gestire funzionalità del dispositivo** come rotazione, tastiera, geolocalizzazione
-   e molto altro, consulta le opzioni [Strumenti](./mcp/tools) e [Configurazione](./mcp/configuration)

:::info

NOTA per le app mobili
L'automazione mobile richiede un server Appium in esecuzione con i driver appropriati installati. Consulta i [Prerequisiti](#prerequisites) per le istruzioni di configurazione.

:::

## Installazione

Il modo più semplice per usare `@wdio/mcp` è tramite npx senza alcuna installazione locale:

```sh
npx @wdio/mcp
```

Oppure installalo globalmente:

```sh
npm install -g @wdio/mcp
```

## Utilizzo con Claude

Per usare WebdriverIO MCP con Claude, modifica il file di configurazione:

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

Dopo aver aggiunto la configurazione, riavvia il tuo client. Gli strumenti di WebdriverIO MCP saranno disponibili per le attività di automazione di browser e dispositivi mobili.

### Utilizzo con Claude Code

Claude Code rileva automaticamente i server MCP. Puoi configurarlo nel file `.claude/settings.json` o `.mcp.json` del tuo progetto.

Oppure aggiungilo globalmente a .claude.json eseguendo:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Verificalo eseguendo il comando `/mcp` all'interno di claude code.

## Esempi di avvio rapido

### Automazione del browser

Chiedi a Claude di automatizzare attività nel browser:

```
"Open Chrome and navigate to https://webdriver.io"
"Click the 'Get Started' button"
"Take a screenshot of the page"
"Find all visible links on the page"
```

### Automazione di app mobili

Chiedi a Claude di automatizzare app mobili:

```
"Start my iOS app on the iPhone 15 simulator"
"Tap the login button"
"Swipe up to scroll down"
"Take a screenshot of the current screen"
```

## Funzionalità

### Automazione del browser

| Funzionalità | Descrizione |
|---------|-------------|
| **Gestione delle sessioni** | Avvia Chrome, Firefox, Edge o Safari in modalità con interfaccia/headless con dimensioni personalizzate; collegati a un'istanza Chrome esistente tramite CDP |
| **Navigazione** | Naviga verso URL; gestisci più schede |
| **Interazione con gli elementi** | Fai clic sugli elementi, digita testo, trova elementi tramite vari selettori |
| **Analisi della pagina** | Ottieni gli elementi interagibili (con paginazione), l'albero di accessibilità (con filtro per ruolo) |
| **Screenshot** | Acquisisci screenshot (ottimizzati automaticamente fino a un massimo di 1MB) |
| **Scorrimento** | Scorri verso l'alto/il basso di una quantità configurabile di pixel |
| **Gestione dei cookie** | Ottieni, imposta ed elimina i cookie |
| **Emulazione dei dispositivi** | Emula viewport di dispositivi mobili/tablet nel browser (richiede BiDi) |
| **Esecuzione di script** | Esegui JavaScript personalizzato nel contesto del browser |

### Automazione di app mobili (iOS/Android)

| Funzionalità | Descrizione |
|---------|-------------|
| **Gestione delle sessioni** | Avvia app su simulatori, emulatori o dispositivi reali |
| **Gesti touch** | Tap (su elemento o coordinate), swipe, drag and drop |
| **Rilevamento degli elementi** | Rilevamento intelligente degli elementi con molteplici strategie di localizzazione e paginazione |
| **Ciclo di vita dell'app** | Ottieni lo stato dell'app (in primo piano, in background, non in esecuzione, non installata) |
| **Cambio di contesto** | Passa tra contesti nativi e webview nelle app ibride |
| **Controllo del dispositivo** | Ruota il dispositivo, controllo della tastiera, override del GPS |
| **Permessi** | Gestione automatica di permessi e avvisi |
| **Esecuzione di script** | Esegui comandi mobili Appium (pressKey, deepLink, shell, ecc.) |

### Provider cloud

| Funzionalità | Descrizione |
|---------|-------------|
| **Sessioni browser** | Esegui sessioni browser su BrowserStack, Sauce Labs, TestMu o TestingBot (Windows, macOS, Linux) |
| **Sessioni mobili** | Esegui sessioni di app su dispositivi reali tramite BrowserStack, Sauce Labs, TestMu o TestingBot |
| **Gestione delle app** | Carica file `.apk`/`.ipa`; elenca le app caricate in precedenza su tutti e quattro i provider |
| **Tunnel locale** | Gestione automatica dei binari di tunnel specifici del provider per accedere a localhost |
| **Reporting** | Etichetta le sessioni con label di progetto/build/sessione (funziona in modo identico su tutti i provider) |

## Prerequisiti

### Automazione del browser

-   **Chrome, Firefox, Edge o Safari** devono essere installati
-   WebdriverIO gestisce automaticamente i driver

### Automazione mobile

#### iOS

1. **Installa Xcode** dal Mac App Store
2. **Installa gli Xcode Command Line Tools**:
   ```sh
   xcode-select --install
   ```
3. **Installa Appium**:
   ```sh
   npm install -g appium
   ```
4. **Installa il driver XCUITest**:
   ```sh
   appium driver install xcuitest
   ```
5. **Avvia il server Appium**:
   ```sh
   appium
   ```
6. **Per i simulatori**: Apri Xcode → Window → Devices and Simulators per creare/gestire i simulatori
7. **Per i dispositivi reali**: Avrai bisogno dell'UDID del dispositivo (identificatore univoco di 40 caratteri)

#### Android

1. **Installa Android Studio** e configura l'Android SDK
2. **Imposta le variabili d'ambiente**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Installa Appium**:
   ```sh
   npm install -g appium
   ```
4. **Installa il driver UiAutomator2**:
   ```sh
   appium driver install uiautomator2
   ```
5. **Avvia il server Appium**:
   ```sh
   appium
   ```
6. **Crea un emulatore** tramite Android Studio → Virtual Device Manager
7. **Avvia l'emulatore** prima di eseguire i test

## Architettura

### Come funziona

WebdriverIO MCP funge da ponte tra gli assistenti AI e l'automazione di browser/dispositivi mobili:

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │   (stdio or HTTP)     │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Browser    │             │    Appium     │             │   Cloud        │
            │ (local/CDP)   │             │  (iOS/Android)│             │   Providers    │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Gestione delle sessioni

-   **Modello a sessione singola**: Può essere attiva una sola sessione browser OPPURE app alla volta
-   **Lo stato della sessione** viene mantenuto globalmente tra le chiamate agli strumenti
-   **Distacco automatico**: Le sessioni con stato preservato (`noReset: true`) si scollegano automaticamente alla chiusura

### Rilevamento degli elementi

#### Browser (Web)

-   Utilizza uno script del browser ottimizzato per trovare tutti gli elementi visibili e interagibili
-   Restituisce gli elementi con selettori CSS, ID, classi e informazioni ARIA
-   Supporta il filtro per viewport e la paginazione

#### Mobile (app native)

-   Utilizza un'analisi efficiente del sorgente XML della pagina (2 chiamate HTTP contro oltre 600 per le query tradizionali)
-   Classificazione degli elementi specifica per piattaforma per Android e iOS
-   Genera molteplici strategie di localizzazione per ogni elemento:
    -   Accessibility ID (multipiattaforma, il più stabile)
    -   Attributo Resource ID / Name
    -   Corrispondenza su Text / Label
    -   XPath (completo e semplificato)
    -   UiAutomator (Android) / Predicates (iOS)

## Sintassi dei selettori

Il server MCP supporta molteplici strategie di selezione. Consulta [Selettori](./mcp/selectors) per la documentazione dettagliata.

### Web (CSS/XPath)

```
# Selettori CSS
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Selettori di testo (specifici di WebdriverIO)
button=Exact Button Text
a*=Partial Link Text
```

### Mobile (multipiattaforma)

```
# Accessibility ID (consigliato - funziona su iOS e Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (funziona su entrambe le piattaforme)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## Strumenti disponibili

Il server MCP fornisce 29 strumenti per l'automazione di browser e dispositivi mobili. Consulta [Strumenti](./mcp/tools) per il riferimento completo.

| Strumento | Piattaforma | Descrizione |
|------|----------|-------------|
| `start_session` | all | Avvia una sessione browser o mobile (locale o su provider cloud) |
| `close_session` | all | Chiudi o scollegati dalla sessione corrente |
| `launch_chrome` | browser | Apri Chrome con il debug remoto per il collegamento CDP |
| `navigate` | browser | Carica un URL nella scheda corrente |
| `get_tabs` | browser | Elenca tutte le schede aperte |
| `switch_tab` | browser | Porta in primo piano una scheda tramite handle o indice |
| `switch_frame` | browser | Entra in un iframe tramite selettore, o torna al livello superiore |
| `click_element` | browser | Fai clic su un elemento |
| `set_value` | all | Digita testo in un campo di input |
| `scroll` | browser | Scorri la pagina verso l'alto o verso il basso |
| `get_elements` | all | Ottieni gli elementi interagibili (con filtro + paginazione) |
| `get_accessibility_tree` | browser | Ottieni l'albero di accessibilità (con filtro per ruolo) |
| `get_screenshot` | all | Acquisisci uno screenshot (ottimizzato automaticamente) |
| `get_cookies` | browser | Ottieni tutti i cookie o un cookie specifico |
| `set_cookie` | browser | Imposta un cookie del browser |
| `delete_cookies` | browser | Elimina tutti i cookie o uno solo |
| `emulate_device` | browser | Emula il viewport di un dispositivo mobile/tablet |
| `execute_script` | all | Esegui JavaScript (browser) o comandi Appium (mobile) |
| `tap_element` | mobile | Tocca un elemento o delle coordinate dello schermo |
| `swipe` | mobile | Gesto di swipe in una direzione |
| `drag_and_drop` | mobile | Trascina tra elementi o coordinate |
| `get_contexts` | mobile | Elenca i contesti nativi/webview disponibili |
| `switch_context` | mobile | Passa tra contesti nativi e webview |
| `rotate_device` | mobile | Ruota in verticale o orizzontale |
| `hide_keyboard` | mobile | Chiudi la tastiera software |
| `set_geolocation` | all | Sovrascrivi le coordinate GPS del dispositivo |
| `get_app_state` | mobile | Ottieni lo stato del ciclo di vita dell'app |
| `list_apps` | cloud | Elenca le app caricate (BrowserStack, Sauce Labs, TestMu, TestingBot) |
| `upload_app` | cloud | Carica un `.apk`/`.ipa` su un provider cloud |

## Risorse MCP

Oltre agli strumenti, il server espone lo stato della sessione in tempo reale come risorse MCP. Consulta [Risorse](./mcp/resources) per il riferimento completo.

| URI della risorsa | Descrizione |
|-------------|-------------|
| `wdio://sessions` | Indice di tutte le sessioni |
| `wdio://session/current/elements` | Elementi interagibili (preferibile allo screenshot) |
| `wdio://session/current/screenshot` | Screenshot in base64 |
| `wdio://session/current/accessibility` | Albero di accessibilità |
| `wdio://session/current/cookies` | Cookie del browser |
| `wdio://session/current/tabs` | Schede del browser aperte |
| `wdio://session/current/contexts` | Contesti mobili disponibili |
| `wdio://session/current/context` | Contesto mobile attivo |
| `wdio://session/current/app-state/{bundleId}` | Stato del ciclo di vita dell'app mobile |
| `wdio://session/current/geolocation` | Override GPS corrente |
| `wdio://session/current/logs` | Log della sessione (console del browser, logcat, crashlog) |
| `wdio://session/current/capabilities` | Capabilities WebDriver grezze |
| `wdio://session/current/code` | Codice JS WebdriverIO generato |
| `wdio://session/current/steps` | Log dei passaggi della sessione |
| `wdio://session/{sessionId}/code` | JS generato per una sessione passata |
| `wdio://session/{sessionId}/steps` | Passaggi di una sessione passata |
| `wdio://browserstack/local-binary` | Istruzioni di configurazione di BrowserStack Local |
| `wdio://saucelabs/local-binary` | Istruzioni di configurazione di Sauce Connect Proxy |
| `wdio://testmu/local-binary` | Istruzioni di configurazione di TestMu Tunnel |
| `wdio://testingbot/local-binary` | Istruzioni di configurazione di TestingBot Tunnel |

## Gestione automatica

### Permessi

Per impostazione predefinita, il server MCP concede automaticamente i permessi alle app (`autoGrantPermissions: true`), eliminando la necessità di gestire manualmente le finestre di dialogo dei permessi durante l'automazione.

### Avvisi di sistema

Gli avvisi di sistema (come "Consentire le notifiche?") vengono accettati automaticamente per impostazione predefinita (`autoAcceptAlerts: true`). È possibile configurarli in modo che vengano invece rifiutati con `autoDismissAlerts: true`.

## Trasporto

Per impostazione predefinita, il server funziona tramite **stdio** (avviato come sottoprocesso dal client AI). Per i client che non supportano MCP basato su sottoprocessi (llama.cpp, modalità sicura di Codex), usa il **trasporto HTTP**:

```bash
npx @wdio/mcp --http --port 3000
```

Consulta [Trasporto](./mcp/transport) per tutte le opzioni, inclusi `--allowedHosts` e `--allowedOrigins`.

## Ottimizzazione delle prestazioni

Il server MCP è ottimizzato per una comunicazione efficiente con gli assistenti AI:

-   **Formato TOON**: Utilizza la Token-Oriented Object Notation per un utilizzo minimo dei token
-   **Analisi XML**: Il rilevamento degli elementi mobili usa 2 chiamate HTTP (contro oltre 600 tradizionalmente)
-   **Compressione degli screenshot**: Immagini compresse automaticamente fino a un massimo di 1MB
-   **Filtro per viewport**: Per impostazione predefinita vengono restituiti solo gli elementi visibili
-   **Paginazione**: Gli elenchi di elementi di grandi dimensioni possono essere paginati per ridurre la dimensione della risposta

## Gestione degli errori

Tutti gli strumenti sono progettati con una gestione degli errori robusta:

-   Gli errori vengono restituiti come contenuto testuale (mai lanciati come eccezioni), mantenendo la stabilità del protocollo MCP
-   Messaggi di errore descrittivi aiutano a diagnosticare i problemi
-   Lo stato della sessione viene preservato anche quando singole operazioni falliscono

## Casi d'uso

### Garanzia della qualità

-   Esecuzione di casi di test basata sull'AI
-   Test di regressione visiva con screenshot
-   Audit di accessibilità tramite l'analisi dell'albero di accessibilità

### Web scraping ed estrazione di dati

-   Navigazione di flussi complessi su più pagine
-   Estrazione di dati strutturati da contenuti dinamici
-   Gestione dell'autenticazione e delle sessioni

### Test di app mobili

-   Automazione dei test multipiattaforma (iOS + Android)
-   Validazione dei flussi di onboarding
-   Test di deep linking e navigazione

### Test di integrazione

-   Test di flussi di lavoro end-to-end
-   Verifica dell'integrazione API + UI
-   Controlli di coerenza multipiattaforma

## Risoluzione dei problemi

### Il browser non si avvia

-   Assicurati che il browser di destinazione sia installato
-   Verifica che nessun altro processo stia utilizzando la porta di debug predefinita (9222)
-   Prova la modalità headless se si verificano problemi di visualizzazione

### Connessione ad Appium non riuscita

-   Verifica che il server Appium sia in esecuzione (`appium`)
-   Controlla l'host e la porta di Appium in `appiumConfig`
-   Assicurati che il driver appropriato sia installato (`appium driver list`)

### Problemi con il simulatore iOS

-   Assicurati che Xcode sia installato e aggiornato
-   Verifica che i simulatori siano disponibili (`xcrun simctl list devices`)
-   Per i dispositivi reali, verifica che l'UDID sia corretto

### Problemi con l'emulatore Android

-   Assicurati che l'Android SDK sia configurato correttamente
-   Verifica che l'emulatore sia in esecuzione (`adb devices`)
-   Controlla che la variabile d'ambiente `ANDROID_HOME` sia impostata

## Risorse

-   [Riferimento degli strumenti](./mcp/tools) - Elenco completo degli strumenti disponibili
-   [Riferimento delle risorse](./mcp/resources) - Risorse MCP per lo stato della sessione in tempo reale
-   [Guida ai selettori](./mcp/selectors) - Documentazione sulla sintassi dei selettori
-   [Configurazione](./mcp/configuration) - Opzioni di configurazione
-   [Trasporto](./mcp/transport) - Configurazione del trasporto HTTP
-   [Provider cloud](./mcp/cloud-providers) - Integrazione cloud con BrowserStack, Sauce Labs, TestMu e TestingBot
-   [FAQ](./mcp/faq) - Domande frequenti
-   [Repository GitHub](https://github.com/webdriverio/mcp) - Codice sorgente e issue
-   [Pacchetto NPM](https://www.npmjs.com/package/@wdio/mcp) - Pacchetto su npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - Specifica MCP