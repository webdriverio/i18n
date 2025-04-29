---
id: dot-reporter
title: Dot Reporter (Точечный репортер)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Плагин WebdriverIO для создания отчетов в точечном стиле.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Установка

Самый простой способ - сохранить `@wdio/dot-reporter` как devDependency в вашем `package.json`:

```sh
npm install @wdio/dot-reporter --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь](/docs/gettingstarted).

## Конфигурация

Следующий код показывает стандартную конфигурацию тестового раннера wdio. Просто добавьте `'dot'` как репортер в массив.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).