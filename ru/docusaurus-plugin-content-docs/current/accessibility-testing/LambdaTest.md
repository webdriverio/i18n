---
id: testmuai
title: Тестирование доступности TestMu AI (Ранее LambdaTest)
---

# TestMu AI Accessibility Testing

Вы можете легко интегрировать тесты доступности в ваши тестовые наборы WebdriverIO, используя [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Преимущества тестирования доступности TestMu AI

Тестирование доступности TestMu AI помогает идентифицировать и исправлять проблемы доступности в ваших веб-приложениях. Вот основные преимущества:

* Плавно интегрируется с существующей автоматизацией тестирования WebdriverIO.
* Автоматическое сканирование доступности во время выполнения тестов.
* Комплексная отчетность о соответствии WCAG.
* Подробное отслеживание проблем с рекомендациями по их устранению.
* Поддержка нескольких стандартов WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Анализ доступности в реальном времени на панели управления TestMu AI.

## Начало работы с тестированием доступности TestMu AI

Следуйте этим шагам для интеграции ваших тестовых наборов WebdriverIO с тестированием доступности TestMu AI:

1. Установите пакет сервиса TestMu AI для WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Обновите файл конфигурации `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',

    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],

    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. Запустите тесты как обычно. TestMu AI автоматически просканирует проблемы доступности во время выполнения тестов.

```bash
npx wdio run wdio.conf.js
```

## Параметры конфигурации

Объект `accessibilityOptions` поддерживает следующие параметры:

* **wcagVersion**: Укажите версию стандарта WCAG, по которой проводить тестирование
  - `wcag20` - WCAG 2.0 Уровень A
  - `wcag21a` - WCAG 2.1 Уровень A
  - `wcag21aa` - WCAG 2.1 Уровень AA (по умолчанию)
  - `wcag22aa` - WCAG 2.2 Уровень AA

* **bestPractice**: Включить рекомендации по лучшим практикам (по умолчанию: `false`)

* **needsReview**: Включить проблемы, требующие ручной проверки (по умолчанию: `true`)

## Просмотр отчетов о доступности

После завершения тестов вы можете просмотреть подробные отчеты о доступности в [панели управления TestMu AI](https://automation.lambdatest.com/):

1. Перейдите к вашему выполненному тесту
2. Нажмите на вкладку "Accessibility"
3. Просмотрите выявленные проблемы с уровнями серьезности
4. Получите рекомендации по устранению каждой проблемы

Для получения более подробной информации посетите [документацию по автоматизации доступности TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).
