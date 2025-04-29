---
id: wdio-cucumber-viewport-logger-service
title: Сервис логирования области просмотра Cucumber
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumber-viewport-logger-service - это сторонний пакет, для получения дополнительной информации смотрите [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Сервис логирования области просмотра Cucumber для WebdriverIO

Этот сервис добавляет возможность записи шагов Cucumber и другой отладочной информации непосредственно в окно браузера в
вашем решении на основе WebdriverIO. Особенно полезным это может быть в случаях использования устройств или виртуальных машин без прямого
*физического* доступа к ним и возможности настроить интерактивную сессию для глубокой отладки ваших e2e тестов.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Быстрый старт

Установите пакет:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

Добавьте сервис в раздел конфигурации `services`, например:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Параметры сервиса

| Параметр  | Описание | Тип |Значение по умолчанию |
| --- | --- | --- | --- |
| `numberOfSteps`  | количество шагов, которые будут отображаться в области просмотра  | number |3 |
| `enabled`  | включить/отключить сервис | boolean |true |
| `styles`  | CSS стили для обертки логгера, *ключевых слов шага* и *текста шага*, смотрите пример ниже  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // сервис будет включен только когда вы установите переменную окружения `VP_LOGGER` в значение `1`
            // установите пользовательские CSS стили для отдельных элементов
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - отображает пользовательское сообщение с пользовательским CSS стилем (не обязательно), вы можете использовать это в определениях ваших шагов
например:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - удалить секцию сообщений области просмотра, может быть полезно, например, для визуальной проверки

### pointerEvents: 'none'

По умолчанию все события мыши (клики, наведение и т.д.) проходят через секцию сообщений, например: вместо клика по секции сообщений ваш клик "проходит" к элементу, находящемуся рядом с сообщением (элементу вашего приложения), если вы хотите изменить это поведение, установите опцию стиля обертки 'pointerEvents' в значение 'auto', например:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```