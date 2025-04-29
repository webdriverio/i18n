---
id: wdio-video-reporter
title: Videorapportör
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporter är ett tredjepartspaket, för mer information se [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

Detta är en rapportör för [Webdriver IO v6 and highr](https://webdriver.io/) som genererar videor av dina wdio-testutföranden. Om du använder allure, dekoreras testfallen automatiskt med videoklipp. (För Webdriver IO v5, använd wdio-video-reporter version ^2.0.0.)

Videor hamnar i `wdio.config.outputDir`

Kolla in exempel på Allure-rapport med inkluderade videor på misslyckade tester här:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

Fördelar:
- Fina videor i dina allure-rapporter
- Fina videor i mänsklig hastighet, även om testerna är snabba
- Fungerar med Selenium grid
- Fungerar med alla webbdrivers som stöder `saveScreenshot`
- Verifierad på följande skrivbords-webbläsare med Selenium 3.141.59:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- Verifierad på följande ios- och android-enheter med [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

Nackdelar:
- Fungerar genom att ta skärmdumpar efter "åtgärder", vilket gör testerna lite långsammare. Detta mildras genom att noggrant välja vilka [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)-meddelanden som ska resultera i en skärmdump
- Selenium-drivrutiner inkluderar inte varningsrutor och popupfönster i skärmdumpar, så de syns inte i videorna


Snabbstart
===========

Kolla in den enkla mallen på [wdio-template](https://github.com/presidenten/wdio-template) för att snabbt komma igång.

Klona en av förvaringarna och installera beroenden med `yarn` eller `npm install`. Kör sedan `yarn e2e` eller `npm run e2e` i demo-katalogen och slutligen `yarn report` eller `npm run report` för att se allure-rapporten.


Installation
============

Installera rapportören
--------------------

`yarn add wdio-video-reporter`
eller
`npm install wdio-video-reporter`


Lägg till rapportören i konfigurationen
--------------------------

Högst upp i `wdio.conf.js`-filen, inkludera biblioteket:
```
const video = require('wdio-video-reporter');
```

Lägg sedan till videorapportören i konfigurationen i reporters-egenskapen:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
  ],
```


Använda med Allure
-----------------

Genom att lägga till Allure-rapportören uppdateras rapporterna automatiskt med videor utan behov av ytterligare konfiguration :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


Konfiguration
=============

Normala konfigurationsparametrar
-------------------------------

De flesta användare kan vilja ställa in dessa

- `saveAllVideos` Sätt till true för att spara videor för godkända tester. `Standard: false`
- `videoSlowdownMultiplier` Heltal mellan [1-100]. Öka om videor spelas för snabbt. `Standard: 3`
- `videoRenderTimeout` Max sekunder att vänta på att en video ska renderas. `Standard: 5`
- `outputDir` Om det inte är inställt används wdio.config.outputDir. `Standard: undefined`
- `outputDir` Om det inte är inställt används wdio.config.outputDir. `Standard: undefined`
- `maxTestNameCharacters` Max längd på testnamn. `Standard: 250`

Avancerade konfigurationsparametrar
---------------------------------

Avancerade användare som vill ändra när motorn gör en skärmdump kan redigera dessa. Dessa matriser kan fyllas med det sista ordet i ett [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)-meddelande, t.ex. /session/:sessionId/`buttondown`.

- `addExcludedActions` Lägg till åtgärder där skärmdumpar är onödiga. `Standard: []`
- `addJsonWireActions` Lägg till åtgärder där skärmdumpar saknas. `Standard: []`
- `recordAllActions` Hoppa över filtrering och ta skärmdump av allt. (Rekommenderas inte) `Standard: false`

För att se bearbetade meddelanden, ställ in `wdio.config.logLevel: 'debug'` och kontrollera `outputDir/wdio-X-Y-Video-reporter.log`. Detta kommer också att lämna skärmdumpsmappen intakt för granskning.

För att undvika extra loggning helt och hållet och bara få videofilerna, ställ in `wdio.config.logLevel: 'silent'`.

Cucumber-stöd
----------------

Om du använder Allure-rapportören måste du se till att du gör följande:

- Använd `chai` istället för de inbyggda node-påståendena, annars rapporteras misslyckade tester som trasiga i dina stegdefinitioner
- Lägg till `useCucumberStepReporter: true` till Allure-alternativet i filen `wdio.conf.js`, en typisk konfiguration skulle se ut så här:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
För ett komplett exempel, kolla in cucumber-grenen på [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


Appium-konfiguration
------------

Sedan `wdio-video-reporter` v1.2.4 finns det stöd för att hjälpa Allure skilja mellan safari- och chrome-webbläsare på skrivbord och enheter.
Rapportören använder den anpassade egenskapen `deviceType` för att identifiera de olika enheterna.
Rekommenderade värden är `phone` och `tablet`.
Det rekommenderas att inkludera `browserVersion` också för _alla_ webbläsare för att undvika en bugg i Chrome webdriver när man använder enheter i samma Selenium-grid som skrivbords-Chrome-webbläsare.

De genererade videofilerna kommer också att få `deviceType` tillagt till webbläsarnamnet.

Exempel på appium-konfiguration:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

Och `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


Bidra
============

Forka, gör ändringar, skriv några tester, linta, kör tester, bygg och verifiera i demon att ändringarna fungerar som de ska, gör sedan en PR.

Demo-mappen fungerar med den byggda versionen av biblioteket, så se till att bygga om du har lagt till nya funktioner och vill prova dem.


Tack
======

Tack till [Johnson E](https://github.com/jonn-set) för att ha fixat Cucumber-stöd som många användare har frågat efter.