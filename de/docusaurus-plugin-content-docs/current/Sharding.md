---
id: sharding
title: Sharding
description: "Teilen Sie Ihre Testsuite mit der Option --shard auf mehrere Maschinen auf, um Tests schneller auszuführen, zum Beispiel mit GitHub Actions."
---

Standardmäßig führt WebdriverIO Tests parallel aus und strebt eine optimale Auslastung der CPU-Kerne auf Ihrem Rechner an. Um eine noch stärkere Parallelisierung zu erreichen, können Sie die Testausführung von WebdriverIO weiter skalieren, indem Sie Tests gleichzeitig auf mehreren Maschinen ausführen. Wir nennen diesen Betriebsmodus „Sharding“.

## Tests auf mehrere Maschinen aufteilen

Um die Testsuite aufzuteilen, übergeben Sie `--shard=x/y` an die Kommandozeile. Um die Suite beispielsweise in vier Shards aufzuteilen, von denen jeder ein Viertel der Tests ausführt:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Wenn Sie diese Shards nun parallel auf verschiedenen Computern ausführen, wird Ihre Testsuite viermal schneller abgeschlossen.

## Beispiel für GitHub Actions

GitHub Actions unterstützt das [Aufteilen von Tests auf mehrere Jobs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) mithilfe der Option [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). Die Matrix-Option führt für jede mögliche Kombination der angegebenen Optionen einen separaten Job aus.

Das folgende Beispiel zeigt Ihnen, wie Sie einen Job konfigurieren, um Ihre Tests parallel auf vier Maschinen auszuführen. Das vollständige Pipeline-Setup finden Sie im Projekt [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Zuerst fügen wir unserer Job-Konfiguration eine Matrix-Option hinzu, wobei die Shard-Option die Anzahl der Shards enthält, die wir erstellen möchten. `shard: [1, 2, 3, 4]` erstellt vier Shards, jeweils mit einer anderen Shard-Nummer.
-   Dann führen wir unsere WebdriverIO-Tests mit der Option `--shard ${{ matrix.shard }}/${{ strategy.job-total }}` aus. Dies ist unser Testbefehl für jeden Shard.
-   Schließlich laden wir unseren wdio-Logbericht in die GitHub Actions Artifacts hoch. Dadurch stehen die Logs zur Verfügung, falls ein Shard fehlschlägt.

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

Dadurch werden alle Shards parallel ausgeführt, wodurch sich die Ausführungszeit der Tests um den Faktor 4 verringert:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Siehe Commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) aus dem Projekt [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), der Sharding in dessen Test-Pipeline eingeführt hat und dazu beitrug, die gesamte Ausführungszeit von `2:23 min` auf `1:30 min` zu reduzieren – eine Verringerung um __37 %__ 🎉.