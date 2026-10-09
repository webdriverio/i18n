---
id: record
title: テストの記録
description: "Chrome DevTools Recorder でユーザーフローを記録し、WebdriverIO のテストとしてエクスポートします。"
---

Chrome DevTools には _Recorder_ パネルがあり、Chrome 内で自動化されたステップを記録・再生できます。これらのステップは[拡張機能を使って WebdriverIO のテストにエクスポート](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en)できるため、テストの作成が非常に簡単になります。

## Chrome DevTools Recorder とは

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) は、ブラウザ上で直接テストアクションを記録・再生し、それらを JSON としてエクスポート（または e2e テストとしてエクスポート）できるツールです。また、テストのパフォーマンスを測定することもできます。

このツールはシンプルで、ブラウザに組み込まれているため、コンテキストを切り替えたりサードパーティ製のツールを扱ったりする必要がないという利便性があります。

## Chrome DevTools Recorder でテストを記録する方法

最新の Chrome をお使いであれば、Recorder はすでにインストールされており、すぐに利用できます。任意のウェブサイトを開き、右クリックして _「検証」_ を選択してください。DevTools 内で `CMD/Control` + `Shift` + `p` を押し、_「Show Recorder」_ と入力すると Recorder を開くことができます。

![Chrome DevTools Recorder](/img/recorder/recorder.png)

ユーザージャーニーの記録を開始するには、_「Start new recording」_ をクリックし、テストに名前を付けてから、ブラウザを操作してテストを記録します：

![Chrome DevTools Recorder](/img/recorder/demo.gif)

次に、_「Replay」_ をクリックして、記録が正常に行われ、意図した操作が実行されるかを確認します。問題がなければ、[エクスポート](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension)アイコンをクリックし、_「Export as a WebdriverIO Test Script」_ を選択します：

_「Export as a WebdriverIO Test Script」_ オプションは、[WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) 拡張機能をインストールした場合にのみ利用できます。


![Chrome DevTools Recorder](/img/recorder/export.gif)

以上です！

## 記録のエクスポート

フローを WebdriverIO テストスクリプトとしてエクスポートすると、テストスイートにコピー＆ペーストできるスクリプトがダウンロードされます。例えば、上記の記録は次のようになります：

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

いくつかのロケーターを見直し、必要に応じてより堅牢な[セレクタータイプ](/docs/selectors)に置き換えるようにしてください。また、フローを JSON ファイルとしてエクスポートし、[`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) パッケージを使用して実際のテストスクリプトに変換することもできます。

## 次のステップ

このフローを使えば、アプリケーションのテストを簡単に作成できます。Chrome DevTools Recorder には、次のようなさまざまな追加機能があります：

- [低速なネットワークのシミュレーション](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network)や
- [テストのパフォーマンス測定](https://developer.chrome.com/docs/devtools/recorder/#measure)

ぜひ[ドキュメント](https://developer.chrome.com/docs/devtools/recorder)もご確認ください。