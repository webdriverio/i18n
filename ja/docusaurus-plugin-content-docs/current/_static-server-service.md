---
id: static-server-service
title: 静的サーバーサービス
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

一部のプロジェクトはフロントエンドアセットのみで、静的サーバー以上のものでは実行されません。このサービスはテスト中に静的ファイルサーバーを実行するのに役立ちます。

## インストール

最も簡単な方法は、以下のようにして`package.json`に`@wdio/static-server-service`を`devDependency`として追加することです：

```sh
npm install @wdio/static-server-service --save-dev
```

`WebdriverIO`のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted)をご覧ください。

## 設定

静的サーバーサービスを使用するには、サービス配列に`static-server`を追加します：

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## オプション

### `folders` (必須)

フォルダパスとマウントポイントの配列。

型: `Array<Object>`
プロパティ:
 - mount `{String}` - フォルダがマウントされるURLエンドポイント。
 - path `{String}` - マウントするフォルダへのパス。

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

サーバーをバインドするポート。

型: `Number`

デフォルト: `4567`

### `middleware`

ミドルウェアオブジェクトの配列。設定でこれらをロードしてインスタンス化し、静的サーバーが使用するために渡します。

型: `Array<Object>`
プロパティ:
 - mount `{String}` - ミドルウェアがマウントされるURLエンドポイント。
 - middleware `<Object>` - ミドルウェア関数コールバック。

デフォルト: `[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

WebdriverIOの詳細については、[ホームページ](http://webdriver.io)をご覧ください。