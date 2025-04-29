---
id: wdio-rerun-service
title: Сервис повторного запуска
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service это сторонний пакет, для получения дополнительной информации посетите [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Этот сервис отслеживает неудачные тесты Mocha или Jasmine и сценарии Cucumber, выполняемые в рамках фреймворка [WebdriverIO](https://webdriver.io). Он позволяет повторно запускать неудачные или нестабильные тесты или сценарии.

_ПРИМЕЧАНИЕ_: Пользователи Cucumber Framework, использующие WebdriverIO версии `5.x` и `6.x`, должны использовать версию `1.6.x`. Если вы используете последнюю основную версию `7.x`, используйте последнюю версию `1.7.x` этого сервиса.

## Повторный запуск vs. Повторная попытка

Логика `retry`, встроенная в WebdriverIO для Cucumber и Mocha/Jasmine, полезна для обработки нестабильных шагов в Cucumber и Mocha/Jasmine. Повторные попытки в каждом фреймворке имеют свои особенности:
* Cucumber: Не учитывает, что некоторые шаги могут не подлежать повторной попытке в середине теста. Выполнение шага дважды может нарушить остальную часть сценария или это может быть невозможно в контексте теста.
* Mocha/Jasmine: Логика `retry` может быть применена к отдельному тесту, однако это все равно выполняется в реальном времени и, возможно, не учитывает временные проблемы или проблемы с сетевым подключением.

Основные отличия `re-run`:
* Повторно запускает весь отдельный сценарий Cucumber, а не только один шаг
* Позволяет повторно запустить весь файл спецификации после завершения основного тестового выполнения
* Может быть скопирован и выполнен локально (`retry` не может)
* Может использоваться совместно с методами `retry`
* Не требует никаких изменений кода для применения логики `retry` к нестабильным или проблемным тестам

Рекомендуется потратить некоторое время на оценку доступных вариантов. Гибридное решение может быть лучшим решением для обеспечения наилучших реальных и полезных результатов тестирования.

## Установка

Самый простой способ - добавить `wdio-rerun-service` в `devDependencies` в вашем `package.json`.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

Его можно установить с помощью `npm`:

```bash
npm install wdio-rerun-service
```

После завершения установки пакета добавьте его в массив `services` в `wdio.conf.js`:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted.html)

## Конфигурация

Следующие параметры могут быть добавлены в файл wdio.conf.js. Чтобы определить параметры для сервиса, вам нужно добавить сервис в список `services` следующим образом:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Параметры сервиса повторного запуска здесь...
        }]
    ],
    // ...
};
```

### rerunDataDir
Директория, где будут храниться все данные JSON повторного запуска во время выполнения.

Тип: `String`

По умолчанию: `./results/rerun`

Пример:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
Путь для записи скрипта Bash повторного запуска.

Тип: `String`

По умолчанию: `./rerun.sh`

Пример:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Только для Cucumber) Набор тегов Cucumber для исключения. Если сценарий содержит тег, сервис повторного запуска пропустит анализ.

Тип: `Array`

По умолчанию: `[]`

Пример:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
Префикс, который будет добавлен к сгенерированной команде повторного запуска.

Тип: `String`

По умолчанию: `''`

Пример:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----