---
id: runner
title: Runner
---

import CodeBlock from '@theme/CodeBlock';

En runner i WebdriverIO organiserar hur och var tester körs när testrunner används. WebdriverIO stöder för närvarande två olika typer av runners: lokal runner och webbläsarrunner.

## Local Runner

[Local Runner](https://www.npmjs.com/package/@wdio/local-runner) initierar ditt ramverk (t.ex. Mocha, Jasmine eller Cucumber) inom en arbetsprocess och kör alla dina testfiler inom din Node.js-miljö. Varje testfil körs i en separat arbetsprocess per capability vilket möjliggör maximal samtidighet. Varje arbetsprocess använder en enda webbläsarinstans och kör därför sin egen webbläsarsession, vilket möjliggör maximal isolering.

Eftersom varje test körs i sin egen isolerade process är det inte möjligt att dela data mellan testfiler. Det finns två sätt att komma runt detta:

- använd [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) för att dela data mellan alla arbetare
- gruppera specifikationsfiler (läs mer i [Organizing Test Suite](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Om inget annat definieras i `wdio.conf.js` är Local Runner standardrunnern i WebdriverIO.

### Install

För att använda Local Runner kan du installera den via:

```sh
npm install --save-dev @wdio/local-runner
```

### Setup

Local Runner är standardrunnern i WebdriverIO så det finns inget behov av att definiera den i din `wdio.conf.js`. Om du vill ange den explicit kan du definiera den enligt följande:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

Till skillnad från [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) initierar och exekverar [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) ramverket inom webbläsaren. Detta låter dig köra enhetstester eller komponenttester i en verklig webbläsare snarare än i en JSDOM som många andra testramverk.

Medan [JSDOM](https://www.npmjs.com/package/jsdom) är allmänt använd för testsyften, är det i slutändan inte en verklig webbläsare och du kan inte emulera mobila miljöer med den. Med denna runner möjliggör WebdriverIO för dig att enkelt köra dina tester i webbläsaren och använda WebDriver-kommandon för att interagera med element som renderas på sidan.

Här är en översikt över att köra tester inom JSDOM jämfört med WebdriverIOs Browser Runner

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Kör dina tester inom Node.js med en re-implementering av webbstandarder, särskilt WHATWG DOM och HTML Standards | Kör dina tester i en verklig webbläsare och kör koden i en miljö som dina användare använder |
|2.| Interaktioner med komponenter kan endast imiteras via JavaScript | Du kan använda [WebdriverIO API](api) för att interagera med element genom WebDriver-protokollet |
|3.| Canvas-stöd kräver [ytterligare beroenden](https://www.npmjs.com/package/canvas) och [har begränsningar](https://github.com/Automattic/node-canvas/issues) | Du har tillgång till det riktiga [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM har vissa [begränsningar](https://github.com/jsdom/jsdom#caveats) och webbAPI:er som inte stöds | Alla Web API:er stöds eftersom tester körs i en verklig webbläsare |
|5.| Omöjligt att upptäcka fel mellan webbläsare | Stöd för alla webbläsare inklusive mobila webbläsare |
|6.| Kan __inte__ testa för element-pseudotillstånd | Stöd för pseudotillstånd som `:hover` eller `:active` |

Denna runner använder [Vite](https://vitejs.dev/) för att kompilera din testkod och ladda den i webbläsaren. Den kommer med förinställningar för följande komponentramverk:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Varje testfil / testfilgrupp körs inom en enda sida, vilket innebär att mellan varje test laddas sidan om för att garantera isolering mellan tester.

### Install

För att använda Browser Runner kan du installera den via:

```sh
npm install --save-dev @wdio/browser-runner
```

### Setup

För att använda Browser runner måste du definiera en `runner`-egenskap i din `wdio.conf.js`-fil, t.ex.:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Runner Options

Browser runner tillåter följande konfigurationer:

#### `preset`

Om du testar komponenter med ett av de nämnda ramverken ovan kan du definiera en förinställning som säkerställer att allt är konfigurerat direkt. Detta alternativ kan inte användas tillsammans med `viteConfig`.

__Type:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Example:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Definiera din egen [Vite-konfiguration](https://vitejs.dev/config/). Du kan antingen skicka in ett anpassat objekt eller importera en befintlig `vite.conf.ts`-fil om du använder Vite.js för utveckling. Observera att WebdriverIO behåller anpassade Vite-konfigurationer för att konfigurera testmiljön.

__Type:__ `string` or [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) or `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Example:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // or just:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // or use a function if your vite config contains a lot of plugins
    // which you only want to resolve when value is read
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Om inställd på `true` kommer runnern att uppdatera capabilities för att köra tester headless. Som standard är detta aktiverat inom CI-miljöer där en `CI`-miljövariabel är inställd på `'1'` eller `'true'`.

__Type:__ `boolean`<br />
__Default:__ `false`, inställd på `true` om `CI`-miljövariabeln är satt

#### `rootDir`

Projektets rotmapp.

__Type:__ `string`<br />
__Default:__ `process.cwd()`

#### `coverage`

WebdriverIO stöder testövervakning genom [`istanbul`](https://istanbul.js.org/). Se [Coverage Options](#coverage-options) för mer detaljer.

__Type:__ `object`<br />
__Default:__ `undefined`

### Coverage Options

Följande alternativ låter dig konfigurera kodtäckningsrapportering.

#### `enabled`

Aktiverar kodtäckningsinsamling.

__Type:__ `boolean`<br />
__Default:__ `false`

#### `include`

Lista över filer som inkluderas i kodtäckning som glob-mönster.

__Type:__ `string[]`<br />
__Default:__ `[**]`

#### `exclude`

Lista över filer som exkluderas i kodtäckning som glob-mönster.

__Type:__ `string[]`<br />
__Default:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Lista över filändelser som rapporten ska inkludera.

__Type:__ `string | string[]`<br />
__Default:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Katalog att skriva kodtäckningsrapporten till.

__Type:__ `string`<br />
__Default:__ `./coverage`

#### `reporter`

Kodtäckningsrapportörer att använda. Se [istanbul-dokumentationen](https://istanbul.js.org/docs/advanced/alternative-reporters/) för detaljerad lista över alla rapportörer.

__Type:__ `string[]`<br />
__Default:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Kontrollera tröskelvärden per fil. Se `lines`, `functions`, `branches` och `statements` för de faktiska tröskelvärdena.

__Type:__ `boolean`<br />
__Default:__ `false`

#### `clean`

Rensa kodtäckningsresultat innan tester körs.

__Type:__ `boolean`<br />
__Default:__ `true`

#### `lines`

Tröskelvärde för rader.

__Type:__ `number`<br />
__Default:__ `undefined`

#### `functions`

Tröskelvärde för funktioner.

__Type:__ `number`<br />
__Default:__ `undefined`

#### `branches`

Tröskelvärde för grenar.

__Type:__ `number`<br />
__Default:__ `undefined`

#### `statements`

Tröskelvärde för statements.

__Type:__ `number`<br />
__Default:__ `undefined`

### Limitations

När du använder WebdriverIO browser runner är det viktigt att notera att trådblockerade dialoger som `alert` eller `confirm` inte kan användas direkt. Detta beror på att de blockerar webbsidan, vilket innebär att WebdriverIO inte kan fortsätta kommunicera med sidan, vilket gör att exekveringen hänger sig.

I sådana situationer tillhandahåller WebdriverIO standardmockar med standardreturnerade värden för dessa API:er. Detta säkerställer att om användaren av misstag använder synkrona popup-webb-API:er, skulle exekveringen inte hänga sig. Det rekommenderas dock fortfarande att användaren mockar dessa webb-API:er för bättre upplevelse. Läs mer i [Mocking](/docs/component-testing/mocking).

### Examples

Se till att kolla in dokumentationen kring [komponenttestning](https://webdriver.io/docs/component-testing) och titta på [exempelrepositoriet](https://github.com/webdriverio/component-testing-examples) för exempel som använder dessa och andra ramverk.