---
id: browser
title: Das Browser-Objekt
---

__Erweitert:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Das Browser-Objekt ist die Sitzungsinstanz, mit der Sie den Browser oder das mobile Gerät steuern. Wenn Sie den WDIO-Testrunner verwenden, können Sie auf die WebDriver-Instanz über das globale `browser`- oder `driver`-Objekt zugreifen oder es mit [`@wdio/globals`](/docs/api/globals) importieren. Wenn Sie WebdriverIO im Standalone-Modus verwenden, wird das Browser-Objekt von der [`remote`](/docs/api/modules#remoteoptions-modifier)-Methode zurückgegeben.

Die Sitzung wird vom Testrunner initialisiert. Dasselbe gilt für die Beendigung der Sitzung. Dies wird ebenfalls vom Testrunner-Prozess durchgeführt.

## Eigenschaften

Ein Browser-Objekt hat die folgenden Eigenschaften:

| Name | Typ | Details |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Zugewiesene Fähigkeiten vom Remote-Server.<br /><b>Beispiel:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Vom Remote-Server angeforderte Fähigkeiten.<br /><b>Beispiel:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Vom Remote-Server zugewiesene Sitzungs-ID. |
| `options` | `Object` | WebdriverIO [Optionen](/docs/configuration) abhängig davon, wie das Browser-Objekt erstellt wurde. Siehe mehr unter [Setup-Typen](/docs/setuptypes). |
| `commandList` | `String[]` | Eine Liste der bei der Browser-Instanz registrierten Befehle |
| `isW3C` | `Boolean` | Gibt an, ob dies eine W3C-Sitzung ist |
| `isChrome` | `Boolean` | Gibt an, ob dies eine Chrome-Instanz ist |
| `isFirefox` | `Boolean` | Gibt an, ob dies eine Firefox-Instanz ist |
| `isBidi` | `Boolean` | Gibt an, ob diese Sitzung Bidi verwendet |
| `isSauce` | `Boolean` | Gibt an, ob diese Sitzung auf Sauce Labs läuft |
| `isMacApp` | `Boolean` | Gibt an, ob diese Sitzung für eine native Mac-App läuft |
| `isWindowsApp` | `Boolean` | Gibt an, ob diese Sitzung für eine native Windows-App läuft |
| `isMobile` | `Boolean` | Gibt eine mobile Sitzung an. Weitere Informationen unter [Mobile Flags](#mobile-flags). |
| `isIOS` | `Boolean` | Gibt eine iOS-Sitzung an. Weitere Informationen unter [Mobile Flags](#mobile-flags). |
| `isAndroid` | `Boolean` | Gibt eine Android-Sitzung an. Weitere Informationen unter [Mobile Flags](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Gibt an, ob das Mobilgerät im `NATIVE_APP`-Kontext ist. Weitere Informationen unter [Mobile Flags](#mobile-flags). |
| `mobileContext` | `string`  | Dies gibt den **aktuellen** Kontext an, in dem sich der Treiber befindet, zum Beispiel `NATIVE_APP`, `WEBVIEW_<packageName>` für Android oder `WEBVIEW_<pid>` für iOS. Es spart einen zusätzlichen WebDriver-Aufruf zu `driver.getContext()`. Weitere Informationen unter [Mobile Flags](#mobile-flags). |


## Methoden

Basierend auf dem für Ihre Sitzung verwendeten Automatisierungs-Backend identifiziert WebdriverIO, welche [Protokollbefehle](/docs/api/protocols) dem [Browser-Objekt](/docs/api/browser) zugeordnet werden. Wenn Sie beispielsweise eine automatisierte Sitzung in Chrome ausführen, haben Sie Zugriff auf Chrome-spezifische Befehle wie [`elementHover`](/docs/api/chromium#elementhover), aber nicht auf die [Appium-Befehle](/docs/api/appium).

Darüber hinaus bietet WebdriverIO eine Reihe praktischer Methoden, die empfohlen werden, um mit dem [Browser](/docs/api/browser) oder [Elementen](/docs/api/element) auf der Seite zu interagieren.

Zusätzlich dazu sind die folgenden Befehle verfügbar:

| Name | Parameter | Details |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Ermöglicht die Definition benutzerdefinierter Befehle, die vom Browser-Objekt für Kompositionszwecke aufgerufen werden können. Lesen Sie mehr im Leitfaden zu [Benutzerdefinierten Befehlen](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Ermöglicht das Überschreiben eines beliebigen Browser-Befehls mit benutzerdefinierter Funktionalität. Verwenden Sie dies mit Vorsicht, da es Framework-Benutzer verwirren kann. Lesen Sie mehr im Leitfaden zu [Benutzerdefinierten Befehlen](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Ermöglicht die Definition einer benutzerdefinierten Selektorstrategie, lesen Sie mehr im [Selektoren](/docs/selectors#custom-selector-strategies)-Leitfaden. |

## Anmerkungen

### Mobile Flags

Wenn Sie Ihren Test basierend darauf ändern müssen, ob Ihre Sitzung auf einem mobilen Gerät läuft oder nicht, können Sie die mobilen Flags überprüfen.

Zum Beispiel, bei dieser Konfiguration:

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

Sie können in Ihrem Test auf diese Flags wie folgt zugreifen:

```js
// Hinweis: `driver` ist das Äquivalent zum `browser`-Objekt, aber semantisch korrekter
// Sie können wählen, welche globale Variable Sie verwenden möchten
console.log(driver.isMobile) // Ausgabe: true
console.log(driver.isIOS) // Ausgabe: true
console.log(driver.isAndroid) // Ausgabe: false
```

Dies kann nützlich sein, wenn Sie beispielsweise Selektoren in Ihren [Seitenobjecten](../pageobjects) basierend auf dem Gerätetyp definieren möchten, wie hier:

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

Sie können diese Flags auch verwenden, um bestimmte Tests nur für bestimmte Gerätetypen auszuführen:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // nur Test mit Android-Geräten ausführen
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Events
Das Browser-Objekt ist ein EventEmitter und es werden einige Events für Ihre Anwendungsfälle ausgelöst.

Hier ist eine Liste von Events. Beachten Sie, dass dies noch nicht die vollständige Liste der verfügbaren Events ist.
Fühlen Sie sich frei, zur Aktualisierung des Dokuments beizutragen, indem Sie Beschreibungen weiterer Events hier hinzufügen.

#### `command`

Dieses Event wird ausgelöst, wenn WebdriverIO einen WebDriver Classic-Befehl sendet. Es enthält die folgenden Informationen:

- `command`: der Befehlsname, z.B. `navigateTo`
- `method`: die HTTP-Methode, die zum Senden der Befehlsanfrage verwendet wird, z.B. `POST`
- `endpoint`: der Befehlsendpunkt, z.B. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: die Befehlsnutzlast, z.B. `{ url: 'https://webdriver.io' }`

#### `result`

Dieses Event wird ausgelöst, wenn WebdriverIO ein Ergebnis eines WebDriver Classic-Befehls erhält. Es enthält die gleichen Informationen wie das `command`-Event mit der Ergänzung der folgenden Informationen:

- `result`: das Befehlsergebnis

#### `bidiCommand`

Dieses Event wird ausgelöst, wenn WebdriverIO einen WebDriver Bidi-Befehl an den Browser-Treiber sendet. Es enthält Informationen über:

- `method`: WebDriver Bidi-Befehlsmethode
- `params`: zugehörige Befehlsparameter (siehe [API](/docs/api/webdriverBidi))

#### `bidiResult`

Im Falle einer erfolgreichen Befehlsausführung wird die Event-Nutzlast sein:

- `type`: `success`
- `id`: die Befehls-ID
- `result`: das Befehlsergebnis (siehe [API](/docs/api/webdriverBidi))

Im Falle eines Befehlsfehlers wird die Event-Nutzlast sein:

- `type`: `error`
- `id`: die Befehls-ID
- `error`: der Fehlercode, z.B. `invalid argument`
- `message`: Details zum Fehler
- `stacktrace`: ein Stack-Trace

#### `request.start`
Dieses Event wird ausgelöst, bevor eine WebDriver-Anfrage an den Treiber gesendet wird. Es enthält Informationen über die Anfrage und ihre Nutzlast.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Dieses Event wird ausgelöst, sobald die Anfrage an den Treiber eine Antwort erhalten hat. Das Event-Objekt enthält entweder den Antworttext als Ergebnis oder einen Fehler, wenn der WebDriver-Befehl fehlgeschlagen ist.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Das Retry-Event kann Sie benachrichtigen, wenn WebdriverIO versucht, den Befehl erneut auszuführen, z.B. aufgrund eines Netzwerkproblems. Es enthält Informationen über den Fehler, der den Wiederholungsversuch verursacht hat, und die Anzahl der bereits durchgeführten Wiederholungsversuche.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Dies ist ein Event zur Messung von WebDriver-Level-Operationen. Wenn WebdriverIO eine Anfrage an das WebDriver-Backend sendet, wird dieses Event mit einigen nützlichen Informationen ausgelöst:

- `durationMillisecond`: Zeitdauer der Anfrage in Millisekunden.
- `error`: Fehlerobjekt, wenn die Anfrage fehlgeschlagen ist.
- `request`: Anfrageobjekt. Sie können URL, Methode, Header usw. finden.
- `retryCount`: Wenn es `0` ist, war die Anfrage der erste Versuch. Es wird erhöht, wenn WebDriverIO im Hintergrund wiederholt.
- `success`: Boolean, um darzustellen, ob die Anfrage erfolgreich war oder nicht. Wenn es `false` ist, wird auch die `error`-Eigenschaft bereitgestellt.

Ein Beispiel-Event:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Benutzerdefinierte Befehle

Sie können benutzerdefinierte Befehle im Browser-Bereich festlegen, um häufig verwendete Arbeitsabläufe zu abstrahieren. Schauen Sie sich unseren Leitfaden zu [Benutzerdefinierten Befehlen](/docs/customcommands#adding-custom-commands) für weitere Informationen an.