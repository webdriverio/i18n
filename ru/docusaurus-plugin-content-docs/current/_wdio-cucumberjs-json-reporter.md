---
id: wdio-cucumberjs-json-reporter
title: Репортер CucumberJS JSON
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter является сторонним пакетом, для получения дополнительной информации смотрите [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

WDIO репортер, который создает файлы CucumberJS JSON для WebdriverIO v8 и выше.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## Что он делает
Этот репортер генерирует **файл Cucumber JSON** для каждой тестируемой функциональности. JSON-файл можно использовать с любым отчетом, который вы хотите использовать, например, [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

Он также добавляет метаданные о запущенном экземпляре в файл функциональности и, наконец, дает вам возможность добавлять вложения в JSON-вывод.

## Установка
Самый простой способ - это держать `wdio-cucumberjs-json-reporter` как devDependency в вашем `package.json`.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

Вы можете просто сделать это с помощью:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

и он будет автоматически добавлен в ваш `package.json`

Инструкции по установке `WebdriverIO` можно найти [здесь](https://webdriver.io/docs/gettingstarted).

## Конфигурация
Настройте выходной каталог и язык в вашем файле wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [
        // Вот так с параметрами по умолчанию, смотрите параметры ниже
        'cucumberjs-json',

        // ИЛИ так, если вы хотите установить папку и язык
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> НЕ ИСПОЛЬЗУЙТЕ ОБА СПОСОБА ДОБАВЛЕНИЯ РЕПОРТЕРА, ЭТО ПРОСТО ПРИМЕР!

## Опции
### `jsonFolder`
- **Тип:** `String`
- **Обязательно:** Нет
- **По умолчанию:** `.tmp/json/`

Каталог, в котором будут храниться JSON-файлы, созданные этим отчетом, относительно места запуска скрипта.

**Примечание:** Если вы используете npm-скрипт из командной строки, например, `npm run test`, то `jsonFolder` будет относительно пути,
откуда выполняется скрипт. Выполнение из корня вашего проекта также создаст `jsonFolder` в корне вашего проекта.

### `language`
- **Тип:** `String`
- **Обязательно:** Нет
- **По умолчанию:** `en`

Язык, на котором написаны сценарии Gherkin (по умолчанию английский). Список кодов языков и их ключевых слов можно найти [здесь](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **Тип:** `boolean`
- **Обязательно:** Нет
- **По умолчанию:** `false`

Детали хуков не будут частью генерации, если это свойство установлено на `true`.

### `reportFilePerRetry`
- **Тип:** `boolean`
- **Обязательно:** Нет
- **По умолчанию:** `true`

Когда спецификация повторяется, отчет будет добавлен к существующему файлу отчета из предыдущих попыток, если это свойство установлено на `false`.

**Пример**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## Метаданные

> **Примечание:**\
> В настоящее время это не поддерживается при использовании WebdriverIO V6, WebdriverIO V5 по-прежнему поддерживает это, и WebdriverIO V7 снова поддерживает это

Как было сказано, этот отчет может автоматически сохранять метаданные текущей машины/устройства, на котором выполнялась функциональность.

Чтобы настроить это, вы можете добавить следующий объект в ваши `capabilities`

```js
// Пример wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Добавьте это
            'cjson:metadata': {
                // Для браузера
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // для приложения
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> Объект метаданных должен иметь префикс `cjson`, иначе он не будет работать!

### Значения метаданных
#### `metadata.app.name`
- **Тип:** `string`

**например:** Имя приложения.

#### `metadata.app.version`
- **Тип:** `string`

**например:** Версия приложения.

#### `metadata.browser.name`
- **Тип:** `string`
- **Возможные значения:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **Тип:** `string`

**например:** Версия браузера, это можно добавить вручную или получить во время выполнения тестов, чтобы получить точный номер версии.

#### `metadata.device`
- **Тип:** `string`

**например:** Имя, представляющее тип устройства. Например, если вы запускаете его на виртуальной машине, вы можете указать здесь `Virtual Machine`,
или название мобильного устройства, например, `iPhone 7 Plus`.

#### `metadata.platform.name`
- **Тип:** `string`
- **Возможные значения:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **Тип:** `string`

**например:** Версия платформы

> Если вы не указываете объект `browser` в метаданных, этот модуль автоматически определит его для вас. **Он всегда переопределяет его самым последним значением, которое может определить.**

> Если вы не указываете `device` и/или объект `platform`, по умолчанию будет установлено значение `not known`

> Если вы не указываете `browser.name` или `browser.version`, модуль попытается определить это автоматически.

## Вложения
У вас есть возможность прикреплять данные к JSON-файлу во всех этих хуках/шагах:

- Before(All)
- After(All)
- Given
- When
- Then
- And

Единственное, что вам нужно предоставить, это следующий код в ваших файлах шагов.

Для ES Modules (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Прикрепить строку (если тип не указан, автоматически устанавливается значение по умолчанию `text/plain`)
cucumberJson.attach('просто строка');
cucumberJson.attach('просто вторая строка', 'text/plain');

// Прикрепить JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// Прикрепить скриншот в хуке before
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
Для CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Прикрепить строку (если тип не указан, автоматически устанавливается значение по умолчанию `text/plain`)
attach('просто строка');
attach('просто вторая строка', 'text/plain');

// Прикрепить JSON
attach({"json-string": true}, 'application/json');

// Прикрепить скриншот в хуке before
attach(await browser.takeScreenshot(), 'image/png');
```

## Использование с multiple-cucumber-html-reporter
Предыдущий модуль для WebdriverIO V4, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
имел встроенную связь с модулем [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter). **Это не относится к данному
репортеру**, поскольку новая настройка WebdriverIO V5 основана на экземпляре, который не позволяет использовать хуки `onPrepare` и `onComplete`.

Если вы все еще хотите использовать модуль [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter), вы можете добавить следующее в свой конфигурационный файл.

- Установите модуль с помощью

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- Добавьте это в ваш конфигурационный файл

    ```js
    import fs from 'node:fs/promises'
    // Импортируйте модуль
    import { generate } from 'multiple-cucumber-html-reporter'

    // Пример wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * Выполняется один раз перед запуском всех рабочих процессов.
       */
      onPrepare: () => {
        // Удалить папку `.tmp/`, которая содержит файлы json и отчетов
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Выполняется после завершения работы всех рабочих процессов и перед завершением процесса.
       */
      onComplete: () => {
        // Сгенерировать отчет, когда все тесты завершены
        generate({
          // Обязательно
          // Эта часть должна быть тем же путем, где вы храните JSON-файлы
          // по умолчанию = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // для дополнительных опций см. https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## Старые версии WebdriverIO

> **ЭТОТ МОДУЛЬ МОЖЕТ РАБОТАТЬ ТОЛЬКО С WebdriverIO V8+!**\
> **Для V6, пожалуйста, ознакомьтесь с документацией [здесь](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) и используйте версию 2.0.4**\
> **Для V5, пожалуйста, ознакомьтесь с документацией [здесь](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) и используйте версию 1.3.0**

> **ЭТОТ МОДУЛЬ НЕ ЯВЛЯЕТСЯ ЗАМЕНОЙ [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). ЭТОТ МОДУЛЬ ПОДДЕРЖИВАЕТ ТОЛЬКО WEBDRIVERIO V4 И ТАКЖЕ СОЗДАЕТ ОТЧЕТ. ДАННЫЙ МОДУЛЬ СОЗДАЕТ ТОЛЬКО JSON, НЕ ОТЧЕТ!!**