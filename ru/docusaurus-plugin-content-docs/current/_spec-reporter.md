---
id: spec-reporter
title: Spec Reporter (Репортер спецификаций)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Плагин WebdriverIO для отчетов в стиле спецификаций.

![Spec Reporter](/img/spec.png "Spec Reporter")

## Установка

Самый простой способ — сохранить `@wdio/spec-reporter` как devDependency в вашем `package.json`, используя:

```sh
npm install @wdio/spec-reporter --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь](https://webdriver.io/docs/gettingstarted).

## Конфигурация

Следующий код показывает конфигурацию тестового раннера wdio по умолчанию. Просто добавьте `'spec'` как репортер в массив.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Параметры Spec Reporter
### symbols
Предоставляет пользовательские символы для `passed`, `failed` и `skipped` тестов

Тип: `object`
По умолчанию: `{passed: '✓', skipped: '-', failed: '✖'}`

#### Пример
```js
[
  "spec",
  {
    symbols: {
      passed: '[PASS]',
      failed: '[FAIL]',
    },
  },
]
```

### sauceLabsSharableLinks
По умолчанию результаты тестов в Sauce Labs могут просматриваться только членами одной команды, но не членами другой команды. Эта опция включает [общедоступные ссылки](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links) по умолчанию, что означает, что все тесты, выполняемые в Sauce Labs, могут просматриваться всеми. Просто добавьте `sauceLabsSharableLinks: false`, как показано ниже, в параметры репортера, чтобы отключить эту функцию.

Тип: `boolean`
По умолчанию: `true`

#### Пример
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
Выводить результаты только по неудачным спецификациям.

Тип: `boolean`
По умолчанию: `false`

#### Пример
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
Установите `true`, чтобы показывать консольные логи из шагов в итоговом отчете

Тип: `boolean`
По умолчанию: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
Установите `true`, чтобы отображать статус теста в реальном времени, а не только в конце выполнения

Тип: `boolean`
По умолчанию: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
Установите `false`, чтобы отключить префикс `[ MutliRemoteBrowser ... ]` в отчетах.

Тип: `boolean`
По умолчанию: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

С установленным значением `false` вы увидите вывод:
```
Running: loremipsum (v50) on Windows 10
Session ID: foobar

» /foo/bar/loo.e2e.js
Foo test
   green ✓ foo
   green ✓ bar

» /bar/foo/loo.e2e.js
Bar test
   green ✓ some test
   red ✖ a failed test
   red ✖ a failed test with no stack
```

а со значением `true` (по умолчанию) каждая строка будет иметь префикс:
```
[loremipsum 50 Windows 10 #0-0] Running: loremipsum (v50) on Windows 10
[loremipsum 50 Windows 10 #0-0] Session ID: foobar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /foo/bar/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Foo test
[loremipsum 50 Windows 10 #0-0]    green ✓ foo
[loremipsum 50 Windows 10 #0-0]    green ✓ bar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /bar/foo/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Bar test
[loremipsum 50 Windows 10 #0-0]    green ✓ some test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test with no stack
[loremipsum 50 Windows 10 #0-0]
```

### color
Установите `true`, чтобы отображать цветной вывод в терминале

Тип: `boolean`
По умолчанию: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## Параметры окружения

Существуют определенные параметры, которые можно установить через переменные окружения:

### `FORCE_COLOR`

Если установлено значение true, например, через `FORCE_COLOR=0 npx wdio run wdio.conf.js`, все цвета в терминале будут отключены.