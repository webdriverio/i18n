---
id: integrate-with-smartui
title: SmartUI
---

TestMu AI (ранее LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) предоставляет визуальное регрессионное тестирование с искусственным интеллектом для ваших тестов WebdriverIO. Он делает снимки экрана, сравнивает их с базовыми изображениями и выделяет визуальные различия с помощью интеллектуальных алгоритмов сравнения.

## Настройка

**Создание проекта SmartUI**

[Зарегистрируйтесь](https://accounts.lambdatest.com/register) в TestMu AI (ранее LambdaTest) и перейдите в [Проекты SmartUI](https://smartui.lambdatest.com/) для создания нового проекта. Выберите **Web** в качестве платформы и настройте имя проекта, утверждающих и теги.

**Настройка учетных данных**

Получите ваши `LT_USERNAME` и `LT_ACCESS_KEY` из панели управления TestMu AI (ранее LambdaTest) и установите их как переменные окружения:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Установка SDK SmartUI**

```sh
npm install @lambdatest/wdio-driver
```

**Настройка WebdriverIO**

Обновите ваш `wdio.conf.js`:

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

## Использование

Используйте `browser.execute('smartui.takeScreenshot')` для создания скриншотов:

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

**Запуск тестов**

```sh
npx wdio wdio.conf.js
```

Просмотр результатов в [Панели управления SmartUI](https://smartui.lambdatest.com/).

## Расширенные опции

**Игнорирование элементов**

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

**Выбор определенных областей**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Ресурсы

| Ресурс                                                                                          | Описание                                  |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [Официальная документация](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | Документация SmartUI                      |
| [Панель управления SmartUI](https://smartui.lambdatest.com/)                                      | Доступ к вашим проектам и сборкам SmartUI |
| [Расширенные настройки](https://www.testmuai.com/support/docs/test-settings-options/)           | Настройка чувствительности сравнения      |
| [Опции сборки](https://www.testmuai.com/support/docs/smart-ui-build-options/)                   | Расширенная настройка сборки              |