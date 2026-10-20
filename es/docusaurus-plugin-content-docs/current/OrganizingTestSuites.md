---
id: organizingsuites
title: Organización de la suite de pruebas
description: "Organiza una suite de pruebas en crecimiento compartiendo archivos de configuración, agrupando specs en suites, ejecutando specs de forma secuencial e incluyendo o excluyendo pruebas."
---

A medida que los proyectos crecen, inevitablemente se añaden cada vez más pruebas de integración. Esto aumenta el tiempo de compilación y reduce la productividad.

Para evitarlo, deberías ejecutar tus pruebas en paralelo. WebdriverIO ya prueba cada spec (o _feature file_ en Cucumber) en paralelo dentro de una única sesión. En general, intenta probar solo una funcionalidad por archivo spec. Intenta no tener demasiadas ni muy pocas pruebas en un mismo archivo. (Sin embargo, no hay una regla de oro aquí).

Una vez que tus pruebas tengan varios archivos spec, deberías empezar a ejecutarlas de forma concurrente. Para ello, ajusta la propiedad `maxInstances` en tu archivo de configuración. WebdriverIO te permite ejecutar tus pruebas con la máxima concurrencia, lo que significa que, sin importar cuántos archivos y pruebas tengas, todos pueden ejecutarse en paralelo. (Esto sigue estando sujeto a ciertos límites, como la CPU de tu ordenador, restricciones de concurrencia, etc.).

> Supongamos que tienes 3 capabilities diferentes (Chrome, Firefox y Safari) y has establecido `maxInstances` en `1`. El test runner de WDIO generará 3 procesos. Por lo tanto, si tienes 10 archivos spec y estableces `maxInstances` en `10`, _todos_ los archivos spec se probarán simultáneamente y se generarán 30 procesos.

Puedes definir la propiedad `maxInstances` de forma global para establecer el atributo para todos los navegadores.

Si ejecutas tu propio grid de WebDriver, es posible que (por ejemplo) tengas más capacidad para un navegador que para otro. En ese caso, puedes _limitar_ `maxInstances` en tu objeto de capability:

```js
// wdio.conf.js
export const config = {
    // ...
    // establecer maxInstance para todos los navegadores
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances puede sobrescribirse por capability. Así, si tienes un grid de WebDriver
        // interno con solo 5 instancias de firefox disponibles, puedes asegurarte de que no se
        // inicien más de 5 instancias a la vez.
        browserName: 'chrome'
    }],
    // ...
}
```

Para ejecutar también las pruebas *dentro* de un mismo archivo spec al mismo tiempo, cada una en su propia ventana del navegador, consulta [Pruebas en paralelo en un archivo spec](./ParallelTests.md).

## Heredar del archivo de configuración principal

Si ejecutas tu suite de pruebas en varios entornos (p. ej., dev e integración), puede ser útil usar varios archivos de configuración para mantener todo manejable.

De forma similar al [concepto de page object](pageobjects), lo primero que necesitarás es un archivo de configuración principal. Este contiene todas las configuraciones que compartes entre entornos.

Después, crea otro archivo de configuración para cada entorno y complementa la configuración principal con las específicas de cada entorno:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// usar el archivo de configuración principal por defecto pero sobrescribir la información específica del entorno
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // más caps definidas aquí
        // ...
    ],

    // ejecutar las pruebas en sauce en lugar de localmente
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// añadir un reporter adicional
config.reporters.push('allure')
```

## Agrupar specs de prueba en suites

Puedes agrupar specs de prueba en suites y ejecutar suites específicas individuales en lugar de todas ellas.

Primero, define tus suites en tu configuración de WDIO:

```js
// wdio.conf.js
export const config = {
    // definir todas las pruebas
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // definir suites específicas
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

Ahora, si solo quieres ejecutar una suite, puedes pasar el nombre de la suite como argumento de la CLI:

```sh
wdio wdio.conf.js --suite login
```

O ejecutar varias suites a la vez:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Agrupar specs de prueba para ejecutarlos secuencialmente

Como se describió anteriormente, ejecutar las pruebas de forma concurrente tiene ventajas. Sin embargo, hay casos en los que sería beneficioso agrupar pruebas para ejecutarlas secuencialmente en una única instancia. Ejemplos de esto se dan principalmente cuando existe un gran coste de preparación, p. ej., transpilar código o aprovisionar instancias en la nube, aunque también hay modelos de uso avanzados que se benefician de esta capacidad.

Para agrupar pruebas y ejecutarlas en una única instancia, defínelas como un array dentro de la definición de specs.

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

También es posible agrupar specs definidos en suites, por lo que ahora también puedes definir suites así:
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

En algunos casos, es posible que quieras ejecutar solo una prueba (o un subconjunto de pruebas) de tus suites.

Con el parámetro `--spec`, puedes especificar qué _suite_ (Mocha, Jasmine) o _feature_ (Cucumber) debe ejecutarse. La ruta se resuelve de forma relativa a tu directorio de trabajo actual.

Por ejemplo, para ejecutar solo tu prueba de login:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

O ejecutar varios specs a la vez:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Si el valor de `--spec` no apunta a un archivo spec concreto, se utiliza en su lugar para filtrar los nombres de archivo spec definidos en tu configuración.

Para ejecutar todos los specs que contengan la palabra "dialog" en el nombre del archivo, podrías usar:

```sh
wdio wdio.conf.js --spec dialog
```

Ten en cuenta que cada archivo de prueba se ejecuta en un único proceso del test runner. Como no escaneamos los archivos de antemano (consulta la siguiente sección para obtener información sobre cómo pasar nombres de archivo mediante pipe a `wdio`), _no puedes_ usar (por ejemplo) `describe.only` al principio de tu archivo spec para indicarle a Mocha que ejecute solo esa suite.

Esta funcionalidad te ayudará a lograr el mismo objetivo.

Cuando se proporciona la opción `--spec`, esta sobrescribirá cualquier patrón definido por `specs` en la configuración o por `wdio:specs` en una capability.

## Excluir pruebas seleccionadas

Cuando sea necesario excluir uno o varios archivos spec concretos de una ejecución, puedes usar el parámetro `--exclude` (Mocha, Jasmine) o feature (Cucumber).

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

Si el valor de `--exclude` no apunta a un archivo spec concreto, se utiliza en su lugar para filtrar los nombres de archivo spec definidos en tu configuración.

Para excluir todos los specs que contengan la palabra "dialog" en el nombre del archivo, podrías usar:

```sh
wdio wdio.conf.js --exclude dialog
```

### Excluir una suite completa

También puedes excluir una suite completa por su nombre. Si el valor de exclusión coincide con el nombre de una suite definida en tu configuración y no parece una ruta de archivo, se omitirá la suite completa:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Esto ejecutará solo la suite `checkout`, omitiendo por completo la suite `login`.

Las exclusiones mixtas (suites y patrones de spec) funcionan como se espera:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

En este ejemplo, si `signup` es el nombre de una suite definida, esa suite será excluida. El patrón `dialog` filtrará cualquier archivo spec que contenga "dialog" en su nombre.

:::note
Si especificas tanto `--suite X` como `--exclude X`, la exclusión tiene prioridad y la suite `X` no se ejecutará.
:::

Cuando se proporciona la opción `--exclude`, esta sobrescribirá cualquier patrón definido por `exclude` en la configuración o por `wdio:exclude` en una capability.

## Ejecutar suites y specs de prueba

Ejecuta una suite completa junto con specs individuales.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Ejecutar varios specs de prueba específicos

A veces es necesario&mdash;en el contexto de la integración continua y en otros&mdash;especificar varios conjuntos de specs a ejecutar. La utilidad de línea de comandos `wdio` de WebdriverIO acepta nombres de archivo pasados mediante pipe (desde `find`, `grep` u otros).

Los nombres de archivo pasados mediante pipe sobrescriben la lista de globs o nombres de archivo especificados en la lista `spec` de la configuración.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Nota:** Esto_ no _sobrescribirá el flag `--spec` para ejecutar un único spec._

## Ejecutar pruebas específicas con MochaOpts

También puedes filtrar qué `suite|describe` y/o `it|test` específicos quieres ejecutar pasando un argumento específico de mocha: `--mochaOpts.grep` a la CLI de wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Nota:** Mocha filtrará las pruebas después de que el test runner de WDIO cree las instancias, por lo que es posible que veas varias instancias generándose pero sin llegar a ejecutarse._

## Excluir pruebas específicas con MochaOpts

También puedes filtrar qué `suite|describe` y/o `it|test` específicos quieres excluir pasando un argumento específico de mocha: `--mochaOpts.invert` a la CLI de wdio. `--mochaOpts.invert` realiza lo contrario de `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Nota:** Mocha filtrará las pruebas después de que el test runner de WDIO cree las instancias, por lo que es posible que veas varias instancias generándose pero sin llegar a ejecutarse._

## Detener las pruebas tras un fallo

Con la opción `bail`, puedes indicarle a WebdriverIO que detenga las pruebas después de que falle cualquier prueba.

Esto es útil con suites de pruebas grandes cuando ya sabes que tu build va a fallar, pero quieres evitar la larga espera de una ejecución completa de pruebas.

La opción `bail` espera un número, que especifica cuántos fallos de prueba pueden producirse antes de que WebDriver detenga toda la ejecución de pruebas. El valor predeterminado es `0`, lo que significa que siempre ejecuta todos los specs de prueba que pueda encontrar.

Consulta la [página de opciones](configuration) para obtener información adicional sobre la configuración de bail.
## Jerarquía de opciones de ejecución

Al declarar qué specs ejecutar, existe una jerarquía que define qué patrón tendrá prioridad. Actualmente, así es como funciona, de mayor a menor prioridad:

> Argumento de CLI `--spec` > capability `wdio:specs` > config `specs`
> Argumento de CLI `--exclude` > config `exclude` > capability `wdio:exclude`

Si solo se proporciona el parámetro de configuración, se utilizará para todas las capabilities. Sin embargo, si se define el patrón a nivel de capability, se utilizará en lugar del patrón de la configuración. Por último, cualquier patrón de spec definido en la línea de comandos sobrescribirá todos los demás patrones proporcionados.

### Uso de patrones de spec definidos en capabilities

Cuando defines un patrón de spec a nivel de capability, este sobrescribirá cualquier patrón definido a nivel de configuración. Esto es útil cuando se necesita separar pruebas en función de capabilities de dispositivo diferenciadas. En casos como este, resulta más útil usar un patrón de spec genérico a nivel de configuración y patrones más específicos a nivel de capability.

Por ejemplo, supongamos que tienes dos directorios, uno para pruebas de Android y otro para pruebas de iOS.

Tu archivo de configuración podría definir el patrón así, para pruebas no específicas de dispositivo:

```js
{
    specs: ['tests/general/**/*.js']
}
```

pero luego tendrás diferentes capabilities para tus dispositivos Android e iOS, donde los patrones podrían verse así:

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

Si necesitas ambas capabilities en tu archivo de configuración, el dispositivo Android solo ejecutará las pruebas bajo el espacio de nombres "android", ¡y el de iOS solo ejecutará las pruebas bajo el espacio de nombres "ios"!

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
            //se usarán los specs a nivel de configuración
        }
    ]
}
```