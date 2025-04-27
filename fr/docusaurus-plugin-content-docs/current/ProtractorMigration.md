---
id: protractor-migration
title: Depuis Protractor
---

Ce tutoriel est destiné aux personnes qui utilisent Protractor et souhaitent migrer leur framework vers WebdriverIO. Il a été initié après que l'équipe Angular [a annoncé](https://github.com/angular/protractor/issues/5502) que Protractor ne serait plus maintenu. WebdriverIO a été influencé par de nombreuses décisions de conception de Protractor, ce qui en fait probablement le framework le plus proche pour migrer. L'équipe WebdriverIO apprécie le travail de chaque contributeur de Protractor et espère que ce tutoriel rendra la transition vers WebdriverIO facile et directe.

Bien que nous aimerions avoir un processus entièrement automatisé pour cela, la réalité est différente. Chacun a une configuration différente et utilise Protractor de différentes manières. Chaque étape doit être considérée comme un guide et moins comme une instruction étape par étape. Si vous rencontrez des problèmes avec la migration, n'hésitez pas à [nous contacter](https://github.com/webdriverio/codemod/discussions/new).

## Configuration

Les API de Protractor et WebdriverIO sont en réalité très similaires, à tel point que la majorité des commandes peuvent être réécrites de manière automatisée grâce à un [codemod](https://github.com/webdriverio/codemod).

Pour installer le codemod, exécutez :

```sh
npm install jscodeshift @wdio/codemod
```

## Stratégie

Il existe de nombreuses stratégies de migration. Selon la taille de votre équipe, le nombre de fichiers de test et l'urgence de migrer, vous pouvez essayer de transformer tous les tests à la fois ou fichier par fichier. Étant donné que Protractor continuera d'être maintenu jusqu'à Angular version 15 (fin 2022), vous avez encore suffisamment de temps. Vous pouvez avoir des tests Protractor et WebdriverIO fonctionnant en même temps et commencer à écrire de nouveaux tests dans WebdriverIO. En fonction de votre budget temps, vous pouvez alors commencer par migrer les cas de test importants et progresser vers des tests que vous pourriez même supprimer.

## D'abord le fichier de configuration

Après avoir installé le codemod, nous pouvons commencer à transformer le premier fichier. Examinez d'abord les [options de configuration de WebdriverIO](configuration). Les fichiers de configuration peuvent devenir très complexes et il peut être judicieux de ne porter que les parties essentielles et de voir comment le reste peut être ajouté une fois que les tests correspondants qui nécessitent certaines options sont migrés.

Pour la première migration, nous transformons uniquement le fichier de configuration et exécutons :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

Votre configuration peut avoir un nom différent, cependant le principe devrait être le même : commencez par migrer la configuration.

:::

## Installer les dépendances WebdriverIO

La prochaine étape consiste à configurer une installation minimale de WebdriverIO que nous commencerons à développer au fur et à mesure de la migration d'un framework à l'autre. Tout d'abord, nous installons l'interface de ligne de commande WebdriverIO via :

```sh
npm install --save-dev @wdio/cli
```

Ensuite, nous exécutons l'assistant de configuration :

```sh
npx wdio config
```

Cela vous guidera à travers quelques questions. Pour ce scénario de migration, vous :
- choisissez les options par défaut
- nous vous recommandons de ne pas générer automatiquement des fichiers d'exemple
- choisissez un dossier différent pour les fichiers WebdriverIO
- et choisissez Mocha plutôt que Jasmine.

:::info Pourquoi Mocha ?
Même si vous avez peut-être utilisé Protractor avec Jasmine auparavant, Mocha offre de meilleurs mécanismes de réessai. Le choix vous appartient !
:::

Après ce petit questionnaire, l'assistant installera tous les packages nécessaires et les stockera dans votre `package.json`.

## Migrer le fichier de configuration

Après avoir transformé `conf.ts` et créé un nouveau `wdio.conf.ts`, il est maintenant temps de migrer la configuration d'un fichier à l'autre. Assurez-vous de ne porter que le code essentiel pour que tous les tests puissent s'exécuter. Dans notre cas, nous portons la fonction de hook et le délai d'attente du framework.

Nous continuerons maintenant uniquement avec notre fichier `wdio.conf.ts` et n'aurons donc plus besoin de modifications à la configuration originale de Protractor. Nous pouvons les annuler afin que les deux frameworks puissent fonctionner côte à côte et que nous puissions porter un fichier à la fois.

## Migrer un fichier de test

Nous sommes maintenant prêts à porter le premier fichier de test. Pour commencer simplement, commençons par un qui n'a pas beaucoup de dépendances à des packages tiers ou à d'autres fichiers comme les PageObjects. Dans notre exemple, le premier fichier à migrer est `first-test.spec.ts`. Créez d'abord le répertoire où la nouvelle configuration WebdriverIO attend ses fichiers, puis déplacez-le :

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Maintenant, transformons ce fichier :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

C'est tout ! Ce fichier est si simple que nous n'avons pas besoin de modifications supplémentaires et pouvons directement essayer d'exécuter WebdriverIO via :

```sh
npx wdio run wdio.conf.ts
```

Félicitations 🥳 vous venez de migrer le premier fichier !

## Prochaines étapes

À partir de ce point, vous continuez à transformer test par test et page object par page object. Il est possible que le codemod échoue pour certains fichiers avec une erreur telle que :

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Pour certaines commandes Protractor, il n'y a tout simplement pas de remplacement dans WebdriverIO. Dans ce cas, le codemod vous donnera quelques conseils sur la façon de le refactoriser. Si vous rencontrez trop souvent de tels messages d'erreur, n'hésitez pas à [signaler un problème](https://github.com/webdriverio/codemod/issues/new) et demander d'ajouter une certaine transformation. Bien que le codemod transforme déjà la majorité de l'API Protractor, il y a encore beaucoup de place pour des améliorations.

## Conclusion

Nous espérons que ce tutoriel vous guide un peu dans le processus de migration vers WebdriverIO. La communauté continue d'améliorer le codemod en le testant avec diverses équipes dans diverses organisations. N'hésitez pas à [signaler un problème](https://github.com/webdriverio/codemod/issues/new) si vous avez des commentaires ou à [démarrer une discussion](https://github.com/webdriverio/codemod/discussions/new) si vous rencontrez des difficultés pendant le processus de migration.