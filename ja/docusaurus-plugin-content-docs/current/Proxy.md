---
id: proxy
title: プロキシの設定
---

プロキシを介して2種類のリクエストをトンネリングすることができます：

- テストスクリプトとブラウザドライバー（またはWebDriverエンドポイント）間の接続
- ブラウザとインターネット間の接続

## ドライバーとテスト間のプロキシ

会社が企業プロキシ（例：`http://my.corp.proxy.com:9090`）を全ての送信リクエストに使用している場合、WebdriverIOをプロキシで使用するための2つの設定オプションがあります：

### オプション1：環境変数の使用（推奨）

WebdriverIO v9.12.0以降では、標準的なプロキシ環境変数を設定するだけで済みます：

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# オプション：特定のホストにはプロキシをバイパスする
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

その後、通常通りテストを実行します。WebdriverIOは自動的にこれらの環境変数をプロキシ設定に使用します。

### オプション2：undiciのsetGlobalDispatcherを使用

より高度なプロキシ設定やプログラムによる制御が必要な場合は、undiciの`setGlobalDispatcher`メソッドを使用できます：

#### undiciのインストール

```bash npm2yarn
npm install undici --save-dev
```

#### undici setGlobalDispatcherをコンフィグファイルに追加

コンフィグファイルの先頭に次のrequire文を追加します。

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

プロキシの設定に関する追加情報は[こちら](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md)にあります。

### どの方法を使うべきか？

- **環境変数を使用する**：異なるツール間で動作する簡単で標準的なアプローチが必要で、コード変更が不要な場合。
- **setGlobalDispatcherを使用する**：カスタム認証、環境ごとに異なるプロキシ設定、またはプログラムでプロキシの動作を制御するなどの高度な機能が必要な場合。

どちらの方法も完全にサポートされており、WebdriverIOはグローバルディスパッチャーを最初にチェックし、存在しない場合は環境変数にフォールバックします。

### Sauce Connect Proxy

[Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)を使用する場合は、次のように起動します：

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## ブラウザとインターネット間のプロキシ

ブラウザとインターネット間の接続をトンネリングするために、プロキシを設定できます。これは例えば[BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy)のようなツールでネットワーク情報やその他のデータをキャプチャするのに役立ちます。

`proxy`パラメータは、標準的なケイパビリティを通じて次のように適用できます：

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