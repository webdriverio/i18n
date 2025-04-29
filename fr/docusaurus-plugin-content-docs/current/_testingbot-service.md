---
id: testingbot-service
title: Service Testingbot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---


> Service WebdriverIO qui fournit une meilleure intégration avec TestingBot. Il met à jour les métadonnées du job ('name', 'passed', 'tags', 'public', 'build', 'extra') et exécute TestingBot Tunnel si désiré.

## Installation

La façon la plus simple est de garder `@wdio/testingbot-service` comme devDependency dans votre fichier `package.json`, via:

```sh
npm install @wdio/testingbot-service --save-dev
```

Les instructions sur comment installer `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted)

## Configuration

Pour utiliser ce service, vous devez définir `user` et `key` dans votre fichier `wdio.conf.js`, et configurer l'option `hostname` sur `hub.testingbot.com`. Si vous souhaitez utiliser [TestingBot Tunnel](https://testingbot.com/support/other/tunnel)
vous devez définir `tbTunnel: true`.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## Options

Pour autoriser le service TestingBot, votre configuration doit contenir les options [`user`](https://webdriver.io/docs/options#user) et [`key`](https://webdriver.io/docs/options#key).

### tbTunnel
Si défini sur true, exécute TestingBot Tunnel et ouvre une connexion sécurisée entre une Machine Virtuelle TestingBot exécutant vos tests de navigateur.

Type: `Boolean`<br />
Par défaut: `false`

### tbTunnelOpts
Appliquer les options de TestingBot Tunnel (par exemple pour changer le numéro de port ou les paramètres de logFile). Consultez [cette liste](https://github.com/testingbot/testingbot-tunnel-launcher) pour plus d'informations.

Type: `Object`<br />
Par défaut: `{}`