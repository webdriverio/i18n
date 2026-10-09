---
id: organizingsuites
title: Organisera testsviten
description: "Organisera en växande testsvit genom att dela konfigurationsfiler, gruppera specs i sviter, köra specs sekventiellt och inkludera eller exkludera tester."
---

När projekt växer läggs oundvikligen fler och fler integrationstester till. Detta ökar byggtiden och sänker produktiviteten.

För att förhindra detta bör du köra dina tester parallellt. WebdriverIO testar redan varje spec (eller _feature-fil_ i Cucumber) parallellt inom en enda session. Försök generellt att bara testa en enda funktion per spec-fil. Försök att inte ha för många eller för få tester i en fil. (Det finns dock ingen gyllene regel här.)

När dina tester har flera spec-filer bör du börja köra dina tester samtidigt. För att göra det, justera egenskapen `maxInstances` i din konfigurationsfil. WebdriverIO låter dig köra dina tester med maximal samtidighet – vilket innebär att oavsett hur många filer och tester du har kan de alla köras parallellt. (Detta är fortfarande föremål för vissa begränsningar, som datorns CPU, samtidighetsbegränsningar osv.)

> Låt oss säga att du har 3 olika capabilities (Chrome, Firefox och Safari) och att du har satt `maxInstances` till `1`. WDIO-testköraren kommer att starta 3 processer. Om du därför har 10 spec-filer och sätter `maxInstances` till `10` kommer _alla_ spec-filer att testas samtidigt, och 30 processer kommer att startas.

Du kan definiera egenskapen `maxInstances` globalt för att ställa in attributet för alla webbläsare.

Om du kör ditt eget WebDriver-grid kan du (till exempel) ha mer kapacitet för en webbläsare än en annan. I så fall kan du _begränsa_ `maxInstances` i ditt capability-objekt:

```js
// wdio.conf.js
export const config = {
    // ...
    // ställ in maxInstance för alla webbläsare
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances kan skrivas över per capability. Så om du har ett internt WebDriver-
        // grid med endast 5 tillgängliga firefox-instanser kan du se till att inte fler än
        // 5 instanser startas åt gången.
        browserName: 'chrome'
    }],
    // ...
}
```

## Ärv från huvudkonfigurationsfilen

Om du kör din testsvit i flera miljöer (t.ex. dev och integration) kan det hjälpa att använda flera konfigurationsfiler för att hålla saker hanterbara.

I likhet med [page object-konceptet](pageobjects) är det första du behöver en huvudkonfigurationsfil. Den innehåller alla konfigurationer som du delar mellan miljöer.

Skapa sedan en ny konfigurationsfil för varje miljö och komplettera huvudkonfigurationen med de miljöspecifika:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// använd huvudkonfigurationsfilen som standard men skriv över miljöspecifik information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // fler caps definieras här
        // ...
    ],

    // kör tester på sauce istället för lokalt
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// lägg till en ytterligare reporter
config.reporters.push('allure')
```

## Gruppera testspecs i sviter

Du kan gruppera testspecs i sviter och köra enskilda specifika sviter istället för alla.

Definiera först dina sviter i din WDIO-konfiguration:

```js
// wdio.conf.js
export const config = {
    // definiera alla tester
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // definiera specifika sviter
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

Om du nu bara vill köra en enda svit kan du skicka svitens namn som ett CLI-argument:

```sh
wdio wdio.conf.js --suite login
```

Eller kör flera sviter samtidigt:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Gruppera testspecs för sekventiell körning

Som beskrivits ovan finns det fördelar med att köra testerna samtidigt. Det finns dock fall där det vore fördelaktigt att gruppera tester för att köra dem sekventiellt i en enda instans. Exempel på detta är främst när det finns en stor uppstartskostnad, t.ex. transpilering av kod eller provisionering av molninstanser, men det finns också avancerade användningsmodeller som drar nytta av denna förmåga.

För att gruppera tester så att de körs i en enda instans, definiera dem som en array inom specs-definitionen.

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
och i det här fallet skulle alla tester i "end2end"-sviten köras i en enda instans.

När tester körs sekventiellt med hjälp av ett mönster kommer spec-filerna att köras i alfabetisk ordning

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

I vissa fall kanske du bara vill köra ett enda test (eller en delmängd av tester) i dina sviter.

Med parametern `--spec` kan du ange vilken _svit_ (Mocha, Jasmine) eller _feature_ (Cucumber) som ska köras. Sökvägen löses relativt till din aktuella arbetskatalog.

Till exempel, för att bara köra ditt inloggningstest:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Eller kör flera specs samtidigt:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Om värdet för `--spec` inte pekar på en specifik spec-fil används det istället för att filtrera de spec-filnamn som definierats i din konfiguration.

För att köra alla specs med ordet "dialog" i spec-filnamnen kan du använda:

```sh
wdio wdio.conf.js --spec dialog
```

Observera att varje testfil körs i en enda testkörarprocess. Eftersom vi inte skannar filer i förväg (se nästa avsnitt för information om att skicka filnamn via pipe till `wdio`) _kan_ du _inte_ använda (till exempel) `describe.only` högst upp i din spec-fil för att instruera Mocha att bara köra den sviten.

Denna funktion hjälper dig att uppnå samma mål.

När alternativet `--spec` anges kommer det att åsidosätta alla mönster som definierats av konfigurationens `specs` eller en capabilitys `wdio:specs`.

## Exkludera utvalda tester

Om du behöver exkludera specifika spec-fil(er) från en körning kan du använda parametern `--exclude` (Mocha, Jasmine) eller feature (Cucumber).

Till exempel, för att exkludera ditt inloggningstest från testkörningen:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Eller exkludera flera spec-filer:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Eller exkludera en spec-fil vid filtrering med en svit:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Om värdet för `--exclude` inte pekar på en specifik spec-fil används det istället för att filtrera de spec-filnamn som definierats i din konfiguration.

För att exkludera alla specs med ordet "dialog" i spec-filnamnen kan du använda:

```sh
wdio wdio.conf.js --exclude dialog
```

### Exkludera en hel svit

Du kan också exkludera en hel svit med namn. Om exkluderingsvärdet matchar ett svitnamn som definierats i din konfiguration och inte ser ut som en filsökväg kommer hela sviten att hoppas över:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Detta kommer endast att köra sviten `checkout` och hoppa över sviten `login` helt.

Blandade exkluderingar (sviter och spec-mönster) fungerar som förväntat:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

I det här exemplet, om `signup` är ett definierat svitnamn, kommer den sviten att exkluderas. Mönstret `dialog` kommer att filtrera bort alla spec-filer som innehåller "dialog" i sitt filnamn.

:::note
Om du anger både `--suite X` och `--exclude X` har exkluderingen företräde och sviten `X` kommer inte att köras.
:::

När alternativet `--exclude` anges kommer det att åsidosätta alla mönster som definierats av konfigurationens `exclude` eller en capabilitys `wdio:exclude`.

## Kör sviter och testspecs

Kör en hel svit tillsammans med enskilda specs.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Kör flera specifika testspecs

Ibland är det nödvändigt&mdash;i samband med kontinuerlig integration och i andra sammanhang&mdash;att ange flera uppsättningar specs att köra. WebdriverIO:s kommandoradsverktyg `wdio` accepterar filnamn via pipe (från `find`, `grep` eller andra).

Filnamn som skickas via pipe åsidosätter listan med globs eller filnamn som anges i konfigurationens `spec`-lista.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Obs:** Detta kommer_ inte _att åsidosätta flaggan `--spec` för att köra en enskild spec._

## Köra specifika tester med MochaOpts

Du kan också filtrera vilka specifika `suite|describe` och/eller `it|test` du vill köra genom att skicka ett Mocha-specifikt argument: `--mochaOpts.grep` till wdio CLI.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Obs:** Mocha filtrerar testerna efter att WDIO-testköraren har skapat instanserna, så du kan se flera instanser startas utan att faktiskt köras._

## Exkludera specifika tester med MochaOpts

Du kan också filtrera vilka specifika `suite|describe` och/eller `it|test` du vill exkludera genom att skicka ett Mocha-specifikt argument: `--mochaOpts.invert` till wdio CLI. `--mochaOpts.invert` gör motsatsen till `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Obs:** Mocha filtrerar testerna efter att WDIO-testköraren har skapat instanserna, så du kan se flera instanser startas utan att faktiskt köras._

## Avbryt testningen efter fel

Med alternativet `bail` kan du be WebdriverIO att sluta testa efter att något test misslyckas.

Detta är användbart med stora testsviter när du redan vet att ditt bygge kommer att gå sönder, men du vill undvika den långa väntan på en fullständig testkörning.

Alternativet `bail` förväntar sig ett nummer, som anger hur många testfel som kan inträffa innan WebDriver stoppar hela testkörningen. Standardvärdet är `0`, vilket innebär att alla testspecs som hittas alltid körs.

Se [Alternativsidan](configuration) för ytterligare information om bail-konfigurationen.
## Hierarki för körningsalternativ

När du anger vilka specs som ska köras finns det en viss hierarki som avgör vilket mönster som har företräde. För närvarande fungerar det så här, från högsta till lägsta prioritet:

> CLI-argumentet `--spec` > capability `wdio:specs` > konfigurationens `specs`
> CLI-argumentet `--exclude` > konfigurationens `exclude` > capability `wdio:exclude`

Om endast konfigurationsparametern anges kommer den att användas för alla capabilities. Om mönstret däremot definieras på capability-nivå kommer det att användas istället för konfigurationens mönster. Slutligen kommer alla spec-mönster som definieras på kommandoraden att åsidosätta alla andra angivna mönster.

### Använda spec-mönster definierade i capabilities

När du definierar ett spec-mönster på capability-nivå kommer det att åsidosätta alla mönster som definierats på konfigurationsnivå. Detta är användbart när du behöver separera tester baserat på olika enhetsegenskaper. I sådana fall är det mer användbart att använda ett generellt spec-mönster på konfigurationsnivå och mer specifika mönster på capability-nivå.

Låt oss till exempel säga att du har två kataloger, en för Android-tester och en för iOS-tester.

Din konfigurationsfil kan definiera mönstret så här, för icke-enhetsspecifika tester:

```js
{
    specs: ['tests/general/**/*.js']
}
```

men sedan har du olika capabilities för dina Android- och iOS-enheter, där mönstren kan se ut så här:

```json
{
  "platformName": "Android",
  "wdio:specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "wdio:specs": [
    "tests/ios/**/*.js"
  ]
}
```

Om du behöver båda dessa capabilities i din konfigurationsfil kommer Android-enheten endast att köra testerna under namnrymden "android", och iOS-testerna kommer endast att köra tester under namnrymden "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            "wdio:specs": ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            "wdio:specs": ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //specs på konfigurationsnivå kommer att användas
        }
    ]
}
```