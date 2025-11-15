---
id: configurationfile
title: 設定ファイル
---

設定ファイルには、テストスイートを実行するために必要なすべての情報が含まれています。これはJSONをエクスポートするNodeJSモジュールです。

以下は、サポートされているすべてのプロパティと追加情報を含む設定例です：

```js
export const config = {

    // ==================================
    // テストを実行する場所の設定
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // サーバー設定
    // =====================
    // 実行中のSeleniumサーバーのホストアドレス。この情報は通常不要です。
    // WebdriverIOは自動的にlocalhostに接続するためです。また、Sauce Labs、Browserstack、Testing Bot、
    // LambdaTestなどのサポートされているクラウドサービスを使用している場合も、ホストとポート情報を
    // 定義する必要はありません（WebdriverIOはユーザー情報とキー情報からこれを理解できるため）。
    // ただし、プライベートSeleniumバックエンドを使用している場合は、ここで`hostname`、`port`、`path`を定義する必要があります。
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
    // （他のクラウドプロバイダーも機能するはずです。）これらのサービスでは、特定の`user`と`key`（またはアクセスキー）
    // の値を設定する必要があります。これらのサービスに接続するためです。
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Sauce Labsでテストを実行する場合、テストを実行するリージョンを`region`プロパティで指定できます。
    // リージョンの利用可能な短い識別子は`us`（デフォルト）と`eu`です。
    // これらのリージョンはSauce Labs VMクラウドとSauce Labs Real Device Cloudで使用されます。
    // リージョンを指定しない場合、デフォルトは`us`です。
    region: 'us',
    //
    // Sauce Labsは[ヘッドレスオファリング](https://saucelabs.com/products/web-testing/sauce-headless-testing)を
    // 提供しており、ChromeとFirefoxのテストをヘッドレスで実行できます。
    //
    headless: false,
    //
    // ==================
    // テストファイルの指定
    // ==================
    // どのテスト仕様を実行するかを定義します。パターンは、実行される設定ファイルのディレクトリを
    // 基準とした相対パスです。
    //
    // specsは、仕様ファイルの配列として定義されます（ワイルドカードを使用して展開することもできます）。
    // 各仕様ファイルのテストは、別々のワーカープロセスで実行されます。同じワーカープロセスで
    // 一連の仕様ファイルを実行するには、specs配列内の配列内にそれらを含めます。
    //
    // 仕様ファイルのパスは、絶対パスでない限り、設定ファイルのディレクトリからの相対パスとして解決されます。
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
    // ケイパビリティ
    // ============
    // ここでケイパビリティを定義します。WebdriverIOは同時に複数のケイパビリティを実行できます。
    // ケイパビリティの数に応じて、WebdriverIOは複数のテストセッションを起動します。
    // `capabilities`内で`spec`と`exclude`オプションを上書きして、特定の仕様を
    // 特定のケイパビリティにグループ化することができます。
    //
    // まず、同時にいくつのインスタンスを起動するかを定義できます。例えば、
    // 3つの異なるケイパビリティ（Chrome、Firefox、Safari）があり、`maxInstances`を1に
    // 設定すると、wdioは3つのプロセスを生成します。
    //
    // したがって、10の仕様ファイルがあり、`maxInstances`を10に設定すると、すべての仕様ファイルが
    // 同時にテストされ、30のプロセスが生成されます。
    //
    // このプロパティは、同じテストから何個のケイパビリティがテストを実行するかを処理します。
    //
    maxInstances: 10,
    //
    // または特定のケイパビリティでテストを実行する制限を設定します。
    maxInstancesPerCapability: 10,
    //
    // WebdriverIOのグローバル（例：`browser`、`$`、`$$`）をグローバル環境に挿入します。
    // `false`に設定すると、`@wdio/globals`からインポートする必要があります。注意：WebdriverIOは
    // テストフレームワーク固有のグローバルの注入を処理しません。
    //
    injectGlobals: true,
    //
    // 重要なケイパビリティをすべて取得するのに問題がある場合は、Sauce Labsのプラットフォーム
    // コンフィギュレーターをチェックしてください。ケイパビリティを設定するための優れたツールです：
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // chromeをヘッドレスで実行するには次のフラグが必要です
        // (https://developers.google.com/web/updates/2017/04/headless-chrome を参照)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // 一部またはすべてのデフォルトフラグを無視するためのパラメーター
        // - 値がtrueの場合：すべてのDevTools 'デフォルトフラグ'とPuppeteer 'デフォルト引数'を無視します
        // - 値が配列の場合：DevToolsは与えられたデフォルト引数をフィルタリングします
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstancesはケイパビリティごとに上書きできます。つまり、社内にSelenium
        // グリッドがあり、利用可能なFirefoxインスタンスが5つしかない場合、一度に5つ以上の
        // インスタンスが起動しないようにすることができます。
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // Firefoxヘッドレスモードを有効にするフラグ（moz:firefoxOptionsの詳細については
          // https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities を参照してください）
          // args: ['-headless']
        },
        // outputDirが提供されている場合、WebdriverIOはドライバーセッションログをキャプチャできます
        // どのログタイプを除外するかを設定することも可能です。
        // excludeDriverLogs: ['*'], // すべてのドライバーセッションログを除外するには '*' を渡します
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Puppeteerのデフォルト引数の一部またはすべてを無視するためのパラメーター
        // ignoreDefaultArgs: ['-foreground'], // すべてのデフォルト引数を無視するには値をtrueに設定します
    }],
    //
    // 子プロセスの起動時に使用する追加のノード引数のリスト
    execArgv: [],
    //
    // ===================
    // テスト設定
    // ===================
    // WebdriverIOインスタンスに関連するすべてのオプションをここで定義します
    //
    // ログの詳細レベル: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // ロガーごとに特定のログレベルを設定します
    // 'silent'レベルを使用してロガーを無効にします
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // すべてのログを保存するディレクトリを設定します
    outputDir: __dirname,
    //
    // 特定数のテストが失敗した場合にのみテストを実行したい場合は、
    // bail（デフォルトは0 - 中断せず、すべてのテストを実行）を使用します。
    bail: 0,
    //
    // `url()`コマンドコールを短縮するためにベースURLを設定します。`url`パラメータが
    // `/`で始まる場合、`baseUrl`が前置されますが、`baseUrl`のパス部分は含まれません。
    //
    // `url`パラメータがスキームや`/`なしで始まる場合（`some/path`のような）、`baseUrl`
    // が直接前置されます。
    baseUrl: 'http://localhost:8080',
    //
    // すべてのwaitForXXXコマンドのデフォルトタイムアウト。
    waitforTimeout: 1000,
    //
    // `wdio`コマンドを`--watch`フラグで実行する際に監視するファイルを追加します。
    // グロビングがサポートされています。
    filesToWatch: [
        // 例：アプリケーションコードを変更したときにテストを再実行する
        // './app/**/*.js'
    ],
    //
    // 仕様を実行するフレームワーク。
    // サポートされているもの: 'mocha'、'jasmine'、および 'cucumber'
    // 参照: https://webdriver.io/docs/frameworks.html
    //
    // テストを実行する前に、特定のフレームワーク用のwdioアダプターパッケージがインストールされていることを確認してください。
    framework: 'mocha',
    //
    // 仕様ファイル全体が全体として失敗した場合に再試行する回数
    specFileRetries: 1,
    // 仕様ファイルの再試行間の遅延（秒単位）
    specFileRetriesDelay: 0,
    // 再試行された仕様ファイルを即座に再試行するか、キューの最後に延期するか
    specFileRetriesDeferred: false,
    //
    // stdoutのテストレポーター。
    // デフォルトでサポートされているのは 'dot' のみです
    // 参照: https://webdriver.io/docs/dot-reporter.html 、および左列の「Reporters」をクリック
    reporters: [
        'dot',
        ['allure', {
            //
            // 「allure」レポーターを使用している場合は、WebdriverIOがすべての
            // allureレポートを保存するディレクトリを定義する必要があります。
            outputDir: './'
        }]
    ],
    //
    // Mochaに渡すオプション。
    // 完全なリストはこちら: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Jasmineに渡すオプション。
    // 参照: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmineのデフォルトタイムアウト
        defaultTimeoutInterval: 5000,
        //
        // Jasmineフレームワークは、結果に応じてアプリケーションまたはウェブサイトの
        // 状態をログに記録するために、各アサーションをインターセプトすることができます。
        // 例えば、アサーションが失敗するたびにスクリーンショットを撮るのは非常に便利です。
        expectationResultHandler: function(passed, assertion) {
            // 何かを実行
        },
        //
        // Jasmine固有のgrep機能を利用する
        grep: null,
        invertGrep: null
    },
    //
    // Cucumberを使用している場合は、ステップ定義がどこにあるかを指定する必要があります。
    // 参照: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (ファイル/ディレクトリ) 機能を実行する前にファイルを要求する
        backtrace: false,   // <boolean> エラーの完全なバックトレースを表示する
        compiler: [],       // <string[]> ("拡張子:モジュール") MODULEを要求した後、指定されたEXTENSIONを持つファイルを要求する（繰り返し可能）
        dryRun: false,      // <boolean> ステップを実行せずにフォーマッタを呼び出す
        failFast: false,    // <boolean> 最初の失敗時に実行を中止する
        snippets: true,     // <boolean> 保留中のステップのステップ定義スニペットを非表示にする
        source: true,       // <boolean> ソースURIを非表示にする
        strict: false,      // <boolean> 未定義または保留中のステップがある場合に失敗する
        tagExpression: '',  // <string> (式) 式に一致するタグを持つ機能またはシナリオのみを実行する
        timeout: 20000,     // <number> ステップ定義のタイムアウト
        ignoreUndefinedDefinitions: false, // <boolean> 未定義の定義を警告として扱うためにこの設定を有効にします。
        scenarioLevelReporter: false // シナリオ（ステップではなく）がテストであるかのようにwebdriver.ioを動作させるためにこれを有効にします。
    },
    // カスタムのtsconfigパスを指定する - WDIOはTypeScriptファイルをコンパイルするために`tsx`を使用します
    // TSConfigは現在の作業ディレクトリから自動的に検出されますが、
    // ここでカスタムパスを指定するか、TSX_TSCONFIG_PATH環境変数を設定することができます
    // `tsx`のドキュメントを参照: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // 注意：この設定は、指定された場合、TSX_TSCONFIG_PATH環境変数やcli --tsConfigPath引数によって上書きされます。
    // tsconfig.jsonでパスエイリアスを設定していて、wdio.config.tsファイル内でそれらのパスエイリアスを使用している場合など、
    // tsxの助けなしにはノードがwdio.conf.tsファイルを解析できない場合、この設定は無視されます。
    // .js設定ファイルを使用している場合、または.ts設定ファイルが有効なJavaScriptである場合にのみ使用してください。
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // フック
    // =====
    // WebdriverIOは、テストプロセスに干渉してそれを強化し、その周りにサービスを構築するために
    // 使用できるいくつかのフックを提供します。単一の関数を適用するか、メソッドの配列を適用することができます。
    // それらの一つがプロミスで返される場合、WebdriverIOはそのプロミスが解決されるまで待機してから続行します。
    //
    /**
     * すべてのワーカーが起動する前に一度実行されます。
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * ワーカープロセスが生成される前に実行され、そのワーカーに特定のサービスを初期化したり、
     * 非同期な方法でランタイム環境を変更したりするために使用できます。
     * @param  {string} cid      ケイパビリティID（例：0-0）
     * @param  {object} caps     ワーカーで生成されるセッションのケイパビリティを含むオブジェクト
     * @param  {object} specs    ワーカープロセスで実行される仕様
     * @param  {object} args     ワーカーが初期化された後に主要な設定とマージされるオブジェクト
     * @param  {object} execArgv ワーカープロセスに渡される文字列引数のリスト
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * ワーカープロセスが終了した後に実行されます。
     * @param  {string} cid      ケイパビリティID（例：0-0）
     * @param  {number} exitCode 0 - 成功、1 - 失敗
     * @param  {object} specs    ワーカープロセスで実行される仕様
     * @param  {number} retries  使用された再試行回数
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * webdriverセッションとテストフレームワークを初期化する前に実行されます。
     * ケイパビリティや仕様に応じて設定を操作することができます。
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     * @param {Array.<String>} specs 実行される仕様ファイルのパスのリスト
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * テスト実行が開始される前に実行されます。この時点で、`browser`のようなすべてのグローバル変数に
     * アクセスできます。カスタムコマンドを定義するのに最適な場所です。
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     * @param {Array.<String>} specs        実行される仕様ファイルのパスのリスト
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
     * このフックは、スイート内のすべてのフックが開始する_前_に実行されます。
     *（例えば、Mochaでは`before`、`beforeEach`、`after`、`afterEach`を呼び出す前に実行されます）。CucumberではWorldオブジェクトが`context`です。
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * スイート内のすべてのフックが終了した_後_に実行されるフック。
     *（例えば、Mochaでは`before`、`beforeEach`、`after`、`afterEach`を呼び出した後に実行されます）。CucumberではWorldオブジェクトが`context`です。
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
     * WebdriverIOコマンドが実行された後に実行されます
     * @param {string} commandName フックコマンド名
     * @param {Array} args コマンドが受け取る引数
     * @param {*} result コマンドの結果
     * @param {Error} error エラーオブジェクト（存在する場合）
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * テストの後に実行される関数（Mocha/Jasmineのみ）
     * @param {object}  test             テストオブジェクト
     * @param {object}  context          テストが実行されたスコープオブジェクト
     * @param {Error}   result.error     テストが失敗した場合のエラーオブジェクト、それ以外の場合は`undefined`
     * @param {*}       result.result    テスト関数の戻りオブジェクト
     * @param {number}  result.duration  テストの実行時間
     * @param {boolean} result.passed    テストが合格した場合はtrue、それ以外の場合はfalse
     * @param {object}  result.retries   仕様に関連する再試行に関する情報、例：`{ attempts: 0, limit: 0 }`
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
     * すべてのテストが終了した後に実行されます。まだテストのすべてのグローバル変数にアクセスできます。
     * @param {number} result 0 - テスト合格、1 - テスト失敗
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     * @param {Array.<String>} specs 実行された仕様ファイルのパスのリスト
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * webdriverセッションを終了した直後に実行されます。
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     * @param {Array.<String>} specs 実行された仕様ファイルのパスのリスト
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * すべてのワーカーがシャットダウンしてプロセスが終了しようとしている時に実行されます。
     * `onComplete`フックでエラーがスローされると、テスト実行は失敗します。
     * @param {object} exitCode 0 - 成功、1 - 失敗
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
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
     * Cucumberの機能の前に実行されます。
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
     * @param error        何かが問題になった場合のエラー
     */
    afterAssertion: function (params) {
    }
}
```

すべての可能なオプションとバリエーションを含むファイルは[exampleフォルダ](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js)でも見つけることができます。