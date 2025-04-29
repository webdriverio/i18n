---
id: wdio-ywinappdriver-service
title: ywinappdriver サービス
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service はサードパーティのパッケージです。詳細については[GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)をご覧ください。

このサービスは、[WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html)でテストを実行する際に、ywinappdriver サーバーをシームレスに実行するのに役立ちます。子プロセスで[ywinappdriver](https://github.com/licanhua/YWinAppDriver)を起動します。

## インストール

```bash
npm install wdio-ywinappdriver-service --save-dev
```

`WebdriverIO`のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted.html)をご覧ください。

## 設定

このサービスを使用するには、サービス配列に`ywinappdriver`を追加する必要があります：

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## オプション

以下のオプションをwdio.conf.jsファイルに追加できます。サービスのオプションを定義するには、次のように`services`リストにサービスを追加する必要があります：

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // ywinappdriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

ywinappdriver サーバーからのすべてのログを保存するパス。

タイプ: `String`

例:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

グローバルにインストールされているなど、独自のwinappdriver インストールを使用するには、起動するコマンドを指定します。

タイプ: `String`

例:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

`ywinappdriver`に直接渡される引数のリスト。

使用可能な引数については[ドキュメント](https://github.com/licanhua/ywinappdriver)を参照してください。

タイプ: `Array`

デフォルト: `[]`

例:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```