---
id: tools
title: Strumenti
description: "Consulta gli strumenti esposti dal server MCP di WebdriverIO per sessioni, navigazione, interazione con gli elementi, screenshot, gesti e ciclo di vita delle app."
---

Il server MCP di WebdriverIO espone 29 strumenti organizzati per funzione. Gli strumenti contrassegnati come **solo browser** richiedono una sessione `platform: "browser"`. Gli strumenti contrassegnati come **solo mobile** richiedono `platform: "ios"` o `platform: "android"`.

## Gestione delle sessioni

### `start_session`

Avvia una nuova sessione di automazione browser o mobile. È consentita una sola sessione attiva alla volta; avviarne una nuova chiude quella esistente.

| Parametro              | Tipo                                                                   | Obbligatorio | Predefinito      | Descrizione                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------- | ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `platform`             | `"browser" \| "ios" \| "android"`                                      | ✓            | —                | Piattaforma della sessione                                                                                                        |
| `provider`             | `"local" \| "browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | —            | `"local"`        | Provider della sessione                                                                                                           |
| `browser`              | `"chrome" \| "firefox" \| "edge" \| "safari"`                          | solo browser | —                | Browser da avviare                                                                                                                |
| `browserVersion`       | string                                                                 | —            | latest           | Versione del browser (solo provider cloud, predefinito: latest)                                                                   |
| `os`                   | string                                                                 | —            | —                | Sistema operativo (solo provider cloud, ad es. `"Windows"`, `"OS X"`)                                                             |
| `osVersion`            | string                                                                 | —            | —                | Versione del sistema operativo (solo provider cloud, ad es. `"11"`, `"Sequoia"`)                                                  |
| `headless`             | boolean                                                                | —            | `true`           | Esegue il browser in modalità headless                                                                                            |
| `windowWidth`          | number                                                                 | —            | `1920`           | Larghezza della finestra del browser (400–3840)                                                                                   |
| `windowHeight`         | number                                                                 | —            | `1080`           | Altezza della finestra del browser (400–2160)                                                                                     |
| `navigationUrl`        | string                                                                 | —            | —                | URL a cui navigare dopo l'avvio                                                                                                   |
| `deviceName`           | string                                                                 | solo mobile  | —                | Nome del dispositivo/emulatore/simulatore                                                                                         |
| `platformVersion`      | string                                                                 | —            | —                | Versione del sistema operativo (ad es. `"17.0"`, `"14"`)                                                                          |
| `appPath`              | string                                                                 | —            | —                | Percorso del file `.app` / `.apk` / `.ipa`                                                                                        |
| `app`                  | string                                                                 | —            | —                | URL dell'app (`bs://...` per BrowserStack, `storage:filename=` per Sauce Labs, `lt://...` per TestMu, app_url di TestingBot) o custom_id |
| `automationName`       | `"XCUITest" \| "UiAutomator2"`                                         | —            | auto             | Driver di automazione                                                                                                             |
| `autoGrantPermissions` | boolean                                                                | —            | `true`           | Concede automaticamente i permessi all'app                                                                                        |
| `autoAcceptAlerts`     | boolean                                                                | —            | `true`           | Accetta automaticamente gli alert                                                                                                 |
| `autoDismissAlerts`    | boolean                                                                | —            | `false`          | Chiude automaticamente gli alert                                                                                                  |
| `appWaitActivity`      | string                                                                 | —            | —                | Activity Android da attendere all'avvio                                                                                           |
| `udid`                 | string                                                                 | —            | —                | UDID del dispositivo iOS reale                                                                                                    |
| `noReset`              | boolean                                                                | —            | —                | Preserva i dati dell'app tra le sessioni                                                                                          |
| `fullReset`            | boolean                                                                | —            | —                | Disinstalla l'app prima/dopo la sessione                                                                                          |
| `newCommandTimeout`    | number                                                                 | —            | `300`            | Timeout dei comandi Appium (secondi)                                                                                              |
| `attach`               | boolean                                                                | —            | `false`          | Si collega a un'istanza Chrome esistente tramite CDP                                                                              |
| `attachConfig`         | object                                                                 | —            | —                | Connessione CDP: `{ port: 9222, host: "localhost" }`                                                                              |
| `appiumConfig`         | object                                                                 | —            | —                | Server Appium: `{ host, port, path }`                                                                                             |
| `tunnel`               | `boolean \| "external"`                                                | —            | `false`          | Instradamento tramite tunnel locale (provider cloud). `true` = avvio automatico, `"external"` = tunnel già in esecuzione esternamente |
| `reporting`            | object                                                                 | —            | —                | Etichette di reporting del provider cloud: `{ project, build, session }`                                                          |
| `trace`                | boolean                                                                | —            | `false`          | Abilita la registrazione delle tracce — produce un file zip `.trace` compatibile con Playwright                                   |
| `region`               | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`                  | —            | `"eu-central-1"` | Regione del data center di Sauce Labs                                                                                             |
| `tunnelName`           | string                                                                 | —            | —                | Nome identificativo del tunnel (obbligatorio per `tunnel: "external"`)                                                            |
| `capabilities`         | object                                                                 | —            | —                | Capability raw aggiuntive da unire                                                                                                |

```js
// Browser Chrome locale
start_session({ platform: "browser", browser: "chrome" })

// Simulatore iOS
start_session({ platform: "ios", deviceName: "iPhone 16", platformVersion: "18.0", appPath: "/path/to/app.app" })

// BrowserStack Android
start_session({ platform: "android", provider: "browserstack", deviceName: "Samsung Galaxy S24", app: "bs://abc123" })

// Sauce Labs iOS
start_session({ platform: "ios", provider: "saucelabs", deviceName: "iPhone 15", platformVersion: "17.0", app: "storage:filename=MyApp.ipa" })

// Browser TestMu
start_session({ platform: "browser", provider: "testmu", browser: "chrome", os: "Windows", osVersion: "11" })

// Browser TestingBot
start_session({ platform: "browser", provider: "testingbot", browser: "chrome", os: "Windows", osVersion: "11" })

// Provider cloud con tunnel
start_session({ platform: "browser", provider: "browserstack", browser: "chrome", tunnel: true })

// Collegamento a Chrome esistente (dopo launch_chrome)
start_session({ platform: "browser", browser: "chrome", attach: true })
```

---

### `close_session`

Chiude la sessione corrente o si scollega da essa.

| Parametro | Tipo    | Obbligatorio | Predefinito | Descrizione                                                          |
| --------- | ------- | ------------ | ----------- | -------------------------------------------------------------------- |
| `detach`  | boolean | —            | `false`     | Si disconnette senza terminare (preserva lo stato dell'app su Appium) |

Le sessioni avviate con `noReset: true` si scollegano automaticamente per impostazione predefinita.

---

### `launch_chrome`

Prepara un'istanza di Chrome con il debug remoto abilitato, in modo che `start_session({ attach: true })` possa connettersi. Due modalità:

- `newInstance` (predefinita): apre Chrome accanto a quello esistente utilizzando una directory del profilo separata; la sessione corrente non viene toccata.
- `freshSession`: avvia Chrome con un profilo vuoto (nessun cookie, nessun login). Usa `copyProfileFiles: true` per trasferire cookie e login.

| Parametro          | Tipo                              | Obbligatorio | Predefinito     | Descrizione                                                                 |
| ------------------ | --------------------------------- | ------------ | --------------- | --------------------------------------------------------------------------- |
| `port`             | number                            | —            | `9222`          | Porta di debug remoto                                                       |
| `mode`             | `"newInstance" \| "freshSession"` | —            | `"newInstance"` | Modalità di avvio                                                           |
| `copyProfileFiles` | boolean                           | —            | `false`         | Copia il profilo Default di Chrome (cookie, login) nella sessione di debug |

Dopo che questo strumento è stato eseguito con successo, chiama `start_session({ platform: "browser", browser: "chrome", attach: true })`.

## Navigazione e schede

### `navigate`

Carica un URL nella scheda corrente e attende l'evento di caricamento della pagina. Reimposta lo stato della pagina (DOM, runtime JS). **Solo browser.**

| Parametro | Tipo   | Obbligatorio | Descrizione                |
| --------- | ------ | ------------ | -------------------------- |
| `url`     | string | ✓            | URL a cui navigare         |

---

### `get_tabs`

Elenca tutte le schede del browser con handle, titolo, URL e quale è attiva. Usalo prima di `switch_tab` per trovare l'handle di destinazione. **Solo browser.**

Nessun parametro.

---

### `switch_tab`

Porta in primo piano una scheda del browser tramite window handle o indice a partire da 0. Tutte le successive chiamate agli strumenti operano sulla scheda appena attivata. **Solo browser.**

| Parametro | Tipo   | Obbligatorio | Descrizione                          |
| --------- | ------ | ------------ | ------------------------------------ |
| `handle`  | string | —            | Window handle a cui passare          |
| `index`   | number | —            | Indice della scheda a partire da 0 (≥ 0) |

Fornisci `handle` oppure `index`. Ottieni gli handle da `get_tabs` o `wdio://session/current/tabs`.

---

### `switch_frame`

Sposta il contesto del frame WebDriver all'interno di un iframe tramite selettore CSS/XPath, oppure torna al livello superiore se il selettore viene omesso. Le modifiche persistono; tutte le successive chiamate a `click_element`, `set_value`, `get_elements` operano all'interno del frame selezionato finché non torni indietro. Attende fino a 5 s per l'iframe. **Solo browser.**

| Parametro  | Tipo   | Obbligatorio | Descrizione                                                                                       |
| ---------- | ------ | ------------ | ------------------------------------------------------------------------------------------------- |
| `selector` | string | —            | Selettore CSS/XPath per l'elemento iframe. Omettilo per tornare al frame di livello superiore.   |

```js
// Passa all'interno di un iframe
switch_frame({ selector: "#my-iframe" })

// Interagisci con gli elementi all'interno dell'iframe
click_element({ selector: "button.submit" })

// Torna al livello superiore
switch_frame()
```

## Interazione con gli elementi

### `click_element`

Attende che un elemento esista, lo scorre nella vista e lo clicca. Funziona su browser e mobile. Su iOS, preferisci `tap_element`; `click_element` a volte viene ignorato dal livello nativo.

| Parametro      | Tipo    | Obbligatorio | Predefinito | Descrizione                                      |
| -------------- | ------- | ------------ | ----------- | ------------------------------------------------ |
| `selector`     | string  | ✓            | —           | Selettore CSS, XPath o di testo                  |
| `scrollToView` | boolean | —            | `true`      | Scorre l'elemento nella vista prima del clic     |
| `timeout`      | number  | —            | —           | Tempo massimo di attesa (ms)                     |

---

### `set_value`

Svuota un input o una textarea e digita il testo indicato. Sostituisce sempre il contenuto esistente.

| Parametro      | Tipo    | Obbligatorio | Predefinito | Descrizione                                           |
| -------------- | ------- | ------------ | ----------- | ----------------------------------------------------- |
| `selector`     | string  | ✓            | —           | Selettore CSS, XPath o di testo                       |
| `value`        | string  | ✓            | —           | Testo da digitare                                     |
| `scrollToView` | boolean | —            | `true`      | Scorre l'elemento nella vista prima della digitazione |
| `timeout`      | number  | —            | —           | Tempo massimo di attesa (ms)                          |

---

### `scroll`

Scorre la pagina di un certo numero di pixel. **Solo browser.** Per il mobile, usa `swipe`.

| Parametro   | Tipo             | Obbligatorio | Predefinito | Descrizione                 |
| ----------- | ---------------- | ------------ | ----------- | --------------------------- |
| `direction` | `"up" \| "down"` | ✓            | —           | Direzione di scorrimento    |
| `pixels`    | number           | —            | `500`       | Pixel da scorrere           |

## Analisi degli elementi

### `get_elements`

Restituisce gli elementi interagibili nella pagina corrente con selettori pronti all'uso. Preferisci la risorsa `wdio://session/current/elements` per una consapevolezza di contesto; usa questo strumento quando hai bisogno di filtri o paginazione.

| Parametro           | Tipo    | Obbligatorio | Predefinito | Descrizione                                         |
| ------------------- | ------- | ------------ | ----------- | --------------------------------------------------- |
| `inViewportOnly`    | boolean | —            | `false`     | Restituisce solo gli elementi visibili nel viewport |
| `includeContainers` | boolean | —            | `false`     | Include gli elementi contenitore (div, section)     |
| `includeBounds`     | boolean | —            | `false`     | Include le coordinate del bounding box              |
| `limit`             | number  | —            | `0`         | Numero massimo di elementi da restituire (0 = illimitato) |
| `offset`            | number  | —            | `0`         | Elementi da saltare (paginazione)                   |

---

### `get_accessibility_tree`

Restituisce l'albero di accessibilità della pagina con ruoli, nomi e selettori. Supporta filtri e paginazione. **Solo browser.**

| Parametro | Tipo     | Obbligatorio | Predefinito | Descrizione                                                      |
| --------- | -------- | ------------ | ----------- | ---------------------------------------------------------------- |
| `limit`   | number   | —            | `0`         | Numero massimo di nodi da restituire (0 = illimitato)            |
| `offset`  | number   | —            | `0`         | Nodi da saltare (paginazione)                                    |
| `roles`   | string[] | —            | —           | Filtra per ruoli ARIA, ad es. `["button", "link", "heading"]`    |

## Screenshot

### `get_screenshot`

Acquisisce uno screenshot della pagina o dello schermo corrente. Restituisce un'immagine codificata in base64, ridimensionata e compressa automaticamente per rimanere entro i limiti di contesto del modello (max 1 MB, max 2000px).

Nessun parametro. Preferisci `wdio://session/current/elements` agli screenshot per l'individuazione degli elementi; è più veloce e utilizza molti meno token. Usa gli screenshot per la verifica visiva o il debug del layout.

## Gestione dei cookie

### `get_cookies`

Restituisce tutti i cookie della sessione corrente, oppure un singolo cookie per nome. **Solo browser.**

| Parametro | Tipo   | Obbligatorio | Descrizione                                               |
| --------- | ------ | ------------ | --------------------------------------------------------- |
| `name`    | string | —            | Nome del cookie. Omettilo per restituire tutti i cookie.  |

---

### `set_cookie`

Imposta un cookie del browser. Il browser deve trovarsi già sul dominio di destinazione — i cookie non possono essere impostati tra domini diversi. Usalo per iniettare token di sessione o feature flag senza passare attraverso i flussi di login. **Solo browser.**

| Parametro  | Tipo                          | Obbligatorio | Descrizione                                           |
| ---------- | ----------------------------- | ------------ | ----------------------------------------------------- |
| `name`     | string                        | ✓            | Nome del cookie                                       |
| `value`    | string                        | ✓            | Valore del cookie                                     |
| `domain`   | string                        | —            | Dominio del cookie (predefinito: dominio corrente)    |
| `path`     | string                        | —            | Percorso del cookie (predefinito: `/`)                |
| `expiry`   | number                        | —            | Scadenza come timestamp Unix (secondi)                |
| `httpOnly` | boolean                       | —            | Flag HttpOnly                                         |
| `secure`   | boolean                       | —            | Flag Secure                                           |
| `sameSite` | `"strict" \| "lax" \| "none"` | —            | Attributo SameSite                                    |

---

### `delete_cookies`

Elimina tutti i cookie o un cookie specifico per nome. **Solo browser.**

| Parametro | Tipo   | Obbligatorio | Descrizione                                                       |
| --------- | ------ | ------------ | ----------------------------------------------------------------- |
| `name`    | string | —            | Nome del cookie da eliminare. Omettilo per eliminare tutti i cookie. |

## Gesti touch (mobile)

### `tap_element`

Chiama `element.tap()` su un elemento individuato oppure esegue un tap su coordinate assolute dello schermo. Usalo su iOS quando `click_element` viene ignorato; il tap è il gesto nativo a cui iOS risponde. **Solo mobile.**

| Parametro  | Tipo   | Obbligatorio | Descrizione                                                  |
| ---------- | ------ | ------------ | ------------------------------------------------------------ |
| `selector` | string | —            | Selettore dell'elemento                                      |
| `x`        | number | —            | Coordinata X per il tap sullo schermo (se non c'è selettore) |
| `y`        | number | —            | Coordinata Y per il tap sullo schermo (se non c'è selettore) |

Fornisci `selector` oppure le coordinate `x`/`y`.

---

### `swipe`

Esegue un gesto di swipe a schermo intero. La direzione è quella del movimento del contenuto (ad es. `"up"` scorre un elenco verso l'alto). Usalo per scorrere oltre i limiti visibili. Per spostare un elemento specifico, usa `drag_and_drop`. **Solo mobile.** Per i browser, usa `scroll`.

| Parametro   | Tipo                                  | Obbligatorio | Predefinito    | Descrizione                                  |
| ----------- | ------------------------------------- | ------------ | -------------- | -------------------------------------------- |
| `direction` | `"up" \| "down" \| "left" \| "right"` | ✓            | —              | Direzione dello swipe                        |
| `duration`  | number                                | —            | `500`          | Durata dello swipe (ms, 100–5000)            |
| `percent`   | number                                | —            | `0.5` / `0.95` | Frazione dello schermo da percorrere (0–1)   |

---

### `drag_and_drop`

Trascina un elemento su un altro elemento o su determinate coordinate. **Solo mobile.**

| Parametro        | Tipo   | Obbligatorio | Predefinito | Descrizione                                         |
| ---------------- | ------ | ------------ | ----------- | --------------------------------------------------- |
| `sourceSelector` | string | ✓            | —           | Elemento di origine da trascinare                   |
| `targetSelector` | string | —            | —           | Elemento di destinazione su cui rilasciare          |
| `x`              | number | —            | —           | Offset X di destinazione (se non c'è targetSelector) |
| `y`              | number | —            | —           | Offset Y di destinazione (se non c'è targetSelector) |
| `duration`       | number | —            | —           | Durata del trascinamento (ms, 100–5000)             |

## Cambio di contesto (mobile)

### `get_contexts`

Restituisce i contesti di automazione disponibili e quello attualmente attivo. Usalo prima di `switch_context` per individuare le destinazioni `NATIVE_APP` e `WEBVIEW_*`. **Solo mobile.**

Nessun parametro.

---

### `switch_context`

Passa tra i contesti di automazione nativo e webview in un'app mobile ibrida. Necessario prima di usare selettori CSS/XPath all'interno di una webview incorporata. **Solo mobile.**

| Parametro | Tipo   | Obbligatorio | Descrizione                                                            |
| --------- | ------ | ------------ | ---------------------------------------------------------------------- |
| `context` | string | ✓            | Nome del contesto, ad es. `"NATIVE_APP"`, `"WEBVIEW_com.example.app"` |

Ottieni i nomi dei contesti disponibili da `get_contexts` o `wdio://session/current/contexts`.

```js
// 1. Verifica cosa è disponibile
get_contexts()
// → { contexts: ["NATIVE_APP", "WEBVIEW_com.example.app"], currentContext: "NATIVE_APP" }

// 2. Passa alla webview per CSS/XPath
switch_context({ context: "WEBVIEW_com.example.app" })

// 3. Interagisci con gli elementi della webview usando selettori CSS
click_element({ selector: "#login-button" })

// 4. Torna al contesto nativo per la UI nativa
switch_context({ context: "NATIVE_APP" })
```

## Controllo del dispositivo (mobile)

### `rotate_device`

Ruota il dispositivo in verticale o in orizzontale e attende che il sistema operativo completi la rotazione. Usalo per testare layout dipendenti dall'orientamento. **Solo mobile.**

| Parametro     | Tipo                        | Obbligatorio | Descrizione                   |
| ------------- | --------------------------- | ------------ | ----------------------------- |
| `orientation` | `"PORTRAIT" \| "LANDSCAPE"` | ✓            | Orientamento di destinazione  |

---

### `hide_keyboard`

Chiude la tastiera software. Chiamalo dopo l'inserimento di testo quando la tastiera copre elementi di cui hai bisogno successivamente. Non ha effetto se la tastiera è già nascosta. **Solo mobile.**

Nessun parametro.

---

### `set_geolocation`

Sovrascrive le coordinate GPS del dispositivo per la sessione. Influisce su `navigator.geolocation` sul web e sui servizi di localizzazione su mobile. I permessi di localizzazione devono essere concessi preventivamente all'app.

| Parametro   | Tipo   | Obbligatorio | Descrizione                |
| ----------- | ------ | ------------ | -------------------------- |
| `latitude`  | number | ✓            | Latitudine (da −90 a 90)   |
| `longitude` | number | ✓            | Longitudine (da −180 a 180) |
| `altitude`  | number | —            | Altitudine in metri        |

## Ciclo di vita dell'app (mobile)

### `get_app_state`

Restituisce lo stato corrente del ciclo di vita di un'app mobile. **Solo mobile.**

| Parametro  | Tipo   | Obbligatorio | Descrizione                                                                 |
| ---------- | ------ | ------------ | --------------------------------------------------------------------------- |
| `bundleId` | string | ✓            | Bundle ID iOS o nome del package Android, ad es. `"com.example.app"`        |

Restituisce uno tra: `not installed`, `not running`, `background (suspended)`, `background`, `foreground`.

## Utilità del browser

### `emulate_device`

Emula un dispositivo mobile o tablet nella sessione browser corrente (imposta viewport, DPR, user-agent, eventi touch). Richiede una sessione con BiDi abilitato: `start_session({ capabilities: { webSocketUrl: true } })`. **Solo browser.**

| Parametro | Tipo   | Obbligatorio | Descrizione                                                                                                                                         |
| --------- | ------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `device`  | string | —            | Nome del preset del dispositivo (ad es. `"iPhone 15"`, `"Pixel 7"`). Omettilo per elencare i preset. Passa `"reset"` per ripristinare le impostazioni desktop predefinite. |

---

### `execute_script`

Esegue JavaScript nel browser o comandi mobile tramite Appium.

| Parametro | Tipo   | Obbligatorio | Descrizione                                                            |
| --------- | ------ | ------------ | ---------------------------------------------------------------------- |
| `script`  | string | ✓            | Codice JS (browser) o comando Appium come `"mobile: pressKey"`         |
| `args`    | any[]  | —            | Argomenti passati allo script o al comando                             |

**Browser:** usa `return` per ottenere i valori.

```javascript
// Ottieni il titolo della pagina
execute_script({ script: "return document.title" })

// Scorri l'elemento nella vista
execute_script({ script: "arguments[0].scrollIntoView()", args: ["#my-element"] })
```

**Mobile (Appium):** usa la sintassi `mobile: <command>`.

```javascript
// Premi il tasto Indietro di Android
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Attiva l'app (iOS/Android)
execute_script({ script: "mobile: activateApp", args: [{ bundleId: "com.example.app" }] })

// Deep link (iOS)
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://route", bundleId: "com.example.app" }] })
```

## Provider cloud

### `list_apps`

Elenca le app caricate su un provider cloud (BrowserStack App Automate, Sauce Labs App Storage, TestMu o TestingBot Storage). Legge le credenziali specifiche del provider dall'ambiente.

| Parametro          | Tipo                                                        | Obbligatorio | Predefinito      | Descrizione                                                  |
| ------------------ | ----------------------------------------------------------- | ------------ | ---------------- | ------------------------------------------------------------ |
| `provider`         | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓            | —                | Provider cloud                                               |
| `sortBy`           | `"app_name" \| "uploaded_at"`                               | —            | `"uploaded_at"`  | Ordinamento                                                  |
| `organizationWide` | boolean                                                     | —            | `false`          | (Solo BrowserStack) Elenca tutti i caricamenti dell'organizzazione |
| `limit`            | number                                                      | —            | `20`             | Numero massimo di risultati                                  |
| `region`           | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —            | `"eu-central-1"` | Regione di Sauce Labs                                        |

```js
// Elenca per tutti e quattro i provider
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs", region: "us-west-1" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

---

### `upload_app`

Carica un file `.apk` o `.ipa` locale su un provider cloud (BrowserStack, Sauce Labs, TestMu o TestingBot). Restituisce l'URL dell'app da usare in `start_session`.

| Parametro  | Tipo                                                        | Obbligatorio | Predefinito      | Descrizione                                                   |
| ---------- | ----------------------------------------------------------- | ------------ | ---------------- | ------------------------------------------------------------- |
| `provider` | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓            | —                | Provider cloud                                                |
| `path`     | string                                                      | ✓            | —                | Percorso assoluto del file `.apk` o `.ipa`                    |
| `customId` | string                                                      | —            | —                | ID personalizzato opzionale per fare riferimento all'app in seguito |
| `region`   | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —            | `"eu-central-1"` | Regione di Sauce Labs                                         |

```js
// Carica su ciascun provider
upload_app({ provider: "browserstack", path: "/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", region: "us-west-1" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```