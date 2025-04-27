---
id: proxy
title: Configuration du Proxy
---

Vous pouvez acheminer deux types différents de requêtes à travers un proxy :

- la connexion entre votre script de test et le pilote de navigateur (ou point de terminaison WebDriver)
- la connexion entre le navigateur et internet

## Proxy entre le pilote et le test

Si votre entreprise dispose d'un proxy d'entreprise (par exemple sur `http://my.corp.proxy.com:9090`) pour toutes les requêtes sortantes, suivez les étapes ci-dessous pour installer et configurer [undici](https://github.com/nodejs/undici).

### Installer undici

```bash npm2yarn
npm install undici --save-dev
```

### Ajouter undici setGlobalDispatcher à votre fichier de configuration

Ajoutez l'instruction require suivante en haut de votre fichier de configuration.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Des informations supplémentaires sur la configuration du proxy peuvent être trouvées [ici](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Si vous utilisez [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), démarrez-le via :

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy entre le navigateur et internet

Afin d'acheminer la connexion entre le navigateur et internet, vous pouvez configurer un proxy qui peut être utile (par exemple) pour capturer des informations réseau et d'autres données avec des outils comme [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

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