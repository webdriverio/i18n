---
id: protocols
title: Protokollkommandon
---

WebdriverIO är ett automatiseringsramverk som förlitar sig på olika automatiseringsprotokoll för att kontrollera en fjärragent, t.ex. för en webbläsare, mobil enhet eller tv. Beroende på fjärrenheten kommer olika protokoll i spel. Dessa kommandon tilldelas [Browser](/docs/api/browser)- eller [Element](/docs/api/element)-objektet beroende på sessionsinformationen från fjärrservern (t.ex. webbläsarens drivrutin).

Internt använder WebdriverIO protokollkommandon för nästan alla interaktioner med fjärragenten. Ytterligare kommandon som tilldelats [Browser](/docs/api/browser)- eller [Element](/docs/api/element)-objektet förenklar dock användningen av WebdriverIO. Att till exempel hämta texten från ett element med protokollkommandon skulle se ut så här:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Med de bekväma kommandona från [Browser](/docs/api/browser)- eller [Element](/docs/api/element)-objektet kan detta reduceras till:

```js
$('#lst-ib').getText()
```

Följande avsnitt förklarar varje enskilt protokoll.

## WebDriver-protokoll

[WebDriver](https://w3c.github.io/webdriver/#elements)-protokollet är en webbstandard för att automatisera webbläsare. Till skillnad från andra E2E-verktyg garanterar det att automatisering kan göras på faktiska webbläsare som används av dina användare, t.ex. Firefox, Safari och Chrome och Chromium-baserade webbläsare som Edge, och inte bara på webbläsarmotorer, t.ex. WebKit, som är mycket annorlunda.

Fördelen med att använda WebDriver-protokollet i jämförelse med felsökningsprotokoll som [Chrome DevTools](https://w3c.github.io/webdriver/#elements) är att du har en specifik uppsättning kommandon som låter dig interagera med webbläsaren på samma sätt i alla webbläsare, vilket minskar risken för instabilitet. Dessutom erbjuder detta protokoll möjligheter för massiv skalbarhet genom att använda molnleverantörer som [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) och [andra](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## WebDriver Bidi-protokoll

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)-protokollet är andra generationens protokoll och utvecklas för närvarande av de flesta webbläsarleverantörer. Jämfört med sin föregångare stöder protokollet en dubbelriktad kommunikation (därav "Bidi") mellan ramverket och fjärrenheten. Det introducerar dessutom ytterligare primitiver för bättre webbläsarintrospektion för att bättre automatisera moderna webbapplikationer i webbläsaren.

Eftersom detta protokoll för närvarande är under utveckling kommer fler funktioner att läggas till med tiden och stödjas av webbläsare. Om du använder WebdriverIOs bekväma kommandon kommer inget att förändras för dig. WebdriverIO kommer att utnyttja dessa nya protokollfunktioner så snart de är tillgängliga och stöds i webbläsaren.

## Appium

[Appium](https://appium.io/)-projektet tillhandahåller funktioner för att automatisera mobila, stationära och alla andra typer av IoT-enheter. Medan WebDriver fokuserar på webbläsare och webben är Appiums vision att använda samma tillvägagångssätt men för vilken godtycklig enhet som helst. Utöver de kommandon som WebDriver definierar har det särskilda kommandon som ofta är specifika för fjärrenheten som automatiseras. För mobiltestarscenarier är detta idealiskt när du vill skriva och köra samma tester för både Android- och iOS-applikationer.

Enligt Appiums [dokumentation](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) designades det för att möta behoven för mobilautomatisering enligt en filosofi som beskrivs av följande fyra principer:

- Du ska inte behöva kompilera om din app eller modifiera den på något sätt för att automatisera den.
- Du ska inte vara låst till ett specifikt språk eller ramverk för att skriva och köra dina tester.
- Ett ramverk för mobilautomatisering bör inte uppfinna hjulet på nytt när det gäller automatiserings-API:er.
- Ett ramverk för mobilautomatisering bör vara öppen källkod, i anda och praktik såväl som i namn!

## Chromium

Chromium-protokollet erbjuder en överuppsättning av kommandon utöver WebDriver-protokollet som endast stöds när automatiserade sessioner körs genom [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) eller [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

Firefox-protokollet erbjuder en överuppsättning av kommandon utöver WebDriver-protokollet som endast stöds när automatiserade sessioner körs genom [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

[Sauce Labs](https://saucelabs.com/)-protokollet erbjuder en överuppsättning av kommandon utöver WebDriver-protokollet som endast stöds när automatiserade sessioner körs med Sauce Labs-molnet.

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/)-protokollet erbjuder en överuppsättning av kommandon utöver WebDriver-protokollet som endast stöds när automatiserade sessioner körs med Selenium Grid.

## JSON Wire Protocol

[JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) är föregångaren till WebDriver-protokollet och är idag __föråldrat__. Även om vissa kommandon fortfarande kan stödjas i vissa miljöer rekommenderas det inte att använda något av dess kommandon.

## Mobile JSON Wire Protocol

[Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) är en överuppsättning av mobilkommandon utöver JSON Wire Protocol. Eftersom denna är föråldrad har även Mobile JSON Wire Protocol blivit __föråldrat__. Appium kan fortfarande stödja några av dess kommandon, men det rekommenderas inte att använda dem.