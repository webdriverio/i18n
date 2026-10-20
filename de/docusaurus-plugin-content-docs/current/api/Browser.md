---
id: browser
title: Das Browser-Objekt
---

__Erweitert:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Das Browser-Objekt ist die Sitzungsinstanz, mit der Sie den Browser oder das mobile Gerät steuern. Wenn Sie den WDIO-Testrunner verwenden, können Sie über das globale `browser`- oder `driver`-Objekt auf die WebDriver-Instanz zugreifen oder sie mit [`@wdio/globals`](/docs/api/globals) importieren. Wenn Sie WebdriverIO im Standalone-Modus verwenden, wird das Browser-Objekt von der [`remote`](/docs/api/modules#remoteoptions-modifier)-Methode zurückgegeben.

Die Sitzung wird vom Testrunner initialisiert. Dasselbe gilt für das Beenden der Sitzung. Auch dies erfolgt durch den Testrunner-Prozess.

## Eigenschaften

Ein Browser-Objekt hat die folgenden Eigenschaften:

| Name | Typ | Details |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Vom Remote-Server zugewiesene Capabilities.<br /><b>Beispiel:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Vom Remote-Server angeforderte Capabilities.<br /><b>Beispiel:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Vom Remote-Server zugewiesene Sitzungs-ID. |
| `options` | `Object` | WebdriverIO-[Optionen](/docs/configuration), abhängig davon, wie das Browser-Objekt erstellt wurde. Mehr dazu unter [Setup-Typen](/docs/setuptypes). |
| `commandList` | `String[]` | Eine Liste der Befehle, die in der Browser-Instanz registriert sind |
| `isChrome` | `Boolean` | Gibt an, ob es sich um eine Chrome-Instanz handelt |
| `isFirefox` | `Boolean` | Gibt an, ob es sich um eine Firefox-Instanz handelt |
| `isBidi` | `Boolean` | Gibt an, ob diese Sitzung Bidi verwendet |
| `isSauce` | `Boolean` | Gibt an, ob diese Sitzung auf Sauce Labs läuft |
| `isMacApp` | `Boolean` | Gibt an, ob diese Sitzung für eine native Mac-App läuft |
| `isWindowsApp` | `Boolean` | Gibt an, ob diese Sitzung für eine native Windows-App läuft |
| `isMobile` | `Boolean` | Kennzeichnet eine mobile Sitzung. Mehr dazu unter [Mobile Flags](#mobile-flags). |
| `isIOS` | `Boolean` | Kennzeichnet eine iOS-Sitzung. Mehr dazu unter [Mobile Flags](#mobile-flags). |
| `isAndroid` | `Boolean` | Kennzeichnet eine Android-Sitzung. Mehr dazu unter [Mobile Flags](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Gibt an, ob sich das Mobilgerät im `NATIVE_APP`-Kontext befindet. Mehr dazu unter [Mobile Flags](#mobile-flags). |
| `mobileContext` | `string`  | Liefert den **aktuellen** Kontext, in dem sich der Treiber befindet, zum Beispiel `NATIVE_APP`, `WEBVIEW_<packageName>` für Android oder `WEBVIEW_<pid>` für iOS. Dies erspart einen zusätzlichen WebDriver-Aufruf von `driver.getContext()`. Mehr dazu unter [Mobile Flags](#mobile-flags). |


## Methoden

Basierend auf dem für Ihre Sitzung verwendeten Automatisierungs-Backend ermittelt WebdriverIO, welche [Protokollbefehle](/docs/api/protocols) an das [Browser-Objekt](/docs/api/browser) angehängt werden. Wenn Sie beispielsweise eine automatisierte Sitzung in Chrome ausführen, haben Sie Zugriff auf Chromium-spezifische Befehle wie [`elementHover`](/docs/api/chromium#elementhover), aber nicht auf die [Appium-Befehle](/docs/api/appium).

Darüber hinaus stellt WebdriverIO eine Reihe praktischer Methoden bereit, deren Verwendung empfohlen wird, um mit dem [Browser](/docs/api/browser) oder den [Elementen](/docs/api/element) auf der Seite zu interagieren.

Zusätzlich stehen die folgenden Befehle zur Verfügung:

| Name | Parameter | Details |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Ermöglicht es, benutzerdefinierte Befehle zu definieren, die zu Kompositionszwecken vom Browser-Objekt aus aufgerufen werden können. Mehr dazu im Leitfaden [Benutzerdefinierte Befehle](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Ermöglicht es, jeden Browser-Befehl mit benutzerdefinierter Funktionalität zu überschreiben. Verwenden Sie dies mit Bedacht, da es Framework-Benutzer verwirren kann. Mehr dazu im Leitfaden [Benutzerdefinierte Befehle](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Ermöglicht es, eine benutzerdefinierte Selektorstrategie zu definieren. Mehr dazu im Leitfaden [Selektoren](/docs/selectors#custom-selector-strategies). |

## Anmerkungen

### Mobile Flags

Wenn Sie Ihren Test abhängig davon anpassen müssen, ob Ihre Sitzung auf einem mobilen Gerät läuft oder nicht, können Sie die Mobile Flags zur Überprüfung verwenden.

Zum Beispiel bei dieser Konfiguration:

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

Sie können in Ihrem Test wie folgt auf diese Flags zugreifen:

```js
// Hinweis: `driver` entspricht dem `browser`-Objekt, ist aber semantisch korrekter
// Sie können wählen, welche globale Variable Sie verwenden möchten
console.log(driver.isMobile) // gibt aus: true
console.log(driver.isIOS) // gibt aus: true
console.log(driver.isAndroid) // gibt aus: false
```

Dies kann nützlich sein, wenn Sie beispielsweise Selektoren in Ihren [Page Objects](../pageobjects) abhängig vom Gerätetyp definieren möchten, etwa so:

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
    // Test nur mit Android-Geräten ausführen
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Events
Das Browser-Objekt ist ein EventEmitter, und für Ihre Anwendungsfälle werden einige Events ausgelöst.

Hier ist eine Liste der Events. Beachten Sie, dass dies noch nicht die vollständige Liste der verfügbaren Events ist.
Tragen Sie gerne dazu bei, das Dokument zu aktualisieren, indem Sie hier Beschreibungen weiterer Events hinzufügen.

#### `command`

Dieses Event wird immer dann ausgelöst, wenn WebdriverIO einen WebDriver-Classic-Befehl sendet. Es enthält die folgenden Informationen:

- `command`: der Befehlsname, z. B. `navigateTo`
- `method`: die HTTP-Methode, mit der die Befehlsanfrage gesendet wird, z. B. `POST`
- `endpoint`: der Befehls-Endpunkt, z. B. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: die Befehls-Payload, z. B. `{ url: 'https://webdriver.io' }`

#### `result`

Dieses Event wird immer dann ausgelöst, wenn WebdriverIO ein Ergebnis eines WebDriver-Classic-Befehls empfängt. Es enthält dieselben Informationen wie das `command`-Event, ergänzt um die folgenden Informationen:

- `result`: das Befehlsergebnis

#### `bidiCommand`

Dieses Event wird immer dann ausgelöst, wenn WebdriverIO einen WebDriver-Bidi-Befehl an den Browser-Treiber sendet. Es enthält Informationen über:

- `method`: die WebDriver-Bidi-Befehlsmethode
- `params`: die zugehörigen Befehlsparameter (siehe [API](/docs/api/webdriverBidi))

#### `bidiResult`

Bei erfolgreicher Befehlsausführung lautet die Event-Payload:

- `type`: `success`
- `id`: die Befehls-ID
- `result`: das Befehlsergebnis (siehe [API](/docs/api/webdriverBidi))

Bei einem Befehlsfehler lautet die Event-Payload:

- `type`: `error`
- `id`: die Befehls-ID
- `error`: der Fehlercode, z. B. `invalid argument`
- `message`: Details zum Fehler
- `stacktrace`: ein Stacktrace

#### `request.start`
Dieses Event wird ausgelöst, bevor eine WebDriver-Anfrage an den Treiber gesendet wird. Es enthält Informationen über die Anfrage und ihre Payload.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Dieses Event wird ausgelöst, sobald die Anfrage an den Treiber eine Antwort erhalten hat. Das Event-Objekt enthält entweder den Antwort-Body als Ergebnis oder einen Fehler, falls der WebDriver-Befehl fehlgeschlagen ist.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Das Retry-Event kann Sie benachrichtigen, wenn WebdriverIO versucht, die Ausführung eines Befehls zu wiederholen, z. B. aufgrund eines Netzwerkproblems. Es enthält Informationen über den Fehler, der die Wiederholung verursacht hat, sowie die Anzahl der bereits durchgeführten Wiederholungen.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Dies ist ein Event zur Messung von Operationen auf WebDriver-Ebene. Immer wenn WebdriverIO eine Anfrage an das WebDriver-Backend sendet, wird dieses Event mit einigen nützlichen Informationen ausgelöst:

- `durationMillisecond`: Dauer der Anfrage in Millisekunden.
- `error`: Fehlerobjekt, falls die Anfrage fehlgeschlagen ist.
- `request`: Request-Objekt. Hier finden Sie URL, Methode, Header usw.
- `retryCount`: Wenn der Wert `0` ist, war die Anfrage der erste Versuch. Der Wert erhöht sich, wenn WebDriverIO intern Wiederholungen durchführt.
- `success`: Boolean, der angibt, ob die Anfrage erfolgreich war oder nicht. Wenn der Wert `false` ist, wird zusätzlich die Eigenschaft `error` bereitgestellt.

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

Sie können benutzerdefinierte Befehle im Browser-Scope festlegen, um häufig verwendete Abläufe zu abstrahieren. Weitere Informationen finden Sie in unserem Leitfaden zu [Benutzerdefinierten Befehlen](/docs/customcommands#adding-custom-commands).