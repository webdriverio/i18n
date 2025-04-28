---
id: appium-service
title: Appium Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Die Verwaltung des Appium-Servers liegt außerhalb des eigentlichen WebdriverIO-Projekts. Dieser Service hilft Ihnen, den Appium-Server nahtlos zu betreiben, wenn Sie Tests mit dem [WDIO Testrunner](https://webdriver.io/docs/clioptions) ausführen. Er startet den [Appium Server](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) in einem Kindprozess.

## Installation

Der einfachste Weg ist, `@wdio/appium-service` als devDependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/appium-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted)

## Konfiguration

Um den Service zu nutzen, müssen Sie `appium` zu Ihrem Service-Array hinzufügen:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: ['appium'],
    // ...
};
```

## Optionen

Die folgenden Optionen können zur wdio.conf.js-Datei hinzugefügt werden. Um Optionen für den Service zu definieren, müssen Sie den Service auf folgende Weise zur `services`-Liste hinzufügen:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: [
        ['appium', {
            // Appium service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath
Der Pfad, in dem alle Logs vom Appium-Server gespeichert werden sollen.

Typ: `String`

Beispiel:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
Um Ihre Installation von Appium zu verwenden, z.B. global installiert, geben Sie den Befehl an, der gestartet werden soll.

Typ: `String`

Beispiel:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Liste von Argumenten für den Appium-Server, die direkt an `appium` übergeben werden.

Siehe [die Dokumentation](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) für mögliche Argumente.
Die Argumente werden in Lower Camel Case angegeben. Zum Beispiel wird `debugLogSpacing: true` in `--debug-log-spacing` umgewandelt, oder sie können wie in der Appium-Dokumentation beschrieben angegeben werden.

Typ: `Object`

Standard: `{}`

Beispiel:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**Hinweis:** Die Verwendung von Aliasen wird nicht empfohlen und nicht unterstützt. Bitte verwenden Sie stattdessen den vollständigen Eigenschaftsnamen in Lower Camel Case.

----

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).