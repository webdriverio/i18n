---
id: record
title: Запись тестов
description: "Записывайте пользовательские сценарии с помощью Chrome DevTools Recorder и экспортируйте их в виде тестов WebdriverIO."
---

В Chrome DevTools есть панель _Recorder_, которая позволяет пользователям записывать и воспроизводить автоматизированные шаги в Chrome. Эти шаги можно [экспортировать в тесты WebdriverIO с помощью расширения](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), что делает написание тестов очень простым.

## Что такое Chrome DevTools Recorder

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) — это инструмент, который позволяет записывать и воспроизводить тестовые действия прямо в браузере, а также экспортировать их в формате JSON (или в виде e2e-теста) и измерять производительность тестов.

Инструмент прост в использовании, и поскольку он встроен в браузер, нам не нужно переключать контекст или иметь дело со сторонними инструментами.

## Как записать тест с помощью Chrome DevTools Recorder

Если у вас установлена последняя версия Chrome, Recorder уже установлен и доступен для использования. Просто откройте любой веб-сайт, щёлкните правой кнопкой мыши и выберите _"Inspect"_. В DevTools вы можете открыть Recorder, нажав `CMD/Control` + `Shift` + `p` и введя _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Чтобы начать запись пользовательского сценария, нажмите _"Start new recording"_, дайте тесту имя, а затем используйте браузер для записи теста:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Далее нажмите _"Replay"_, чтобы проверить, успешно ли прошла запись и делает ли она то, что вы хотели. Если всё в порядке, нажмите на значок [экспорта](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) и выберите _"Export as a WebdriverIO Test Script"_:

Опция _"Export as a WebdriverIO Test Script"_ доступна только в том случае, если вы установили расширение [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).


![Chrome DevTools Recorder](/img/recorder/export.gif)

Вот и всё!

## Экспорт записи

Если вы экспортировали сценарий как тестовый скрипт WebdriverIO, будет загружен скрипт, который вы можете скопировать и вставить в свой набор тестов. Например, приведённая выше запись выглядит следующим образом:

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

Обязательно пересмотрите некоторые локаторы и при необходимости замените их более надёжными [типами селекторов](/docs/selectors). Вы также можете экспортировать сценарий в виде JSON-файла и использовать пакет [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder), чтобы преобразовать его в полноценный тестовый скрипт.

## Следующие шаги

Вы можете использовать этот подход, чтобы легко создавать тесты для своих приложений. Chrome DevTools Recorder обладает различными дополнительными возможностями, например:

- [Симуляция медленной сети](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) или
- [Измерение производительности ваших тестов](https://developer.chrome.com/docs/devtools/recorder/#measure)

Обязательно ознакомьтесь с их [документацией](https://developer.chrome.com/docs/devtools/recorder).