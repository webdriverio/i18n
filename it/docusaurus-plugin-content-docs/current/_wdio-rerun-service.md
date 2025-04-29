---
id: wdio-rerun-service
title: Servizio di Ripetizione
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---


> wdio-rerun-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Questo servizio tiene traccia dei test Mocha o Jasmine e degli scenari Cucumber falliti eseguiti all'interno del framework di test [WebdriverIO](https://webdriver.io). Permetterà di rieseguire test o scenari falliti o instabili.

_NOTA_: Gli utenti del Framework Cucumber che eseguono le versioni WebdriverIO `5.x` e `6.x` dovrebbero utilizzare la versione `1.6.x`. Se stai utilizzando l'ultima versione principale `7.x`, usa l'ultima versione `1.7.x` di questo servizio.

## Re-run vs. Retry

La logica di `retry` integrata in WebdriverIO per Cucumber e Mocha/Jasmine è utile per gestire passaggi instabili in Cucumber e Mocha/Jasmine. Il ritentativo in ciascun framework presenta delle avvertenze:
* Cucumber: Non tiene conto che alcuni passaggi potrebbero non essere in grado di essere ripetuti nel mezzo di un test. Eseguire un passaggio due volte potrebbe compromettere il resto dello Scenario o potrebbe non essere possibile nel contesto del test.
* Mocha/Jasmine: La logica di `retry` può essere applicata a un singolo test, tuttavia, questo viene ancora fatto in tempo reale e forse non tiene conto di problemi temporali o problemi di connettività di rete.

Le principali distinzioni del `re-run`:
* Rieseguirà un intero Scenario di Cucumber e non solo un singolo passaggio
* Consente di rieseguire un intero file spec dopo il completamento di un'esecuzione di test principale
* Può essere copiato ed eseguito localmente (`retry` non può)
* Può ancora essere utilizzato insieme ai metodi `retry`
* Non richiede alcuna modifica del codice per applicare la logica di `retry` a test instabili o problematici

Si consiglia di prendersi del tempo per valutare le opzioni disponibili. Una soluzione ibrida potrebbe essere la soluzione migliore per fornire i risultati di test più reali e utilizzabili.

## Installazione

Il modo più semplice è aggiungere `wdio-rerun-service` alle `devDependencies` nel tuo `package.json`.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

Può essere installato utilizzando `npm`:

```bash
npm install wdio-rerun-service
```

Dopo il completamento dell'installazione del pacchetto, aggiungilo all'array `services` in `wdio.conf.js`:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted.html)

## Configurazione

Le seguenti opzioni possono essere aggiunte al file wdio.conf.js. Per definire le opzioni per il servizio è necessario aggiungere il servizio all'elenco `services` nel seguente modo:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Opzioni del servizio Re-run qui...
        }]
    ],
    // ...
};
```

### rerunDataDir
Directory dove tutti i dati JSON di re-run saranno conservati durante l'esecuzione.

Tipo: `String`

Predefinito: `./results/rerun`

Esempio:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
Percorso per scrivere lo script Bash di re-run.

Tipo: `String`

Predefinito: `./rerun.sh`

Esempio:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Solo Cucumber) Set di tag Cucumber da escludere. Se uno scenario contiene un tag, il servizio re-run salterà l'analisi.

Tipo: `Array`

Predefinito: `[]`

Esempio:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
Prefisso che verrà aggiunto al comando re-run generato.

Tipo: `String`

Predefinito: `''`

Esempio:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----