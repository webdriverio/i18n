---
id: browserstack-service
title: Browserstack サービス
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> BrowserStackユーザー向けにローカルトンネルとジョブメタデータを管理するWebdriverIOサービス。

## インストール


最も簡単な方法は、`@wdio/browserstack-service`を`package.json`のdevDependencyとして保持することです：

```sh
npm install @wdio/browserstack-service --save-dev
```

`WebdriverIO`のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)をご覧ください。


## 設定

WebdriverIOにはBrowserStackのサポートが標準で組み込まれています。`wdio.conf.js`ファイルに`user`と`key`を設定する必要があります。このサービスプラグインは[BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing)のサポートを提供します。この機能を有効にするには`browserstackLocal: true`も設定してください。
BrowserStack上でのセッションステータスのレポートはCucumberオプションの`strict`設定を尊重します。

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "プロジェクト名をここに入力",
                buildName: "静的なビルドジョブ名をここに入力（例：Nightly regression）"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## オプション

BrowserStackサービスへの認証を行うには、コンフィグに[`user`](https://webdriver.io/docs/options#user)と[`key`](https://webdriver.io/docs/options#key)オプションが含まれている必要があります。

### testObservability

テスト観測性は、自動化テストを改善するための洞察を提供し、より速くデバッグするのに役立つ高度なテストレポートツールです。これはbrowserstack-serviceのすべてのユーザーに対して、`testObservability`フラグを`true`に設定することでデフォルトで有効になっています。`testObservability`フラグを`false`に設定することでこれを無効にすることができます。

テストが完了すると、[Test Observability](https://observability.browserstack.com/)にアクセスして、ユニークエラー分析、自動フレーキーテスト検出などの追加の洞察でビルドをデバッグできます。

BrowserStackインフラストラクチャでテストを実行しなくても、Test Observabilityを使用できます。CIやローカルマシン、あるいは他のクラウドサービスプロバイダーでテストを実行しても、Test Observabilityはテストに関するインテリジェントなテストレポートと高度な分析を生成できます。

BrowserStackインフラストラクチャでテストを実行せずにTest Observabilityを使用したい場合は、次のようにコンフィグを設定できます：


```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "プロジェクト名をここに入力",
                buildName: "静的なビルドジョブ名をここに入力（例：Nightly regression）"
            }
        }]
    ],
    // ...
};
```

Test Observabilityのすべての機能は[このサンドボックス](https://observability-demo.browserstack.com/)で確認したり、[こちら](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability)で詳細を読むことができます。

### browserstackLocal
BrowserStackクラウドからの接続をあなたのコンピュータを経由してルーティングするには、これをtrueに設定します。

タイプ: `Boolean`<br />
デフォルト: `false`

### forcedStop
BrowserStack Localの停止コールバックが呼び出されるのを待たずに、完了時にBrowserStack Localプロセスを強制終了するには、これをtrueに設定します。これは実験的なものであり、すべての人が使用すべきではありません。主に[この問題](https://github.com/browserstack/browserstack-local-nodejs/issues/41)の回避策として必要です。

タイプ: `Boolean`<br />
デフォルト: `false`

### app

[Appium](https://appium.io/)では、Appiumセッションのための[テスト対象アプリケーション](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app)としてアプリを使用するために、ローカルマシンで利用可能なアプリファイルパスでこれを設定します。

タイプ: `String`または`JsonObject`<br />
デフォルト: `undefined`

利用可能なappの値のリスト：

#### path
Appiumのテスト対象アプリケーションとして、ローカルで利用可能なアプリファイルパスを使用します。

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // または
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

アップロード時にcustom_idを渡します。

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
アプリをBrowserStackにアップロードした後に返されるアプリURLを使用します。

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // または
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

既にアップロードされたアプリのcustom_idを使用

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // または
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

既にアップロードされたアプリのshareable_idを使用

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // または
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Cucumberのみ。単一のシナリオが実行された場合、BrowserStack Automateセッション名をシナリオ名に設定します。
[wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution)で並列実行する場合に便利です。

タイプ: `Boolean`<br />
デフォルト: `false`

### sessionNameFormat

BrowserStack Automateセッション名の形式をカスタマイズします。

タイプ: `Function`<br />
デフォルト(Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
デフォルト(Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Mochaのみ。BrowserStack Automateセッション名にテストタイトルを追加しません。

タイプ: `Boolean`<br />
デフォルト: `false`

### sessionNamePrependTopLevelSuiteTitle

Mochaのみ。BrowserStack Automateセッション名の前にトップレベルのスイートタイトルを追加します。

タイプ: `Boolean`<br />
デフォルト: `false`

### setSessionName

BrowserStack Automateセッション名を自動的に設定します。

タイプ: `Boolean`<br />
デフォルト: `true`

### setSessionStatus

BrowserStack Automateセッションのステータス（成功/失敗）を自動的に設定します。

タイプ: `Boolean`<br />
デフォルト: `true`

### buildIdentifier

**buildIdentifier**は、buildNameに追加される実行ごとの一意のIDです。利用可能な式から、buildIdentifierの形式を選択してください：
* `BUILD_NUMBER`: 実行ごとに増分するカウンター
* `DATE_TIME`: 実行ごとにタイムスタンプを生成します。例：05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
ビルド識別子は、カスタムフォーマットオプションを有効にする他の文字と共に、いずれかまたは両方の式の使用をサポートします。

### opts

BrowserStack Localのオプション。

タイプ: `Object`<br />
デフォルト: `{}`

optsとして渡すことができるローカルテスト修飾子のリスト：

#### ローカル識別子

同時に複数のローカルテスト接続を行う場合、異なるプロセスに対してこれを一意に設定します -

```js
opts = { localIdentifier: "randomstring" };
```

#### 詳細ログ

詳細ログを有効にするには -

```js
opts = { verbose: "true" };
```

注 - 'verbose'修飾子の可能な値は'1'、'2'、'3'、'true'です

#### ローカル強制

すべてのトラフィックをローカル（あなたの）マシン経由でルーティングするには -

```js
opts = { forceLocal: "true" };
```

#### フォルダーテスト

内部サーバーではなくローカルフォルダーをテストするには、このオプションの値としてフォルダーへのパスを提供します -

```js
opts = { f: "/my/awesome/folder" };
```

#### 強制スタート

他の実行中のBrowserStack Localインスタンスを終了するには -

```js
opts = { force: "true" };
```

#### オートメートのみ

LiveとScreenshotsのローカルテストを無効にし、Automateのみを有効にするには -

```js
opts = { onlyAutomate: "true" };
```

#### プロキシ

ローカルテストにプロキシを使用するには -

- proxyHost: プロキシのホスト名/IP、このオプションがない場合、残りのプロキシオプションは無視されます
- proxyPort: プロキシのポート、-proxyHostが使用される場合のデフォルトは3128
- proxyUser: プロキシへの接続のためのユーザー名（基本認証のみ）
- proxyPass: USERNAMEのパスワード、USERNAMEが空または指定されていない場合は無視されます

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### ローカルプロキシ

ローカルテストでローカルプロキシを使用するには -

- localProxyHost: プロキシのホスト名/IP、このオプションがない場合、残りのプロキシオプションは無視されます
- localProxyPort: プロキシのポート、-localProxyHostが使用される場合のデフォルトは8081
- localProxyUser: プロキシへの接続のためのユーザー名（基本認証のみ）
- localProxyPass: USERNAMEのパスワード、USERNAMEが空または指定されていない場合は無視されます

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC（プロキシ自動構成）

ローカルテストでPAC（プロキシ自動構成）を使用するには -

- pac-file: PAC（プロキシ自動構成）ファイルの絶対パス

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### バイナリパス

デフォルトでは、BrowserStackローカルラッパーは最新バージョンのBrowserStackバイナリをダウンロードして実行しようとします。ダウンロード場所は~/.browserstackか現在の作業ディレクトリかtmpフォルダの順です。しかし、-binarypathを渡すことでこれらを上書きすることができます。
ローカルバイナリパスを指定するパス -

```js
opts = { binarypath: "/path/to/binary" };
```

#### ログファイル

'-v'引数で実行する際にログをファイルに保存するには、ファイルのパスを指定できます。デフォルトでは、ログは現在の作業ディレクトリのlocal.logファイルに保存されます。
ログが保存されるファイルのパスを指定するには -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

WebdriverIOの詳細情報については、[ホームページ](https://webdriver.io)をご覧ください。