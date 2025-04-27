---
id: record
title: Тестирование записей
---

В Chrome DevTools есть панель _Recorder_, которая позволяет пользователям записывать и воспроизводить автоматизированные шаги в Chrome. Эти шаги можно [экспортировать в тесты WebdriverIO с помощью расширения](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), что делает написание тестов очень простым.

## Что такое Chrome DevTools Recorder

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) - это инструмент, который позволяет записывать и воспроизводить тестовые действия непосредственно в браузере, а также экспортировать их в формате JSON (или экспортировать в e2e тесты), а также измерять производительность тестов.

Инструмент прост в использовании, и поскольку он встроен в браузер, нам удобно не переключать контекст или работать с какими-либо сторонними инструментами.

## Как записать тест с помощью Chrome DevTools Recorder

Если у вас установлен последний Chrome, Recorder уже будет установлен и доступен для вас. Просто откройте любой веб-сайт, щелкните правой кнопкой мыши и выберите _"Inspect"_. В DevTools вы можете открыть Recorder, нажав `CMD/Control` + `Shift` + `p` и введя _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Чтобы начать запись пользовательского сценария, нажмите на _"Start new recording"_, дайте вашему тесту имя, а затем используйте браузер для записи теста:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Следующий шаг, нажмите на _"Replay"_, чтобы проверить, была ли запись успешной и делает ли она то, что вы хотели. Если все в порядке, нажмите на значок [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) и выберите _"Export as a WebdriverIO Test Script"_:

Опция _"Export as a WebdriverIO Test Script"_ доступна только если вы установили расширение [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).

![Chrome DevTools Recorder](/img/recorder/export.gif)

Вот и все!

## Экспорт записи

Если вы экспортировали поток как тестовый скрипт WebdriverIO, он должен загрузить скрипт, который вы можете скопировать и вставить в свой тестовый набор. Например, приведенная выше запись выглядит следующим образом:

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

Убедитесь, что вы пересмотрели некоторые локаторы и при необходимости заменили их на более устойчивые [типы селекторов](/docs/selectors). Вы также можете экспортировать поток как JSON-файл и использовать пакет [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) для преобразования его в реальный тестовый скрипт.

## Следующие шаги

Вы можете использовать этот поток для легкого создания тестов для ваших приложений. Chrome DevTools Recorder имеет различные дополнительные функции, например:

- [Имитация медленной сети](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) или
- [Измерение производительности ваших тестов](https://developer.chrome.com/docs/devtools/recorder/#measure)

Обязательно ознакомьтесь с их [документацией](https://developer.chrome.com/docs/devtools/recorder).