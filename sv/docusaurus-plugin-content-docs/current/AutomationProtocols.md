---
id: automationProtocols
title: Automationsprotokoll
---

Med WebdriverIO kan du välja mellan flera automationstekniker när du kör dina E2E-tester lokalt eller i molnet. Som standard kommer WebdriverIO att försöka starta en lokal automationssession med hjälp av [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) protokollet.

## WebDriver Bidi-protokoll

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) är ett automationsprotokoll för att automatisera webbläsare med hjälp av dubbelriktad kommunikation. Det är efterföljaren till [WebDriver](https://w3c.github.io/webdriver/) protokollet och möjliggör många fler introspektionsmöjligheter för olika testfall.

Detta protokoll är för närvarande under utveckling och nya primitiver kan komma att läggas till i framtiden. Alla webbläsarleverantörer har åtagit sig att implementera denna webstandard och många [primitiver](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned) har redan landat i webbläsare.

## WebDriver-protokoll

> [WebDriver](https://w3c.github.io/webdriver/) är ett fjärrkontrollsgränssnitt som möjliggör inspektion och kontroll av användaragenter. Det tillhandahåller ett plattforms- och språkneutralt trådprotokoll som ett sätt för program utanför processen att fjärrstyra beteendet hos webbläsare.

WebDriver-protokollet utformades för att automatisera en webbläsare från användarperspektivet, vilket innebär att allt en användare kan göra kan du göra med webbläsaren. Det tillhandahåller en uppsättning kommandon som abstraherar vanliga interaktioner med en applikation (t.ex. navigering, klickning eller läsning av ett elements tillstånd). Eftersom det är en webstandard är det väl stött av alla större webbläsarleverantörer och används också som ett underliggande protokoll för mobilautomation med [Appium](http://appium.io).

För att använda detta automationsprotokoll behöver du en proxyserver som översätter alla kommandon och utför dem i målmiljön (dvs. webbläsaren eller mobilappen).

För webbläsarautomation är proxyservern vanligtvis webbläsardrivrutinen. Det finns drivrutiner tillgängliga för alla webbläsare:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

För alla typer av mobilautomation behöver du installera och konfigurera [Appium](http://appium.io). Det låter dig automatisera mobila (iOS/Android) eller till och med skrivbordsapplikationer (macOS/Windows) med samma WebdriverIO-installation.

Det finns också många tjänster som låter dig köra dina automationstester i molnet i stor skala. Istället för att behöva konfigurera alla dessa drivrutiner lokalt kan du bara kommunicera med dessa tjänster (t.ex. [Sauce Labs](https://saucelabs.com)) i molnet och inspektera resultaten på deras plattform. Kommunikationen mellan testskript och automationsmiljö kommer att se ut som följer:

![WebDriver Setup](/img/webdriver.png)