---
id: dashboard
title: La Dashboard
description: "Guarda le esecuzioni dei test in tempo reale nella dashboard di DevTools, riesegui singoli test o suite e configura la finestra della dashboard e il backend."
---

La modalità live apre l'interfaccia di DevTools in una finestra esterna del browser e trasmette l'esecuzione dei test in tempo reale. È la controparte interattiva della [Trace Mode](/docs/devtools/wdio/trace-mode), che invece salta l'interfaccia e scrive un artefatto offline portabile. La modalità live è abilitata per impostazione predefinita (`mode: 'live'`), quindi è sufficiente eseguire i test WebdriverIO per avviare la dashboard.

Quando esegui i test, l'interfaccia di DevTools si apre automaticamente in una finestra esterna del browser e i test iniziano subito l'esecuzione con una visualizzazione in tempo reale. Al termine dell'esecuzione iniziale, usa i pulsanti di riproduzione per rieseguire singoli test o suite e il pulsante di arresto per terminare i test in esecuzione in qualsiasi momento.

## Cosa mostra la dashboard

- **Anteprima live del browser** — osserva il browser sotto test mentre i comandi vengono eseguiti.
- **Avanzamento dei test** — suite e test si aggiornano durante l'esecuzione.
- **Esecuzione dei comandi** — ogni azione viene trasmessa nel momento in cui avviene.
- **Schede del workbench** — esplora Actions, Console, Network, Metadata e Source per il test selezionato.

## Funzionalità della modalità live

- **[Riesecuzione interattiva e visualizzazione dei test](/docs/devtools/wdio/interactive-test-rerunning)** — Anteprime del browser in tempo reale con riesecuzione dei test
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** — Cattura uno snapshot di un test fallito, rieseguilo e confronta le due esecuzioni affiancate
- **[Console Logs](/docs/devtools/wdio/console-logs)** — Cattura e ispeziona l'output della console del browser
- **[Network Logs](/docs/devtools/wdio/network-logs)** — Monitora le chiamate API e l'attività di rete
- **[Metadata](/docs/devtools/wdio/metadata)** — Capabilities della sessione, ambiente e tempi per ogni sessione del browser
- **[TestLens](/docs/devtools/wdio/testlens)** — Naviga fino al codice sorgente con una navigazione intelligente del codice
- **[Supporto multi-framework](/docs/devtools/wdio/multi-framework-support)** — Funziona con Mocha, Jasmine e Cucumber
- **[Session Screencast](/docs/devtools/wdio/screencast)** — Registrazione video automatica delle sessioni del browser

## Configurare la finestra della dashboard

Le opzioni `port`, `hostname` e `devtoolsCapabilities` controllano il server dell'interfaccia di DevTools e la finestra in cui si apre. Consulta il [Riferimento di configurazione](/docs/devtools/reference) per i dettagli.

## Eseguire il backend in modo autonomo

Gli adapter avviano il server della dashboard nello stesso processo, quindi normalmente non è necessario interagirci. Viene fornito anche come binario autonomo, utile quando la dashboard deve sopravvivere a una singola esecuzione, oppure quando i test non sono scritti in JavaScript, come nel caso dell'adapter Python (vedi la pagina [Selenium](/docs/devtools/selenium)).

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

`--port` è una *preferenza*, non una garanzia: se la porta è occupata, il server si collega a una porta libera invece di fallire. Stampa la porta effettivamente utilizzata, ed è questa la riga da leggere, non quella che hai richiesto:

```
devtools-backend listening at http://localhost:3000
```

Indirizza un'esecuzione verso un server già in ascolto con `DEVTOOLS_PORT` (tutti gli adapter lo rispettano) e l'esecuzione si collegherà a esso invece di avviarne un secondo.

Un secondo binario, `show-trace`, apre un archivio di trace nel player offline: vedi [Trace Player](/docs/devtools/trace-player).