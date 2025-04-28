---
id: record
title: レコードテスト
---

Chrome DevToolsには、ユーザーがChromeでの自動化ステップを記録および再生できる「_Recorder_」パネルがあります。これらのステップは[拡張機能を使用してWebdriverIOテストにエクスポートできます](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en)ので、テストの作成が非常に簡単になります。

## Chrome DevTools Recorderとは

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/)は、ブラウザ内でテストアクションを直接記録および再生できるツールであり、それらをJSON形式（またはE2Eテスト形式）でエクスポートしたり、テストのパフォーマンスを測定したりすることもできます。

このツールはシンプルで、ブラウザに組み込まれているため、コンテキストを切り替えたり、サードパーティのツールを扱う必要がなく便利です。

## Chrome DevTools Recorderでテストを記録する方法

最新のChromeをお持ちであれば、Recorderはすでにインストールされており、利用可能です。任意のウェブサイトを開き、右クリックして「_Inspect_」を選択するだけです。DevTools内で`CMD/Control` + `Shift` + `p`を押して「_Show Recorder_」と入力すると、Recorderを開くことができます。

![Chrome DevTools Recorder](/img/recorder/recorder.png)

ユーザージャーニーの記録を開始するには、「_Start new recording_」をクリックし、テストに名前を付けてからブラウザを使用してテストを記録します：

![Chrome DevTools Recorder](/img/recorder/demo.gif)

次のステップとして、「_Replay_」をクリックして記録が成功したか、意図した通りの動作をするか確認します。すべてが問題なければ、[export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension)アイコンをクリックして「_Export as a WebdriverIO Test Script_」を選択します：

「_Export as a WebdriverIO Test Script_」オプションは、[WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn)拡張機能をインストールした場合にのみ利用可能です。

![Chrome DevTools Recorder](/img/recorder/export.gif)

これで完了です！

## 記録のエクスポート

フローをWebdriverIOテストスクリプトとしてエクスポートした場合、テストスイートにコピー＆ペーストできるスクリプトがダウンロードされます。例えば、上記の記録は次のようになります：

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

必要に応じて、一部のロケーターを見直し、より堅牢な[セレクタータイプ](/docs/selectors)に置き換えてください。フローをJSONファイルとしてエクスポートし、[`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder)パッケージを使用して実際のテストスクリプトに変換することもできます。

## 次のステップ

このフローを使用して、アプリケーションのテストを簡単に作成できます。Chrome DevTools Recorderには、以下のような追加機能があります：

- [低速ネットワークをシミュレート](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network)する
- [テストのパフォーマンスを測定](https://developer.chrome.com/docs/devtools/recorder/#measure)する

[ドキュメント](https://developer.chrome.com/docs/devtools/recorder)を確認してみてください。