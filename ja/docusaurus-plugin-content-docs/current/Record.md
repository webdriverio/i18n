---
id: record
title: テストの記録
---

Chrome DevToolsには、ユーザーがChromeでの自動化ステップを記録および再生できる_Recorder_パネルがあります。これらのステップは[拡張機能を使ってWebdriverIOテストにエクスポート](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en)でき、テスト作成が非常に簡単になります。

## Chrome DevTools Recorderとは

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/)は、ブラウザ上で直接テストアクションを記録して再生し、JSONとしてエクスポート（またはe2eテストとしてエクスポート）したり、テストのパフォーマンスを測定したりできるツールです。

このツールは直感的で、ブラウザに組み込まれているため、コンテキストを切り替えたり、サードパーティツールを扱ったりする必要がないという利便性があります。

## Chrome DevTools Recorderでテストを記録する方法

最新のChromeをお持ちであれば、Recorderはすでにインストールされ、利用可能な状態になっています。任意のウェブサイトを開き、右クリックして_「検証」_を選択するだけです。DevTools内で`CMD/Control` + `Shift` + `p`を押して_「Show Recorder」_と入力することで、Recorderを開くことができます。

![Chrome DevTools Recorder](/img/recorder/recorder.png)

ユーザージャーニーの記録を開始するには、_「Start new recording」_をクリックし、テストに名前を付けてから、ブラウザを使用してテストを記録します：

![Chrome DevTools Recorder](/img/recorder/demo.gif)

次のステップでは、_「Replay」_をクリックして、記録が成功し、あなたが望んだことを実行するか確認します。すべてが問題なければ、[エクスポート](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension)アイコンをクリックして_「Export as a WebdriverIO Test Script」_を選択します：

_「Export as a WebdriverIO Test Script」_オプションは、[WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn)拡張機能をインストールした場合のみ利用可能です。

![Chrome DevTools Recorder](/img/recorder/export.gif)

これで完了です！

## 記録のエクスポート

フローをWebdriverIOテストスクリプトとしてエクスポートした場合、テストスイートにコピー＆ペーストできるスクリプトがダウンロードされるはずです。例えば、上記の記録は次のようになります：

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

必要に応じて、一部のロケーターを確認し、より堅牢な[セレクタータイプ](/docs/selectors)に置き換えてください。フローをJSONファイルとしてエクスポートし、[`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder)パッケージを使用して実際のテストスクリプトに変換することもできます。

## 次のステップ

このフローを使用して、アプリケーションのテストを簡単に作成できます。Chrome DevTools Recorderには、次のようなさまざまな追加機能があります：

- [低速ネットワークをシミュレート](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network)
- [テストのパフォーマンスを測定](https://developer.chrome.com/docs/devtools/recorder/#measure)

必ず[ドキュメント](https://developer.chrome.com/docs/devtools/recorder)を確認してください。