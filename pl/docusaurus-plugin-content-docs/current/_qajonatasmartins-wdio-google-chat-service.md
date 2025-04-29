---
id: qajonatasmartins-wdio-google-chat-service
title: Usługa Google Chat
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service to pakiet zewnętrzny, więcej informacji znajdziesz na [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Biblioteka Webdriverio do wysyłania wyników testów jako powiadomień/wiadomości do przestrzeni Google Chat.

## Instalacja

`npm install wdio-google-chat-service --save-dev`

lub

`yarn add wdio-google-chat-service`

## Ustawienia

Najpierw zaimportuj usługę do pliku konfiguracyjnego wdio `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

Aby korzystać z usługi, potrzebujesz adresu URL webhooka Google Chat do wysyłania powiadomień i dodania go w 'webhook'

Przykład:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Send notification only in case of test failure
        }]
],
```

## Uzyskiwanie webhooka Google Chat

Uwaga: Google Chat oferuje webhook tylko dla kont firmowych. Jeśli korzystasz z konta osobistego, opcja webhooka może być niedostępna.

1. Utwórz przestrzeń w Google Chat
2. Kliknij strzałkę przy nazwie przestrzeni czatu
3. Kliknij [Zarządzaj Webhookami]
4. Dodaj jeden lub skopiuj przedstawiony URL webhooka.
5. Wklej URL webhooka w usłudze w opcji 'webhookUrl', jak w powyższym przykładzie.

## Funkcje

- Wsparcie dla uruchamiania mocha
- Szczegóły błędów
- Wysyłanie powiadomień tylko w przypadku niepowodzenia testu

## Wyniki

![Test zdany i nieudany](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)