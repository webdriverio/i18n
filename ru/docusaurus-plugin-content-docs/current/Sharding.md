---
id: sharding
title: Шардирование
description: "Разделите набор тестов между несколькими машинами с помощью опции --shard, чтобы ускорить выполнение тестов, например в GitHub Actions."
---

По умолчанию WebdriverIO запускает тесты параллельно и стремится к оптимальному использованию ядер процессора на вашей машине. Чтобы достичь ещё большего уровня параллелизма, вы можете дополнительно масштабировать выполнение тестов WebdriverIO, запуская тесты одновременно на нескольких машинах. Мы называем этот режим работы «шардированием» (sharding).

## Шардирование тестов между несколькими машинами

Чтобы разделить набор тестов на шарды, передайте `--shard=x/y` в командной строке. Например, чтобы разделить набор на четыре шарда, каждый из которых выполняет четверть тестов:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Теперь, если запустить эти шарды параллельно на разных компьютерах, ваш набор тестов будет выполнен в четыре раза быстрее.

## Пример для GitHub Actions

GitHub Actions поддерживает [шардирование тестов между несколькими заданиями](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) с помощью опции [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). Опция matrix запускает отдельное задание для каждой возможной комбинации указанных параметров.

В следующем примере показано, как настроить задание для параллельного запуска тестов на четырёх машинах. Полную настройку пайплайна можно найти в проекте [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Сначала мы добавляем опцию matrix в конфигурацию задания с параметром shard, содержащим количество шардов, которое мы хотим создать. `shard: [1, 2, 3, 4]` создаст четыре шарда, каждый со своим номером.
-   Затем мы запускаем тесты WebdriverIO с опцией `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Это будет тестовая команда для каждого шарда.
-   Наконец, мы загружаем отчёт с логами wdio в артефакты GitHub Actions. Благодаря этому логи будут доступны в случае сбоя шарда.

Тестовый пайплайн определяется следующим образом:

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

Это запустит все шарды параллельно, сократив время выполнения тестов в 4 раза:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Посмотрите коммит [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) из проекта [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), который добавил шардирование в тестовый пайплайн и помог сократить общее время выполнения с `2:23 min` до `1:30 min`, то есть на __37%__ 🎉.