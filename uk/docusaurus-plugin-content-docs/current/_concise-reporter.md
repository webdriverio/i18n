---
id: concise-reporter
title: Лаконічний Репортер
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Плагін WebdriverIO для формування звітів у лаконічному стилі.

## Встановлення

Найпростіший спосіб — зберегти `@wdio/concise-reporter` як devDependency у вашому `package.json`, за допомогою:

```sh
npm install @wdio/concise-reporter --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Конфігурація

Наступний код показує конфігурацію тестового запускача wdio за замовчуванням. Просто додайте `'concise'` як репортер до масиву.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```