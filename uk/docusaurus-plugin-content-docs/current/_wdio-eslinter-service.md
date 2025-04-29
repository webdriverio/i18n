---
id: wdio-eslinter-service
title: Автоматичне виявлення пропущених імпортів за допомогою eslint Service
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service — це сторонній пакет, для отримання додаткової інформації відвідайте [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

Чи траплялося вам запускати e2e тести, лише щоб дізнатися через 10, 15 або 30 хвилин, що був відсутній/неправильно написаний імпорт, який з'явився тільки в середині тестового запуску? Коли це відбувається, тест-ранер позначає ці тести як зламані.

eslint — чудовий інструмент для виявлення різних помилок до запуску, і ця служба запускає інструмент eslint перед виконанням тестів WebdriverIO як автоматизований крок замість ручного.

Часто краще швидше зазнавати невдачі, щоб ми могли виправляти проблеми раніше, а не пізніше.

Рекомендована конфігурація — використовувати unresolved runner для перевірки лише відсутніх імпортів, але за бажанням ви також можете налаштувати сервіс для запуску eslinter у вашому проекті за допомогою npm або yarn runner, або передавши прапорець, який вказує системі використовувати вашу конфігурацію .eslintrc.

## Встановлення

Встановіть wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### Швидкий старт - Перевірка лише відсутніх або нерозпізнаних імпортів

За замовчуванням, ця мінімальна конфігурація, "unresolved" runner, перевіряє нерозпізнані імпорти require і видає помилку, якщо знайдено нерозпізнані імпорти. Потім сервіс припиняє виконання. Ви можете налаштувати .eslintrc.js для виконання додаткових перевірок за допомогою "npm" або "yarn" runners, якщо бажаєте. Див. [eslint](https://www.npmjs.com/package/eslint) для отримання додаткової інформації.

Якщо у вашому проекті немає конфігурації `.eslintrc.js`, то wdio-eslinter-service можна налаштувати на використання стандартної, яка просто перевіряє відсутні імпорти перед запуском тестів. Це зручно, щоб дізнатися про неправильні імпорти раніше, а не пізніше. Щоб налаштувати це, додайте наступну конфігурацію eslinter до масиву services (припускаючи, що ви вже використовуєте сервіс chromedriver; в іншому випадку, залиште цю частину):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

На цьому етапі почніть запускати тести, і якщо існує відсутній або неправильний імпорт, WebdriverIO зареєструє його та негайно завершить тестовий запуск:

```
$ npx wdio
```


#### Додатково - якщо використовується module-alias

Якщо ви використовуєте модуль [module-alias](https://www.npmjs.com/package/module-alias), який дозволяє налаштувати псевдоніми для заміни відносних шляхів, вам потрібно передати їх у конфігурацію eslinter за допомогою плагіна eslint-import-resolver-custom-alias. Ось приклад:

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

Встановіть плагін у свій проект:

```
$ npm i eslint-import-resolver-custom-alias
```

Запустіть тести та перевірте, чи система знайде неправильні імпорти, які використовують псевдоніми модулів:

```
$ npx wdio
```

#### Експериментально - Використання разом з існуючою конфігурацією eslintrc у вашому проекті

Щоб сервіс eslinter також використовував існуючу конфігурацію eslintrc у вашому проекті, встановіть `includeProjectEslintrc` на true у масиві services конфігурації wdio.conf.js.

У мене були проблеми з конфліктуючими плагінами. Якщо ваша налаштування eslint у проекті також шукає нерозпізнані імпорти, то це може не працювати і може вимагати коригування вашого .eslintrc.js. Це не рекомендується на даний момент.


### Розширені альтернативи - Використання npm та yarn runners

Npm та yarn runners допомагають надати вам додатковий контроль над запуском існуючого налаштування eslinter у вашому проекті. З цією конфігурацією ви можете визначити додаткові команди для запуску в розділі run-scripts вашого package.json:

У вашому `package.json` додайте цей запис до ваших скриптів запуску:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**ПРИМІТКА: Додавання eslint до package.json необхідне для роботи сервісу при використанні npm або yarn runners.**

Якщо у вас ще не встановлено та не налаштовано eslint, вам потрібно буде встановити та налаштувати його у вашому проекті, а також будь-які плагіни, які ви використовуєте, наприклад eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

Якщо ви використовуєте плагін eslint-import-resolver-custom-alias для зіставлення псевдонімів модулів з їхніми реальними шляхами, вам також потрібно його встановити:

```
$ npm i eslint-import-resolver-custom-alias
```

Вам також потрібно створити файл `.eslintrc.js`, якщо у вашому проекті ще немає одного з файлів конфігурації eslintrc. Ось базове налаштування для пошуку нерозпізнаних імпортів, і ви можете розширити цю конфігурацію для перевірки інших аспектів якості коду перед запуском тестів:

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

Нарешті, додайте сервіс `eslinter` до масиву services у `wdio.conf.js`:

```javascript
    services: ['eslinter']
```

Запустіть `npm run eslint`, щоб перевірити наявність помилок.

Якщо ви використовуєте `yarn`, ви можете налаштувати опцію сервісу `runnerType`:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

Якщо у вас вже є скрипт linter, який ви хотіли б повторно використати (замість `eslint`), ви можете налаштувати опцію сервісу `scriptName`:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## Використання в WebdriverIO

Запустіть тестовий ранер WebdriverIO як зазвичай. eslint перевірить код. Якщо знайдено помилки, виконання негайно припиняється.

```bash
$ npx wdio
```


**Приклад:**

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