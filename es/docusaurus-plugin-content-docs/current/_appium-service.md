---
id: appium-service
title: Servicio de Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

El manejo del servidor Appium está fuera del alcance del proyecto WebdriverIO actual. Este servicio te ayuda a ejecutar el servidor Appium sin problemas cuando ejecutas pruebas con el [ejecutor de pruebas WDIO](https://webdriver.io/docs/clioptions). Inicia el [Servidor Appium](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) en un proceso hijo.

## Instalación

La forma más sencilla es mantener `@wdio/appium-service` como una devDependency en tu `package.json`, mediante:

```sh
npm install @wdio/appium-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted)

## Configuración

Para usar el servicio, necesitas agregar `appium` a tu matriz de servicios:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // puerto predeterminado de appium
    services: ['appium'],
    // ...
};
```

## Opciones

Las siguientes opciones se pueden agregar al archivo wdio.conf.js. Para definir opciones para el servicio, debes agregar el servicio a la lista `services` de la siguiente manera:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // puerto predeterminado de appium
    services: [
        ['appium', {
            // Opciones del servicio Appium aquí
            // ...
        }]
    ],
    // ...
};
```

### logPath
La ruta donde se deben almacenar todos los registros del servidor Appium.

Tipo: `String`

Ejemplo:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
Para usar tu instalación de Appium, por ejemplo, instalada globalmente, especifica el comando que debe iniciarse.

Tipo: `String`

Ejemplo:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Mapa de argumentos para el servidor Appium, pasados directamente a `appium`.

Consulta [la documentación](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) para posibles argumentos.
Los argumentos se proporcionan en formato camelCase. Por ejemplo, `debugLogSpacing: true` se transforma en `--debug-log-spacing`, o pueden ser proporcionados como se describe en la documentación de Appium.

Tipo: `Object`

Predeterminado: `{}`

Ejemplo:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**Nota:** Se desaconseja y no se admite el uso de alias. En su lugar, utiliza el nombre completo de la propiedad en formato camelCase.

----

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).