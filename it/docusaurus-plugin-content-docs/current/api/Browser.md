---
id: browser
title: L'Oggetto Browser
---

__Estende:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

L'oggetto browser è l'istanza della sessione che utilizzi per controllare il browser o il dispositivo mobile. Se utilizzi il test runner WDIO, puoi accedere all'istanza WebDriver attraverso l'oggetto globale `browser` o `driver` oppure importarlo utilizzando [`@wdio/globals`](/docs/api/globals). Se utilizzi WebdriverIO in modalità standalone, l'oggetto browser viene restituito dal metodo [`remote`](/docs/api/modules#remoteoptions-modifier).

La sessione viene inizializzata dal test runner. Lo stesso vale per la chiusura della sessione. Anche questo viene fatto dal processo del test runner.

## Proprietà

Un oggetto browser ha le seguenti proprietà:

| Nome | Tipo | Dettagli |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Capacità assegnate dal server remoto.<br /><b>Esempio:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Capacità richieste dal server remoto.<br /><b>Esempio:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | ID sessione assegnato dal server remoto. |
| `options` | `Object` | [Opzioni](/docs/configuration) di WebdriverIO a seconda di come è stato creato l'oggetto browser. Vedi [tipi di configurazione](/docs/setuptypes). |
| `commandList` | `String[]` | Un elenco di comandi registrati nell'istanza del browser |
| `isW3C` | `Boolean` | Indica se questa è una sessione W3C |
| `isChrome` | `Boolean` | Indica se questa è un'istanza Chrome |
| `isFirefox` | `Boolean` | Indica se questa è un'istanza Firefox |
| `isBidi` | `Boolean` | Indica se questa sessione utilizza Bidi |
| `isSauce` | `Boolean` | Indica se questa sessione è in esecuzione su Sauce Labs |
| `isMacApp` | `Boolean` | Indica se questa sessione è in esecuzione per un'app nativa Mac |
| `isWindowsApp` | `Boolean` | Indica se questa sessione è in esecuzione per un'app nativa Windows |
| `isMobile` | `Boolean` | Indica una sessione mobile. Vedi maggiori dettagli in [Flag Mobile](#mobile-flags). |
| `isIOS` | `Boolean` | Indica una sessione iOS. Vedi maggiori dettagli in [Flag Mobile](#mobile-flags). |
| `isAndroid` | `Boolean` | Indica una sessione Android. Vedi maggiori dettagli in [Flag Mobile](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Indica se il dispositivo mobile è nel contesto `NATIVE_APP`. Vedi maggiori dettagli in [Flag Mobile](#mobile-flags). |
| `mobileContext` | `string`  | Fornisce il contesto **attuale** in cui si trova il driver, ad esempio `NATIVE_APP`, `WEBVIEW_<packageName>` per Android o `WEBVIEW_<pid>` per iOS. Risparmia una chiamata WebDriver in più a `driver.getContext()`. Vedi maggiori dettagli in [Flag Mobile](#mobile-flags). |


## Metodi

In base al backend di automazione utilizzato per la sessione, WebdriverIO identifica quali [Comandi di Protocollo](/docs/api/protocols) saranno collegati all'[oggetto browser](/docs/api/browser). Ad esempio, se esegui una sessione automatizzata in Chrome, avrai accesso ai comandi specifici di Chromium come [`elementHover`](/docs/api/chromium#elementhover) ma non a nessuno dei [comandi Appium](/docs/api/appium).

Inoltre, WebdriverIO fornisce una serie di metodi utili che sono consigliati per interagire con il [browser](/docs/api/browser) o gli [elementi](/docs/api/element) nella pagina.

In aggiunta, sono disponibili i seguenti comandi:

| Nome | Parametri | Dettagli |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Permette di definire comandi personalizzati che possono essere chiamati dall'oggetto browser per scopi di composizione. Leggi di più nella guida ai [Comandi Personalizzati](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Permette di sovrascrivere qualsiasi comando del browser con funzionalità personalizzate. Usa con cautela poiché può confondere gli utenti del framework. Leggi di più nella guida ai [Comandi Personalizzati](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Permette di definire una strategia di selezione personalizzata, leggi di più nella guida ai [Selettori](/docs/selectors#custom-selector-strategies). |

## Note

### Flag Mobile

Se hai bisogno di modificare il tuo test in base al fatto che la sessione sia in esecuzione su un dispositivo mobile o meno, puoi accedere ai flag mobili per controllare.

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
// puoi scegliere quale variabile globale utilizzare
console.log(driver.isMobile) // restituisce: true
console.log(driver.isIOS) // restituisce: true
console.log(driver.isAndroid) // restituisce: false
```

Questo può essere utile, ad esempio, se vuoi definire selettori nei tuoi [page objects](../pageobjects) in base al tipo di dispositivo, come questo:

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

Puoi anche utilizzare questi flag per eseguire solo determinati test per determinati tipi di dispositivi:

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
L'oggetto browser è un EventEmitter e vengono emessi diversi eventi per i tuoi casi d'uso.

Ecco un elenco di eventi. Tieni presente che questo non è ancora l'elenco completo degli eventi disponibili.
Sentiti libero di contribuire ad aggiornare il documento aggiungendo descrizioni di altri eventi qui.

#### `command`

Questo evento viene emesso ogni volta che WebdriverIO invia un comando WebDriver Classic. Contiene le seguenti informazioni:

- `command`: il nome del comando, ad es. `navigateTo`
- `method`: il metodo HTTP utilizzato per inviare la richiesta di comando, ad es. `POST`
- `endpoint`: l'endpoint del comando, ad es. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: il payload del comando, ad es. `{ url: 'https://webdriver.io' }`

#### `result`

Questo evento viene emesso ogni volta che WebdriverIO riceve un risultato di un comando WebDriver Classic. Contiene le stesse informazioni dell'evento `command` con l'aggiunta delle seguenti informazioni:

- `result`: il risultato del comando

#### `bidiCommand`

Questo evento viene emesso ogni volta che WebdriverIO invia un comando WebDriver Bidi al driver del browser. Contiene informazioni su:

- `method`: metodo del comando WebDriver Bidi
- `params`: parametro del comando associato (vedi [API](/docs/api/webdriverBidi))

#### `bidiResult`

In caso di esecuzione del comando con successo, il payload dell'evento sarà:

- `type`: `success`
- `id`: l'id del comando
- `result`: il risultato del comando (vedi [API](/docs/api/webdriverBidi))

In caso di errore del comando, il payload dell'evento sarà:

- `type`: `error`
- `id`: l'id del comando
- `error`: il codice di errore, ad es. `invalid argument`
- `message`: dettagli sull'errore
- `stacktrace`: una traccia dello stack

#### `request.start`
Questo evento viene emesso prima che una richiesta WebDriver venga inviata al driver. Contiene informazioni sulla richiesta e sul suo payload.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Questo evento viene emesso una volta che la richiesta al driver ha ricevuto una risposta. L'oggetto evento contiene il corpo della risposta come risultato o un errore se il comando WebDriver è fallito.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
L'evento di ripetizione può notificarti quando WebdriverIO tenta di riprovare a eseguire il comando, ad es. a causa di un problema di rete. Contiene informazioni sull'errore che ha causato il nuovo tentativo e sul numero di tentativi già effettuati.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Questo è un evento per misurare le operazioni a livello WebDriver. Ogni volta che WebdriverIO invia una richiesta al backend WebDriver, questo evento verrà emesso con alcune informazioni utili:

- `durationMillisecond`: Durata della richiesta in millisecondi.
- `error`: Oggetto errore se la richiesta è fallita.
- `request`: Oggetto richiesta. Puoi trovare url, metodo, intestazioni, ecc.
- `retryCount`: Se è `0`, la richiesta è stata il primo tentativo. Aumenta quando WebDriverIO riprova automaticamente.
- `success`: Booleano che rappresenta se la richiesta è riuscita o meno. Se è `false`, verrà fornita anche la proprietà `error`.

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

Puoi impostare comandi personalizzati nell'ambito del browser per astrarre i flussi di lavoro che sono comunemente utilizzati. Consulta la nostra guida sui [Comandi Personalizzati](/docs/customcommands#adding-custom-commands) per ulteriori informazioni.