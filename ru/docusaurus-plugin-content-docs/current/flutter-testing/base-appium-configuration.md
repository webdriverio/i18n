---
id: base-appium-configuration
title: Базовая конфигурация Appium
description: "Установите сервис Appium и пакет Flutter finder и настройте базовую конфигурацию Appium для тестирования Flutter-приложений с помощью WebdriverIO."
---

WebdriverIO использует Appium для запуска тестов на мобильных эмуляторах, симуляторах и реальных устройствах. `@wdio/appium-service` автоматически управляет жизненным циклом сервера Appium во время выполнения тестов.

Общие сведения о настройке Appium и параметрах capabilities см. в [документации Appium Service](https://webdriver.io/docs/appium-service/).

## Установка зависимостей

Для тестирования Flutter-приложений установите сервис Appium и пакет Flutter finder:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Установка Appium Flutter Driver

Установить Appium Flutter Driver (`appium-flutter-driver`) можно одним из двух способов:

#### Вариант 1: Как dev-зависимость (рекомендуется для CI/CD)

Добавление драйвера непосредственно в `devDependencies` гарантирует, что у всех участников команды и в CI/CD-пайплайнах драйвер будет установлен автоматически без дополнительных шагов настройки:

```bash
npm install --save-dev appium-flutter-driver
```

> Вы также можете установить все необходимые пакеты одной командой:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Вариант 2: Через Appium CLI (локальная настройка)

В качестве альтернативы вы можете установить драйвер локально в ваше окружение Appium с помощью Appium CLI:

```bash
npx appium driver install flutter
```

### Обзор пакетов

Эти пакеты обеспечивают:
- **`@wdio/appium-service` и `appium`**: запуск и управление сервером Appium во время выполнения тестов.
- **`appium-flutter-driver`**: драйвер Appium, отвечающий за взаимодействие с тестовым расширением Flutter.
- **`appium-flutter-finder`**: вспомогательная библиотека, предоставляющая специфичные для Flutter стратегии поиска элементов (`byValueKey`, `byText`, `byTooltip`).