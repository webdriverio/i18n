---
id: concise-reporter
title: 簡潔なレポーター
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> 簡潔なスタイルでレポートするためのWebdriverIOプラグイン。

## インストール

最も簡単な方法は、`@wdio/concise-reporter`を`package.json`のdevDependencyとして保持することです：

```sh
npm install @wdio/concise-reporter --save-dev
```

`WebdriverIO`のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)で確認できます。

## 設定

以下のコードはデフォルトのwdioテストランナー設定を示しています。レポーターの配列に`'concise'`を追加するだけです。

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```