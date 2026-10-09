---
id: bamboo
title: Bamboo
description: "Exécutez des tests WebdriverIO dans Atlassian Bamboo et publiez les résultats JUnit pour suivre les tests réussis, échoués et corrigés à chaque build."
---

WebdriverIO offre une intégration étroite avec les systèmes CI comme [Bamboo](https://www.atlassian.com/software/bamboo). Avec le reporter [JUnit](https://webdriver.io/docs/junit-reporter.html) ou [Allure](https://webdriver.io/docs/allure-reporter.html), vous pouvez facilement déboguer vos tests et suivre vos résultats de test. L'intégration est assez simple.

1. Installez le reporter de test JUnit : `$ npm install @wdio/junit-reporter --save-dev`)
1. Mettez à jour votre configuration pour enregistrer vos résultats JUnit là où Bamboo peut les trouver (et spécifiez le reporter `junit`) :

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
Remarque : *C'est toujours une bonne pratique de conserver les résultats de test dans un dossier séparé plutôt que dans le dossier racine.*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

Les rapports seront similaires pour tous les frameworks et vous pouvez utiliser n'importe lequel : Mocha, Jasmine ou Cucumber.

À ce stade, nous supposons que vos tests sont écrits, que les résultats sont générés dans le dossier ```./testresults/```, et que votre Bamboo est opérationnel.

## Intégrer vos tests dans Bamboo

1. Ouvrez votre projet Bamboo
    > Créez un nouveau plan, liez votre dépôt (assurez-vous qu'il pointe toujours vers la version la plus récente de votre dépôt) et créez vos stages

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    J'utiliserai le stage et le job par défaut. Dans votre cas, vous pouvez créer vos propres stages et jobs

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Ouvrez votre job de test et créez des tâches pour exécuter vos tests dans Bamboo
    >**Tâche 1 :** Récupération du code source (Source Code Checkout)

    >**Tâche 2 :** Exécutez vos tests ```npm i && npm run test```. Vous pouvez utiliser la tâche *Script* et l'*Shell Interpreter* pour exécuter les commandes ci-dessus (cela générera les résultats de test et les enregistrera dans le dossier ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Tâche 3 :** Ajoutez la tâche *jUnit Parser* pour analyser vos résultats de test enregistrés. Veuillez spécifier ici le répertoire des résultats de test (vous pouvez également utiliser des motifs de style Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Remarque : *Assurez-vous de placer la tâche d'analyse des résultats dans la section *Final*, afin qu'elle soit toujours exécutée même si votre tâche de test échoue*

    >**Tâche 4 :** (facultatif) Afin de vous assurer que vos résultats de test ne sont pas mélangés avec d'anciens fichiers, vous pouvez créer une tâche pour supprimer le dossier ```./testresults/``` après une analyse réussie par Bamboo. Vous pouvez ajouter un script shell comme ```rm -f ./testresults/*.xml``` pour supprimer les résultats ou ```rm -r testresults``` pour supprimer le dossier complet

Une fois cette *science de haut vol* terminée, veuillez activer le plan et l'exécuter. Votre résultat final ressemblera à ceci :

## Test réussi

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Test échoué

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Échoué puis corrigé

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Youpi !! C'est tout. Vous avez intégré avec succès vos tests WebdriverIO dans Bamboo.