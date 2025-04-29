---
id: configuration
title: 設定
---

WebdriverIO を[セットアップタイプ](/docs/setuptypes)（例：生のプロトコルバインディングを使用、スタンドアロンパッケージとしての WebdriverIO、または WDIO テストランナー）に基づいて、環境を制御するための異なるオプションセットがあります。

## WebDriver オプション

[`webdriver`](https://www.npmjs.com/package/webdriver) プロトコルパッケージを使用する場合、以下のオプションが定義されます：

### protocol

ドライバーサーバーと通信する際に使用するプロトコル。

型: `String`<br />
デフォルト: `http`

### hostname

ドライバーサーバーのホスト。

型: `String`<br />
デフォルト: `0.0.0.0`

### port

ドライバーサーバーのポート。

型: `Number`<br />
デフォルト: `undefined`

### path

ドライバーサーバーのエンドポイントへのパス。

型: `String`<br />
デフォルト: `/`

### queryParams

ドライバーサーバーに伝播されるクエリパラメータ。

型: `Object`<br />
デフォルト: `undefined`

### user

クラウドサービスのユーザー名（[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)、または[LambdaTest](https://www.lambdatest.com)アカウントでのみ機能します）。設定されると、WebdriverIOは自動的に接続オプションを設定します。クラウドプロバイダーを使用しない場合、他のWebDriverバックエンドを認証するために使用できます。

型: `String`<br />
デフォルト: `undefined`

### key

クラウドサービスのアクセスキーまたはシークレットキー（[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)、または[LambdaTest](https://www.lambdatest.com)アカウントでのみ機能します）。設定されると、WebdriverIOは自動的に接続オプションを設定します。クラウドプロバイダーを使用しない場合、他のWebDriverバックエンドを認証するために使用できます。

型: `String`<br />
デフォルト: `undefined`

### capabilities

WebDriverセッションで実行したい機能を定義します。詳細については[WebDriverプロトコル](https://w3c.github.io/webdriver/#capabilities)をご確認ください。WebDriverプロトコルをサポートしていない古いドライバーを実行する場合は、セッションを正常に実行するために[JSONWireProtocol機能](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities)を使用する必要があります。

WebDriverベースの機能に加えて、リモートブラウザやデバイスにより深い設定を可能にするブラウザやベンダー固有のオプションを適用できます。これらは対応するベンダードキュメントに記載されています。例：

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

さらに、Sauce Labsの[自動テスト構成ツール](https://docs.saucelabs.com/basics/platform-configurator/)は、必要な機能をクリックして作成するのに役立つ便利なユーティリティです。

型: `Object`<br />
デフォルト: `null`

**例：**

```js
{
    browserName: 'chrome', // 選択肢: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // ブラウザバージョン
    platformName: 'Windows 10' // OSプラットフォーム
}
```

モバイルデバイスでウェブまたはネイティブテストを実行している場合、`capabilities`はWebDriverプロトコルとは異なります。詳細については[Appiumドキュメント](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)を参照してください。

### logLevel

ログの詳細レベル。

型: `String`<br />
デフォルト: `info`<br />
オプション: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

すべてのテストランナーログファイル（レポーターログと`wdio`ログを含む）を保存するディレクトリ。設定されていない場合、すべてのログは`stdout`にストリーミングされます。ほとんどのレポーターは`stdout`に出力するように作られているため、特定のレポーターでファイルにレポートをプッシュする方が合理的な場合（例えば、`junit`レポーターなど）にのみこのオプションを使用することをお勧めします。

スタンドアロンモードで実行する場合、WebdriverIOによって生成される唯一のログは`wdio`ログです。

型: `String`<br />
デフォルト: `null`

### connectionRetryTimeout

ドライバーまたはグリッドへのWebDriverリクエストのタイムアウト。

型: `Number`<br />
デフォルト: `120000`

### connectionRetryCount

Seleniumサーバーへのリクエスト再試行の最大回数。

型: `Number`<br />
デフォルト: `3`

### agent

リクエストを行うためのカスタムの`http`/`https`/`http2` [エージェント](https://www.npmjs.com/package/got#agent)を使用できます。

型: `Object`<br />
デフォルト:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

すべてのWebDriverリクエストに渡すカスタム`ヘッダー`を指定します。Selenium Gridが基本認証を必要とする場合、このオプションを通じて`Authorization`ヘッダーを渡してWebDriverリクエストを認証することをお勧めします。例：

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// 環境変数からユーザー名とパスワードを読み取る
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ユーザー名とパスワードをコロン区切りで組み合わせる
const credentials = `${username}:${password}`;
// 資格情報をBase64でエンコード
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

型: `Object`<br />
デフォルト: `{}`

### transformRequest

WebDriverリクエストが行われる前に[HTTPリクエストオプション](https://github.com/sindresorhus/got#options)をインターセプトする関数

型: `(RequestOptions) => RequestOptions`<br />
デフォルト: *なし*

### transformResponse

WebDriverレスポンスが到着した後、HTTPレスポンスオブジェクトをインターセプトする関数。この関数は、最初の引数として元のレスポンスオブジェクト、2番目の引数として対応する`RequestOptions`を渡されます。

型: `(Response, RequestOptions) => Response`<br />
デフォルト: *なし*

### strictSSL

SSL証明書が有効である必要があるかどうか。
環境変数`STRICT_SSL`または`strict_ssl`を介して設定できます。

型: `Boolean`<br />
デフォルト: `true`

### enableDirectConnect

[Appium直接接続機能](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments)を有効にするかどうか。
フラグが有効な場合でも、レスポンスに適切なキーがない場合は何もしません。

型: `Boolean`<br />
デフォルト: `true`

### cacheDir

キャッシュディレクトリのルートへのパス。このディレクトリは、セッションを開始しようとするときにダウンロードされるすべてのドライバーを保存するために使用されます。

型: `String`<br />
デフォルト: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

以下のオプション（上記のものを含む）はスタンドアロンのWebdriverIOで使用できます：

### automationProtocol

ブラウザ自動化に使用するプロトコルを定義します。現在は[`webdriver`](https://www.npmjs.com/package/webdriver)のみがサポートされており、WebdriverIOが使用する主要なブラウザ自動化技術です。

異なる自動化技術を使用してブラウザを自動化したい場合は、以下のインターフェースに準拠するモジュールに解決されるパスにこのプロパティを設定してください：

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * 自動化セッションを開始し、対応する自動化コマンドを持つWebdriverIO [モナド](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * を返します。参照実装として[webdriver](https://www.npmjs.com/package/webdriver)パッケージを参照してください。
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIOオプション
     * @param {Function} hook 関数から解放される前にクライアントを変更できるフック
     * @param {PropertyDescriptorMap} userPrototype ユーザーがカスタムプロトコルコマンドを追加できるようにする
     * @param {Function} customCommandWrapper コマンド実行を変更できるようにする
     * @returns WebdriverIO互換のクライアントインスタンス
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * ユーザーが既存のセッションにアタッチできるようにする
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * 新しいセッションのためにインスタンスセッションIDとブラウザ機能を変更します
     * 渡されたブラウザオブジェクトに直接変更します
     *
     * @optional
     * @param   {object} instance  新しいブラウザセッションから取得するオブジェクト
     * @returns {string}           ブラウザの新しいセッションID
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

型: `String`<br />
デフォルト: `webdriver`

### baseUrl

ベースURLを設定することで`url`コマンド呼び出しを短縮します。
- `url`パラメータが`/`で始まる場合、`baseUrl`の前に追加されます（`baseUrl`のパスがある場合を除く）。
- `url`パラメータがスキームまたは`/`なしで始まる場合（例：`some/path`）、完全な`baseUrl`が直接前に追加されます。

型: `String`<br />
デフォルト: `null`

### waitforTimeout

すべての`waitFor*`コマンドのデフォルトタイムアウト。（オプション名の小文字の`f`に注意してください）このタイムアウトは`waitFor*`で始まるコマンドとそのデフォルト待機時間にのみ影響します。

テストのタイムアウトを増やすには、フレームワークのドキュメントを参照してください。

型: `Number`<br />
デフォルト: `5000`

### waitforInterval

すべての`waitFor*`コマンドが期待される状態（例：可視性）が変更されたかどうかを確認するデフォルト間隔。

型: `Number`<br />
デフォルト: `100`

### region

Sauce Labsで実行している場合、異なるデータセンター（USまたはEU）間でテストを実行することを選択できます。
リージョンをEUに変更するには、設定に`region: 'eu'`を追加します。

__注意:__ これは、Sauce Labsアカウントに接続されている`user`と`key`オプションを提供している場合にのみ効果があります。

型: `String`<br />
デフォルト: `us`

*（VMおよび/またはエミュレータ/シミュレータのみ）*

---

## テストランナーオプション

以下のオプション（上記のものを含む）は、WDIO テストランナーを使用してWebdriverIOを実行する場合にのみ定義されます：

### specs

テスト実行のためのスペックを定義します。一度に複数のファイルに一致するグロブパターンを指定するか、グロブまたはパスのセットを配列にラップして、単一のワーカープロセス内で実行することができます。すべてのパスは設定ファイルパスからの相対パスとして扱われます。

型: `(String | String[])[]`<br />
デフォルト: `[]`

### exclude

テスト実行から除外するスペック。すべてのパスは設定ファイルパスからの相対パスとして扱われます。

型: `String[]`<br />
デフォルト: `[]`

### suites

`wdio` CLIで `--suite` オプションを指定することができる様々なスイートを記述するオブジェクト。

型: `Object`<br />
デフォルト: `{}`

### capabilities

上記で説明した `capabilities` セクションと同じですが、[`multiremote`](/docs/multiremote) オブジェクトを指定するか、並列実行のための複数のWebDriverセッションを配列で指定するオプションがあります。

[上記](/docs/configuration#capabilities)で定義されているのと同じベンダーおよびブラウザ固有の機能を適用できます。

型: `Object`|`Object[]`<br />
デフォルト: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

並列実行するワーカーの最大総数。

__注意:__ Sauce Labsのようなマシンなどの外部ベンダーでテストが実行されている場合、この数は`100`のように高くなる可能性があります。その場合、テストは単一のマシンではなく、複数の仮想マシンで実行されます。ローカル開発マシンでテストを実行する場合は、`3`、`4`、または`5`のようなより適切な数値を使用してください。基本的に、これは同時に起動され、テストを実行するブラウザの数であり、マシンのRAM容量や他のアプリの実行状況によって異なります。

また、`wdio:maxInstances`機能を使用して、機能オブジェクト内で`maxInstances`を適用することもできます。これにより、その特定の機能の並列セッション数が制限されます。

型: `Number`<br />
デフォルト: `100`

### maxInstancesPerCapability

機能ごとの並列実行ワーカーの最大総数。

型: `Number`<br />
デフォルト: `100`

### injectGlobals

WebdriverIOのグローバル変数（例：`browser`、`$`、`$$`）をグローバル環境に挿入します。
`false`に設定すると、`@wdio/globals`からインポートする必要があります。例：

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

注意：WebdriverIOはテストフレームワーク固有のグローバル変数の注入を処理しません。

型: `Boolean`<br />
デフォルト: `true`

### bail

特定の数のテスト失敗後にテスト実行を停止したい場合は、`bail`を使用します。
（デフォルトは`0`で、すべてのテストを実行します）**注意：** この文脈でのテストとは、単一のスペックファイル内のすべてのテスト（MochaまたはJasmineを使用する場合）または機能ファイル内のすべてのステップ（Cucumberを使用する場合）です。単一のテストファイル内でのテストのベイル動作を制御したい場合は、利用可能な[フレームワーク](frameworks)オプションを確認してください。

型: `Number`<br />
デフォルト: `0` （ベイルしない; すべてのテストを実行）

### specFileRetries

スペックファイル全体が失敗した場合に再試行する回数。

型: `Number`<br />
デフォルト: `0`

### specFileRetriesDelay

スペックファイルの再試行間の遅延秒数

型: `Number`<br />
デフォルト: `0`

### specFileRetriesDeferred

再試行されたスペックファイルを即座に再試行するか、キューの最後に延期するか。

型: `Boolean`<br />
デフォルト: `true`

### groupLogsByTestSpec

ログ出力ビューを選択します。

`false`に設定すると、異なるテストファイルからのログがリアルタイムで出力されます。並列実行時に異なるファイルからのログ出力が混在する可能性があることに注意してください。

`true`に設定すると、ログ出力はテストスペックごとにグループ化され、テストスペックが完了した時にのみ出力されます。

デフォルトでは`false`に設定されており、ログはリアルタイムで出力されます。

型: `Boolean`<br />
デフォルト: `false`

### services

サービスは、あなたが面倒を見たくない特定のジョブを引き受けます。ほとんど労力をかけずにテスト設定を強化します。

型: `String[]|Object[]`<br />
デフォルト: `[]`

### framework

WDIO テストランナーで使用するテストフレームワークを定義します。

型: `String`<br />
デフォルト: `mocha`<br />
オプション: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

特定のフレームワーク関連のオプション。利用可能なオプションについてはフレームワークアダプタのドキュメントを参照してください。詳細は[フレームワーク](frameworks)をご覧ください。

型: `Object`<br />
デフォルト: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

行番号付きのCucumber機能のリスト（[cucumberフレームワークを使用する場合](./Frameworks.md#using-cucumber)）。

型: `String[]`
デフォルト: `[]`

### reporters

使用するレポーターのリスト。レポーターは文字列または
`['レポーター名', { /* レポーターオプション */}]`の配列で、最初の要素はレポーター名の文字列、2番目の要素はレポーターオプションを持つオブジェクトです。

型: `String[]|Object[]`<br />
デフォルト: `[]`

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

レポーターが非同期にログを報告する場合（例：ログが第三者ベンダーにストリーミングされる場合）、同期しているかどうかを確認する間隔。

型: `Number`<br />
デフォルト: `100` (ms)

### reporterSyncTimeout

レポーターがすべてのログのアップロードを完了するまでの最大時間。テストランナーによってエラーがスローされるまでの時間。

型: `Number`<br />
デフォルト: `5000` (ms)

### execArgv

子プロセスを起動する際に指定するNode引数。

型: `String[]`<br />
デフォルト: `null`

### filesToWatch

テストランナーに、`--watch`フラグで実行する際に他のファイル（例：アプリケーションファイル）も監視するよう指示するグロブをサポートする文字列パターンのリスト。デフォルトでは、テストランナーはすべてのスペックファイルを監視します。

型: `String[]`<br />
デフォルト: `[]`

### updateSnapshots

スナップショットを更新したい場合は `true` に設定します。理想的には CLI パラメータの一部として使用します。例：`wdio run wdio.conf.js --s`。

型: `'new' | 'all' | 'none'`<br />
デフォルト: 提供されていない場合でテストが CI で実行される場合は `none`、提供されていない場合は `new`、それ以外の場合は提供されたもの

### resolveSnapshotPath

デフォルトのスナップショットパスを上書きします。例えば、スナップショットをテストファイルの隣に保存するために使用します。

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

型: `(testPath: string, snapExtension: string) => string`<br />
デフォルト: テストファイルの隣の `__snapshots__` ディレクトリにスナップショットファイルを保存します

### tsConfigPath

WDIOはTypeScriptファイルのコンパイルに`tsx`を使用します。TSConfigは現在の作業ディレクトリから自動的に検出されますが、ここでカスタムパスを指定するか、TSX_TSCONFIG_PATH環境変数を設定することができます。

`tsx`のドキュメントを参照: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

型: `String`<br />
デフォルト: `null`<br />

## フック

WDIOテストランナーでは、テストライフサイクルの特定の時点でトリガーされるフックを設定できます。これにより、カスタムアクション（例：テストが失敗した場合にスクリーンショットを撮る）が可能になります。

各フックは、ライフサイクルに関する特定の情報（例：テストスイートやテストに関する情報）をパラメータとして持ちます。すべてのフックプロパティの詳細については、[サンプル設定](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326)をご覧ください。

**注意：** 一部のフック（`onPrepare`、`onWorkerStart`、`onWorkerEnd`、`onComplete`）は異なるプロセスで実行されるため、ワーカープロセスに存在する他のフックとグローバルデータを共有することはできません。

### onPrepare

すべてのワーカーが起動する前に一度実行されます。

パラメータ：

- `config` (`object`): WebdriverIO設定オブジェクト
- `param` (`object[]`): 機能詳細のリスト

### onWorkerStart

ワーカープロセスが生成される前に実行され、そのワーカーの特定のサービスを初期化したり、非同期な方法でランタイム環境を変更したりするために使用できます。

パラメータ：

- `cid` (`string`): 機能ID（例：0-0）
- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック
- `args` (`object`): ワーカーが初期化された後にメイン設定とマージされるオブジェクト
- `execArgv` (`string[]`): ワーカープロセスに渡される文字列引数のリスト

### onWorkerEnd

ワーカープロセスが終了した直後に実行されます。

パラメータ：

- `cid` (`string`): 機能ID（例：0-0）
- `exitCode` (`number`): 0 - 成功、1 - 失敗
- `specs` (`string[]`): ワーカープロセスで実行されるスペック
- `retries` (`number`): [_「スペックファイルごとの再試行を追加」_](./Retry.md#add-retries-on-a-per-specfile-basis)で定義されているスペックレベルの再試行回数

### beforeSession

WebDriverセッションとテストフレームワークを初期化する直前に実行されます。機能やスペックに応じて設定を操作することができます。

パラメータ：

- `config` (`object`): WebdriverIO設定オブジェクト
- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック

### before

テスト実行が始まる前に実行されます。この時点で`browser`などのすべてのグローバル変数にアクセスできます。カスタムコマンドを定義するのに最適な場所です。

パラメータ：

- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック
- `browser` (`object`): 作成されたブラウザ/デバイスセッションのインスタンス

### beforeSuite

スイートが開始する前に実行されるフック（MochaまたはJasmineのみ）

パラメータ：

- `suite` (`object`): スイートの詳細

### beforeHook

スイート内のフックが開始する*前*に実行されるフック（例：Mochaの`beforeEach`を呼び出す前に実行）

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストコンテキスト（CucumberのWorldオブジェクトを表す）

### afterHook

スイート内のフックが終了した*後*に実行されるフック（例：Mochaの`afterEach`を呼び出した後に実行）

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストコンテキスト（CucumberのWorldオブジェクトを表す）
- `result` (`object`): フック結果（`error`、`result`、`duration`、`passed`、`retries`プロパティを含む）

### beforeTest

テストの前に実行される関数（MochaまたはJasmineのみ）。

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
- `result` (`number`): 0 - コマンド成功、1 - コマンドエラー
- `error` (`Error`): エラーがある場合はエラーオブジェクト

### afterTest

テスト（MochaまたはJasmine）が終了した後に実行される関数。

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストが実行されたスコープオブジェクト
- `result.error` (`Error`): テストが失敗した場合はエラーオブジェクト、それ以外の場合は`undefined`
- `result.result` (`Any`): テスト関数の戻りオブジェクト
- `result.duration` (`Number`): テストの時間
- `result.passed` (`Boolean`): テストに合格した場合はtrue、それ以外の場合はfalse
- `result.retries` (`Object`): [MochaとJasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha)および[Cucumber](./Retry.md#rerunning-in-cucumber)で定義されている単一テスト関連の再試行に関する情報、例：`{ attempts: 0, limit: 0 }`
- `result` (`object`): フック結果（`error`、`result`、`duration`、`passed`、`retries`プロパティを含む）

### afterSuite

スイートが終了した後に実行されるフック（MochaまたはJasmineのみ）

パラメータ：

- `suite` (`object`): スイートの詳細

### after

すべてのテストが完了した後に実行されます。テストからすべてのグローバル変数にアクセスできます。

パラメータ：

- `result` (`number`): 0 - テスト合格、1 - テスト失敗
- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック

### afterSession

WebDriverセッションを終了した直後に実行されます。

パラメータ：

- `config` (`object`): WebdriverIO設定オブジェクト
- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック

### onComplete

すべてのワーカーがシャットダウンされ、プロセスが終了しようとしている後に実行されます。onCompleteフックでエラーが発生すると、テスト実行は失敗します。

パラメータ：

- `exitCode` (`number`): 0 - 成功、1 - 失敗
- `config` (`object`): WebdriverIO設定オブジェクト
- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `result` (`object`): テスト結果を含む結果オブジェクト

### onReload

リフレッシュが発生したときに実行されます。

パラメータ：

- `oldSessionId` (`string`): 古いセッションのID
- `newSessionId` (`string`): 新しいセッションのID

### beforeFeature

Cucumber機能の前に実行されます。

パラメータ：

- `uri` (`string`): 機能ファイルへのパス
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber機能オブジェクト

### afterFeature

Cucumber機能の後に実行されます。

パラメータ：

- `uri` (`string`): 機能ファイルへのパス
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber機能オブジェクト

### beforeScenario

Cucumberシナリオの前に実行されます。

パラメータ：

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): ピクルとテストステップに関する情報を含むワールドオブジェクト
- `context` (`object`): Cucumber Worldオブジェクト

### afterScenario

Cucumberシナリオの後に実行されます。

パラメータ：

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): ピクルとテストステップに関する情報を含むワールドオブジェクト
- `result` (`object`): シナリオ結果を含む結果オブジェクト
- `result.passed` (`boolean`): シナリオに合格した場合はtrue
- `result.error` (`string`): シナリオが失敗した場合のエラースタック
- `result.duration` (`number`): シナリオの時間（ミリ秒）
- `context` (`object`): Cucumber Worldオブジェクト

### beforeStep

Cucumberステップの前に実行されます。

パラメータ：

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumberステップオブジェクト
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumberシナリオオブジェクト
- `context` (`object`): Cucumber Worldオブジェクト

### afterStep

Cucumberステップの後に実行されます。

パラメータ：

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumberステップオブジェクト
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumberシナリオオブジェクト
- `result`: (`object`): ステップ結果を含む結果オブジェクト
- `result.passed` (`boolean`): シナリオに合格した場合はtrue
- `result.error` (`string`): シナリオが失敗した場合のエラースタック
- `result.duration` (`number`): シナリオの時間（ミリ秒）
- `context` (`object`): Cucumber Worldオブジェクト

### beforeAssertion

WebdriverIOアサーションが行われる前に実行されるフック。

パラメータ：

- `params`: アサーション情報
- `params.matcherName` (`string`): マッチャーの名前（例：`toHaveTitle`）
- `params.expectedValue`: マッチャーに渡される値
- `params.options`: アサーションオプション

### afterAssertion

WebdriverIOアサーションが行われた後に実行されるフック。

パラメータ：

- `params`: アサーション情報
- `params.matcherName` (`string`): マッチャーの名前（例：`toHaveTitle`）
- `params.expectedValue`: マッチャーに渡される値
- `params.options`: アサーションオプション
- `params.result`: アサーション結果