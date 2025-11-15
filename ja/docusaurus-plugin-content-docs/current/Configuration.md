---
id: configuration
title: 設定
---

[設定タイプ](/docs/setuptypes)（例：生のプロトコルバインディングの使用、スタンドアロンパッケージとしてのWebdriverIO、またはWDIOテストランナーの使用）に基づいて、環境を制御するための異なるオプションセットが利用可能です。

## WebDriverオプション

以下のオプションは、[`webdriver`](https://www.npmjs.com/package/webdriver)プロトコルパッケージを使用する場合に定義されます：

### protocol

ドライバーサーバーと通信する際に使用するプロトコル。

Type: `String`<br />
Default: `http`

### hostname

ドライバーサーバーのホスト。

Type: `String`<br />
Default: `0.0.0.0`

### port

ドライバーサーバーのポート。

Type: `Number`<br />
Default: `undefined`

### path

ドライバーサーバーエンドポイントへのパス。

Type: `String`<br />
Default: `/`

### queryParams

ドライバーサーバーに伝播されるクエリパラメータ。

Type: `Object`<br />
Default: `undefined`

### user

クラウドサービスのユーザー名（[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)、または[LambdaTest](https://www.lambdatest.com)アカウントでのみ機能します）。設定すると、WebdriverIOは自動的に接続オプションを設定します。クラウドプロバイダーを使用しない場合、これを他のWebDriverバックエンドの認証に使用できます。

Type: `String`<br />
Default: `undefined`

### key

クラウドサービスのアクセスキーまたはシークレットキー（[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)、または[LambdaTest](https://www.lambdatest.com)アカウントでのみ機能します）。設定すると、WebdriverIOは自動的に接続オプションを設定します。クラウドプロバイダーを使用しない場合、これを他のWebDriverバックエンドの認証に使用できます。

Type: `String`<br />
Default: `undefined`

### capabilities

WebDriverセッションで実行したい機能を定義します。詳細については、[WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities)をチェックしてください。WebDriverプロトコルをサポートしていない古いドライバーを実行する場合は、セッションを正常に実行するために[JSONWireProtocol capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities)を使用する必要があります。

WebDriverベースの機能に加えて、リモートブラウザやデバイスのより深い設定を可能にするブラウザやベンダー固有のオプションを適用できます。これらは対応するベンダードキュメントに記載されています、例えば：

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)用
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)用
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)用
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)用
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)用
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)用

さらに、Sauce Labsの[自動テスト設定ツール](https://docs.saucelabs.com/basics/platform-configurator/)は、クリックするだけで希望する機能を作成するのに役立つ便利なユーティリティです。

Type: `Object`<br />
Default: `null`

**例：**

```js
{
    browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // ブラウザバージョン
    platformName: 'Windows 10' // OSプラットフォーム
}
```

モバイルデバイス上でWebテストやネイティブテストを実行している場合、`capabilities`はWebDriverプロトコルとは異なります。詳細については、[Appium Docs](https://appium.io/docs/en/latest/guides/caps/)を参照してください。

### logLevel

ロギングの詳細レベル。

Type: `String`<br />
Default: `info`<br />
Options: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

すべてのテストランナーログファイル（レポーターログと`wdio`ログを含む）を保存するディレクトリ。設定されていない場合、すべてのログは`stdout`にストリーミングされます。ほとんどのレポーターは`stdout`にログを記録するように作られているため、このオプションは特定のレポーターでのみ使用することをお勧めします（例えば、`junit`レポーターなど）。

スタンドアロンモードで実行する場合、WebdriverIOによって生成される唯一のログは`wdio`ログです。

Type: `String`<br />
Default: `null`

### connectionRetryTimeout

ドライバーまたはグリッドへのWebDriverリクエストのタイムアウト。

Type: `Number`<br />
Default: `120000`

### connectionRetryCount

Seleniumサーバーへのリクエスト再試行の最大回数。

Type: `Number`<br />
Default: `3`

### agent

カスタム`http`/`https`/`http2` [エージェント](https://www.npmjs.com/package/got#agent)を使用してリクエストを行うことができます。

Type: `Object`<br />
Default:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

すべてのWebDriverリクエストに渡すカスタム`headers`を指定します。Selenium GridがBasic認証を必要とする場合は、このオプションを通じて`Authorization`ヘッダーを渡して、WebDriverリクエストを認証することをお勧めします。例：

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// 環境変数からユーザー名とパスワードを読み込む
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ユーザー名とパスワードをコロンで区切って結合
const credentials = `${username}:${password}`;
// 認証情報をBase64でエンコード
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Type: `Object`<br />
Default: `{}`

### transformRequest

WebDriverリクエストが行われる前に[HTTPリクエストオプション](https://github.com/sindresorhus/got#options)をインターセプトする関数

Type: `(RequestOptions) => RequestOptions`<br />
Default: *なし*

### transformResponse

WebDriverレスポンスが到着した後、HTTPレスポンスオブジェクトをインターセプトする関数。関数には、最初の引数として元のレスポンスオブジェクト、2番目の引数として対応する`RequestOptions`が渡されます。

Type: `(Response, RequestOptions) => Response`<br />
Default: *なし*

### strictSSL

SSL証明書が有効である必要がないかどうか。
環境変数`STRICT_SSL`または`strict_ssl`として設定することもできます。

Type: `Boolean`<br />
Default: `true`

### enableDirectConnect

[Appium直接接続機能](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments)を有効にするかどうか。
フラグが有効になっている場合でも、レスポンスに適切なキーがなければ何も行いません。

Type: `Boolean`<br />
Default: `true`

### cacheDir

キャッシュディレクトリのルートへのパス。このディレクトリは、セッションを開始しようとするときにダウンロードされるすべてのドライバーを保存するために使用されます。

Type: `String`<br />
Default: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

より安全なロギングのために、`maskingPatterns`で設定された正規表現を使用して機密情報をログから難読化できます。
 - 文字列形式は、フラグ付きまたはフラグなしの正規表現（例：`/.../i`）で、複数の正規表現はカンマで区切ります。
 - マスキングパターンの詳細については、[WDIO Logger READMEのマスキングパターンセクション](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)を参照してください。

Type: `String`<br />
Default: `undefined`

**例：**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

以下のオプション（上記のものを含む）は、スタンドアロンでWebdriverIOと共に使用できます：

### automationProtocol

ブラウザ自動化に使用するプロトコルを定義します。現在、WebdriverIOがブラウザ自動化の主要技術として使用する[`webdriver`](https://www.npmjs.com/package/webdriver)のみがサポートされています。

異なる自動化技術を使用してブラウザを自動化したい場合は、このプロパティを次のインターフェースに準拠するモジュールに解決されるパスに設定してください：

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * 自動化セッションを開始し、それぞれの自動化コマンドを持つWebdriverIO [モナド](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * を返します。参考実装として[webdriver](https://www.npmjs.com/package/webdriver)パッケージを参照してください
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIOオプション
     * @param {Function} hook 関数から解放される前にクライアントを変更できるようにするフック
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
     * インスタンスセッションIDとブラウザの機能を新しいセッション用に変更し、
     * 直接渡されたブラウザオブジェクトに反映します
     *
     * @optional
     * @param   {object} instance  新しいブラウザセッションから取得したオブジェクト。
     * @returns {string}           ブラウザの新しいセッションID
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Type: `String`<br />
Default: `webdriver`

### baseUrl

`url`コマンド呼び出しをベースURLを設定して短縮します。
- `url`パラメータが`/`で始まる場合、`baseUrl`が前に追加されます（`baseUrl`のパスがある場合を除く）。
- `url`パラメータがスキームや`/`なしで始まる場合（例：`some/path`）、完全な`baseUrl`が直接前に追加されます。

Type: `String`<br />
Default: `null`

### waitforTimeout

すべての`waitFor*`コマンドのデフォルトタイムアウト（オプション名の「f」が小文字であることに注意）。このタイムアウトは、`waitFor*`で始まるコマンドとそのデフォルト待機時間__のみ__に影響します。

テストのタイムアウトを増やすには、フレームワークのドキュメントを参照してください。

Type: `Number`<br />
Default: `5000`

### waitforInterval

すべての`waitFor*`コマンドが期待される状態（例：可視性）が変更されたかどうかを確認するデフォルト間隔。

Type: `Number`<br />
Default: `100`

### region

Sauce Labsで実行している場合、異なるデータセンター（USまたはEU）間でテストを実行することを選択できます。
リージョンをEUに変更するには、configに`region: 'eu'`を追加します。

__注意:__ これは、Sauce Labsアカウントに接続された`user`と`key`オプションを提供する場合にのみ効果があります。

Type: `String`<br />
Default: `us`

*（VMやEM/シミュレーターのみ）*

---

## テストランナーオプション

以下のオプション（上記のものを含む）は、WDIOテストランナーでWebdriverIOを実行する場合にのみ定義されます：

### specs

テスト実行のためのスペックを定義します。一度に複数のファイルに一致するglobパターンを指定するか、単一のワーカープロセス内で実行するためにglobやパスのセットを配列にラップすることができます。すべてのパスは設定ファイルパスからの相対パスとして扱われます。

Type: `(String | String[])[]`<br />
Default: `[]`

### exclude

テスト実行から除外するスペック。すべてのパスは設定ファイルパスからの相対パスとして扱われます。

Type: `String[]`<br />
Default: `[]`

### suites

様々なスイートを記述するオブジェクトで、`wdio` CLIで`--suite`オプションを使用して指定できます。

Type: `Object`<br />
Default: `{}`

### capabilities

上記で説明した`capabilities`セクションと同じですが、[`multiremote`](/docs/multiremote)オブジェクトを指定するオプション、または並列実行のための複数のWebDriverセッションを配列で指定するオプションがあります。

[上記](/docs/configuration#capabilities)で定義されているのと同じベンダーとブラウザ固有の機能を適用できます。

Type: `Object`|`Object[]`<br />
Default: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

並列実行ワーカーの最大合計数。

__注意:__ 外部ベンダー（Sauce Labsのマシンなど）でテストを実行している場合、この数は`100`ほど高くなる可能性があります。そこでは、テストは単一のマシンではなく、複数のVMで実行されます。テストをローカル開発マシンで実行する場合は、`3`、`4`、`5`などのより合理的な数値を使用してください。基本的に、これは同時に開始され、同時にテストを実行するブラウザの数なので、マシンのRAMの量と、マシン上で実行されている他のアプリの数に依存します。

`wdio:maxInstances`機能を使用して、機能オブジェクト内で`maxInstances`を適用することもできます。これにより、その特定の機能の並列セッション数が制限されます。

Type: `Number`<br />
Default: `100`

### maxInstancesPerCapability

機能ごとの並列実行ワーカーの最大合計数。

Type: `Number`<br />
Default: `100`

### injectGlobals

WebdriverIOのグローバル（例：`browser`、`$`、`$$`）をグローバル環境に挿入します。
`false`に設定すると、`@wdio/globals`からインポートする必要があります。例：

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

注：WebdriverIOはテストフレームワーク固有のグローバルの注入を処理しません。

Type: `Boolean`<br />
Default: `true`

### bail

特定数のテスト失敗後にテスト実行を停止したい場合は、`bail`を使用します。（デフォルトは`0`で、すべてのテストを実行します。）**注：** この文脈でのテストとは、単一のspecファイル内のすべてのテスト（MochaまたはJasmineを使用する場合）またはフィーチャーファイル内のすべてのステップ（Cucumberを使用する場合）です。単一のテストファイル内でのテストのbail動作を制御したい場合は、利用可能な[フレームワーク](frameworks)オプションを参照してください。

Type: `Number`<br />
Default: `0` （bailしない; すべてのテストを実行）

### specFileRetries

specファイル全体が失敗した場合に再試行する回数。

Type: `Number`<br />
Default: `0`

### specFileRetriesDelay

specファイルの再試行間の遅延（秒）

Type: `Number`<br />
Default: `0`

### specFileRetriesDeferred

再試行されるspecファイルを即座に再試行するか、キューの最後に延期するかどうか。

Type: `Boolean`<br />
Default: `true`

### groupLogsByTestSpec

ログ出力ビューを選択します。

`false`に設定すると、異なるテストファイルからのログがリアルタイムで表示されます。並列実行時に異なるファイルからのログ出力が混在する可能性があることに注意してください。

`true`に設定すると、ログ出力はテスト仕様ごとにグループ化され、テスト仕様が完了したときにのみ表示されます。

デフォルトでは`false`に設定されており、ログはリアルタイムで表示されます。

Type: `Boolean`<br />
Default: `false`

### autoAssertOnTestEnd

WebdriverIOが各テストの最後に自動的にすべてのソフトアサーションをアサートするかどうかを制御します。`true`に設定すると、蓄積されたソフトアサーションが自動的にチェックされ、アサーションが失敗した場合にテストが失敗します。`false`に設定すると、ソフトアサーションをチェックするためにassertメソッドを手動で呼び出す必要があります。

Type: `Boolean`<br />
Default: `true`

### services

サービスは、あなたが面倒を見たくない特定のジョブを引き受けます。ほとんど労力をかけずにテスト設定を強化します。

Type: `String[]|Object[]`<br />
Default: `[]`

### framework

WDIOテストランナーで使用するテストフレームワークを定義します。

Type: `String`<br />
Default: `mocha`<br />
Options: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

特定のフレームワーク関連のオプション。どのオプションが利用可能かについては、フレームワークアダプタのドキュメントを参照してください。詳細については[フレームワーク](frameworks)を参照してください。

Type: `Object`<br />
Default: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

行番号付きのcucumberフィーチャーのリスト（[cucumberフレームワークを使用する場合](./Frameworks.md#using-cucumber)）。

Type: `String[]`
Default: `[]`

### reporters

使用するレポーターのリスト。レポーターは文字列、または
`['reporterName', { /* reporter options */}]`の配列にすることができます。ここで最初の要素はレポーター名を持つ文字列で、2番目の要素はレポーターオプションを持つオブジェクトです。

Type: `String[]|Object[]`<br />
Default: `[]`

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

レポーターが非同期にログを報告する場合（例：ログが第三者ベンダーにストリーミングされる場合）、同期しているかどうかを確認する間隔を決定します。

Type: `Number`<br />
Default: `100` (ms)

### reporterSyncTimeout

レポーターがすべてのログのアップロードを終了するまでの最大時間を決定し、それを超えるとテストランナーによってエラーが発生します。

Type: `Number`<br />
Default: `5000` (ms)

### execArgv

子プロセスを起動する際に指定するNode引数。

Type: `String[]`<br />
Default: `null`

### filesToWatch

テストランナーに、`--watch`フラグで実行する際に他のファイル（例：アプリケーションファイル）も監視するよう指示するglobをサポートする文字列パターンのリスト。デフォルトでは、テストランナーはすべてのspecファイルを監視します。

Type: `String[]`<br />
Default: `[]`

### updateSnapshots

スナップショットを更新したい場合は`true`に設定します。理想的にはCLIパラメータの一部として使用します。例：`wdio run wdio.conf.js --s`。

Type: `'new' | 'all' | 'none'`<br />
Default: 提供されていない場合かつCIでテストが実行される場合は`none`、提供されていない場合は`new`、それ以外は提供されたもの

### resolveSnapshotPath

デフォルトのスナップショットパスをオーバーライドします。例えば、スナップショットをテストファイルの隣に保存する場合。

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Type: `(testPath: string, snapExtension: string) => string`<br />
Default: スナップショットファイルをテストファイルの隣の`__snapshots__`ディレクトリに保存します

### tsConfigPath

WDIOはTypeScriptファイルをコンパイルするために`tsx`を使用します。TSConfigは現在の作業ディレクトリから自動的に検出されますが、ここでカスタムパスを指定するか、TSX_TSCONFIG_PATH環境変数を設定することができます。

`tsx`ドキュメントを参照：https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Type: `String`<br />
Default: `null`<br />

## フック

WDIOテストランナーでは、テストライフサイクルの特定のタイミングでトリガーされるフックを設定できます。これにより、カスタムアクション（例：テストが失敗した場合にスクリーンショットを撮る）が可能になります。

すべてのフックは、ライフサイクルに関する特定の情報（例：テストスイートやテストに関する情報）をパラメータとして持ちます。すべてのフックのプロパティについては、[サンプル設定](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326)でさらに詳しく読むことができます。

**注意：** いくつかのフック（`onPrepare`、`onWorkerStart`、`onWorkerEnd`、`onComplete`）は異なるプロセスで実行されるため、ワーカープロセスに存在する他のフックとグローバルデータを共有することはできません。

### onPrepare

すべてのワーカーが起動される前に一度実行されます。

パラメータ：

- `config` (`object`): WebdriverIO設定オブジェクト
- `param` (`object[]`): 機能詳細のリスト

### onWorkerStart

ワーカープロセスが生成される前に実行され、そのワーカーの特定のサービスを初期化したり、非同期方式でランタイム環境を変更したりするのに使用できます。

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
- `retries` (`number`): [_"specファイルごとの再試行を追加"_](./Retry.md#add-retries-on-a-per-specfile-basis)で定義されているspecレベルの再試行回数

### beforeSession

WebDriverセッションとテストフレームワークを初期化する直前に実行されます。機能やspecに応じて設定を操作することができます。

パラメータ：

- `config` (`object`): WebdriverIO設定オブジェクト
- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック

### before

テスト実行が開始される前に実行されます。この時点で、`browser`のようなすべてのグローバル変数にアクセスできます。カスタムコマンドを定義するのに最適な場所です。

パラメータ：

- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック
- `browser` (`object`): 作成されたブラウザ/デバイスセッションのインスタンス

### beforeSuite

スイートが開始される前に実行されるフック（MochaとJasmineのみ）

パラメータ：

- `suite` (`object`): スイートの詳細

### beforeHook

スイート内のフックが開始される*前*に実行されるフック（例：Mochaのbeforeachを呼び出す前に実行）

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストコンテキスト（CucumberのWorldオブジェクトを表す）

### afterHook

スイート内のフックが終了した*後*に実行されるフック（例：Mochaのafterathを呼び出した後に実行）

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストコンテキスト（CucumberのWorldオブジェクトを表す）
- `result` (`object`): フックの結果（`error`、`result`、`duration`、`passed`、`retries`プロパティを含む）

### beforeTest

テストの前に実行される関数（MochaとJasmineのみ）。

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

テスト（MochaまたはJasmine）が終了した後に実行される関数。

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストが実行されたスコープオブジェクト
- `result.error` (`Error`): テストが失敗した場合はエラーオブジェクト、それ以外の場合は`undefined`
- `result.result` (`Any`): テスト関数の戻りオブジェクト
- `result.duration` (`Number`): テストの期間
- `result.passed` (`Boolean`): テストが合格した場合はtrue、それ以外の場合はfalse
- `result.retries` (`Object`): [MochaとJasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha)および[Cucumber](./Retry.md#rerunning-in-cucumber)で定義されている単一テスト関連の再試行に関する情報。例：`{ attempts: 0, limit: 0 }`、参照
- `result` (`object`): フックの結果（`error`、`result`、`duration`、`passed`、`retries`プロパティを含む）

### afterSuite

スイートが終了した後に実行されるフック（MochaとJasmineのみ）

パラメータ：

- `suite` (`object`): スイートの詳細

### after

すべてのテストが完了した後に実行されます。テストからすべてのグローバル変数にアクセスできます。

パラメータ：

- `result` (`number`): 0 - テスト合格、1 - テスト失敗
- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック

### afterSession

WebDriverセッション終了直後に実行されます。

パラメータ：

- `config` (`object`): WebdriverIO設定オブジェクト
- `caps` (`object`): ワーカーでスポーンされるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック

### onComplete

すべてのワーカーがシャットダウンされ、プロセスが終了しようとしている後に実行されます。onCompleteフックでエラーが発生すると、テスト実行が失敗します。

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

Cucumberフィーチャーの前に実行されます。

パラメータ：

- `uri` (`string`): フィーチャーファイルへのパス
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumberフィーチャーオブジェクト

### afterFeature

Cucumberフィーチャーの後に実行されます。

パラメータ：

- `uri` (`string`): フィーチャーファイルへのパス
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumberフィーチャーオブジェクト

### beforeScenario

Cucumberシナリオの前に実行されます。

パラメータ：

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickleとテストステップに関する情報を含むworldオブジェクト
- `context` (`object`): Cucumber Worldオブジェクト

### afterScenario

Cucumberシナリオの後に実行されます。

パラメータ：

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickleとテストステップに関する情報を含むworldオブジェクト
- `result` (`object`): シナリオ結果を含む結果オブジェクト
- `result.passed` (`boolean`): シナリオが合格した場合はtrue
- `result.error` (`string`): シナリオが失敗した場合のエラースタック
- `result.duration` (`number`): シナリオの期間（ミリ秒）
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
- `result.passed` (`boolean`): シナリオが合格した場合はtrue
- `result.error` (`string`): シナリオが失敗した場合のエラースタック
- `result.duration` (`number`): シナリオの期間（ミリ秒）
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