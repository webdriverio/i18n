---
id: appium-service
title: Appium サービス
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Appiumサーバーの処理は、実際のWebdriverIOプロジェクトの範囲外です。このサービスは、[WDIOテストランナー](https://webdriver.io/docs/clioptions)でテストを実行する際に、Appiumサーバーをシームレスに実行するのに役立ちます。子プロセスで[Appiumサーバー](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium)を起動します。

## インストール

最も簡単な方法は、`@wdio/appium-service`を`package.json`の開発依存関係（devDependency）として維持することです：

```sh
npm install @wdio/appium-service --save-dev
```

`WebdriverIO`のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)で確認できます。

## 設定

サービスを使用するには、サービス配列に`appium`を追加する必要があります：

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // デフォルトのappiumポート
    services: ['appium'],
    // ...
};
```

## オプション

以下のオプションをwdio.conf.jsファイルに追加できます。サービスのオプションを定義するには、次のようにサービスを`services`リストに追加する必要があります：

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // デフォルトのappiumポート
    services: [
        ['appium', {
            // Appiumサービスオプションをここに記述
            // ...
        }]
    ],
    // ...
};
```

### logPath
Appiumサーバーからのすべてのログを保存するパス。

型: `String`

例:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
グローバルにインストールされているなど、インストール済みのAppiumを使用するには、起動すべきコマンドを指定します。

型: `String`

例:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Appiumサーバーに渡す引数のマップで、直接`appium`に渡されます。

可能な引数については[ドキュメント](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md)を参照してください。
引数は小文字のキャメルケースで提供されます。例えば、`debugLogSpacing: true`は`--debug-log-spacing`に変換されるか、Appiumのドキュメントに記載されている通りに提供することもできます。

型: `Object`

デフォルト: `{}`

例:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**注意:** エイリアスの使用は推奨されず、サポートされていません。代わりに、小文字のキャメルケースでの完全なプロパティ名を使用してください。

----

WebdriverIOの詳細については[ホームページ](https://webdriver.io)をご覧ください。