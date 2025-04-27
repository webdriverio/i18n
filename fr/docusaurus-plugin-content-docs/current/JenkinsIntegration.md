---
id: jenkins
title: Jenkins
---

WebdriverIO offre une intégration étroite avec les systèmes CI comme [Jenkins](https://jenkins-ci.org). Avec le rapporteur `junit`, vous pouvez facilement déboguer vos tests et suivre vos résultats de test. L'intégration est assez simple.

1. Installez le rapporteur de test `junit` : `$ npm install @wdio/junit-reporter --save-dev`)
1. Mettez à jour votre configuration pour enregistrer vos résultats XUnit à un endroit où Jenkins peut les trouver,
    (et spécifiez le rapporteur `junit`) :

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

C'est à vous de choisir le framework. Les rapports seront similaires.
Pour ce tutoriel, nous utiliserons Jasmine.

Après avoir écrit quelques tests, vous pouvez configurer un nouveau job Jenkins. Donnez-lui un nom et une description :

![Nom et description](/img/jenkins/jobname.png "Nom et description")

Ensuite, assurez-vous qu'il récupère toujours la dernière version de votre dépôt :

![Configuration Git de Jenkins](/img/jenkins/gitsetup.png "Configuration Git de Jenkins")

**Maintenant la partie importante :** Créez une étape de `build` pour exécuter des commandes shell. L'étape de `build` doit construire votre projet. Comme ce projet de démonstration ne fait que tester une application externe, vous n'avez rien à construire. Installez simplement les dépendances node et exécutez la commande `npm test` (qui est un alias pour `node_modules/.bin/wdio test/wdio.conf.js`).

Si vous avez installé un plugin comme AnsiColor, mais que les logs ne sont toujours pas colorés, exécutez les tests avec la variable d'environnement `FORCE_COLOR=1` (par exemple, `FORCE_COLOR=1 npm test`).

![Étape de build](/img/jenkins/runjob.png "Étape de build")

Après votre test, vous voudrez que Jenkins suive votre rapport XUnit. Pour ce faire, vous devez ajouter une action post-build appelée _"Publish JUnit test result report"_.

Vous pourriez également installer un plugin XUnit externe pour suivre vos rapports. Celui de JUnit est fourni avec l'installation de base de Jenkins et est suffisant pour l'instant.

Selon le fichier de configuration, les rapports XUnit seront enregistrés dans le répertoire racine du projet. Ces rapports sont des fichiers XML. Donc, tout ce que vous avez à faire pour suivre les rapports est de pointer Jenkins vers tous les fichiers XML dans votre répertoire racine :

![Action post-build](/img/jenkins/postjob.png "Action post-build")

C'est tout ! Vous avez maintenant configuré Jenkins pour exécuter vos tâches WebdriverIO. Votre tâche fournira désormais des résultats de test détaillés avec des graphiques d'historique, des informations de trace d'appel sur les tâches échouées, et une liste de commandes avec la charge utile utilisée dans chaque test.

![Intégration finale de Jenkins](/img/jenkins/final.png "Intégration finale de Jenkins")