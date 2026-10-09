---
id: runner
title: Runner
description: "Välj mellan den lokala runnern och webbläsarrunnern, och konfigurera alternativ för webbläsarrunnern såsom presets, Vite-konfiguration och täckning."
---

import CodeBlock from '@theme/CodeBlock';

En runner i WebdriverIO styr hur och var tester körs när testrunnern används. WebdriverIO stöder för närvarande två olika typer av runners: lokal runner och webbläsarrunner.

## Lokal runner

Den [lokala runnern](https://www.npmjs.com/package/@wdio/local-runner) startar ditt ramverk (t.ex. Mocha, Jasmine eller Cucumber) i en arbetsprocess och kör alla dina testfiler i din Node.js-miljö. Varje testfil körs i en separat arbetsprocess per capability, vilket möjliggör maximal samtidighet. Varje arbetsprocess använder en enda webbläsarinstans och kör därför sin egen webbläsarsession, vilket ger maximal isolering.

Eftersom varje test körs i sin egen isolerade process är det inte möjligt att dela data mellan testfiler. Det finns två sätt att kringgå detta:

- använd [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) för att dela data mellan alla arbetsprocesser
- gruppera spec-filer (läs mer i [Organisera testsviter](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Om inget annat har definierats i `wdio.conf.js` är den lokala runnern standardrunnern i WebdriverIO.

### Installation

För att använda den lokala runnern kan du installera den via:

```sh
npm install --save-dev @wdio/local-runner
```

### Konfiguration

Den lokala runnern är standardrunnern i WebdriverIO, så det finns inget behov av att definiera den i din `wdio.conf.js`. Om du vill ange den explicit kan du definiera den så här:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Webbläsarrunner

Till skillnad från den [lokala runnern](https://www.npmjs.com/package/@wdio/local-runner) startar och kör [webbläsarrunnern](https://www.npmjs.com/package/@wdio/browser-runner) ramverket i webbläsaren. Detta gör att du kan köra enhetstester eller komponenttester i en riktig webbläsare i stället för i en JSDOM som många andra testramverk gör. Testpaketet körs i Chrome 90, Edge 90, Firefox 90 och Safari 14.1 eller senare. Se [Webbläsarstöd](/docs/component-testing#browser-support).

Även om [JSDOM](https://www.npmjs.com/package/jsdom) används flitigt i testsyfte är det i slutändan inte en riktig webbläsare, och du kan inte heller emulera mobila miljöer med den. Med denna runner gör WebdriverIO det enkelt för dig att köra dina tester i webbläsaren och använda WebDriver-kommandon för att interagera med element som renderas på sidan.

Här är en översikt över att köra tester i JSDOM jämfört med WebdriverIOs webbläsarrunner

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Kör dina tester i Node.js med en omimplementering av webbstandarder, särskilt WHATWG:s DOM- och HTML-standarder | Kör ditt test i en riktig webbläsare och kör koden i en miljö som dina användare använder |
|2.| Interaktioner med komponenter kan endast imiteras via JavaScript | Du kan använda [WebdriverIO API](api) för att interagera med element via WebDriver-protokollet |
|3.| Canvas-stöd kräver [ytterligare beroenden](https://www.npmjs.com/package/canvas) och [har begränsningar](https://github.com/Automattic/node-canvas/issues) | Du har tillgång till det riktiga [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM har vissa [förbehåll](https://github.com/jsdom/jsdom#caveats) och webb-API:er som inte stöds | Alla webb-API:er stöds eftersom testerna körs i en riktig webbläsare |
|5.| Omöjligt att upptäcka fel mellan olika webbläsare | Stöd för alla webbläsare, inklusive mobila webbläsare |
|6.| Kan __inte__ testa elementets pseudotillstånd | Stöd för pseudotillstånd såsom `:hover` eller `:active` |

Denna runner använder [Vite](https://vitejs.dev/) för att kompilera din testkod och läsa in den i webbläsaren. Den levereras med presets för följande komponentramverk:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Varje testfil / testfilsgrupp körs på en enda sida, vilket innebär att sidan laddas om mellan varje test för att garantera isolering mellan testerna.

### Installation

För att använda webbläsarrunnern kan du installera den via:

```sh
npm install --save-dev @wdio/browser-runner
```

### Konfiguration

För att använda webbläsarrunnern måste du definiera en `runner`-egenskap i din `wdio.conf.js`-fil, t.ex.:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Runner-alternativ

Webbläsarrunnern tillåter följande konfigurationer:

#### `preset`

Om du testar komponenter med något av de ramverk som nämns ovan kan du definiera en preset som säkerställer att allt är konfigurerat direkt. Detta alternativ kan inte användas tillsammans med `viteConfig`.

__Typ:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Exempel:__

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

Definiera din egen [Vite-konfiguration](https://vitejs.dev/config/). Du kan antingen skicka in ett anpassat objekt eller importera en befintlig `vite.conf.ts`-fil om du använder Vite.js för utveckling. Observera att WebdriverIO behåller anpassade Vite-konfigurationer för att sätta upp testmiljön.

__Typ:__ `string` eller [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) eller `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Exempel:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // eller bara:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // eller använd en funktion om din vite-konfiguration innehåller många plugins
    // som du bara vill lösa upp när värdet läses
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Om satt till `true` uppdaterar runnern capabilities så att testerna körs headless. Som standard är detta aktiverat i CI-miljöer där en `CI`-miljövariabel är satt till `'1'` eller `'true'`.

__Typ:__ `boolean`<br />
__Standard:__ `false`, sätts till `true` om miljövariabeln `CI` är satt

#### `rootDir`

Projektets rotkatalog.

__Typ:__ `string`<br />
__Standard:__ `process.cwd()`

#### `coverage`

WebdriverIO stöder rapportering av testtäckning via [`istanbul`](https://istanbul.js.org/). Se [Täckningsalternativ](#coverage-options) för mer information.

__Typ:__ `object`<br />
__Standard:__ `undefined`

### Täckningsalternativ

Följande alternativ gör det möjligt att konfigurera täckningsrapportering.

#### `enabled`

Aktiverar insamling av täckning.

__Typ:__ `boolean`<br />
__Standard:__ `false`

#### `include`

Lista över filer som ingår i täckningen, angivna som glob-mönster.

__Typ:__ `string[]`<br />
__Standard:__ `[**]`

#### `exclude`

Lista över filer som undantas från täckningen, angivna som glob-mönster.

__Typ:__ `string[]`<br />
__Standard:__

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

__Typ:__ `string | string[]`<br />
__Standard:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Katalog som täckningsrapporten ska skrivas till.

__Typ:__ `string`<br />
__Standard:__ `./coverage`

#### `reporter`

Täckningsrapportörer som ska användas. Se [istanbul-dokumentationen](https://istanbul.js.org/docs/advanced/alternative-reporters/) för en detaljerad lista över alla rapportörer.

__Typ:__ `string[]`<br />
__Standard:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Kontrollera tröskelvärden per fil. Se `lines`, `functions`, `branches` och `statements` för de faktiska tröskelvärdena.

__Typ:__ `boolean`<br />
__Standard:__ `false`

#### `clean`

Rensa täckningsresultat innan testerna körs.

__Typ:__ `boolean`<br />
__Standard:__ `true`

#### `lines`

Tröskelvärde för rader.

__Typ:__ `number`<br />
__Standard:__ `undefined`

#### `functions`

Tröskelvärde för funktioner.

__Typ:__ `number`<br />
__Standard:__ `undefined`

#### `branches`

Tröskelvärde för grenar.

__Typ:__ `number`<br />
__Standard:__ `undefined`

#### `statements`

Tröskelvärde för satser.

__Typ:__ `number`<br />
__Standard:__ `undefined`

### Begränsningar

När du använder WebdriverIOs webbläsarrunner är det viktigt att notera att trådblockerande dialogrutor som `alert` eller `confirm` inte kan användas på det inbyggda sättet. Detta beror på att de blockerar webbsidan, vilket innebär att WebdriverIO inte kan fortsätta kommunicera med sidan, vilket gör att körningen hänger sig.

I sådana situationer tillhandahåller WebdriverIO standardmockar med förvalda returvärden för dessa API:er. Detta säkerställer att körningen inte hänger sig om användaren av misstag använder synkrona popup-webb-API:er. Det rekommenderas dock fortfarande att användaren mockar dessa webb-API:er för en bättre upplevelse. Läs mer i [Mocking](/docs/component-testing/mocking).

### Exempel

Se till att läsa dokumentationen om [komponenttestning](https://webdriver.io/docs/component-testing) och ta en titt i [exempelrepot](https://github.com/webdriverio/component-testing-examples) för exempel som använder dessa och diverse andra ramverk.