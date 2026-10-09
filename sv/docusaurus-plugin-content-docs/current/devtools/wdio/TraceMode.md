---
id: trace-mode
title: Spårningsläge
description: "Fånga headless-spårningsartefakter med DevTools spårningsläge och konfigurera format, granularitet, lagring, skärmdumpar, video och assertions."
---

Headless-insamling — inget DevTools-gränssnittsfönster öppnas. När sessionen avslutas skriver adaptern spårningsartefakter till en `test-results/`-mapp bredvid din spec-/konfigurationskatalog. För granulariteten `session` / `spec` blir det en `trace-<sessionId>.zip` (eller en `trace-<sessionId>/`-katalog); för granulariteten `test` får varje test en egen undermapp (se [Spårningsgranularitet](#trace-granularity--tracegranularity)). Artefakten är portabel och innehåller allt som behövs för offline-uppspelning, diffning med AI-agenter eller vilken konsument som helst som föredrar en fil framför ett live-gränssnitt.

Spårningsläget är **ömsesidigt uteslutande med live-läget**. Välj ett per session: människor som felsöker interaktivt vill ha live; agenter som jämför körningar eller CI-botar som samlar in artefakter vill ha trace.

## Aktivera

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

En komplett referenskonfiguration som går att kopiera och klistra in finns på [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts).

Selenium och Nightwatch levereras med samma spårningspipeline — se deras adaptersidor för ramverksspecifik syntax för aktivering: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Vad som finns i artefakten

| Fil | Innehåll |
|---|---|
| `trace.trace` | NDJSON `context-options` + `before` / `after`-händelser för åtgärder; en rad per post |
| `trace.network` | Nätverksposter i HAR-stil, en per rad |
| `transcript.md` | Markdown-sammanfattning läsbar för människor/LLM:er med tidsåtgång, selektorer och värdeannoteringar |
| `resources/page@<id>-<ts>.jpeg` | Skärmdump tagen vid varje användarorienterad åtgärd |
| `resources/page@<id>-<ts>-elements.json` | Platt lista över interagerbara element vid den åtgärden |
| `resources/page@<id>-<ts>-snapshot.txt` | Djupindenterad ögonblicksbild av tillgänglighetsträdet (AI-vänlig) |

### Vad som räknas som en "åtgärd"

Kommandon filtreras genom en tillåtelselista innan de ger upphov till spårningsposter. Exempel som hamnar i spårningen:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

Interna kommandon som `findElement`, `waitUntil` och `executeScript` utesluts avsiktligt — de representerar inte användarorienterad avsikt och skulle skräpa ner tidslinjen. Den fullständiga tillåtelselistan finns i [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts).

## Utdataformat — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (standard) — ett enda arkiv på `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — samma filer uppackade i `test-results/trace-<sessionId>/`. Ett uppackningssteg mindre för skriptade eller agentbaserade konsumenter som vill greppa / strömma NDJSON direkt.

Båda formaten kan öppnas i den egna [`show-trace`-spelaren](/docs/devtools/trace-player) och i andra kompatibla spårningsvisare.

## Spårningsgranularitet — `traceGranularity`

Hur många spårningsartefakter en körning producerar:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| Värde | Utdata |
|---|---|
| `session` (standard) | En spårning per worker/session — `test-results/trace-<sessionId>.zip`. |
| `spec` | En spårning per spec-fil. Mindre och lättare att navigera. |
| `test` | En spårning **per test**, var och en i sin egen mapp: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

För granulariteten `test` byggs mappnamnet av specens basnamn, en slug av testets titel, webbläsaren och ett `-retry<N>`-suffix vid omförsök — t.ex. `test-results/login_e2e-logs-in-chrome/trace.zip`, med ett första omförsök på `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Spårningar per test är de mest navigerbara och fungerar bäst tillsammans med en lagringspolicy så att endast de spårningar du bryr dig om skrivs.

## Lagring — `tracePolicy`

Som standard sparas varje spårning (`'on'`). För att bara spara de intressanta — idealiskt med `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Policy | Sparar spårningen när… |
|---|---|
| `'on'` (standard) | Alltid — varje spårning skrivs. |
| `'retain-on-failure'` | Testets **sista** försök misslyckades. En sekvens där testet först misslyckas och sedan godkänns vid omförsök slutar som `passed`, så den sparas *inte* — du sparar inte i onödan ett instabilt test som till slut blev grönt. |
| `'retain-on-first-failure'` | **Försök 0** misslyckades, oavsett om ett senare omförsök godkändes. |
| `'on-first-retry'` | Testet kördes om minst en gång (ett försök 1 finns). |
| `'on-all-retries'` | Något omförsök (försök ≥ 1) finns. |
| `'retain-on-failure-and-retries'` | Det sista försöket misslyckades **eller** testet kördes om. |

Ett utsnitt som inte ska sparas avgörs bort och skrivs aldrig till disk. De omförsöksmedvetna policyerna utgår från en **resultatliggare** per försök som adaptern håller per omförsöksstabilt test-id, så att `retain-on-failure` och `retain-on-first-failure` utvärderar rätt försök. Där en runner inte exponerar omförsöksinformation per försök degraderas varje policy utom `retain-on-failure` till `retain-on-failure`; en körning utan observerade resultat (t.ex. ett vanligt fristående skript) misslyckas **öppet** och sparar spårningen hellre än att riskera att tappa en du behöver.

> Omförsöksmedveten lagring är verifierad end-to-end för **WebdriverIO** (mocha / cucumber) och **Selenium** (mocha). För **Nightwatch** fungerar `retain-on-failure`, men de andra omförsöksmedvetna policyerna degraderas till den eftersom Nightwatchs `--retries` kör om ett testfall internt utan att avfyra krokarna per test igen. WDIO:s processöverskridande `specFileRetries` faller också utanför liggaren (som är per worker). Se [Nightwatch-adaptersidan](/docs/devtools/nightwatch#trace-mode) för detaljerna.

## Tät filmremsa — `filmstrip`

**Som standard** spelar spårningen in en **tät, kontinuerlig** skärminspelning så att spelaren kan spola med jämn uppspelning i stället för att hoppa mellan bildrutor. De täta bildrutorna ligger bredvid bildrutorna per åtgärd (som bär DOM-ögonblicksbilderna). Sätt `filmstrip: false` för att bara spela in en bildruta per åtgärd — en mindre spårning utan kontinuerlig inspelare:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- Täta bildrutor läggs till **bredvid** bildrutorna per åtgärd (som bär DOM-ögonblicksbilderna), så ingen DOM-data går förlorad — när täta bildrutor finns ersätter de den glesa filmremsan per åtgärd vid spolning.
- Bildrutor gallras vid export (≥100 ms mellanrum) och är innehållsadresserade, så identiska bildrutor (en statisk väntan) slås ihop till en resurs. Den levande sessionsbufferten begränsas av `screencast.maxBufferFrames` (standard 2000).
- Inspelningen använder screencast-inspelaren — CDP-push på Chrome/Chromium, skärmdumpspollning i övrigt. På webbläsare som inte är Chrome skickar pollningen många `takeScreenshot`-kommandon; kombinera med din reporters alternativ för att tysta steg (se [Allure-integration](/docs/devtools/allure)).

`filmstrip` finns i alla tre adaptrar (WebdriverIO / Selenium / Nightwatch).

## Skärmdump och video per test — `screenshot` / `video`

Vid `traceGranularity: 'test'` kan varje test även producera en fristående skärmdump och/eller ett videoutsnitt per test, i linje med den välbekanta ergonomin för skärmdump/video vid fel:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| Alternativ | Värden | Beteende |
|---|---|---|
| `screenshot` | `'off'` (standard) · `'on'` · `'only-on-failure'` | `'on'` tar en bild efter varje test; `'only-on-failure'` endast efter ett misslyckat test. PNG. |
| `video` | `'off'` (standard) · valfritt `tracePolicy`-värde | Spelar in skärmen kontinuerligt och sparar varje tests utsnitt enligt samma lagringssemantik som `tracePolicy`. WebM. Ett annat värde än `off` startar inspelaren av sig självt — du behöver inte också `filmstrip` eller `screencast.enabled`. |

Båda är begränsade till spårningsläge + `traceGranularity: 'test'` (det per-test-omfång de kopplas till). Vid grövre granulariteter gör de ingenting.

- **WebdriverIO** — `screenshot` / `video` är tjänstealternativ; bifogas inline i Allure när `@wdio/allure-reporter` finns.
- **Selenium** — samma alternativ i dess `DevToolsOptions`; bifogas inline i Allure via `allure-js-commons` när en Allure-runner-adapter är aktiv.
- **Nightwatch** — **endast produktion**: filerna skrivs till spårningens utdatakatalog (och listas i manifestet), men bifogas inte inline i Allure — Nightwatch har inget API för att bifoga i Allure under körning. Se [Begränsningar i spårningsläget](/docs/devtools/limitations).

> `screencast.enabled` är den separata kontinuerliga `.webm`-inspelningen för **live-läget** och ignoreras i spårningsläget. I spårningsläget använder du `filmstrip` (täta bildrutor i spårningen) eller `video` per test; screencast-inställningarna (`quality`, `maxWidth`, `pollIntervalMs`, …) gäller fortfarande för den inspelare som körs.

## Artefaktmanifest — `emitArtifactsManifest`

Skriver en `devtools-artifacts-<sessionId>.json` bredvid spårningen — ett generiskt index som reportrar och CI använder för att hitta de producerade artefakterna (varje spårning / skärmdump / video, plus varje tests status):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Av som standard.** Det **aktiveras automatiskt** när en Allure-reporter upptäcks — WebdriverIO:s `@wdio/allure-reporter` i konfigurationen, eller en aktiv Selenium-`allure-js-commons`-runtime.
- **Nightwatch kräver aktivt val**: det finns ingen live-signal från Allure att upptäcka automatiskt (`nightwatch-allure` körs i efterhand), så det aktiveras aldrig automatiskt — ställ in det explicit om du vill ha manifestet.

## Assertions — `captureAssertions`

Assertions visas som fullvärdiga åtgärdsrader i spårningen (på som standard; sätt `captureAssertions: false` för att stänga av):

- **`node:assert`** — fångas i alla tre adaptrar som `assert.<method>`-rader.
- **WebdriverIO `expect`** — godkända *och* misslyckade `expect(...)`-matchers (`expect($el).toHaveText(...)`, `toBeExisting()`, …) visas som `expect.<matcher>`-rader med det förväntade värdet, elementets källplats och en ögonblicksbild; matcherns interna pollningskommandon undertrycks så att bara assertion visas.
- **Nightwatch `browser.assert.*` / `browser.verify.*`** — inbyggda assertions visas som `assert.<m>` / `verify.<m>`-rader.

Godkända assertions visas i grönt; misslyckade visas i rött med felmeddelandet.

## Mobiltestning

Spårningsläget upptäcker mobilsessioner via `platformName: 'android' | 'ios'` (skiftlägesokänsligt) och anpassar sig:

- **Mobilwebb** (Chrome på Android, Safari på iOS): samma DOM-baserade pipeline för ögonblicksbilder som på desktop.
- **Native mobil**: DOM-skripten som injiceras i sidan stängs av; `getPageSource()` används för att hämta Appiums XML-träd, som i stället matas in i serialiseraren för ögonblicksbilder.

Spårningens `context-options` registrerar `title: 'android — <deviceName>'` / `'ios — <deviceName>'` så att visaren märker bildrutorna korrekt. En referenskonfiguration för WDIO för Android Chrome via Appium finns på [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts).

## Visa artefakten

Öppna en spårning i den egna **[Trace Player](/docs/devtools/trace-player)** — WebdriverIO DevTools-gränssnittet i ett dedikerat skrivskyddat spelarläge:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

Spelaren ger dig tidsresor i DOM:en, A11y-fliken och överlägget för att välja locator, Transcript-fliken med Copy-for-LLM, dockflikarna Errors / Console / Network / Source samt en spolbar tidslinje. Samma portabla `.zip` kan också öppnas i andra fristående spårningsvisare och i en Allure-rapports inbäddade visare. Se sidan **[Trace Player](/docs/devtools/trace-player)** för den fullständiga genomgången, funktionerna och kortkommandona.

## Läs mer
`show-trace`-binären som levereras med varje adapter öppnar samma arkiv i DevTools-spelaren, som dessutom exponerar en **A11y-flik**: tillgänglighetsträdet som fångats per åtgärd, där ett klick på en rad kopierar elementets locator.

Dessa locators skrivs i den inspelande runnerns egen dialekt, så de kan klistras in direkt i ramverket som producerade spårningen. Ett element som bara identifieras av sin text är `a*=Logout` i WebdriverIO och `//a[contains(., "Logout")]` i Selenium — med en bildtext som anger anropet som löser upp det, `By.xpath()`. Nightwatch föredrar en inbyggd CSS-locator som `button[type="submit"]`, eftersom det är den enda runnern som läser en ren selektorsträng med en standardstrategi för CSS, och faller tillbaka på XPath (med bildtexten `useXpath()` / `locateStrategy: 'xpath'`) endast när ingen unik CSS-locator finns. Alla andra locators är portabel CSS.

För konsumtion av LLM:er / agenter, läs `transcript.md` direkt — det är en kompakt Markdown-återgivning av åtgärderna med selektorer och värden.

- **[Trace Player](/docs/devtools/trace-player)** — den fullständiga genomgången av `show-trace`-spelaren, funktioner och kortkommandon.
- **[Allure-integration](/docs/devtools/allure)** — hur spårnings-, skärmdumps- och videoartefakter bifogas i en Allure-rapport.
- **[Stöd för flera ramverk](/docs/devtools/cross-framework)** — kapabilitetsmatrisen per adapter (WebdriverIO / Selenium / Nightwatch).
- **[Begränsningar i spårningsläget](/docs/devtools/limitations)** — vad spårningsläget hoppar över och kända luckor per adapter.
- **[Konfigurationsreferens](/docs/devtools/reference)** — alla alternativ i en överblick.