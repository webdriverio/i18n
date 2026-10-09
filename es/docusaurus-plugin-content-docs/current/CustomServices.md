---
id: customservices
title: Servicios personalizados
description: "Escribe un servicio personalizado de launcher o de worker para el testrunner de WDIO usando los hooks del testrunner, gestiona los errores del servicio y publícalo en NPM."
---

Puedes escribir tu propio servicio personalizado para el test runner de WDIO y adaptarlo a tus necesidades.

Los servicios son complementos creados para encapsular lógica reutilizable que simplifica las pruebas, gestiona tu suite de pruebas e integra resultados. Los servicios tienen acceso a los mismos [hooks](/docs/configurationfile) disponibles en el `wdio.conf.js`.

Se pueden definir dos tipos de servicios: un servicio launcher, que solo tiene acceso a los hooks `onPrepare`, `onWorkerStart`, `onWorkerEnd` y `onComplete`, que se ejecutan una única vez por ejecución de pruebas, y un servicio worker, que tiene acceso a todos los demás hooks y se ejecuta para cada worker. Ten en cuenta que no puedes compartir variables (globales) entre ambos tipos de servicios, ya que los servicios worker se ejecutan en un proceso diferente (worker).

Un servicio launcher se puede definir de la siguiente manera:

```js
export default class CustomLauncherService {
    // Si un hook devuelve una promesa, WebdriverIO esperará hasta que esa promesa se resuelva para continuar.
    async onPrepare(config, capabilities) {
        // TODO: algo antes de que se lancen todos los workers
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: algo después de que se cierren los workers
    }

    // métodos personalizados del servicio ...
}
```

Mientras que un servicio worker debería verse así:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contiene todas las opciones específicas del servicio
     * p. ej., si se define de la siguiente manera:
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
     * el objeto browser se pasa aquí por primera vez
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: algo antes de que se ejecuten todas las pruebas, p. ej.:
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

    // otros hooks o métodos personalizados del servicio ...
}
```

Se recomienda almacenar el objeto browser a través del parámetro pasado en el constructor. Por último, expón ambos tipos de workers de la siguiente manera:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Si utilizas TypeScript y quieres asegurarte de que los parámetros de los métodos de los hooks tengan seguridad de tipos, puedes definir la clase de tu servicio de la siguiente manera:

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

## Servicios worker condicionales

Un servicio puede decidir si su código de worker es necesario para una ejecución de pruebas o para un worker en particular. Hay dos comprobaciones opcionales:

| Comprobación | Dónde se ejecuta | Argumentos | Efecto de devolver `false` |
| --- | --- | --- | --- |
| Exportación nombrada del módulo `shouldLoad` | Proceso launcher, después de importar el módulo del servicio | Configuración, todas las capabilities configuradas | El módulo del servicio no se importa en ningún worker. Su servicio launcher sigue ejecutándose. |
| Método estático del servicio worker `shouldRun` | Proceso worker, antes de construir el servicio | Opciones del servicio, las capabilities de ese worker, configuración | El servicio worker no se construye, por lo que ninguno de sus hooks se ejecuta en ese worker. |

Usa `shouldLoad(config, capabilities)` para módulos de servicio configurados por nombre o ruta. Se trata de una decisión a nivel de paquete: si el mismo servicio aparece más de una vez con diferentes opciones, el resultado se aplica a todas esas entradas. Por ejemplo, un servicio personalizado que requiere credenciales remotas podría exportar:

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Usa `static shouldRun(options, capabilities, config)` para decidir por separado para cada entrada de servicio y cada worker. También funciona con clases de servicio personalizadas pasadas directamente en `services`. Por ejemplo, este servicio puede restringir sus hooks a un navegador configurado:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // Se ejecuta solo en los workers que pasaron shouldRun.
    }
}
```

Con `services: [['custom', { browserName: 'chrome' }]]`, este servicio worker se construye solo para las capabilities de Chrome, siempre que la comprobación `shouldLoad` del paquete también lo permita. El worker debe importar el módulo del servicio para llamar a `shouldRun`; devolver `false` desde este método no impide esa importación ni afecta al servicio launcher.

Ambas comprobaciones pueden devolver un booleano o una promesa de un booleano. WebdriverIO espera cada resultado, y solo `false` desactiva la carga o la construcción. Los servicios sin estas comprobaciones mantienen su comportamiento existente. Los objetos de servicio ya construidos que contienen hooks no se modifican.

Si alguna de las comprobaciones lanza una excepción o es rechazada, la inicialización del servicio falla con un error que identifica el servicio. Esto difiere de los errores lanzados por los hooks del servicio, que se describen a continuación.

## Gestión de errores del servicio

Un Error lanzado durante un hook del servicio se registrará mientras el runner continúa. Si un hook de tu servicio es crítico para la configuración o el cierre del test runner, se puede usar el `SevereServiceError` expuesto por el paquete `webdriverio` para detener el runner.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: algo crítico para la configuración antes de que se lancen todos los workers

        throw new SevereServiceError('Something went wrong.')
    }

    // métodos personalizados del servicio ...
}
```

## Importar el servicio desde un módulo

Lo único que queda por hacer para usar este servicio es asignarlo a la propiedad `services`.

Modifica tu archivo `wdio.conf.js` para que se vea así:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * usar la clase de servicio importada
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * usar la ruta absoluta al servicio
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Publicar el servicio en NPM

Para que los servicios sean más fáciles de usar y descubrir por la comunidad de WebdriverIO, sigue estas recomendaciones:

* Los servicios deben usar esta convención de nombres: `wdio-*-service`
* Usa las palabras clave de NPM: `wdio-plugin`, `wdio-service`
* La entrada `main` debe hacer `export` de una instancia del servicio
* Servicios de ejemplo: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Seguir el patrón de nombres recomendado permite añadir los servicios por su nombre:

```js
// Añadir wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Añadir el servicio publicado a la CLI y la documentación de WDIO

¡Agradecemos mucho cada nuevo plugin que pueda ayudar a otras personas a ejecutar mejores pruebas! Si has creado un plugin de este tipo, considera añadirlo a nuestra CLI y a la documentación para que sea más fácil de encontrar.

Abre un pull request con los siguientes cambios:

- añade tu servicio a la lista de [servicios soportados](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) en el módulo de la CLI
- amplía la [lista de servicios](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json) para añadir tu documentación a la página oficial de Webdriver.io