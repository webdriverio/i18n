---
id: integrate-with-app-percy
title: Для мобильных приложений
---

## Интеграция ваших тестов WebdriverIO с App Percy

Перед интеграцией вы можете ознакомиться с [руководством по примеру сборки App Percy для WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Интегрируйте свой набор тестов с BrowserStack App Percy, вот обзор шагов интеграции:

### Шаг 1: Создайте новый проект приложения на панели Percy

[Войдите](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) в Percy и [создайте новый проект типа приложения](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). После создания проекта вам будет показана переменная окружения `PERCY_TOKEN`. Percy будет использовать `PERCY_TOKEN`, чтобы знать, в какую организацию и проект загружать скриншоты. Вам понадобится этот `PERCY_TOKEN` в следующих шагах.

### Шаг 2: Установите токен проекта как переменную окружения

Выполните следующую команду, чтобы установить PERCY_TOKEN как переменную окружения:

```sh
export PERCY_TOKEN="<your token here>"   // macOS или Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Шаг 3: Установите пакеты Percy

Установите компоненты, необходимые для создания среды интеграции для вашего набора тестов.
Для установки зависимостей выполните следующую команду:

```sh
npm install --save-dev @percy/cli
```

### Шаг 4: Установите зависимости

Установите приложение Percy Appium

```sh
npm install --save-dev @percy/appium-app
```

### Шаг 5: Обновите тестовый скрипт
Убедитесь, что импортировали @percy/appium-app в вашем коде.

Ниже приведен пример теста с использованием функции percyScreenshot. Используйте эту функцию везде, где вам нужно сделать скриншот.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Мы передаем необходимые аргументы в метод percyScreenshot.

Аргументы метода скриншота:

```sh
percyScreenshot(driver, name[, options])
```
### Шаг 6: Запустите ваш тестовый скрипт

Запустите ваши тесты с помощью `percy app:exec`.

Если вы не можете использовать команду percy app:exec или предпочитаете запускать тесты с помощью опций запуска IDE, вы можете использовать команды percy app:exec:start и percy app:exec:stop. Чтобы узнать больше, посетите [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Эта команда запускает Percy, создает новую сборку Percy, делает снимки и загружает их в ваш проект, а затем останавливает Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Посетите следующие страницы для получения дополнительной информации:
- [Интеграция ваших тестов WebdriverIO с Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Страница переменных окружения](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Интеграция с использованием BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), если вы используете BrowserStack Automate.


| Ресурс                                                                                                                                                            | Описание                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Официальная документация](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Документация App Percy для WebdriverIO |
| [Пример сборки - Руководство](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Руководство WebdriverIO для App Percy      |
| [Официальное видео](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Визуальное тестирование с App Percy         |
| [Блог](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Познакомьтесь с App Percy: платформа для автоматизированного визуального тестирования приложений с поддержкой ИИ    |