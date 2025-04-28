---
id: proxy
title: プロキシ設定
---

プロキシを通じて2種類のリクエストをトンネリングできます：

- テストスクリプトとブラウザドライバー（またはWebDriverエンドポイント）間の接続
- ブラウザとインターネット間の接続

## ドライバーとテスト間のプロキシ

企業がすべての送信リクエスト用の企業プロキシ（例：`http://my.corp.proxy.com:9090`）を使用している場合は、以下の手順に従って[undici](https://github.com/nodejs/undici)をインストールして設定してください。

### undiciのインストール

```bash npm2yarn
npm install undici --save-dev
```

### 設定ファイルにundici setGlobalDispatcherを追加する

以下のrequireステートメントを設定ファイルの先頭に追加します。

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

プロキシの設定に関する追加情報は[こちら](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md)にあります。

[Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)を使用する場合は、以下のように起動します：

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## ブラウザとインターネット間のプロキシ

ブラウザとインターネット間の接続をトンネリングするために、プロキシを設定できます。これは例えば[BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy)のようなツールでネットワーク情報やその他のデータをキャプチャするのに役立ちます。

`proxy`パラメータは、標準のケイパビリティを通じて次のように適用できます：

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