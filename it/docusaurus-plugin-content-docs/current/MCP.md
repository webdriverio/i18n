---
id: mcp
title: MCP (Model Context Protocol)
---

## Cosa può fare?

WebdriverIO MCP è un **server Model Context Protocol (MCP)** che consente agli assistenti AI come Claude Desktop e Claude Code di automatizzare e interagire con browser web e applicazioni mobili.

### Perché WebdriverIO MCP?

-   **Orientato al Mobile**: A differenza dei server MCP solo per browser, WebdriverIO MCP supporta l'automazione di app native iOS e Android tramite Appium
-   **Selettori Cross-Platform**: Il rilevamento intelligente degli elementi genera automaticamente più strategie di localizzazione (accessibility ID, XPath, UiAutomator, predicati iOS)
-   **Ecosistema WebdriverIO**: Costruito sul framework WebdriverIO ampiamente testato con il suo ricco ecosistema di servizi e reporter

Fornisce un'interfaccia unificata per:

-   🖥️ **Browser Desktop** (Chrome - in modalità normale o headless)
-   📱 **App Mobile Native** (Simulatori iOS / Emulatori Android / Dispositivi reali tramite Appium)
-   📳 **App Mobile Ibride** (cambio di contesto tra Native e WebView tramite Appium)

attraverso il pacchetto [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Questo permette agli assistenti AI di:

-   **Avviare e controllare browser** con dimensioni configurabili, modalità headless e navigazione iniziale opzionale
-   **Navigare siti web** e interagire con gli elementi (clic, digitazione, scorrimento)
-   **Analizzare il contenuto della pagina** tramite albero di accessibilità e rilevamento degli elementi visibili con supporto alla paginazione
-   **Acquisire screenshot** automaticamente ottimizzati (ridimensionati, compressi fino a max 1MB)
-   **Gestire i cookie** per la gestione delle sessioni
-   **Controllare dispositivi mobili** inclusi gesti (tap, swipe, drag and drop)
-   **Cambiare contesti** nelle app ibride tra nativo e webview
-   **Eseguire script** - JavaScript nei browser, comandi Appium mobile sui dispositivi
-   **Gestire funzionalità dei dispositivi** come rotazione, tastiera, geolocalizzazione
-   e molto altro, vedi le opzioni [Tools](./mcp/tools) e [Configuration](./mcp/configuration)

:::info

NOTA Per App Mobile
L'automazione mobile richiede un server Appium in esecuzione con i driver appropriati installati. Vedi [Prerequisiti](#prerequisites) per le istruzioni di configurazione.

:::

## Installazione

Il modo più semplice per utilizzare `@wdio/mcp` è tramite npx senza alcuna installazione locale:

```sh
npx @wdio/mcp
```

O installarlo globalmente:

```sh
npm install -g @wdio/mcp
```

## Utilizzo con Claude

Per utilizzare WebdriverIO MCP con Claude, modifica il file di configurazione:

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

Dopo aver aggiunto la configurazione, riavvia Claude. Gli strumenti WebdriverIO MCP saranno disponibili per attività di automazione di browser e dispositivi mobili.

### Utilizzo con Claude Code

Claude Code rileva automaticamente i server MCP. Puoi configurarlo nel file `.claude/settings.json` o `.mcp.json` del tuo progetto.

Oppure aggiungilo globalmente a .claude.json eseguendo:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Verificalo eseguendo il comando `/mcp` all'interno di Claude Code.

## Esempi di Avvio Rapido

### Automazione Browser

Chiedi a Claude di automatizzare attività del browser:

```
"Apri Chrome e naviga su https://webdriver.io"
"Clicca sul pulsante 'Get Started'"
"Fai uno screenshot della pagina"
"Trova tutti i link visibili sulla pagina"
```

### Automazione App Mobile

Chiedi a Claude di automatizzare app mobili:

```
"Avvia la mia app iOS sul simulatore iPhone 15"
"Tocca il pulsante di login"
"Scorri verso l'alto per scorrere verso il basso"
"Fai uno screenshot della schermata corrente"
```

## Funzionalità

### Automazione Browser (Chrome)

| Funzionalità | Descrizione |
|---------|-------------|
| **Gestione Sessione** | Avvia Chrome in modalità normale/headless con dimensioni personalizzate e URL di navigazione opzionale |
| **Navigazione** | Naviga verso URL |
| **Interazione con Elementi** | Clicca elementi, digita testo, trova elementi con vari selettori |
| **Analisi Pagina** | Ottieni elementi visibili (con paginazione), albero di accessibilità (con filtri) |
| **Screenshot** | Cattura screenshot (auto-ottimizzati a max 1MB) |
| **Scorrimento** | Scorri su/giù con quantità di pixel configurabili |
| **Gestione Cookie** | Ottieni, imposta ed elimina cookie |
| **Esecuzione Script** | Esegui JavaScript personalizzato nel contesto del browser |

### Automazione App Mobile (iOS/Android)

| Funzionalità | Descrizione |
|---------|-------------|
| **Gestione Sessione** | Avvia app su simulatori, emulatori o dispositivi reali |
| **Gesti Touch** | Tap, swipe, drag and drop |
| **Rilevamento Elementi** | Rilevamento intelligente degli elementi con strategie multiple di localizzazione e paginazione |
| **Ciclo di Vita App** | Ottieni stato app (tramite `execute_script` per attivare/terminare) |
| **Cambio Contesto** | Cambia tra contesti nativi e webview nelle app ibride |
| **Controllo Dispositivo** | Ruota dispositivo, controllo tastiera |
| **Geolocalizzazione** | Ottieni e imposta coordinate GPS del dispositivo |
| **Permessi** | Gestione automatica dei permessi e degli avvisi |
| **Esecuzione Script** | Esegui comandi Appium mobile (pressKey, deepLink, shell, ecc.) |

## Prerequisiti

### Automazione Browser

-   **Chrome** deve essere installato sul tuo sistema
-   WebdriverIO gestisce automaticamente ChromeDriver

### Automazione Mobile

#### iOS

1. **Installa Xcode** dal Mac App Store
2. **Installa gli Strumenti da Riga di Comando Xcode**:
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
6. **Per Simulatori**: Apri Xcode → Window → Devices and Simulators per creare/gestire simulatori
7. **Per Dispositivi Reali**: Avrai bisogno dell'UDID del dispositivo (identificatore unico di 40 caratteri)

#### Android

1. **Installa Android Studio** e configura Android SDK
2. **Imposta variabili d'ambiente**:
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

### Come Funziona

WebdriverIO MCP agisce come ponte tra gli assistenti AI e l'automazione di browser/mobile:

```
┌─────────────────┐     Protocollo MCP      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  o Claude Code  │      (stdio)          │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Chrome     │             │    Appium     │             │    Appium     │
            │   (Browser)   │             │     (iOS)     │             │   (Android)   │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Gestione Sessione

-   **Modello a sessione singola**: Solo una sessione di browser O app può essere attiva alla volta
-   **Stato della sessione** viene mantenuto globalmente tra le chiamate agli strumenti
-   **Auto-distacco**: Le sessioni con stato preservato (`noReset: true`) si staccano automaticamente alla chiusura

### Rilevamento Elementi

#### Browser (Web)

-   Utilizza uno script browser ottimizzato per trovare tutti gli elementi visibili e interagibili
-   Restituisce elementi con selettori CSS, ID, classi e informazioni ARIA
-   Filtra per impostazione predefinita gli elementi visibili nel viewport

#### Mobile (App Native)

-   Utilizza un'analisi efficiente del codice sorgente XML (2 chiamate HTTP invece di 600+ per le query tradizionali)
-   Classificazione degli elementi specifica per piattaforma per Android e iOS
-   Genera più strategie di localizzazione per elemento:
    -   Accessibility ID (cross-platform, più stabile)
    -   Resource ID / attributo Name
    -   Corrispondenza Testo / Etichetta
    -   XPath (completo e semplificato)
    -   UiAutomator (Android) / Predicati (iOS)

## Sintassi dei Selettori

Il server MCP supporta molteplici strategie di selezione. Vedi [Selectors](./mcp/selectors) per documentazione dettagliata.

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
button=Testo Esatto del Pulsante
a*=Testo Parziale del Link
```

### Mobile (Cross-Platform)

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

## Strumenti Disponibili

Il server MCP fornisce 25 strumenti per l'automazione di browser e mobile. Vedi [Tools](./mcp/tools) per il riferimento completo.

### Strumenti Browser

| Strumento | Descrizione |
|------|-------------|
| `start_browser` | Avvia il browser Chrome (con URL iniziale opzionale) |
| `close_session` | Chiude o si distacca dalla sessione |
| `navigate` | Naviga verso un URL |
| `click_element` | Clicca un elemento |
| `set_value` | Digita testo in un input |
| `get_visible_elements` | Ottieni elementi visibili/interagibili (con paginazione) |
| `get_accessibility` | Ottieni albero di accessibilità (con filtri) |
| `take_screenshot` | Cattura screenshot (auto-ottimizzati) |
| `scroll` | Scorri la pagina su o giù |
| `get_cookies` / `set_cookie` / `delete_cookies` | Gestione cookie |
| `execute_script` | Esegui JavaScript nel browser |

### Strumenti Mobile

| Strumento | Descrizione |
|------|-------------|
| `start_app_session` | Avvia app iOS/Android |
| `tap_element` | Tocca elemento o coordinate |
| `swipe` | Scorri in una direzione |
| `drag_and_drop` | Trascina tra posizioni |
| `get_app_state` | Controlla se l'app è in esecuzione |
| `get_contexts` / `switch_context` | Cambio contesto nelle app ibride |
| `rotate_device` | Ruota in modalità portrait/landscape |
| `get_geolocation` / `set_geolocation` | Ottieni o imposta coordinate GPS |
| `hide_keyboard` | Nascondi tastiera su schermo |
| `execute_script` | Esegui comandi Appium mobile |

## Gestione Automatica

### Permessi

Per impostazione predefinita, il server MCP concede automaticamente i permessi delle app (`autoGrantPermissions: true`), eliminando la necessità di gestire manualmente le finestre di dialogo dei permessi durante l'automazione.

### Avvisi di Sistema

Gli avvisi di sistema (come "Permettere le notifiche?") vengono automaticamente accettati per impostazione predefinita (`autoAcceptAlerts: true`). Questo può essere configurato per ignorarli invece con `autoDismissAlerts: true`.

## Configurazione

### Variabili d'Ambiente

Configura la connessione al server Appium:

| Variabile | Predefinito | Descrizione |
|----------|---------|-------------|
| `APPIUM_URL` | `127.0.0.1` | Hostname del server Appium |
| `APPIUM_URL_PORT` | `4723` | Porta del server Appium |
| `APPIUM_PATH` | `/` | Percorso del server Appium |

### Esempio con Server Appium Personalizzato

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724"
            }
        }
    }
}
```

## Ottimizzazione delle Prestazioni

Il server MCP è ottimizzato per una comunicazione efficiente con l'assistente AI:

-   **Formato TOON**: Utilizza Token-Oriented Object Notation per un utilizzo minimo di token
-   **Parsing XML**: Il rilevamento degli elementi mobili utilizza 2 chiamate HTTP (contro le 600+ tradizionali)
-   **Compressione Screenshot**: Immagini auto-compresse a max 1MB usando Sharp
-   **Filtro Viewport**: Solo gli elementi visibili vengono restituiti per impostazione predefinita
-   **Paginazione**: Grandi liste di elementi possono essere paginate per ridurre la dimensione della risposta

## Supporto TypeScript

Il server MCP è scritto in TypeScript e include definizioni di tipo complete. Se stai estendendo o integrando con il server a livello di programmazione, beneficerai dell'auto-completamento e della sicurezza dei tipi.

## Gestione Errori

Tutti gli strumenti sono progettati con una robusta gestione degli errori:

-   Gli errori vengono restituiti come contenuto testuale (mai lanciati), mantenendo la stabilità del protocollo MCP
-   Messaggi di errore descrittivi aiutano a diagnosticare i problemi
-   Lo stato della sessione viene preservato anche quando le singole operazioni falliscono

## Casi d'Uso

### Controllo Qualità

-   Esecuzione di casi di test guidata dall'AI
-   Test di regressione visiva con screenshot
-   Audit di accessibilità tramite analisi dell'albero di accessibilità

### Web Scraping ed Estrazione Dati

-   Naviga flussi complessi multi-pagina
-   Estrai dati strutturati da contenuti dinamici
-   Gestisci autenticazione e gestione delle sessioni

### Test di App Mobile

-   Automazione di test cross-platform (iOS + Android)
-   Validazione dei flussi di onboarding
-   Test di deep linking e navigazione

### Test di Integrazione

-   Test di workflow end-to-end
-   Verifica dell'integrazione API + UI
-   Controlli di coerenza multi-piattaforma

## Risoluzione Problemi

### Il browser non si avvia

-   Assicurati che Chrome sia installato
-   Verifica che nessun altro processo stia utilizzando la porta di debug predefinita (9222)
-   Prova la modalità headless se si verificano problemi di visualizzazione

### Connessione Appium fallita

-   Verifica che il server Appium sia in esecuzione (`appium`)
-   Controlla la configurazione dell'URL e della porta Appium
-   Assicurati che il driver appropriato sia installato (`appium driver list`)

### Problemi con Simulatore iOS

-   Assicurati che Xcode sia installato e aggiornato
-   Controlla che i simulatori siano disponibili (`xcrun simctl list devices`)
-   Per dispositivi reali, verifica che l'UDID sia corretto

### Problemi con Emulatore Android

-   Assicurati che Android SDK sia configurato correttamente
-   Verifica che l'emulatore sia in esecuzione (`adb devices`)
-   Controlla che la variabile d'ambiente `ANDROID_HOME` sia impostata

## Risorse

-   [Riferimento Strumenti](./mcp/tools) - Lista completa degli strumenti disponibili
-   [Guida Selettori](./mcp/selectors) - Documentazione sintassi dei selettori
-   [Configurazione](./mcp/configuration) - Opzioni di configurazione
-   [FAQ](./mcp/faq) - Domande frequenti
-   [Repository GitHub](https://github.com/webdriverio/mcp) - Codice sorgente e problemi
-   [Pacchetto NPM](https://www.npmjs.com/package/@wdio/mcp) - Pacchetto su npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - Specifica MCP