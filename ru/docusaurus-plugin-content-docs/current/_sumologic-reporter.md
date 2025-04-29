---
id: sumologic-reporter
title: Sumologic Репортер
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Репортер WebdriverIO, который отправляет результаты тестов в [Sumologic](https://www.sumologic.com/) для анализа данных

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## Установка

Самый простой способ - это сохранить `@wdio/sumologic-reporter` как devDependency в вашем `package.json`, с помощью:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь](https://webdriver.io/docs/gettingstarted).

## Конфигурация

Сначала нам нужно создать новый коллектор, который собирает все логи ваших тестов. Для этого нажмите на __Manage__ в навигационной панели и перейдите в __Collection__. Там вам нужно добавить новый "Hosted Collector". Укажите подходящее имя, например, "test integration logs", описание и категорию, например, "wdio". Нажмите Сохранить, чтобы создать коллектор.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

Следующий шаг - добавить источник. Имеет смысл иметь собственный источник для каждой из ваших сред (например, сборка ветки, интеграция). Нажмите на ссылку "Add Source" рядом с вашим коллектором и добавьте __HTTP Source__. Снова укажите подходящее имя и описание, а также установите "Source Category", которая отражает среду. Оставьте другие параметры в состоянии по умолчанию и нажмите Сохранить.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

Появится модальное окно с конечной точкой источника. Скопируйте этот URL и вставьте его в свой wdio.conf.js, чтобы репортер знал, куда отправлять данные.

Следующий код показывает конфигурацию тест-раннера wdio по умолчанию. Просто добавьте `'sumologic'` в качестве репортера в массив и добавьте вашу конечную точку источника:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

После запуска первых тестов с репортером вы должны быть в состоянии проверить логи тестов с помощью следующего запроса:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Скоро я предоставлю несколько полезных шаблонов панелей для Sumologic.

----

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).