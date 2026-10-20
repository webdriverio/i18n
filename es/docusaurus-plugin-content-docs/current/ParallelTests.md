---
id: parallel-tests
title: Pruebas en paralelo en un archivo de especificación
description: "Ejecuta las pruebas de Mocha o los escenarios de Cucumber de un archivo de especificación al mismo tiempo, cada uno en su propio contexto de navegación de WebDriver BiDi, con mochaOpts.parallelMode o cucumberOpts.parallelMode, una forma de browser pooling similar a fullyParallel de Playwright."
---

Desde la v10, WebdriverIO puede ejecutar las pruebas de un archivo de especificación al mismo tiempo. Cada `it()` de Mocha o escenario de Cucumber obtiene su propia ventana del navegador (un [contexto de navegación](https://w3c.github.io/webdriver-bidi/#browsing-context) de WebDriver BiDi) en un solo worker y una sola sesión del navegador. Úsalo en archivos de especificación con muchas pruebas independientes: terminan más rápido y no necesitas más procesos worker ni sesiones del navegador, porque cada prueba solo paga el coste de abrir una ventana.

Es una forma de browser pooling: las pruebas comparten un conjunto de ventanas en un solo navegador, no un conjunto de navegadores. Si vienes de Playwright, `parallelMode: 'userContexts'` es el equivalente más cercano a [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file): cada prueba obtiene su propio contexto aislado. La diferencia es que Playwright reparte las pruebas de un archivo entre procesos worker, cada uno con su propio navegador, mientras que WebdriverIO las ejecuta al mismo tiempo en un solo worker y un solo navegador.

Esto es independiente de [`maxInstances`](./OrganizingTestSuites.md), que ejecuta archivos de especificación completos en paralelo, un worker y una sesión por especificación. Puedes combinar ambos: `maxInstances` define cuántos archivos de especificación se ejecutan al mismo tiempo, y `maxParallelContexts` define cuántas pruebas se ejecutan al mismo tiempo dentro de cada uno de esos archivos.

:::warning Experimental
El modo paralelo requiere la capability experimental `'wdio:experimentalBiDiCommands'`, que cambia cómo se implementan los comandos de elementos en todas las pruebas, no solo en las paralelas. Consulta [Cambios de comportamiento de los comandos de elementos de BiDi](#behavior-changes-of-the-bidi-element-commands).
:::

## Activar el modo paralelo

Necesitas:

- una sesión de WebDriver BiDi (la predeterminada, a menos que establezcas `'wdio:enforceWebDriverClassic': true`),
- la capability `'wdio:experimentalBiDiCommands': true`,
- `@wdio/mocha-framework` o `@wdio/cucumber-framework`. Jasmine no admite el modo paralelo.

Si la sesión no usa BiDi, o falta la capability, WebdriverIO registra una advertencia y ejecuta las pruebas una tras otra. Sin `parallelMode`, nada cambia.

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

El archivo de especificación no necesita cambios:

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

Cada escenario de un archivo feature se ejecuta en su propia ventana. Los perfiles (`cucumberOpts.profiles`, `cucumberOpts.file`) y las opciones `tags`, `name`, `strict`, `dryRun`, `failFast`, `retry` y `retryTagFilter` funcionan igual que en una ejecución secuencial.

## Opciones

| Opción | Valores | Predeterminado | Descripción |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`, `'userContexts'` | no establecido (secuencial) | Activa el modo paralelo y elige cuánto comparten las pruebas. |
| `maxParallelContexts` | número | `os.cpus().length` | Cuántas pruebas se ejecutan al mismo tiempo. |

Establece ambas en `mochaOpts` o en `cucumberOpts`.

`maxParallelContexts` define el número de slots. Cada slot ejecuta una prueba a la vez, abre la ventana para su siguiente prueba mientras se ejecuta la prueba actual y cierra la ventana anterior en segundo plano. Por lo tanto, pueden estar abiertas durante un breve tiempo hasta 3 × `maxParallelContexts` ventanas, más la primera ventana de la sesión: cada slot puede tener una ventana activa, una precargada y una en proceso de cierre. El modo paralelo solo cierra las ventanas que abrió.

## Elegir entre `contexts` y `userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| Ventana por prueba | sí | sí |
| Cookies, `localStorage`, service workers | compartidos por todas las pruebas | aislados por prueba ([contexto de usuario](https://w3c.github.io/webdriver-bidi/#user-context)) |
| Inicio de sesión | una vez, si las pruebas reutilizan la cookie de sesión | en cada prueba |
| Soporte del driver | cualquier navegador con BiDi | requiere soporte de `browser.createUserContext()`; de lo contrario, la ejecución falla |

Elige `'contexts'` por defecto. Elige `'userContexts'` cuando las pruebas no deban ver las cookies o el almacenamiento de las demás, por ejemplo, pruebas que inician sesión como usuarios diferentes. Al igual que `'contexts'`, `'userContexts'` recurre a una ejecución secuencial con una advertencia cuando la sesión no es WebDriver BiDi o falta `'wdio:experimentalBiDiCommands'` en las capabilities. Si el driver no admite `browser.createUserContext`, la ejecución falla en lugar de recurrir a la ejecución secuencial.

`browser.newWindow()` abre la ventana en el contexto de usuario predeterminado, por lo que una ventana abierta de esa forma queda fuera del aislamiento de cookies y almacenamiento de la prueba.

## Lo que pertenece a cada prueba

Dentro de una prueba paralela, estos comandos actúan sobre la propia ventana de la prueba:

- navegación: `url`, `back`, `forward`, `refresh`, `getUrl`, `getTitle`
- comandos de elementos: `$`, `$$`, `shadow$`, `click`, `setValue`, `getText`, los comandos `waitFor*` y otros
- `execute`, `actions`, `addInitScript`
- cookies: `getCookies`, `setCookies`, `deleteCookies` usan la partición de cookies de la prueba
- `mock()`: un mock creado en una prueba paralela solo intercepta y registra las solicitudes de la ventana de esa prueba y sus frames, por lo que dos pruebas pueden hacer mock de la misma URL
- capturas de pantalla: `saveScreenshot`, `takeElementScreenshot`

## Comandos que lanzan errores en modo paralelo

Algunos comandos actúan sobre todo el navegador o toda la sesión, por lo que no pueden dirigirse a la ventana de una sola prueba. Dentro de una prueba paralela, lanzan un error en lugar de afectar a otra prueba:

| Comandos | Por qué | Alternativa |
| --- | --- | --- |
| `getWindowSize`, `setWindowSize` | la ventana del sistema operativo es compartida | usa `browser.setViewport()` para dimensionar la página de una prueba. Las pruebas paralelas comparten una ventana del sistema operativo |
| `throttleNetwork`, `throttleCPU` | se aplican a todo el navegador | ejecuta esas pruebas sin modo paralelo |
| `closeWindow`, `switchToParentFrame` | cambian la ventana enfocada, que todas las pruebas comparten | mantén cada prueba en su propia ventana |
| `reloadSession`, `setTimeout` | cambian la sesión que todas las pruebas comparten | llámalos en el hook `before` de `wdio.conf.ts` |
| `acceptAlert`, `dismissAlert`, `getAlertText`, `sendAlertText` | las alertas pertenecen a un contexto de navegación | llámalos sobre el contexto que devuelve `browser.url()`: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. Usa `page.acceptAlert(text)` en lugar de `sendAlertText(text)`. `dismissAlert()` y `getAlertText()` también funcionan sobre el contexto |
| `getComputedRole`, `getComputedLabel` | WebDriver BiDi no puede leerlos | ejecuta esas pruebas sin modo paralelo |

`switchWindow` se eliminó para todas las sesiones de WebDriver BiDi en la v10, no solo en modo paralelo. Lanza ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` Conserva el objeto de contexto en lugar de cambiar a él.

WebdriverIO descarta los prompts automáticamente a menos que algo escuche el evento `dialog`, así que registra un listener (`browser.on('dialog', () => {})`) antes de responder a un prompt desde una prueba.

Todos los demás comandos de WebDriver Classic también lanzan un error. Solo se permiten `status`, `getTimeouts` y `getWindowHandles`. Si un comando de WebdriverIO recurre a WebDriver Classic en modo paralelo sin que hayas llamado a un comando Classic, por favor [repórtalo](https://github.com/webdriverio/webdriverio/issues/new/choose).

## Hooks y timeouts

### Mocha

- `before()` y `after()` en un archivo de especificación se ejecutan **una vez por prueba**, no una vez por `describe`, porque cada prueba tiene su propia ventana. Cada prueba ejecuta `before`, `beforeEach`, la prueba, `afterEach` y `after` en su ventana. Coloca la configuración que deba ejecutarse una vez por archivo de especificación en los hooks `beforeSuite` / `afterSuite` de `wdio.conf.ts`. Estos se ejecutan una vez, fuera de cualquier ventana de prueba.
- Solo se aplica `mochaOpts.timeout`. `this.timeout()` en una prueba o hook lanza un error, y `it(...).timeout()` o un timeout de `describe` se ignoran con una advertencia. Consulta [Timeouts de Mocha y los hooks de WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks).
- `mochaOpts.bail` y `mochaOpts.retries` no son compatibles y hacen fallar la ejecución. `this.retries()` lanza un error.
- `.only()`, `this.skip()`, `grep`, `fgrep` e `invert` funcionan igual que en una ejecución secuencial.

### Cucumber

- `BeforeAll` / `AfterAll` y los hooks `beforeFeature` / `afterFeature` de `wdio.conf.ts` se ejecutan una vez por worker, no una vez por feature. `beforeFeature` / `afterFeature` reciben el uri y el feature solo del primer archivo feature, lo cual importa cuando un worker ejecuta varios archivos feature, por ejemplo, especificaciones agrupadas. Se ejecutan fuera de la ventana de cualquier escenario, por lo que no deben usar comandos que la necesiten.
- `Before` / `After`, `BeforeStep` / `AfterStep` y los hooks de escenario y de paso de `wdio.conf.ts` se ejecutan para cada escenario, en la ventana de ese escenario.
- `cucumberOpts.strict` es `false` por defecto en WebdriverIO. Un paso pendiente solo hace fallar el escenario con `strict: true`.

### Ambos frameworks

La ventana de una prueba se cierra en cuanto la prueba termina. No inicies temporizadores ni promesas que sigan ejecutándose después de que termine la prueba.

## Cambios de comportamiento de los comandos de elementos de BiDi

`'wdio:experimentalBiDiCommands': true` cambia la implementación de varios comandos de elementos en todas las pruebas de la sesión, secuenciales o paralelas:

- `addValue` y `clearValue` despachan eventos DOM sintéticos, no eventos de teclado confiables.
- `getAttribute` sigue las reglas de WebDriver para los valores de propiedades y atributos.
- `click` se envía a través de la Actions API.

Ejecuta tu suite una vez con la capability y sin `parallelMode` para encontrar las pruebas que dependen del comportamiento Classic.

## Reporters

Los reporters que extienden [`@wdio/reporter`](./CustomReporter.md) reportan las pruebas paralelas bajo la suite correcta y asocian cada comando a la prueba cuyo contexto de navegación lo envió.

`@wdio/allure-reporter` y `@wdio/junit-reporter` aún no admiten el modo paralelo. Registran una sola prueba actual por worker, por lo que cuando las pruebas se solapan, los resultados, pasos y adjuntos de Allure, y las propiedades y registros del worker de JUnit, pueden acabar bajo la prueba equivocada. Úsalos con ejecuciones secuenciales. Con `addConsoleLogs`, `@wdio/spec-reporter` no atribuye de forma fiable la salida de consola de las pruebas que se solapan.

Un reporter personalizado no debe asumir que una prueba termina antes de que comience la siguiente. Consulta [Reporters y pruebas paralelas](./CustomReporter.md#reporters-and-parallel-tests).

## Solución de problemas

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

Añade `'wdio:experimentalBiDiCommands': true` a la capability. Sin ella, las pruebas se ejecutan una tras otra. Con Cucumber, el mensaje dice `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

La sesión usa WebDriver Classic. Elimina `'wdio:enforceWebDriverClassic': true` de la capability, o usa un navegador y un driver compatibles con WebDriver BiDi. Con Cucumber, el mensaje dice `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

El driver no puede crear contextos de usuario. Usa `parallelMode: 'contexts'` o actualiza el navegador y el driver. Con Cucumber, el mensaje dice `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` o `... is not supported in parallel mode`

La prueba llamó a un comando de [Comandos que lanzan errores en modo paralelo](#commands-that-throw-in-parallel-mode). Usa la alternativa indicada en la tabla.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

Elimina `mochaOpts.bail` o `mochaOpts.retries`, o ejecuta el archivo de especificación sin `parallelMode`.

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

El archivo de especificación tiene hooks `before()` o `after()`. Se ejecutan para cada prueba. Mueve la configuración que deba ejecutarse solo una vez a `beforeSuite` / `afterSuite` en `wdio.conf.ts`.

## Páginas relacionadas

- [Organizar suites de pruebas](./OrganizingTestSuites.md): ejecuta archivos de especificación en paralelo con `maxInstances`
- [Sharding](./Sharding.md): divide la suite entre varias máquinas
- [Frameworks](./Frameworks.md): todas las opciones de Mocha y Cucumber
- [Protocolos de automatización](./AutomationProtocols.md): WebDriver BiDi y WebDriver Classic