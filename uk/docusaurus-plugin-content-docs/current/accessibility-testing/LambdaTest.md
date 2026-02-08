---
id: testmuai
title: Тестування доступності TestMu AI (раніше LambdaTest)
description: Тестування доступності TestMu AI
---

# Тестування доступності TestMu AI

Ви можете легко інтегрувати тести доступності у ваші тестові набори WebdriverIO, використовуючи [Тестування доступності TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Переваги тестування доступності TestMu AI

Тестування доступності TestMu AI допомагає ідентифікувати та виправляти проблеми доступності у ваших веб-додатках. Ось основні переваги:

* Безперешкодна інтеграція з вашою існуючою автоматизацією тестів WebdriverIO.
* Автоматизоване сканування доступності під час виконання тестів.
* Комплексна звітність про відповідність WCAG.
* Детальне відстеження проблем із рекомендаціями щодо усунення.
* Підтримка кількох стандартів WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Інформація про доступність у реальному часі на панелі керування TestMu AI.

## Початок роботи з тестуванням доступності TestMu AI

Виконайте ці кроки для інтеграції ваших тестових наборів WebdriverIO з тестуванням доступності TestMu AI:

1. Встановіть пакет сервісу TestMu AI WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Оновіть ваш конфігураційний файл `wdio.conf.js`.

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

3. Запустіть ваші тести як зазвичай. TestMu AI автоматично скануватиме проблеми доступності під час виконання тестів.

```bash
npx wdio run wdio.conf.js
```

## Опції конфігурації

Об'єкт `accessibilityOptions` підтримує такі параметри:

* **wcagVersion**: Вкажіть версію стандарту WCAG для тестування
  - `wcag20` - WCAG 2.0 Рівень A
  - `wcag21a` - WCAG 2.1 Рівень A
  - `wcag21aa` - WCAG 2.1 Рівень AA (за замовчуванням)
  - `wcag22aa` - WCAG 2.2 Рівень AA

* **bestPractice**: Включити рекомендації найкращих практик (за замовчуванням: `false`)

* **needsReview**: Включити проблеми, які потребують ручної перевірки (за замовчуванням: `true`)

## Перегляд звітів про доступність

Після завершення ваших тестів ви можете переглянути детальні звіти про доступність на [панелі керування TestMu AI](https://automation.lambdatest.com/):

1. Перейдіть до вашого виконання тесту
2. Натисніть на вкладку "Accessibility"
3. Перегляньте виявлені проблеми з рівнями серйозності
4. Отримайте рекомендації щодо усунення кожної проблеми

Для отримання більш детальної інформації відвідайте [документацію з автоматизації доступності TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).