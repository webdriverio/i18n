---
id: githubactions
title: Github Actions
description: "Запускайте тесты WebdriverIO в GitHub Actions, добавив файл рабочего процесса в свой репозиторий."
---

Если ваш репозиторий размещён на Github, вы можете использовать [Github Actions](https://docs.github.com/en/actions) для запуска тестов на инфраструктуре Github:

1. каждый раз при отправке изменений
2. при каждом создании pull request
3. по расписанию
4. при ручном запуске

В корне вашего репозитория создайте директорию `.github/workflows`. Добавьте Yaml-файл, например `.github/workflows/ci.yaml`. В нём вы настроите, как запускать ваши тесты.

Смотрите [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) в качестве эталонной реализации, а также [примеры запусков тестов](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Подробнее о создании файлов рабочих процессов читайте в [документации Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli).