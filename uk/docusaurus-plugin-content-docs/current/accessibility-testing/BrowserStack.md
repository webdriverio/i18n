---
id: browserstack
title: Тестування доступності BrowserStack
---

# BrowserStack Accessibility Testing

Ви можете легко інтегрувати тести доступності у ваші тестові набори WebdriverIO за допомогою [функції автоматизованих тестів BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Переваги автоматизованих тестів у BrowserStack Accessibility Testing

Щоб використовувати автоматизовані тести в BrowserStack Accessibility Testing, ваші тести повинні виконуватися на BrowserStack Automate.

Ось переваги автоматизованих тестів:

* Безперешкодно інтегрується у ваш вже існуючий набір автоматизованих тестів.
* Не потрібні зміни коду в тестових випадках.
* Не потребує додаткового обслуговування для тестування доступності.
* Розуміння історичних тенденцій та отримання інформації про тестові випадки.

## Початок роботи з BrowserStack Accessibility Testing

Виконайте ці кроки, щоб інтегрувати ваші тестові набори WebdriverIO з тестуванням доступності BrowserStack:

1. Встановіть npm пакет `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Оновіть конфігураційний файл `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Optional configuration options
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

Ви можете переглянути детальні інструкції [тут](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).