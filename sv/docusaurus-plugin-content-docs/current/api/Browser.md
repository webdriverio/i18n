---
id: browser
title: Browser-objektet
---

__Extends:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Browser-objektet är sessionsinstansen du använder för att styra webbläsaren eller mobilenheten med. Om du använder WDIO-testkörnaren kan du komma åt WebDriver-instansen genom det globala `browser`- eller `driver`-objektet eller importera det med [`@wdio/globals`](/docs/api/globals). Om du använder WebdriverIO i fristående läge returneras webbläsarobjektet av [`remote`](/docs/api/modules#remoteoptions-modifier)-metoden.

Sessionen initieras av testkörnaren. Detsamma gäller för att avsluta sessionen. Detta görs också av testkörarprocessen.

## Egenskaper

Ett webbläsarobjekt har följande egenskaper:

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Tilldelade kapaciteter från fjärrservern.<br /><b>Exempel:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Kapaciteter som begärts från fjärrservern.<br /><b>Exempel:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Sessions-id tilldelat från fjärrservern. |
| `options` | `Object` | WebdriverIO [alternativ](/docs/configuration) beroende på hur webbläsarobjektet skapades. Se mer under [konfigurationstyper](/docs/setuptypes). |
| `commandList` | `String[]` | En lista med kommandon registrerade för webbläsarinstansen |
| `isW3C` | `Boolean` | Indikerar om detta är en W3C-session |
| `isChrome` | `Boolean` | Indikerar om detta är en Chrome-instans |
| `isFirefox` | `Boolean` | Indikerar om detta är en Firefox-instans |
| `isBidi` | `Boolean` | Indikerar om denna session använder Bidi |
| `isSauce` | `Boolean` | Indikerar om denna session körs på Sauce Labs |
| `isMacApp` | `Boolean` | Indikerar om denna session körs för en nativ Mac-app |
| `isWindowsApp` | `Boolean` | Indikerar om denna session körs för en nativ Windows-app |
| `isMobile` | `Boolean` | Indikerar en mobil session. Se mer under [Mobila flaggor](#mobile-flags). |
| `isIOS` | `Boolean` | Indikerar en iOS-session. Se mer under [Mobila flaggor](#mobile-flags). |
| `isAndroid` | `Boolean` | Indikerar en Android-session. Se mer under [Mobila flaggor](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Indikerar om mobilen är i `NATIVE_APP`-kontext. Se mer under [Mobila flaggor](#mobile-flags). |
| `mobileContext` | `string`  | Detta visar den **aktuella** kontexten som drivrutinen befinner sig i, till exempel `NATIVE_APP`, `WEBVIEW_<packageName>` för Android eller `WEBVIEW_<pid>` för iOS. Det sparar en extra WebDriver till `driver.getContext()`. Se mer under [Mobila flaggor](#mobile-flags). |


## Metoder

Baserat på den automatiseringsbackend som används för din session identifierar WebdriverIO vilka [protokollkommandon](/docs/api/protocols) som kommer att kopplas till [webbläsarobjektet](/docs/api/browser). Om du till exempel kör en automatiserad session i Chrome kommer du att ha tillgång till Chromium-specifika kommandon som [`elementHover`](/docs/api/chromium#elementhover) men inte till några av [Appium-kommandona](/docs/api/appium).

Dessutom tillhandahåller WebdriverIO en uppsättning bekväma metoder som rekommenderas att använda för att interagera med [webbläsaren](/docs/api/browser) eller [element](/docs/api/element) på sidan.

Utöver detta är följande kommandon tillgängliga:

| Namn | Parametrar | Detaljer |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Gör det möjligt att definiera anpassade kommandon som kan anropas från webbläsarobjektet för sammansättningsändamål. Läs mer i guiden [Anpassade kommandon](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Gör det möjligt att skriva över vilket webbläsarkommando som helst med anpassad funktionalitet. Använd försiktigt eftersom det kan förvirra ramverksanvändare. Läs mer i guiden [Anpassade kommandon](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Gör det möjligt att definiera en anpassad väljstrategi, läs mer i guiden [Väljare](/docs/selectors#custom-selector-strategies). |

## Anmärkningar

### Mobila flaggor

Om du behöver ändra ditt test baserat på om din session körs på en mobil enhet eller inte, kan du använda de mobila flaggorna för att kontrollera.

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
// Obs: `driver` är likvärdigt med `browser`-objektet men semantiskt mer korrekt
// du kan välja vilken global variabel du vill använda
console.log(driver.isMobile) // skriver ut: true
console.log(driver.isIOS) // skriver ut: true
console.log(driver.isAndroid) // skriver ut: false
```

Detta kan vara användbart om du till exempel vill definiera väljare i dina [sidobjekt](../pageobjects) baserat på enhetstyp, så här:

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

Du kan också använda dessa flaggor för att endast köra vissa tester för vissa enhetstyper:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // kör bara test med Android-enheter
    if (driver.isAndroid) {
        it('testar något endast för Android', () => {
            // ...
        })
    }
    // ...
})
```

### Händelser
Webbläsarobjektet är en EventEmitter och några händelser sänds ut för dina användningsfall.

Här är en lista över händelser. Tänk på att detta inte är den fullständiga listan över tillgängliga händelser ännu.
Bidra gärna till att uppdatera dokumentet genom att lägga till beskrivningar av fler händelser här.

#### `command`

Denna händelse sänds ut när WebdriverIO skickar ett WebDriver Classic-kommando. Den innehåller följande information:

- `command`: kommandonamnet, t.ex. `navigateTo`
- `method`: HTTP-metoden som används för att skicka kommandoförfrågan, t.ex. `POST`
- `endpoint`: kommandoändpunkten, t.ex. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: kommandots nyttolast, t.ex. `{ url: 'https://webdriver.io' }`

#### `result`

Denna händelse sänds ut när WebdriverIO tar emot ett resultat av ett WebDriver Classic-kommando. Den innehåller samma information som `command`-händelsen med följande tillägg:

- `result`: kommandoresultatet

#### `bidiCommand`

Denna händelse sänds ut när WebdriverIO skickar ett WebDriver Bidi-kommando till webbläsardrivrutinen. Den innehåller information om:

- `method`: WebDriver Bidi-kommandometod
- `params`: associerad kommandoparameter (se [API](/docs/api/webdriverBidi))

#### `bidiResult`

Vid framgångsrikt kommandoutförande kommer händelsens nyttolast att vara:

- `type`: `success`
- `id`: kommando-id
- `result`: kommandoresultatet (se [API](/docs/api/webdriverBidi))

Vid kommandofel kommer händelsens nyttolast att vara:

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
Denna händelse utlöses när begäran till drivrutinen fått ett svar. Händelseobjektet innehåller antingen svarskroppen som resultat eller ett fel om WebDriver-kommandot misslyckades.

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
Detta är en händelse för att mäta WebDriver-nivåoperationer. När WebdriverIO skickar en förfrågan till WebDriver-backend kommer denna händelse att sändas ut med användbar information:

- `durationMillisecond`: Tidsvaraktighet för förfrågan i millisekunder.
- `error`: Felobjekt om förfrågan misslyckades.
- `request`: Förfrågningsobjekt. Du kan hitta url, metod, headers osv.
- `retryCount`: Om det är `0`, var förfrågan det första försöket. Det ökar när WebDriverIO försöker igen under huven.
- `success`: Boolean för att representera om förfrågan lyckades eller inte. Om det är `false` kommer egenskapen `error` också att tillhandahållas.

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

Du kan ställa in anpassade kommandon i webbläsarområdet för att abstrahera arbetsflöden som används ofta. Kolla in vår guide om [Anpassade kommandon](/docs/customcommands#adding-custom-commands) för mer information.