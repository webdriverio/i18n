---
id: debug
title: Einen Test mit einer Session debuggen
description: Einen fehlschlagenden WebdriverIO-Lauf pausieren, mit wdio session untersuchen und anschließend fortsetzen oder schließen.
---

`wdio run --debug=agent` pausiert den Worker bei `await browser.debug()` und nach einem fehlgeschlagenen Test und erhöht das Framework-Timeout auf 24 Stunden. Die Pause gilt sowohl für Mocha-Tests als auch für Cucumber-Steps. Der Lauf gibt den Session-Namen aus (`debug-0-0` für den ersten Worker):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

`close` auf dieser Session lässt den pausierten Test mit `Session closed from wdio session` fehlschlagen. Verwende `resume`, wenn der Test fortgesetzt werden soll. Verwende `close`, wenn der Lauf an der Pause fehlschlagen soll.

`browser.debug()` ohne `--debug=agent` öffnet weiterhin die [REPL](/docs/repl) innerhalb des Tests. `--debug=agent` ist der Weg, über den ein anderer Prozess, einschließlich eines Coding-Agents, den pausierten Worker mit `wdio session` steuern kann.

## Eine REPL anhängen

`wdio repl --session <name>` verbindet sich mit einer bereits geöffneten Session und lässt sie beim Beenden weiterlaufen:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Jede REPL-Zeile wird als `wdio session exec` ausgeführt. `.exit` gibt `Detached from "default" (still running)` aus.

## Doctor

`npx wdio session doctor` prüft Node.js, den Browser, Appium, SDKs und Cloud-Zugangsdaten, bevor du eine Session öffnest. `doctor <target>` prüft nur das, was dieses Ziel benötigt. Der Prozess beendet sich mit Exit-Code 1, wenn eine Prüfung fehlschlägt. Eine Session, die noch startet, bleibt bestehen. Eine Session, deren Prozess nicht mehr existiert, wird entfernt.

## Fehlerbehebung

| Meldung | Was zu tun ist |
| --- | --- |
| `Session closed from wdio session` | Du hast die Debug-Session geschlossen. Verwende `resume`, wenn der Test fortgesetzt werden soll. |
| Keine `debug-0-0`-Session | Der Lauf wurde noch nicht pausiert, oder er hat eine andere Worker-ID verwendet. `wdio session list` gibt die Namen aus. |
| Die Pause tritt nie ein | Der Befehl muss `wdio run --debug=agent` lauten. Ein erfolgreicher Test pausiert nicht, es sei denn, er ruft `browser.debug()` auf. |

## Nächste Schritte

- [Debugging](/docs/debugging) — `browser.debug()`, Breakpoints und instabile Tests
- [REPL](/docs/repl) — die interaktive Shell
- [wdio session](/docs/session) — eine Session öffnen, die nicht an einen Testlauf gebunden ist