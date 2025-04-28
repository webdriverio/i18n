---
id: browser
title: Browser-Objektet
---

__Extends:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Browser-objektet är sessionsinstansen du använder för att kontrollera webbläsaren eller mobilenheten. Om du använder WDIO-testverktyget kan du komma åt WebDriver-instansen genom det globala `browser`- eller `driver`-objektet eller importera det med [`@wdio/globals`](/docs/api/globals). Om du använder WebdriverIO i fristående läge returneras browser-objektet av [`remote`](/docs/api/modules#remoteoptions-modifier)-metoden.

Sessionen initieras av testverktyget. Detsamma gäller för att avsluta sessionen. Detta görs också av testverktygsprocessen.

## Egenskaper

Ett browser-objekt har följande egenskaper:

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Tilldelade funktioner från fjärrservern.<br /><b>Exempel:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Funktioner som begärts från fjärrservern.<br /><b>Exempel:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Sessions-id tilldelat från fjärrservern. |
| `options` | `Object` | WebdriverIO [alternativ](/docs/configuration) beroende på hur browser-objektet skapades. Se mer [installationstyper](/docs/setuptypes). |
| `commandList` | `String[]` | En lista med kommandon registrerade i browser-instansen |
| `isW3C` | `Boolean` | Anger om detta är en W3C-session |
| `isChrome` | `Boolean` | Anger om detta är en Chrome-instans |
| `isFirefox` | `Boolean` | Anger om detta är en Firefox-instans |
| `isBidi` | `Boolean` | Anger om denna session använder Bidi |
| `isSauce` | `Boolean` | Anger om denna session körs på Sauce Labs |
| `isMacApp` | `Boolean` | Anger om denna session körs för en nativ Mac-applikation |
| `isWindowsApp` | `Boolean` | Anger om denna session körs för en nativ Windows-applikation |
| `isMobile` | `Boolean` | Anger en mobil session. Se mer under [Mobila flaggor](#mobile-flags). |
| `isIOS` | `Boolean` | Anger en iOS-session. Se mer under [Mobila flaggor](#mobile-flags). |
| `isAndroid` | `Boolean` | Anger en Android-session. Se mer under [Mobila flaggor](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Anger om mobilen är i `NATIVE_APP`-kontext. Se mer under [Mobila flaggor](#mobile-flags). |
| `mobileContext` | `string`  | Detta ger den **aktuella** kontexten som drivrutinen befinner sig i, till exempel `NATIVE_APP`, `WEBVIEW_<packageName>` för Android eller `WEBVIEW_<pid>` för iOS. Det sparar en extra WebDriver till `driver.getContext()`. Se mer under [Mobila flaggor](#mobile-flags). |


## Metoder

Baserat på vilken automatiseringsbackend som används för din session identifierar WebdriverIO vilka [protokollkommandon](/docs/api/protocols) som ska kopplas till [browser-objektet](/docs/api/browser). Om du till exempel kör en automatiserad session i Chrome kommer du att ha tillgång till Chromium-specifika kommandon som [`elementHover`](/docs/api/chromium#elementhover) men inte till några av [Appium-kommandona](/docs/api/appium).

Dessutom tillhandahåller WebdriverIO en uppsättning praktiska metoder som rekommenderas att använda för att interagera med [webbläsaren](/docs/api/browser) eller [element](/docs/api/element) på sidan.

Utöver detta är följande kommandon tillgängliga:

| Namn | Parametrar | Detaljer |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Tillåter att definiera anpassade kommandon som kan anropas från browser-objektet för sammansättningsändamål. Läs mer i guiden [Anpassade kommandon](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Tillåter att skriva över vilket webbläsarkommando som helst med anpassad funktionalitet. Använd försiktigt eftersom det kan förvirra ramverkets användare. Läs mer i guiden [Anpassade kommandon](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Tillåter att definiera en anpassad väljastrategi, läs mer i guiden [Väljare](/docs/selectors#custom-selector-strategies). |

## Anmärkningar

### Mobila flaggor

Om du behöver ändra ditt test baserat på om din session körs på en mobil enhet kan du använda de mobila flaggorna för att kontrollera.

Till exempel, med denna konfiguration:

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

Du kan komma åt dessa flaggor i ditt test så här:

```js
// Observera: `driver` är ekvivalent med `browser`-objektet men semantiskt mer korrekt
// du kan välja vilken global variabel du vill använda
console.log(driver.isMobile) // ger: true
console.log(driver.isIOS) // ger: true
console.log(driver.isAndroid) // ger: false
```

Detta kan vara användbart om du till exempel vill definiera väljare i dina [sidobjekt](../pageobjects) baserat på enhetstypen, så här:

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

Du kan också använda dessa flaggor för att bara köra vissa tester för vissa enhetstyper:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // kör bara testet med Android-enheter
    if (driver.isAndroid) {
        it('testar något endast för Android', () => {
            // ...
        })
    }
    // ...
})
```

### Händelser
Browser-objektet är en EventEmitter och ett antal händelser emitteras för dina användningsfall.

Här är en lista över händelser. Tänk på att detta inte är den fullständiga listan över tillgängliga händelser ännu.
Bidra gärna med att uppdatera dokumentet genom att lägga till beskrivningar av fler händelser här.

#### `command`

Denna händelse emitteras när WebdriverIO skickar ett WebDriver Classic-kommando. Den innehåller följande information:

- `command`: kommandonamnet, t.ex. `navigateTo`
- `method`: HTTP-metoden som används för att skicka kommandoförfrågan, t.ex. `POST`
- `endpoint`: kommandots slutpunkt, t.ex. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: kommandolasten, t.ex. `{ url: 'https://webdriver.io' }`

#### `result`

Denna händelse emitteras när WebdriverIO tar emot ett resultat av ett WebDriver Classic-kommando. Den innehåller samma information som `command`-händelsen med tillägg av följande information:

- `result`: kommandoresultatet

#### `bidiCommand`

Denna händelse emitteras när WebdriverIO skickar ett WebDriver Bidi-kommando till webbläsardrivrutinen. Den innehåller information om:

- `method`: WebDriver Bidi-kommandometod
- `params`: tillhörande kommandoparameter (se [API](/docs/api/webdriverBidi))

#### `bidiResult`

Vid framgångsrikt kommandoutförande kommer händelselasten att vara:

- `type`: `success`
- `id`: kommando-id
- `result`: kommandoresultatet (se [API](/docs/api/webdriverBidi))

Vid kommandofel kommer händelselasten att vara:

- `type`: `error`
- `id`: kommando-id
- `error`: felkoden, t.ex. `invalid argument`
- `message`: detaljer om felet
- `stacktrace`: en stackspårning

#### `request.start`
Denna händelse utlöses innan en WebDriver-förfrågan skickas till drivrutinen. Den innehåller information om förfrågan och dess nyttolast.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Denna händelse utlöses när förfrågan till drivrutinen har fått ett svar. Händelseobjektet innehåller antingen svarkroppen som resultat eller ett fel om WebDriver-kommandot misslyckades.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Retry-händelsen kan meddela dig när WebdriverIO försöker köra om kommandot, t.ex. på grund av ett nätverksproblem. Den innehåller information om felet som orsakade omförsöket och antalet omförsök som redan gjorts.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Detta är en händelse för att mäta WebDriver-nivåoperationer. När WebdriverIO skickar en förfrågan till WebDriver-backendet kommer denna händelse att emitteras med användbar information:

- `durationMillisecond`: Tidsvaraktighet för förfrågan i millisekunder.
- `error`: Felobjekt om förfrågan misslyckades.
- `request`: Förfrågningsobjekt. Du kan hitta url, metod, headers, etc.
- `retryCount`: Om det är `0` var förfrågan det första försöket. Den ökar när WebDriverIO försöker igen under huven.
- `success`: Boolean för att representera om förfrågan lyckades eller inte. Om den är `false` kommer även `error`-egenskapen att tillhandahållas.

Ett exempel på händelse:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Anpassade kommandon

Du kan ställa in anpassade kommandon på browser-omfattningen för att abstrahera arbetsflöden som används ofta. Kolla in vår guide om [Anpassade kommandon](/docs/customcommands#adding-custom-commands) för mer information.