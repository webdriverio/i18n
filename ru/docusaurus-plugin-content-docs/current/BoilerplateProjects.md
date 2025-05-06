---
id: boilerplates
title: Шаблонные проекты
---

Со временем наше сообщество разработало несколько проектов, которые вы можете использовать в качестве вдохновения для настройки собственного набора тестов.

# Шаблонные проекты v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Наш собственный шаблон для тестовых наборов Cucumber. Мы создали более 150 предопределенных определений шагов для вас, чтобы вы могли сразу начать писать файлы функций в своем проекте.

- Фреймворк:
    - Cucumber
    - WebdriverIO
- Особенности:
    - Более 150 предопределенных шагов, которые охватывают почти все, что вам нужно
    - Интегрирует функциональность Multiremote WebdriverIO
    - Собственное демо-приложение

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Шаблонный проект для запуска тестов WebdriverIO с Jasmine, использующий возможности Babel и паттерн объектов страниц.

- Фреймворки
    - WebdriverIO
    - Jasmine
- Особенности
    - Паттерн объектов страниц
    - Интеграция с Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Шаблонный проект для запуска тестов WebdriverIO на минимальном приложении Electron.

- Фреймворки
    - WebdriverIO
    - Mocha
- Особенности
    - Мокирование API Electron

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Автоматически генерирует классы Page Object WebdriverIO и тестовые спецификации Mocha из файлов .feature Gherkin — уменьшая ручные усилия, улучшая согласованность и ускоряя автоматизацию QA. Этот проект не только создает код, совместимый с webdriver.io, но и расширяет все функциональные возможности webdriver.io.

***Как это работает?***
- Процесс следует двухэтапной автоматизации:
- Шаг 1: Gherkin to stepMap (Создание файлов stepMap.json)
  - Создание файлов stepMap.json:
    - Анализирует файлы .feature, написанные в синтаксисе Gherkin.
    - Извлекает сценарии и шаги.
    - Создает структурированный файл .stepMap.json, содержащий:
      - действие для выполнения (например, click, setText, assertVisible)
      - selectorName для логического сопоставления
      - selector для элемента DOM
      - note для значений или утверждений
- Шаг 2: stepMap to Code (Создание кода WebdriverIO).
  Использует stepMap.json для создания:
  - Создает базовый класс page.js с общими методами и настройкой browser.url().
  - Создает совместимые с WebdriverIO классы Page Object Model (POM) для каждой функции внутри test/pageobjects/.
  - Создает тестовые спецификации на основе Mocha.
- Структура директорий
```
project-root/
├── features/               # Входные файлы функций Gherkin
├── stepMaps/               # Сгенерированные карты шагов (JSON)
├── test/
│   ├── pageobjects/        # Сгенерированный базовый класс Page, классы Page Object
│   └── specs/              # Сгенерированные тестовые спецификации
├── generateStepMap.js      # Скрипт генератора StepMap
├── generateTestsFromMap.js # Генератор PageObject + тестовых спецификаций
├── package.json
├── README.md
└── wdio.conf.js
```
---
# Шаблонные проекты v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Фреймворк: WDIO-V8 с Cucumber (V8x).
- Особенности:
    - Page Objects Model использует подход на основе классов ES6/ES7 и поддержку TypeScript
    - Примеры опции мульти-селектора для запроса элемента с более чем одним селектором одновременно
    - Примеры выполнения в нескольких браузерах и безголовых браузерах с использованием Chrome и Firefox
    - Интеграция облачного тестирования с BrowserStack, Sauce Labs, LambdaTest
    - Примеры чтения/записи данных из MS-Excel для удобного управления тестовыми данными из внешних источников с примерами
    - Поддержка базы данных для любой RDBMS (Oracle, MySql, TeraData, Vertica и т.д.), выполнение любых запросов / получение наборов результатов и т.д. с примерами для E2E-тестирования
    - Множественные отчеты (Spec, Xunit/Junit, Allure, JSON) и размещение отчетов Allure и Xunit/Junit на веб-сервере.
    - Примеры с демо-приложениями https://search.yahoo.com/ и http://the-internet.herokuapp.com.
    - Специфичные файлы `.config` для BrowserStack, Sauce Labs, LambdaTest и Appium (для воспроизведения на мобильных устройствах). Для быстрой настройки Appium на локальной машине для iOS и Android обратитесь к [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Фреймворк: WDIO-V8 с Mocha (V10x).
- Особенности:
    - Page Objects Model использует подход на основе классов ES6/ES7 и поддержку TypeScript
    - Примеры с демо-приложениями https://search.yahoo.com и http://the-internet.herokuapp.com
    - Примеры выполнения в нескольких браузерах и безголовых браузерах с использованием Chrome и Firefox
    - Интеграция облачного тестирования с BrowserStack, Sauce Labs, LambdaTest
    - Множественные отчеты (Spec, Xunit/Junit, Allure, JSON) и размещение отчетов Allure и Xunit/Junit на веб-сервере.
    - Примеры чтения/записи данных из MS-Excel для удобного управления тестовыми данными из внешних источников с примерами
    - Примеры подключения к БД для любой RDBMS (Oracle, MySql, TeraData, Vertica и т.д.), выполнение любых запросов / получение наборов результатов и т.д. с примерами для E2E-тестирования
    - Специфичные файлы `.config` для BrowserStack, Sauce Labs, LambdaTest и Appium (для воспроизведения на мобильных устройствах). Для быстрой настройки Appium на локальной машине для iOS и Android обратитесь к [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Фреймворк: WDIO-V8 с Jasmine (V4x).
- Особенности:
    - Page Objects Model использует подход на основе классов ES6/ES7 и поддержку TypeScript
    - Примеры с демо-приложениями https://search.yahoo.com и http://the-internet.herokuapp.com
    - Примеры выполнения в нескольких браузерах и безголовых браузерах с использованием Chrome и Firefox
    - Интеграция облачного тестирования с BrowserStack, Sauce Labs, LambdaTest
    - Множественные отчеты (Spec, Xunit/Junit, Allure, JSON) и размещение отчетов Allure и Xunit/Junit на веб-сервере.
    - Примеры чтения/записи данных из MS-Excel для удобного управления тестовыми данными из внешних источников с примерами
    - Примеры подключения к БД для любой RDBMS (Oracle, MySql, TeraData, Vertica и т.д.), выполнение любых запросов / получение наборов результатов и т.д. с примерами для E2E-тестирования
    - Специфичные файлы `.config` для BrowserStack, Sauce Labs, LambdaTest и Appium (для воспроизведения на мобильных устройствах). Для быстрой настройки Appium на локальной машине для iOS и Android обратитесь к [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Этот шаблонный проект содержит тесты WebdriverIO 8 с cucumber и typescript, следуя паттерну объектов страницы.

- Фреймворки:
    - WebdriverIO v8
    - Cucumber v8

- Особенности:
    - Typescript v5
    - Паттерн объектов страницы
    - Prettier
    - Поддержка нескольких браузеров
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Кроссбраузерное параллельное выполнение
    - Appium
    - Интеграция облачного тестирования с BrowserStack и Sauce Labs
    - Сервис Docker
    - Сервис обмена данными
    - Отдельные файлы конфигурации для каждого сервиса
    - Управление тестовыми данными и чтение по типу пользователя
    - Отчетность
      - Dot
      - Spec
      - Множественный HTML-отчет cucumber со скриншотами при сбоях
    - Пайплайны Gitlab для репозитория Gitlab
    - Github Actions для репозитория Github
    - Docker compose для настройки хаба docker
    - Тестирование доступности с использованием AXE
    - Визуальное тестирование с использованием Applitools
    - Механизм логирования


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особенности
    - Содержит пример тестового сценария в cucumber
    - Интегрированные html-отчеты cucumber со встроенными видео при сбоях
    - Интегрированные сервисы Lambdatest и CircleCI
    - Интегрированное визуальное тестирование, тестирование доступности и API
    - Интегрированная функциональность электронной почты
    - Интегрированное хранилище S3 для хранения и получения тестовых отчетов

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Шаблонный проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), который поможет вам начать приемочное тестирование ваших веб-приложений с использованием последних версий WebdriverIO, Mocha и Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Отчетность Serenity BDD

- Особенности
    - [Паттерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматические скриншоты при сбое теста, встроенные в отчеты
    - Настройка непрерывной интеграции (CI) с использованием [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-отчеты Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубликованные на GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Шаблонный проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), который поможет вам начать приемочное тестирование ваших веб-приложений с использованием последних версий WebdriverIO, Cucumber и Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Отчетность Serenity BDD

- Особенности
    - [Паттерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматические скриншоты при сбое теста, встроенные в отчеты
    - Настройка непрерывной интеграции (CI) с использованием [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демо-отчеты Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубликованные на GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Шаблонный проект для запуска тестов WebdriverIO в облаке Headspin (https://www.headspin.io/) с использованием функций Cucumber и паттерна объектов страниц.
- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особенности
    - Облачная интеграция с [Headspin](https://www.headspin.io/)
    - Поддерживает паттерн объектов страниц
    - Содержит примеры сценариев, написанных в декларативном стиле BDD
    - Интегрированные HTML-отчеты cucumber

# Шаблонные проекты v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Шаблонный проект для запуска тестов Appium с WebdriverIO для:

- Нативных приложений iOS/Android
- Гибридных приложений iOS/Android
- Браузеров Android Chrome и iOS Safari

Этот шаблон включает следующее:

- Фреймворк: Mocha
- Особенности:
    - Конфигурации для:
        - Приложений iOS и Android
        - Браузеров iOS и Android
    - Хелперы для:
        - WebView
        - Жестов
        - Нативных уведомлений
        - Пикеров
     - Примеры тестов для:
        - WebView
        - Логина
        - Форм
        - Свайпов
        - Браузеров

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB тесты с Mocha, WebdriverIO v6 с PageObject

- Фреймворки
  - WebdriverIO (v7)
  - Mocha
- Особенности
  - Модель [Page Object](pageobjects)
  - Интеграция с Sauce Labs с [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Отчет Allure
  - Автоматический захват скриншотов для неудачных тестов
  - Пример CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Шаблонный проект для запуска E2E тестов с Mocha.

- Фреймворки:
    - WebdriverIO (v7)
    - Mocha
- Особенности:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Тесты визуальной регрессии](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Паттерн объектов страниц
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) и [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Пример Github Actions
    -   Отчет Allure (скриншоты при сбоях)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Шаблонный проект для запуска тестов **WebdriverIO v7** для следующих целей:

[Скрипты WDIO 7 с TypeScript в фреймворке Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Скрипты WDIO 7 с TypeScript в фреймворке Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Запуск скрипта WDIO 7 в Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Сетевые логи](https://github.com/17thSep/MonitorNetworkLogs/)

Шаблонный проект для:

- Захват сетевых логов
- Захват всех вызовов GET/POST или конкретного REST API
- Проверка параметров запроса
- Проверка параметров ответа
- Сохранение всех ответов в отдельный файл

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Шаблонный проект для запуска тестов appium для нативных приложений и мобильных браузеров с использованием cucumber v7 и wdio v7 с паттерном объектов страниц.

- Фреймворки
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Особенности
    - Нативные приложения Android и iOS
    - Браузер Android Chrome
    - Браузер iOS Safari
    - Модель объектов страниц
    - Содержит примеры тестовых сценариев в cucumber
    - Интегрирован с несколькими HTML-отчетами cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Это шаблонный проект, который поможет вам показать, как вы можете запускать тесты webdriverio из веб-приложений с использованием последних WebdriverIO и фреймворка Cucumber. Этот проект предназначен для использования в качестве базового образа, который вы можете использовать для понимания того, как запускать тесты WebdriverIO в docker.

Этот проект включает:

- DockerFile
- Проект cucumber

Читайте подробнее: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Это шаблонный проект, который поможет вам показать, как вы можете запускать тесты electronJS с использованием WebdriverIO. Этот проект предназначен для использования в качестве базового образа, который вы можете использовать для понимания того, как запускать тесты WebdriverIO electronJS.

Этот проект включает:

- Пример приложения electronjs
- Пример тестовых скриптов cucumber

Читайте подробнее: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Это шаблонный проект, который поможет вам показать, как вы можете автоматизировать Windows-приложения с использованием winappdriver и WebdriverIO. Этот проект предназначен для использования в качестве базового образа, который вы можете использовать для понимания того, как запускать тесты windappdriver и WebdriverIO.

Читайте подробнее: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Это шаблонный проект, который поможет вам показать, как вы можете запускать функцию multiremote webdriverio с последними WebdriverIO и фреймворком Jasmine. Этот проект предназначен для использования в качестве базового образа, который вы можете использовать для понимания того, как запускать тесты WebdriverIO в docker.

Этот проект использует:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Шаблонный проект для запуска тестов appium на реальных устройствах Roku с использованием mocha и паттерна объектов страниц.

- Фреймворки
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Отчетность Allure

- Особенности
    - Паттерн объектов страниц
    - Typescript
    - Скриншот при сбое
    - Примеры тестов, использующих образец канала Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Проект-доказательство концепции для E2E тестов Multiremote Cucumber, а также управляемых данными тестов Mocha

- Фреймворк:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Особенности:
    - Тесты E2E на основе Cucumber
    - Управляемые данными тесты на основе Mocha
    - Только веб-тесты - в локальной среде, а также облачных платформах
    - Только мобильные тесты - локальные, а также удаленные облачные эмуляторы (или устройства)
    - Веб + Мобильные тесты - Multiremote - локальные, а также облачные платформы
    - Интегрированы множественные отчеты, включая Allure
    - Тестовые данные (JSON / XLSX), обрабатываемые глобально, чтобы записывать данные (созданные на лету) в файл после выполнения теста
    - Рабочий процесс Github для запуска теста и загрузки отчета allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Это шаблонный проект, который поможет показать, как запускать мульти-удаленный webdriverio с использованием сервисов appium и chromedriver с последней версией WebdriverIO.

- Фреймворки
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Особенности
  - Модель [Page Object](pageobjects)
  - Typescript
  - Веб + Мобильные тесты - Multiremote
  - Нативные приложения Android и iOS
  - Appium
  - Chromedriver
  - ESLint
  - Примеры тестов для входа в http://the-internet.herokuapp.com и [нативное демо-приложение WebdriverIO](https://github.com/webdriverio/native-demo-app)