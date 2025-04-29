---
id: wdio-slack-service
title: Servizio Slack
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---


> wdio-slack-service è un pacchetto di terze parti, per maggiori informazioni consulta [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Libreria Webdriverio per inviare i risultati dei test come notifica/messaggio Slack ai canali

## Installazione

Il modo più semplice è mantenere `wdio-slack-service` come devDependency nel tuo file `package.json`.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

Puoi farlo semplicemente con:

```bash
npm install wdio-slack-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted.html)

## Configurazione

Per prima cosa, importa il servizio nel file di configurazione wdio `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

Per utilizzare il servizio è necessario avere l'URL del webhook Slack per inviare la notifica e devi aggiungere `slack` al tuo array `services`

Esempio:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Utilizzato per pubblicare notifiche su un canale particolare
            notifyOnlyOnFailure: true, // Invia notifica solo in caso di fallimento del test
            messageTitle: "<NOTIFICATION_TITLE>" // Nome della notifica
        }]
]
```
## Funzionalità

- Invia notifiche indipendentemente dai risultati dei test
- Invia notifiche solo in caso di fallimento dei test
- Supporto per `mocha`, `jasmine` e `cucumber`
- I tentativi/riesecuzioni dei test verranno registrati con informazioni aggiuntive
- Informazioni sulla durata del test
- Dettagli degli errori
- Reportistica degli scenari/passaggi di Cucumber
- Informazioni sul browser e sulla versione

## Come funziona
Per `mocha`/`jasmine`, la notifica verrà inviata a livello di spec e per `cucumber`, sarà a livello di feature. Ad esempio, se hai 10 file spec/feature, riceverai 10 notifiche poiché viene attivato nell'hook `after`

## Opzioni

Per inviare una notifica, dovresti avere l'URL del webhook Slack. Per sapere come creare un URL webhook Slack, consulta questa [pagina](https://api.slack.com/messaging/webhooks)

### webHookUrl

Questo URL viene utilizzato per identificare/autenticare il messaggio e inviarlo a un canale Slack

Tipo: `String` <br/>
Opzionale: `NO` <br/>
Predefinito: `NA`

### notifyOnlyOnFailure

Se desideri ricevere notifiche Slack solo in caso di fallimento del test, imposta questa opzione su `true`. Altrimenti, invia notifiche per tutte le esecuzioni di test indipendentemente dal risultato (pass/fail)

Tipo: `Boolean` <br/>
Opzionale: `YES` <br/>
Predefinito: `false`

### messageTitle

Titolo della notifica

Tipo: `String` <br/>
Opzionale: `YES` <br/>
Predefinito: `Webdriverio Slack Reporter`

## Screenshot

### Cucumber Pass/Fail

![Cucumber Pass/fail](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber Retry

![Cucumber Retry](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### All Pass

![All Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### Fail Pass

![Fail Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### Retry Failed

![Retry Failed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### Retry Passed

![Retry Passed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

Per maggiori informazioni su WebdriverIO visita la [homepage](https://webdriver.io).