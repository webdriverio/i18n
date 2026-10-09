---
id: protocols
title: Protokollkommandon
---

WebdriverIO är ett automationsramverk som förlitar sig på olika automationsprotokoll för att styra en fjärragent, t.ex. för en webbläsare, mobil enhet eller TV. Beroende på fjärrenheten kommer olika protokoll till användning. Dessa kommandon tilldelas [Browser](/docs/api/browser)- eller [Element](/docs/api/element)-objektet beroende på sessionsinformationen från fjärrservern (t.ex. webbläsardrivrutinen).

Internt använder WebdriverIO protokollkommandon för nästan alla interaktioner med fjärragenten. Ytterligare kommandon som tilldelas [Browser](/docs/api/browser)- eller [Element](/docs/api/element)-objektet förenklar dock användningen av WebdriverIO. Att till exempel hämta texten för ett element med hjälp av protokollkommandon skulle se ut så här:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Med de praktiska kommandona i [Browser](/docs/api/browser)- eller [Element](/docs/api/element)-objektet kan detta reduceras till:

```js
$('#lst-ib').getText()
```

Följande avsnitt förklarar varje enskilt protokoll.

## WebDriver Protocol

[WebDriver](https://w3c.github.io/webdriver/#elements)-protokollet är en webbstandard för att automatisera webbläsare. Till skillnad från vissa andra E2E-verktyg garanterar det att automatisering kan utföras i faktiska webbläsare som används av dina användare, t.ex. Firefox, Safari och Chrome samt Chromium-baserade webbläsare som Edge, och inte bara i webbläsarmotorer, t.ex. WebKit, som skiljer sig mycket åt.

Fördelen med att använda WebDriver-protokollet jämfört med felsökningsprotokoll som [Chrome DevTools](https://w3c.github.io/webdriver/#elements) är att du har en specifik uppsättning kommandon som gör det möjligt att interagera med webbläsaren på samma sätt i alla webbläsare, vilket minskar risken för instabila tester. Dessutom erbjuder detta protokoll möjligheter till massiv skalbarhet genom att använda molnleverantörer som [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) och [andra](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## WebDriver Bidi Protocol

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)-protokollet är andra generationen av protokollet och utvecklas för närvarande av de flesta webbläsarleverantörer. Jämfört med sin föregångare stöder protokollet en dubbelriktad kommunikation (därav "Bidi") mellan ramverket och fjärrenheten. Det introducerar dessutom ytterligare primitiver för bättre insyn i webbläsaren för att bättre automatisera moderna webbapplikationer i webbläsaren.

Eftersom detta protokoll fortfarande är under utveckling kommer fler funktioner att läggas till över tid och stödjas av webbläsare. Om du använder WebdriverIOs praktiska kommandon kommer ingenting att förändras för dig. WebdriverIO kommer att använda dessa nya protokollfunktioner så snart de är tillgängliga och stöds i webbläsaren.

## Appium

[Appium](https://appium.io/)-projektet tillhandahåller möjligheter att automatisera mobila enheter, datorer och alla andra typer av IoT-enheter. Medan WebDriver fokuserar på webbläsare och webben är visionen för Appium att använda samma tillvägagångssätt men för vilken enhet som helst. Utöver de kommandon som WebDriver definierar har det specialkommandon som ofta är specifika för den fjärrenhet som automatiseras. För mobila testscenarier är detta idealiskt när du vill skriva och köra samma tester för både Android- och iOS-applikationer.

Enligt Appiums [dokumentation](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) utformades det för att möta behoven inom mobil automatisering enligt en filosofi som beskrivs av följande fyra principer:

- Du ska inte behöva kompilera om din app eller modifiera den på något sätt för att automatisera den.
- Du ska inte vara låst till ett specifikt språk eller ramverk för att skriva och köra dina tester.
- Ett ramverk för mobil automatisering ska inte uppfinna hjulet på nytt när det gäller automations-API:er.
- Ett ramverk för mobil automatisering ska vara öppen källkod, i anda och praktik såväl som till namnet!

## Chromium

Chromium-protokollet erbjuder en utökad uppsättning kommandon ovanpå WebDriver-protokollet som endast stöds när automatiserade sessioner körs via [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) eller [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

Firefox-protokollet erbjuder en utökad uppsättning kommandon ovanpå WebDriver-protokollet som endast stöds när automatiserade sessioner körs via [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

[Sauce Labs](https://saucelabs.com/)-protokollet erbjuder en utökad uppsättning kommandon ovanpå WebDriver-protokollet som endast stöds när automatiserade sessioner körs med Sauce Labs-molnet.

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/)-protokollet erbjuder en utökad uppsättning kommandon ovanpå WebDriver-protokollet som endast stöds när automatiserade sessioner körs med Selenium Grid.