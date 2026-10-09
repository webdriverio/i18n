---
id: component-testing
title: Komponenttestning
description: "Kör enhets- och komponenttester i riktiga webbläsare med WebdriverIO:s browser runner, som drivs av Vite, inklusive konfiguration, testmiljö och felsökning."
---

Med WebdriverIO:s [Browser Runner](/docs/runner#browser-runner) kan du köra tester i en riktig dator- eller mobilwebbläsare samtidigt som du använder WebdriverIO och WebDriver-protokollet för att automatisera och interagera med det som renderas på sidan. Detta tillvägagångssätt har [många fördelar](/docs/runner#browser-runner) jämfört med andra testramverk som endast tillåter testning mot [JSDOM](https://www.npmjs.com/package/jsdom).

## Webbläsarstöd

Browser runner kör testpaketet i webbläsaren. Paketet körs i Chrome 90, Edge 90, Firefox 90 och Safari 14.1, samt i senare versioner av dessa webbläsare.

End-to-end-tester körs i Node.js. Kod som skickas till [`browser.execute`](/docs/api/browser/execute) körs istället i den automatiserade webbläsaren, som kan vara äldre än versionerna ovan. Håll den koden på ES2021-nivå.

## Hur fungerar det?

Browser Runner använder [Vite](https://vitejs.dev/) för att rendera en testsida och initiera ett testramverk för att köra dina tester i webbläsaren. För närvarande stöds endast Mocha, men Jasmine och Cucumber finns [på färdplanen](https://github.com/orgs/webdriverio/projects/1). Detta gör det möjligt att testa alla typer av komponenter, även för projekt som inte använder Vite.

Vite-servern startas av WebdriverIO:s testrunner och är konfigurerad så att du kan använda alla reporters och services som du är van vid för vanliga e2e-tester. Dessutom initieras en [`browser`](/docs/api/browser)-instans som ger dig tillgång till en delmängd av [WebdriverIO API](/docs/api) för att interagera med alla element på sidan. Precis som med e2e-tester kan du komma åt den instansen via variabeln `browser` som är kopplad till det globala scopet eller genom att importera den från `@wdio/globals`, beroende på hur [`injectGlobals`](/docs/api/globals) är inställt.

WebdriverIO har inbyggt stöd för följande ramverk:

- [__Nuxt__](https://nuxt.com/): WebdriverIO:s testrunner upptäcker en Nuxt-applikation och konfigurerar automatiskt ditt projekts composables samt hjälper till att mocka Nuxt-backend, läs mer i [Nuxt-dokumentationen](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): WebdriverIO:s testrunner upptäcker om du använder TailwindCSS och laddar miljön korrekt i testsidan

## Konfiguration

För att konfigurera WebdriverIO för enhets- eller komponenttestning i webbläsaren, starta ett nytt WebdriverIO-projekt via:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

När konfigurationsguiden startar, välj `browser` för att köra enhets- och komponenttestning och välj en av förinställningarna om så önskas, annars välj _"Other"_ om du bara vill köra grundläggande enhetstester. Du kan också ange en anpassad Vite-konfiguration om du redan använder Vite i ditt projekt. För mer information, se alla [runner-alternativ](/docs/runner#runner-options).

:::info

__Obs:__ WebdriverIO kör som standard webbläsartester i headless-läge i CI, t.ex. när miljövariabeln `CI` är satt till `'1'` eller `'true'`. Du kan konfigurera detta beteende manuellt med alternativet [`headless`](/docs/runner#headless) för runnern.

:::

I slutet av denna process bör du hitta en `wdio.conf.js` som innehåller olika WebdriverIO-konfigurationer, inklusive en `runner`-egenskap, t.ex.:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Genom att definiera olika [capabilities](/docs/configuration#capabilities) kan du köra dina tester i olika webbläsare, parallellt om så önskas.

Om du fortfarande är osäker på hur allt fungerar, titta på följande handledning om hur du kommer igång med komponenttestning i WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Testmiljö

Det är helt upp till dig vad du vill köra i dina tester och hur du vill rendera komponenterna. Vi rekommenderar dock att använda [Testing Library](https://testing-library.com/) som hjälpramverk, eftersom det tillhandahåller plugins för olika komponentramverk, såsom React, Preact, Svelte och Vue. Det är mycket användbart för att rendera komponenter i testsidan och det rensar automatiskt bort dessa komponenter efter varje test.

Du kan blanda Testing Library-primitiver med WebdriverIO-kommandon som du vill, t.ex.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Obs:__ att använda render-metoder från Testing Library hjälper till att ta bort skapade komponenter mellan testerna. Om du inte använder Testing Library, se till att koppla dina testkomponenter till en container som rensas mellan testerna.

## Konfigurationsskript

Du kan förbereda dina tester genom att köra godtyckliga skript i Node.js eller i webbläsaren, t.ex. för att injicera stilar, mocka webbläsar-API:er eller ansluta till en tredjepartstjänst. WebdriverIO:s [hooks](/docs/configuration#hooks) kan användas för att köra kod i Node.js, medan [`mochaOpts.require`](/docs/frameworks#require) låter dig importera skript till webbläsaren innan testerna laddas, t.ex.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // tillhandahåll ett konfigurationsskript som körs i webbläsaren
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // konfigurera testmiljön i Node.js
    }
    // ...
}
```

Till exempel, om du vill mocka alla [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)-anrop i ditt test med följande konfigurationsskript:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// kör kod innan alla tester laddas
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // kör kod efter att testfilen har laddats
}

export const mochaGlobalTeardown = () => {
    // kör kod efter att spec-filen har körts
}

```

Nu kan du i dina tester ange anpassade svarsvärden för alla webbläsarförfrågningar. Läs mer om globala fixtures i [Mocha-dokumentationen](https://mochajs.org/#global-fixtures).

## Bevaka test- och applikationsfiler

Det finns flera sätt att felsöka dina webbläsartester. Det enklaste är att starta WebdriverIO:s testrunner med flaggan `--watch`, t.ex.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Detta kör först igenom alla tester och stannar sedan när alla har körts. Du kan därefter göra ändringar i enskilda filer, som då körs om individuellt. Om du anger [`filesToWatch`](/docs/configuration#filestowatch) så att det pekar på dina applikationsfiler, körs alla tester om när ändringar görs i din app.

## Felsökning

Även om det (ännu) inte är möjligt att sätta brytpunkter i din IDE och få dem igenkända av fjärrwebbläsaren, kan du använda kommandot [`debug`](/docs/api/browser/debug) för att stoppa testet när som helst. Detta låter dig öppna DevTools och sedan felsöka testet genom att sätta brytpunkter i [sources-fliken](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

När kommandot `debug` anropas får du också ett Node.js-REPL-gränssnitt i din terminal, som säger:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Tryck på `Ctrl` eller `Command` + `c` eller skriv `.exit` för att fortsätta med testet.

## Kör med ett Selenium Grid

Om du har ett [Selenium Grid](https://www.selenium.dev/documentation/grid/) konfigurerat och kör din webbläsare via det, måste du ange browser runner-alternativet `host` så att webbläsaren kan nå rätt värd där testfilerna serveras, t.ex.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // nätverks-IP för maskinen som kör WebdriverIO-processen
        host: 'http://172.168.0.2'
    }]
}
```

Detta säkerställer att webbläsaren öppnar rätt serverinstans, som körs på den maskin som kör WebdriverIO-testerna.

## Exempel

Du hittar olika exempel på testning av komponenter med populära komponentramverk i vårt [exempelrepository](https://github.com/webdriverio/component-testing-examples).