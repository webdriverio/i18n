---
id: appium-service
title: Service Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---


La gestion du serveur Appium dépasse le cadre du projet WebdriverIO proprement dit. Ce service vous aide à exécuter le serveur Appium de manière transparente lors de l'exécution de tests avec le [testrunner WDIO](https://webdriver.io/docs/clioptions). Il démarre le [Serveur Appium](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) dans un processus enfant.

## Installation

La façon la plus simple est de garder `@wdio/appium-service` comme devDependency dans votre `package.json`, via :

```sh
npm install @wdio/appium-service --save-dev
```

Des instructions sur la façon d'installer `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted)

## Configuration

Pour utiliser le service, vous devez ajouter `appium` à votre tableau de services :

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: ['appium'],
    // ...
};
```

## Options

Les options suivantes peuvent être ajoutées au fichier wdio.conf.js. Pour définir des options pour le service, vous devez ajouter le service à la liste `services` de la manière suivante :

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: [
        ['appium', {
            // Appium service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath
Le chemin où tous les logs du serveur Appium doivent être stockés.

Type: `String`

Exemple :
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
Pour utiliser votre installation d'Appium, par exemple installée globalement, spécifiez la commande qui doit être démarrée.

Type: `String`

Exemple :
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Carte des arguments pour le serveur Appium, passés directement à `appium`.

Voir [la documentation](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) pour les arguments possibles.
Les arguments sont fournis en lower camel case. Par exemple, `debugLogSpacing: true` se transforme en `--debug-log-spacing`, ou ils peuvent être fournis comme indiqué dans la documentation Appium.

Type: `Object`

Par défaut: `{}`

Exemple :
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**Remarque :** L'utilisation d'alias est déconseillée et non prise en charge. Au lieu de cela, veuillez utiliser le nom complet de la propriété en lower camel case.

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).