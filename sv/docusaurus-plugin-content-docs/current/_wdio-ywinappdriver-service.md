---
id: wdio-ywinappdriver-service
title: ywinappdriver-tjänst
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service är ett tredjeparts paket, för mer information se [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

Denna tjänst hjälper dig att köra ywinappdriver-servern sömlöst när du kör tester med [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Den startar [ywinappdriver](https://github.com/licanhua/YWinAppDriver) i en underprocess.

## Installation

```bash
npm install wdio-ywinappdriver-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguration

För att använda tjänsten behöver du lägga till `ywinappdriver` i din service-array:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## Alternativ

Följande alternativ kan läggas till i wdio.conf.js-filen. För att definiera alternativ för tjänsten behöver du lägga till tjänsten i `services`-listan på följande sätt:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // ywinappdriver tjänstalternativ här
            // ...
        }]
    ],
    // ...
};
```

### logPath

Sökväg där alla loggar från ywinappdriver-servern ska lagras.

Typ: `String`

Exempel:

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

För att använda din egen installation av winappdriver, t.ex. globalt installerad, ange kommandot som ska startas.

Typ: `String`

Exempel:

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

Lista med argument som skickas direkt till `ywinappdriver`.

Se [dokumentationen](https://github.com/licanhua/ywinappdriver) för möjliga argument.

Typ: `Array`

Standard: `[]`

Exempel:

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