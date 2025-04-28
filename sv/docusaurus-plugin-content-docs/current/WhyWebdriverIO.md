---
id: why-webdriverio
title: Varför Webdriver.IO?
---

WebdriverIO är ett progressivt automatiseringsramverk byggt för att automatisera moderna webb- och mobilapplikationer. Det förenklar interaktionen med din app och tillhandahåller en uppsättning plugins som hjälper dig att skapa en skalbar, robust och stabil testsvit.

Det är utformat för att vara:

- __Utökningsbart__ - Att lägga till hjälpfunktioner eller mer komplicerade uppsättningar och kombinationer av befintliga kommandon är __enkelt__ och __mycket användbart__
- __Kompatibelt__ - WebdriverIO kan köras på [WebDriver Protocol](https://w3c.github.io/webdriver/) för __äkta cross-browser-testning__ såväl som [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) för Chromium-baserad automatisering med hjälp av [Puppeteer](https://pptr.dev/).
- __Funktionsrikt__ - Den stora variationen av inbyggda och gemenskapsplugins gör att du __enkelt kan integrera__ och __utöka__ din installation för att uppfylla dina krav.

Du kan använda WebdriverIO för att automatisera:

- 🌐 <span>&nbsp;</span> __moderna webbapplikationer__ skrivna i React, Vue, Angular, Svelte eller andra frontend-ramverk
- 📱 <span>&nbsp;</span> __hybrid__ eller __nativa mobilapplikationer__ som körs i en emulator/simulator eller på en riktig enhet
- 💻 <span>&nbsp;</span> __nativa skrivbordsapplikationer__ (t.ex. skrivna med Electron.js)
- 📦 <span>&nbsp;</span> __enhets- eller komponenttestning__ av webbkomponenter i webbläsaren

## Baserat på webbstandarder

WebdriverIO utnyttjar kraften i [WebDriver](https://w3c.github.io/webdriver/) och [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) protokollen som utvecklas och stöds av alla webbläsarleverantörer och garanterar en äkta cross-browser-testupplevelse. Medan andra automatiseringsverktyg kräver att du laddar ner modifierade webbläsarmotorer som inte används av faktiska användare eller emulerar användarbeteende genom att injicera JavaScript, förlitar sig WebdriverIO på en gemensamt överenskommen standard för automatisering som är [ordentligt testad](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) och säkerställer kompatibilitet för årtionden framöver.

Dessutom har WebdriverIO även stöd för alternativa, proprietära automatiseringsprotokoll som [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) för felsökning och introspektionsändamål. Detta gör att användaren sömlöst kan växla mellan konventionella kommandon baserade på WebDriver och kraftfulla webbläsarinteraktioner genom [Puppeteer](https://pptr.dev/).

Läs mer om skillnaderna mellan dessa automatiseringsstandarder i avsnittet om [Automation Protocols](automationProtocols).

## Verkligt öppen källkod

Jämfört med många automatiseringsverktyg i ekosystemet är WebdriverIO ett verkligt öppen källkodsprojekt som drivs med öppen styrning och ägs av en ideell organisation kallad [OpenJS Foundation](https://openjsf.org/). Detta binder juridiskt projektet till att växa och ledas i intresse för alla deltagare. Projektteamet värdesätter öppenhet och samarbete och drivs inte av monetära intressen.

Detta gör projektet oberoende i hur det utvecklas och vart det är tänkt att gå. Det låter oss tillhandahålla gratis support dygnet runt i vår [gemenskapskanal](https://discord.webdriver.io) när vi bygger en hållbar gemenskap som stödjer och lär från varandra. Slutligen ger det många möjligheter till personer som bidrar till och engagerar sig i projektet på grund av dess [öppna styrning](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md).