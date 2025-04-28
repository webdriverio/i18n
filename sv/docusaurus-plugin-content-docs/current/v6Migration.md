---
id: v6-migration
title: Från v5 till v6
---

Denna handledning är för personer som fortfarande använder `v5` av WebdriverIO och vill migrera till `v6` eller till den senaste versionen av WebdriverIO. Som nämnts i vårt [release-blogginlägg](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released) kan ändringarna för denna versionsuppgradering sammanfattas enligt följande:

- vi konsoliderade parametrarna för vissa kommandon (t.ex. `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) och flyttade alla valfria parametrar till ett enda objekt, t.ex.

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

- konfigurationer för tjänster flyttades till tjänstlistan, t.ex.

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

- vissa tjänstalternativ döptes om för förenkling
- vi döpte om kommandot `launchApp` till `launchChromeApp` för Chrome WebDriver-sessioner

:::info

Om du använder WebdriverIO `v4` eller lägre, vänligen uppgradera till `v5` först.

:::

Även om vi skulle vilja ha en helt automatiserad process för detta ser verkligheten annorlunda ut. Alla har olika uppsättningar. Varje steg bör ses som vägledning och mindre som en steg-för-steg-instruktion. Om du har problem med migreringen, tveka inte att [kontakta oss](https://github.com/webdriverio/codemod/discussions/new).

## Installation

Likt andra migreringar kan vi använda WebdriverIO [codemod](https://github.com/webdriverio/codemod). För att installera codemod, kör:

```sh
npm install jscodeshift @wdio/codemod
```

## Uppgradera WebdriverIO-beroenden

Med tanke på att alla WebdriverIO-versioner är knutna till varandra är det bäst att alltid uppgradera till en specifik tagg, t.ex. `6.12.0`. Om du bestämmer dig för att uppgradera från `v5` direkt till `v7` kan du utelämna taggen och installera de senaste versionerna av alla paket. För att göra detta kopierar vi alla WebdriverIO-relaterade beroenden från vår `package.json` och installerar om dem via:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Vanligtvis är WebdriverIO-beroenden en del av dev-beroenden, beroende på ditt projekt kan detta dock variera. Efter detta bör din `package.json` och `package-lock.json` vara uppdaterade. __Observera:__ dessa är exempelberoenden, dina kan skilja sig åt. Se till att du hittar den senaste v6-versionen genom att anropa t.ex.:

```sh
npm show webdriverio versions
```

Försök att installera den senaste tillgängliga version 6 för alla WebdriverIO-kärnpaket. För gemenskapspaket kan detta skilja sig från paket till paket. Här rekommenderar vi att du kontrollerar ändringsloggen för information om vilken version som fortfarande är kompatibel med v6.

## Transformera konfigurationsfilen

Ett bra första steg är att börja med konfigurationsfilen. Alla brytande ändringar kan lösas automatiskt med hjälp av codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Codemod stöder ännu inte TypeScript-projekt. Se [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Vi arbetar på att implementera stöd för det snart. Om du använder TypeScript, vänligen engagera dig!

:::

## Uppdatera specfiler och sidobjekt

För att uppdatera alla kommandon, kör codemod på alla dina e2e-filer som innehåller WebdriverIO-kommandon, t.ex.:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

Det är allt! Inga fler ändringar nödvändiga 🎉

## Slutsats

Vi hoppas att denna handledning guidar dig lite genom migreringsprocessen till WebdriverIO `v6`. Vi rekommenderar starkt att fortsätta uppgradera till den senaste versionen eftersom uppdatering till `v7` är enkel på grund av nästan inga brytande ändringar. Kolla in migreringsguiden [för att uppgradera till v7](v7-migration).

Gemenskapen fortsätter att förbättra codemod medan den testas med olika team i olika organisationer. Tveka inte att [rapportera ett problem](https://github.com/webdriverio/codemod/issues/new) om du har feedback eller [starta en diskussion](https://github.com/webdriverio/codemod/discussions/new) om du har problem under migreringsprocessen.