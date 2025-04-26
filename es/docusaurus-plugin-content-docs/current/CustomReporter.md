---
id: customreporter
title: Reportero Personalizado
---

Puedes escribir tu propio reportero personalizado para el ejecutor de pruebas WDIO que se adapte a tus necesidades. ¡Y es fácil!

Todo lo que necesitas hacer es crear un módulo de node que herede del paquete `@wdio/reporter`, para que pueda recibir mensajes de la prueba.

La configuración básica debería verse así:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Para usar este reportero, todo lo que necesitas hacer es asignarlo a la propiedad `reporter` en tu configuración.

Tu archivo `wdio.conf.js` debería verse así:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

También puedes publicar el reportero en NPM para que todos puedan usarlo. Nombra el paquete como otros reporteros `wdio-<reportername>-reporter`, y etiquétalo con palabras clave como `wdio` o `wdio-reporter`.

## Manejador de Eventos

Puedes registrar un manejador de eventos para varios eventos que se activan durante las pruebas. Todos los siguientes manejadores recibirán cargas útiles con información útil sobre el estado actual y el progreso.

La estructura de estos objetos de carga útil depende del evento y está unificada en todos los frameworks (Mocha, Jasmine y Cucumber). Una vez que implementes un reportero personalizado, debería funcionar para todos los frameworks.

La siguiente lista contiene todos los métodos posibles que puedes agregar a tu clase de reportero:

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

Los nombres de los métodos son bastante autoexplicativos.

Para imprimir algo en un evento determinado, usa el método `this.write(...)`, que es proporcionado por la clase padre `WDIOReporter`. Transmite el contenido a `stdout` o a un archivo de registro (dependiendo de las opciones del reportero).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Ten en cuenta que no puedes diferir la ejecución de la prueba de ninguna manera.

Todos los manejadores de eventos deben ejecutar rutinas sincrónicas (o tendrás condiciones de carrera).

Asegúrate de revisar la [sección de ejemplos](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) donde puedes encontrar un ejemplo de reportero personalizado que imprime el nombre del evento para cada evento.

Si has implementado un reportero personalizado que podría ser útil para la comunidad, no dudes en hacer un Pull Request para que podamos hacer que el reportero esté disponible para el público.

Además, si ejecutas el ejecutor de pruebas WDIO a través de la interfaz `Launcher`, no puedes aplicar un reportero personalizado como función de la siguiente manera:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## Esperar Hasta `isSynchronised`

Si tu reportero tiene que ejecutar operaciones asíncronas para informar los datos (por ejemplo, carga de archivos de registro u otros activos), puedes sobrescribir el método `isSynchronised` en tu reportero personalizado para que el ejecutor de WebdriverIO espere hasta que hayas calculado todo. Un ejemplo de esto se puede ver en el [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
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
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

De esta manera, el ejecutor esperará hasta que se cargue toda la información del registro.

## Publicar Reportero en NPM

Para hacer que los reporteros sean más fáciles de consumir y descubrir por la comunidad de WebdriverIO, sigue estas recomendaciones:

* Los servicios deben usar esta convención de nomenclatura: `wdio-*-reporter`
* Usa palabras clave de NPM: `wdio-plugin`, `wdio-reporter`
* La entrada `main` debe `export` una instancia del reportero
* Reportero de ejemplo: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Seguir el patrón de nomenclatura recomendado permite que los servicios se agreguen por nombre:

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Agregar Servicio Publicado a WDIO CLI y Docs

¡Realmente apreciamos cada nuevo plugin que pueda ayudar a otras personas a ejecutar mejores pruebas! Si has creado un plugin así, considera agregarlo a nuestro CLI y documentación para que sea más fácil de encontrar.

Por favor, haz un pull request con los siguientes cambios:

- agrega tu servicio a la lista de [reporteros soportados](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) en el módulo CLI
- mejora la [lista de reporteros](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json) para agregar tu documentación a la página oficial de Webdriver.io