---
id: v10-migration
title: Från v9 till v10
description: Uppdatera ett WebdriverIO v9-projekt till v10, inklusive alla brytande ändringar och en skill för kodagenter som tillämpar den här guiden.
---

Den här guiden samlar de brytande ändringarna i WebdriverIO `v10` och vad du behöver göra åt dem.

Till skillnad från tidigare huvudversioner kan de flesta av dessa ändringar inte tillämpas av WebdriverIO:s [codemod](https://github.com/webdriverio/codemod), eftersom de beror på vad dina tester faktiskt betyder. De [äldre kommandosignaturerna](#legacy-command-signatures) nedan är mekaniska ersättningar. Varje övrigt avsnitt beskriver hur du hittar de berörda ställena i din testsvit.

## Migrera med en kodagent {#migrate-with-a-coding-agent}

Ge din agent v10-migreringsskillen och be den migrera testsviten till WebdriverIO v10 enligt den här sidan. Skillen är proceduren: vad som ska sökas efter, vilken codemod som ska köras och när agenten ska stanna. Den här sidan är sanningskällan för varje brytande ändring.

Installera den från projektet du uppgraderar. [Skills-CLI:t](https://skills.sh) läser [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) från det här repositoryt och skriver den till skill-katalogen för de agenter du väljer:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` installerar den här skillen. Skills för arbete i WebdriverIO-repositoryt är markerade som interna och erbjuds inte. CLI:t frågar vilka agenter den ska installeras för och skriver skillen till varje agents projektkatalog. Du kan också bifoga den filen i chatten.

Strikta selektorer och listor med `specs` / `exclude` direkt i capabilities syns först när testsviten körs. Skillen kan inte avgöra dessa enbart utifrån källkoden.

## Node.js

WebdriverIO v10 kräver Node.js 22.19.0 eller senare. Node.js 18 och 20 stöds inte längre. CI täcker Node.js 22, 24 och 26.

## Komponenttester

Browser-runnern körs fortfarande i Chrome 90, Edge 90, Firefox 90 och Safari 14.1 eller nyare. Se [Webbläsarstöd](/docs/component-testing#browser-support).

Kod som skickas till `browser.execute` stannar på ES2021, så att den kan köras i äldre webbläsare som testas. Den nivån har inte ändrats.

## Mocha

`@wdio/mocha-framework` och `@wdio/browser-runner` är beroende av [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). Mocha 12 kräver Node.js `^20.19.0 || >=22.12.0`, vilket täcks av v10:s minimikrav 22.19.0.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` är borta. Mocha har tagit bort den sedan länge föråldrade flaggan `--compilers`, så kvarvarande kompilatormappningar ignoreras. Läs in transpilerare eller andra setup-filer med `mochaOpts.require`.

`failHookAffectedTests` har standardvärdet `true`. En misslyckad `before`- eller `beforeEach`-hook får de tester som hooken hoppade över att misslyckas. Sätt `mochaOpts.failHookAffectedTests` till `false` för att bara rapportera hooken.

Använd `expect-webdriverio` 8, se [expect-webdriverio 8](#expect-webdriverio-8). Mocha kan läsa in det paketet två gånger i samma process; det delar assertion-tillstånd mellan de kopiorna ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Ändringar i Mocha 12 som kan läcka igenom `mochaOpts`:

- `grep` accepterar moderna RegExp-flaggor.
- `ui` är fortfarande `bdd`, `tdd`, `qunit` eller `exports`. Anpassade gränssnitt bör behålla suffixet `*-bdd`, `*-tdd` eller `*-qunit`.
- `parallel` stöds fortfarande inte. WDIO äger spec-parallellismen; Mochas worker-pool ger ett fel om du aktiverar den.

Mocha 12 är ESM-först (`"type": "module"`). Programmatisk `require('mocha')` fungerar fortfarande på Node 22 via `require(esm)`. WDIO:s Mocha-CLI (`wdio run … --mochaOpts.*`) är oförändrat; Mochas eget CLI använder nu `util.parseArgs` i stället för yargs.

## Cucumber

`@wdio/cucumber-framework` är beroende av [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

Cucumber 13 kräver Node.js 22, 24 eller 26 eller senare. Det körs inte på Node.js 20, 23 eller 25. Framework-paketet deklarerar samma intervall, med början vid v10:s minimikrav 22.19.0.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` har inget alias. Att sätta det kastar ett fel, så att ett kvarglömt filter inte i tysthet kör alla scenarier.

Cucumber 13 exporterar inte längre `Cli`. Programmatiska körningar går genom `runCucumber` från `@cucumber/cucumber/api`, vilket adaptern redan använder.

Andra brytande ändringar i Cucumber 13 (tvetydiga formatter-sökvägar, parallella workers, `BeforeAll` / `AfterAll`) beskrivs i [Cucumbers uppgraderingsguide](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

## Jasmine

`@wdio/jasmine-framework` är beroende av [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). Jasmine 6 testas på Node.js 20, 22 och 24. v10:s minimikrav 22.19.0 täcker redan det intervallet.

`jasmineNodeOpts` har tagits bort. Konfigurera Jasmine med `jasmineOpts`. Att sätta `jasmineNodeOpts` kastar:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` läses inte längre. Använd `jasmineOpts.stopOnSpecFailure`. Ett kvarglömt `failFast` stoppar inte testsviten. Cucumbers `failFast` är ett annat alternativ och fungerar fortfarande.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` har tagits bort. Använd `jasmineOpts.oneFailurePerSpec`. Att sätta den gamla nyckeln kastar:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Jasmines synkrona matchers är synkrona igen. I v9 var den globala `expect` Jasmines `expectAsync`, så `expect(1).toBe(1)` returnerade ett promise. I v10 returnerar Jasmines inbyggda matchers och de matchers du lägger till med `jasmine.addMatchers` `undefined`. WebdriverIO-matchers, Jasmines asynkrona matchers och matchers från `jasmine.addAsyncMatchers` returnerar fortfarande ett promise, så fortsätt att använda `await` på dem. Du behöver inte ändra `await expect($('#logo')).toBeDisplayed()` till `expectAsync()`: den globala `expect` skickar WebdriverIO-matchers till `expectAsync` åt dig. `await expect(1).toBe(1)` fortsätter att fungera.

En misslyckad synkron assertion utan `await` får nu specen att misslyckas. I v9 var det ett avvisat promise: om ingenting väntade på det kunde specen passera, med bara en ohanterad rejection i loggen. Titta efter uppgraderingen på de specs som börjar misslyckas. De hade ett dolt fel i v9, och lösningen finns i testet eller i applikationen, inte i `expect`-anropet:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: passerade även när `onSave` inte anropades
    // v10: misslyckas när `onSave` inte anropades
    expect(onSave).toHaveBeenCalled()
})
```

Resultatet av en synkron matcher är nu `undefined`, så `.then()` eller `.catch()` på det kastar ett `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

Andra effekter av den här ändringen:

- `oneFailurePerSpec` stoppar nu specen vid dess första misslyckade assertion: omedelbart för en synkron matcher, och när promiset avgörs för en asynkron matcher som det väntas på.
- Jasmines spy-matchers fungerar utan `await`. I v9 misslyckades `toHaveBeenCalled`, `toHaveSpyInteractions` och `toHaveNoOtherSpyInteractions` med "Does not take arguments", och en spy som inte anropats passerade utan `await`.
- `jasmine.addMatchers` ersätts inte längre, så Jasmine visar inte längre sin varning "Monkey patching detected".

`toHaveSize` har två betydelser. På ett WebdriverIO-värde är det WebdriverIO-matchern och kontrollerar elementets storlek: ett element, en elementarray (inklusive resultatet av `$$().filter()`), en `Element[]`, ett multi-remote-element, en webbläsare, en browsing context, en mock, `some()`-wrappern eller ett promise som en kedjebar `$()`. På alla andra värden är det Jasmines matcher och kontrollerar längden. I v9 kördes alltid Jasmines matcher.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, synkron
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asynkron
```

Typerna följer samma regler. `@wdio/jasmine-framework` typar nu den globala `expect` med Jasmines matchers, plus WebdriverIO-matchers och Jasmines asynkrona matchers, som returnerar ett promise. Ta bort `expect-webdriverio/jasmine-wdio-expect-async` från `types` i din `tsconfig.json`, eftersom den typar alla matchers som asynkrona. Lägg till `jasmine` om det inte redan finns där:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` och `expect.multiRemote()` fungerar nu även i Jasmine-specs. Tidigare fanns de inte på Jasmines `expect` vid körning.

## expect-webdriverio 8 {#expect-webdriverio-8}

`@wdio/globals`, `@wdio/runner` och `@wdio/browser-runner` kräver `expect-webdriverio` 8 som peer dependency. I v9 var det `expect-webdriverio` 7. Om din `package.json` listar `expect-webdriverio`, uppdatera den till version 8 i samma ändring som `@wdio/*`-paketen.

`expect-webdriverio` 8 har sina egna brytande ändringar. Dess [migreringsguide från v7 till v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) listar varje ändring och dess ersättning. Dessa ändringar är de som mest sannolikt påverkar en testsvit:

- `toHaveText` på `$$()` jämför elementen index för index. En förväntad array i en annan ordning än på sidan misslyckas. Använd sidans ordning, `expect.oneOf()` eller `expect.arrayContaining()`.
- En array med förväntade värden på ett enskilt element får `toHaveText`, `toHaveHTML`, `toHaveComputedLabel` och `toHaveComputedRole` att misslyckas. Använd `expect.oneOf()`.
- `setFeatureFlags()` och alternativet `featureFlags` har tagits bort.
- Dessa föråldrade API:er har tagits bort: `setOptions` (använd `setDefaultOptions`), `getConfig` (använd `getDefaultOptions`), `matchers` (använd `wdioCustomMatchers`), `toHaveAttr` (använd `toHaveAttribute`), `toHaveClass` (använd `toHaveElementClass`), `toBeRequestedWithResponse()` (använd `toBeRequestedWith({ response })`) och `expect-webdriverio/types` (använd `expect-webdriverio/expect-global`).
- Hookarna `beforeAssertion` och `afterAssertion` får namnet på det alias som testet anropade, för `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` och `toBeRequested`. I v9 fick de namnet på matchern bakom aliaset, till exempel `toExist` för `toBeExisting`.
- På en multi-remote-webbläsare, ge resultatet av `$$()` till `expect`. En vanlig array som `[...elements]` eller `Array.from(elements)` känns inte igen som element, och assertionen misslyckas.

På en multi-remote-webbläsare kontrollerar en assertion varje instans, och `expect.multiRemote()` ger ett förväntat värde per instans. Se [Multiremote-assertions](/docs/multiremote#assertions).

## Multi-remote-global

Den gemena globalen `multiremotebrowser` har tagits bort, både från `@wdio/globals` och från globalerna i `eslint-plugin-wdio`. Använd `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

`specs` och `exclude` i capabilities läses inte längre. Använd `wdio:specs` och `wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

Konfigurationsnycklarna på toppnivå förblir `specs` och `exclude`. En kvarglömd lista utan prefix på en capability väljer inte filer för den capabilityn. Capabilityn använder då `specs` och `exclude` från toppnivån.

Aliasen `tunnelIdentifier` och `parentTunnel` har tagits bort från typerna för Sauce Labs-alternativ. Använd `tunnelName` och `tunnelOwner`.

## TypeScript

Typerna `Element`, `MultiRemoteBrowser` och `MultiRemoteElement` som exporterades av `webdriverio` har tagits bort. Använd den globala namnrymden `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` deklarerar nu `then`, och `ChainablePromiseArray` deklarerar `then`, `catch` och `finally`. De kedjebara typerna beskriver värdet före `await`. De passar inte längre det väntade värdet:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Typa det väntade värdet som `WebdriverIO.Element` eller `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Båda kedjebara typerna matchar nu `T extends PromiseLike<unknown>`. En villkorlig typ som kontrollerar `PromiseLike` tar en annan gren för `$()` och `$$()` än i v9. Till exempel är `Awaited<ChainablePromiseElement>` nu `WebdriverIO.Element`, och `Awaited<ChainablePromiseArray>` är `WebdriverIO.ElementArray`.

Egenskaperna hos en `$$()` som inte väntats på har bytt typ. De är tillgängliga direkt, innan frågan har lösts upp, så läs dem utan `await` eller `.then()`:

| Egenskap | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | föräldern, inte ett promise (se nedan) |
| `foundWith` | ingen | kommandot som hittade listan, t.ex. `$$` eller `custom$$` |
| `props` | ingen | de extra argumenten till det kommandot |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

På en kedjad fråga som `$('form').$$('input')` är `parent` den kedjebara `$('form')` tills listan har lösts upp, och det upplösta elementet därefter. Vänta på listan innan du använder `parent` som ett element.

Vid körning returnerar `filter()`, `filterSeries()` och `slice()` på en `$$()`-lista en elementlista, inte en vanlig array. Resultatet behåller `selector`, `foundWith`, `parent` och `props` från källistan. I v9 returnerade `filter()` en vanlig array utan dessa egenskaper. Typerna visar inte detta ännu: `filter()` och `filterSeries()` deklareras returnera `Promise<WebdriverIO.Element[]>`, och `slice()` returnerar `WebdriverIO.Element[]`, så TypeScript rapporterar ett fel när du läser dessa egenskaper på resultatet.

WebdriverIO kör inte frågan igen för själva den härledda listan: ett index bortom dess slut väntar inte på fler träffar, och det returnerar aldrig ett element som filtret uteslöt. Dess medlemmar är fortfarande elementen från källfrågan, med sina ursprungliga `selector` och `index`. Om en medlem blir inaktuell (stale) hämtar WebdriverIO den igen från källfrågan vid det indexet, vilket kan vara ett annat element om sidan har ändrats. Kod som kör om en listas fråga utifrån listans egenskaper, till exempel `parent[foundWith](selector, ...props)`, får hela listan, inte den filtrerade.

Publicerade paket sätter `typeScriptVersion` till 6.0.3, vilket motsvarar den TypeScript-version som det här repositoryt kompileras med.

`browser.mock()` accepterar `URLPattern` från `urlpattern-polyfill` och den inbyggda `URLPattern` (global i Node.js 24 och typad av `dom`-biblioteket i TypeScript 6).

TypeScript 6 markerar `"moduleResolution": "node"` och `"baseUrl"` som föråldrade och gör `strict` till standard. `create-wdio` genererar nu `"moduleResolution": "bundler"` för ESM-projekt och `"NodeNext"` för CommonJS-projekt. Om du uppdaterar TypeScript i ett befintligt projekt, ändra dessa alternativ i din `tsconfig.json`.

För ett ESM-projekt:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

För ett CommonJS-projekt, använd `NodeNext` för båda alternativen, som `create-wdio` gör:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 ändrar också standardvärdet för `types` till `[]`, så det läser inte längre in alla installerade `@types/*`-paket. Om din `tsconfig.json` saknar en `types`-lista misslyckas globaler som Mochas `describe` och `it` med `Cannot find name`. Lista de typpaket som dina tester använder, som `create-wdio` gör. Till exempel med Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` skriver `compilerOptions.target` och `compilerOptions.lib` som `es2024`. Typkontroll av den filen kräver TypeScript 5.7 eller nyare. `tsx`, som kör konfigurationen och testerna, gör ingen typkontroll, så en äldre kompilator spelar bara roll när du själv kör `tsc`.

En befintlig `tsconfig.json` skrivs inte om. En genererad konfiguration som utökar en annan konfiguration behåller förälderns `target` och `lib`.

I hooken `afterAssertion` är typen för `params.result` nu `{ pass, message }`, som matchers ger den. I v9 var typen `{ result, message }`, men `params.result.result` var alltid `undefined` vid körning. Läs `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` är `true` när värdet matchar det förväntade värdet, även med `.not`. Med `.not` passerar alltså assertionen när `pass` är `false`. Hooken talar inte om ifall testet använde `.not`.

## Reportrar

Webbläsarens `result`-händelse vidarebefordras till reportrar som `client:afterCommand`. Den payloaden och typen `AfterCommandArgs` har inte längre någon `name`-egenskap. Läs `command` i stället. Anpassade kommandon skickade redan `command`.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`addEnvironment(name, value)` i `@wdio/allure-reporter` har tagits bort. Den hade ingen effekt. Ange miljörader med [`reportedEnvironmentVars`](/docs/allure-reporter) i Allure-reporterns alternativ.

## `$` är strikt

`$` representerar nu __exakt ett__ element. Om selektorn matchar mer än ett element kastar kommandot ett `StrictSelectorError` i stället för att i tysthet använda den första träffen:

```js
// v9 — klickar på den första knappen, även om det finns 12
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

Detta motsvarar [Playwright-locators](https://playwright.dev/docs/locators#strictness). Cypress skiljer sig: dess frågor kan matcha flera element, och det är åtgärdskommandona som [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) som som standard avvisar ett subjekt med flera element. En selektor som i tysthet matchar flera element är nästan alltid en latent bugg: den passerar i dag och interagerar med fel element så snart någon lägger till en andra knapp på sidan.

Regeln gäller för varje steg i en kedja (`$('form').$('input')`) och för varje selektortyp som `$` accepterar — strängselektorer (inklusive sådana som tränger igenom shadow DOM), JS-funktioner, mobilselektorer och referenser till anpassade strategier.

### Vad som inte har ändrats

- `$$` returnerar fortfarande noll eller flera element. Sedan v10 är den listan en [`ElementArray`](/docs/api/browser/$$): en riktig array som du kan använda `await` på, med `for await` och asynkrona `map` / `filter` tillgängliga innan den har lösts upp. `await $$('button').length` är antalet. `$$('button').length > 0` är det inte, eftersom `length` är ett promise tills listan har lösts upp. `for (const el of $$('button'))` kastar tills du har väntat på listan; använd `for await`, eller `for...of` efter `await`.
- De dedikerade hjälpkommandona `custom$`, `shadow$` och `react$` är inte strikta — de returnerar fortfarande sin första träff, liksom sina `$$`-motsvarigheter.
- En selektor som inte matchar något returnerar fortfarande ett lat upplöst element, så `waitForExist` och [automatisk väntan](/docs/autowait) beter sig som tidigare.
- Att skicka in en elementreferens, t.ex. `$(await browser.getActiveElement())`, refererar alltid till en enda nod och kontrolleras aldrig.

### Hur du granskar din testsvit

Det finns ingen codemod för detta: bara du kan avgöra om en andra träff är en bugg eller avsiktlig. Två praktiska tillvägagångssätt:

1. __Kör din testsvit.__ Varje överträdelse kastar ett fel med selektorn och antalet träffar, vilket oftast räcker för att åtgärda den direkt.
2. __Kontrollera de breda selektorerna i förväg.__ För varje generisk `$(...)` i dina page objects, skriv ut hur många element den faktiskt matchar:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` är för bred
   ```

Smalna sedan antingen av selektorn — helst mot en användarorienterad fråga som `$('button=Submit')` eller `$('aria/Submit')`, se [Selektorer](/docs/selectors) — eller ange uttryckligen att du vill ha den första träffen:

```js
await $('button[type="submit"]').click()
// ...eller, om det verkligen är den första du menar
await $$('button')[0].click()
```

### Välja bort

För en enskild fråga:

```js
await $('button', { strict: false }).click()
```

För ett helt projekt, vilket återställer beteendet från v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

Ett element minns hur det efterfrågades, så att hämta det igen — efter en inaktuell elementreferens, eller via `waitForExist` — behåller striktheten från det ursprungliga anropet.

:::info

Under huven skickar en strikt `$` en `findElements`-förfrågan i stället för `findElement`, eftersom att räkna träffarna är det enda sättet att upprätthålla regeln. Det är en enda tur och retur i båda fallen, men det syns för anpassade tjänster och WebDriver-mockar som reagerar på kommandot `findElement`.

:::

## Äldre kommandosignaturer {#legacy-command-signatures}

v9 accepterade fortfarande äldre positionella former och varnade. v10 accepterar bara options-objektet.

v10:s [codemod](https://github.com/webdriverio/codemod) skriver om `addCommand` och `overwriteCommand` när det tredje argumentet är ett boolean, `getHTML(true)` och `getHTML(false)`, samt `getCookies` när filtret är en sträng eller en array med ett element. Ett `getCookies`-anrop med mer än ett namn lämnas oförändrat, eftersom ett filter matchar ett namn.

Installera codemoden först. WebdriverIO är inte beroende av den.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

Använd `--parser=tsx` för TypeScript-filer.

### `addCommand` och `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

Ett boolean som tredje argument är ett TypeScript-fel. Vid körning kastar det:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` och `instances` hör hemma i samma options-objekt. Utelämna det tredje argumentet för att koppla ett kommando till webbläsaren.

### `getCookies`

Filter i form av strängar och strängarrayer avvisas. Skicka ett [cookie-filterobjekt](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Ett anrop filtrerar på ett namn; anropa igen för ett annat namn.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` utan argument returnerar fortfarande alla cookies som är synliga för sidan.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` utan argument inkluderar fortfarande elementets egen tagg.

### `newWindow`

`windowName` och `windowFeatures` är borta. De gällde bara WebDriver Classic. Kommandot accepterar fortfarande `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Använd `type: 'tab'` för att öppna en flik.

### `startActivity`

Endast options-objektet accepteras. `appWaitPackage`, `appWaitActivity` och `optionalIntentArguments` är borta. De gällde bara den borttagna Appium-HTTP-endpointen. `mobile: startActivity` accepterar dem inte, och att skicka dem kastar ett fel.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## Borttagna kommandon

`browser.throttle` och de föråldrade `touchAction`-kommandona har tagits bort.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | [Actions-API:t](/docs/api/browser/action) med en touch-pekare, eller mobilkommandona [`tap`](/docs/api/mobile/tap) och [`swipe`](/docs/api/mobile/swipe) |

En touch-gest med Actions-API:t:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` har tagits bort. Den zippade en lokal fil och skickade den till Seleniums `file`-endpoint, som inte är en del av WebDriver eller WebDriver BiDi. Ange en filinmatning med [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` kräver en BiDi-session. Sökvägarna öppnas av webbläsaren. En relativ sökväg löses upp mot `process.cwd()`. Filöverföring via Selenium Grid ingår inte i v10. En testsvit som förlitade sig på `uploadFile` för att skicka bytes till en nod måste placera filen där webbläsaren kan läsa den och sedan anropa `setFiles`.

I en klassisk lokal session skriver `element.setValue('/local/path')` fortfarande in en sökväg som den lokala webbläsaren redan kan se. Den råa Selenium-endpointen finns kvar som `browser.file()` för Grid-användare som anropar den direkt.

## `executeAsync`

`browser.executeAsync` och `element.executeAsync` har tagits bort. Skicka en `async`-funktion till [`execute`](/docs/api/browser/execute). Funktionens returvärde, inklusive ett returnerat promise, är kommandots resultat. `script`-timeouten gäller fortfarande.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Ta bort WebDriver-callbacken `done`. Ett strängskript som förväntade sig den callbacken som sitt sista argument måste i stället returnera ett promise. Vid körning är `executeAsync` inte en funktion.

## `switchToFrame`

`browser.switchToFrame` är inte längre ett publikt kommando.

I en WebDriver BiDi-session kastar `switchFrame` och `switchWindow` ett fel. En flik, ett fönster och en frame är en `WebdriverIO.BrowsingContext` som du håller i. `browser.url()` navigerar sessionens initiala toppnivåkontext och returnerar den. `browser.newWindow()` returnerar den nya kontexten och växlar inte till den. `context.frame()` returnerar en underordnad frame. `context.parent` är den frame du öppnade den från.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` är dokumentets URL-sträng. Navigera en kontext du håller i med `context.navigate(url)`. Laddningsmetadata från `browser.url()` finns i `context.request`.

I en Classic-session, fortsätt att anropa `switchFrame` med ett element, eller `null` för toppframen. En sträng eller en funktion avvisas där.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout` {#settimeout}

JSON Wire Protocol-nyckeln `page load` avvisas. Använd `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` och `script` är oförändrade.

## Åtkomst till multi-remote-instanser

En multi-remote-webbläsare lagrar inte längre varje session som en egen egenskap. Detsamma gäller för ett multi-remote-element. `getInstance` och `select` är sättet att adressera en session.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

En TypeScript-augmentation som lägger till `myChromeBrowser: WebdriverIO.Browser` i `WebdriverIO.MultiRemoteBrowser` motsvarar inte längre någon egenskap vid körning. Ta bort den augmentationen och anropa `getInstance`.

Med testrunnern och `injectGlobals` påslaget är instansnamnet fortfarande en global (`myChromeBrowser.url(...)`). Den globalen är den enskilda sessionen. Den är inte `browser.myChromeBrowser`.

Kommandoresultat behåller capability-ordningen: den första posten tillhör den första nyckeln i capabilities-objektet.

`browser.$$()` på en multi-remote-webbläsare returnerar en `WebdriverIO.MultiRemoteElementArray`, inte en vanlig `MultiRemoteElement[]`. Det är fortfarande en array, så en indexläsning som `elements[0]` fortsätter att fungera.

Dess metoder `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` och `reduce` är asynkrona, som på en `WebdriverIO.ElementArray`, och returnerar ett promise, även efter `await`. Detsamma gäller för listorna som `custom$$()`, `react$$()` och `shadow$$()` returnerar. I v9 var dessa de synkrona metoderna hos en vanlig array:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` och, på ett element, `shadow$()`, `nextElement()`, `previousElement()` och `parentElement()` returnerar ett enda `WebdriverIO.MultiRemoteElement`, som `$()` gör. I v9 returnerade de ett element per instans i en vanlig array. Läs elementet för en webbläsare med `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` och, på ett element, `shadow$$()` returnerar en enda `WebdriverIO.MultiRemoteElementArray`, som `$$()` gör. I v9 returnerade de en lista per instans i en vanlig array. Varje post adresserar alla instanser. En instans som hittar färre element har inget element vid det indexet:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` har typen `Selector`, liksom `WebdriverIO.Element['selector']`. I v9 hade den typen `string`, men värdet kunde också vara en funktion eller en referens till en anpassad strategi. TypeScript-kod som använder det som en sträng, till exempel `element.selector.includes('…')`, måste först kontrollera typen.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` och `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` har tagits bort. `select()` är alltid tillgänglig, och `$$()` returnerar alltid elementarrayen ovan. Ta bort båda variablerna.

## Binära mock-svar

`mock.respond()` och `mock.respondOnce()` accepterar `Uint8Array`- och `ArrayBuffer`-payloads, inklusive en polyfillad `Buffer` i komponenttester utan en global `Buffer`.

`mock.getBinaryResponse()` är nu typad som `Uint8Array | null`. Den returnerar fortfarande en `Buffer` i Node.js, men returnerar en `Uint8Array` i webbläsaren. För att använda Buffer-specifika metoder i Node.js, konvertera först ett resultat som inte är null:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Nätverksmockar för multi-remote

`browser.mock()` på en multi-remote-webbläsare returnerar en `WebdriverIO.MultiRemoteMock`, inte en array av mockar. `respond`, `restore` och de andra mock-metoderna körs på alla instanser. Läs fångade förfrågningar från mocken för en webbläsare. Använd typen `WebdriverIO.MultiRemoteMock` från den globala namnrymden `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` kastar `Multi-remote object has no instance named "<name>"` när namnet inte finns bland `instances`. En mock från `browser.select('myFirefoxBrowser', 'myChromeBrowser')` listar de instanserna i den ordningen, vilket kan skilja sig från `browser.instances`. Anta inte att `mocks[0]` är en viss webbläsare.

## Mock-svar som hoppar över backend

`mock.respond(..., { fetchResponse: false })` anropar inte backend. I v9 ignorerade en mock som även filtrerade på `statusCode` eller `responseHeaders` det filtret och besvarade ändå alla matchande förfrågningar. I v10 kastar `respond()` och `respondOnce()` ett fel, eftersom de filtren bara kan avgöras utifrån backend-svaret.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

För att behålla filtret, utelämna `fetchResponse` så att mocken hämtar svaret, kontrollerar status eller headers och sedan ersätter bodyn.

## Elementreferenser {#element-references}

Element-id:n använder W3C WebDriver-nyckeln `element-6066-11e4-a52e-4f735466cecf` och egenskapen `elementId`. JSON Wire Protocol-fältet `ELEMENT` är inte längre en del av elementkontraktet.

`WebdriverIO.Element` deklarerar inte längre `ELEMENT`. Läs `element.elementId`, som elementinstanser redan exponerar.

`browser.execute` och de inbyggda skripten som skickar ett element till sidan (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView` med flera) skickar bara W3C-referensen:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

En find-element-body som bara innehåller `{ ELEMENT: '...' }` är inte ett element. Inkludera W3C-nyckeln. Om båda nycklarna finns använder WebdriverIO W3C-id:t.

Jasmine skriver ut ett kedjat `$()`-resultat via `toJSON`. Det värdet är samma W3C-referens, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

Med WebDriver BiDi ger ett skript som returnerar en `NodeList` (till exempel från `querySelectorAll`) eller en `HTMLCollection` (till exempel `element.children`) nu en lista med elementreferenser, som WebDriver Classic gör. I v9 gav det råa BiDi-värden, så `browser.execute` returnerade objekt som inte är element, och en `custom$`- eller `custom$$`-strategi som returnerade `querySelectorAll(...)` hittade inget element. En lösning som `Array.from(document.querySelectorAll(...))` fungerar fortfarande, och du kan ta bort den:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## React-selektorer

`react$` och `react$$` fungerar nu med React 16 till 19, för en app som startar med `createRoot` eller med `ReactDOM.render`. Tidigare misslyckades `browser.react$` och `browser.react$$` med React 18 och senare (`Could not find the root element of your application`), och i alla versioner kunde ett resultat komma från renderingen före den senaste uppdateringen, så en komponent som en tillståndsändring lade till hittades inte.

På en sida där React ännu inte har renderat en rot väntar kommandona nu upp till 5 sekunder på den innan de misslyckas. Tidigare misslyckades de direkt, så en app som startade sent hittades inte.

Kommandona använder inte längre biblioteket [resq](https://github.com/baruchvlz/resq), och WebdriverIO installerar det inte längre. Selektorreglerna ändras inte (se [React-selektorer](/docs/selectors#react-selectors)), med följande undantag:

- `react$` med både `props` och `state` hittar en komponent som matchar båda. Tidigare ignorerades `props` när även `state` angavs.
- `react$$` ger varje DOM-nod en gång. Tidigare gav en higher-order component och dess barn samma element två gånger i vissa webbläsare.
- Ett fragment som innehåller ett fragment ger en platt lista med noder. Tidigare kunde `react$` returnera en lista.
- Ett filter med värdet `null` fungerar. Tidigare misslyckades det med `Cannot convert undefined or null to object`.
- Utan ett elementomfång söker kommandona igenom alla React-rötter på sidan, i dokumentordning, även rötter inuti andra rötter och rötter i öppna shadow roots. `react$` ger den första träffen. Tidigare sökte de bara i den första roten, även en som React ännu inte hade renderat eller hade avmonterat, och sökte inte i shadow roots. På en sida med mer än en rot kan `react$$` nu ge fler element: för att bara söka i en rot, anropa kommandot på dess container, till exempel `$('#root').react$$('MyComponent')`.
- På containern för en rot inuti en annan rot söker kommandona i den inre roten. Tidigare sökte de i den yttre roten.
- På en frames browsing context, och på ett element i en frame, fungerar kommandona. Tidigare misslyckades kontextkommandot med `this.executeScript is not a function`, och elementkommandot misslyckades med `Could not find instance of React in given element`.

Det interna skriptet `webdriverio/scripts/resq` har tagits bort.

## Komponenttestning

`@wdio/browser-runner` återexporterar `fn`, `spyOn` och mock-typerna från `@vitest/spy` 5 (tidigare 3). En mock som din kod anropar med `new` behöver en `function`- eller `class`-implementation. En pilfunktion kastar `is not a constructor`, och `mockReturnValue` kastar när mocken anropas med `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

För andra spy-ändringar, se [Vitests migreringsguide](https://vitest.dev/guide/migration).

## Puppeteer

`webdriverio` accepterar `puppeteer-core` `>=24 <26`, inklusive Puppeteer 25. `getPuppeteer()` och `@wdio/lighthouse-service` testas mot den versionslinjen.

## ESLint

`eslint-plugin-wdio` kräver ESLint 10. ESLint 9 nådde [end of life](https://eslint.org/version-support/) 2026-08-06 och stöds inte längre. Med TypeScript, använd `typescript-eslint` 8.56.0 eller senare.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` exporterar bara flat config `flat/recommended`. eslintrc-namnet `plugin:wdio/recommended` har tagits bort.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

Den rekommenderade konfigurationen byter till den typmedvetna regeln `wdio/no-floating-promise`, i stället för `wdio/await-expect`, när paketet `typescript-eslint` är installerat. Det räcker inte att bara installera `@typescript-eslint/eslint-plugin`.

```sh
npm install --save-dev typescript typescript-eslint
```

I det läget parsar konfigurationen varje fil den matchar med TypeScripts project service. Begränsa den till TypeScript-filer och se till att de ingår i en `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

En matchad JavaScript-fil som inte ingår i TypeScript-projektet, som `wdio.conf.js`, misslyckas med "was not found by the project service". För att även linta JavaScript-filer, sätt `"allowJs": true`, lägg till dem i `include` i `tsconfig.json` och utöka mönstret till `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Anpassade ramverk

`setupExpect` på en anpassad ramverksadapter accepterar inte längre en `Map` med matchers, och runnern lägger inte längre till en `entries`-metod på matchers-objektet. Iterera med `Object.entries(wdioMatchers)`.

## Firefox-profil

`@wdio/firefox-profile-service` behandlar inte längre `legacy` som ett tjänstealternativ. Den flaggan gällde bara Firefox 55 och äldre. Ta bort den. Ett kvarglömt `legacy: true` skrivs in i profilen som en preferens med namnet `legacy`.

## WebDriver-protokoll

Varje session är en [W3C WebDriver](https://w3c.github.io/webdriver/)-session. WebdriverIO talar inte JSON Wire Protocol eller Mobile JSON Wire Protocol. v9 tog bort de kommandona. v10 tar också bort det svarskuvert som de protokollen använde, så en server som fortfarande returnerar det kan inte starta en session.

`browser.isW3C` har tagits bort, inklusive värdet som tidigare vidarebefordrades i workerns `sessionStarted`-meddelande. Att skicka `isW3C` till `attach` ignoreras. BiDi-kommandouppsättningen finns kvar på klienten. En aktiv BiDi-anslutning är fortfarande beroende av `webSocketUrl`.

### `browser.back()` och `browser.forward()` med BiDi

Anropsställena förblir `await browser.back()` och `await browser.forward()`. Inget av kommandona tar ett argument eller returnerar ett värde.

I en BiDi-session anropar dessa kommandon `browsingContext.traverseHistory` med `delta` `-1` eller `1` på toppnivåns browsing context och väntar sedan på den dokumentberedskap som `pageLoadStrategy` motsvarar. `none` returnerar när traverseringskommandot har accepterats. `eager` väntar på `browsingContext.domContentLoaded`. `normal`, standardvärdet, väntar på `browsingContext.load`. En återställning från back-forward-cachen skickar inte de händelserna; kommandot returnerar när det inlästa dokumentets `readyState` redan motsvarar strategin. Väntan använder sessionens sidladdningstimeout (`timeouts.pageLoad`, 300000 ms om den inte är satt). Classic-sessioner skickar fortfarande till `POST /session/:sessionId/back` och `POST /session/:sessionId/forward`.

En saknad historikpost avvisas fortfarande. Med BiDi kommer meddelandet från `browsingContext.traverseHistory` och innehåller `no such history entry`, snarare än den klassiska WebDriver-feltexten. En traversering som aldrig når den förväntade beredskapen avvisas med `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` eller `browsingContext.load`.

### Svar på ny session

Create Session måste returnera W3C-bodyn. WebdriverIO läser `value.sessionId` och `value.capabilities`:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

En JSON Wire Protocol-body avvisas. Den bodyn placerar `sessionId` och `status` bredvid `value`, och placerar capabilities direkt i `value`:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

Skapandet av sessionen kastar då `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` Samma fel uppstår när `value.capabilities` saknas, även om `value.sessionId` finns.

Ett platt capability-objekt i din konfiguration är fortfarande giltigt. WebdriverIO omsluter `{ browserName: 'chrome' }` i `alwaysMatch` innan förfrågan skickas. Leverantörsprefixade nycklar blandade med nycklar utanför W3C:s capability-uppsättning avvisas fortfarande. Lägg leverantörsinställningar i `sauce:options`, `bstack:options`, `appium:options` eller en annan prefixad nyckel.

### Kommandosvar

Ett kommandoresultat är `{ "value": … }`. HTTP 200 utan `error` i `value` är framgång. Ett saknat element är HTTP 404 med `value.error` satt till `"no such element"`, vilket fortfarande tillåter en lat elementuppslagning. En numerisk `status` i bodyn ignoreras, inklusive `status: 0` och den gamla koden `status: 7` ("no such element"). Skicka W3C-felobjektet i stället.

Den exporterade feltypen `JSONWPCommandError` heter nu `SessionRequestError`.

### Servrar

De drivrutiner som WebdriverIO körs mot talar redan W3C på klientanslutningen:

- ChromeDriver har varit W3C som standard sedan Chrome 75. Chromium-baserade Edge motsvarar den. Nuvarande ChromeDriver accepterar fortfarande `goog:chromeOptions.w3c: false`, vilket växlar just den sessionen tillbaka till det äldre protokollet. WebdriverIO stöder inte den växlingen.
- geckodriver och Apples safaridriver är enbart W3C. Ett Safari-svar som utelämnar `platformName` eller `browserVersion` är fortfarande W3C.
- Selenium 4 och Grid 4 talar W3C. Grid slutade översätta JSON Wire Protocol i 4.9.
- Appium 2 tog bort JSON Wire Protocol och Mobile JSON Wire Protocol. Appium 3 tog också bort de kvarvarande parameterformerna. v10 kräver Appium 3, vilket beskrivs nedan. En mobilsession som utelämnar `setWindowRect` är fortfarande W3C; den capabilityn betyder att enheten inte kan ändra storlek på ett fönster.

Dessa servrar talar fortfarande JSON Wire Protocol och stöds inte: Selenium 3, PhantomJS, EdgeHTML (`--jwp`) och WinAppDriver vid direktanslutning. Appiums Windows-drivrutin stöds fortfarande som en W3C-klient. Den översätter kommandon till WinAppDriver, inklusive Get Element Property till attribut-endpointen. Peka WebdriverIO mot Appium, inte mot WinAppDrivers port.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) får inte de servrarna att fungera med v10. Sessionsstart kräver fortfarande W3C-bodyn ovan, och kommandoresultat ignorerar fortfarande en numerisk `status`. Stanna kvar på WebdriverIO 9 om den servern fortfarande behövs.

`webdriver.remote.sessionid` markerar inte längre en fristående Selenium-session. Selenium Grid 4 detekteras fortfarande via `se:cdp`.

Timeout-nyckeln `page load` beskrivs under [`setTimeout`](#settimeout). Element-id:n beskrivs under [Elementreferenser](#element-references). På desktop är `[name="..."]` en CSS-selektor. Lokaliseringsstrategin `name` finns kvar för mobilsessioner.

## Appium

WebdriverIO 10 kräver **Appium 3** och aktuella officiella drivrutiner (UiAutomator2, XCUITest, Espresso, Windows, Mac2 och så vidare). Appium 1.x och 2.x stöds inte. Stanna kvar på WebdriverIO 9 om du inte kan uppgradera servern.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` deklarerar en valfri `appium`-peer på `>=3` och vägrar starta en äldre server. `create-wdio` installerar `appium@^3` när Appium saknas eller är äldre än 3.

Molnleverantörer som fortfarande exponerar Appium 2 behöver en Appium 3-avbild, annars behöver du stanna kvar på WebdriverIO 9.

### Mobilkommandon faller inte längre tillbaka på HTTP

I v9 försökte många mobilhjälpare med `browser.execute('mobile: …')` och föll, vid ett fel om okänd metod, tillbaka på en borttagen Appium-HTTP-endpoint. I v10 är den reservlösningen borta: samma fel uppmanar dig att uppgradera till Appium 3. Föredra WebdriverIO:s mobilkommandon (`browser.lock()`, `browser.shake()`, …) eller `browser.execute('mobile: …')` direkt.

### Borttagna protokollkommandon

Appium 3 [tog bort många föråldrade base-driver-endpoints](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO exponerar inte längre klientmetoder för de flesta av de vägarna (till exempel `appiumLock`, `touchPerform` och Mobile JSON Wire Protocol-mappningen). Använd W3C Actions, motsvarande mobilkommando eller en drivrutins `mobile:`-execute-metod i stället.

### Omfång för Appiums `--allow-insecure`

Appium 3 kräver ett omfångsprefix för drivrutin eller `*` på `--allow-insecure`-funktioner, till exempel `uiautomator2:adb_shell` eller `*:adb_shell`.

### Appium-capabilities utan prefix väljer inte längre en Appium-session

`automationName`, `deviceName` och `appiumVersion` utan prefixet `appium:` säger inte längre åt WebdriverIO att hoppa över webbläsardrivrutinen och koppla in Appium-tjänsten. Använd den prefixade capabilityn, eller placera den under `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` skriver nu ut de prefixade nycklarna, inklusive `appium:app`, `appium:platformVersion` och `appium:udid`.

### `getValue` på mobil läser elementegenskapen

`element.getValue()` anropar Get Element Property i varje session, inklusive Appium 3. I en mobilsession anropade den tidigare Get Element Attribute.

### Signaturen för `stopRecordingScreen` har anpassats till `startRecordingScreen`

`driver.stopRecordingScreen` accepterar nu bara ett enda `options`-argument, i stället för de tidigare 4 argumenten, i linje med `driver.startRecordingScreen`. Flytta de enskilda argumenten in i ett objekt:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Namngivning för multi-remote

API:er som stavades `multiremote` eller `Multiremote` skrivs nu i camelCase / PascalCase som `multiRemote` / `MultiRemote`. De gamla namnen har inga alias.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` på webbläsaren samt resultat från `$` och `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reportrar) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` i `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) och `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Sök efter `multiremote` och `Multiremote` (skiftlägeskänsligt) och ersätt varje träff. Allure-rapporter märker också multi-remote-tester med `isMultiRemote` i stället för `isMultiremote`.

## Virtuella skärmar på Linux

`@wdio/xvfb` ersätts av `@wdio/display-server`. I stället för att omsluta varje worker med `xvfb-run` startar testrunnern en skärmserver för hela körningen, före varje tjänsts `onPrepare`-hook. Den föredrar Weston i headless-läge och faller tillbaka på Xvfb. Se [Headless och skärmservrar](/docs/headless-and-display-servers) för mer information.

Alternativen har bytt namn. De gamla namnen fungerar fortfarande i v10 men loggar en varning om föråldring och kommer att tas bort i v11. Om du sätter båda namnen vinner det nya:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` och `xvfbRetryDelay` har ingen effekt och kommer också att tas bort i v11. Uppstarten görs inte längre om: om Weston inte startar försöker testrunnern med Xvfb, och om ingen av dem startar fortsätter körningen utan skärm.

En konfiguration som sätter ett av de fyra omdöpta alternativen utan dess ersättare, och som inte sätter `displayServer`, fortsätter att använda Xvfb som v9 gjorde. Om den inte stänger av skärmservern loggar den också `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. När du har döpt om alternativen, lägg till `displayServer: 'xvfb'` för att behålla Xvfb, eller utelämna det för att föredra Weston. I autoläge körs ett anpassat installationskommando först för Weston, och igen för Xvfb bara om Weston fortfarande inte är tillgängligt eller inte startar och Xvfb fortfarande saknas, så sätt `displayServer` till den server kommandot installerar för att hoppa över försöket med den andra servern.

Automatisk installation stöder inte längre `yum`, som v9 använde på värdar utan `dnf`. v10 detekterar endast `apt-get`, `dnf`, `zypper`, `pacman`, `apk` och `xbps-install`, så installera Xvfb själv på en värd som bara har `yum`.

En `xvfbAutoInstallCommand`-array kördes genom ett skal i v9, så element som `&&` eller `VAR=value` fungerade. Arrayer körs nu utan skal oavsett alternativnamn, så använd en sträng för skalsyntax.

Andra ändringar du kan märka:

- Alla workers delar en skärm. I v9 hade varje worker en egen skärm. Chrome- och Edge-sidor kan nu sakna fokus, se [Fönsterfokus](/docs/headless-and-display-servers#window-focus).
- Xvfb-skärmnumret är inte fast. Läs det från `DISPLAY` i stället för att anta `:99`.
- En värd där bara `WAYLAND_DISPLAY` är satt räknas nu som att ha en skärm. v9 körde workers under Xvfb där, eftersom `DISPLAY` inte var satt. v10 startar ingenting, öppnar webbläsarfönster i din compositor och sätter `XDG_SESSION_TYPE`, `GDK_BACKEND` och `ELECTRON_OZONE_PLATFORM_HINT` till `wayland` för körningen. För att köra dem under Xvfb som tidigare, ta bort `WAYLAND_DISPLAY` och sätt `displayServer: 'xvfb'`.
- Standardskärmen är 1920x1080. v9 använde standardvärdet för `xvfb-run`, som är 1280x1024 på Debian och Ubuntu och 640x480 på Fedora, RHEL och Arch. För att behålla den storlek dina baslinjer använder, sätt `displayServerWidth` och `displayServerHeight` till den.
- Webbläsare väljer Wayland eller X11 utifrån den `XDG_SESSION_TYPE` som skärmservern sätter. Under Weston lägger WebdriverIO också till `--ozone-platform=wayland` för de Chrome- och Edge-instanser den startar, eftersom Chrome och Edge före 140 (Chrome for Testing före 135) ignorerar `XDG_SESSION_TYPE`. Weston tillhandahåller ingen `DISPLAY`, så om dina tester eller verktyg behöver X11, sätt `displayServer: 'xvfb'`.
- Om du använde `XvfbManager` eller `xvfb`-instansen från `@wdio/xvfb` direkt, använd `DisplayServerManager` från `@wdio/display-server` i stället. Där du körde `xvfb.init()` och omslöt kommandon med `xvfb-run`, eller startade processer via `ProcessFactory`, starta en skärm och skicka dess miljö till de processer som behöver den. Exemplet använder Xvfb i 1280x1024, som v9 gjorde på Debian och Ubuntu. På en värd där bara `WAYLAND_DISPLAY` är satt, ta bort den först, annars startar `startDaemon()` ingenting:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() returnerar också null när en skärm redan finns
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Emulering

`browser.emulate()` styr WebDriver BiDi:s emuleringsmodul för den aktuella toppnivåns browsing context. v9 injicerade ett preload-skript som patchade `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` och `navigator.onLine`. De skripten är borta. `browser.emulate('clock', …)` installerar fortfarande falska timers i den aktuella sidan och i sidor som öppnas därefter.

En omladdning krävs inte längre för BiDi-omfången.

```diff
  await browser.emulate('onLine', false)
- // endast `navigator.onLine` ändrades; trafiken flödade fortfarande
+ // browsing context är offline, inklusive fetch, WebSocket och WebTransport
```

- `onLine: false` anropar `emulation.setNetworkConditions` med `{ type: 'offline' }`. `true` och återställning av omfånget rensar det. Genomströmning och latens hanteras fortfarande av `browser.throttleNetwork()`.
- `colorScheme` sätter mediefunktionen `prefers-color-scheme`, så CSS `@media (prefers-color-scheme)` följer `matchMedia`.
- `userAgent` är webbläsarens user agent-åsidosättning, inte en patchad `navigator.userAgent`-egenskap.
- `geolocation` använder webbläsarens geolokaliseringsstack. En sida kan fortfarande behöva `browser.setPermissions({ name: 'geolocation' }, 'granted')`. `{ error: 'positionUnavailable' }` rapporterar det felet i stället för koordinater.
- `colorScheme` och `media` delar en mediefunktionskarta. Det senare anropet ersätter hela kartan, och återställning av något av omfången rensar den.
- `device` sätter user agent, viewport, touch, mobil textlayout och viewport-meta utifrån enhetsbeskrivningen. Den ändrar inte `screen` eller `orientation`.

Nya omfång är `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` och `forcedColors`. En webbläsare som inte implementerar ett kommando avvisar anropet med sitt eget fel (`unknown command` eller `unsupported operation`). WebdriverIO faller inte tillbaka på ett preload-skript eller på CDP. Om `device` avvisas halvvägs återställs tidigare user agent, viewport, touch, textlayout och viewport-meta.

`wdio session emulate` accepterar samma omfång. Det uppmanar dig inte längre att ladda om för en åsidosättning som gäller omedelbart. Förinställningarna för `emulate network` och `emulate cpu` är oförändrade och fungerar fortfarande bara i Chromium. Se [Emulering](/docs/emulation).

## Nästa steg

- Kopiera [migreringsskillen](#migrate-with-a-coding-agent) till projektet och be en agent att tillämpa den.
- [WebdriverIO för kodagenter](/docs/ai-agents) för att skriva nya v10-tester.
- [Headless och skärmservrar](/docs/headless-and-display-servers) när testsviten körs på Linux.