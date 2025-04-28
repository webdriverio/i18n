---
id: proxy
title: プロキシの設定
---

2種類の異なるリクエストをプロキシ経由でトンネリングすることができます：

- テストスクリプトとブラウザドライバー（またはWebDriverエンドポイント）間の接続
- ブラウザとインターネット間の接続

## ドライバーとテスト間のプロキシ

企業が全ての送信リクエストに対して企業プロキシ（例：`http://my.corp.proxy.com:9090`）を使用している場合は、以下の手順に従って[undici](https://github.com/nodejs/undici)をインストールして設定してください。

### undiciのインストール

```bash npm2yarn
npm install undici --save-dev
```

### undici setGlobalDispatcherをコンフィグファイルに追加

以下のrequire文をコンフィグファイルの先頭に追加してください。

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

プロキシの設定に関する追加情報は[こちら](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md)で確認できます。

[Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)を使用する場合は、以下のように起動してください：

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## ブラウザとインターネット間のプロキシ

ブラウザとインターネット間の接続をトンネリングするために、プロキシを設定することができます。これは（例えば）[BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy)のようなツールでネットワーク情報やその他のデータをキャプチャするのに役立ちます。

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