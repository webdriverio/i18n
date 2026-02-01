---
id: faq
title: FAQ
---

Domande frequenti su WebdriverIO MCP.

## Generale

### Cos'è MCP?

MCP (Model Context Protocol) è un protocollo aperto che permette agli assistenti AI come Claude di interagire con strumenti e servizi esterni. WebdriverIO MCP implementa questo protocollo per fornire capacità di automazione di browser e dispositivi mobili a Claude Desktop e Claude Code.

### Cosa posso automatizzare con WebdriverIO MCP?

Puoi automatizzare:
-   **Browser desktop** (Chrome) - navigazione, clic, digitazione, screenshot
-   **App iOS** - su simulatori o dispositivi reali
-   **App Android** - su emulatori o dispositivi reali
-   **App ibride** - passaggio tra contesti nativi e web

### Devo scrivere codice?

No! Questo è il principale vantaggio di MCP. Puoi descrivere ciò che vuoi fare in linguaggio naturale, e Claude userà gli strumenti appropriati per svolgere il compito.

**Esempi di prompt:**
-   "Apri Chrome e naviga su webdriver.io"
-   "Clicca sul pulsante Get Started"
-   "Fai uno screenshot della pagina attuale"
-   "Avvia la mia app iOS e accedi come utente di test"

---

## Installazione e Configurazione

### Come installo WebdriverIO MCP?

Non è necessario installarlo separatamente. Il server MCP viene eseguito automaticamente tramite npx quando lo configuri in Claude Desktop o Claude Code.

Aggiungi questo alla configurazione di Claude Desktop:

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

### Dove si trova il file di configurazione di Claude Desktop?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Ho bisogno di Appium per l'automazione del browser?

No. L'automazione del browser richiede solo che Chrome sia installato. WebdriverIO gestisce automaticamente ChromeDriver.

### Ho bisogno di Appium per l'automazione mobile?

Sì. L'automazione mobile richiede:
1. Server Appium in esecuzione (`npm install -g appium && appium`)
2. Driver di piattaforma installati (`appium driver install xcuitest` per iOS, `appium driver install uiautomator2` per Android)
3. Strumenti di sviluppo appropriati (Xcode per iOS, Android SDK per Android)

---

## Automazione del Browser

### Quali browser sono supportati?

Attualmente, è supportato solo **Chrome**. Il supporto per altri browser potrebbe essere aggiunto nelle versioni future.

### Posso eseguire Chrome in modalità headless?

Sì! Chiedi a Claude di avviare il browser in modalità headless:

"Avvia Chrome in modalità headless"

Oppure Claude userà questa opzione quando appropriato (ad es. in contesti CI/CD).

### Posso impostare le dimensioni della finestra del browser?

Sì. Puoi specificare le dimensioni quando avvii il browser:

"Avvia Chrome con una dimensione della finestra di 1920x1080"

Dimensioni supportate: larghezza da 400 a 3840 pixel, altezza da 400 a 2160 pixel. Il valore predefinito è 1920x1080.

### Posso avviare il browser e navigare in un unico passaggio?

Sì! Usa il parametro `navigationUrl`:

"Avvia Chrome e naviga su https://webdriver.io"

Questo è più efficiente che avviare il browser e poi navigare separatamente.

### Come faccio a fare screenshot?

Basta chiedere a Claude:

"Fai uno screenshot della pagina attuale"

Gli screenshot vengono automaticamente ottimizzati:
- Ridimensionati a una dimensione massima di 2000px
- Compressi a una dimensione massima di 1MB
- Formato: PNG o JPEG (selezionato automaticamente per qualità ottimale)

### Posso interagire con gli iframe?

Attualmente, il server MCP opera sul documento principale. L'interazione con gli iframe potrebbe essere aggiunta nelle versioni future.

### Posso eseguire JavaScript personalizzato?

Sì! Usa lo strumento `execute_script`:

"Esegui script per ottenere il titolo della pagina"
"Esegui script: return document.querySelectorAll('button').length"

---

## Automazione Mobile

### Come avvio un'app iOS?

Chiedi a Claude con i dettagli necessari:

"Avvia la mia app iOS situata in /path/to/MyApp.app sul simulatore iPhone 15"

Oppure per un'app installata:

"Avvia l'app con noReset abilitato sul simulatore iPhone 15"

### Come avvio un'app Android?

"Avvia la mia app Android in /path/to/app.apk sull'emulatore Pixel 7"

Oppure per un'app installata:

"Avvia l'app con noReset abilitato sull'emulatore Pixel 7"

### Posso testare su dispositivi reali?

Sì! Per i dispositivi reali, avrai bisogno dell'UDID del dispositivo:

-   **iOS:** Collega il dispositivo, apri Finder, clicca sul dispositivo, clicca sul numero di serie per visualizzare l'UDID
-   **Android:** Esegui `adb devices` nel terminale

Quindi chiedi a Claude:

"Avvia la mia app iOS sul dispositivo reale con UDID abc123..."

### Come gestisco le finestre di dialogo per i permessi?

Per impostazione predefinita, i permessi vengono concessi automaticamente (`autoGrantPermissions: true`). Se hai bisogno di testare i flussi di autorizzazione, puoi disabilitare questa funzione:

"Avvia la mia app senza concedere automaticamente i permessi"

### Quali gesti sono supportati?

-   **Tap:** Tocca elementi o coordinate
-   **Swipe:** Scorri verso l'alto, il basso, sinistra o destra
-   **Drag and Drop:** Trascina da un elemento a un altro o a coordinate

Nota: `long_press` è disponibile tramite `execute_script` con i comandi mobile di Appium.

### Come faccio a scorrere nelle app mobili?

Usa i gesti di scorrimento:

"Scorri verso l'alto per scorrere verso il basso"
"Scorri verso il basso per scorrere verso l'alto"

### Posso ruotare il dispositivo?

Sì:

"Ruota il dispositivo in orizzontale"
"Ruota il dispositivo in verticale"

### Come gestisco le app ibride?

Per le app con webview, puoi cambiare contesto:

"Ottieni i contesti disponibili"
"Passa al contesto webview"
"Torna al contesto nativo"

### Posso eseguire comandi mobile di Appium?

Sì! Usa lo strumento `execute_script`:

```
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Premi BACK su Android
Execute script "mobile: activateApp" with args [{ appId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

---

## Selezione degli Elementi

### Come fa Claude a sapere con quale elemento interagire?

Claude usa lo strumento `get_visible_elements` per identificare elementi interattivi nella pagina/schermata. Ogni elemento viene fornito con diverse strategie di selezione.

### Cosa succede se ci sono troppi elementi nella pagina?

Usa la paginazione per gestire grandi liste di elementi:

"Ottieni i primi 20 elementi visibili"
"Ottieni elementi visibili con offset 20 e limite 20"

La risposta include `total`, `showing` e `hasMore` per aiutarti a navigare tra gli elementi.

### Posso ottenere solo tipi specifici di elementi?

Sì! Usa il parametro `elementType`:

-   `interactable` (predefinito): Pulsanti, link, campi di input
-   `visual`: Immagini, SVG
-   `all`: Entrambi i tipi

"Ottieni elementi visivi visibili nella pagina"

### Cosa faccio se Claude clicca sull'elemento sbagliato?

Puoi essere più specifico:

-   Fornisci il testo esatto: "Clicca sul pulsante che dice 'Invia Ordine'"
-   Fornisci il selettore: "Clicca sull'elemento con selettore #submit-btn"
-   Fornisci l'ID di accessibilità: "Clicca sull'elemento con accessibility ID loginButton"

### Qual è la migliore strategia di selezione per dispositivi mobili?

1. **Accessibility ID** (migliore) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (ultima risorsa) - più lento ma funziona ovunque

### Cos'è l'albero di accessibilità e quando dovrei usarlo?

L'albero di accessibilità fornisce informazioni semantiche sugli elementi della pagina (ruoli, nomi, stati). Usa `get_accessibility` quando:
- `get_visible_elements` non restituisce gli elementi previsti
- Hai bisogno di trovare elementi per ruolo di accessibilità (button, link, textbox, ecc.)
- Hai bisogno di informazioni semantiche dettagliate sugli elementi

"Ottieni l'albero di accessibilità filtrato per i ruoli button e link"

---

## Gestione delle Sessioni

### Posso avere più sessioni contemporaneamente?

No. Il server MCP utilizza un modello a sessione singola. Solo una sessione di browser o app può essere attiva alla volta.

### Cosa succede quando chiudo una sessione?

Dipende dal tipo di sessione e dalle impostazioni:

-   **Browser:** Chrome si chiude completamente
-   **Mobile con `noReset: false`:** L'app si chiude
-   **Mobile con `noReset: true` o senza `appPath`:** L'app rimane aperta (la sessione si distacca automaticamente)

### Posso preservare lo stato dell'app tra le sessioni?

Sì! Usa l'opzione `noReset`:

"Avvia la mia app con noReset abilitato"

Questo preserva lo stato di login, le preferenze e altri dati dell'app.

### Qual è la differenza tra chiudere e distaccare?

-   **Chiudere:** Termina completamente il browser/app
-   **Distaccare:** Disconnette l'automazione ma mantiene il browser/app in esecuzione

Distaccare è utile quando vuoi ispezionare manualmente lo stato dopo l'automazione.

### La mia sessione continua a scadere durante il debug

Aumenta il timeout dei comandi:

"Avvia la mia app con newCommandTimeout di 300 secondi"

Il valore predefinito è 60 secondi. Per sessioni di debug lunghe, prova 300-600 secondi.

---

## Risoluzione dei Problemi

### Errore "Session not found"

Questo significa che non esiste una sessione attiva. Avvia prima una sessione di browser o app:

"Avvia Chrome e naviga su google.com"

### Errore "Element not found"

L'elemento potrebbe non essere visibile o potrebbe avere un selettore diverso. Prova:

1. Chiedere prima a Claude di ottenere tutti gli elementi visibili
2. Fornire un selettore più specifico
3. Aspettare che la pagina/app si carichi completamente
4. Usare `inViewportOnly: false` per trovare elementi fuori dallo schermo

### Il browser non si avvia

1. Assicurati che Chrome sia installato
2. Controlla se un altro processo sta utilizzando la porta di debug (9222)
3. Prova la modalità headless

### Connessione Appium fallita

Questo è il problema più comune quando si avvia l'automazione mobile.

1. **Verifica che Appium sia in esecuzione**: `curl http://localhost:4723/status`
2. Avvia Appium se necessario: `appium`
3. Controlla che la configurazione dell'URL di Appium corrisponda al server
4. Assicurati che i driver siano installati: `appium driver list --installed`

:::tip
Il server MCP richiede che Appium sia in esecuzione prima di avviare sessioni mobili. Assicurati di avviare prima Appium:
```sh
appium
```
Le versioni future potrebbero includere la gestione automatica del servizio Appium.
:::

### Il simulatore iOS non si avvia

1. Assicurati che Xcode sia installato: `xcode-select --install`
2. Elenca i simulatori disponibili: `xcrun simctl list devices`
3. Controlla errori specifici del simulatore in Console.app

### L'emulatore Android non si avvia

1. Imposta `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Controlla gli emulatori: `emulator -list-avds`
3. Avvia manualmente l'emulatore: `emulator -avd <avd-name>`
4. Verifica che il dispositivo sia connesso: `adb devices`

### Gli screenshot non funzionano

1. Per dispositivi mobili, assicurati che la sessione sia attiva
2. Per il browser, prova una pagina diversa (alcune pagine bloccano gli screenshot)
3. Controlla i log di Claude Desktop per errori

Gli screenshot vengono compressi automaticamente a max 1MB, quindi screenshot grandi funzioneranno ma potrebbero avere qualità inferiore.

---

## Prestazioni

### Perché l'automazione mobile è lenta?

L'automazione mobile coinvolge:
1. Comunicazione di rete con il server Appium
2. Appium che comunica con il dispositivo/simulatore
3. Rendering e risposta del dispositivo

Suggerimenti per un'automazione più veloce:
-   Usa emulatori/simulatori invece di dispositivi reali per lo sviluppo
-   Usa accessibility ID invece di XPath
-   Abilita `inViewportOnly: true` per il rilevamento degli elementi
-   Usa la paginazione (`limit`) per ridurre l'utilizzo di token

### Come posso velocizzare il rilevamento degli elementi?

Il server MCP ottimizza già il rilevamento degli elementi utilizzando l'analisi XML della sorgente della pagina (2 chiamate HTTP invece di 600+ per le query tradizionali di elementi). Ulteriori suggerimenti:

-   Mantieni `inViewportOnly: true` (predefinito)
-   Imposta `includeContainers: false` (predefinito)
-   Usa `limit` e `offset` per la paginazione su schermi grandi
-   Usa selettori specifici invece di trovare tutti gli elementi

### Gli screenshot sono lenti o falliscono

Gli screenshot vengono automaticamente ottimizzati:
- Ridimensionati se più grandi di 2000px
- Compressi per rimanere sotto 1MB
- Convertiti in JPEG se PNG è troppo grande

Questa ottimizzazione riduce il tempo di elaborazione e garantisce che Claude possa gestire l'immagine.

---

## Limitazioni

### Quali sono le limitazioni attuali?

-   **Sessione singola:** Solo un browser/app alla volta
-   **Supporto browser:** Solo Chrome (per ora)
-   **Supporto iframe:** Supporto limitato per gli iframe
-   **Caricamento file:** Non supportato direttamente tramite strumenti
-   **Audio/Video:** Non può interagire con la riproduzione multimediale
-   **Estensioni del browser:** Non supportate

### Posso usarlo per test di produzione?

WebdriverIO MCP è progettato per l'automazione interattiva assistita dall'IA. Per i test CI/CD di produzione, considera l'utilizzo del test runner tradizionale di WebdriverIO con pieno controllo programmatico.

---

## Sicurezza

### I miei dati sono sicuri?

Il server MCP viene eseguito localmente sulla tua macchina. Tutta l'automazione avviene tramite connessioni locali di browser/Appium. Nessun dato viene inviato a server esterni oltre a ciò a cui navighi esplicitamente.

### Claude può accedere alle mie password?

Claude può vedere il contenuto della pagina e interagire con gli elementi, ma:
-   Le password nei campi `<input type="password">` sono mascherate
-   Dovresti evitare di automatizzare credenziali sensibili
-   Usa account di test per l'automazione

---

## Contribuire

### Come posso contribuire?

Visita il [repository GitHub](https://github.com/webdriverio/mcp) per:
-   Segnalare bug
-   Richiedere funzionalità
-   Inviare pull request

### Dove posso ottenere aiuto?

-   [Discord WebdriverIO](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [Documentazione WebdriverIO](https://webdriver.io/)