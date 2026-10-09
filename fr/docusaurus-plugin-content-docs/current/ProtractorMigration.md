---
id: protractor-migration
title: Depuis Protractor
description: "Migrez une suite de tests Protractor vers WebdriverIO étape par étape, y compris les dépendances, le fichier de configuration et les fichiers de test, à l'aide d'un codemod."
---

Ce tutoriel s'adresse aux personnes qui utilisent Protractor et souhaitent migrer leur framework vers WebdriverIO. Il a été lancé après que l'équipe Angular [a annoncé](https://github.com/angular/protractor/issues/5502) que Protractor ne serait plus pris en charge. WebdriverIO a été influencé par de nombreux choix de conception de Protractor, ce qui en fait probablement le framework le plus proche vers lequel migrer. L'équipe WebdriverIO apprécie le travail de chaque contributeur de Protractor et espère que ce tutoriel rendra la transition vers WebdriverIO simple et directe.

Bien que nous aimerions disposer d'un processus entièrement automatisé, la réalité est différente. Chacun a une configuration différente et utilise Protractor de différentes manières. Chaque étape doit être considérée comme une orientation plutôt que comme une instruction pas à pas. Si vous rencontrez des problèmes lors de la migration, n'hésitez pas à [nous contacter](https://github.com/webdriverio/codemod/discussions/new).

## Installation

Les API de Protractor et de WebdriverIO sont en réalité très similaires, au point que la majorité des commandes peuvent être réécrites de manière automatisée grâce à un [codemod](https://github.com/webdriverio/codemod).

Pour installer le codemod, exécutez :

```sh
npm install jscodeshift @wdio/codemod
```

## Stratégie

Il existe de nombreuses stratégies de migration. Selon la taille de votre équipe, le nombre de fichiers de test et l'urgence de la migration, vous pouvez essayer de transformer tous les tests en une seule fois ou fichier par fichier. Étant donné que Protractor continuera d'être maintenu jusqu'à la version 15 d'Angular (fin 2022), vous avez encore suffisamment de temps. Vous pouvez faire tourner des tests Protractor et WebdriverIO en même temps et commencer à écrire de nouveaux tests dans WebdriverIO. En fonction du temps dont vous disposez, vous pouvez ensuite commencer par migrer les cas de test importants, puis descendre progressivement jusqu'aux tests que vous pourriez même supprimer.

## D'abord le fichier de configuration

Après avoir installé le codemod, nous pouvons commencer à transformer le premier fichier. Jetez d'abord un œil aux [options de configuration de WebdriverIO](configuration). Les fichiers de configuration peuvent devenir très complexes et il peut être judicieux de ne porter que les parties essentielles, puis de voir comment ajouter le reste une fois que les tests correspondants nécessitant certaines options sont migrés.

Pour la première migration, nous transformons uniquement le fichier de configuration et exécutons :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Votre configuration peut porter un nom différent, mais le principe reste le même : commencez par migrer la configuration.

:::

## Installer les dépendances WebdriverIO

L'étape suivante consiste à configurer une installation WebdriverIO minimale que nous enrichirons au fur et à mesure de la migration d'un framework à l'autre. Nous installons d'abord le CLI de WebdriverIO via :

```sh
npm install --save-dev @wdio/cli
```

Ensuite, nous lançons l'assistant de configuration :

```sh
npx wdio config
```

Celui-ci vous guidera à travers quelques questions. Pour ce scénario de migration, vous :
- choisissez les options par défaut
- nous recommandons de ne pas générer automatiquement de fichiers d'exemple
- choisissez un dossier différent pour les fichiers WebdriverIO
- et de choisir Mocha plutôt que Jasmine.

:::info Pourquoi Mocha ?
Même si vous utilisiez peut-être Protractor avec Jasmine auparavant, Mocha offre de meilleurs mécanismes de nouvelle tentative. Le choix vous appartient !
:::

Après ce petit questionnaire, l'assistant installera tous les paquets nécessaires et les enregistrera dans votre `package.json`.

## Migrer le fichier de configuration

Une fois que nous avons un `conf.ts` transformé et un nouveau `wdio.conf.ts`, il est temps de migrer la configuration de l'un vers l'autre. Veillez à ne porter que le code essentiel pour que tous les tests puissent s'exécuter. Dans notre cas, nous portons la fonction de hook et le délai d'expiration du framework.

Nous allons maintenant continuer uniquement avec notre fichier `wdio.conf.ts` et n'aurons donc plus besoin de modifier la configuration Protractor d'origine. Nous pouvons annuler ces modifications afin que les deux frameworks puissent fonctionner côte à côte et que nous puissions porter un fichier à la fois.

## Migrer un fichier de test

Nous sommes maintenant prêts à porter le premier fichier de test. Pour commencer simplement, choisissons-en un qui n'a pas beaucoup de dépendances vers des paquets tiers ou d'autres fichiers comme des PageObjects. Dans notre exemple, le premier fichier à migrer est `first-test.spec.ts`. Créez d'abord le répertoire où la nouvelle configuration WebdriverIO attend ses fichiers, puis déplacez-le :

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Transformons maintenant ce fichier :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

C'est tout ! Ce fichier est si simple que nous n'avons besoin d'aucune modification supplémentaire et pouvons directement essayer d'exécuter WebdriverIO via :

```sh
npx wdio run wdio.conf.ts
```

Félicitations 🥳 vous venez de migrer votre premier fichier !

## Prochaines étapes

À partir de là, vous continuez à transformer les tests un par un et les page objects un par un. Il est possible que le codemod échoue pour certains fichiers avec une erreur telle que :

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Pour certaines commandes Protractor, il n'existe tout simplement pas d'équivalent dans WebdriverIO. Dans ce cas, le codemod vous donnera des conseils sur la manière de refactoriser le code. Si vous rencontrez trop souvent ce type de messages d'erreur, n'hésitez pas à [ouvrir une issue](https://github.com/webdriverio/codemod/issues/new) et à demander l'ajout d'une transformation particulière. Bien que le codemod transforme déjà la majorité de l'API Protractor, il reste encore beaucoup de marge d'amélioration.

## Conclusion

Nous espérons que ce tutoriel vous guide un peu dans le processus de migration vers WebdriverIO. La communauté continue d'améliorer le codemod tout en le testant avec diverses équipes dans diverses organisations. N'hésitez pas à [ouvrir une issue](https://github.com/webdriverio/codemod/issues/new) si vous avez des retours ou à [lancer une discussion](https://github.com/webdriverio/codemod/discussions/new) si vous rencontrez des difficultés pendant le processus de migration.