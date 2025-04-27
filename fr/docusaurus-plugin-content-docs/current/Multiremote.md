---
id: multiremote
title: Multiremote
---

WebdriverIO vous permet d'exécuter plusieurs sessions automatisées dans un seul test. Cela devient pratique lorsque vous testez des fonctionnalités qui nécessitent plusieurs utilisateurs (par exemple, des applications de chat ou WebRTC).

Au lieu de créer plusieurs instances distantes où vous devez exécuter des commandes communes comme [`newSession`](/docs/api/webdriver#newsession) ou [`url`](/docs/api/browser/url) sur chaque instance, vous pouvez simplement créer une instance **multiremote** et contrôler tous les navigateurs en même temps.

Pour ce faire, utilisez simplement la fonction `multiremote()` et passez un objet avec des noms associés à des `capabilities` comme valeurs. En donnant un nom à chaque capacité, vous pouvez facilement sélectionner et accéder à cette instance unique lors de l'exécution de commandes sur une seule instance.

:::info

Multiremote n'est _pas_ destiné à exécuter tous vos tests en parallèle.
Il est conçu pour aider à coordonner plusieurs navigateurs et/ou appareils mobiles pour des tests d'intégration spéciaux (par exemple, des applications de chat).

:::

Toutes les instances multiremote renvoient un tableau de résultats. Le premier résultat représente la capacité définie en premier dans l'objet de capacité, le deuxième résultat la deuxième capacité et ainsi de suite.

## Utilisation du mode autonome

Voici un exemple de création d'une instance multiremote en __mode autonome__ :

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

## Utilisation du testrunner WDIO

Pour utiliser multiremote dans le testrunner WDIO, définissez simplement l'objet `capabilities` dans votre `wdio.conf.js` comme un objet avec les noms des navigateurs comme clés (au lieu d'une liste de capacités) :

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

Cela créera deux sessions WebDriver avec Chrome et Firefox. Au lieu de simplement Chrome et Firefox, vous pouvez également démarrer deux appareils mobiles en utilisant [Appium](http://appium.io) ou un appareil mobile et un navigateur.

Vous pouvez également exécuter multiremote en parallèle en plaçant l'objet de capacités du navigateur dans un tableau. Assurez-vous d'inclure le champ `capabilities` dans chaque navigateur, car c'est ainsi que nous distinguons chaque mode.

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

Vous pouvez même démarrer l'un des [services cloud backend](https://webdriver.io/docs/cloudservices.html) avec des instances Webdriver/Appium locales ou Selenium Standalone. WebdriverIO détecte automatiquement les capacités du backend cloud si vous avez spécifié soit `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), ou `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) dans les capacités du navigateur.

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

Toute combinaison OS/navigateur est possible ici (y compris les navigateurs mobiles et de bureau). Toutes les commandes que vos tests appellent via la variable `browser` sont exécutées en parallèle avec chaque instance. Cela aide à rationaliser vos tests d'intégration et à accélérer leur exécution.

Par exemple, si vous ouvrez une URL :

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Le résultat de chaque commande sera un objet avec les noms des navigateurs comme clé et le résultat de la commande comme valeur, comme ceci :

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Notez que chaque commande est exécutée une par une. Cela signifie que la commande se termine une fois que tous les navigateurs l'ont exécutée. C'est utile car cela maintient les actions du navigateur synchronisées, ce qui facilite la compréhension de ce qui se passe actuellement.

Parfois, il est nécessaire de faire des choses différentes dans chaque navigateur pour tester quelque chose. Par exemple, si nous voulons tester une application de chat, il doit y avoir un navigateur qui envoie un message texte tandis qu'un autre navigateur attend de le recevoir, puis exécute une assertion dessus.

Lors de l'utilisation du testrunner WDIO, il enregistre les noms des navigateurs avec leurs instances dans la portée globale :

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

Dans cet exemple, l'instance `myFirefoxBrowser` commencera à attendre un message une fois que l'instance `myChromeBrowser` aura cliqué sur le bouton `#send`.

Multiremote facilite et rend pratique le contrôle de plusieurs navigateurs, que vous souhaitiez qu'ils fassent la même chose en parallèle ou des choses différentes de concert.

## Accès aux instances de navigateur à l'aide de chaînes via l'objet browser
En plus d'accéder à l'instance du navigateur via leurs variables globales (par exemple, `myChromeBrowser`, `myFirefoxBrowser`), vous pouvez également y accéder via l'objet `browser`, par exemple `browser["myChromeBrowser"]` ou `browser["myFirefoxBrowser"]`. Vous pouvez obtenir une liste de toutes vos instances via `browser.instances`. C'est particulièrement utile lors de l'écriture d'étapes de test réutilisables qui peuvent être effectuées dans l'un ou l'autre navigateur, par exemple :

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

Fichier Cucumber:
    ```feature
    When User A types a message into the chat
    ```

Fichier de définition d'étape:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Extension des types TypeScript

Si vous utilisez TypeScript et souhaitez accéder directement à l'instance du pilote à partir de l'objet multiremote, vous pouvez également étendre les types multiremote pour le faire. Par exemple, étant donné les capacités suivantes :

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

Vous pouvez étendre l'instance multiremote en ajoutant vos noms de pilotes personnalisés, par exemple :

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Maintenant, vous pouvez accéder aux pilotes directement via, par exemple :

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```