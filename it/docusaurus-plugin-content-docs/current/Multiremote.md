---
id: multiremote
title: Multiremote
---

WebdriverIO consente di eseguire più sessioni automatizzate in un singolo test. Questo è utile quando si testano funzionalità che richiedono più utenti (ad esempio, applicazioni di chat o WebRTC).

Invece di creare diverse istanze remote in cui è necessario eseguire comandi comuni come [`newSession`](/docs/api/webdriver#newsession) o [`url`](/docs/api/browser/url) su ciascuna istanza, è possibile creare semplicemente un'istanza **multiremote** e controllare tutti i browser contemporaneamente.

Per farlo, utilizza la funzione `multiremote()` e passa un oggetto con nomi associati a `capabilities` come valori. Assegnando un nome a ciascuna capability, puoi facilmente selezionare e accedere a quella singola istanza quando esegui comandi su un'istanza specifica.

:::info

Multiremote _non_ è pensato per eseguire tutti i tuoi test in parallelo.
È destinato ad aiutare a coordinare più browser e/o dispositivi mobili per test di integrazione speciali (ad esempio applicazioni di chat).

:::

Tutte le istanze multiremote restituiscono un array di risultati. Il primo risultato rappresenta la capability definita per prima nell'oggetto delle capability, il secondo risultato la seconda capability e così via.

## Utilizzo in modalità Standalone

Ecco un esempio di come creare un'istanza multiremote in __modalità standalone__:

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

## Utilizzo con WDIO Testrunner

Per utilizzare multiremote nel testrunner WDIO, è sufficiente definire l'oggetto `capabilities` nel tuo `wdio.conf.js` come un oggetto con i nomi dei browser come chiavi (invece di un elenco di capability):

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

Questo creerà due sessioni WebDriver con Chrome e Firefox. Invece di solo Chrome e Firefox, puoi anche avviare due dispositivi mobili utilizzando [Appium](http://appium.io) o un dispositivo mobile e un browser.

Puoi anche eseguire multiremote in parallelo inserendo l'oggetto delle capability del browser in un array. Assicurati di includere il campo `capabilities` in ciascun browser, poiché è così che distinguiamo ogni modalità.

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

Puoi persino avviare uno dei [backend di servizi cloud](https://webdriver.io/docs/cloudservices.html) insieme a istanze locali di Webdriver/Appium o Selenium Standalone. WebdriverIO rileva automaticamente le capability del backend cloud se hai specificato `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) o `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) nelle capability del browser.

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

Qui è possibile qualsiasi combinazione di OS/browser (inclusi browser mobili e desktop). Tutti i comandi che i tuoi test chiamano tramite la variabile `browser` vengono eseguiti in parallelo con ogni istanza. Questo aiuta a semplificare i test di integrazione e accelerare la loro esecuzione.

Ad esempio, se apri un URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Il risultato di ogni comando sarà un oggetto con i nomi dei browser come chiave e il risultato del comando come valore, così:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Nota che ogni comando viene eseguito uno per uno. Ciò significa che il comando termina una volta che tutti i browser lo hanno eseguito. Questo è utile perché mantiene sincronizzate le azioni del browser, il che rende più facile capire cosa sta accadendo attualmente.

A volte è necessario fare cose diverse in ogni browser per testare qualcosa. Ad esempio, se vogliamo testare un'applicazione di chat, deve esserci un browser che invia un messaggio di testo mentre un altro browser attende di riceverlo, per poi eseguire un'asserzione su di esso.

Quando si utilizza il testrunner WDIO, registra i nomi dei browser con le loro istanze nello scope globale:

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

In questo esempio, l'istanza `myFirefoxBrowser` inizierà ad attendere un messaggio una volta che l'istanza `myChromeBrowser` ha cliccato sul pulsante `#send`.

Multiremote rende facile e conveniente controllare più browser, sia che tu voglia farli fare la stessa cosa in parallelo, o cose diverse in modo coordinato.

## Accesso alle istanze del browser tramite stringhe tramite l'oggetto browser
Oltre ad accedere all'istanza del browser tramite le loro variabili globali (ad es. `myChromeBrowser`, `myFirefoxBrowser`), puoi anche accedervi tramite l'oggetto `browser`, ad es. `browser["myChromeBrowser"]` o `browser["myFirefoxBrowser"]`. Puoi ottenere un elenco di tutte le tue istanze tramite `browser.instances`. Questo è particolarmente utile quando si scrivono passaggi di test riutilizzabili che possono essere eseguiti in entrambi i browser, ad esempio:

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

File Cucumber:
    ```feature
    When User A types a message into the chat
    ```

File di definizione dei passaggi:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Estensione dei tipi TypeScript

Se stai utilizzando TypeScript e desideri accedere direttamente all'istanza del driver dall'oggetto multiremote, puoi anche estendere i tipi multiremote per farlo. Ad esempio, date le seguenti capability:

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

Puoi estendere l'istanza multiremote aggiungendo i tuoi nomi di driver personalizzati, ad esempio:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Ora puoi accedere ai driver direttamente tramite, ad esempio:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```