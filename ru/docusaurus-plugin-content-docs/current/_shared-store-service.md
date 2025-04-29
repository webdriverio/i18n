---
id: shared-store-service
title: Сервис общего хранилища
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Обмен данными между основным процессом и рабочими процессами (спецификации).

## Установка

Самый простой способ - сохранить `@wdio/shared-store-service` как dev-зависимость в вашем `package.json`, через:

```sh
npm install @wdio/shared-store-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted)

## Использование

Получите/установите значение (простой объект) в/из хранилища по ключу (строке). Ключом может быть любая произвольная строка, кроме `*`, который зарезервирован, так как позволяет получить все хранилище.

### Установка значений

Чтобы установить значения в хранилище, вызовите:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Получение значений

Чтобы получить значения из хранилища, вызовите:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // возвращает "foobar123"
```

Вы также можете получить все значения ключей, используя ключ `*`:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // возвращает `{ key: "foobar" }`
```

### Доступ к хранилищу в хуках WDIO

Вы также можете напрямую получить доступ к асинхронным обработчикам `setValue` и `getValue`.
Убедитесь, что вы правильно вызываете их с ключевым словом `await`.

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

ВАЖНО! Каждый файл спецификации должен быть атомарным и изолированным от других спецификаций.
Идея сервиса заключается в решении очень специфических проблем настройки окружения.
Пожалуйста, избегайте обмена данными выполнения тестов!

### Пулы ресурсов

Если рабочие потоки конкурируют за ресурсы, которые должны быть назначены для каждого рабочего процесса, вы можете использовать API пула ресурсов:

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
        // рабочий процесс возвращает использованный ресурс для следующих рабочих процессов
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

Этот пример гарантирует, что оба рабочих процесса никогда не будут использовать один и тот же `baseUrl`. Уникальный URL назначается только одному рабочему процессу, пока он не будет им освобожден.

## Конфигурация

Добавьте `shared-store` в список сервисов, и объект `sharedStore` будет доступен вам в [области видимости `browser`](https://webdriver.io/docs/api/browser) в вашем тесте.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Если вы используете typescript, убедитесь, что добавили `@wdio/shared-store-service` в ваш `compilerOptions.types`:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```