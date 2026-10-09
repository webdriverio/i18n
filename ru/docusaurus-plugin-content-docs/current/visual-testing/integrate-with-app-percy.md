---
id: integrate-with-app-percy
title: Для мобильных приложений
description: "Интеграция тестов мобильных приложений на WebdriverIO с BrowserStack App Percy для визуального тестирования, начиная с настройки PERCY_TOKEN."
---

## Интеграция тестов WebdriverIO с App Percy

Перед интеграцией вы можете ознакомиться с [руководством по пробной сборке App Percy для WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Интегрируйте свой набор тестов с BrowserStack App Percy. Ниже приведён обзор шагов интеграции:

### Шаг 1: Создайте новый проект приложения на панели управления Percy

[Войдите](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) в Percy и [создайте новый проект типа «приложение»](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). После создания проекта вам будет показана переменная окружения `PERCY_TOKEN`. Percy использует `PERCY_TOKEN`, чтобы определить, в какую организацию и проект загружать скриншоты. Этот `PERCY_TOKEN` понадобится вам на следующих шагах.

### Шаг 2: Задайте токен проекта как переменную окружения

Выполните указанную команду, чтобы задать PERCY_TOKEN как переменную окружения:

```sh
export PERCY_TOKEN="<your token here>"   // macOS или Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Шаг 3: Установите пакеты Percy

Установите компоненты, необходимые для создания среды интеграции для вашего набора тестов.
Чтобы установить зависимости, выполните следующую команду:

```sh
npm install --save-dev @percy/cli
```

### Шаг 4: Установите зависимости

Установите Percy Appium app

```sh
npm install --save-dev @percy/appium-app
```

### Шаг 5: Обновите тестовый скрипт
Обязательно импортируйте @percy/appium-app в своём коде.

Ниже приведён пример теста с использованием функции percyScreenshot. Используйте эту функцию везде, где нужно сделать скриншот.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Мы передаём необходимые аргументы в метод percyScreenshot.

Аргументы метода создания скриншота:

```sh
percyScreenshot(driver, name[, options])
```
### Шаг 6: Запустите тестовый скрипт

Запустите тесты с помощью `percy app:exec`.

Если вы не можете использовать команду percy app:exec или предпочитаете запускать тесты с помощью параметров запуска IDE, вы можете использовать команды percy app:exec:start и percy app:exec:stop. Подробнее см. [Запуск Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Эта команда запускает Percy, создаёт новую сборку Percy, делает снимки и загружает их в ваш проект, а затем останавливает Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Дополнительную информацию см. на следующих страницах:
- [Интеграция тестов WebdriverIO с Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Страница о переменных окружения](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Интеграция с помощью BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), если вы используете BrowserStack Automate.


| Ресурс                                                                                                                                                            | Описание                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Официальная документация](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Документация App Percy по WebdriverIO |
| [Пробная сборка — руководство](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Руководство App Percy по WebdriverIO      |
| [Официальное видео](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Визуальное тестирование с App Percy         |
| [Блог](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Знакомьтесь, App Percy: платформа автоматизированного визуального тестирования нативных приложений на базе ИИ    |