---
id: boilerplates
title: Шаблонные проекты
---

Со временем наше сообщество разработало несколько проектов, которые вы можете использовать в качестве вдохновения для создания собственного набора тестов.

# Шаблонные проекты v8

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Наш собственный шаблон для тестовых наборов Cucumber. Мы создали более 150 предопределенных определений шагов для вас, чтобы вы могли сразу начать писать feature-файлы в своем проекте.

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

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Этот шаблонный проект содержит тесты WebdriverIO 8 с cucumber и typescript, следуя паттерну объектов страниц.

- Фреймворки:
    - WebdriverIO v8
    - Cucumber v8

- Особенности:
    - Typescript v5
    - Паттерн объектов страниц
    - Prettier
    - Поддержка мультибраузерности
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Параллельное выполнение на разных браузерах
    - Appium
    - Интеграция с облачным тестированием BrowserStack и Sauce Labs
    - Docker-сервис
    - Сервис обмена данными
    - Отдельные конфигурационные файлы для каждого сервиса
    - Управление тестовыми данными и чтение по типу пользователя
    - Отчетность
      - Dot
      - Spec
      - Множественные отчеты cucumber html с скриншотами ошибок
    - Gitlab pipelines для репозитория Gitlab
    - Github actions для репозитория Github
    - Docker compose для настройки docker hub
    - Тестирование доступности с использованием AXE
    - Визуальное тестирование с использованием Applitools
    - Механизм логирования

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Фреймворк: WDIO-V8 с Cucumber (V8x).
- Особенности:
    - Модель объектов страниц использует подход на основе классов ES6/ES7 и поддержку TypeScript
    - Примеры опции мультиселектора для запроса элемента с несколькими селекторами одновременно
    - Примеры выполнения тестов в многих браузерах и браузерах без интерфейса - Chrome и Firefox
    - Интеграция с облачным тестированием BrowserStack, Sauce Labs, LambdaTest
    - Примеры чтения/записи данных из MS-Excel для простого управления тестовыми данными из внешних источников с примерами
    - Поддержка баз данных для любых РСУБД (Oracle, MySql, TeraData, Vertica и т.д.), выполнение любых запросов / получение результатов и т.д. с примерами для сквозного тестирования
    - Множественная отчетность (Spec, Xunit/Junit, Allure, JSON) и размещение отчетов Allure и Xunit/Junit на веб-сервере.
    - Примеры с демонстрационным приложением https://search.yahoo.com/ и http://the-internet.herokuapp.com.
    - Специальные файлы `.config` для BrowserStack, Sauce Labs, LambdaTest и Appium (для воспроизведения на мобильных устройствах). Для настройки Appium в один клик на локальной машине для iOS и Android обратитесь к [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Фреймворк: WDIO-V8 с Mocha (V10x).
- Особенности:
    - Модель объектов страниц использует подход на основе классов ES6/ES7 и поддержку TypeScript
    - Примеры с демонстрационным приложением https://search.yahoo.com и http://the-internet.herokuapp.com
    - Примеры выполнения тестов в многих браузерах и браузерах без интерфейса - Chrome и Firefox
    - Интеграция с облачным тестированием BrowserStack, Sauce Labs, LambdaTest
    - Множественная отчетность (Spec, Xunit/Junit, Allure, JSON) и размещение отчетов Allure и Xunit/Junit на веб-сервере.
    - Примеры чтения/записи данных из MS-Excel для простого управления тестовыми данными из внешних источников с примерами
    - Примеры подключения БД к любым РСУБД (Oracle, MySql, TeraData, Vertica и т.д.), выполнение любых запросов / получение результатов и т.д. с примерами для сквозного тестирования
    - Специальные файлы `.config` для BrowserStack, Sauce Labs, LambdaTest и Appium (для воспроизведения на мобильных устройствах). Для настройки Appium в один клик на локальной машине для iOS и Android обратитесь к [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Фреймворк: WDIO-V8 с Jasmine (V4x).
- Особенности:
    - Модель объектов страниц использует подход на основе классов ES6/ES7 и поддержку TypeScript
    - Примеры с демонстрационным приложением https://search.yahoo.com и http://the-internet.herokuapp.com
    - Примеры выполнения тестов в многих браузерах и браузерах без интерфейса - Chrome и Firefox
    - Интеграция с облачным тестированием BrowserStack, Sauce Labs, LambdaTest
    - Множественная отчетность (Spec, Xunit/Junit, Allure, JSON) и размещение отчетов Allure и Xunit/Junit на веб-сервере.
    - Примеры чтения/записи данных из MS-Excel для простого управления тестовыми данными из внешних источников с примерами
    - Примеры подключения БД к любым РСУБД (Oracle, MySql, TeraData, Vertica и т.д.), выполнение любых запросов / получение результатов и т.д. с примерами для сквозного тестирования
    - Специальные файлы `.config` для BrowserStack, Sauce Labs, LambdaTest и Appium (для воспроизведения на мобильных устройствах). Для настройки Appium в один клик на локальной машине для iOS и Android обратитесь к [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особенности
    - Содержит примеры тестовых сценариев в cucumber
    - Интегрированные отчеты cucumber html со встроенными видео при сбоях
    - Интегрированные сервисы Lambdatest и CircleCI
    - Интегрированное визуальное, доступности и API-тестирование
    - Интегрированная функциональность электронной почты
    - Интегрированное хранилище S3 для хранения и извлечения тестовых отчетов

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Шаблонный проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), помогающий начать приемочное тестирование ваших веб-приложений с использованием последних версий WebdriverIO, Mocha и Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Отчетность Serenity BDD

- Особенности
    - [Паттерн сценария](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматические скриншоты при сбое теста, встроенные в отчеты
    - Настройка непрерывной интеграции (CI) с использованием [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демонстрационные отчеты Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубликованные на GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Шаблонный проект [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), помогающий начать приемочное тестирование ваших веб-приложений с использованием последних версий WebdriverIO, Cucumber и Serenity/JS.

- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Отчетность Serenity BDD

- Особенности
    - [Паттерн сценария](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Автоматические скриншоты при сбое теста, встроенные в отчеты
    - Настройка непрерывной интеграции (CI) с использованием [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Демонстрационные отчеты Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), опубликованные на GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Шаблонный проект для запуска тестов WebdriverIO в облаке Headspin (https://www.headspin.io/) с использованием функций Cucumber и паттерна объектов страниц.
- Фреймворки
    - WebdriverIO (v8)
    - Cucumber (v8)

- Особенности
    - Интеграция с облаком [Headspin](https://www.headspin.io/)
    - Поддерживает модель объектов страниц
    - Содержит примеры сценариев, написанных в декларативном стиле BDD
    - Интегрированные отчеты cucumber html

# Шаблонные проекты v7

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
    - Помощники для:
        - WebView
        - Жестов
        - Нативных оповещений
        - Пикеров
     - Примеры тестов для:
        - WebView
        - Входа в систему
        - Форм
        - Свайпов
        - Браузеров

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB-тесты с Mocha, WebdriverIO v6 с PageObject

- Фреймворки
  - WebdriverIO (v7)
  - Mocha
- Особенности
  - Модель [объектов страниц](pageobjects)
  - Интеграция с Sauce Labs с использованием [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Отчет Allure
  - Автоматический захват скриншотов для неудачных тестов
  - Пример CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Шаблонный проект для запуска сквозных тестов с Mocha.

- Фреймворки:
    - WebdriverIO (v7)
    - Mocha
- Особенности:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Тесты визуальной регрессии](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Паттерн объектов страниц
    -   [Проверка коммитов](https://github.com/conventional-changelog/commitlint) и [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Пример Github Actions
    -   Отчет Allure (скриншоты при сбое)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Шаблонный проект для запуска тестов **WebdriverIO v7** для следующего:

[Скрипты WDIO 7 с TypeScript в фреймворке Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Скрипты WDIO 7 с TypeScript в фреймворке Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Запуск скрипта WDIO 7 в Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Сетевые логи](https://github.com/17thSep/MonitorNetworkLogs/)

Шаблонный проект для:

- Захвата сетевых логов
- Захвата всех вызовов GET/POST или конкретного REST API
- Проверки параметров запроса
- Проверки параметров ответа
- Сохранения всех ответов в отдельном файле

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Шаблонный проект для запуска тестов appium для нативных и мобильных браузеров с использованием cucumber v7 и wdio v7 с паттерном объектов страниц.

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
    - Интегрирован с несколькими отчетами cucumber html

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Это шаблонный проект, который поможет вам показать, как вы можете запускать тесты webdriverio для веб-приложений с использованием последних WebdriverIO и фреймворка Cucumber. Этот проект предназначен для использования в качестве базового образа, который вы можете использовать для понимания того, как запускать тесты WebdriverIO в docker.

Этот проект включает:

- DockerFile
- Проект cucumber

Подробнее: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Это шаблонный проект, который поможет вам показать, как вы можете запускать тесты electronJS с использованием WebdriverIO. Этот проект предназначен для использования в качестве базового образа, который вы можете использовать для понимания того, как запускать тесты WebdriverIO electronJS.

Этот проект включает:

- Образец приложения electronjs
- Образцы скриптов тестов cucumber

Подробнее: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Это шаблонный проект, который поможет вам показать, как вы можете автоматизировать приложения Windows с использованием winappdriver и WebdriverIO. Этот проект предназначен для использования в качестве базового образа, который вы можете использовать для понимания того, как запускать тесты windappdriver и WebdriverIO.

Подробнее: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Это шаблонный проект, который поможет вам показать, как вы можете запускать multiremote-возможности webdriverio с последним WebdriverIO и фреймворком Jasmine. Этот проект предназначен для использования в качестве базового образа, который вы можете использовать для понимания того, как запускать тесты WebdriverIO в docker.

Этот проект использует:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Шаблонный проект для запуска тестов appium на реальных устройствах Roku с использованием mocha с паттерном объектов страниц.

- Фреймворки
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Отчетность Allure

- Особенности
    - Модель объектов страниц
    - Typescript
    - Скриншот при сбое
    - Примеры тестов с использованием примера канала Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Демонстрационный проект для сквозных тестов Multiremote Cucumber, а также тестов Mocha, управляемых данными

- Фреймворк:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Особенности:
    - Тесты сквозного тестирования на основе Cucumber
    - Тесты Mocha, управляемые данными
    - Только веб-тесты - как на локальных, так и на облачных платформах
    - Только мобильные тесты - локальные и удаленные облачные эмуляторы (или устройства)
    - Веб + мобильные тесты - Multiremote - как локальные, так и облачные платформы
    - Интегрированы множественные отчеты, включая Allure
    - Тестовые данные (JSON / XLSX) обрабатываются глобально, чтобы записать данные (созданные на лету) в файл после выполнения теста
    - Github workflow для запуска теста и загрузки отчета allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Это шаблонный проект, призванный помочь показать, как запускать multi-remote WebdriverIO с использованием сервисов appium и chromedriver с последней версией WebdriverIO.

- Фреймворки
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Особенности
  - Модель [объектов страниц](pageobjects)
  - Typescript
  - Веб + мобильные тесты - Multiremote
  - Нативные приложения Android и iOS
  - Appium
  - Chromedriver
  - ESLint
  - Примеры тестов для входа в систему на http://the-internet.herokuapp.com и [нативное демо-приложение WebdriverIO](https://github.com/webdriverio/native-demo-app)