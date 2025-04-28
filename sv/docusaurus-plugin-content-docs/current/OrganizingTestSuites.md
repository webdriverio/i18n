---
id: organizingsuites
title: Organisera Testsvit
---

När projekt växer läggs oundvikligen fler integrationstester till. Detta ökar byggtiden och saktar ner produktiviteten.

För att förhindra detta bör du köra dina tester parallellt. WebdriverIO testar redan varje specifikation (eller _funktionsfil_ i Cucumber) parallellt inom en session. Generellt sett, försök att testa endast en funktion per specifikationsfil. Försök att inte ha för många eller för få tester i en fil. (Det finns dock ingen gyllene regel här.)

När dina tester har flera specifikationsfiler bör du börja köra dina tester samtidigt. För att göra detta, justera `maxInstances` egenskapen i din konfigurationsfil. WebdriverIO låter dig köra dina tester med maximal samtidighet – vilket betyder att oavsett hur många filer och tester du har kan de alla köras parallellt. (Detta är fortfarande begränsat av vissa faktorer, som din dators CPU, samtidighetsbegränsningar, etc.)

> Låt oss säga att du har 3 olika kapabiliteter (Chrome, Firefox och Safari) och du har ställt in `maxInstances` till `1`. WDIO-testkörararen kommer att skapa 3 processer. Om du har 10 specifikationsfiler och ställer in `maxInstances` till `10`, kommer _alla_ specifikationsfiler att testas samtidigt, och 30 processer kommer att skapas.

Du kan definiera egenskapen `maxInstances` globalt för att ställa in attributet för alla webbläsare.

Om du kör ditt eget WebDriver-nätverk kanske du (till exempel) har mer kapacitet för en webbläsare än en annan. I det fallet kan du _begränsa_ `maxInstances` i ditt kapabilitetsobjekt:

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

Om du kör din testsvit i flera miljöer (t.ex. utveckling och integration) kan det hjälpa att använda flera konfigurationsfiler för att hålla saker hanterbara.

Liknande som med [sidobjektkonceptet](pageobjects), det första du behöver är en huvudkonfigurationsfil. Den innehåller alla konfigurationer som du delar mellan miljöer.

Skapa sedan en annan konfigurationsfil för varje miljö och komplettera huvudkonfigurationen med de miljöspecifika konfigurationerna:

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

Du kan gruppera testspecifikationer i sviter och köra specifika sviter istället för alla.

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

Eller, kör flera sviter samtidigt:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Gruppera testspecifikationer för att köra sekventiellt

Som beskrivits ovan finns det fördelar med att köra tester samtidigt. Men det finns fall där det skulle vara fördelaktigt att gruppera tester tillsammans för att köra sekventiellt i en enda instans. Exempel på detta är främst där det finns en stor installationskostnad, t.ex. transpilering av kod eller anskaffning av molninstanser, men det finns också avancerade användningsmodeller som gynnas av denna funktion.

För att gruppera tester att köra i en enda instans, definiera dem som en array inom specifikationsdefinitionen.

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
I exemplet ovan kommer testerna 'test_login.js', 'test_product_order.js' och 'test_checkout.js' att köras sekventiellt i en enda instans och var och en av "test_b*"-testerna kommer att köras samtidigt i individuella instanser.

Det är också möjligt att gruppera specs som definierats i sviter, så du kan nu också definiera sviter så här:
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

När man kör tester sekventiellt med ett mönster, körs specifikationsfilerna i alfabetisk ordning

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

I vissa fall kanske du bara vill köra ett enda test (eller en delmängd av tester) från dina sviter.

Med parametern `--spec` kan du ange vilken _svit_ (Mocha, Jasmine) eller _funktion_ (Cucumber) som ska köras. Sökvägen löses relativt från din nuvarande arbetskatalog.

Till exempel, för att bara köra ditt inloggningstest:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Eller kör flera specifikationer samtidigt:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Om `--spec`-värdet inte pekar på en specifik specifikationsfil används det istället för att filtrera specifikationsfilnamnen som definierats i din konfiguration.

För att köra alla specifikationer med ordet "dialog" i specifikationsfilnamnen kan du använda:

```sh
wdio wdio.conf.js --spec dialog
```

Observera att varje testfil körs i en egen testprocessprocess. Eftersom vi inte skannar filer i förväg (se nästa avsnitt för information om att skicka filnamn till `wdio`), _kan du inte_ använda (till exempel) `describe.only` högst upp i din specifikationsfil för att instruera Mocha att bara köra den testsviten.

Denna funktion hjälper dig att uppnå samma mål.

När alternativet `--spec` tillhandahålls kommer det att åsidosätta alla mönster som definierats av konfigurationen eller kapacitetsnivåns `specs`-parameter.

## Exkludera valda tester

Vid behov, om du behöver exkludera specifika specifikationsfiler från en körning, kan du använda parametern `--exclude` (Mocha, Jasmine) eller funktion (Cucumber).

Till exempel, för att exkludera ditt inloggningstest från testkörningen:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Eller, exkludera flera specifikationsfiler:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Eller, exkludera en specifikationsfil vid filtrering med en svit:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Om `--exclude`-värdet inte pekar på en specifik specifikationsfil används det istället för att filtrera specifikationsfilnamnen som definierats i din konfiguration.

För att exkludera alla specifikationer med ordet "dialog" i specifikationsfilnamnen kan du använda:

```sh
wdio wdio.conf.js --exclude dialog
```

När alternativet `--exclude` tillhandahålls kommer det att åsidosätta alla mönster som definierats av konfigurationen eller kapacitetsnivåns `exclude`-parameter.

## Kör sviter och testspecifikationer

Kör en hel svit tillsammans med enskilda specifikationer.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Kör flera, specifika testspecifikationer

Det är ibland nödvändigt – i samband med kontinuerlig integration och annars – att specificera flera uppsättningar av specifikationer att köra. WebdriverIOs `wdio`-kommandoradarverktyg accepterar filnamn via pipe (från `find`, `grep` eller andra).

Filnamn som skickas via pipe åsidosätter listan med glob-mönster eller filnamn som anges i konfigurationens `spec`-lista.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Observera:** Detta kommer_ inte _att åsidosätta flaggan `--spec` för att köra en enda specifikation._

## Köra specifika tester med MochaOpts

Du kan också filtrera vilka specifika `suite|describe` och/eller `it|test` du vill köra genom att skicka ett Mocha-specifikt argument: `--mochaOpts.grep` till wdio CLI.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Observera:** Mocha kommer att filtrera testerna efter att WDIO-testköraren skapar instanserna, så du kan se flera instanser skapas men inte faktiskt köras._

## Exkludera specifika tester med MochaOpts

Du kan också filtrera vilka specifika `suite|describe` och/eller `it|test` du vill exkludera genom att skicka ett Mocha-specifikt argument: `--mochaOpts.invert` till wdio CLI. `--mochaOpts.invert` utför motsatsen till `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Observera:** Mocha kommer att filtrera testerna efter att WDIO-testköraren skapar instanserna, så du kan se flera instanser skapas men inte faktiskt köras._

## Stoppa testning efter misslyckande

Med alternativet `bail` kan du säga till WebdriverIO att sluta testa efter att något test misslyckas.

Detta är användbart med stora testsviter när du redan vet att din byggprocess kommer att brytas, men du vill undvika den långa väntan på en full testkörning.

Alternativet `bail` förväntar sig ett nummer, som anger hur många testmisslyckanden som kan inträffa innan WebDriver stoppar hela testkörningen. Standardvärdet är `0`, vilket betyder att det alltid kör alla testspecifikationer det kan hitta.

Se [Optionssidan](configuration) för ytterligare information om bail-konfigurationen.
## Hierarki för körningsalternativ

När du deklarerar vilka specifikationer som ska köras finns det en viss hierarki som definierar vilket mönster som kommer att ha företräde. För närvarande fungerar det så här, från högsta prioritet till lägsta:

> CLI `--spec`-argument > kapabilitetens `specs`-mönster > konfigurations `specs`-mönster
> CLI `--exclude`-argument > konfigurations `exclude`-mönster > kapabilitetens `exclude`-mönster

Om endast konfigurationsparametern ges används den för alla kapabiliteter. Men om mönstret definieras på kapabilitetsnivån kommer det att användas istället för konfigurationsmönstret. Slutligen kommer alla specifikationsmönster som definieras på kommandoraden att åsidosätta alla andra mönster som ges.

### Använda kapabilitetsdefinierade specifikationsmönster

När du definierar ett specifikationsmönster på kapabilitetsnivån, kommer det att åsidosätta alla mönster som definierats på konfigurationsnivån. Detta är användbart när du behöver separera tester baserat på differentierade enhetskapabiliteter. I sådana fall är det mer användbart att använda ett generiskt specifikationsmönster på konfigurationsnivån och mer specifika mönster på kapabilitetsnivån.

Till exempel, låt oss säga att du hade två kataloger, en för Android-tester och en för iOS-tester.

Din konfigurationsfil kan definiera mönstret så här, för icke-specifika enhetstester:

```js
{
    specs: ['tests/general/**/*.js']
}
```

men sedan kommer du att ha olika kapabiliteter för dina Android- och iOS-enheter, där mönstren kan se ut så här:

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

Om du behöver båda dessa kapabiliteter i din konfigurationsfil, kommer Android-enheten endast att köra testerna under "android"-namnområdet, och iOS-testerna kommer endast att köra tester under "ios"-namnområdet!

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