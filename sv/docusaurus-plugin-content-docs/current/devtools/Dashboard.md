---
id: dashboard
title: Instrumentpanelen
description: "Följ testkörningar live i DevTools-instrumentpanelen, kör om enskilda tester eller sviter och konfigurera instrumentpanelens fönster och backend."
---

Live-läget öppnar DevTools-gränssnittet i ett externt webbläsarfönster och strömmar din testkörning i realtid. Det är den interaktiva motsvarigheten till [Trace Mode](/docs/devtools/wdio/trace-mode), som hoppar över gränssnittet och istället skriver en portabel offline-artefakt. Live-läget är aktiverat som standard (`mode: 'live'`), så det räcker att köra dina WebdriverIO-tester för att starta instrumentpanelen.

När du kör dina tester öppnas DevTools-gränssnittet automatiskt i ett externt webbläsarfönster och testerna börjar köras omedelbart med visualisering i realtid. När den första körningen är klar kan du använda uppspelningsknapparna för att köra om enskilda tester eller sviter, och stoppknappen för att avbryta pågående tester när som helst.

## Vad instrumentpanelen visar

- **Live-förhandsvisning av webbläsaren** — följ webbläsaren som testas medan kommandon körs.
- **Testförlopp** — sviter och tester uppdateras medan de körs.
- **Kommandokörning** — varje åtgärd strömmas in i samma stund som den sker.
- **Workbench-flikar** — utforska Actions, Console, Network, Metadata och Source för det valda testet.

## Funktioner i live-läget

- **[Interaktiv omkörning och visualisering av tester](/docs/devtools/wdio/interactive-test-rerunning)** — Förhandsvisningar av webbläsaren i realtid med omkörning av tester
- **[Bevara och kör om (jämför)](/docs/devtools/wdio/preserve-and-rerun)** — Ta en ögonblicksbild av ett misslyckat test, kör om det och jämför de två körningarna sida vid sida
- **[Konsolloggar](/docs/devtools/wdio/console-logs)** — Fånga och granska webbläsarens konsolutdata
- **[Nätverksloggar](/docs/devtools/wdio/network-logs)** — Övervaka API-anrop och nätverksaktivitet
- **[Metadata](/docs/devtools/wdio/metadata)** — Sessionens capabilities, miljö och tidsåtgång per webbläsarsession
- **[TestLens](/docs/devtools/wdio/testlens)** — Navigera till källkoden med intelligent kodnavigering
- **[Stöd för flera ramverk](/docs/devtools/wdio/multi-framework-support)** — Fungerar med Mocha, Jasmine och Cucumber
- **[Skärminspelning av sessioner](/docs/devtools/wdio/screencast)** — Automatisk videoinspelning av webbläsarsessioner

## Konfigurera instrumentpanelens fönster

Alternativen `port`, `hostname` och `devtoolsCapabilities` styr DevTools-gränssnittets server och fönstret det öppnas i. Se [Konfigurationsreferensen](/docs/devtools/reference) för mer information.

## Köra backend fristående

Adaptrarna startar instrumentpanelens server i samma process, så normalt behöver du aldrig röra den. Den levereras också som en fristående binär, vilket är vad du vill använda när instrumentpanelen ska leva längre än en enskild körning – eller när testerna inte är skrivna i JavaScript, som med Python-adaptern (se sidan [Selenium](/docs/devtools/selenium)).

```bash
npx @wdio/devtools-backend
```

```
Usage: devtools-backend [options]

Options:
  --port <number>     Preferred port; a free one is chosen if it is taken
  --hostname <host>   Host to bind (default: localhost)
  -h, --help          Show this message
```

`--port` är en *önskan*, inte ett löfte: om porten är upptagen binder servern en ledig port istället för att misslyckas. Den skriver ut porten den faktiskt band, och det är den raden du ska läsa snarare än den port du bad om:

```
devtools-backend listening at http://localhost:3000
```

Peka en körning mot en server som redan lyssnar med `DEVTOOLS_PORT` (alla adaptrar respekterar den), så ansluter körningen till den istället för att starta en andra.

En andra binär, `show-trace`, öppnar ett trace-arkiv i offline-spelaren – se [Trace Player](/docs/devtools/trace-player).