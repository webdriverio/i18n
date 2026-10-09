---
id: jenkins
title: Jenkins
description: "Exécutez les tests WebdriverIO dans Jenkins et publiez les résultats du reporter JUnit pour déboguer les échecs et suivre l'historique des tests."
---

WebdriverIO offre une intégration étroite avec les systèmes CI comme [Jenkins](https://jenkins-ci.org). Avec le reporter `junit`, vous pouvez facilement déboguer vos tests et suivre vos résultats de test. L'intégration est assez simple.

1. Installez le reporter de test `junit` : `$ npm install @wdio/junit-reporter --save-dev`)
1. Mettez à jour votre configuration pour enregistrer vos résultats XUnit là où Jenkins peut les trouver,
    (et spécifiez le reporter `junit`) :

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

Le choix du framework vous appartient. Les rapports seront similaires.
Pour ce tutoriel, nous utiliserons Jasmine.

Après avoir écrit quelques tests, vous pouvez configurer un nouveau job Jenkins. Donnez-lui un nom et une description :

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Ensuite, assurez-vous qu'il récupère toujours la version la plus récente de votre dépôt :

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Maintenant, la partie importante :** Créez une étape `build` pour exécuter des commandes shell. L'étape `build` doit compiler votre projet. Comme ce projet de démonstration teste uniquement une application externe, vous n'avez rien à compiler. Installez simplement les dépendances node et exécutez la commande `npm test` (qui est un alias pour `node_modules/.bin/wdio test/wdio.conf.js`).

Si vous avez installé un plugin comme AnsiColor, mais que les logs ne sont toujours pas colorés, exécutez les tests avec la variable d'environnement `FORCE_COLOR=1` (par exemple, `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Après votre test, vous voudrez que Jenkins suive votre rapport XUnit. Pour ce faire, vous devez ajouter une action post-build appelée _"Publish JUnit test result report"_.

Vous pourriez également installer un plugin XUnit externe pour suivre vos rapports. Celui de JUnit est fourni avec l'installation de base de Jenkins et est suffisant pour le moment.

Selon le fichier de configuration, les rapports XUnit seront enregistrés dans le répertoire racine du projet. Ces rapports sont des fichiers XML. Ainsi, tout ce que vous avez à faire pour suivre les rapports est d'indiquer à Jenkins tous les fichiers XML de votre répertoire racine :

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

C'est tout ! Vous avez maintenant configuré Jenkins pour exécuter vos jobs WebdriverIO. Votre job fournira désormais des résultats de test détaillés avec des graphiques d'historique, des informations de stacktrace sur les jobs échoués, et une liste des commandes avec le payload utilisé dans chaque test.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")