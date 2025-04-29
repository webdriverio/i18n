---
id: wdio-ywinappdriver-service
title: Service ywinappdriver
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---


> wdio-ywinappdriver-service est un package tiers, pour plus d'informations, consultez [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

Ce service vous aide à exécuter le serveur ywinappdriver de manière transparente lors de l'exécution de tests avec le [testrunner WDIO](https://webdriver.io/guide/testrunner/gettingstarted.html). Il démarre [ywinappdriver](https://github.com/licanhua/YWinAppDriver) dans un processus enfant.

## Installation

```bash
npm install wdio-ywinappdriver-service --save-dev
```

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted.html)

## Configuration

Pour utiliser ce service, vous devez ajouter `ywinappdriver` à votre tableau de services :

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## Options

Les options suivantes peuvent être ajoutées au fichier wdio.conf.js. Pour définir des options pour le service, vous devez ajouter le service à la liste `services` de la manière suivante :

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // options du service ywinappdriver ici
            // ...
        }]
    ],
    // ...
};
```

### logPath

Chemin où tous les logs du serveur ywinappdriver doivent être stockés.

Type: `String`

Exemple:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Pour utiliser votre propre installation de winappdriver, par exemple installé globalement, spécifiez la commande qui doit être lancée.

Type: `String`

Exemple:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

Liste d'arguments passés directement à `ywinappdriver`.

Consultez [la documentation](https://github.com/licanhua/ywinappdriver) pour les arguments possibles.

Type: `Array`

Par défaut: `[]`

Exemple:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```