---
id: wdio-winappdriver-service
title: winappdriver Service
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

Dieser Service hilft Ihnen, den WinAppDriver-Server nahtlos auszuführen, wenn Sie Tests mit dem [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html) durchführen. Er startet den [WinAppDriver](https://github.com/Microsoft/WinAppDriver) in einem Kindprozess.

## Installation

```bash
npm install wdio-winappdriver-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguration

Um den Service zu nutzen, müssen Sie `winappdriver` zu Ihrem Service-Array hinzufügen:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## Optionen

Die folgenden Optionen können zur wdio.conf.js-Datei hinzugefügt werden. Um Optionen für den Service zu definieren, müssen Sie den Service wie folgt zur `services`-Liste hinzufügen:

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

Pfad, in dem alle Logs vom winappdriver-Server gespeichert werden sollen.

Typ: `String`

Beispiel:

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

Um Ihre eigene Installation von WinAppDriver zu verwenden, z.B. global installiert, geben Sie den Befehl an, der gestartet werden soll.

Typ: `String`

Beispiel:

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

Liste der Argumente, die direkt an `WinAppDriver` übergeben werden.

Siehe [die Dokumentation](https://github.com/Microsoft/WinAppDriver) für mögliche Argumente.

Typ: `Array`

Standard: `[]`

Beispiel:

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