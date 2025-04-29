---
id: wdio-ywinappdriver-service
title: Usługa ywinappdriver
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service jest pakietem zewnętrznym, więcej informacji można znaleźć na [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

Ta usługa pomaga w bezproblemowym uruchomieniu serwera ywinappdriver podczas wykonywania testów z [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Uruchamia [ywinappdriver](https://github.com/licanhua/YWinAppDriver) w procesie potomnym.

## Instalacja

```bash
npm install wdio-ywinappdriver-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguracja

Aby korzystać z usługi, należy dodać `ywinappdriver` do tablicy usług:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## Opcje

Następujące opcje można dodać do pliku wdio.conf.js. Aby zdefiniować opcje dla usługi, należy dodać usługę do listy `services` w następujący sposób:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // opcje usługi ywinappdriver tutaj
            // ...
        }]
    ],
    // ...
};
```

### logPath

Ścieżka, w której powinny być przechowywane wszystkie logi z serwera ywinappdriver.

Typ: `String`

Przykład:

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

Aby użyć własnej instalacji winappdriver, np. zainstalowanej globalnie, określ polecenie, które powinno zostać uruchomione.

Typ: `String`

Przykład:

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

Lista argumentów przekazywanych bezpośrednio do `ywinappdriver`.

Zobacz [dokumentację](https://github.com/licanhua/ywinappdriver) dla możliwych argumentów.

Typ: `Array`

Domyślnie: `[]`

Przykład:

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