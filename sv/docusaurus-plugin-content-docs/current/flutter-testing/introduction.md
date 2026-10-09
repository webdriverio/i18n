---
id: introduction
title: Introduktion
description: "Få en översikt över end-to-end-testning av Flutter-appar på Android och iOS med WebdriverIO, Appium och Appium Flutter Driver."
---

Den här guiden beskriver hur du konfigurerar, strukturerar och kör End-to-End-tester (E2E) för **Flutter**-applikationer med **WebdriverIO** och **Appium**.

WebdriverIO tillhandahåller ett Node.js-baserat testramverk med inbyggt stöd för WebDriver- och Appium-protokollen, vilket gör att du kan automatisera Flutter-applikationer på både Android och iOS.

---

### Den arkitektoniska utmaningen: Varför Flutter är annorlunda

När man automatiserar vanliga native-mobilappar (Kotlin/Java på Android eller Swift/Objective-C på iOS) fungerar Appium-drivrutinerna (`UiAutomator2` för Android, `XCUITest` för iOS) som åtkomstpunkt för att inspektera och interagera med applikationen genom att fråga operativsystemets inbyggda tillgänglighetsträd. Dessa drivrutiner läser UI-komponenter på OS-nivå (knappar, inmatningsfält, etiketter) och exponerar dem för inspektionsverktyg och testskript med hjälp av vanliga lokaliseringsstrategier såsom ID, Accessibility ID eller XPath.

Flutter fungerar annorlunda:

Flutter använder inte operativsystemets inbyggda UI-komponenter. I stället renderar det sitt gränssnitt direkt på en canvas som renderas via en internt inbyggd grafikmotor. Ramverket ritar sina egna widgets pixel för pixel.

#### Påverkan på traditionell automatisering
För vanliga native-drivrutiner och inspektörer framstår en Flutter-app ofta som en enda grafisk yta. Interna widgets (såsom knappar eller textfält) finns som standard inte i operativsystemets tillgänglighetsträd. Därför kan vanliga native-lokaliseringsstrategier inte interagera direkt med interna Flutter-widgets.

---

### Hur WebdriverIO och Appium hanterar Flutter

WebdriverIO och Appium tillhandahåller de verktyg som krävs för att interagera med Flutters interna widgetträd, men du behöver installera och konfigurera lämplig drivrutin och lämpliga lokaliseringstillägg för ditt projekt.

Genom att använda [Appium Flutter Driver](https://github.com/appium/appium-flutter-driver) ansluter Appium till Flutters testtillägg (`flutter_driver`). Detta ger dig tillgång till Flutter-specifika lokaliseringsstrategier (Finders), bland annat:

* `byValueKey`: Hittar widgets via deras explicita `Key` i Flutter-koden.
* `byText`: Hittar widgets via synligt textinnehåll.
* `byTooltip`: Hittar widgets via deras tooltip-text.

Följande avsnitt går igenom förutsättningarna, konfigurationen av miljön och hur du skriver din första testsvit.