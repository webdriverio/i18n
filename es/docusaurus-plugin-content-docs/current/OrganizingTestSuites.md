---
id: organizingsuites
title: Organización de la Suite de Pruebas
description: "Organiza una suite de pruebas en crecimiento compartiendo archivos de configuración, agrupando specs en suites, ejecutando specs secuencialmente e incluyendo o excluyendo pruebas."
---

A medida que los proyectos crecen, inevitablemente se añaden cada vez más pruebas de integración. Esto aumenta el tiempo de compilación y reduce la productividad.

Para evitarlo, deberías ejecutar tus pruebas en paralelo. WebdriverIO ya prueba cada spec (o _feature file_ en Cucumber) en paralelo dentro de una única sesión. En general, intenta probar solo una funcionalidad por archivo spec. Intenta no tener ni demasiadas ni muy pocas pruebas en un archivo. (Sin embargo, no hay una regla de oro aquí).

Una vez que tus pruebas tengan varios archivos spec, deberías empezar a ejecutarlas de forma concurrente. Para ello, ajusta la propiedad `maxInstances` en tu archivo de configuración. WebdriverIO te permite ejecutar tus pruebas con la máxima concurrencia, lo que significa que, sin importar cuántos archivos y pruebas tengas, todos pueden ejecutarse en paralelo. (Esto sigue sujeto a ciertos límites, como la CPU de tu ordenador, las restricciones de concurrencia, etc.)

> Supongamos que tienes 3 capacidades diferentes (Chrome, Firefox y Safari) y has establecido `maxInstances` en `1`. El test runner de WDIO generará 3 procesos. Por lo tanto, si tienes 10 archivos spec y estableces `maxInstances` en `10`, _todos_ los archivos spec se probarán simultáneamente y se generarán 30 procesos.

Puedes definir la propiedad `maxInstances` de forma global para establecer el atributo para todos los navegadores.

Si ejecutas tu propio grid de WebDriver, puede que (por ejemplo) tengas más capacidad para un navegador que para otro. En ese caso, puedes _limitar_ `maxInstances` en tu objeto de capacidades:

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

Si ejecutas tu suite de pruebas en múltiples entornos (por ejemplo, dev e integración), puede ser útil utilizar varios archivos de configuración para mantener todo manejable.

De forma similar al [concepto de page object](pageobjects), lo primero que necesitarás es un archivo de configuración principal. Este contiene todas las configuraciones que compartes entre entornos.

Luego crea otro archivo de configuración para cada entorno y complementa la configuración principal con las específicas de cada entorno:

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

## Agrupar specs de prueba en suites

Puedes agrupar specs de prueba en suites y ejecutar suites específicas en lugar de todas.

Primero, define tus suites en tu configuración de WDIO:

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

Ahora, si quieres ejecutar solo una suite, puedes pasar el nombre de la suite como argumento de CLI:

```sh
wdio wdio.conf.js --suite login
```

O ejecutar varias suites a la vez:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Agrupar specs de prueba para ejecutarlas secuencialmente

Como se describió anteriormente, ejecutar las pruebas de forma concurrente tiene ventajas. Sin embargo, hay casos en los que sería beneficioso agrupar pruebas para ejecutarlas secuencialmente en una única instancia. Los ejemplos de esto se dan principalmente cuando hay un gran coste de preparación, por ejemplo, transpilar código o aprovisionar instancias en la nube, pero también existen modelos de uso avanzados que se benefician de esta capacidad.

Para agrupar pruebas que se ejecuten en una única instancia, defínelas como un array dentro de la definición de specs.

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
En el ejemplo anterior, las pruebas 'test_login.js', 'test_product_order.js' y 'test_checkout.js' se ejecutarán secuencialmente en una única instancia y cada una de las pruebas "test_b*" se ejecutará de forma concurrente en instancias individuales.

También es posible agrupar specs definidas en suites, por lo que ahora también puedes definir suites de esta manera:
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
y en este caso todas las pruebas de la suite "end2end" se ejecutarían en una única instancia.

Al ejecutar pruebas secuencialmente usando un patrón, los archivos spec se ejecutarán en orden alfabético

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

En algunos casos, puede que quieras ejecutar solo una prueba (o un subconjunto de pruebas) de tus suites.

Con el parámetro `--spec`, puedes especificar qué _suite_ (Mocha, Jasmine) o _feature_ (Cucumber) debe ejecutarse. La ruta se resuelve de forma relativa a tu directorio de trabajo actual.

Por ejemplo, para ejecutar solo tu prueba de login:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

O ejecutar varias specs a la vez:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Si el valor de `--spec` no apunta a un archivo spec concreto, se utiliza en su lugar para filtrar los nombres de archivo de las specs definidas en tu configuración.

Para ejecutar todas las specs que contengan la palabra “dialog” en el nombre del archivo, podrías usar:

```sh
wdio wdio.conf.js --spec dialog
```

Ten en cuenta que cada archivo de prueba se ejecuta en un único proceso del test runner. Como no escaneamos los archivos de antemano (consulta la siguiente sección para obtener información sobre cómo canalizar nombres de archivo a `wdio`), _no puedes_ usar (por ejemplo) `describe.only` al principio de tu archivo spec para indicarle a Mocha que ejecute solo esa suite.

Esta funcionalidad te ayudará a lograr el mismo objetivo.

Cuando se proporciona la opción `--spec`, esta anulará cualquier patrón definido por `specs` en la configuración o por `wdio:specs` en una capacidad.

## Excluir pruebas seleccionadas

Cuando sea necesario excluir determinados archivos spec de una ejecución, puedes usar el parámetro `--exclude` (Mocha, Jasmine) o feature (Cucumber).

Por ejemplo, para excluir tu prueba de login de la ejecución:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

O excluir varios archivos spec:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

O excluir un archivo spec al filtrar usando una suite:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Si el valor de `--exclude` no apunta a un archivo spec concreto, se utiliza en su lugar para filtrar los nombres de archivo de las specs definidas en tu configuración.

Para excluir todas las specs que contengan la palabra “dialog” en el nombre del archivo, podrías usar:

```sh
wdio wdio.conf.js --exclude dialog
```

### Excluir una suite completa

También puedes excluir una suite completa por su nombre. Si el valor de exclusión coincide con el nombre de una suite definida en tu configuración y no parece una ruta de archivo, se omitirá la suite completa:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Esto ejecutará solo la suite `checkout`, omitiendo por completo la suite `login`.

Las exclusiones mixtas (suites y patrones de specs) funcionan como se espera:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

En este ejemplo, si `signup` es el nombre de una suite definida, esa suite será excluida. El patrón `dialog` filtrará cualquier archivo spec que contenga "dialog" en su nombre.

:::note
Si especificas tanto `--suite X` como `--exclude X`, la exclusión tiene prioridad y la suite `X` no se ejecutará.
:::

Cuando se proporciona la opción `--exclude`, esta anulará cualquier patrón definido por `exclude` en la configuración o por `wdio:exclude` en una capacidad.

## Ejecutar suites y specs de prueba

Ejecuta una suite completa junto con specs individuales.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Ejecutar múltiples specs de prueba específicas

A veces es necesario&mdash;en el contexto de la integración continua y en otros&mdash;especificar varios conjuntos de specs para ejecutar. La utilidad de línea de comandos `wdio` de WebdriverIO acepta nombres de archivo canalizados (desde `find`, `grep` u otros).

Los nombres de archivo canalizados anulan la lista de globs o nombres de archivo especificados en la lista `spec` de la configuración.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Nota:** Esto_ no _anulará el flag `--spec` para ejecutar una única spec._

## Ejecutar pruebas específicas con MochaOpts

También puedes filtrar qué `suite|describe` y/o `it|test` específicos quieres ejecutar pasando un argumento específico de mocha: `--mochaOpts.grep` a la CLI de wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Nota:** Mocha filtrará las pruebas después de que el test runner de WDIO cree las instancias, por lo que es posible que veas varias instancias generándose pero sin ejecutarse realmente._

## Excluir pruebas específicas con MochaOpts

También puedes filtrar qué `suite|describe` y/o `it|test` específicos quieres excluir pasando un argumento específico de mocha: `--mochaOpts.invert` a la CLI de wdio. `--mochaOpts.invert` hace lo contrario de `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Nota:** Mocha filtrará las pruebas después de que el test runner de WDIO cree las instancias, por lo que es posible que veas varias instancias generándose pero sin ejecutarse realmente._

## Detener las pruebas tras un fallo

Con la opción `bail`, puedes indicarle a WebdriverIO que detenga las pruebas después de que falle cualquier prueba.

Esto es útil con suites de pruebas grandes cuando ya sabes que tu build va a fallar, pero quieres evitar la larga espera de una ejecución de pruebas completa.

La opción `bail` espera un número, que especifica cuántos fallos de prueba pueden ocurrir antes de que WebDriver detenga toda la ejecución de pruebas. El valor predeterminado es `0`, lo que significa que siempre ejecuta todas las specs de prueba que pueda encontrar.

Consulta la [página de Opciones](configuration) para obtener información adicional sobre la configuración de bail.
## Jerarquía de opciones de ejecución

Al declarar qué specs ejecutar, existe una cierta jerarquía que define qué patrón tendrá prioridad. Actualmente, así es como funciona, de mayor a menor prioridad:

> Argumento de CLI `--spec` > capacidad `wdio:specs` > configuración `specs`
> Argumento de CLI `--exclude` > configuración `exclude` > capacidad `wdio:exclude`

Si solo se proporciona el parámetro de configuración, se utilizará para todas las capacidades. Sin embargo, si se define el patrón a nivel de capacidad, se utilizará en lugar del patrón de configuración. Por último, cualquier patrón de spec definido en la línea de comandos anulará todos los demás patrones proporcionados.

### Uso de patrones de spec definidos en capacidades

Cuando defines un patrón de spec a nivel de capacidad, este anulará cualquier patrón definido a nivel de configuración. Esto es útil cuando se necesita separar pruebas en función de capacidades de dispositivo diferenciadas. En casos como este, es más útil usar un patrón de spec genérico a nivel de configuración y patrones más específicos a nivel de capacidad.

Por ejemplo, supongamos que tienes dos directorios, uno para pruebas de Android y otro para pruebas de iOS.

Tu archivo de configuración puede definir el patrón de la siguiente manera, para pruebas no específicas de dispositivo:

```js
{
    specs: ['tests/general/**/*.js']
}
```

pero luego tendrás diferentes capacidades para tus dispositivos Android e iOS, donde los patrones podrían verse así:

```json
{
  "platformName": "Android",
  "wdio:specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "wdio:specs": [
    "tests/ios/**/*.js"
  ]
}
```

Si necesitas ambas capacidades en tu archivo de configuración, el dispositivo Android solo ejecutará las pruebas bajo el espacio de nombres "android", ¡y el de iOS solo ejecutará las pruebas bajo el espacio de nombres "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            "wdio:specs": ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            "wdio:specs": ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```