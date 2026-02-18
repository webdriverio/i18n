---
id: devtools
title: DevTools
---

Il servizio DevTools fornisce un'interfaccia di debugging potente basata su browser per le esecuzioni dei test WebdriverIO. Ti permette di visualizzare, eseguire debug e controllare i tuoi test in tempo reale attraverso un'applicazione web interattiva.

## Panoramica

Questo servizio ti consente di:

- **Rieseguire i test selettivamente** - Clicca su qualsiasi caso di test o suite per rieseguirlo istantaneamente
- **Debug visivo** - Visualizza anteprime live del browser con screenshot automatici
- **Monitorare l'esecuzione** - Visualizza log dettagliati dei comandi con timestamp e risultati
- **Monitorare rete e console** - Ispeziona le chiamate API e i log JavaScript
- **Navigare al codice** - Salta direttamente ai file sorgente dei test

## Installazione

Installa il servizio come dipendenza di sviluppo:

```sh
npm install --save-dev @wdio/devtools-service
```

## Configurazione

Aggiungi il servizio alla tua configurazione WebDriverIO:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### Opzioni del Servizio

Configura il servizio DevTools con queste opzioni:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // Porta per l'interfaccia devtools (predefinita: 3000)
        }]
    ],
    // ...
};
```

#### Opzioni

- **port** (numero, predefinito: `3000`) - Numero di porta per il server dell'interfaccia devtools

## Come Funziona

Quando esegui i tuoi test WebdriverIO con il servizio DevTools abilitato:

1. Il servizio apre una finestra del browser all'indirizzo `http://localhost:3000` (configurabile)
2. I tuoi test vengono eseguiti normalmente mentre l'interfaccia DevTools mostra aggiornamenti in tempo reale
3. L'interfaccia mostra la gerarchia dei test, l'anteprima del browser, la timeline dei comandi e i log
4. Dopo il completamento dei test, puoi cliccare su qualsiasi test per rieseguirlo individualmente
5. I test vengono rieseguiti nella stessa sessione del browser per un debug più veloce

## Funzionalità

Esplora le funzionalità di DevTools in dettaglio:

- **[Riesecuzione Interattiva e Visualizzazione dei Test](devtools/interactive-test-rerunning)** - Anteprime del browser in tempo reale con riesecuzione dei test
- **[Supporto Multi-Framework](devtools/multi-framework-support)** - Funziona con Mocha, Jasmine e Cucumber
- **[Log della Console](devtools/console-logs)** - Cattura e ispeziona l'output della console del browser
- **[Log di Rete](devtools/network-logs)** - Monitora le chiamate API e l'attività di rete
- **[TestLens](devtools/testlens)** - Naviga al codice sorgente con navigazione intelligente del codice