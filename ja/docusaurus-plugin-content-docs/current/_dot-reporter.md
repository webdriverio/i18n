---
id: dot-reporter
title: ドットレポーター
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> ドットスタイルで報告するWebdriverIOプラグイン。

![Dot Reporter](/img/dot.png "Dot Reporter")

## インストール

最も簡単な方法は、`@wdio/dot-reporter`を`package.json`の開発依存関係として維持することです：

```sh
npm install @wdio/dot-reporter --save-dev
```

`WebdriverIO`のインストール方法については[こちら](/docs/gettingstarted)をご覧ください。

## 設定

以下のコードはデフォルトのwdioテストランナー設定を示しています。レポーターの配列に`'dot'`を追加するだけです。

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

WebdriverIOの詳細については[ホームページ](https://webdriver.io)をご覧ください。