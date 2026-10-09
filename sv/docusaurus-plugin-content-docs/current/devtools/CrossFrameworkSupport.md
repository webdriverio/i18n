---
id: cross-framework
title: Stöd för flera ramverk
description: "Jämför hur fullständigt DevTools trace mode fångar körningar i WebdriverIO, Selenium och Nightwatch, och vilka luckor varje adapter har."
---

Trace-formatet och `show-trace`-spelaren är identiska för WebdriverIO / Selenium / Nightwatch; den här sidan visar var fullständigheten i insamlingen skiljer sig åt. För den fullständiga referensen för trace mode, se [Trace Mode](/docs/devtools/wdio/trace-mode).

Transformeringarna som bygger en trace finns i [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), ett lager under adaptrarna, så **trace-formatet och `show-trace`-spelaren är identiska för varje adapter** – samma `.zip` (eller katalog) öppnas i samma spelare oavsett vilken adapter som skapade den. De tre adaptrarna nedan delar dessutom kärnalternativen (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`).

**Fullständigheten i insamlingen varierar dock mellan adaptrar** – WebdriverIO är mest komplett; Selenium och Nightwatch täcker kärnflödet med de luckor som anges nedan. Ramverksspecifik syntax för att aktivera funktionen finns på respektive adaptersida – se [Selenium](/docs/devtools/selenium#trace-mode) och [Nightwatch](/docs/devtools/nightwatch#trace-mode).

Python-adaptern (se flikarna **Python** på sidan [Selenium](/docs/devtools/selenium)) skriver samma arkiv och öppnas i samma spelare, men finns inte med i den här tabellen: den kör inget JavaScript i testprocessen, så backend bygger sin trace från den insamlade strömmen i stället för att adaptern bygger den i processen. Granularitet och lagring har Python-motsvarigheter – `--devtools-trace-granularity session|test` och `--devtools-trace-policy`, där den senares omförsöksmedvetna värden degraderas till `retain-on-failure` eftersom inget i det protokollet bär ett försöksnummer. De rader som saknar Python-motsvarighet är de som gäller artefakter per test: `screenshot`, `video` och inline-bifogning i Allure. Vad den faktiskt fångar – DOM-tidsresor, den täta filmremsan, A11y-trädet och elementöverlägget, kommandon, konsol, nätverk, assertions, körkontroller och Preserve & Rerun – beskrivs på en egen sida.

| Funktion | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| Trace mode + `show-trace`-spelare | ✅ | ✅ | ✅ |
| DOM-tidsresor (insamling av mutationer) | ✅ | ✅ ¹ | ✅ |
| A11y-flik + överlägg för att välja locator (trace-spelare) | ✅ | ✅ | ✅ |
| Transkript + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` per test | ✅ inline i Allure | ✅ inline i Allure | ⚠️ endast generering ² |
| Automatisk identifiering av `emitArtifactsManifest` | ✅ | ✅ | ⚠️ endast opt-in |
| Omförsöksmedveten `tracePolicy` | ✅ | ✅ | ⚠️ endast `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-objekt; BDD `describe/it` slås ihop till ett sessionssegment |
| Cucumber-nästling Feature→Scenario→Step | Scenario→Step ⁴ | ✅ fullständig | Feature→Scenario ⁵ |
| BiDi-insamling (konsol / nätverk / undantag) | ✅ automatisk | ✅ automatisk | ⚠️ opt-in (`bidi: true` + `webSocketUrl`) |
| Skärminspelning (filmremsa / video) | CDP push | CDP push | endast polling |
| A11y-flik + överlägg i live-dashboard | ✅ | endast trace-spelare | endast trace-spelare |

¹ Selenium rekonstruerar DOM per navigering; förankringstidpunkten är ungefärlig (en navigerings ögonblicksbild kan släpa efter kommandot som utlöste den).
² Nightwatch har inget API för att bifoga till Allure i realtid, så artefakter per test skrivs till trace-utdatakatalogen och listas i manifestet, men bifogas inte till ett Allure-test.
³ Nightwatchs `--retries` kör om ett test internt utan att åter utlösa pluginens hooks per test, så de omförsöksmedvetna policyerna (`on-first-retry`, `retain-on-first-failure`, …) degraderas till `retain-on-failure`.
⁴ WebdriverIO bär ännu inte med sig härkomst på feature-nivå, så dess Cucumber-nästling är Scenario→Step.
⁵ Nightwatch stämplar ännu inte nästling per steg (endast Feature→Scenario).