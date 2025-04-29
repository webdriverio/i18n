---
id: sumologic-reporter
title: Reporter Sumologic
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---


> Un reporter WebdriverIO qui envoie les résultats des tests à [Sumologic](https://www.sumologic.com/) pour l'analyse de données

![Tableau de bord Sumologic](/img/sumologic.png "Tableau de bord Sumologic")

## Installation

La façon la plus simple est de garder `@wdio/sumologic-reporter` comme devDependency dans votre `package.json`, via :

```sh
npm install @wdio/sumologic-reporter --save-dev
```

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted).

## Configuration

D'abord, nous devons créer un nouveau collecteur qui recueille tous les logs de vos tests. Pour ce faire, cliquez sur __Manage__ dans la barre de navigation et allez à __Collection__. Vous devez y ajouter un nouveau "Hosted Collector". Appliquez un nom approprié, par exemple "test integration logs", une description et une catégorie, par exemple "wdio". Cliquez sur Save pour créer le collecteur.

![Ajouter un Collecteur](https://webdriver.io/images/sumo-collector.png "Ajouter un Collecteur")

L'étape suivante consiste à ajouter une source. Il est logique d'avoir une source distincte pour chacun de vos environnements (par exemple, branche build, intégration). Cliquez sur le lien "Add Source" à côté de votre collecteur et ajoutez une __HTTP Source__. Appliquez à nouveau un nom et une description appropriés et définissez une "Source Category" qui reflète l'environnement. Laissez les autres options dans l'état par défaut et cliquez sur save.

![Ajouter une Source](https://webdriver.io/images/sumo-source.png "Ajouter une Source")

Une fenêtre modale apparaît avec le point de terminaison de la source. Copiez cette URL et collez-la dans votre wdio.conf.js pour que le reporter sache où envoyer les données.

Le code suivant montre la configuration par défaut du test runner wdio. Ajoutez simplement `'sumologic'` comme reporter au tableau et ajoutez votre point de terminaison source :

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

Après avoir exécuté les premiers tests avec le reporter, vous devriez pouvoir consulter les journaux des tests avec la requête suivante :

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Je fournirai bientôt des modèles de tableau de bord utiles pour Sumologic.

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).