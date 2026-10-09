---
id: preserve-and-rerun
title: Preserve & Rerun (Jämför)
description: "Ta en ögonblicksbild av en misslyckad körning och kör om testet med ett klick med Preserve & Rerun, och jämför sedan båda körningarna för att se vad som ändrades."
---

När ett test misslyckas ser den vanliga felsökningsloopen ut så här: kör om testet och jämför sedan två väggar av loggar för att lista ut vad som ändrades. Preserve & Rerun reducerar detta till ett enda klick. Funktionen **tar en ögonblicksbild av den misslyckade körningen och kör om testet i ett enda steg**, och visar sedan båda körningarna sida vid sida i en **Compare**-vy som är justerad kommando för kommando – så att du kan se exakt var de två skilde sig åt utan att behöva läsa om någonting.

Det här är det snabbaste sättet att diagnostisera ett instabilt test: kommandot som betedde sig olika mellan den godkända och den misslyckade körningen markeras åt dig, tillsammans med den assertion som fallerade.

Tillgängligt i alla tre adaptrar – **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** och **[Nightwatch.js](/docs/devtools/nightwatch)**.

## Demo

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## Hur det fungerar

1. Kör dina tester som vanligt. När ett test avslutas med status **misslyckat**, för muspekaren över dess rad i sidofältet.
2. En bugg-play-ikon (🐞▶) visas bredvid den vanliga ▶-knappen för omkörning. Den visas endast på rader för misslyckade tester/sviter, där en vanlig omkörning redan stöds (t.ex. Cucumber-scenarier på scenarioraden, Mocha/Jasmine-tester på test- eller svitraden).
3. Klicka på den. DevTools tar en ögonblicksbild av den misslyckade körningen och startar sedan om just det testet.
4. Fliken **Compare** öppnas med de två körningarna justerade per kommando. Punkten där de skiljer sig åt och assertion-felet (**Expected vs Received**) framhävs.

## Huvudfunktioner

- **Ögonblicksbild + omkörning med ett klick** – Bevara den misslyckade körningen och kör om den i ett enda steg, utan kodändringar eller omstart av hela sviten.
- **Justering kommando för kommando** – Båda körningarna visas sida vid sida och justeras per kommando, så att skillnader syns direkt.
- **Felpunkten markeras** – Tar dig direkt till kommandot där de två körningarna skilde sig åt.
- **Assertion-diff** – Visar den assertion som fallerade med Expected vs Received sida vid sida.
- **Utfällbart fönster** – Öppna jämförelsen i ett separat, tematiserat fönster för en rymligare vy.
- **Triage av instabila tester** – Se vilket kommando som skilde sig mellan en godkänd och en misslyckad körning utan att läsa om loggar.

## Begränsningar

- **Cucumber**: omkörning per steg är inaktiverad eftersom Cucumbers `--name`-filter riktar sig mot scenarier, inte enskilda Gherkin-steg. Preserve & Rerun på scenarionivå fungerar fortfarande.