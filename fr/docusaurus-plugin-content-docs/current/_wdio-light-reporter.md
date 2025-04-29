---
id: wdio-light-reporter
title: Rapporteur Light
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---


> wdio-light-reporter est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Inspiré par les rapporteurs HTML et Mochawesome

!Philosophie:

> Ce rapporteur ne prend pas en charge la régénération de rapports Cucumber et est développé en gardant à l'esprit les frameworks bdd et mocha.
> Ici, la section `describe()` est considérée comme un scénario de test et `it()` comme un cas de test à l'intérieur des scénarios de test.

## FONCTIONNALITÉS

1. Configuration facile
2. Interface utilisateur améliorée
3. Capture d'écran intégrée dans le rapport HTML
4. addLabel() pour inclure le contexte ou le nom des étapes


## Versions
V 0.1.9 - Version initiale
V 0.2.6 - (dernière)
  1. Inclut plusieurs exécutions d'environnement et segmente en fonction de l'environnement.
  2. Correction de bugs
  3. Amélioration des performances.


## EXEMPLES

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## Installation

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## Configuration

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## Captures d'écran

Le rapporteur n'a pas la capacité de configurer automatiquement la prise de captures d'écran, mais s'il est configuré manuellement, il écoute l'événement et joint les captures d'écran dans le rapport HTML.
**Pour inclure des captures d'écran dans le rapport, ajoutez le code ci-dessous dans le hook afterTest() dans le fichier wdio conf.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## Fichiers de résultats

Chaque exécution régénère un rapport json pour chaque fichier de spécification, pour générer un rapport json et HTML combiné, ajoutez le code ci-dessous dans le hook **onComplete()** dans le fichier wdio conf

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> Si vous exécutez votre test sans aucune option --suite, il considère par défaut comme la suite
> Le rapporteur ne fonctionne pas si vous donnez plusieurs paramètres comme suites lors de l'exécution.
> wdio run `wdio.conf.js --suite firstSuite` - **(FONCTIONNE BIEN)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(NE FONCTIONNE PAS)** :(

## Ajout de contexte

> Vous pouvez utiliser `useLabel()` pour ajouter du contexte à n'importe quelle étape ou ajouter pour l'inclure comme étapes.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## Mises à jour
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## Licence

MIT
**Gratuit, Oh que oui!**