---
id: allure-reporter
title: Allure Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Плагин репортера WebdriverIO для создания [Отчетов Allure](https://allurereport.org/docs/webdriverio/).

![Пример Allure Reporter](/img/allure.png)

## Установка

Самый простой способ - включить `@wdio/allure-reporter` как devDependency в ваш `package.json`.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

Вы можете просто сделать это так:

```sh
npm install @wdio/allure-reporter --save-dev
```

## Конфигурация

Настройте каталог вывода в файле wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir` по умолчанию имеет значение `./allure-results`. После завершения тестового запуска вы обнаружите, что этот каталог заполнен файлами `.xml` для каждой спецификации, а также несколькими файлами `.txt` и `.png` и другими вложениями.
- `disableWebdriverStepsReporting` - опциональный параметр (`false` по умолчанию), чтобы логировать только пользовательские шаги в репортере.
- `issueLinkTemplate` - опциональный параметр для указания шаблона ссылки на проблему. Репортер заменит плейсхолдер `{}` значением, указанным в параметре вызова `addIssue(value)`. Такая же логика применяется при использовании Cucumber и установке тега `issue` на любом уровне, он будет преобразован в ссылку в отчете. Пример значения параметра:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - опциональный параметр для указания шаблона ссылки TMS (Системы управления тестированием). Репортер заменит плейсхолдер `{}` значением, указанным в параметре вызова `addTestId(value)`. Такая же логика применяется при использовании Cucumber и установке тега `testId` на любом уровне, он будет преобразован в ссылку в отчете. Пример значения параметра:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - опциональный параметр (`false` по умолчанию), чтобы не прикреплять скриншоты к репортеру.
- `useCucumberStepReporter` - опциональный параметр (`false` по умолчанию), установите его в true, чтобы изменить иерархию отчета при использовании cucumber. Попробуйте сами и посмотрите, как это выглядит.
- `disableMochaHooks` - опциональный параметр (`false` по умолчанию), установите его в true, чтобы не добавлять в Allure Reporter стек вызовов/скриншоты/результаты хуков `before/after`.
- `addConsoleLogs` - опциональный параметр (`false` по умолчанию), установите в true, чтобы прикреплять логи консоли от шага к репортеру.
- `reportedEnvironmentVars` (**тип:** `Record<string, string>`) - Установите этот параметр для отображения переменных окружения в отчете. Обратите внимание, что установка этого параметра не изменяет фактические переменные окружения.

## Поддерживаемый Allure API
* `addLabel(name, value)` - присвоить пользовательскую метку тесту
* `addFeature(featureName)` – присвоить функции тесту
* `addStory(storyName)` – присвоить пользовательскую историю тесту
* `addSeverity(value)` – присвоить серьезность тесту, принимает одно из значений: blocker, critical, normal, minor, trivial
* `addTag(value)` – присвоить метку тегу тесту
* `addEpic(value)` – присвоить метку эпик тесту
* `addOwner(value)` – присвоить метку владельца тесту
* `addSuite(value)` – присвоить метку набора тесту
* `addSubSuite(value)` – присвоить метку поднабора тесту
* `addParentSuite(value)` – присвоить метку родительского набора тесту
* `addIssue(value)` – присвоить идентификатор проблемы тесту
* `addAllureId(value)` – присвоить метку идентификатора тестовых операций allure тесту
* `addTestId(value)` – присвоить идентификатор теста TMS тесту
* ~~`addEnvironment(name, value)` ~~ – устаревшая функция, которая больше не работает. Используйте вместо этого `reportedEnvironmentVars`
* `addAttachment(name, content, [type])` – сохранить вложение к тесту.
    * `name` (*String*) - имя вложения.
    * `content` – содержимое вложения.
    * `type` (*String*, опционально) – MIME-тип вложения, по умолчанию `text/plain`
* `addArgument(name, value)` - добавить дополнительный аргумент к тесту
* `addDescription(description, [type])` – добавить описание к тесту.
    * `description` (*String*) - описание теста.
    * `type` (*String*, опционально) – тип описания, по умолчанию `text`. Значения ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - добавить шаг к тесту.
    * `title` (*String*) - название шага.
    * `content` (*String*, опционально) - вложение шага
    * `name` (*String*, опционально) - имя вложения шага, по умолчанию `attachment`.
    * `status` (*String*, опционально) - статус шага, по умолчанию `passed`. Должен быть "failed", "passed" или "broken"
* `startStep(title)` - начать шаг
    * `title` (*String*) - название шага.
* `endStep(status)` - завершить шаг
    * `status` (*String*, опционально) - статус шага, по умолчанию `passed`. Должен быть "failed", "passed" или "broken"
* `step(name, body)` - начинает шаг с функцией содержимого внутри. Позволяет создавать шаги с бесконечной иерархией
    * `body` (*Function*) - асинхронная функция тела шага

### Использование
Доступ к Allure Api можно получить с помощью:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Пример Mocha

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

Базовый пример Cucumber:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### Пользовательские шаги

Метод `step` упрощает работу с шагами, поскольку каждый шаг представлен как асинхронная функция с любым содержимым внутри.
Первый аргумент функции - текущий шаг, который имеет большинство методов API allure (такие как `label`, `epic`, `attach` и т. д.):

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### Теги Cucumber

Теги Cucumber с особыми именами (`issue` и `testId`) преобразуются в ссылки (соответствующие шаблоны ссылок должны быть настроены заранее):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

Теги Cucumber со специальными именами (`feature`) сопоставляются с метками Allure:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## Отображение отчета

Результаты могут быть использованы любым из [инструментов отчетности](https://allurereport.org/), предлагаемых Allure. Например:

### Командная строка

Установите [инструмент командной строки Allure](https://www.npmjs.com/package/allure-commandline) и обработайте каталог результатов:

```sh
allure generate [allure_output_dir] && allure open
```

Это сгенерирует отчет (по умолчанию в `./allure-report`) и откроет его в вашем браузере.

### Автоматическая генерация отчета

Вы также можете автоматически генерировать отчет, используя инструмент командной строки Allure программно. Для этого установите пакет в вашем проекте:

```sh
npm i allure-commandline
```

Затем добавьте или расширьте свой хук `onComplete` или создайте [пользовательский сервис](/docs/customservices) для этого:

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

Установите и настройте [плагин Jenkins Allure](https://allurereport.org/docs/integrations-jenkins/)

## Добавление скриншотов

Скриншоты можно прикрепить к отчету, используя функцию `takeScreenshot` из WebDriverIO в хуке `afterTest` для Mocha и Jasmine или хуке `afterStep` для Cucumber.
Сначала установите `disableWebdriverScreenshotsReporting: false` в опциях репортера, затем добавьте в хук afterStep:

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

Как показано в примере выше, при вызове этой функции изображение скриншота будет прикреплено к отчету allure.