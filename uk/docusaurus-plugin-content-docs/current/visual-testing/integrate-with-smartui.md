---
id: integrate-with-smartui
title: SmartUI
---

TestMu AI (Раніше LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) надає візуальне регресійне тестування на основі AI для ваших тестів WebdriverIO. Воно робить знімки екрану, порівнює їх з базовими та виділяє візуальні відмінності за допомогою інтелектуальних алгоритмів порівняння.

## Налаштування

**Створення проекту SmartUI**

[Увійдіть](https://accounts.lambdatest.com/register) до TestMu AI (Раніше LambdaTest) та перейдіть до [Проектів SmartUI](https://smartui.lambdatest.com/) для створення нового проекту. Виберіть **Web** як платформу та налаштуйте назву проекту, затверджуючих та теги.

**Налаштування облікових даних**

Отримайте свої `LT_USERNAME` та `LT_ACCESS_KEY` з панелі керування TestMu AI (Раніше LambdaTest) і встановіть їх як змінні середовища:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Встановлення SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**Налаштування WebdriverIO**

Оновіть свій `wdio.conf.js`:

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## Використання

Використовуйте `browser.execute('smartui.takeScreenshot')` для створення знімків екрану:

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**Запуск тестів**

```sh
npx wdio wdio.conf.js
```

Перегляд результатів у [Панелі керування SmartUI](https://smartui.lambdatest.com/).

## Розширені опції

**Ігнорування елементів**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**Вибір конкретних областей**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Ресурси

| Ресурс                                                                                        | Опис                                      |
|-----------------------------------------------------------------------------------------------|-------------------------------------------|
| [Офіційна документація](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | Документація SmartUI                      |
| [Панель керування SmartUI](https://smartui.lambdatest.com/)                                   | Доступ до ваших проектів і збірок SmartUI |
| [Розширені налаштування](https://www.testmuai.com/support/docs/test-settings-options/)        | Налаштування чутливості порівняння        |
| [Параметри збірки](https://www.testmuai.com/support/docs/smart-ui-build-options/)             | Розширена конфігурація збірки             |