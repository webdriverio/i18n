---
id: protractor-migration
title: Från Protractor
---

Denna handledning är för personer som använder Protractor och vill migrera sitt ramverk till WebdriverIO. Den initierades efter att Angular-teamet [har meddelat](https://github.com/angular/protractor/issues/5502) att Protractor inte längre kommer att stödjas. WebdriverIO har influerats av många av Protractors designbeslut, vilket är anledningen till att det förmodligen är det närmaste ramverket att migrera till. WebdriverIO-teamet uppskattar arbetet från varje enskild Protractor-bidragsgivare och hoppas att denna handledning gör övergången till WebdriverIO enkel och okomplicerad.

Även om vi skulle vilja ha en helt automatiserad process för detta ser verkligheten annorlunda ut. Alla har olika uppsättningar och använder Protractor på olika sätt. Varje steg bör ses som vägledning och mindre som en steg-för-steg-instruktion. Om du har problem med migreringen, tveka inte att [kontakta oss](https://github.com/webdriverio/codemod/discussions/new).

## Installation

Protractor- och WebdriverIO-API:erna är faktiskt väldigt lika, till den grad att majoriteten av kommandon kan skrivas om på ett automatiserat sätt genom en [codemod](https://github.com/webdriverio/codemod).

För att installera codemod, kör:

```sh
npm install jscodeshift @wdio/codemod
```

## Strategi

Det finns många migreringsstrategier. Beroende på storleken på ditt team, antalet testfiler och angelägenheten att migrera kan du försöka transformera alla tester på en gång eller fil för fil. Med tanke på att Protractor kommer att fortsätta underhållas fram till Angular version 15 (slutet av 2022) har du fortfarande gott om tid. Du kan ha Protractor och WebdriverIO-tester som körs samtidigt och börja skriva nya tester i WebdriverIO. Beroende på din tidsbudget kan du sedan börja migrera de viktiga testfallen först och arbeta dig nedåt till tester som du kanske till och med kan ta bort.

## Först konfigurationsfilen

Efter att vi har installerat codemod kan vi börja transformera den första filen. Titta först på [WebdriverIOs konfigurationsalternativ](configuration). Konfigurationsfiler kan bli mycket komplexa och det kan vara klokt att endast porta de väsentliga delarna och se hur resten kan läggas till när motsvarande tester som behöver vissa alternativ migreras.

För den första migreringen transformerar vi endast konfigurationsfilen och kör:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

Din konfiguration kan heta något annat, men principen bör vara densamma: börja med att migrera konfigurationen först.

:::

## Installera WebdriverIO-beroenden

Nästa steg är att konfigurera en minimal WebdriverIO-konfiguration som vi börjar bygga upp medan vi migrerar från ett ramverk till ett annat. Först installerar vi WebdriverIO CLI via:

```sh
npm install --save-dev @wdio/cli
```

Sedan kör vi konfigurationsguiden:

```sh
npx wdio config
```

Detta kommer att guida dig genom ett par frågor. För detta migreringsscenario:
- välj standardvalen
- vi rekommenderar att inte auto-generera exempelfiler
- välj en annan mapp för WebdriverIO-filer
- och att välja Mocha framför Jasmine.

:::info Varför Mocha?
Även om du kanske har använt Protractor med Jasmine tidigare, erbjuder Mocha bättre omförsöksmekanismer. Valet är ditt!
:::

Efter det lilla frågeformuläret kommer guiden att installera alla nödvändiga paket och lagra dem i din `package.json`.

## Migrera konfigurationsfilen

Efter att vi har transformerat `conf.ts` och en ny `wdio.conf.ts`, är det nu dags att migrera konfigurationen från en konfiguration till en annan. Se till att endast porta kod som är nödvändig för att alla tester ska kunna köras. I vår portar vi hookfunktionen och framework-timeout.

Vi kommer nu att fortsätta med vår `wdio.conf.ts`-fil endast och kommer därför inte att behöva några ändringar i den ursprungliga Protractor-konfigurationen längre. Vi kan återställa dessa så att båda ramverken kan köras bredvid varandra och vi kan porta en fil i taget.

## Migrera testfil

Vi är nu redo att porta över den första testfilen. För att börja enkelt, låt oss börja med en som inte har många beroenden till tredjepartspaket eller andra filer som PageObjects. I vårt exempel är den första filen att migrera `first-test.spec.ts`. Skapa först katalogen där den nya WebdriverIO-konfigurationen förväntar sig sina filer och flytta den sedan över:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Nu låt oss transformera denna fil:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

Det är allt! Denna fil är så enkel att vi inte behöver några ytterligare ändringar och kan direkt försöka köra WebdriverIO via:

```sh
npx wdio run wdio.conf.ts
```

Grattis 🥳 du har just migrerat den första filen!

## Nästa steg

Från denna punkt fortsätter du att transformera test för test och page object för page object. Det finns chanser att codemod kommer att misslyckas för vissa filer med ett fel som:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

För vissa Protractor-kommandon finns det helt enkelt ingen ersättning i WebdriverIO. I detta fall kommer codemod att ge dig råd om hur du refaktorerar det. Om du stöter på sådana felmeddelanden för ofta, tveka inte att [rapportera ett problem](https://github.com/webdriverio/codemod/issues/new) och begära att lägga till en viss transformation. Även om codemod redan transformerar majoriteten av Protractor-API:et finns det fortfarande mycket utrymme för förbättringar.

## Slutsats

Vi hoppas att denna handledning vägleder dig lite genom migreringsprocessen till WebdriverIO. Gemenskapen fortsätter att förbättra codemod medan den testas med olika team i olika organisationer. Tveka inte att [rapportera ett problem](https://github.com/webdriverio/codemod/issues/new) om du har feedback eller [starta en diskussion](https://github.com/webdriverio/codemod/discussions/new) om du har problem under migreringsprocessen.