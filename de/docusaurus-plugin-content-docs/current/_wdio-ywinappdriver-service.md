---
id: wdio-ywinappdriver-service
title: ywinappdriver Service
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---


> wdio-ywinappdriver-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

Dieser Service hilft Ihnen, den ywinappdriver-Server nahtlos auszuführen, wenn Sie Tests mit dem [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html) durchführen. Er startet den [ywinappdriver](https://github.com/licanhua/YWinAppDriver) in einem Kindprozess.

## Installation

```bash
npm install wdio-ywinappdriver-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguration

Um den Service zu nutzen, müssen Sie `ywinappdriver` zu Ihrem Service-Array hinzufügen:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
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
        ['ywinappdriver', {
            // ywinappdriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

Pfad, in dem alle Logs vom ywinappdriver-Server gespeichert werden sollen.

Typ: `String`

Beispiel:

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

Um Ihre eigene Installation von winappdriver zu verwenden, z.B. global installiert, geben Sie den Befehl an, der gestartet werden soll.

Typ: `String`

Beispiel:

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

Liste der Argumente, die direkt an `ywinappdriver` übergeben werden.

Siehe [die Dokumentation](https://github.com/licanhua/ywinappdriver) für mögliche Argumente.

Typ: `Array`

Standard: `[]`

Beispiel:

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