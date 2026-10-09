---
id: integrate-with-smartui
title: SmartUI
description: "Добавьте визуальное регрессионное тестирование на базе ИИ в тесты WebdriverIO с помощью SmartUI от TestMu AI (ранее LambdaTest), включая настройку и параметры."
---

TestMu AI (ранее LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) обеспечивает визуальное регрессионное тестирование на базе ИИ для ваших тестов WebdriverIO. Он делает скриншоты, сравнивает их с эталонными и выделяет визуальные различия с помощью интеллектуальных алгоритмов сравнения.

## Настройка

**Создайте проект SmartUI**

[Войдите](https://accounts.lambdatest.com/register) в TestMu AI (ранее LambdaTest) и перейдите в [SmartUI Projects](https://smartui.lambdatest.com/), чтобы создать новый проект. Выберите **Web** в качестве платформы и настройте имя проекта, утверждающих и теги.

**Настройте учётные данные**

Получите `LT_USERNAME` и `LT_ACCESS_KEY` в панели управления TestMu AI (ранее LambdaTest) и задайте их как переменные окружения:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Установите SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**Настройте WebdriverIO**

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

**Запустите тесты**

```sh
npx wdio wdio.conf.js
```

Просматривайте результаты в [SmartUI Dashboard](https://smartui.lambdatest.com/).

## Расширенные параметры

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

**Выбор определённых областей**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Ресурсы

| Ресурс                                                                                            | Описание                                 |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [Официальная документация](https://www.testmuai.com/support/docs/smart-ui-cypress/)            | Документация SmartUI                     |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Доступ к вашим проектам и сборкам SmartUI |
| [Расширенные настройки](https://www.testmuai.com/support/docs/test-settings-options/)          | Настройка чувствительности сравнения     |
| [Параметры сборки](https://www.testmuai.com/support/docs/smart-ui-build-options/)              | Расширенная конфигурация сборки          |