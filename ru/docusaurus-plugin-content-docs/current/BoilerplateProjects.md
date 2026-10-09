---
id: boilerplates
title: Шаблонные проекты
description: "Ознакомьтесь с шаблонными проектами сообщества для WebdriverIO с Mocha, Jasmine, Cucumber, Electron и мобильными конфигурациями, чтобы быстро создать собственный набор тестов."
---

Со временем наше сообщество разработало несколько проектов, которые вы можете использовать как источник вдохновения для настройки собственного набора тестов.

# Шаблонные проекты v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Наш собственный шаблон для наборов тестов Cucumber. Мы создали для вас более 150 предопределённых определений шагов, так что вы можете сразу начать писать feature-файлы в своём проекте.

- Фреймворк:
    - Cucumber
    - WebdriverIO
- Возможности:
    - Более 150 предопределённых шагов, которые покрывают почти всё, что вам нужно
    - Интеграция функциональности multi-remote из WebdriverIO
    - Собственное демо-приложение

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Шаблонный проект для запуска тестов WebdriverIO с Jasmine с использованием возможностей Babel и паттерна Page Object.

- Фреймворки
    - WebdriverIO
    - Jasmine
- Возможности
    - Паттерн Page Object
    - Интеграция с Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Шаблонный проект для запуска тестов WebdriverIO на минимальном Electron-приложении.

- Фреймворки
    - WebdriverIO
    - Mocha
- Возможности
    - Мокирование Electron API

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Этот шаблонный проект содержит мобильные тесты WebdriverIO 9 с Cucumber, TypeScript и Appium для платформ Android и iOS, построенные по паттерну Page Object Model. Включает подробное логирование, отчёты, мобильные жесты, переход из приложения в веб и интеграцию с CI/CD.

- Фреймворки:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Возможности:
    - Поддержка нескольких платформ
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Мобильные жесты
      - Прокрутка
      - Свайп
      - Долгое нажатие
      - Скрытие клавиатуры
    - Переход из приложения в веб
      - Переключение контекста
      - Поддержка WebView
      - Автоматизация браузера (Chrome/Safari)
    - Чистое состояние приложения
      - Автоматический сброс приложения между сценариями
      - Настраиваемое поведение сброса (noReset, fullReset)
    - Конфигурация устройств
      - Централизованное управление устройствами
      - Простое переключение платформ
    - Пример структуры каталогов для JavaScript / TypeScript. Ниже приведена версия для JS, версия для TS имеет такую же структуру.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Автоматически генерирует классы Page Object для WebdriverIO и тестовые спецификации Mocha из файлов Gherkin .feature — сокращая ручной труд, повышая согласованность и ускоряя автоматизацию QA. Этот проект не только генерирует код, совместимый с webdriver.io, но и расширяет все функциональные возможности webdriver.io. Мы создали два варианта: один для пользователей JavaScript, другой для пользователей TypeScript. Но оба проекта работают одинаково.

***Как это работает?***
- Процесс состоит из двух этапов автоматизации:
- Этап 1: Gherkin в stepMap (генерация файлов stepMap.json)
  - Генерация файлов stepMap.json:
    - Разбирает файлы .feature, написанные с использованием синтаксиса Gherkin.
    - Извлекает сценарии и шаги.
    - Создаёт структурированный файл .stepMap.json, содержащий:
      - action — выполняемое действие (например, click, setText, assertVisible)
      - selectorName для логического сопоставления
      - selector для DOM-элемента
      - note для значений или проверок
- Этап 2: stepMap в код (генерация кода WebdriverIO).
  Использует stepMap.json для генерации:
  - Базового класса page.js с общими методами и настройкой browser.url().
  - Совместимых с WebdriverIO классов Page Object Model (POM) для каждой фичи внутри test/pageobjects/.
  - Тестовых спецификаций на основе Mocha.
- Пример структуры каталогов для JavaScript / TypeScript. Ниже приведена версия для JS, версия для TS имеет такую же структуру.
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
# Шаблонные проекты v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Фреймворк: WDIO-V8 с Cucumber (V8x).
- Возможности:
    - Page Objects Model с подходом на основе классов в стиле ES6 /ES7 и поддержкой TypeScript
    - Примеры использования нескольких селекторов для поиска элемента сразу по более чем одному селектору
    - Примеры запуска в нескольких браузерах и в headless-режиме с использованием Chrome и Firefox
    - Интеграция облачного тестирования с BrowserStack, Sauce Labs, TestMu AI (ранее LambdaTest)
    - Примеры чтения/записи данных из MS-Excel для удобного управления тестовыми данными из внешних источников
    - Поддержка любых РСУБД (Oracle, MySql, TeraData, Vertica и т. д.), выполнение любых запросов / получение наборов результатов и т. д. с примерами для E2E-тестирования
    - Множественные отчёты (Spec, Xunit/Junit, Allure, JSON) и размещение отчётов Allure и Xunit/Junit на веб-сервере.
    - Примеры с демо-приложениями https://search.yahoo.com/  и http://the-internet.herokuapp.com.
    - Специальные файлы `.config` для BrowserStack, Sauce Labs, TestMu AI (ранее LambdaTest) и Appium (для воспроизведения на мобильном устройстве). Для настройки Appium в один клик на локальной машине для iOS и Android см. [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Фреймворк: WDIO-V8 с Mocha (V10x).
- Возможности:
    -  Page Objects Model с подходом на основе классов в стиле ES6 /ES7 и поддержкой TypeScript
    -  Примеры с демо-приложениями https://search.yahoo.com  и http://the-internet.herokuapp.com
    -  Примеры запуска в нескольких браузерах и в headless-режиме с использованием Chrome и Firefox
    -  Интеграция облачного тестирования с BrowserStack, Sauce Labs, TestMu AI (ранее LambdaTest)
    -  Множественные отчёты (Spec, Xunit/Junit, Allure, JSON) и размещение отчётов Allure и Xunit/Junit на веб-сервере.
    -  Примеры чтения/записи данных из MS-Excel для удобного управления тестовыми данными из внешних источников
    -  Примеры подключения к любым РСУБД (Oracle, MySql, TeraData, Vertica и т. д.), выполнения любых запросов / получения наборов результатов и т. д. с примерами для E2E-тестирования
    -  Специальные файлы `.config` для BrowserStack, Sauce Labs, TestMu AI (ранее LambdaTest) и Appium (для воспроизведения на мобильном устройстве). Для настройки Appium в один клик на локальной машине для iOS и Android см. [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Фреймворк: WDIO-V8 с Jasmine (V4x).
- Возможности:
    -  Page Objects Model с подходом на основе классов в стиле ES6 /ES7 и поддержкой TypeScript
    -  Примеры с демо-приложениями https://search.yahoo.com  и http://the-internet.herokuapp.com
    -  Примеры запуска в нескольких браузерах и в headless-режиме с использованием Chrome и Firefox
    -  Интеграция облачного тестирования с BrowserStack, Sauce Labs, TestMu AI (ранее LambdaTest)
    -  Множественные отчёты (Spec, Xunit/Junit, Allure, JSON) и размещение отчётов Allure и Xunit/Junit на веб-сервере.
    -  Примеры чтения/записи данных из MS-Excel для удобного управления тестовыми данными из внешних источников
    -  Примеры подключения к любым РСУБД (Oracle, MySql, TeraData, Vertica и т. д.), выполнения любых запросов / получения наборов результатов и т. д. с примерами для E2E-тестирования
    -  Специальные файлы `.config` для BrowserStack, Sauce Labs, TestMu AI (ранее LambdaTest) и Appium (для воспроизведения на мобильном устройстве). Для настройки Appium в один клик на локальной машине для iOS и Android см. [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Этот шаблонный проект содержит тесты WebdriverIO 8 с Cucumber и TypeScript, построенные по паттерну Page Object.

- Фреймворки:
    - WebdriverIO v8
    - Cucumber v8

- Возможности:
    - Typescript v5
    - Паттерн Page Object
    - Prettier
    - Поддержка нескольких браузеров
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Параллельный кроссбраузерный запуск
    - Appium
    - Интеграция облачного тестирования с BrowserStack и Sauce Labs
    - Сервис Docker
    - Сервис обмена данными
    - Отдельные файлы конфигурации для каждого сервиса
    - Управление тестовыми данными и их чтение по типу пользователя
    - Отчёты
      - Dot
      - Spec
      - Multiple cucumber html report со скриншотами при сбоях
    - Пайплайны Gitlab для репозитория Gitlab
    - Github Actions для репозитория Github
    - Docker compose для настройки docker hub
    - Тестирование доступности с помощью AXE
    - Визуальное тестирование с помощью Applitools
    - Механизм логирования


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Возможности
    - Содержит пример тестового сценария на cucumber
    - Интегрированные cucumber html-отчёты со встроенными видео при сбоях
    - Интегрированные сервисы Lambdatest и CircleCI
    - Интегрированное визуальное тестирование, тестирование доступности и API
    - Интегрированная функциональность электронной почты
    - Интегрированный s3 bucket для хранения и получения тестовых отчётов

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Шаблонный проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), который поможет вам начать приёмочное тестирование ваших веб-приложений с использованием последних версий WebdriverIO, Mocha и Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Отчёты Serenity BDD

- Возможности
    - [Паттерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматические скриншоты при сбое теста, встроенные в отчёты
    - Настройка непрерывной интеграции (CI) с помощью [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демонстрационные отчёты Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубликованные на GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Шаблонный проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), который поможет вам начать приёмочное тестирование ваших веб-приложений с использованием последних версий WebdriverIO, Cucumber и Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Отчёты Serenity BDD

- Возможности
    - [Паттерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматические скриншоты при сбое теста, встроенные в отчёты
    - Настройка непрерывной интеграции (CI) с помощью [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демонстрационные отчёты Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубликованные на GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Шаблонный проект для запуска тестов WebdriverIO в облаке Headspin (https://www.headspin.io/) с использованием возможностей Cucumber и паттерна Page Object.
- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Возможности
    - Облачная интеграция с [Headspin](https://www.headspin.io/)
    - Поддержка Page Object Model
    - Содержит примеры сценариев, написанных в декларативном стиле BDD
    - Интегрированные cucumber html-отчёты

# Шаблонные проекты v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Шаблонный проект для запуска тестов Appium с WebdriverIO для:

- Нативных приложений iOS/Android
- Гибридных приложений iOS/Android
- Браузеров Chrome на Android и Safari на iOS

Этот шаблон включает следующее:

- Фреймворк: Mocha
- Возможности:
    - Конфигурации для:
        - Приложений iOS и Android
        - Браузеров iOS и Android
    - Хелперы для:
        - WebView
        - Жестов
        - Нативных алертов
        - Пикеров
     - Примеры тестов для:
        - WebView
        - Входа в систему
        - Форм
        - Свайпа
        - Браузеров

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD веб-тесты с Mocha, WebdriverIO v6 с PageObject

- Фреймворки
  - WebdriverIO (v7)
  - Mocha
- Возможности
  - Модель [Page Object](pageobjects)
  - Интеграция с Sauce Labs через [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Отчёт Allure
  - Автоматическое создание скриншотов для упавших тестов
  - Пример для CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Шаблонный проект для запуска E2E-тестов с Mocha.

- Фреймворки:
    - WebdriverIO (v7)
    - Mocha
- Возможности:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Визуальные регрессионные тесты](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Паттерн Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) и [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Пример Github Actions
    -   Отчёт Allure (скриншоты при сбое)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Шаблонный проект для запуска тестов **WebdriverIO v7** для следующего:

[Скрипты WDIO 7 с TypeScript во фреймворке Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Скрипты WDIO 7 с TypeScript во фреймворке Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Запуск скрипта WDIO 7 в Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Сетевые логи](https://github.com/17thSep/MonitorNetworkLogs/)

Шаблонный проект для:

- Сбора сетевых логов
- Перехвата всех вызовов GET/POST или конкретного REST API
- Проверки параметров запроса
- Проверки параметров ответа
- Сохранения всех ответов в отдельный файл

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Шаблонный проект для запуска тестов appium для нативных приложений и мобильных браузеров с использованием cucumber v7 и wdio v7 по паттерну Page Object.

- Фреймворки
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Возможности
    - Нативные приложения Android и iOS
    - Браузер Chrome на Android
    - Браузер Safari на iOS
    - Page Object Model
    - Содержит примеры тестовых сценариев на cucumber
    - Интеграция с multiple cucumber html reports

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Это шаблонный проект, который показывает, как запускать тесты webdriverio для веб-приложений с использованием последних версий WebdriverIO и фреймворка Cucumber. Этот проект задуман как базовый образ, на примере которого можно понять, как запускать тесты WebdriverIO в docker

Этот проект включает:

- DockerFile
- Проект cucumber

Подробнее: [Блог на Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Это шаблонный проект, который показывает, как запускать тесты electronJS с помощью WebdriverIO. Этот проект задуман как базовый образ, на примере которого можно понять, как запускать тесты electronJS с WebdriverIO.

Этот проект включает:

- Пример приложения electronjs
- Примеры тестовых скриптов cucumber

Подробнее: [Блог на Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Это шаблонный проект, который показывает, как автоматизировать Windows-приложения с помощью winappdriver и WebdriverIO. Этот проект задуман как базовый образ, на примере которого можно понять, как запускать тесты с windappdriver и WebdriverIO.

Подробнее: [Блог на Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Это шаблонный проект, который показывает, как использовать возможность multi-remote в webdriverio с последней версией WebdriverIO и фреймворком Jasmine. Этот проект задуман как базовый образ, на примере которого можно понять, как запускать тесты WebdriverIO в docker

Этот проект использует:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Шаблонный проект для запуска тестов appium на реальных устройствах Roku с использованием mocha по паттерну Page Object.

- Фреймворки
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Отчёты Allure

- Возможности
    - Page Object Model
    - Typescript
    - Скриншот при сбое
    - Примеры тестов с использованием демонстрационного канала Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-проект для E2E multi-remote тестов на Cucumber, а также тестов Mocha, управляемых данными

- Фреймворк:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Возможности:
    - E2E-тесты на основе Cucumber
    - Тесты, управляемые данными, на основе Mocha
    - Только веб-тесты — локально, а также на облачных платформах
    - Только мобильные тесты — на локальных, а также удалённых облачных эмуляторах (или устройствах)
    - Веб + мобильные тесты — multi-remote — локально, а также на облачных платформах
    - Интеграция нескольких отчётов, включая Allure
    - Тестовые данные (JSON / XLSX) обрабатываются глобально, чтобы записывать данные (созданные на лету) в файл после выполнения тестов
    - Github workflow для запуска тестов и загрузки отчёта allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Это шаблонный проект, который показывает, как запускать webdriverio в режиме multi-remote с использованием сервисов appium и chromedriver в последней версии WebdriverIO.

- Фреймворки
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Возможности
  - Модель [Page Object](pageobjects)
  - Typescript
  - Веб + мобильные тесты — multi-remote
  - Нативные приложения Android и iOS
  - Appium
  - Chromedriver
  - ESLint
  - Примеры тестов входа в систему на http://the-internet.herokuapp.com и в [нативном демо-приложении WebdriverIO](https://github.com/webdriverio/native-demo-app)