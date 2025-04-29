---
id: static-server-service
title: Service de Serveur Statique
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---


Certains projets ne comportent que des ressources front-end et ne fonctionnent que sur un serveur statique. Ce service vous aide à exécuter un serveur de fichiers statiques pendant les tests.

## Installation

La façon la plus simple est d'ajouter `@wdio/static-server-service` comme `devDependency` dans votre `package.json`, via:

```sh
npm install @wdio/static-server-service --save-dev
```

Des instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted).

## Configuration

Pour utiliser le service de serveur statique, ajoutez `static-server` à votre tableau de services:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## Options

### `folders` (requis)

Tableau de chemins de dossiers et de points de montage.

Type: `Array<Object>`
Propriétés:
 - mount `{String}` - Point de terminaison URL où le dossier sera monté.
 - path `{String}` - Chemin vers le dossier à monter.

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

Port sur lequel le serveur sera lié.

Type: `Number`

Par défaut: `4567`

### `middleware`

Tableau d'objets middleware. Chargez et instanciez ces éléments dans la configuration, et transmettez-les pour que le serveur statique les utilise.

Type: `Array<Object>`
Propriétés:
 - mount `{String}` - Point de terminaison URL où le middleware sera monté.
 - middleware `<Object>` - Fonction de rappel middleware.

Par défaut: `[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](http://webdriver.io).