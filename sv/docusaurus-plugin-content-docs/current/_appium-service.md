---
id: appium-service
title: Appium Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Hantering av Appium-servern ligger utanför omfattningen av det faktiska WebdriverIO-projektet. Denna tjänst hjälper dig att köra Appium-servern sömlöst när du kör tester med [WDIO testrunner](https://webdriver.io/docs/clioptions). Den startar [Appium Server](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) i en underprocess.

## Installation

Det enklaste sättet är att hålla `@wdio/appium-service` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/appium-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted)

## Konfiguration

För att använda tjänsten behöver du lägga till `appium` i din service-array:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: ['appium'],
    // ...
};
```

## Alternativ

Följande alternativ kan läggas till i wdio.conf.js-filen. För att definiera alternativ för tjänsten behöver du lägga till tjänsten i `services`-listan på följande sätt:

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
Sökvägen där alla loggar från Appium-servern ska lagras.

Typ: `String`

Exempel:
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
För att använda din installation av Appium, t.ex. globalt installerad, ange kommandot som ska startas.

Typ: `String`

Exempel:
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
Karta över argument för Appium-servern, skickas direkt till `appium`.

Se [dokumentationen](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) för möjliga argument.
Argumenten anges i lower camel case. Till exempel, `debugLogSpacing: true` omvandlas till `--debug-log-spacing`, eller så kan de anges som beskrivs i Appium-dokumentationen.

Typ: `Object`

Standard: `{}`

Exempel:
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
**Obs:** Användning av alias avråds och stöds inte. Använd istället det fullständiga egenskapsnamnet i lower camel case.

----

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).