---
id: multiremote
title: Multi-remote
description: "Controlla più sessioni di browser o dispositivi da un singolo test con multi-remote, in modalità standalone o con il testrunner WDIO."
---

WebdriverIO ti permette di eseguire più sessioni automatizzate in un singolo test. Questo diventa utile quando stai testando funzionalità che richiedono più utenti (ad esempio, applicazioni di chat o WebRTC).

Invece di creare un paio di istanze remote in cui devi eseguire comandi comuni come [`newSession`](/docs/api/webdriver#newsession) o [`url`](/docs/api/browser/url) su ciascuna istanza, puoi semplicemente creare un'istanza **multi-remote** e controllare tutti i browser contemporaneamente.

Per farlo, usa semplicemente la funzione `multiRemote()` e passale un oggetto con dei nomi come chiavi e delle `capabilities` come valori. Dando un nome a ciascuna capability, puoi facilmente selezionare e accedere a quella singola istanza quando esegui comandi su una singola istanza.

:::info

MultiRemote _non_ è pensato per eseguire tutti i tuoi test in parallelo.
È destinato ad aiutare a coordinare più browser e/o dispositivi mobili per test di integrazione speciali (ad es. applicazioni di chat).

:::

La maggior parte dei comandi multi-remote restituisce un array di risultati. Il primo risultato rappresenta la capability definita per prima nell'oggetto delle capability, il secondo risultato la seconda capability, e così via. `mock()` restituisce un `MultiRemoteMock` invece di un array. Vedi [Cosa restituisce mock()](#what-mock-returns).

## Utilizzo della modalità Standalone

Ecco un esempio di come creare un'istanza multi-remote in __modalità standalone__:

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

    // apre l'url con entrambi i browser contemporaneamente
    await browser.url('http://json.org')

    // chiama i comandi contemporaneamente
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // clicca su un elemento contemporaneamente
    const elem = await browser.$('#someElem')
    await elem.click()

    // clicca solo con un browser (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Utilizzo del Testrunner WDIO

Per usare multi-remote nel testrunner WDIO, definisci semplicemente l'oggetto `capabilities` nel tuo `wdio.conf.js` come un oggetto con i nomi dei browser come chiavi (invece di una lista di capability):

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

Questo creerà due sessioni WebDriver con Chrome e Firefox. Invece di solo Chrome e Firefox puoi anche avviare due dispositivi mobili usando [Appium](http://appium.io) oppure un dispositivo mobile e un browser.

Puoi anche eseguire multi-remote in parallelo inserendo l'oggetto delle capability del browser in un array. Assicurati di includere il campo `capabilities` in ciascun browser, poiché è così che distinguiamo le due modalità.

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

Puoi persino avviare uno dei [backend dei servizi cloud](https://webdriver.io/docs/cloudservices.html) insieme a istanze locali di Webdriver/Appium o Selenium Standalone. WebdriverIO rileva automaticamente le capability dei backend cloud se hai specificato `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) oppure `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) nelle capability del browser.

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

Qui è possibile qualsiasi combinazione di sistema operativo/browser (inclusi browser mobili e desktop). Tutti i comandi che i tuoi test chiamano tramite la variabile `browser` vengono eseguiti in parallelo su ciascuna istanza. Questo aiuta a semplificare i tuoi test di integrazione e ad accelerarne l'esecuzione.

Ad esempio, se apri un URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Il risultato di ogni comando sarà un oggetto con i nomi dei browser come chiave e il risultato del comando come valore, in questo modo:

```js
// esempio con il testrunner wdio
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // restituisce: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // restituisce: 'Firefox 35 on Mac OS X (Yosemite)'
```

Nota che ogni comando viene eseguito uno alla volta. Ciò significa che il comando termina quando tutti i browser lo hanno eseguito. Questo è utile perché mantiene sincronizzate le azioni dei browser, rendendo più facile capire cosa sta succedendo in quel momento.

A volte è necessario fare cose diverse in ciascun browser per testare qualcosa. Ad esempio, se vogliamo testare un'applicazione di chat, deve esserci un browser che invia un messaggio di testo mentre un altro browser attende di riceverlo, per poi eseguire un'asserzione su di esso.

Quando si usa il testrunner WDIO, questo registra i nomi dei browser con le relative istanze nello scope globale:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// attende l'arrivo dei messaggi
await $('.messages').waitForExist()
// verifica se uno dei messaggi contiene il messaggio di Chrome
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

In questo esempio, l'istanza `myFirefoxBrowser` inizierà ad attendere un messaggio non appena l'istanza `myChromeBrowser` avrà cliccato sul pulsante `#send`.

MultiRemote rende facile e comodo controllare più browser, sia che tu voglia che facciano la stessa cosa in parallelo, sia che facciano cose diverse in modo coordinato.

### Cosa restituisce `$`

Su un browser multi-remote, `$`, `custom$` e `react$` restituiscono un `MultiRemoteElement`. Su un elemento multi-remote, anche `shadow$`, `nextElement`, `previousElement` e `parentElement` ne restituiscono uno. I suoi comandi vengono eseguiti su ogni istanza, e `getInstance` fornisce l'elemento di un singolo browser.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // clicca in ogni browser
await button.getInstance('myChromeBrowser').click()  // clicca solo in Chrome
```

### Cosa restituisce `$$`

Su un browser multi-remote, `$$` restituisce un `MultiRemoteElementArray`. Ogni voce è un `MultiRemoteElement` che si rivolge a tutte le istanze contemporaneamente, e l'array stesso contiene le stesse informazioni di un normale `ElementArray`. `custom$$`, `react$$` e, su un elemento multi-remote, `shadow$$` restituiscono lo stesso tipo di lista.

```js
const messages = await $$('.messages')

messages.length      // il numero massimo di elementi trovati da una singola istanza
messages[0]          // un MultiRemoteElement, che si rivolge a tutte le istanze
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // il browser o elemento multi-remote da cui è stato recuperato
messages.isMultiRemote // true, così può essere distinto da un semplice ElementArray

// gli helper asincroni per array sono disponibili, come su un singolo browser
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

Quando le istanze trovano un numero diverso di elementi, una voce non ha alcun elemento per un'istanza che ne ha trovati meno. Per quell'istanza, `getInstance()` genera un errore, e un comando sulla voce fallisce. Usa `select()` con le istanze che hanno l'elemento. Un matcher `expect` sull'intera lista verifica ciascuna istanza con i propri elementi:

```js
// myChromeBrowser trova 3 messaggi, myFirefoxBrowser ne trova 2
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // solo Chrome ha un terzo messaggio
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

Prima della v10 veniva restituito un semplice array a meno che non fosse impostato `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true`. L'array è ora il comportamento predefinito e la variabile d'ambiente è stata rimossa. L'accesso tramite indice è invariato, quindi il codice che leggeva solo `elements[0]` continua a funzionare.

:::

### Cosa restituisce mock() {#what-mock-returns}

Su un browser multi-remote, `mock()` restituisce un `MultiRemoteMock`. Non è un array. `respond()`, `restore()` e gli altri metodi del mock vengono eseguiti su ogni istanza. Le richieste catturate restano sul mock di un singolo browser, quindi leggile con `getInstance`:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js` esegue questo esempio su due sessioni Chrome headless.

`instances` segue l'ordine in cui i mock sono stati creati. Dopo `select()`, tale ordine può differire da `browser.instances`:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // il mock di Chrome, qualunque sia l'ordine
```

`getInstance` genera l'errore `Multi-remote object has no instance named "<name>"` quando `name` non è presente in `instances`.

Per eseguire il mock di un solo browser, chiama `mock()` su quell'istanza:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## Accedere alle istanze del browser tramite stringhe attraverso l'oggetto browser
Oltre ad accedere all'istanza del browser tramite le relative variabili globali (ad es. `myChromeBrowser`, `myFirefoxBrowser`), puoi accedervi anche tramite l'oggetto `browser`, ad es. `browser["myChromeBrowser"]` o `browser["myFirefoxBrowser"]`. Puoi ottenere una lista di tutte le tue istanze tramite `browser.instances`. Questo è particolarmente utile quando si scrivono step di test riutilizzabili che possono essere eseguiti in uno qualsiasi dei browser, ad es.:

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

File di definizione degli step:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Asserzioni

I matcher `expect` supportano browser, elementi e mock multi-remote. Per impostazione predefinita, ogni istanza deve corrispondere al valore atteso:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

Per attendersi un valore diverso per ciascuna istanza, usa `expect.multiRemote()` con un valore per ogni nome di istanza:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

Per tutti i matcher supportati e la configurazione richiesta, consulta la [guida multi-remote di expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## Accedere a una singola istanza

I nomi delle istanze non sono proprietà del browser multi-remote né di un elemento multi-remote. `browser.myChromeBrowser` ed `elem.myChromeDriver` non sono impostati. Richiedi la sessione con `getInstance`, oppure restringi l'oggetto multi-remote con `select`:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

Il testrunner assegna comunque ciascun nome di istanza come variabile globale propria quando `injectGlobals` è lasciato attivo, quindi un test può chiamare `myChromeBrowser.$('button')` senza passare per `browser`. Quella variabile globale è la singola sessione ottenuta da `getInstance`, non un campo dell'oggetto multi-remote.