---
id: organizingsuites
title: Organisera Testsvit
---

När projekt växer ökar oundvikligen antalet integrationstester. Detta ökar byggtiden och sänker produktiviteten.

För att förhindra detta bör du köra dina tester parallellt. WebdriverIO testar redan varje spec (eller _feature-fil_ i Cucumber) parallellt inom en enskild session. Generellt bör du testa endast en funktion per spec-fil. Försök att inte ha för många eller för få tester i en fil. (Det finns dock ingen gyllene regel här.)

När dina tester har flera spec-filer bör du börja köra dina tester samtidigt. För att göra detta, justera egenskapen `maxInstances` i din konfigurationsfil. WebdriverIO låter dig köra dina tester med maximal samtidighet—vilket betyder att oavsett hur många filer och tester du har, kan de alla köras parallellt. (Detta är fortfarande föremål för vissa begränsningar, som din dators CPU, samtidighetsbegränsningar, etc.)

> Låt oss säga att du har 3 olika kapaciteter (Chrome, Firefox och Safari) och du har satt `maxInstances` till `1`. WDIO-testkörnaren kommer att skapa 3 processer. Därför, om du har 10 spec-filer och du ställer in `maxInstances` till `10`, kommer _alla_ spec-filer att testas samtidigt, och 30 processer kommer att startas.

Du kan definiera egenskapen `maxInstances` globalt för att ställa in attributet för alla webbläsare.

Om du kör ditt eget WebDriver-grid kan du (till exempel) ha mer kapacitet för en webbläsare än för en annan. I det fallet kan du _begränsa_ `maxInstances` i ditt kapacitetsobjekt:

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

## Ärva från huvudkonfigurationsfil

Om du kör din testsvit i flera miljöer (t.ex. utveckling och integration) kan det vara bra att använda flera konfigurationsfiler för att hålla saker hanterbara.

Likt [sidobjektskonceptet](pageobjects) behöver du först en huvudkonfigurationsfil. Den innehåller alla konfigurationer du delar mellan miljöer.

Skapa sedan en annan konfigurationsfil för varje miljö och komplettera huvudkonfigurationen med de miljöspecifika:

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

## Gruppera testspecifikationer i sviter

Du kan gruppera testspecifikationer i sviter och köra enstaka specifika sviter istället för alla.

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

Nu, om du bara vill köra en enskild svit, kan du skicka svitnamnet som ett CLI-argument:

```sh
wdio wdio.conf.js --suite login
```

Eller kör flera sviter på en gång:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Gruppera testspecifikationer för att köra sekventiellt

Som beskrivits ovan finns det fördelar med att köra testerna parallellt. Det finns dock fall där det skulle vara fördelaktigt att gruppera tester för att köra sekventiellt i en enda instans. Exempel på detta är främst när det finns en stor uppsättningskostnad, t.ex. transpilering av kod eller anskaffning av molninstanser, men det finns också avancerade användningsmodeller som drar nytta av denna funktion.

För att gruppera tester att köra i en enda instans, definiera dem som en array inom specs-definitionen.

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
I exemplet ovan kommer testerna 'test_login.js', 'test_product_order.js' och 'test_checkout.js' att köras sekventiellt i en enda instans och var och en av "test_b*"-testerna kommer att köras parallellt i individuella instanser.

Det är också möjligt att gruppera specifikationer definierade i sviter, så du kan nu också definiera sviter så här:
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

## Kör valda tester

I vissa fall kanske du bara vill köra ett enskilt test (eller en delmängd av tester) från dina sviter.

Med parametern `--spec` kan du ange vilken _svit_ (Mocha, Jasmine) eller _feature_ (Cucumber) som ska köras. Sökvägen löses relativt från din nuvarande arbetskatalog.

Till exempel, för att bara köra ditt inloggningstest:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Eller kör flera specifikationer på en gång:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Om `--spec`-värdet inte pekar på en specifik spec-fil används det istället för att filtrera spec-filnamnen som definierats i din konfiguration.

För att köra alla specifikationer med ordet "dialog" i spec-filnamnen kan du använda:

```sh
wdio wdio.conf.js --spec dialog
```

Observera att varje testfil körs i en enskild testrunner-process. Eftersom vi inte skannar filer i förväg (se nästa avsnitt för information om att skicka filnamn till `wdio`), kan du _inte_ använda (till exempel) `describe.only` överst i din spec-fil för att instruera Mocha att endast köra den sviten.

Denna funktion hjälper dig att uppnå samma mål.

När alternativet `--spec` anges kommer det att åsidosätta alla mönster som definierats av konfigurations- eller kapacitetsnivåns `specs`-parameter.

## Exkludera valda tester

Vid behov, om du behöver exkludera specifika spec-filer från en körning, kan du använda parametern `--exclude` (Mocha, Jasmine) eller feature (Cucumber).

Till exempel, för att exkludera ditt inloggningstest från testkörningen:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Eller exkludera flera spec-filer:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Eller exkludera en spec-fil vid filtrering med hjälp av en svit:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Om `--exclude`-värdet inte pekar på en specifik spec-fil används det istället för att filtrera spec-filnamnen som definierats i din konfiguration.

För att exkludera alla specifikationer med ordet "dialog" i spec-filnamnen kan du använda:

```sh
wdio wdio.conf.js --exclude dialog
```

### Exkludera en hel svit

Du kan också exkludera en hel svit efter namn. Om exkluderingsvärdet matchar ett svitnamn som definierats i din konfiguration och inte ser ut som en filsökväg, kommer hela sviten att hoppas över:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Detta kommer endast att köra sviten `checkout` och hoppa över sviten `login` helt.

Blandade exkluderingar (sviter och spec-mönster) fungerar som förväntat:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

I detta exempel, om `signup` är ett definierat svitnamn, kommer den sviten att exkluderas. Mönstret `dialog` kommer att filtrera bort alla spec-filer som innehåller "dialog" i filnamnet.

:::note
Om du anger både `--suite X` och `--exclude X` tar exkluderingen företräde och sviten `X` kommer inte att köras.
:::

När alternativet `--exclude` anges kommer det att åsidosätta alla mönster som definierats av konfigurations- eller kapacitetsnivåns `exclude`-parameter.

## Kör sviter och testspecifikationer

Kör en hel svit tillsammans med individuella specifikationer.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Kör flera, specifika testspecifikationer

Det är ibland nödvändigt&mdash;i samband med kontinuerlig integration och i andra fall&mdash;att ange flera uppsättningar av specifikationer att köra. WebdriverIOs `wdio`-kommandoradsverktyg accepterar inrörda filnamn (från `find`, `grep` eller andra).

Inrörda filnamn åsidosätter listan över glob-mönster eller filnamn som anges i konfigurationens `spec`-lista.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Obs:** Detta kommer_ inte _att åsidosätta flaggan `--spec` för att köra en enskild specifikation._

## Köra specifika tester med MochaOpts

Du kan också filtrera vilka specifika `suite|describe` och/eller `it|test` du vill köra genom att skicka ett Mocha-specifikt argument: `--mochaOpts.grep` till wdio CLI.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Obs:** Mocha kommer att filtrera testerna efter att WDIO-testkörnaren skapar instanserna, så du kan se att flera instanser startas men inte faktiskt körs._

## Exkludera specifika tester med MochaOpts

Du kan också filtrera vilka specifika `suite|describe` och/eller `it|test` du vill exkludera genom att skicka ett Mocha-specifikt argument: `--mochaOpts.invert` till wdio CLI. `--mochaOpts.invert` utför motsatsen till `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Obs:** Mocha kommer att filtrera testerna efter att WDIO-testkörnaren skapar instanserna, så du kan se att flera instanser startas men inte faktiskt körs._

## Stoppa testning efter misslyckande

Med alternativet `bail` kan du tala om för WebdriverIO att sluta testa efter att något test misslyckas.

Detta är hjälpsamt med stora testsviter när du redan vet att din build kommer att brytas, men du vill undvika den långa väntan på en fullständig testkörning.

Alternativet `bail` förväntar sig ett tal som anger hur många testmisslyckanden som kan inträffa innan WebDriver stoppar hela testkörningen. Standardvärdet är `0`, vilket betyder att det alltid kör alla testspecifikationer det kan hitta.

Se [Options Page](configuration) för ytterligare information om bail-konfigurationen.

## Hierarki för köralternativ

När du deklarerar vilka specifikationer som ska köras finns det en viss hierarki som definierar vilket mönster som har företräde. För närvarande fungerar det så här, från högsta prioritet till lägsta:

> CLI `--spec`-argument > kapacitet `specs`-mönster > konfigurations `specs`-mönster
> CLI `--exclude`-argument > konfigurations `exclude`-mönster > kapacitet `exclude`-mönster

Om endast konfigurationsparametern anges kommer den att användas för alla kapaciteter. Men om mönstret definieras på kapacitetsnivån kommer det att användas istället för konfigurationsmönstret. Slutligen kommer alla spec-mönster som definieras på kommandoraden att åsidosätta alla andra givna mönster.

### Använda kapacitetsdefinerade spec-mönster

När du definierar ett spec-mönster på kapacitetsnivån åsidosätter det alla mönster som definierats på konfigurationsnivån. Detta är användbart när du behöver separera tester baserat på olika enhetskapaciteter. I sådana fall är det mer användbart att använda ett generiskt spec-mönster på konfigurationsnivån och mer specifika mönster på kapacitetsnivån.

Låt oss säga till exempel att du hade två kataloger, en för Android-tester och en för iOS-tester.

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

Om du behöver båda dessa kapaciteter i din konfigurationsfil kommer Android-enheten endast att köra testerna under "android"-namnrymden, och iOS-testerna kommer endast att köra tester under "ios"-namnrymden!

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