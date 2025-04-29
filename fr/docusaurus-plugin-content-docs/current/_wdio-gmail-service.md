---
id: wdio-gmail-service
title: Service Gmail
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---


> wdio-gmail-service est un package tiers, pour plus d'informations, consultez [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

Un plugin WebdriverIO pour récupérer les e-mails de Google Mail en utilisant [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Installation

La façon la plus simple est de garder `wdio-gmail-service` comme `devDependency` dans votre package.json.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

Vous pouvez simplement le faire par :

```sh
npm install wdio-gmail-service --save-dev
```

## Utilisation

### Authentification Gmail

Vous devrez suivre les instructions sur [Gmail Tester](https://github.com/levz0r/gmail-tester) pour créer le fichier `credentials.json` (le fichier d'authentification OAuth2) et `token.json` (le jeton OAuth2).

### Configuration

Ajoutez le service en ajoutant `gmail` à la liste des services, par exemple :

```js
// wdio.conf.js
import path from 'path'

export const config = {
    // ...
    services: [['gmail', {
        credentialsJsonPath: path.join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10,
        timeoutSec: 60
    }]]
    // ...
};
```

## Options de service

### credentialsJsonPath
Chemin absolu vers un fichier JSON de credentials.

Type: `string`

Requis: `true`

### tokenJsonPath
Chemin absolu vers un fichier JSON de token.

Type: `string`

Requis: `true`

### intervalSec
L'intervalle entre les vérifications de la boîte de réception Gmail.

Type: `number`

Par défaut: `10`

Requis: `false`

### timeoutSec
Le temps maximum d'attente pour trouver l'e-mail pour les filtres donnés.

Type: `number`

Par défaut: `60`

Requis: `false`


## Écriture de tests

Dans votre test WebdriverIO, vous pouvez maintenant vérifier si un e-mail a été reçu.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## Paramètres de `checkInbox`

Les paramètres de la commande nécessitent au moins l'un des éléments suivants : `from`, `to` ou `subject` :

### `from`
Filtre sur l'adresse e-mail de l'expéditeur.

Type: `String`

### `to`
Filtre sur l'adresse e-mail du destinataire.

Type: `String`

### `subject`
Filtre sur le sujet de l'e-mail.

Type: `String`

### `includeBody`
Définir sur true pour récupérer les corps d'e-mails décodés.

Type: `boolean`

### `includeAttachments`
Définir sur true pour récupérer les pièces jointes d'e-mail encodées en base64.

Type: `boolean`

### `before`
Filtrer les messages reçus avant la date spécifiée.

Type: `Date`

### `after`
Filtrer les messages reçus après la date spécifiée.

Type: `Date`

### `label`
L'étiquette par défaut est 'INBOX', mais peut être changée en 'SPAM', 'TRASH' ou une étiquette personnalisée. Pour une liste complète des étiquettes intégrées, voir https://developers.google.com/gmail/api/guides/labels?hl=en

Type: `String`

---

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).