---
id: qajonatasmartins-wdio-google-chat-service
title: Servizio Google Chat
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---


> @qajonatasmartins/wdio-google-chat-service è un pacchetto di terze parti, per maggiori informazioni consulta [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Libreria Webdriverio per inviare i risultati dei test come notifica/messaggio agli spazi di Google Chat.

## Installazione

`npm install wdio-google-chat-service --save-dev`

oppure

`yarn add wdio-google-chat-service`

## Impostazioni

Prima, importa il servizio nel file di configurazione wdio `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

Per utilizzare il servizio è necessario avere l'URL webhook di Google Chat per inviare la notifica e aggiungerlo in 'webhook'

Esempio:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Invia notifica solo in caso di fallimento del test
        }]
],
```

## Ottenere il webhook di Google Chat

Nota: Google Chat ha il webhook solo per account business. Se utilizzi un account personale non dovresti avere l'opzione webhook.

1. Crea uno spazio su Google Chat
2. Fai clic sulla freccia sul nome dello spazio di chat
3. Fai clic su [Gestisci Webhook]
4. Aggiungi uno o copia l'URL webhook presentato.
5. Incolla l'URL del webhook nel servizio all'interno dell'opzione 'webhookUrl' come nell'esempio sopra.

## Funzionalità

- Supporto per il runner mocha
- Dettagli degli errori
- Invia notifica solo in caso di fallimento del test

## Risultati

![Test superati e falliti](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)