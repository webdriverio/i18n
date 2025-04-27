---
id: v6-migration
title: De v5 à v6
---

Ce tutoriel est destiné aux personnes qui utilisent encore la `v5` de WebdriverIO et souhaitent migrer vers la `v6` ou vers la dernière version de WebdriverIO. Comme mentionné dans notre [article de blog sur la version](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), les changements pour cette mise à niveau de version peuvent être résumés comme suit :

- nous avons consolidé les paramètres pour certaines commandes (par exemple `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) et déplacé tous les paramètres optionnels dans un seul objet, par exemple :

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

- les configurations pour les services ont été déplacées dans la liste des services, par exemple :

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

- certaines options de service ont été renommées pour des raisons de simplification
- nous avons renommé la commande `launchApp` en `launchChromeApp` pour les sessions Chrome WebDriver

:::info

Si vous utilisez WebdriverIO `v4` ou une version antérieure, veuillez d'abord passer à la `v5`.

:::

Bien que nous aimerions avoir un processus entièrement automatisé pour cela, la réalité est différente. Chacun a une configuration différente. Chaque étape doit être considérée comme un guide et moins comme une instruction étape par étape. Si vous rencontrez des problèmes lors de la migration, n'hésitez pas à [nous contacter](https://github.com/webdriverio/codemod/discussions/new).

## Configuration

Comme pour d'autres migrations, nous pouvons utiliser le [codemod](https://github.com/webdriverio/codemod) de WebdriverIO. Pour installer le codemod, exécutez :

```sh
npm install jscodeshift @wdio/codemod
```

## Mettre à niveau les dépendances WebdriverIO

Étant donné que toutes les versions de WebdriverIO sont liées les unes aux autres, il est préférable de toujours passer à une balise spécifique, par exemple `6.12.0`. Si vous décidez de passer directement de la `v5` à la `v7`, vous pouvez omettre la balise et installer les dernières versions de tous les packages. Pour ce faire, nous copions toutes les dépendances liées à WebdriverIO de notre `package.json` et les réinstallons via :

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Habituellement, les dépendances WebdriverIO font partie des dépendances de développement, mais cela peut varier selon votre projet. Après cela, votre `package.json` et `package-lock.json` devraient être mis à jour. __Remarque :__ ce sont des dépendances d'exemple, les vôtres peuvent différer. Assurez-vous de trouver la dernière version v6 en appelant, par exemple :

```sh
npm show webdriverio versions
```

Essayez d'installer la dernière version 6 disponible pour tous les packages principaux de WebdriverIO. Pour les packages communautaires, cela peut différer d'un package à l'autre. Ici, nous vous recommandons de consulter le changelog pour obtenir des informations sur les versions encore compatibles avec v6.

## Transformer le fichier de configuration

Une bonne première étape consiste à commencer par le fichier de configuration. Tous les changements majeurs peuvent être résolus automatiquement à l'aide du codemod :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Le codemod ne prend pas encore en charge les projets TypeScript. Voir [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Nous travaillons à l'implémentation de cette prise en charge prochainement. Si vous utilisez TypeScript, n'hésitez pas à vous impliquer !

:::

## Mettre à jour les fichiers de spécification et les objets de page

Pour mettre à jour tous les changements de commande, exécutez le codemod sur tous vos fichiers e2e qui contiennent des commandes WebdriverIO, par exemple :

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

C'est tout ! Pas d'autres changements nécessaires 🎉

## Conclusion

Nous espérons que ce tutoriel vous guide un peu dans le processus de migration vers WebdriverIO `v6`. Nous vous recommandons vivement de continuer à mettre à niveau vers la dernière version, étant donné que la mise à jour vers la `v7` est triviale en raison de presque aucun changement majeur. Veuillez consulter le guide de migration [pour passer à v7](v7-migration).

La communauté continue d'améliorer le codemod en le testant avec diverses équipes dans diverses organisations. N'hésitez pas à [signaler un problème](https://github.com/webdriverio/codemod/issues/new) si vous avez des commentaires ou à [démarrer une discussion](https://github.com/webdriverio/codemod/discussions/new) si vous rencontrez des difficultés pendant le processus de migration.