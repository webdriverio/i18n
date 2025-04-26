---
id: modules
title: Módulos
---

WebdriverIO publica varios módulos en NPM y otros registros que puedes usar para construir tu propio framework de automatización. Consulta más documentación sobre los tipos de configuración de WebdriverIO [aquí](/docs/setuptypes).

## `webdriver` y `devtools`

Los paquetes de protocolo ([`webdriver`](https://www.npmjs.com/package/webdriver) y [`devtools`](https://www.npmjs.com/package/devtools)) exponen una clase con las siguientes funciones estáticas adjuntas que te permiten iniciar sesiones:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Inicia una nueva sesión con capacidades específicas. Basado en la respuesta de la sesión, se proporcionarán comandos de diferentes protocolos.

##### Paramaters

- `options`: [Opciones de WebDriver](/docs/configuration#webdriver-options)
- `modifier`: función que permite modificar la instancia del cliente antes de que sea devuelta
- `userPrototype`: objeto de propiedades que permite extender el prototipo de la instancia
- `customCommandWrapper`: función que permite envolver funcionalidad alrededor de llamadas a funciones

##### Returns

- Objeto [Browser](/docs/api/browser)

##### Example

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Se conecta a una sesión de WebDriver o DevTools en ejecución.

##### Paramaters

- `attachInstance`: instancia a la que conectar una sesión o al menos un objeto con una propiedad `sessionId` (por ejemplo, `{ sessionId: 'xxx' }`)
- `modifier`: función que permite modificar la instancia del cliente antes de que sea devuelta
- `userPrototype`: objeto de propiedades que permite extender el prototipo de la instancia
- `customCommandWrapper`: función que permite envolver funcionalidad alrededor de llamadas a funciones

##### Returns

- Objeto [Browser](/docs/api/browser)

##### Example

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Recarga una sesión dada la instancia proporcionada.

##### Paramaters

- `instance`: instancia del paquete para recargar

##### Example

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

De manera similar a los paquetes de protocolo (`webdriver` y `devtools`), también puedes usar las APIs del paquete WebdriverIO para gestionar sesiones. Las APIs se pueden importar usando `import { remote, attach, multiremote } from 'webdriverio'` y contienen la siguiente funcionalidad:

#### `remote(options, modifier)`

Inicia una sesión de WebdriverIO. La instancia contiene todos los comandos del paquete de protocolo pero con funciones de orden superior adicionales, consulta [API docs](/docs/api).

##### Paramaters

- `options`: [Opciones de WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: función que permite modificar la instancia del cliente antes de que sea devuelta

##### Returns

- Objeto [Browser](/docs/api/browser)

##### Example

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Se conecta a una sesión de WebdriverIO en ejecución.

##### Paramaters

- `attachOptions`: instancia a la que conectar una sesión o al menos un objeto con una propiedad `sessionId` (por ejemplo, `{ sessionId: 'xxx' }`)

##### Returns

- Objeto [Browser](/docs/api/browser)

##### Example

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Inicia una instancia multiremote que te permite controlar múltiples sesiones dentro de una sola instancia. Consulta nuestros [ejemplos de multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) para casos de uso concretos.

##### Paramaters

- `multiremoteOptions`: un objeto con claves que representan el nombre del navegador y sus [Opciones de WebdriverIO](/docs/configuration#webdriverio).

##### Returns

- Objeto [Browser](/docs/api/browser)

##### Example

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
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
// returns ['Google', 'JSON']
```

## `@wdio/cli`

En lugar de llamar al comando `wdio`, también puedes incluir el ejecutor de pruebas como módulo y ejecutarlo en un entorno arbitrario. Para eso, necesitarás requerir el paquete `@wdio/cli` como módulo, así:

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

Después de eso, crea una instancia del lanzador y ejecuta la prueba.

#### `Launcher(configPath, opts)`

El constructor de la clase `Launcher` espera la URL al archivo de configuración y un objeto `opts` con configuraciones que sobrescribirán las del archivo de configuración.

##### Paramaters

- `configPath`: ruta al archivo `wdio.conf.js` para ejecutar
- `opts`: argumentos ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) para sobrescribir valores del archivo de configuración

##### Example

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

El comando `run` devuelve una [Promesa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Se resuelve si las pruebas se ejecutaron correctamente o fallaron, y se rechaza si el lanzador no pudo iniciar la ejecución de las pruebas.

## `@wdio/browser-runner`

Cuando ejecutas pruebas unitarias o de componentes usando el [ejecutor de navegador](/docs/runner#browser-runner) de WebdriverIO, puedes importar utilidades de simulación para tus pruebas, por ejemplo:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Las siguientes exportaciones nombradas están disponibles:

#### `fn`

Función simulada, consulta más en la [documentación oficial de Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Función espía, consulta más en la [documentación oficial de Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Método para simular un archivo o módulo de dependencia.

##### Paramaters

- `moduleName`: ya sea una ruta relativa al archivo que se simulará o un nombre de módulo.
- `factory`: función para devolver el valor simulado (opcional)

##### Example

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

Deshace la simulación de una dependencia que está definida dentro del directorio de simulación manual (`__mocks__`).

##### Paramaters

- `moduleName`: nombre del módulo que se dejará de simular.

##### Example

```js
unmock('lodash')
```