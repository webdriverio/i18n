---
id: browser
title: L'oggetto Browser
---

__Estende:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

L'oggetto browser è l'istanza di sessione che utilizzi per controllare il browser o il dispositivo mobile. Se utilizzi il test runner WDIO, puoi accedere all'istanza WebDriver tramite l'oggetto globale `browser` o `driver` oppure importarla utilizzando [`@wdio/globals`](/docs/api/globals). Se utilizzi WebdriverIO in modalità standalone, l'oggetto browser viene restituito dal metodo [`remote`](/docs/api/modules#remoteoptions-modifier).

La sessione viene inizializzata dal test runner. Lo stesso vale per la chiusura della sessione, anch'essa eseguita dal processo del test runner.

## Proprietà

Un oggetto browser ha le seguenti proprietà:

| Nome | Tipo | Dettagli |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Capabilities assegnate dal server remoto.<br /><b>Esempio:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Capabilities richieste al server remoto.<br /><b>Esempio:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | ID di sessione assegnato dal server remoto. |
| `options` | `Object` | [Opzioni](/docs/configuration) di WebdriverIO a seconda di come è stato creato l'oggetto browser. Vedi altri [tipi di configurazione](/docs/setuptypes). |
| `commandList` | `String[]` | Un elenco di comandi registrati nell'istanza del browser |
| `isChrome` | `Boolean` | Indica se si tratta di un'istanza Chrome |
| `isFirefox` | `Boolean` | Indica se si tratta di un'istanza Firefox |
| `isBidi` | `Boolean` | Indica se questa sessione utilizza Bidi |
| `isSauce` | `Boolean` | Indica se questa sessione è in esecuzione su Sauce Labs |
| `isMacApp` | `Boolean` | Indica se questa sessione è in esecuzione per un'App Mac nativa |
| `isWindowsApp` | `Boolean` | Indica se questa sessione è in esecuzione per un'App Windows nativa |
| `isMobile` | `Boolean` | Indica una sessione mobile. Vedi di più in [Flag Mobile](#mobile-flags). |
| `isIOS` | `Boolean` | Indica una sessione iOS. Vedi di più in [Flag Mobile](#mobile-flags). |
| `isAndroid` | `Boolean` | Indica una sessione Android. Vedi di più in [Flag Mobile](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Indica se il dispositivo mobile è nel contesto `NATIVE_APP`. Vedi di più in [Flag Mobile](#mobile-flags). |
| `mobileContext` | `string`  | Fornisce il contesto **attuale** in cui si trova il driver, ad esempio `NATIVE_APP`, `WEBVIEW_<packageName>` per Android o `WEBVIEW_<pid>` per iOS. Risparmia una chiamata WebDriver aggiuntiva a `driver.getContext()`. Vedi di più in [Flag Mobile](#mobile-flags). |


## Metodi

In base al backend di automazione utilizzato per la tua sessione, WebdriverIO identifica quali [Comandi di Protocollo](/docs/api/protocols) verranno associati all'[oggetto browser](/docs/api/browser). Ad esempio, se esegui una sessione automatizzata in Chrome, avrai accesso a comandi specifici di Chromium come [`elementHover`](/docs/api/chromium#elementhover) ma non a nessuno dei [comandi Appium](/docs/api/appium).

Inoltre, WebdriverIO fornisce un insieme di metodi pratici di cui si consiglia l'uso per interagire con il [browser](/docs/api/browser) o con gli [elementi](/docs/api/element) della pagina.

In aggiunta a ciò, sono disponibili i seguenti comandi:

| Nome | Parametri | Dettagli |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Consente di definire comandi personalizzati che possono essere chiamati dall'oggetto browser a scopo di composizione. Leggi di più nella guida [Comandi Personalizzati](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Consente di sovrascrivere qualsiasi comando del browser con funzionalità personalizzate. Usalo con attenzione perché può confondere gli utenti del framework. Leggi di più nella guida [Comandi Personalizzati](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Consente di definire una strategia di selezione personalizzata, leggi di più nella guida [Selettori](/docs/selectors#custom-selector-strategies). |

## Note

### Flag Mobile

Se hai bisogno di modificare il tuo test in base al fatto che la sessione venga eseguita o meno su un dispositivo mobile, puoi accedere ai flag mobile per verificarlo.

Ad esempio, data questa configurazione:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

Puoi accedere a questi flag nel tuo test in questo modo:

```js
// Nota: `driver` è l'equivalente dell'oggetto `browser` ma semanticamente più corretto
// puoi scegliere quale variabile globale vuoi utilizzare
console.log(driver.isMobile) // outputs: true
console.log(driver.isIOS) // outputs: true
console.log(driver.isAndroid) // outputs: false
```

Questo può essere utile se, ad esempio, vuoi definire i selettori nei tuoi [page object](../pageobjects) in base al tipo di dispositivo, in questo modo:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

Puoi anche usare questi flag per eseguire solo determinati test per determinati tipi di dispositivi:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // esegui il test solo con dispositivi Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Eventi
L'oggetto browser è un EventEmitter e alcuni eventi vengono emessi per i tuoi casi d'uso.

Ecco un elenco di eventi. Tieni presente che questo non è ancora l'elenco completo degli eventi disponibili.
Sentiti libero di contribuire all'aggiornamento del documento aggiungendo qui le descrizioni di altri eventi.

#### `command`

Questo evento viene emesso ogni volta che WebdriverIO invia un comando WebDriver Classic. Contiene le seguenti informazioni:

- `command`: il nome del comando, ad es. `navigateTo`
- `method`: il metodo HTTP utilizzato per inviare la richiesta del comando, ad es. `POST`
- `endpoint`: l'endpoint del comando, ad es. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: il payload del comando, ad es. `{ url: 'https://webdriver.io' }`

#### `result`

Questo evento viene emesso ogni volta che WebdriverIO riceve il risultato di un comando WebDriver Classic. Contiene le stesse informazioni dell'evento `command` con l'aggiunta delle seguenti informazioni:

- `result`: il risultato del comando

#### `bidiCommand`

Questo evento viene emesso ogni volta che WebdriverIO invia un comando WebDriver Bidi al driver del browser. Contiene informazioni su:

- `method`: metodo del comando WebDriver Bidi
- `params`: parametro del comando associato (vedi [API](/docs/api/webdriverBidi))

#### `bidiResult`

In caso di esecuzione del comando riuscita, il payload dell'evento sarà:

- `type`: `success`
- `id`: l'id del comando
- `result`: il risultato del comando (vedi [API](/docs/api/webdriverBidi))

In caso di errore del comando, il payload dell'evento sarà:

- `type`: `error`
- `id`: l'id del comando
- `error`: il codice di errore, ad es. `invalid argument`
- `message`: dettagli sull'errore
- `stacktrace`: uno stack trace

#### `request.start`
Questo evento viene attivato prima che una richiesta WebDriver venga inviata al driver. Contiene informazioni sulla richiesta e sul suo payload.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Questo evento viene attivato quando la richiesta al driver ha ricevuto una risposta. L'oggetto evento contiene il corpo della risposta come risultato oppure un errore se il comando WebDriver non è riuscito.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
L'evento retry può notificarti quando WebdriverIO tenta di rieseguire il comando, ad es. a causa di un problema di rete. Contiene informazioni sull'errore che ha causato il nuovo tentativo e sul numero di tentativi già effettuati.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Questo è un evento per misurare le operazioni a livello WebDriver. Ogni volta che WebdriverIO invia una richiesta al backend WebDriver, questo evento verrà emesso con alcune informazioni utili:

- `durationMillisecond`: Durata della richiesta in millisecondi.
- `error`: Oggetto Error se la richiesta non è riuscita.
- `request`: Oggetto Request. Puoi trovare url, metodo, header, ecc.
- `retryCount`: Se è `0`, la richiesta era il primo tentativo. Aumenterà quando WebDriverIO effettua nuovi tentativi internamente.
- `success`: Boolean che indica se la richiesta è riuscita o meno. Se è `false`, verrà fornita anche la proprietà `error`.

Un esempio di evento:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Comandi Personalizzati

Puoi impostare comandi personalizzati nello scope del browser per astrarre flussi di lavoro di uso comune. Consulta la nostra guida sui [Comandi Personalizzati](/docs/customcommands#adding-custom-commands) per maggiori informazioni.