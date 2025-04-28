---
id: configurationfile
title: 設定ファイル
---

設定ファイルにはテストスイートを実行するために必要なすべての情報が含まれています。これはJSONをエクスポートするNodeJSモジュールです。

以下はサポートされているすべてのプロパティと追加情報を含む設定例です：

```js
export const config = {

    // ==================================
    // テストを起動する場所
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // サーバー設定
    // =====================
    // 実行中のSeleniumサーバーのホストアドレス。この情報は通常不要です。
    // WebdriverIOは自動的にlocalhostに接続します。また、Sauce Labs、Browserstack、
    // Testing Bot、LambdaTestなどのサポートされているクラウドサービスを使用している場合も、
    // ホストとポート情報を定義する必要はありません（WebdriverIOはユーザー情報とキー情報から
    // それを把握できるため）。ただし、プライベートSeleniumバックエンドを使用している場合は、
    // ここで「hostname」、「port」、「path」を定義する必要があります。
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // プロトコル: http | https
    // protocol: 'http',
    //
    // =================
    // サービスプロバイダー
    // =================
    // WebdriverIOはSauce Labs、Browserstack、Testing Bot、LambdaTestをサポートしています。
    // （他のクラウドプロバイダーも動作するはずです。）これらのサービスは特定の `user` と
    // `key`（またはアクセスキー）の値を定義しており、これらのサービスに接続するためには
    // ここに記入する必要があります。
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Sauce Labsでテストを実行する場合、`region`プロパティを使用してテストを実行したい
    // リージョンを指定できます。リージョンの利用可能な短縮ハンドルは`us`（デフォルト）と`eu`です。
    // これらのリージョンはSauce Labs VMクラウドとSauce Labs Real Device Cloudに使用されます。
    // リージョンを指定しない場合、デフォルトは`us`になります。
    region: 'us',
    //
    // Sauce Labsは[ヘッドレスオファリング](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // を提供しており、ChromeとFirefoxのテストをヘッドレスで実行できます。
    //
    headless: false,
    //
    // ==================
    // テストファイルの指定
    // ==================
    // 実行するテスト仕様を定義します。パターンは設定ファイルが実行されるディレクトリを
    // 基準とした相対パスです。
    //
    // specsは、仕様ファイルの配列として定義されます（オプションでワイルドカードを使用して
    // 展開されます）。各仕様ファイルのテストは別々のワーカープロセスで実行されます。
    // 一群の仕様ファイルを同じワーカープロセスで実行するには、specs配列内の配列にそれらを
    // 含めます。
    //
    // 仕様ファイルのパスは、絶対パスでない限り、設定ファイルのディレクトリからの相対パスで
    // 解決されます。
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // 除外するパターン
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // 機能
    // ============
    // ここで機能を定義します。WebdriverIOは同時に複数の機能を実行できます。
    // 機能の数に応じて、WebdriverIOは複数のテストセッションを起動します。
    // `capabilities`内で、特定の機能に特定の仕様をグループ化するために、`spec`および
    // `exclude`オプションを上書きすることができます。
    //
    // まず、同時にいくつのインスタンスを起動するかを定義できます。例えば、3つの異なる
    // 機能（Chrome、Firefox、Safari）があり、`maxInstances`を1に設定したとします。
    // wdioは3つのプロセスを生成します。
    //
    // したがって、10個の仕様ファイルがあり、`maxInstances`を10に設定すると、
    // すべての仕様ファイルが同時にテストされ、30個のプロセスが生成されます。
    //
    // このプロパティは、同じテストからいくつの機能がテストを実行するかを処理します。
    //
    maxInstances: 10,
    //
    // または特定の機能でテストを実行する制限を設定します。
    maxInstancesPerCapability: 10,
    //
    // WebdriverIOのグローバル（例：`browser`、`$`、`$$`）をグローバル環境に挿入します。
    // `false`に設定した場合、`@wdio/globals`からインポートする必要があります。注意：WebdriverIOは
    // テストフレームワーク固有のグローバルの注入を処理しません。
    //
    injectGlobals: true,
    //
    // すべての重要な機能をまとめるのに問題がある場合は、Sauce Labsプラットフォーム
    // コンフィギュレーターを確認してください - 機能を設定するための優れたツールです：
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // chromeをヘッドレスで実行するには、以下のフラグが必要です
        // (https://developers.google.com/web/updates/2017/04/headless-chrome を参照)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // 一部またはすべてのデフォルトフラグを無視するパラメータ
        // - 値がtrueの場合：すべてのDevTools 'デフォルトフラグ'とPuppeteer 'デフォルト引数'を無視
        // - 値が配列の場合：DevToolsは指定されたデフォルト引数をフィルタリングします
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstancesは機能ごとに上書きできます。そのため、社内Seleniumグリッドが
        // 5つのFirefoxインスタンスしか利用できない場合、一度に5つ以上のインスタンスが
        // 開始されないようにすることができます。
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // Firefoxヘッドレスモードをアクティブにするフラグ（moz:firefoxOptionsの詳細については
          // https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities を参照）
          // args: ['-headless']
        },
        // outputDirが提供されている場合、WebdriverIOはドライバーセッションログをキャプチャできます
        // 除外するlogTypesを設定することも可能です。
        // excludeDriverLogs: ['*'], // '*'を渡してすべてのドライバーセッションログを除外
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Puppeteerのデフォルト引数の一部またはすべてを無視するパラメータ
        // ignoreDefaultArgs: ['-foreground'], // すべてのデフォルト引数を無視するにはtrueを設定
    }],
    //
    // 子プロセスを起動する際に使用する追加のnode引数リスト
    execArgv: [],
    //
    // ===================
    // テスト設定
    // ===================
    // WebdriverIOインスタンスに関連するすべてのオプションをここで定義します
    //
    // ロギングの詳細レベル: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // ロガーごとに特定のログレベルを設定
    // 'silent'レベルを使用してロガーを無効にする
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // すべてのログを保存するディレクトリを設定
    outputDir: __dirname,
    //
    // 特定の数のテストが失敗した場合にのみテストを実行したい場合は、
    // bail（デフォルトは0 - 中断しない、すべてのテストを実行）を使用します。
    bail: 0,
    //
    // `url()`コマンド呼び出しを短縮するためにベースURLを設定します。`url`パラメータが
    // `/`で始まる場合、`baseUrl`のパス部分を含まず、`baseUrl`が前に追加されます。
    //
    // `url`パラメータがスキームや`/`なしで始まる場合（例：`some/path`）、`baseUrl`
    // が直接前に追加されます。
    baseUrl: 'http://localhost:8080',
    //
    // すべてのwaitForXXXコマンドのデフォルトタイムアウト。
    waitforTimeout: 1000,
    //
    // `--watch`フラグで`wdio`コマンドを実行する際に監視するファイルを追加します
    // （アプリケーションコードやページオブジェクトなど）。グロビングがサポートされています。
    filesToWatch: [
        // 例：アプリケーションコードを変更した場合にテストを再実行
        // './app/**/*.js'
    ],
    //
    // 仕様を実行するフレームワーク。
    // サポートされているのは：'mocha'、'jasmine'、'cucumber'
    // 参照：https://webdriver.io/docs/frameworks.html
    //
    // テストを実行する前に、特定のフレームワーク用のwdioアダプターパッケージがインストールされていることを確認してください。
    framework: 'mocha',
    //
    // 全体として失敗した場合に仕様ファイル全体を再試行する回数
    specFileRetries: 1,
    // 仕様ファイルの再試行間の遅延（秒）
    specFileRetriesDelay: 0,
    // 再試行された仕様ファイルを即座に再試行するか、キューの最後に延期するか
    specFileRetriesDeferred: false,
    //
    // 標準出力用のテストレポーター。
    // デフォルトでサポートされているのは 'dot' のみ
    // 参照：https://webdriver.io/docs/dot-reporter.html および左列の「Reporters」をクリック
    reporters: [
        'dot',
        ['allure', {
            //
            // 「allure」レポーターを使用している場合は、WebdriverIOが
            // すべてのallureレポートを保存するディレクトリを定義する必要があります。
            outputDir: './'
        }]
    ],
    //
    // Mochaに渡すオプション。
    // 完全なリストは以下を参照：http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Jasmineに渡すオプション。
    // 参照：https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmineのデフォルトタイムアウト
        defaultTimeoutInterval: 5000,
        //
        // Jasmineフレームワークは、結果に応じてアプリケーションまたはウェブサイトの状態を
        // ログに記録するために、各アサーションをインターセプトすることができます。
        // 例えば、アサーションが失敗するたびにスクリーンショットを撮ることは非常に便利です。
        expectationResultHandler: function(passed, assertion) {
            // 何かを行う
        },
        //
        // Jasmine固有のgrep機能を使用する
        grep: null,
        invertGrep: null
    },
    //
    // Cucumberを使用している場合は、ステップ定義がどこにあるかを指定する必要があります。
    // 参照：https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (ファイル/ディレクトリ) 機能を実行する前にファイルを読み込む
        backtrace: false,   // <boolean> エラーの完全なバックトレースを表示
        compiler: [],       // <string[]> ("拡張子:モジュール") MODULEを要求した後、指定されたEXTENSIONを持つファイルを要求（繰り返し可能）
        dryRun: false,      // <boolean> ステップを実行せずにフォーマッタを呼び出す
        failFast: false,    // <boolean> 最初の失敗時に実行を中止
        snippets: true,     // <boolean> 保留中のステップのステップ定義スニペットを非表示
        source: true,       // <boolean> ソースURIを隠す
        strict: false,      // <boolean> 未定義または保留中のステップがある場合は失敗する
        tagExpression: '',  // <string> (式) 式に一致するタグを持つ機能またはシナリオのみを実行
        timeout: 20000,     // <number> ステップ定義のタイムアウト
        ignoreUndefinedDefinitions: false, // <boolean> 未定義の定義を警告として扱うためにこの設定を有効にする
        scenarioLevelReporter: false // シナリオ（ステップではなく）がテストであるかのようにwebdriver.ioの動作させるにはこれを有効にします
    },
    // カスタムのtsconfig pathを指定 - WDIOはTypeScriptファイルをコンパイルするために `tsx` を使用
    // TSConfigは現在の作業ディレクトリから自動的に検出されますが、
    // ここでカスタムパスを指定するか、TSX_TSCONFIG_PATH環境変数を設定できます
    // `tsx` docsを参照：https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // フック
    // =====
    // WebdriverIOは、テストプロセスに介入してそれを強化し、その周りにサービスを構築するために
    // 使用できるいくつかのフックを提供します。単一の関数を適用することも、メソッドの配列を
    // 適用することもできます。それらの1つがpromiseを返す場合、WebdriverIOはそのpromiseが
    // 解決されるまで待機してから続行します。
    //
    /**
     * すべてのワーカーが起動する前に一度実行されます。
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities 機能詳細のリスト
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * ワーカープロセスが生成される前に実行され、そのワーカーの特定のサービスを初期化したり、
     * 非同期的に実行環境を変更したりするのに使用できます。
     * @param  {string} cid      機能ID（例：0-0）
     * @param  {object} caps     ワーカーで生成されるセッションの機能を含むオブジェクト
     * @param  {object} specs    ワーカープロセスで実行される仕様
     * @param  {object} args     ワーカーが初期化された後にメイン設定とマージされるオブジェクト
     * @param  {object} execArgv ワーカープロセスに渡される文字列引数のリスト
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * ワーカープロセスが終了した後に実行されます。
     * @param  {string} cid      機能ID（例：0-0）
     * @param  {number} exitCode 0 - 成功、1 - 失敗
     * @param  {object} specs    ワーカープロセスで実行される仕様
     * @param  {number} retries  使用された再試行回数
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * webdriverセッションとテストフレームワークを初期化する前に実行されます。
     * 機能や仕様に応じて設定を操作することができます。
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities 機能詳細のリスト
     * @param {Array.<String>} specs 実行される仕様ファイルパスのリスト
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * テスト実行が始まる前に実行されます。この時点で`browser`などのすべてのグローバル変数に
     * アクセスできます。カスタムコマンドを定義するのに最適な場所です。
     * @param {Array.<Object>} capabilities 機能詳細のリスト
     * @param {Array.<String>} specs        実行される仕様ファイルパスのリスト
     * @param {object}         browser      作成されたブラウザ/デバイスセッションのインスタンス
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * スイートが開始する前に実行されます（Mocha/Jasmineのみ）。
     * @param {object} suite スイートの詳細
     */
    beforeSuite: function (suite) {
    },
    /**
     * このフックは、スイート内の_すべての_フックが開始する前に実行されます。
     * （例えば、Mochaでは`before`、`beforeEach`、`after`、`afterEach`を呼び出す前に実行されます）。
     * Cucumberでは`context`はWorldオブジェクトです。
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * スイート内の_すべての_フックが終了した後に実行されるフック。
     * （例えば、Mochaでは`before`、`beforeEach`、`after`、`afterEach`を呼び出した後に実行されます）。
     * Cucumberでは`context`はWorldオブジェクトです。
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * テストの前に実行される関数（Mocha/Jasmineのみ）
     * @param {object} test    テストオブジェクト
     * @param {object} context テストが実行されたスコープオブジェクト
     */
    beforeTest: function (test, context) {
    },
    /**
     * WebdriverIOコマンドが実行される前に実行されます。
     * @param {string} commandName フックコマンド名
     * @param {Array} args コマンドが受け取る引数
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * WebdriverIOコマンドが実行された後に実行されます。
     * @param {string} commandName フックコマンド名
     * @param {Array} args コマンドが受け取る引数
     * @param {number} result 0 - コマンド成功、1 - コマンドエラー
     * @param {object} error エラーオブジェクト（ある場合）
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * テストの後に実行される関数（Mocha/Jasmineのみ）
     * @param {object}  test             テストオブジェクト
     * @param {object}  context          テストが実行されたスコープオブジェクト
     * @param {Error}   result.error     テストが失敗した場合のエラーオブジェクト、それ以外の場合は `undefined`
     * @param {*}       result.result    テスト関数の戻りオブジェクト
     * @param {number}  result.duration  テストの実行時間
     * @param {boolean} result.passed    テストが合格した場合はtrue、それ以外の場合はfalse
     * @param {object}  result.retries   仕様関連の再試行に関する情報、例： `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * スイートが終了した後に実行されるフック（Mocha/Jasmineのみ）。
     * @param {object} suite スイートの詳細
     */
    afterSuite: function (suite) {
    },
    /**
     * すべてのテストが完了した後に実行されます。テストからすべてのグローバル変数に
     * アクセスできます。
     * @param {number} result 0 - テスト合格、1 - テスト失敗
     * @param {Array.<Object>} capabilities 機能詳細のリスト
     * @param {Array.<String>} specs 実行された仕様ファイルパスのリスト
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * webdriverセッションを終了した直後に実行されます。
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities 機能詳細のリスト
     * @param {Array.<String>} specs 実行された仕様ファイルパスのリスト
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * すべてのワーカーがシャットダウンしてプロセスが終了する前に実行されます。
     * `onComplete`フックでエラーがスローされると、テスト実行が失敗します。
     * @param {object} exitCode 0 - 成功、1 - 失敗
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities 機能詳細のリスト
     * @param {<Object>} results テスト結果を含むオブジェクト
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * リフレッシュが発生したときに実行されます。
    * @param {string} oldSessionId 古いセッションのセッションID
    * @param {string} newSessionId 新しいセッションのセッションID
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumberフック
     *
     * Cucumber機能の前に実行されます。
     * @param {string}                   uri      機能ファイルへのパス
     * @param {GherkinDocument.IFeature} feature  Cucumber機能オブジェクト
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Cucumberシナリオの前に実行されます。
     * @param {ITestCaseHookParameter} world    pickleとテストステップに関する情報を含むworldオブジェクト
     * @param {object}                 context  Cucumber Worldオブジェクト
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Cucumberステップの前に実行されます。
     * @param {Pickle.IPickleStep} step     ステップデータ
     * @param {IPickle}            scenario シナリオpickle
     * @param {object}             context  Cucumber Worldオブジェクト
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Cucumberステップの後に実行されます。
     * @param {Pickle.IPickleStep} step             ステップデータ
     * @param {IPickle}            scenario         シナリオpickle
     * @param {object}             result           シナリオ結果を含む結果オブジェクト
     * @param {boolean}            result.passed    シナリオが合格した場合はtrue
     * @param {string}             result.error     シナリオが失敗した場合のエラースタック
     * @param {number}             result.duration  シナリオの実行時間（ミリ秒）
     * @param {object}             context          Cucumber Worldオブジェクト
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Cucumberシナリオの後に実行されます。
     * @param {ITestCaseHookParameter} world            pickleとテストステップに関する情報を含むworldオブジェクト
     * @param {object}                 result           シナリオ結果を含む結果オブジェクト `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    シナリオが合格した場合はtrue
     * @param {string}                 result.error     シナリオが失敗した場合のエラースタック
     * @param {number}                 result.duration  シナリオの実行時間（ミリ秒）
     * @param {object}                 context          Cucumber Worldオブジェクト
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Cucumber機能の後に実行されます。
     * @param {string}                   uri      機能ファイルへのパス
     * @param {GherkinDocument.IFeature} feature  Cucumber機能オブジェクト
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * WebdriverIOアサーションライブラリがアサーションを行う前に実行されます。
     * @param commandName コマンド名
     * @param args        コマンドが受け取る引数
     */
    beforeAssertion: function (params) {
    },
    /**
     * WebdriverIOコマンドが実行された後に実行されます
     * @param commandName  コマンド名
     * @param args         コマンドが受け取る引数
     * @param result       コマンドの結果
     * @param error        問題が発生した場合のエラー
     */
    afterAssertion: function (params) {
    }
}
```

[exampleフォルダ](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js)で、すべての可能なオプションとバリエーションを含むファイルを見つけることもできます。