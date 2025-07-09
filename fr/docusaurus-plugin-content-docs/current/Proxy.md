---
id: proxy
title: Configuration du Proxy
---

Vous pouvez acheminer deux différents types de requêtes à travers un proxy :

- connexion entre votre script de test et le pilote de navigateur (ou point de terminaison WebDriver)
- connexion entre le navigateur et Internet

## Proxy entre le pilote et le test

Si votre entreprise dispose d'un proxy d'entreprise (par exemple sur `http://my.corp.proxy.com:9090`) pour toutes les requêtes sortantes, vous avez deux options pour configurer WebdriverIO afin d'utiliser le proxy :

### Option 1 : Utilisation des variables d'environnement (Recommandé)

À partir de WebdriverIO v9.12.0, vous pouvez simplement définir les variables d'environnement standard pour le proxy :

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Optionnel : contourner le proxy pour certains hôtes
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Ensuite, exécutez vos tests comme d'habitude. WebdriverIO utilisera automatiquement ces variables d'environnement pour la configuration du proxy.

### Option 2 : Utilisation de setGlobalDispatcher d'undici

Pour des configurations de proxy plus avancées ou si vous avez besoin d'un contrôle programmatique, vous pouvez utiliser la méthode `setGlobalDispatcher` d'undici :

#### Installer undici

```bash npm2yarn
npm install undici --save-dev
```

#### Ajouter undici setGlobalDispatcher à votre fichier de configuration

Ajoutez l'instruction require suivante en haut de votre fichier de configuration.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Des informations supplémentaires sur la configuration du proxy peuvent être trouvées [ici](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Quelle méthode devrais-je utiliser ?

- **Utilisez les variables d'environnement** si vous souhaitez une approche simple et standard qui fonctionne avec différents outils et ne nécessite pas de modifications de code.
- **Utilisez setGlobalDispatcher** si vous avez besoin de fonctionnalités de proxy avancées comme l'authentification personnalisée, différentes configurations de proxy par environnement, ou si vous souhaitez contrôler programmatiquement le comportement du proxy.

Les deux méthodes sont entièrement prises en charge et WebdriverIO vérifiera d'abord un dispatcher global avant de se rabattre sur les variables d'environnement.

### Sauce Connect Proxy

Si vous utilisez [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), démarrez-le via :

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy entre le navigateur et Internet

Afin d'établir un tunnel pour la connexion entre le navigateur et Internet, vous pouvez configurer un proxy qui peut être utile pour (par exemple) capturer des informations réseau et d'autres données avec des outils comme [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Les paramètres `proxy` peuvent être appliqués via les capacités standard de la manière suivante :

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