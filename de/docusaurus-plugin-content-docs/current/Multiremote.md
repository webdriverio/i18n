---
id: multiremote
title: Multi-Remote
description: "Steuern Sie mehrere Browser- oder Gerätesitzungen aus einem einzigen Test heraus mit Multi-Remote, im Standalone-Modus oder mit dem WDIO-Testrunner."
---

WebdriverIO ermöglicht es Ihnen, mehrere automatisierte Sitzungen in einem einzigen Test auszuführen. Das ist praktisch, wenn Sie Funktionen testen, die mehrere Benutzer erfordern (zum Beispiel Chat- oder WebRTC-Anwendungen).

Anstatt mehrere Remote-Instanzen zu erstellen, bei denen Sie gemeinsame Befehle wie [`newSession`](/docs/api/webdriver#newsession) oder [`url`](/docs/api/browser/url) auf jeder Instanz ausführen müssen, können Sie einfach eine **Multi-Remote**-Instanz erstellen und alle Browser gleichzeitig steuern.

Verwenden Sie dazu einfach die Funktion `multiRemote()` und übergeben Sie ein Objekt mit Namen als Schlüsseln und `capabilities` als Werten. Indem Sie jeder Capability einen Namen geben, können Sie diese einzelne Instanz leicht auswählen und darauf zugreifen, wenn Sie Befehle auf einer einzelnen Instanz ausführen.

:::info

MultiRemote ist _nicht_ dafür gedacht, alle Ihre Tests parallel auszuführen.
Es soll dabei helfen, mehrere Browser und/oder Mobilgeräte für spezielle Integrationstests (z. B. Chat-Anwendungen) zu koordinieren.

:::

Die meisten Multi-Remote-Befehle geben ein Array von Ergebnissen zurück. Das erste Ergebnis entspricht der Capability, die im Capability-Objekt zuerst definiert wurde, das zweite Ergebnis der zweiten Capability und so weiter. `mock()` gibt statt eines Arrays ein `MultiRemoteMock` zurück. Siehe [Was mock() zurückgibt](#what-mock-returns).

## Verwendung des Standalone-Modus

Hier ist ein Beispiel, wie Sie eine Multi-Remote-Instanz im __Standalone-Modus__ erstellen:

```js
import { multiRemote } from 'webdriverio'

(async () => {
    const browser = await multiRemote({
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    })

    // URL in beiden Browsern gleichzeitig öffnen
    await browser.url('http://json.org')

    // Befehle gleichzeitig aufrufen
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // gleichzeitig auf ein Element klicken
    const elem = await browser.$('#someElem')
    await elem.click()

    // nur mit einem Browser klicken (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Verwendung des WDIO-Testrunners

Um Multi-Remote im WDIO-Testrunner zu verwenden, definieren Sie einfach das `capabilities`-Objekt in Ihrer `wdio.conf.js` als Objekt mit den Browsernamen als Schlüsseln (statt einer Liste von Capabilities):

```js
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
    // ...
}
```

Dadurch werden zwei WebDriver-Sitzungen mit Chrome und Firefox erstellt. Statt nur Chrome und Firefox können Sie auch zwei Mobilgeräte mit [Appium](http://appium.io) starten oder ein Mobilgerät und einen Browser.

Sie können Multi-Remote auch parallel ausführen, indem Sie das Browser-Capabilities-Objekt in ein Array packen. Stellen Sie bitte sicher, dass jeder Browser das Feld `capabilities` enthält, da wir die Modi daran unterscheiden.

```js
export const config = {
    // ...
    capabilities: [{
        myChromeBrowser0: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser0: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }, {
        myChromeBrowser1: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser1: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }]
    // ...
}
```

Sie können sogar eines der [Cloud-Service-Backends](https://webdriver.io/docs/cloudservices.html) zusammen mit lokalen Webdriver/Appium- oder Selenium-Standalone-Instanzen starten. WebdriverIO erkennt Cloud-Backend-Capabilities automatisch, wenn Sie in den Browser-Capabilities entweder `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) oder `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) angegeben haben.

```js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myBrowserStackFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox',
                'bstack:options': {
                    // ...
                }
            }
        }
    },
    services: [
        ['browserstack', 'selenium-standalone']
    ],
    // ...
}
```

Hier ist jede Art von Betriebssystem-/Browser-Kombination möglich (einschließlich mobiler und Desktop-Browser). Alle Befehle, die Ihre Tests über die Variable `browser` aufrufen, werden parallel auf jeder Instanz ausgeführt. Das hilft, Ihre Integrationstests zu vereinfachen und ihre Ausführung zu beschleunigen.

Zum Beispiel, wenn Sie eine URL öffnen:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Das Ergebnis jedes Befehls ist ein Objekt mit den Browsernamen als Schlüssel und dem Befehlsergebnis als Wert, etwa so:

```js
// Beispiel für den wdio-Testrunner
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // gibt zurück: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // gibt zurück: 'Firefox 35 on Mac OS X (Yosemite)'
```

Beachten Sie, dass jeder Befehl nacheinander ausgeführt wird. Das bedeutet, dass der Befehl abgeschlossen ist, sobald alle Browser ihn ausgeführt haben. Das ist hilfreich, weil die Browser-Aktionen synchron bleiben, was es einfacher macht zu verstehen, was gerade passiert.

Manchmal ist es notwendig, in jedem Browser unterschiedliche Dinge zu tun, um etwas zu testen. Wenn wir zum Beispiel eine Chat-Anwendung testen möchten, muss es einen Browser geben, der eine Textnachricht sendet, während ein anderer Browser darauf wartet, sie zu empfangen, und dann eine Assertion darauf ausführt.

Bei Verwendung des WDIO-Testrunners werden die Browsernamen mit ihren Instanzen im globalen Scope registriert:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// warten, bis Nachrichten ankommen
await $('.messages').waitForExist()
// prüfen, ob eine der Nachrichten die Chrome-Nachricht enthält
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

In diesem Beispiel beginnt die Instanz `myFirefoxBrowser` auf eine Nachricht zu warten, sobald die Instanz `myChromeBrowser` auf den Button `#send` geklickt hat.

MultiRemote macht es einfach und bequem, mehrere Browser zu steuern – egal, ob sie parallel dasselbe tun oder koordiniert unterschiedliche Dinge tun sollen.

### Was `$` zurückgibt

Auf einem Multi-Remote-Browser geben `$`, `custom$` und `react$` ein `MultiRemoteElement` zurück. Auf einem Multi-Remote-Element geben auch `shadow$`, `nextElement`, `previousElement` und `parentElement` eines zurück. Seine Befehle werden auf jeder Instanz ausgeführt, und `getInstance` liefert das Element eines einzelnen Browsers.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // klickt in jedem Browser
await button.getInstance('myChromeBrowser').click()  // klickt nur in Chrome
```

### Was `$$` zurückgibt

Auf einem Multi-Remote-Browser gibt `$$` ein `MultiRemoteElementArray` zurück. Jeder Eintrag ist ein `MultiRemoteElement`, das alle Instanzen gleichzeitig anspricht, und das Array selbst enthält dieselben Informationen wie ein reguläres `ElementArray`. `custom$$`, `react$$` und, auf einem Multi-Remote-Element, `shadow$$` geben dieselbe Art von Liste zurück.

```js
const messages = await $$('.messages')

messages.length      // die größte Anzahl an Elementen, die eine Instanz gefunden hat
messages[0]          // ein MultiRemoteElement, das alle Instanzen anspricht
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // der Multi-Remote-Browser oder das Element, von dem es abgerufen wurde
messages.isMultiRemote // true, damit es von einem einfachen ElementArray unterschieden werden kann

// die asynchronen Array-Hilfsfunktionen sind verfügbar, wie bei einem einzelnen Browser
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

Wenn die Instanzen eine unterschiedliche Anzahl von Elementen finden, hat ein Eintrag kein Element für eine Instanz, die weniger gefunden hat. Für diese Instanz wirft `getInstance()` einen Fehler, und ein Befehl auf dem Eintrag schlägt fehl. Verwenden Sie `select()` mit den Instanzen, die das Element haben. Ein `expect`-Matcher auf der gesamten Liste prüft jede Instanz mit ihren eigenen Elementen:

```js
// myChromeBrowser findet 3 Nachrichten, myFirefoxBrowser findet 2
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // nur Chrome hat eine dritte Nachricht
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

Vor v10 wurde hier ein einfaches Array zurückgegeben, sofern nicht `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true` gesetzt war. Das Array ist jetzt der Standard, und die Umgebungsvariable wurde entfernt. Der Indexzugriff ist unverändert, sodass Code, der nur `elements[0]` liest, weiterhin funktioniert.

:::

### Was mock() zurückgibt {#what-mock-returns}

Auf einem Multi-Remote-Browser gibt `mock()` ein `MultiRemoteMock` zurück. Es ist kein Array. `respond()`, `restore()` und die anderen Mock-Methoden werden auf jeder Instanz ausgeführt. Erfasste Requests verbleiben auf dem Mock des jeweiligen Browsers, lesen Sie sie daher mit `getInstance` aus:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js` führt dies gegen zwei Headless-Chrome-Sitzungen aus.

`instances` folgt der Reihenfolge, in der die Mocks erstellt wurden. Nach `select()` kann diese Reihenfolge von `browser.instances` abweichen:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // der Chrome-Mock, unabhängig von der Reihenfolge
```

`getInstance` wirft `Multi-remote object has no instance named "<name>"`, wenn `name` nicht in `instances` enthalten ist.

Um nur einen Browser zu mocken, rufen Sie `mock()` auf dieser Instanz auf:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## Zugriff auf Browser-Instanzen über Strings mithilfe des browser-Objekts
Zusätzlich zum Zugriff auf die Browser-Instanz über ihre globalen Variablen (z. B. `myChromeBrowser`, `myFirefoxBrowser`) können Sie auch über das `browser`-Objekt darauf zugreifen, z. B. `browser["myChromeBrowser"]` oder `browser["myFirefoxBrowser"]`. Eine Liste aller Ihrer Instanzen erhalten Sie über `browser.instances`. Das ist besonders nützlich beim Schreiben wiederverwendbarer Testschritte, die in jedem der Browser ausgeführt werden können, z. B.:

wdio.conf.js:
```js
    capabilities: {
        userA: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        userB: {
            capabilities: {
                browserName: 'chrome'
            }
        }
    }
```

Cucumber-Datei:
    ```feature
    When User A types a message into the chat
    ```

Step-Definition-Datei:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Assertions

Die `expect`-Matcher unterstützen Multi-Remote-Browser, -Elemente und -Mocks. Standardmäßig muss jede Instanz dem erwarteten Wert entsprechen:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

Um pro Instanz einen anderen Wert zu erwarten, verwenden Sie `expect.multiRemote()` mit einem Wert pro Instanzname:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

Alle unterstützten Matcher und die erforderliche Konfiguration finden Sie im [expect-webdriverio Multi-Remote-Leitfaden](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## Zugriff auf eine einzelne Instanz

Instanznamen sind keine Eigenschaften des Multi-Remote-Browsers oder eines Multi-Remote-Elements. `browser.myChromeBrowser` und `elem.myChromeDriver` sind nicht gesetzt. Fordern Sie die Sitzung mit `getInstance` an oder schränken Sie das Multi-Remote-Objekt mit `select` ein:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

Der Testrunner weist weiterhin jeden Instanznamen als eigene globale Variable zu, wenn `injectGlobals` aktiviert bleibt, sodass ein Test `myChromeBrowser.$('button')` aufrufen kann, ohne über `browser` zu gehen. Diese globale Variable ist die einzelne Sitzung aus `getInstance`, kein Feld des Multi-Remote-Objekts.