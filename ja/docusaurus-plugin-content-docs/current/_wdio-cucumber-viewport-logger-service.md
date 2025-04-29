---
id: wdio-cucumber-viewport-logger-service
title: Cucumber ビューポートロガーサービス
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumber-viewport-logger-serviceはサードパーティパッケージです。詳細については[GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)をご覧ください
## WebdriverIOのためのCucumber ビューポートロガーサービス

このサービスは、WebdriverIOベースのソリューションでCucumberステップやその他のデバッグ情報をブラウザウィンドウに直接ログ出力する機能を追加します。特に、デバイスや仮想マシンに直接*物理的*にアクセスできない場合や、e2eテストを深くデバッグするためのインタラクティブなセッションを設定できない場合に便利です。

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### クイックスタート

パッケージをインストールします：

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

`services`設定セクションにサービスを追加します：

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### サービスオプション

| オプション  | 説明 | タイプ |デフォルト値 |
| --- | --- | --- | --- |
| `numberOfSteps`  | ビューポートに表示されるステップの数  | number |3 |
| `enabled`  | サービスの有効/無効 | boolean |true |
| `styles`  | ロガーラッパー、*ステップキーワード*および*ステップテキスト*のCSSスタイル、以下の例を参照  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // `VP_LOGGER`環境変数を`1`に設定した場合のみサービスが有効になります
            // 特定の要素にカスタムCSSスタイルを設定
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - カスタムメッセージをカスタムCSSスタイル（必須ではない）でレンダリングします。ステップ定義で使用できます。
例：
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - ビューポートメッセージセクションを削除します。例えば、ビジュアルアサーションを行う場合に便利です

### pointerEvents: 'none'

デフォルトでは、すべてのマウスイベント（クリック、ホバーなど）はメッセージセクションを通過します。例えば、メッセージセクションをクリックする代わりに、クリックはメッセージの隣にある要素（アプリの要素）に「通過」します。この動作を変更したい場合は、ラッパースタイルの'pointerEvents'オプションを'auto'に設定します：
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```