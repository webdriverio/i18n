---
id: protocols
title: Protokollkommandon
---

WebdriverIO är ett automatiseringsramverk som förlitar sig på olika automatiseringsprotokoll för att styra en fjärragent, t.ex. för en webbläsare, mobil enhet eller tv. Beroende på fjärrenheten kommer olika protokoll in i bilden. Dessa kommandon tilldelas [Browser](/docs/api/browser)- eller [Element](/docs/api/element)-objektet beroende på sessionsinformationen från fjärrservern (t.ex. webbläsardrivrutinen).

Internt använder WebdriverIO protokollkommandon för nästan alla interaktioner med fjärragenten. Men ytterligare kommandon tilldelade till [Browser](/docs/api/browser)- eller [Element](/docs/api/element)-objektet förenklar användningen av WebdriverIO, t.ex. att få texten från ett element med hjälp av protokollkommandon skulle se ut så här:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Med hjälp av de bekväma kommandona från [Browser](/docs/api/browser)- eller [Element](/docs/api/element)-objektet kan detta reduceras till:

```js
$('#lst-ib').getText()
```

Följande avsnitt förklarar varje enskilt protokoll.

## WebDriver Protocol

[WebDriver](https://w3c.github.io/webdriver/#elements)-protokollet är en webbstandard för automatisering av webbläsare. Till skillnad från vissa andra E2E-verktyg garanterar det att automatisering kan göras på faktiska webbläsare som används av dina användare, t.ex. Firefox, Safari och Chrome och Chromium-baserade webbläsare som Edge, och inte bara på webbläsarmotorer, t.ex. WebKit, som är mycket annorlunda.

Fördelen med att använda WebDriver-protokollet till skillnad från felsökningsprotokoll som [Chrome DevTools](https://w3c.github.io/webdriver/#elements) är att du har en specifik uppsättning kommandon som gör att du kan interagera med webbläsaren på samma sätt i alla webbläsare vilket minskar risken för instabilitet. Dessutom erbjuder detta protokoll möjligheter för massiv skalbarhet genom att använda molnleverantörer som [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) och [andra](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## WebDriver Bidi Protocol

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)-protokollet är andra generationens protokoll och arbetas för närvarande på av de flesta webbläsarleverantörer. Jämfört med sin föregångare stöder protokollet en dubbelriktad kommunikation (därav "Bidi") mellan ramverket och fjärrenheten. Det introducerar dessutom ytterligare primitiver för bättre webbläsarintrospection för att bättre automatisera moderna webbapplikationer i webbläsaren.

Eftersom detta protokoll för närvarande är under utveckling kommer fler funktioner att läggas till över tid och stödjas av webbläsaren. Om du använder WebdriverIOs praktiska kommandon kommer inget att förändras för dig. WebdriverIO kommer att använda dessa nya protokollfunktioner så snart de finns tillgängliga och stöds i webbläsaren.

## Appium

[Appium](https://appium.io/)-projektet tillhandahåller möjligheter att automatisera mobila, stationära och alla andra typer av IoT-enheter. Medan WebDriver fokuserar på webbläsare och webben är Appiums vision att använda samma tillvägagångssätt men för vilken godtycklig enhet som helst. Utöver de kommandon som WebDriver definierar har det speciella kommandon som ofta är specifika för fjärrenheten som automatiseras. För mobila testscenarier är detta idealiskt när du vill skriva och köra samma tester för både Android- och iOS-applikationer.

Enligt Appiums [dokumentation](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) designades det för att möta behoven av mobil automatisering enligt en filosofi som beskrivs av följande fyra principer:

- Du ska inte behöva kompilera om din app eller modifiera den på något sätt för att automatisera den.
- Du ska inte vara låst till ett specifikt språk eller ramverk för att skriva och köra dina tester.
- Ett ramverk för mobil automatisering bör inte uppfinna hjulet på nytt när det gäller automatiserings-API:er.
- Ett ramverk för mobil automatisering bör vara öppen källkod, i anda och praktik såväl som i namn!

## Chromium

Chromium-protokollet erbjuder en utökad uppsättning kommandon utöver WebDriver-protokollet som endast stöds när automatiserade sessioner körs genom [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) eller [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

Firefox-protokollet erbjuder en utökad uppsättning kommandon utöver WebDriver-protokollet som endast stöds när automatiserade sessioner körs genom [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

[Sauce Labs](https://saucelabs.com/)-protokollet erbjuder en utökad uppsättning kommandon utöver WebDriver-protokollet som endast stöds när automatiserade sessioner körs med Sauce Labs-molnet.

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/)-protokollet erbjuder en utökad uppsättning kommandon utöver WebDriver-protokollet som endast stöds när automatiserade sessioner körs med Selenium Grid.

## JSON Wire Protocol

[JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) är föregångaren till WebDriver-protokollet och är idag __föråldrat__. Även om vissa kommandon fortfarande kan stödjas i vissa miljöer rekommenderas det inte att använda något av dess kommandon.

## Mobile JSON Wire Protocol

[Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) är en utökad uppsättning mobilkommandon ovanpå JSON Wire Protocol. Eftersom detta är föråldrat blev även Mobile JSON Wire Protocol __föråldrat__. Appium kan fortfarande stödja några av dess kommandon men det rekommenderas inte att använda dem.