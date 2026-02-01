---
id: configuration
title: Configurazione
---

Questa pagina documenta tutte le opzioni di configurazione per il server WebdriverIO MCP.

## Configurazione del Server MCP

Il server MCP viene configurato attraverso i file di configurazione di Claude Desktop o Claude Code.

### Configurazione di Base

#### macOS

Modifica `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

#### Windows

Modifica `%APPDATA%\Claude\claude_desktop_config.json`:

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

#### Claude Code

Modifica il file `.claude/settings.json` del tuo progetto:

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

---

## Variabili d'Ambiente

Configura la connessione al server Appium e altre impostazioni tramite variabili d'ambiente.

### Connessione Appium

| Variabile | Tipo | Predefinito | Descrizione |
|----------|------|---------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Hostname del server Appium |
| `APPIUM_URL_PORT` | number | `4723` | Porta del server Appium |
| `APPIUM_PATH` | string | `/` | Percorso del server Appium |

### Esempio con Variabili d'Ambiente

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724",
                "APPIUM_PATH": "/wd/hub"
            }
        }
    }
}
```

---

## Opzioni Sessione Browser

Opzioni disponibili quando si avvia una sessione browser tramite lo strumento `start_browser`.

### `headless`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `false`

Esegue Chrome in modalità headless (senza finestra browser visibile). Utile per ambienti CI/CD o quando non è necessario vedere il browser.

### `windowWidth`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `1920`
-   **Intervallo:** `400` - `3840`

Larghezza iniziale della finestra del browser in pixel.

### `windowHeight`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `1080`
-   **Intervallo:** `400` - `2160`

Altezza iniziale della finestra del browser in pixel.

### `navigationUrl`

-   **Tipo:** `string`
-   **Obbligatorio:** No

URL a cui navigare immediatamente dopo l'avvio del browser. È più efficiente che chiamare separatamente `start_browser` seguito da `navigate`.

**Esempio:** Avviare il browser e navigare in una sola chiamata:
```
Start Chrome and navigate to https://webdriver.io
```

---

## Opzioni Sessione Mobile

Opzioni disponibili quando si avvia una sessione app mobile tramite lo strumento `start_app_session`.

### Opzioni Piattaforma

#### `platform`

-   **Tipo:** `string`
-   **Obbligatorio:** Sì
-   **Valori:** `iOS` | `Android`

La piattaforma mobile da automatizzare.

#### `platformVersion`

-   **Tipo:** `string`
-   **Obbligatorio:** No

La versione del sistema operativo del dispositivo/simulator/emulator (es., `17.0` per iOS, `14` per Android).

#### `automationName`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Valori:** `XCUITest` (iOS), `UiAutomator2` | `Espresso` (Android)

Il driver di automazione da utilizzare. Predefinito a `XCUITest` per iOS e `UiAutomator2` per Android.

### Opzioni Dispositivo

#### `deviceName`

-   **Tipo:** `string`
-   **Obbligatorio:** Sì

Nome del dispositivo, simulator o emulator da utilizzare.

**Esempi:**
-   iOS Simulator: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Android Emulator: `Pixel 7`, `Nexus 5X`
-   Dispositivo reale: Il nome del dispositivo come mostrato nel tuo sistema

#### `udid`

-   **Tipo:** `string`
-   **Obbligatorio:** No (Richiesto per dispositivi iOS reali)

Identificatore Unico Dispositivo. Richiesto per dispositivi iOS reali (identificatore a 40 caratteri) e consigliato per dispositivi reali Android.

**Trovare UDID:**
-   **iOS:** Collega il dispositivo, apri Finder/iTunes, clicca sul dispositivo → Numero di serie (clicca per rivelare UDID)
-   **Android:** Esegui `adb devices` nel terminale

### Opzioni App

#### `appPath`

-   **Tipo:** `string`
-   **Obbligatorio:** No*

Percorso al file dell'applicazione da installare e avviare.

**Formati supportati:**
-   iOS Simulator: directory `.app`
-   iOS Real Device: file `.ipa`
-   Android: file `.apk`

*O deve essere fornito `appPath`, oppure `noReset: true` per connettersi ad un'app già in esecuzione.

#### `appWaitActivity`

-   **Tipo:** `string`
-   **Obbligatorio:** No (Solo Android)

Attività da attendere all'avvio dell'app. Se non specificata, viene utilizzata l'attività principale/launcher dell'app.

**Esempio:** `com.example.app.MainActivity`

### Opzioni Stato Sessione

#### `noReset`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `false`

Preserva lo stato dell'app tra le sessioni. Quando `true`:
-   I dati dell'app sono preservati (stato di login, preferenze, ecc.)
-   La sessione verrà **scollegata** invece di chiusa (mantiene l'app in esecuzione)
-   Utile per testare percorsi utente attraverso più sessioni
-   Può essere usato senza `appPath` per connettersi ad un'app già in esecuzione

#### `fullReset`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`

Reimposta completamente l'app prima della sessione. Quando `true`:
-   iOS: Disinstalla e reinstalla l'app
-   Android: Cancella dati e cache dell'app
-   Utile per iniziare con uno stato pulito

Imposta `fullReset: false` con `noReset: true` per preservare completamente lo stato dell'app.

### Timeout Sessione

#### `newCommandTimeout`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `60`

Per quanto tempo (in secondi) Appium attenderà un nuovo comando prima di presumere che il client abbia chiuso e terminare la sessione. Aumenta questo valore per sessioni di debug più lunghe.

**Esempi:**
-   `60` - Predefinito, adatto per la maggior parte delle automazioni
-   `300` - 5 minuti, per debugging o operazioni più lente
-   `600` - 10 minuti, per test molto lunghi

### Opzioni Gestione Automatica

#### `autoGrantPermissions`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`

Concedi automaticamente i permessi all'app durante l'installazione/avvio. Quando `true`:
-   I permessi di fotocamera, microfono, posizione, ecc. vengono concessi automaticamente
-   Non è necessaria la gestione manuale delle finestre di dialogo dei permessi
-   Semplifica l'automazione evitando i popup di permessi

:::note Solo Android
Questa opzione riguarda principalmente Android. I permessi iOS devono essere gestiti diversamente a causa delle restrizioni di sistema.
:::

#### `autoAcceptAlerts`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`

Accetta automaticamente gli avvisi di sistema (finestre di dialogo) che appaiono durante l'automazione.

**Esempi di avvisi accettati automaticamente:**
-   "Consentire le notifiche?"
-   "L'app vorrebbe accedere alla tua posizione"
-   "Consentire all'app di accedere alle foto?"

#### `autoDismissAlerts`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `false`

Ignora (annulla) gli avvisi di sistema invece di accettarli. Ha la precedenza su `autoAcceptAlerts` quando impostato su `true`.

### Override del Server Appium

Puoi sovrascrivere la connessione al server Appium per ogni singola sessione:

#### `appiumHost`

-   **Tipo:** `string`
-   **Obbligatorio:** No

Hostname del server Appium. Sovrascrive la variabile d'ambiente `APPIUM_URL`.

#### `appiumPort`

-   **Tipo:** `number`
-   **Obbligatorio:** No

Porta del server Appium. Sovrascrive la variabile d'ambiente `APPIUM_URL_PORT`.

#### `appiumPath`

-   **Tipo:** `string`
-   **Obbligatorio:** No

Percorso del server Appium. Sovrascrive la variabile d'ambiente `APPIUM_PATH`.

---

## Opzioni Rilevamento Elementi

Opzioni per lo strumento `get_visible_elements`.

### `elementType`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `interactable`
-   **Valori:** `interactable` | `visual` | `all`

Tipo di elementi da restituire:
-   `interactable`: Pulsanti, link, input e altri elementi cliccabili
-   `visual`: Immagini, SVG ed elementi visivi
-   `all`: Sia elementi interattivi che visivi

### `inViewportOnly`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`

Restituisce solo gli elementi visibili all'interno del viewport corrente. Quando `false`, restituisce tutti gli elementi nella gerarchia di visualizzazione (utile per trovare elementi fuori schermo).

### `includeContainers`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `false`

Includi elementi contenitore/layout nei risultati. Quando `true`:

**Container Android inclusi:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**Container iOS inclusi:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

Utile per il debug dei problemi di layout o per comprendere la gerarchia delle viste.

### `includeBounds`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `false`

Includi limiti/coordinate degli elementi (x, y, larghezza, altezza) nella risposta. Imposta a `true` per:
-   Interazioni basate sulle coordinate
-   Debug del layout
-   Posizionamento di elementi visivi

### Opzioni Paginazione

Per pagine grandi con molti elementi, usa la paginazione per ridurre l'uso di token:

#### `limit`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `0` (illimitato)

Numero massimo di elementi da restituire.

#### `offset`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `0`

Numero di elementi da saltare prima di restituire i risultati.

**Esempio:** Ottieni elementi 21-40:
```
Get visible elements with limit 20 and offset 20
```

---

## Opzioni Albero Accessibilità

Opzioni per lo strumento `get_accessibility` (solo browser).

### `limit`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `100`

Numero massimo di nodi da restituire. Usa `0` per illimitato (non raccomandato per pagine grandi).

### `offset`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `0`

Numero di nodi da saltare per la paginazione.

### `roles`

-   **Tipo:** `string[]`
-   **Obbligatorio:** No
-   **Predefinito:** Tutti i ruoli

Filtra per ruoli di accessibilità specifici.

**Ruoli comuni:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Esempio:** Ottieni solo pulsanti e link:
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`

Restituisce solo i nodi che hanno un nome/etichetta. Filtra i contenitori anonimi e riduce il rumore nei risultati.

---

## Opzioni Screenshot

Opzioni per lo strumento `take_screenshot`.

### `outputPath`

-   **Tipo:** `string`
-   **Obbligatorio:** No

Percorso dove salvare il file screenshot. Se non fornito, restituisce i dati dell'immagine codificati in base64.

### Ottimizzazione Automatica

Gli screenshot vengono automaticamente elaborati per ottimizzare il consumo di LLM:

| Ottimizzazione | Valore | Descrizione |
|--------------|-------|-------------|
| Dimensione massima | 2000px | Immagini più grandi di 2000px vengono ridimensionate |
| Dimensione file massima | 1MB | Le immagini sono compresse per rimanere sotto 1MB |
| Formato | PNG/JPEG | PNG con massima compressione; JPEG se necessario per la dimensione |

Questa ottimizzazione assicura che gli screenshot possano essere elaborati efficientemente senza superare i limiti di token.

---

## Comportamento Sessione

### Tipi di Sessione

Il server MCP tiene traccia dei tipi di sessione per fornire strumenti e comportamenti appropriati:

| Tipo | Descrizione | Auto-Distacco |
|------|-------------|-------------|
| `browser` | Sessione browser Chrome | No |
| `ios` | Sessione app iOS | Sì (se `noReset: true` o nessun `appPath`) |
| `android` | Sessione app Android | Sì (se `noReset: true` o nessun `appPath`) |

### Modello Singola-Sessione

Il server MCP opera con un **modello a singola sessione**:

-   Solo una sessione browser O app può essere attiva alla volta
-   L'avvio di una nuova sessione chiuderà/distaccherà la sessione corrente
-   Lo stato della sessione è mantenuto globalmente tra le chiamate degli strumenti

### Distacco vs Chiusura

| Azione | `detach: false` (Chiusura) | `detach: true` (Distacco) |
|--------|-------------------------|-------------------------|
| Browser | Chiude completamente Chrome | Mantiene Chrome in esecuzione, disconnette WebDriver |
| App Mobile | Termina l'app | Mantiene l'app in esecuzione nello stato attuale |
| Caso d'Uso | Tabula rasa per la prossima sessione | Preserva lo stato, ispezione manuale |

---

## Considerazioni sulle Prestazioni

Il server MCP è ottimizzato per una comunicazione LLM efficiente utilizzando il formato **TOON (Token-Oriented Object Notation)**, che minimizza l'uso di token durante l'invio di dati a Claude.

### Automazione Browser

-   La **modalità headless** è più veloce ma non renderizza elementi visivi
-   **Dimensioni finestra più piccole** riducono il tempo di cattura screenshot
-   Il **rilevamento elementi** è ottimizzato con una singola esecuzione di script
-   L'**ottimizzazione screenshot** mantiene le immagini sotto 1MB per un'elaborazione efficiente
-   **`inViewportOnly: true`** (predefinito) filtra solo gli elementi visibili

### Automazione Mobile

-   L'**analisi XML del sorgente pagina** utilizza solo 2 chiamate HTTP (vs 600+ per le query di elementi tradizionali)
-   I **selettori Accessibility ID** sono i più veloci e affidabili
-   I **selettori XPath** sono i più lenti - da utilizzare solo come ultima risorsa
-   **`inViewportOnly: true`** (predefinito) riduce significativamente il numero di elementi
-   La **paginazione** (`limit` e `offset`) riduce l'utilizzo di token per schermate con molti elementi
-   **`includeBounds: false`** (predefinito) omette i dati delle coordinate se non necessari

### Consigli sull'Utilizzo dei Token

| Impostazione | Impatto |
|---------|--------|
| `inViewportOnly: true` | Filtra elementi fuori schermo, riducendo la dimensione della risposta |
| `includeContainers: false` | Esclude elementi di layout (ViewGroup, ecc.) |
| `includeBounds: false` | Omette dati x/y/larghezza/altezza |
| `limit` con paginazione | Elabora elementi in batch invece che tutti in una volta |
| `namedOnly: true` (accessibilità) | Filtra i nodi anonimi |

---

## Configurazione Server Appium

Prima di utilizzare l'automazione mobile, assicurati che Appium sia configurato correttamente.

### Configurazione Base

```sh
# Installa Appium globalmente
npm install -g appium

# Installa i driver
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Avvia il server
appium
```

### Configurazione Server Personalizzata

```sh
# Avvia con host e porta personalizzati
appium --address 0.0.0.0 --port 4724

# Avvia con logging
appium --log-level debug

# Avvia con percorso base specifico
appium --base-path /wd/hub
```

### Verifica Installazione

```sh
# Controlla i driver installati
appium driver list --installed

# Controlla versione Appium
appium --version

# Testa la connessione
curl http://localhost:4723/status
```

---

## Risoluzione Problemi Configurazione

### Server MCP Non si Avvia

1. Verifica che npm/npx sia installato: `npm --version`
2. Prova ad eseguire manualmente: `npx @wdio/mcp`
3. Controlla i log di Claude Desktop per errori

### Problemi Connessione Appium

1. Verifica che Appium sia in esecuzione: `curl http://localhost:4723/status`
2. Controlla che le variabili d'ambiente corrispondano alle impostazioni del server Appium
3. Assicurati che il firewall consenta le connessioni sulla porta Appium

### La Sessione Non si Avvia

1. **Browser:** Assicurati che Chrome sia installato
2. **iOS:** Verifica che Xcode e i simulatori siano disponibili
3. **Android:** Controlla `ANDROID_HOME` e che l'emulatore sia in esecuzione
4. Rivedi i log del server Appium per messaggi di errore dettagliati

### Timeout Sessione

Se le sessioni vanno in timeout durante il debug:
1. Aumenta `newCommandTimeout` quando avvii la sessione
2. Usa `noReset: true` per preservare lo stato tra le sessioni
3. Usa `detach: true` durante la chiusura per mantenere l'app in esecuzione