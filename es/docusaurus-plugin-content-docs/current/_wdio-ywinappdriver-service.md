---
id: wdio-ywinappdriver-service
title: Servicio ywinappdriver
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---


> wdio-ywinappdriver-service es un paquete de terceros, para más información por favor vea [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

Este servicio le ayuda a ejecutar el servidor ywinappdriver sin problemas cuando ejecuta pruebas con el [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Inicia el [ywinappdriver](https://github.com/licanhua/YWinAppDriver) en un proceso hijo.

## Instalación

```bash
npm install wdio-ywinappdriver-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted.html)

## Configuración

Para utilizar el servicio necesita añadir `ywinappdriver` a su matriz de servicios:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## Opciones

Las siguientes opciones se pueden añadir al archivo wdio.conf.js. Para definir opciones para el servicio, debe agregar el servicio a la lista `services` de la siguiente manera:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // opciones del servicio ywinappdriver aquí
            // ...
        }]
    ],
    // ...
};
```

### logPath

Ruta donde se deben almacenar todos los registros del servidor ywinappdriver.

Tipo: `String`

Ejemplo:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Para usar su propia instalación de winappdriver, por ejemplo, instalada globalmente, especifique el comando que debe iniciarse.

Tipo: `String`

Ejemplo:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

Lista de argumentos pasados directamente a `ywinappdriver`.

Consulte [la documentación](https://github.com/licanhua/ywinappdriver) para posibles argumentos.

Tipo: `Array`

Predeterminado: `[]`

Ejemplo:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```