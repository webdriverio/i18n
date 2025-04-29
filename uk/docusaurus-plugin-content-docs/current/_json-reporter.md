---
id: json-reporter
title: Json Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Встановлення

```bash
npm install @wdio/json-reporter --save-dev
```

## Конфігурація

### Результати у `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### Результати у файл

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### Результати у файл з користувацьким іменем файлу

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## Файли результатів

З версії WDIO v5 і вище, звітування перейшло від централізованого процесу до того, який обробляється кожною "сесією", створеною для паралельного виконання тестів. Ця зміна допомогла зменшити кількість комунікацій під час виконання тестів WDIO і таким чином покращити продуктивність. Недоліком є те, що більше неможливо отримати єдиний звіт для всього виконання тестів.

`@wdio/json-reporter` надає службову функцію для об'єднання декількох json-файлів в один. Дотримуйтесь наведених нижче кроків, щоб скористатися цією можливістю.

Ви можете виконати це в [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) вашого `wdio.conf.js`:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_Примітка:_ `wdio-custom-filename.json` є необов'язковим, якщо параметр не надано, використовується значення за замовчуванням `wdio-merged.json`.

## Внесок

Вихідний код цього репортера був значною мірою натхненний [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) від спільноти, створеним [Jim Davis](https://github.com/fijijavis). Дякуємо за всю роботу по підтримці проекту!

---

Для отримання додаткової інформації про WebdriverIO перегляньте [домашню сторінку](http://webdriver.io).