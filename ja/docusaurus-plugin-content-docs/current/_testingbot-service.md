---
id: testingbot-service
title: Testingbot サービス
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> TestingBotとのより良い統合を提供するWebdriverIOサービス。ジョブメタデータ（'name'、'passed'、'tags'、'public'、'build'、'extra'）を更新し、必要に応じてTestingBot Tunnelを実行します。

## インストール

最も簡単な方法は、`@wdio/testingbot-service`を`package.json`のdevDependencyとして維持することです：

```sh
npm install @wdio/testingbot-service --save-dev
```

`WebdriverIO`のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)で確認できます。

## 設定

このサービスを使用するには、`wdio.conf.js`ファイルで`user`と`key`を設定し、`hostname`オプションを`hub.testingbot.com`に設定する必要があります。[TestingBot Tunnel](https://testingbot.com/support/other/tunnel)を使用したい場合は、`tbTunnel: true`を設定する必要があります。

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## オプション

TestingBotサービスを認証するには、設定に[`user`](https://webdriver.io/docs/options#user)と[`key`](https://webdriver.io/docs/options#key)オプションが含まれている必要があります。

### tbTunnel
trueに設定すると、TestingBot Tunnelを実行し、ブラウザテストを実行しているTestingBot仮想マシンとの安全な接続を開きます。

タイプ: `Boolean`<br />
デフォルト: `false`

### tbTunnelOpts
TestingBot Tunnelオプションを適用します（例：ポート番号やlogFile設定を変更するため）。詳細については[このリスト](https://github.com/testingbot/testingbot-tunnel-launcher)を参照してください。

タイプ: `Object`<br />
デフォルト: `{}`