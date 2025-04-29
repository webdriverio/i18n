---
id: static-server-service
title: Servizio di Server Statico
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Alcuni progetti sono costituiti solo da asset front-end e non richiedono più di un server statico. Questo servizio ti aiuta a eseguire un server di file statici durante i test.

## Installazione

Il modo più semplice è aggiungere `@wdio/static-server-service` come `devDependency` nel tuo `package.json`, tramite:

```sh
npm install @wdio/static-server-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Configurazione

Per utilizzare il servizio del server statico, aggiungi `static-server` al tuo array di servizi:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## Opzioni

### `folders` (obbligatorio)

Array di percorsi di cartelle e punti di montaggio.

Tipo: `Array<Object>`
Proprietà:
 - mount `{String}` - Endpoint URL dove verrà montata la cartella.
 - path `{String}` - Percorso della cartella da montare.

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

Porta su cui collegare il server.

Tipo: `Number`

Predefinito: `4567`

### `middleware`

Array di oggetti middleware. Carica e istanzia questi nella configurazione, e passali affinché il server statico li utilizzi.

Tipo: `Array<Object>`
Proprietà:
 - mount `{String}` - Endpoint URL dove verrà montato il middleware.
 - middleware `<Object>` - Funzione di callback del middleware.

Predefinito: `[]`

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

Per maggiori informazioni su WebdriverIO, visita la [homepage](http://webdriver.io).