---
id: wdio-teamcity-reporter
title: Teamcity レポーター
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporterはサードパーティのパッケージです。詳細については[GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)をご覧ください

WebdriverIO Teamcityレポーターは、テスト結果をリアルタイムで表示し、ビルド結果ページのテストタブでテスト情報を利用可能にするものです。


## インストール

```bash
npm install wdio-teamcity-reporter --save-dev
```

WebdriverIOのインストール方法はこちらで確認できます：https://webdriver.io/docs/gettingstarted


## 設定

[wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html)ファイルにレポーターを追加します：

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // オプション
        flowId: true, // オプション
        message: '[title]', // オプション
      }
    ]
  ],
  // ...
}
```

### オプション

- `captureStandardOutput (boolean)` — `true`の場合、`testStarted`と`testFinished`メッセージの間に受信されたすべての標準出力（および標準エラー）メッセージがテスト出力と見なされます。デフォルト値は`false`で、テスト出力を報告するためにtestStdOutとtestStdErrサービスメッセージの使用を想定しています。デフォルトは`false`です。
- `flowId (boolean)` — `true`の場合、`flowId`プロパティがすべてのメッセージに追加されます。フロートラッキングは、例えば並行して実行される個別のプロセスを区別するために必要です。デフォルトは`true`です。
- `message (string)` — nameプロパティに特定のフォーマットを提供する可能性。使用可能なキー：`[browser]`、`[title]`。例：`[browser] / [title]`。デフォルトは`[title]`です。


## リンク

- レポートメッセージに関するTeamcityドキュメントの参照：https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Teamcity テストドライブ：https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## ライセンス

> The MIT License