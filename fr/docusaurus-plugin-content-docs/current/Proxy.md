---
id: proxy
title: Configuration du proxy
description: "Faites transiter les requêtes par un proxy, soit entre vos tests et le driver, soit entre le navigateur et Internet."
---

Vous pouvez faire transiter deux types de requêtes différents par un proxy :

- la connexion entre votre script de test et le driver du navigateur (ou le point de terminaison WebDriver)
- la connexion entre le navigateur et Internet

## Proxy entre le driver et le test

Si votre entreprise dispose d'un proxy d'entreprise (par exemple sur `http://my.corp.proxy.com:9090`) pour toutes les requêtes sortantes, vous avez deux options pour configurer WebdriverIO afin qu'il utilise le proxy :

### Option 1 : Utiliser des variables d'environnement (recommandé)

À partir de WebdriverIO v9.12.0, vous pouvez simplement définir les variables d'environnement de proxy standard :

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Facultatif : contourner le proxy pour certains hôtes
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Exécutez ensuite vos tests comme d'habitude. WebdriverIO utilisera automatiquement ces variables d'environnement pour la configuration du proxy.

### Option 2 : Utiliser setGlobalDispatcher d'undici

Pour des configurations de proxy plus avancées ou si vous avez besoin d'un contrôle programmatique, vous pouvez utiliser la méthode `setGlobalDispatcher` d'undici :

#### Installer undici

```bash npm2yarn
npm install undici --save-dev
```

#### Ajouter setGlobalDispatcher d'undici à votre fichier de configuration

Ajoutez l'instruction require suivante en haut de votre fichier de configuration.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Des informations supplémentaires sur la configuration du proxy sont disponibles [ici](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Quelle méthode dois-je utiliser ?

- **Utilisez les variables d'environnement** si vous souhaitez une approche simple et standard qui fonctionne avec différents outils et ne nécessite aucune modification du code.
- **Utilisez setGlobalDispatcher** si vous avez besoin de fonctionnalités de proxy avancées comme une authentification personnalisée, des configurations de proxy différentes selon l'environnement, ou si vous souhaitez contrôler le comportement du proxy de manière programmatique.

Les deux méthodes sont entièrement prises en charge, et WebdriverIO vérifiera d'abord la présence d'un dispatcher global avant de se rabattre sur les variables d'environnement.

### Sauce Connect Proxy

Si vous utilisez [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), démarrez-le via :

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy entre le navigateur et Internet

Afin de faire transiter la connexion entre le navigateur et Internet, vous pouvez configurer un proxy, ce qui peut être utile (par exemple) pour capturer des informations réseau et d'autres données avec des outils comme [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Les paramètres `proxy` peuvent être appliqués via les capabilities standard de la manière suivante :

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

Pour plus d'informations, consultez la [spécification WebDriver](https://w3c.github.io/webdriver/#proxy).