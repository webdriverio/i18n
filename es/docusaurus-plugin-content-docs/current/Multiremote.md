---
id: multiremote
title: Multiremote
---

WebdriverIO permite ejecutar múltiples sesiones automatizadas en una sola prueba. Esto resulta útil cuando estás probando funcionalidades que requieren múltiples usuarios (por ejemplo, aplicaciones de chat o WebRTC).

En lugar de crear varias instancias remotas donde necesitas ejecutar comandos comunes como [`newSession`](/docs/api/webdriver#newsession) o [`url`](/docs/api/browser/url) en cada instancia, puedes simplemente crear una instancia **multiremote** y controlar todos los navegadores al mismo tiempo.

Para hacerlo, solo usa la función `multiremote()` y pasa un objeto con nombres asociados a `capabilities` como valores. Al darle un nombre a cada capacidad, puedes seleccionar y acceder fácilmente a esa instancia individual cuando ejecutas comandos en una sola instancia.

:::info

Multiremote _no_ está diseñado para ejecutar todas tus pruebas en paralelo.
Está destinado a ayudar a coordinar múltiples navegadores y/o dispositivos móviles para pruebas de integración especiales (por ejemplo, aplicaciones de chat).

:::

Todas las instancias multiremote devuelven un array de resultados. El primer resultado representa la capacidad definida primero en el objeto de capacidades, el segundo resultado la segunda capacidad y así sucesivamente.

## Usando el modo independiente

Aquí hay un ejemplo de cómo crear una instancia multiremote en __modo independiente__:

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

## Usando WDIO Testrunner

Para usar multiremote en el testrunner de WDIO, simplemente define el objeto `capabilities` en tu `wdio.conf.js` como un objeto con los nombres de los navegadores como claves (en lugar de una lista de capacidades):

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

Esto creará dos sesiones WebDriver con Chrome y Firefox. En lugar de solo Chrome y Firefox, también puedes iniciar dos dispositivos móviles usando [Appium](http://appium.io) o un dispositivo móvil y un navegador.

También puedes ejecutar multiremote en paralelo colocando el objeto de capacidades del navegador en un array. Asegúrate de incluir el campo `capabilities` en cada navegador, ya que así es como distinguimos cada modo.

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

Incluso puedes iniciar uno de los [servicios en la nube](https://webdriver.io/docs/cloudservices.html) junto con instancias locales de Webdriver/Appium o Selenium Standalone. WebdriverIO detecta automáticamente las capacidades de backend en la nube si especificaste `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) o `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) en las capacidades del navegador.

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

Cualquier tipo de combinación de SO/navegador es posible aquí (incluidos navegadores móviles y de escritorio). Todos los comandos que tus pruebas llaman a través de la variable `browser` se ejecutan en paralelo con cada instancia. Esto ayuda a agilizar tus pruebas de integración y acelerar su ejecución.

Por ejemplo, si abres una URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

El resultado de cada comando será un objeto con los nombres de los navegadores como clave y el resultado del comando como valor, así:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Ten en cuenta que cada comando se ejecuta uno por uno. Esto significa que el comando finaliza una vez que todos los navegadores lo han ejecutado. Esto es útil porque mantiene sincronizadas las acciones del navegador, lo que facilita la comprensión de lo que está sucediendo actualmente.

A veces es necesario hacer cosas diferentes en cada navegador para probar algo. Por ejemplo, si queremos probar una aplicación de chat, debe haber un navegador que envíe un mensaje de texto mientras otro navegador espera recibirlo y luego ejecuta una afirmación sobre él.

Cuando se usa el testrunner WDIO, registra los nombres de los navegadores con sus instancias en el ámbito global:

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

En este ejemplo, la instancia `myFirefoxBrowser` comenzará a esperar un mensaje una vez que la instancia `myChromeBrowser` haya hecho clic en el botón `#send`.

Multiremote hace que sea fácil y conveniente controlar múltiples navegadores, ya sea que quieras que hagan lo mismo en paralelo o cosas diferentes en conjunto.

## Accediendo a instancias de navegador usando cadenas a través del objeto browser
Además de acceder a la instancia del navegador a través de sus variables globales (por ejemplo, `myChromeBrowser`, `myFirefoxBrowser`), también puedes acceder a ellas a través del objeto `browser`, por ejemplo, `browser["myChromeBrowser"]` o `browser["myFirefoxBrowser"]`. Puedes obtener una lista de todas tus instancias a través de `browser.instances`. Esto es especialmente útil cuando escribes pasos de prueba reutilizables que se pueden realizar en cualquier navegador, por ejemplo:

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

Archivo Cucumber:
    ```feature
    When User A types a message into the chat
    ```

Archivo de definición de pasos:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Extendiendo tipos de TypeScript

Si estás usando TypeScript y quieres acceder a la instancia del controlador directamente desde el objeto multiremote, también puedes extender los tipos multiremote para hacerlo. Por ejemplo, dadas las siguientes capacidades:

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

Puedes extender la instancia multiremote agregando tus nombres de controladores personalizados, por ejemplo:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Ahora puedes acceder a los controladores directamente a través de, por ejemplo:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```