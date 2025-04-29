---
id: wdio-eslinter-service
title: Автоматическое обнаружение отсутствующих импортов с помощью сервиса eslint
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service - это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

Случалось ли вам запускать тесты e2e, только чтобы узнать через 10, 15 или 30 минут, что был отсутствующий/неправильно написанный импорт, который не появился до середины тестового запуска? Когда это происходит, средство запуска тестов сообщает, что эти тесты повреждены.

eslint — отличный инструмент для обнаружения различных ошибок перед выполнением, и этот сервис запускает инструмент eslint до выполнения тестов WebdriverIO, как автоматический шаг вместо ручного.

Часто лучше потерпеть неудачу быстрее, чтобы мы могли решить проблемы раньше, а не позже.

Рекомендуемая конфигурация — использовать средство запуска unresolved для проверки отсутствующих импортов, но при желании вы также можете настроить сервис для запуска eslinter в вашем проекте с помощью npm или yarn, или передав флаг, который указывает системе также использовать вашу конфигурацию .eslintrc.

## Установка

Установите wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### Быстрый старт - Проверка только на отсутствующие или неразрешенные импорты

По умолчанию, эта минимальная конфигурация, средство запуска "unresolved", проверяет неразрешенные импорты require и выдает ошибку, если обнаружены неразрешенные импорты. Затем сервис останавливает выполнение. Вы можете настроить .eslintrc.js для выполнения дополнительных проверок с помощью средств запуска "npm" или "yarn", если это необходимо. См. [eslint](https://www.npmjs.com/package/eslint) для получения дополнительной информации.

Если у вас нет конфигурации `.eslintrc.js` в вашем проекте, то wdio-eslinter-service можно настроить на использование конфигурации по умолчанию, которая просто проверяет отсутствующие импорты перед запуском тестов. Это удобно, чтобы вы узнали о неправильных импортах раньше, а не позже. Для настройки этого добавьте следующую конфигурацию eslinter в ваш массив services (предполагая, что вы уже используете сервис chromedriver; в противном случае, опустите эту часть):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

На этом этапе начните запускать тесты, и если есть отсутствующий или неправильный импорт, WebdriverIO зарегистрирует его и немедленно прервет запуск теста:

```
$ npx wdio
```


#### Опционально - если используется module-alias

Если вы используете модуль [module-alias](https://www.npmjs.com/package/module-alias), который позволяет настраивать псевдонимы для замены относительных путей, вам нужно будет передать это в конфигурацию eslinter с помощью плагина eslint-import-resolver-custom-alias. Вот пример:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

Установите плагин в свой проект:

```
$ npm i eslint-import-resolver-custom-alias
```

Запустите тесты и убедитесь, что система найдет неправильные импорты, использующие псевдонимы модулей:

```
$ npx wdio
```

#### Экспериментально - Использование вместе с существующей конфигурацией eslintrc в вашем проекте

Чтобы сервис eslinter также использовал существующую конфигурацию eslintrc в вашем проекте, установите `includeProjectEslintrc` в true в массиве services конфигурации wdio.conf.js.

Я сталкивался с проблемами из-за конфликтующих плагинов. Если ваша настройка eslint в проекте также ищет неразрешенные импорты, то это может не сработать и может потребовать корректировки вашего .eslintrc.js. В настоящее время это не рекомендуется.


### Расширенные альтернативы - Использование средств запуска npm и yarn

Средства запуска npm и yarn помогают получить дополнительный контроль над запуском существующей настройки eslinter в вашем проекте. С этой конфигурацией вы можете определить дополнительные команды для запуска в разделе run-scripts в вашем package.json:

Внутри вашего `package.json` добавьте эту запись в ваши скрипты запуска:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**ПРИМЕЧАНИЕ: Добавление eslint в package.json необходимо для функционирования сервиса при использовании средств запуска npm или yarn.**

Если у вас еще не установлен и не настроен eslint, вам нужно будет установить его и настроить в вашем проекте, а также любые плагины, которые вы используете, такие как eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

Если вы используете плагин eslint-import-resolver-custom-alias для сопоставления псевдонимов модулей с их реальными путями, вам также нужно будет установить его:

```
$ npm i eslint-import-resolver-custom-alias
```

Вам также нужно будет создать файл `.eslintrc.js`, если у вас еще нет одного из файлов конфигурации eslintrc в вашем проекте. Вот базовая настройка, которая просто ищет неразрешенные импорты, и вы можете расширить эту конфигурацию для проверки качества кода перед запуском тестов:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

Наконец, добавьте сервис `eslinter` в массив services в `wdio.conf.js`:

```javascript
    services: ['eslinter']
```

Запустите `npm run eslint` для проверки и поиска ошибок.

Если вы используете `yarn`, вы можете настроить опцию сервиса `runnerType`:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

Если у вас уже есть скрипт линтера, который вы хотите использовать повторно (вместо `eslint`), вы можете настроить опцию сервиса `scriptName`:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## Использование в WebdriverIO

Запустите тестовый запуск WebdriverIO как обычно. eslint проверит код. Если найдены ошибки, выполнение немедленно прекращается.

```bash
$ npx wdio
```


**Пример:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```