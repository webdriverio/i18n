---
id: organizingsuites
title: Organizando Suite de Pruebas
---

A medida que los proyectos crecen, inevitablemente se añaden más y más pruebas de integración. Esto aumenta el tiempo de compilación y ralentiza la productividad.

Para evitar esto, deberías ejecutar tus pruebas en paralelo. WebdriverIO ya prueba cada especificación (o _archivo de características_ en Cucumber) en paralelo dentro de una sola sesión. En general, intenta probar solo una característica por archivo de especificación. Trata de no tener demasiadas o muy pocas pruebas en un archivo. (Sin embargo, no hay una regla de oro aquí).

Una vez que tus pruebas tienen varios archivos de especificación, deberías comenzar a ejecutar tus pruebas concurrentemente. Para hacerlo, ajusta la propiedad `maxInstances` en tu archivo de configuración. WebdriverIO te permite ejecutar tus pruebas con máxima concurrencia, lo que significa que no importa cuántos archivos y pruebas tengas, todos pueden ejecutarse en paralelo. (Esto sigue estando sujeto a ciertos límites, como la CPU de tu computadora, restricciones de concurrencia, etc.)

> Supongamos que tienes 3 capacidades diferentes (Chrome, Firefox y Safari) y has establecido `maxInstances` en `1`. El ejecutor de pruebas WDIO generará 3 procesos. Por lo tanto, si tienes 10 archivos de especificación y estableces `maxInstances` en `10`, _todos_ los archivos de especificación se probarán simultáneamente, y se generarán 30 procesos.

Puedes definir la propiedad `maxInstances` globalmente para establecer el atributo para todos los navegadores.

Si ejecutas tu propia red WebDriver, es posible que (por ejemplo) tengas más capacidad para un navegador que para otro. En ese caso, puedes _limitar_ el `maxInstances` en tu objeto de capacidad:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## Heredar del archivo de configuración principal

Si ejecutas tu suite de pruebas en múltiples entornos (por ejemplo, desarrollo e integración), puede ser útil usar múltiples archivos de configuración para mantener las cosas manejables.

Similar al [concepto de objeto de página](pageobjects), lo primero que necesitarás es un archivo de configuración principal. Contiene todas las configuraciones que compartes entre entornos.

Luego crea otro archivo de configuración para cada entorno, y complementa la configuración principal con las específicas del entorno:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## Agrupando especificaciones de prueba en suites

Puedes agrupar especificaciones de prueba en suites y ejecutar suites específicas individuales en lugar de todas ellas.

Primero, define tus suites en tu configuración WDIO:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

Ahora, si quieres ejecutar solo una suite, puedes pasar el nombre de la suite como un argumento CLI:

```sh
wdio wdio.conf.js --suite login
```

O, ejecutar múltiples suites a la vez:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Agrupando especificaciones de prueba para ejecutar secuencialmente

Como se describió anteriormente, hay beneficios en ejecutar las pruebas concurrentemente. Sin embargo, hay casos en los que sería beneficioso agrupar pruebas para ejecutarlas secuencialmente en una sola instancia. Ejemplos de esto son principalmente donde hay un gran costo de configuración, por ejemplo, transpilación de código o aprovisionamiento de instancias en la nube, pero también hay modelos de uso avanzados que se benefician de esta capacidad.

Para agrupar pruebas para ejecutarlas en una sola instancia, defínelas como un array dentro de la definición de specs.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
En el ejemplo anterior, las pruebas 'test_login.js', 'test_product_order.js' y 'test_checkout.js' se ejecutarán secuencialmente en una sola instancia y cada una de las pruebas "test_b*" se ejecutará concurrentemente en instancias individuales.

También es posible agrupar especificaciones definidas en suites, por lo que ahora también puedes definir suites así:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
y en este caso todas las pruebas de la suite "end2end" se ejecutarían en una sola instancia.

Cuando se ejecutan pruebas secuencialmente usando un patrón, ejecutará los archivos de especificación en orden alfabético

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Esto ejecutará los archivos que coincidan con el patrón anterior en el siguiente orden:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Ejecutar pruebas seleccionadas

En algunos casos, es posible que desees ejecutar solo una prueba (o un subconjunto de pruebas) de tus suites.

Con el parámetro `--spec`, puedes especificar qué _suite_ (Mocha, Jasmine) o _característica_ (Cucumber) debe ejecutarse. La ruta se resuelve en relación con tu directorio de trabajo actual.

Por ejemplo, para ejecutar solo tu prueba de inicio de sesión:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

O ejecutar múltiples especificaciones a la vez:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Si el valor de `--spec` no apunta a un archivo de especificación particular, se usa para filtrar los nombres de archivo de especificación definidos en tu configuración.

Para ejecutar todas las especificaciones con la palabra "dialog" en los nombres de archivo de especificación, podrías usar:

```sh
wdio wdio.conf.js --spec dialog
```

Ten en cuenta que cada archivo de prueba se ejecuta en un solo proceso de ejecución de prueba. Como no escaneamos archivos por adelantado (consulta la siguiente sección para obtener información sobre cómo canalizar nombres de archivo a `wdio`), _no puedes_ usar (por ejemplo) `describe.only` en la parte superior de tu archivo de especificación para indicar a Mocha que ejecute solo esa suite.

Esta característica te ayudará a lograr el mismo objetivo.

Cuando se proporciona la opción `--spec`, anulará cualquier patrón definido por el parámetro `specs` a nivel de configuración o capacidad.

## Excluir pruebas seleccionadas

Cuando sea necesario, si necesitas excluir archivos de especificación particulares de una ejecución, puedes usar el parámetro `--exclude` (Mocha, Jasmine) o característica (Cucumber).

Por ejemplo, para excluir tu prueba de inicio de sesión de la ejecución de la prueba:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

O, excluir múltiples archivos de especificación:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

O, excluir un archivo de especificación al filtrar usando una suite:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Si el valor de `--exclude` no apunta a un archivo de especificación particular, se usa para filtrar los nombres de archivo de especificación definidos en tu configuración.

Para excluir todas las especificaciones con la palabra "dialog" en los nombres de archivo de especificación, podrías usar:

```sh
wdio wdio.conf.js --exclude dialog
```

Cuando se proporciona la opción `--exclude`, anulará cualquier patrón definido por el parámetro `exclude` a nivel de configuración o capacidad.

## Ejecutar suites y especificaciones de prueba

Ejecuta una suite completa junto con especificaciones individuales.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Ejecutar múltiples especificaciones de prueba específicas

A veces es necesario, en el contexto de la integración continua y de otro modo, especificar múltiples conjuntos de especificaciones para ejecutar. La utilidad de línea de comandos `wdio` de WebdriverIO acepta nombres de archivo canalizados (de `find`, `grep` u otros).

Los nombres de archivo canalizados anulan la lista de patrones globales o nombres de archivo especificados en la lista `spec` de la configuración.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Nota:** Esto_ no _anulará la bandera `--spec` para ejecutar una sola especificación._

## Ejecutar pruebas específicas con MochaOpts

También puedes filtrar qué `suite|describe` y/o `it|test` específicos quieres ejecutar pasando un argumento específico de mocha: `--mochaOpts.grep` a la CLI de wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Nota:** Mocha filtrará las pruebas después de que el ejecutor de pruebas WDIO cree las instancias, por lo que es posible que veas varias instancias generadas pero no ejecutadas realmente._

## Excluir pruebas específicas con MochaOpts

También puedes filtrar qué `suite|describe` y/o `it|test` específicos quieres excluir pasando un argumento específico de mocha: `--mochaOpts.invert` a la CLI de wdio. `--mochaOpts.invert` realiza lo opuesto a `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Nota:** Mocha filtrará las pruebas después de que el ejecutor de pruebas WDIO cree las instancias, por lo que es posible que veas varias instancias generadas pero no ejecutadas realmente._

## Detener las pruebas después de un fallo

Con la opción `bail`, puedes indicar a WebdriverIO que detenga las pruebas después de que falle cualquier prueba.

Esto es útil con grandes conjuntos de pruebas cuando ya sabes que tu compilación se romperá, pero quieres evitar la larga espera de una ejecución completa de pruebas.

La opción `bail` espera un número, que especifica cuántos fallos de prueba pueden ocurrir antes de que WebDriver detenga toda la ejecución de pruebas. El valor predeterminado es `0`, lo que significa que siempre ejecuta todas las especificaciones de prueba que puede encontrar.

Consulta la [Página de opciones](configuration) para obtener información adicional sobre la configuración de bail.
## Jerarquía de opciones de ejecución

Al declarar qué especificaciones ejecutar, hay una cierta jerarquía que define qué patrón tendrá prioridad. Actualmente, así es como funciona, de mayor prioridad a menor:

> Argumento CLI `--spec` > patrón `specs` de capacidad > patrón `specs` de configuración
> Argumento CLI `--exclude` > patrón `exclude` de configuración > patrón `exclude` de capacidad

Si solo se proporciona el parámetro de configuración, se utilizará para todas las capacidades. Sin embargo, si se define el patrón a nivel de capacidad, se utilizará en lugar del patrón de configuración. Finalmente, cualquier patrón de especificación definido en la línea de comandos anulará todos los demás patrones dados.

### Uso de patrones de especificación definidos por capacidad

Cuando defines un patrón de especificación a nivel de capacidad, anulará cualquier patrón definido a nivel de configuración. Esto es útil cuando se necesita separar pruebas basadas en capacidades de dispositivos diferenciadas. En casos como este, es más útil usar un patrón de especificación genérico a nivel de configuración y patrones más específicos a nivel de capacidad.

Por ejemplo, digamos que tienes dos directorios, uno para pruebas de Android y otro para pruebas de iOS.

Tu archivo de configuración puede definir el patrón de la siguiente manera, para pruebas de dispositivos no específicos:

```js
{
    specs: ['tests/general/**/*.js']
}
```

pero luego, tendrás diferentes capacidades para tus dispositivos Android e iOS, donde los patrones podrían verse así:

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

Si requieres ambas capacidades en tu archivo de configuración, ¡entonces el dispositivo Android solo ejecutará las pruebas