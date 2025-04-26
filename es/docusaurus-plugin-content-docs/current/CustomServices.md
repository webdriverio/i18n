---
id: customservices
title: Servicios Personalizados
---

Puedes escribir tu propio servicio personalizado para el ejecutor de pruebas WDIO para adaptarlo a tus necesidades.

Los servicios son complementos creados para lógica reutilizable que simplifica las pruebas, gestiona tu suite de pruebas e integra resultados. Los servicios tienen acceso a todos los mismos [hooks](/docs/configurationfile) disponibles en el `wdio.conf.js`.

Hay dos tipos de servicios que se pueden definir: un servicio lanzador que solo tiene acceso a los hooks `onPrepare`, `onWorkerStart`, `onWorkerEnd` y `onComplete` que solo se ejecutan una vez por ejecución de prueba, y un servicio de trabajador que tiene acceso a todos los demás hooks y se ejecuta para cada trabajador. Ten en cuenta que no puedes compartir variables (globales) entre ambos tipos de servicios, ya que los servicios de trabajador se ejecutan en un proceso (trabajador) diferente.

Un servicio lanzador se puede definir de la siguiente manera:

```js
export default class CustomLauncherService {
    // Si un hook devuelve una promesa, WebdriverIO esperará hasta que esa promesa se resuelva para continuar.
    async onPrepare(config, capabilities) {
        // TODO: algo antes de que se lancen todos los trabajadores
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: algo después de que los trabajadores se apaguen
    }

    // métodos de servicio personalizados ...
}
```

Mientras que un servicio de trabajador debería verse así:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contiene todas las opciones específicas del servicio
     * por ejemplo, si se define de la siguiente manera:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * el parámetro `serviceOptions` será: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * este objeto de navegador se pasa aquí por primera vez
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: algo antes de que se ejecuten todas las pruebas, por ejemplo:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: algo después de que se ejecuten todas las pruebas
    }

    beforeTest(test, context) {
        // TODO: algo antes de cada ejecución de prueba de Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: algo antes de cada ejecución de escenario de Cucumber
    }

    // otros hooks o métodos de servicio personalizados ...
}
```

Se recomienda almacenar el objeto del navegador a través del parámetro pasado en el constructor. Por último, exponer ambos tipos de trabajadores de la siguiente manera:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Si estás usando TypeScript y quieres asegurarte de que los parámetros de los métodos hook sean seguros en cuanto a tipos, puedes definir tu clase de servicio de la siguiente manera:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## Manejo de Errores del Servicio

Un error lanzado durante un hook de servicio se registrará mientras el ejecutor continúa. Si un hook en tu servicio es crítico para la configuración o el desmontaje del ejecutor de pruebas, se puede usar el `SevereServiceError` expuesto desde el paquete `webdriverio` para detener el ejecutor.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: algo crítico para la configuración antes de que se lancen todos los trabajadores

        throw new SevereServiceError('Algo salió mal.')
    }

    // métodos de servicio personalizados ...
}
```

## Importar Servicio desde Módulo

Lo único que hay que hacer ahora para usar este servicio es asignarlo a la propiedad `services`.

Modifica tu archivo `wdio.conf.js` para que se vea así:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * usar clase de servicio importada
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * usar ruta absoluta al servicio
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Publicar Servicio en NPM

Para hacer que los servicios sean más fáciles de consumir y descubrir por la comunidad de WebdriverIO, sigue estas recomendaciones:

* Los servicios deben usar esta convención de nomenclatura: `wdio-*-service`
* Usar palabras clave de NPM: `wdio-plugin`, `wdio-service`
* La entrada `main` debe `exportar` una instancia del servicio
* Servicios de ejemplo: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Seguir el patrón de nomenclatura recomendado permite que los servicios se agreguen por nombre:

```js
// Agregar wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Agregar Servicio Publicado a WDIO CLI y Docs

¡Realmente apreciamos cada nuevo plugin que pueda ayudar a otras personas a ejecutar mejores pruebas! Si has creado un plugin así, considera agregarlo a nuestra CLI y documentación para que sea más fácil de encontrar.

Por favor, crea una solicitud de extracción con los siguientes cambios:

- agrega tu servicio a la lista de [servicios compatibles](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) en el módulo CLI
- mejora la [lista de servicios](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) para agregar tu documentación a la página oficial de Webdriver.io