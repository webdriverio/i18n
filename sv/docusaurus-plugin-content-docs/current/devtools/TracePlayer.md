---
id: trace-player
title: Trace-spelare
description: "Öppna artefakter från trace-läget i show-trace-spelaren för uppspelning och granskning offline, eller läs in dem i andra trace-visare."
---

`show-trace`-spelaren öppnar alla traces som skapats i [Trace Mode](/docs/devtools/wdio/trace-mode) direkt i WebdriverIO DevTools-gränssnittet — ett dedikerat, skrivskyddat **spelarläge** för uppspelning offline, granskning och diffning med AI-agenter.

## Demo

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — förstapartsspelaren

Öppna en trace i DevTools-gränssnittet:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

`show-trace`-binären levereras med varje adapter (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`), så den finns tillgänglig i alla projekt som installerar en av dem — inget extra beroende krävs. Den startar samma DevTools-gränssnitt i ett dedikerat **spelarläge** och öppnar det i din webbläsare:

- **Åtgärdslista** (vänster) — de fångade kommandona, med en **Metadata**-flik bredvid.
- **Webbläsarpanel** (mitten) — den rekonstruerade sidan för den valda åtgärden (se [DOM-tidsresor](#trace-player-features) nedan). När tracen innehåller en filmremsa/video växlar en **Snapshot / Screencast**-knapp till den inspelade videon.
- **Tidslinjeremsa** (överst) — en filmremsa med miniatyrbilder på sina faktiska tidspositioner samt en skrubbningslist med ett dragbart uppspelningshuvud. Klicka på en miniatyrbild eller dra var som helst för att söka.
- **Kontrollfält** — spela upp/pausa, stega och hastighet.
- **Dockade flikar** (nederst) — **Source**, **Log**, **Console**, **Network**, **Errors** (var och en märkt med sitt antal), samt flikarna **A11y** och **Transcript** som bara finns i spelaren. Klicka på en rad i **Network** för att se detaljer om förfrågan (headers, timing, status).
- **Kortkommandon** — `Space` spela upp/pausa, `←`/`→` stega mellan åtgärder, `Home`/`End` hoppa till första/sista, `,`/`.` ändra hastighet, `/` fokusera filtret, `?` visa alla kortkommandon.

> Accepterar endast `.zip`. Samma kortkommandon fungerar i live-dashboarden (`←`/`→` går igenom kommandolistan, `?` visar hjälp).

### Trace player features

Utöver statisk stegning mellan bildrutor rekonstruerar och korsrefererar spelaren körningen:

- **DOM-tidsresor** — webbläsarpanelen spelar upp den fångade strömmen av DOM-mutationer (och formulärfältens tillstånd — input-`value`, checkbox-`checked`, inklusive fält som rensats tillbaka till tomma) för att återskapa den *verkliga* DOM:en vid tidpunkten för den valda åtgärden, inte bara en skärmbild. Punkter som saknar fångad bildruta (assertions, statiska väntetider) visar ändå sidans verkliga tillstånd.
- **A11y-flik + elementöverlägg ("pick locator")** — fliken **A11y** visar tillgänglighetsträdet (roller + tillgängliga namn) som fångats för det valda kommandot. Slå på elementöverlägget i webbläsarramen för att markera varje element som testet interagerade med; **hovra** över en ruta för att markera dess rad i A11y-trädet, **klicka** för att kopiera en robust locator. Kopplingen är dubbelriktad — att hovra över en rad i trädet markerar elementet i ögonblicksbilden.
- **Transcript-flik + Copy-for-LLM** — fliken **Transcript** renderar körningens `transcript.md` (en sammanfattning i körningsordning som är läsbar för både människor och LLM:er). Ett klick på **Copy** paketerar transkriptet tillsammans med eventuella fel från misslyckade kommandon som färdig kontext att klistra in i en LLM.
- **Inmatningsmarkörer på tidslinjen** — varje åtgärd markeras på skrubbningslisten efter typ: tangentbordsåtgärder som en grön stapel, pekaråtgärder (som har en träffpunkt) som en blå prick, övriga som ett enkelt streck — så att du kan läsa av interaktionsrytmen med en blick.
- **Cucumber-nästling** — Cucumber-körningar nästlas som Feature → Scenario → Step i åtgärdsträdet, så att stegen hamnar under sitt scenario och sin feature.
- **Tät filmremseskrubbning** — med [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) aktiverat packar tidslinjen de täta bildrutorna för mjuk skrubbning i stället för hopp med en bildruta per åtgärd.

## Andra trace-visare

Eftersom artefakten använder ett portabelt, standardiserat diskformat för trace-visare öppnas samma `.zip` (eller katalog) även i kompatibla **fristående trace-visare**, och — eftersom formatet delas — i en **Allure-rapports inbäddade trace-visare** (Allure ≥ 2.35). De visar:
- Tidslinje över åtgärder med tidsåtgång
- Skärmbilder per åtgärd
- Ögonblicksbilder av element
- Nätverksvattenfall
- Konsolhändelser

För användning av LLM:er/agenter, läs `transcript.md` direkt — det är en kompakt Markdown-återgivning av åtgärderna med selektorer och värden.

Trace-pipelinen (åtgärdsmappning, serialiserare för ögonblicksbilder, NDJSON-skrivare, zip-/katalogskrivare) delas mellan adaptrar via [`@wdio/devtools-core`](https://github.com/webdriverio/devtools/tree/main/packages/core), så artefaktens struktur är identisk oavsett vilken adapter som skapade den — se [Cross-Framework Support](/docs/devtools/cross-framework).