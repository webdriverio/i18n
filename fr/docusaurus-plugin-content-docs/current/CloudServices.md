---
id: cloudservices
title: Utilisation des services cloud
description: "Exécutez des tests WebdriverIO sur Sauce Labs, BrowserStack, TestingBot, TestMu AI (anciennement LambdaTest), Perfecto et d'autres fournisseurs cloud."
---

Utiliser des services à la demande comme Sauce Labs, Browserstack, TestingBot, TestMu AI (anciennement LambdaTest) ou Perfecto avec WebdriverIO est assez simple. Il vous suffit de définir le `user` et la `key` de votre service dans vos options.

Vous pouvez également, si vous le souhaitez, paramétrer votre test en définissant des capacités spécifiques au cloud comme `build`. Si vous souhaitez exécuter les services cloud uniquement dans Travis, vous pouvez utiliser la variable d'environnement `CI` pour vérifier si vous êtes dans Travis et modifier la configuration en conséquence.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Vous pouvez configurer vos tests pour qu'ils s'exécutent à distance sur [Sauce Labs](https://saucelabs.com).

La seule exigence est de définir le `user` et la `key` dans votre configuration (soit exportée par `wdio.conf.js`, soit passée à `webdriverio.remote(...)`) avec votre nom d'utilisateur et votre clé d'accès Sauce Labs.

Vous pouvez également transmettre n'importe quelle [option de configuration de test](https://docs.saucelabs.com/dev/test-configuration-options/) facultative sous forme de clé/valeur dans les capacités de n'importe quel navigateur.

### Sauce Connect

Si vous souhaitez exécuter des tests sur un serveur qui n'est pas accessible depuis Internet (comme sur `localhost`), vous devez utiliser [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

La prise en charge de cette fonctionnalité dépasse le cadre de WebdriverIO, vous devrez donc le démarrer vous-même.

Si vous utilisez le testrunner WDIO, téléchargez et configurez le [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) dans votre `wdio.conf.js`. Il aide à faire fonctionner Sauce Connect et offre des fonctionnalités supplémentaires qui intègrent mieux vos tests au service Sauce.

### Avec Travis CI

Travis CI, en revanche, [prend en charge](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) le démarrage de Sauce Connect avant chaque test, donc suivre leurs instructions à ce sujet est une option.

Si vous le faites, vous devez définir l'option de configuration de test `tunnel-identifier` dans les `capabilities` de chaque navigateur. Travis la définit par défaut sur la variable d'environnement `TRAVIS_JOB_NUMBER`.

De plus, si vous souhaitez que Sauce Labs regroupe vos tests par numéro de build, vous pouvez définir `build` sur `TRAVIS_BUILD_NUMBER`.

Enfin, si vous définissez `name`, cela modifie le nom de ce test dans Sauce Labs pour ce build. Si vous utilisez le testrunner WDIO combiné avec le [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO définit automatiquement un nom approprié pour le test.

Exemple de `capabilities` :

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Délais d'attente

Comme vous exécutez vos tests à distance, il peut être nécessaire d'augmenter certains délais d'attente.

Vous pouvez modifier le [délai d'inactivité](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) en passant `idle-timeout` comme option de configuration de test. Cela contrôle combien de temps Sauce attendra entre les commandes avant de fermer la connexion.

## BrowserStack

WebdriverIO dispose également d'une intégration [Browserstack](https://www.browserstack.com) intégrée.

La seule exigence est de définir le `user` et la `key` dans votre configuration (soit exportée par `wdio.conf.js`, soit passée à `webdriverio.remote(...)`) avec votre nom d'utilisateur et votre clé d'accès Browserstack Automate.

Vous pouvez également transmettre n'importe quelle [capacité prise en charge](https://www.browserstack.com/automate/capabilities) facultative sous forme de clé/valeur dans les capacités de n'importe quel navigateur. Si vous définissez `browserstack.debug` sur `true`, un enregistrement vidéo de la session sera réalisé, ce qui peut être utile.

### Tests en local

Si vous souhaitez exécuter des tests sur un serveur qui n'est pas accessible depuis Internet (comme sur `localhost`), vous devez utiliser [Local Testing](https://www.browserstack.com/local-testing#command-line).

La prise en charge de cette fonctionnalité dépasse le cadre de WebdriverIO, vous devez donc le démarrer vous-même.

Si vous utilisez le mode local, vous devez définir `browserstack.local` sur `true` dans vos capacités.

Si vous utilisez le testrunner WDIO, téléchargez et configurez le [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) dans votre `wdio.conf.js`. Il aide à faire fonctionner BrowserStack et offre des fonctionnalités supplémentaires qui intègrent mieux vos tests au service BrowserStack.

### Avec Travis CI

Si vous souhaitez ajouter Local Testing dans Travis, vous devez le démarrer vous-même.

Le script suivant le téléchargera et le démarrera en arrière-plan. Vous devez l'exécuter dans Travis avant de lancer les tests.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Vous pouvez également définir `build` sur le numéro de build Travis.

Exemple de `capabilities` :

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

La seule exigence est de définir le `user` et la `key` dans votre configuration (soit exportée par `wdio.conf.js`, soit passée à `webdriverio.remote(...)`) avec votre nom d'utilisateur et votre clé secrète [TestingBot](https://testingbot.com).

Vous pouvez également transmettre n'importe quelle [capacité prise en charge](https://testingbot.com/support/other/test-options) facultative sous forme de clé/valeur dans les capacités de n'importe quel navigateur.

### Tests en local

Si vous souhaitez exécuter des tests sur un serveur qui n'est pas accessible depuis Internet (comme sur `localhost`), vous devez utiliser [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot fournit un tunnel basé sur Java pour vous permettre de tester des sites web non accessibles depuis Internet.

Leur page d'assistance sur le tunnel contient les informations nécessaires pour le mettre en place et le faire fonctionner.

Si vous utilisez le testrunner WDIO, téléchargez et configurez le [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) dans votre `wdio.conf.js`. Il aide à faire fonctionner TestingBot et offre des fonctionnalités supplémentaires qui intègrent mieux vos tests au service TestingBot.

## TestMu AI (anciennement LambdaTest)

L'intégration [TestMu AI](https://www.testmuai.com/) est également intégrée.

La seule exigence est de définir le `user` et la `key` dans votre configuration (soit exportée par `wdio.conf.js`, soit passée à `webdriverio.remote(...)`) avec le nom d'utilisateur et la clé d'accès de votre compte TestMu AI.

Vous pouvez également transmettre n'importe quelle [capacité prise en charge](https://www.testmuai.com/capabilities-generator/) facultative sous forme de clé/valeur dans les capacités de n'importe quel navigateur. Si vous définissez `visual` sur `true`, un enregistrement vidéo de la session sera réalisé, ce qui peut être utile.

### Tunnel pour les tests en local

Si vous souhaitez exécuter des tests sur un serveur qui n'est pas accessible depuis Internet (comme sur `localhost`), vous devez utiliser [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

La prise en charge de cette fonctionnalité dépasse le cadre de WebdriverIO, vous devez donc le démarrer vous-même.

Si vous utilisez le mode local, vous devez définir `tunnel` sur `true` dans vos capacités.

Si vous utilisez le testrunner WDIO, téléchargez et configurez le [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) dans votre `wdio.conf.js`. Il aide à faire fonctionner TestMu AI et offre des fonctionnalités supplémentaires qui intègrent mieux vos tests au service TestMu AI.

### Avec Travis CI

Si vous souhaitez ajouter Local Testing dans Travis, vous devez le démarrer vous-même.

Le script suivant le téléchargera et le démarrera en arrière-plan. Vous devez l'exécuter dans Travis avant de lancer les tests.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Vous pouvez également définir `build` sur le numéro de build Travis.

Exemple de `capabilities` :

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Lorsque vous utilisez wdio avec [`Perfecto`](https://www.perfecto.io), vous devez créer un jeton de sécurité pour chaque utilisateur et l'ajouter dans la structure des capacités (en plus des autres capacités), comme suit :

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

De plus, vous devez ajouter la configuration cloud, comme suit :

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) fournit de vrais appareils Android et iOS ainsi que des nœuds de navigateurs derrière un point de terminaison unique. L'authentification se fait avec un jeton d'API plutôt qu'avec une paire `user` et `key`. Envoyez le jeton sous forme d'en-tête bearer :

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

Vous pouvez également transmettre le jeton sous forme de préfixe de chemin, que la grille supprime avant de transférer la requête :

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

La grille accepte également les identifiants intégrés dans l'URL (`https://user:token@host`) pour d'autres clients WebDriver, mais cette forme ne peut pas être utilisée depuis WebdriverIO : celui-ci est basé sur fetch, et Node.js rejette les identifiants intégrés dans les URL.

Pour exécuter des tests sur un appareil réel, transmettez le navigateur en tant que capacité Appium avec l'un ou l'autre des styles de connexion ci-dessus :

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```