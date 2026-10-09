---
id: browserstack
title: Тестирование доступности с BrowserStack
description: "Добавьте автоматическое сканирование доступности в тесты WebdriverIO, выполняемые в BrowserStack Automate, и просматривайте обнаруженные проблемы в отчётах BrowserStack."
---

# Тестирование доступности с BrowserStack

Вы можете легко интегрировать тесты доступности в свои наборы тестов WebdriverIO, используя [функцию автоматических тестов BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Преимущества автоматических тестов в BrowserStack Accessibility Testing

Чтобы использовать автоматические тесты в BrowserStack Accessibility Testing, ваши тесты должны выполняться в BrowserStack Automate.

Ниже перечислены преимущества автоматических тестов:

* Бесшовная интеграция в ваш существующий набор автоматизированных тестов.
* Не требуется вносить изменения в код тестовых сценариев.
* Не требуется никакого дополнительного обслуживания для тестирования доступности.
* Возможность отслеживать исторические тенденции и получать аналитику по тестовым сценариям.

## Начало работы с BrowserStack Accessibility Testing

Выполните следующие шаги, чтобы интегрировать ваши наборы тестов WebdriverIO с BrowserStack Accessibility Testing:

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
        // Необязательные параметры конфигурации
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