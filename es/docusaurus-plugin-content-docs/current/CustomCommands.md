---
id: customcommands
title: Comandos Personalizados
---

Si quieres extender la instancia del `browser` con tu propio conjunto de comandos, el método del navegador `addCommand` está aquí para ti. Puedes escribir tu comando de forma asíncrona, tal como en tus especificaciones.

## Parámetros

### Nombre del Comando

Un nombre que define el comando y que se adjuntará al ámbito del navegador o elemento.

Tipo: `String`

### Función Personalizada

Una función que se ejecuta cuando se llama al comando. El ámbito `this` es [`WebdriverIO.Browser`](/docs/api/browser) o [`WebdriverIO.Element`](/docs/api/element) dependiendo de si el comando se adjunta al ámbito del navegador o del elemento.

Tipo: `Function`

### Opciones

Objeto con opciones de configuración que modifican el comportamiento del comando personalizado

#### Ámbito Objetivo

Indicador para decidir si adjuntar el comando al ámbito del navegador o del elemento. Si se establece en `true`, el comando será un comando de elemento.

Nombre de la Opción: `attachToElement`
Tipo: `Boolean`<br />
Valor por defecto: `false`

#### Deshabilitar implicitWait

Indicador para decidir si esperar implícitamente a que el elemento exista antes de llamar al comando personalizado.

Nombre de la Opción: `disableElementImplicitWait`
Tipo: `Boolean`<br />
Valor por defecto: `false`

## Ejemplos

Este ejemplo muestra cómo añadir un nuevo comando que devuelve la URL actual y el título como un solo resultado. El ámbito (`this`) es un objeto [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` se refiere al ámbito `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Además, puedes extender la instancia del elemento con tu propio conjunto de comandos, pasando `true` como último argumento. El ámbito (`this`) en este caso es un objeto [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` es el valor de retorno de $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Por defecto, los comandos personalizados de elementos esperan a que el elemento exista antes de llamar al comando personalizado. Aunque la mayoría de las veces esto es lo deseado, si no lo es, se puede deshabilitar con `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` es el valor de retorno de $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Los comandos personalizados te dan la oportunidad de agrupar una secuencia específica de comandos que usas frecuentemente en una sola llamada. Puedes definir comandos personalizados en cualquier punto de tu suite de pruebas; solo asegúrate de que el comando esté definido *antes* de su primer uso. (El hook `before` en tu `wdio.conf.js` es un buen lugar para crearlos).

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

__Nota:__ Si registras un comando personalizado en el ámbito `browser`, el comando no será accesible para los elementos. Del mismo modo, si registras un comando en el ámbito del elemento, no será accesible en el ámbito `browser`:

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

Ten cuidado de no sobrecargar el ámbito `browser` con demasiados comandos personalizados.

Recomendamos definir lógica personalizada en [objetos de página](pageobjects), para que estén vinculados a una página específica.

### Multiremoto

`addCommand` funciona de manera similar para multiremoto, excepto que el nuevo comando se propagará hacia las instancias hijas. Debes ser cuidadoso cuando uses el objeto `this` ya que el `browser` multiremoto y sus instancias hijas tienen diferentes `this`.

Este ejemplo muestra cómo añadir un nuevo comando para multiremoto.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` se refiere a:
    //      - ámbito MultiRemoteBrowser para browser
    //      - ámbito Browser para instancias
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

## Extender Definiciones de Tipo

Con TypeScript, es fácil extender las interfaces de WebdriverIO. Añade tipos a tus comandos personalizados de esta manera:

1. Crea un archivo de definición de tipos (p.ej., `./src/types/wdio.d.ts`)
2. a. Si utilizas un archivo de definición de tipos estilo módulo (usando import/export y `declare global WebdriverIO` en el archivo de definición de tipos), asegúrate de incluir la ruta del archivo en la propiedad `include` de `tsconfig.json`.

   b. Si utilizas archivos de definición de tipos ambientales (sin import/export en los archivos de definición de tipos y `declare namespace WebdriverIO` para comandos personalizados), asegúrate de que `tsconfig.json` *no* contenga ninguna sección `include`, ya que esto hará que TypeScript no reconozca todos los archivos de definición de tipos no listados en la sección `include`.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Módulos (usando import/export)', value: 'modules'},
    {label: 'Definiciones de Tipos Ambientales (sin include en tsconfig)', value: 'ambient'},
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

3. Añade definiciones para tus comandos según tu modo de ejecución.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Módulos (usando import/export)', value: 'modules'},
    {label: 'Definiciones de Tipos Ambientales', value: 'ambient'},
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
}
```

</TabItem>
</Tabs>

## Integrar Bibliotecas de Terceros

Si utilizas bibliotecas externas (por ejemplo, para hacer llamadas a bases de datos) que soportan promesas, un buen enfoque para integrarlas es envolver ciertos métodos de API con un comando personalizado.

Al devolver la promesa, WebdriverIO se asegura de que no continúe con el siguiente comando hasta que la promesa se resuelva. Si la promesa es rechazada, el comando lanzará un error.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Luego, simplemente úsalo en tus especificaciones de prueba de WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // devuelve el cuerpo de la respuesta
})
```

**Nota:** El resultado de tu comando personalizado es el resultado de la promesa que devuelves.

## Sobreescribir Comandos

También puedes sobreescribir comandos nativos con `overwriteCommand`.

No se recomienda hacer esto, porque puede llevar a un comportamiento impredecible del framework.

El enfoque general es similar a `addCommand`, la única diferencia es que el primer argumento en la función de comando es la función original que vas a sobreescribir. Por favor, consulta algunos ejemplos a continuación.

### Sobreescribir Comandos del Navegador

```js
/**
 * Imprime milisegundos antes de la pausa y devuelve su valor.
 *
 * @param pause - nombre del comando a sobreescribir
 * @param this de func - la instancia original del navegador en la que se llamó a la función
 * @param originalPauseFunction de func - la función de pausa original
 * @param ms de func - los parámetros reales pasados
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// luego úsalo como antes
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Sobreescribir Comandos de Elemento

Sobreescribir comandos a nivel de elemento es casi lo mismo. Simplemente pasa `true` como tercer argumento a `overwriteCommand`:

```js
/**
 * Intenta desplazarse hasta el elemento si no es clicable.
 * Pasa { force: true } para hacer clic con JS incluso si el elemento no es visible o clicable.
 * Muestra que se puede mantener el tipo de argumento de función original con `options?: ClickOptions`
 *
 * @param this de func - el elemento en el que se llamó a la función original
 * @param originalClickFunction de func - la función de pausa original
 * @param options de func - los parámetros reales pasados
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

                    // desplázate al elemento y haz clic de nuevo
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

## Añadir Más Comandos WebDriver

Si estás utilizando el protocolo WebDriver y ejecutas pruebas en una plataforma que admite comandos adicionales no definidos por ninguna de las definiciones de protocolo en [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), puedes añadirlos manualmente a través de la interfaz `addCommand`. El paquete `webdriver` ofrece un wrapper de comando que permite registrar estos nuevos endpoints de la misma manera que otros comandos, proporcionando las mismas verificaciones de parámetros y manejo de errores. Para registrar este nuevo endpoint, importa el wrapper de comando y registra un nuevo comando con él de la siguiente manera:

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

Llamar a este comando con parámetros inválidos resulta en el mismo manejo de errores que los comandos de protocolo predefinidos, por ejemplo:

```js
// llamar al comando sin el parámetro de url requerido y payload
await browser.myNewCommand()

/**
 * resulta en el siguiente error:
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

Llamar al comando correctamente, por ejemplo `browser.myNewCommand('foo', 'bar')`, hace correctamente una solicitud WebDriver a, por ejemplo, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` con un payload como `{ foo: 'bar' }`.

:::note
El parámetro de url `:sessionId` se sustituirá automáticamente por el id de sesión de la sesión WebDriver. Se pueden aplicar otros parámetros de url, pero deben definirse dentro de `variables`.
:::

Consulta ejemplos de cómo se pueden definir los comandos de protocolo en el paquete [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).