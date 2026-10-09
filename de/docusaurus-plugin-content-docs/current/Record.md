---
id: record
title: Tests aufzeichnen
description: "Zeichnen Sie Benutzerabläufe mit dem Chrome DevTools Recorder auf und exportieren Sie sie als WebdriverIO-Tests."
---

Chrome DevTools verfügt über ein _Recorder_-Panel, mit dem Benutzer automatisierte Schritte in Chrome aufzeichnen und wiedergeben können. Diese Schritte können [mit einer Erweiterung in WebdriverIO-Tests exportiert werden](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), was das Schreiben von Tests sehr einfach macht.

## Was ist der Chrome DevTools Recorder

Der [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) ist ein Tool, mit dem Sie Testaktionen direkt im Browser aufzeichnen und wiedergeben sowie als JSON exportieren (oder als E2E-Test exportieren) und die Testleistung messen können.

Das Tool ist unkompliziert, und da es in den Browser integriert ist, haben wir den Vorteil, weder den Kontext wechseln noch uns mit einem Drittanbieter-Tool befassen zu müssen.

## Wie man einen Test mit dem Chrome DevTools Recorder aufzeichnet

Wenn Sie die neueste Version von Chrome haben, ist der Recorder bereits installiert und für Sie verfügbar. Öffnen Sie einfach eine beliebige Website, machen Sie einen Rechtsklick und wählen Sie _"Untersuchen"_. In den DevTools können Sie den Recorder öffnen, indem Sie `CMD/Control` + `Shift` + `p` drücken und _"Show Recorder"_ eingeben.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Um eine Benutzerreise aufzuzeichnen, klicken Sie auf _"Start new recording"_, geben Sie Ihrem Test einen Namen und verwenden Sie dann den Browser, um Ihren Test aufzuzeichnen:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Klicken Sie als Nächstes auf _"Replay"_, um zu überprüfen, ob die Aufzeichnung erfolgreich war und das tut, was Sie wollten. Wenn alles in Ordnung ist, klicken Sie auf das [Export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension)-Symbol und wählen Sie _"Export as a WebdriverIO Test Script"_:

Die Option _"Export as a WebdriverIO Test Script"_ ist nur verfügbar, wenn Sie die Erweiterung [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) installieren.


![Chrome DevTools Recorder](/img/recorder/export.gif)

Das war's!

## Aufzeichnung exportieren

Wenn Sie den Ablauf als WebdriverIO-Testskript exportiert haben, sollte ein Skript heruntergeladen werden, das Sie per Copy&Paste in Ihre Testsuite einfügen können. Die obige Aufzeichnung sieht beispielsweise wie folgt aus:

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

Überprüfen Sie unbedingt einige der Locators und ersetzen Sie sie bei Bedarf durch robustere [Selektortypen](/docs/selectors). Sie können den Ablauf auch als JSON-Datei exportieren und das Paket [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) verwenden, um ihn in ein echtes Testskript umzuwandeln.

## Nächste Schritte

Sie können diesen Ablauf nutzen, um ganz einfach Tests für Ihre Anwendungen zu erstellen. Der Chrome DevTools Recorder bietet verschiedene zusätzliche Funktionen, z. B.:

- [Langsames Netzwerk simulieren](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) oder
- [Leistung Ihrer Tests messen](https://developer.chrome.com/docs/devtools/recorder/#measure)

Schauen Sie sich unbedingt die [Dokumentation](https://developer.chrome.com/docs/devtools/recorder) an.