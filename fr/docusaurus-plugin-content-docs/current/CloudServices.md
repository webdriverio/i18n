---
id: cloudservices
title: Utilisation des services cloud
---

L'utilisation de services à la demande comme Sauce Labs, Browserstack, TestingBot, TestMu AI (anciennement LambdaTest) ou Perfecto avec WebdriverIO est assez simple. Tout ce que vous avez à faire est de définir l'`user` et la `key` de votre service dans vos options.

En option, vous pouvez également paramétrer vos tests en définissant des capacités spécifiques au cloud comme `build`. Si vous souhaitez exécuter des services cloud uniquement dans Travis, vous pouvez utiliser la variable d'environnement `CI` pour vérifier si vous êtes dans Travis et modifier la configuration en conséquence.

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

La seule exigence est de définir l'`user` et la `key` dans votre configuration (soit exportée par `wdio.conf.js` soit passée dans `webdriverio.remote(...)`) avec votre nom d'utilisateur Sauce Labs et votre clé d'accès.

Vous pouvez également transmettre n'importe quelle [option de configuration de test](https://docs.saucelabs.com/dev/test-configuration-options/) facultative sous forme de clé/valeur dans les capacités pour n'importe quel navigateur.

### Sauce Connect

Si vous souhaitez exécuter des tests contre un serveur qui n'est pas accessible par Internet (comme sur `localhost`), vous devez utiliser [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Il n'est pas du ressort de WebdriverIO de prendre cela en charge, vous devrez donc le démarrer vous-même.

Si vous utilisez le testrunner WDIO, téléchargez et configurez le [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) dans votre `wdio.conf.js`. Il aide à faire fonctionner Sauce Connect et propose des fonctionnalités supplémentaires qui intègrent mieux vos tests au service Sauce.

### Avec Travis CI

Travis CI, cependant, [prend en charge](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) le démarrage de Sauce Connect avant chaque test, donc suivre leurs instructions est une option.

Si vous le faites, vous devez définir l'option de configuration de test `tunnel-identifier` dans les `capabilities` de chaque navigateur. Travis définit cette valeur par défaut sur la variable d'environnement `TRAVIS_JOB_NUMBER`.

De plus, si vous souhaitez que Sauce Labs regroupe vos tests par numéro de build, vous pouvez définir le `build` sur `TRAVIS_BUILD_NUMBER`.

Enfin, si vous définissez `name`, cela change le nom de ce test dans Sauce Labs pour cette compilation. Si vous utilisez le testrunner WDIO combiné avec le [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO définit automatiquement un nom approprié pour le test.

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

La seule exigence est de définir l'`user` et la `key` dans votre configuration (soit exportée par `wdio.conf.js` soit passée dans `webdriverio.remote(...)`) avec votre nom d'utilisateur et votre clé d'accès Browserstack.

Vous pouvez également transmettre n'importe quelle [capacité prise en charge](https://www.browserstack.com/automate/capabilities) facultative sous forme de clé/valeur dans les capacités pour n'importe quel navigateur. Si vous définissez `browserstack.debug` sur `true`, il enregistrera une capture vidéo de la session, ce qui pourrait être utile.

### Tests locaux

Si vous souhaitez exécuter des tests contre un serveur qui n'est pas accessible par Internet (comme sur `localhost`), vous devez utiliser [Local Testing](https://www.browserstack.com/local-testing#command-line).

Il n'est pas du ressort de WebdriverIO de prendre cela en charge, vous devez donc le démarrer vous-même.

Si vous utilisez local, vous devez définir `browserstack.local` sur `true` dans vos capacités.

Si vous utilisez le testrunner WDIO, téléchargez et configurez le [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) dans votre `wdio.conf.js`. Il aide à faire fonctionner BrowserStack et propose des fonctionnalités supplémentaires qui intègrent mieux vos tests au service BrowserStack.

### Avec Travis CI

Si vous souhaitez ajouter Local Testing dans Travis, vous devez le démarrer vous-même.

Le script suivant téléchargera et le démarrera en arrière-plan. Vous devez exécuter ceci dans Travis avant de commencer les tests.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Vous pourriez également souhaiter définir le `build` sur le numéro de build Travis.

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

La seule exigence est de définir l'`user` et la `key` dans votre configuration (soit exportée par `wdio.conf.js` soit passée dans `webdriverio.remote(...)`) avec votre nom d'utilisateur [TestingBot](https://testingbot.com) et votre clé secrète.

Vous pouvez également transmettre n'importe quelle [capacité prise en charge](https://testingbot.com/support/other/test-options) facultative sous forme de clé/valeur dans les capacités pour n'importe quel navigateur.

### Tests locaux

Si vous souhaitez exécuter des tests contre un serveur qui n'est pas accessible par Internet (comme sur `localhost`), vous devez utiliser [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot fournit un tunnel basé sur Java pour vous permettre de tester des sites Web non accessibles depuis Internet.

Leur page de support de tunnel contient les informations nécessaires pour mettre cela en place.

Si vous utilisez le testrunner WDIO, téléchargez et configurez le [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) dans votre `wdio.conf.js`. Il aide à faire fonctionner TestingBot et propose des fonctionnalités supplémentaires qui intègrent mieux vos tests au service TestingBot.

## TestMu AI (anciennement LambdaTest)

L'intégration [TestMu AI](https://www.testmuai.com/) est également intégrée.

La seule exigence est de définir l'`user` et la `key` dans votre configuration (soit exportée par `wdio.conf.js` soit passée dans `webdriverio.remote(...)`) avec votre nom d'utilisateur et votre clé d'accès TestMu AI.

Vous pouvez également transmettre n'importe quelle [capacité prise en charge](https://www.testmuai.com/capabilities-generator/) facultative sous forme de clé/valeur dans les capacités pour n'importe quel navigateur. Si vous définissez `visual` sur `true`, il enregistrera une capture vidéo de la session, ce qui pourrait être utile.

### Tunnel pour les tests locaux

Si vous souhaitez exécuter des tests contre un serveur qui n'est pas accessible par Internet (comme sur `localhost`), vous devez utiliser [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Il n'est pas du ressort de WebdriverIO de prendre cela en charge, vous devez donc le démarrer vous-même.

Si vous utilisez local, vous devez définir `tunnel` sur `true` dans vos capacités.

Si vous utilisez le testrunner WDIO, téléchargez et configurez le [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) dans votre `wdio.conf.js`. Il aide à faire fonctionner TestMu AI et propose des fonctionnalités supplémentaires qui intègrent mieux vos tests au service TestMu AI.

### Avec Travis CI

Si vous souhaitez ajouter Local Testing dans Travis, vous devez le démarrer vous-même.

Le script suivant téléchargera et le démarrera en arrière-plan. Vous devez exécuter ceci dans Travis avant de commencer les tests.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Vous pourriez également souhaiter définir le `build` sur le numéro de build Travis.

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

Lorsque vous utilisez wdio avec [`Perfecto`](https://www.perfecto.io), vous devez créer un jeton de sécurité pour chaque utilisateur et l'ajouter dans la structure de capacités (en plus d'autres capacités), comme suit :

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

De plus, vous devez ajouter la configuration du cloud, comme suit :

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```