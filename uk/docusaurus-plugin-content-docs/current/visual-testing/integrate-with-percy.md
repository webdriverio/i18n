---
id: integrate-with-percy
title: Для веб-додатків
---

## Інтеграція ваших WebdriverIO тестів з Percy

Перед інтеграцією ви можете ознайомитись з [туторіалом Percy зі створення прикладу для WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Інтегруйте ваші автоматизовані тести WebdriverIO з BrowserStack Percy. Ось огляд кроків інтеграції:

### Крок 1: Створення проекту Percy
[Зареєструйтесь](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) в Percy. У Percy створіть проект типу Web і назвіть його. Після створення проекту Percy згенерує токен. Запишіть його. Ви повинні використати його для встановлення змінної середовища на наступному кроці.

Для отримання детальної інформації щодо створення проекту див. [Створення проекту Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Крок 2: Встановлення токену проекту як змінної середовища

Виконайте наведену команду, щоб встановити PERCY_TOKEN як змінну середовища:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Крок 3: Встановлення залежностей Percy

Встановіть компоненти, необхідні для створення середовища інтеграції для вашого набору тестів.

Щоб встановити залежності, виконайте наступну команду:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Крок 4: Оновлення вашого тестового скрипту

Імпортуйте бібліотеку Percy для використання методу та атрибутів, необхідних для створення знімків екрану.
У наступному прикладі використовується функція percySnapshot() в асинхронному режимі:

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

При використанні WebdriverIO в [автономному режимі](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), надайте об'єкт браузера як перший аргумент функції `percySnapshot`:

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
Аргументи методу знімка:

```sh
percySnapshot(name[, options])
```
### Автономний режим

```sh
percySnapshot(browser, name[, options])
```

- browser (обов'язково) - Об'єкт браузера WebdriverIO
- name (обов'язково) - Назва знімка; повинна бути унікальною для кожного знімка
- options - Див. опції налаштування для кожного знімка

Щоб дізнатися більше, див. [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Крок 5: Запуск Percy
Запустіть ваші тести за допомогою команди `percy exec`, як показано нижче:

Якщо ви не можете використовувати команду `percy:exec` або віддаєте перевагу запуску тестів за допомогою опцій запуску IDE, ви можете використовувати команди `percy:exec:start` та `percy:exec:stop`. Щоб дізнатися більше, відвідайте [Run Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

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

## Відвідайте наступні сторінки для отримання детальнішої інформації:
- [Інтеграція ваших тестів WebdriverIO з Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Сторінка змінних середовища](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Інтеграція з використанням BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), якщо ви використовуєте BrowserStack Automate.


| Ресурс                                                                                                                                                              | Опис                                |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| [Офіційна документація](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)     | Документація Percy для WebdriverIO  |
| [Приклад збірки - Туторіал](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Туторіал Percy для WebdriverIO     |
| [Офіційне відео](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                               | Візуальне тестування з Percy        |
| [Блог](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                     | Представляємо Visual Reviews 2.0    |