---
id: sharding
title: Sharding
---

Standardmäßig führt WebdriverIO Tests parallel aus und strebt eine optimale Nutzung der CPU-Kerne auf Ihrem Gerät an. Um eine noch größere Parallelisierung zu erreichen, können Sie die WebdriverIO-Testausführung weiter skalieren, indem Sie Tests gleichzeitig auf mehreren Maschinen ausführen. Wir nennen diesen Betriebsmodus "Sharding".

## Sharding von Tests zwischen mehreren Maschinen

Um die Testsuite zu sharden, übergeben Sie `--shard=x/y` an die Kommandozeile. Um beispielsweise die Suite in vier Shards aufzuteilen, wobei jeder ein Viertel der Tests ausführt:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Wenn Sie diese Shards parallel auf verschiedenen Computern ausführen, wird Ihre Testsuite viermal schneller abgeschlossen.

## GitHub Actions Beispiel

GitHub Actions unterstützt [Sharding von Tests zwischen mehreren Jobs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) mit der Option [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). Die Matrix-Option führt einen separaten Job für jede mögliche Kombination der bereitgestellten Optionen aus.

Das folgende Beispiel zeigt, wie Sie einen Job konfigurieren, um Ihre Tests parallel auf vier Maschinen auszuführen. Die vollständige Pipeline-Einrichtung finden Sie im Projekt [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Zuerst fügen wir eine Matrix-Option zu unserer Job-Konfiguration mit der Shard-Option hinzu, die die Anzahl der zu erstellenden Shards enthält. `shard: [1, 2, 3, 4]` erstellt vier Shards, jeder mit einer anderen Shard-Nummer.
-   Dann führen wir unsere WebdriverIO-Tests mit der Option `--shard ${{ matrix.shard }}/${{ strategy.job-total }}` aus. Dies wird unser Testbefehl für jeden Shard sein.
-   Schließlich laden wir unseren wdio-Protokollbericht in die GitHub Actions Artifacts hoch. Dadurch werden Protokolle verfügbar, falls der Shard fehlschlägt.

Die Test-Pipeline ist wie folgt definiert:

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

Dies führt alle Shards parallel aus und reduziert die Ausführungszeit für die Tests um das 4-fache:

![GitHub Actions Beispiel](/img/sharding.png "GitHub Actions Beispiel")

Siehe Commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) aus dem [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) Projekt, das Sharding in seine Test-Pipeline eingeführt hat, was dazu beitrug, die Gesamtausführungszeit von `2:23 min` auf `1:30 min` zu reduzieren, eine Reduzierung um __37%__ 🎉.