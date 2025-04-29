---
id: json-reporter
title: Json Reporter (Джейсон Репортер)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Установка

```bash
npm install @wdio/json-reporter --save-dev
```

## Конфигурация

### Результаты в `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### Результаты в файл

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### Результаты в файл с пользовательским именем файла

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

## Файлы результатов

Начиная с WDIO v5, формирование отчетов переместилось из централизованного процесса в процесс, обрабатываемый каждой из "сессий", запущенных для параллельного выполнения тестов. Это изменение помогло уменьшить количество обмена данными во время выполнения тестов WDIO и, таким образом, улучшить производительность. Недостатком является то, что больше невозможно получить единый отчет для всего процесса тестирования.

`@wdio/json-reporter` предоставляет служебную функцию для объединения нескольких JSON-файлов в один файл. Следуйте приведенным ниже шагам, чтобы воспользоваться этой функцией.

Вы можете выполнить это в [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) вашего `wdio.conf.js`:

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

_Примечание:_ `wdio-custom-filename.json` является необязательным, если параметр не указан, значение по умолчанию - `wdio-merged.json`.

## Вклад

Исходный код этого репортера был в значительной степени вдохновлен [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) — репортером сообщества, созданным [Jim Davis](https://github.com/fijijavis). Спасибо за всю работу по поддержке проекта!

---

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](http://webdriver.io).