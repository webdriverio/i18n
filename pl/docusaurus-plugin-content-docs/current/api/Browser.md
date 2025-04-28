---
id: browser
title: Obiekt przeglądarki
---

__Rozszerza:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Obiekt przeglądarki to instancja sesji, której używasz do kontrolowania przeglądarki lub urządzenia mobilnego. Jeśli używasz test runnera WDIO, możesz uzyskać dostęp do instancji WebDrivera przez globalny obiekt `browser` lub `driver`, albo zaimportować go za pomocą [`@wdio/globals`](/docs/api/globals). Jeśli używasz WebdriverIO w trybie samodzielnym, obiekt przeglądarki jest zwracany przez metodę [`remote`](/docs/api/modules#remoteoptions-modifier).

Sesja jest inicjowana przez test runner. To samo dotyczy kończenia sesji. Jest to również wykonywane przez proces test runnera.

## Właściwości

Obiekt przeglądarki ma następujące właściwości:

| Nazwa | Typ | Szczegóły |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Przypisane możliwości z serwera zdalnego.<br /><b>Przykład:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Możliwości żądane z serwera zdalnego.<br /><b>Przykład:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Identyfikator sesji przypisany z serwera zdalnego. |
| `options` | `Object` | [Opcje](/docs/configuration) WebdriverIO w zależności od tego, jak został utworzony obiekt przeglądarki. Zobacz więcej w [typy konfiguracji](/docs/setuptypes). |
| `commandList` | `String[]` | Lista poleceń zarejestrowanych w instancji przeglądarki |
| `isW3C` | `Boolean` | Wskazuje, czy jest to sesja W3C |
| `isChrome` | `Boolean` | Wskazuje, czy jest to instancja Chrome |
| `isFirefox` | `Boolean` | Wskazuje, czy jest to instancja Firefox |
| `isBidi` | `Boolean` | Wskazuje, czy ta sesja używa Bidi |
| `isSauce` | `Boolean` | Wskazuje, czy ta sesja działa na Sauce Labs |
| `isMacApp` | `Boolean` | Wskazuje, czy ta sesja działa dla natywnej aplikacji Mac |
| `isWindowsApp` | `Boolean` | Wskazuje, czy ta sesja działa dla natywnej aplikacji Windows |
| `isMobile` | `Boolean` | Wskazuje sesję mobilną. Zobacz więcej w [Flagi mobilne](#mobile-flags). |
| `isIOS` | `Boolean` | Wskazuje sesję iOS. Zobacz więcej w [Flagi mobilne](#mobile-flags). |
| `isAndroid` | `Boolean` | Wskazuje sesję Android. Zobacz więcej w [Flagi mobilne](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Wskazuje, czy urządzenie mobilne jest w kontekście `NATIVE_APP`. Zobacz więcej w [Flagi mobilne](#mobile-flags). |
| `mobileContext` | `string`  | Zapewnia **bieżący** kontekst, w którym znajduje się sterownik, na przykład `NATIVE_APP`, `WEBVIEW_<packageName>` dla Androida lub `WEBVIEW_<pid>` dla iOS. Zaoszczędzi dodatkowego WebDrivera do `driver.getContext()`. Zobacz więcej w [Flagi mobilne](#mobile-flags). |


## Metody

Na podstawie używanego backendu automatyzacji dla Twojej sesji, WebdriverIO identyfikuje, które [Polecenia Protokołu](/docs/api/protocols) zostaną dołączone do [obiektu przeglądarki](/docs/api/browser). Na przykład, jeśli uruchamiasz zautomatyzowaną sesję w Chrome, będziesz mieć dostęp do specyficznych dla Chromium poleceń, takich jak [`elementHover`](/docs/api/chromium#elementhover), ale nie do żadnych [poleceń Appium](/docs/api/appium).

Ponadto WebdriverIO zapewnia zestaw wygodnych metod, które są zalecane do korzystania, aby wchodzić w interakcję z [przeglądarką](/docs/api/browser) lub [elementami](/docs/api/element) na stronie.

Dodatkowo dostępne są następujące polecenia:

| Nazwa | Parametry | Szczegóły |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Pozwala zdefiniować niestandardowe polecenia, które można wywołać z obiektu przeglądarki w celach kompozycji. Przeczytaj więcej w przewodniku [Własne polecenia](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Pozwala nadpisać dowolne polecenie przeglądarki niestandardową funkcjonalnością. Używaj ostrożnie, ponieważ może to dezorientować użytkowników frameworka. Przeczytaj więcej w przewodniku [Własne polecenia](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Pozwala zdefiniować niestandardową strategię selektora, przeczytaj więcej w przewodniku [Selektory](/docs/selectors#custom-selector-strategies). |

## Uwagi

### Flagi mobilne

Jeśli musisz modyfikować swój test w zależności od tego, czy sesja działa na urządzeniu mobilnym, możesz sprawdzić flagi mobilne.

Na przykład, biorąc pod uwagę tę konfigurację:

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

Możesz uzyskać dostęp do tych flag w swoim teście w następujący sposób:

```js
// Uwaga: `driver` jest odpowiednikiem obiektu `browser`, ale semantycznie bardziej poprawny
// możesz wybrać, której zmiennej globalnej chcesz używać
console.log(driver.isMobile) // wynik: true
console.log(driver.isIOS) // wynik: true
console.log(driver.isAndroid) // wynik: false
```

Może to być przydatne, jeśli na przykład chcesz definiować selektory w swoich [obiektach stron](../pageobjects) w zależności od typu urządzenia, w taki sposób:

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

Możesz również używać tych flag, aby uruchamiać tylko niektóre testy dla określonych typów urządzeń:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // uruchom test tylko na urządzeniach Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Zdarzenia
Obiekt przeglądarki jest emiterem zdarzeń (EventEmitter) i kilka zdarzeń jest emitowanych do wykorzystania.

Oto lista zdarzeń. Pamiętaj, że nie jest to jeszcze pełna lista dostępnych zdarzeń.
Zachęcamy do współpracy przy aktualizacji dokumentu poprzez dodawanie opisów większej liczby zdarzeń.

#### `command`

To zdarzenie jest emitowane za każdym razem, gdy WebdriverIO wysyła klasyczne polecenie WebDrivera. Zawiera następujące informacje:

- `command`: nazwa polecenia, np. `navigateTo`
- `method`: metoda HTTP używana do wysłania zapytania polecenia, np. `POST`
- `endpoint`: punkt końcowy polecenia, np. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: ładunek polecenia, np. `{ url: 'https://webdriver.io' }`

#### `result`

To zdarzenie jest emitowane za każdym razem, gdy WebdriverIO otrzymuje wynik klasycznego polecenia WebDrivera. Zawiera te same informacje co zdarzenie `command` z dodatkiem następujących informacji:

- `result`: wynik polecenia

#### `bidiCommand`

To zdarzenie jest emitowane za każdym razem, gdy WebdriverIO wysyła polecenie WebDriver Bidi do sterownika przeglądarki. Zawiera informacje o:

- `method`: metoda polecenia WebDriver Bidi
- `params`: powiązane parametry polecenia (zobacz [API](/docs/api/webdriverBidi))

#### `bidiResult`

W przypadku pomyślnego wykonania polecenia, ładunek zdarzenia będzie zawierał:

- `type`: `success`
- `id`: id polecenia
- `result`: wynik polecenia (zobacz [API](/docs/api/webdriverBidi))

W przypadku błędu polecenia, ładunek zdarzenia będzie zawierał:

- `type`: `error`
- `id`: id polecenia
- `error`: kod błędu, np. `invalid argument`
- `message`: szczegóły dotyczące błędu
- `stacktrace`: ślad stosu

#### `request.start`
To zdarzenie jest wyzwalane przed wysłaniem żądania WebDrivera do sterownika. Zawiera informacje o żądaniu i jego ładunku.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
To zdarzenie jest wyzwalane po otrzymaniu odpowiedzi na żądanie do sterownika. Obiekt zdarzenia zawiera albo treść odpowiedzi jako wynik, albo błąd, jeśli polecenie WebDrivera nie powiodło się.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Zdarzenie retry może powiadamiać, kiedy WebdriverIO próbuje ponownie uruchomić polecenie, np. z powodu problemu z siecią. Zawiera informacje o błędzie, który spowodował ponowienie próby i liczbę już wykonanych ponowień.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Jest to zdarzenie do mierzenia operacji na poziomie WebDrivera. Za każdym razem, gdy WebdriverIO wysyła żądanie do backendu WebDrivera, to zdarzenie zostanie wyemitowane z pewnymi użytecznymi informacjami:

- `durationMillisecond`: Czas trwania żądania w milisekundach.
- `error`: Obiekt błędu, jeśli żądanie nie powiodło się.
- `request`: Obiekt żądania. Możesz znaleźć url, metodę, nagłówki, itp.
- `retryCount`: Jeśli wynosi `0`, żądanie było pierwszą próbą. Będzie wzrastać, gdy WebDriverIO będzie ponawiał próby w tle.
- `success`: Wartość logiczna reprezentująca sukces lub porażkę żądania. Jeśli jest `false`, właściwość `error` również będzie dostarczona.

Przykładowe zdarzenie:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Niestandardowe polecenia

Możesz ustawić niestandardowe polecenia w zakresie przeglądarki, aby wyabstrahować często używane przepływy pracy. Sprawdź nasz przewodnik o [Niestandardowych poleceniach](/docs/customcommands#adding-custom-commands), aby uzyskać więcej informacji.