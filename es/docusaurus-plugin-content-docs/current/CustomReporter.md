---
id: customreporter
title: Reporter personalizado
description: "Crea un reporter personalizado para el testrunner de WDIO basado en @wdio/reporter, gestiona los eventos del runner y publícalo en NPM."
---

Puedes escribir tu propio reporter personalizado para el test runner de WDIO, adaptado a tus necesidades. ¡Y es fácil!

Todo lo que necesitas hacer es crear un módulo de node que herede del paquete `@wdio/reporter`, para que pueda recibir mensajes de la prueba.

La configuración básica debería verse así:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * hacer que el reporter escriba en el flujo de salida por defecto
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Para usar este reporter, todo lo que necesitas hacer es asignarlo a la propiedad `reporter` en tu configuración.


Tu archivo `wdio.conf.js` debería verse así:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * usar la clase de reporter importada
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * usar la ruta absoluta al reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

También puedes publicar el reporter en NPM para que todos puedan usarlo. Nombra el paquete como otros reporters, `wdio-<reportername>-reporter`, y etiquétalo con palabras clave como `wdio` o `wdio-reporter`.

## Manejador de eventos

Puedes registrar un manejador de eventos para varios eventos que se activan durante las pruebas. Todos los siguientes manejadores recibirán payloads con información útil sobre el estado y el progreso actuales.

La estructura de estos objetos payload depende del evento, y está unificada entre los frameworks (Mocha, Jasmine y Cucumber). Una vez que implementes un reporter personalizado, debería funcionar para todos los frameworks.

La siguiente lista contiene todos los métodos posibles que puedes añadir a tu clase de reporter:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onContextEnd() {} // experimental, ver "Reporters y pruebas en paralelo"
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Los nombres de los métodos se explican por sí mismos.

Para imprimir algo en un evento determinado, usa el método `this.write(...)`, que proporciona la clase padre `WDIOReporter`. Este transmite el contenido a `stdout` o a un archivo de log (dependiendo de las opciones del reporter).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Ten en cuenta que no puedes aplazar la ejecución de las pruebas de ninguna manera.

Todos los manejadores de eventos deben ejecutar rutinas síncronas (o te encontrarás con condiciones de carrera).

Asegúrate de revisar la [sección de ejemplos](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio), donde puedes encontrar un ejemplo de reporter personalizado que imprime el nombre de cada evento.

Si has implementado un reporter personalizado que podría ser útil para la comunidad, ¡no dudes en hacer un Pull Request para que podamos poner el reporter a disposición del público!

Además, si ejecutas el testrunner de WDIO a través de la interfaz `Launcher`, no puedes aplicar un reporter personalizado como función de la siguiente manera:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // esto NO funcionará, porque CustomReporter no es serializable
    reporters: ['dot', CustomReporter]
})
```

## Reporters y pruebas en paralelo

Con [pruebas en paralelo en un archivo spec](./ParallelTests.md), las pruebas de un archivo spec se solapan: el `onTestStart` de una prueba puede llegar antes que el `onTestEnd` de otra, y los comandos de diferentes pruebas se intercalan. `WDIOReporter` se encarga de esto por ti. En modo paralelo, los eventos del framework incluyen dos campos adicionales:

- `parentUid` en `suite:start`, `hook:start` y `test:start`: el uid de la suite propietaria (`null` para una suite de nivel superior). El reporter añade la suite, el hook o la prueba a esa suite, no a la suite que se inició en último lugar.
- `contextId` en los eventos de prueba y de comando: el contexto de navegación de la prueba. El reporter añade la salida de los comandos a la prueba que se ejecutó en ese contexto.

Las estadísticas de pruebas, hooks y suites conservan estos campos cuando el evento los tiene: en `onTestEnd(test)`, `test.contextId` es el contexto de navegación de la prueba y `test.parentUid` el uid de su suite. Sin el modo paralelo, las estadísticas no tienen dichas propiedades.

Por lo tanto, los árboles `suites`, `tests` y `hooks` del reporter son correctos. Si tu reporter mantiene su propio estado, indéxalo por el `uid` de la prueba o de la suite en lugar de rastrear una única prueba actual.

La salida que llega sin un evento, como la salida de consola o un evento personalizado de `process.emit`, no tiene `uid`. Llama a `this.getContextTest()` para obtener la prueba cuyo contexto de navegación la escribió. En modo paralelo devuelve la prueba que se inició en último lugar en ese contexto, también después de su `test:end`, cuando se ejecutan sus hooks `afterEach` y `after`, y `undefined` cuando no se ha iniciado ninguna prueba en ese contexto o después de su `context:end`; sin el modo paralelo devuelve la prueba que se inició en último lugar. Los hooks `before()` de una prueba en paralelo se ejecutan antes de su `test:start`, por lo que ninguna prueba es aún propietaria del contexto; `this.getContextId()` devuelve el id de contexto sin procesar, que permanece igual durante toda la prueba.

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestStart(test) {
        this.write(`start ${test.uid} ${test.title}\n`)
    }
    onTestEnd(test) {
        this.write(`end   ${test.uid} ${test.state}\n`)
    }
}
```

Los hooks `afterEach` y `after` de una prueba en paralelo se ejecutan después de su `test:end`. Para saber cuándo ha terminado un contexto, usa `onContextEnd(payload)`. Se llama después del último hook de la prueba, y el contexto no envía más eventos después. El payload tiene `cid`, `specs`, `uid` (la última prueba del contexto) y `contextId`. Cierra o escribe ahí lo que tu reporter mantenga para ese contexto.

:::warning Experimental

`context:end` y `onContextEnd` son experimentales: por ahora solo el `parallelMode` de Mocha los envía, y el nombre y el payload pueden cambiar.

:::

## Esperar hasta `isSynchronised`

Si tu reporter tiene que ejecutar operaciones asíncronas para reportar los datos (por ejemplo, la subida de archivos de log u otros recursos), puedes sobrescribir el método `isSynchronised` en tu reporter personalizado para que el runner de WebdriverIO espere hasta que hayas procesado todo. Un ejemplo de esto se puede ver en [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * sobrescribir el método isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sincronizar archivos de log
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * eliminar los logs transferidos del contenedor de logs
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

De esta manera, el runner esperará hasta que se haya subido toda la información de los logs.

## Publicar el reporter en NPM

Para que el reporter sea más fácil de usar y descubrir por la comunidad de WebdriverIO, sigue estas recomendaciones:

* Los servicios deben usar esta convención de nombres: `wdio-*-reporter`
* Usa las palabras clave de NPM: `wdio-plugin`, `wdio-reporter`
* La entrada `main` debe hacer `export` de una instancia del reporter
* Reporter de ejemplo: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Seguir el patrón de nombres recomendado permite añadir servicios por su nombre:

```js
// Añadir wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Añadir el servicio publicado a la CLI y la documentación de WDIO

¡Apreciamos mucho cada nuevo plugin que pueda ayudar a otras personas a ejecutar mejores pruebas! Si has creado un plugin de este tipo, considera añadirlo a nuestra CLI y a la documentación para que sea más fácil de encontrar.

Abre un pull request con los siguientes cambios:

- añade tu servicio a la lista de [reporters compatibles](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) en el módulo de la CLI
- amplía la [lista de reporters](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) para añadir tu documentación a la página oficial de Webdriver.io