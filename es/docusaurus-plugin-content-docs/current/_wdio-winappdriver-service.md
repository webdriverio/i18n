---
id: wdio-winappdriver-service
title: Servicio winappdriver
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service es un paquete de terceros, para más información por favor vea [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

Este servicio le ayuda a ejecutar el servidor WinAppDriver sin problemas cuando realiza pruebas con el [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Inicia el [WinAppDriver](https://github.com/Microsoft/WinAppDriver) en un proceso hijo.

## Instalación

```bash
npm install wdio-winappdriver-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted.html)

## Configuración

Para utilizar el servicio, necesita añadir `winappdriver` a su matriz de servicios:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## Opciones

Las siguientes opciones se pueden añadir al archivo wdio.conf.js. Para definir opciones para el servicio, debe añadir el servicio a la lista `services` de la siguiente manera:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            // Opciones del servicio WinAppDriver aquí
            // ...
        }]
    ],
    // ...
};
```

### logPath

Ruta donde se deben almacenar todos los registros del servidor winappdriver.

Tipo: `String`

Ejemplo:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Para usar su propia instalación de WinAppDriver, por ejemplo instalado globalmente, especifique el comando que debe iniciarse.

Tipo: `String`

Ejemplo:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

Lista de argumentos pasados directamente a `WinAppDriver`.

Consulte [la documentación](https://github.com/Microsoft/WinAppDriver) para posibles argumentos.

Tipo: `Array`

Predeterminado: `[]`

Ejemplo:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```