---
id: v6-migration
title: De v5 à v6
description: "Mettez à niveau un projet WebdriverIO de la v5 vers la v6 en mettant à jour les dépendances, en transformant le fichier de configuration et en mettant à jour les specs et les page objects."
---

Ce tutoriel s'adresse aux personnes qui utilisent encore la `v5` de WebdriverIO et souhaitent migrer vers la `v6` ou vers la dernière version de WebdriverIO. Comme mentionné dans notre [article de blog de publication](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), les changements de cette mise à niveau de version peuvent être résumés comme suit :

- nous avons consolidé les paramètres de certaines commandes (par exemple `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) et déplacé tous les paramètres optionnels dans un seul objet, par exemple

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- les configurations des services ont été déplacées dans la liste des services, par exemple

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- certaines options de services ont été renommées par souci de simplification
- nous avons renommé la commande `launchApp` en `launchChromeApp` pour les sessions Chrome WebDriver

:::info

Si vous utilisez WebdriverIO `v4` ou une version antérieure, veuillez d'abord effectuer la mise à niveau vers la `v5`.

:::

Bien que nous aimerions disposer d'un processus entièrement automatisé, la réalité est différente. Chacun a une configuration différente. Chaque étape doit être considérée comme une orientation plutôt que comme une instruction pas à pas. Si vous rencontrez des problèmes lors de la migration, n'hésitez pas à [nous contacter](https://github.com/webdriverio/codemod/discussions/new).

## Configuration

Comme pour les autres migrations, nous pouvons utiliser le [codemod](https://github.com/webdriverio/codemod) de WebdriverIO. Pour installer le codemod, exécutez :

```sh
npm install jscodeshift @wdio/codemod
```

## Mettre à niveau les dépendances WebdriverIO

Étant donné que toutes les versions de WebdriverIO sont étroitement liées les unes aux autres, il est préférable de toujours effectuer la mise à niveau vers un tag spécifique, par exemple `6.12.0`. Si vous décidez de passer directement de la `v5` à la `v7`, vous pouvez omettre le tag et installer les dernières versions de tous les paquets. Pour ce faire, nous copions toutes les dépendances liées à WebdriverIO depuis notre `package.json` et les réinstallons via :

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

En général, les dépendances WebdriverIO font partie des dépendances de développement, mais cela peut varier selon votre projet. Après cela, vos fichiers `package.json` et `package-lock.json` devraient être mis à jour. __Remarque :__ il s'agit de dépendances d'exemple, les vôtres peuvent être différentes. Assurez-vous de trouver la dernière version v6 en exécutant, par exemple :

```sh
npm show webdriverio versions
```

Essayez d'installer la dernière version 6 disponible pour tous les paquets principaux de WebdriverIO. Pour les paquets communautaires, cela peut varier d'un paquet à l'autre. Nous vous recommandons ici de consulter le changelog pour savoir quelle version est encore compatible avec la v6.

## Transformer le fichier de configuration

Une bonne première étape consiste à commencer par le fichier de configuration. Tous les changements incompatibles peuvent être résolus de manière entièrement automatique à l'aide du codemod :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Le codemod ne prend pas encore en charge les projets TypeScript. Voir [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Nous travaillons à implémenter cette prise en charge prochainement. Si vous utilisez TypeScript, n'hésitez pas à contribuer !

:::

## Mettre à jour les fichiers de spec et les page objects

Afin de mettre à jour tous les changements de commandes, exécutez le codemod sur tous vos fichiers e2e contenant des commandes WebdriverIO, par exemple :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

C'est tout ! Aucune autre modification n'est nécessaire 🎉

## Conclusion

Nous espérons que ce tutoriel vous guide un peu dans le processus de migration vers WebdriverIO `v6`. Nous vous recommandons vivement de continuer la mise à niveau vers la dernière version, étant donné que la mise à jour vers la `v7` est triviale en raison de l'absence quasi totale de changements incompatibles. Veuillez consulter le guide de migration [pour passer à la v7](v7-migration).

La communauté continue d'améliorer le codemod tout en le testant avec diverses équipes dans diverses organisations. N'hésitez pas à [signaler un problème](https://github.com/webdriverio/codemod/issues/new) si vous avez des retours ou à [lancer une discussion](https://github.com/webdriverio/codemod/discussions/new) si vous rencontrez des difficultés pendant le processus de migration.