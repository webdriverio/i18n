---
id: multiremote
title: Multi-remote
description: "Contrôlez plusieurs sessions de navigateur ou d'appareil depuis un seul test avec le multi-remote, en mode autonome ou avec le testrunner WDIO."
---

WebdriverIO vous permet d'exécuter plusieurs sessions automatisées dans un seul test. Cela devient pratique lorsque vous testez des fonctionnalités qui nécessitent plusieurs utilisateurs (par exemple, des applications de chat ou WebRTC).

Au lieu de créer plusieurs instances distantes sur chacune desquelles vous devez exécuter des commandes communes comme [`newSession`](/docs/api/webdriver#newsession) ou [`url`](/docs/api/browser/url), vous pouvez simplement créer une instance **multi-remote** et contrôler tous les navigateurs en même temps.

Pour ce faire, utilisez simplement la fonction `multiRemote()` et passez-lui un objet dont les clés sont des noms et les valeurs des `capabilities`. En donnant un nom à chaque capability, vous pouvez facilement sélectionner et accéder à cette instance unique lorsque vous exécutez des commandes sur une seule instance.

:::info

MultiRemote n'est _pas_ conçu pour exécuter tous vos tests en parallèle.
Il est destiné à aider à coordonner plusieurs navigateurs et/ou appareils mobiles pour des tests d'intégration spécifiques (par exemple, des applications de chat).

:::

La plupart des commandes multi-remote renvoient un tableau de résultats. Le premier résultat correspond à la capability définie en premier dans l'objet de capabilities, le deuxième résultat à la deuxième capability, et ainsi de suite. `mock()` renvoie un `MultiRemoteMock` au lieu d'un tableau. Voir [Ce que renvoie mock()](#what-mock-returns).

## Utilisation du mode autonome

Voici un exemple de création d'une instance multi-remote en __mode autonome__ :

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

    // ouvrir l'url avec les deux navigateurs en même temps
    await browser.url('http://json.org')

    // appeler des commandes en même temps
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // cliquer sur un élément en même temps
    const elem = await browser.$('#someElem')
    await elem.click()

    // cliquer uniquement avec un navigateur (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Utilisation du testrunner WDIO

Pour utiliser le multi-remote dans le testrunner WDIO, définissez simplement l'objet `capabilities` dans votre `wdio.conf.js` comme un objet ayant les noms des navigateurs comme clés (au lieu d'une liste de capabilities) :

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

Cela créera deux sessions WebDriver avec Chrome et Firefox. Au lieu de seulement Chrome et Firefox, vous pouvez également démarrer deux appareils mobiles en utilisant [Appium](http://appium.io), ou un appareil mobile et un navigateur.

Vous pouvez également exécuter le multi-remote en parallèle en plaçant l'objet de capabilities des navigateurs dans un tableau. Assurez-vous d'inclure le champ `capabilities` dans chaque navigateur, car c'est ainsi que nous distinguons chaque mode.

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

Vous pouvez même démarrer l'un des [backends de services cloud](https://webdriver.io/docs/cloudservices.html) avec des instances locales de Webdriver/Appium ou de Selenium Standalone. WebdriverIO détecte automatiquement les capabilities de backend cloud si vous avez spécifié `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) ou `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) dans les capabilities du navigateur.

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

Toute combinaison de système d'exploitation et de navigateur est possible ici (y compris les navigateurs mobiles et de bureau). Toutes les commandes que vos tests appellent via la variable `browser` sont exécutées en parallèle sur chaque instance. Cela aide à simplifier vos tests d'intégration et à accélérer leur exécution.

Par exemple, si vous ouvrez une URL :

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Le résultat de chaque commande sera un objet avec les noms des navigateurs comme clés et le résultat de la commande comme valeur, comme ceci :

```js
// exemple avec le testrunner wdio
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // renvoie : 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // renvoie : 'Firefox 35 on Mac OS X (Yosemite)'
```

Notez que chaque commande est exécutée l'une après l'autre. Cela signifie que la commande se termine une fois que tous les navigateurs l'ont exécutée. C'est utile car cela maintient les actions des navigateurs synchronisées, ce qui facilite la compréhension de ce qui se passe à un moment donné.

Parfois, il est nécessaire d'effectuer des actions différentes dans chaque navigateur pour tester quelque chose. Par exemple, si nous voulons tester une application de chat, il doit y avoir un navigateur qui envoie un message texte pendant qu'un autre navigateur attend de le recevoir, puis exécute une assertion dessus.

Lors de l'utilisation du testrunner WDIO, celui-ci enregistre les noms des navigateurs avec leurs instances dans la portée globale :

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// attendre l'arrivée des messages
await $('.messages').waitForExist()
// vérifier si l'un des messages contient le message de Chrome
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

Dans cet exemple, l'instance `myFirefoxBrowser` commencera à attendre un message dès que l'instance `myChromeBrowser` aura cliqué sur le bouton `#send`.

MultiRemote permet de contrôler facilement et commodément plusieurs navigateurs, que vous souhaitiez qu'ils fassent la même chose en parallèle ou des choses différentes de manière coordonnée.

### Ce que renvoie `$`

Sur un navigateur multi-remote, `$`, `custom$` et `react$` renvoient un `MultiRemoteElement`. Sur un élément multi-remote, `shadow$`, `nextElement`, `previousElement` et `parentElement` en renvoient également un. Ses commandes s'exécutent sur chaque instance, et `getInstance` donne l'élément d'un navigateur.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // clique dans chaque navigateur
await button.getInstance('myChromeBrowser').click()  // clique uniquement dans Chrome
```

### Ce que renvoie `$$`

Sur un navigateur multi-remote, `$$` renvoie un `MultiRemoteElementArray`. Chaque entrée est un `MultiRemoteElement` qui cible toutes les instances à la fois, et le tableau lui-même contient les mêmes informations qu'un `ElementArray` classique. `custom$$`, `react$$` et, sur un élément multi-remote, `shadow$$` renvoient le même type de liste.

```js
const messages = await $$('.messages')

messages.length      // le plus grand nombre d'éléments trouvés par une instance
messages[0]          // un MultiRemoteElement, ciblant toutes les instances
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // le navigateur ou l'élément multi-remote à partir duquel il a été récupéré
messages.isMultiRemote // true, pour pouvoir le distinguer d'un ElementArray simple

// les helpers de tableau asynchrones sont disponibles, comme sur un seul navigateur
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

Lorsque les instances trouvent un nombre différent d'éléments, une entrée n'a pas d'élément pour une instance qui en a trouvé moins. Pour cette instance, `getInstance()` lève une erreur, et une commande sur l'entrée échoue. Utilisez `select()` avec les instances qui possèdent l'élément. Un matcher `expect` sur la liste entière vérifie chaque instance avec ses propres éléments :

```js
// myChromeBrowser trouve 3 messages, myFirefoxBrowser en trouve 2
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // seul Chrome a un troisième message
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

Avant la v10, cela renvoyait un tableau simple, sauf si `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true` était défini. Ce tableau est désormais le comportement par défaut et la variable d'environnement a été supprimée. L'accès par index reste inchangé, donc le code qui lisait uniquement `elements[0]` continue de fonctionner.

:::

### Ce que renvoie mock() {#what-mock-returns}

Sur un navigateur multi-remote, `mock()` renvoie un `MultiRemoteMock`. Ce n'est pas un tableau. `respond()`, `restore()` et les autres méthodes de mock s'exécutent sur chaque instance. Les requêtes capturées restent sur le mock d'un navigateur, lisez-les donc avec `getInstance` :

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js` exécute cet exemple sur deux sessions Chrome headless.

`instances` suit l'ordre dans lequel les mocks ont été créés. Après `select()`, cet ordre peut différer de `browser.instances` :

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // le mock Chrome, quel que soit l'ordre
```

`getInstance` lève `Multi-remote object has no instance named "<name>"` lorsque `name` ne figure pas dans `instances`.

Pour mocker un seul navigateur, appelez `mock()` sur cette instance :

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## Accéder aux instances de navigateur à l'aide de chaînes via l'objet browser
En plus d'accéder à l'instance du navigateur via leurs variables globales (par exemple `myChromeBrowser`, `myFirefoxBrowser`), vous pouvez également y accéder via l'objet `browser`, par exemple `browser["myChromeBrowser"]` ou `browser["myFirefoxBrowser"]`. Vous pouvez obtenir la liste de toutes vos instances via `browser.instances`. C'est particulièrement utile pour écrire des étapes de test réutilisables pouvant être exécutées dans l'un ou l'autre navigateur, par exemple :

wdio.conf.js :
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

Fichier Cucumber :
    ```feature
    When User A types a message into the chat
    ```

Fichier de définition des étapes :
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Assertions

Les matchers `expect` prennent en charge les navigateurs, éléments et mocks multi-remote. Par défaut, chaque instance doit correspondre à la valeur attendue :

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

Pour attendre une valeur différente par instance, utilisez `expect.multiRemote()` avec une valeur par nom d'instance :

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

Pour tous les matchers pris en charge et la configuration requise, consultez le [guide multi-remote d'expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## Accéder à une instance

Les noms d'instance ne sont pas des propriétés du navigateur multi-remote ni d'un élément multi-remote. `browser.myChromeBrowser` et `elem.myChromeDriver` ne sont pas définis. Demandez la session avec `getInstance`, ou restreignez l'objet multi-remote avec `select` :

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

Le testrunner assigne toujours chaque nom d'instance comme une variable globale distincte lorsque `injectGlobals` reste activé, de sorte qu'un test peut appeler `myChromeBrowser.$('button')` sans passer par `browser`. Cette variable globale est la session unique obtenue via `getInstance`, et non un champ de l'objet multi-remote.