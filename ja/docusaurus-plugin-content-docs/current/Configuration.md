---
id: configuration
title: 設定
description: "WebDriver、スタンドアロンのWebdriverIO、およびWDIOテストランナーのすべての設定オプションを、テストランナーのすべてのフックを含めて確認できます。"
---

[セットアップの種類](/docs/setuptypes)（例：生のプロトコルバインディングを使用する場合、WebdriverIOをスタンドアロンパッケージとして使用する場合、またはWDIOテストランナーを使用する場合）に応じて、環境を制御するために利用できるオプションが異なります。

## WebDriverオプション

[`webdriver`](https://www.npmjs.com/package/webdriver)プロトコルパッケージを使用する場合、以下のオプションが定義されています：

### protocol

<Option type="String" default="http">

ドライバーサーバーとの通信に使用するプロトコル。

</Option>

### hostname

<Option type="String" default="0.0.0.0">

ドライバーサーバーのホスト。

</Option>

### port

<Option type="Number" default="undefined">

ドライバーサーバーが稼働しているポート。

</Option>

### path

<Option type="String" default="/">

ドライバーサーバーのエンドポイントへのパス。

</Option>

### queryParams

<Option type="Object" default="undefined">

ドライバーサーバーに渡されるクエリパラメータ。

</Option>

### user

<Option type="String" default="undefined">

クラウドサービスのユーザー名（[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)、または[TestMu AI](https://www.testmuai.com/)のアカウントでのみ動作します）。設定すると、WebdriverIOが自動的に接続オプションを設定します。クラウドプロバイダーを使用しない場合は、他のWebDriverバックエンドの認証に使用できます。

</Option>

### key

<Option type="String" default="undefined">

クラウドサービスのアクセスキーまたはシークレットキー（[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)、または[TestMu AI](https://www.testmuai.com/)のアカウントでのみ動作します）。設定すると、WebdriverIOが自動的に接続オプションを設定します。クラウドプロバイダーを使用しない場合は、他のWebDriverバックエンドの認証に使用できます。

</Option>

### capabilities

<Option type="Object" default="null">

WebDriverセッションで実行したいcapabilitiesを定義します。詳細については[WebDriverプロトコル](https://w3c.github.io/webdriver/#capabilities)を確認してください。

WebDriverベースのcapabilitiesに加えて、リモートブラウザやデバイスをより詳細に設定できるブラウザ固有およびベンダー固有のオプションを適用できます。これらは対応するベンダーのドキュメントに記載されています。例：

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)用
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)用
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)用
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)用
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)用
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)用

さらに、Sauce Labsの[Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/)は便利なユーティリティで、必要なcapabilitiesをクリックして組み合わせることでこのオブジェクトを作成できます。

</Option>
**例：**

```js
{
    browserName: 'chrome', // オプション: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // ブラウザのバージョン
    platformName: 'Windows 10' // OSプラットフォーム
}
```

モバイルデバイスでWebテストまたはネイティブテストを実行する場合、`capabilities`はWebDriverプロトコルとは異なります。詳細については[Appiumドキュメント](https://appium.io/docs/en/latest/guides/caps/)を参照してください。

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

ログの詳細レベル。

</Option>

### outputDir

<Option type="String" default="null">

すべてのテストランナーのログファイル（レポーターのログや`wdio`ログを含む）を保存するディレクトリ。設定しない場合、すべてのログは`stdout`にストリーミングされます。ほとんどのレポーターは`stdout`にログを出力するように作られているため、このオプションは、レポートをファイルに出力する方が適している特定のレポーター（例えば`junit`レポーターなど）に対してのみ使用することをお勧めします。

スタンドアロンモードで実行する場合、WebdriverIOによって生成されるログは`wdio`ログのみです。

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

ドライバーまたはグリッドへのWebDriverリクエストのタイムアウト。

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Seleniumサーバーへのリクエストの最大リトライ回数。

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

WebDriver Bidiコマンドがブラウザからレスポンスを受け取るまでのタイムアウト（ミリ秒）。[`execute`](/docs/api/browser/execute)など、正当な理由でデフォルトより解決に時間がかかるコマンドを実行する場合はこの値を増やしてください。そうしないと、ブラウザの処理が完了する前にWebdriverIOが待機を打ち切ってしまいます。

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

リクエストを行うためにカスタムの` http`/`https`/`http2` [エージェント](https://www.npmjs.com/package/got#agent)を使用できます。

</Option>

### headers

<Option type="Object" default={`{}`}>

すべてのWebDriverリクエストに渡すカスタム`headers`を指定します。Selenium GridがBasic認証を必要とする場合は、このオプションを通じて`Authorization`ヘッダーを渡し、WebDriverリクエストを認証することをお勧めします。例：

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// 環境変数からユーザー名とパスワードを読み込む
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ユーザー名とパスワードをコロン区切りで結合する
const credentials = `${username}:${password}`;
// 認証情報をBase64でエンコードする
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

WebDriverリクエストが行われる前に[HTTPリクエストオプション](https://github.com/sindresorhus/got#options)をインターセプトする関数

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

WebDriverレスポンスが到着した後にHTTPレスポンスオブジェクトをインターセプトする関数。この関数には、第1引数として元のレスポンスオブジェクト、第2引数として対応する`RequestOptions`が渡されます。

</Option>

### strictSSL

<Option type="Boolean" default="true">

SSL証明書が有効であることを要求しないかどうか。
環境変数`STRICT_SSL`または`strict_ssl`で設定することもできます。

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

[Appiumのダイレクト接続機能](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments)を有効にするかどうか。
フラグが有効でも、レスポンスに適切なキーが含まれていない場合は何も行いません。

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

キャッシュディレクトリのルートへのパス。このディレクトリは、セッションの開始時にダウンロードされるすべてのドライバーを保存するために使用されます。

</Option>

### maskingPatterns

<Option type="String" default="undefined">

より安全なロギングのために、`maskingPatterns`で設定した正規表現によってログ内の機密情報を難読化できます。
 - 文字列の形式は、フラグ付きまたはフラグなしの正規表現（例：`/.../i`）で、複数の正規表現はカンマで区切ります。
 - マスキングパターンの詳細については、[WDIO Logger READMEのMasking Patternsセクション](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)を参照してください。

</Option>
**例：**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

以下のオプション（上記のオプションを含む）は、スタンドアロンのWebdriverIOで使用できます：

### automationProtocol

<Option type="String" default="webdriver">

ブラウザ自動化に使用するプロトコルを定義します。現在サポートされているのは[`webdriver`](https://www.npmjs.com/package/webdriver)のみです。これはWebdriverIOが使用する主要なブラウザ自動化技術です。

別の自動化技術を使用してブラウザを自動化したい場合は、このプロパティに、以下のインターフェースに準拠するモジュールに解決されるパスを設定してください：

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * 自動化セッションを開始し、対応する自動化コマンドを持つWebdriverIOの
     * [モナド](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * を返します。リファレンス実装として[webdriver](https://www.npmjs.com/package/webdriver)パッケージを
     * 参照してください
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIOのオプション
     * @param {Function} hook 関数から返される前にクライアントを変更できるフック
     * @param {PropertyDescriptorMap} userPrototype ユーザーがカスタムプロトコルコマンドを追加できるようにします
     * @param {Function} customCommandWrapper コマンドの実行を変更できるようにします
     * @returns WebdriverIO互換のクライアントインスタンス
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * ユーザーが既存のセッションにアタッチできるようにします
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * インスタンスのセッションIDとブラウザのcapabilitiesを、渡されたブラウザオブジェクトに
     * 直接新しいセッションのものとして変更します
     *
     * @optional
     * @param   {object} instance  新しいブラウザセッションから取得したオブジェクト
     * @returns {string}           ブラウザの新しいセッションID
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

ベースURLを設定することで、`url`コマンドの呼び出しを短くできます。
- `url`パラメータが`/`で始まる場合、`baseUrl`が先頭に付加されます（`baseUrl`にパスがある場合、そのパスは除きます）。
- `url`パラメータがスキームや`/`なしで始まる場合（`some/path`など）、完全な`baseUrl`がそのまま先頭に付加されます。

</Option>

### waitforTimeout

<Option type="Number" default="5000">

すべての`waitFor*`コマンドのデフォルトタイムアウト。（オプション名の`f`が小文字であることに注意してください。）このタイムアウトは`waitFor*`で始まるコマンドとそのデフォルトの待機時間に__のみ__影響します。

_テスト_のタイムアウトを増やすには、フレームワークのドキュメントを参照してください。

</Option>

### waitforInterval

<Option type="Number" default="100">

すべての`waitFor*`コマンドが、期待される状態（例：可視性）が変化したかどうかを確認するデフォルトの間隔。

</Option>

### strictSelectors

<Option type="Boolean" default="true">

指定したセレクターが複数の要素に解決された場合、最初に一致した要素を暗黙的に使用する代わりに、[`$`](/docs/api/browser/$)コマンドが`StrictSelectorError`をスローするようにします。`$$`には影響しません。

単一のクエリでこれを無効にするには、第2引数として`{ strict: false }`を渡します。例：`$('button', { strict: false })`。

詳細については[セレクター](/docs/selectors#strict-mode)ガイドを参照してください。

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

[`mock`](/docs/api/browser/mock)コマンドを使用する際に返されるレスポンスボディの最大サイズ（バイト単位）。`0`を指定すると、スパイしたペイロードのデータ収集が無効になります。

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Sauce Labsで実行する場合、異なるデータセンター間でテストを実行するよう選択できます。
短いリージョン名`us`（デフォルト、`us-west-1`に対応）または`eu`（`eu-central-1`に対応）を使用するか、完全なリージョン名を直接指定してください。

__注意：__ これは、Sauce Labsアカウントに紐付いた`user`および`key`オプションを指定した場合にのみ効果があります。

</Option>
*（VMおよびEM/シミュレーターのみ。ただし`us-east-4`と`asia-south-2`は実機のみをホストしています）*

## テストランナーオプション

以下のオプション（上記のオプションを含む）は、WDIOテストランナーでWebdriverIOを実行する場合にのみ定義されています：

### specs

<Option type="(String | String[])[]" default="[]">

テスト実行のためのspecを定義します。globパターンを指定して複数のファイルを一度にマッチさせることも、globまたはパスのセットを配列でラップして単一のワーカープロセス内で実行することもできます。すべてのパスは設定ファイルのパスからの相対パスとして扱われます。

</Option>

### exclude

<Option type="String[]" default="[]">

テスト実行からspecを除外します。すべてのパスは設定ファイルのパスからの相対パスとして扱われます。

</Option>

### suites

<Option type="Object" default={`{}`}>

さまざまなスイートを記述するオブジェクト。`wdio` CLIの`--suite`オプションで指定できます。

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

上記の`capabilities`セクションと同じですが、[マルチリモート](/docs/multiremote)オブジェクト、または並列実行のための複数のWebDriverセッションを配列で指定するオプションがあります。

[上記](/docs/configuration#capabilities)で定義したのと同じベンダー固有およびブラウザ固有のcapabilitiesを適用できます。

</Option>

### maxInstances

<Option type="Number" default="100">

並列実行されるワーカーの合計最大数。

__注意：__ Sauce Labsのマシンなどの外部ベンダーでテストを実行する場合は、`100`のような大きな数値を指定できます。その場合、テストは単一のマシンではなく、複数のVMで実行されます。ローカルの開発マシンでテストを実行する場合は、`3`、`4`、`5`などのより妥当な数値を使用してください。基本的に、これは同時に起動してテストを実行するブラウザの数であるため、マシンのRAM容量や、マシン上で実行されている他のアプリの数に依存します。

`wdio:maxInstances` capabilityを使用して、capabilityオブジェクト内で`maxInstances`を適用することもできます。これにより、その特定のcapabilityの並列セッション数が制限されます。

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

capabilityごとに並列実行されるワーカーの合計最大数。

</Option>

### injectGlobals

<Option type="Boolean" default="true">

WebdriverIOのグローバル（例：`browser`、`$`、`$$`）をグローバル環境に挿入します。
`false`に設定した場合は、`@wdio/globals`からインポートする必要があります。例：

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

注意：WebdriverIOはテストフレームワーク固有のグローバルの注入は扱いません。

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

特定の数のテストが失敗した後にテスト実行を停止したい場合は、`bail`を使用してください。
（デフォルトは`0`で、何があってもすべてのテストを実行します。）**注意：** ここでいうテストとは、単一のspecファイル内のすべてのテスト（MochaまたはJasmineを使用する場合）、またはfeatureファイル内のすべてのステップ（Cucumberを使用する場合）を指します。単一のテストファイル内のテストでbailの動作を制御したい場合は、利用可能な[フレームワーク](frameworks)オプションを確認してください。

</Option>

### specFileRetries

<Option type="Number" default="0">

specファイル全体が失敗した場合に、そのspecファイル全体をリトライする回数。

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

specファイルのリトライ試行間の遅延（秒）

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

リトライされるspecファイルを直ちにリトライするか、キューの最後に延期するか。

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

ログ出力の表示方法を選択します。

`false`に設定すると、異なるテストファイルからのログがリアルタイムで出力されます。並列実行時には、異なるファイルからのログ出力が混在する可能性があることに注意してください。

`true`に設定すると、ログ出力はTest Specごとにグループ化され、Test Specが完了した時点でのみ出力されます。

デフォルトでは`false`に設定されているため、ログはリアルタイムで出力されます。

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

WebdriverIOが各テストの終了時にすべてのソフトアサーションを自動的にアサートするかどうかを制御します。`true`に設定すると、蓄積されたソフトアサーションが自動的にチェックされ、いずれかのアサーションが失敗した場合はテストが失敗します。`false`に設定すると、ソフトアサーションをチェックするためにassertメソッドを手動で呼び出す必要があります。

</Option>

### services

<Option type="String[]|Object[]" default="[]">

サービスは、自分で対処したくない特定の作業を引き受けます。ほとんど手間をかけずにテストセットアップを強化できます。

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

WDIOテストランナーで使用するテストフレームワークを定義します。

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

フレームワーク固有のオプション。利用可能なオプションについては、フレームワークアダプターのドキュメントを参照してください。詳細は[フレームワーク](frameworks)をご覧ください。

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

行番号付きのCucumber featureのリスト（[Cucumberフレームワークを使用する場合](./Frameworks.md#using-cucumber)）。

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

使用するレポーターのリスト。レポーターは文字列、または
`['reporterName', { /* reporter options */}]`の配列のいずれかで指定できます。配列の場合、最初の要素はレポーター名の文字列、2番目の要素はレポーターオプションのオブジェクトです。

</Option>
例：

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

<Option type="Number" default="100 (ms)">

レポーターがログを非同期で報告する場合（例：ログをサードパーティベンダーにストリーミングする場合）に、同期されているかどうかをチェックする間隔を決定します。

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

テストランナーがエラーをスローするまでに、レポーターがすべてのログのアップロードを完了する必要がある最大時間を決定します。

</Option>

### execArgv

<Option type="String[]" default="null">

子プロセスを起動する際に指定するNodeの引数。

</Option>

### cpuProf

<Option type="Boolean" default="false">

ワーカープロセスのCPUプロファイリングを有効にします。プロファイルはワーカープロセスの終了時に自動的に生成されます。

</Option>

### heapProf

<Option type="Boolean" default="false">

ワーカープロセスのヒーププロファイリングを有効にします。スナップショットはワーカープロセスの終了時に自動的に生成されます（サンプリングヒーププロファイラーを使用）。

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

CPUプロファイル（`.cpuprofile`）とヒーププロファイル（`.heapprofile`）が保存されるディレクトリ。

</Option>

### filesToWatch

<Option type="String[]" default="[]">

`--watch`フラグを付けて実行する際に、テストランナーに他のファイル（例：アプリケーションファイル）も追加で監視させるための、globをサポートする文字列パターンのリスト。デフォルトでは、テストランナーはすでにすべてのspecファイルを監視しています。

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

スナップショットを更新したい場合に設定します。理想的にはCLIパラメータの一部として使用します。例：`wdio run wdio.conf.js --s`。

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

デフォルトのスナップショットパスを上書きします。例えば、スナップショットをテストファイルの隣に保存する場合：

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIOはTypeScriptファイルのコンパイルに`tsx`を使用します。TSConfigは現在の作業ディレクトリから自動的に検出されますが、ここでカスタムパスを指定するか、TSX_TSCONFIG_PATH環境変数を設定することもできます。

`tsx`のドキュメントを参照してください：https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Linux上で`DISPLAY`も`WAYLAND_DISPLAY`も設定されていない場合に、実行用の仮想ディスプレイを起動します。ヘッドレスで実行する場合や、クラウドサービスまたはリモートグリッドのみで実行する場合は`false`に設定してください。これはディスプレイサーバーを起動するかどうかのみを制御します：`WAYLAND_DISPLAY`のみが設定されている場合でも、テストランナーは実行時に`XDG_SESSION_TYPE`、`GDK_BACKEND`、`ELECTRON_OZONE_PLATFORM_HINT`を`wayland`に設定します。[ヘッドレスとディスプレイサーバー](/docs/headless-and-display-servers)を参照してください。

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

起動するディスプレイサーバー。`auto`はWestonを試し、Westonが存在しないか起動に失敗した場合はXvfbにフォールバックします。`wayland`と`xvfb`はそのサーバーのみを試します。

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

インストール済みのディスプレイサーバーがいずれも起動しない場合に、システムのパッケージマネージャーを使用して不足しているディスプレイサーバーをインストールします。

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

組み込みのインストールの実行方法：`root`はrootとして実行している場合にのみインストールします。`sudo`はrootでない場合に非対話型の`sudo -n`を使用し、`sudo`がインストールされていない場合はそれなしでインストールします。

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

組み込みのインストールの代わりに、そのまま`sudo`なしで実行するコマンド。`displayServerAutoInstall: true`の場合にのみ実行されます。文字列の場合はシェル内で実行され、配列の場合はシェルなしで実行されます。`auto`の場合、まずWeston用に実行され、Westonがまだ利用できないか起動に失敗し、かつXvfbがまだ存在しない場合にのみ、Xvfb用に再度実行されます。もう一方のサーバーの試行をスキップするには、`displayServer`をこのコマンドがインストールするサーバーに設定してください。

</Option>

### displayServerWidth

<Option type="Number" default="1920">

仮想ディスプレイの画面幅（ピクセル）。

</Option>

### displayServerHeight

<Option type="Number" default="1080">

仮想ディスプレイの画面の高さ（ピクセル）。

</Option>

### displayServerDepth

<Option type="Number" default="24">

仮想ディスプレイの色深度。Xvfbのみ。

</Option>

## フック

WDIOテストランナーでは、テストのライフサイクルの特定のタイミングでトリガーされるフックを設定できます。これにより、カスタムアクション（例：テストが失敗した場合にスクリーンショットを撮る）が可能になります。

すべてのフックは、パラメータとしてライフサイクルに関する特定の情報（例：テストスイートやテストに関する情報）を受け取ります。すべてのフックのプロパティについては、[サンプル設定](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326)で詳しく確認してください。

**注意：** 一部のフック（`onPrepare`、`onWorkerStart`、`onWorkerEnd`、`onComplete`）は別のプロセスで実行されるため、ワーカープロセス内に存在する他のフックとグローバルデータを共有できません。

### onPrepare

すべてのワーカーが起動される前に一度実行されます。

パラメータ：

- `config` (`object`): WebdriverIOの設定オブジェクト
- `param` (`object[]`): capabilitiesの詳細のリスト

### onWorkerStart

ワーカープロセスが生成される前に実行され、そのワーカー用の特定のサービスを初期化したり、ランタイム環境を非同期で変更したりするために使用できます。

パラメータ：

- `cid` (`string`): capability ID（例：0-0）
- `caps` (`object`): ワーカー内で生成されるセッションのcapabilitiesを含むオブジェクト
- `specs` (`string[]`): ワーカープロセスで実行されるspec
- `args` (`object`): ワーカーが初期化された時点でメインの設定とマージされるオブジェクト
- `execArgv` (`string[]`): ワーカープロセスに渡される文字列引数のリスト

### onWorkerEnd

ワーカープロセスが終了した直後に実行されます。

パラメータ：

- `cid` (`string`): capability ID（例：0-0）
- `exitCode` (`number`): 0 - 成功、1 - 失敗。シグナルによって終了したワーカーは、代わりに`128` + シグナル番号を報告します。例：`SIGSEGV`の場合は`139`
- `specs` (`string[]`): ワーカープロセスで実行されるspec
- `retries` (`number`): [_「specファイル単位でリトライを追加する」_](./Retry.md#add-retries-on-a-per-specfile-basis)で定義されている、使用されたspecレベルのリトライ回数
- `signal` (`string`): ワーカーを終了させたシグナル（例：`SIGSEGV`）。自ら終了した場合は`null`

### beforeSession

webdriverセッションとテストフレームワークを初期化する直前に実行されます。capabilityやspecに応じて設定を操作できます。

パラメータ：

- `config` (`object`): WebdriverIOの設定オブジェクト
- `caps` (`object`): ワーカー内で生成されるセッションのcapabilitiesを含むオブジェクト
- `specs` (`string[]`): ワーカープロセスで実行されるspec

### before

テストの実行が開始される前に実行されます。この時点で`browser`などのすべてのグローバル変数にアクセスできます。カスタムコマンドを定義するのに最適な場所です。

パラメータ：

- `caps` (`object`): ワーカー内で生成されるセッションのcapabilitiesを含むオブジェクト
- `specs` (`string[]`): ワーカープロセスで実行されるspec
- `browser` (`object`): 作成されたブラウザ/デバイスセッションのインスタンス

### beforeSuite

スイートが開始される前に実行されるフック（Mocha/Jasmineのみ）

パラメータ：

- `suite` (`object`): スイートの詳細

### beforeHook

スイート内のフックが開始される*前*に実行されるフック（例：MochaでbeforeEachを呼び出す前に実行されます）

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストコンテキスト（CucumberではWorldオブジェクトを表します）

### afterHook

スイート内のフックが終了した*後*に実行されるフック（例：MochaでafterEachを呼び出した後に実行されます）

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストコンテキスト（CucumberではWorldオブジェクトを表します）
- `result` (`object`): フックの結果（`error`、`result`、`duration`、`passed`、`retries`プロパティを含みます）

### beforeTest

テストの前に実行される関数（Mocha/Jasmineのみ）。

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストが実行されたスコープオブジェクト

### beforeCommand

WebdriverIOコマンドが実行される前に実行されます。

パラメータ：

- `commandName` (`string`): コマンド名
- `args` (`*`): コマンドが受け取る引数

### afterCommand

WebdriverIOコマンドが実行された後に実行されます。

パラメータ：

- `commandName` (`string`): コマンド名
- `args` (`*`): コマンドが受け取る引数
- `result` (`*`): コマンドの結果
- `error` (`Error`): エラーがある場合はエラーオブジェクト

### afterTest

テスト（Mocha/Jasmine）が終了した後に実行される関数。

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストが実行されたスコープオブジェクト
- `result.error` (`Error`): テストが失敗した場合はエラーオブジェクト、それ以外の場合は`undefined`
- `result.result` (`Any`): テスト関数の戻り値オブジェクト
- `result.duration` (`Number`): テストの所要時間
- `result.passed` (`Boolean`): テストが成功した場合はtrue、それ以外の場合はfalse
- `result.retries` (`Object`): [MochaおよびJasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha)ならびに[Cucumber](./Retry.md#rerunning-in-cucumber)で定義されている、単一テストに関するリトライの情報。例：`{ attempts: 0, limit: 0 }`、参照
- `result` (`object`): フックの結果（`error`、`result`、`duration`、`passed`、`retries`プロパティを含みます）

### afterSuite

スイートが終了した後に実行されるフック（Mocha/Jasmineのみ）

パラメータ：

- `suite` (`object`): スイートの詳細

### after

すべてのテストが完了した後に実行されます。テストのすべてのグローバル変数に引き続きアクセスできます。

パラメータ：

- `result` (`number`): 0 - テスト成功、1 - テスト失敗
- `caps` (`object`): ワーカー内で生成されるセッションのcapabilitiesを含むオブジェクト
- `specs` (`string[]`): ワーカープロセスで実行されるspec

### afterSession

webdriverセッションを終了した直後に実行されます。

パラメータ：

- `config` (`object`): WebdriverIOの設定オブジェクト
- `caps` (`object`): ワーカー内で生成されるセッションのcapabilitiesを含むオブジェクト
- `specs` (`string[]`): ワーカープロセスで実行されるspec

### onComplete

すべてのワーカーがシャットダウンし、プロセスが終了しようとする時に実行されます。onCompleteフック内でスローされたエラーは、テスト実行の失敗につながります。

パラメータ：

- `exitCode` (`number`): 0 - 成功、1 - 失敗
- `config` (`object`): WebdriverIOの設定オブジェクト
- `caps` (`object`): ワーカー内で生成されるセッションのcapabilitiesを含むオブジェクト
- `result` (`object`): テスト結果を含む結果オブジェクト

### onReload

リフレッシュが発生したときに実行されます。

パラメータ：

- `oldSessionId` (`string`): 古いセッションのセッションID
- `newSessionId` (`string`): 新しいセッションのセッションID

### beforeFeature

Cucumber Featureの前に実行されます。

パラメータ：

- `uri` (`string`): featureファイルへのパス
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumberのfeatureオブジェクト

### afterFeature

Cucumber Featureの後に実行されます。

パラメータ：

- `uri` (`string`): featureファイルへのパス
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumberのfeatureオブジェクト

### beforeScenario

Cucumber Scenarioの前に実行されます。

パラメータ：

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickleとテストステップに関する情報を含むworldオブジェクト
- `context` (`object`): CucumberのWorldオブジェクト

### afterScenario

Cucumber Scenarioの後に実行されます。

パラメータ：

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickleとテストステップに関する情報を含むworldオブジェクト
- `result` (`object`): シナリオの結果を含む結果オブジェクト
- `result.passed` (`boolean`): シナリオが成功した場合はtrue
- `result.error` (`string`): シナリオが失敗した場合はエラースタック
- `result.duration` (`number`): シナリオの所要時間（ミリ秒）
- `context` (`object`): CucumberのWorldオブジェクト

### beforeStep

Cucumber Stepの前に実行されます。

パラメータ：

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumberのstepオブジェクト
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumberのscenarioオブジェクト
- `context` (`object`): CucumberのWorldオブジェクト

### afterStep

Cucumber Stepの後に実行されます。

パラメータ：

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumberのstepオブジェクト
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumberのscenarioオブジェクト
- `result`: (`object`): ステップの結果を含む結果オブジェクト
- `result.passed` (`boolean`): シナリオが成功した場合はtrue
- `result.error` (`string`): シナリオが失敗した場合はエラースタック
- `result.duration` (`number`): シナリオの所要時間（ミリ秒）
- `context` (`object`): CucumberのWorldオブジェクト

### beforeAssertion

WebdriverIOのアサーションが行われる前に実行されるフック。

パラメータ：

- `params`: アサーション情報
- `params.matcherName` (`string`): テストが呼び出したマッチャーの名前（例：`toHaveTitle`）。エイリアスの場合は、エイリアスの名前になります（例：`toExist`ではなく`toBeExisting`）。
- `params.expectedValue`: マッチャーに渡される値
- `params.options`: アサーションオプション

### afterAssertion

WebdriverIOのアサーションが行われた後に実行されるフック。

パラメータ：

- `params`: アサーション情報
- `params.matcherName` (`string`): テストが呼び出したマッチャーの名前（例：`toHaveTitle`）。エイリアスの場合は、エイリアスの名前になります（例：`toExist`ではなく`toBeExisting`）。
- `params.expectedValue`: マッチャーに渡される値
- `params.options`: アサーションオプション
- `params.result` (`object`): マッチャーの結果。`pass`（`boolean`）と`message()`を含みます。`pass`は値が期待値と一致する場合に`true`となり、これは`.not`を使用した場合も同様です：`.not`を使用した場合、`pass`が`false`のときにアサーションが成功します。