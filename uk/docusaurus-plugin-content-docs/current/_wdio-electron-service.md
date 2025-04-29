---
id: wdio-electron-service
title: Electron Сервіс
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service є пакетом від сторонніх розробників, для отримання додаткової інформації дивіться [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**WebdriverIO сервіс для тестування Electron додатків**

Забезпечує крос-платформне E2E тестування Electron додатків через розширену екосистему WebdriverIO.

Духовний наступник [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### Особливості

Спрощує тестування Electron додатків завдяки:

- 🚗 автоматичному налаштуванню потрібного Chromedriver (для Electron v26 і вище)
- 📦 автоматичному виявленню шляху до вашого Electron додатку
  - підтримує [Electron Forge](https://www.electronforge.io/), [Electron Builder](https://www.electron.build/) та неупаковані додатки
- 🧩 доступу до Electron API у ваших тестах
- 🕵️ мокуванню Electron API через API, схожий на Vitest

## Встановлення

Вам потрібно встановити `WebdriverIO`, інструкції можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Швидкий старт

Рекомендований спосіб швидко почати роботу — використати [майстер налаштування WDIO](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### Ручний швидкий старт

Щоб почати без використання майстра налаштування, вам потрібно встановити сервіс та `@wdio/cli`:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

Або використовуйте свій улюблений пакетний менеджер — pnpm, yarn тощо.

Далі створіть свій конфігураційний файл WDIO. Якщо вам потрібно натхнення, є робоча конфігурація в [каталозі прикладів](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) цього репозиторію, а також [сторінка посилань на конфігурацію WDIO](https://webdriver.io/docs/configuration).

Вам потрібно додати `electron` до масиву сервісів і встановити можливість Electron, наприклад:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

Нарешті, [запустіть тести](https://webdriver.io/docs/gettingstarted#run-test) за допомогою вашого конфігураційного файлу.

Це запустить екземпляр вашого додатку таким самим чином, як WDIO обробляє браузери, такі як Chrome або Firefox. Сервіс працює з [WDIO (паралельним) multiremote](https://webdriver.io/docs/multiremote), якщо вам потрібно запустити додаткові екземпляри одночасно, наприклад, кілька екземплярів вашого додатка або різні комбінації вашого додатка та веб-браузера.

Якщо ви використовуєте [Electron Forge](https://www.electronforge.io/) або [Electron Builder](https://www.electron.build/) для пакування вашого додатку, то сервіс автоматично спробує знайти шлях до вашого зібраного Electron додатку. Ви можете надати власний шлях до бінарного файлу через спеціальні можливості сервісу, наприклад:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

Перегляньте [документацію з конфігурації](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath), щоб дізнатися, як знайти значення `appBinaryPath` для різних операційних систем, які підтримує Electron.

Альтернативно, ви можете направити сервіс на неупакований додаток, надавши шлях до скрипту `main.js`. Electron повинен бути встановлений у ваших `node_modules`. Рекомендується збирати неупаковані додатки за допомогою бандлера, такого як Rollup, Parcel, Webpack тощо.

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## Конфігурація Chromedriver

**Якщо ваш додаток використовує версію Electron нижче v26, то вам потрібно [вручну налаштувати Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

Це тому, що WDIO використовує Chrome for Testing для завантаження Chromedriver, який надає лише версії Chromedriver v115 або новіше.

## Документація

**[Конфігурація сервісу](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Конфігурація Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Доступ до Electron API](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Мокування Electron API](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[Управління вікнами](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[Автономний режим](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[Розробка](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[Поширені проблеми та відлагодження](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## Розробка

Прочитайте [документацію з розробки](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md), якщо ви зацікавлені в тому, щоб зробити внесок.

## Приклади інтеграцій

Перегляньте наш [шаблонний проект Electron](https://github.com/webdriverio/electron-boilerplate), який демонструє, як інтегрувати WebdriverIO в прикладний додаток. Ви також можете переглянути каталоги [Example Apps](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) та [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) у цьому репозиторії.

## Підтримка

Якщо у вас виникають проблеми з запуском WDIO з сервісом, вам слід спочатку перевірити документовані [Поширені проблеми](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md), а потім відкрити обговорення в [головному форумі WDIO](https://github.com/webdriverio/webdriverio/discussions).

Форум обговорення сервісу Electron набагато менш активний, ніж форум WDIO, але якщо проблема, яку ви відчуваєте, специфічна для Electron або використання сервісу, ви можете відкрити обговорення [тут](https://github.com/webdriverio-community/wdio-electron-service/discussions).