---
id: parallel-tests
title: Pruebas en paralelo en un archivo spec
description: "Ejecuta las pruebas de Mocha o los escenarios de Cucumber de un archivo spec al mismo tiempo, cada uno en su propio contexto de navegación de WebDriver BiDi, con mochaOpts.parallelMode o cucumberOpts.parallelMode, una forma de pool de navegadores similar a fullyParallel de Playwright."
---

Desde la v10, WebdriverIO puede ejecutar al mismo tiempo las pruebas de un archivo spec. Cada `it()` de Mocha o escenario de Cucumber obtiene su propia ventana del navegador (un [contexto de navegación](https://w3c.github.io/webdriver-bidi/#browsing-context) de WebDriver BiDi) dentro de un único worker y una única sesión del navegador. Úsalo para archivos spec con muchas pruebas independientes: terminan más rápido y no necesitas más procesos worker ni sesiones del navegador, porque cada prueba solo paga el coste de abrir una ventana.

Es una forma de pool de navegadores: las pruebas comparten un pool de ventanas en un único navegador, no un pool de navegadores. Si vienes de Playwright, `parallelMode: 'userContexts'` es el equivalente más cercano a [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file): cada prueba obtiene su propio contexto aislado. La diferencia es que Playwright reparte las pruebas de un archivo entre procesos worker, cada uno con su propio navegador, mientras que WebdriverIO las ejecuta al mismo tiempo en un único worker y un único navegador.

Esto es independiente de [`maxInstances`](./OrganizingTestSuites.md), que ejecuta archivos spec completos en paralelo, con un worker y una sesión por spec. Puedes combinar ambos: `maxInstances` establece cuántos archivos spec se ejecutan al mismo tiempo, y `maxParallelContexts` establece cuántas pruebas se ejecutan al mismo tiempo dentro de cada uno de esos archivos.

:::warning Experimental
El modo paralelo requiere la capability experimental `'wdio:experimentalBiDiCommands'`, que cambia cómo se implementan los comandos de elementos en todas las pruebas, no solo en las paralelas. Consulta [Cambios de comportamiento de los comandos de elementos BiDi](#behavior-changes-of-the-bidi-element-commands).
:::

## Activar el modo paralelo

Necesitas:

- una sesión de WebDriver BiDi (la predeterminada, a menos que establezcas `'wdio:enforceWebDriverClassic': true`),
- la capability `'wdio:experimentalBiDiCommands': true`,
- `@wdio/mocha-framework` o `@wdio/cucumber-framework`. Jasmine no admite el modo paralelo.

Si la sesión no usa BiDi, o falta la capability, WebdriverIO registra una advertencia y ejecuta las pruebas una tras otra. Sin `parallelMode`, no cambia nada.

### Mocha

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

El archivo spec no necesita cambios:

```ts title="test/specs/pages.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('shows the API page', async () => {
        await browser.url('https://webdriver.io/docs/api')
        await expect($('h1')).toHaveText('Introduction')
    })

    it('shows the getting started page', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')
        await expect($('h1')).toHaveText('Getting Started')
    })
})
```

Ambas pruebas se ejecutan al mismo tiempo, cada una en su propia ventana. `browser.url()`, `$()` y `expect()` actúan sobre la ventana de la prueba que los llama.

### Cucumber

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./features/**/*.feature'],
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

Cada escenario de un archivo feature se ejecuta en su propia ventana. Los perfiles (`cucumberOpts.profiles`, `cucumberOpts.file`), los specs con números de línea (`--spec ./features/login.feature:5`) y las opciones `tags`, `name`, `order`, `strict`, `dryRun`, `failFast`, `retry` y `retryTagFilter` funcionan igual que en una ejecución secuencial. Las features, escenarios, pasos y hooks se reportan igual que en una ejecución secuencial, también con `ignoreUndefinedDefinitions`, `failAmbiguousDefinitions`, `tagsInTitle` y `scenarioLevelReporter`.

## Opciones

| Opción | Valores | Predeterminado | Descripción |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`, `'userContexts'` | sin establecer (secuencial) | Activa el modo paralelo y elige cuánto comparten las pruebas. |
| `maxParallelContexts` | número | `os.cpus().length` | Cuántas pruebas se ejecutan al mismo tiempo. |

Establece ambas en `mochaOpts` o en `cucumberOpts`.

`maxParallelContexts` establece el número de slots. Cada slot ejecuta una prueba a la vez, abre la ventana para su siguiente prueba mientras se ejecuta la actual y cierra la ventana anterior en segundo plano. Por lo tanto, pueden estar abiertas durante un breve tiempo hasta 3 × `maxParallelContexts` ventanas, más la primera ventana de la sesión: cada slot puede tener una ventana activa, una precargada y una cerrándose. El modo paralelo solo cierra las ventanas que abrió.

## Elegir entre `contexts` y `userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| Ventana por prueba | sí | sí |
| Cookies, `localStorage`, service workers | compartidos por todas las pruebas | aislados por prueba ([user context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| Inicio de sesión | una vez, si las pruebas reutilizan la cookie de sesión | en cada prueba |
| Soporte del driver | cualquier navegador con BiDi | necesita soporte para `browser.createUserContext()`, de lo contrario la ejecución falla |

Elige `'contexts'` por defecto. Elige `'userContexts'` cuando las pruebas no deban ver las cookies o el almacenamiento de las demás, por ejemplo pruebas que inician sesión como usuarios distintos. Al igual que `'contexts'`, `'userContexts'` recurre a una ejecución secuencial con una advertencia cuando la sesión no es WebDriver BiDi o falta `'wdio:experimentalBiDiCommands'` en las capabilities. Si el driver no admite `browser.createUserContext`, la ejecución falla en lugar de recurrir a la ejecución secuencial.

Una pestaña o ventana que una prueba abre con `browser.newWindow(url)` se abre desde la ventana de la prueba, por lo que tiene las cookies y el almacenamiento de la prueba. Para abrir una ventana fuera del aislamiento de cookies y almacenamiento de la prueba, créala con `browser.browsingContextCreate()` y obtén su contexto de navegación desde `browser.browsingContexts()`:

```js
const { context } = await browser.browsingContextCreate({ type: 'window' })
await browser.browsingContextNavigate({ context, url: 'https://example.com', wait: 'complete' })
const outside = (await browser.browsingContexts()).find((c) => c.contextId === context)
await outside.$('h1').getText()
```

## Qué pertenece a cada prueba

Dentro de una prueba paralela, estos comandos actúan sobre la ventana propia de la prueba:

- navegación: `url`, `back`, `forward`, `refresh`, `getUrl`, `getTitle`
- comandos de elementos: `$`, `$$`, `shadow$`, `click`, `setValue`, `getText`, los comandos `waitFor*` y otros
- `execute`, `actions`, `addInitScript`
- cookies: `getCookies`, `setCookies`, `deleteCookies` usan la partición de cookies de la prueba
- `mock()`: un mock creado en una prueba paralela solo intercepta y registra las solicitudes de la ventana de esa prueba y sus frames, por lo que dos pruebas pueden hacer mock de la misma URL
- capturas de pantalla: `saveScreenshot`, `takeElementScreenshot`

## Comandos que lanzan errores en modo paralelo

Algunos comandos actúan sobre todo el navegador o toda la sesión, por lo que no pueden dirigirse a la ventana de una sola prueba. Dentro de una prueba paralela lanzan un error en lugar de afectar a otra prueba:

| Comandos | Por qué | Usa en su lugar |
| --- | --- | --- |
| `getWindowSize`, `setWindowSize` | la ventana del sistema operativo es compartida | usa `browser.setViewport()` para dimensionar la página de una prueba. Las pruebas paralelas comparten una ventana del sistema operativo |
| `throttleNetwork`, `throttleCPU` | se aplican a todo el navegador | ejecuta esas pruebas sin modo paralelo |
| `closeWindow`, `switchToParentFrame` | cambian la ventana enfocada, que comparten todas las pruebas | mantén cada prueba en su propia ventana |
| `reloadSession`, `setTimeout` | cambian la sesión que comparten todas las pruebas | llámalos en el hook `before` de `wdio.conf.ts` |
| `acceptAlert`, `dismissAlert`, `getAlertText`, `sendAlertText` | las alertas pertenecen a un contexto de navegación | llámalos sobre el contexto que devuelve `browser.url()`: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. Usa `page.acceptAlert(text)` en lugar de `sendAlertText(text)`. `dismissAlert()` y `getAlertText()` también funcionan sobre el contexto |
| `getComputedRole`, `getComputedLabel` | WebDriver BiDi no puede leerlos | ejecuta esas pruebas sin modo paralelo |

`switchWindow` se eliminó para todas las sesiones de WebDriver BiDi en la v10, no solo en modo paralelo. Lanza ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` Conserva el objeto de contexto en lugar de cambiar a él.

WebdriverIO descarta los prompts automáticamente a menos que algo escuche el evento `dialog`, así que registra un listener (`browser.on('dialog', () => {})`) antes de responder a un prompt desde una prueba.

Todos los demás comandos de WebDriver Classic también lanzan un error. Solo se permiten `status`, `getTimeouts` y `getWindowHandles`. Si un comando de WebdriverIO recurre a WebDriver Classic en modo paralelo sin que hayas llamado a un comando Classic, por favor [repórtalo](https://github.com/webdriverio/webdriverio/issues/new/choose).

## Hooks y timeouts

### Mocha

- `before()` y `after()` en un archivo spec se ejecutan **una vez por prueba**, no una vez por `describe`, porque cada prueba tiene su propia ventana. Cada prueba ejecuta `before`, `beforeEach`, la prueba, `afterEach` y `after` en su ventana. Coloca la configuración que deba ejecutarse una vez por archivo spec en los hooks `beforeSuite` / `afterSuite` de `wdio.conf.ts`. Estos se ejecutan una vez, fuera de cualquier ventana de prueba.
- Como cada prueba ejecuta sus propios hooks, un hook que falla solo afecta a su propia prueba. Un `before()` que falla se reporta una vez por cada prueba, no una vez por el `describe`. Un `beforeEach()` o `afterEach()` que falla no detiene las demás pruebas del `describe`. En una ejecución secuencial, Mocha las omite. Con `failHookAffectedTests` (el valor predeterminado), la prueba que omite un `before()` o `beforeEach()` fallido falla con el mismo texto que en una ejecución secuencial. Solo el título del hook puede diferir: un `beforeEach()` fallido nombra la prueba de su propia ventana (`"before each" hook for "t2"`), mientras que una ejecución secuencial nombra la primera prueba para todas ellas.
- Solo se aplica `mochaOpts.timeout`. `this.timeout()` en una prueba o hook lanza un error, y `it(...).timeout()` o un timeout de `describe` se ignora con una advertencia. Consulta [Timeouts de Mocha y los hooks de WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks).
- `mochaOpts.bail` y los reintentos de Mocha no son compatibles y hacen fallar la ejecución: `mochaOpts.retries`, `this.retries(n)` en un `describe` e `it(...).retries(n)`. `this.retries()` en una prueba o hook lanza un error. Los [reintentos de WebdriverIO](./Retry.md) (`it(title, fn, retries)`) funcionan en modo paralelo.
- `.only()`, `this.skip()`, `grep`, `fgrep` e `invert` funcionan igual que en una ejecución secuencial.
- Un error que ninguna prueba espera (por ejemplo, un temporizador que lanza un error) hace fallar la prueba o el hook de la ventana de la que proviene, y las demás pruebas continúan. Como en una ejecución secuencial, un rechazo no gestionado no hace fallar una prueba, y con `mochaOpts.allowUncaught` el error termina el worker. Un error que llega después de que su prueba terminó, mientras otras pruebas siguen ejecutándose, hace fallar la ejecución y se registra, pero ninguna prueba lo muestra (una ejecución secuencial lo muestra en la prueba que se está ejecutando en ese momento). Después de que se cierra la última ventana, un error así termina el worker, como en una ejecución secuencial. Lo mismo ocurre con un error de un event emitter que tu código creó fuera de una prueba, y en Node.js 22 con un error de `queueMicrotask()`, porque allí no se conoce la ventana de la prueba.
- `mochaOpts.dryRun`, `forbidPending` y `checkLeaks` aún no se aplican en modo paralelo: las pruebas se ejecutan, una prueba pendiente no falla y no se reporta una fuga global.

### Cucumber

- `BeforeAll` / `AfterAll` y los hooks `beforeFeature` / `afterFeature` de `wdio.conf.ts` se ejecutan una vez por worker, no una vez por feature. `beforeFeature` / `afterFeature` reciben el uri y la feature solo del primer archivo feature, lo cual importa cuando un worker ejecuta varios archivos feature, por ejemplo specs agrupados. Se ejecutan fuera de la ventana de cualquier escenario, por lo que no deben usar comandos que necesiten una.
- `Before` / `After`, `BeforeStep` / `AfterStep` y los hooks de escenario y de paso de `wdio.conf.ts` se ejecutan para cada escenario, en la ventana de ese escenario.
- `cucumberOpts.strict` tiene el valor predeterminado `false` en WebdriverIO. Un paso pendiente hace fallar el escenario solo con `strict: true`.
- Con `failFast`, los escenarios que ya se están ejecutando en otras ventanas terminan después del primer fallo. Los escenarios que no comenzaron se reportan como omitidos, como en una ejecución secuencial.
- Con `ignoreUndefinedDefinitions: true`, un paso ambiguo (con `failAmbiguousDefinitions: false`), o un paso pendiente con `strict: true`, hace fallar la ejecución. Una ejecución secuencial, en cambio, pasa.
- Los formatters de Cucumber (`format`, `formatOptions`, `publish`) no se ejecutan, por lo que no escriben ningún archivo.

### Ambos frameworks

La ventana de una prueba se cierra en cuanto la prueba termina. No inicies temporizadores ni promesas que sigan ejecutándose después de que termine la prueba.

## Cambios de comportamiento de los comandos de elementos BiDi

`'wdio:experimentalBiDiCommands': true` reemplaza la implementación de varios comandos de elementos en todas las pruebas de la sesión, secuenciales o paralelas:

- `addValue` y `clearValue` despachan eventos DOM sintéticos, no eventos de teclado de confianza.
- `getAttribute` sigue las reglas de WebDriver para los valores de propiedades y atributos.
- `click` se envía a través de la Actions API.

Ejecuta tu suite una vez con la capability y sin `parallelMode` para encontrar las pruebas que dependen del comportamiento Classic.

## Reporters

Los reporters que extienden [`@wdio/reporter`](./CustomReporter.md) reportan las pruebas paralelas bajo la suite correcta y asocian un comando a la prueba cuyo contexto de navegación lo envió.

`@wdio/allure-reporter` admite el modo paralelo con Mocha. Escribe el resultado de una prueba cuando terminan la prueba y sus hooks `afterEach()` y `after()`. Los hooks `before()` y `after()` se ejecutan una vez por prueba en modo paralelo, por lo que el informe muestra sus fixtures una vez por prueba. Con Cucumber, Allure aún no admite el modo paralelo: los resultados, pasos y adjuntos de escenarios superpuestos pueden acabar bajo el escenario equivocado, así que úsalo con ejecuciones secuenciales.

`@wdio/spec-reporter` aún no admite el modo paralelo: un bloque `describe` de Mocha que viene después de otro, o un escenario de Cucumber que empieza mientras otro se ejecuta, se muestra anidado bajo él, y con `retry` de Cucumber el recuento de pruebas superadas puede ser incorrecto. Los resultados de las pruebas y el código de salida son correctos.

`@wdio/cucumberjs-json-reporter` aún no admite el modo paralelo: los pasos y adjuntos de escenarios superpuestos pueden acabar en el escenario equivocado, y el reporter registra una advertencia. Úsalo con ejecuciones secuenciales.

`@wdio/html-reporter` aún no admite el modo paralelo: los logs, capturas de pantalla y vídeos que una prueba envía después de que otra prueba haya comenzado pueden acabar bajo la prueba equivocada. Úsalo con ejecuciones secuenciales.

`@wdio/video-reporter` graba cada prueba paralela en su propio vídeo. Con Cucumber, no adjunta los vídeos a Allure.

Un reporter personalizado no debe asumir que una prueba termina antes de que empiece la siguiente. Consulta [Reporters y pruebas paralelas](./CustomReporter.md#reporters-and-parallel-tests).

## Proveedores en la nube

Los proveedores en la nube graban un vídeo, un conjunto de logs y un estado de prueba por sesión del navegador. En modo paralelo, muchas pruebas comparten esa sesión, por lo que el panel del proveedor no puede dividir el vídeo, los logs ni el estado de aprobado/fallido por prueba. `userContexts` también necesita que el grid del proveedor admita `browser.createUserContext` (y `browser.removeUserContext` con Mocha). El modo paralelo aún no se ha probado en ningún proveedor en la nube.

Te recomendamos dejar el modo paralelo desactivado cuando ejecutes en un proveedor en la nube y usar [`maxInstances`](./OrganizingTestSuites.md) para ejecutar archivos spec en paralelo. Para desactivarlo, elimina `parallelMode` de las opciones del framework. Si solo eliminas `'wdio:experimentalBiDiCommands'`, las pruebas se ejecutan una tras otra y cada ejecución registra una advertencia.

## Solución de problemas

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

Añade `'wdio:experimentalBiDiCommands': true` a la capability. Sin ella, las pruebas se ejecutan una tras otra. Con Cucumber, el mensaje dice `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

La sesión usa WebDriver Classic. Elimina `'wdio:enforceWebDriverClassic': true` de la capability, o usa un navegador y un driver compatibles con WebDriver BiDi. Con Cucumber, el mensaje dice `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

El driver no puede crear user contexts. Usa `parallelMode: 'contexts'` o actualiza el navegador y el driver. Con Cucumber, el mensaje dice `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` o `... is not supported in parallel mode`

La prueba llamó a un comando de [Comandos que lanzan errores en modo paralelo](#commands-that-throw-in-parallel-mode). Usa la alternativa de la tabla.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

Elimina `mochaOpts.bail` o `mochaOpts.retries`, o el `this.retries(n)` / `.retries(n)` de la prueba que indica el error, o ejecuta el archivo spec sin `parallelMode`. Para reintentar una prueba en modo paralelo, usa los [reintentos de WebdriverIO](./Retry.md) (`it(title, fn, retries)`).

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

El archivo spec tiene hooks `before()` o `after()`. Se ejecutan para cada prueba. Mueve la configuración que deba ejecutarse solo una vez a `beforeSuite` / `afterSuite` en `wdio.conf.ts`.

## Páginas relacionadas

- [Organizar suites de pruebas](./OrganizingTestSuites.md): ejecuta archivos spec en paralelo con `maxInstances`
- [Sharding](./Sharding.md): divide la suite entre varias máquinas
- [Frameworks](./Frameworks.md): todas las opciones de Mocha y Cucumber
- [Protocolos de automatización](./AutomationProtocols.md): WebDriver BiDi y WebDriver Classic