---
id: debug
title: Felsök ett test med en session
description: Pausa en misslyckad WebdriverIO-körning och inspektera den med wdio session, och återuppta eller stäng den sedan.
---

`wdio run --debug=agent` pausar workern vid `await browser.debug()` och efter ett misslyckat test, och höjer ramverkets timeout till 24 timmar. Pausen gäller både Mocha-tester och Cucumber-steg. Körningen skriver ut sessionens namn (`debug-0-0` för den första workern):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

`close` på den sessionen får det pausade testet att misslyckas med `Session closed from wdio session`. Återuppta när testet ska fortsätta. Stäng när du vill att körningen ska misslyckas vid pausen.

`browser.debug()` utan `--debug=agent` öppnar fortfarande [REPL](/docs/repl) inuti testet. `--debug=agent` är det sätt som låter en annan process, inklusive en kodningsagent, styra den pausade workern med `wdio session`.

## Anslut en REPL

`wdio repl --session <name>` ansluter till en session som redan är öppen och låter den fortsätta köra när du avslutar:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Varje REPL-rad körs som `wdio session exec`. `.exit` skriver ut `Detached from "default" (still running)`.

## Doctor

`npx wdio session doctor` kontrollerar Node.js, webbläsaren, Appium, SDK:er och molnautentiseringsuppgifter innan du öppnar en session. `doctor <target>` kontrollerar endast det som det målet behöver. Processen avslutas med 1 när en kontroll misslyckas. En session som fortfarande startar lämnas kvar. En session vars process inte längre finns tas bort.

## Felsökning

| Meddelande | Vad du ska göra |
| --- | --- |
| `Session closed from wdio session` | Du stängde felsökningssessionen. Använd `resume` när testet ska fortsätta. |
| Ingen `debug-0-0`-session | Körningen har inte pausat ännu, eller så använde den ett annat worker-id. `wdio session list` skriver ut namnen. |
| Pausen inträffar aldrig | Kommandot måste vara `wdio run --debug=agent`. Ett godkänt test pausar inte om det inte anropar `browser.debug()`. |

## Nästa steg

- [Felsökning](/docs/debugging) — `browser.debug()`, brytpunkter och instabila tester
- [REPL](/docs/repl) — det interaktiva skalet
- [wdio session](/docs/session) — öppna en session som inte är kopplad till en testkörning