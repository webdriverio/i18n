---
id: debug
title: Debugowanie testu za pomocą sesji
description: Wstrzymaj nieudane uruchomienie WebdriverIO i zbadaj je za pomocą wdio session, a następnie wznów je lub zamknij.
---

`wdio run --debug=agent` wstrzymuje workera na `await browser.debug()` oraz po nieudanym teście, a także zwiększa timeout frameworka do 24 godzin. Wstrzymanie obejmuje zarówno testy Mocha, jak i kroki Cucumber. Uruchomienie wyświetla nazwę sesji (`debug-0-0` dla pierwszego workera):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

`close` na tej sesji powoduje niepowodzenie wstrzymanego testu z komunikatem `Session closed from wdio session`. Użyj wznowienia, gdy test ma być kontynuowany. Użyj zamknięcia, gdy chcesz, aby uruchomienie zakończyło się niepowodzeniem w miejscu wstrzymania.

`browser.debug()` bez `--debug=agent` nadal otwiera [REPL](/docs/repl) wewnątrz testu. `--debug=agent` to sposób, który pozwala innemu procesowi, w tym agentowi programistycznemu, sterować wstrzymanym workerem za pomocą `wdio session`.

## Podłączanie REPL

`wdio repl --session <name>` podłącza się do już otwartej sesji i pozostawia ją uruchomioną po wyjściu:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Każda linia REPL jest wykonywana jako `wdio session exec`. `.exit` wyświetla `Detached from "default" (still running)`.

## Doctor

`npx wdio session doctor` sprawdza Node.js, przeglądarkę, Appium, SDK oraz dane uwierzytelniające chmury przed otwarciem sesji. `doctor <target>` sprawdza tylko to, czego potrzebuje dany cel. Proces kończy się kodem 1, gdy sprawdzenie się nie powiedzie. Sesja, która wciąż się uruchamia, pozostaje nienaruszona. Sesja, której proces już nie istnieje, zostaje usunięta.

## Rozwiązywanie problemów

| Komunikat | Co zrobić |
| --- | --- |
| `Session closed from wdio session` | Zamknąłeś sesję debugowania. Użyj `resume`, gdy test ma być kontynuowany. |
| Brak sesji `debug-0-0` | Uruchomienie nie zostało jeszcze wstrzymane lub użyło innego identyfikatora workera. `wdio session list` wyświetla nazwy. |
| Wstrzymanie nigdy nie następuje | Polecenie musi mieć postać `wdio run --debug=agent`. Test zakończony powodzeniem nie zostanie wstrzymany, chyba że wywołuje `browser.debug()`. |

## Następne kroki

- [Debugowanie](/docs/debugging) — `browser.debug()`, punkty przerwania i niestabilne testy
- [REPL](/docs/repl) — interaktywna powłoka
- [wdio session](/docs/session) — otwieranie sesji niepodłączonej do uruchomienia testów