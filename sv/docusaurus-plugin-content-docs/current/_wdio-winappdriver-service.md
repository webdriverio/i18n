---
id: wdio-winappdriver-service
title: winappdriver Service
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

Denna tjänst hjälper dig att köra WinAppDriver-servern sömlöst när du kör tester med [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Den startar [WinAppDriver](https://github.com/Microsoft/WinAppDriver) i en underprocess.

## Installation

```bash
npm install wdio-winappdriver-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguration

För att använda tjänsten behöver du lägga till `winappdriver` i din tjänstearray:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
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
        ['winappdriver', {
            // WinAppDriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

Sökväg där alla loggar från winappdriver-servern ska lagras.

Typ: `String`

Exempel:

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

För att använda din egen installation av WinAppDriver, t.ex. globalt installerad, ange kommandot som ska startas.

Typ: `String`

Exempel:

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

Lista över argument som skickas direkt till `WinAppDriver`.

Se [dokumentationen](https://github.com/Microsoft/WinAppDriver) för möjliga argument.

Typ: `Array`

Standard: `[]`

Exempel:

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