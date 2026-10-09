---
id: customreporter
title: Reporter personalizado
description: "Crea un reporter personalizado para el testrunner de WDIO sobre @wdio/reporter, gestiona los eventos del runner y publícalo en NPM."
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

También puedes publicar el reporter en NPM para que todos puedan usarlo. Nombra el paquete como los demás reporters, `wdio-<reportername>-reporter`, y etiquétalo con palabras clave como `wdio` o `wdio-reporter`.

## Manejador de eventos

Puedes registrar un manejador de eventos para varios eventos que se disparan durante las pruebas. Todos los siguientes manejadores recibirán payloads con información útil sobre el estado y el progreso actuales.

La estructura de estos objetos payload depende del evento y está unificada entre los frameworks (Mocha, Jasmine y Cucumber). Una vez que implementes un reporter personalizado, debería funcionar con todos los frameworks.

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
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Los nombres de los métodos se explican por sí solos.

Para imprimir algo en un evento determinado, usa el método `this.write(...)`, que proporciona la clase padre `WDIOReporter`. Este envía el contenido a `stdout` o a un archivo de log (según las opciones del reporter).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Ten en cuenta que no puedes retrasar la ejecución de las pruebas de ninguna manera.

Todos los manejadores de eventos deben ejecutar rutinas síncronas (o te encontrarás con condiciones de carrera).

Asegúrate de revisar la [sección de ejemplos](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio), donde puedes encontrar un ejemplo de reporter personalizado que imprime el nombre de cada evento.

Si has implementado un reporter personalizado que podría ser útil para la comunidad, ¡no dudes en hacer un Pull Request para que podamos poner el reporter a disposición del público!

Además, si ejecutas el testrunner de WDIO mediante la interfaz `Launcher`, no puedes aplicar un reporter personalizado como función de la siguiente manera:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // esto NO funcionará, porque CustomReporter no es serializable
    reporters: ['dot', CustomReporter]
})
```

## Esperar hasta `isSynchronised`

Si tu reporter tiene que ejecutar operaciones asíncronas para reportar los datos (p. ej., subir archivos de log u otros recursos), puedes sobrescribir el método `isSynchronised` en tu reporter personalizado para que el runner de WebdriverIO espere hasta que hayas procesado todo. Un ejemplo de esto se puede ver en [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

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

De esta forma, el runner esperará hasta que toda la información de log se haya subido.

## Publicar el reporter en NPM

Para que el reporter sea más fácil de usar y descubrir por la comunidad de WebdriverIO, sigue estas recomendaciones:

* Los servicios deben usar esta convención de nombres: `wdio-*-reporter`
* Usa las palabras clave de NPM: `wdio-plugin`, `wdio-reporter`
* La entrada `main` debe hacer `export` de una instancia del reporter
* Reporter de ejemplo: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Seguir el patrón de nombres recomendado permite añadir servicios por nombre:

```js
// Añadir wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Añadir el servicio publicado a la CLI y la documentación de WDIO

¡Apreciamos mucho cada nuevo plugin que pueda ayudar a otras personas a ejecutar mejores pruebas! Si has creado un plugin así, considera añadirlo a nuestra CLI y a la documentación para que sea más fácil de encontrar.

Abre un pull request con los siguientes cambios:

- añade tu servicio a la lista de [reporters compatibles](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) en el módulo de la CLI
- amplía la [lista de reporters](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) para añadir tu documentación a la página oficial de Webdriver.io