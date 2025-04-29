---
id: qajonatasmartins-wdio-google-chat-service
title: Service de Chat Google
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---


> @qajonatasmartins/wdio-google-chat-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Bibliothèque Webdriverio pour envoyer les résultats de test comme notification/message à Google Chat spaces.

## Installation

`npm install wdio-google-chat-service --save-dev`

ou

`yarn add wdio-google-chat-service`

## Paramètres

Tout d'abord, importez le service dans le fichier de configuration wdio `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

Pour utiliser le service, vous devez avoir l'URL webhook de Google Chat pour envoyer la notification et ajouter l'URL dans 'webhook'

Exemple:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Envoyer une notification uniquement en cas d'échec du test
        }]
],
```

## Obtention du webhook Google Chat

Remarque: Google Chat dispose uniquement du webhook pour les comptes professionnels. Si vous utilisez un compte personnel, vous ne devriez pas avoir l'option webhook.

1. Créez un espace sur Google Chat
2. Cliquez sur la flèche à côté du nom de l'espace de discussion
3. Cliquez sur [Gérer les Webhooks]
4. Ajoutez-en un ou copiez l'URL de webhook présentée.
5. Collez l'URL du webhook dans le service à l'intérieur de l'option 'webhookUrl' comme dans l'exemple ci-dessus.

## Fonctionnalités

- Support pour le runner mocha
- Détails des erreurs
- Envoi de notifications uniquement en cas d'échec du test

## Résultats

![Test réussi et échoué](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)