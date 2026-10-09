---
id: browser
title: Obiekt Browser
---

__Rozszerza:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Obiekt browser to instancja sesji, której używasz do sterowania przeglądarką lub urządzeniem mobilnym. Jeśli korzystasz z WDIO test runnera, możesz uzyskać dostęp do instancji WebDriver poprzez globalny obiekt `browser` lub `driver` albo zaimportować go za pomocą [`@wdio/globals`](/docs/api/globals). Jeśli używasz WebdriverIO w trybie standalone, obiekt browser jest zwracany przez metodę [`remote`](/docs/api/modules#remoteoptions-modifier).

Sesja jest inicjalizowana przez test runner. To samo dotyczy zakończenia sesji. Robi to również proces test runnera.

## Właściwości

Obiekt browser posiada następujące właściwości:

| Nazwa | Typ | Szczegóły |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Przypisane capabilities ze zdalnego serwera.<br /><b>Przykład:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Capabilities żądane od zdalnego serwera.<br /><b>Przykład:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Identyfikator sesji przypisany przez zdalny serwer. |
| `options` | `Object` | [Opcje](/docs/configuration) WebdriverIO zależne od sposobu utworzenia obiektu browser. Zobacz więcej o [typach konfiguracji](/docs/setuptypes). |
| `commandList` | `String[]` | Lista komend zarejestrowanych w instancji przeglądarki |
| `isChrome` | `Boolean` | Wskazuje, czy jest to instancja Chrome |
| `isFirefox` | `Boolean` | Wskazuje, czy jest to instancja Firefox |
| `isBidi` | `Boolean` | Wskazuje, czy ta sesja używa Bidi |
| `isSauce` | `Boolean` | Wskazuje, czy ta sesja jest uruchomiona na Sauce Labs |
| `isMacApp` | `Boolean` | Wskazuje, czy ta sesja jest uruchomiona dla natywnej aplikacji Mac |
| `isWindowsApp` | `Boolean` | Wskazuje, czy ta sesja jest uruchomiona dla natywnej aplikacji Windows |
| `isMobile` | `Boolean` | Wskazuje sesję mobilną. Zobacz więcej w sekcji [Flagi mobilne](#mobile-flags). |
| `isIOS` | `Boolean` | Wskazuje sesję iOS. Zobacz więcej w sekcji [Flagi mobilne](#mobile-flags). |
| `isAndroid` | `Boolean` | Wskazuje sesję Android. Zobacz więcej w sekcji [Flagi mobilne](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Wskazuje, czy urządzenie mobilne jest w kontekście `NATIVE_APP`. Zobacz więcej w sekcji [Flagi mobilne](#mobile-flags). |
| `mobileContext` | `string`  | Zwraca **bieżący** kontekst, w którym znajduje się sterownik, na przykład `NATIVE_APP`, `WEBVIEW_<packageName>` dla Androida lub `WEBVIEW_<pid>` dla iOS. Oszczędza to dodatkowe wywołanie WebDriver do `driver.getContext()`. Zobacz więcej w sekcji [Flagi mobilne](#mobile-flags). |


## Metody

Na podstawie backendu automatyzacji używanego w Twojej sesji WebdriverIO określa, które [komendy protokołu](/docs/api/protocols) zostaną dołączone do [obiektu browser](/docs/api/browser). Na przykład, jeśli uruchamiasz zautomatyzowaną sesję w Chrome, będziesz mieć dostęp do komend specyficznych dla Chromium, takich jak [`elementHover`](/docs/api/chromium#elementhover), ale nie do żadnych [komend Appium](/docs/api/appium).

Ponadto WebdriverIO udostępnia zestaw wygodnych metod, których zaleca się używać do interakcji z [przeglądarką](/docs/api/browser) lub [elementami](/docs/api/element) na stronie.

Oprócz tego dostępne są następujące komendy:

| Nazwa | Parametry | Szczegóły |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Pozwala definiować niestandardowe komendy, które można wywoływać z obiektu browser w celu kompozycji. Przeczytaj więcej w przewodniku [Niestandardowe komendy](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Pozwala nadpisać dowolną komendę przeglądarki niestandardową funkcjonalnością. Używaj ostrożnie, ponieważ może to wprowadzać w błąd użytkowników frameworka. Przeczytaj więcej w przewodniku [Niestandardowe komendy](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Pozwala zdefiniować niestandardową strategię selektorów, przeczytaj więcej w przewodniku [Selektory](/docs/selectors#custom-selector-strategies). |

## Uwagi

### Flagi mobilne

Jeśli musisz zmodyfikować swój test w zależności od tego, czy sesja działa na urządzeniu mobilnym, możesz sprawdzić flagi mobilne.

Na przykład, mając taką konfigurację:

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
// Uwaga: `driver` jest odpowiednikiem obiektu `browser`, ale semantycznie bardziej poprawnym
// możesz wybrać, której zmiennej globalnej chcesz używać
console.log(driver.isMobile) // wypisuje: true
console.log(driver.isIOS) // wypisuje: true
console.log(driver.isAndroid) // wypisuje: false
```

Może to być przydatne, jeśli na przykład chcesz definiować selektory w swoich [page objectach](../pageobjects) w zależności od typu urządzenia, w ten sposób:

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

Możesz także używać tych flag, aby uruchamiać tylko określone testy dla określonych typów urządzeń:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // uruchom test tylko na urządzeniach z Androidem
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Zdarzenia
Obiekt browser jest EventEmitterem i emituje kilka zdarzeń, które możesz wykorzystać w swoich przypadkach użycia.

Oto lista zdarzeń. Pamiętaj, że nie jest to jeszcze pełna lista dostępnych zdarzeń.
Zachęcamy do współtworzenia i aktualizowania dokumentu poprzez dodawanie tutaj opisów kolejnych zdarzeń.

#### `command`

To zdarzenie jest emitowane za każdym razem, gdy WebdriverIO wysyła komendę WebDriver Classic. Zawiera następujące informacje:

- `command`: nazwa komendy, np. `navigateTo`
- `method`: metoda HTTP użyta do wysłania żądania komendy, np. `POST`
- `endpoint`: endpoint komendy, np. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: ładunek komendy, np. `{ url: 'https://webdriver.io' }`

#### `result`

To zdarzenie jest emitowane za każdym razem, gdy WebdriverIO otrzymuje wynik komendy WebDriver Classic. Zawiera te same informacje co zdarzenie `command`, z dodatkiem następujących informacji:

- `result`: wynik komendy

#### `bidiCommand`

To zdarzenie jest emitowane za każdym razem, gdy WebdriverIO wysyła komendę WebDriver Bidi do sterownika przeglądarki. Zawiera informacje o:

- `method`: metoda komendy WebDriver Bidi
- `params`: powiązane parametry komendy (zobacz [API](/docs/api/webdriverBidi))

#### `bidiResult`

W przypadku pomyślnego wykonania komendy ładunek zdarzenia będzie następujący:

- `type`: `success`
- `id`: identyfikator komendy
- `result`: wynik komendy (zobacz [API](/docs/api/webdriverBidi))

W przypadku błędu komendy ładunek zdarzenia będzie następujący:

- `type`: `error`
- `id`: identyfikator komendy
- `error`: kod błędu, np. `invalid argument`
- `message`: szczegóły dotyczące błędu
- `stacktrace`: ślad stosu

#### `request.start`
To zdarzenie jest wywoływane przed wysłaniem żądania WebDriver do sterownika. Zawiera informacje o żądaniu i jego ładunku.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
To zdarzenie jest wywoływane, gdy żądanie do sterownika otrzyma odpowiedź. Obiekt zdarzenia zawiera albo treść odpowiedzi jako wynik, albo błąd, jeśli komenda WebDriver się nie powiodła.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Zdarzenie retry może powiadomić Cię, gdy WebdriverIO próbuje ponownie wykonać komendę, np. z powodu problemu z siecią. Zawiera informacje o błędzie, który spowodował ponowienie, oraz liczbę już wykonanych ponowień.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Jest to zdarzenie służące do pomiaru operacji na poziomie WebDriver. Za każdym razem, gdy WebdriverIO wysyła żądanie do backendu WebDriver, to zdarzenie zostanie wyemitowane z kilkoma przydatnymi informacjami:

- `durationMillisecond`: Czas trwania żądania w milisekundach.
- `error`: Obiekt błędu, jeśli żądanie się nie powiodło.
- `request`: Obiekt żądania. Znajdziesz w nim url, metodę, nagłówki itp.
- `retryCount`: Jeśli wynosi `0`, żądanie było pierwszą próbą. Wartość wzrasta, gdy WebDriverIO ponawia próbę w tle.
- `success`: Wartość logiczna określająca, czy żądanie zakończyło się powodzeniem. Jeśli wynosi `false`, dostępna będzie również właściwość `error`.

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

### Niestandardowe komendy

Możesz ustawić niestandardowe komendy w zakresie obiektu browser, aby wyabstrahować często używane przepływy pracy. Zapoznaj się z naszym przewodnikiem [Niestandardowe komendy](/docs/customcommands#adding-custom-commands), aby uzyskać więcej informacji.