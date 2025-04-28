---
id: wdio-rerun-service
title: Servicio de Re-ejecución
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service es un paquete de terceros, para más información consulta [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Este servicio rastrea pruebas fallidas de Mocha o Jasmine y escenarios de Cucumber ejecutados dentro del marco de pruebas [WebdriverIO](https://webdriver.io). Permitirá volver a ejecutar pruebas o escenarios fallidos o inestables.

_NOTA_: Los usuarios del Framework Cucumber que ejecutan versiones de WebdriverIO `5.x` y `6.x` deben usar la versión `1.6.x`. Si estás en la última versión principal de `7.x`, usa la última versión `1.7.x` de este servicio.

## Re-ejecutar vs. Reintentar

La lógica de `retry` (reintento) incorporada en WebdriverIO para Cucumber y Mocha/Jasmine es útil para manejar pasos inestables en Cucumber y Mocha/Jasmine. El reintento en cada framework tiene advertencias:
* Cucumber: No tiene en cuenta que algunos pasos pueden no ser capaces de reintentarse en medio de una prueba. Ejecutar un paso dos veces puede romper el resto del Escenario o puede no ser posible en el contexto de la prueba.
* Mocha/Jasmine: La lógica de `retry` puede aplicarse a una prueba individual, sin embargo, esto todavía se hace en tiempo real y tal vez no tenga en cuenta problemas temporales o problemas de conectividad de red.

Las principales distinciones de la `re-ejecución`:
* Volverá a ejecutar un Escenario completo de Cucumber individualmente y no solo un solo paso
* Permite que todo un archivo de especificaciones se vuelva a ejecutar después de que se complete una ejecución de prueba principal
* Puede copiarse y ejecutarse localmente (`retry` no puede)
* Todavía puede usarse junto con métodos de `retry`
* No requiere ningún cambio de código para aplicar la lógica de `retry` a pruebas inestables o problemáticas

Se recomienda tomarse un tiempo para evaluar las opciones disponibles. Una solución híbrida puede ser la mejor solución para proporcionar los mejores resultados de prueba reales y procesables.

## Instalación

La forma más fácil es agregar `wdio-rerun-service` a `devDependencies` en tu `package.json`.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

Se puede instalar usando `npm`:

```bash
npm install wdio-rerun-service
```

Después de completar la instalación del paquete, agrégalo al array de `services` en `wdio.conf.js`:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted.html)

## Configuración

Las siguientes opciones se pueden agregar al archivo wdio.conf.js. Para definir opciones para el servicio, debes agregar el servicio a la lista `services` de la siguiente manera:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Opciones del servicio Re-run aquí...
        }]
    ],
    // ...
};
```

### rerunDataDir
Directorio donde se guardarán todos los datos JSON de re-ejecución durante la ejecución.

Tipo: `String`

Predeterminado: `./results/rerun`

Ejemplo:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
Ruta para escribir el script Bash de re-ejecución.

Tipo: `String`

Predeterminado: `./rerun.sh`

Ejemplo:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Solo para Cucumber) Conjunto de etiquetas de Cucumber para excluir. Si el escenario contiene una etiqueta, el servicio de re-ejecución omitirá el análisis.

Tipo: `Array`

Predeterminado: `[]`

Ejemplo:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
Prefijo que se agregará al comando de re-ejecución que se genera.

Tipo: `String`

Predeterminado: `''`

Ejemplo:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----