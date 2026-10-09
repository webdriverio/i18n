---
id: multiremote
title: Multi-remote
description: "Controla múltiples sesiones de navegador o dispositivo desde una sola prueba con multi-remote, en modo standalone o con el testrunner de WDIO."
---

WebdriverIO te permite ejecutar múltiples sesiones automatizadas en una sola prueba. Esto resulta útil cuando estás probando funcionalidades que requieren múltiples usuarios (por ejemplo, aplicaciones de chat o WebRTC).

En lugar de crear un par de instancias remotas en las que necesitas ejecutar comandos comunes como [`newSession`](/docs/api/webdriver#newsession) o [`url`](/docs/api/browser/url) en cada instancia, simplemente puedes crear una instancia **multi-remote** y controlar todos los navegadores al mismo tiempo.

Para hacerlo, solo usa la función `multiRemote()` y pásale un objeto con nombres como claves y `capabilities` como valores. Al darle un nombre a cada capability, puedes seleccionar y acceder fácilmente a esa instancia individual al ejecutar comandos en una sola instancia.

:::info

MultiRemote _no_ está pensado para ejecutar todas tus pruebas en paralelo.
Está destinado a ayudar a coordinar múltiples navegadores y/o dispositivos móviles para pruebas de integración especiales (p. ej., aplicaciones de chat).

:::

La mayoría de los comandos multi-remote devuelven un array de resultados. El primer resultado representa la capability definida primero en el objeto de capabilities, el segundo resultado la segunda capability, y así sucesivamente. `mock()` devuelve un `MultiRemoteMock` en lugar de un array. Consulta [Qué devuelve mock()](#what-mock-returns).

## Uso del modo standalone

Aquí tienes un ejemplo de cómo crear una instancia multi-remote en __modo standalone__:

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

    // abrir la url con ambos navegadores al mismo tiempo
    await browser.url('http://json.org')

    // llamar comandos al mismo tiempo
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // hacer clic en un elemento al mismo tiempo
    const elem = await browser.$('#someElem')
    await elem.click()

    // hacer clic solo con un navegador (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Uso del testrunner de WDIO

Para usar multi-remote en el testrunner de WDIO, simplemente define el objeto `capabilities` en tu `wdio.conf.js` como un objeto con los nombres de los navegadores como claves (en lugar de una lista de capabilities):

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

Esto creará dos sesiones de WebDriver con Chrome y Firefox. En lugar de solo Chrome y Firefox, también puedes iniciar dos dispositivos móviles usando [Appium](http://appium.io) o un dispositivo móvil y un navegador.

También puedes ejecutar multi-remote en paralelo colocando el objeto de capabilities de los navegadores en un array. Asegúrate de incluir el campo `capabilities` en cada navegador, ya que así es como distinguimos cada modo.

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

Incluso puedes iniciar uno de los [backends de servicios en la nube](https://webdriver.io/docs/cloudservices.html) junto con instancias locales de Webdriver/Appium o Selenium Standalone. WebdriverIO detecta automáticamente las capabilities de backends en la nube si especificaste `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) o `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) en las capabilities del navegador.

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

Cualquier combinación de sistema operativo/navegador es posible aquí (incluidos navegadores móviles y de escritorio). Todos los comandos que tus pruebas llaman a través de la variable `browser` se ejecutan en paralelo con cada instancia. Esto ayuda a agilizar tus pruebas de integración y acelerar su ejecución.

Por ejemplo, si abres una URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

El resultado de cada comando será un objeto con los nombres de los navegadores como clave y el resultado del comando como valor, así:

```js
// ejemplo con el testrunner de wdio
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // devuelve: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // devuelve: 'Firefox 35 on Mac OS X (Yosemite)'
```

Observa que cada comando se ejecuta uno por uno. Esto significa que el comando termina una vez que todos los navegadores lo han ejecutado. Esto es útil porque mantiene sincronizadas las acciones de los navegadores, lo que facilita entender lo que está sucediendo en cada momento.

A veces es necesario hacer cosas diferentes en cada navegador para probar algo. Por ejemplo, si queremos probar una aplicación de chat, tiene que haber un navegador que envíe un mensaje de texto mientras otro navegador espera recibirlo, y luego ejecutar una aserción sobre él.

Al usar el testrunner de WDIO, este registra los nombres de los navegadores con sus instancias en el ámbito global:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// esperar hasta que lleguen los mensajes
await $('.messages').waitForExist()
// comprobar si uno de los mensajes contiene el mensaje de Chrome
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

En este ejemplo, la instancia `myFirefoxBrowser` comenzará a esperar un mensaje una vez que la instancia `myChromeBrowser` haya hecho clic en el botón `#send`.

MultiRemote hace que sea fácil y conveniente controlar múltiples navegadores, ya sea que quieras que hagan lo mismo en paralelo o cosas diferentes de forma coordinada.

### Qué devuelve `$`

En un navegador multi-remote, `$`, `custom$` y `react$` devuelven un `MultiRemoteElement`. En un elemento multi-remote, `shadow$`, `nextElement`, `previousElement` y `parentElement` también devuelven uno. Sus comandos se ejecutan en todas las instancias, y `getInstance` proporciona el elemento de un navegador.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // hace clic en todos los navegadores
await button.getInstance('myChromeBrowser').click()  // hace clic solo en Chrome
```

### Qué devuelve `$$`

En un navegador multi-remote, `$$` devuelve un `MultiRemoteElementArray`. Cada entrada es un `MultiRemoteElement` que se dirige a todas las instancias a la vez, y el propio array contiene la misma información que un `ElementArray` normal. `custom$$`, `react$$` y, en un elemento multi-remote, `shadow$$` devuelven el mismo tipo de lista.

```js
const messages = await $$('.messages')

messages.length      // el mayor número de elementos que encontró una instancia
messages[0]          // un MultiRemoteElement, que se dirige a todas las instancias
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // el navegador o elemento multi-remote del que se obtuvo
messages.isMultiRemote // true, para poder distinguirlo de un ElementArray simple

// los helpers asíncronos de array están disponibles, como en un solo navegador
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

Cuando las instancias encuentran un número diferente de elementos, una entrada no tiene elemento para una instancia que encontró menos. Para esa instancia, `getInstance()` lanza un error y un comando sobre la entrada falla. Usa `select()` con las instancias que tienen el elemento. Un matcher de `expect` sobre la lista completa comprueba cada instancia con sus propios elementos:

```js
// myChromeBrowser encuentra 3 mensajes, myFirefoxBrowser encuentra 2
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // solo Chrome tiene un tercer mensaje
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

Antes de la v10 esto devolvía un array simple a menos que se estableciera `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true`. El array ahora es el comportamiento predeterminado y la variable de entorno se ha eliminado. El acceso por índice no ha cambiado, por lo que el código que solo leía `elements[0]` sigue funcionando.

:::

### Qué devuelve mock() {#what-mock-returns}

En un navegador multi-remote, `mock()` devuelve un `MultiRemoteMock`. No es un array. `respond()`, `restore()` y los demás métodos del mock se ejecutan en todas las instancias. Las solicitudes capturadas permanecen en el mock de cada navegador, así que léelas con `getInstance`:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js` ejecuta esto contra dos sesiones de Chrome headless.

`instances` sigue el orden en el que se crearon los mocks. Después de `select()`, ese orden puede diferir de `browser.instances`:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // el mock de Chrome, sea cual sea el orden
```

`getInstance` lanza `Multi-remote object has no instance named "<name>"` cuando `name` no está en `instances`.

Para hacer mock solo en un navegador, llama a `mock()` en esa instancia:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## Acceder a las instancias del navegador mediante strings a través del objeto browser
Además de acceder a la instancia del navegador a través de sus variables globales (p. ej., `myChromeBrowser`, `myFirefoxBrowser`), también puedes acceder a ellas a través del objeto `browser`, p. ej., `browser["myChromeBrowser"]` o `browser["myFirefoxBrowser"]`. Puedes obtener una lista de todas tus instancias a través de `browser.instances`. Esto es especialmente útil al escribir pasos de prueba reutilizables que pueden realizarse en cualquiera de los navegadores, p. ej.:

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

Archivo de Cucumber:
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

## Aserciones

Los matchers de `expect` admiten navegadores, elementos y mocks multi-remote. De forma predeterminada, cada instancia debe coincidir con el valor esperado:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

Para esperar un valor diferente por instancia, usa `expect.multiRemote()` con un valor por cada nombre de instancia:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

Para ver todos los matchers compatibles y la configuración requerida, consulta la [guía de multi-remote de expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## Acceder a una instancia

Los nombres de las instancias no son propiedades del navegador multi-remote ni de un elemento multi-remote. `browser.myChromeBrowser` y `elem.myChromeDriver` no están definidos. Solicita la sesión con `getInstance`, o restringe el objeto multi-remote con `select`:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

El testrunner sigue asignando cada nombre de instancia como su propia variable global cuando `injectGlobals` permanece activado, por lo que una prueba puede llamar a `myChromeBrowser.$('button')` sin pasar por `browser`. Esa variable global es la sesión individual de `getInstance`, no un campo del objeto multi-remote.