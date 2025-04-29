---
id: wdio-winappdriver-service
title: Service winappdriver
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---


> wdio-winappdriver-service est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

Ce service vous aide à exécuter le serveur WinAppDriver de manière transparente lors de l'exécution de tests avec le [testrunner WDIO](https://webdriver.io/guide/testrunner/gettingstarted.html). Il démarre [WinAppDriver](https://github.com/Microsoft/WinAppDriver) dans un processus enfant.

## Installation

```bash
npm install wdio-winappdriver-service --save-dev
```

Les instructions sur la façon d'installer `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted.html)

## Configuration

Pour utiliser ce service, vous devez ajouter `winappdriver` à votre tableau de services :

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
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
        ['winappdriver', {
            // Options du service WinAppDriver ici
            // ...
        }]
    ],
    // ...
};
```

### logPath

Chemin où tous les journaux du serveur winappdriver doivent être stockés.

Type: `String`

Exemple :

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Pour utiliser votre propre installation de WinAppDriver, par exemple installée globalement, spécifiez la commande qui doit être démarrée.

Type: `String`

Exemple :

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

Liste d'arguments passés directement à `WinAppDriver`.

Voir [la documentation](https://github.com/Microsoft/WinAppDriver) pour les arguments possibles.

Type: `Array`

Par défaut: `[]`

Exemple :

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```