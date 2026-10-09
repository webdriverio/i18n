---
id: v7-migration
title: De v6 à v7
description: "Mettez à niveau un projet WebdriverIO de la v6 à la v7 en mettant à jour les dépendances, en transformant le fichier de configuration et en mettant à jour les définitions d'étapes Cucumber."
---

Ce tutoriel s'adresse aux personnes qui utilisent encore la `v6` de WebdriverIO et souhaitent migrer vers la `v7`. Comme mentionné dans notre [article de blog sur la sortie](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), les changements se situent principalement sous le capot et la mise à niveau devrait être un processus simple.

:::info

Si vous utilisez WebdriverIO `v5` ou une version antérieure, veuillez d'abord passer à la `v6`. Consultez notre [guide de migration v6](v6-migration).

:::

Bien que nous aimerions disposer d'un processus entièrement automatisé, la réalité est différente. Chacun a une configuration différente. Chaque étape doit être considérée comme une orientation plutôt que comme une instruction étape par étape. Si vous rencontrez des problèmes lors de la migration, n'hésitez pas à [nous contacter](https://github.com/webdriverio/codemod/discussions/new).

## Configuration

Comme pour les autres migrations, nous pouvons utiliser le [codemod](https://github.com/webdriverio/codemod) de WebdriverIO. Pour ce tutoriel, nous utilisons un [projet boilerplate](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) soumis par un membre de la communauté et le migrons entièrement de la `v6` à la `v7`.

Pour installer le codemod, exécutez :

```sh
npm install jscodeshift @wdio/codemod
```

#### Commits :

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Mettre à niveau les dépendances WebdriverIO

Étant donné que toutes les versions de WebdriverIO sont étroitement liées les unes aux autres, il est préférable de toujours effectuer la mise à niveau vers un tag spécifique, par exemple `latest`. Pour ce faire, nous copions toutes les dépendances liées à WebdriverIO depuis notre `package.json` et les réinstallons via :

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Habituellement, les dépendances WebdriverIO font partie des dépendances de développement, mais cela peut varier selon votre projet. Après cela, votre `package.json` et votre `package-lock.json` devraient être mis à jour. __Remarque :__ ce sont les dépendances utilisées par le [projet d'exemple](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), les vôtres peuvent être différentes.

#### Commits :

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Transformer le fichier de configuration

Une bonne première étape consiste à commencer par le fichier de configuration. Dans WebdriverIO `v7`, il n'est plus nécessaire d'enregistrer manuellement les compilateurs. En fait, ils doivent être supprimés. Cela peut être fait de manière entièrement automatique avec le codemod :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Le codemod ne prend pas encore en charge les projets TypeScript. Voir [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Nous travaillons à implémenter cette prise en charge prochainement. Si vous utilisez TypeScript, n'hésitez pas à vous impliquer !

:::

#### Commits :

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Mettre à jour les définitions d'étapes

Si vous utilisez Jasmine ou Mocha, vous avez terminé. La dernière étape consiste à mettre à jour les imports Cucumber.js de `cucumber` vers `@cucumber/cucumber`. Cela peut également être fait automatiquement via le codemod :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

C'est tout ! Aucune autre modification n'est nécessaire 🎉

#### Commits :

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Conclusion

Nous espérons que ce tutoriel vous guidera un peu dans le processus de migration vers WebdriverIO `v7`. La communauté continue d'améliorer le codemod tout en le testant avec diverses équipes dans diverses organisations. N'hésitez pas à [ouvrir une issue](https://github.com/webdriverio/codemod/issues/new) si vous avez des retours ou à [lancer une discussion](https://github.com/webdriverio/codemod/discussions/new) si vous rencontrez des difficultés pendant le processus de migration.