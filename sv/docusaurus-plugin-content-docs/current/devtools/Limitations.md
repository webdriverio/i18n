---
id: limitations
title: Begränsningar i spårningsläget
description: "Gå igenom vad DevTools spårningsläge medvetet inte fångar och de kända begränsningarna i adaptrarna för WebdriverIO, Selenium och Nightwatch."
---

Vad [spårningsläget](/docs/devtools/wdio/trace-mode) medvetet hoppar över, samt de kända luckorna i de olika adaptrarna.

## Vad spårningsläget hoppar över

- **DevTools UI-fönster** — ingen Chrome-instans öppnas för instrumentpanelen.
- **Port-bindning för backend** — ingen localhost-port reserveras (gäller lika för alla tre adaptrar från och med v1.2+).
- **`screencast.enabled`** — den kontinuerliga `.webm`-inspelningen från live-läget ignoreras i spårningsläget (en varning loggas). Spårningsläget spelar i stället in en tät [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) i arkivet **som standard** (ange `filmstrip: false` för en bildruta per åtgärd), plus [`video`](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video)-segment per test när det är aktiverat. **Inställningsfälten** för screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) gäller fortfarande för den inspelare som körs.
- **`wdio-trace-<sessionId>.json`-dumpen** — helt borttagen. Den äldre monolitiska JSON-fil som WDIO:s live-läge tidigare skrev finns inte längre; live-läget strömmar nu till instrumentpanelen och skriver ingenting till disk, och `trace.zip` är den enda spårningsartefakten.

## Kända begränsningar

- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` reduceras till **ett enda sessionsomfattande segment**: Nightwatch kör de enskilda `it`-blocken internt utan en per-test-hook som pluginet kan se, så segmentet knyts till det första testet. Insamling av metadata (tillstånd per testfall i manifestet) påverkas inte, men knytning av spårning/skärmdump/video per `it` och återförsöksmedveten lagring försämras till sessionsnivå för detta gränssnitt. Nightwatchs gränssnitt **exports-object** och **Cucumber** exponerar hooks per scenario/per test och får verklig segmentering per test. (WebdriverIO mocha/cucumber och Selenium mocha påverkas inte.)
- **Återförsöksmedveten lagring i Nightwatch** — endast `retain-on-failure` fungerar; andra återförsöksmedvetna policyer försämras eftersom Nightwatch kör om ett testfall internt vid `--retries` utan att utlösa per-test-hookarna igen. Se [Lagring](/docs/devtools/wdio/trace-mode#retention--tracepolicy).
- **Allure-bifogning i Nightwatch** — `screenshot`/`video` per test genereras endast (filer + manifest) och bifogas inte inline; se [Allure-integration](/docs/devtools/allure).
- **Video/filmstrip i andra webbläsare än Chrome** — i webbläsare utan en CDP-push-väg pollar inspelaren `takeScreenshot`, vilket lägger till WebDriver-rundturer och (under Allure) översvämmar steg-loggen; kombinera med rapportörens alternativ för att tysta steg.