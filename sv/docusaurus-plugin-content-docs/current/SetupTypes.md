---
id: setuptypes
title: Inställningstyper
---

WebdriverIO kan användas för olika ändamål. Det implementerar WebDriver-protokollets API och kan köra en webbläsare på ett automatiserat sätt. Ramverket är designat för att fungera i vilken miljö som helst och för alla typer av uppgifter. Det är oberoende av tredjepartsramverk och kräver endast Node.js för att köras.

## Protokollbindningar

För grundläggande interaktioner med WebDriver och andra automatiseringsprotokoll använder WebdriverIO sina egna protokollbindningar baserade på NPM-paketet [`webdriver`](https://www.npmjs.com/package/webdriver):

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

Alla [protokollkommandon](api/webdriver) returnerar råsvaret från automatiseringsdrivrutinen. Paketet är mycket lättviktigt och det finns __ingen__ smart logik som auto-waits för att förenkla interaktionen med protokollanvändningen.

Protokollkommandona som tillämpas på instansen beror på det initiala sessionsvaret från drivrutinen. Om svaret till exempel indikerar att en mobilsession startades, tillämpar paketet alla Appium- och Mobile JSON Wire-protokollkommandon på instansprototypen.

Du kan köra samma uppsättning kommandon (förutom mobila) med Chrome DevTools-protokollet genom att importera NPM-paketet [`devtools`](https://www.npmjs.com/package/devtools). Det har samma gränssnitt som paketet `webdriver` men kör sin automatisering baserat på [Puppeteer](https://pptr.dev/).

För mer information om dessa paketgränssnitt, se [Modules API](/docs/api/modules).

## Fristående läge

För att förenkla interaktionen med WebDriver-protokollet implementerar paketet `webdriverio` en mängd kommandon ovanpå protokollet (t.ex. kommandot [`dragAndDrop`](api/element/dragAndDrop)) och kärnkoncept som [smarta selektorer](selectors) eller [auto-waits](autowait). Exemplet ovan kan förenklas så här:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Att använda WebdriverIO i fristående läge ger dig fortfarande tillgång till alla protokollkommandon men tillhandahåller en större uppsättning ytterligare kommandon som ger en interaktion med webbläsaren på högre nivå. Det låter dig integrera detta automatiseringsverktyg i ditt eget (test)projekt för att skapa ett nytt automatiseringsbibliotek. Populära exempel inkluderar [Oxygen](https://github.com/oxygenhq/oxygen) eller [CodeceptJS](http://codecept.io). Du kan också skriva vanliga Node-skript för att skrapa webben efter innehåll (eller något annat som kräver en webbläsare som körs).

Om inga specifika alternativ är inställda kommer WebdriverIO alltid att försöka ladda ner och konfigurera den webbläsardrivrutin som matchar egenskapen `browserName` i dina capabilities. För Chrome och Firefox kan den även installera dem beroende på om den kan hitta motsvarande webbläsare på maskinen.

För mer information om gränssnitten för paketet `webdriverio`, se [Modules API](/docs/api/modules).

## WDIO Testrunner

Huvudsyftet med WebdriverIO är dock end-to-end-testning i stor skala. Vi har därför implementerat en testrunner som hjälper dig att bygga en pålitlig testsvit som är lätt att läsa och underhålla.

Testrunnern tar hand om många problem som är vanliga när man arbetar med vanliga automatiseringsbibliotek. För det första organiserar den dina testkörningar och delar upp testspecifikationer så att dina tester kan köras med maximal samtidighet. Den hanterar också sessionshantering och tillhandahåller många funktioner för att hjälpa dig att felsöka problem och hitta fel i dina tester.

Här är samma exempel som ovan, skrivet som en testspecifikation och exekverad av WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Testrunnern är en abstraktion av populära testramverk som Mocha, Jasmine eller Cucumber. För att köra dina tester med WDIO-testrunnern, se avsnittet [Komma igång](gettingstarted) för mer information.

För mer information om gränssnittet för paketet `@wdio/cli` testrunner, se [Modules API](/docs/api/modules).