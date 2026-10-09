---
id: customcommands
title: Comandos personalizados
description: "Añade tus propios comandos de navegador y de elemento con addCommand, sobrescribe comandos existentes y extiende las definiciones de tipos de TypeScript."
---

Si quieres extender la instancia de `browser` con tu propio conjunto de comandos, el método de navegador `addCommand` está aquí para ti. Puedes escribir tu comando de forma asíncrona, igual que en tus specs.

## Parámetros

### Nombre del comando

<Option type="String">

Un nombre que define el comando y que se adjuntará al ámbito del navegador o del elemento.

</Option>

### Función personalizada

<Option type="Function">

Una función que se ejecuta cuando se llama al comando. El ámbito `this` es [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) o `WebdriverIO.BrowsingContext`, dependiendo de si el comando se adjunta al navegador, a los elementos o a los contextos de navegación.

</Option>

### Opciones

Objeto con opciones de configuración que modifican el comportamiento del comando personalizado

#### Ámbito de destino

<Option type="Boolean" default="false" name="attachToElement">

Indicador para decidir si se adjunta el comando al ámbito del navegador o del elemento. Si se establece en `true`, el comando será un comando de elemento.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

Indicador para adjuntar el comando a cada contexto de navegación: las pestañas, ventanas y frames que devuelven `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` y `context.frame()` en una sesión de WebDriver BiDi. No se puede combinar con `attachToElement`. Consulta [Contextos de navegación](#browsing-contexts).

</Option>

#### Desactivar implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

Indicador para decidir si se espera implícitamente a que el elemento exista antes de llamar al comando personalizado.

</Option>

## Ejemplos

Este ejemplo muestra cómo añadir un nuevo comando que devuelve la URL y el título actuales como un único resultado. El ámbito (`this`) es un objeto [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` se refiere al ámbito de `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Además, puedes extender la instancia del elemento con tu propio conjunto de comandos estableciendo `attachToElement` en `true`. En este caso, el ámbito (`this`) es un objeto [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` es el valor de retorno de $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Por defecto, los comandos personalizados de elemento esperan a que el elemento exista antes de llamar al comando personalizado. Aunque la mayoría de las veces esto es lo deseado, si no lo es, se puede desactivar con `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` es el valor de retorno de $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

Los comandos personalizados te dan la oportunidad de agrupar una secuencia específica de comandos que usas con frecuencia en una sola llamada. Puedes definir comandos personalizados en cualquier punto de tu suite de pruebas; solo asegúrate de que el comando esté definido *antes* de su primer uso. (El hook `before` en tu `wdio.conf.js` es un buen lugar para crearlos).

Una vez definidos, puedes usarlos de la siguiente manera:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Nota:__ Si registras un comando personalizado en el ámbito de `browser`, el comando no será accesible para los elementos. Del mismo modo, si registras un comando en el ámbito del elemento, no será accesible en el ámbito de `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // muestra "function"
console.log(typeof elem.myCustomBrowserCommand()) // muestra "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // muestra "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // muestra "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // muestra "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // muestra "2"
```

__Nota:__ Si necesitas encadenar un comando personalizado, el comando debe terminar con `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Ten cuidado de no sobrecargar el ámbito de `browser` con demasiados comandos personalizados.

Recomendamos definir la lógica personalizada en [page objects](pageobjects), para que estén vinculados a una página específica.

### Contextos de navegación

En una sesión de WebDriver BiDi, una pestaña, una ventana y un frame son cada uno un `WebdriverIO.BrowsingContext`. Establece `attachToBrowsingContext` en `true` para añadir un comando a todos ellos. El ámbito (`this`) es el contexto en el que se llamó al comando, y `this.browser` es el navegador al que pertenece:

```js
browser.addCommand('heading', async function () {
    // `this` es la pestaña, ventana o frame
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

El comando está disponible en los contextos que ya existen y en cada contexto creado posteriormente, incluidos los frames de otro origen. Un comando que solo tiene sentido para una pestaña o ventana puede comprobar `this.isFrame`.

`addCommand` y `overwriteCommand` sobre un contexto de navegación en sí lanzan un error. Registra el comando en el navegador.

### Multi-remote

`addCommand` funciona de manera similar para multi-remote, excepto que el nuevo comando se propagará a las instancias hijas. Debes tener cuidado al usar el objeto `this`, ya que el `browser` multi-remote y sus instancias hijas tienen un `this` diferente.

Este ejemplo muestra cómo añadir un nuevo comando para multi-remote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` se refiere a:
    //      - el ámbito de MultiRemoteBrowser para browser
    //      - el ámbito de Browser para las instancias
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Extender las definiciones de tipos

Con TypeScript, es fácil extender las interfaces de WebdriverIO. Añade tipos a tus comandos personalizados de esta manera:

1. Crea un archivo de definición de tipos (p. ej., `./src/types/wdio.d.ts`)
2. a. Si usas un archivo de definición de tipos de estilo módulo (usando import/export y `declare global WebdriverIO` en el archivo de definición de tipos), asegúrate de incluir la ruta del archivo en la propiedad `include` de `tsconfig.json`.

   b. Si usas archivos de definición de tipos de estilo ambiental (sin import/export en los archivos de definición de tipos y `declare namespace WebdriverIO` para los comandos personalizados), asegúrate de que `tsconfig.json` *no* contenga ninguna sección `include`, ya que esto hará que TypeScript no reconozca todos los archivos de definición de tipos que no estén listados en la sección `include`.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. Añade las definiciones para tus comandos según tu modo de ejecución.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }

        interface BrowsingContext {
            contextCustomCommand: (arg: any) => Promise<string>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }

    interface BrowsingContext {
        contextCustomCommand: (arg: any) => Promise<string>
    }
}
```

</TabItem>
</Tabs>

## Integrar bibliotecas de terceros

Si usas bibliotecas externas (p. ej., para hacer llamadas a bases de datos) que admiten promesas, una buena forma de integrarlas es envolver ciertos métodos de la API con un comando personalizado.

Al devolver la promesa, WebdriverIO se asegura de no continuar con el siguiente comando hasta que la promesa se resuelva. Si la promesa es rechazada, el comando lanzará un error.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Luego, simplemente úsalo en tus specs de prueba de WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // devuelve el cuerpo de la respuesta
})
```

**Nota:** El resultado de tu comando personalizado es el resultado de la promesa que devuelves.

## Sobrescribir comandos

También puedes sobrescribir comandos nativos con `overwriteCommand`.

No se recomienda hacer esto, ¡porque puede provocar un comportamiento impredecible del framework!

El enfoque general es similar a `addCommand`; la única diferencia es que el primer argumento de la función del comando es la función original que vas a sobrescribir. Consulta algunos ejemplos a continuación.

### Sobrescribir comandos del navegador

```js
/**
 * Imprime los milisegundos antes de la pausa y devuelve su valor.
 *
 * @param pause - nombre del comando a sobrescribir
 * @param this of func - la instancia original del navegador en la que se llamó a la función
 * @param originalPauseFunction of func - la función pause original
 * @param ms of func - los parámetros reales pasados
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// luego úsalo como antes
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Sobrescribir comandos de elemento

Sobrescribir comandos a nivel de elemento es casi lo mismo. Establece `attachToElement` en `true`:

```js
/**
 * Intenta desplazarse hasta el elemento si no se puede hacer clic en él.
 * Pasa { force: true } para hacer clic con JS incluso si el elemento no es visible o no se puede hacer clic en él.
 * Muestra que el tipo de argumento de la función original se puede mantener con `options?: ClickOptions`
 *
 * @param this of func - el elemento en el que se llamó a la función original
 * @param originalClickFunction of func - la función pause original
 * @param options of func - los parámetros reales pasados
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // intenta hacer clic
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // desplázate hasta el elemento y haz clic de nuevo
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // haciendo clic con js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // No olvides adjuntarlo al elemento
)

// luego úsalo como antes
const elem = await $('body')
await elem.click()

// o pasa parámetros
await elem.click({ force: true })
```

### Sobrescribir comandos de contextos de navegación

Establece `attachToBrowsingContext` en `true` para sobrescribir un comando integrado o personalizado de cada pestaña, ventana y frame. El comando original está vinculado al contexto en el que se llamó:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## Añadir más comandos de WebDriver

Si usas el protocolo WebDriver y ejecutas pruebas en una plataforma que admite comandos adicionales no definidos por ninguna de las definiciones de protocolo en [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), puedes añadirlos manualmente a través de la interfaz `addCommand`. El paquete `webdriver` ofrece un envoltorio de comandos que permite registrar estos nuevos endpoints de la misma manera que otros comandos, proporcionando las mismas comprobaciones de parámetros y el mismo manejo de errores. Para registrar este nuevo endpoint, importa el envoltorio de comandos y registra un nuevo comando con él de la siguiente manera:

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

Llamar a este comando con parámetros no válidos produce el mismo manejo de errores que los comandos de protocolo predefinidos, p. ej.:

```js
// llama al comando sin el parámetro de url requerido ni el payload
await browser.myNewCommand()

/**
 * produce el siguiente error:
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

Llamar al comando correctamente, p. ej. `browser.myNewCommand('foo', 'bar')`, realiza correctamente una petición WebDriver a, p. ej., `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` con un payload como `{ foo: 'bar' }`.

:::note
El parámetro de url `:sessionId` se sustituirá automáticamente por el id de sesión de la sesión de WebDriver. Se pueden aplicar otros parámetros de url, pero deben definirse dentro de `variables`.
:::

Consulta ejemplos de cómo se pueden definir los comandos de protocolo en el paquete [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).