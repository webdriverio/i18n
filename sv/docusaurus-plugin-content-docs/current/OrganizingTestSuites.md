---
id: organizingsuites
title: Organisera Testsvit
---

När projekt växer läggs oundvikligen fler och fler integrationstester till. Detta ökar byggtiden och minskar produktiviteten.

För att förhindra detta bör du köra dina tester parallellt. WebdriverIO testar redan varje spec (eller _feature-fil_ i Cucumber) parallellt inom en enda session. Generellt sett, försök att endast testa en enda funktion per spec-fil. Försök att inte ha för många eller för få tester i en fil. (Det finns dock ingen golden regel här.)

När dina tester har flera spec-filer bör du börja köra dina tester samtidigt. För att göra detta, justera egenskapen `maxInstances` i din konfigurationsfil. WebdriverIO låter dig köra dina tester med maximal samtidighet—vilket betyder att oavsett hur många filer och tester du har, kan alla köras parallellt. (Detta är fortfarande föremål för vissa begränsningar, som din dators CPU, begränsningar i samtidighet, etc.)

> Låt oss säga att du har 3 olika kapaciteter (Chrome, Firefox och Safari) och du har ställt in `maxInstances` till `1`. WDIO testlöparen kommer att starta 3 processer. Om du har 10 spec-filer och du ställer in `maxInstances` till `10`, kommer _alla_ spec-filer att testas samtidigt, och 30 processer kommer att startas.

Du kan definiera egenskapen `maxInstances` globalt för att ställa in attributet för alla webbläsare.

Om du kör ditt eget WebDriver-grid kan du (till exempel) ha mer kapacitet för en webbläsare än en annan. I så fall kan du _begränsa_ `maxInstances` i ditt kapacitetsobjekt:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## Ärva från huvudkonfigurationsfilen

Om du kör din testsvit i flera miljöer (t.ex. dev och integration) kan det vara bra att använda flera konfigurationsfiler för att hålla saker hanterbara.

Liknande konceptet med [sidobjekt](pageobjects), behöver du först en huvudkonfigurationsfil. Den innehåller alla konfigurationer som du delar mellan miljöerna.

Skapa sedan en annan konfigurationsfil för varje miljö, och komplettera huvudkonfigurationen med de miljöspecifika:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## Gruppera testspecifikationer i testsviter

Du kan gruppera testspecifikationer i sviter och köra enskilda specifika sviter istället för alla.

Först, definiera dina sviter i din WDIO-konfiguration:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

Nu, om du bara vill köra en enda svit, kan du skicka svitnamnet som ett CLI-argument:

```sh
wdio wdio.conf.js --suite login
```

Eller kör flera sviter samtidigt:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Gruppera testspecifikationer för att köra sekventiellt

Som beskrivits ovan finns det fördelar med att köra testerna samtidigt. Det finns dock fall där det skulle vara fördelaktigt att gruppera tester tillsammans för att köra sekventiellt i en enda instans. Exempel på detta är främst där det finns en stor uppsättningskostnad t.ex. transpilering av kod eller etablering av molninstanser, men det finns också avancerade användningsmodeller som gynnas av denna förmåga.

För att gruppera tester som ska köras i en enda instans, definiera dem som en array inom specs-definitionen.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
I exemplet ovan kommer testerna 'test_login.js', 'test_product_order.js' och 'test_checkout.js' att köras sekventiellt i en enda instans och vart och ett av "test_b*"-testerna kommer att köras samtidigt i individuella instanser.

Det är också möjligt att gruppera specifikationer definierade i sviter, så nu kan du också definiera sviter så här:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
och i detta fall skulle alla tester i "end2end"-sviten köras i en enda instans.

När du kör tester sekventiellt med ett mönster kommer det att köra spec-filerna i alfabetisk ordning

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Detta kommer att köra filerna som matchar mönstret ovan i följande ordning:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Kör utvalda tester

I vissa fall kan du vilja köra endast ett enda test (eller en delmängd av tester) av dina sviter.

Med parametern `--spec` kan du ange vilken _svit_ (Mocha, Jasmine) eller _feature_ (Cucumber) som ska köras. Sökvägen löses relativt från din nuvarande arbetskatalog.

Till exempel, för att bara köra ditt inloggningstest:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Eller kör flera specifikationer samtidigt:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Om värdet för `--spec` inte pekar på en specifik spec-fil används det istället för att filtrera spec-filnamnen som definierats i din konfiguration.

För att köra alla specifikationer med ordet "dialog" i spec-filnamnen kan du använda:

```sh
wdio wdio.conf.js --spec dialog
```

Observera att varje testfil körs i en enda testprocessen. Eftersom vi inte skannar filer i förväg (se nästa avsnitt för information om att skicka filnamn till `wdio`), kan du _inte_ använda (till exempel) `describe.only` överst i din spec-fil för att instruera Mocha att bara köra den sviten.

Denna funktion hjälper dig att uppnå samma mål.

När alternativet `--spec` tillhandahålls, kommer det att åsidosätta alla mönster som definierats av konfigurationen eller kapacitetsnivåns `specs`-parameter.

## Uteslut utvalda tester

Vid behov, om du behöver utesluta specifika spec-filer från en körning, kan du använda parametern `--exclude` (Mocha, Jasmine) eller feature (Cucumber).

Till exempel, för att utesluta ditt inloggningstest från testkörningen:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Eller, uteslut flera spec-filer:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Eller, uteslut en spec-fil när du filtrerar med en svit:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Om värdet för `--exclude` inte pekar på en specifik spec-fil används det istället för att filtrera spec-filnamnen som definierats i din konfiguration.

För att utesluta alla specifikationer med ordet "dialog" i spec-filnamnen kan du använda:

```sh
wdio wdio.conf.js --exclude dialog
```

När alternativet `--exclude` tillhandahålls, kommer det att åsidosätta alla mönster som definierats av konfigurationen eller kapacitetsnivåns `exclude`-parameter.

## Kör sviter och testspecifikationer

Kör en hel svit tillsammans med enskilda specifikationer.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Kör flera specifika testspecifikationer

Det är ibland nödvändigt—i samband med kontinuerlig integration och på annat sätt—att ange flera uppsättningar av specifikationer som ska köras. WebdriverIOs kommandoradsverktyg `wdio` accepterar filnamn som skickas via rör (från `find`, `grep` eller andra).

Filnamn som skickas via rör åsidosätter listan med mönster eller filnamn som anges i konfigurationens `spec`-lista.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Observera:** Detta kommer_ inte _att åsidosätta flaggan `--spec` för att köra en enda spec._

## Köra specifika tester med MochaOpts

Du kan också filtrera vilka specifika `suite|describe` och/eller `it|test` du vill köra genom att skicka ett Mocha-specifikt argument: `--mochaOpts.grep` till wdio CLI.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Observera:** Mocha kommer att filtrera testerna efter att WDIO-testlöparen skapar instanserna, så du kan se flera instanser som startas men inte faktiskt körs._

## Uteslut specifika tester med MochaOpts

Du kan också filtrera vilka specifika `suite|describe` och/eller `it|test` du vill utesluta genom att skicka ett Mocha-specifikt argument: `--mochaOpts.invert` till wdio CLI. `--mochaOpts.invert` fungerar motsatt till `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Observera:** Mocha kommer att filtrera testerna efter att WDIO-testlöparen skapar instanserna, så du kan se flera instanser som startas men inte faktiskt körs._

## Stoppa testning efter misslyckande

Med alternativet `bail` kan du tala om för WebdriverIO att sluta testa efter att ett test misslyckas.

Detta är användbart med stora testsviter när du redan vet att din build kommer att brytas, men du vill undvika den långa väntan på en fullständig testkörning.

Alternativet `bail` förväntar sig ett nummer, som anger hur många testmisslyckanden som kan uppstå innan WebDriver stoppar hela testkörningen. Standardvärdet är `0`, vilket betyder att det alltid kör alla testspecifikationer det kan hitta.

Se [Options Page](configuration) för ytterligare information om bail-konfigurationen.
## Körhierarki för alternativ

När du deklarerar vilka specs som ska köras finns det en viss hierarki som definierar vilket mönster som har företräde. För närvarande fungerar det så här, från högsta prioritet till lägsta:

> CLI `--spec`-argument > kapacitet `specs`-mönster > konfiguration `specs`-mönster
> CLI `--exclude`-argument > konfiguration `exclude`-mönster > kapacitet `exclude`-mönster

Om endast konfigurationsparametern anges kommer den att användas för alla kapaciteter. Om du definierar mönstret på kapacitetsnivån kommer det dock att användas istället för konfigurationsmönstret. Slutligen kommer alla specmönster som definieras på kommandoraden att åsidosätta alla andra mönster som ges.

### Använda kapacitetsdefinerade specmönster

När du definierar ett specmönster på kapacitetsnivån kommer det att åsidosätta alla mönster som definierats på konfigurationsnivån. Detta är användbart när man behöver separera tester baserat på olika enhetskapaciteter. I sådana fall är det mer användbart att använda ett generiskt specmönster på konfigurationsnivån, och mer specifika mönster på kapacitetsnivån.

Låt oss till exempel säga att du hade två kataloger, en för Android-tester och en för iOS-tester.

Din konfigurationsfil kan definiera mönstret så här, för icke-specifika enhetstester:

```js
{
    specs: ['tests/general/**/*.js']
}
```

men sedan har du olika kapaciteter för dina Android- och iOS-enheter, där mönstren kan se ut så här:

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

Om du behöver båda dessa kapaciteter i din konfigurationsfil kommer Android-enheten bara att köra testerna under "android"-namnrymden, och iOS-testerna kommer bara att köra testerna under "ios"-namnrymden!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```