---
id: v7-migration
title: Från v6 till v7
---

Denna handledning är för personer som fortfarande använder `v6` av WebdriverIO och vill migrera till `v7`. Som nämnts i vårt [release-blogginlägg](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released) finns förändringarna mestadels under huven och uppgraderingen bör vara en okomplicerad process.

:::info

Om du använder WebdriverIO `v5` eller lägre, vänligen uppgradera till `v6` först. Se vår [v6-migrationsguide](v6-migration).

:::

Även om vi skulle vilja ha en helt automatiserad process för detta ser verkligheten annorlunda ut. Alla har olika uppsättningar. Varje steg bör ses som vägledning och mindre som en steg-för-steg-instruktion. Om du har problem med migreringen, tveka inte att [kontakta oss](https://github.com/webdriverio/codemod/discussions/new).

## Installation

Liknande andra migreringar kan vi använda WebdriverIO [codemod](https://github.com/webdriverio/codemod). För denna handledning använder vi ett [boilerplate-projekt](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) inskickat av en community-medlem och migrerar det fullständigt från `v6` till `v7`.

För att installera codemod, kör:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commits:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Uppgradera WebdriverIO-beroenden

Med tanke på att alla WebdriverIO-versioner är knutna till varandra är det bäst att alltid uppgradera till en specifik tagg, t.ex. `latest`. För att göra det kopierar vi alla WebdriverIO-relaterade beroenden från vår `package.json` och installerar om dem via:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Vanligtvis är WebdriverIO-beroenden en del av utvecklingsberoendena, beroende på ditt projekt kan detta dock variera. Efter detta bör din `package.json` och `package-lock.json` vara uppdaterade. __Obs:__ dessa är de beroenden som används av [exempelprojektet](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), dina kan skilja sig åt.

#### Commits:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Transformera konfigurationsfilen

Ett bra första steg är att börja med konfigurationsfilen. I WebdriverIO `v7` behöver vi inte längre manuellt registrera några av kompilatorerna. I själva verket måste de tas bort. Detta kan göras med codemod helt automatiskt:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Codemod stöder ännu inte TypeScript-projekt. Se [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Vi arbetar för att implementera stöd för det snart. Om du använder TypeScript, bli involverad!

:::

#### Commits:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Uppdatera stegdefinitioner

Om du använder Jasmine eller Mocha är du klar här. Det sista steget är att uppdatera Cucumber.js-importerna från `cucumber` till `@cucumber/cucumber`. Detta kan också göras via codemod automatiskt:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

Det var allt! Inga fler ändringar behövs 🎉

#### Commits:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Slutsats

Vi hoppas att denna handledning guidar dig lite genom migreringsprocessen till WebdriverIO `v7`. Communityn fortsätter att förbättra codemod medan de testar den med olika team i olika organisationer. Tveka inte att [skapa ett ärende](https://github.com/webdriverio/codemod/issues/new) om du har feedback eller [starta en diskussion](https://github.com/webdriverio/codemod/discussions/new) om du har problem under migreringsprocessen.