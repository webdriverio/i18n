---
id: browser
title: Das Browser-Objekt
---

__Erweitert:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Das Browser-Objekt ist die Session-Instanz, mit der du den Browser oder das mobile Gerät steuerst. Wenn du den WDIO-Testrunner verwendest, kannst du über das globale `browser`- oder `driver`-Objekt auf die WebDriver-Instanz zugreifen oder sie mit [`@wdio/globals`](/docs/api/globals) importieren. Wenn du WebdriverIO im Standalone-Modus verwendest, wird das Browser-Objekt von der Methode [`remote`](/docs/api/modules#remoteoptions-modifier) zurückgegeben.

Die Session wird vom Testrunner initialisiert. Dasselbe gilt für das Beenden der Session. Auch dies erledigt der Testrunner-Prozess.

## Eigenschaften

Ein Browser-Objekt hat die folgenden Eigenschaften:

| Name | Typ | Details |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Vom Remote-Server zugewiesene Capabilities.<br /><b>Beispiel:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Vom Remote-Server angeforderte Capabilities.<br /><b>Beispiel:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Vom Remote-Server zugewiesene Session-ID. |
| `options` | `Object` | WebdriverIO-[Optionen](/docs/configuration), abhängig davon, wie das Browser-Objekt erstellt wurde. Mehr dazu unter [Setup-Typen](/docs/setuptypes). |
| `commandList` | `String[]` | Eine Liste der Befehle, die in der Browser-Instanz registriert sind |
| `isChrome` | `Boolean` | Gibt an, ob es sich um eine Chrome-Instanz handelt |
| `isFirefox` | `Boolean` | Gibt an, ob es sich um eine Firefox-Instanz handelt |
| `isBidi` | `Boolean` | Gibt an, ob diese Session Bidi verwendet |
| `isSauce` | `Boolean` | Gibt an, ob diese Session auf Sauce Labs läuft |
| `isMacApp` | `Boolean` | Gibt an, ob diese Session für eine native Mac-App läuft |
| `isWindowsApp` | `Boolean` | Gibt an, ob diese Session für eine native Windows-App läuft |
| `isMobile` | `Boolean` | Kennzeichnet eine mobile Session. Mehr dazu unter [Mobile Flags](#mobile-flags). |
| `isIOS` | `Boolean` | Kennzeichnet eine iOS-Session. Mehr dazu unter [Mobile Flags](#mobile-flags). |
| `isAndroid` | `Boolean` | Kennzeichnet eine Android-Session. Mehr dazu unter [Mobile Flags](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Gibt an, ob sich das mobile Gerät im `NATIVE_APP`-Kontext befindet. Mehr dazu unter [Mobile Flags](#mobile-flags). |
| `mobileContext` | `string`  | Liefert den **aktuellen** Kontext, in dem sich der Driver befindet, zum Beispiel `NATIVE_APP`, `WEBVIEW_<packageName>` für Android oder `WEBVIEW_<pid>` für iOS. Dadurch wird ein zusätzlicher WebDriver-Aufruf von `driver.getContext()` eingespart. Mehr dazu unter [Mobile Flags](#mobile-flags). |


## Methoden

Basierend auf dem für deine Session verwendeten Automatisierungs-Backend ermittelt WebdriverIO, welche [Protokollbefehle](/docs/api/protocols) an das [Browser-Objekt](/docs/api/browser) angehängt werden. Wenn du beispielsweise eine automatisierte Session in Chrome ausführst, hast du Zugriff auf Chromium-spezifische Befehle wie [`elementHover`](/docs/api/chromium#elementhover), aber nicht auf die [Appium-Befehle](/docs/api/appium).

Darüber hinaus bietet WebdriverIO eine Reihe praktischer Methoden, deren Verwendung empfohlen wird, um mit dem [Browser](/docs/api/browser) oder den [Elementen](/docs/api/element) auf der Seite zu interagieren.

Zusätzlich stehen die folgenden Befehle zur Verfügung:

| Name | Parameter | Details |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Ermöglicht das Definieren benutzerdefinierter Befehle, die zu Kompositionszwecken vom Browser-Objekt aus aufgerufen werden können. Mehr dazu im Leitfaden [Benutzerdefinierte Befehle](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`)<br />- `attachToElement` (Typ: `boolean`) | Ermöglicht das Überschreiben beliebiger Browser-Befehle mit benutzerdefinierter Funktionalität. Vorsichtig verwenden, da dies Framework-Nutzer verwirren kann. Mehr dazu im Leitfaden [Benutzerdefinierte Befehle](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Ermöglicht das Definieren einer benutzerdefinierten Selektorstrategie. Mehr dazu im Leitfaden [Selektoren](/docs/selectors#custom-selector-strategies). |

## Anmerkungen

### Mobile Flags

Wenn du deinen Test abhängig davon anpassen musst, ob deine Session auf einem mobilen Gerät läuft oder nicht, kannst du die Mobile Flags zur Überprüfung verwenden.

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

Kannst du in deinem Test wie folgt auf diese Flags zugreifen:

```js
// Hinweis: `driver` entspricht dem `browser`-Objekt, ist aber semantisch korrekter
// du kannst wählen, welche globale Variable du verwenden möchtest
console.log(driver.isMobile) // gibt aus: true
console.log(driver.isIOS) // gibt aus: true
console.log(driver.isAndroid) // gibt aus: false
```

Dies kann nützlich sein, wenn du beispielsweise Selektoren in deinen [Page Objects](../pageobjects) basierend auf dem Gerätetyp definieren möchtest, etwa so:

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

Du kannst diese Flags auch verwenden, um bestimmte Tests nur für bestimmte Gerätetypen auszuführen:

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
Das Browser-Objekt ist ein EventEmitter, und für deine Anwendungsfälle werden einige Events ausgelöst.

Hier ist eine Liste von Events. Beachte, dass dies noch nicht die vollständige Liste der verfügbaren Events ist.
Du kannst gerne dazu beitragen, das Dokument zu aktualisieren, indem du hier Beschreibungen weiterer Events hinzufügst.

#### `command`

Dieses Event wird immer dann ausgelöst, wenn WebdriverIO einen WebDriver-Classic-Befehl sendet. Es enthält die folgenden Informationen:

- `command`: der Befehlsname, z. B. `navigateTo`
- `method`: die HTTP-Methode, mit der die Befehlsanfrage gesendet wird, z. B. `POST`
- `endpoint`: der Befehls-Endpunkt, z. B. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: die Befehls-Payload, z. B. `{ url: 'https://webdriver.io' }`

#### `result`

Dieses Event wird immer dann ausgelöst, wenn WebdriverIO ein Ergebnis eines WebDriver-Classic-Befehls empfängt. Es enthält dieselben Informationen wie das `command`-Event sowie zusätzlich die folgende Information:

- `result`: das Befehlsergebnis

#### `bidiCommand`

Dieses Event wird immer dann ausgelöst, wenn WebdriverIO einen WebDriver-Bidi-Befehl an den Browser-Driver sendet. Es enthält Informationen über:

- `method`: die WebDriver-Bidi-Befehlsmethode
- `params`: zugehöriger Befehlsparameter (siehe [API](/docs/api/webdriverBidi))
- `id`: die Befehls-ID, identisch mit der im `bidiResult`-Event dieses Befehls

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
Dieses Event wird ausgelöst, bevor eine WebDriver-Anfrage an den Driver gesendet wird. Es enthält Informationen über die Anfrage und ihre Payload.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Dieses Event wird ausgelöst, sobald die Anfrage an den Driver eine Antwort erhalten hat. Das Event-Objekt enthält entweder den Antwort-Body als Ergebnis oder einen Fehler, falls der WebDriver-Befehl fehlgeschlagen ist.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Das Retry-Event kann dich benachrichtigen, wenn WebdriverIO versucht, die Ausführung des Befehls zu wiederholen, z. B. aufgrund eines Netzwerkproblems. Es enthält Informationen über den Fehler, der die Wiederholung verursacht hat, sowie die Anzahl der bereits durchgeführten Wiederholungen.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Dies ist ein Event zur Messung von Operationen auf WebDriver-Ebene. Immer wenn WebdriverIO eine Anfrage an das WebDriver-Backend sendet, wird dieses Event mit einigen nützlichen Informationen ausgelöst:

- `durationMillisecond`: Dauer der Anfrage in Millisekunden.
- `error`: Fehlerobjekt, falls die Anfrage fehlgeschlagen ist.
- `request`: Anfrageobjekt. Hier findest du URL, Methode, Header usw.
- `retryCount`: Ist der Wert `0`, war die Anfrage der erste Versuch. Der Wert erhöht sich, wenn WebDriverIO intern Wiederholungen durchführt.
- `success`: Boolean, der angibt, ob die Anfrage erfolgreich war oder nicht. Ist der Wert `false`, wird zusätzlich die Eigenschaft `error` bereitgestellt.

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

Du kannst benutzerdefinierte Befehle im Browser-Scope festlegen, um häufig verwendete Workflows zu abstrahieren. Weitere Informationen findest du in unserem Leitfaden zu [Benutzerdefinierten Befehlen](/docs/customcommands#adding-custom-commands).