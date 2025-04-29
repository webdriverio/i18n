---
id: static-server-service
title: Servicio de Servidor Estático
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---


Algunos proyectos son solo activos front-end y no funcionan más que en un servidor estático. Este servicio te ayuda a ejecutar un servidor de archivos estáticos durante las pruebas.

## Instalación

La forma más sencilla es añadir `@wdio/static-server-service` como una `devDependency` en tu `package.json`, mediante:

```sh
npm install @wdio/static-server-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted).

## Configuración

Para usar el servicio de servidor estático, añade `static-server` a tu array de servicios:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## Opciones

### `folders` (requerido)

Array de rutas de carpetas y puntos de montaje.

Tipo: `Array<Object>`
Propiedades:
 - mount `{String}` - Punto final de URL donde se montará la carpeta.
 - path `{String}` - Ruta a la carpeta a montar.

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

Puerto donde se enlazará el servidor.

Tipo: `Number`

Valor predeterminado: `4567`

### `middleware`

Array de objetos middleware. Carga e instancia estos en la configuración y pásalos para que el servidor estático los use.

Tipo: `Array<Object>`
Propiedades:
 - mount `{String}` - Punto final de URL donde se montará el middleware.
 - middleware `<Object>` - Función de callback del middleware.

Valor predeterminado: `[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

Para más información sobre WebdriverIO, consulta la [página principal](http://webdriver.io).