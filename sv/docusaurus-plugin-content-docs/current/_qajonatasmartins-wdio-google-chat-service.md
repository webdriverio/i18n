---
id: qajonatasmartins-wdio-google-chat-service
title: Google Chat-tjänst
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Webdriverio-bibliotek för att skicka testresultat som notifikation/meddelande till Google Chat spaces.

## Installation

`npm install wdio-google-chat-service --save-dev`

eller

`yarn add wdio-google-chat-service`

## Inställningar

Först, importera tjänsten till wdio-konfigurationsfilen `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

För att använda tjänsten behöver du ha Google Chat webhook URL för att skicka notifikationer och lägga till URL:en i 'webhook'

Exempel:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Send notification only in case of test failure
        }]
],
```

## Få Google Chat webhook

Obs: Google Chat har bara webhook för företagskonton. Om du använder ett personligt konto bör du inte ha webhook-alternativet.

1. Skapa ett space i Google Chat
2. Klicka på pilen vid chattutrymmets namn
3. Klicka på [Manage Webhooks]
4. Lägg till eller kopiera den presenterade webhook-URL:en
5. Klistra in URL:en för webhook i tjänsten inuti alternativet 'webhookUrl' som i exemplet ovan.

## Funktioner

- Stöd för mocha runner
- Felinformation
- Skicka notifikation endast vid testfel

## Resultat

![Test pass and fail](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)