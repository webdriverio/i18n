---
id: spec-reporter
title: スペックレポーター
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> スペックスタイルでレポートするためのWebdriverIOプラグイン。

![Spec Reporter](/img/spec.png "Spec Reporter")

## インストール

最も簡単な方法は、`@wdio/spec-reporter`を`package.json`のdevDependencyとして保持することです：

```sh
npm install @wdio/spec-reporter --save-dev
```

`WebdriverIO`のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)で確認できます。

## 設定

以下のコードはデフォルトのwdioテストランナー設定を示しています。レポーターの配列に`'spec'`を追加するだけです。

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## スペックレポーターのオプション
### symbols
`passed`、`failed`、`skipped`テストのカスタムシンボルを提供します

タイプ: `object`
デフォルト: `{passed: '✓', skipped: '-', failed: '✖'}`

#### 例
```js
[
  "spec",
  {
    symbols: {
      passed: '[PASS]',
      failed: '[FAIL]',
    },
  },
]
```

### sauceLabsSharableLinks
デフォルトでは、Sauce Labsのテスト結果は同じチームのメンバーのみが閲覧でき、異なるチームのメンバーは閲覧できません。このオプションはデフォルトで[共有可能なリンク](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links)を有効にします。これにより、Sauce Labsで実行されるすべてのテストを誰でも閲覧できるようになります。
この機能を無効にするには、以下のようにレポーターオプションに`sauceLabsSharableLinks: false`を追加してください。

タイプ: `boolean`
デフォルト: `true`

#### 例
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
失敗したスペックの結果のみを表示します。

タイプ: `boolean`
デフォルト: `false`

#### 例
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
最終レポートにステップからのコンソールログを表示するには`true`に設定します

タイプ: `boolean`
デフォルト: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
実行の最後だけでなく、リアルタイムでテストステータスを表示するには`true`に設定します

タイプ: `boolean`
デフォルト: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
レポートでの `[ MutliRemoteBrowser ... ]` の前置きを無効にするには`false`に設定します。

タイプ: `boolean`
デフォルト: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

`false`に設定すると、以下のような出力が表示されます：
```
Running: loremipsum (v50) on Windows 10
Session ID: foobar

» /foo/bar/loo.e2e.js
Foo test
   green ✓ foo
   green ✓ bar

» /bar/foo/loo.e2e.js
Bar test
   green ✓ some test
   red ✖ a failed test
   red ✖ a failed test with no stack
```

`true`（デフォルト）では、各行に前置きが付きます：
```
[loremipsum 50 Windows 10 #0-0] Running: loremipsum (v50) on Windows 10
[loremipsum 50 Windows 10 #0-0] Session ID: foobar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /foo/bar/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Foo test
[loremipsum 50 Windows 10 #0-0]    green ✓ foo
[loremipsum 50 Windows 10 #0-0]    green ✓ bar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /bar/foo/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Bar test
[loremipsum 50 Windows 10 #0-0]    green ✓ some test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test with no stack
[loremipsum 50 Windows 10 #0-0]
```

### color
ターミナルでのカラー出力を表示するには`true`に設定します

タイプ: `boolean`
デフォルト: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## 環境オプション

環境変数を通して設定できる特定のオプションがあります：

### `FORCE_COLOR`

`FORCE_COLOR=0 npx wdio run wdio.conf.js`のように設定すると、すべてのターミナルの色付けが無効になります。