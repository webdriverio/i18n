---
id: sharding
title: Sharding
---

Par défaut, WebdriverIO exécute les tests en parallèle et vise une utilisation optimale des cœurs CPU de votre machine. Afin d'obtenir une parallélisation encore plus grande, vous pouvez étendre l'exécution des tests WebdriverIO en exécutant des tests sur plusieurs machines simultanément. Nous appelons ce mode de fonctionnement "sharding".

## Répartition des tests entre plusieurs machines

Pour répartir la suite de tests, passez `--shard=x/y` à la ligne de commande. Par exemple, pour diviser la suite en quatre parties, chacune exécutant un quart des tests :

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Maintenant, si vous exécutez ces parties en parallèle sur différents ordinateurs, votre suite de tests se termine quatre fois plus rapidement.

## Exemple avec GitHub Actions

GitHub Actions prend en charge la [répartition des tests entre plusieurs jobs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) en utilisant l'option [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). L'option matrix exécutera un job séparé pour chaque combinaison possible des options fournies.

L'exemple suivant vous montre comment configurer un job pour exécuter vos tests sur quatre machines en parallèle. Vous pouvez trouver la configuration complète du pipeline dans le projet [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   D'abord, nous ajoutons une option matrix à notre configuration de job avec l'option shard contenant le nombre de parties que nous voulons créer. `shard: [1, 2, 3, 4]` créera quatre parties, chacune avec un numéro de partie différent.
-   Ensuite, nous exécutons nos tests WebdriverIO avec l'option `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Ce sera notre commande de test pour chaque partie.
-   Enfin, nous téléchargeons notre rapport de logs wdio vers les Artifacts de GitHub Actions. Cela rendra les logs disponibles en cas d'échec d'une partie.

Le pipeline de test est défini comme suit :

```yaml title=.github/workflows/test.yaml
name: Test

on: [push, pull_request]

jobs:
    lint:
        # ...
    unit:
        # ...
    e2e:
        name: 🧪 Test (${{ matrix.shard }}/${{ strategy.job-total }})
        runs-on: ubuntu-latest
        needs: [lint, unit]
        strategy:
            matrix:
                shard: [1, 2, 3, 4]
        steps:
            - uses: actions/checkout@v4
            - uses: ./.github/workflows/actions/setup
            - name: E2E Test
              run: npm run test:features -- --shard ${{ matrix.shard }}/${{ strategy.job-total }}
            - uses: actions/upload-artifact@v1
              if: failure()
              with:
                  name: logs-${{ matrix.shard }}
                  path: logs
```

Cela exécutera toutes les parties en parallèle, réduisant le temps d'exécution des tests par 4 :

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Voir le commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) du projet [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) qui a introduit le sharding dans son pipeline de test, ce qui a permis de réduire le temps d'exécution global de `2:23 min` à `1:30 min`, une réduction de __37%__ 🎉.