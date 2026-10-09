---
id: targets
title: Target delle sessioni
description: Apri un browser, un'app mobile, un'app desktop, un'app Electron o un dispositivo cloud con wdio session.
---

`wdio session open` avvia la sessione. Il primo argomento è il target. Riutilizza la sessione `default`. Passa `-s <name>` solo quando ti servono due sessioni contemporaneamente. Esegui prima `npx wdio session doctor <target>` quando il target richiede Appium, un driver desktop o credenziali cloud.

I player di Chrome, Android ed Electron pilotano la stessa [app demo di WebdriverIO](https://github.com/webdriverio/native-demo-app) (la guinea pig Expo, tag `v2.2.0`). Chrome ed Electron usano un server web Expo locale in una normale finestra desktop. Android installa l'[apk della release v2.2.0](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). iOS installa l'app per simulatore v2.2.0 (`org.wdiodemoapp`) e usa `touchId`. Ogni player digita il comando, poi la finestra mostra il risultato. Metti in pausa, o passa al comando precedente o successivo, per leggere la riga che ha modificato la finestra.

Il percorso comune è: apri l'app, accedi come `alice@webdriver.io` / `supersecret`, raggiungi il logo del robot ("You found me!!!"), poi completa il puzzle da 9 pezzi. Chrome ed Electron impostano anche una posizione e un orario notturno nella vista Weather, aprono la WebView interna all'app con la homepage di WebdriverIO e trascinano il carosello. Il player Android scorre la schermata nativa di swipe fino a quel robot. `export` scrive una spec Mocha della sessione che hai appena pilotato.

<a id="postcard"></a>

## Browser

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome si apre in modalità headless. Aggiungi `--headed` per mostrare la finestra. Chrome, Firefox ed Edge vengono scaricati al primo utilizzo se non sono installati. Safari richiede macOS.

### User agent in modalità headless

Chrome ed Edge headless si identificano come `HeadlessChrome/<version>` nello user agent. Una finestra visibile dello stesso browser invia `Chrome/<version>`. Molti siti rifiutano le richieste con il token headless: Akamai risponde "Access Denied" e Cloudflare mostra "Just a moment...". Decidono in base alla richiesta, prima che venga eseguito qualsiasi script della pagina. Un agente vedrebbe quindi una pagina di blocco che una persona che apre lo stesso sito non riceve mai.

Una sessione headless di Chrome o Edge invia quindi lo user agent che invierebbe una finestra visibile dello stesso browser. Questo cambia solo il token. Non nasconde l'automazione:

- `navigator.webdriver` resta `true`.
- I marcatori propri di chromedriver sono ancora presenti nella pagina.
- I siti che verificano l'automazione la rilevano comunque.

Mentre lo user agent è sovrascritto, Chrome non invia alcun user agent client hint, quindi `navigator.userAgentData.brands` è vuoto. La sovrascrittura richiede WebDriver BiDi, quindi una sessione aperta con `--no-bidi` mantiene lo user agent headless.

Per inviare uno user agent specifico, passalo come argomento del browser. La sessione allora non tocca lo user agent:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

Se un sito mostra ancora un controllo anti-bot, prova una finestra visibile con `--headed`. Se anche quella viene bloccata, il sito non lascia entrare i browser automatizzati. Segnalalo invece di cercare di aggirare il controllo.

Una finestra di Chrome in modalità headed mantiene la barra delle schede e la barra degli indirizzi, ed è così che la distingui da una finestra Electron. `--viewport 1280x800` è una normale pagina del browser. Sul web l'app usa una barra laterale a sinistra. Il logo di WebdriverIO si trova in cima a quella barra laterale. Le voci sono Home, Weather, Web, Login, Forms, Swipe, Drag, Perms e Data. La schermata iniziale elenca browser e desktop accanto a iOS e Android.

Weather legge `navigator.geolocation` e `Date`. `geolocation 35.6762 139.6503` è Tokyo. Si applica al caricamento successivo, quindi esegui `reload` prima di `click "aria/Weather"`. Il widget mostra quindi Tokyo, 21° e pioggia. `emulate clock 2026-06-21T23:30:00Z` cambia la stessa card da un cielo diurno a un cielo notturno e imposta l'orologio alle 11:30 PM. Un secondo `emulate clock` sostituisce il primo.

La scheda WebView carica `https://webdriver.io/` all'interno dell'app. Il login attende circa 1,5 secondi, poi apre una finestra di dialogo il cui testo è `Success` e `You are logged in!`. Il pulsante LOGIN resta un controllo arancione di 200×50 mentre quell'attesa è sullo schermo. `dialog accept` chiude la finestra di dialogo. `swipe` è solo per mobile. Trascina `[data-testid=Carousel]` su `aria/Next card` due volte per scorrere le pagine del carosello. La build web registrata ascolta `pointerup` su `document`, quindi il trascinamento può iniziare sul carosello e il puntatore può essere rilasciato su `Next card`, che si trova fuori dal carosello. `scroll down --px 560` porta in vista il robot di WebdriverIO. La didascalia sotto di esso è "You found me!!!". I pezzi del puzzle vanno da `aria/drag-l2` a `aria/drag-l3`, rilasciati sul target `aria/drop-…` corrispondente. L'ordine nel vassoio è `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3`.

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

Ripeti `drag` per `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` e `l3`.

<SessionTarget id="browser" />

`--viewport 1280x720` imposta la dimensione iniziale. `--arg` aggiunge un argomento del browser e può essere ripetuto. `--profile <dir>` mantiene un profilo tra un'apertura e l'altra.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android e iOS

Android e iOS funzionano tramite Appium 3. `doctor android` segnala un server o un driver mancante insieme al comando di installazione.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Un pacchetto Android già installato usa `--package` e `--activity`. Il web mobile usa `--browser chrome` o `--browser safari` invece di un'app. `--appium-url http://127.0.0.1:4723/` si collega a un server già in esecuzione. Un URL di app cloud come `bs://…` viene passato così com'è come `--app` e non viene trattato come file locale.

<a id="native-boarding-pass"></a>

### App demo nativa

Su un emulatore o un dispositivo la stessa guinea pig è l'apk v2.2.0:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` attende fino a otto minuti. UiAutomator2 installa un server e avvia la strumentazione prima che l'app sia utilizzabile, e questo è più lento dell'avvio di un browser. La prima richiesta non viene ritentata: un nuovo tentativo avvierebbe una seconda sessione Appium sullo stesso dispositivo mentre la prima è ancora in fase di installazione. `tap "~Login"`, `fill`, poi `tap "~button-LOGIN"` effettua il login con la stessa email e password. Su uno schermo corto il pulsante LOGIN si trova sotto la parte visibile, quindi scorri `~Login-screen` prima di quel tap. `dialog accept` chiude l'avviso di successo, e deve essere eseguito dopo che quell'avviso è sullo schermo. Il testo dell'avviso è `Success` / `You are logged in!`.

Il pulsante dell'impronta digitale è `~button-biometric`. È presente nel modulo di login solo dopo che è stata registrata un'impronta, quindi questo player non lo tocca. `exec -e "await browser.fingerPrint(1)"` risponde alla richiesta di sistema (`fingerPrint` è solo per Android; non esiste un sottocomando `wdio session` per esso).

`tap "~Webview"` è la WebView interna all'app con `https://webdriver.io/`. Su un emulatore software con una sola CPU il renderer della WebView muore con `SIGTRAP` in `libmonochrome` dopo l'etichetta LOADING, e la pagina non viene mai disegnata. Il player non tocca quella scheda.

`tap "~Swipe"` apre il carosello. `swipe left` non ne scorre le pagine: il carosello è `react-native-reanimated-carousel`, e uno swipe UIAutomator torna indietro alla prima card. Un `exec` di `mobile: swipeGesture` sulla scroll view, ripetuto, è ciò che fa comparire il robot e la didascalia "You found me!!!". Uno `swipe up` a schermo intero dal bordo inferiore apre invece l'interfaccia di screenshot di Android. `drag "~drag-l2" "~drop-l2"` (e le altre otto coppie, nell'ordine del vassoio) completa il puzzle. L'ultimo fotogramma è il robot assemblato con il controllo per riprovare.

`-s android` mantiene questa sessione accanto a quella del browser. Ometti `-s android` quando è l'unica sessione. `open` usa il pacchetto e l'activity già installati dall'apk, con `--no-reset` in modo che un'impronta registrata resti. `"~Login"` è l'etichetta di accessibilità della scheda. `wait` non si applica a una sessione nativa.

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

Ripeti `drag` per `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` e `l3`.

<SessionTarget id="android" />

### Simulatore iOS

Le stesse schermate sono presenti nella build per simulatore v2.2.0, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). Decomprimila e installa `wdiodemoapp.app` su un simulatore avviato (`xcrun simctl install booted`). Il bundle id è `org.wdiodemoapp`. Quel binario è un'app per iPhone Simulator (arm64, iOS 15.1 o successivo). Richiede macOS e Xcode. In questa pagina non c'è un player iOS.

Login, swipe e drag usano le stesse etichette di accessibilità di Android. `swipe left` non è stato eseguito sul simulatore. Sull'apk Android non scorre le pagine di questo carosello. La chiamata biometrica è `browser.touchId(true)`, non `fingerPrint`. `touchId` richiede la capability `appium:allowTouchIdEnroll` impostata a `true` (passala con `--capabilities`). Registra Touch ID sul simulatore prima di aprire il modulo di login, altrimenti il pulsante biometrico resta nascosto.

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

Ripeti `drag` per gli altri otto pezzi, nello stesso ordine del vassoio di Android.

## App desktop

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` richiede macOS. `windows` richiede Windows. `--app Root` si collega al desktop. Un'app Windows installata si indica con il suo application id, ad esempio `--app Microsoft.WindowsCalculator`. Un percorso o un `.exe` viene risolto come file.

<a id="launch-console"></a>

## Electron, Tauri e Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` e `open dioxus ./my-app` richiedono il loro driver nel `PATH`, a meno che non sia il pacchetto del servizio ad avviare la sessione. Su Linux senza `DISPLAY` o `WAYLAND_DISPLAY`, installa Xvfb o weston. Electron resta sul protocollo WebDriver classico. Passa `--app-arg` per inoltrare un flag all'app, incluso `--app-arg=--no-sandbox` quando l'ambiente lo richiede. Un valore che inizia con `-` deve usare `=`, perché altrimenti il parser rigoroso lo tratta come un'opzione a sé.

Installa `electron` e `@wdio/electron-service` nella directory che apri. `main.js` usa `import`, quindi il `package.json` di quella directory deve contenere `"type": "module"` (oppure chiama il file `main.mjs`). Dimensiona la finestra in base all'area di lavoro, in modo che su un display più piccolo la barra del titolo non finisca fuori dallo schermo:

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

Il comando open qui sotto non disabilita la sandbox del renderer. Aggiungi `--app-arg=--no-sandbox` solo quando l'ambiente non riesce ad avviare Electron con la sandbox, come in alcuni container Linux. Il player Electron carica lo stesso URL Expo in una finestra di 1280×800 senza barra degli indirizzi. Il logo, la barra laterale, la card del meteo, la card di login, il carosello e il puzzle corrispondono a quelli del browser. `-s electron` è il nome della sessione usato accanto alla demo del browser. Electron resta sul protocollo classico, quindi `geolocation` ed `emulate clock` passano per Chromedriver invece che per BiDi. I comandi corrispondono a quelli di Chrome, incluso `reload` prima di Weather, tranne la finestra di dialogo di successo. Su Linux, `dialog accept` accetta l'avviso nativo e il fumetto resta disegnato. Quel fumetto non fa parte della pagina, quindi un clic successivo non può raggiungerlo. La registrazione sostituisce `window.alert` con una finestra di dialogo nella pagina ed esegue `click "aria/OK"`. Il pulsante LOGIN resta un controllo arancione di 200×50 durante l'attesa. Il carosello, lo scorrimento e il puzzle usano gli stessi comandi di Chrome.

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

Ripeti `drag` per `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` e `l3`.

<SessionTarget id="electron" />

## Dispositivi cloud

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` può essere `browserstack`, `saucelabs`, `testingbot` o `testmu`. Esporta lo username e l'access key del provider. `doctor <provider>` verifica che siano impostati e non ne stampa i valori. `--tunnel` avvia il tunnel del provider quando l'app sotto test si trova sulla tua macchina.

## Una configurazione WebdriverIO

`open` può accettare un file di configurazione e un indice di capability invece del nome di un target:

```sh
npx wdio session open ./wdio.conf.ts 0
```

Una configurazione TypeScript viene caricata con `tsx` quando il tuo progetto lo include. `tsx` è facoltativo: senza di esso la configurazione viene caricata tramite il type stripping di Node o jiti, e una configurazione che non riesce a caricarsi segnala `MISSING_DEPENDENCY` con una riga di installazione.

`--hostname`, `--port`, `--path` e `--protocol` indirizzano la sessione verso un endpoint WebDriver già in esecuzione. Chiudere la sessione non arresta quell'endpoint.

## Risoluzione dei problemi

| Messaggio | Cosa fare |
| --- | --- |
| `MISSING_DEPENDENCY` | Installa il pacchetto indicato nell'errore. `doctor <target>` stampa la stessa riga di installazione. Electron richiede `@wdio/electron-service` ed `electron` nella directory che apri. |
| `MISSING_APPIUM_DRIVER` | Esegui la riga `npx appium driver install …` riportata nell'errore. |
| `MISSING_BINARY` | Metti il driver indicato (`tauri-driver` o `wdio-dioxus-driver`) nel `PATH`. |
| `MISSING_CREDENTIALS` | Esporta le variabili indicate nell'errore. |
| `NOT_SUPPORTED` | `macos` è solo per macOS e `windows` è solo per Windows. `swipe` è solo per mobile. Su Chrome ed Electron, trascina `[data-testid=Carousel]` su `aria/Next card`. |
| `No dialog open.` | L'avviso non è aperto. Su Android, attendi che l'avviso di successo sia visibile prima di `dialog accept`. Su Electron per Linux il fumetto nativo può restare disegnato dopo `acceptAlert` e segnalare comunque che non c'è alcuna finestra di dialogo. Il player usa invece una finestra di dialogo nella pagina e `click "aria/OK"`. |
| `The instrumentation process cannot be initialized` | UiAutomator2 non ha iniziato ad ascoltare in tempo. La sessione concede 240s per quell'avvio, dopo un massimo di 180s per installare il server. Su un emulatore software, una CPU e una skin 720×1280 portano l'apk v2.2.0 fino alla schermata iniziale. Un'immagine 1080×2400 con due CPU causa un ANR di `system_server` e il server non si mette mai in ascolto. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | Il client ha rinunciato mentre Appium stava ancora creando la sessione. Android e iOS attendono 480s per quella prima richiesta e non la inviano di nuovo. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` è per le sessioni browser. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` è la chiamata per Android. iOS usa `browser.touchId`. |
| `App not found:` | Passa il percorso di un apk esistente, oppure usa `--package` e `--activity` per un'app già installata. |
| `Pass --package <id>.` | `deeplink` richiede `--package` su Android. |

## Passaggi successivi

- [Snapshot e ref](/docs/session/snapshots) — leggi lo schermo dopo `open`
- [Comandi](/docs/session-commands) — tutti i flag di `open`
- [wdio session](/docs/session) — il ciclo predefinito