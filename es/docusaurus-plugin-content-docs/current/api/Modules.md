---
id: modules
title: Módulos
---

WebdriverIO publica varios módulos en NPM y otros registros que puedes usar para construir tu propio framework de automatización. Consulta más documentación sobre los tipos de configuración de WebdriverIO [aquí](/docs/setuptypes).

## `webdriver` y `devtools`

Los paquetes de protocolo ([`webdriver`](https://www.npmjs.com/package/webdriver) y [`devtools`](https://www.npmjs.com/package/devtools)) exponen una clase con las siguientes funciones estáticas adjuntas que te permiten iniciar sesiones:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Inicia una nueva sesión con capacidades específicas. Según la respuesta de la sesión, se proporcionarán comandos de diferentes protocolos.

##### Parámetros

- `options`: [Opciones de WebDriver](/docs/configuration#webdriver-options)
- `modifier`: función que permite modificar la instancia del cliente antes de que sea devuelta
- `userPrototype`: objeto de propiedades que permite extender el prototipo de la instancia
- `customCommandWrapper`: función que permite envolver funcionalidad alrededor de las llamadas a funciones

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Ejemplo

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Se conecta a una sesión de WebDriver o DevTools en ejecución.

##### Parámetros

- `attachInstance`: instancia a la que conectar una sesión o al menos un objeto con una propiedad `sessionId` (p. ej. `{ sessionId: 'xxx' }`)
- `modifier`: función que permite modificar la instancia del cliente antes de que sea devuelta
- `userPrototype`: objeto de propiedades que permite extender el prototipo de la instancia
- `customCommandWrapper`: función que permite envolver funcionalidad alrededor de las llamadas a funciones

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Ejemplo

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Recarga una sesión dada la instancia proporcionada.

##### Parámetros

- `instance`: instancia del paquete a recargar

##### Ejemplo

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

De forma similar a los paquetes de protocolo (`webdriver` y `devtools`), también puedes usar las APIs del paquete WebdriverIO para gestionar sesiones. Las APIs se pueden importar usando `import { remote, attach, multiRemote } from 'webdriverio` y contienen la siguiente funcionalidad:

#### `remote(options, modifier)`

Inicia una sesión de WebdriverIO. La instancia contiene todos los comandos del paquete de protocolo pero con funciones adicionales de orden superior, consulta la [documentación de la API](/docs/api).

##### Parámetros

- `options`: [Opciones de WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: función que permite modificar la instancia del cliente antes de que sea devuelta

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Ejemplo

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Se conecta a una sesión de WebdriverIO en ejecución.

##### Parámetros

- `attachOptions`: instancia a la que conectar una sesión o al menos un objeto con una propiedad `sessionId` (p. ej. `{ sessionId: 'xxx' }`)

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Ejemplo

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

Inicia una instancia multi-remote que te permite controlar múltiples sesiones dentro de una sola instancia. Consulta nuestros [ejemplos de multi-remote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) para casos de uso concretos.

##### Parámetros

- `multiRemoteOptions`: un objeto con claves que representan el nombre del navegador y sus [Opciones de WebdriverIO](/docs/configuration#webdriverio).

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Ejemplo

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// devuelve ['Google', 'JSON']
```

#### `Key`

Un objeto que contiene constantes de caracteres especiales para usar con el comando [`browser.keys`](/docs/api/browser/keys). Estas constantes representan teclas especiales que se pueden enviar al navegador, como `Enter`, `Tab`, `Escape`, teclas de flecha, teclas de función y más.

##### Ejemplo

```js
import { Key } from 'webdriverio'

// Presionar la tecla Enter
await browser.keys(Key.Enter)

// Usar Ctrl+A para seleccionar todo (funciona en todas las plataformas)
await browser.keys([Key.Ctrl, 'a'])

// Navegar con las teclas de flecha
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### Teclas disponibles

Las siguientes teclas especiales están disponibles a través del objeto `Key`:

**Teclas modificadoras:**

| Constante | Descripción |
|----------|-------------|
| `Key.Ctrl` | Tecla de control multiplataforma (Command en Mac, Control en Windows/Linux) |
| `Key.Control` | Tecla Control |
| `Key.Shift` | Tecla Shift |
| `Key.Alt` | Tecla Alt |
| `Key.Command` | Tecla Command (Mac) |
| `Key.NULL` | Tecla nula/de liberación — libera todas las teclas modificadoras mantenidas actualmente |

**Teclas de navegación:**

| Constante | Descripción |
|----------|-------------|
| `Key.Cancel` | Tecla Cancel |
| `Key.Help` | Tecla Help |
| `Key.Backspace` | Tecla Retroceso |
| `Key.Tab` | Tecla Tab |
| `Key.Clear` | Tecla Clear |
| `Key.Return` | Tecla Return |
| `Key.Enter` | Tecla Enter |
| `Key.Pause` | Tecla Pausa |
| `Key.Escape` | Tecla Escape |
| `Key.Space` | Tecla Espacio |
| `Key.PageUp` | Tecla Re Pág |
| `Key.PageDown` | Tecla Av Pág |
| `Key.End` | Tecla Fin |
| `Key.Home` | Tecla Inicio |
| `Key.ArrowLeft` | Tecla Flecha izquierda |
| `Key.ArrowUp` | Tecla Flecha arriba |
| `Key.ArrowRight` | Tecla Flecha derecha |
| `Key.ArrowDown` | Tecla Flecha abajo |
| `Key.Insert` | Tecla Insert |
| `Key.Delete` | Tecla Suprimir |

**Teclas de caracteres:**

| Constante | Descripción |
|----------|-------------|
| `Key.Semicolon` | Tecla Punto y coma |
| `Key.Equals` | Tecla Igual |

**Teclas del teclado numérico:**

| Constante | Descripción |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Teclado numérico 0-9 |
| `Key.Multiply` | Multiplicar del teclado numérico |
| `Key.Add` | Sumar del teclado numérico |
| `Key.Separator` | Separador del teclado numérico |
| `Key.Subtract` | Restar del teclado numérico |
| `Key.Decimal` | Decimal del teclado numérico |
| `Key.Divide` | Dividir del teclado numérico |

**Teclas de función:**

| Constante | Descripción |
|----------|-------------|
| `Key.F1` - `Key.F12` | Teclas de función F1 a F12 |

**Otras teclas:**

| Constante | Descripción |
|----------|-------------|
| `Key.ZenkakuHankaku` | Tecla Zenkaku/Hankaku (japonés) |

:::info Teclas modificadoras multiplataforma

La constante `Key.Ctrl` proporciona una forma conveniente de usar el modificador "control" en diferentes sistemas operativos. En macOS, se asigna a la tecla `Command`, mientras que en Windows y Linux se asigna a la tecla `Control`. Esto es útil al escribir pruebas que necesitan funcionar en múltiples plataformas, p. ej., para operaciones de seleccionar todo (`Ctrl+A`), copiar (`Ctrl+C`) o pegar (`Ctrl+V`).

:::

## `@wdio/cli`

En lugar de llamar al comando `wdio`, también puedes incluir el test runner como módulo y ejecutarlo en un entorno arbitrario. Para ello, necesitarás requerir el paquete `@wdio/cli` como módulo, así:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

Después de eso, crea una instancia del launcher y ejecuta la prueba.

#### `Launcher(configPath, opts)`

El constructor de la clase `Launcher` espera la URL del archivo de configuración y un objeto `opts` con ajustes que sobrescribirán los de la configuración.

##### Parámetros

- `configPath`: ruta al `wdio.conf.js` a ejecutar
- `opts`: argumentos ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) para sobrescribir valores del archivo de configuración

##### Ejemplo

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

El comando `run` devuelve una [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Se resuelve si las pruebas se ejecutaron correctamente o fallaron, y se rechaza si el launcher no pudo iniciar la ejecución de las pruebas.

## `@wdio/browser-runner`

Al ejecutar pruebas unitarias o de componentes usando el [browser runner](/docs/runner#browser-runner) de WebdriverIO, puedes importar utilidades de mocking para tus pruebas, p. ej.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Las siguientes exportaciones con nombre están disponibles:

#### `fn`

Función mock, consulta más en la [documentación oficial de Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Función spy, consulta más en la [documentación oficial de Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Método para simular (mock) un archivo o un módulo de dependencia.

##### Parámetros

- `moduleName`: una ruta relativa al archivo a simular o un nombre de módulo.
- `factory`: función que devuelve el valor simulado (opcional)

##### Ejemplo

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

Elimina el mock de una dependencia que está definida dentro del directorio de mocks manuales (`__mocks__`).

##### Parámetros

- `moduleName`: nombre del módulo al que se le eliminará el mock.

##### Ejemplo

```js
unmock('lodash')
```