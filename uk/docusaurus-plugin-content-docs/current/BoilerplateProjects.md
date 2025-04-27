---
id: boilerplates
title: Шаблонні проєкти
---

З часом наша спільнота розробила кілька проєктів, які ви можете використовувати як натхнення для налаштування власного тестового набору.

# Шаблонні проєкти v8

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Наш власний шаблон для тестових наборів Cucumber. Ми створили понад 150 попередньо визначених кроків для вас, тож ви можете одразу почати писати функціональні файли у своєму проєкті.

- Фреймворки:
    - Cucumber
    - WebdriverIO
- Особливості:
    - Понад 150 попередньо визначених кроків, які охоплюють майже все, що вам потрібно
    - Інтегрує функціональність Multiremote WebdriverIO
    - Власний демо-додаток

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Шаблонний проєкт для запуску тестів WebdriverIO з Jasmine, використовуючи функції Babel та патерн об'єктів сторінок.

- Фреймворки
    - WebdriverIO
    - Jasmine
- Особливості
    - Патерн об'єктів сторінок
    - Інтеграція з Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Шаблонний проєкт для запуску тестів WebdriverIO на мінімальному додатку Electron.

- Фреймворки
    - WebdriverIO
    - Mocha
- Особливості
    - Мокування API Electron

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Цей шаблонний проєкт містить тести WebdriverIO 8 з cucumber та typescript, що використовують патерн об'єктів сторінок.

- Фреймворки:
    - WebdriverIO v8
    - Cucumber v8

- Особливості:
    - Typescript v5
    - Патерн об'єктів сторінок
    - Prettier
    - Підтримка кількох браузерів
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Паралельне виконання на різних браузерах
    - Appium
    - Інтеграція хмарного тестування з BrowserStack і Sauce Labs
    - Docker-сервіс
    - Сервіс спільного доступу до даних
    - Окремі файли конфігурації для кожного сервісу
    - Управління тестовими даними та читання за типом користувача
    - Звітність
      - Dot
      - Spec
      - Різні HTML-звіти cucumber зі знімками екрану помилок
    - Gitlab pipelines для репозиторію Gitlab
    - Github actions для репозиторію Github
    - Docker compose для налаштування docker hub
    - Тестування доступності за допомогою AXE
    - Візуальне тестування за допомогою Applitools
    - Механізм логування

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Фреймворк: WDIO-V8 з Cucumber (V8x).
- Особливості:
    - Модель об'єктів сторінок використовує класовий підхід ES6/ES7 і підтримку TypeScript
    - Приклади опції мультиселектора для запиту елемента з кількома селекторами одночасно
    - Приклади виконання в кількох браузерах та браузерах без інтерфейсу - Chrome та Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, LambdaTest
    - Приклади читання/запису даних з MS-Excel для простого управління тестовими даними із зовнішніх джерел
    - Підтримка баз даних RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання запитів / отримання результатів з прикладами для E2E тестування
    - Різноманітна звітність (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері
    - Приклади з демо-додатками https://search.yahoo.com/ та http://the-internet.herokuapp.com
    - Спеціальні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільних пристроях). Для швидкого налаштування Appium на локальній машині для iOS та Android дивіться [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Фреймворк: WDIO-V8 з Mocha (V10x).
- Особливості:
    - Модель об'єктів сторінок використовує класовий підхід ES6/ES7 і підтримку TypeScript
    - Приклади з демо-додатками https://search.yahoo.com та http://the-internet.herokuapp.com
    - Приклади виконання в кількох браузерах та браузерах без інтерфейсу - Chrome та Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, LambdaTest
    - Різноманітна звітність (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері
    - Приклади читання/запису даних з MS-Excel для простого управління тестовими даними із зовнішніх джерел
    - Приклади підключення до будь-яких RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання запитів / отримання результатів з прикладами для E2E тестування
    - Спеціальні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільних пристроях). Для швидкого налаштування Appium на локальній машині для iOS та Android дивіться [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Фреймворк: WDIO-V8 з Jasmine (V4x).
- Особливості:
    - Модель об'єктів сторінок використовує класовий підхід ES6/ES7 і підтримку TypeScript
    - Приклади з демо-додатками https://search.yahoo.com та http://the-internet.herokuapp.com
    - Приклади виконання в кількох браузерах та браузерах без інтерфейсу - Chrome та Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, LambdaTest
    - Різноманітна звітність (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері
    - Приклади читання/запису даних з MS-Excel для простого управління тестовими даними із зовнішніх джерел
    - Приклади підключення до будь-яких RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання запитів / отримання результатів з прикладами для E2E тестування
    - Спеціальні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільних пристроях). Для швидкого налаштування Appium на локальній машині для iOS та Android дивіться [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особливості
    - Містить приклади тестових сценаріїв у cucumber
    - Інтегровані HTML-звіти cucumber з вбудованими відео про збої
    - Інтегровані сервіси Lambdatest та CircleCI
    - Інтегроване візуальне, тестування доступності та API-тестування
    - Інтегрована функціональність електронної пошти
    - Інтегрований s3 bucket для зберігання та отримання тестових звітів

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Шаблонний проєкт [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) для початку приймального тестування ваших веб-додатків за допомогою останніх версій WebdriverIO, Mocha та Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Звітність Serenity BDD

- Особливості
    - [Патерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні знімки екрану при помилках тестів, вбудовані у звіти
    - Налаштування безперервної інтеграції (CI) з використанням [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Шаблонний проєкт [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) для початку приймального тестування ваших веб-додатків за допомогою останніх версій WebdriverIO, Cucumber та Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Звітність Serenity BDD

- Особливості
    - [Патерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні знімки екрану при помилках тестів, вбудовані у звіти
    - Налаштування безперервної інтеграції (CI) з використанням [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Шаблонний проєкт для запуску тестів WebdriverIO в Headspin Cloud (https://www.headspin.io/) за допомогою функцій Cucumber та патерну об'єктів сторінок.
- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особливості
    - Хмарна інтеграція з [Headspin](https://www.headspin.io/)
    - Підтримує модель об'єктів сторінок
    - Містить приклади сценаріїв, написаних у декларативному стилі BDD
    - Інтегровані HTML-звіти cucumber

# Шаблонні проєкти v7

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Шаблонний проєкт для запуску тестів Appium з WebdriverIO для:

- Нативних додатків iOS/Android
- Гібридних додатків iOS/Android
- Браузерів Android Chrome та iOS Safari

Цей шаблон включає:

- Фреймворк: Mocha
- Особливості:
    - Конфігурації для:
        - Додатків iOS та Android
        - Браузерів iOS та Android
    - Помічники для:
        - WebView
        - Жестів
        - Нативних сповіщень
        - Вибору
     - Приклади тестів для:
        - WebView
        - Логіну
        - Форм
        - Свайпів
        - Браузерів

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB тести з Mocha, WebdriverIO v6 з моделлю об'єктів сторінок

- Фреймворки
  - WebdriverIO (v7)
  - Mocha
- Особливості
  - Модель [об'єктів сторінок](pageobjects)
  - Інтеграція з Sauce Labs за допомогою [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Звіт Allure
  - Автоматичне створення знімків екрану для тестів з помилками
  - Приклад CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Шаблонний проєкт для запуску E2E тестів з Mocha.

- Фреймворки:
    - WebdriverIO (v7)
    - Mocha
- Особливості:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Тести візуальної регресії](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Патерн об'єктів сторінок
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) та [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Приклад Github Actions
    -   Звіт Allure (знімки екрану при збоях)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Шаблонний проєкт для запуску тестів **WebdriverIO v7** для:

[Скрипти WDIO 7 з TypeScript у фреймворку Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Скрипти WDIO 7 з TypeScript у фреймворку Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Запуск скрипту WDIO 7 у Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Мережеві логи](https://github.com/17thSep/MonitorNetworkLogs/)

Шаблонний проєкт для:

- Захоплення мережевих логів
- Захоплення всіх GET/POST викликів або певного REST API
- Перевірки параметрів запиту
- Перевірки параметрів відповіді
- Зберігання всіх відповідей в окремому файлі

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Шаблонний проєкт для запуску тестів appium для нативних додатків та мобільних браузерів з використанням cucumber v7 та wdio v7 за патерном об'єктів сторінок.

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
    - Інтегрований з кількома HTML-звітами cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Це шаблонний проєкт, який допоможе вам показати, як можна запускати тести webdriverio для веб-додатків за допомогою найновіших WebdriverIO та фреймворку Cucumber. Цей проєкт призначений для базового зображення, яке ви можете використовувати для розуміння того, як запускати тести WebdriverIO у docker.

Цей проєкт включає:

- DockerFile
- проєкт cucumber

Дізнайтеся більше: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Це шаблонний проєкт, який допоможе вам показати, як можна запускати тести electronJS за допомогою WebdriverIO. Цей проєкт призначений для базового зображення, яке ви можете використовувати для розуміння того, як запускати тести WebdriverIO для electronJS.

Цей проєкт включає:

- Зразок додатку electronjs
- Зразки тестових скриптів cucumber

Дізнайтеся більше: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Це шаблонний проєкт, який допоможе вам показати, як можна автоматизувати додатки Windows за допомогою winappdriver та WebdriverIO. Цей проєкт призначений для базового зображення, яке ви можете використовувати для розуміння того, як запускати тести winappdriver та WebdriverIO.

Дізнайтеся більше: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)

Це шаблонний проєкт, який допоможе вам показати, як можна запускати можливості multiremote webdriverio з найновішим WebdriverIO та фреймворком Jasmine. Цей проєкт призначений для базового зображення, яке ви можете використовувати для розуміння того, як запускати тести WebdriverIO у docker.

Цей проєкт використовує:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Шаблонний проєкт для запуску тестів appium на реальних пристроях Roku за допомогою mocha з патерном об'єктів сторінок.

- Фреймворки
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure звітність

- Особливості
    - Модель об'єктів сторінок
    - Typescript
    - Знімок екрану при збої
    - Приклади тестів з використанням зразкового каналу Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Проєкт PoC для E2E Multiremote тестів Cucumber, а також тестів Mocha, керованих даними

- Фреймворк:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Особливості:
    - Тести Cucumber E2E
    - Тести Mocha, керовані даними
    - Лише веб-тести - як на локальних, так і на хмарних платформах
    - Лише мобільні тести - локальні та віддалені хмарні емулятори (або пристрої)
    - Веб + мобільні тести - Multiremote - як локальні, так і хмарні платформи
    - Інтегровано кілька звітів, включаючи Allure
    - Тестові дані (JSON / XLSX) обробляються глобально, щоб записувати дані (створені під час тесту) у файл після виконання тесту
    - Робочий процес Github для запуску тесту та завантаження звіту Allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Це шаблонний проєкт, який допоможе показати, як запускати webdriverio multi-remote за допомогою appium та chromedriver service з останньою версією WebdriverIO.

- Фреймворки
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Особливості
  - Модель [об'єктів сторінок](pageobjects)
  - Typescript
  - Веб + мобільні тести - Multiremote
  - Нативні додатки Android та iOS
  - Appium
  - Chromedriver
  - ESLint
  - Приклади тестів для входу в http://the-internet.herokuapp.com та [демо-додаток WebdriverIO](https://github.com/webdriverio/native-demo-app)