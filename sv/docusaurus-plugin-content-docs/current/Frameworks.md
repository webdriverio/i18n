---
id: frameworks
title: Ramverk
---

WebdriverIO Runner har inbyggt stöd för [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/), och [Cucumber.js](https://cucumber.io/). Du kan också integrera det med tredjepartsramverk från öppen källkod, såsom [Serenity/JS](#using-serenityjs).

:::tip Integrera WebdriverIO med testramverk
För att integrera WebdriverIO med ett testramverk behöver du ett adapterpaket som finns tillgängligt på NPM.
Observera att adapterpaketet måste installeras på samma plats där WebdriverIO är installerat.
Så om du har installerat WebdriverIO globalt, se till att installera adapterpaketet globalt också.
:::

Integrering av WebdriverIO med ett testramverk låter dig komma åt WebDriver-instansen med hjälp av den globala `browser`-variabeln
i dina specfiler eller stegdefinitioner.
Observera att WebdriverIO också tar hand om att instansiera och avsluta Selenium-sessionen, så du behöver inte göra det
själv.

## Använda Mocha

Först, installera adapterpaketet från NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Som standard tillhandahåller WebdriverIO ett [påståendebibliotek](assertion) som är inbyggt som du kan börja använda direkt:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO stöder Mochas `BDD` (standard), `TDD`, och `QUnit` [gränssnitt](https://mochajs.org/#interfaces).

Om du vill skriva dina specifikationer i TDD-stil, ställ in `ui`-egenskapen i din `mochaOpts`-konfiguration till `tdd`. Nu bör dina testfiler skrivas så här:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Om du vill definiera andra Mocha-specifika inställningar kan du göra det med `mochaOpts`-nyckeln i din konfigurationsfil. En lista över alla alternativ finns på [Mocha-projektets webbplats](https://mochajs.org/api/mocha).

__Obs:__ WebdriverIO stöder inte den föråldrade användningen av `done`-callbacks i Mocha:

```js
it('should test something', (done) => {
    done() // kastar "done is not a function"
})
```

### Mocha-alternativ

Följande alternativ kan tillämpas i din `wdio.conf.js` för att konfigurera din Mocha-miljö. __Obs:__ inte alla alternativ stöds, t.ex. kommer tillämpning av alternativet `parallel` att orsaka ett fel eftersom WDIO-testrunnern har sitt eget sätt att köra tester parallellt. Du kan skicka dessa ramverksalternativ som argument, t.ex.:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Detta kommer att skicka vidare följande Mocha-alternativ:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Följande Mocha-alternativ stöds:

#### require
Alternativet `require` är användbart när du vill lägga till eller utöka vissa grundläggande funktioner (WebdriverIO-ramverksalternativ).

Typ: `string|string[]`<br />
Standard: `[]`

#### compilers
Använd de angivna modulerna för att kompilera filer. Kompilatorerna kommer att inkluderas före krav (WebdriverIO-ramverksalternativ).

Typ: `string[]`<br />
Standard: `[]`

#### allowUncaught
Sprid ohanterade fel.

Typ: `boolean`<br />
Standard: `false`

#### bail
Avsluta efter första testmisslyckandet.

Typ: `boolean`<br />
Standard: `false`

#### checkLeaks
Kontrollera efter globala variabelläckor.

Typ: `boolean`<br />
Standard: `false`

#### delay
Fördröj exekvering av rot-suite.

Typ: `boolean`<br />
Standard: `false`

#### fgrep
Testfilter given sträng.

Typ: `string`<br />
Standard: `null`

#### forbidOnly
Tester markerade med `only` misslyckas i sviten.

Typ: `boolean`<br />
Standard: `false`

#### forbidPending
Väntande tester misslyckas i sviten.

Typ: `boolean`<br />
Standard: `false`

#### fullTrace
Full stackspårning vid misslyckande.

Typ: `boolean`<br />
Standard: `false`

#### global
Variabler som förväntas i globalt scope.

Typ: `string[]`<br />
Standard: `[]`

#### grep
Testfilter given reguljärt uttryck.

Typ: `RegExp|string`<br />
Standard: `null`

#### invert
Invertera testfiltermatchningar.

Typ: `boolean`<br />
Standard: `false`

#### retries
Antal gånger att återförsöka misslyckade tester.

Typ: `number`<br />
Standard: `0`

#### timeout
Tidsgränsvärde (i ms).

Typ: `number`<br />
Standard: `30000`

## Använda Jasmine

Först, installera adapterpaketet från NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Du kan sedan konfigurera din Jasmine-miljö genom att ställa in en `jasmineOpts`-egenskap i din konfiguration. En lista över alla alternativ finns på [Jasmine-projektets webbplats](https://jasmine.github.io/api/3.5/Configuration.html).

### Jasmine-alternativ

Följande alternativ kan tillämpas i din `wdio.conf.js` för att konfigurera din Jasmine-miljö med hjälp av `jasmineOpts`-egenskapen. För mer information om dessa konfigurationsalternativ, kolla [Jasmine-dokumentationen](https://jasmine.github.io/api/edge/Configuration). Du kan skicka dessa ramverksalternativ som argument, t.ex.:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Detta kommer att skicka vidare följande Mocha-alternativ:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Följande Jasmine-alternativ stöds:

#### defaultTimeoutInterval
Standard tidsgräns för Jasmine-operationer.

Typ: `number`<br />
Standard: `60000`

#### helpers
Array med filsökvägar (och glob-mönster) relativt till spec_dir att inkludera före jasmine specs.

Typ: `string[]`<br />
Standard: `[]`

#### requires
Alternativet `requires` är användbart när du vill lägga till eller utöka viss grundläggande funktionalitet.

Typ: `string[]`<br />
Standard: `[]`

#### random
Huruvida testexekveringsordningen ska randomiseras.

Typ: `boolean`<br />
Standard: `true`

#### seed
Frö att använda som bas för randomisering. Null gör att fröet bestäms slumpmässigt vid början av exekveringen.

Typ: `Function`<br />
Standard: `null`

#### failSpecWithNoExpectations
Huruvida testet ska misslyckas om det inte körde några förväntningar. Som standard rapporteras ett test som körde utan förväntningar som godkänt. Genom att ställa in detta till true rapporteras sådana test som misslyckade.

Typ: `boolean`<br />
Standard: `false`

#### oneFailurePerSpec
Huruvida test endast ska ha ett förväntningsfel.

Typ: `boolean`<br />
Standard: `false`

#### specFilter
Funktion att använda för att filtrera tester.

Typ: `Function`<br />
Standard: `(spec) => true`

#### grep
Kör endast tester som matchar denna sträng eller reguljärt uttryck. (Endast tillämpligt om ingen anpassad `specFilter`-funktion är inställd)

Typ: `string|Regexp`<br />
Standard: `null`

#### invertGrep
Om true inverterar det matchande tester och kör endast tester som inte matchar med uttrycket som används i `grep`. (Endast tillämpligt om ingen anpassad `specFilter`-funktion är inställd)

Typ: `boolean`<br />
Standard: `false`

## Använda Cucumber

Först, installera adapterpaketet från NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Om du vill använda Cucumber, ställ in `framework`-egenskapen till `cucumber` genom att lägga till `framework: 'cucumber'` i [konfigurationsfilen](configurationfile).

Alternativ för Cucumber kan anges i konfigurationsfilen med `cucumberOpts`. Kolla in hela listan med alternativ [här](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

För att snabbt komma igång med Cucumber, ta en titt på vårt [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) projekt som kommer med alla stegdefinitioner du behöver för att komma igång, och du kan börja skriva funktionsfiler direkt.

### Cucumber-alternativ

Följande alternativ kan tillämpas i din `wdio.conf.js` för att konfigurera din Cucumber-miljö med hjälp av `cucumberOpts`-egenskapen:

:::tip Justera alternativ via kommandoraden
`cucumberOpts`, såsom anpassade `tags` för filtrering av tester, kan anges via kommandoraden. Detta görs genom att använda formatet `cucumberOpts.{optionName}="value"`.

Till exempel, om du bara vill köra de tester som är taggade med `@smoke`, kan du använda följande kommando:

```sh
# När du bara vill köra tester som har taggen "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Detta kommando ställer in alternativet `tags` i `cucumberOpts` till `@smoke`, vilket säkerställer att endast tester med denna tagg körs.

:::

#### backtrace
Visa full backtrace för fel.

Typ: `Boolean`<br />
Standard: `true`

#### requireModule
Kräv moduler innan du kräver supportfiler.

Typ: `string[]`<br />
Standard: `[]`<br />
Exempel:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // eller
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
Avbryt körningen vid första fel.

Typ: `boolean`<br />
Standard: `false`

#### name
Kör endast de scenarier vars namn matchar uttrycket (upprepningsbart).

Typ: `RegExp[]`<br />
Standard: `[]`

#### require
Kräv filer som innehåller dina stegdefinitioner innan du kör funktioner. Du kan också ange en glob för dina stegdefinitioner.

Typ: `string[]`<br />
Standard: `[]`
Exempel:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Sökvägar till var din supportkod finns, för ESM.

Typ: `String[]`<br />
Standard: `[]`
Exempel:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Misslyckas om det finns några odefinierade eller väntande steg.

Typ: `boolean`<br />
Standard: `false`

#### tags
Kör endast de funktioner eller scenarier med taggar som matchar uttrycket.
Se [Cucumber-dokumentationen](https://docs.cucumber.io/cucumber/api/#tag-expressions) för mer detaljer.

Typ: `String`<br />
Standard: ``

#### timeout
Tidsgräns i millisekunder för stegdefinitioner.

Typ: `Number`<br />
Standard: `30000`

#### retry
Ange antalet gånger att återförsöka misslyckade testfall.

Typ: `Number`<br />
Standard: `0`

#### retryTagFilter
Återförsök endast funktioner eller scenarier med taggar som matchar uttrycket (upprepningsbart). Detta alternativ kräver att '--retry' anges.

Typ: `RegExp`

#### language
Standardspråk för dina funktionsfiler.

Typ: `String`<br />
Standard: `en`

#### order
Kör tester i definierad / slumpmässig ordning.

Typ: `String`<br />
Standard: `defined`

#### format
Namn och utdatafilsökväg för formatterare att använda.
WebdriverIO stöder främst endast de [Formatterare](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) som skriver utdata till en fil.

Typ: `string[]`<br />

#### formatOptions
Alternativ som ska tillhandahållas till formatterare.

Typ: `object`<br />

#### tagsInTitle
Lägg till cucumber-taggar till funktions- eller scenarionamn.

Typ: `Boolean`<br />
Standard: `false`

***Observera att detta är ett @wdio/cucumber-framework-specifikt alternativ och inte känns igen av cucumber-js själv***<br/>

#### ignoreUndefinedDefinitions
Behandla odefinierade definitioner som varningar.

Typ: `Boolean`<br />
Standard: `false`

***Observera att detta är ett @wdio/cucumber-framework-specifikt alternativ och inte känns igen av cucumber-js själv***<br/>

#### failAmbiguousDefinitions
Behandla tvetydiga definitioner som fel.

Typ: `Boolean`<br />
Standard: `false`

***Observera att detta är ett @wdio/cucumber-framework-specifikt alternativ och inte känns igen av cucumber-js själv***<br/>

#### tagExpression
Kör endast de funktioner eller scenarier med taggar som matchar uttrycket.
Se [Cucumber-dokumentationen](https://docs.cucumber.io/cucumber/api/#tag-expressions) för mer detaljer.

Typ: `String`<br />
Standard: ``

***Observera att detta alternativ kommer att föråldras i framtiden. Använd [`tags`](#tags)-konfigurationsegenskapen istället***

#### profile
Ange profilen som ska användas.

Typ: `string[]`<br />
Standard: `[]`

***Vänligen observera att endast specifika värden (worldParameters, name, retryTagFilter) stöds inom profiler, eftersom `cucumberOpts` har företräde. Se dessutom till att när du använder en profil, de nämnda värdena inte deklareras inom `cucumberOpts`.***

### Hoppa över tester i cucumber

Observera att om du vill hoppa över ett test med hjälp av vanliga cucumber-testfiltreringsfunktioner som finns tillgängliga i `cucumberOpts`, kommer du att göra det för alla webbläsare och enheter som konfigurerats i funktionerna. För att kunna hoppa över scenarier endast för specifika funktionskombinationer utan att ha en session startad om det inte är nödvändigt, tillhandahåller webdriverio följande specifika taggsyntax för cucumber:

`@skip([condition])`

där condition är en valfri kombination av funktionsegenskaper med deras värden som när **alla** matchas med orsak kommer det taggade scenariot eller funktionen att hoppas över. Självklart kan du lägga till flera taggar till scenarier och funktioner för att hoppa över tester under flera olika förhållanden.

Du kan också använda '@skip'-anteckningen för att hoppa över tester utan att ändra `tagExpression'. I detta fall kommer de hoppade testerna att visas i testrapporten.

Här har du några exempel på denna syntax:
- `@skip` eller `@skip()`: kommer alltid att hoppa över det taggade objektet
- `@skip(browserName="chrome")`: testet kommer inte att köras mot chrome-webbläsare.
- `@skip(browserName="firefox";platformName="linux")`: kommer att hoppa över testet i firefox över linux-körningar.
- `@skip(browserName=["chrome","firefox"])`: taggade objekt kommer att hoppas över för både chrome- och firefox-webbläsare.
- `@skip(browserName=/i.*explorer/)`: funktioner med webbläsare som matchar det reguljära uttrycket kommer att hoppas över (som `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importera stegdefinitionshjälpare

För att använda stegdefinitionshjälpare som `Given`, `When` eller `Then` eller hooks, måste du importera dem från `@cucumber/cucumber`, t.ex. så här:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Nu, om du redan använder Cucumber för andra typer av tester som inte är relaterade till WebdriverIO för vilka du använder en specifik version, måste du importera dessa hjälpare i dina e2e-tester från WebdriverIO Cucumber-paketet, t.ex.:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Detta säkerställer att du använder rätt hjälpare inom WebdriverIO-ramverket och låter dig använda en oberoende Cucumber-version för andra typer av testning.

### Publicera rapport

Cucumber tillhandahåller en funktion för att publicera dina testrapporter till `https://reports.cucumber.io/`, vilket kan styras antingen genom att ställa in flaggan `publish` i `cucumberOpts` eller genom att konfigurera miljövariabeln `CUCUMBER_PUBLISH_TOKEN`. När du använder `WebdriverIO` för testexekvering finns det dock en begränsning med denna metod. Den uppdaterar rapporterna separat för varje funktionsfil, vilket gör det svårt att se en samlad rapport.

För att övervinna denna begränsning har vi introducerat en löftesbaserad metod som kallas `publishCucumberReport` inom `@wdio/cucumber-framework`. Denna metod bör anropas i `onComplete`-hooken, vilket är den optimala platsen att anropa den. `publishCucumberReport` kräver inmatning av rapportkatalogen där cucumber-meddelanderapporter lagras.

Du kan generera `cucumber message`-rapporter genom att konfigurera alternativet `format` i dina `cucumberOpts`. Det rekommenderas starkt att tillhandahålla ett dynamiskt filnamn inom `cucumber message`-formatalternativet för att förhindra överskrivning av rapporter och säkerställa att varje testkörning registreras korrekt.

Innan du använder denna funktion, se till att ställa in följande miljövariabler:
- CUCUMBER_PUBLISH_REPORT_URL: URL:en där du vill publicera Cucumber-rapporten. Om den inte tillhandahålls kommer standard-URL:en 'https://messages.cucumber.io/api/reports' att användas.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Auktoriseringstoken som krävs för att publicera rapporten. Om denna token inte är inställd kommer funktionen att avslutas utan att publicera rapporten.

Här är ett exempel på de nödvändiga konfigurationerna och kodexemplen för implementering:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Andra konfigurationsalternativ
    cucumberOpts: {
        // ... Cucumber-alternativkonfiguration
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

Observera att `./reports/` är katalogen där `cucumber message`-rapporter kommer att lagras.

## Använda Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) är ett ramverk med öppen källkod utformat för att göra acceptans- och regressionstestning av komplexa programvarusystem snabbare, mer samarbetsinriktad och lättare att skala.

För WebdriverIO-testsviter erbjuder Serenity/JS:
- [Förbättrad rapportering](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Du kan använda Serenity/JS
  som en ersättning för vilket inbyggt WebdriverIO-ramverk som helst för att producera djupgående testexekveringsrapporter och levande dokumentation av ditt projekt.
- [Screenplay Pattern API:er](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - För att göra din testkod portabel och återanvändbar mellan projekt och team,
  ger Serenity/JS dig ett valfritt [abstraktionslager](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) ovanpå nativa WebdriverIO API:er.
- [Integrationsbibliotek](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - För testsviter som följer Screenplay Pattern,
  tillhandahåller Serenity/JS också valfria integrationsbibliotek för att hjälpa dig skriva [API-tester](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [hantera lokala servrar](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [utföra påståenden](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), och mer!

![Serenity BDD Rapportexempel](/img/serenity-bdd-reporter.png)

### Installera Serenity/JS

För att lägga till Serenity/JS till ett [befintligt WebdriverIO-projekt](https://webdriver.io/docs/gettingstarted), installera följande Serenity/JS-moduler från NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Lär dig mer om Serenity/JS-moduler:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Konfigurera Serenity/JS

För att aktivera integration med Serenity/JS, konfigurera WebdriverIO enligt följande:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Tala om för WebdriverIO att använda Serenity/JS ramverk
    framework: '@serenity-js/webdriverio',

    // Serenity/JS konfiguration
    serenity: {
        // Konfigurera Serenity/JS att använda lämplig adapter för din testrunner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registrera Serenity/JS rapporteringstjänster, även kallade "stage crew"
        crew: [
            // Valfritt, skriv ut testexekveringsresultat till standardutdata
            '@serenity-js/console-reporter',

            // Valfritt, producera Serenity BDD-rapporter och levande dokumentation (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Valfritt, ta automatiskt skärmdumpar vid interaktionsfel
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

    // Annan WebdriverIO-konfiguration
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Tala om för WebdriverIO att använda Serenity/JS ramverk
    framework: '@serenity-js/webdriverio',

    // Serenity/JS konfiguration
    serenity: {
        // Konfigurera Serenity/JS att använda lämplig adapter för din testrunner
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

    // Annan WebdriverIO-konfiguration
};
```

</TabItem>
</Tabs>

Lär dig mer om:
- [Serenity/JS Cucumber-konfigurationsalternativ](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Jasmine-konfigurationsalternativ](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Mocha-konfigurationsalternativ](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO-konfigurationsfil](configurationfile)

### Producera Serenity BDD-rapporter och levande dokumentation

[Serenity BDD-rapporter och levande dokumentation](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) genereras av [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
ett Java-program som laddas ner och hanteras av [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)-modulen.

För att producera Serenity BDD-rapporter måste din testsvit:
- ladda ner Serenity BDD CLI, genom att anropa `serenity-bdd update` som cachar CLI `jar` lokalt
- producera mellanliggande Serenity BDD `.json`-rapporter, genom att registrera [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) enligt [konfigurationsinstruktionerna](#configuring-serenityjs)
- anropa Serenity BDD CLI när du vill producera rapporten, genom att anropa `serenity-bdd run`

Mönstret som används av alla [Serenity/JS Project Templates](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) förlitar sig
på att använda:
- ett [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) NPM-script för att ladda ner Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) för att köra rapporteringsprocessen även om testsviten själv har misslyckats (vilket är precis när du behöver testrapporter som mest...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) som en bekvämlighetsmetod för att ta bort testrapporter som lämnats kvar från föregående körning

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
- konfigurationsexempel i [`SerenityBDDReporter` API-dokument](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- [Serenity/JS-exempel på GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Använda Serenity/JS Screenplay Pattern API:er

[Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) är en innovativ, användarcentrerad strategi för att skriva högkvalitativa automatiserade acceptanstester. Det styr dig mot en effektiv användning av abstraktionslager,
hjälper dina testscenarier att fånga affärsjargongen i din domän, och uppmuntrar till goda test- och mjukvaruutvecklingsvanor i ditt team.

Som standard, när du registrerar `@serenity-js/webdriverio` som ditt WebdriverIO `framework`,
konfigurerar Serenity/JS en standard[cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) av [actors](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
där varje skådespelare kan:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Detta bör vara tillräckligt för att hjälpa dig komma igång med att introducera testscenarier som följer Screenplay Pattern även till en befintlig testsvit, till exempel:

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

För att lära dig mer om Screenplay Pattern, kolla in:
- [The Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Web testing with Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)