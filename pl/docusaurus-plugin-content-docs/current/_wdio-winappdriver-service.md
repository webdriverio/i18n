---
id: wdio-winappdriver-service
title: Usługa winappdriver
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

Ta usługa pomaga bezproblemowo uruchamiać serwer WinAppDriver podczas przeprowadzania testów za pomocą [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Uruchamia [WinAppDriver](https://github.com/Microsoft/WinAppDriver) w procesie potomnym.

## Instalacja

```bash
npm install wdio-winappdriver-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguracja

Aby korzystać z usługi, musisz dodać `winappdriver` do tablicy usług:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## Opcje

Poniższe opcje można dodać do pliku wdio.conf.js. Aby zdefiniować opcje dla usługi, musisz dodać usługę do listy `services` w następujący sposób:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            // Opcje usługi WinAppDriver tutaj
            // ...
        }]
    ],
    // ...
};
```

### logPath

Ścieżka, w której powinny być przechowywane wszystkie logi z serwera winappdriver.

Typ: `String`

Przykład:

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

Aby użyć własnej instalacji WinAppDriver, np. zainstalowanej globalnie, określ polecenie, które powinno zostać uruchomione.

Typ: `String`

Przykład:

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

Lista argumentów przekazywanych bezpośrednio do `WinAppDriver`.

Zobacz [dokumentację](https://github.com/Microsoft/WinAppDriver) dla możliwych argumentów.

Typ: `Array`

Domyślnie: `[]`

Przykład:

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