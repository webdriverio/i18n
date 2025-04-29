---
id: wdio-light-reporter
title: Light Reporter レポーター
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporterはサードパーティのパッケージです。詳細については[GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)をご覧ください

## HTMLとMochawesomeレポーターからインスピレーションを得ています

!哲学:

> このレポーターはCucumberレポートの再生成をサポートしておらず、bddおよびmochaフレームワークを念頭に開発されています。
> ここでは、`describe()`セクションはテストシナリオとして、`it()`はテストシナリオ内のテストケースとして考えられています。

## 特徴

1. 簡単なセットアップ
2. 向上したUI
3. HTMLレポートに埋め込まれたスクリーンショット
4. ステップのコンテキストや名前を含めるためのaddLabel()

## リリース
V 0.1.9 - 初期リリース
V 0.2.6 - (最新)
  1. 複数の環境での実行をサポートし、環境ごとに分離します。
  2. バグの修正
  3. パフォーマンスの向上。

## 例

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## インストール

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## 設定

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## スクリーンショット

このレポーターはスクリーンショットを自動的に設定する機能を持っていませんが、手動で設定した場合、イベントをリッスンしてHTMLレポートにスクリーンショットを添付します。
**レポートにスクリーンショットを含めるには、wdio confファイルのafterTest()フックに以下のコードを追加してください。**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## 結果ファイル

各実行は各specファイルのjsonレポートを再生成します。結合されたjsonとHTMLレポートを生成するには、wdio confファイルの**onComplete()**フックに以下のコードを追加してください

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> --suiteオプションなしでテストを実行する場合、デフォルトとしてスイートを考慮します
> 実行時に複数のパラメータをスイートとして指定すると、レポーターは機能しません。
> wdio run `wdio.conf.js --suite firstSuite` - **(正常に動作します)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(動作しません)** :(

## コンテキストの追加

> `useLabel()`を使用して、任意のステップにコンテキストを追加したり、ステップとして含めるために追加したりできます。

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## アップデート
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## ライセンス

MIT
**無料、いいですね！**