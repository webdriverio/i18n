---
id: wdio-slack-service
title: Service Slack
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---


> wdio-slack-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Bibliothèque Webdriverio pour envoyer les résultats de test sous forme de notification/message Slack aux canaux

## Installation

La façon la plus simple est de garder `wdio-slack-service` comme devDependency dans votre `package.json`.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

Vous pouvez simplement le faire par:

```bash
npm install wdio-slack-service --save-dev
```

Les instructions sur comment installer `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted.html)

## Configuration

Tout d'abord, importez le service dans le fichier de configuration wdio `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

Pour utiliser ce service, vous avez besoin d'une URL webhook Slack pour envoyer la notification et vous devez ajouter `slack` à votre tableau `services`

Exemple:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Utilisé pour publier une notification sur un canal particulier
            notifyOnlyOnFailure: true, // Envoyer une notification uniquement en cas d'échec du test
            messageTitle: "<NOTIFICATION_TITLE>" // Nom de la notification
        }]
]
```
## Fonctionnalités

- Envoyer une notification indépendamment des résultats des tests
- Envoyer une notification uniquement en cas d'échec du test
- Support pour `mocha`, `jasmine` et `cucumber`
- Les tests réessayés/relancés seront enregistrés avec des informations supplémentaires
- Information sur la durée du test
- Détails des erreurs
- Rapports de scénarios/étapes Cucumber
- Informations sur le navigateur et la version

## Comment ça fonctionne
Pour `mocha`/`jasmine`, la notification sera envoyée au niveau des spécifications et pour `cucumber`, ce sera au niveau des fonctionnalités. Disons que si vous avez 10 fichiers de spécification/fonctionnalité, vous recevrez 10 notifications car cela est déclenché dans le hook `after`

## Options

Pour envoyer une notification, vous devriez avoir une URL webhook Slack. Pour savoir comment créer une URL webhook Slack, consultez cette [page](https://api.slack.com/messaging/webhooks)

### webHookUrl

Cette URL est utilisée pour identifier/authentifier le message posté et l'envoyer à un canal Slack

Type: `String` <br/>
Optionnel: `NON` <br/>
Par défaut: `NA`

### notifyOnlyOnFailure

Si vous souhaitez recevoir des notifications Slack uniquement en cas d'échec du test, définissez cette option sur `true`. Sinon, il envoie une notification pour toutes les exécutions de test, qu'elles soient réussies ou échouées

Type: `Boolean` <br/>
Optionnel: `OUI` <br/>
Par défaut: `false`

### messageTitle

Titre de la notification

Type: `String` <br/>
Optionnel: `OUI` <br/>
Par défaut: `Webdriverio Slack Reporter`

## Captures d'écran

### Cucumber Réussite/Échec

![Cucumber Réussite/Échec](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber Réessai

![Cucumber Réessai](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### Tout Réussi

![Tout Réussi](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### Échec Réussite

![Échec Réussite](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### Réessai Échoué

![Réessai Échoué](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### Réessai Réussi

![Réessai Réussi](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).