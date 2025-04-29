---
id: sumologic-reporter
title: Sumologic Репортер
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Репортер WebdriverIO, який надсилає результати тестів до [Sumologic](https://www.sumologic.com/) для аналізу даних

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## Встановлення

Найпростіший спосіб - зберегти `@wdio/sumologic-reporter` як devDependency у вашому `package.json`, через:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Конфігурація

Спочатку ми повинні створити новий колектор, який збиратиме всі логи ваших тестів. Для цього натисніть на __Manage__ в навігаційній панелі та перейдіть до __Collection__. Там вам потрібно додати новий "Hosted Collector". Застосуйте відповідну назву, наприклад, "test integration logs", опис та категорію, наприклад, "wdio". Натисніть на Save, щоб створити колектор.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

Наступним кроком є додавання джерела. Має сенс мати власне джерело для кожного з ваших середовищ (наприклад, збірка гілки, інтеграція). Натисніть на посилання "Add Source" поруч із вашим колектором та додайте __HTTP Source__. Знову застосуйте підходящу назву та опис та встановіть "Source Category", яка відображає середовище. Залиште інші опції в стані за замовчуванням та натисніть на save.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

З'явиться модальне вікно з кінцевою точкою джерела. Скопіюйте цю URL-адресу та вставте її у свій wdio.conf.js, щоб репортер знав, куди надсилати дані.

Наступний код показує конфігурацію тест-раннера wdio за замовчуванням. Просто додайте `'sumologic'` як репортер до масиву та додайте кінцеву точку вашого джерела:

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

Після запуску перших тестів з репортером ви повинні мати можливість перевірити журнали тестів за допомогою наступного запиту:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Незабаром я надам деякі корисні шаблони дашбордів для Sumologic.

----

Для отримання додаткової інформації про WebdriverIO перегляньте [домашню сторінку](https://webdriver.io).