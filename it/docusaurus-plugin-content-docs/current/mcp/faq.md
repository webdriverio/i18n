---
id: faq
title: FAQ
description: "Trova le risposte alle domande più comuni sull'installazione, l'utilizzo e la risoluzione dei problemi del server WebdriverIO MCP per l'automazione di browser e dispositivi mobili."
---

Domande frequenti su WebdriverIO MCP.

## Generale

### Che cos'è MCP?

MCP (Model Context Protocol) è un protocollo aperto che consente agli assistenti AI come Claude di interagire con strumenti e servizi esterni. WebdriverIO MCP implementa questo protocollo per fornire funzionalità di automazione di browser e dispositivi mobili a Claude Desktop e Claude Code.

### Cosa posso automatizzare con WebdriverIO MCP?

Puoi automatizzare:
-   **Browser desktop** (Chrome, Firefox, Edge, Safari) - navigazione, clic, digitazione, screenshot
-   **App iOS** - su simulatori o dispositivi reali
-   **App Android** - su emulatori o dispositivi reali
-   **App ibride** - passando dal contesto nativo a quello web e viceversa
-   **Dispositivi cloud** - tramite i cloud di dispositivi BrowserStack, Sauce Labs, TestMu e TestingBot

### Devo scrivere codice?

No! Questo è il principale vantaggio di MCP. Puoi descrivere ciò che vuoi fare in linguaggio naturale e Claude utilizzerà gli strumenti appropriati per portare a termine l'attività.

**Esempi di prompt:**
-   "Apri Chrome e vai su webdriver.io"
-   "Fai clic sul pulsante Get Started"
-   "Fai uno screenshot della pagina corrente"
-   "Avvia la mia app iOS ed effettua l'accesso come utente di test"

## Installazione e configurazione

### Come installo WebdriverIO MCP?

Non è necessario installarlo separatamente. Il server MCP viene eseguito automaticamente tramite npx quando lo configuri nel tuo harness. Aggiungi questo alla tua configurazione:

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

No. L'automazione del browser richiede solo che il browser di destinazione sia installato. WebdriverIO gestisce automaticamente i driver.

### Ho bisogno di Appium per l'automazione mobile?

Sì. L'automazione mobile richiede:
1. Il server Appium in esecuzione (`npm install -g appium && appium`)
2. I driver della piattaforma installati (`appium driver install xcuitest` per iOS, `appium driver install uiautomator2` per Android)
3. Gli strumenti di sviluppo appropriati (Xcode per iOS, Android SDK per Android)

## Automazione del browser

### Quali browser sono supportati?

Chrome, Firefox, Edge e Safari sono tutti supportati. Usa il parametro `browser` in `start_session`:

```text
"Start a Firefox session"
"Start Chrome in headless mode"
```

### Posso eseguire il browser in modalità headless?

Sì. La modalità headless è quella predefinita (`headless: true`). Chiedi a Claude di eseguirlo in modalità headed se vuoi vedere il browser:

"Avvia Chrome in modalità headed (non headless)"

### Posso impostare la dimensione della finestra del browser?

Sì. Puoi specificare le dimensioni all'avvio del browser:

"Avvia Chrome con una dimensione della finestra di 1920x1080"

Dimensioni supportate: da 400 a 3840 pixel di larghezza, da 400 a 2160 pixel di altezza. Il valore predefinito è 1920×1080.

### Posso avviare il browser e navigare in un solo passaggio?

Sì! Usa il parametro `navigationUrl`:

"Avvia Chrome e vai su https://webdriver.io"

Questo è più efficiente rispetto ad avviare il browser e poi navigare separatamente.

### Come faccio gli screenshot?

Basta chiedere:

"Fai uno screenshot della pagina corrente"

Gli screenshot vengono ottimizzati automaticamente:
- Ridimensionati a una dimensione massima di 2000px
- Compressi a una dimensione massima del file di 1MB
- Formato: PNG o JPEG (selezionato automaticamente per una qualità ottimale)

### Posso interagire con gli iframe?

Sì. Usa lo strumento `switch_frame` per passare a un iframe tramite selettore CSS o XPath. Tutte le successive chiamate a `click_element`, `set_value` e `get_elements` operano all'interno del frame selezionato. Ometti il selettore per tornare al frame di primo livello. Gli iframe devono avere la stessa origine della pagina principale.

### Posso eseguire JavaScript personalizzato?

Sì! Usa lo strumento `execute_script`:

"Esegui uno script per ottenere il titolo della pagina"
"Esegui lo script: return document.querySelectorAll('button').length"

### Posso collegarmi a una sessione di Chrome esistente?

Sì. Usa prima `launch_chrome` (apre Chrome con il debug remoto), poi `start_session` con `attach: true`.

"Avvia Chrome con il debug remoto, poi collegati"

### Posso lavorare con più schede?

Sì. Usa `get_tabs` per elencare le schede aperte e `switch_tab` per portarne in primo piano una specifica:

"Ottieni tutte le schede aperte"
"Passa alla scheda all'indice 1"

## Automazione mobile

### Come avvio una sessione iOS o Android?

Usa `start_session` con la piattaforma appropriata:

"Avvia la mia app iOS situata in /path/to/MyApp.app sul simulatore iPhone 15"

"Avvia la mia app Android in /path/to/app.apk sull'emulatore Pixel 7"

Oppure, per un'app già installata:

"Avvia l'app con noReset abilitato sul simulatore iPhone 15"

### Posso testare su dispositivi reali?

Sì! Per i dispositivi reali avrai bisogno dell'UDID del dispositivo:

-   **iOS:** Collega il dispositivo, apri il Finder, fai clic sul dispositivo, fai clic sul numero di serie per visualizzare l'UDID
-   **Android:** Esegui `adb devices` nel terminale

Poi chiedi:

"Avvia la mia app iOS sul dispositivo reale con UDID abc123..."

### Come gestisco le finestre di dialogo dei permessi?

Per impostazione predefinita, i permessi vengono concessi automaticamente (`autoGrantPermissions: true`). Se devi testare i flussi dei permessi, puoi disabilitare questa opzione:

"Avvia la mia app senza concedere automaticamente i permessi"

### Quali gesti sono supportati?

-   **Tap:** Tocca elementi o coordinate (`tap_element`)
-   **Swipe:** Scorri verso l'alto, il basso, sinistra o destra (`swipe`)
-   **Drag and Drop:** Trascina da un elemento a un altro o verso delle coordinate (`drag_and_drop`)

Nota: `long_press` è disponibile tramite `execute_script` con i comandi mobile di Appium.

### Come scorro nelle app mobile?

Usa i gesti di swipe:

"Scorri verso l'alto per scendere"
"Scorri verso il basso per salire"

### Posso ruotare il dispositivo?

Sì:

"Ruota il dispositivo in orizzontale"
"Ruota il dispositivo in verticale"

### Come gestisco le app ibride?

Per le app con webview, puoi cambiare contesto:

"Ottieni i contesti disponibili"
"Passa al contesto webview"
"Torna al contesto nativo"

### Posso eseguire i comandi mobile di Appium?

Sì! Usa lo strumento `execute_script`:

```text
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Premi BACK su Android
Execute script "mobile: activateApp" with args [{ bundleId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

## Selezione degli elementi

### Come fa l'assistente AI a sapere con quale elemento interagire?

Utilizza la risorsa `wdio://session/current/elements` o lo strumento `get_elements` per identificare gli elementi interattivi nella pagina/schermata. Ogni elemento viene fornito con selettori pronti all'uso.

### Cosa succede se ci sono troppi elementi nella pagina?

Usa la paginazione per gestire elenchi di elementi di grandi dimensioni:

"Ottieni i primi 20 elementi"
"Ottieni gli elementi con offset 20 e limit 20"

La risposta include `total`, `showing` e `hasMore` per aiutarti a navigare tra gli elementi.

### Cosa succede se Claude fa clic sull'elemento sbagliato?

Puoi essere più specifico:

-   Fornisci il testo esatto: "Fai clic sul pulsante con la scritta 'Submit Order'"
-   Fornisci il selettore: "Fai clic sull'elemento con selettore #submit-btn"
-   Fornisci l'accessibility ID: "Fai clic sull'elemento con accessibility ID loginButton"

### Qual è la migliore strategia di selezione per il mobile?

1. **Accessibility ID** (la migliore) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (ultima risorsa) - più lento ma funziona ovunque

### Che cos'è l'albero di accessibilità e quando dovrei usarlo?

L'albero di accessibilità fornisce informazioni semantiche sugli elementi della pagina (ruoli, nomi, stati). Usa `get_accessibility_tree` quando:
- `get_elements` non restituisce gli elementi previsti
- Devi trovare elementi in base al ruolo di accessibilità (button, link, textbox, ecc.)
- Ti servono informazioni semantiche dettagliate sugli elementi

"Ottieni l'albero di accessibilità filtrato per i ruoli button e link"

## Gestione delle sessioni

### Posso avere più sessioni contemporaneamente?

No. Il server MCP utilizza un modello a sessione singola. Può essere attiva una sola sessione di browser o app alla volta.

### Cosa succede quando chiudo una sessione?

Dipende dal tipo di sessione e dalle impostazioni:

-   **Browser:** Il browser si chiude completamente
-   **Mobile con `noReset: false`:** L'app viene terminata
-   **Mobile con `noReset: true` o senza `appPath`:** L'app rimane aperta (la sessione si scollega automaticamente)

### Posso preservare lo stato dell'app tra una sessione e l'altra?

Sì! Usa l'opzione `noReset`:

"Avvia la mia app con noReset abilitato"

Questo preserva lo stato di accesso, le preferenze e gli altri dati dell'app.

### Qual è la differenza tra chiudere e scollegare?

-   **Chiudere:** Termina completamente il browser/l'app
-   **Scollegare:** Disconnette l'automazione ma mantiene in esecuzione il browser/l'app

Scollegare è utile quando vuoi ispezionare manualmente lo stato dopo l'automazione.

### La mia sessione continua ad andare in timeout durante il debug

Aumenta il timeout dei comandi:

"Avvia la mia app con newCommandTimeout di 300 secondi"

Il valore predefinito è 300 secondi. Per sessioni di debug molto lunghe, prova 600 secondi.

## Risoluzione dei problemi

### Errore "Session not found"

Significa che non esiste alcuna sessione attiva. Avvia prima una sessione di browser o app:

"Avvia Chrome e vai su google.com"

### Errore "Element not found"

L'elemento potrebbe non essere visibile o potrebbe avere un selettore diverso. Prova a:

1. Chiedere a Claude di ottenere prima tutti gli elementi visibili
2. Fornire un selettore più specifico
3. Attendere che la pagina/app sia completamente caricata
4. Usare `inViewportOnly: false` per trovare gli elementi fuori dallo schermo

### Il browser non si avvia

1. Assicurati che il browser di destinazione sia installato
2. Verifica se un altro processo sta usando la porta di debug (9222)
3. Prova la modalità headless

### Connessione ad Appium non riuscita

Questo è il problema più comune all'avvio dell'automazione mobile.

1. **Verifica che Appium sia in esecuzione**: `curl http://localhost:4723/status`
2. Avvia Appium se necessario: `appium`
3. Controlla che la connessione ad Appium corrisponda al server (usa `appiumConfig` in `start_session`)
4. Assicurati che i driver siano installati: `appium driver list --installed`

:::tip
Il server MCP richiede che Appium sia in esecuzione prima di avviare le sessioni mobile. Assicurati di avviare prima Appium:
```sh
appium
```
Le versioni future potrebbero includere la gestione automatica del servizio Appium.
:::

### Il simulatore iOS non si avvia

1. Assicurati che Xcode sia installato: `xcode-select --install`
2. Elenca i simulatori disponibili: `xcrun simctl list devices`
3. Cerca errori specifici del simulatore in Console.app

### L'emulatore Android non si avvia

1. Imposta `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Controlla gli emulatori: `emulator -list-avds`
3. Avvia l'emulatore manualmente: `emulator -avd <avd-name>`
4. Verifica che il dispositivo sia connesso: `adb devices`

### Gli screenshot non funzionano

1. Per il mobile, assicurati che la sessione sia attiva
2. Per il browser, prova una pagina diversa (alcune pagine bloccano gli screenshot)
3. Controlla i log di Claude Desktop per eventuali errori

Gli screenshot vengono compressi automaticamente a un massimo di 1MB, quindi gli screenshot di grandi dimensioni funzioneranno ma potrebbero avere una qualità inferiore.

## Prestazioni

### Perché l'automazione mobile è lenta?

L'automazione mobile comporta:
1. Comunicazione di rete con il server Appium
2. Comunicazione di Appium con il dispositivo/simulatore
3. Rendering e risposta del dispositivo

Suggerimenti per un'automazione più veloce:
-   Usa emulatori/simulatori invece di dispositivi reali durante lo sviluppo
-   Usa gli accessibility ID invece di XPath
-   Abilita `inViewportOnly: true` per il rilevamento degli elementi
-   Usa la paginazione (`limit`) per ridurre l'uso di token

### Come posso velocizzare il rilevamento degli elementi?

Il server MCP ottimizza già il rilevamento degli elementi tramite il parsing del sorgente XML della pagina (2 chiamate HTTP contro oltre 600 per le query tradizionali sugli elementi). Ulteriori suggerimenti:

-   Imposta `inViewportOnly: true` per filtrare gli elementi fuori dallo schermo
-   Imposta `includeContainers: false` (predefinito)
-   Usa `limit` e `offset` per la paginazione su schermate di grandi dimensioni
-   Usa selettori specifici invece di cercare tutti gli elementi

### Gli screenshot sono lenti o non riescono

Gli screenshot vengono ottimizzati automaticamente:
- Ridimensionati se superano i 2000px
- Compressi per restare sotto 1MB
- Convertiti in JPEG se il PNG è troppo grande

Questa ottimizzazione riduce i tempi di elaborazione e garantisce che Claude possa gestire l'immagine.

## Limitazioni

### Quali sono le limitazioni attuali?

-   **Sessione singola:** Un solo browser/app alla volta
-   **Supporto iframe:** Gli iframe con la stessa origine sono supportati tramite `switch_frame`; gli iframe cross-origin non sono accessibili a causa delle restrizioni di sicurezza del browser
-   **Upload di file:** Non supportati direttamente tramite gli strumenti
-   **Audio/Video:** Non è possibile interagire con la riproduzione multimediale
-   **Estensioni del browser:** Non supportate

### Posso usarlo per i test in produzione?

WebdriverIO MCP è progettato per l'automazione interattiva assistita dall'AI. Per i test CI/CD in produzione, valuta l'utilizzo del test runner tradizionale di WebdriverIO con pieno controllo programmatico.

## Sicurezza

### I miei dati sono al sicuro?

Il server MCP viene eseguito localmente sulla tua macchina. Tutta l'automazione avviene tramite connessioni locali al browser/Appium. Nessun dato viene inviato a server esterni oltre a quelli verso cui navighi esplicitamente.

Quando si utilizza la modalità di trasporto HTTP (`--http`), il server per impostazione predefinita accetta solo connessioni da `localhost`; usa `--allowedHosts` e `--allowedOrigins` per controllare l'accesso. Consulta [Transport](./transport) per i dettagli.

### Claude può accedere alle mie password?

Claude può vedere il contenuto della pagina e interagire con gli elementi, ma:
-   Le password nei campi `<input type="password">` sono mascherate
-   Dovresti evitare di automatizzare credenziali sensibili
-   Usa account di test per l'automazione

## Contribuire

### Come posso contribuire?

Visita il [repository GitHub](https://github.com/webdriverio/mcp) per:
-   Segnalare bug
-   Richiedere funzionalità
-   Inviare pull request

### Dove posso ottenere aiuto?

-   [WebdriverIO Discord](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [Documentazione di WebdriverIO](https://webdriver.io/)