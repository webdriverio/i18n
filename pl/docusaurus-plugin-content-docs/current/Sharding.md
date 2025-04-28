---
id: sharding
title: Sharding
---

Domyślnie, WebdriverIO uruchamia testy równolegle i dąży do optymalnego wykorzystania rdzeni procesora na Twoim komputerze. Aby osiągnąć jeszcze większe zrównoleglenie, możesz dodatkowo skalować wykonywanie testów WebdriverIO poprzez uruchamianie testów na wielu maszynach jednocześnie. Ten tryb działania nazywamy "shardingiem".

## Dzielenie testów między wieloma maszynami

Aby podzielić zestaw testów, przekaż `--shard=x/y` do wiersza poleceń. Na przykład, aby podzielić zestaw na cztery części, każda uruchamiająca jedną czwartą testów:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Teraz, jeśli uruchomisz te części równolegle na różnych komputerach, twój zestaw testów zakończy się cztery razy szybciej.

## Przykład GitHub Actions

GitHub Actions obsługuje [dzielenie testów między wieloma zadaniami](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) za pomocą opcji [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). Opcja matrix uruchomi osobne zadanie dla każdej możliwej kombinacji dostarczonych opcji.

Poniższy przykład pokazuje, jak skonfigurować zadanie do uruchamiania testów na czterech maszynach równolegle. Pełną konfigurację pipeline'u można znaleźć w projekcie [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Najpierw dodajemy opcję matrix do konfiguracji naszego zadania z opcją shard zawierającą liczbę fragmentów, które chcemy utworzyć. `shard: [1, 2, 3, 4]` utworzy cztery fragmenty, każdy z innym numerem fragmentu.
-   Następnie uruchamiamy nasze testy WebdriverIO z opcją `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. To będzie nasze polecenie testowe dla każdego fragmentu.
-   Na koniec przesyłamy nasz raport dziennika wdio do GitHub Actions Artifacts. Dzięki temu logi będą dostępne w przypadku niepowodzenia fragmentu.

Pipeline testowy jest zdefiniowany następująco:

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

Spowoduje to równoległe uruchomienie wszystkich fragmentów, skracając czas wykonania testów 4-krotnie:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Zobacz commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) z projektu [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), który wprowadził sharding do swojego pipeline'u testowego, co pomogło zmniejszyć ogólny czas wykonania z `2:23 min` do `1:30 min`, redukcja o __37%__ 🎉.