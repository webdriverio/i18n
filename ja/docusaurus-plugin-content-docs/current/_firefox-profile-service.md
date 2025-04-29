---
id: firefox-profile-service
title: Firefox プロファイルサービス
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

特定の拡張機能を使用してFirefoxブラウザを実行したり、いくつかの設定を行いたいですか？Seleniumでは、このプロファイルを`base64`文字列として`moz:firefoxOptions.profile`プロパティに渡すことで、Firefoxブラウザ用のプロファイルを使用できます。これには、そのプロファイルを構築して`base64`に変換する必要があります。[wdio testrunner](https://webdriver.io/docs/clioptions)用のこのサービスは、プロファイルのコンパイル作業を代行し、`wdio.conf.js`ファイルから快適に必要なオプションを定義できるようにします。

すべての可能なオプションを見つけるには、Firefoxブラウザで[about:config](about:config)を開くか、[mozillaZine](http://kb.mozillazine.org/About:config_entries)ウェブサイトにアクセスして、各設定に関する完全なドキュメントを確認してください。それに加えて、テスト開始前にインストールされるべきコンパイル済み（`*.xpi`形式）のFirefox拡張機能を定義することもできます。

## インストール

最も簡単な方法は、`package.json`に`@wdio/firefox-profile-service`をdevDependencyとして保持することです：

```sh
npm install @wdio/firefox-profile-service --save-dev
```

`WebdriverIO`のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)で確認できます。

## 設定

サービスリストに`firefox-profile`サービスを追加して、プロファイルを設定します。次に、次のように`firefoxProfile`プロパティで設定を定義します：

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // .xpiファイルへのパス
                '/path/to/extensionB' // または解凍済みのFirefox拡張機能へのパス
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // firefox 55以下の場合のみ使用
        }]
    ],
    // ...
};
```

ブラウザにインストールするカスタムFirefox拡張機能を構築した場合は、Firefox拡張機能は[Mozillaによる署名](https://wiki.mozilla.org/Add-ons/Extension_Signing)が必要なため、プロファイルフラグとして`'xpinstall.signatures.required': false`を設定してください。

カスタムの署名されていない拡張機能を使用するには、Firefox 48以降の通常版では[許可されていない](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline)ため、[Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/)を使用する必要があります。

## オプション

すべての設定をキーと値のペアとして含みます。すべての利用可能な設定は`about:config`ページで見つけることができます。

### extensions

ブラウザセッションに1つまたは複数の拡張機能を追加します。すべてのエントリは、`.xpi`ファイルへの絶対パスか、解凍済みのFirefox拡張機能ディレクトリへのパスのいずれかです。

タイプ: `String[]`<br />
デフォルト: `[]`

### profileDirectory

既存のプロファイルに基づいてFirefoxプロファイルを作成するには、そのプロファイルへの絶対パスを設定します。

タイプ: `String`<br />
デフォルト: `null`

### proxy

ネットワークプロキシ設定を設定します。パラメータ`proxy`はハッシュであり、その構造は必須キー`proxyType`の値に依存します。`proxyType`は以下の文字列値のいずれかを取ります：

 * `direct` - 直接接続（プロキシなし）
 * `system` - オペレーティングシステムのプロキシ設定を使用
 * `pac` - `autoconfigUrl`キーの値に基づいて設定された自動プロキシ構成を使用
 * `manual` - 以下のキーからの値を使用して、異なるプロトコルに対して個別に定義された手動プロキシ設定：`ftpProxy`、`httpProxy`、`sslProxy`、`socksProxy`

タイプ: `Object`<br />
デフォルト: `null`<br />
例：

- 自動プロキシ：
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- 手動HTTPプロキシ：
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- 手動HTTPおよびHTTPSプロキシ：
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

Firefox v55以下を使用している場合は、このフラグを`true`に設定してください。

タイプ: `Boolean`<br />
デフォルト: `false`

----

WebdriverIOの詳細については、[ホームページ](https://webdriver.io)をご覧ください。