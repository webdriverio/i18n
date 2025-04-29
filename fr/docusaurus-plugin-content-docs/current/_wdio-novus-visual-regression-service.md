---
id: wdio-novus-visual-regression-service
title: Service de Régression Visuelle Novus
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---


> wdio-novus-visual-regression-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Tests de régression visuelle pour WebdriverIO

Basé sur le travail de Jan-André Zinser sur [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) et [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Installation

Vous pouvez installer wdio-novus-visual-regression-service via NPM comme d'habitude :

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted)

## Configuration
Configurez wdio-novus-visual-regression-service en ajoutant `novus-visual-regression` à la section service de votre configuration WebdriverIO et définissez votre stratégie de comparaison souhaitée dans les options de service.

```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.LocalCompare({
          referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
          screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
          diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
          misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

### Options
Sous la clé `visualRegression` dans votre wdio.config.js, vous pouvez passer un objet de configuration avec la structure suivante :

* **compare** `Object` <br />
méthode de comparaison des captures d'écran, voir [Méthodes de comparaison](#compare-methods)

* **viewportChangePause**  `Number`  (par défaut : 100) <br />
attendre x millisecondes après un changement de viewport. Il peut falloir un certain temps pour que le navigateur redessine. Cela peut entraîner des problèmes de rendu et produire des résultats incohérents entre les exécutions.

* **viewports** `Object[{ width: Number, height: Number }]`  (par défaut : *[viewport-actuel]* ) (**desktop uniquement**)<br />
   toutes les captures d'écran seront prises dans différentes dimensions de viewport (par exemple pour les tests de design responsive)

* **orientations** `String[] {landscape, portrait}`  (par défaut : *[orientation-actuelle]* ) (**mobile uniquement**)<br />
    toutes les captures d'écran seront prises dans différentes orientations d'écran (par exemple pour les tests de design responsive)

### Méthodes de comparaison
wdio-novus-visual-regression-service permet l'utilisation de différentes méthodes de comparaison de captures d'écran.

#### VisualRegressionCompare.LocalCompare
Comme son nom l'indique, *LocalCompare* capture des captures d'écran localement sur votre ordinateur et les compare aux exécutions précédentes.

Vous pouvez passer les options suivantes à son constructeur en tant qu'objet :

* **referenceName** `Function` <br />
passez une fonction qui renvoie le nom de fichier pour la capture d'écran de référence. La fonction reçoit un objet *context* comme premier paramètre avec toutes les informations pertinentes sur la commande.

* **screenshotName** `Function` <br />
passez une fonction qui renvoie le nom de fichier pour la capture d'écran actuelle. La fonction reçoit un objet *context* comme premier paramètre avec toutes les informations pertinentes sur la commande.

* **diffName** `Function` <br />
passez une fonction qui renvoie le nom de fichier pour la capture d'écran de différence. La fonction reçoit un objet *context* comme premier paramètre avec toutes les informations pertinentes sur la commande.

* **misMatchTolerance** `Number`  (par défaut : 0.01) <br />
nombre entre 0 et 100 qui définit le degré de non-correspondance pour considérer deux images comme identiques, augmenter cette valeur diminuera la couverture des tests.

* **ignoreComparison** `String`  (par défaut : rien) <br />
passez une chaîne avec la valeur `nothing`, `colors` ou `antialiasing` pour ajuster la méthode de comparaison.

Pour un exemple de génération de noms de fichiers de captures d'écran en fonction du nom du test actuel, consultez l'exemple de code de [Configuration](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Cette méthode est une variante simplifiée de `VisualRegressionCompare.LocalCompare` pour capturer uniquement des captures d'écran. C'est très utile lorsque vous voulez simplement créer des captures d'écran de référence et écraser les précédentes sans faire de comparaison.

Vous pouvez passer les options suivantes à son constructeur en tant qu'objet :

* **screenshotName** `Function` <br />
passez une fonction qui renvoie le nom de fichier pour la capture d'écran actuelle. La fonction reçoit un objet *context* comme premier paramètre avec toutes les informations pertinentes sur la commande.

#### VisualRegressionCompare.Spectre
Cette méthode est utilisée pour télécharger des captures d'écran vers l'application web [Spectre](https://github.com/wearefriday/spectre).
Spectre est une interface utilisateur pour les tests de régression visuelle. Il stocke les captures d'écran et les compare, ce qui est très utile pour l'Intégration Continue.

Vous pouvez passer les options suivantes à son constructeur en tant qu'objet :

* **url** `String` <br />
passez une URL du service web Spectre.

* **project** `String` <br />
passez un nom pour votre projet.

* **suite** `String` <br />
passez un nom pour votre suite de tests. Un projet peut contenir plusieurs suites.

* **test** `Function` <br />
passez une fonction qui renvoie le nom du test pour la capture d'écran. La fonction reçoit un objet *context* comme premier paramètre avec toutes les informations pertinentes sur la commande.

* **browser** `Function` <br />
passez une fonction qui renvoie le navigateur pour la capture d'écran. La fonction reçoit un objet *context* comme premier paramètre avec toutes les informations pertinentes sur la commande.

* **size** `Function` <br />
passez une fonction qui renvoie la taille pour la capture d'écran. La fonction reçoit un objet *context* comme premier paramètre avec toutes les informations pertinentes sur la commande.

* **fuzzLevel** `Number`  (par défaut : 30) <br />
nombre entre 0 et 100 qui définit le facteur de flou de la méthode de comparaison d'images de Spectre. Pour plus de détails, veuillez consulter la [documentation Spectre](https://github.com/wearefriday/spectre).

**Exemple**
```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.Spectre({
          url: 'http://localhost:3000',
          project: 'my project',
          suite: 'my test suite',
          test: function getTest(context) {
            return context.test.title;
          },
          browser: function getBrowser(context) {
            return context.browser.name;
          },
          size: function getSize(context) {
            return context.meta.viewport != null ? context.meta.viewport.width : context.meta.orientation;
          },
          fuzzLevel: 30
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

## Utilisation
wdio-novus-visual-regression-service améliore une instance WebdriverIO avec les commandes suivantes :
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


Toutes ces commandes fournissent des options qui vous aideront à capturer des captures d'écran dans différentes dimensions ou à exclure des parties non pertinentes (par exemple, du contenu). Les options suivantes sont disponibles :


* **exclude** `String[]|Object[]` (**pas encore implémenté**)<br />
  exclure les parties fréquemment modifiées de votre capture d'écran, vous pouvez passer toutes sortes de différentes [stratégies de sélecteur WebdriverIO](http://webdriver.io/guide/usage/selectors.html)
  qui interrogent un ou plusieurs éléments ou vous pouvez définir des valeurs x et y qui étendent un rectangle ou un polygone

* **hide** `Object[]`<br />
  cache tous les éléments interrogés par toutes sortes de différentes [stratégies de sélecteur WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (via `visibility: hidden`)

* **remove** `Object[]`<br />
  supprime tous les éléments interrogés par toutes sortes de différentes [stratégies de sélecteur WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (via `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**desktop uniquement**)<br />
     Remplace la valeur globale *viewports* pour cette commande. Toutes les captures d'écran seront prises dans différentes dimensions de viewport (par exemple pour les tests de design responsive)

* **orientations** `String[] {landscape, portrait}` (**mobile uniquement**)<br />
    Remplace la valeur globale *orientations* pour cette commande. Toutes les captures d'écran seront prises dans différentes orientations d'écran (par exemple pour les tests de design responsive)

* **misMatchTolerance** `Number` <br />
    Remplace la valeur globale *misMatchTolerance* pour cette commande. Passez un nombre entre 0 et 100 qui définit le degré de non-correspondance pour considérer deux images comme identiques.

* **fuzzLevel** `Number` <br />
    Remplace la valeur globale *fuzzLevel* pour cette commande. Passez un nombre entre 0 et 100 qui définit le facteur de flou de la méthode de comparaison d'images de Spectre.

* **ignoreComparison** `String` <br />
    Remplace la valeur globale *ignoreComparison* pour cette commande. Passez une chaîne avec la valeur `nothing`, `colors` ou `antialiasing` pour ajuster la méthode de comparaison.

* **viewportChangePause**  `Number` <br />
    Remplace la valeur globale *viewportChangePause* pour cette commande. Attendez x millisecondes après un changement de viewport.

### Licence

MIT