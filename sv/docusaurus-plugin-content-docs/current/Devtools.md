---
id: devtools
title: DevTools
description: "Visualisera, styr och inspektera testkörningar i ett webbläsarbaserat felsökningsgränssnitt som fungerar med WebdriverIO, Nightwatch.js och Selenium WebDriver."
---

DevTools är ett kraftfullt webbläsarbaserat felsökningsgränssnitt för att visualisera, styra och inspektera dina testkörningar i realtid. Det fungerar med **WebdriverIO**, **Nightwatch.js** och **Selenium WebDriver** (valfri runner) — samma backend, samma gränssnitt, samma infrastruktur för datainsamling.

## Vad det erbjuder

- **Kör om tester selektivt** - Klicka på valfritt testfall eller valfri testsvit för att köra om det direkt ([detaljer](/docs/devtools/wdio/interactive-test-rerunning))
- **Bevara och kör om (Jämför)** - Ta en ögonblicksbild av ett misslyckat test, kör om det och jämför de två körningarna sida vid sida, justerade per kommando ([detaljer](/docs/devtools/wdio/preserve-and-rerun))
- **Felsök visuellt** - Se live-förhandsvisningar av webbläsaren med automatiska skärmdumpar efter varje kommando
- **Spåra körningen** - Visa detaljerade kommandologgar med tidsstämplar och resultat
- **Övervaka nätverk och konsol** - Inspektera API-anrop och JavaScript-loggar ([nätverk](/docs/devtools/wdio/network-logs) · [konsol](/docs/devtools/wdio/console-logs))
- **Navigera till koden** - Hoppa direkt till testets källfiler med TestLens ([detaljer](/docs/devtools/wdio/testlens))
- **Spela in sessioner** - Kontinuerlig `.webm`-video av webbläsaren, per session ([detaljer](/docs/devtools/wdio/screencast))
- **Trace-läge** - Headless insamling som producerar en portabel `trace.zip`-artefakt för uppspelning offline eller användning av AI-agenter ([detaljer](/docs/devtools/wdio/trace-mode))

## Hur det fungerar

1. Starta dina tester som vanligt
2. DevTools öppnar automatiskt ett webbläsarfönster på `http://localhost:3000`
3. Gränssnittet visar testhierarki, förhandsvisning av webbläsaren, kommandotidslinje och loggar i realtid
4. När testerna är klara kan du klicka på valfritt test för att köra om det individuellt i samma webbläsarsession

## Välj ditt ramverk

- **[WebDriverIO](/docs/devtools/wdio)** - Använd `@wdio/devtools-service` med Mocha, Jasmine eller Cucumber
- **[Nightwatch](/docs/devtools/nightwatch)** - Använd `@wdio/nightwatch-devtools` utan några ändringar i testkoden
- **[Selenium](/docs/devtools/selenium)** - Använd `@wdio/selenium-devtools` med Mocha, Jest, Cucumber eller vanliga Node-skript