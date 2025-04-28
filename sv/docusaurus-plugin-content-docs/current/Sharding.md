---
id: sharding
title: Sharding
---

Som standard kör WebdriverIO tester parallellt och strävar efter optimal användning av CPU-kärnor på din maskin. För att uppnå ännu större parallellisering kan du ytterligare skala WebdriverIO-testexekvering genom att köra tester på flera maskiner samtidigt. Vi kallar detta driftläge för "sharding".

## Sharding av tester mellan flera maskiner

För att dela upp testsviten, skicka `--shard=x/y` till kommandoraden. För att till exempel dela upp sviten i fyra delar, där varje del kör en fjärdedel av testerna:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Nu, om du kör dessa delar parallellt på olika datorer, slutförs din testsvit fyra gånger snabbare.

## GitHub Actions exempel

GitHub Actions stöder [sharding av tester mellan flera jobb](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) med hjälp av [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) alternativet. Matrix-alternativet kommer att köra ett separat jobb för varje möjlig kombination av de angivna alternativen.

Följande exempel visar hur du konfigurerar ett jobb för att köra dina tester på fyra maskiner parallellt. Du kan hitta hela pipeline-uppsättningen i projektet [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Först lägger vi till ett matrix-alternativ till vår jobbkonfiguration med shard-alternativet som innehåller antalet delar vi vill skapa. `shard: [1, 2, 3, 4]` kommer att skapa fyra delar, var och en med ett annat shard-nummer.
-   Sedan kör vi våra WebdriverIO-tester med alternativet `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Detta blir vårt testkommando för varje del.
-   Slutligen laddar vi upp vår wdio-loggrapport till GitHub Actions Artifacts. Detta gör loggar tillgängliga om en del misslyckas.

Testpipelinen definieras enligt följande:

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

Detta kommer att köra alla delar parallellt, vilket reducerar exekveringstiden för testerna med 4:

![GitHub Actions exempel](/img/sharding.png "GitHub Actions exempel")

Se commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) från projektet [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) som introducerade sharding till dess testpipeline vilket hjälpte till att minska den totala exekveringstiden från `2:23 min` till `1:30 min`, en minskning med __37%__ 🎉.