---
id: component-testing
title: Komponenttestning
---

Med WebdriverIOs [Browser Runner](/docs/runner#browser-runner) kan du köra tester i en riktig desktop- eller mobilwebbläsare medan du använder WebdriverIO och WebDriver-protokollet för att automatisera och interagera med det som renderas på sidan. Detta tillvägagångssätt har [många fördelar](/docs/runner#browser-runner) jämfört med andra testramverk som endast tillåter testning mot [JSDOM](https://www.npmjs.com/package/jsdom).

## Hur fungerar det?

Browser Runner använder [Vite](https://vitejs.dev/) för att rendera en testsida och initialisera ett testramverk för att köra dina tester i webbläsaren. För närvarande stöds endast Mocha men Jasmine och Cucumber finns på [färdplanen](https://github.com/orgs/webdriverio/projects/1). Detta gör det möjligt att testa alla typer av komponenter även för projekt som inte använder Vite.

Vite-servern startas av WebdriverIO-testrunnern och konfigureras så att du kan använda alla rapportverktyg och tjänster som du är van vid för normala e2e-tester. Dessutom initialiserar den en [`browser`](/docs/api/browser)-instans som låter dig få tillgång till en delmängd av [WebdriverIO API](/docs/api) för att interagera med alla element på sidan. Precis som vid e2e-tester kan du komma åt den instansen genom `browser`-variabeln som är kopplad till det globala området eller genom att importera den från `@wdio/globals` beroende på hur [`injectGlobals`](/docs/api/globals) är inställt.

WebdriverIO har inbyggt stöd för följande ramverk:

- [__Nuxt__](https://nuxt.com/): WebdriverIOs testrunner upptäcker en Nuxt-applikation och konfigurerar automatiskt dina projektkompositioner och hjälper till att mocka Nuxt-backend, läs mer i [Nuxt-dokumentationen](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): WebdriverIOs testrunner upptäcker om du använder TailwindCSS och laddar miljön korrekt in i testsidan

## Installation

För att konfigurera WebdriverIO för enhets- eller komponenttestning i webbläsaren, starta ett nytt WebdriverIO-projekt via:

```bash
npm init wdio@latest ./
# eller
yarn create wdio ./
```

När konfigurationsguiden startar, välj `browser` för att köra enhets- och komponenttestning och välj en av förinställningarna om så önskas, annars välj _"Other"_ om du bara vill köra grundläggande enhetstester. Du kan också konfigurera en anpassad Vite-konfiguration om du redan använder Vite i ditt projekt. För mer information, se alla [runner-alternativ](/docs/runner#runner-options).

:::info

__Obs:__ WebdriverIO kommer som standard att köra webbläsartester i CI headless, t.ex. om en `CI`-miljövariabel är satt till `'1'` eller `'true'`. Du kan manuellt konfigurera detta beteende med [`headless`](/docs/runner#headless)-alternativet för runnern.

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

Det är helt upp till dig vad du vill köra i dina tester och hur du vill rendera komponenterna. Vi rekommenderar dock att använda [Testing Library](https://testing-library.com/) som verktygsramverk eftersom det har plugins för olika komponentramverk som React, Preact, Svelte och Vue. Det är mycket användbart för att rendera komponenter på testsidan och det rengör automatiskt dessa komponenter efter varje test.

Du kan blanda Testing Library-primitiver med WebdriverIO-kommandon som du vill, t.ex.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Obs:__ att använda rendermetoder från Testing Library hjälper till att ta bort skapade komponenter mellan testerna. Om du inte använder Testing Library, se till att koppla dina testkomponenter till en behållare som rensas mellan tester.

## Konfigurationsskript

Du kan ställa in dina tester genom att köra godtyckliga skript i Node.js eller i webbläsaren, t.ex. injicera stilar, mocka webbläsarens API:er eller ansluta till en tredjepartstjänst. WebdriverIO [hooks](/docs/configuration#hooks) kan användas för att köra kod i Node.js medan [`mochaOpts.require`](/docs/frameworks#require) låter dig importera skript till webbläsaren innan testerna laddas, t.ex.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // tillhandahåll ett konfigurationsskript som ska köras i webbläsaren
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
    // kör kod efter att specifikationsfilen har körts
}

```

Nu kan du i dina tester tillhandahålla anpassade svarsvärden för alla webbläsarförfrågningar. Läs mer om globala fixtures i [Mocha-dokumentationen](https://mochajs.org/#global-fixtures).

## Bevaka test- och applikationsfiler

Det finns flera sätt att felsöka dina webbläsartester. Det enklaste är att starta WebdriverIO-testrunnern med flaggan `--watch`, t.ex.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Detta kommer att köra igenom alla tester initialt och stanna när alla har körts. Du kan sedan göra ändringar i enskilda filer som då kommer att köras om individuellt. Om du ställer in [`filesToWatch`](/docs/configuration#filestowatch) som pekar på dina applikationsfiler, kommer det att köra om alla tester när ändringar görs i din app.

## Felsökning

Även om det (ännu) inte är möjligt att sätta brytpunkter i din IDE och få dem erkända av fjärrwebbläsaren, kan du använda kommandot [`debug`](/docs/api/browser/debug) för att stoppa testet när som helst. Detta låter dig öppna DevTools för att sedan felsöka testet genom att sätta brytpunkter i [källfliken](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

När kommandot `debug` anropas får du också ett Node.js repl-gränssnitt i din terminal som säger:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Tryck på `Ctrl` eller `Command` + `c` eller ange `.exit` för att fortsätta med testet.

## Kör med hjälp av ett Selenium Grid

Om du har ett [Selenium Grid](https://www.selenium.dev/documentation/grid/) uppsatt och kör din webbläsare genom det gridet, måste du ställa in alternativet `host` för browser runner för att låta webbläsaren komma åt rätt värd där testfilerna betjänas, t.ex.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // nätverks-IP för maskinen som kör WebdriverIO-processen
        host: 'http://172.168.0.2'
    }]
}
```

Detta säkerställer att webbläsaren korrekt öppnar rätt serverinstans som är värd på instansen som kör WebdriverIO-testerna.

## Exempel

Du kan hitta olika exempel för testning av komponenter med populära komponentramverk i vårt [exempelförvar](https://github.com/webdriverio/component-testing-examples).