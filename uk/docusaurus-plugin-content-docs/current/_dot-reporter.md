---
id: dot-reporter
title: Точковий Репортер
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Плагін WebdriverIO для звітування у вигляді точок.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Встановлення

Найпростіший спосіб - це зберегти `@wdio/dot-reporter` як devDependency у вашому `package.json`, через:

```sh
npm install @wdio/dot-reporter --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](/docs/gettingstarted).

## Конфігурація

Наступний код показує стандартну конфігурацію тест-раннера wdio. Просто додайте `'dot'` як репортер до масиву.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

Для отримання додаткової інформації про WebdriverIO відвідайте [домашню сторінку](https://webdriver.io).