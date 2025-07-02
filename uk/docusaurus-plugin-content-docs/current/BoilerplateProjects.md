---
id: boilerplates
title: Проекти-шаблони
---

З часом наша спільнота розробила кілька проектів, які ви можете використовувати як натхнення для налаштування власного набору тестів.

# Проекти-шаблони v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Наш власний шаблон для тестових наборів Cucumber. Ми створили понад 150 попередньо визначених визначень кроків для вас, щоб ви могли відразу почати писати функціональні файли у своєму проекті.

- Фреймворк:
    - Cucumber
    - WebdriverIO
- Особливості:
    - Понад 150 попередньо визначених кроків, які охоплюють майже все, що вам потрібно
    - Інтегрує функціональність Multiremote від WebdriverIO
    - Власний демо-додаток

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Проект-шаблон для запуску тестів WebdriverIO з Jasmine, використовуючи функції Babel та патерн об'єктів сторінок.

- Фреймворки
    - WebdriverIO
    - Jasmine
- Особливості
    - Патерн об'єктів сторінок
    - Інтеграція з Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Проект-шаблон для запуску тестів WebdriverIO на мінімальному додатку Electron.

- Фреймворки
    - WebdriverIO
    - Mocha
- Особливості
    - Моделювання API Electron

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Автоматично генеруйте класи об'єктів сторінок WebdriverIO та тестові специфікації Mocha з файлів Gherkin .feature — зменшуючи ручні зусилля, покращуючи узгодженість та прискорюючи автоматизацію QA. Цей проект не тільки створює код, сумісний з webdriver.io, але й розширює всі функції webdriver.io. Ми створили два варіанти: один для користувачів JavaScript, інший для користувачів TypeScript. Але обидва проекти працюють однаково.

***Як це працює?***
- Процес включає двоетапну автоматизацію:
- Крок 1: Gherkin до stepMap (Створення файлів stepMap.json)
  - Створення файлів stepMap.json:
    - Аналізує файли .feature, написані синтаксисом Gherkin.
    - Витягує сценарії та кроки.
    - Створює структурований файл .stepMap.json, що містить:
      - дію для виконання (наприклад, click, setText, assertVisible)
      - selectorName для логічного відображення
      - selector для елемента DOM
      - примітку для значень або перевірки
- Крок 2: stepMap до Коду (Генерація коду WebdriverIO).
  Використовує stepMap.json для генерації:
  - Створює базовий клас page.js зі спільними методами та налаштуванням browser.url().
  - Створює сумісні з WebdriverIO класи об'єктної моделі сторінки (POM) для кожної функції всередині test/pageobjects/.
  - Створює тестові специфікації на базі Mocha.
- Приклад структури каталогів для JavaScript / TypeScript. Нижче показано для версії JS, версія TS має таку ж структуру.
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/                 
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# Проекти-шаблони v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Фреймворк: WDIO-V8 з Cucumber (V8x).
- Особливості:
    - Модель об'єктів сторінок використовується з підходом на основі класів у стилі ES6/ES7 та підтримкою TypeScript
    - Приклади опцій мультиселектора для запиту елемента з більш ніж одним селектором одночасно
    - Приклади виконання у багатьох браузерах і браузерах без інтерфейсу - Chrome і Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, LambdaTest
    - Приклади читання/запису даних з MS-Excel для легкого управління тестовими даними з зовнішніх джерел даних з прикладами
    - Підтримка бази даних для будь-якої RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання будь-яких запитів / отримання набору результатів тощо. з прикладами для наскрізного тестування
    - Кілька звітів (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері
    - Приклади з демо-додатком https://search.yahoo.com/ та http://the-internet.herokuapp.com
    - Конкретні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільному пристрої). Для простого налаштування Appium на локальній машині для iOS та Android зверніться до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Фреймворк: WDIO-V8 з Mocha (V10x).
- Особливості:
    - Модель об'єктів сторінок використовується з підходом на основі класів у стилі ES6/ES7 та підтримкою TypeScript
    - Приклади з демо-додатком https://search.yahoo.com та http://the-internet.herokuapp.com
    - Приклади виконання у багатьох браузерах і браузерах без інтерфейсу - Chrome і Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, LambdaTest
    - Кілька звітів (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері
    - Приклади читання/запису даних з MS-Excel для легкого управління тестовими даними з зовнішніх джерел даних з прикладами
    - Приклади підключення до БД до будь-якої RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання будь-яких запитів / отримання набору результатів тощо. з прикладами для наскрізного тестування
    - Конкретні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільному пристрої). Для простого налаштування Appium на локальній машині для iOS та Android зверніться до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Фреймворк: WDIO-V8 з Jasmine (V4x).
- Особливості:
    - Модель об'єктів сторінок використовується з підходом на основі класів у стилі ES6/ES7 та підтримкою TypeScript
    - Приклади з демо-додатком https://search.yahoo.com та http://the-internet.herokuapp.com
    - Приклади виконання у багатьох браузерах і браузерах без інтерфейсу - Chrome і Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, LambdaTest
    - Кілька звітів (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері
    - Приклади читання/запису даних з MS-Excel для легкого управління тестовими даними з зовнішніх джерел даних з прикладами
    - Приклади підключення до БД до будь-якої RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання будь-яких запитів / отримання набору результатів тощо. з прикладами для наскрізного тестування
    - Конкретні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільному пристрої). Для простого налаштування Appium на локальній машині для iOS та Android зверніться до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Цей проект-шаблон має тести WebdriverIO 8 з cucumber і typescript, що використовують патерн об'єктів сторінок.

- Фреймворки:
    - WebdriverIO v8
    - Cucumber v8

- Особливості:
    - Typescript v5
    - Патерн об'єктів сторінок
    - Prettier
    - Підтримка багатьох браузерів
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Паралельне виконання в різних браузерах
    - Appium
    - Інтеграція хмарного тестування з BrowserStack та Sauce Labs
    - Docker-сервіс
    - Сервіс обміну даними
    - Окремі файли конфігурації для кожного сервісу
    - Управління тестовими даними та читання за типом користувача
    - Звітність
      - Dot
      - Spec
      - Кілька html-звітів cucumber зі знімками екрана при помилках
    - Gitlab pipelines для репозиторію Gitlab
    - Github actions для репозиторію Github
    - Docker compose для налаштування docker hub
    - Тестування доступності за допомогою AXE
    - Візуальне тестування за допомогою Applitools
    - Механізм логування


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особливості
    - Містить приклад тестового сценарію в cucumber
    - Інтегровані html-звіти cucumber з вбудованими відео при помилках
    - Інтегровані сервіси Lambdatest та CircleCI
    - Інтегроване візуальне тестування, тестування доступності та API-тестування
    - Інтегрована функціональність електронної пошти
    - Інтегрований s3 bucket для зберігання та отримання тестових звітів

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) шаблон проекту, який допоможе вам почати приймальне тестування веб-додатків за допомогою найновіших WebdriverIO, Mocha та Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Звітність Serenity BDD

- Особливості
    - [Патерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні знімки екрана при помилці тесту, вбудовані в звіти
    - Налаштування Continuous Integration (CI) за допомогою [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) шаблон проекту, який допоможе вам почати приймальне тестування веб-додатків за допомогою найновіших WebdriverIO, Cucumber та Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Звітність Serenity BDD

- Особливості
    - [Патерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні знімки екрана при помилці тесту, вбудовані в звіти
    - Налаштування Continuous Integration (CI) за допомогою [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Проект-шаблон для запуску тестів WebdriverIO в хмарі Headspin (https://www.headspin.io/) за допомогою функцій Cucumber та патерну об'єктів сторінок.
- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особливості
    - Інтеграція з хмарою [Headspin](https://www.headspin.io/)
    - Підтримує патерн об'єктів сторінок
    - Містить приклади сценаріїв, написаних у декларативному стилі BDD
    - Інтегровані html-звіти cucumber

# Проекти-шаблони v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Проект-шаблон для запуску тестів Appium з WebdriverIO для:

- Нативних додатків iOS/Android
- Гібридних додатків iOS/Android
- Браузерів Android Chrome та iOS Safari

Цей шаблон включає:

- Фреймворк: Mocha
- Особливості:
    - Конфіги для:
        - Додатків iOS та Android
        - Браузерів iOS та Android
    - Помічники для:
        - WebView
        - Жестів
        - Нативних сповіщень
        - Піккерів
     - Приклади тестів для:
        - WebView
        - Логіну
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
  - Інтеграція з Sauce Labs за допомогою [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Звіт Allure
  - Автоматичні знімки екрану для тестів, що не пройшли
  - Приклад CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Проект-шаблон для запуску E2E-тестів з Mocha.

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
    -   Звіт Allure (знімки екрана при помилці)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Проект-шаблон для запуску тестів **WebdriverIO v7** для наступного:

[Скрипти WDIO 7 з TypeScript у фреймворку Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Скрипти WDIO 7 з TypeScript у фреймворку Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Запуск скриптів WDIO 7 у Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Мережеві логи](https://github.com/17thSep/MonitorNetworkLogs/)

Проект-шаблон для:

- Захоплення мережевих логів
- Захоплення всіх викликів GET/POST або конкретного REST API
- Перевірка параметрів запиту
- Перевірка параметрів відповіді
- Зберігання всіх відповідей в окремому файлі

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Проект-шаблон для запуску тестів appium для нативних та мобільних браузерів за допомогою cucumber v7 та wdio v7 з патерном об'єктів сторінок.

- Фреймворки
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Особливості
    - Нативні додатки Android та iOS
    - Браузер Android Chrome
    - Браузер iOS Safari
    - Патерн об'єктів сторінок
    - Містить приклади тестових сценаріїв у cucumber
    - Інтегрований з кількома html-звітами cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Це шаблонний проект, який допоможе вам показати, як запускати тести webdriverio з веб-додатків за допомогою найновіших WebdriverIO та фреймворку Cucumber. Цей проект призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO в docker

Цей проект включає:

- DockerFile
- Проект cucumber

Читайте більше на: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Це шаблонний проект, який допоможе вам показати, як запускати тести electronJS за допомогою WebdriverIO. Цей проект призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO electronJS.

Цей проект включає:

- Зразок додатку electronjs
- Зразок тестових скриптів cucumber

Читайте більше на: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Це шаблонний проект, який допоможе вам показати, як автоматизувати додаток для Windows за допомогою winappdriver та WebdriverIO. Цей проект призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести windappdriver та WebdriverIO.

Читайте більше на: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Це шаблонний проект, який допоможе вам показати, як запускати функцію multiremote webdriverio з найновішим WebdriverIO та фреймворком Jasmine. Цей проект призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO в docker

Цей проект використовує:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Шаблонний проект для запуску тестів appium на реальних пристроях Roku за допомогою mocha з патерном об'єктів сторінок.

- Фреймворки
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Звітність Allure

- Особливості
    - Патерн об'єктів сторінок
    - Typescript
    - Знімок екрану при помилці
    - Приклади тестів з використанням прикладу каналу Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Проект PoC для наскрізних тестів Multiremote Cucumber, а також тестів Mocha, керованих даними

- Фреймворк:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Особливості:
    - Тести E2E на основі Cucumber
    - Тести Mocha, керовані даними
    - Тільки веб-тести - як локальні, так і на хмарних платформах
    - Тільки мобільні тести - локальні, а також віддалені хмарні емулятори (або пристрої)
    - Веб + мобільні тести - Multiremote - як локальні, так і хмарні платформи
    - Інтегровано кілька звітів, включаючи Allure
    - Тестові дані (JSON / XLSX) обробляються глобально, щоб записати дані (створені на льоту) у файл після виконання тесту
    - Github workflow для запуску тесту та завантаження звіту allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Це проект-шаблон, який допоможе показати, як запускати webdriverio multi-remote за допомогою сервісів appium та chromedriver з найновішим WebdriverIO.

- Фреймворки
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Особливості
  - Модель [Page Object](pageobjects)
  - Typescript
  - Веб + мобільні тести - Multiremote
  - Нативні додатки Android та iOS
  - Appium
  - Chromedriver
  - ESLint
  - Приклади тестів для входу в http://the-internet.herokuapp.com та [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)