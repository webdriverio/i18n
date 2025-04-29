---
id: browserstack-service
title: Service Browserstack
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---


> Un service WebdriverIO qui gère le tunnel local et les métadonnées des tâches pour les utilisateurs de BrowserStack.

## Installation


La façon la plus simple est de garder `@wdio/browserstack-service` comme devDependency dans votre `package.json`, via :

```sh
npm install @wdio/browserstack-service --save-dev
```

Les instructions sur la façon d'installer `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted)


## Configuration

WebdriverIO prend en charge BrowserStack nativement. Vous devez définir `user` et `key` dans votre fichier `wdio.conf.js`. Ce plugin de service fournit un support pour [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). Définissez également `browserstackLocal: true` pour activer cette fonctionnalité.
Le reporting du statut de session sur BrowserStack respectera le paramètre `strict` des options Cucumber.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## Options

Pour s'authentifier auprès du service BrowserStack, votre configuration doit contenir une option [`user`](https://webdriver.io/docs/options#user) et [`key`](https://webdriver.io/docs/options#key).

### testObservability

Test Observability est un outil avancé de reporting de tests qui donne des informations pour améliorer vos tests d'automatisation et vous aide à déboguer plus rapidement. Il est activé par défaut en définissant le drapeau `testObservability` à `true` pour tous les utilisateurs du service browserstack. Vous pouvez le désactiver en définissant le drapeau `testObservability` à `false`.

Une fois vos tests terminés, vous pouvez visiter [Test Observability](https://observability.browserstack.com/) pour déboguer vos builds avec des informations supplémentaires comme l'analyse des erreurs uniques, la détection automatique des tests instables, et plus encore.

Vous pouvez utiliser Test Observability même si vous n'exécutez pas vos tests sur l'infrastructure BrowserStack. Même si vous exécutez vos tests sur un CI, une machine locale, ou même sur d'autres fournisseurs de services cloud, Test Observability peut toujours générer des rapports de test intelligents et des analyses avancées sur vos tests.

Si vous souhaitez utiliser Test Observability sans exécuter vos tests sur l'infrastructure BrowserStack, vous pouvez définir votre configuration comme suit :


```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

Vous pouvez explorer toutes les fonctionnalités de Test Observability dans [ce bac à sable](https://observability-demo.browserstack.com/) ou en savoir plus à ce sujet [ici](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability).

### browserstackLocal
Définissez ceci à true pour permettre le routage des connexions depuis le cloud BrowserStack via votre ordinateur.

Type: `Boolean`<br />
Défaut: `false`

### forcedStop
Définissez ceci à true pour tuer le processus BrowserStack Local à la fin, sans attendre que le callback d'arrêt de BrowserStack Local soit appelé. Ceci est expérimental et ne devrait pas être utilisé par tous. Principalement nécessaire comme solution de contournement pour [ce problème](https://github.com/browserstack/browserstack-local-nodejs/issues/41).

Type: `Boolean`<br />
Défaut: `false`

### app

[Appium](https://appium.io/) définissez ceci avec le chemin de fichier d'application disponible localement sur votre machine pour utiliser l'application comme [application à tester](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) pour les sessions Appium.

Type: `String` ou `JsonObject`<br />
Défaut: `undefined`

Liste des valeurs d'application disponibles :

#### path
Utilisez le chemin de fichier d'application disponible localement comme application à tester pour Appium.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OU
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

Passez custom_id lors du téléchargement de l'application.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
Utilisez l'URL de l'application retournée après avoir téléchargé l'application sur BrowserStack.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OU
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

utilisez custom_id des applications déjà téléchargées

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OU
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

utilisez shareable_id des applications déjà téléchargées

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OU
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Cucumber uniquement. Définissez le nom de la session BrowserStack Automate sur le nom du scénario si un seul scénario a été exécuté.
Utile lors de l'exécution en parallèle avec [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Type: `Boolean`<br />
Défaut: `false`

### sessionNameFormat

Personnalisez le format du nom de session BrowserStack Automate.

Type: `Function`<br />
Défaut (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Défaut (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Mocha uniquement. N'ajoutez pas le titre du test au nom de la session BrowserStack Automate.

Type: `Boolean`<br />
Défaut: `false`

### sessionNamePrependTopLevelSuiteTitle

Mocha uniquement. Ajoutez le titre de la suite de premier niveau au début du nom de la session BrowserStack Automate.

Type: `Boolean`<br />
Défaut: `false`

### setSessionName

Définir automatiquement le nom de la session BrowserStack Automate.

Type: `Boolean`<br />
Défaut: `true`

### setSessionStatus

Définir automatiquement le statut de la session BrowserStack Automate (réussi/échoué).

Type: `Boolean`<br />
Défaut: `true`

### buildIdentifier

**buildIdentifier** est un identifiant unique pour différencier chaque exécution qui est ajouté au buildName. Choisissez votre format de buildIdentifier parmi les expressions disponibles :
* `BUILD_NUMBER`: Génère un compteur incrémental à chaque exécution
* `DATE_TIME`: Génère un horodatage à chaque exécution. Ex. 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier prend en charge l'utilisation de l'une ou l'autre expression ou des deux, ainsi que tout autre caractère permettant des options de formatage personnalisées.

### opts

Options BrowserStack Local.

Type: `Object`<br />
Défaut: `{}`

Liste des modificateurs de test local disponibles à passer en tant qu'opts:

#### Local Identifier

Si vous effectuez plusieurs connexions de test local simultanées, définissez-le de manière unique pour différents processus -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

Pour activer la journalisation détaillée -

```js
opts = { verbose: "true" };
```

Note - Les valeurs possibles pour le modificateur 'verbose' sont '1', '2', '3' et 'true'

#### Force Local

Pour acheminer tout le trafic via la machine locale (votre) -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

Pour tester un dossier local plutôt qu'un serveur interne, fournissez le chemin vers le dossier comme valeur de cette option -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

Pour tuer les autres instances BrowserStack Local en cours d'exécution -

```js
opts = { force: "true" };
```

#### Only Automate

Pour désactiver les tests locaux pour Live et Screenshots, et activer uniquement Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

Pour utiliser un proxy pour les tests locaux -

- proxyHost: Nom d'hôte/IP du proxy, les autres options de proxy sont ignorées si cette option est absente
- proxyPort: Port pour le proxy, par défaut à 3128 lorsque -proxyHost est utilisé
- proxyUser: Nom d'utilisateur pour se connecter au proxy (Basic Auth uniquement)
- proxyPass: Mot de passe pour USERNAME, sera ignoré si USERNAME est vide ou non spécifié

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

Pour utiliser un proxy local dans les tests locaux -

- localProxyHost: Nom d'hôte/IP du proxy, les autres options de proxy sont ignorées si cette option est absente
- localProxyPort: Port pour le proxy, par défaut à 8081 lorsque -localProxyHost est utilisé
- localProxyUser: Nom d'utilisateur pour se connecter au proxy (Basic Auth uniquement)
- localProxyPass: Mot de passe pour USERNAME, sera ignoré si USERNAME est vide ou non spécifié

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

Pour utiliser PAC (Proxy Auto-Configuration) dans les tests locaux -

- pac-file: Chemin absolu du fichier PAC (Proxy Auto-Configuration)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

Par défaut, les wrappers locaux BrowserStack essaient de télécharger et d'exécuter la dernière version du binaire BrowserStack dans ~/.browserstack ou le répertoire de travail actuel ou le dossier tmp par ordre. Mais vous pouvez remplacer cela en passant l'argument -binarypath.
Chemin pour spécifier le chemin binaire local -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

Pour enregistrer les journaux dans le fichier lors de l'exécution avec l'argument '-v', vous pouvez spécifier le chemin du fichier. Par défaut, les journaux sont enregistrés dans le fichier local.log dans le répertoire de travail actuel.
Pour spécifier le chemin du fichier où les journaux seront enregistrés -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).