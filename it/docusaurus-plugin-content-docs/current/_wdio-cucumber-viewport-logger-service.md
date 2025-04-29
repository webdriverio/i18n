---
id: wdio-cucumber-viewport-logger-service
title: Servizio Logger Viewport per Cucumber
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---


> wdio-cucumber-viewport-logger-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Servizio Logger Viewport per Cucumber per WebdriverIO

Questo servizio aggiunge la possibilità di registrare i tuoi step Cucumber e altre informazioni di debug direttamente nella finestra del browser nella tua soluzione basata su WebdriverIO. Può essere particolarmente utile nei casi in cui si utilizzano dispositivi o macchine virtuali senza accesso *fisico* diretto e la possibilità di impostare una sessione interattiva per il debug approfondito dei test e2e.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Guida Rapida

Installa il pacchetto:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

Aggiungi il servizio alla sezione di configurazione `services`, ad esempio:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Opzioni del servizio

| Opzione  | Descrizione | Tipo |Valore predefinito |
| --- | --- | --- | --- |
| `numberOfSteps`  | il numero di step che saranno presenti nel viewport  | number |3 |
| `enabled`  | abilita/disabilita il servizio | boolean |true |
| `styles`  | Stili CSS per il wrapper del logger, *parola chiave dello step* e *testo dello step*, vedi l'esempio seguente  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // il servizio sarà abilitato solo quando imposti la variabile d'ambiente `VP_LOGGER` a `1`
            // imposta stili CSS personalizzati per elementi specifici
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - mostra un messaggio personalizzato con uno stile CSS personalizzato (non obbligatorio), puoi usarlo nelle tue definizioni di step
ad esempio:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - rimuove la sezione dei messaggi del viewport, può essere utile ad esempio per fare un'asserzione visiva

### pointerEvents: 'none'

Per impostazione predefinita, tutti gli eventi del mouse (clic, hover, ecc.) passano attraverso la sezione dei messaggi, ad esempio: invece di fare clic sulla sezione dei messaggi, il clic "passa" all'elemento accanto al messaggio (elemento della tua app), se desideri modificare questo comportamento imposta l'opzione dello stile del wrapper 'pointerEvents' su 'auto', esempio:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```