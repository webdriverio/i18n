---
id: wdio-electron-service
title: Electron Сервис
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service это сторонний пакет, для получения дополнительной информации смотрите [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**WebdriverIO сервис для тестирования Electron приложений**

Обеспечивает кросс-платформенное E2E тестирование Electron приложений через обширную экосистему WebdriverIO.

Духовный наследник [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### Возможности

Делает тестирование Electron приложений намного проще благодаря:

- 🚗 автоматической настройке необходимого Chromedriver (для Electron v26 и выше)
- 📦 автоматическому определению пути к вашему Electron приложению
  - поддерживает [Electron Forge](https://www.electronforge.io/), [Electron Builder](https://www.electron.build/) и неупакованные приложения
- 🧩 доступу к Electron API в ваших тестах
- 🕵️ мокингу Electron API через API в стиле Vitest

## Установка

Вам потребуется установить `WebdriverIO`, инструкции можно найти [здесь](https://webdriver.io/docs/gettingstarted).

## Быстрый старт

Рекомендуемый способ быстро начать работу - использовать [мастер настройки WDIO](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### Ручной быстрый старт

Чтобы начать без использования мастера настройки, вам нужно установить сервис и `@wdio/cli`:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

Или используйте любой менеджер пакетов по вашему выбору - pnpm, yarn и т.д.

Далее создайте файл конфигурации WDIO. Если вам нужно вдохновение, есть рабочая конфигурация в [директории примеров](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) этого репозитория, а также [страница справочника по конфигурации WDIO](https://webdriver.io/docs/configuration).

Вам нужно добавить `electron` в массив сервисов и установить возможности Electron, например:

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

Наконец, [запустите некоторые тесты](https://webdriver.io/docs/gettingstarted#run-test) используя ваш файл конфигурации.

Это запустит экземпляр вашего приложения так же, как WDIO управляет браузерами, такими как Chrome или Firefox. Сервис работает с [WDIO (параллельным) multiremote](https://webdriver.io/docs/multiremote), если вам нужно запускать дополнительные экземпляры одновременно, например, несколько экземпляров вашего приложения или различные комбинации вашего приложения и веб-браузера.

Если вы используете [Electron Forge](https://www.electronforge.io/) или [Electron Builder](https://www.electron.build/) для упаковки вашего приложения, то сервис автоматически попытается найти путь к вашему упакованному Electron приложению. Вы можете предоставить пользовательский путь к бинарному файлу через настраиваемые возможности сервиса, например:

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

Смотрите [документацию по конфигурации](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath), чтобы узнать, как найти значение `appBinaryPath` для различных операционных систем, поддерживаемых Electron.

Альтернативно, вы можете направить сервис на неупакованное приложение, предоставив путь к скрипту `main.js`. Electron должен быть установлен в ваших `node_modules`. Рекомендуется собирать неупакованные приложения с использованием сборщика, такого как Rollup, Parcel, Webpack и т.д.

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

## Конфигурация Chromedriver

**Если ваше приложение использует версию Electron ниже v26, то вам нужно [вручную настроить Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

Это потому, что WDIO использует Chrome for Testing для загрузки Chromedriver, который предоставляет только версии Chromedriver v115 или новее.

## Документация

**[Конфигурация сервиса](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Конфигурация Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Доступ к Electron API](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Мокинг Electron API](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[Управление окнами](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[Автономный режим](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[Разработка](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[Распространенные проблемы и отладка](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## Разработка

Прочитайте [документацию по разработке](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md), если вы заинтересованы в участии.

## Примеры интеграции

Посмотрите наш проект [Electron boilerplate](https://github.com/webdriverio/electron-boilerplate), который показывает, как интегрировать WebdriverIO в примере приложения. Вы также можете взглянуть на директории [Example Apps](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) и [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) в этом репозитории.

## Поддержка

Если у вас возникли проблемы с запуском WDIO с сервисом, вам следует сначала проверить документированные [Распространенные проблемы](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md), а затем открыть обсуждение на [основном форуме WDIO](https://github.com/webdriverio/webdriverio/discussions).

Форум обсуждения сервиса Electron гораздо менее активен, чем форум WDIO, но если проблема, с которой вы столкнулись, характерна для Electron или использования сервиса, вы можете открыть обсуждение [здесь](https://github.com/webdriverio-community/wdio-electron-service/discussions).