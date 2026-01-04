---
id: multiremote
title: Multiremote
---

WebdriverIO ermöglicht es Ihnen, mehrere automatisierte Sitzungen in einem einzigen Test auszuführen. Dies ist praktisch, wenn Sie Funktionen testen, die mehrere Benutzer erfordern (zum Beispiel Chat- oder WebRTC-Anwendungen).

Anstatt mehrere Remote-Instanzen zu erstellen, bei denen Sie allgemeine Befehle wie [`newSession`](/docs/api/webdriver#newsession) oder [`url`](/docs/api/browser/url) für jede Instanz ausführen müssen, können Sie einfach eine **multiremote** Instanz erstellen und alle Browser gleichzeitig steuern.

Um dies zu tun, verwenden Sie einfach die Funktion `multiremote()` und übergeben ein Objekt mit Namen, die als Schlüssel für die `capabilities` dienen. Indem Sie jeder Capability einen Namen geben, können Sie diese einzelne Instanz einfach auswählen und darauf zugreifen, wenn Sie Befehle auf einer einzelnen Instanz ausführen.

:::info

Multiremote ist _nicht_ dafür gedacht, alle Ihre Tests parallel auszuführen.
Es soll helfen, mehrere Browser und/oder mobile Geräte für spezielle Integrationstests (z.B. Chat-Anwendungen) zu koordinieren.

:::

Alle Multiremote-Instanzen geben ein Array von Ergebnissen zurück. Das erste Ergebnis repräsentiert die Capability, die im Capability-Objekt zuerst definiert wurde, das zweite Ergebnis die zweite Capability und so weiter.

## Verwendung des Standalone-Modus

Hier ist ein Beispiel, wie man eine Multiremote-Instanz im __Standalone-Modus__ erstellt:

```js
import { multiremote } from 'webdriverio'

(async () => {
    const browser = await multiremote({
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

    // open url with both browser at the same time
    await browser.url('http://json.org')

    // call commands at the same time
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // click on an element at the same time
    const elem = await browser.$('#someElem')
    await elem.click()

    // only click with one browser (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Verwendung des WDIO Testrunners

Um Multiremote im WDIO Testrunner zu verwenden, definieren Sie einfach das `capabilities`-Objekt in Ihrer `wdio.conf.js` als Objekt mit den Browsernamen als Schlüssel (anstelle einer Liste von Capabilities):

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

Dies erstellt zwei WebDriver-Sitzungen mit Chrome und Firefox. Anstatt nur Chrome und Firefox können Sie auch zwei mobile Geräte mit [Appium](http://appium.io) oder ein mobiles Gerät und einen Browser starten.

Sie können Multiremote auch parallel ausführen, indem Sie das Browser-Capabilities-Objekt in ein Array einfügen. Bitte stellen Sie sicher, dass das Feld `capabilities` in jedem Browser enthalten ist, da wir damit die verschiedenen Modi unterscheiden.

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

Sie können sogar einen der [Cloud-Services-Backend](https://webdriver.io/docs/cloudservices.html) zusammen mit lokalen Webdriver/Appium- oder Selenium Standalone-Instanzen starten. WebdriverIO erkennt automatisch Cloud-Backend-Capabilities, wenn Sie entweder `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) oder `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) in den Browser-Capabilities angegeben haben.

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

Jede Art von Betriebssystem/Browser-Kombination ist hier möglich (einschließlich mobiler und Desktop-Browser). Alle Befehle, die Ihre Tests über die `browser`-Variable aufrufen, werden mit jeder Instanz parallel ausgeführt. Dies hilft, Ihre Integrationstests zu optimieren und deren Ausführung zu beschleunigen.

Wenn Sie zum Beispiel eine URL öffnen:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Das Ergebnis jedes Befehls wird ein Objekt sein, mit den Browser-Namen als Schlüssel und dem Befehlsergebnis als Wert, wie hier:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Beachten Sie, dass jeder Befehl nacheinander ausgeführt wird. Das bedeutet, dass der Befehl erst abgeschlossen ist, wenn alle Browser ihn ausgeführt haben. Dies ist hilfreich, weil es die Browser-Aktionen synchronisiert, was es einfacher macht zu verstehen, was gerade passiert.

Manchmal ist es notwendig, in jedem Browser verschiedene Dinge zu tun, um etwas zu testen. Wenn wir zum Beispiel eine Chat-Anwendung testen wollen, muss ein Browser eine Textnachricht senden, während ein anderer Browser darauf wartet, sie zu empfangen, und dann eine Assertion darauf ausführt.

Bei Verwendung des WDIO-Testrunners registriert dieser die Browser-Namen mit ihren Instanzen im globalen Scope:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// wait until messages arrive
await $('.messages').waitForExist()
// check if one of the messages contain the Chrome message
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

In diesem Beispiel beginnt die Instanz `myFirefoxBrowser` auf eine Nachricht zu warten, sobald die Instanz `myChromeBrowser` auf den `#send`-Button geklickt hat.

Multiremote macht es einfach und bequem, mehrere Browser zu steuern, egal ob Sie möchten, dass sie parallel dasselbe tun oder im Zusammenspiel verschiedene Dinge ausführen.

## Zugriff auf Browser-Instanzen mit Strings über das Browser-Objekt
Zusätzlich zum Zugriff auf die Browser-Instanz über ihre globalen Variablen (z.B. `myChromeBrowser`, `myFirefoxBrowser`), können Sie auch über das `browser`-Objekt darauf zugreifen, z.B. `browser["myChromeBrowser"]` oder `browser["myFirefoxBrowser"]`. Sie können eine Liste aller Ihrer Instanzen über `browser.instances` erhalten. Dies ist besonders nützlich, wenn Sie wiederverwendbare Testschritte schreiben, die in einem der beiden Browser ausgeführt werden können, z.B.:

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

## Erweitern der TypeScript-Typen

Wenn Sie TypeScript verwenden und direkt über das Multiremote-Objekt auf die Treiber-Instanz zugreifen möchten, können Sie auch die Multiremote-Typen entsprechend erweitern. Zum Beispiel, bei folgenden Capabilities:

```ts title=wdio.conf.ts
export const config: WebdriverIO.MultiremoteConfig = {
    // ...
    capabilities: {
        myAppiumDriver: {
            // ...
        },
        myChromeDriver: {
            // ...
        }
    }
    // ...
}
```

Sie können die Multiremote-Instanz erweitern, indem Sie Ihre benutzerdefinierten Treibernamen hinzufügen, z.B.:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Jetzt können Sie direkt auf die Treiber zugreifen, z.B.:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```