---
id: boilerplates
title: Проекти-шаблони
---

З часом наша спільнота розробила кілька проектів, які ви можете використовувати як натхнення для налаштування власного набору тестів.

# Проекти-шаблони v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Наш власний шаблон для набору тестів Cucumber. Ми створили понад 150 попередньо визначених кроків для вас, тож ви можете одразу почати писати файли функцій у своєму проекті.

- Фреймворк:
    - Cucumber
    - WebdriverIO
- Особливості:
    - Понад 150 попередньо визначених кроків, які охоплюють майже все, що вам потрібно
    - Інтегрує функціональність Multiremote WebdriverIO
    - Власна демо-програма

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Проект-шаблон для запуску тестів WebdriverIO з Jasmine за допомогою функцій Babel та шаблону об'єктів сторінок.

- Фреймворки
    - WebdriverIO
    - Jasmine
- Особливості
    - Шаблон об'єктів сторінок
    - Інтеграція з Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Проект-шаблон для запуску тестів WebdriverIO на мінімальному додатку Electron.

- Фреймворки
    - WebdriverIO
    - Mocha
- Особливості
    - Імітація API Electron

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Автоматично генерує класи Page Object та специфікації тестів Mocha для WebdriverIO з файлів .feature Gherkin — зменшуючи ручні зусилля, покращуючи послідовність та прискорюючи автоматизацію QA. Цей проект не лише створює код, сумісний з webdriver.io, а й вдосконалює всі функції webdriver.io.

***Як це працює?***
- Процес виконується у два етапи автоматизації:
- Крок 1: Gherkin до stepMap (генерація файлів stepMap.json)
  - Генерація файлів stepMap.json:
    - Аналізує файли .feature, написані синтаксисом Gherkin.
    - Витягує сценарії та кроки.
    - Створює структурований файл .stepMap.json, що містить:
      - дія для виконання (наприклад, click, setText, assertVisible)
      - selectorName для логічного відображення
      - selector для елемента DOM
      - примітка для значень або тверджень
- Крок 2: stepMap до коду (генерація коду WebdriverIO).
  Використовує stepMap.json для генерації:
  - Створення базового класу page.js зі спільними методами та налаштуванням browser.url().
  - Генерація класів Page Object Model (POM), сумісних з WebdriverIO, для кожної функції всередині test/pageobjects/.
  - Генерація тестових специфікацій на основі Mocha.
- Структура каталогів
```
project-root/
├── features/               # Вхідні файли функцій Gherkin
├── stepMaps/               # Згенеровані карти кроків (JSON)
├── test/
│   ├── pageobjects/        # Згенерований базовий клас Page, класи об'єктів сторінок
│   └── specs/              # Згенеровані тестові специфікації
├── generateStepMap.js      # Скрипт генератора StepMap
├── generateTestsFromMap.js # Генератор PageObject + тестових специфікацій
├── package.json
├── README.md
└── wdio.conf.js
```
---
# Проекти-шаблони v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Фреймворк: WDIO-V8 з Cucumber (V8x).
- Особливості:
    - Page Objects Model використовує підхід класів в стилі ES6 /ES7 та підтримку TypeScript
    - Приклади опції кількох селекторів для запиту елемента з більш ніж одним селектором одночасно
    - Приклади виконання в кількох браузерах та безголових браузерах за допомогою - Chrome та Firefox
    - Інтеграція з хмарним тестуванням BrowserStack, Sauce Labs, LambdaTest
    - Приклади читання/запису даних з MS-Excel для легкого управління тестовими даними із зовнішніх джерел з прикладами
    - Підтримка баз даних для будь-якої РСУБД (Oracle, MySql, TeraData, Vertica тощо), виконання будь-яких запитів / отримання результатів тощо з прикладами для E2E тестування
    - Кілька звітів (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері.
    - Приклади з демо-додатками https://search.yahoo.com/ та http://the-internet.herokuapp.com.
    - Спеціальні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільному пристрої). Для одноклікового налаштування Appium на локальній машині для iOS та Android зверніться до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Фреймворк: WDIO-V8 з Mocha (V10x).
- Особливості:
    -  Page Objects Model використовує підхід класів в стилі ES6 /ES7 та підтримку TypeScript
    -  Приклади з демо-додатками https://search.yahoo.com та http://the-internet.herokuapp.com
    -  Приклади виконання в кількох браузерах та безголових браузерах за допомогою - Chrome та Firefox
    -  Інтеграція з хмарним тестуванням BrowserStack, Sauce Labs, LambdaTest
    -  Кілька звітів (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері.
    -  Приклади читання/запису даних з MS-Excel для легкого управління тестовими даними із зовнішніх джерел з прикладами
    -  Приклади підключення до будь-якої РСУБД (Oracle, MySql, TeraData, Vertica тощо), виконання будь-яких запитів / отримання результатів тощо з прикладами для E2E тестування
    -  Спеціальні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільному пристрої). Для одноклікового налаштування Appium на локальній машині для iOS та Android зверніться до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Фреймворк: WDIO-V8 з Jasmine (V4x).
- Особливості:
    -  Page Objects Model використовує підхід класів в стилі ES6 /ES7 та підтримку TypeScript
    -  Приклади з демо-додатками https://search.yahoo.com та http://the-internet.herokuapp.com
    -  Приклади виконання в кількох браузерах та безголових браузерах за допомогою - Chrome та Firefox
    -  Інтеграція з хмарним тестуванням BrowserStack, Sauce Labs, LambdaTest
    -  Кілька звітів (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері.
    -  Приклади читання/запису даних з MS-Excel для легкого управління тестовими даними із зовнішніх джерел з прикладами
    -  Приклади підключення до будь-якої РСУБД (Oracle, MySql, TeraData, Vertica тощо), виконання будь-яких запитів / отримання результатів тощо з прикладами для E2E тестування
    -  Спеціальні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільному пристрої). Для одноклікового налаштування Appium на локальній машині для iOS та Android зверніться до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Цей шаблонний проект містить тести WebdriverIO 8 з cucumber та typescript, дотримуючись шаблону об'єктів сторінок.

- Фреймворки:
    - WebdriverIO v8
    - Cucumber v8

- Особливості:
    - Typescript v5
    - Шаблон об'єктів сторінок
    - Prettier
    - Підтримка кількох браузерів
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Паралельне виконання в кросбраузерному режимі
    - Appium
    - Інтеграція з хмарним тестуванням BrowserStack та Sauce Labs
    - Сервіс Docker
    - Сервіс спільного доступу до даних
    - Окремі файли конфігурації для кожного сервісу
    - Управління тестовими даними та читання за типом користувача
    - Звітність
      - Dot
      - Spec
      - Кілька html-звітів cucumber з скріншотами невдач
    - Pipelines Gitlab для репозиторію Gitlab
    - Github actions для репозиторію Github
    - Docker compose для налаштування docker hub
    - Тестування доступності за допомогою AXE
    - Візуальне тестування за допомогою Applitools
    - Механізм ведення журналу


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особливості
    - Містить приклад тестового сценарію в cucumber
    - Інтегровані звіти html cucumber з вбудованими відео при збоях
    - Інтегровані сервіси Lambdatest та CircleCI
    - Інтегроване візуальне, тестування доступності та API тестування
    - Інтегрована функціональність електронної пошти
    - Інтегрований s3 bucket для зберігання та отримання тестових звітів

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Шаблонний проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), який допоможе вам розпочати приймальне тестування ваших веб-додатків за допомогою останніх версій WebdriverIO, Mocha та Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Звітність Serenity BDD

- Особливості
    - [Шаблон сценарію](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні скріншоти при невдачі тесту, вбудовані у звіти
    - Налаштування безперервної інтеграції (CI) за допомогою [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Шаблонний проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), який допоможе вам розпочати приймальне тестування ваших веб-додатків за допомогою останніх версій WebdriverIO, Cucumber та Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Звітність Serenity BDD

- Особливості
    - [Шаблон сценарію](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні скріншоти при невдачі тесту, вбудовані у звіти
    - Налаштування безперервної інтеграції (CI) за допомогою [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Проект-шаблон для запуску тестів WebdriverIO в хмарі Headspin (https://www.headspin.io/) за допомогою функцій Cucumber та шаблону об'єктів сторінок.
- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особливості
    - Інтеграція з хмарою [Headspin](https://www.headspin.io/)
    - Підтримка шаблону об'єктів сторінок
    - Містить приклади сценаріїв, написаних у декларативному стилі BDD
    - Інтегровані html-звіти cucumber

# Проекти-шаблони v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Проект-шаблон для запуску тестів Appium з WebdriverIO для:

- Нативних додатків iOS/Android
- Гібридних додатків iOS/Android
- Браузерів Android Chrome та iOS Safari

Цей шаблон включає наступне:

- Фреймворк: Mocha
- Особливості:
    - Конфігурації для:
        - Додатків iOS та Android
        - Браузерів iOS та Android
    - Допоміжні функції для:
        - WebView
        - Жестів
        - Нативних оповіщень
        - Вибірок
     - Приклади тестів для:
        - WebView
        - Входу
        - Форм
        - Свайпів
        - Браузерів

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB тести з Mocha, WebdriverIO v6 з PageObject

- Фреймворки
  - WebdriverIO (v7)
  - Mocha
- Особливості
  - Модель [Page Object](pageobjects)
  - Інтеграція з Sauce Labs через [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Звіт Allure
  - Автоматичне захоплення скріншотів при невдалих тестах
  - Приклад CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Проект-шаблон для запуску E2E тестів з Mocha.

- Фреймворки:
    - WebdriverIO (v7)
    - Mocha
- Особливості:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Тести візуальної регресії](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Шаблон об'єктів сторінок
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) та [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Приклад Github Actions
    -   Звіт Allure (скріншоти при збоях)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Проект-шаблон для запуску тестів **WebdriverIO v7** для наступного:

[Скрипти WDIO 7 з TypeScript у фреймворку Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Скрипти WDIO 7 з TypeScript у фреймворку Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Запуск скрипту WDIO 7 в Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Мережеві журнали](https://github.com/17thSep/MonitorNetworkLogs/)

Шаблонний проект для:

- Захоплення мережевих журналів
- Захоплення всіх викликів GET/POST або конкретного REST API
- Перевірка параметрів запиту
- Перевірка параметрів відповіді
- Зберігання всіх відповідей в окремому файлі

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Проект-шаблон для запуску тестів appium для нативних та мобільних браузерів за допомогою cucumber v7 та wdio v7 з використанням шаблону об'єктів сторінок.

- Фреймворки
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Особливості
    - Нативні додатки Android та iOS
    - Браузер Android Chrome
    - Браузер iOS Safari
    - Модель об'єктів сторінок
    - Містить приклади тестових сценаріїв у cucumber
    - Інтегровано з кількома html-звітами cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Це шаблонний проект, який допоможе вам показати, як можна запускати тести webdriverio для веб-додатків за допомогою останніх WebdriverIO та фреймворку Cucumber. Цей проект призначений для використання як базовий образ, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO в docker

Цей проект включає:

- DockerFile
- cucumber проект

Дізнайтеся більше: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Це шаблонний проект, який допоможе вам показати, як можна запускати тести electronJS за допомогою WebdriverIO. Цей проект призначений для використання як базовий образ, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO для electronJS.

Цей проект включає:

- Приклад додатку electronjs
- Приклади тестових скриптів cucumber

Дізнайтеся більше: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Це шаблонний проект, який допоможе вам показати, як автоматизувати додатки Windows за допомогою winappdriver та WebdriverIO. Цей проект призначений для використання як базовий образ, який ви можете використовувати для розуміння того, як запускати тести winappdriver та WebdriverIO.

Дізнайтеся більше: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Це шаблонний проект, який допоможе вам показати, як можна запускати можливість multiremote webdriverio з останніми WebdriverIO та фреймворком Jasmine. Цей проект призначений для використання як базовий образ, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO в docker

Цей проект використовує:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Шаблонний проект для запуску тестів appium на реальних пристроях Roku за допомогою mocha з використанням шаблону об'єктів сторінок.

- Фреймворки
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Звітність Allure

- Особливості
    - Модель об'єктів сторінок
    - Typescript
    - Скріншот при збої
    - Приклади тестів з використанням прикладу каналу Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Проект PoC для E2E Multiremote тестів Cucumber, а також тестів Mocha, керованих даними

- Фреймворк:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Особливості:
    - Тести E2E на основі Cucumber
    - Тести на основі Mocha, керовані даними
    - Тести лише для веб - як на локальних, так і на хмарних платформах
    - Тести лише для мобільних - локальні та віддалені хмарні емулятори (або пристрої)
    - Тести для веб + мобільних - Multiremote - як на локальних, так і на хмарних платформах
    - Інтегровано кілька звітів, включаючи Allure
    - Тестові дані (JSON / XLSX) обробляються глобально, щоб записати дані (створені на льоту) у файл після виконання тесту
    - Github workflow для запуску тесту та завантаження звіту allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Це проект-шаблон, який допомагає показати, як запустити webdriverio multi-remote за допомогою сервісів appium та chromedriver з останньою версією WebdriverIO.

- Фреймворки
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Особливості
  - Модель [Page Object](pageobjects)
  - Typescript
  - Тести для веб + мобільних - Multiremote
  - Нативні додатки Android та iOS
  - Appium
  - Chromedriver
  - ESLint
  - Приклади тестів для входу на http://the-internet.herokuapp.com та [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)