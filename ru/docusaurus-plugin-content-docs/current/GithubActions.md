---
id: githubactions
title: Github Actions
---

Если ваш репозиторий размещен на Github, вы можете использовать [Github Actions](https://docs.github.com/en/actions) для запуска тестов на инфраструктуре Github.

1. каждый раз при отправке изменений
2. при создании каждого pull request
3. по расписанию
4. по ручному триггеру

В корне вашего репозитория создайте директорию `.github/workflows`. Добавьте Yaml файл, например, `.github/workflows/ci.yaml`. В нём вы настроите запуск ваших тестов.

См. [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) для примера реализации и [примеры запусков тестов](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Узнайте больше в [документации Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) о создании файлов рабочих процессов.