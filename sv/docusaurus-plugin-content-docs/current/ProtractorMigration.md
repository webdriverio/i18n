---
id: protractor-migration
title: Från Protractor
description: "Migrera en Protractor-testsvit till WebdriverIO steg för steg, inklusive beroenden, konfigurationsfil och testfiler, med hjälp av en codemod."
---

Den här handledningen är för dig som använder Protractor och vill migrera ditt ramverk till WebdriverIO. Den togs fram efter att Angular-teamet [meddelade](https://github.com/angular/protractor/issues/5502) att Protractor inte längre kommer att stödjas. WebdriverIO har influerats av många av Protractors designbeslut, vilket är anledningen till att det förmodligen är det ramverk som ligger närmast till hands att migrera till. WebdriverIO-teamet uppskattar arbetet från varje enskild Protractor-bidragsgivare och hoppas att den här handledningen gör övergången till WebdriverIO enkel och okomplicerad.

Även om vi gärna skulle ha en helt automatiserad process för detta ser verkligheten annorlunda ut. Alla har olika uppsättningar och använder Protractor på olika sätt. Varje steg bör ses som vägledning snarare än som en steg-för-steg-instruktion. Om du stöter på problem med migreringen, tveka inte att [kontakta oss](https://github.com/webdriverio/codemod/discussions/new).

## Installation

Protractors och WebdriverIOs API:er är faktiskt mycket lika, till den grad att majoriteten av kommandona kan skrivas om automatiskt med hjälp av en [codemod](https://github.com/webdriverio/codemod).

För att installera codemod, kör:

```sh
npm install jscodeshift @wdio/codemod
```

## Strategi

Det finns många migreringsstrategier. Beroende på storleken på ditt team, antalet testfiler och hur brådskande migreringen är kan du försöka omvandla alla tester på en gång eller fil för fil. Eftersom Protractor kommer att fortsätta underhållas fram till Angular version 15 (slutet av 2022) har du fortfarande gott om tid. Du kan köra Protractor- och WebdriverIO-tester samtidigt och börja skriva nya tester i WebdriverIO. Beroende på din tidsbudget kan du sedan börja med att migrera de viktiga testfallen först och arbeta dig nedåt till tester som du kanske till och med kan ta bort.

## Först konfigurationsfilen

Efter att vi har installerat codemod kan vi börja omvandla den första filen. Ta först en titt på [WebdriverIOs konfigurationsalternativ](configuration). Konfigurationsfiler kan bli mycket komplexa och det kan vara vettigt att bara överföra de viktigaste delarna och se hur resten kan läggas till när motsvarande tester som behöver vissa alternativ migreras.

För den första migreringen omvandlar vi bara konfigurationsfilen och kör:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Din konfiguration kan ha ett annat namn, men principen bör vara densamma: börja med att migrera konfigurationen.

:::

## Installera WebdriverIO-beroenden

Nästa steg är att konfigurera en minimal WebdriverIO-uppsättning som vi bygger vidare på allteftersom vi migrerar från det ena ramverket till det andra. Först installerar vi WebdriverIO CLI via:

```sh
npm install --save-dev @wdio/cli
```

Därefter kör vi konfigurationsguiden:

```sh
npx wdio config
```

Detta leder dig igenom ett par frågor. För det här migreringsscenariot:
- välj standardalternativen
- rekommenderar vi att inte autogenerera exempelfiler
- välj en annan mapp för WebdriverIO-filer
- och välj Mocha framför Jasmine.

:::info Varför Mocha?
Även om du tidigare kan ha använt Protractor med Jasmine erbjuder Mocha bättre mekanismer för omförsök. Valet är ditt!
:::

Efter det lilla frågeformuläret installerar guiden alla nödvändiga paket och sparar dem i din `package.json`.

## Migrera konfigurationsfilen

När vi har en omvandlad `conf.ts` och en ny `wdio.conf.ts` är det nu dags att migrera konfigurationen från den ena konfigurationen till den andra. Se till att bara överföra kod som är nödvändig för att alla tester ska kunna köras. I vårt fall överför vi hook-funktionen och ramverkets timeout.

Vi fortsätter nu enbart med vår `wdio.conf.ts`-fil och behöver därför inte längre göra några ändringar i den ursprungliga Protractor-konfigurationen. Vi kan återställa dessa så att båda ramverken kan köras sida vid sida och vi kan överföra en fil i taget.

## Migrera testfil

Nu är vi redo att överföra den första testfilen. För att börja enkelt tar vi en som inte har många beroenden till tredjepartspaket eller andra filer som PageObjects. I vårt exempel är den första filen att migrera `first-test.spec.ts`. Skapa först katalogen där den nya WebdriverIO-konfigurationen förväntar sig sina filer och flytta sedan över filen:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Nu omvandlar vi den här filen:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

Det var allt! Den här filen är så enkel att vi inte behöver göra några ytterligare ändringar och direkt kan försöka köra WebdriverIO via:

```sh
npx wdio run wdio.conf.ts
```

Grattis 🥳 du har precis migrerat den första filen!

## Nästa steg

Från och med nu fortsätter du att omvandla test för test och page object för page object. Det finns en risk att codemod misslyckas för vissa filer med ett fel som:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

För vissa Protractor-kommandon finns det helt enkelt ingen motsvarighet i WebdriverIO. I sådana fall ger codemod dig råd om hur du kan refaktorera koden. Om du stöter på sådana felmeddelanden alltför ofta är du välkommen att [skapa ett ärende](https://github.com/webdriverio/codemod/issues/new) och begära att en viss omvandling läggs till. Även om codemod redan omvandlar majoriteten av Protractor-API:et finns det fortfarande mycket utrymme för förbättringar.

## Slutsats

Vi hoppas att den här handledningen guidar dig en bit på vägen genom migreringsprocessen till WebdriverIO. Communityn fortsätter att förbättra codemod samtidigt som den testas med olika team i olika organisationer. Tveka inte att [skapa ett ärende](https://github.com/webdriverio/codemod/issues/new) om du har feedback eller [starta en diskussion](https://github.com/webdriverio/codemod/discussions/new) om du har svårigheter under migreringsprocessen.