---
id: wdio-nuxt-service
title: Nuxt サービス
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)をご覧ください

このサービスは、ビルドツールとして[Nuxt](https://nuxt.com/)を使用する際にアプリケーションを起動するのに役立ちます。テストを開始する前に、`nuxt.conf.js`を使用してNuxtサーバーを自動的に起動します。

## インストール

WebdriverIOを始める場合は、設定ウィザードを使用してすべてをセットアップできます:

```sh
npm init wdio@latest .
```

プロジェクトをNuxtプロジェクトとして検出し、必要なすべてのプラグインをインストールします。既存のセットアップにこのサービスを追加する場合は、以下のようにインストールできます:

```bash
npm install wdio-nuxt-service --save-dev
```

## 設定

サービスを有効にするには、`wdio.conf.js`ファイルの`services`リストに追加するだけです。例えば:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

設定オブジェクトを含む配列を渡すことで、サービスオプションを適用できます。例えば:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## 使用方法

設定が適切に設定されていれば、サービスは[`baseUrl`](https://webdriver.io/docs/configuration#baseurl)オプションをアプリケーションを指すように設定します。[`url`](https://webdriver.io/docs/api/browser/url)コマンドを使用してナビゲートできます。例えば:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## オプション

### `rootDir`

プロジェクトのルートディレクトリ。

Type: `string`<br />
Default: `process.cwd()`

### `dotenv`

サーバー起動前に読み込む環境ファイル。

Type: `string`<br />
Default: `.env`

### `hostname`

サーバーを起動するホスト名。

Type: `string`<br />
Default: `localhost`

### `port`

サーバーを起動するポート。

Type: `number`<br />
Default: `process.env.NUXT_PORT || config.devServer.port`

### `https`

テストサーバーをhttpsで起動する場合はtrueに設定します（証明書はNuxt設定で構成する必要があります）。

Type: `boolean`<br />
Default: `false`

### `sslCert`

httpsでサーバーを起動するために使用するSSL証明書。

Type: `string`

### `sslKey`

httpsでサーバーを起動するために使用するSSLキー。

Type: `string`

----

WebdriverIOの詳細については[ホームページ](https://webdriver.io)をご覧ください。