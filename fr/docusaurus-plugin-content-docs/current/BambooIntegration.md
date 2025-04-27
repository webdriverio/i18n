---
id: bamboo
title: Bamboo
---

WebdriverIO offre une intégration étroite avec les systèmes CI comme [Bamboo](https://www.atlassian.com/software/bamboo). Avec le rapporteur [JUnit](https://webdriver.io/docs/junit-reporter.html) ou [Allure](https://webdriver.io/docs/allure-reporter.html), vous pouvez facilement déboguer vos tests et suivre vos résultats de test. L'intégration est assez simple.

1. Installez le rapporteur de test JUnit : `$ npm install @wdio/junit-reporter --save-dev`)
1. Mettez à jour votre configuration pour enregistrer vos résultats JUnit à un endroit où Bamboo peut les trouver (et spécifiez le rapporteur `junit`) :

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
Remarque : *C'est toujours une bonne pratique de conserver les résultats des tests dans un dossier séparé plutôt que dans le dossier racine.*

```js
// wdio.conf.js - Pour les tests s'exécutant en parallèle
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

À ce stade, nous supposons que vous avez rédigé les tests et que les résultats sont générés dans le dossier ```./testresults/```, et que votre Bamboo est opérationnel.

## Intégrer vos tests dans Bamboo

1. Ouvrez votre projet Bamboo
    > Créez un nouveau plan, liez votre dépôt (assurez-vous qu'il pointe toujours vers la version la plus récente de votre dépôt) et créez vos étapes

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Je vais utiliser l'étape et la tâche par défaut. Dans votre cas, vous pouvez créer vos propres étapes et tâches

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Ouvrez votre tâche de test et créez des tâches pour exécuter vos tests dans Bamboo
    >**Tâche 1 :** Extraction du code source

    >**Tâche 2 :** Exécutez vos tests ```npm i && npm run test```. Vous pouvez utiliser la tâche *Script* et l'*Interpréteur Shell* pour exécuter les commandes ci-dessus (Cela générera les résultats des tests et les enregistrera dans le dossier ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Tâche 3 :** Ajoutez la tâche *jUnit Parser* pour analyser vos résultats de test enregistrés. Veuillez spécifier le répertoire des résultats de test ici (vous pouvez également utiliser des modèles de style Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Remarque : *Assurez-vous de garder la tâche d'analyse des résultats dans la section *Final*, afin qu'elle soit toujours exécutée même si votre tâche de test échoue*

    >**Tâche 4 :** (facultatif) Afin de vous assurer que vos résultats de test ne sont pas mélangés avec d'anciens fichiers, vous pouvez créer une tâche pour supprimer le dossier ```./testresults/``` après une analyse réussie dans Bamboo. Vous pouvez ajouter un script shell comme ```rm -f ./testresults/*.xml``` pour supprimer les résultats ou ```rm -r testresults``` pour supprimer le dossier complet

Une fois que cette *science-fiction* est terminée, veuillez activer le plan et l'exécuter. Votre résultat final ressemblera à :

## Test réussi

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Test échoué

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Échoué et corrigé

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Hourra !! C'est tout. Vous avez réussi à intégrer vos tests WebdriverIO dans Bamboo.