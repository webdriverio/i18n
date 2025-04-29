---
id: static-server-service
title: Statisk Servertjänst
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Vissa projekt består endast av frontend-tillgångar och körs inte på mer än en statisk server. Denna tjänst hjälper dig att köra en statisk filserver under testning.

## Installation

Det enklaste sättet är att lägga till `@wdio/static-server-service` som en `devDependency` i din `package.json`, via:

```sh
npm install @wdio/static-server-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här](https://webdriver.io/docs/gettingstarted).

## Konfiguration

För att använda den statiska servertjänsten, lägg till `static-server` i din service-array:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## Alternativ

### `folders` (obligatoriskt)

Array med mappsökvägar och monteringspunkter.

Typ: `Array<Object>`
Props:
 - mount `{String}` - URL-slutpunkt där mappen kommer att monteras.
 - path `{String}` - Sökväg till mappen som ska monteras.

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

Port att binda servern till.

Typ: `Number`

Standard: `4567`

### `middleware`

Array med middleware-objekt. Ladda och instansiera dessa i konfigurationen och skicka dem till den statiska servern för användning.

Typ: `Array<Object>`
Props:
 - mount `{String}` - URL-slutpunkt där middleware kommer att monteras.
 - middleware `<Object>` - Middleware-funktionsåterkallelse.

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

För mer information om WebdriverIO, se [hemsidan](http://webdriver.io).