---
id: frameworks
title: Ramverk
description: "Konfigurera Mocha, Jasmine eller Cucumber.js som testramverk för WDIO-testrunnern, eller integrera tredjepartsramverk som Serenity/JS."
---

WebdriverIO Runner har inbyggt stöd för [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) och [Cucumber.js](https://cucumber.io/). Du kan också integrera den med tredjeparts open source-ramverk, som till exempel [Serenity/JS](#using-serenityjs).

:::tip Integrera WebdriverIO med testramverk
För att integrera WebdriverIO med ett testramverk behöver du ett adapterpaket som finns tillgängligt på NPM.
Observera att adapterpaketet måste installeras på samma plats där WebdriverIO är installerat.
Så om du installerade WebdriverIO globalt, se till att även installera adapterpaketet globalt.
:::

Genom att integrera WebdriverIO med ett testramverk kan du komma åt WebDriver-instansen via den globala variabeln `browser`
i dina spec-filer eller stegdefinitioner.
Observera att WebdriverIO även tar hand om att skapa och avsluta Selenium-sessionen, så du behöver inte göra det
själv.

## Använda Mocha

Installera först adapterpaketet från NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Som standard tillhandahåller WebdriverIO ett inbyggt [assertionsbibliotek](assertion) som du kan börja använda direkt:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 levereras med [Mocha 12](https://mochajs.org/) och stöder Mochas `BDD`- (standard), `TDD`- och `QUnit`-[gränssnitt](https://mochajs.org/#interfaces).

Om du vill skriva dina specs i TDD-stil, sätt egenskapen `ui` i din `mochaOpts`-konfiguration till `tdd`. Nu ska dina testfiler skrivas så här:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Om du vill definiera andra Mocha-specifika inställningar kan du göra det med nyckeln `mochaOpts` i din konfigurationsfil. En lista över alla alternativ finns på [Mocha-projektets webbplats](https://mochajs.org/api/mocha).

__Obs:__ WebdriverIO stöder inte den föråldrade användningen av `done`-callbacks i Mocha:

```js
it('should test something', (done) => {
    done() // throws "done is not a function"
})
```

### Mocha-alternativ

Följande alternativ kan användas i din `wdio.conf.js` för att konfigurera din Mocha-miljö. __Obs:__ inte alla Mocha-alternativ stöds. `parallel` tillhör fortfarande Mochas egen worker-pool och ger ett fel här — WDIO-testrunnern parallelliserar redan specs över capabilities och workers. Mocha 12:s CLI har också gått över från yargs till Nodes `util.parseArgs`; det påverkar endast ett direkt `mocha`-anrop, inte `mochaOpts` som skickas via `wdio`. Du kan skicka dessa ramverksalternativ som argument, t.ex.:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Detta skickar vidare följande Mocha-alternativ:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Följande Mocha-alternativ stöds:

#### require

<Option type="string|string[]" default="[]">

Alternativet `require` är användbart när du vill lägga till eller utöka grundläggande funktionalitet (WebdriverIO-ramverksalternativ).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

Sprid ofångade fel vidare.

</Option>

#### bail

<Option type="boolean" default="false">

Avbryt efter första misslyckade testet.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

Kontrollera läckor av globala variabler.

</Option>

#### delay

<Option type="boolean" default="false">

Fördröj körningen av rotsviten.

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

Rapportera varje test som hoppats över på grund av en misslyckad `before`- eller `beforeEach`-hook som ett misslyckande. WebdriverIO aktiverar detta så att en trasig setup-hook syns på varje spec som den hoppade över. Sätt det till `false` för att endast rapportera hooken.

</Option>

#### fgrep

<Option type="string" default="null">

Testfilter baserat på given sträng.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

Tester markerade med `only` gör att sviten misslyckas.

</Option>

#### forbidPending

<Option type="boolean" default="false">

Väntande tester gör att sviten misslyckas.

</Option>

#### fullTrace

<Option type="boolean" default="false">

Fullständig stacktrace vid misslyckande.

</Option>

#### global

<Option type="string[]" default="[]">

Variabler som förväntas finnas i globalt scope.

</Option>

#### grep

<Option type="RegExp|string" default="null">

Testfilter baserat på givet reguljärt uttryck. Mocha 12 accepterar moderna RegExp-flaggor i detta filter (till exempel `s` eller `d`).

</Option>

#### invert

<Option type="boolean" default="false">

Invertera träffar i testfiltret.

</Option>

#### retries

<Option type="number" default="0">

Antal gånger misslyckade tester ska köras om.

</Option>

#### timeout

<Option type="number" default="30000">

Tröskelvärde för timeout (i ms).

</Option>

## Använda Jasmine

Installera först adapterpaketet från NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Du kan sedan konfigurera din Jasmine-miljö genom att ange egenskapen `jasmineOpts` i din konfiguration. En lista över alla alternativ finns på [Jasmine-projektets webbplats](https://jasmine.github.io/api/edge/Configuration.html).

### Jasmine-alternativ

Följande alternativ kan användas i din `wdio.conf.js` för att konfigurera din Jasmine-miljö med egenskapen `jasmineOpts`. Mer information om dessa konfigurationsalternativ finns i [Jasmine-dokumentationen](https://jasmine.github.io/api/edge/Configuration). Du kan skicka dessa ramverksalternativ som argument, t.ex.:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Detta skickar vidare följande Jasmine-alternativ:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

Följande Jasmine-alternativ stöds:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Standardintervall för timeout för Jasmine-operationer.

</Option>

#### helpers

<Option type="string[]" default="[]">

Array med filsökvägar (och globs) relativa till spec_dir som ska inkluderas före Jasmine-specs.

</Option>

#### requires

<Option type="string[]" default="[]">

Alternativet `requires` är användbart när du vill lägga till eller utöka grundläggande funktionalitet.

</Option>

#### random

<Option type="boolean" default="false">

Om körningsordningen för specs ska slumpas. Jasmines egen standard är `true`, men WebdriverIO kör specs i ordning om du inte anger detta alternativ.

</Option>

#### seed

<Option type="Function" default="null">

Seed som används som grund för slumpningen. Null gör att seeden bestäms slumpmässigt vid körningens start.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

Om en spec ska misslyckas om den inte körde några förväntningar. Som standard rapporteras en spec som inte körde några förväntningar som godkänd. Om detta sätts till true rapporteras en sådan spec som ett misslyckande.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

Stoppa en spec vid dess första misslyckade förväntning. En misslyckad synkron matcher stoppar specen omedelbart, och en awaitad asynkron matcher stoppar den när dess promise avgörs. Övriga specs fortsätter att köras.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

Funktion som används för att filtrera specs.

</Option>

#### grep

<Option type="string|Regexp" default="null">

Kör endast tester som matchar denna sträng eller detta reguljära uttryck. (Gäller endast om ingen anpassad `specFilter`-funktion är angiven)

</Option>

#### invertGrep

<Option type="boolean" default="false">

Om true inverteras de matchande testerna och endast tester som inte matchar uttrycket i `grep` körs. (Gäller endast om ingen anpassad `specFilter`-funktion är angiven)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

Stoppa spec-filen vid dess första misslyckade spec (`it`): övriga specs i filen körs inte, inte heller i andra `describe`-block. Andra spec-filer körs i sina egna workers och fortsätter.

</Option>

#### cleanStack

<Option type="boolean" default="true">

Ta bort raderna från `node_modules`-paket ur stacktraces vid misslyckanden.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

Anropas med `(passed, assertion)` för varje förväntning, till exempel för att ta en skärmdump när en förväntning misslyckas. Om funktionen kastar ett fel för en godkänd förväntning misslyckas förväntningen med det felet.

</Option>

### Assertions

Med Jasmine kombinerar den globala `expect` Jasmines matchers och [WebdriverIO-matchers](/docs/api/expect-webdriverio):

- Jasmines matchers (`toBe`, `toEqual`, `toHaveBeenCalled`, …) och de matchers som du lägger till med `jasmine.addMatchers` är synkrona. De returnerar `undefined`, så du behöver inte `await`.
- WebdriverIO-matchers, Jasmines asynkrona matchers (`toBeResolved`, `toBeRejectedWith`, …) och de matchers som du lägger till med `jasmine.addAsyncMatchers` returnerar ett promise. Använd alltid `await` med dem.

Använd `expect()` för båda typerna: den skickar varje matcher till Jasmines `expect` eller `expectAsync` åt dig. `await expectAsync($('#logo')).toBeDisplayed()` fungerar också. För TypeScript ger `@wdio/jasmine-framework` i `types` även `expectAsync()` WebdriverIO-matchers.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, sync
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, async
    await expect(loadData()).toBeResolved()                        // Jasmine async matcher
})
```

`toHaveSize` finns i båda biblioteken. WebdriverIO-matchern körs på WebdriverIO-värden: ett element, en elementarray eller `Element[]` (till exempel resultatet av `$$().filter()`), ett multi-remote-element, en browser, en browsing context, en mock, `some()`-wrappern eller ett promise som en kedjebar `$()`. Jasmines matcher körs på alla andra värden.

De asymmetriska matchers från båda biblioteken fungerar, både i Jasmine- och i WebdriverIO-matchers: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … och `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …. För att använda `some()`, importera den:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

Jest-delarna av `expect` är inte tillgängliga med Jasmine: Jest-specifika matchers som `toStrictEqual` eller `toHaveLength`, samt `expect.soft()`. För att lägga till en anpassad matcher, använd `expect.extend()` i en spec-fil eller i `before`-hooken (se [Custom Matchers](/docs/custommatchers)), eller `jasmine.addMatchers` för en synkron matcher och `jasmine.addAsyncMatchers` för en asynkron matcher.

För TypeScript, lägg till `jasmine` i `types`, se [TypeScript Setup](/docs/typescript).

## Använda Cucumber

Installera först adapterpaketet från NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Om du vill använda Cucumber, sätt egenskapen `framework` till `cucumber` genom att lägga till `framework: 'cucumber'` i [konfigurationsfilen](configurationfile).

Alternativ för Cucumber kan anges i konfigurationsfilen med `cucumberOpts`. Se hela listan med alternativ [här](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). Adaptern använder Cucumber 13. `tagExpression` har tagits bort; filtrera med `tags`. Se [migreringsguiden för v10](v10-migration#cucumber).

För att snabbt komma igång med Cucumber, ta en titt på vårt [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate)-projekt som innehåller alla stegdefinitioner du behöver för att komma igång, så att du kan börja skriva feature-filer direkt.

### Cucumber-alternativ

Följande alternativ kan användas i din `wdio.conf.js` för att konfigurera din Cucumber-miljö med egenskapen `cucumberOpts`:

:::tip Justera alternativ via kommandoraden
`cucumberOpts`, såsom anpassade `tags` för att filtrera tester, kan anges via kommandoraden. Detta görs med formatet `cucumberOpts.{optionName}="value"`.

Om du till exempel endast vill köra de tester som är taggade med `@smoke` kan du använda följande kommando:

```sh
# When you only want to run tests that hold the tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Detta kommando sätter alternativet `tags` i `cucumberOpts` till `@smoke`, vilket säkerställer att endast tester med denna tagg körs.

:::

#### backtrace

<Option type="Boolean" default="true">

Visa fullständig backtrace för fel.

</Option>

#### requireModule

<Option type="string[]" default="[]">

Ladda moduler med require innan några supportfiler laddas.

</Option>
Exempel:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // or
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast

<Option type="boolean" default="false">

Avbryt körningen vid första misslyckandet.

</Option>

#### name

<Option type="RegExp[]" default="[]">

Kör endast scenarier vars namn matchar uttrycket (upprepningsbar).

</Option>

#### require

<Option type="string[]" default="[]">

Ladda filer som innehåller dina stegdefinitioner innan features körs. Du kan även ange en glob till dina stegdefinitioner.

</Option>
Exempel:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

Sökvägar till var din supportkod finns, för ESM.

</Option>
Exempel:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

Misslyckas om det finns odefinierade eller väntande steg.

</Option>

#### tags

<Option type="String" default="">

Kör endast features eller scenarier med taggar som matchar uttrycket.
Se [Cucumber-dokumentationen](https://docs.cucumber.io/cucumber/api/#tag-expressions) för mer information.

</Option>

#### timeout

<Option type="Number" default="30000">

Timeout i millisekunder för stegdefinitioner.

</Option>

#### retry

<Option type="Number" default="0">

Ange antalet gånger misslyckade testfall ska köras om.

</Option>

#### retryTagFilter

<Option type="RegExp">

Kör endast om features eller scenarier med taggar som matchar uttrycket (upprepningsbar). Detta alternativ kräver att '--retry' anges.

</Option>

#### language

<Option type="String" default="en">

Standardspråk för dina feature-filer

</Option>

#### order

<Option type="String" default="defined">

Kör tester i definierad / slumpmässig ordning

</Option>

#### format

<Option type="string[]">

Namn och sökväg till utdatafil för den formatterare som ska användas.
WebdriverIO stöder i första hand endast de [Formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) som skriver utdata till en fil.

</Option>

#### formatOptions

<Option type="object">

Alternativ som ska skickas till formatterare

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

Lägg till cucumber-taggar i feature- eller scenarionamnet

</Option>
***Observera att detta är ett alternativ specifikt för @wdio/cucumber-framework och känns inte igen av cucumber-js självt***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

Behandla odefinierade definitioner som varningar.

</Option>
***Observera att detta är ett alternativ specifikt för @wdio/cucumber-framework och känns inte igen av cucumber-js självt***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

Behandla tvetydiga definitioner som fel.

</Option>
***Observera att detta är ett alternativ specifikt för @wdio/cucumber-framework och känns inte igen av cucumber-js självt***<br/>

#### profile

<Option type="string[]" default="[]">

Ange vilken profil som ska användas.

</Option>
***Observera att endast specifika värden (worldParameters, name, retryTagFilter) stöds i profiler, eftersom `cucumberOpts` har företräde. Se dessutom till att de nämnda värdena inte deklareras i `cucumberOpts` när du använder en profil.***

### Hoppa över tester i cucumber

Observera att om du vill hoppa över ett test med hjälp av de vanliga filtreringsmöjligheterna för cucumber-tester som finns i `cucumberOpts`, gör du det för alla webbläsare och enheter som är konfigurerade i capabilities. För att kunna hoppa över scenarier endast för specifika kombinationer av capabilities utan att starta en session i onödan tillhandahåller webdriverio följande specifika taggsyntax för cucumber:

`@skip([condition])`

där condition är en valfri kombination av capabilities-egenskaper med deras värden som, när **alla** matchar, gör att det taggade scenariot eller featuren hoppas över. Du kan naturligtvis lägga till flera taggar på scenarier och features för att hoppa över tester under flera olika villkor.

Du kan också använda annoteringen '@skip' för att hoppa över tester utan att ändra `tags`. I detta fall visas de överhoppade testerna i testrapporten.

Här är några exempel på denna syntax:
- `@skip` eller `@skip()`: hoppar alltid över det taggade objektet
- `@skip(browserName="chrome")`: testet körs inte mot chrome-webbläsare.
- `@skip(browserName="firefox";platformName="linux")`: hoppar över testet vid körningar i firefox på linux.
- `@skip(browserName=["chrome","firefox"])`: taggade objekt hoppas över för både chrome- och firefox-webbläsare.
- `@skip(browserName=/i.*explorer/)`: capabilities med webbläsare som matchar det reguljära uttrycket hoppas över (som `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importera hjälpfunktioner för stegdefinitioner

För att använda hjälpfunktioner för stegdefinitioner som `Given`, `When` eller `Then` eller hooks ska du importera dem från `@cucumber/cucumber`, t.ex. så här:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Om du redan använder Cucumber för andra typer av tester som inte är relaterade till WebdriverIO, och för vilka du använder en specifik version, behöver du importera dessa hjälpfunktioner i dina e2e-tester från WebdriverIO:s Cucumber-paket, t.ex.:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Detta säkerställer att du använder rätt hjälpfunktioner inom WebdriverIO-ramverket och gör det möjligt att använda en oberoende Cucumber-version för andra typer av tester.

### Publicera rapport

Cucumber har en funktion för att publicera dina testkörningsrapporter till `https://reports.cucumber.io/`, vilket kan styras antingen genom att sätta flaggan `publish` i `cucumberOpts` eller genom att konfigurera miljövariabeln `CUCUMBER_PUBLISH_TOKEN`. När du använder `WebdriverIO` för testkörning finns det dock en begränsning med detta tillvägagångssätt. Rapporterna uppdateras separat för varje feature-fil, vilket gör det svårt att se en samlad rapport.

För att komma runt denna begränsning har vi introducerat en promise-baserad metod som heter `publishCucumberReport` i `@wdio/cucumber-framework`. Denna metod ska anropas i `onComplete`-hooken, som är den bästa platsen att anropa den på. `publishCucumberReport` kräver att du anger rapportkatalogen där cucumber message-rapporterna lagras.

Du kan generera `cucumber message`-rapporter genom att konfigurera alternativet `format` i dina `cucumberOpts`. Det rekommenderas starkt att ange ett dynamiskt filnamn i formatalternativet för `cucumber message` för att förhindra att rapporter skrivs över och säkerställa att varje testkörning registreras korrekt.

Innan du använder denna funktion, se till att ange följande miljövariabler:
- CUCUMBER_PUBLISH_REPORT_URL: URL:en dit du vill publicera Cucumber-rapporten. Om den inte anges används standard-URL:en 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Den auktoriseringstoken som krävs för att publicera rapporten. Om denna token inte är angiven avslutas funktionen utan att publicera rapporten.

Här är ett exempel på nödvändiga konfigurationer och kodexempel för implementeringen:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Other Configuration Options
    cucumberOpts: {
        // ... Cucumber Options Configuration
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Observera att `./reports/` är katalogen där `cucumber message`-rapporterna kommer att lagras.

## Använda Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) är ett open source-ramverk som är utformat för att göra acceptans- och regressionstestning av komplexa mjukvarusystem snabbare, mer samarbetsinriktad och enklare att skala.

För WebdriverIO-testsviter erbjuder Serenity/JS:
- [Förbättrad rapportering](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Du kan använda Serenity/JS
  som en direkt ersättning för vilket inbyggt WebdriverIO-ramverk som helst för att skapa djupgående rapporter över testkörningar och levande dokumentation av ditt projekt.
- [Screenplay Pattern-API:er](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - För att göra din testkod portabel och återanvändbar mellan projekt och team
  ger Serenity/JS dig ett valfritt [abstraktionslager](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) ovanpå de inbyggda WebdriverIO-API:erna.
- [Integrationsbibliotek](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - För testsviter som följer Screenplay Pattern
  tillhandahåller Serenity/JS även valfria integrationsbibliotek som hjälper dig att skriva [API-tester](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [hantera lokala servrar](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [utföra assertions](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) och mycket mer!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Installera Serenity/JS

För att lägga till Serenity/JS i ett [befintligt WebdriverIO-projekt](https://webdriver.io/docs/gettingstarted), installera följande Serenity/JS-moduler från NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Läs mer om Serenity/JS-modulerna:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Konfigurera Serenity/JS

För att aktivera integrationen med Serenity/JS, konfigurera WebdriverIO enligt följande:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Säg till WebdriverIO att använda Serenity/JS-ramverket
    framework: '@serenity-js/webdriverio',

    // Serenity/JS-konfiguration
    serenity: {
        // Konfigurera Serenity/JS att använda rätt adapter för din testrunner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registrera Serenity/JS rapporteringstjänster, även kallade "stage crew"
        crew: [
            // Valfritt, skriv ut testkörningsresultat till standard output
            '@serenity-js/console-reporter',

            // Valfritt, skapa Serenity BDD-rapporter och levande dokumentation (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Valfritt, ta automatiskt skärmdumpar när en interaktion misslyckas
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Konfigurera din Cucumber-runner
    cucumberOpts: {
        // se Cucumber-konfigurationsalternativ nedan
    },

    // ... eller Jasmine-runner
    jasmineOpts: {
        // se Jasmine-konfigurationsalternativ nedan
    },

    // ... eller Mocha-runner
    mochaOpts: {
        // se Mocha-konfigurationsalternativ nedan
    },

    runner: 'local',

    // Övrig WebdriverIO-konfiguration
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Säg till WebdriverIO att använda Serenity/JS-ramverket
    framework: '@serenity-js/webdriverio',

    // Serenity/JS-konfiguration
    serenity: {
        // Konfigurera Serenity/JS att använda rätt adapter för din testrunner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registrera Serenity/JS rapporteringstjänster, även kallade "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Konfigurera din Cucumber-runner
    cucumberOpts: {
        // se Cucumber-konfigurationsalternativ nedan
    },

    // ... eller Jasmine-runner
    jasmineOpts: {
        // se Jasmine-konfigurationsalternativ nedan
    },

    // ... eller Mocha-runner
    mochaOpts: {
        // se Mocha-konfigurationsalternativ nedan
    },

    runner: 'local',

    // Övrig WebdriverIO-konfiguration
};
```

</TabItem>
</Tabs>

Läs mer om:
- [Serenity/JS Cucumber-konfigurationsalternativ](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Jasmine-konfigurationsalternativ](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Mocha-konfigurationsalternativ](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO-konfigurationsfil](configurationfile)

### Skapa Serenity BDD-rapporter och levande dokumentation

[Serenity BDD-rapporter och levande dokumentation](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) genereras av [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
ett Java-program som laddas ner och hanteras av modulen [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

För att skapa Serenity BDD-rapporter måste din testsvit:
- ladda ner Serenity BDD CLI genom att anropa `serenity-bdd update`, som cachar CLI-`jar`-filen lokalt
- skapa mellanliggande Serenity BDD `.json`-rapporter genom att registrera [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) enligt [konfigurationsinstruktionerna](#configuring-serenityjs)
- anropa Serenity BDD CLI när du vill skapa rapporten, genom att anropa `serenity-bdd run`

Mönstret som används av alla [Serenity/JS-projektmallar](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) bygger
på att använda:
- ett [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order)-NPM-skript för att ladda ner Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) för att köra rapporteringsprocessen även om själva testsviten har misslyckats (vilket är precis när du behöver testrapporter som mest...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) som ett bekvämt sätt att ta bort eventuella testrapporter som blivit kvar från föregående körning

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

För att lära dig mer om `SerenityBDDReporter`, se:
- installationsinstruktioner i [`@serenity-js/serenity-bdd`-dokumentationen](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- konfigurationsexempel i [`SerenityBDDReporter` API-dokumentationen](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- [Serenity/JS-exempel på GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Använda Serenity/JS Screenplay Pattern-API:er

[Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) är ett innovativt, användarcentrerat tillvägagångssätt för att skriva automatiserade acceptanstester av hög kvalitet. Det leder dig mot en effektiv användning av abstraktionslager,
hjälper dina testscenarier att fånga affärsterminologin i din domän och uppmuntrar goda vanor inom testning och mjukvaruutveckling i ditt team.

När du registrerar `@serenity-js/webdriverio` som ditt WebdriverIO-`framework`
konfigurerar Serenity/JS som standard en [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) av [actors](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
där varje actor kan:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Detta bör räcka för att hjälpa dig komma igång med att införa testscenarier som följer Screenplay Pattern, även i en befintlig testsvit, till exempel:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

För att lära dig mer om Screenplay Pattern, se:
- [The Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Webbtestning med Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)