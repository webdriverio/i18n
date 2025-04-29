---
id: wdio-ywinappdriver-service
title: Servizio ywinappdriver
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

Questo servizio ti aiuta a eseguire il server ywinappdriver senza problemi quando esegui test con il [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Avvia [ywinappdriver](https://github.com/licanhua/YWinAppDriver) in un processo figlio.

## Installazione

```bash
npm install wdio-ywinappdriver-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted.html)

## Configurazione

Per utilizzare il servizio è necessario aggiungere `ywinappdriver` al tuo array di servizi:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## Opzioni

Le seguenti opzioni possono essere aggiunte al file wdio.conf.js. Per definire le opzioni per il servizio è necessario aggiungere il servizio all'elenco `services` nel seguente modo:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // opzioni del servizio ywinappdriver qui
            // ...
        }]
    ],
    // ...
};
```

### logPath

Percorso in cui tutti i log dal server ywinappdriver dovrebbero essere memorizzati.

Tipo: `String`

Esempio:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Per utilizzare la tua installazione di winappdriver, ad esempio installata globalmente, specifica il comando che dovrebbe essere avviato.

Tipo: `String`

Esempio:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

Elenco di argomenti passati direttamente a `ywinappdriver`.

Vedi [la documentazione](https://github.com/licanhua/ywinappdriver) per possibili argomenti.

Tipo: `Array`

Predefinito: `[]`

Esempio:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```