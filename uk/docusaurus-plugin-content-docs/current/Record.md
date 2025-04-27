---
id: record
title: Запис Тестів
---

Chrome DevTools має панель _Recorder_, яка дозволяє користувачам записувати та відтворювати автоматизовані кроки в Chrome. Ці кроки можна [експортувати у тести WebdriverIO за допомогою розширення](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), що робить написання тестів дуже простим.

## Що таке Chrome DevTools Recorder

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) — це інструмент, який дозволяє записувати та відтворювати тестові дії безпосередньо у браузері, а також експортувати їх як JSON (або експортувати в e2e тести), а також вимірювати продуктивність тестів.

Інструмент простий у використанні, і оскільки він інтегрований у браузер, ми маємо зручність не перемикати контекст або працювати з будь-якими сторонніми інструментами.

## Як записати тест за допомогою Chrome DevTools Recorder

Якщо у вас найновіша версія Chrome, у вас уже буде встановлений Recorder і доступний для використання. Просто відкрийте будь-який веб-сайт, натисніть правою кнопкою миші та виберіть _"Inspect"_. У DevTools ви можете відкрити Recorder, натиснувши `CMD/Control` + `Shift` + `p` і ввівши _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Щоб почати запис шляху користувача, натисніть на _"Start new recording"_, дайте вашому тесту назву, а потім використовуйте браузер для запису вашого тесту:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Наступний крок, натисніть на _"Replay"_, щоб перевірити, чи був запис успішним і чи робить він те, що ви хотіли. Якщо все гаразд, натисніть на значок [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) і виберіть _"Export as a WebdriverIO Test Script"_:

Опція _"Export as a WebdriverIO Test Script"_ доступна лише якщо ви встановили розширення [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).

![Chrome DevTools Recorder](/img/recorder/export.gif)

Це все!

## Експорт запису

Якщо ви експортували потік як тестовий скрипт WebdriverIO, він повинен завантажити скрипт, який ви можете скопіювати та вставити у вашу тестову систему. Наприклад, запис вище виглядає так:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

Переконайтеся, що ви переглянули деякі локатори та замінили їх більш стійкими [типами селекторів](/docs/selectors), якщо це необхідно. Ви також можете експортувати потік як JSON-файл і використовувати пакет [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) для перетворення його на фактичний тестовий скрипт.

## Наступні кроки

Ви можете використовувати цей потік для легкого створення тестів для ваших додатків. Chrome DevTools Recorder має різні додаткові функції, наприклад:

- [Симуляція повільної мережі](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) або
- [Вимірювання продуктивності ваших тестів](https://developer.chrome.com/docs/devtools/recorder/#measure)

Обов'язково перегляньте їхню [документацію](https://developer.chrome.com/docs/devtools/recorder).