---
id: sharding
title: Sharding
description: "Podziel swój zestaw testów na wiele maszyn za pomocą opcji --shard, aby uruchamiać testy szybciej, na przykład w GitHub Actions."
---

Domyślnie WebdriverIO uruchamia testy równolegle i dąży do optymalnego wykorzystania rdzeni procesora na Twojej maszynie. Aby osiągnąć jeszcze większy stopień równoległości, możesz dodatkowo skalować wykonywanie testów WebdriverIO, uruchamiając testy jednocześnie na wielu maszynach. Ten tryb działania nazywamy „shardingiem”.

## Sharding testów między wieloma maszynami

Aby podzielić zestaw testów, przekaż `--shard=x/y` w wierszu poleceń. Na przykład, aby podzielić zestaw na cztery shardy, z których każdy uruchamia jedną czwartą testów:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Jeśli teraz uruchomisz te shardy równolegle na różnych komputerach, Twój zestaw testów zakończy się cztery razy szybciej.

## Przykład z GitHub Actions

GitHub Actions obsługuje [sharding testów między wieloma zadaniami](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) za pomocą opcji [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). Opcja matrix uruchomi osobne zadanie dla każdej możliwej kombinacji podanych opcji.

Poniższy przykład pokazuje, jak skonfigurować zadanie, aby uruchamiać testy równolegle na czterech maszynach. Pełną konfigurację potoku znajdziesz w projekcie [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Najpierw dodajemy opcję matrix do konfiguracji naszego zadania z opcją shard zawierającą liczbę shardów, które chcemy utworzyć. `shard: [1, 2, 3, 4]` utworzy cztery shardy, każdy z innym numerem.
-   Następnie uruchamiamy nasze testy WebdriverIO z opcją `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Będzie to nasze polecenie testowe dla każdego sharda.
-   Na koniec przesyłamy raport z logami wdio do GitHub Actions Artifacts. Dzięki temu logi będą dostępne w przypadku niepowodzenia sharda.

Potok testowy jest zdefiniowany w następujący sposób:

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

Spowoduje to równoległe uruchomienie wszystkich shardów, skracając czas wykonywania testów czterokrotnie:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Zobacz commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) z projektu [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), który wprowadził sharding do potoku testowego, co pomogło skrócić całkowity czas wykonywania z `2:23 min` do `1:30 min`, czyli o __37%__ 🎉.