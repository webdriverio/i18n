---
id: wdio-winappdriver-service
title: winappdriver サービス
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service はサードパーティのパッケージです。詳細については [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service) をご覧ください。

このサービスは、[WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html) でテストを実行する際に、WinAppDriverサーバーをシームレスに実行するのに役立ちます。子プロセスで [WinAppDriver](https://github.com/Microsoft/WinAppDriver) を起動します。

## インストール

```bash
npm install wdio-winappdriver-service --save-dev
```

`WebdriverIO` のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted.html)をご覧ください。

## 設定

このサービスを使用するには、サービス配列に `winappdriver` を追加する必要があります：

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## オプション

以下のオプションは wdio.conf.js ファイルに追加できます。サービスのオプションを定義するには、次のようにサービスを `services` リストに追加する必要があります：

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            // WinAppDriver サービスオプションをここに記述
            // ...
        }]
    ],
    // ...
};
```

### logPath

winappdriver サーバーからのすべてのログを保存するパス。

タイプ: `String`

例:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

グローバルにインストールされたものなど、独自のWinAppDriverインストールを使用するには、起動するコマンドを指定します。

タイプ: `String`

例:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

`WinAppDriver` に直接渡される引数のリスト。

可能な引数については[ドキュメント](https://github.com/Microsoft/WinAppDriver)を参照してください。

タイプ: `Array`

デフォルト: `[]`

例:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```