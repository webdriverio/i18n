---
id: v10-migration
title: De v9 a v10
description: Actualiza un proyecto de WebdriverIO v9 a v10, con todos los cambios incompatibles y una skill para agentes de programación que aplica esta guía.
---

Esta guía recoge los cambios incompatibles de WebdriverIO `v10` y lo que tienes que hacer al respecto.

A diferencia de versiones mayores anteriores, la mayoría de estos cambios no se pueden aplicar con el [codemod](https://github.com/webdriverio/codemod) de WebdriverIO, porque dependen de lo que tus pruebas significan realmente. Las [firmas de comandos heredadas](#legacy-command-signatures) de más abajo son reemplazos mecánicos. Cada una de las demás secciones describe cómo encontrar los lugares afectados en tu suite.

## Migrar con un agente de programación

Dale a tu agente la skill de migración a v10 y pídele que migre la suite a WebdriverIO v10 siguiendo esta página. La skill es el procedimiento: qué buscar, qué codemod ejecutar y cuándo detenerse. Esta página es la fuente de verdad para cada cambio incompatible.

Instálala desde el proyecto que estás actualizando. La [CLI de skills](https://skills.sh) lee [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) de este repositorio y la escribe en el directorio de skills de los agentes que elijas:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` instala esta skill. Las skills para trabajar en el repositorio de WebdriverIO están marcadas como internas y no se ofrecen. La CLI pregunta para qué agentes instalarla y escribe la skill en el directorio de proyecto de cada agente. También puedes adjuntar ese archivo al chat.

Los selectores estrictos y las listas `specs` / `exclude` sin prefijo en las capabilities solo aparecen cuando se ejecuta la suite. La skill no puede decidirlos solo a partir del código fuente.

## Node.js

WebdriverIO v10 requiere Node.js 22.19.0 o posterior. Node.js 18 y 20 ya no son compatibles. La CI cubre Node.js 22, 24 y 26.

## Pruebas de componentes

El browser runner sigue funcionando en Chrome 90, Edge 90, Firefox 90 y Safari 14.1 o posteriores. Consulta [Compatibilidad con navegadores](/docs/component-testing#browser-support).

El código que se pasa a `browser.execute` se mantiene en ES2021, para que pueda ejecutarse en navegadores más antiguos bajo prueba. Ese mínimo no ha cambiado.

## Mocha

`@wdio/mocha-framework` y `@wdio/browser-runner` dependen de [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). Mocha 12 necesita Node.js `^20.19.0 || >=22.12.0`, lo cual queda cubierto por el mínimo de v10, 22.19.0.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` ya no existe. Mocha eliminó la opción `--compilers`, obsoleta desde hace tiempo, por lo que los mapeos de compiladores que queden se ignoran. Carga transpiladores u otros archivos de configuración con `mochaOpts.require`.

WebdriverIO respeta el timeout de Mocha: `this.timeout()` en una prueba o hook, y `mochaOpts.timeout: 0`, que desactiva el timeout. En v9, WebdriverIO ignoraba `this.timeout()` en una prueba y, a partir de la 9.22, `mochaOpts.timeout: 0` hacía fallar todas las pruebas ("Timeout after -3ms"). El argumento `retry` de WebdriverIO no vuelve a ejecutar una prueba tras un timeout. Consulta [Timeouts de Mocha y los hooks de WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks), también para `mochaOpts.parallelMode`. Novedad en v10: [pruebas en paralelo dentro de un archivo spec](./ParallelTests.md) con `mochaOpts.parallelMode` o `cucumberOpts.parallelMode`.

`failHookAffectedTests` tiene por defecto el valor `true`. Un hook `before` o `beforeEach` que falla hace fallar las pruebas que ese hook omitió. Establece `mochaOpts.failHookAffectedTests` en `false` para informar solo del hook.

Usa `expect-webdriverio` 8, consulta [expect-webdriverio 8](#expect-webdriverio-8). Mocha puede cargar ese paquete dos veces en un mismo proceso; comparte el estado de las aserciones entre esas copias ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Cambios de Mocha 12 que pueden filtrarse a través de `mochaOpts`:

- `grep` acepta flags modernos de RegExp.
- `ui` sigue siendo `bdd`, `tdd`, `qunit` o `exports`. Las interfaces personalizadas deben conservar el sufijo `*-bdd`, `*-tdd` o `*-qunit`.
- `parallel` sigue sin estar soportado. WDIO gestiona el paralelismo de specs; el pool de workers de Mocha dará un error si lo activas.

Mocha 12 es ESM-first (`"type": "module"`). El uso programático de `require('mocha')` sigue funcionando en Node 22 mediante `require(esm)`. La CLI de Mocha de WDIO (`wdio run … --mochaOpts.*`) no cambia; la propia CLI de Mocha usa ahora `util.parseArgs` en lugar de yargs.

## Cucumber

`@wdio/cucumber-framework` depende de [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

Cucumber 13 requiere Node.js 22, 24 o 26 o posterior. No funciona en Node.js 20, 23 ni 25. El paquete del framework declara ese mismo rango, empezando en el mínimo de v10, 22.19.0.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` no tiene alias. Establecerlo lanza un error, de modo que un filtro olvidado no puede ejecutar silenciosamente todos los escenarios.

Cucumber 13 ya no exporta `Cli`. Las ejecuciones programáticas pasan por `runCucumber` de `@cucumber/cucumber/api`, que es lo que el adaptador ya utiliza.

Otros cambios incompatibles de Cucumber 13 (rutas de formatters ambiguas, workers en paralelo, `BeforeAll` / `AfterAll`) se describen en la [guía de actualización de Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

## Jasmine

`@wdio/jasmine-framework` depende de [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). Jasmine 6 está probado en Node.js 20, 22 y 24. El mínimo de v10, 22.19.0, ya cubre ese rango.

Se eliminó `jasmineNodeOpts`. Configura Jasmine con `jasmineOpts`. Establecer `jasmineNodeOpts` lanza un error:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` ya no se lee. Usa `jasmineOpts.stopOnSpecFailure`. Un `failFast` que haya quedado no detiene la suite. El `failFast` de Cucumber es una opción distinta y sigue funcionando.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

Se eliminó `jasmineOpts.stopSpecOnExpectationFailure`. Usa `jasmineOpts.oneFailurePerSpec`. Establecer la clave antigua lanza un error:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Los matchers síncronos de Jasmine vuelven a ser síncronos. En v9, el `expect` global era el `expectAsync` de Jasmine, por lo que `expect(1).toBe(1)` devolvía una promesa. En v10, los matchers integrados de Jasmine y los matchers que añades con `jasmine.addMatchers` devuelven `undefined`. Los matchers de WebdriverIO, los matchers asíncronos de Jasmine y los matchers de `jasmine.addAsyncMatchers` siguen devolviendo una promesa, así que sigue usando `await` con ellos. No necesitas cambiar `await expect($('#logo')).toBeDisplayed()` por `expectAsync()`: el `expect` global envía los matchers de WebdriverIO a `expectAsync` por ti. `await expect(1).toBe(1)` sigue funcionando.

Una aserción síncrona fallida sin `await` ahora hace fallar la spec. En v9 era una promesa rechazada: si nada la esperaba, la spec podía pasar, con solo un rechazo no gestionado en el log. Tras la actualización, revisa las specs que empiecen a fallar. Tenían un fallo oculto en v9, y la solución está en la prueba o en la aplicación, no en la llamada a `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: pasaba incluso cuando `onSave` no se llamaba
    // v10: falla cuando `onSave` no se llama
    expect(onSave).toHaveBeenCalled()
})
```

El resultado de un matcher síncrono es ahora `undefined`, por lo que `.then()` o `.catch()` sobre él lanza un `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

Otros efectos de este cambio:

- `oneFailurePerSpec` ahora detiene la spec en su primera aserción fallida: de inmediato para un matcher síncrono, y cuando la promesa se resuelve para un matcher asíncrono esperado con `await`.
- Los matchers de spies de Jasmine funcionan sin `await`. En v9, `toHaveBeenCalled`, `toHaveSpyInteractions` y `toHaveNoOtherSpyInteractions` fallaban con "Does not take arguments", y un spy no llamado pasaba sin `await`.
- `jasmine.addMatchers` ya no se reemplaza, por lo que Jasmine ya no muestra su advertencia "Monkey patching detected".

`toHaveSize` tiene dos significados. Sobre un valor de WebdriverIO, es el matcher de WebdriverIO y comprueba el tamaño del elemento: un elemento, un array de elementos (incluido el resultado de `$$().filter()`), un `Element[]`, un elemento multi-remote, un navegador, un browsing context, un mock, el wrapper `some()`, o una promesa como un `$()` encadenable. Sobre cualquier otro valor, es el matcher de Jasmine y comprueba la longitud. En v9 siempre se ejecutaba el matcher de Jasmine.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, síncrono
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asíncrono
```

Los tipos siguen las mismas reglas. `@wdio/jasmine-framework` ahora tipa el `expect` global con los matchers de Jasmine, más los matchers de WebdriverIO y los matchers asíncronos de Jasmine, que devuelven una promesa. Elimina `expect-webdriverio/jasmine-wdio-expect-async` de `types` en tu `tsconfig.json`, porque tipa todos los matchers como asíncronos. Añade `jasmine` si no está:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` y `expect.multiRemote()` ahora también funcionan en specs de Jasmine. Antes no estaban en el `expect` de Jasmine en tiempo de ejecución.

## expect-webdriverio 8

`@wdio/globals`, `@wdio/runner` y `@wdio/browser-runner` requieren `expect-webdriverio` 8 como peer dependency. En v9 era `expect-webdriverio` 5, 6 o 7. Si tu `package.json` incluye `expect-webdriverio`, actualízalo a la versión 8 en el mismo cambio que los paquetes `@wdio/*`.

`expect-webdriverio` 8 tiene sus propios cambios incompatibles. Su [guía de migración de v7 a v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) enumera cada cambio y su reemplazo. Si vienes de `expect-webdriverio` 5 o 6, lee también su [guía de migración de v5 a v6](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6): la versión 8 elimina las APIs que se marcaron como obsoletas entre la 5.6.9 y la 6.0.0. La versión 7 no tiene guía de migración. Añade soporte multi-remote, y `toMatchSnapshot()` y `toMatchInlineSnapshot()` sobre `$$()` ahora almacenan el `outerHTML` de cada elemento: actualiza esos snapshots. Estos son los cambios con más probabilidades de afectar a una suite de pruebas:

- `toHaveText` sobre `$$()` compara los elementos índice por índice. Un array esperado en un orden distinto al de la página falla. Usa el orden de la página, `expect.oneOf()` o `expect.arrayContaining()`.
- Un array de valores esperados sobre un único elemento hace fallar `toHaveText`, `toHaveHTML`, `toHaveComputedLabel`, `toHaveComputedRole` y `toHaveElementClass`. Usa `expect.oneOf()`. Para `toHaveElementClass`, un array significaba "tiene alguna de estas clases": usa `expect.oneOf()`, o una aserción por cada clase cuando el elemento deba tenerlas todas.
- Un matcher de lista (`expect.arrayContaining()`, `expect.arrayOf()`) sobre un único elemento, o con `some()`, lanza un error. Sobre `$$()`, compara los valores de todos los elementos a la vez.
- Un atributo o propiedad ausente nunca coincide, tampoco con un matcher que acepta la ausencia de valor, como `expect.not.stringContaining()`.
- Los valores `URL`, `Set`, `Map` y binarios se comparan por su contenido. Una aserción que pasaba por error ahora puede fallar.
- Los tipos auxiliares ya no son globales. Un archivo que usa `Test`, `TestResult`, `Scenario` o `WdioCustomMatchers` sin un import falla con `Cannot find name`: usa `Frameworks.Test`, `Frameworks.TestResult` y `Frameworks.Scenario` de `@wdio/types`, y `ExpectWebdriverIO.Matchers`.
- Se eliminaron `setFeatureFlags()` y la opción `featureFlags`.
- Se eliminaron estas APIs obsoletas: `setOptions` (usa `setDefaultOptions`), `getConfig` (usa `getDefaultOptions`), `matchers` (usa `wdioCustomMatchers`), `toHaveAttr` (usa `toHaveAttribute`), `toHaveClass` (usa `toHaveElementClass`), `toBeRequestedWithResponse()` (usa `toBeRequestedWith({ response })`) y `expect-webdriverio/types` (usa `expect-webdriverio/expect-global`).
- Los hooks `beforeAssertion` y `afterAssertion` reciben el nombre del alias que llamó la prueba, para `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` y `toBeRequested`. En v9 recibían el nombre del matcher detrás del alias, por ejemplo `toExist` para `toBeExisting`.
- En un navegador multi-remote, pasa el resultado de `$$()` a `expect`. Un array plano como `[...elements]` o `Array.from(elements)` no se reconoce como elementos, y la aserción falla.

En un navegador multi-remote, una aserción comprueba todas las instancias, y `expect.multiRemote()` da un valor esperado por instancia. Consulta [Aserciones multiremote](/docs/multiremote#assertions).

## Paquetes de drivers

WebdriverIO v10 inicia Firefox, Edge y Safari con `geckodriver` 8, `edgedriver` 8 y `safaridriver` 3. En v9 usaba `geckodriver` y `edgedriver` 6 o 7, y `safaridriver` 1 o 2. WebdriverIO los instala, así que no tienes que incluirlos tú. Si tu `package.json` incluye alguno de ellos, actualízalo en el mismo cambio que los paquetes `@wdio/*`.

`geckodriver` y `edgedriver` toman `@wdio/logger` como peer dependency, de modo que registran a través del logger de tu instalación de WebdriverIO. En v9, `geckodriver` y `edgedriver` traían su propia copia de `@wdio/logger`, y esa segunda copia vaciaba el archivo de log en `outputDir`. Ejecuta `npm ls @wdio/logger`: todas las copias deberían ser de la versión 10. Un plugin o servicio que aún dependa de la versión 9 tiene el mismo efecto.

Las [notas de actualización de los drivers](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) enumeran todos los cambios. Estos cambios pueden afectar a un proyecto de WebdriverIO:

- Las descargas de drivers usan `HTTPS_PROXY` y `HTTP_PROXY`. En v9, las descargas de `geckodriver` y `edgedriver` las ignoraban. Si hay un proxy configurado en tu entorno pero la CDN del driver debe alcanzarse directamente, añade su host a `NO_PROXY`.
- `geckodriver` ya no lee `GECKODRIVER_FILEPATH`. Usa `GECKODRIVER_PATH`.
- `wdio:edgedriverOptions` y `wdio:safaridriverOptions` aceptan `spawnOpts`, como hace `wdio:chromedriverOptions`.

## Descargas de navegadores

En v9, WebdriverIO extraía por sí mismo los archivos zip de Chrome, Chromium y Chromedriver. En v10 usa el comando del sistema `unzip` en Linux y macOS (`tar.exe` o PowerShell en Windows). Las imágenes Docker reducidas, como `node:24-slim`, no lo incluyen: instálalo, consulta [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser).

En v9, las descargas de Chrome, Chromium, Firefox y Chromedriver usaban `HTTPS_PROXY` y `HTTP_PROXY`. En v10 solo las usan cuando `proxy-agent` está instalado en tu proyecto, o cuando Node.js se ejecuta con `NODE_USE_ENV_PROXY=1` (Node.js 22.21.0 / 24.5.0 o posterior). WebdriverIO muestra una advertencia cuando hay una variable de proxy configurada pero la descarga la ignoraría. Consulta [Proxy para descargas de navegadores y drivers](/docs/proxy#proxy-for-browser-and-driver-downloads).

## Global multi-remote

Se eliminó el global en minúsculas `multiremotebrowser`, de `@wdio/globals` y también de los globals de `eslint-plugin-wdio`. Usa `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

`specs` y `exclude` en las capabilities ya no se leen. Usa `wdio:specs` y `wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

Las claves de nivel superior de la configuración siguen siendo `specs` y `exclude`. Una lista sin prefijo que haya quedado en una capability no selecciona archivos para esa capability. La capability usa entonces los `specs` y `exclude` de nivel superior.

Se eliminaron los alias `tunnelIdentifier` y `parentTunnel` de los tipos de opciones de Sauce Labs. Usa `tunnelName` y `tunnelOwner`.

## TypeScript

Se eliminaron los tipos `Element`, `MultiRemoteBrowser` y `MultiRemoteElement` exportados por `webdriverio`. Usa el namespace global `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` ahora declara `then`, y `ChainablePromiseArray` declara `then`, `catch` y `finally`. Los tipos encadenables describen el valor antes de `await`. Ya no encajan con el valor esperado:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Tipa el valor esperado como `WebdriverIO.Element` o `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Ambos tipos encadenables ahora cumplen `T extends PromiseLike<unknown>`. Un tipo condicional que compruebe `PromiseLike` toma una rama distinta para `$()` y `$$()` que en v9. Por ejemplo, `Awaited<ChainablePromiseElement>` es ahora `WebdriverIO.Element`, y `Awaited<ChainablePromiseArray>` es `WebdriverIO.ElementArray`.

Las propiedades de un `$$()` no esperado cambiaron de tipo. Están disponibles de inmediato, antes de que se resuelva la consulta, así que léelas sin `await` ni `.then()`:

| Propiedad | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | el padre, no una promesa (ver más abajo) |
| `foundWith` | ninguno | el comando que encontró la lista, p. ej. `$$` o `custom$$` |
| `props` | ninguno | los argumentos adicionales de ese comando |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

En una consulta encadenada como `$('form').$$('input')`, `parent` es el encadenable `$('form')` hasta que la lista se resuelve, y el elemento resuelto después. Espera la lista con `await` antes de usar `parent` como elemento.

En tiempo de ejecución, `filter()`, `filterSeries()` y `slice()` sobre una lista de `$$()` devuelven una lista de elementos, no un array plano. El resultado conserva `selector`, `foundWith`, `parent` y `props` de la lista de origen. En v9, `filter()` devolvía un array plano sin estas propiedades. Los tipos aún no lo reflejan: `filter()` y `filterSeries()` se declaran como que devuelven `Promise<WebdriverIO.Element[]>`, y `slice()` devuelve `WebdriverIO.Element[]`, por lo que TypeScript informa de un error cuando lees estas propiedades en el resultado.

WebdriverIO no vuelve a ejecutar la consulta para la propia lista derivada: un índice más allá de su final no espera más coincidencias, y nunca devuelve un elemento que el filtro haya excluido. Sus miembros siguen siendo los elementos de la consulta de origen, con su `selector` e `index` originales. Si un miembro queda obsoleto (stale), WebdriverIO lo vuelve a obtener de la consulta de origen en ese índice, lo que puede dar otro elemento si la página cambió. El código que vuelve a ejecutar la consulta de una lista a partir de sus propiedades, por ejemplo `parent[foundWith](selector, ...props)`, obtiene la lista completa, no la filtrada.

Los paquetes publicados establecen `typeScriptVersion` en 6.0.3, coincidiendo con la versión de TypeScript con la que compila este repositorio.

`browser.mock()` acepta el `URLPattern` de `urlpattern-polyfill` y el `URLPattern` nativo (global en Node.js 24, y tipado por la librería `dom` de TypeScript 6).

TypeScript 6 marca como obsoletos `"moduleResolution": "node"` y `"baseUrl"`, y hace que `strict` sea el valor por defecto. `create-wdio` ahora genera `"moduleResolution": "bundler"` para proyectos ESM y `"NodeNext"` para proyectos CommonJS. Si actualizas TypeScript en un proyecto existente, cambia estas opciones en tu `tsconfig.json`.

Para un proyecto ESM:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

Para un proyecto CommonJS, usa `NodeNext` en ambas opciones, como hace `create-wdio`:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 también cambia el valor por defecto de `types` a `[]`, por lo que ya no carga todos los paquetes `@types/*` instalados. Si tu `tsconfig.json` no tiene una lista `types`, globals como `describe` e `it` de Mocha fallan con `Cannot find name`. Enumera los paquetes de tipos que usan tus pruebas, como hace `create-wdio`. Por ejemplo, con Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` escribe `compilerOptions.target` y `compilerOptions.lib` como `es2024`. Comprobar los tipos de ese archivo requiere TypeScript 5.7 o posterior. `tsx`, que ejecuta la configuración y las pruebas, no comprueba tipos, así que un compilador más antiguo solo importa cuando ejecutas `tsc` tú mismo.

Un `tsconfig.json` existente no se reescribe. Una configuración generada que extiende otra configuración conserva el `target` y el `lib` de la configuración padre.

En el hook `afterAssertion`, el tipo de `params.result` es ahora `{ pass, message }`, tal como lo dan los matchers. En v9 el tipo era `{ result, message }`, pero `params.result.result` siempre era `undefined` en tiempo de ejecución. Lee `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` es `true` cuando el valor coincide con el valor esperado, también con `.not`. Así, con `.not`, la aserción pasa cuando `pass` es `false`. El hook no indica si la prueba usó `.not`.

## Hooks de comandos

Un comando de elemento ejecuta los hooks `beforeCommand` y `afterCommand` una sola vez, con los argumentos del comando. En v9 los ejecutaba 2 o 3 veces, y la primera llamada recibía `[]` como `args`. Un comando que se ejecuta dentro de otro (por ejemplo `getElementText` en `getText`) sigue teniendo su propio par. Los hooks no se ejecutan para la función de eventos `emit`. Un hook que cuenta comandos o mide su tiempo ve cada comando una sola vez.

Para un comando de elemento, `beforeCommand` se ejecuta antes de que WebdriverIO espere al elemento, por lo que el elemento aún puede no existir en ese momento. `afterCommand` se ejecuta después de la espera y de cualquier reintento, con el resultado o el error del último intento. Un hook que necesite el elemento encontrado debe usar `afterCommand`.

Un comando modificado con `overwriteCommand()`, y una consulta encadenada sobre una promesa (`$('a').$('b')`), todavía pueden ejecutar los hooks más de una vez.

## Reporters

El evento `result` del navegador se reenvía a los reporters como `client:afterCommand`. Ese payload y el tipo `AfterCommandArgs` ya no tienen una propiedad `name`. Lee `command` en su lugar. Los comandos personalizados ya enviaban `command`.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

Se eliminó `addEnvironment(name, value)` de `@wdio/allure-reporter`. No tenía ningún efecto. Establece las filas de entorno con [`reportedEnvironmentVars`](/docs/allure-reporter) en las opciones del reporter de Allure.

## `$` es estricto

`$` ahora representa __exactamente un__ elemento. Si el selector resuelve a más de un elemento, el comando lanza un `StrictSelectorError` en lugar de usar silenciosamente la primera coincidencia:

```js
// v9 — hace clic en el primer botón, aunque haya 12
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

Esto coincide con los [locators de Playwright](https://playwright.dev/docs/locators#strictness). Cypress es diferente: sus consultas pueden resolver a varios elementos, y son los comandos de acción como [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) los que rechazan por defecto un sujeto con varios elementos. Un selector que resuelve discretamente a varios elementos es casi siempre un bug latente: hoy pasa, e interactúa con el elemento equivocado en cuanto alguien añade un segundo botón a la página.

La regla se aplica a cada paso de una cadena (`$('form').$('input')`) y a cada tipo de selector que acepta `$`: selectores de texto (incluidos los que atraviesan el shadow DOM), funciones JS, selectores móviles y referencias a estrategias personalizadas.

### Lo que no cambió

- `$$` sigue devolviendo cero o muchos elementos.
- Los comandos auxiliares específicos `custom$`, `shadow$` y `react$` no son estrictos: siguen devolviendo su primera coincidencia, al igual que sus equivalentes `$$`.
- Un selector que no coincide con nada sigue devolviendo un elemento de resolución diferida, así que `waitForExist` y la [espera automática](/docs/autowait) se comportan como antes.
- Pasar una referencia a un elemento, p. ej. `$(await browser.getActiveElement())`, siempre se refiere a un único nodo y nunca se comprueba.

### Cómo auditar tu suite

No hay codemod para esto: solo tú puedes saber si una segunda coincidencia es un bug o algo intencionado. Dos enfoques prácticos:

1. __Ejecuta tu suite.__ Cada violación lanza un error con el selector y el número de coincidencias, lo que normalmente basta para corregirla en el momento.
2. __Revisa de antemano los selectores amplios.__ Para cada `$(...)` genérico en tus page objects, imprime con cuántos elementos coincide realmente:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` es demasiado amplio
   ```

Después, o bien acota el selector —idealmente hacia una consulta orientada al usuario como `$('button=Submit')` o `$('aria/Submit')`, consulta [Selectores](/docs/selectors)— o indica explícitamente que quieres la primera coincidencia:

```js
await $('button[type="submit"]').click()
// ...o, si realmente te refieres al primero
await $$('button')[0].click()
```

### Desactivarlo

Para una sola consulta:

```js
await $('button', { strict: false }).click()
```

Para todo un proyecto, restaurando el comportamiento de v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

Un elemento recuerda cómo fue consultado, así que volver a obtenerlo —tras una referencia de elemento obsoleta, o mediante `waitForExist`— mantiene el modo estricto de la llamada original.

:::info

Internamente, un `$` estricto emite una petición `findElements` en lugar de `findElement`, ya que contar las coincidencias es la única forma de aplicar la regla. En ambos casos es un único viaje de ida y vuelta, pero es visible para servicios personalizados y mocks de WebDriver que dependen del comando `findElement`.

:::

## Listas de elementos antes de `await`

Desde v10, `$$()` devuelve un [`ElementArray`](/docs/api/browser/$$): un array real sobre el que puedes hacer `await`. En v9, un `$$()` sin `await` era una promesa.

| `$$('li')` antes de `await` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`, `catch`, `finally` | funciones | funciones, hasta que la lista se carga |

Hasta que la lista se carga, `length` es una promesa, y `[...list]`, `Array.from(list)` y `for...of` lanzan `Cannot synchronously iterate over an element list that has not resolved yet`.

Lo mismo ocurre con `custom$$`, `shadow$$` y `react$$`, y con `$$()` en un navegador multi-remote. Un `$()` sin `await` sigue siendo una promesa.

`await` da la misma lista, cargada y sin `then`. Entonces `length` es un número, y `for...of`, `[...list]` y `Array.from()` funcionan. Antes de `await`, puedes usar `for await`, un índice (`$$('li')[0]`), `at()`, `slice()` y los métodos de iteración asíncronos (`map`, `filter`, `forEach`, ...). Estos métodos dan una promesa: haz `await` del resultado de `filter()` antes de leer un índice.

Un índice más allá del final de una lista `$$(selector)` no es `undefined`, tampoco después de `await`. Es un elemento que espera a que la lista alcance ese índice, como hace `$$('li')[5]` antes de `await`: `isExisting()` da `false` y un comando como `getText()` lanza `Index out of bounds`, ambos tras `waitforTimeout`. En v9, `(await $$('li'))[5]` era `undefined`. Por tanto, `if (list[5])` siempre es verdadero, y `list.at(5)` nunca es `undefined`. Compara el índice con `length`, que no espera:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

Después de `await`, un índice negativo, y una lista de `slice()` o `filter()`, dan `undefined` más allá del final. Antes de `await`, `list[i]` con un índice entero de 0 o más, y `at()`, dan una promesa, que siempre es truthy.

El código que espera un valor solo cuando es una `Promise`, o que lee `length` sin `await`, no lanza error. Lee una promesa como longitud: `list.length > 0` y un bucle como `for (let i = 0; i < list.length; i++)` ven `false`, pero `if (list.length)` y `list.length !== 0` ven `true`. Haz siempre `await` del valor. `await` sobre un valor ya cargado da ese mismo valor:

```diff
- if (value instanceof Promise) {
-     value = await value
- }
+ value = await value
```

```diff
- if ($$('button').length > 0) {
+ if (await $$('button').length > 0) {
```

## Firmas de comandos heredadas

v9 aún aceptaba formas posicionales antiguas y mostraba una advertencia. v10 solo acepta el objeto de opciones.

El [codemod](https://github.com/webdriverio/codemod) de v10 reescribe `addCommand` y `overwriteCommand` cuando el tercer argumento es un booleano, `getHTML(true)` y `getHTML(false)`, y `getCookies` cuando el filtro es un string o un array de un elemento. Una llamada a `getCookies` con más de un nombre se deja sin cambios, porque un filtro coincide con un nombre.

Instala primero el codemod. WebdriverIO no depende de él.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

Usa `--parser=tsx` para archivos TypeScript.

### `addCommand` y `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

Un tercer argumento booleano es un error de TypeScript. En tiempo de ejecución lanza:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` e `instances` van en ese mismo objeto de opciones. Omite el tercer argumento para adjuntar un comando al navegador.

### `getCookies`

Se rechazan los filtros de tipo string y array de strings. Pasa un [objeto de filtro de cookies](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Una llamada filtra un nombre; vuelve a llamarlo para otro nombre.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` sin argumentos sigue devolviendo todas las cookies visibles para la página.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` sin argumentos sigue incluyendo la propia etiqueta del elemento.

### `newWindow`

`windowName` y `windowFeatures` ya no existen. Solo se aplicaban a WebDriver Classic. El comando sigue aceptando `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Usa `type: 'tab'` para abrir una pestaña.

En una sesión WebDriver BiDi, `newWindow()` devuelve el nuevo [browsing context](/docs/api/browsingContext) y no cambia a él. En v9 sí cambiaba. Por tanto, `browser.closeWindow()` después de `newWindow()` ahora cierra la primera pestaña, no la nueva. Ejecuta los comandos de la nueva pestaña sobre el contexto que devuelve `newWindow()`, y ciérrala con `closeWindow()` sobre ese contexto:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

En TypeScript, el tipo del resultado es `WebdriverIO.BrowsingContext | { handle, type }`, porque una sesión WebDriver Classic devuelve el handle de la ventana. En una sesión BiDi, acótalo: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`.

El navegador permanece en la primera pestaña. Elimina cualquier llamada a `switchWindow()` que volviera a ella: `switchWindow` lanza un error en una sesión BiDi. Consulta [`switchToFrame`](#switchtoframe) para el modelo de browsing contexts.

### `startActivity`

Solo se acepta el objeto de opciones. `appWaitPackage`, `appWaitActivity` y `optionalIntentArguments` ya no existen. Solo se aplicaban al endpoint HTTP de Appium eliminado. `mobile: startActivity` no los acepta, y pasarlos lanza un error.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## Comandos eliminados

Se eliminaron `browser.throttle` y los comandos obsoletos `touchAction`.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | La [Actions API](/docs/api/browser/action) con un puntero táctil, o los comandos móviles [`tap`](/docs/api/mobile/tap) y [`swipe`](/docs/api/mobile/swipe) |

Un gesto táctil con la Actions API:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

Se eliminó `browser.uploadFile()`. Comprimía un archivo local y lo enviaba al endpoint `file` de Selenium, que no forma parte de WebDriver ni de WebDriver BiDi. Establece un input de archivo con [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` necesita una sesión BiDi. Las rutas las abre el navegador. Una ruta relativa se resuelve respecto a `process.cwd()`. El envío previo de archivos a Selenium Grid no forma parte de v10. Una suite que dependía de `uploadFile` para enviar bytes a un nodo tiene que colocar el archivo donde el navegador pueda leerlo y después llamar a `setFiles`.

En una sesión clásica local, `element.setValue('/local/path')` sigue escribiendo una ruta que el navegador local ya puede ver. El endpoint de Selenium en bruto sigue siendo `browser.file()` para los usuarios de Grid que lo llaman directamente.

## `executeAsync`

Se eliminaron `browser.executeAsync` y `element.executeAsync`. Pasa una función `async` a [`execute`](/docs/api/browser/execute). El valor de retorno de la función, incluida una promesa devuelta, es el resultado del comando. El timeout `script` sigue aplicándose, también en una sesión WebDriver BiDi: un script que se ejecuta durante más tiempo falla con un error `script timeout`. Para un timeout `script` mayor que [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (180 segundos por defecto), aumenta ambos.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Elimina el callback `done` de WebDriver. Un script en forma de string que esperaba ese callback como último argumento tiene que devolver una promesa en su lugar. En tiempo de ejecución, `executeAsync` no es una función.

## `switchToFrame`

`browser.switchToFrame` ya no es un comando público.

En una sesión WebDriver BiDi, `switchFrame` y `switchWindow` lanzan un error. Una pestaña, una ventana y un frame son un `WebdriverIO.BrowsingContext` que tú mantienes. `browser.url()` navega el contexto de nivel superior inicial de la sesión y lo devuelve. `browser.newWindow()` devuelve el nuevo contexto y no cambia a él. `context.frame()` devuelve un frame hijo. `context.parent` es el frame desde el que lo abriste.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` es el string de la URL del documento. Navega un contexto que mantienes con `context.navigate(url)`. Los metadatos de carga de `browser.url()` están en `context.request`.

En una sesión Classic, sigue llamando a `switchFrame` con un elemento, o con `null` para el frame superior. Ahí se rechazan un string o una función.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

Se rechaza la clave `page load` del JSON Wire Protocol. Usa `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` y `script` no cambian.

## Acceso a instancias multi-remote

Un navegador multi-remote ya no almacena cada sesión como una propiedad propia. Lo mismo ocurre con un elemento multi-remote. `getInstance` y `select` son la forma de dirigirse a una sesión.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

Una ampliación de tipos de TypeScript que añade `myChromeBrowser: WebdriverIO.Browser` a `WebdriverIO.MultiRemoteBrowser` ya no corresponde a una propiedad en tiempo de ejecución. Elimina esa ampliación y llama a `getInstance`.

Con el testrunner e `injectGlobals` activado, el nombre de la instancia sigue siendo un global (`myChromeBrowser.url(...)`). Ese global es la sesión individual. No es `browser.myChromeBrowser`.

Los resultados de los comandos mantienen el orden de las capabilities: la primera entrada corresponde a la primera clave del objeto de capabilities.

`browser.$$()` en un navegador multi-remote devuelve un `WebdriverIO.MultiRemoteElementArray`, no un `MultiRemoteElement[]` plano. Sigue siendo un array, así que una lectura por índice como `elements[0]` sigue funcionando.

Sus métodos `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` y `reduce` son asíncronos, como en un `WebdriverIO.ElementArray`, y devuelven una promesa, también después de `await`. Lo mismo ocurre con las listas que devuelven `custom$$()`, `react$$()` y `shadow$$()`. En v9 eran los métodos síncronos de un array plano:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` y, sobre un elemento, `shadow$()`, `nextElement()`, `previousElement()` y `parentElement()` devuelven un único `WebdriverIO.MultiRemoteElement`, como hace `$()`. En v9 devolvían un elemento por instancia en un array plano. Lee el elemento de un navegador con `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` y, sobre un elemento, `shadow$$()` devuelven un único `WebdriverIO.MultiRemoteElementArray`, como hace `$$()`. En v9 devolvían una lista por instancia en un array plano. Cada entrada se dirige a todas las instancias. Una instancia que encuentra menos elementos no tiene elemento en ese índice:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` tiene el tipo `Selector`, como `WebdriverIO.Element['selector']`. En v9 tenía el tipo `string`, pero el valor también podía ser una función o una referencia a una estrategia personalizada. El código TypeScript que lo usa como string, por ejemplo `element.selector.includes('…')`, debe comprobar primero el tipo.

Se eliminaron `WDIO_ENABLE_MULTI_REMOTE_SELECT` y `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY`. `select()` está siempre disponible, y `$$()` siempre devuelve el array de elementos descrito arriba. Elimina ambas variables.

## Respuestas binarias de mocks

`mock.respond()` y `mock.respondOnce()` aceptan payloads `Uint8Array` y `ArrayBuffer`, incluido un `Buffer` con polyfill en pruebas de componentes sin un `Buffer` global.

`mock.getBinaryResponse()` ahora está tipado como `Uint8Array | null`. Sigue devolviendo un `Buffer` en Node.js, pero devuelve un `Uint8Array` en el navegador. Para usar métodos específicos de Buffer en Node.js, convierte primero un resultado no nulo:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Mocks de red multi-remote

`browser.mock()` en un navegador multi-remote devuelve un `WebdriverIO.MultiRemoteMock`, no un array de mocks. `respond`, `restore` y los demás métodos del mock se ejecutan en todas las instancias. Lee las peticiones capturadas del mock de un navegador concreto. Usa el tipo `WebdriverIO.MultiRemoteMock` del namespace global `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` lanza `Multi-remote object has no instance named "<name>"` cuando el nombre no es uno de `instances`. Un mock de `browser.select('myFirefoxBrowser', 'myChromeBrowser')` enumera esas instancias en ese orden, que puede diferir de `browser.instances`. No asumas que `mocks[0]` es un navegador en particular.

## Respuestas de mocks que omiten el backend

`mock.respond(..., { fetchResponse: false })` no llama al backend. En v9, un mock que además filtraba por `statusCode` o `responseHeaders` ignoraba ese filtro y respondía igualmente a todas las peticiones coincidentes. En v10, `respond()` y `respondOnce()` lanzan un error, porque esos filtros solo pueden decidirse a partir de la respuesta del backend.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Para mantener el filtro, omite `fetchResponse` para que el mock obtenga la respuesta, compruebe el estado o las cabeceras y después reemplace el cuerpo.

## Referencias a elementos

Los ids de elementos usan la clave W3C WebDriver `element-6066-11e4-a52e-4f735466cecf` y la propiedad `elementId`. El campo `ELEMENT` del JSON Wire Protocol ya no forma parte del contrato de elementos.

`WebdriverIO.Element` ya no declara `ELEMENT`. Lee `element.elementId`, que las instancias de elementos ya exponen.

`browser.execute`, y los scripts integrados que envían un elemento a la página (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView` y el resto), pasan solo la referencia W3C:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

Un cuerpo de find-element que solo contiene `{ ELEMENT: '...' }` no es un elemento. Incluye la clave W3C. Si ambas claves están presentes, WebdriverIO usa el id W3C.

Jasmine imprime el resultado de un `$()` encadenado mediante `toJSON`. Ese valor es la misma referencia W3C, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

Con WebDriver BiDi, un script que devuelve un `NodeList` (por ejemplo de `querySelectorAll`) o un `HTMLCollection` (por ejemplo `element.children`) ahora da una lista de referencias a elementos, como hace WebDriver Classic. En v9 daba valores BiDi en bruto, por lo que `browser.execute` devolvía objetos que no son elementos, y una estrategia `custom$` o `custom$$` que devolvía `querySelectorAll(...)` no encontraba ningún elemento. Una solución alternativa como `Array.from(document.querySelectorAll(...))` sigue funcionando, y puedes eliminarla:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## Selectores de React

`react$` y `react$$` ahora funcionan con React 16 a 19, para una app que se inicia con `createRoot` o con `ReactDOM.render`. Antes, `browser.react$` y `browser.react$$` fallaban con React 18 y posteriores (`Could not find the root element of your application`), y en todas las versiones un resultado podía provenir del render anterior a la última actualización, por lo que no se encontraba un componente añadido por un cambio de estado.

En una página donde React aún no ha renderizado una raíz, los comandos ahora esperan hasta 5 segundos antes de fallar. Antes fallaban de inmediato, por lo que no se encontraba una app que arrancaba tarde.

Los comandos ya no usan la librería [resq](https://github.com/baruchvlz/resq), y WebdriverIO ya no la instala. Las reglas de los selectores no cambian (consulta [Selectores de React](/docs/selectors#react-selectors)), con estas excepciones:

- `react$` con `props` y `state` a la vez encuentra un componente que coincide con ambos. Antes ignoraba `props` cuando también se daba `state`.
- `react$$` da cada nodo DOM una sola vez. Antes, un componente de orden superior y su hijo daban el mismo elemento dos veces en algunos navegadores.
- Un fragmento que contiene un fragmento da una única lista plana de nodos. Antes, `react$` podía devolver una lista.
- Un filtro con un valor `null` funciona. Antes fallaba con `Cannot convert undefined or null to object`.
- Sin un ámbito de elemento, los comandos buscan en todas las raíces de React de la página, en el orden del documento, también en raíces dentro de otras raíces y en raíces dentro de shadow roots abiertos. `react$` da la primera coincidencia. Antes solo buscaban en la primera raíz, aunque React aún no la hubiera renderizado o la hubiera desmontado, y no buscaban en shadow roots. En una página con más de una raíz, `react$$` ahora puede dar más elementos: para buscar en una sola raíz, llama al comando sobre su contenedor, por ejemplo `$('#root').react$$('MyComponent')`.
- Sobre el contenedor de una raíz dentro de otra raíz, los comandos buscan en la raíz interna. Antes buscaban en la raíz externa.
- Sobre el browsing context de un frame, y sobre un elemento de un frame, los comandos funcionan. Antes, el comando de contexto fallaba con `this.executeScript is not a function`, y el comando de elemento fallaba con `Could not find instance of React in given element`.

Se eliminó el script interno `webdriverio/scripts/resq`.

## Pruebas de componentes

`@wdio/browser-runner` reexporta `fn`, `spyOn` y los tipos de mocks de `@vitest/spy` 5 (antes 3). Un mock que tu código llama con `new` necesita una implementación `function` o `class`. Una arrow function lanza `is not a constructor`, y `mockReturnValue` lanza un error cuando el mock se llama con `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

Para otros cambios en los spies, consulta la [guía de migración de Vitest](https://vitest.dev/guide/migration).

## Puppeteer

`webdriverio` acepta `puppeteer-core` `>=24 <26`, incluido Puppeteer 25. `getPuppeteer()` y `@wdio/lighthouse-service` se prueban con esa línea.

## ESLint

`eslint-plugin-wdio` requiere ESLint 10. ESLint 9 llegó al [final de su vida útil](https://eslint.org/version-support/) el 2026-08-06 y ya no es compatible. Con TypeScript, usa `typescript-eslint` 8.56.0 o posterior.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` exporta solo la flat config `flat/recommended`. Se eliminó el nombre eslintrc `plugin:wdio/recommended`.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

La configuración recomendada cambia a la regla con información de tipos `wdio/no-floating-promise`, en lugar de `wdio/await-expect`, cuando el paquete `typescript-eslint` está instalado. Instalar solo `@typescript-eslint/eslint-plugin` no es suficiente.

```sh
npm install --save-dev typescript typescript-eslint
```

En ese modo, la configuración analiza cada archivo que coincide con el project service de TypeScript. Limítala a archivos TypeScript y asegúrate de que forman parte de un `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

Un archivo JavaScript coincidente que no está en el proyecto de TypeScript, como `wdio.conf.js`, falla con "was not found by the project service". Para analizar también archivos JavaScript, establece `"allowJs": true`, añádelos a `include` en `tsconfig.json` y amplía el patrón a `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Frameworks personalizados

`setupExpect` en un adaptador de framework personalizado ya no acepta un `Map` de matchers, y el runner ya no añade un método `entries` al objeto de matchers. Itera con `Object.entries(wdioMatchers)`.

## Perfil de Firefox

`@wdio/firefox-profile-service` ya no trata `legacy` como una opción del servicio. Ese flag solo se aplicaba a Firefox 55 y anteriores. Elimínalo. Un `legacy: true` que haya quedado se escribe en el perfil como una preferencia llamada `legacy`.

## Protocolo WebDriver

Toda sesión es una sesión [W3C WebDriver](https://w3c.github.io/webdriver/). WebdriverIO no habla el JSON Wire Protocol ni el Mobile JSON Wire Protocol. v9 eliminó esos comandos. v10 elimina además el sobre de respuesta que usaban esos protocolos, por lo que un servidor que aún lo devuelva no puede iniciar una sesión.

Se eliminó `browser.isW3C`, incluido el valor que antes se reenviaba en el mensaje `sessionStarted` del worker. Pasar `isW3C` a `attach` se ignora. El conjunto de comandos BiDi permanece en el cliente. Una conexión BiDi activa sigue dependiendo de `webSocketUrl`.

### `browser.back()` y `browser.forward()` en BiDi

Las llamadas siguen siendo `await browser.back()` y `await browser.forward()`. Ninguno de los dos comandos recibe argumentos ni devuelve un valor.

En una sesión BiDi, estos comandos llaman a `browsingContext.traverseHistory` con `delta` `-1` o `1` sobre el browsing context de nivel superior, y después esperan al estado de preparación del documento al que corresponde `pageLoadStrategy`. `none` retorna cuando se acepta el comando de recorrido. `eager` espera a `browsingContext.domContentLoaded`. `normal`, el valor por defecto, espera a `browsingContext.load`. Una restauración desde la back-forward cache no emite esos eventos; el comando retorna cuando el `readyState` del documento confirmado ya coincide con la estrategia. La espera usa el timeout de carga de página de la sesión (`timeouts.pageLoad`, 300000 ms si no está definido). Las sesiones Classic siguen haciendo POST a `POST /session/:sessionId/back` y `POST /session/:sessionId/forward`.

Una entrada de historial inexistente sigue rechazándose. En BiDi, el mensaje proviene de `browsingContext.traverseHistory` y contiene `no such history entry`, en lugar del texto de error de WebDriver clásico. Un recorrido que nunca alcanza el estado de preparación esperado se rechaza con `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` o `browsingContext.load`.

### Respuesta de nueva sesión

Create Session debe devolver el cuerpo W3C. WebdriverIO lee `value.sessionId` y `value.capabilities`:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

Se rechaza un cuerpo del JSON Wire Protocol. Ese cuerpo pone `sessionId` y `status` junto a `value`, y pone las capabilities en el propio `value`:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

La creación de la sesión lanza entonces `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` Se produce el mismo error cuando falta `value.capabilities`, aunque `value.sessionId` esté presente.

Un objeto de capabilities plano en tu configuración sigue siendo válido. WebdriverIO envuelve `{ browserName: 'chrome' }` en `alwaysMatch` antes de enviar la petición. Las claves con prefijo de proveedor mezcladas con claves fuera del conjunto de capabilities W3C siguen rechazándose. Pon la configuración del proveedor en `sauce:options`, `bstack:options`, `appium:options` u otra clave con prefijo.

### Respuestas de comandos

El resultado de un comando es `{ "value": … }`. HTTP 200 sin `error` en `value` es un éxito. Un elemento inexistente es HTTP 404 con `value.error` establecido en `"no such element"`, lo que sigue permitiendo una búsqueda diferida del elemento. Un `status` numérico en el cuerpo se ignora, incluidos `status: 0` y el antiguo código `status: 7` ("no such element"). Envía en su lugar el objeto de error W3C.

El tipo de error exportado `JSONWPCommandError` es ahora `SessionRequestError`.

### Servidores

Los drivers con los que trabaja WebdriverIO ya hablan W3C en la conexión del cliente:

- ChromeDriver usa W3C por defecto desde Chrome 75. Edge basado en Chromium hace lo mismo. El ChromeDriver actual sigue aceptando `goog:chromeOptions.w3c: false`, que devuelve esa sesión concreta al protocolo heredado. WebdriverIO no admite ese cambio.
- geckodriver y el safaridriver de Apple son solo W3C. Una respuesta de Safari que omite `platformName` o `browserVersion` sigue siendo W3C.
- Selenium 4 y Grid 4 hablan W3C. Grid dejó de traducir el JSON Wire Protocol en la 4.9.
- Appium 2 abandonó el JSON Wire Protocol y el Mobile JSON Wire Protocol. Appium 3 también abandonó las formas de parámetros restantes. v10 requiere Appium 3, como se explica más abajo. Una sesión móvil que omite `setWindowRect` sigue siendo W3C; esa capability significa que el dispositivo no puede redimensionar una ventana.

Estos servidores aún hablan el JSON Wire Protocol y no son compatibles: Selenium 3, PhantomJS, EdgeHTML (`--jwp`) y WinAppDriver conectado directamente. El driver de Windows de Appium sigue siendo compatible como cliente W3C. Traduce los comandos a WinAppDriver, incluido Get Element Property al endpoint de atributos. Apunta WebdriverIO a Appium, no al puerto de WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) no hace que esos servidores funcionen con v10. El inicio de sesión sigue requiriendo el cuerpo W3C anterior, y los resultados de comandos siguen ignorando un `status` numérico. Quédate en WebdriverIO 9 si ese servidor sigue siendo necesario.

`webdriver.remote.sessionid` ya no identifica una sesión de Selenium standalone. Selenium Grid 4 se sigue detectando a partir de `se:cdp`.

La clave de timeout `page load` se trata en [`setTimeout`](#settimeout). Los ids de elementos se tratan en [Referencias a elementos](#element-references). En escritorio, `[name="..."]` es un selector CSS. La estrategia de localización `name` se mantiene para sesiones móviles.

## Appium

WebdriverIO 10 requiere **Appium 3** y los drivers oficiales actuales (UiAutomator2, XCUITest, Espresso, Windows, Mac2, etc.). Appium 1.x y 2.x no son compatibles. Quédate en WebdriverIO 9 si no puedes actualizar el servidor.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` declara un peer opcional `appium` de `>=3` y se niega a iniciar un servidor más antiguo. `create-wdio` instala `appium@^3` cuando Appium no está instalado o es anterior a la 3.

Los proveedores en la nube que aún exponen Appium 2 necesitan una imagen de Appium 3, o tendrás que quedarte en WebdriverIO 9.

### Los comandos móviles ya no recurren a HTTP

En v9, muchos helpers móviles probaban `browser.execute('mobile: …')` y, ante un error de método desconocido, recurrían a un endpoint HTTP de Appium eliminado. En v10 ese recurso ya no existe: el mismo error te indica que actualices a Appium 3. Prefiere los comandos móviles de WebdriverIO (`browser.lock()`, `browser.shake()`, …) o `browser.execute('mobile: …')` directamente.

### Comandos de protocolo eliminados

Appium 3 [eliminó muchos endpoints obsoletos del driver base](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO ya no expone métodos de cliente para la mayoría de esas rutas (por ejemplo `appiumLock`, `touchPerform` y el mapa del Mobile JSON Wire Protocol). Usa en su lugar W3C Actions, el comando móvil correspondiente o un método execute `mobile:` del driver.

### Ámbito de `--allow-insecure` en Appium

Appium 3 requiere un prefijo de ámbito de driver o `*` en las funcionalidades de `--allow-insecure`, por ejemplo `uiautomator2:adb_shell` o `*:adb_shell`.

### Las capabilities de Appium sin prefijo ya no seleccionan una sesión de Appium

`automationName`, `deviceName` y `appiumVersion` sin el prefijo `appium:` ya no indican a WebdriverIO que omita el driver del navegador y adjunte el servicio de Appium. Usa la capability con prefijo, o anídala bajo `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` ahora emite esas claves con prefijo, incluidas `appium:app`, `appium:platformVersion` y `appium:udid`.

### `getValue` en móvil lee la propiedad del elemento

`element.getValue()` llama a Get Element Property en todas las sesiones, incluido Appium 3. En una sesión móvil antes llamaba a Get Element Attribute.

### Firma de `stopRecordingScreen` alineada con `startRecordingScreen`

`driver.stopRecordingScreen` ahora solo acepta un único argumento `options`, en lugar de los 4 argumentos anteriores, alineándose con `driver.startRecordingScreen`. Mueve los argumentos individuales a un objeto:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Nomenclatura multi-remote

Las APIs escritas como `multiremote` o `Multiremote` ahora usan camelCase / PascalCase como `multiRemote` / `MultiRemote`. Los nombres antiguos no tienen alias.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` en el navegador y en los resultados de `$` y `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reporters) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` en `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) y `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Busca `multiremote` y `Multiremote` (distinguiendo mayúsculas y minúsculas) y reemplaza cada coincidencia. Los informes de Allure también etiquetan las pruebas multi-remote con `isMultiRemote` en lugar de `isMultiremote`.

## Pantallas virtuales en Linux

`@wdio/xvfb` se reemplaza por `@wdio/display-server`. En lugar de envolver cada worker en `xvfb-run`, el testrunner inicia un único servidor de pantalla para toda la ejecución, antes del hook `onPrepare` de cualquier servicio. Prefiere Weston en modo headless y recurre a Xvfb como alternativa. Consulta [Headless y servidores de pantalla](/docs/headless-and-display-servers) para más detalles.

Las opciones han cambiado de nombre. Los nombres antiguos siguen funcionando en v10, pero muestran una advertencia de obsolescencia y se eliminarán en v11. Si estableces ambos nombres, prevalece el nuevo:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` y `xvfbRetryDelay` no tienen efecto, y también se eliminarán en v11. El arranque ya no se reintenta: si Weston no arranca, el testrunner prueba Xvfb, y si ninguno arranca, la ejecución continúa sin pantalla.

Una configuración que establece una de las cuatro opciones renombradas sin su reemplazo, y no establece `displayServer`, sigue usando Xvfb como hacía v9. A menos que desactive el servidor de pantalla, también muestra `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. Una vez que renombres las opciones, añade `displayServer: 'xvfb'` para mantener Xvfb, u omítelo para preferir Weston. En modo automático, un comando de instalación personalizado se ejecuta primero para Weston, y de nuevo para Xvfb solo si Weston sigue sin estar disponible o no arranca y Xvfb sigue sin estar instalado, así que establece `displayServer` al servidor que instala para evitar el intento con el otro servidor.

La instalación automática ya no admite `yum`, que v9 usaba en hosts sin `dnf`. v10 solo detecta `apt-get`, `dnf`, `zypper`, `pacman`, `apk` y `xbps-install`, así que instala Xvfb tú mismo en un host que solo tenga `yum`.

Un array en `xvfbAutoInstallCommand` se ejecutaba a través de un shell en v9, por lo que elementos como `&&` o `VAR=value` funcionaban. Ahora los arrays se ejecutan sin shell con cualquiera de los dos nombres de opción, así que usa un string para la sintaxis de shell.

Otros cambios que podrías notar:

- Todos los workers comparten una pantalla. En v9, cada worker tenía su propia pantalla. Las páginas de Chrome y Edge ahora pueden no tener el foco, consulta [Foco de ventana](/docs/headless-and-display-servers#window-focus).
- El número de pantalla de Xvfb no es fijo. Léelo de `DISPLAY` en lugar de suponer `:99`.
- Un host con solo `WAYLAND_DISPLAY` establecido ahora cuenta como que tiene pantalla. v9 ejecutaba los workers bajo Xvfb en ese caso, ya que `DISPLAY` no estaba definido. v10 no inicia nada, abre las ventanas del navegador en tu compositor y establece `XDG_SESSION_TYPE`, `GDK_BACKEND` y `ELECTRON_OZONE_PLATFORM_HINT` en `wayland` para la ejecución. Para ejecutarlos bajo Xvfb como antes, elimina `WAYLAND_DISPLAY` y establece `displayServer: 'xvfb'`.
- La pantalla por defecto es de 1920x1080. v9 usaba el valor por defecto de `xvfb-run`, que es 1280x1024 en Debian y Ubuntu y 640x480 en Fedora, RHEL y Arch. Para mantener el tamaño que usan tus referencias visuales, establece `displayServerWidth` y `displayServerHeight` a ese tamaño.
- Los navegadores eligen Wayland o X11 según el `XDG_SESSION_TYPE` que establece el servidor de pantalla. Bajo Weston, WebdriverIO también añade `--ozone-platform=wayland` a los Chrome y Edge que lanza, ya que Chrome y Edge anteriores a la 140 (Chrome for Testing anterior a la 135) ignoran `XDG_SESSION_TYPE`. Weston no proporciona `DISPLAY`, así que si tus pruebas o herramientas necesitan X11, establece `displayServer: 'xvfb'`.
- Si usabas `XvfbManager` o la instancia `xvfb` de `@wdio/xvfb` directamente, usa en su lugar `DisplayServerManager` de `@wdio/display-server`. Donde ejecutabas `xvfb.init()` y envolvías comandos en `xvfb-run`, o lanzabas procesos mediante `ProcessFactory`, inicia una pantalla y pasa su entorno a los procesos que lo necesiten. El ejemplo usa Xvfb a 1280x1024, como hacía v9 en Debian y Ubuntu. En un host donde solo está establecido `WAYLAND_DISPLAY`, elimínalo primero, o `startDaemon()` no inicia nada:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() también devuelve null cuando ya existe una pantalla
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Emulación

`browser.emulate()` utiliza el módulo de emulación de WebDriver BiDi para el browsing context de nivel superior actual. v9 inyectaba un script de precarga que parcheaba `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` y `navigator.onLine`. Esos scripts ya no existen. `browser.emulate('clock', …)` sigue instalando temporizadores falsos en la página actual y en las páginas que se abran después.

Ya no es necesario recargar para los ámbitos BiDi.

```diff
  await browser.emulate('onLine', false)
- // solo cambiaba `navigator.onLine`; el tráfico seguía fluyendo
+ // el browsing context está sin conexión, incluidos fetch, WebSocket y WebTransport
```

- `onLine: false` llama a `emulation.setNetworkConditions` con `{ type: 'offline' }`. `true` y restaurar el ámbito lo eliminan. El ancho de banda y la latencia siguen en `browser.throttleNetwork()`.
- `colorScheme` establece la media feature `prefers-color-scheme`, por lo que CSS `@media (prefers-color-scheme)` sigue a `matchMedia`.
- `userAgent` es la sobrescritura del user agent del navegador, no una propiedad `navigator.userAgent` parcheada.
- `geolocation` usa la pila de geolocalización del navegador. Una página puede seguir necesitando `browser.setPermissions({ name: 'geolocation' }, 'granted')`. `{ error: 'positionUnavailable' }` informa de ese error en lugar de coordenadas.
- `colorScheme` y `media` comparten un único mapa de media features. La llamada posterior reemplaza todo el mapa, y restaurar cualquiera de los dos ámbitos lo elimina.
- `device` establece el user agent, el viewport, el táctil, la maquetación de texto móvil y el viewport meta a partir del descriptor del dispositivo. No cambia `screen` ni `orientation`.

Los nuevos ámbitos son `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` y `forcedColors`. Un navegador que no implementa un comando rechaza la llamada con su propio error (`unknown command` o `unsupported operation`). WebdriverIO no recurre a un script de precarga ni a CDP. Si `device` se rechaza a mitad de camino, se restauran el user agent, el viewport, el táctil, la maquetación de texto y el viewport meta anteriores.

`wdio session emulate` acepta los mismos ámbitos. Ya no te pide recargar para una sobrescritura que se aplica de inmediato. Los presets de `emulate network` y `emulate cpu` no cambian y siguen siendo exclusivos de Chromium. Consulta [Emulación](/docs/emulation).

## Próximos pasos

- Copia la [skill de migración](#migrate-with-a-coding-agent) en el proyecto y pide a un agente que la aplique.
- [WebdriverIO para agentes de programación](/docs/ai-agents) para escribir nuevas pruebas de v10.
- [Headless y servidores de pantalla](/docs/headless-and-display-servers) cuando la suite se ejecute en Linux.