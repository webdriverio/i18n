---
id: wdio-rerun-service
title: Сервіс повторного запуску
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service - це пакет від сторонніх розробників, для отримання додаткової інформації дивіться [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Цей сервіс відстежує провалені тести Mocha або Jasmine та сценарії Cucumber, які виконуються в рамках тестового фреймворку [WebdriverIO](https://webdriver.io). Він дозволяє повторно запускати тести або сценарії, які невдало завершилися або показують нестабільну поведінку.

_ПРИМІТКА_: Користувачам фреймворку Cucumber, які використовують WebdriverIO версій `5.x` та `6.x`, слід використовувати версію `1.6.x`. Якщо ви використовуєте останню основну версію `7.x`, використовуйте останню версію `1.7.x` цього сервісу.

## Re-run проти Retry

Логіка `retry`, вбудована в WebdriverIO для Cucumber та Mocha/Jasmine, корисна для обробки нестабільних кроків у Cucumber та Mocha/Jasmine. Повторна спроба в кожному фреймворку має свої особливості:
* Cucumber: Не враховує, що деякі кроки можуть бути неможливо повторити посеред тесту. Запуск кроку двічі може порушити решту сценарію або бути неможливим у контексті тесту.
* Mocha/Jasmine: Логіка `retry` може бути застосована до окремого тесту, проте це все ще виконується в реальному часі і, можливо, не враховує тимчасові проблеми або проблеми з підключенням до мережі.

Основні відмінності `re-run`:
* Повторно запускає весь окремий сценарій Cucumber, а не лише один крок
* Дозволяє повторно запустити весь файл специфікації після завершення основного тестового виконання
* Може бути скопійований та виконаний локально (`retry` не може)
* Може використовуватися разом з методами `retry`
* Не вимагає жодних змін коду для застосування логіки `retry` до нестабільних або проблемних тестів

Рекомендується витратити час на оцінку доступних опцій. Гібридне рішення може бути найкращим для забезпечення реальних та дієвих результатів тестування.

## Встановлення

Найпростіший спосіб - додати `wdio-rerun-service` до `devDependencies` у вашому `package.json`.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

Його можна встановити за допомогою `npm`:

```bash
npm install wdio-rerun-service
```

Після завершення встановлення пакету додайте його до масиву `services` у `wdio.conf.js`:

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

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted.html)

## Конфігурація

Наступні опції можуть бути додані до файлу wdio.conf.js. Щоб визначити опції для сервісу, вам потрібно додати сервіс до списку `services` таким чином:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Опції сервісу повторного запуску тут...
        }]
    ],
    // ...
};
```

### rerunDataDir
Директорія, де зберігатимуться всі дані JSON для повторного запуску під час виконання.

Тип: `String`

За замовчуванням: `./results/rerun`

Приклад:
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
Шлях для запису скрипту Bash для повторного запуску.

Тип: `String`

За замовчуванням: `./rerun.sh`

Приклад:
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
(Тільки для Cucumber) Набір тегів Cucumber для виключення. Якщо сценарій містить тег, сервіс повторного запуску пропустить аналіз.

Тип: `Array`

За замовчуванням: `[]`

Приклад:
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
Префікс, який буде додано до команди повторного запуску, яка генерується.

Тип: `String`

За замовчуванням: `''`

Приклад:
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