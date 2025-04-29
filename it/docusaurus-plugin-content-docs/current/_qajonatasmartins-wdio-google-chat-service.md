---
id: qajonatasmartins-wdio-google-chat-service
title: Servizio Google Chat
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Libreria Webdriverio per inviare i risultati dei test come notifica/messaggio agli spazi di Google Chat.

## Installazione

`npm install wdio-google-chat-service --save-dev`

oppure

`yarn add wdio-google-chat-service`

## Impostazioni

Innanzitutto, importa il servizio nel file di configurazione wdio `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

Per utilizzare il servizio è necessario avere l'URL webhook di Google Chat per inviare la notifica e aggiungere l'URL in 'webhook'

Esempio:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Send notification only in case of test failure
        }]
],
```

## Ottenere il webhook di Google Chat

Nota: Google Chat offre il webhook solo per account aziendali. Se utilizzi un account personale, non dovresti avere l'opzione webhook.

1. Crea uno spazio su Google Chat
2. Fai clic sulla freccia sul nome dello spazio chat
3. Fai clic su [Manage Webhooks]
4. Aggiungi o copia l'URL webhook presentato
5. Incolla l'URL del webhook nel servizio all'interno dell'opzione 'webhookUrl' come nell'esempio sopra.

## Funzionalità

- Supporto per il runner mocha
- Dettagli degli errori
- Invio di notifiche solo in caso di fallimento del test

## Risultati

![Test pass and fail](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)