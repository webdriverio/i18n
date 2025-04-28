---
id: sharding
title: Sharding
---

Di default, WebdriverIO esegue i test in parallelo e punta all'utilizzo ottimale dei core CPU sulla tua macchina. Per ottenere una parallelizzazione ancora maggiore, puoi scalare ulteriormente l'esecuzione dei test WebdriverIO eseguendoli su più macchine contemporaneamente. Chiamiamo questa modalità di funzionamento "sharding".

## Suddivisione dei test tra più macchine

Per suddividere la suite di test, passa `--shard=x/y` alla riga di comando. Ad esempio, per dividere la suite in quattro parti, ognuna eseguendo un quarto dei test:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Ora, se esegui questi shard in parallelo su diversi computer, la tua suite di test si completerà quattro volte più velocemente.

## Esempio con GitHub Actions

GitHub Actions supporta [la suddivisione dei test tra più job](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) utilizzando l'opzione [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). L'opzione matrix eseguirà un job separato per ogni possibile combinazione delle opzioni fornite.

L'esempio seguente mostra come configurare un job per eseguire i test su quattro macchine in parallelo. Puoi trovare l'intera configurazione della pipeline nel progetto [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Innanzitutto aggiungiamo un'opzione matrix alla configurazione del nostro job con l'opzione shard contenente il numero di shard che vogliamo creare. `shard: [1, 2, 3, 4]` creerà quattro shard, ciascuno con un numero di shard diverso.
-   Quindi eseguiamo i nostri test WebdriverIO con l'opzione `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Questo sarà il nostro comando di test per ogni shard.
-   Infine carichiamo il report di log wdio negli Artifacts di GitHub Actions. Questo renderà i log disponibili nel caso in cui lo shard fallisca.

La pipeline di test è definita come segue:

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

Questo eseguirà tutti gli shard in parallelo, riducendo il tempo di esecuzione dei test di 4 volte:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Vedi il commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) dal progetto [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) che ha introdotto lo sharding nella sua pipeline di test, contribuendo a ridurre il tempo di esecuzione complessivo da `2:23 min` a `1:30 min`, una riduzione del __37%__ 🎉.