---
id: testmuai
title: Тестирование доступности с TestMu AI (ранее LambdaTest)
description: "Включите тестирование доступности TestMu AI (ранее LambdaTest) в вашем наборе тестов WebdriverIO, настройте параметры сканирования и просматривайте отчеты о доступности."
---

# Тестирование доступности с TestMu AI

Вы можете легко интегрировать тесты доступности в ваши наборы тестов WebdriverIO с помощью [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Преимущества тестирования доступности с TestMu AI

TestMu AI Accessibility Testing помогает выявлять и устранять проблемы доступности в ваших веб-приложениях. Ниже перечислены ключевые преимущества:

* Бесшовная интеграция с вашей существующей автоматизацией тестирования на WebdriverIO.
* Автоматическое сканирование доступности во время выполнения тестов.
* Подробные отчеты о соответствии WCAG.
* Детальное отслеживание проблем с рекомендациями по их устранению.
* Поддержка нескольких стандартов WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Аналитика доступности в реальном времени на панели управления TestMu AI.

## Начало работы с тестированием доступности TestMu AI

Выполните следующие шаги, чтобы интегрировать ваши наборы тестов WebdriverIO с тестированием доступности TestMu AI:

1. Установите пакет сервиса TestMu AI для WebdriverIO.

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
            accessibility: true, // Включить тестирование доступности
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // Версия WCAG (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. Запускайте тесты как обычно. TestMu AI автоматически просканирует проблемы доступности во время выполнения тестов.

```bash
npx wdio run wdio.conf.js
```

## Параметры конфигурации

Объект `accessibilityOptions` поддерживает следующие параметры:

* **wcagVersion**: Укажите версию стандарта WCAG, на соответствие которой выполняется тестирование
  - `wcag20` - WCAG 2.0 уровень A
  - `wcag21a` - WCAG 2.1 уровень A
  - `wcag21aa` - WCAG 2.1 уровень AA (по умолчанию)
  - `wcag22aa` - WCAG 2.2 уровень AA

* **bestPractice**: Включать рекомендации по лучшим практикам (по умолчанию: `false`)

* **needsReview**: Включать проблемы, требующие ручной проверки (по умолчанию: `true`)

## Просмотр отчетов о доступности

После завершения тестов вы можете просмотреть подробные отчеты о доступности на [панели управления TestMu AI](https://automation.lambdatest.com/):

1. Перейдите к нужному запуску тестов
2. Откройте вкладку "Accessibility"
3. Изучите выявленные проблемы с уровнями серьезности
4. Получите рекомендации по устранению каждой проблемы

Для получения более подробной информации посетите [документацию TestMu AI Accessibility Automation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).