---
id: wdio-winappdriver-service
title: Servizio winappdriver
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---


> wdio-winappdriver-service è un pacchetto di terze parti, per maggiori informazioni consulta [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

Questo servizio ti aiuta a eseguire il server WinAppDriver senza problemi quando esegui test con il [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Avvia [WinAppDriver](https://github.com/Microsoft/WinAppDriver) in un processo figlio.

## Installazione

```bash
npm install wdio-winappdriver-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted.html)

## Configurazione

Per utilizzare il servizio è necessario aggiungere `winappdriver` all'array dei servizi:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
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
        ['winappdriver', {
            // Opzioni del servizio WinAppDriver qui
            // ...
        }]
    ],
    // ...
};
```

### logPath

Percorso in cui tutti i log del server winappdriver dovrebbero essere memorizzati.

Tipo: `String`

Esempio:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Per utilizzare la tua installazione di WinAppDriver, ad esempio installato globalmente, specifica il comando che dovrebbe essere avviato.

Tipo: `String`

Esempio:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

Elenco di argomenti passati direttamente a `WinAppDriver`.

Vedi [la documentazione](https://github.com/Microsoft/WinAppDriver) per possibili argomenti.

Tipo: `Array`

Predefinito: `[]`

Esempio:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```