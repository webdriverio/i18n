---
id: githubactions
title: Github Actions
---

Якщо ваш репозиторій розміщено на Github, ви можете використовувати [Github Actions](https://docs.github.com/en/actions) для запуску тестів на інфраструктурі Github.

1. щоразу, коли ви надсилаєте зміни
2. при кожному створенні запиту на злиття (pull request)
3. за заданим розкладом
4. за допомогою ручного запуску

У корені вашого репозиторію створіть директорію `.github/workflows`. Додайте файл Yaml, наприклад `.github/workflows/ci.yaml`. У ньому ви налаштуєте, як запускати ваші тести.

Дивіться [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) для ознайомлення з прикладом реалізації та [зразками запусків тестів](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Дізнайтеся більше у [документації Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) про створення файлів робочого процесу.