---
id: boilerplates
title: Проекти-шаблони
---

З часом наша спільнота розробила кілька проектів, які ви можете використати як натхнення для налаштування власного тестового набору.

# v9 Проекти-шаблони

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Наш власний шаблон для тестових наборів Cucumber. Ми створили понад 150 попередньо визначених визначень кроків для вас, тож ви можете почати писати файли функцій у вашому проекті відразу.

- Фреймворк:
    - Cucumber
    - WebdriverIO
- Особливості:
    - Понад 150 попередньо визначених кроків, які покривають майже все, що вам потрібно
    - Інтегрує функціональність Multiremote WebdriverIO
    - Власний демо-додаток

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Проект-шаблон для запуску тестів WebdriverIO з Jasmine, використовуючи функції Babel та патерн об'єктів сторінки.

- Фреймворки
    - WebdriverIO
    - Jasmine
- Особливості
    - Патерн об'єктів сторінки
    - Інтеграція з Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Проект-шаблон для запуску тестів WebdriverIO на мінімальному додатку Electron.

- Фреймворки
    - WebdriverIO
    - Mocha
- Особливості
    - Моккінг Electron API

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Цей проект-шаблон містить мобільні тести WebdriverIO 9 з Cucumber, TypeScript та Appium для платформ Android та iOS, за патерном об'єктів сторінки. Включає комплексне логування, звітування, мобільні жести, навігацію з додатку до веб, та інтеграцію CI/CD.

- Фреймворки:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Особливості:
    - Підтримка кількох платформ
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Мобільні жести
      - Прокрутка
      - Свайп
      - Довге натискання
      - Приховування клавіатури
    - Навігація з додатку до веб
      - Перемикання контексту
      - Підтримка WebView
      - Автоматизація браузерів (Chrome/Safari)
    - Свіжий стан додатку
      - Автоматичне скидання додатку між сценаріями
      - Налаштовувана поведінка скидання (noReset, fullReset)
    - Конфігурація пристрою
      - Централізоване керування пристроєм
      - Просте перемикання платформ
    - Приклад структури каталогів для JavaScript / TypeScript. Нижче наведена версія для JS, TS версія має таку ж структуру.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Автоматично генеруйте класи Page Object WebdriverIO та тестові специфікації Mocha з файлів .feature Gherkin — зменшуючи ручну роботу, покращуючи узгодженість та прискорюючи автоматизацію QA. Цей проект не лише виробляє коди, сумісні з webdriver.io, але й покращує всі функціональності webdriver.io. Ми створили дві версії: одну для користувачів JavaScript, іншу для користувачів TypeScript. Але обидва проекти працюють однаково.

***Як це працює?***
- Процес слідує двоетапній автоматизації:
- Крок 1: Gherkin до stepMap (Генерація файлів stepMap.json)
  - Генерація файлів stepMap.json:
    - Аналізує файли .feature, написані на синтаксисі Gherkin.
    - Витягує сценарії та кроки.
    - Створює структурований файл .stepMap.json, що містить:
      - дію для виконання (наприклад, click, setText, assertVisible)
      - selectorName для логічного відображення
      - selector для елемента DOM
      - примітку для значень або перевірок
- Крок 2: stepMap до Коду (Генерація коду WebdriverIO).
  Використовує stepMap.json для генерації:
  - Генерує базовий клас page.js зі спільними методами та налаштуваннями browser.url().
  - Генерує сумісні з WebdriverIO класи за патерном об'єктів сторінки (POM) на функцію всередині test/pageobjects/.
  - Генерує тестові специфікації на базі Mocha.
- Приклад структури каталогів для JavaScript / TypeScript. Нижче наведена версія для JS, TS версія має таку ж структуру.
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
# v8 Проекти-шаблони

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Фреймворк: WDIO-V8 з Cucumber (V8x).
- Особливості:
    - Page Objects Model використовує класовий підхід ES6/ES7 та підтримку TypeScript
    - Приклади опції множинного селектора для запиту елемента з кількома селекторами одночасно
    - Приклади виконання в багатьох браузерах та безголових браузерах - Chrome та Firefox
    - Інтеграція хмарного тестування з BrowserStack, Sauce Labs, TestMu AI (раніше LambdaTest)
    - Приклади читання/запису даних з MS-Excel для легкого управління тестовими даними з зовнішніх джерел даних
    - Підтримка бази даних для будь-якої RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання запитів / отримання результатів тощо. з прикладами для тестування E2E
    - Множинна звітність (Spec, Xunit/Junit, Allure, JSON) та хостинг звітів Allure та Xunit/Junit на веб-сервері.
    - Приклади з демо-додатками https://search.yahoo.com/ та http://the-internet.herokuapp.com.
    - Специфічний `.config` файл для BrowserStack, Sauce Labs, TestMu AI (раніше LambdaTest) та Appium (для відтворення на мобільному пристрої). Для швидкого налаштування Appium на локальній машині для iOS та Android зверніться до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Фреймворк: WDIO-V8 з Mocha (V10x).
- Особливості:
    -  Page Objects Model використовує класовий підхід ES6/ES7 та підтримку TypeScript
    -  Приклади з демо-додатками https://search.yahoo.com та http://the-internet.herokuapp.com
    -  Приклади виконання в багатьох браузерах та безголових браузерах - Chrome та Firefox
    -  Інтеграція хмарного тестування з BrowserStack, Sauce Labs, TestMu AI (раніше LambdaTest)
    -  Множинна звітність (Spec, Xunit/Junit, Allure, JSON) та хостинг звітів Allure та Xunit/Junit на веб-сервері.
    -  Приклади читання/запису даних з MS-Excel для легкого управління тестовими даними з зовнішніх джерел даних
    -  Приклади підключення до БД для будь-якої RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання запитів / отримання результатів тощо. з прикладами для тестування E2E
    -  Специфічний `.config` файл для BrowserStack, Sauce Labs, TestMu AI (раніше LambdaTest) та Appium (для відтворення на мобільному пристрої). Для швидкого налаштування Appium на локальній машині для iOS та Android зверніться до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Фреймворк: WDIO-V8 з Jasmine (V4x).
- Особливості:
    -  Page Objects Model використовує класовий підхід ES6/ES7 та підтримку TypeScript
    -  Приклади з демо-додатками https://search.yahoo.com та http://the-internet.herokuapp.com
    -  Приклади виконання в багатьох браузерах та безголових браузерах - Chrome та Firefox
    -  Інтеграція хмарного тестування з BrowserStack, Sauce Labs, TestMu AI (раніше LambdaTest)
    -  Множинна звітність (Spec, Xunit/Junit, Allure, JSON) та хостинг звітів Allure та Xunit/Junit на веб-сервері.
    -  Приклади читання/запису даних з MS-Excel для легкого управління тестовими даними з зовнішніх джерел даних
    -  Приклади підключення до БД для будь-якої RDBMS (Oracle, MySql, TeraData, Vertica тощо), виконання запитів / отримання результатів тощо. з прикладами для тестування E2E
    -  Специфічний `.config` файл для BrowserStack, Sauce Labs, TestMu AI (раніше LambdaTest) та Appium (для відтворення на мобільному пристрої). Для швидкого налаштування Appium на локальній машині для iOS та Android зверніться до [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Цей проект-шаблон має тести WebdriverIO 8 з cucumber та typescript, слідуючи патерну об'єктів сторінки.

- Фреймворки:
    - WebdriverIO v8
    - Cucumber v8

- Особливості:
    - Typescript v5
    - Патерн об'єктів сторінки
    - Prettier
    - Підтримка багатьох браузерів
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Крос-браузерне паралельне виконання
    - Appium
    - Інтеграція хмарного тестування з BrowserStack і Sauce Labs
    - Docker сервіс
    - Сервіс поширення даних
    - Окремі файли конфігурації для кожного сервісу
    - Управління тестовими даними та читання за типом користувача
    - Звітність
      - Dot
      - Spec
      - Множинні звіти HTML cucumber зі знімками екрана при невдачі
    - Конвеєри Gitlab для репозиторію Gitlab
    - Github дії для репозиторію Github
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
    - Інтегровані звіти html cucumber з вбудованими відео при невдачі
    - Інтегровані послуги Lambdatest та CircleCI
    - Інтегроване візуальне, доступне та API тестування
    - Інтегрована функціональність електронної пошти
    - Інтегрований s3 bucket для зберігання та отримання тестових звітів

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Шаблонний проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), який допоможе вам почати прийомне тестування ваших веб-додатків за допомогою найновіших WebdriverIO, Mocha та Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Звітність Serenity BDD

- Особливості
    - [Патерн сценарію](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні знімки екрана при невдачі тесту, вбудовані у звіти
    - Налаштування безперервної інтеграції (CI) з використанням [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Шаблонний проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), який допоможе вам почати прийомне тестування ваших веб-додатків за допомогою найновіших WebdriverIO, Cucumber та Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Звітність Serenity BDD

- Особливості
    - [Патерн сценарію](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматичні знімки екрана при невдачі тесту, вбудовані у звіти
    - Налаштування безперервної інтеграції (CI) з використанням [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо звіти Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) опубліковані на GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Проект-шаблон для запуску тестів WebdriverIO в хмарі Headspin (https://www.headspin.io/) з використанням функцій Cucumber та паттерну об'єктів сторінки.
- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особливості
    - Інтеграція з хмарою [Headspin](https://www.headspin.io/)
    - Підтримує паттерн об'єктів моделі
    - Містить зразки сценаріїв, написаних у декларативному стилі BDD
    - Інтегровані HTML звіти cucumber

# v7 Проекти-шаблони
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Проект-шаблон для запуску тестів Appium з WebdriverIO для:

- iOS/Android нативних додатків
- iOS/Android гібридних додатків
- Браузерів Android Chrome та iOS Safari

Цей шаблон включає наступне:

- Фреймворк: Mocha
- Особливості:
    - Конфігурації для:
        - Додатків iOS та Android
        - Браузерів iOS та Android
    - Хелпери для:
        - WebView
        - Жестів
        - Нативних сповіщень
        - Селекторів
     - Приклади тестів для:
        - WebView
        - Логіну
        - Форм
        - Свайпів
        - Браузерів

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD веб-тести з Mocha, WebdriverIO v6 з PageObject

- Фреймворки
  - WebdriverIO (v7)
  - Mocha
- Особливості
  - Модель [Page Object](pageobjects)
  - Інтеграція з Sauce Labs з [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Звіт Allure
  - Автоматичні знімки екрана для тестів, що не пройшли
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
    -   Патерн об'єктів сторінки
    -   [Перевірка комітів](https://github.com/conventional-changelog/commitlint) та [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Приклад Github Actions
    -   Звіт Allure (знімки екрана при невдачі)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Проект-шаблон для запуску тестів **WebdriverIO v7** для наступного:

[WDIO 7 скрипти з TypeScript у фреймворку Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 скрипти з TypeScript у фреймворку Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Запуск скрипту WDIO 7 в Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Мережеві логи](https://github.com/17thSep/MonitorNetworkLogs/)

Шаблон проекту для:

- Захоплення мережевих логів
- Захоплення всіх викликів GET/POST або конкретного REST API
- Твердження параметрів запиту
- Твердження параметрів відповіді
- Зберігання всіх відповідей в окремому файлі

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Проект-шаблон для запуску тестів appium для нативних та мобільних браузерів з використанням cucumber v7 та wdio v7 з паттерном об'єктів сторінки.

- Фреймворки
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Особливості
    - Нативні додатки Android та iOS
    - Браузер Android Chrome
    - Браузер iOS Safari
    - Патерн об'єктів моделі
    - Містить приклади тестових сценаріїв в cucumber
    - Інтегровано з декількома звітами HTML cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Це шаблонний проект, який допомагає показати, як ви можете запускати тести webdriverio з веб-додатків, використовуючи найновіші WebdriverIO та фреймворк Cucumber. Цей проект призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO в docker.

Цей проект включає:

- DockerFile
- Проект cucumber

Читайте більше на: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Це шаблонний проект, який допомагає показати, як ви можете запускати тести electronJS за допомогою WebdriverIO. Цей проект призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO electronJS.

Цей проект включає:

- Приклад додатку electronjs
- Приклади тестових скриптів cucumber

Читайте більше на: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Це шаблонний проект, який допомагає показати, як ви можете автоматизувати додатки Windows з використанням winappdriver та WebdriverIO. Цей проект призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести windappdriver та WebdriverIO.

Читайте більше на: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Це шаблонний проект, який допомагає показати, як ви можете запускати можливість webdriverio multiremote з найновішими WebdriverIO та фреймворком Jasmine. Цей проект призначений для того, щоб служити базовим образом, який ви можете використовувати для розуміння того, як запускати тести WebdriverIO в docker.

Цей проект використовує:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Шаблонний проект для запуску тестів appium на реальних пристроях Roku з використанням mocha з паттерном об'єктів сторінки.

- Фреймворки
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Звітність Allure

- Особливості
    - Патерн об'єктів моделі
    - Typescript
    - Знімок екрана при невдачі
    - Приклади тестів з використанням зразкового каналу Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Проект PoC для E2E тестів Multiremote Cucumber, а також тестів Mocha на основі даних

- Фреймворк:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Особливості:
    - Тести E2E на основі Cucumber
    - Тести на основі даних Mocha
    - Тільки веб-тести - як в локальних, так і в хмарних платформах
    - Тільки мобільні тести - локальні та віддалені хмарні емулятори (або пристрої)
    - Веб + Мобільні тести - Multiremote - як локальні, так і хмарні платформи
    - Інтегровано кілька звітів, включаючи Allure
    - Тестові дані (JSON / XLSX) обробляються глобально, щоб записувати дані (створені на льоту) у файл після виконання тестів
    - Github workflow для запуску тесту та завантаження звіту allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Це проект-шаблон, щоб допомогти показати, як запускати webdriverio multi-remote з використанням сервісів appium та chromedriver з найновішим WebdriverIO.

- Фреймворки
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Особливості
  - Модель [Page Object](pageobjects)
  - Typescript
  - Веб + Мобільні тести - Multiremote
  - Нативні додатки для Android та iOS
  - Appium
  - Chromedriver
  - ESLint
  - Приклади тестів для входу в http://the-internet.herokuapp.com та [нативний демо-додаток WebdriverIO](https://github.com/webdriverio/native-demo-app)