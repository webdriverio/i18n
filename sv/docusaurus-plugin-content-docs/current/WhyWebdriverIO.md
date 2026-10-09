---
id: why-webdriverio
title: Varför WebdriverIO?
description: Vad som skiljer WebdriverIO från andra verktyg för testautomatisering – ett API för alla plattformar, webbstandarder, öppen styrning och förstklassigt stöd för kodagenter.
---

WebdriverIO är ett ramverk med öppen källkod för testautomatisering i Node.js. Med en testkörare och ett API kan du automatisera webbläsare, native- och hybridappar för mobilen, skrivbordsappar och editortillägg, och dessutom lägga till visuell testning, tillgänglighetstestning och komponenttestning. Det drivs av sin community under paraplyet [OpenJS Foundation](https://openjsf.org/).

## Ett ramverk för alla plattformar

De flesta team levererar mer än en webbplats. Med WebdriverIO kan du testa allt med samma selektorer, assertions, rapportörer och CI-uppsättning:

| Plattform | Hur WebdriverIO automatiserar den | Börja här |
| --- | --- | --- |
| Webbläsare | WebDriver och WebDriver BiDi i Chrome, Firefox, Safari och Edge | [Webbläsare](/docs/platforms/web) |
| Webbkomponenter | Komponenttester i en riktig webbläsare för React, Vue, Svelte, Solid, Preact, Lit och Stencil | [Komponenttestning](/docs/component-testing) |
| Mobilappar | Native, hybrid och mobilwebb på iOS och Android via Appium, inklusive Flutter | [Mobilappar](/docs/platforms/mobile) |
| Skrivbordsappar | Electron-, Tauri- och Dioxus-appar på macOS, Windows och Linux, native macOS-appar via Appium | [Skrivbordsappar](/docs/platforms/desktop) |
| Editorer och tillägg | VS Code-tillägg och webbläsartillägg | [Tillägg och editorer](/docs/platforms/apps-and-extensions) |
| Visuella regressioner | Jämförelser av skärm, element och hela sidor för webb och mobil | [Visuell testning](/docs/visual-testing) |

Samma test kan till och med styra flera av dessa samtidigt, t.ex. en mobilapp och en webbpanel i ett och samma scenario, med [multi-remote](/docs/multiremote).

## Byggt på webbstandarder

WebdriverIO automatiserar webbläsare via [WebDriver](https://w3c.github.io/webdriver/) och [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), de W3C-standarder som alla webbläsarleverantörer implementerar och [testar](https://wpt.fyi/results/webdriver/tests). Dina tester körs mot samma webbläsarversioner som dina användare har, och interaktioner som klick och tangenttryckningar skickas av webbläsaren själv i stället för att emuleras med JavaScript. WebDriver BiDi tillför nätverksmockning, konsol- och logghändelser med mera i alla webbläsare, inte bara Chromium.

När du behöver webbläsarspecifika möjligheter ger WebdriverIO dig tillgång till Chrome DevTools Protocol via [Puppeteer](/docs/api/browser/getPuppeteer). Läs mer i [Automatiseringsprotokoll](/docs/automationProtocols).

## Communitydrivet och öppet styrt

WebdriverIO är inte en produkt från en testleverantör. Projektet:

- ägs av [OpenJS Foundation](https://openjsf.org/), en leverantörsneutral ideell organisation, vilket juridiskt förpliktar det att tjäna alla sina användares intressen
- följer en offentlig [styrningsmodell](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md): vem som helst kan bidra, och committers samt den tekniska styrgruppen (Technical Steering Committee) växer fram ur communityn
- har ingen betalnivå och inga låsta funktioner; varje funktion är gratis och du kan köra dina tester var som helst, lokalt eller hos valfri molnleverantör
- kanaliserar sponsring tillbaka till de personer som bygger det genom ett [stipendieprogram för bidragsgivare](/blog/2024/02/15/new-contributor-stipend-program)
- erbjuder gratis communitysupport på [Discord](https://discord.webdriver.io) och [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions)

## Redo för kodagenter

Dokumentationen, verktygen och testartefakterna är utformade så att kodagenter kan arbeta med WebdriverIO på egen hand:

- **Agentanpassad dokumentation**: varje sida finns tillgänglig som Markdown, det finns en kurerad [`llms.txt`](https://webdriver.io/llms.txt) och en MCP-server för dokumentationen på `https://webdriver.io/mcp`.
- **WebdriverIO MCP**: servern [`@wdio/mcp`](/docs/mcp) låter en agent styra webbläsare och mobilappar för att utforska ditt gränssnitt och verifiera selektorer.
- **Traces**: [DevTools trace-läge](/docs/devtools/wdio/trace-mode) skriver en transkription i Markdown, skärmbilder och tillgänglighetsögonblicksbilder för varje misslyckat test.

Se [WebdriverIO för kodagenter](/docs/ai-agents) för hur du konfigurerar det.

## Allt som behövs ingår, lätt att utöka

- En [testkörare](/docs/testrunner) med stöd för Mocha, Jasmine och Cucumber, parallell körning, [sharding](/docs/sharding), [omförsök](/docs/retry) och ett [bevakningsläge](/docs/watcher)
- [Automatisk väntan](/docs/autowait) för varje interaktion och ett inbyggt [assertion-bibliotek](/docs/assertion)
- [Nätverksmockning](/docs/mocksandspies), [emulering](/docs/emulation) och [snapshot-testning](/docs/snapshot)
- En [felsökningspanel och trace-visare](/docs/devtools)
- [Över 70 tjänster och rapportörer](/docs/ecosystem) för moln, ramverk och CI, plus enkla API:er för att skriva egna [kommandon](/docs/customcommands), [tjänster](/docs/customservices) och [rapportörer](/docs/customreporter)

## När du bör välja något annat

WebdriverIO passar bra när du testar mer än en plattform, vill köra mot riktiga webbläsare och enheter eller värdesätter ett oberoende, communityägt verktyg. Om du bara någonsin testar en enda webbapp i en enda webbläsare och inte behöver mobil-, skrivbords- eller molnenheter kan ett verktyg som enbart hanterar webbläsare kännas lättare att komma igång med. Om du är osäker kan du [skapa ett projekt](/docs/gettingstarted) med `npm init wdio@latest` och prova: uppsättningen tar ungefär en minut.

## Nästa steg

- [Kom igång](/docs/gettingstarted) - skapa ett projekt och kör ditt första test
- [Typer av uppsättning](/docs/setuptypes) - testkörare eller fristående läge
- [WebdriverIO för kodagenter](/docs/ai-agents) - konfigurera din agent