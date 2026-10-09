---
id: integrate-with-percy
title: Для веб-приложений
description: "Интеграция тестов WebdriverIO для веб-приложений с BrowserStack Percy для визуального тестирования: от создания проекта до запуска сборок."
---

## Интеграция тестов WebdriverIO с Percy

Перед интеграцией вы можете ознакомиться с [руководством Percy по примеру сборки для WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Интегрируйте ваши автоматизированные тесты WebdriverIO с BrowserStack Percy. Ниже приведён обзор шагов интеграции:

### Шаг 1: Создайте проект Percy
[Войдите](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) в Percy. В Percy создайте проект типа Web и задайте ему имя. После создания проекта Percy сгенерирует токен. Сохраните его. Он понадобится для установки переменной окружения на следующем шаге.

Подробнее о создании проекта см. в разделе [Создание проекта Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Шаг 2: Установите токен проекта как переменную окружения

Выполните указанную команду, чтобы установить PERCY_TOKEN как переменную окружения:

```sh
export PERCY_TOKEN="<your token here>"   // macOS или Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Шаг 3: Установите зависимости Percy

Установите компоненты, необходимые для создания среды интеграции для вашего набора тестов.

Чтобы установить зависимости, выполните следующую команду:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Шаг 4: Обновите тестовый скрипт

Импортируйте библиотеку Percy, чтобы использовать метод и атрибуты, необходимые для создания снимков экрана.
В следующем примере функция percySnapshot() используется в асинхронном режиме:

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

При использовании WebdriverIO в [автономном режиме](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) передайте объект браузера в качестве первого аргумента функции `percySnapshot`:

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
// в автономном режиме объект браузера обязателен
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Аргументы метода создания снимка:

```sh
percySnapshot(name[, options])
```
### Автономный режим

```sh
percySnapshot(browser, name[, options])
```

- browser (обязательный) — объект браузера WebdriverIO
- name (обязательный) — имя снимка; должно быть уникальным для каждого снимка
- options — см. параметры конфигурации для отдельных снимков

Подробнее см. в разделе [Снимки Percy](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Шаг 5: Запустите Percy
Запустите тесты с помощью команды `percy exec`, как показано ниже:

Если вы не можете использовать команду `percy:exec` или предпочитаете запускать тесты через параметры запуска IDE, вы можете использовать команды `percy:exec:start` и `percy:exec:stop`. Подробнее см. в разделе [Запуск Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

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

## Посетите следующие страницы для получения подробной информации:
- [Интеграция тестов WebdriverIO с Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Страница о переменных окружения](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Интеграция с помощью BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), если вы используете BrowserStack Automate.


| Ресурс                                                                                                                                                              | Описание                          |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Официальная документация](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)  | Документация Percy по WebdriverIO |
| [Пример сборки — руководство](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Руководство Percy по WebdriverIO  |
| [Официальное видео](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                           | Визуальное тестирование с Percy   |
| [Блог](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Представляем Visual Reviews 2.0   |