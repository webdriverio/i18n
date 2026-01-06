---
id: lambdatest
title: Тестування доступності LambdaTest
---

# Тестування доступності LambdaTest

Ви можете легко інтегрувати тести доступності у ваші тестові набори WebdriverIO, використовуючи [Тестування доступності LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## Переваги тестування доступності LambdaTest

Тестування доступності LambdaTest допомагає виявляти та виправляти проблеми доступності у веб-додатках. Ось основні переваги:

* Безперешкодна інтеграція з існуючою автоматизацією тестів WebdriverIO.
* Автоматичне сканування доступності під час виконання тестів.
* Комплексне звітування про відповідність WCAG.
* Детальне відстеження проблем з рекомендаціями щодо виправлення.
* Підтримка кількох стандартів WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Миттєвий аналіз доступності у панелі керування LambdaTest.

## Початок роботи з тестуванням доступності LambdaTest

Дотримуйтесь цих кроків, щоб інтегрувати ваші тестові набори WebdriverIO з тестуванням доступності LambdaTest:

1. Встановіть пакет сервісу LambdaTest WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Оновіть ваш файл конфігурації `wdio.conf.js`.

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

3. Запустіть тести як зазвичай. LambdaTest автоматично скануватиме на наявність проблем доступності під час виконання тесту.

```bash
npx wdio run wdio.conf.js
```

## Параметри конфігурації

Об'єкт `accessibilityOptions` підтримує такі параметри:

* **wcagVersion**: Вкажіть версію стандарту WCAG для тестування
  - `wcag20` - WCAG 2.0 Рівень A
  - `wcag21a` - WCAG 2.1 Рівень A
  - `wcag21aa` - WCAG 2.1 Рівень AA (за замовчуванням)
  - `wcag22aa` - WCAG 2.2 Рівень AA

* **bestPractice**: Включити рекомендації найкращих практик (за замовчуванням: `false`)

* **needsReview**: Включити проблеми, які потребують ручної перевірки (за замовчуванням: `true`)

## Перегляд звітів доступності

Після завершення тестів ви можете переглянути детальні звіти про доступність у [Панелі керування LambdaTest](https://automation.lambdatest.com/):

1. Перейдіть до виконання вашого тесту
2. Натисніть на вкладку "Accessibility"
3. Перегляньте виявлені проблеми з рівнями серйозності
4. Отримайте рекомендації щодо виправлення кожної проблеми

Для отримання більш детальної інформації відвідайте [документацію з автоматизації тестування доступності LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).