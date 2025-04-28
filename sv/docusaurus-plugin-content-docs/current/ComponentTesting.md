---
id: component-testing
title: Komponenttestning
---

Med WebdriverIOs [Browser Runner](/docs/runner#browser-runner) kan du köra tester i en riktig desktop- eller mobilwebbläsare medan du använder WebdriverIO och WebDriver-protokollet för att automatisera och interagera med det som renderas på sidan. Detta tillvägagångssätt har [många fördelar](/docs/runner#browser-runner) jämfört med andra testramverk som endast tillåter testning mot [JSDOM](https://www.npmjs.com/package/jsdom).

## Hur fungerar det?

Browser Runner använder [Vite](https://vitejs.dev/) för att rendera en testsida och initiera ett testramverk för att köra dina tester i webbläsaren. För närvarande stöds endast Mocha men Jasmine och Cucumber finns [på färdplanen](https://github.com/orgs/webdriverio/projects/1). Detta gör det möjligt att testa alla typer av komponenter även för projekt som inte använder Vite.

Vite-servern startas av WebdriverIO-testkörnaren och konfigureras så att du kan använda alla rapporterare och tjänster som du är van vid för normala e2e-tester. Dessutom initierar den en [`browser`](/docs/api/browser)-instans som låter dig komma åt en delmängd av [WebdriverIO API](/docs/api) för att interagera med alla element på sidan. På samma sätt som e2e-tester kan du komma åt denna instans genom `browser`-variabeln som är kopplad till det globala omfånget eller genom att importera den från `@wdio/globals` beroende på hur [`injectGlobals`](/docs/api/globals) är inställd.

WebdriverIO har inbyggt stöd för följande ramverk:

- [__Nuxt__](https://nuxt.com/): WebdriverIOs testkörnare upptäcker en Nuxt-applikation och ställer automatiskt in dina projektkomponerbara och hjälper till att mocka ut Nuxt-backend, läs mer i [Nuxt-dokumentationen](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): WebdriverIOs testkörnare upptäcker om du använder TailwindCSS och laddar miljön korrekt i testsidan

## Installation

För att konfigurera WebdriverIO för enhets- eller komponenttestning i webbläsaren, starta ett nytt WebdriverIO-projekt via:

```bash
npm init wdio@latest ./
# eller
yarn create wdio ./
```

När konfigurationsguiden startar, välj `browser` för att köra enhets- och komponenttestning och välj en av förinställningarna om så önskas, annars välj _"Other"_ om du bara vill köra grundläggande enhetstester. Du kan också konfigurera en anpassad Vite-konfiguration om du redan använder Vite i ditt projekt. För mer information, kolla in alla [runner-alternativ](/docs/runner#runner-options).

:::info

__Obs:__ WebdriverIO kör som standard webbläsartester huvudlöst i CI, t.ex. när en `CI`-miljövariabel är satt till `'1'` eller `'true'`. Du kan manuellt konfigurera detta beteende med [`headless`](/docs/runner#headless)-alternativet för runner.

:::

I slutet av denna process bör du hitta en `wdio.conf.js` som innehåller olika WebdriverIO-konfigurationer, inklusive en `runner`-egenskap, t.ex.:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Genom att definiera olika [capabilities](/docs/configuration#capabilities) kan du köra dina tester i olika webbläsare, parallellt om så önskas.

Om du fortfarande är osäker på hur allt fungerar, titta på följande handledning om hur du kommer igång med komponenttestning i WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Testharness

Det är helt upp till dig vad du vill köra i dina tester och hur du vill rendera komponenterna. Vi rekommenderar dock att använda [Testing Library](https://testing-library.com/) som verktygsramverk eftersom det tillhandahåller plugins för olika komponentramverk, såsom React, Preact, Svelte och Vue. Det är mycket användbart för att rendera komponenter på testsidan och det städar automatiskt upp dessa komponenter efter varje test.

Du kan blanda Testing Library-primitiver med WebdriverIO-kommandon som du vill, t.ex.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Obs:__ att använda render-metoder från Testing Library hjälper till att ta bort skapade komponenter mellan testerna. Om du inte använder Testing Library, se till att koppla dina testkomponenter till en behållare som rensas mellan testerna.

## Inställningsskript

Du kan ställa in dina tester genom att köra godtyckliga skript i Node.js eller i webbläsaren, t.ex. injicera stilar, mocka webbläsar-API:er eller ansluta till en tredjepartstjänst. WebdriverIOs [hooks](/docs/configuration#hooks) kan användas för att köra kod i Node.js medan [`mochaOpts.require`](/docs/frameworks#require) låter dig importera skript till webbläsaren innan tester laddas, t.ex.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // tillhandahåll ett inställningsskript att köra i webbläsaren
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // ställ in testmiljö i Node.js
    }
    // ...
}
```

Till exempel, om du vill mocka alla [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)-anrop i ditt test med följande inställningsskript:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// kör kod innan alla tester laddas
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // kör kod efter att testfilen har laddats
}

export const mochaGlobalTeardown = () => {
    // kör kod efter att specfilen har körts
}

```

Nu kan du i dina tester tillhandahålla anpassade svarsvärden för alla webbläsarförfrågningar. Läs mer om globala fixtures i [Mocha-dokumentationen](https://mochajs.org/#global-fixtures).

## Bevaka test- och applikationsfiler

Det finns flera sätt att felsöka dina webbläsartester. Det enklaste är att starta WebdriverIO-testkörnaren med flaggan `--watch`, t.ex.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Detta kommer att gå igenom alla tester initialt och sedan stanna när alla har körts. Du kan sedan göra ändringar i enskilda filer som då kommer att köras om individuellt. Om du ställer in [`filesToWatch`](/docs/configuration#filestowatch) som pekar på dina applikationsfiler, kommer den att köra om alla tester när ändringar i din app görs.

## Felsökning

Även om det (ännu) inte är möjligt att ställa in brytpunkter i din IDE och få dem att kännas igen av fjärrwebbläsaren, kan du använda kommandot [`debug`](/docs/api/browser/debug) för att stoppa testet när som helst. Detta låter dig öppna DevTools för att sedan felsöka testet genom att ställa in brytpunkter i [sources-fliken](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

När `debug`-kommandot anropas får du också ett Node.js repl-gränssnitt i din terminal som säger:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Tryck på `Ctrl` eller `Command` + `c` eller ange `.exit` för att fortsätta med testet.

## Kör med hjälp av ett Selenium Grid

Om du har ett [Selenium Grid](https://www.selenium.dev/documentation/grid/) inställt och kör din webbläsare genom det nätet, måste du ställa in `host` browser runner-alternativet för att låta webbläsaren komma åt rätt värd där testfilerna servas, t.ex.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // nätverks-IP för maskinen som kör WebdriverIO-processen
        host: 'http://172.168.0.2'
    }]
}
```

Detta säkerställer att webbläsaren korrekt öppnar rätt serverinstans som finns på instansen som kör WebdriverIO-testerna.

## Exempel

Du kan hitta olika exempel för testning av komponenter med populära komponentramverk i vårt [exempelarkiv](https://github.com/webdriverio/component-testing-examples).