---
id: wdio-rerun-service
title: Servizio di Ri-esecuzione
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Questo servizio tiene traccia dei test Mocha o Jasmine falliti e degli scenari Cucumber eseguiti all'interno del framework di test [WebdriverIO](https://webdriver.io). Permetterà di ri-eseguire test o scenari falliti o instabili.

_NOTA_: Gli utenti di Cucumber Framework che eseguono le versioni WebdriverIO `5.x` e `6.x` dovrebbero utilizzare la versione `1.6.x`. Se si utilizza l'ultima versione principale `7.x`, utilizzare l'ultima versione `1.7.x` di questo servizio.

## Ri-esecuzione vs. Riprova

La logica di `retry` integrata in WebdriverIO per Cucumber e Mocha/Jasmine è utile per gestire passaggi instabili in Cucumber e Mocha/Jasmine. Il ritentare in ciascun framework ha delle limitazioni:
* Cucumber: Non tiene conto che alcuni passaggi potrebbero non essere ripetibili a metà di un test. Eseguire un passaggio due volte potrebbe compromettere il resto dello Scenario o potrebbe non essere possibile nel contesto del test.
* Mocha/Jasmine: La logica di `retry` può essere applicata a un singolo test, tuttavia, questa viene ancora eseguita in tempo reale e forse non tiene conto di problemi temporali o di connettività di rete.

Le principali distinzioni del `re-run`:
* Ri-eseguirà un intero Scenario Cucumber individuale e non solo un singolo passaggio
* Consente di ri-eseguire un intero file di specifiche dopo il completamento dell'esecuzione del test principale
* Può essere copiato ed eseguito localmente (il `retry` non può)
* Può comunque essere utilizzato insieme ai metodi di `retry`
* Non richiede alcuna modifica del codice per applicare la logica di `retry` a test instabili o problematici

Si consiglia di dedicare del tempo alla valutazione delle opzioni disponibili. Una soluzione ibrida potrebbe essere la soluzione migliore per fornire i risultati dei test più reali e utilizzabili.

## Installazione

Il modo più semplice è aggiungere `wdio-rerun-service` a `devDependencies` nel tuo `package.json`.

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

Dopo aver completato l'installazione del pacchetto, aggiungerlo all'array `services` in `wdio.conf.js`:

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
            // Opzioni del servizio di ri-esecuzione qui...
        }]
    ],
    // ...
};
```

### rerunDataDir
Directory dove verranno conservati tutti i dati JSON di ri-esecuzione durante l'esecuzione.

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
Percorso per scrivere lo script Bash di ri-esecuzione.

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
(Solo per Cucumber) Set di tag Cucumber da escludere. Se lo scenario contiene un tag, il servizio di ri-esecuzione salterà l'analisi.

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
Prefisso che verrà aggiunto al comando di ri-esecuzione generato.

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