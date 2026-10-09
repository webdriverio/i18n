---
id: browser
title: Browser-objektet
---

__Utökar:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Browser-objektet är sessionsinstansen som du använder för att styra webbläsaren eller den mobila enheten. Om du använder WDIO-testköraren kan du komma åt WebDriver-instansen via det globala `browser`- eller `driver`-objektet eller importera det med [`@wdio/globals`](/docs/api/globals). Om du använder WebdriverIO i fristående läge returneras browser-objektet av metoden [`remote`](/docs/api/modules#remoteoptions-modifier).

Sessionen initieras av testköraren. Detsamma gäller för att avsluta sessionen. Detta görs också av testkörarprocessen.

## Egenskaper

Ett browser-objekt har följande egenskaper:

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Tilldelade capabilities från fjärrservern.<br /><b>Exempel:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Capabilities som begärts från fjärrservern.<br /><b>Exempel:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Sessions-id tilldelat från fjärrservern. |
| `options` | `Object` | WebdriverIO-[alternativ](/docs/configuration) beroende på hur browser-objektet skapades. Se mer om [installationstyper](/docs/setuptypes). |
| `commandList` | `String[]` | En lista över kommandon som registrerats för webbläsarinstansen |
| `isChrome` | `Boolean` | Anger om detta är en Chrome-instans |
| `isFirefox` | `Boolean` | Anger om detta är en Firefox-instans |
| `isBidi` | `Boolean` | Anger om denna session använder Bidi |
| `isSauce` | `Boolean` | Anger om denna session körs på Sauce Labs |
| `isMacApp` | `Boolean` | Anger om denna session körs för en inbyggd Mac-app |
| `isWindowsApp` | `Boolean` | Anger om denna session körs för en inbyggd Windows-app |
| `isMobile` | `Boolean` | Anger en mobilsession. Se mer under [Mobilflaggor](#mobile-flags). |
| `isIOS` | `Boolean` | Anger en iOS-session. Se mer under [Mobilflaggor](#mobile-flags). |
| `isAndroid` | `Boolean` | Anger en Android-session. Se mer under [Mobilflaggor](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Anger om mobilen är i `NATIVE_APP`-kontexten. Se mer under [Mobilflaggor](#mobile-flags). |
| `mobileContext` | `string`  | Denna ger den **aktuella** kontexten som drivrutinen befinner sig i, till exempel `NATIVE_APP`, `WEBVIEW_<packageName>` för Android eller `WEBVIEW_<pid>` för iOS. Det sparar ett extra WebDriver-anrop till `driver.getContext()`. Se mer under [Mobilflaggor](#mobile-flags). |


## Metoder

Baserat på den automationsbackend som används för din session identifierar WebdriverIO vilka [protokollkommandon](/docs/api/protocols) som kommer att kopplas till [browser-objektet](/docs/api/browser). Om du till exempel kör en automatiserad session i Chrome har du tillgång till Chromium-specifika kommandon som [`elementHover`](/docs/api/chromium#elementhover) men inte till några av [Appium-kommandona](/docs/api/appium).

Dessutom tillhandahåller WebdriverIO en uppsättning praktiska metoder som rekommenderas för att interagera med [webbläsaren](/docs/api/browser) eller [elementen](/docs/api/element) på sidan.

Utöver detta finns följande kommandon tillgängliga:

| Namn | Parametrar | Detaljer |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Gör det möjligt att definiera anpassade kommandon som kan anropas från browser-objektet i kompositionssyfte. Läs mer i guiden [Anpassade kommandon](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Gör det möjligt att skriva över valfritt webbläsarkommando med anpassad funktionalitet. Använd med försiktighet eftersom det kan förvirra användare av ramverket. Läs mer i guiden [Anpassade kommandon](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Gör det möjligt att definiera en anpassad selektorstrategi, läs mer i guiden [Selektorer](/docs/selectors#custom-selector-strategies). |

## Anmärkningar

### Mobilflaggor

Om du behöver anpassa ditt test beroende på om din session körs på en mobil enhet eller inte, kan du använda mobilflaggorna för att kontrollera detta.

Till exempel, givet denna konfiguration:

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

Kan du komma åt dessa flaggor i ditt test så här:

```js
// Obs: `driver` motsvarar `browser`-objektet men är semantiskt mer korrekt
// du kan välja vilken global variabel du vill använda
console.log(driver.isMobile) // skriver ut: true
console.log(driver.isIOS) // skriver ut: true
console.log(driver.isAndroid) // skriver ut: false
```

Detta kan vara användbart om du till exempel vill definiera selektorer i dina [sidobjekt](../pageobjects) baserat på enhetstypen, så här:

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
    // kör endast testet med Android-enheter
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Händelser
Browser-objektet är en EventEmitter och ett antal händelser sänds ut för dina användningsfall.

Här är en lista över händelser. Tänk på att detta ännu inte är den fullständiga listan över tillgängliga händelser.
Bidra gärna till att uppdatera dokumentet genom att lägga till beskrivningar av fler händelser här.

#### `command`

Denna händelse sänds ut varje gång WebdriverIO skickar ett WebDriver Classic-kommando. Den innehåller följande information:

- `command`: kommandots namn, t.ex. `navigateTo`
- `method`: HTTP-metoden som används för att skicka kommandoförfrågan, t.ex. `POST`
- `endpoint`: kommandots endpoint, t.ex. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: kommandots payload, t.ex. `{ url: 'https://webdriver.io' }`

#### `result`

Denna händelse sänds ut varje gång WebdriverIO tar emot ett resultat av ett WebDriver Classic-kommando. Den innehåller samma information som `command`-händelsen med tillägg av följande information:

- `result`: kommandots resultat

#### `bidiCommand`

Denna händelse sänds ut varje gång WebdriverIO skickar ett WebDriver Bidi-kommando till webbläsardrivrutinen. Den innehåller information om:

- `method`: WebDriver Bidi-kommandometod
- `params`: tillhörande kommandoparameter (se [API](/docs/api/webdriverBidi))

#### `bidiResult`

Vid en lyckad kommandokörning kommer händelsens payload att vara:

- `type`: `success`
- `id`: kommandots id
- `result`: kommandots resultat (se [API](/docs/api/webdriverBidi))

Vid ett kommandofel kommer händelsens payload att vara:

- `type`: `error`
- `id`: kommandots id
- `error`: felkoden, t.ex. `invalid argument`
- `message`: detaljer om felet
- `stacktrace`: en stackspårning

#### `request.start`
Denna händelse utlöses innan en WebDriver-förfrågan skickas till drivrutinen. Den innehåller information om förfrågan och dess payload.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Denna händelse utlöses när förfrågan till drivrutinen har fått ett svar. Händelseobjektet innehåller antingen svarsinnehållet som resultat eller ett fel om WebDriver-kommandot misslyckades.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Retry-händelsen kan meddela dig när WebdriverIO försöker köra kommandot igen, t.ex. på grund av ett nätverksproblem. Den innehåller information om felet som orsakade det nya försöket och antalet försök som redan gjorts.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Detta är en händelse för att mäta operationer på WebDriver-nivå. Varje gång WebdriverIO skickar en förfrågan till WebDriver-backend kommer denna händelse att sändas ut med en del användbar information:

- `durationMillisecond`: Förfrågans varaktighet i millisekunder.
- `error`: Felobjekt om förfrågan misslyckades.
- `request`: Förfrågningsobjekt. Här hittar du url, metod, headers osv.
- `retryCount`: Om värdet är `0` var förfrågan det första försöket. Det ökar när WebDriverIO gör nya försök i bakgrunden.
- `success`: Boolean som anger om förfrågan lyckades eller inte. Om värdet är `false` tillhandahålls även egenskapen `error`.

Ett exempel på en händelse:
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

Du kan ange anpassade kommandon i browser-scopet för att abstrahera bort arbetsflöden som används ofta. Läs vår guide om [Anpassade kommandon](/docs/customcommands#adding-custom-commands) för mer information.