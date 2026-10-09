---
id: proxy
title: プロキシ設定
description: "テストとドライバー間、またはブラウザとインターネット間のリクエストをプロキシ経由でルーティングします。"
---

2種類のリクエストをプロキシ経由でトンネリングできます：

- テストスクリプトとブラウザドライバー（またはWebDriverエンドポイント）間の接続
- ブラウザとインターネット間の接続

## ドライバーとテスト間のプロキシ

会社がすべての送信リクエストに対して企業プロキシ（例：`http://my.corp.proxy.com:9090`）を使用している場合、WebdriverIOがプロキシを使用するように設定する方法は2つあります：

### オプション1：環境変数を使用する（推奨）

WebdriverIO v9.12.0以降では、標準的なプロキシ環境変数を設定するだけで済みます：

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# オプション：特定のホストでプロキシをバイパスする
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

その後、通常どおりテストを実行します。WebdriverIOはこれらの環境変数を自動的にプロキシ設定に使用します。

### オプション2：undiciのsetGlobalDispatcherを使用する

より高度なプロキシ設定が必要な場合や、プログラムによる制御が必要な場合は、undiciの`setGlobalDispatcher`メソッドを使用できます：

#### undiciをインストールする

```bash npm2yarn
npm install undici --save-dev
```

#### 設定ファイルにundiciのsetGlobalDispatcherを追加する

設定ファイルの先頭に次のrequire文を追加します。

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

プロキシの設定に関する追加情報は[こちら](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md)で確認できます。

### どちらの方法を使用すべきか？

- **環境変数を使用する**：さまざまなツールで機能し、コードの変更を必要としない、シンプルで標準的なアプローチを求める場合。
- **setGlobalDispatcherを使用する**：カスタム認証、環境ごとに異なるプロキシ設定などの高度なプロキシ機能が必要な場合や、プロキシの動作をプログラムで制御したい場合。

どちらの方法も完全にサポートされており、WebdriverIOはまずグローバルディスパッチャーを確認し、存在しない場合は環境変数にフォールバックします。

### Sauce Connect Proxy

[Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)を使用する場合は、次のように起動します：

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## ブラウザとインターネット間のプロキシ

ブラウザとインターネット間の接続をトンネリングするためにプロキシを設定できます。これは、例えば[BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy)などのツールを使用してネットワーク情報やその他のデータをキャプチャする場合に便利です。

`proxy`パラメータは、標準のcapabilitiesを介して次のように適用できます：

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

詳細については、[WebDriver仕様](https://w3c.github.io/webdriver/#proxy)を参照してください。