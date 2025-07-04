---
id: configuration
title: 構成
---

[セットアップタイプ](/docs/setuptypes)（例：生のプロトコルバインディングの使用、スタンドアロンパッケージとしてのWebdriverIO、またはWDIOテストランナーの使用）に基づいて、環境を制御するための異なるオプションセットが利用できます。

## WebDriver オプション

[`webdriver`](https://www.npmjs.com/package/webdriver) プロトコルパッケージを使用する場合、以下のオプションが定義されます：

### protocol

ドライバーサーバーと通信する際に使用するプロトコル。

タイプ: `String`<br />
デフォルト: `http`

### hostname

ドライバーサーバーのホスト。

タイプ: `String`<br />
デフォルト: `0.0.0.0`

### port

ドライバーサーバーのポート。

タイプ: `Number`<br />
デフォルト: `undefined`

### path

ドライバーサーバーエンドポイントへのパス。

タイプ: `String`<br />
デフォルト: `/`

### queryParams

ドライバーサーバーに伝播されるクエリパラメータ。

タイプ: `Object`<br />
デフォルト: `undefined`

### user

クラウドサービスのユーザー名（[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)、または[LambdaTest](https://www.lambdatest.com)アカウントでのみ機能します）。設定すると、WebdriverIOは自動的に接続オプションを設定します。クラウドプロバイダーを使用しない場合、これは他のWebDriverバックエンドを認証するために使用できます。

タイプ: `String`<br />
デフォルト: `undefined`

### key

クラウドサービスのアクセスキーまたはシークレットキー（[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)、または[LambdaTest](https://www.lambdatest.com)アカウントでのみ機能します）。設定すると、WebdriverIOは自動的に接続オプションを設定します。クラウドプロバイダーを使用しない場合、これは他のWebDriverバックエンドを認証するために使用できます。

タイプ: `String`<br />
デフォルト: `undefined`

### capabilities

WebDriverセッションで実行したい機能を定義します。詳細については[WebDriverプロトコル](https://w3c.github.io/webdriver/#capabilities)をご覧ください。WebDriverプロトコルをサポートしていない古いドライバーを実行する場合は、セッションを正常に実行するために[JSONWireProtocolの機能](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities)を使用する必要があります。

WebDriverベースの機能に加えて、リモートブラウザやデバイスへのより深い設定を可能にするブラウザおよびベンダー固有のオプションを適用できます。これらは対応するベンダードキュメントに記載されています：

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)用
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)用
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)用
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)用
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)用
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)用

さらに、Sauce Labsの[自動テスト設定ツール](https://docs.saucelabs.com/basics/platform-configurator/)は、クリックするだけで目的の機能を作成するのに役立つ便利なユーティリティです。

タイプ: `Object`<br />
デフォルト: `null`

**例：**

```js
{
    browserName: 'chrome', // オプション: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // ブラウザバージョン
    platformName: 'Windows 10' // OSプラットフォーム
}
```

モバイルデバイスでウェブまたはネイティブテストを実行している場合、`capabilities`はWebDriverプロトコルとは異なります。詳細については[Appiumのドキュメント](https://appium.io/docs/en/latest/guides/caps/)を参照してください。

### logLevel

ログの詳細レベル。

タイプ: `String`<br />
デフォルト: `info`<br />
オプション: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

テストランナーのすべてのログファイル（レポーターログと`wdio`ログを含む）を保存するディレクトリ。設定されていない場合、すべてのログは`stdout`にストリーミングされます。ほとんどのレポーターは`stdout`に出力するように作られているため、このオプションは特定のレポーター（例えば`junit`レポーター）でファイルにレポートをプッシュする方が意味がある場合にのみ使用することをお勧めします。

スタンドアロンモードで実行する場合、WebdriverIOによって生成される唯一のログは`wdio`ログです。

タイプ: `String`<br />
デフォルト: `null`

### connectionRetryTimeout

ドライバーまたはグリッドへのWebDriverリクエストのタイムアウト。

タイプ: `Number`<br />
デフォルト: `120000`

### connectionRetryCount

Seleniumサーバーへのリクエスト再試行の最大回数。

タイプ: `Number`<br />
デフォルト: `3`

### agent

リクエストを行うためのカスタム`http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent)を使用できます。

タイプ: `Object`<br />
デフォルト:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

すべてのWebDriverリクエストに渡すカスタム`headers`を指定します。Seleniumグリッドが基本認証を必要とする場合、このオプションを通じて`Authorization`ヘッダーを渡してWebDriverリクエストを認証することをお勧めします：

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// 環境変数からユーザー名とパスワードを読み込む
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// ユーザー名とパスワードをコロン区切りで結合
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

タイプ: `Object`<br />
デフォルト: `{}`

### transformRequest

WebDriverリクエストが行われる前に[HTTPリクエストオプション](https://github.com/sindresorhus/got#options)を傍受する関数

タイプ: `(RequestOptions) => RequestOptions`<br />
デフォルト: *なし*

### transformResponse

WebDriverレスポンスが到着した後にHTTPレスポンスオブジェクトを傍受する関数。この関数には、最初の引数として元のレスポンスオブジェクトが、2番目の引数として対応する`RequestOptions`が渡されます。

タイプ: `(Response, RequestOptions) => Response`<br />
デフォルト: *なし*

### strictSSL

SSL証明書が有効である必要があるかどうか。
`STRICT_SSL`または`strict_ssl`環境変数を介して設定できます。

タイプ: `Boolean`<br />
デフォルト: `true`

### enableDirectConnect

[Appiumダイレクト接続機能](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments)を有効にするかどうか。
フラグが有効な場合でも、レスポンスに適切なキーがなければ何も行いません。

タイプ: `Boolean`<br />
デフォルト: `true`

### cacheDir

キャッシュディレクトリのルートへのパス。このディレクトリは、セッションを開始しようとするときにダウンロードされるすべてのドライバーを保存するために使用されます。

タイプ: `String`<br />
デフォルト: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

より安全なログ記録のために、`maskingPatterns`で設定された正規表現を使用して、ログから機密情報を難読化できます。
 - 文字列形式は、フラグ付きまたはフラグなしの正規表現（例：`/.../i`）で、複数の正規表現はカンマ区切りです。
 - マスキングパターンの詳細については、[WDIO LoggerのREADMEのマスキングパターンセクション](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)を参照してください。

タイプ: `String`<br />
デフォルト: `undefined`

**例：**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

以下のオプション（上記のオプションを含む）は、スタンドアロンでWebdriverIOと共に使用できます：

### automationProtocol

ブラウザ自動化に使用するプロトコルを定義します。現在、WebdriverIOが使用する主要なブラウザ自動化技術である[`webdriver`](https://www.npmjs.com/package/webdriver)のみがサポートされています。

別の自動化技術を使用してブラウザを自動化したい場合は、このプロパティを次のインターフェースに準拠するモジュールに解決されるパスに設定してください：

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * 自動化セッションを開始し、WebdriverIOの[モナド](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)を
     * 各自動化コマンドと共に返します。参照実装として[webdriver](https://www.npmjs.com/package/webdriver)パッケージを
     * 参照してください
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIOオプション
     * @param {Function} hook 関数から解放される前にクライアントを修正できるようにする
     * @param {PropertyDescriptorMap} userPrototype ユーザーがカスタムプロトコルコマンドを追加できるようにする
     * @param {Function} customCommandWrapper コマンド実行を修正できるようにする
     * @returns WebdriverIO互換のクライアントインスタンス
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * ユーザーが既存のセッションに接続できるようにする
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * インスタンスセッションIDとブラウザ機能を新しいセッション用に
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

タイプ: `String`<br />
デフォルト: `webdriver`

### baseUrl

ベースURLを設定することで`url`コマンド呼び出しを短縮します。
- `url`パラメータが`/`で始まる場合、`baseUrl`が前に付けられます（`baseUrl`にパスがある場合はそのパスを除く）。
- `url`パラメータがスキームまたは`/`なしで始まる場合（`some/path`のように）、完全な`baseUrl`が直接前に付けられます。

タイプ: `String`<br />
デフォルト: `null`

### waitforTimeout

すべての`waitFor*`コマンドのデフォルトタイムアウト。（オプション名の「f」が小文字であることに注意してください。）このタイムアウトは`waitFor*`で始まるコマンドとそのデフォルト待機時間__のみ__に影響します。

_テスト_のタイムアウトを増やすには、フレームワークのドキュメントを参照してください。

タイプ: `Number`<br />
デフォルト: `5000`

### waitforInterval

すべての`waitFor*`コマンドが期待される状態（例：可視性）が変更されたかどうかをチェックするためのデフォルト間隔。

タイプ: `Number`<br />
デフォルト: `100`

### region

Sauce Labsで実行している場合、USまたはEUの異なるデータセンター間でテストを実行することを選択できます。
リージョンをEUに変更するには、設定に`region: 'eu'`を追加します。

__注意:__ これは、Sauce Labsアカウントに接続されている`user`と`key`オプションを提供する場合にのみ効果があります。

タイプ: `String`<br />
デフォルト: `us`

*（VMおよび/またはエミュレータ/シミュレータのみ）*

---

## テストランナーオプション

以下のオプション（上記のオプションを含む）は、WDIOテストランナーでWebdriverIOを実行する場合にのみ定義されます：

### specs

テスト実行用のスペックを定義します。一度に複数のファイルに一致するグロブパターンを指定するか、グロブまたはパスのセットを配列にラップして単一のワーカープロセス内で実行することができます。すべてのパスは設定ファイルパスからの相対パスとして扱われます。

タイプ: `(String | String[])[]`<br />
デフォルト: `[]`

### exclude

テスト実行からスペックを除外します。すべてのパスは設定ファイルパスからの相対パスとして扱われます。

タイプ: `String[]`<br />
デフォルト: `[]`

### suites

様々なスイートを記述するオブジェクトで、`wdio` CLIで`--suite`オプションを使用して指定できます。

タイプ: `Object`<br />
デフォルト: `{}`

### capabilities

上記で説明した`capabilities`セクションと同じですが、[`multiremote`](/docs/multiremote)オブジェクトを指定するか、並列実行のための複数のWebDriverセッションを配列で指定するオプションがあります。

[上記](/docs/configuration#capabilities)で定義されたのと同じベンダーおよびブラウザ固有の機能を適用できます。

タイプ: `Object`|`Object[]`<br />
デフォルト: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

並列実行されるワーカーの最大総数。

__注意:__ これはSauce Labsのマシンなどの外部ベンダーでテストが実行される場合、`100`のように高い数値になる場合があります。そこでは、テストは単一のマシンではなく、複数のVMでテストされます。テストをローカルの開発マシンで実行する場合は、`3`、`4`、または`5`のようなより合理的な数値を使用してください。基本的に、これは同時に起動され、テストを同時に実行するブラウザの数なので、マシンのRAMの量や実行中の他のアプリの数によって異なります。

`wdio:maxInstances`機能を使用して、機能オブジェクト内で`maxInstances`を適用することもできます。これにより、その特定の機能の並列セッション数が制限されます。

タイプ: `Number`<br />
デフォルト: `100`

### maxInstancesPerCapability

機能ごとの並列実行ワーカーの最大総数。

タイプ: `Number`<br />
デフォルト: `100`

### injectGlobals

WebdriverIOのグローバル（例：`browser`、`$`、`$$`）をグローバル環境に挿入します。
`false`に設定した場合は、`@wdio/globals`からインポートする必要があります：

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

注：WebdriverIOはテストフレームワーク固有のグローバルの注入を処理しません。

タイプ: `Boolean`<br />
デフォルト: `true`

### bail

特定の数のテスト失敗後にテスト実行を停止したい場合は、`bail`を使用します。
（デフォルトは`0`で、どのような場合でもすべてのテストを実行します。）**注意：** この文脈でのテストとは、（MochaまたはJasmineを使用する場合）単一のspecファイル内のすべてのテスト、または（Cucumberを使用する場合）機能ファイル内のすべてのステップを指します。単一のテストファイル内のテストのベイル動作を制御したい場合は、利用可能な[フレームワーク](frameworks)オプションを確認してください。

タイプ: `Number`<br />
デフォルト: `0`（ベイルしない；すべてのテストを実行）

### specFileRetries

specファイル全体が失敗した場合に再試行する回数。

タイプ: `Number`<br />
デフォルト: `0`

### specFileRetriesDelay

specファイルの再試行間の遅延（秒）

タイプ: `Number`<br />
デフォルト: `0`

### specFileRetriesDeferred

再試行されるspecファイルをすぐに再試行するか、キューの最後に延期するかどうか。

タイプ: `Boolean`<br />
デフォルト: `true`

### groupLogsByTestSpec

ログ出力ビューを選択します。

`false`に設定すると、異なるテストファイルからのログがリアルタイムで表示されます。並列実行時に異なるファイルからのログ出力が混ざる可能性があることに注意してください。

`true`に設定すると、ログ出力はテスト仕様ごとにグループ化され、テスト仕様が完了したときにのみ表示されます。

デフォルトでは、`false`に設定されているため、ログはリアルタイムで表示されます。

タイプ: `Boolean`<br />
デフォルト: `false`

### autoAssertOnTestEnd

WebdriverIOが各テストの終了時に自動的にすべてのソフトアサーションをアサートするかどうかを制御します。`true`に設定すると、蓄積されたソフトアサーションが自動的にチェックされ、アサーションが失敗した場合はテストが失敗します。`false`に設定すると、ソフトアサーションをチェックするためにアサートメソッドを手動で呼び出す必要があります。

タイプ: `Boolean`<br />
デフォルト: `true`

### services

サービスは、あなたが面倒を見たくない特定のジョブを引き受けます。ほとんど労力なくテスト設定を強化します。

タイプ: `String[]|Object[]`<br />
デフォルト: `[]`

### framework

WDIOテストランナーで使用するテストフレームワークを定義します。

タイプ: `String`<br />
デフォルト: `mocha`<br />
オプション: `mocha` | `jasmine`

### mochaOpts, jasmineOpts, cucumberOpts

特定のフレームワーク関連のオプション。どのオプションが利用可能かはフレームワークアダプタのドキュメントを参照してください。詳細は[フレームワーク](frameworks)を参照してください。

タイプ: `Object`<br />
デフォルト: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

行番号付きのCucumber機能のリスト（[Cucumberフレームワークを使用する場合](./Frameworks.md#using-cucumber)）。

タイプ: `String[]`
デフォルト: `[]`

### reporters

使用するレポーターのリスト。レポーターは文字列、または`['レポーター名', { /* レポーターオプション */}]`の配列で、最初の要素はレポーター名の文字列、2番目の要素はレポーターオプションを含むオブジェクトです。

タイプ: `String[]|Object[]`<br />
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

レポーターが非同期にログを報告する場合（例：ログが第三者ベンダーにストリーミングされる場合）、同期しているかどうかをレポーターがチェックする間隔を決定します。

タイプ: `Number`<br />
デフォルト: `100` (ms)

### reporterSyncTimeout

レポーターがすべてのログのアップロードを完了するまでの最大時間を決定し、それを超えるとテストランナーによってエラーがスローされます。

タイプ: `Number`<br />
デフォルト: `5000` (ms)

### execArgv

子プロセスを起動する際に指定するNode引数。

タイプ: `String[]`<br />
デフォルト: `null`

### filesToWatch

テストランナーに他のファイル（例：アプリケーションファイル）も監視するよう指示するグロブをサポートする文字列パターンのリストで、`--watch`フラグと共に実行する場合に使用します。デフォルトでは、テストランナーはすでにすべてのspecファイルを監視しています。

タイプ: `String[]`<br />
デフォルト: `[]`

### updateSnapshots

スナップショットを更新したい場合は`true`に設定します。理想的にはCLIパラメータの一部として使用されます、例：`wdio run wdio.conf.js --s`。

タイプ: `'new' | 'all' | 'none'`<br />
デフォルト: 提供されずCIでテストが実行される場合は`none`、提供されない場合は`new`、それ以外は提供されたもの

### resolveSnapshotPath

デフォルトのスナップショットパスをオーバーライドします。例えば、スナップショットをテストファイルの隣に保存します。

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

タイプ: `(testPath: string, snapExtension: string) => string`<br />
デフォルト: スナップショットファイルをテストファイルの隣の`__snapshots__`ディレクトリに保存します

### tsConfigPath

WDIOはTypeScriptファイルをコンパイルするために`tsx`を使用します。TSConfigは現在の作業ディレクトリから自動的に検出されますが、ここでカスタムパスを指定するか、TSX_TSCONFIG_PATH環境変数を設定することができます。

`tsx`のドキュメントを参照してください：https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

タイプ: `String`<br />
デフォルト: `null`<br />

## フック

WDIOテストランナーでは、テストライフサイクルの特定の時点でトリガーされるフックを設定できます。これにより、カスタムアクション（例：テストが失敗した場合にスクリーンショットを撮る）が可能になります。

各フックには、ライフサイクルに関する特定の情報（例：テストスイートやテストに関する情報）がパラメータとして渡されます。すべてのフックのプロパティについての詳細は、[サンプル設定](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326)を参照してください。

**注意：** 一部のフック（`onPrepare`、`onWorkerStart`、`onWorkerEnd`、`onComplete`）は異なるプロセスで実行されるため、ワーカープロセスに存在する他のフックとグローバルデータを共有できません。

### onPrepare

すべてのワーカーが起動する前に一度実行されます。

パラメータ：

- `config` (`object`): WebdriverIO設定オブジェクト
- `param` (`object[]`): 機能詳細のリスト

### onWorkerStart

ワーカープロセスが生成される前に実行され、そのワーカーの特定のサービスを初期化したり、実行環境を非同期的に変更したりするために使用できます。

パラメータ：

- `cid` (`string`): 機能ID（例：0-0）
- `caps` (`object`): ワーカーで生成されるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック
- `args` (`object`): ワーカーが初期化された後にメイン設定とマージされるオブジェクト
- `execArgv` (`string[]`): ワーカープロセスに渡される文字列引数のリスト

### onWorkerEnd

ワーカープロセスが終了した直後に実行されます。

パラメータ：

- `cid` (`string`): 機能ID（例：0-0）
- `exitCode` (`number`): 0 - 成功、1 - 失敗
- `specs` (`string[]`): ワーカープロセスで実行されるスペック
- `retries` (`number`): [_「specファイルごとの再試行を追加」_](./Retry.md#add-retries-on-a-per-specfile-basis)で定義されているスペックレベルの再試行の数

### beforeSession

webdriverセッションとテストフレームワークを初期化する直前に実行されます。機能やスペックに応じて設定を操作することができます。

パラメータ：

- `config` (`object`): WebdriverIO設定オブジェクト
- `caps` (`object`): ワーカーで生成されるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック

### before

テスト実行が開始される前に実行されます。この時点で`browser`のようなすべてのグローバル変数にアクセスできます。カスタムコマンドを定義するのに最適な場所です。

パラメータ：

- `caps` (`object`): ワーカーで生成されるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック
- `browser` (`object`): 作成されたブラウザ/デバイスセッションのインスタンス

### beforeSuite

スイートが開始する前に実行されるフック（MochaおよびJasmineのみ）

パラメータ：

- `suite` (`object`): スイートの詳細

### beforeHook

スイート内のフックが開始する*前*に実行されるフック（例：Mochaでは、beforeEachを呼び出す前に実行されます）

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストコンテキスト（CucumberではWorldオブジェクトを表す）

### afterHook

スイート内のフックが終了した*後*に実行されるフック（例：Mochaでは、afterEachを呼び出した後に実行されます）

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストコンテキスト（CucumberではWorldオブジェクトを表す）
- `result` (`object`): フックの結果（`error`、`result`、`duration`、`passed`、`retries`プロパティを含む）

### beforeTest

テストの前に実行される関数（MochaおよびJasmineのみ）。

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
- `error` (`Error`): エラーがある場合のエラーオブジェクト

### afterTest

テスト（MochaおよびJasmine）が終了した後に実行される関数。

パラメータ：

- `test` (`object`): テストの詳細
- `context` (`object`): テストが実行されたスコープオブジェクト
- `result.error` (`Error`): テストが失敗した場合のエラーオブジェクト、それ以外の場合は`undefined`
- `result.result` (`Any`): テスト関数の戻りオブジェクト
- `result.duration` (`Number`): テストの時間
- `result.passed` (`Boolean`): テストが合格した場合はtrue、それ以外の場合はfalse
- `result.retries` (`Object`): [MochaおよびJasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha)と[Cucumber](./Retry.md#rerunning-in-cucumber)で定義されている単一テスト関連の再試行に関する情報、例：`{ attempts: 0, limit: 0 }`
- `result` (`object`): フックの結果（`error`、`result`、`duration`、`passed`、`retries`プロパティを含む）

### afterSuite

スイートが終了した後に実行されるフック（MochaおよびJasmineのみ）

パラメータ：

- `suite` (`object`): スイートの詳細

### after

すべてのテストが完了した後に実行されます。テストからすべてのグローバル変数にアクセスできます。

パラメータ：

- `result` (`number`): 0 - テスト合格、1 - テスト失敗
- `caps` (`object`): ワーカーで生成されるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック

### afterSession

webdriverセッションを終了した直後に実行されます。

パラメータ：

- `config` (`object`): WebdriverIO設定オブジェクト
- `caps` (`object`): ワーカーで生成されるセッションの機能を含む
- `specs` (`string[]`): ワーカープロセスで実行されるスペック

### onComplete

すべてのワーカーがシャットダウンされ、プロセスが終了しようとしている後に実行されます。onCompleteフックでエラーがスローされると、テスト実行は失敗します。

パラメータ：

- `exitCode` (`number`): 0 - 成功、1 - 失敗
- `config` (`object`): WebdriverIO設定オブジェクト
- `caps` (`object`): ワーカーで生成されるセッションの機能を含む
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
- `result.passed` (`boolean`): シナリオが合格した場合はtrue
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
- `result.passed` (`boolean`): シナリオが合格した場合はtrue
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