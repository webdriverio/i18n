---
id: lambdatest
title: Тестирование доступности LambdaTest
---

# Тестирование доступности LambdaTest

Вы можете легко интегрировать тесты доступности в ваши тестовые наборы WebdriverIO, используя [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## Преимущества тестирования доступности LambdaTest

Тестирование доступности LambdaTest помогает выявлять и исправлять проблемы доступности в ваших веб-приложениях. Вот ключевые преимущества:

* Легко интегрируется с существующей автоматизацией тестирования WebdriverIO.
* Автоматическое сканирование доступности во время выполнения тестов.
* Комплексная отчётность по соответствию WCAG.
* Подробное отслеживание проблем с рекомендациями по исправлению.
* Поддержка различных стандартов WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Аналитика доступности в реальном времени в панели управления LambdaTest.

## Начало работы с тестированием доступности LambdaTest

Следуйте этим шагам для интеграции ваших тестовых наборов WebdriverIO с тестированием доступности LambdaTest:

1. Установите пакет сервиса LambdaTest WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Обновите ваш конфигурационный файл `wdio.conf.js`.

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

3. Запустите ваши тесты как обычно. LambdaTest автоматически просканирует проблемы доступности во время выполнения теста.

```bash
npx wdio run wdio.conf.js
```

## Параметры конфигурации

Объект `accessibilityOptions` поддерживает следующие параметры:

* **wcagVersion**: Укажите версию стандарта WCAG для тестирования
  - `wcag20` - WCAG 2.0 уровень A
  - `wcag21a` - WCAG 2.1 уровень A
  - `wcag21aa` - WCAG 2.1 уровень AA (по умолчанию)
  - `wcag22aa` - WCAG 2.2 уровень AA

* **bestPractice**: Включить рекомендации по лучшим практикам (по умолчанию: `false`)

* **needsReview**: Включить проблемы, требующие ручной проверки (по умолчанию: `true`)

## Просмотр отчётов о доступности

После завершения тестов вы можете просмотреть подробные отчёты о доступности в [LambdaTest Dashboard](https://automation.lambdatest.com/):

1. Перейдите к выполнению вашего теста
2. Нажмите на вкладку "Accessibility"
3. Просмотрите выявленные проблемы с уровнями серьёзности
4. Получите рекомендации по исправлению каждой проблемы

Для получения более подробной информации посетите [документацию по автоматизации доступности LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).