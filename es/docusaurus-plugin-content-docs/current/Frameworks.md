---
id: frameworks
title: Frameworks
---

WebdriverIO Runner tiene soporte integrado para [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/), y [Cucumber.js](https://cucumber.io/). También puedes integrarlo con frameworks de código abierto de terceros, como [Serenity/JS](#using-serenityjs).

:::tip Integrando WebdriverIO con frameworks de prueba
Para integrar WebdriverIO con un framework de prueba, necesitas un paquete adaptador disponible en NPM.
Ten en cuenta que el paquete adaptador debe instalarse en la misma ubicación donde está instalado WebdriverIO.
Así que, si instalaste WebdriverIO globalmente, asegúrate de instalar el paquete adaptador globalmente también.
:::

Integrar WebdriverIO con un framework de prueba te permite acceder a la instancia de WebDriver usando la variable global `browser`
en tus archivos de especificación o definiciones de pasos.
Ten en cuenta que WebdriverIO también se encargará de instanciar y finalizar la sesión de Selenium, por lo que no tienes que hacerlo
tú mismo.

## Usando Mocha

Primero, instala el paquete adaptador desde NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Por defecto, WebdriverIO proporciona una [biblioteca de aserciones](assertion) integrada con la que puedes comenzar de inmediato:

```js
describe('mi increíble sitio web', () => {
    it('debería hacer algunas aserciones', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO soporta las interfaces `BDD` (por defecto), `TDD` y `QUnit` de Mocha [interfaces](https://mochajs.org/#interfaces).

Si te gusta escribir tus especificaciones en estilo TDD, establece la propiedad `ui` en tu configuración `mochaOpts` a `tdd`. Ahora tus archivos de prueba deberían escribirse así:

```js
suite('mi increíble sitio web', () => {
    test('debería hacer algunas aserciones', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Si quieres definir otras configuraciones específicas de Mocha, puedes hacerlo con la clave `mochaOpts` en tu archivo de configuración. Una lista de todas las opciones se puede encontrar en el [sitio web del proyecto Mocha](https://mochajs.org/api/mocha).

__Nota:__ WebdriverIO no admite el uso obsoleto de callbacks `done` en Mocha:

```js
it('debería probar algo', (done) => {
    done() // lanza "done is not a function"
})
```

### Opciones de Mocha

Las siguientes opciones se pueden aplicar en tu `wdio.conf.js` para configurar tu entorno Mocha. __Nota:__ no todas las opciones son compatibles, por ejemplo, aplicar la opción `parallel` causará un error ya que el ejecutor de pruebas WDIO tiene su propia forma de ejecutar pruebas en paralelo. Puedes pasar estas opciones de framework como argumentos, por ejemplo:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "mi prueba" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Esto pasará las siguientes opciones de Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Se admiten las siguientes opciones de Mocha:

#### require
La opción `require` es útil cuando deseas agregar o extender alguna funcionalidad básica (opción de framework WebdriverIO).

Type: `string|string[]`<br />
Default: `[]`

#### compilers
Usa el/los módulo(s) dado(s) para compilar archivos. Los compiladores se incluirán antes de los requisitos (opción de framework WebdriverIO).

Type: `string[]`<br />
Default: `[]`

#### allowUncaught
Propaga errores no capturados.

Type: `boolean`<br />
Default: `false`

#### bail
Aborta después del primer fallo de prueba.

Type: `boolean`<br />
Default: `false`

#### checkLeaks
Comprueba si hay fugas de variables globales.

Type: `boolean`<br />
Default: `false`

#### delay
Retrasa la ejecución de la suite raíz.

Type: `boolean`<br />
Default: `false`

#### fgrep
Filtro de prueba dada la cadena.

Type: `string`<br />
Default: `null`

#### forbidOnly
Las pruebas marcadas con `only` fallan en la suite.

Type: `boolean`<br />
Default: `false`

#### forbidPending
Las pruebas pendientes fallan en la suite.

Type: `boolean`<br />
Default: `false`

#### fullTrace
Traza completa de la pila en caso de fallo.

Type: `boolean`<br />
Default: `false`

#### global
Variables esperadas en el ámbito global.

Type: `string[]`<br />
Default: `[]`

#### grep
Filtro de prueba dada la expresión regular.

Type: `RegExp|string`<br />
Default: `null`

#### invert
Invierte las coincidencias del filtro de prueba.

Type: `boolean`<br />
Default: `false`

#### retries
Número de veces para reintentar pruebas fallidas.

Type: `number`<br />
Default: `0`

#### timeout
Valor umbral de tiempo de espera (en ms).

Type: `number`<br />
Default: `30000`

## Usando Jasmine

Primero, instala el paquete adaptador desde NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Luego puedes configurar tu entorno Jasmine estableciendo una propiedad `jasmineOpts` en tu configuración. Una lista de todas las opciones se puede encontrar en el [sitio web del proyecto Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Opciones de Jasmine

Las siguientes opciones se pueden aplicar en tu `wdio.conf.js` para configurar tu entorno Jasmine usando la propiedad `jasmineOpts`. Para más información sobre estas opciones de configuración, consulta la [documentación de Jasmine](https://jasmine.github.io/api/edge/Configuration). Puedes pasar estas opciones de framework como argumentos, por ejemplo:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "mi prueba" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Esto pasará las siguientes opciones de Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Se admiten las siguientes opciones de Jasmine:

#### defaultTimeoutInterval
Intervalo de tiempo de espera predeterminado para operaciones de Jasmine.

Type: `number`<br />
Default: `60000`

#### helpers
Array de rutas de archivo (y globs) relativas a spec_dir para incluir antes de las especificaciones de jasmine.

Type: `string[]`<br />
Default: `[]`

#### requires
La opción `requires` es útil cuando deseas agregar o extender alguna funcionalidad básica.

Type: `string[]`<br />
Default: `[]`

#### random
Si se debe aleatorizar el orden de ejecución de las especificaciones.

Type: `boolean`<br />
Default: `true`

#### seed
Semilla para usar como base de aleatorización. Null hace que la semilla se determine aleatoriamente al inicio de la ejecución.

Type: `Function`<br />
Default: `null`

#### failSpecWithNoExpectations
Si se debe fallar la especificación si no ejecutó expectativas. Por defecto, una especificación que no ejecutó expectativas se reporta como aprobada. Establecer esto en true reportará dicha especificación como un fallo.

Type: `boolean`<br />
Default: `false`

#### oneFailurePerSpec
Si se debe hacer que las especificaciones solo tengan un fallo de expectativa.

Type: `boolean`<br />
Default: `false`

#### specFilter
Función a usar para filtrar especificaciones.

Type: `Function`<br />
Default: `(spec) => true`

#### grep
Solo ejecuta pruebas que coincidan con esta cadena o expresión regular. (Solo aplicable si no se establece una función personalizada `specFilter`)

Type: `string|Regexp`<br />
Default: `null`

#### invertGrep
Si es verdadero, invierte las pruebas coincidentes y solo ejecuta pruebas que no coincidan con la expresión utilizada en `grep`. (Solo aplicable si no se establece una función personalizada `specFilter`)

Type: `boolean`<br />
Default: `false`

## Usando Cucumber

Primero, instala el paquete adaptador desde NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Si quieres usar Cucumber, establece la propiedad `framework` a `cucumber` agregando `framework: 'cucumber'` al [archivo de configuración](configurationfile).

Las opciones para Cucumber se pueden dar en el archivo de configuración con `cucumberOpts`. Consulta la lista completa de opciones [aquí](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Para comenzar rápidamente con Cucumber, echa un vistazo a nuestro proyecto [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) que viene con todas las definiciones de pasos que necesitas para comenzar, y estarás escribiendo archivos de características de inmediato.

### Opciones de Cucumber

Las siguientes opciones se pueden aplicar en tu `wdio.conf.js` para configurar tu entorno Cucumber usando la propiedad `cucumberOpts`:

:::tip Ajustando opciones a través de la línea de comandos
Las `cucumberOpts`, como etiquetas personalizadas para filtrar pruebas, se pueden especificar a través de la línea de comandos. Esto se logra utilizando el formato `cucumberOpts.{nombreOpción}="valor"`.

Por ejemplo, si solo quieres ejecutar las pruebas que están etiquetadas con `@smoke`, puedes usar el siguiente comando:

```sh
# Cuando solo quieres ejecutar pruebas que tienen la etiqueta "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="nombre de algún escenario" --cucumberOpts.failFast
```

Este comando establece la opción `tags` en `cucumberOpts` a `@smoke`, asegurando que solo se ejecuten las pruebas con esta etiqueta.

:::

#### backtrace
Muestra el backtrace completo para errores.

Type: `Boolean`<br />
Default: `true`

#### requireModule
Requiere módulos antes de requerir cualquier archivo de soporte.

Type: `string[]`<br />
Default: `[]`<br />
Example:

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
Aborta la ejecución en el primer fallo.

Type: `boolean`<br />
Default: `false`

#### name
Solo ejecuta los escenarios con nombre que coincida con la expresión (repetible).

Type: `RegExp[]`<br />
Default: `[]`

#### require
Requiere archivos que contengan tus definiciones de pasos antes de ejecutar características. También puedes especificar un glob para tus definiciones de pasos.

Type: `string[]`<br />
Default: `[]`
Example:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Rutas a donde está tu código de soporte, para ESM.

Type: `String[]`<br />
Default: `[]`
Example:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Falla si hay pasos indefinidos o pendientes.

Type: `boolean`<br />
Default: `false`

#### tags
Solo ejecuta las características o escenarios con etiquetas que coincidan con la expresión.
Consulta la [documentación de Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) para más detalles.

Type: `String`<br />
Default: ``

#### timeout
Tiempo de espera en milisegundos para definiciones de pasos.

Type: `Number`<br />
Default: `30000`

#### retry
Especifica el número de veces para reintentar casos de prueba fallidos.

Type: `Number`<br />
Default: `0`

#### retryTagFilter
Solo reintenta las características o escenarios con etiquetas que coincidan con la expresión (repetible). Esta opción requiere que se especifique '--retry'.

Type: `RegExp`

#### language
Idioma predeterminado para tus archivos de características

Type: `String`<br />
Default: `en`

#### order
Ejecuta pruebas en orden definido / aleatorio

Type: `String`<br />
Default: `defined`

#### format
Nombre y ruta de archivo de salida del formateador a usar.
WebdriverIO principalmente admite solo los [Formateadores](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) que escriben salida a un archivo.

Type: `string[]`<br />

#### formatOptions
Opciones para proporcionar a los formateadores

Type: `object`<br />

#### tagsInTitle
Agrega etiquetas de cucumber al nombre de la característica o escenario

Type: `Boolean`<br />
Default: `false`

***Ten en cuenta que esta es una opción específica de @wdio/cucumber-framework y no reconocida por cucumber-js***<br/>

#### ignoreUndefinedDefinitions
Trata las definiciones indefinidas como advertencias.

Type: `Boolean`<br />
Default: `false`

***Ten en cuenta que esta es una opción específica de @wdio/cucumber-framework y no reconocida por cucumber-js***<br/>

#### failAmbiguousDefinitions
Trata las definiciones ambiguas como errores.

Type: `Boolean`<br />
Default: `false`

***Ten en cuenta que esta es una opción específica de @wdio/cucumber-framework y no reconocida por cucumber-js***<br/>

#### tagExpression
Solo ejecuta las características o escenarios con etiquetas que coincidan con la expresión.
Consulta la [documentación de Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) para más detalles.

Type: `String`<br />
Default: ``

***Ten en cuenta que