---
id: integrate-with-percy
title: Для веб-приложений
---

## Интеграция ваших тестов WebdriverIO с Percy

Перед интеграцией, вы можете изучить [учебное пособие Percy по созданию примера для WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Интегрируйте ваши автоматизированные тесты WebdriverIO с BrowserStack Percy, вот обзор шагов интеграции:

### Шаг 1: Создайте проект Percy
[Зарегистрируйтесь](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) в Percy. В Percy создайте проект типа Web и назовите его. После создания проекта Percy генерирует токен. Запишите его. Вам нужно будет использовать его для установки переменной среды на следующем шаге.

Для подробной информации о создании проекта см. [Создание проекта Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Шаг 2: Установите токен проекта как переменную среды

Запустите данную команду, чтобы установить PERCY_TOKEN как переменную среды:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Шаг 3: Установите зависимости Percy

Установите компоненты, необходимые для создания среды интеграции для вашего набора тестов.

Для установки зависимостей выполните следующую команду:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Шаг 4: Обновите ваш тестовый скрипт

Импортируйте библиотеку Percy, чтобы использовать метод и атрибуты, необходимые для создания скриншотов.
В следующем примере используется функция percySnapshot() в асинхронном режиме:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

При использовании WebdriverIO в [автономном режиме](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), предоставьте объект браузера как первый аргумент функции `percySnapshot`:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Аргументы метода снимка:

```sh
percySnapshot(name[, options])
```
### Автономный режим

```sh
percySnapshot(browser, name[, options])
```

- browser (обязательно) - Объект браузера WebdriverIO
- name (обязательно) - Имя снимка; должно быть уникальным для каждого снимка
- options - Смотрите настройки конфигурации для каждого снимка

Чтобы узнать больше, см. [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Шаг 5: Запустите Percy
Запустите ваши тесты с помощью команды `percy exec`, как показано ниже:

Если вы не можете использовать команду `percy:exec` или предпочитаете запускать тесты с помощью параметров запуска IDE, вы можете использовать команды `percy:exec:start` и `percy:exec:stop`. Чтобы узнать больше, посетите [Run Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## Посетите следующие страницы для получения дополнительной информации:
- [Интеграция ваших тестов WebdriverIO с Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Страница переменных среды](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Интеграция с использованием BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), если вы используете BrowserStack Automate.


| Ресурс                                                                                                                                                              | Описание                          |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Официальная документация](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)   | Документация Percy по WebdriverIO |
| [Пример сборки - Руководство](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Руководство Percy по WebdriverIO  |
| [Официальное видео](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                            | Визуальное тестирование с Percy   |
| [Блог](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                      | Представляем Visual Reviews 2.0   |
```