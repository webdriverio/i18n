---
id: wdio-cucumber-viewport-logger-service
title: Cucumber Viewport Logger Service
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumber-viewport-logger-service är ett paket från tredje part, för mer information se [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Cucumber Viewport Logger Service för WebdriverIO

Denna tjänst lägger till möjligheten att logga dina Cucumber-steg och annan felsökningsinformation direkt till ditt webbläsarfönster i
din WebdriverIO-baserade lösning. Det kan vara särskilt användbart i fall där enheter eller virtuella maskiner används utan direkt 
*fysisk* åtkomst till dem och möjligheten att sätta upp en interaktiv session för djup felsökning av dina e2e-tester.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Snabbstart

Installera paketet:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

Lägg till tjänsten i din `services`-konfigurationssektion, t.ex.:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Tjänstalternativ

| Alternativ | Beskrivning | Typ | Standardvärde |
| --- | --- | --- | --- |
| `numberOfSteps`  | antalet steg som kommer att visas i viewport | number | 3 |
| `enabled`  | aktivera/inaktivera tjänsten | boolean | true |
| `styles`  | CSS-stilar för logger-wrapper, *steg-nyckelord* och *steg-text*, se exemplet nedan | object | {} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // tjänsten kommer endast att aktiveras när du sätter miljövariabeln `VP_LOGGER` till `1`
            // ange anpassade CSS-stilar för specifika element
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - visa anpassat meddelande med anpassad CSS-stil (inte obligatoriskt), du kan använda detta i dina stegdefinitioner
t.ex.:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - ta bort viewportens meddelandesektion, kan vara användbart till exempel för att göra en visuell kontroll

### pointerEvents: 'none'

Som standard går alla mushändelser (klickning, hovring, etc.) genom meddelandesektionen, till exempel: istället för att klicka på meddelandesektionen "passerar" ditt klick till elementet intill meddelandet (ditt applikationselement), om du vill ändra detta beteende, ställ in wrapper-stilens 'pointerEvents'-alternativ till 'auto', t.ex:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```