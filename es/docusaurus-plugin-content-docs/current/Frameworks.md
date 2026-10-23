---
id: frameworks
title: Frameworks
description: "Configura Mocha, Jasmine o Cucumber.js como framework de pruebas para el testrunner de WDIO, o integra frameworks de terceros como Serenity/JS."
---

WebdriverIO Runner tiene soporte integrado para [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) y [Cucumber.js](https://cucumber.io/). También puedes integrarlo con frameworks de código abierto de terceros, como [Serenity/JS](#using-serenityjs).

:::tip Integrar WebdriverIO con frameworks de pruebas
Para integrar WebdriverIO con un framework de pruebas, necesitas un paquete adaptador disponible en NPM.
Ten en cuenta que el paquete adaptador debe instalarse en la misma ubicación donde está instalado WebdriverIO.
Por lo tanto, si instalaste WebdriverIO globalmente, asegúrate de instalar también el paquete adaptador globalmente.
:::

Integrar WebdriverIO con un framework de pruebas te permite acceder a la instancia de WebDriver mediante la variable global `browser`
en tus archivos de especificaciones o definiciones de pasos.
Ten en cuenta que WebdriverIO también se encargará de instanciar y finalizar la sesión de Selenium, por lo que no tienes que hacerlo
tú mismo.

## Usar Mocha

Primero, instala el paquete adaptador desde NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Por defecto, WebdriverIO proporciona una [biblioteca de aserciones](assertion) integrada que puedes empezar a usar de inmediato:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 incluye [Mocha 12](https://mochajs.org/) y admite las [interfaces](https://mochajs.org/#interfaces) `BDD` (por defecto), `TDD` y `QUnit` de Mocha.

Si prefieres escribir tus especificaciones en estilo TDD, establece la propiedad `ui` de tu configuración `mochaOpts` en `tdd`. Ahora tus archivos de prueba deberían escribirse así:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Si quieres definir otras configuraciones específicas de Mocha, puedes hacerlo con la clave `mochaOpts` en tu archivo de configuración. Puedes encontrar una lista de todas las opciones en el [sitio web del proyecto Mocha](https://mochajs.org/api/mocha).

__Nota:__ WebdriverIO no admite el uso obsoleto de callbacks `done` en Mocha:

```js
it('should test something', (done) => {
    done() // lanza "done is not a function"
})
```

### Opciones de Mocha

Las siguientes opciones se pueden aplicar en tu `wdio.conf.js` para configurar tu entorno de Mocha. __Nota:__ no todas las opciones de Mocha son compatibles. `parallel` sigue perteneciendo al pool de workers propio de Mocha y aquí producirá un error: el testrunner de WDIO ya paraleliza las especificaciones entre capabilities y workers. Para ejecutar las pruebas de un archivo de especificaciones al mismo tiempo, usa [`parallelMode`](#parallelmode). La CLI de Mocha 12 también dejó de usar yargs y pasó a `util.parseArgs` de Node; eso solo afecta a una invocación directa de `mocha`, no a las `mochaOpts` pasadas a través de `wdio`. Puedes pasar estas opciones del framework como argumentos, por ejemplo:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Esto pasará las siguientes opciones de Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Las siguientes opciones de Mocha son compatibles:

#### require

<Option type="string|string[]" default="[]">

La opción `require` es útil cuando quieres añadir o ampliar alguna funcionalidad básica (opción del framework WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

Propagar errores no capturados.

</Option>

#### bail

<Option type="boolean" default="false">

Abortar tras el primer fallo de prueba.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

Comprobar fugas de variables globales.

</Option>

#### delay

<Option type="boolean" default="false">

Retrasar la ejecución de la suite raíz.

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

Informa de cada prueba omitida por un hook `before` o `beforeEach` fallido como un fallo. WebdriverIO activa esto para que un hook de configuración roto sea visible en cada especificación que omitió. Establécelo en `false` para informar solo del hook.

</Option>

#### fgrep

<Option type="string" default="null">

Filtro de pruebas mediante una cadena.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

Las pruebas marcadas con `only` hacen fallar la suite.

</Option>

#### forbidPending

<Option type="boolean" default="false">

Las pruebas pendientes hacen fallar la suite.

</Option>

#### fullTrace

<Option type="boolean" default="false">

Stacktrace completo en caso de fallo.

</Option>

#### global

<Option type="string[]" default="[]">

Variables esperadas en el ámbito global.

</Option>

#### grep

<Option type="RegExp|string" default="null">

Filtro de pruebas mediante una expresión regular. Mocha 12 acepta flags modernos de RegExp en este filtro (por ejemplo `s` o `d`).

</Option>

#### invert

<Option type="boolean" default="false">

Invertir las coincidencias del filtro de pruebas.

</Option>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

Número de pruebas que se ejecutan al mismo tiempo cuando se establece [`parallelMode`](#parallelmode). Consulta [Pruebas paralelas en un archivo de especificaciones](./ParallelTests.md#options).

</Option>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

Ejecuta las pruebas de un archivo de especificaciones al mismo tiempo, cada una en su propio contexto de navegación de WebDriver BiDi. `'contexts'` comparte cookies y almacenamiento entre pruebas, `'userContexts'` los aísla. Requiere la capability `'wdio:experimentalBiDiCommands': true`. `bail` y `retries` no son compatibles en este modo. Consulta [Pruebas paralelas en un archivo de especificaciones](./ParallelTests.md).

</Option>

#### retries

<Option type="number" default="0">

Número de veces que se reintentan las pruebas fallidas.

</Option>

#### timeout

<Option type="number" default="30000">

Valor del umbral de tiempo de espera (en ms).

</Option>

## Usar Jasmine

Primero, instala el paquete adaptador desde NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Luego puedes configurar tu entorno de Jasmine estableciendo una propiedad `jasmineOpts` en tu configuración. Puedes encontrar una lista de todas las opciones en el [sitio web del proyecto Jasmine](https://jasmine.github.io/api/edge/Configuration.html).

### Opciones de Jasmine

Las siguientes opciones se pueden aplicar en tu `wdio.conf.js` para configurar tu entorno de Jasmine usando la propiedad `jasmineOpts`. Para más información sobre estas opciones de configuración, consulta la [documentación de Jasmine](https://jasmine.github.io/api/edge/Configuration). Puedes pasar estas opciones del framework como argumentos, por ejemplo:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Esto pasará las siguientes opciones de Jasmine:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

Las siguientes opciones de Jasmine son compatibles:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Intervalo de tiempo de espera predeterminado para las operaciones de Jasmine.

</Option>

#### helpers

<Option type="string[]" default="[]">

Array de rutas de archivo (y globs) relativas a spec_dir que se incluirán antes de las especificaciones de Jasmine.

</Option>

#### requires

<Option type="string[]" default="[]">

La opción `requires` es útil cuando quieres añadir o ampliar alguna funcionalidad básica.

</Option>

#### random

<Option type="boolean" default="false">

Si se debe aleatorizar el orden de ejecución de las especificaciones. El valor predeterminado propio de Jasmine es `true`, pero WebdriverIO ejecuta las especificaciones en orden a menos que establezcas esta opción.

</Option>

#### seed

<Option type="Function" default="null">

Semilla que se usará como base de la aleatorización. Null hace que la semilla se determine aleatoriamente al inicio de la ejecución.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

Si se debe hacer fallar la especificación si no ejecutó ninguna expectativa. Por defecto, una especificación que no ejecutó ninguna expectativa se informa como aprobada. Establecer esto en true informará dicha especificación como un fallo.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

Detiene una especificación en su primera expectativa fallida. Un matcher síncrono fallido detiene la especificación de inmediato, y un matcher asíncrono con await la detiene cuando su promesa se resuelve. Las demás especificaciones siguen ejecutándose.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

Función que se usa para filtrar especificaciones.

</Option>

#### grep

<Option type="string|Regexp" default="null">

Solo ejecuta las pruebas que coincidan con esta cadena o expresión regular. (Solo aplicable si no se ha establecido una función `specFilter` personalizada)

</Option>

#### invertGrep

<Option type="boolean" default="false">

Si es true, invierte las pruebas coincidentes y solo ejecuta las pruebas que no coinciden con la expresión usada en `grep`. (Solo aplicable si no se ha establecido una función `specFilter` personalizada)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

Detiene el archivo de especificaciones en su primera especificación (`it`) fallida: las demás especificaciones del archivo no se ejecutan, tampoco en otros bloques `describe`. Los demás archivos de especificaciones se ejecutan en sus propios workers y continúan.

</Option>

#### cleanStack

<Option type="boolean" default="true">

Elimina las líneas de los paquetes de `node_modules` de los stack traces de los fallos.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

Se llama con `(passed, assertion)` para cada expectativa, por ejemplo para tomar una captura de pantalla cuando una expectativa falla. Si la función lanza un error para una expectativa aprobada, la expectativa falla con ese error.

</Option>

### Aserciones

Con Jasmine, el `expect` global combina los matchers de Jasmine y los [matchers de WebdriverIO](/docs/api/expect-webdriverio):

- Los matchers de Jasmine (`toBe`, `toEqual`, `toHaveBeenCalled`, …) y los matchers que añades con `jasmine.addMatchers` son síncronos. Devuelven `undefined`, por lo que no necesitas `await`.
- Los matchers de WebdriverIO, los matchers asíncronos de Jasmine (`toBeResolved`, `toBeRejectedWith`, …) y los matchers que añades con `jasmine.addAsyncMatchers` devuelven una promesa. Usa siempre `await` con ellos.

Usa `expect()` para ambos tipos: envía cada matcher al `expect` o `expectAsync` de Jasmine por ti. `await expectAsync($('#logo')).toBeDisplayed()` también funciona. Para TypeScript, `@wdio/jasmine-framework` en `types` también proporciona a `expectAsync()` los matchers de WebdriverIO.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, síncrono
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asíncrono
    await expect(loadData()).toBeResolved()                        // matcher asíncrono de Jasmine
})
```

`toHaveSize` existe en ambas bibliotecas. El matcher de WebdriverIO se ejecuta sobre valores de WebdriverIO: un elemento, un array de elementos o `Element[]` (por ejemplo el resultado de `$$().filter()`), un elemento multi-remote, un browser, un contexto de navegación, un mock, el wrapper `some()` o una promesa como un `$()` encadenable. El matcher de Jasmine se ejecuta sobre cualquier otro valor.

Los matchers asimétricos de ambas bibliotecas funcionan, tanto en los matchers de Jasmine como en los de WebdriverIO: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … y `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …. Para usar `some()`, impórtalo:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

Las partes de Jest de `expect` no están disponibles con Jasmine: matchers exclusivos de Jest como `toStrictEqual` o `toHaveLength`, y `expect.soft()`. Para añadir un matcher personalizado, usa `expect.extend()` en un archivo de especificaciones o en el hook `before` (consulta [Matchers personalizados](/docs/custommatchers)), o `jasmine.addMatchers` para un matcher síncrono y `jasmine.addAsyncMatchers` para un matcher asíncrono.

Para TypeScript, añade `jasmine` a `types`, consulta [Configuración de TypeScript](/docs/typescript).

## Usar Cucumber

Primero, instala el paquete adaptador desde NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Si quieres usar Cucumber, establece la propiedad `framework` en `cucumber` añadiendo `framework: 'cucumber'` al [archivo de configuración](configurationfile).

Las opciones para Cucumber se pueden indicar en el archivo de configuración con `cucumberOpts`. Consulta la lista completa de opciones [aquí](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). El adaptador usa Cucumber 13. `tagExpression` se ha eliminado; filtra con `tags`. Consulta la [guía de migración a v10](v10-migration#cucumber).

Para empezar rápidamente con Cucumber, echa un vistazo a nuestro proyecto [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate), que incluye todas las definiciones de pasos que necesitas para comenzar, y estarás escribiendo archivos feature de inmediato.

### Opciones de Cucumber

Las siguientes opciones se pueden aplicar en tu `wdio.conf.js` para configurar tu entorno de Cucumber usando la propiedad `cucumberOpts`:

:::tip Ajustar opciones a través de la línea de comandos
Las `cucumberOpts`, como `tags` personalizados para filtrar pruebas, se pueden especificar a través de la línea de comandos. Esto se logra usando el formato `cucumberOpts.{optionName}="value"`.

Por ejemplo, si quieres ejecutar solo las pruebas etiquetadas con `@smoke`, puedes usar el siguiente comando:

```sh
# Cuando solo quieres ejecutar las pruebas que tienen la etiqueta "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Este comando establece la opción `tags` de `cucumberOpts` en `@smoke`, garantizando que solo se ejecuten las pruebas con esta etiqueta.

:::

#### backtrace

<Option type="Boolean" default="false">

Mostrar el backtrace completo de los errores.

</Option>

#### requireModule

<Option type="string[]" default="[]">

Requerir módulos antes de requerir cualquier archivo de soporte.

</Option>
Ejemplo:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // o
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast

<Option type="boolean" default="false">

Abortar la ejecución en el primer fallo.

</Option>

#### name

<Option type="RegExp[]" default="[]">

Solo ejecutar los escenarios cuyo nombre coincida con la expresión (repetible).

</Option>

#### require

<Option type="string[]" default="[]">

Requerir los archivos que contienen tus definiciones de pasos antes de ejecutar las features. También puedes especificar un glob para tus definiciones de pasos.

</Option>
Ejemplo:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

Rutas donde se encuentra tu código de soporte, para ESM.

</Option>
Ejemplo:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

Hace fallar la ejecución ante un paso pendiente. Un paso no definido hace fallar la ejecución también sin `strict`, a menos que [`ignoreUndefinedDefinitions`](#ignoreundefineddefinitions) sea `true`.

</Option>

#### tags

<Option type="String" default="">

Solo ejecutar las features o escenarios con etiquetas que coincidan con la expresión. Un archivo feature sin ningún escenario coincidente se informa como omitido y no inicia ninguna sesión de navegador.
Consulta la [documentación de Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) para más detalles.

</Option>

#### timeout

<Option type="Number" default="60000">

Tiempo de espera en milisegundos para las definiciones de pasos.

</Option>

#### retry

<Option type="Number" default="0">

Especifica el número de veces que se reintentan los casos de prueba fallidos.

</Option>

#### retryTagFilter

<Option type="String">

Solo reintentar los escenarios con etiquetas que coincidan con la expresión de etiquetas. Requiere [`retry`](#retry).

</Option>

#### language

<Option type="String" default="en">

Idioma predeterminado para tus archivos feature

</Option>

#### order

<Option type="String" default="defined">

Ejecuta los escenarios en el orden de los archivos feature (`'defined'`) o en un orden aleatorio (`'random'`). Con `'random:<seed>'`, por ejemplo `'random:42'`, el orden aleatorio es el mismo en cada ejecución. Con `'random'`, el log muestra la semilla de la ejecución (`Random order using seed: 42`).

</Option>

#### format

<Option type="string[]">

Nombre y ruta del archivo de salida del formatter que se usará.
WebdriverIO principalmente solo admite los [Formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) que escriben la salida en un archivo. Los formatters no se ejecutan con [`parallelMode`](#parallelmode-1).

</Option>

#### formatOptions

<Option type="object">

Opciones que se proporcionarán a los formatters

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

Añadir las etiquetas de cucumber al nombre de la feature o del escenario

</Option>
***Ten en cuenta que esta es una opción específica de @wdio/cucumber-framework y que cucumber-js no la reconoce por sí mismo***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

Informa de un paso no definido como pendiente, con ` (undefined step)` al final de su título, y no hace fallar la ejecución por ello.

</Option>
***Ten en cuenta que esta es una opción específica de @wdio/cucumber-framework y que cucumber-js no la reconoce por sí mismo***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

Informa de un paso ambiguo (un paso que coincide con más de una definición de paso) como fallido, con la lista de las definiciones de pasos coincidentes. Con `false`, el paso se informa como omitido, con la lista como motivo. En ambos casos, la ejecución falla. Excepción: sin `parallelMode`, la ejecución pasa con `ignoreUndefinedDefinitions: true` y `failAmbiguousDefinitions: false`.

</Option>
***Ten en cuenta que esta es una opción específica de @wdio/cucumber-framework y que cucumber-js no la reconoce por sí mismo***<br/>

#### profiles

<Option type="string[]" default="[]">

Los perfiles del archivo de configuración de Cucumber que se usarán.

</Option>
***Ten en cuenta que solo se admiten valores específicos (worldParameters, name, retryTagFilter) dentro de los perfiles, ya que `cucumberOpts` tiene prioridad. Además, al usar un perfil, asegúrate de que los valores mencionados no estén declarados dentro de `cucumberOpts`.***

#### file

<Option type="string | false" default="undefined">

Ruta del archivo de configuración de Cucumber que se cargará, o `false` para no cargar ninguno. Sin ella, Cucumber busca sus archivos de configuración predeterminados.

</Option>

#### dryRun

<Option type="Boolean" default="false">

No ejecuta ningún paso ni ningún hook: Cucumber solo hace coincidir cada paso con sus definiciones de pasos, por lo que los pasos no definidos y ambiguos siguen informándose. La ejecución no falla.

</Option>

#### worldParameters

<Option type="object" default="{}">

Parámetros para tu World, como `this.parameters`.

</Option>

#### scenarioLevelReporter

<Option type="Boolean" default="false">

Informa de cada escenario como una sola prueba. Sus pasos y hooks no se informan.

</Option>
***Ten en cuenta que esta es una opción específica de @wdio/cucumber-framework y que cucumber-js no la reconoce por sí mismo***<br/>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

Ejecuta los escenarios de un archivo feature al mismo tiempo, cada uno en su propio contexto de navegación de WebDriver BiDi. `'contexts'` comparte cookies y almacenamiento entre escenarios, `'userContexts'` los aísla. Requiere la capability `'wdio:experimentalBiDiCommands': true`. Consulta [Pruebas paralelas en un archivo de especificaciones](./ParallelTests.md).

</Option>
***Ten en cuenta que esta es una opción específica de @wdio/cucumber-framework y que cucumber-js no la reconoce por sí mismo***<br/>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

Número de escenarios que se ejecutan al mismo tiempo cuando se establece [`parallelMode`](#parallelmode-1). Consulta [Pruebas paralelas en un archivo de especificaciones](./ParallelTests.md#options).

</Option>
***Ten en cuenta que esta es una opción específica de @wdio/cucumber-framework y que cucumber-js no la reconoce por sí mismo***<br/>

### Omitir pruebas en cucumber

Ten en cuenta que si quieres omitir una prueba usando las capacidades habituales de filtrado de pruebas de cucumber disponibles en `cucumberOpts`, lo harás para todos los navegadores y dispositivos configurados en las capabilities. Para poder omitir escenarios solo para combinaciones específicas de capabilities sin iniciar una sesión si no es necesario, webdriverio proporciona la siguiente sintaxis de etiqueta específica para cucumber:

`@skip([condition])`

donde condition es una combinación opcional de propiedades de capabilities con sus valores que, cuando **todas** coinciden, hacen que se omita el escenario o la feature etiquetados. Por supuesto, puedes añadir varias etiquetas a escenarios y features para omitir pruebas bajo varias condiciones diferentes.

También puedes usar la anotación '@skip' para omitir pruebas sin cambiar `tags`. En este caso, las pruebas omitidas se mostrarán en el informe de pruebas.

Aquí tienes algunos ejemplos de esta sintaxis:
- `@skip` o `@skip()`: siempre omitirá el elemento etiquetado
- `@skip(browserName="chrome")`: la prueba no se ejecutará en navegadores chrome.
- `@skip(browserName="firefox";platformName="linux")`: omitirá la prueba en ejecuciones de firefox sobre linux.
- `@skip(browserName=["chrome","firefox"])`: los elementos etiquetados se omitirán tanto para los navegadores chrome como firefox.
- `@skip(browserName=/i.*explorer/)`: se omitirán las capabilities con navegadores que coincidan con la expresión regular (como `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importar helpers de definición de pasos

Para usar helpers de definición de pasos como `Given`, `When` o `Then` o hooks, debes importarlos desde `@cucumber/cucumber`, por ejemplo así:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Ahora bien, si ya usas Cucumber para otros tipos de pruebas no relacionadas con WebdriverIO para las que usas una versión específica, necesitas importar estos helpers en tus pruebas e2e desde el paquete de Cucumber de WebdriverIO, por ejemplo:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Esto garantiza que uses los helpers correctos dentro del framework WebdriverIO y te permite usar una versión independiente de Cucumber para otros tipos de pruebas.

### Publicar informes

Cucumber ofrece una funcionalidad para publicar los informes de tus ejecuciones de prueba en `https://reports.cucumber.io/`, que se puede controlar estableciendo el flag `publish` en `cucumberOpts` o configurando la variable de entorno `CUCUMBER_PUBLISH_TOKEN`. Sin embargo, cuando usas `WebdriverIO` para la ejecución de pruebas, este enfoque tiene una limitación: actualiza los informes por separado para cada archivo feature, lo que dificulta ver un informe consolidado.

Para superar esta limitación, hemos introducido un método basado en promesas llamado `publishCucumberReport` dentro de `@wdio/cucumber-framework`. Este método debe llamarse en el hook `onComplete`, que es el lugar óptimo para invocarlo. `publishCucumberReport` requiere como entrada el directorio de informes donde se almacenan los informes de mensajes de cucumber.

Puedes generar informes `cucumber message` configurando la opción `format` en tus `cucumberOpts`. Se recomienda encarecidamente proporcionar un nombre de archivo dinámico dentro de la opción de formato `cucumber message` para evitar sobrescribir informes y garantizar que cada ejecución de prueba se registre con precisión.

Antes de usar esta función, asegúrate de establecer las siguientes variables de entorno:
- CUCUMBER_PUBLISH_REPORT_URL: La URL donde quieres publicar el informe de Cucumber. Si no se proporciona, se usará la URL predeterminada 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: El token de autorización necesario para publicar el informe. Si este token no está establecido, la función terminará sin publicar el informe.

Aquí tienes un ejemplo de las configuraciones necesarias y muestras de código para la implementación:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Otras opciones de configuración
    cucumberOpts: {
        // ... Configuración de opciones de Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Ten en cuenta que `./reports/` es el directorio donde se almacenarán los informes `cucumber message`.

## Usar Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) es un framework de código abierto diseñado para que las pruebas de aceptación y de regresión de sistemas de software complejos sean más rápidas, más colaborativas y más fáciles de escalar.

Para las suites de pruebas de WebdriverIO, Serenity/JS ofrece:
- [Informes mejorados](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Puedes usar Serenity/JS
  como sustituto directo de cualquier framework integrado de WebdriverIO para producir informes detallados de ejecución de pruebas y documentación viva de tu proyecto.
- [APIs del Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Para que tu código de pruebas sea portable y reutilizable entre proyectos y equipos,
  Serenity/JS te ofrece una [capa de abstracción](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) opcional sobre las APIs nativas de WebdriverIO.
- [Bibliotecas de integración](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Para suites de pruebas que siguen el Screenplay Pattern,
  Serenity/JS también proporciona bibliotecas de integración opcionales que te ayudan a escribir [pruebas de API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [gestionar servidores locales](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [realizar aserciones](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), ¡y mucho más!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Instalar Serenity/JS

Para añadir Serenity/JS a un [proyecto WebdriverIO existente](https://webdriver.io/docs/gettingstarted), instala los siguientes módulos de Serenity/JS desde NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Más información sobre los módulos de Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Configurar Serenity/JS

Para habilitar la integración con Serenity/JS, configura WebdriverIO de la siguiente manera:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Indica a WebdriverIO que use el framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configuración de Serenity/JS
    serenity: {
        // Configura Serenity/JS para usar el adaptador adecuado para tu test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registra los servicios de informes de Serenity/JS, también conocidos como el "stage crew"
        crew: [
            // Opcional, imprime los resultados de la ejecución de pruebas en la salida estándar
            '@serenity-js/console-reporter',

            // Opcional, produce informes de Serenity BDD y documentación viva (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Opcional, captura automáticamente capturas de pantalla cuando falla una interacción
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configura tu runner de Cucumber
    cucumberOpts: {
        // consulta las opciones de configuración de Cucumber más abajo
    },

    // ... o el runner de Jasmine
    jasmineOpts: {
        // consulta las opciones de configuración de Jasmine más abajo
    },

    // ... o el runner de Mocha
    mochaOpts: {
        // consulta las opciones de configuración de Mocha más abajo
    },

    runner: 'local',

    // Cualquier otra configuración de WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Indica a WebdriverIO que use el framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configuración de Serenity/JS
    serenity: {
        // Configura Serenity/JS para usar el adaptador adecuado para tu test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registra los servicios de informes de Serenity/JS, también conocidos como el "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configura tu runner de Cucumber
    cucumberOpts: {
        // consulta las opciones de configuración de Cucumber más abajo
    },

    // ... o el runner de Jasmine
    jasmineOpts: {
        // consulta las opciones de configuración de Jasmine más abajo
    },

    // ... o el runner de Mocha
    mochaOpts: {
        // consulta las opciones de configuración de Mocha más abajo
    },

    runner: 'local',

    // Cualquier otra configuración de WebdriverIO
};
```

</TabItem>
</Tabs>

Más información sobre:
- [Opciones de configuración de Cucumber en Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opciones de configuración de Jasmine en Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opciones de configuración de Mocha en Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Archivo de configuración de WebdriverIO](configurationfile)

### Producir informes de Serenity BDD y documentación viva

Los [informes de Serenity BDD y la documentación viva](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) se generan mediante [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
un programa Java descargado y gestionado por el módulo [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Para producir informes de Serenity BDD, tu suite de pruebas debe:
- descargar Serenity BDD CLI, llamando a `serenity-bdd update`, que almacena en caché el `jar` de la CLI localmente
- producir informes intermedios `.json` de Serenity BDD, registrando [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) según las [instrucciones de configuración](#configuring-serenityjs)
- invocar Serenity BDD CLI cuando quieras producir el informe, llamando a `serenity-bdd run`

El patrón utilizado por todas las [plantillas de proyecto de Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) se basa
en usar:
- un script NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) para descargar Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) para ejecutar el proceso de generación de informes incluso si la propia suite de pruebas ha fallado (que es precisamente cuando más necesitas los informes de pruebas...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) como método práctico para eliminar cualquier informe de pruebas que haya quedado de la ejecución anterior

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Para obtener más información sobre `SerenityBDDReporter`, consulta:
- las instrucciones de instalación en la [documentación de `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- los ejemplos de configuración en la [documentación de la API de `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- los [ejemplos de Serenity/JS en GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Usar las APIs del Screenplay Pattern de Serenity/JS

El [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) es un enfoque innovador y centrado en el usuario para escribir pruebas de aceptación automatizadas de alta calidad. Te orienta hacia un uso eficaz de las capas de abstracción,
ayuda a que tus escenarios de prueba reflejen el vocabulario de negocio de tu dominio y fomenta buenos hábitos de pruebas e ingeniería de software en tu equipo.

Por defecto, cuando registras `@serenity-js/webdriverio` como tu `framework` de WebdriverIO,
Serenity/JS configura un [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) predeterminado de [actores](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
donde cada actor puede:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Esto debería ser suficiente para ayudarte a empezar a introducir escenarios de prueba que sigan el Screenplay Pattern, incluso en una suite de pruebas existente, por ejemplo:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Para obtener más información sobre el Screenplay Pattern, consulta:
- [El Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Pruebas web con Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)