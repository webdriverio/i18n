---
id: spec-reporter
title: Специфікаційний Репортер
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Плагін WebdriverIO для звітування в стилі специфікації.

![Spec Reporter](/img/spec.png "Spec Reporter")

## Встановлення

Найпростіший спосіб — зберегти `@wdio/spec-reporter` як devDependency у вашому `package.json` через:

```sh
npm install @wdio/spec-reporter --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Конфігурація

Наступний код показує стандартну конфігурацію тестового запускальника wdio. Просто додайте `'spec'` як репортер до масиву.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Опції Специфікаційного Репортера
### symbols
Надайте власні символи для тестів `passed`, `failed` та/або `skipped`

Тип: `object`
За замовчуванням: `{passed: '✓', skipped: '-', failed: '✖'}`

#### Приклад
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
За замовчуванням результати тестів у Sauce Labs можуть бачити лише члени однієї команди, а не члени інших команд. Ця опція увімкне [посилання для спільного доступу](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links) за замовчуванням, що означає, що всі тести, виконані в Sauce Labs, будуть видимі для всіх.
Просто додайте `sauceLabsSharableLinks: false`, як показано нижче, в опціях репортера, щоб вимкнути цю функцію.

Тип: `boolean`
За замовчуванням: `true`

#### Приклад
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
Виводити результати лише невдалих специфікацій.

Тип: `boolean`
За замовчуванням: `false`

#### Приклад
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
Встановіть `true`, щоб показувати консольні логи з кроків у фінальному звіті

Тип: `boolean`
За замовчуванням: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
Встановіть `true`, щоб відображати статус тесту в реальному часі, а не тільки в кінці запуску

Тип: `boolean`
За замовчуванням: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
Встановіть `false`, щоб вимкнути префікс `[ MutliRemoteBrowser ... ]` у звітах.

Тип: `boolean`
За замовчуванням: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

При встановленні на `false` ви побачите вивід у форматі:
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

а з `true` (за замовчуванням) кожен рядок буде мати префікс:
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
Встановіть `true`, щоб відображати кольоровий вивід в терміналі

Тип: `boolean`
За замовчуванням: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## Опції середовища

Існують певні опції, які можна встановити через змінні середовища:

### `FORCE_COLOR`

Якщо встановлено на true, наприклад, через `FORCE_COLOR=0 npx wdio run wdio.conf.js`, все кольорове оформлення терміналу буде вимкнено.