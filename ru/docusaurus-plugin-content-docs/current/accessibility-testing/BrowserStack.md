---
id: browserstack
title: Тестирование доступности BrowserStack
---

# BrowserStack Accessibility Testing

Вы можете легко интегрировать тесты доступности в ваши тестовые наборы WebdriverIO, используя [функцию автоматизированных тестов BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Преимущества автоматизированных тестов в BrowserStack Accessibility Testing

Чтобы использовать автоматизированные тесты в BrowserStack Accessibility Testing, ваши тесты должны выполняться на BrowserStack Automate.

Вот преимущества автоматизированных тестов:

* Легко интегрируется в существующий набор автоматизированных тестов.
* Не требуется изменение кода в тестовых примерах.
* Требует нулевого дополнительного обслуживания для тестирования доступности.
* Позволяет понять исторические тенденции и получить аналитику по тестовым примерам.

## Начало работы с BrowserStack Accessibility Testing

Следуйте этим шагам для интеграции ваших тестовых наборов WebdriverIO с тестированием доступности BrowserStack:

1. Установите npm-пакет `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Обновите конфигурационный файл `wdio.conf.js`.

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

Подробные инструкции можно найти [здесь](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).