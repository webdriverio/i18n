---
id: setuptypes
title: Installationstyper
description: "Jämför sätten att använda WebdriverIO, från råa protokollbindningar till fristående läge och WDIO-testköraren, och välj rätt alternativ."
---

WebdriverIO kan användas för olika ändamål. Det implementerar WebDriver-protokollets API och kan köra en webbläsare på ett automatiserat sätt. Ramverket är utformat för att fungera i vilken miljö som helst och för alla typer av uppgifter. Det är oberoende av ramverk från tredje part och kräver endast Node.js för att köras.

## Protokollbindningar

För grundläggande interaktioner med WebDriver-protokollet använder WebdriverIO sina egna protokollbindningar baserade på NPM-paketet [`webdriver`](https://www.npmjs.com/package/webdriver):

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

Alla [protokollkommandon](api/webdriver) returnerar det råa svaret från automatiseringsdrivrutinen. Paketet är mycket lättviktigt och det finns __ingen__ smart logik som automatisk väntan för att förenkla interaktionen med protokollet.

Vilka protokollkommandon som tillämpas på instansen beror på drivrutinens initiala sessionssvar. Om svaret till exempel indikerar att en mobil session har startats, tillämpar paketet Appium-kommandona på instansens prototyp.

För mer information om gränssnittet för paketet `webdriver`, se [Modules API](/docs/api/modules).

[WebdriverIO DevTools](/docs/devtools) är inte ett automatiseringsprotokoll. Det är felsökningsgränssnittet för att följa en körning live och spela upp spårningar i efterhand.

## Fristående läge

För att förenkla interaktionen med WebDriver-protokollet implementerar paketet `webdriverio` en mängd olika kommandon ovanpå protokollet (t.ex. kommandot [`dragAndDrop`](api/element/dragAndDrop)) samt kärnkoncept som [smarta selektorer](selectors) eller [automatisk väntan](autowait). Exemplet ovan kan förenklas så här:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Att använda WebdriverIO i fristående läge ger dig fortfarande tillgång till alla protokollkommandon, men tillhandahåller dessutom en utökad uppsättning kommandon som ger interaktion med webbläsaren på en högre nivå. Det gör att du kan integrera detta automatiseringsverktyg i ditt eget (test)projekt för att skapa ett nytt automatiseringsbibliotek. Populära exempel är [Oxygen](https://github.com/oxygenhq/oxygen) eller [CodeceptJS](http://codecept.io). Du kan också skriva vanliga Node-skript för att skrapa webben på innehåll (eller vad som helst annat som kräver en körande webbläsare).

Om inga specifika alternativ är angivna kommer WebdriverIO alltid att försöka ladda ner och konfigurera den webbläsardrivrutin som matchar egenskapen `browserName` i dina capabilities. För Chrome och Firefox kan det även installera dem, beroende på om det kan hitta motsvarande webbläsare på datorn.

För mer information om gränssnitten för paketet `webdriverio`, se [Modules API](/docs/api/modules).

## WDIO-testköraren

Huvudsyftet med WebdriverIO är dock end-to-end-testning i stor skala. Vi har därför implementerat en testkörare som hjälper dig att bygga en pålitlig testsvit som är lätt att läsa och underhålla.

Testköraren tar hand om många problem som är vanliga när man arbetar med rena automatiseringsbibliotek. Dels organiserar den dina testkörningar och delar upp testspecifikationer så att dina tester kan köras med maximal samtidighet. Den hanterar också sessionshantering och erbjuder många funktioner som hjälper dig att felsöka problem och hitta fel i dina tester.

Här är samma exempel som ovan, skrivet som en testspecifikation och kört av WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Testköraren är en abstraktion av populära testramverk som Mocha, Jasmine eller Cucumber. För att köra dina tester med WDIO-testköraren, se avsnittet [Kom igång](gettingstarted) för mer information.

För mer information om gränssnittet för testkörarpaketet `@wdio/cli`, se [Modules API](/docs/api/modules).