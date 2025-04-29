---
id: static-server-service
title: Usługa Serwera Statycznego
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Niektóre projekty składają się wyłącznie z zasobów front-endowych i nie wymagają niczego więcej niż serwer statyczny. Ta usługa pomaga uruchomić serwer plików statycznych podczas testowania.

## Instalacja

Najłatwiejszym sposobem jest dodanie `@wdio/static-server-service` jako `devDependency` w pliku `package.json`, poprzez:

```sh
npm install @wdio/static-server-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted).

## Konfiguracja

Aby korzystać z usługi serwera statycznego, dodaj `static-server` do tablicy usług:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## Opcje

### `folders` (wymagane)

Tablica ścieżek folderów i punktów montowania.

Typ: `Array<Object>`
Właściwości:
 - mount `{String}` - Punkt końcowy URL, gdzie folder zostanie zamontowany.
 - path `{String}` - Ścieżka do folderu do zamontowania.

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

Port, na którym zostanie uruchomiony serwer.

Typ: `Number`

Domyślnie: `4567`

### `middleware`

Tablica obiektów middleware. Załaduj i zainicjuj je w konfiguracji, a następnie przekaż je do użycia przez serwer statyczny.

Typ: `Array<Object>`
Właściwości:
 - mount `{String}` - Punkt końcowy URL, gdzie middleware zostanie zamontowane.
 - middleware `<Object>` - Funkcja zwrotna middleware.

Domyślnie: `[]`

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

Więcej informacji na temat WebdriverIO można znaleźć na [stronie głównej](http://webdriver.io).