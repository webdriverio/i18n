---
id: allure-reporter
title: Репортер Allure
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Плагін репортера WebdriverIO для створення [Allure Test Reports](https://allurereport.org/docs/webdriverio/).

![Allure Reporter Example](/img/allure.png)

## Встановлення

Найпростіший спосіб - включити `@wdio/allure-reporter` як devDependency у вашому `package.json`.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

Ви можете просто зробити це за допомогою:

```sh
npm install @wdio/allure-reporter --save-dev
```

## Конфігурація

Налаштуйте директорію виводу у вашому файлі wdio.conf.js:

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
- `outputDir` за замовчуванням - `./allure-results`. Після завершення тестового запуску ви побачите, що ця директорія заповнена `.xml` файлами для кожної специфікації, а також кількома файлами `.txt` і `.png` та іншими вкладеннями.
- `disableWebdriverStepsReporting` - опціональний параметр (за замовчуванням `false`), щоб логувати лише користувацькі кроки в репортер.
- `issueLinkTemplate` - опціональний параметр для вказівки шаблону посилання на проблему. Репортер замінить плейсхолдер `{}` значенням, вказаним у параметрі виклику `addIssue(value)`. Така ж логіка застосовується при використанні Cucumber і тегу `issue` на будь-якому рівні, він буде перетворений на посилання у звіті. Приклад значення параметра:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - опціональний параметр для вказівки шаблону посилання на TMS (Система управління тестами). Репортер замінить плейсхолдер `{}` значенням, вказаним у параметрі виклику `addTestId(value)`. Така ж логіка застосовується при використанні Cucumber і тегу `testId` на будь-якому рівні, він буде перетворений на посилання у звіті. Приклад значення параметра:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - опціональний параметр (за замовчуванням `false`), щоб не додавати скріншоти до репортера.
- `useCucumberStepReporter` - опціональний параметр (за замовчуванням `false`), встановіть його на true, щоб змінити ієрархію звіту при використанні cucumber. Спробуйте самі і подивіться, як це виглядає.
- `disableMochaHooks` - опціональний параметр (за замовчуванням `false`), встановіть його на true, щоб не отримувати хуки `before/after` stacktrace/screenshot/result в Allure Reporter.
- `addConsoleLogs` - опціональний параметр (за замовчуванням `false`), встановіть на true, щоб додавати консольні логи з кроків до репортера.
- `reportedEnvironmentVars` (**тип:** `Record<string, string>`) - Встановіть цю опцію для відображення змінних середовища у звіті. Зверніть увагу, що встановлення цього параметра не змінює самі змінні середовища.

## Підтримуваний API Allure
* `addLabel(name, value)` - призначити користувацьку мітку для тесту
* `addFeature(featureName)` – призначити фічу для тесту
* `addStory(storyName)` – призначити користувацьку історію для тесту
* `addSeverity(value)` – призначити серйозність для тесту, приймає одне з цих значень: blocker, critical, normal, minor, trivial
* `addTag(value)` – призначити мітку тегу для тесту
* `addEpic(value)` – призначити мітку епіку для тесту
* `addOwner(value)` – призначити мітку власника для тесту
* `addSuite(value)` – призначити мітку набору для тесту
* `addSubSuite(value)` – призначити мітку піднабору для тесту
* `addParentSuite(value)` – призначити мітку батьківського набору для тесту
* `addIssue(value)` – призначити ідентифікатор проблеми для тесту
* `addAllureId(value)` – призначити мітку allure test ops id для тесту
* `addTestId(value)` – призначити TMS test id для тесту
* ~~`addEnvironment(name, value)` ~~ – застаріла функція, яка більше не працює. Використовуйте `reportedEnvironmentVars` замість цього
* `addAttachment(name, content, [type])` – зберегти вкладення до тесту.
    * `name` (*String*) - назва вкладення.
    * `content` – зміст вкладення.
    * `type` (*String*, опціонально) – MIME-тип вкладення, за замовчуванням `text/plain`
* `addArgument(name, value)` - додати додатковий аргумент до тесту
* `addDescription(description, [type])` – додати опис до тесту.
    * `description` (*String*) - опис тесту.
    * `type` (*String*, опціонально) – тип опису, за замовчуванням `text`. Значення ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - додати крок до тесту.
    * `title` (*String*) - назва кроку.
    * `content` (*String*, опціонально) - вкладення кроку
    * `name` (*String*, опціонально) - назва вкладення кроку, за замовчуванням `attachment`.
    * `status` (*String*, опціонально) - статус кроку, за замовчуванням `passed`. Має бути "failed", "passed" або "broken"
* `startStep(title)` - почати крок
    * `title` (*String*) - назва кроку.
* `endStep(status)` - завершити крок
    * `status` (*String*, опціонально) - статус кроку, за замовчуванням `passed`. Має бути "failed", "passed" або "broken"
* `step(name, body)` - починає крок з функцією вмісту всередині. Дозволяє створювати кроки з нескінченною ієрархією
    * `body` (*Function*) - асинхронна функція тіла кроку

### Використання
Доступ до Allure Api можна отримати за допомогою:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Приклад Mocha

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

Базовий приклад Cucumber:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### Користувацькі кроки

Метод `step` спрощує роботу з кроками, оскільки кожен крок представлений як асинхронна функція з будь-яким вмістом всередині.
Перший аргумент функції - поточний крок, що має більшість методів API allure (таких як `label`, `epic`, `attach` тощо):

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### Теги Cucumber

Теги Cucumber з спеціальними назвами (`issue` та `testId`) перетворюються на посилання (відповідні шаблони посилань повинні бути налаштовані заздалегідь):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

Теги Cucumber з спеціальними назвами (`feature`) відображаються на мітки Allure:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## Відображення звіту

Результати можуть бути використані будь-яким з [інструментів звітності](https://allurereport.org/), що пропонуються Allure. Наприклад:

### Командний рядок

Встановіть [інструмент командного рядка Allure](https://www.npmjs.com/package/allure-commandline) і обробіть директорію результатів:

```sh
allure generate [allure_output_dir] && allure open
```

Це згенерує звіт (за замовчуванням у `./allure-report`) і відкриє його у вашому браузері.

### Автоматичне генерування звіту

Ви також можете автоматично генерувати звіт, використовуючи інструмент командного рядка Allure програмно. Для цього встановіть пакет у вашому проекті за допомогою:

```sh
npm i allure-commandline
```

Потім додайте або розширте ваш хук `onComplete` або створіть [власний сервіс](/docs/customservices) для цього:

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

Встановіть та налаштуйте [плагін Allure для Jenkins](https://allurereport.org/docs/integrations-jenkins/)

## Додавання скріншотів

Скріншоти можна додати до звіту, використовуючи функцію `takeScreenshot` з WebDriverIO в хуку `afterTest` для Mocha та Jasmine або хуку `afterStep` для Cucumber.
Спочатку встановіть `disableWebdriverScreenshotsReporting: false` в опціях репортера, потім додайте в хук afterStep:

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

Як показано в прикладі вище, коли ця функція викликається, зображення скріншоту буде додано до звіту allure.