---
id: sauce-service
title: Service Sauce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---


Service WebdriverIO qui fournit une meilleure intégration avec Sauce Labs. Ce service peut être utilisé pour:

- Le cloud de machines virtuelles Sauce Labs (Web Desktop/Émulateur/Simulateur)
- Le cloud d'appareils réels Sauce Labs (iOS et Android)

Il peut mettre à jour les métadonnées des jobs ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') et exécuter Sauce Connect si nécessaire.

Que fera également ce service pour vous:

- Par défaut, le service Sauce mettra à jour le 'nom' du job lorsque celui-ci démarre. Cela vous donnera la possibilité de mettre à jour le nom à tout moment.
- Vous pouvez définir un paramètre `setJobName` et personnaliser le nom du job selon vos capacités, options et titre de suite
- Le service Sauce enverra également la pile d'erreurs d'un test échoué vers l'onglet des commandes de Sauce Labs
- Il vous permettra de configurer et démarrer automatiquement [Sauce Connect](https://docs.saucelabs.com/secure-connections/)
- Et il définira des points de contexte dans votre liste de commandes pour identifier quelles commandes ont été exécutées dans quel test

## Installation

La façon la plus simple est de garder `@wdio/sauce-service` comme devDependency dans votre `package.json`, via:

```sh
npm install @wdio/sauce-service --save-dev
```

Les instructions sur comment installer `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted)

## Configuration

Pour utiliser le service pour la machine virtuelle Desktop/Émulateur/Simulateur et le cloud d'appareils réels, vous devez définir `user` et `key` dans votre fichier `wdio.conf.js`. Il utilisera automatiquement Sauce Labs pour exécuter vos tests d'intégration. Si vous exécutez vos tests sur Sauce Labs, vous pouvez spécifier la région où vous souhaitez exécuter vos tests via la propriété `region`. Les raccourcis disponibles pour les régions sont `us` (par défaut) et `eu`. Ces régions sont utilisées pour le cloud VM Sauce Labs et le cloud d'appareils réels Sauce Labs. Si vous ne fournissez pas la région, elle sera par défaut `us`.

Si vous souhaitez que WebdriverIO démarre automatiquement un tunnel [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy), vous devez définir `sauceConnect: true`. Si vous souhaitez changer le centre de données pour l'UE, ajoutez `region:'eu'` car le centre de données des États-Unis est défini par défaut.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // ou 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

Si vous souhaitez utiliser un tunnel Sauce Connect existant, vous n'avez besoin que de fournir un `tunnelName`. Si vous utilisez un tunnel partagé, et que vous n'êtes pas l'utilisateur qui a créé le tunnel, vous devez identifier l'utilisateur Sauce Labs qui a créé le tunnel pour pouvoir l'utiliser pour votre test. Incluez le `tunnelOwner` dans les capacités comme ceci:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Options du service Sauce

Pour autoriser le service Sauce Labs, votre configuration doit contenir une option [`user`](https://webdriver.io/docs/options#user) et [`key`](https://webdriver.io/docs/options#key).

### maxErrorStackLength

Ce service enverra automatiquement la pile d'erreurs à Sauce Labs lorsqu'un test échoue. Par défaut, il n'enverra que les 5 premières lignes, mais si nécessaire, cela peut être modifié. Sachez que plus de lignes entraîneront plus d'appels WebDriver, ce qui pourrait ralentir l'exécution.

Type: `number`<br />
Par défaut: `5`

### sauceConnect

Si `true`, il exécute Sauce Connect et ouvre une connexion sécurisée entre une machine virtuelle Sauce Labs exécutant vos tests de navigateur.

Type: `Boolean`<br />
Par défaut: `false`

### sauceConnectOpts

Appliquez les options Sauce Connect (par exemple pour modifier les paramètres de port ou de fichier journal). Voir [cette liste](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) pour plus d'informations.

REMARQUE: Lors de la spécification des options, le `--` doit être omis. Il peut également être transformé en camelCase (par exemple, `shared-tunnel` ou `sharedTunnel`).

Type: `Object`<br />
Par défaut: `{ }`

### uploadLogs

Si `true`, cette option télécharge tous les fichiers journaux WebdriverIO vers la plateforme Sauce Labs pour inspection ultérieure. Assurez-vous d'avoir défini [`outputDir`](https://webdriver.io/docs/options#outputdir) dans votre configuration wdio pour écrire les journaux dans des fichiers, sinon les données seront diffusées vers stdout et ne pourront pas être téléchargées.

Type: `Boolean`<br />
Par défaut: `true`

### setJobName

Permet aux utilisateurs de définir dynamiquement le nom du job en fonction des paramètres du worker tels que la configuration WebdriverIO, les capacités utilisées et le titre original de la suite.

Type: `Function`<br />
Par défaut: `(config, capabilities, suiteTitle) => suiteTitle`

----

## Remplacer les métadonnées de nom générées

Le service génère automatiquement un nom pour chaque test à partir du nom de la suite, du nom du navigateur et d'autres informations.

Vous pouvez remplacer cela en fournissant une valeur pour la capacité souhaitée `name`, mais cela aura pour effet de donner le même nom à tous les tests.

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).