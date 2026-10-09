---
id: nightwatch
title: Nightwatch DevTools
description: "Lägg till DevTools felsökningsgränssnitt i en Nightwatch-testsvit utan att ändra testerna, och konfigurera screencasts, BiDi-insamling och trace-läge."
---

Nightwatch-adapter för [WebdriverIO DevTools](https://github.com/webdriverio/devtools) – ger samma visuella felsökningsgränssnitt till din Nightwatch-testsvit utan några ändringar i testkoden.

## Installation

```bash
npm install @wdio/nightwatch-devtools
```

## Konfiguration

### Standard-Nightwatch (mocha-stil)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Required for network request capture
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Kör dina tester som vanligt – DevTools-gränssnittet öppnas automatiskt i ett nytt webbläsarfönster:

```bash
nightwatch
```

> Inga ändringar i dina testfiler behövs.

### Cucumber / BDD

Importera `cucumberHooksPath` tillsammans med huvudexporten och skicka den till Cucumbers `require`-alternativ. Detta registrerar `Before`- / `After`-scenariohooks som speglar WebdriverIO-tjänstens `beforeScenario`- / `afterScenario`-beteende.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- registrera DevTools Cucumber-hooks
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## Konfigurationsalternativ

| Alternativ | Typ | Standard | Beskrivning |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Port för DevTools-backendservern. Räknas upp automatiskt om den redan används. |
| `hostname` | `string` | `'localhost'` | Värdnamn som backendservern binder till. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | `.webm`-videoinspelning per session. Se [Screencast](#screencast) nedan. |
| `bidi` | `boolean` | `false` | Aktivera WebDriver BiDi-insamling för webbläsarkonsol + JS-undantag + nätverk. Kräver `webSocketUrl: true` i dina capabilities och en BiDi-kompatibel chromedriver. När den är ansluten stängs nätverksvägen via Chromes perf-logg per kommando av så att förfrågningar inte dupliceras. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` öppnar DevTools-gränssnittet; `trace` hoppar över det och skriver istället en portabel artefakt. Se [Trace-läge](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Layout för trace-artefakten. Gäller endast när `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | En trace per session / spec-fil / test. `'test'` skriver var och en till `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Gäller endast när `mode: 'trace'`. Se [Trace-läge](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Förbehåll:** BDD-gränssnittet `describe/it` kollapsar till en enda sessionsavgränsad del (se [Uppdelning per test](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Vilka traces som ska behållas. Används tillsammans med `traceGranularity: 'test'`. Gäller endast när `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Spela in en tät, kontinuerlig screencast-filmremsa i trace:n för bläddringsbar uppspelning i trace-spelaren – inte bara en bildruta per åtgärd. Kör screencast-inspelaren (pollningsläge i Nightwatch) för sessionen. Gäller endast när `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Skärmbild per test. Endast trace-läge + `traceGranularity: 'test'`. **Endast produktion** – PNG-filen skrivs till trace-utdatakatalogen (och manifestet när `emitArtifactsManifest: true`); bifogas inte inline i Allure (se anmärkning nedan). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Videodel per test, som behålls enligt angiven policy (t.ex. `'retain-on-failure'`). Endast trace-läge + `traceGranularity: 'test'`. Ett värde som inte är `off` startar screencast-inspelaren själv – du behöver **inte** också `filmstrip` eller `screencast.enabled`. **Endast produktion** – `.webm`-filen skrivs till trace-utdatakatalogen (och manifestet när `emitArtifactsManifest: true`); bifogas inte inline i Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Skriv manifestet `devtools-artifacts-<sessionId>.json` (det generiska index som reporters/CI använder för att hitta producerade artefakter) bredvid trace:n. **Opt-in för Nightwatch** – det finns ingen live-Allure-signal att identifiera automatiskt, så till skillnad från WDIO/Selenium aktiveras det aldrig automatiskt. Gäller endast när `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Fånga assertions som åtgärdsrader i trace:n – `node:assert` samt inbyggda `browser.assert`/`browser.verify`, inklusive negerade `.not.*`-matchers. Sätt till `false` för att avaktivera. |

> **Inline-bifogning i Allure stöds inte för Nightwatch.** Dess officiella `nightwatch-allure`-reporter arbetar i efterhand (inget live-API för bifogning), och `allure-js-commons` `attachment()` gör ingenting i en Nightwatch-körning. Därför *produceras* `screenshot`- / `video`-artefakter (filer, plus artefaktmanifestet när `emitArtifactsManifest: true`) i trace-utdatakatalogen men bifogas inte till ett Allure-test. Uppdelning per test – och därmed dessa artefakter – är meningsfull för Cucumber- och exports-object-gränssnitten; BDD-gränssnittet `describe/it` kollapsar till sessionsgranularitet, så per-test-spärren gör ingenting där.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Spela in en kontinuerlig `.webm`-video av webbläsarsessionen. Inspelningen startar vid den första sessionen pluginet ser och slutförs i Nightwatchs `after()`-hook.

**Endast pollningsläge.** Nightwatch exponerar ingen stabil CDP-utväg på samma sätt som WebdriverIO (`browser.getPuppeteer()`) och Selenium (`driver.createCDPConnection`) gör, så screencasten fångar bildrutor genom att anropa `browser.takeScreenshot()` med ett fast intervall. Fungerar i alla webbläsare som Nightwatch stöder.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Alternativ | Typ | Standard | Anmärkningar |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Huvudbrytare. |
| `pollIntervalMs` | `number` | `200` | Intervall för skärmbilder (ms). Lägre = jämnare video, fler WebDriver-anrop. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Pixelformat per bildruta som skickas till ffmpeg-kodaren före den slutliga `.webm`-muxningen. I pollningsläge fångas källskärmbilderna alltid som PNG, så detta ändrar **inte** insamlingen – endast formatet som kodaren tar emot per bildruta. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Alternativ endast för CDP, ignoreras i pollningsläge. Listade för formkompatibilitet med WDIO/Selenium-adaptrarna. |

**Förutsättningar:** `fluent-ffmpeg` (redan ett körtidsberoende i paketet) plus `ffmpeg`-binären i PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Utan ffmpeg körs inspelaren fortfarande, men kodningssteget loggar en varning och hoppar över att skriva filen.

**Utdata:** videofilen skrivs bredvid testfilen som just kördes (med katalogen för `nightwatch.conf.*` som reserv, och sedan `process.cwd()` som sista utväg). Den fullständiga sökvägen visas i Nightwatch-loggraden `📹 Screencast video: <path>` och videon strömmas även till instrumentpanelens Screencast-flik.

För den fullständiga referensen för screencast-funktionen (webbläsarstöd, utdatasökvägar för alla tre adaptrar), se [Screencast-sidan](/docs/devtools/wdio/screencast).

## BiDi-insamling (opt-in)

Aktivera WebDriver BiDi-insamling för konsolmeddelanden från webbläsaren, JS-undantag och nätverksförfrågningar. Motsvarar den väg som selenium-devtools använder – båda adaptrarna delar samma anslutningslogik i `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Du behöver också `webSocketUrl: true` i dina capabilities så att chromedriver faktiskt exponerar BiDi-kanalen:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← aktiverar BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

När BiDi är anslutet stängs nätverksinsamlingen via Chromes prestandalogg per kommando av så att förfrågningar inte visas två gånger i instrumentpanelen. Om `webSocketUrl` saknas eller om chromedriver-versionen inte exponerar BiDi misslyckas anslutningen tyst och perf-logg-reserven fortsätter att fungera.

## Trace-läge

Headless insamlingsväg – inget DevTools-gränssnittsfönster öppnas. När sessionen avslutas skriver adaptern en portabel `trace-<sessionId>.zip` (eller katalog) till en `test-results/`-mapp (bredvid den upplösta test-/konfigurationskatalogen), med samma form som WebdriverIO:s trace-artefakt.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // valfritt; standard 'zip'
})
```

### Granularitet och Cucumber

`traceGranularity` väljer vad en artefakt omfattar – `'session'` (standard), `'spec'` eller `'test'`.

Nightwatch avslutar webbläsaren efter varje Cucumber-scenario. En `'session'`-trace sträcker sig över detta: en zip för hela körningen, med varje scenario inkapslat under sin feature. `'test'` skriver en zip per scenario till en egen mapp, vilket är rekommendationen för Cucumber – mindre artefakter, och den granularitet som `tracePolicy`-lagringen baseras på.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // en trace per Cucumber-scenario
})
```

I BDD-gränssnittet `describe/it` kollapsar `'test'` till en enda sessionsavgränsad del: Nightwatch kör varje `it()` internt och anropar pluginets per-test-hook endast en gång per modul. Åtgärdsträdet visar ändå varje `it` som en egen grupp.

Portbindningen för backend, gränssnittsfönstret och `screencast`-alternativet hoppas alla över i trace-läge. För den fullständiga funktionsreferensen (artefaktinnehåll, visare, mobiltestning, när man ska välja `zip` respektive `ndjson-directory`), se [Trace-lägessidan](/docs/devtools/wdio/trace-mode).

Nightwatch delar samma trace-pipeline som WebdriverIO- och Selenium-adaptrarna, så artefaktens form är identisk oavsett vilken adapter som producerade den. En Nightwatch-trace innehåller den fullständiga insamlingen per åtgärd – en skärmbild, den djupindragna ögonblicksbilden av tillgänglighetsträdet, listan över interagerbara element och Markdown-transkriptet – så den öppnas i `show-trace`-spelaren med tidsresor i DOM/ögonblicksbilder, flikarna **A11y** och **Transcript**, elementöverlägget för att välja lokaliserare och (för Cucumber) inkapsling i **Feature → Scenario → Step**.

Öppna en trace med `show-trace`-binären, som levereras med `@wdio/nightwatch-devtools` (inget extra beroende):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # i ett projekt som installerar adaptern
pnpm show-trace test-results/trace-<sessionId>.zip  # från devtools-monorepot
```

Se sidan [Trace Player](/docs/devtools/trace-player) för den fullständiga genomgången och kortkommandon.

### Uppdelning per test och förbehållet för BDD `describe/it`

Per-test-alternativen – `traceGranularity: 'test'`, samt alternativen `tracePolicy`, `screenshot` och `video` som hör ihop med det – behöver en per-test-hook för att skära ut varje tests del. Gränssnittet **exports-object (mocha-stil)** och **Cucumber** (hooks per scenario) exponerar en sådan, så de får verklig uppdelning per test. Gränssnittet **BDD `describe/it`** är undantaget: Nightwatch kör varje `it()` internt och anropar pluginets per-test-hook endast en gång per modul, så `traceGranularity: 'test'` kollapsar till en enda **sessionsavgränsad** del kopplad till det första testet. Artefaktmanifestet listar ändå varje testfall med korrekt status; endast kopplingen av delar/artefakter per test kollapsar. Traces med sessions- och spec-granularitet påverkas inte.

## Exempel

Fungerande exempel finns i repots toppnivåkatalog `examples/`. Bygg arbetsytan en gång (`pnpm install && pnpm build`) och kör sedan från repots rot:

| Katalog | Runner | Kommando |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch mocha-stil | `pnpm demo:nightwatch` |

## Funktioner

Nightwatch-adaptern ger samma DevTools-gränssnittsupplevelse som WebdriverIO. Varje funktion nedan fångas automatiskt med grundinställningen `globals: nightwatchDevtools({ port: 3000 })` – ingen konfiguration per funktion (nätverksloggar kräver dessutom `'goog:loggingPrefs': { performance: 'ALL' }`, som visas under [Konfiguration](#setup)). Länkarna leder till varje funktions fullständiga referens.

- **[Interaktiv omkörning och visualisering av tester](/docs/devtools/wdio/interactive-test-rerunning)** – Liveförhandsvisningar av webbläsaren, skärmbilder per kommando och omkörning av test/svit med ett klick
- **[Bevara och kör om (jämför)](/docs/devtools/wdio/preserve-and-rerun)** – Ta en ögonblicksbild av ett misslyckat test, kör om det och jämför de två körningarna sida vid sida
- **[Stöd för flera ramverk](/docs/devtools/wdio/multi-framework-support)** – Standard- (mocha-stil) och Cucumber/BDD-runners
- **[Konsolloggar](/docs/devtools/wdio/console-logs)** – Fånga och inspektera konsolutdata från webbläsaren (i realtid med `bidi: true`)
- **[Nätverksloggar](/docs/devtools/wdio/network-logs)** – Övervaka API-anrop och nätverksaktivitet
- **[Metadata](/docs/devtools/wdio/metadata)** – Sessionens capabilities, miljö och tidsåtgång per webbläsarsession
- **[TestLens](/docs/devtools/wdio/testlens)** – Hoppa från valfritt kommando till källraden som utlöste det
- **[Sessions-screencast](/docs/devtools/wdio/screencast)** – Kontinuerlig `.webm`-inspelning av webbläsarsessionen
- **[Trace-läge](/docs/devtools/wdio/trace-mode)** – Headless insamling som producerar en portabel `trace.zip` (inget gränssnittsfönster)

Screencast är den enda funktionen med egna alternativ (fullständig lista under [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Begränsningar

Nightwatch erbjuder inte samma djup av ramverkshooks som WebdriverIO, så det finns några skillnader jämfört med WDIO DevTools-tjänsten:

| Begränsning | Detalj |
|-----------|--------|
| Inga inbyggda kommandohooks | Nightwatch har ingen `beforeCommand`- / `afterCommand`-hook. Kommandon fångas istället upp via en proxy-wrapper för webbläsaren. |
| Begränsad testkontext | `browser.currentTest` ger mindre metadata än WDIO-runnerns kontext; testnamn och filsökvägar kräver ytterligare heuristik. |
| Platt svitinkapsling | Nightwatch stöder inte nativt flerfaldigt inkapslade `describe`-block; pluginet rapporterar högst två nivåer. |
| Fördröjd tillgång till resultat | Testresultat slutförs först i `afterEach` och är inte tillgängliga mitt i ett test. |
| Screencast endast i pollningsläge | Till skillnad från WDIO (CDP-push via `browser.getPuppeteer()`) och Selenium (CDP-push via `driver.createCDPConnection`) saknar Nightwatch en stabil CDP-utväg, så bildrutor fångas genom pollning av `browser.takeScreenshot()`. Fungerar i alla webbläsare som Nightwatch stöder; liten kostnad per bildruta proportionell mot pollningsintervallet. |
| Uppdelning av trace per test (BDD `describe/it`) | BDD-gränssnittet anropar pluginets per-test-hook en gång per modul, så `traceGranularity: 'test'` kollapsar till en sessionsavgränsad del. Gränssnitten exports-object (mocha-stil) och Cucumber får verklig uppdelning per test. Se [Uppdelning per test](#per-test-slicing--the-bdd-describeit-caveat). |
| Trace-artefakter endast som produktion | Filer för `screenshot` / `video` per test skrivs till trace-utdatakatalogen (och manifestet när `emitArtifactsManifest: true`) men bifogas inte inline i Allure – Nightwatch har inget live-API för Allure-bifogning. |

Den totala funktionsparitet med WebdriverIO DevTools-tjänsten är ungefär **80–90 %**.