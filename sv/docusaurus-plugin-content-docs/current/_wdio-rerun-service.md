---
id: wdio-rerun-service
title: Kör igen-tjänst
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Denna tjänst spårar misslyckade Mocha- eller Jasmine-tester och Cucumber-scenarier som körs inom [WebdriverIO](https://webdriver.io) testramverket. Den låter misslyckade eller instabila tester eller scenarier köras igen.

_OBS_: Cucumber Framework-användare som kör WebdriverIO-versionerna `5.x` och `6.x` bör använda version `1.6.x`. Om du använder den senaste huvudversionen av `7.x`, använd den senaste `1.7.x` versionen av denna tjänst.

## Re-run vs. Retry

`retry`-logiken som är inbyggd i WebdriverIO för Cucumber och Mocha/Jasmine är användbar för att hantera instabila steg i Cucumber och Mocha/Jasmine. Att försöka igen i varje ramverk har vissa nackdelar: 
* Cucumber: Det tar inte hänsyn till att vissa steg kanske inte kan köras igen mitt i ett test. Att köra ett steg två gånger kan störa resten av scenariot eller det kanske inte är möjligt i testkontexten. 
* Mocha/Jasmine: `retry`-logiken kan tillämpas på ett enskilt test, men detta görs fortfarande i realtid och tar kanske inte hänsyn till tillfälliga problem eller nätverksproblem.

De huvudsakliga skillnaderna med `re-run`:
* Kommer att köra om ett helt individuellt Cucumber-scenario och inte bara ett enskilt steg
* Möjliggör att en hel spec-fil kan köras om efter att en huvudtestkörning är slutförd
* Kan kopieras och köras lokalt (`retry` kan inte det)
* Kan fortfarande användas tillsammans med `retry`-metoder
* Kräver inga kodändringar för att tillämpa `retry`-logik på instabila eller problematiska tester

Det rekommenderas att ta lite tid för att utvärdera de tillgängliga alternativen. En hybridlösning kan vara den bästa lösningen för att ge de bästa och mest användbara testresultaten.

## Installation

Det enklaste sättet är att lägga till `wdio-rerun-service` i `devDependencies` i din `package.json`.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

Den kan installeras med `npm`:

```bash
npm install wdio-rerun-service
```

Efter att paketinstallationen är klar, lägg till den i `services`-arrayen i `wdio.conf.js`:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguration

Följande alternativ kan läggas till i wdio.conf.js-filen. För att definiera alternativ för tjänsten behöver du lägga till tjänsten i listan `services` på följande sätt:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Re-run service options here...
        }]
    ],
    // ...
};
```

### rerunDataDir
Katalog där all re-run JSON-data kommer att förvaras under körning.

Typ: `String`

Standard: `./results/rerun`

Exempel:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
Sökväg för att skriva re-run Bash-skript.

Typ: `String`

Standard: `./rerun.sh`

Exempel:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Endast Cucumber) Set med Cucumber-taggar att exkludera. Om ett scenario innehåller en tagg kommer re-run-tjänsten att hoppa över analysen.

Typ: `Array`

Standard: `[]`

Exempel:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
Prefix som kommer att läggas till det re-run-kommando som genereras.

Typ: `String`

Standard: `''`

Exempel:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----