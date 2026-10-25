---
id: devtools
title: DevTools
description: "Visualizza, controlla e ispeziona le esecuzioni dei test in un'interfaccia di debug basata su browser che funziona con WebdriverIO, Nightwatch.js e Selenium WebDriver."
---

DevTools è una potente interfaccia di debug basata su browser per visualizzare, controllare e ispezionare le esecuzioni dei tuoi test in tempo reale. Funziona con **WebdriverIO**, **Nightwatch.js**, **Selenium WebDriver** (qualsiasi runner) e **Python Selenium**: stesso backend, stessa UI, stessa infrastruttura di acquisizione.

## Cosa offre

- **Riesegui i test in modo selettivo** - Fai clic su qualsiasi test case o suite per rieseguirlo istantaneamente ([dettagli](/docs/devtools/wdio/interactive-test-rerunning))
- **Preserve & Rerun (Confronto)** - Crea uno snapshot di un test fallito, rieseguilo e confronta le due esecuzioni affiancate, allineate per comando ([dettagli](/docs/devtools/wdio/preserve-and-rerun))
- **Debug visivo** - Visualizza anteprime live del browser con screenshot automatici dopo ogni comando
- **Monitora l'esecuzione** - Consulta log dettagliati dei comandi con timestamp e risultati
- **Monitora rete e console** - Ispeziona le chiamate API e i log JavaScript ([rete](/docs/devtools/wdio/network-logs) · [console](/docs/devtools/wdio/console-logs))
- **Naviga nel codice** - Passa direttamente ai file sorgente dei test con TestLens ([dettagli](/docs/devtools/wdio/testlens))
- **Registra le sessioni** - Video `.webm` continuo del browser, per ogni sessione ([dettagli](/docs/devtools/wdio/screencast))
- **Mobile** - Sessioni Appium (browser mobile, app native e ibride) in modalità live e trace ([dettagli](/docs/devtools/mobile))
- **Modalità trace** - Percorso di acquisizione headless che produce un artefatto `trace.zip` portabile per la riproduzione offline o l'utilizzo da parte di agenti ([dettagli](/docs/devtools/wdio/trace-mode))

## Come funziona

1. Avvia i tuoi test come al solito
2. DevTools apre automaticamente una finestra del browser all'indirizzo `http://localhost:3000`
3. La UI mostra in tempo reale la gerarchia dei test, l'anteprima del browser, la timeline dei comandi e i log
4. Al termine dei test, fai clic su qualsiasi test per rieseguirlo; la riesecuzione avviene in un nuovo processo di test e viene trasmessa nella stessa finestra della dashboard

## Scegli il tuo framework

- **[WebDriverIO](/docs/devtools/wdio)** - Usa `@wdio/devtools-service` con Mocha, Jasmine o Cucumber
- **[Nightwatch](/docs/devtools/nightwatch)** - Usa `@wdio/nightwatch-devtools` senza alcuna modifica al codice dei test
- **[Selenium](/docs/devtools/selenium)** - Usa `@wdio/selenium-devtools` con Mocha, Jest, Cucumber o semplici script Node
- **[Python Selenium](/docs/devtools/selenium)** - Usa `selenium-devtools-py` con pytest o in un semplice script (vedi le schede Python)