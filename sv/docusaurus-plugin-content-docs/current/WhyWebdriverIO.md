---
id: why-webdriverio
title: Varför Webdriver.IO?
---

WebdriverIO är ett progressivt automationsramverk byggt för att automatisera moderna webb- och mobilapplikationer. Det förenklar interaktionen med din app och tillhandahåller en uppsättning plugins som hjälper dig att skapa en skalbar, robust och stabil testsvit.

Det är designat för att vara:

- __Utökningsbart__ - Att lägga till hjälpfunktioner eller mer komplicerade uppsättningar och kombinationer av befintliga kommandon är __enkelt__ och __mycket användbart__
- __Kompatibelt__ - WebdriverIO kan köras på [WebDriver Protocol](https://w3c.github.io/webdriver/) för __äkta webbläsaroberoende testning__ samt [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) för Chromium-baserad automation med hjälp av [Puppeteer](https://pptr.dev/).
- __Funktionsrikt__ - Den stora variationen av inbyggda och community-plugins gör att du enkelt kan __integrera__ och __utöka__ din uppsättning för att uppfylla dina krav.

Du kan använda WebdriverIO för att automatisera:

- 🌐 <span>&nbsp;</span> __moderna webbapplikationer__ skrivna i React, Vue, Angular, Svelte eller andra frontend-ramverk
- 📱 <span>&nbsp;</span> __hybrid__ eller __native mobilapplikationer__ som körs i en emulator/simulator eller på en fysisk enhet
- 💻 <span>&nbsp;</span> __native datorapplikationer__ (t.ex. skrivna med Electron.js)
- 📦 <span>&nbsp;</span> __enhets- eller komponenttestning__ av webbkomponenter i webbläsaren

## Baserat på webbstandarder

WebdriverIO utnyttjar kraften i [WebDriver](https://w3c.github.io/webdriver/) och [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) protokollen som utvecklas och stöds av alla webbläsartillverkare och garanterar en äkta webbläsaroberoende testupplevelse. Medan andra automationsverktyg kräver att du laddar ner modifierade webbläsarmotorer som inte används av faktiska användare eller emulerar användarbeteende genom att injicera JavaScript, förlitar sig WebdriverIO på en gemensamt överenskommen standard för automation som är [ordentligt testad](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) och säkerställer kompatibilitet för decennier framöver.

Dessutom har WebdriverIO också stöd för alternativa, proprietära automationsprotokoll som [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) för felsökning och introspektionsändamål. Detta gör att användaren sömlöst kan växla mellan konventionella kommandon baserade på WebDriver och kraftfulla webbläsarinteraktioner genom [Puppeteer](https://pptr.dev/).

Läs mer om skillnaderna mellan dessa automationsstandarder i avsnittet om [Automationsprotokoll](automationProtocols).

## Äkta öppen källkod

Jämfört med många automationsverktyg i ekosystemet är WebdriverIO ett verkligt öppen källkodsprojekt som drivs med öppen styrning och ägs av en ideell organisation kallad [OpenJS Foundation](https://openjsf.org/). Detta binder juridiskt projektet till att växa och styras i intresse för alla deltagare. Projektteamet värdesätter öppenhet och samarbete och drivs inte av monetära intressen.

Detta gör projektet oberoende i hur det utvecklas och vart det ska gå. Det låter oss erbjuda gratis support dygnet runt i vår [community-kanal](https://discord.webdriver.io) när vi bygger en hållbar gemenskap som stödjer och lär av varandra. Slutligen ger det många möjligheter till de personer som bidrar och engagerar sig i projektet tack vare dess [öppna styrning](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md).