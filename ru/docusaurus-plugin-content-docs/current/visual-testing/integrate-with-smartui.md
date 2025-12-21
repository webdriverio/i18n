---
id: integrate-with-smartui
title: SmartUI
---

LambdaTest [SmartUI](https://www.lambdatest.com/smart-visual-testing) предоставляет визуальное регрессионное тестирование с поддержкой ИИ для ваших тестов WebdriverIO. Он делает снимки экрана, сравнивает их с базовыми и выделяет визуальные различия с помощью интеллектуальных алгоритмов сравнения.

## Настройка

**Создание проекта SmartUI**

[Войдите](https://accounts.lambdatest.com/register) в LambdaTest и перейдите в [SmartUI Projects](https://smartui.lambdatest.com/) для создания нового проекта. Выберите **Web** как платформу и настройте имя проекта, утверждающих и теги.

**Настройка учетных данных**

Получите ваши `LT_USERNAME` и `LT_ACCESS_KEY` из панели управления LambdaTest и установите их как переменные окружения:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Установите SDK SmartUI**

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

Используйте `browser.execute('smartui.takeScreenshot')` для создания снимков экрана:

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

Просмотрите результаты в [панели управления SmartUI](https://smartui.lambdatest.com/).

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
| [Официальная документация](https://www.lambdatest.com/support/docs/smart-ui-cypress/)           | Документация SmartUI                     |
| [Панель управления SmartUI](https://smartui.lambdatest.com/)                                      | Доступ к проектам и сборкам SmartUI     |
| [Расширенные настройки](https://www.lambdatest.com/support/docs/test-settings-options/)         | Настройка чувствительности сравнения    |
| [Опции сборки](https://www.lambdatest.com/support/docs/smart-ui-build-options/)                 | Расширенная конфигурация сборки         |