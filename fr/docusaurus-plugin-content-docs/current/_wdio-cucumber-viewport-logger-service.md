---
id: wdio-cucumber-viewport-logger-service
title: Service de journalisation de viewport Cucumber
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---


> wdio-cucumber-viewport-logger-service est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Service de journalisation de viewport Cucumber pour WebdriverIO

Ce service ajoute la possibilité de journaliser vos étapes Cucumber et d'autres informations de débogage directement dans la fenêtre de votre navigateur dans
votre solution basée sur WebdriverIO. Il peut être particulièrement utile dans les cas d'utilisation d'appareils ou de machines virtuelles sans accès
*physique* direct et sans possibilité de configurer une session interactive pour un débogage approfondi de vos tests e2e.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Démarrage rapide

Installez le package :

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

Ajoutez le service à votre section de configuration `services`, par exemple :

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Options du service

| Option | Description | Type | Valeur par défaut |
| --- | --- | --- | --- |
| `numberOfSteps` | le nombre d'étapes qui seront présentes sur le viewport | number | 3 |
| `enabled` | activer/désactiver le service | boolean | true |
| `styles` | Styles CSS pour l'enveloppe du logger, *le mot-clé de l'étape* et *le texte de l'étape*, voir l'exemple ci-dessous | object | {} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // le service ne sera activé que lorsque vous définirez la variable d'environnement `VP_LOGGER` sur `1`
            // définir des styles CSS personnalisés pour des éléments particuliers
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - affiche un message personnalisé avec un style CSS personnalisé (non obligatoire), vous pouvez utiliser cela dans vos définitions d'étapes
par exemple :
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - supprime la section des messages du viewport, peut être utile par exemple pour faire une assertion visuelle

### pointerEvents: 'none'

Par défaut, tous les événements de souris (clic, survol, etc.) traversent la section de message, par exemple : au lieu de cliquer sur la section de message, votre clic "passe" à l'élément à côté du message (l'élément de votre application), si vous souhaitez modifier ce comportement, définissez l'option de style d'enveloppe 'pointerEvents' sur 'auto', eq :
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```