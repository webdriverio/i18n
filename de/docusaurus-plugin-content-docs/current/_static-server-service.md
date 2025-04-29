---
id: static-server-service
title: Static Server Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---


Einige Projekte bestehen nur aus Frontend-Assets und laufen nicht auf mehr als einem statischen Server. Dieser Service hilft Ihnen, einen statischen Dateiserver während des Testens auszuführen.

## Installation

Der einfachste Weg ist, `@wdio/static-server-service` als `devDependency` in Ihrer `package.json` hinzuzufügen, über:

```sh
npm install @wdio/static-server-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Konfiguration

Um den statischen Server-Service zu verwenden, fügen Sie `static-server` zu Ihrem Service-Array hinzu:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## Optionen

### `folders` (erforderlich)

Array von Ordnerpfaden und Mountpunkten.

Typ: `Array<Object>`
Eigenschaften:
 - mount `{String}` - URL-Endpunkt, an dem der Ordner gemountet wird.
 - path `{String}` - Pfad zum zu mountenden Ordner.

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

Port, an den der Server gebunden wird.

Typ: `Number`

Standard: `4567`

### `middleware`

Array von Middleware-Objekten. Laden und instanziieren Sie diese in der Konfiguration und übergeben Sie sie an den statischen Server zur Verwendung.

Typ: `Array<Object>`
Eigenschaften:
 - mount `{String}` - URL-Endpunkt, an dem Middleware gemountet wird.
 - middleware `<Object>` - Middleware-Funktions-Callback.

Standard: `[]`

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

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](http://webdriver.io).