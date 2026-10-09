---
id: v6-migration
title: Från v5 till v6
description: "Uppgradera ett WebdriverIO-projekt från v5 till v6 genom att uppdatera beroenden, transformera konfigurationsfilen och uppdatera specs och page objects."
---

Den här guiden är till för dig som fortfarande använder `v5` av WebdriverIO och vill migrera till `v6` eller till den senaste versionen av WebdriverIO. Som nämndes i vårt [blogginlägg om releasen](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released) kan ändringarna i den här versionsuppgraderingen sammanfattas enligt följande:

- vi har konsoliderat parametrarna för vissa kommandon (t.ex. `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) och flyttat alla valfria parametrar till ett enda objekt, t.ex.

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- konfigurationer för tjänster har flyttats in i tjänstlistan, t.ex.

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- vissa tjänstalternativ har bytt namn i förenklingssyfte
- vi har bytt namn på kommandot `launchApp` till `launchChromeApp` för Chrome WebDriver-sessioner

:::info

Om du använder WebdriverIO `v4` eller äldre, uppgradera först till `v5`.

:::

Även om vi gärna skulle vilja ha en helt automatiserad process för detta ser verkligheten annorlunda ut. Alla har olika uppsättningar. Varje steg bör ses som vägledning snarare än som en steg-för-steg-instruktion. Om du stöter på problem med migreringen, tveka inte att [kontakta oss](https://github.com/webdriverio/codemod/discussions/new).

## Installation

I likhet med andra migreringar kan vi använda WebdriverIO:s [codemod](https://github.com/webdriverio/codemod). För att installera codemod, kör:

```sh
npm install jscodeshift @wdio/codemod
```

## Uppgradera WebdriverIO-beroenden

Eftersom alla WebdriverIO-versioner är tätt knutna till varandra är det bäst att alltid uppgradera till en specifik tagg, t.ex. `6.12.0`. Om du bestämmer dig för att uppgradera från `v5` direkt till `v7` kan du utelämna taggen och installera de senaste versionerna av alla paket. För att göra det kopierar vi alla WebdriverIO-relaterade beroenden från vår `package.json` och installerar om dem via:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Vanligtvis är WebdriverIO-beroenden en del av dev-beroendena, men det kan variera beroende på ditt projekt. Efter detta bör dina `package.json` och `package-lock.json` vara uppdaterade. __Obs:__ detta är exempelberoenden, dina kan skilja sig. Se till att du hittar den senaste v6-versionen genom att till exempel köra:

```sh
npm show webdriverio versions
```

Försök att installera den senaste tillgängliga version 6 för alla WebdriverIO-kärnpaket. För community-paket kan detta skilja sig från paket till paket. Här rekommenderar vi att du kontrollerar ändringsloggen för information om vilken version som fortfarande är kompatibel med v6.

## Transformera konfigurationsfilen

Ett bra första steg är att börja med konfigurationsfilen. Alla bakåtinkompatibla ändringar kan lösas helt automatiskt med hjälp av codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Codemod har ännu inte stöd för TypeScript-projekt. Se [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Vi arbetar på att implementera stöd för det snart. Om du använder TypeScript, engagera dig gärna!

:::

## Uppdatera spec-filer och page objects

För att uppdatera alla kommandoändringar, kör codemod på alla dina e2e-filer som innehåller WebdriverIO-kommandon, t.ex.:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

Det var allt! Inga fler ändringar behövs 🎉

## Slutsats

Vi hoppas att den här guiden har hjälpt dig en bit på vägen genom migreringsprocessen till WebdriverIO `v6`. Vi rekommenderar starkt att du fortsätter att uppgradera till den senaste versionen, eftersom uppdateringen till `v7` är enkel tack vare att det knappt finns några bakåtinkompatibla ändringar. Ta en titt på migreringsguiden [för att uppgradera till v7](v7-migration).

Communityn fortsätter att förbättra codemod samtidigt som den testas med olika team i olika organisationer. Tveka inte att [skapa ett ärende](https://github.com/webdriverio/codemod/issues/new) om du har feedback eller [starta en diskussion](https://github.com/webdriverio/codemod/discussions/new) om du får problem under migreringsprocessen.