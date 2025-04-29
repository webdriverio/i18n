---
id: shared-store-service
title: Сервіс спільного сховища
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Обмін даними між головним процесом та робочими процесами (специфікаціями).

## Встановлення

Найпростіший спосіб - зберегти `@wdio/shared-store-service` як dev-залежність у вашому `package.json`, через:

```sh
npm install @wdio/shared-store-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted)

## Використання

Отримуйте/встановлюйте значення (простий об'єкт) до/зі сховища за ключем (рядком). Ключ може бути будь-яким довільним рядком, окрім `*`, який зарезервований, оскільки дозволяє отримати все сховище.

### Встановлення значень

Щоб встановити значення у сховище, викличте:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Отримання значень

Щоб отримати значення зі сховища, викличте:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // повертає "foobar123"
```

Ви також можете отримати всі значення ключів, використовуючи ключ `*`:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // повертає `{ key: "foobar" }`
```

### Доступ до сховища в WDIO хуках

Ви також можете безпосередньо отримати доступ до асинхронних обробників `setValue` та `getValue`.
Переконайтеся, що правильно викликаєте їх з ключовим словом `await`.

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

ВАЖЛИВО! Кожен файл специфікації повинен бути атомарним та ізольованим від інших специфікацій.
Ідея сервісу полягає в роботі з дуже специфічними проблемами налаштування середовища.
Будь ласка, уникайте спільного використання даних тестового виконання!

### Пули ресурсів

Якщо робочі потоки конкурують за ресурси, які мають бути призначені для кожного робочого процесу, ви можете використовувати API пулу ресурсів:

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // worker returns the used resource for next workers to use
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

Цей приклад забезпечує, що обидва робочі процеси ніколи не використовують один і той же `baseUrl`. Унікальний URL-адрес призначається лише одному робочому процесу, доки він не буде звільнений.

## Конфігурація

Додайте `shared-store` до списку сервісів, і об'єкт `sharedStore` буде доступний вам у [області видимості `browser`](https://webdriver.io/docs/api/browser) у вашому тесті.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Якщо ви використовуєте typescript, переконайтеся, що додали `@wdio/shared-store-service` до своїх `compilerOptions.types`:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```