---
id: record
title: Tests aufzeichnen
---

Chrome DevTools verfügt über ein _Recorder_-Panel, mit dem Benutzer automatisierte Schritte in Chrome aufzeichnen und wiedergeben können. Diese Schritte können [mit einer Erweiterung in WebdriverIO-Tests exportiert werden](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), was das Schreiben von Tests sehr einfach macht.

## Was ist Chrome DevTools Recorder

Der [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) ist ein Werkzeug, mit dem Sie Testaktionen direkt im Browser aufzeichnen und wiedergeben und auch als JSON exportieren können (oder in E2E-Tests exportieren), sowie die Testleistung messen können.

Das Tool ist unkompliziert, und da es in den Browser integriert ist, haben wir den Vorteil, dass wir den Kontext nicht wechseln oder mit Drittanbieter-Tools umgehen müssen.

## Wie man einen Test mit Chrome DevTools Recorder aufzeichnet

Wenn Sie das neueste Chrome haben, ist der Recorder bereits installiert und für Sie verfügbar. Öffnen Sie einfach eine beliebige Website, machen Sie einen Rechtsklick und wählen Sie _"Untersuchen"_. In DevTools können Sie den Recorder öffnen, indem Sie `CMD/Control` + `Shift` + `p` drücken und _"Show Recorder"_ eingeben.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Um eine Benutzerreise aufzuzeichnen, klicken Sie auf _"Start new recording"_, geben Sie Ihrem Test einen Namen und verwenden Sie dann den Browser, um Ihren Test aufzuzeichnen:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Als nächsten Schritt klicken Sie auf _"Replay"_, um zu überprüfen, ob die Aufnahme erfolgreich war und das tut, was Sie tun wollten. Wenn alles in Ordnung ist, klicken Sie auf das [Export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension)-Symbol und wählen Sie _"Export as a WebdriverIO Test Script"_:

Die Option _"Export as a WebdriverIO Test Script"_ ist nur verfügbar, wenn Sie die [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn)-Erweiterung installieren.

![Chrome DevTools Recorder](/img/recorder/export.gif)

Das war's!

## Aufzeichnung exportieren

Wenn Sie den Ablauf als WebdriverIO-Testskript exportiert haben, sollte ein Skript heruntergeladen werden, das Sie in Ihre Testsuite kopieren und einfügen können. Zum Beispiel sieht die obige Aufzeichnung wie folgt aus:

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

Stellen Sie sicher, dass Sie einige der Locators überprüfen und sie bei Bedarf durch widerstandsfähigere [Selektor-Typen](/docs/selectors) ersetzen. Sie können den Ablauf auch als JSON-Datei exportieren und das [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder)-Paket verwenden, um ihn in ein tatsächliches Testskript umzuwandeln.

## Nächste Schritte

Sie können diesen Ablauf verwenden, um einfach Tests für Ihre Anwendungen zu erstellen. Der Chrome DevTools Recorder hat verschiedene zusätzliche Funktionen, z.B.:

- [Langsames Netzwerk simulieren](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) oder
- [Leistung Ihrer Tests messen](https://developer.chrome.com/docs/devtools/recorder/#measure)

Schauen Sie sich unbedingt deren [Dokumentation](https://developer.chrome.com/docs/devtools/recorder) an.