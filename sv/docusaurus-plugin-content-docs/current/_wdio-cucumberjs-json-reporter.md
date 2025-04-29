---
id: wdio-cucumberjs-json-reporter
title: CucumberJS JSON Reporter
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

En WDIO-rapportör som skapar CucumberJS JSON-filer för WebdriverIO v8 och uppåt.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## Vad gör den
Denna rapportör genererar en **Cucumber JSON-fil** för varje funktion som testas. JSON-filen kan användas med vilken rapport du vill använda som till exempel [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

Den kommer också att lägga till metadata om den körande instansen till feature-filen och sist men inte minst, den ger dig möjlighet att lägga till bilagor till JSON-utdata.

## Installation
Det enklaste sättet är att behålla `wdio-cucumberjs-json-reporter` som en devDependency i din `package.json`.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

Du kan enkelt göra det genom:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

så det kommer automatiskt att läggas till i din `package.json`

Instruktioner om hur man installerar `WebdriverIO` finns [här](https://webdriver.io/docs/gettingstarted).

## Konfiguration
Konfigurera utdatakatalogen och språket i din wdio.conf.js-fil:

```js
export const config = {
    // ...
    reporters: [
        // Like this with the default options, see the options below
        'cucumberjs-json',

        // OR like this if you want to set the folder and the language
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> ANVÄND INTE BÅDA SÄTTEN ATT LÄGGA TILL RAPPORTÖREN, DETTA ÄR BARA ETT EXEMPEL!

## Alternativ
### `jsonFolder`
- **Typ:** `String`
- **Obligatorisk:** Nej
- **Standard:** `.tmp/json/`

Katalogen där JSON-filerna, genererade av denna rapport, lagras, relativt från där skriptet startas.

**Obs:** Om du använder ett npm-skript från kommandoraden, som till exempel `npm run test` kommer `jsonFolder` att vara relativ från sökvägen där skriptet körs. Om du kör det från roten av ditt projekt kommer det också att skapa `jsonFolder` i roten av ditt projekt.

### `language`
- **Typ:** `String`
- **Obligatorisk:** Nej
- **Standard:** `en`

Språket som Gherkin-scenarierna är skrivna på (standard är engelska). Listan över språkkoder och dess nyckelord finns [här](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **Typ:** `boolean`
- **Obligatorisk:** Nej
- **Standard:** `false`

Hook-detaljer kommer inte att vara en del av generationen om denna egenskap sätts till `true`.

### `reportFilePerRetry`
- **Typ:** `boolean`
- **Obligatorisk:** Nej
- **Standard:** `true`

När en spec körs om kommer rapporten att läggas till i den befintliga rapportfilen från tidigare försök om denna egenskap är inställd på `false`.

**Exempel**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## Metadata

> **Obs:**\
> Detta stöds för närvarande inte om du använder WebdriverIO V6, WebdriverIO V5 stöder fortfarande detta och WebdriverIO V7 stöder det igen

Som sagt kan denna rapport automatiskt lagra metadata för den aktuella maskinen/enheten som funktionen har körts på.

För att anpassa detta kan du lägga till det genom att lägga till följande objekt till dina `capabilities`

```js
// Example wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Add this
            'cjson:metadata': {
                // For a browser
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // for an app
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> Metadata-objektet måste ha prefixet `cjson`, annars fungerar det inte!

### Metadata-värden
#### `metadata.app.name`
- **Typ:** `string`

**t.ex.:** Namnet på appen.

#### `metadata.app.version`
- **Typ:** `string`

**t.ex.:** Appens version.

#### `metadata.browser.name`
- **Typ:** `string`
- **Möjliga värden:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **Typ:** `string`

**t.ex.:** Webbläsarens version, detta kan läggas till manuellt eller hämtas under testernas körning för att få exakt versionsnummer.

#### `metadata.device`
- **Typ:** `string`

**t.ex.:** Ett namn som representerar enhetstypen. Om du till exempel kör det på en virtuell maskin kan du placera det här `Virtual Machine`, eller namnet på mobilen, som till exempel `iPhone 7 Plus`.

#### `metadata.platform.name`
- **Typ:** `string`
- **Möjliga värden:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **Typ:** `string`

**t.ex.:** Plattformens version

> Om du inte tillhandahåller `browser`-objektet i metadata kommer denna modul automatiskt att bestämma det åt dig. **Den kommer alltid att åsidosätta det med det senaste värdet den kan bestämma.**

> Om du inte tillhandahåller `device` och eller `platform`-objektet kommer det att vara standard för dig till `not known`

> Om du inte tillhandahåller ett `browser.name` eller en `browser.version` kommer modulen att försöka bestämma detta automatiskt.

## Bilaga
Du har möjlighet att bifoga data till JSON-filen i alla dessa hooks/steg:

- Before(All)
- After(All)
- Given
- When
- Then
- And

Det enda du behöver tillhandahålla är följande kod i dina stegfiler.

För ES Modules (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Attach a string (if no type is provided it will automatically default to `text/plain`
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// Attach JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// Attach a screenshot in a before hook
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
För CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Attach a string (if no type is provided it will automatically default to `text/plain`
attach('just a string');
attach('just a second string', 'text/plain');

// Attach JSON
attach({"json-string": true}, 'application/json');

// Attach a screenshot in a before hook
attach(await browser.takeScreenshot(), 'image/png');
```

## Använd det med multiple-cucumber-html-reporter
Den tidigare modulen för WebdriverIO V4, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter), hade en inbyggd koppling med [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)-modulen. **Detta är inte fallet för denna rapportör** eftersom den nya uppsättningen av WebdriverIO V5 är baserad på en instans som inte tillåter mig att använda `onPrepare` och `onComplete` hook.

Om du fortfarande vill använda [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)-modulen kan du lägga till följande i din konfigurationsfil.

- Installera modulen med

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- Lägg till detta i din konfigurationsfil

    ```js
    import fs from 'node:fs/promises'
    // Import the module
    import { generate } from 'multiple-cucumber-html-reporter'

    // Example wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * Gets executed once before all workers get launched.
       */
      onPrepare: () => {
        // Remove the `.tmp/` folder that holds the json and report files
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Gets executed after all workers got shut down and the process is about to exit.
       */
      onComplete: () => {
        // Generate the report when it all tests are done
        generate({
          // Required
          // This part needs to be the same path where you store the JSON files
          // default = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## Äldre WebdriverIO-versioner

> **DENNA MODUL KAN ENDAST FUNGERA MED WebdriverIO V8+!**\
> **För V6, vänligen kontrollera dokumentationen [här](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) och använd version 2.0.4**\
> **För V5, vänligen kontrollera dokumentationen [här](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) och använd version 1.3.0**

> **DENNA MODUL ÄR INTE EN ERSÄTTNING FÖR [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). DEN MODULEN STÖDER ENDAST WEBDRIVERIO V4 OCH SKAPAR OCKSÅ EN RAPPORT. DENNA MODUL SKAPAR ENDAST EN JSON, INGEN RAPPORT!!**