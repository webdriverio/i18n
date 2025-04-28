---
id: qajonatasmartins-wdio-google-chat-service
title: Google Chat Service
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Webdriverio-Bibliothek zum Senden von Testergebnissen als Benachrichtigung/Nachricht an Google Chat Spaces.

## Installation

`npm install wdio-google-chat-service --save-dev`

oder

`yarn add wdio-google-chat-service`

## Einstellungen

Importieren Sie zunächst den Service in die wdio-Konfigurationsdatei `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

Um den Service nutzen zu können, benötigen Sie die Google Chat Webhook-URL, um die Benachrichtigung zu senden, und fügen die URL in 'webhook' ein

Beispiel:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Send notification only in case of test failure
        }]
],
```

## Google Chat Webhook erhalten

Hinweis: Google Chat bietet den Webhook nur für Geschäftskonten an. Wenn Sie ein persönliches Konto verwenden, sollten Sie keine Webhook-Option haben.

1. Erstellen Sie einen Space in Google Chat
2. Klicken Sie auf den Pfeil neben dem Namen des Chat-Spaces
3. Klicken Sie auf [Webhooks verwalten]
4. Fügen Sie einen hinzu oder kopieren Sie die angezeigte Webhook-URL.
5. Fügen Sie die URL des Webhooks in den Service innerhalb der Option 'webhookUrl' ein, wie im obigen Beispiel gezeigt.

## Funktionen

- Unterstützung für Mocha Runner
- Fehlerdetails
- Senden von Benachrichtigungen nur bei Testfehlern

## Ergebnisse

![Test pass and fail](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)