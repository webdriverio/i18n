---
id: boilerplates
title: Готові проєкти-шаблони
---

З часом наша спільнота розробила кілька проєктів, які ви можете використовувати як натхнення для налаштування власного тестового набору.

# v9 Готові проєкти-шаблони

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Наш власний шаблон для тестових наборів Cucumber. Ми створили понад 150 попередньо визначених визначень кроків для вас, щоб ви могли відразу почати писати файли функцій у своєму проєкті.

- Framework:
    - Cucumber
    - WebdriverIO
- Features:
    - Понад 150 попередньо визначених кроків, які охоплюють майже все, що вам потрібно
    - Інтегрує функціональність Multiremote WebdriverIO
    - Власний демо-додаток

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Проєкт-шаблон для запуску тестів WebdriverIO з Jasmine, використовуючи функції Babel та паттерн об'єктів сторінок.

- Frameworks
    - WebdriverIO
    - Jasmine
- Features
    - Page Object Pattern
    - Sauce Labs integration

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Проєкт-шаблон для запуску тестів WebdriverIO на мінімальному додатку Electron.

- Frameworks
    - WebdriverIO
    - Mocha
- Features
    - Electron API mocking
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Цей проєкт-шаблон має мобільні тести WebdriverIO 9 з Cucumber, TypeScript та Appium для платформ Android та iOS, слідуючи паттерну Page Object Model. Містить комплексне логування, звітування, мобільні жести, навігацію з додатку до веб і інтеграцію CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Features:
    - Підтримка кількох платформ
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Мобільні жести
      - Scroll
      - Swipe
      - Long press
      - Hide keyboard
    - Навігація з додатку до веб
      - Context switching
      - WebView support
      - Browser automation (Chrome/Safari)
    - Свіжий стан додатка
      - Автоматичне скидання додатка між сценаріями
      - Налаштовувана поведінка скидання (noReset, fullReset)
    - Конфігурація пристрою
      - Централізоване управління пристроями
      - Легке перемикання платформ
    - Приклад структури директорії для JavaScript / TypeScript. Нижче наведено для версії JS, версія TS має таку ж структуру.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Автоматичне створення класів Page Object та тестових специфікацій Mocha для WebdriverIO з файлів Gherkin .feature — зменшення ручної праці, покращення узгодженості та прискорення автоматизації QA. Цей проєкт не лише створює код, сумісний з webdriver.io, але й розширює всі функціональні можливості webdriver.io. Ми створили два варіанти: один для користувачів JavaScript, інший для користувачів TypeScript. Але обидва проєкти працюють однаково.

***Як це працює?***
- Процес включає двоетапну автоматизацію:
- Крок 1: Gherkin до stepMap (Генерація файлів stepMap.json)
  - Генерація файлів stepMap.json:
    - Аналізує .feature файли, написані синтаксисом Gherkin.
    - Витягує сценарії та кроки.
    - Створює структурований файл .stepMap.json, що містить:
      - дію для виконання (наприклад, click, setText, assertVisible)
      - selectorName для логічного відображення
      - selector для елемента DOM
      - note для значень або тверджень
- Крок 2: stepMap до коду (Генерація коду WebdriverIO).
  Використовує stepMap.json для генерації:
  - Генерує базовий клас page.js із спільними методами та налаштуванням browser.url().
  - Генерує класи Page Object Model (POM), сумісні з WebdriverIO для кожної функції всередині test/pageobjects/.
  - Генерує тестові специфікації на основі Mocha.
- Приклад структури каталогу для JavaScript / TypeScript. Нижче наведено для версії JS, версія TS має таку ж структуру.
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
# v8 Готові проєкти-шаблони

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 with Cucumber (V8x).
- Features:
    - Page Objects Model використовує підхід на базі класів ES6/ES7 та підтримку TypeScript
    - Приклади опції мультиселектора для запиту елемента з кількома селекторами одночасно
    - Приклади виконання в кількох браузерах та браузері без інтерфейсу - Chrome та Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, LambdaTest
    - Приклади читання/запису даних з MS-Excel для легкого керування тестовими даними із зовнішніх джерел з прикладами
    - Підтримка бази даних для будь-якої RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання будь-яких запитів / отримання набору результатів і т.д. з прикладами для E2E тестування
    - Кілька звітів (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері.
    - Приклади з демонстраційним додатком https://search.yahoo.com/  та http://the-internet.herokuapp.com.
    - Спеціальні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільному пристрої). Для швидкого налаштування Appium на локальній машині для iOS та Android звертайтеся до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 with Mocha (V10x).
- Features:
    - Page Objects Model використовує підхід на базі класів ES6/ES7 та підтримку TypeScript
    - Приклади з демонстраційним додатком https://search.yahoo.com та http://the-internet.herokuapp.com
    - Приклади виконання в кількох браузерах та браузері без інтерфейсу - Chrome та Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, LambdaTest
    - Кілька звітів (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері.
    - Приклади читання/запису даних з MS-Excel для легкого керування тестовими даними із зовнішніх джерел з прикладами
    - Приклади підключення до бази даних будь-якої RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання будь-яких запитів / отримання набору результатів і т.д. з прикладами для E2E тестування
    - Спеціальні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільному пристрої). Для швидкого налаштування Appium на локальній машині для iOS та Android звертайтеся до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 with Jasmine (V4x).
- Features:
    - Page Objects Model використовує підхід на базі класів ES6/ES7 та підтримку TypeScript
    - Приклади з демонстраційним додатком https://search.yahoo.com та http://the-internet.herokuapp.com
    - Приклади виконання в кількох браузерах та браузері без інтерфейсу - Chrome та Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, LambdaTest
    - Кілька звітів (Spec, Xunit/Junit, Allure, JSON) та розміщення звітів Allure та Xunit/Junit на веб-сервері.
    - Приклади читання/запису даних з MS-Excel для легкого керування тестовими даними із зовнішніх джерел з прикладами
    - Приклади підключення до бази даних будь-якої RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання будь-яких запитів / отримання набору результатів і т.д. з прикладами для E2E тестування
    - Спеціальні файли `.config` для BrowserStack, Sauce Labs, LambdaTest та Appium (для відтворення на мобільному пристрої). Для швидкого налаштування Appium на локальній машині для iOS та Android звертайтеся до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Цей проєкт-шаблон має тести WebdriverIO 8 з cucumber та typescript, слідуючи паттерну об'єктів сторінок.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Features:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - Підтримка кількох браузерів
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Паралельне виконання в різних браузерах
    - Appium
    - Інтеграція з хмарним тестуванням BrowserStack & Sauce Labs
    - Docker service
    - Share data service
    - Окремі файли конфігурації для кожного сервісу
    - Керування тестовими даними і читання за типом користувача
    - Звітність
      - Dot
      - Spec
      - Multiple cucumber html report з скріншотами помилок
    - Gitlab pipelines для репозиторію Gitlab
    - Github actions для репозиторію Github
    - Docker compose для налаштування docker hub
    - Тестування доступності за допомогою AXE
    - Візуальне тестування за допомогою Applitools
    - Механізм логування


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Містить зразок тестового сценарію в cucumber
    - Інтегровані HTML-звіти cucumber з вбудованими відео при невдачах
    - Інтегровані сервіси Lambdatest та CircleCI
    - Інтегроване візуальне, тестування доступності та API тестування
    - Інтегрована функціональність електронної пошти
    - Інтегрований s3 bucket для зберігання та отримання тестових звітів

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) шаблонний проєкт, щоб допомогти вам почати приймальне тестування ваших веб-додатків за допомогою найновіших WebdriverIO, Mocha та Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні скріншоти при невдалому тесті, вбудовані у звіти
    - Налаштування Continuous Integration (CI) з використанням [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) шаблонний проєкт, щоб допомогти вам почати приймальне тестування ваших веб-додатків за допомогою найновіших WebdriverIO, Cucumber та Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні скріншоти при невдалому тесті, вбудовані у звіти
    - Налаштування Continuous Integration (CI) з використанням [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Проєкт-шаблон для запуску тестів WebdriverIO в хмарі Headspin (https://www.headspin.io/) за допомогою функцій Cucumber та паттерну об'єктів сторінок.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Хмарна інтеграція з [Headspin](https://www.headspin.io/)
    - Підтримує Page Object Model
    - Містить зразки сценаріїв, написаних у декларативному стилі BDD
    - Інтегровані HTML-звіти cucumber

# v7 Готові проєкти-шаблони
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Проєкт-шаблон для запуску тестів Appium з WebdriverIO для:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome та iOS Safari browser

Цей шаблон включає наступне:

- Framework: Mocha
- Features:
    - Конфігурації для:
        - iOS та Android додатків
        - iOS та Android браузерів
    - Допоміжні функції для:
        - WebView
        - Gestures
        - Native alerts
        - Pickers
     - Приклади тестів для:
        - WebView
        - Login
        - Forms
        - Swipe
        - Browsers

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB тести з Mocha, WebdriverIO v6 з PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Features
  - [Page Object](pageobjects) Model
  - Інтеграція з Sauce Labs з [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Звіт Allure
  - Автоматичне створення знімків екрана для тестів, що не пройшли
  - Приклад CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Проєкт-шаблон для запуску E2E тестів з Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Features:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Visual regression tests](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Page Object Pattern
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) та [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Приклад Github Actions
    -   Allure report (скріншоти при помилці)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Проєкт-шаблон для запуску тестів **WebdriverIO v7** для наступного:

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

Шаблонний проєкт для:

- Capture Network Logs
- Capture all GET/POST calls or a specific REST API
- Assert Request parameters
- Assert Response parameters
- Store all the response in a separate file

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Проєкт-шаблон для запуску тестів appium для нативних і мобільних браузерів з використанням cucumber v7 і wdio v7 з шаблоном об'єктів сторінок.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Features
    - Native Android та iOS apps
    - Android Chrome browser
    - iOS Safari browser
    - Page Object Model
    - Містить зразки тестових сценаріїв у cucumber
    - Інтегрований з кількома HTML-звітами cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Це шаблонний проєкт, який допоможе вам показати, як ви можете запускати тести webdriverio з веб-додатків, використовуючи останні WebdriverIO та фреймворк Cucumber. Цей проєкт призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO в docker

Цей проєкт включає:

- DockerFile
- проєкт cucumber

Детальніше: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Це шаблонний проєкт, який допоможе вам показати, як ви можете запускати тести electronJS за допомогою WebdriverIO. Цей проєкт призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO electronJS.

Цей проєкт включає:

- Зразок додатку electronjs
- Зразок тестових скриптів cucumber

Детальніше: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Це шаблонний проєкт, який допоможе вам показати, як ви можете автоматизувати програми Windows за допомогою winappdriver та WebdriverIO. Цей проєкт призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести windappdriver та WebdriverIO.

Детальніше: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Це шаблонний проєкт, який допоможе вам показати, як ви можете запускати можливість multiremote webdriverio з останнім WebdriverIO та фреймворком Jasmine. Цей проєкт призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO в docker

Цей проєкт використовує:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Шаблонний проєкт для запуску тестів appium на реальних пристроях Roku з використанням mocha та шаблону об'єктів сторінок.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure Reporting

- Features
    - Page Object Model
    - Typescript
    - Скріншот при невдачі
    - Приклади тестів з використанням тестового каналу Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-проєкт для E2E тестів Multiremote Cucumber та тестів Mocha з керуванням даними

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Features:
    - Тести E2E на основі Cucumber
    - Тести з керуванням даними на основі Mocha
    - Лише веб-тести - як у локальному середовищі, так і на хмарних платформах
    - Лише мобільні тести - локальні та віддалені хмарні емулятори (або пристрої)
    - Веб + мобільні тести - Multiremote - як у локальному середовищі, так і на хмарних платформах
    - Інтегровано кілька звітів, включаючи Allure
    - Дані тестування (JSON / XLSX) обробляються глобально, щоб записати дані (створені на льоту) у файл після виконання тесту
    - Github workflow для запуску тесту та завантаження звіту allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Це проєкт-шаблон, який допоможе показати, як запускати webdriverio multi-remote за допомогою сервісу appium та chromedriver з останньою версією WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Features
  - Модель [Page Object](pageobjects)
  - Typescript
  - Тести Web + Mobile - Multiremote
  - Нативні додатки Android та iOS
  - Appium
  - Chromedriver
  - ESLint
  - Приклади тестів для входу на http://the-internet.herokuapp.com та [WebdriverIO нативний демо-додаток](https://github.com/webdriverio/native-demo-app)