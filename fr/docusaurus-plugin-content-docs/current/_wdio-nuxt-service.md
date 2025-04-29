---
id: wdio-nuxt-service
title: Service Nuxt Service
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---


> wdio-nuxt-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

Ce service vous aide à lancer votre application lorsque vous utilisez [Nuxt](https://nuxt.com/) comme outil de construction. Il démarre automatiquement le serveur Nuxt en utilisant votre `nuxt.conf.js` avant de lancer le test.

## Installation

Si vous débutez avec WebdriverIO, vous pouvez utiliser l'assistant de configuration pour tout configurer :

```sh
npm init wdio@latest .
```

Il détectera votre projet comme un projet Nuxt et installera tous les plugins nécessaires pour vous. Si vous ajoutez ce service à une configuration existante, vous pouvez toujours l'installer via :

```bash
npm install wdio-nuxt-service --save-dev
```

## Configuration

Pour activer le service, ajoutez-le simplement à votre liste de `services` dans votre fichier `wdio.conf.js`, par exemple :

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

Vous pouvez appliquer des options de service en passant un tableau avec un objet de configuration, par exemple :

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## Utilisation

Si votre configuration est correctement définie, le service définira l'option [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) pour pointer vers votre application. Vous pouvez y accéder via la commande [`url`](https://webdriver.io/docs/api/browser/url), par exemple :

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## Options

### `rootDir`

Répertoire racine du projet.

Type: `string`<br />
Défaut: `process.cwd()`

### `dotenv`

Fichier d'environnement à charger avant le démarrage du serveur.

Type: `string`<br />
Défaut: `.env`

### `hostname`

Nom d'hôte sur lequel démarrer le serveur.

Type: `string`<br />
Défaut: `localhost`

### `port`

Port sur lequel démarrer le serveur.

Type: `number`<br />
Défaut: `process.env.NUXT_PORT || config.devServer.port`

### `https`

Définir sur true si le serveur de test doit être démarré en https (les certificats doivent être configurés dans la configuration Nuxt).

Type: `boolean`<br />
Défaut: `false`

### `sslCert`

Certificat SSL à utiliser pour démarrer le serveur en https.

Type: `string`

### `sslKey`

Clé SSL à utiliser pour démarrer le serveur en https.

Type: `string`

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).