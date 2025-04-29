---
id: concise-reporter
title: Краткий репортер
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Плагин WebdriverIO для создания отчетов в кратком стиле.

## Установка

Самый простой способ - сохранить `@wdio/concise-reporter` как devDependency в вашем `package.json`, с помощью:

```sh
npm install @wdio/concise-reporter --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь](https://webdriver.io/docs/gettingstarted).

## Конфигурация

Следующий код показывает стандартную конфигурацию тест-раннера wdio. Просто добавьте `'concise'` как репортер
в массив.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```