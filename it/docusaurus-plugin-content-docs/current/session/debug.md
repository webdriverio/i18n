---
id: debug
title: Eseguire il debug di un test con una sessione
description: Metti in pausa un'esecuzione WebdriverIO che fallisce e ispezionala con wdio session, quindi riprendila o chiudila.
---

`wdio run --debug=agent` mette in pausa il worker su `await browser.debug()` e dopo un test fallito, e aumenta il timeout del framework a 24 ore. La pausa riguarda sia i test Mocha sia gli step Cucumber. L'esecuzione stampa il nome della sessione (`debug-0-0` per il primo worker):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

`close` su quella sessione fa fallire il test in pausa con `Session closed from wdio session`. Usa resume quando il test deve continuare. Usa close quando vuoi che l'esecuzione fallisca nel punto della pausa.

`browser.debug()` senza `--debug=agent` apre comunque il [REPL](/docs/repl) all'interno del test. `--debug=agent` è la modalità che consente a un altro processo, incluso un coding agent, di controllare il worker in pausa con `wdio session`.

## Collegare un REPL

`wdio repl --session <name>` si collega a una sessione già aperta e la lascia in esecuzione quando esci:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Ogni riga del REPL viene eseguita come `wdio session exec`. `.exit` stampa `Detached from "default" (still running)`.

## Doctor

`npx wdio session doctor` verifica Node.js, il browser, Appium, gli SDK e le credenziali cloud prima di aprire una sessione. `doctor <target>` verifica solo ciò di cui ha bisogno quel target. Il processo termina con codice 1 quando un controllo fallisce. Una sessione ancora in fase di avvio viene lasciata invariata. Una sessione il cui processo non esiste più viene rimossa.

## Risoluzione dei problemi

| Messaggio | Cosa fare |
| --- | --- |
| `Session closed from wdio session` | Hai chiuso la sessione di debug. Usa `resume` quando il test deve continuare. |
| Nessuna sessione `debug-0-0` | L'esecuzione non è ancora andata in pausa, oppure ha usato un worker id diverso. `wdio session list` stampa i nomi. |
| La pausa non avviene mai | Il comando deve essere `wdio run --debug=agent`. Un test che passa non va in pausa a meno che non chiami `browser.debug()`. |

## Prossimi passi

- [Debugging](/docs/debugging) — `browser.debug()`, breakpoint e test instabili
- [REPL](/docs/repl) — la shell interattiva
- [wdio session](/docs/session) — apri una sessione non collegata a un'esecuzione di test