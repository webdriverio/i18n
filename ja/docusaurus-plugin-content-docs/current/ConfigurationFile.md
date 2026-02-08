---
id: configurationfile
title: 設定ファイル
---

設定ファイルには、テストスイートを実行するために必要なすべての情報が含まれています。これはJSONをエクスポートするNodeJSモジュールです。

以下は、サポートされているすべてのプロパティと追加情報を含む設定例です：

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
    // 実行中のSeleniumサーバーのホストアドレス。通常、WebdriverIOは自動的にlocalhostに接続するため、
    // この情報は不要です。また、Sauce Labs、Browserstack、Testing Bot、TestMu AI（旧LambdaTest）などの
    // サポートされているクラウドサービスを使用している場合も、ホストとポート情報を定義する必要はありません
    // （WebdriverIOはユーザーとキー情報からそれを把握できるため）。ただし、プライベートなSeleniumバックエンドを
    // 使用している場合は、ここで`hostname`、`port`、`path`を定義する必要があります。
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
    // WebdriverIOはSauce Labs、Browserstack、Testing Bot、TestMu AI（旧LambdaTest）をサポートしています。
    // （他のクラウドプロバイダーも機能するはずです。）これらのサービスは、これらのサービスに接続するために
    // 必要な特定の`user`と`key`（またはアクセスキー）の値を定義します。
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Sauce Labsでテストを実行する場合は、`region`プロパティを使用してテストを実行したい地域を指定できます。
    // 地域に使用できる短い表記は`us`（デフォルト）と`eu`です。
    // これらの地域はSauce LabsのVMクラウドとSauce Labs Real Device Cloudに使用されます。
    // 地域を指定しない場合、デフォルトは`us`になります。
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
    // 実行するテスト仕様を定義します。パターンは、実行される設定ファイルのディレクトリを基準とした相対パスです。
    //
    // specsは、spec ファイルの配列として定義されます（オプションでワイルドカードを使用して展開されます）。
    // 各specファイルのテストは、別々のワーカープロセスで実行されます。同じワーカープロセスでspecファイルの
    // グループを実行するには、specsの配列内に配列として囲みます。
    //
    // specファイルのパスは、絶対パスでない限り、設定ファイルのディレクトリからの相対パスとして解決されます。
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // 除外パターン
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capabilities
    // ============
    // ここでcapabilitiesを定義します。WebdriverIOは同時に複数のcapabilitiesを実行できます。
    // capabilitiesの数によって、WebdriverIOは複数のテストセッションを起動します。`capabilities`内で、
    // 特定のspecを特定のcapabilityにグループ化するために、`spec`および`exclude`オプションを上書きできます。
    //
    // まず、同時に何個のインスタンスを起動するかを定義できます。例えば、3つの異なるcapabilities
    // （Chrome、Firefox、およびSafari）があり、`maxInstances`を1に設定している場合、wdioは3つのプロセスを生成します。
    //
    // したがって、10個のspecファイルがあり、`maxInstances`を10に設定すると、すべてのspecファイルが
    // 同時にテストされ、30個のプロセスが生成されます。
    //
    // このプロパティは、同じテストから何個のcapabilitiesがテストを実行するかを処理します。
    //
    maxInstances: 10,
    //
    // または、特定のcapabilityでテストを実行する制限を設定します。
    maxInstancesPerCapability: 10,
    //
    // WebdriverIOのグローバル（`browser`、`$`、`$$`など）をグローバル環境に挿入します。
    // `false`に設定すると、`@wdio/globals`からインポートする必要があります。注意：WebdriverIOは
    // テストフレームワーク固有のグローバルの注入を処理しません。
    //
    injectGlobals: true,
    //
    // 重要なcapabilitiesをすべて取得するのに問題がある場合は、Sauce Labsのプラットフォームコンフィギュレータを
    // チェックしてください - capabilitiesを設定するための素晴らしいツールです：
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // Chromeをヘッドレスで実行するには、次のフラグが必要です
        // (https://developers.google.com/web/updates/2017/04/headless-chrome を参照)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // 一部またはすべてのデフォルトフラグを無視するためのパラメータ
        // - 値がtrue：DevToolsの'default flags'とPuppeteerの'default arguments'をすべて無視
        // - 値が配列：DevToolsは指定されたデフォルト引数をフィルタリング
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstancesはcapabilityごとに上書きできます。したがって、社内にSeleniumグリッドがあり、
        // Firefoxインスタンスが5つしかない場合は、一度に5つ以上のインスタンスが起動しないようにできます。
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // Firefoxヘッドレスモードを有効にするフラグ（moz:firefoxOptionsについての詳細は
          // https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities を参照）
          // args: ['-headless']
        },
        // outputDirが提供されている場合、WebdriverIOはドライバーセッションログを取得できます
        // 除外するlogTypesを設定することも可能です
        // excludeDriverLogs: ['*'], // すべてのドライバーセッションログを除外するには'*'を渡す
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Puppeteerのデフォルト引数の一部またはすべてを無視するパラメータ
        // ignoreDefaultArgs: ['-foreground'], // すべてのデフォルト引数を無視するにはtrueに設定
    }],
    //
    // 子プロセスを起動する際に使用するNode引数の追加リスト
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
    // bail（デフォルトは0 - bailしない、すべてのテストを実行）を使用します。
    bail: 0,
    //
    // `url()`コマンド呼び出しを短縮するためにベースURLを設定します。`url`パラメータが
    // `/`で始まる場合、`baseUrl`が前置されますが、`baseUrl`のパス部分は含まれません。
    //
    // `url`パラメータがスキームや`/`なしで始まる場合（`some/path`など）、`baseUrl`が
    // 直接前置されます。
    baseUrl: 'http://localhost:8080',
    //
    // すべてのwaitForXXXコマンドのデフォルトタイムアウト。
    waitforTimeout: 1000,
    //
    // `wdio`コマンドを`--watch`フラグで実行するときに監視するファイルを追加します。
    // グロブパターンがサポートされています。
    filesToWatch: [
        // 例：アプリケーションコードを変更したときにテストを再実行
        // './app/**/*.js'
    ],
    //
    // specを実行するフレームワーク。
    // 以下がサポートされています：'mocha'、'jasmine'、および'cucumber'
    // 参照：https://webdriver.io/docs/frameworks.html
    //
    // テストを実行する前に、特定のフレームワーク用のwdioアダプターパッケージがインストールされていることを確認してください。
    framework: 'mocha',
    //
    // 全体として失敗した場合にspecファイル全体を再試行する回数
    specFileRetries: 1,
    // specファイル再試行の間の遅延（秒）
    specFileRetriesDelay: 0,
    // 再試行されたspecファイルを即座に再試行するか、キューの最後に延期するか
    specFileRetriesDeferred: false,
    //
    // stdoutのテストレポーター。
    // デフォルトでサポートされている唯一のものは'dot'です
    // 参照：https://webdriver.io/docs/dot-reporter.html、また左側の列の「Reporters」をクリック
    reporters: [
        'dot',
        ['allure', {
            //
            // 「allure」レポーターを使用している場合は、WebdriverIOがすべてのallureレポートを
            // 保存するディレクトリを定義する必要があります。
            outputDir: './'
        }]
    ],
    //
    // Mochaに渡されるオプション。
    // 完全なリストはこちら：http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Jasmineに渡されるオプション。
    // 参照：https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmineのデフォルトタイムアウト
        defaultTimeoutInterval: 5000,
        //
        // Jasmineフレームワークでは、結果に応じてアプリケーションまたはウェブサイトの状態をログに記録するために
        // 各アサーションをインターセプトできます。例えば、アサーションが失敗するたびにスクリーンショットを
        // 撮影するのに非常に便利です。
        expectationResultHandler: function(passed, assertion) {
            // 何かを実行
        },
        //
        // Jasmine固有のgrep機能を使用
        grep: null,
        invertGrep: null
    },
    //
    // Cucumberを使用している場合は、ステップ定義がどこにあるかを指定する必要があります。
    // 参照：https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) 機能を実行する前にファイルを要求
        backtrace: false,   // <boolean> エラーの完全なバックトレースを表示
        compiler: [],       // <string[]> ("extension:module") MODULEを要求した後、指定されたEXTENSIONを持つファイルを要求（繰り返し可能）
        dryRun: false,      // <boolean> ステップを実行せずにフォーマッターを呼び出す
        failFast: false,    // <boolean> 最初の失敗でテスト実行を中止
        snippets: true,     // <boolean> 保留中のステップのステップ定義スニペットを非表示にする
        source: true,       // <boolean> ソースURIを非表示にする
        strict: false,      // <boolean> 未定義または保留中のステップがある場合は失敗させる
        tagExpression: '',  // <string> (expression) 式に一致するタグを持つ機能またはシナリオのみを実行
        timeout: 20000,     // <number> ステップ定義のタイムアウト
        ignoreUndefinedDefinitions: false, // <boolean> 未定義の定義を警告として扱うにはこの設定を有効にします。
        scenarioLevelReporter: false // シナリオ（ステップではなく）がテストであるかのようにwebdriver.ioを動作させるにはこれを有効にします。
    },
    // カスタムtsconfigパスを指定 - WDIOはTypeScriptファイルをコンパイルするために`tsx`を使用します
    // TSConfigは現在の作業ディレクトリから自動的に検出されますが、
    // ここでカスタムパスを指定するか、TSX_TSCONFIG_PATH環境変数を設定することができます
    // `tsx`のドキュメントを参照：https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // 注意：この設定は、TSX_TSCONFIG_PATH環境変数やcliの--tsConfigPath引数が指定されている場合、それらによって上書きされます。
    // もし、tsxの助けなしにNodeがwdio.conf.tsファイルを解析できない場合、この設定は無視されます。例えば、tsconfig.jsonでパスエイリアスを設定し、
    // wdio.config.tsファイル内でそれらのパスエイリアスを使用している場合など。
    // .js設定ファイルを使用しているか、.ts設定ファイルが有効なJavaScriptである場合にのみこれを使用してください。
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // フック
    // =====
    // WebdriverIOは、テストプロセスに介入して強化したり、その周りにサービスを構築したりするために
    // 使用できる複数のフックを提供します。単一の関数またはメソッドの配列を適用できます。
    // そのうちの1つがプロミスを返す場合、WebdriverIOはそのプロミスが解決されるまで待機してから続行します。
    //
    /**
     * すべてのワーカーが起動する前に一度実行されます。
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities capabilitiesの詳細リスト
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * ワーカープロセスが生成される前に実行され、そのワーカーに特定のサービスを初期化したり、
     * 非同期方式でランタイム環境を変更したりするために使用できます。
     * @param  {string} cid      capability id（例：0-0）
     * @param  {object} caps     ワーカーで生成されるセッションのcapabilitiesを含むオブジェクト
     * @param  {object} specs    ワーカープロセスで実行されるspec
     * @param  {object} args     ワーカーが初期化された後に主要な設定とマージされるオブジェクト
     * @param  {object} execArgv ワーカープロセスに渡される文字列引数のリスト
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * ワーカープロセスが終了した後に実行されます。
     * @param  {string} cid      capability id（例：0-0）
     * @param  {number} exitCode 0 - 成功、1 - 失敗
     * @param  {object} specs    ワーカープロセスで実行されるspec
     * @param  {number} retries  使用された再試行回数
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * webdriverセッションとテストフレームワークを初期化する前に実行されます。
     * capabilityやspecに応じて設定を操作することができます。
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities capabilitiesの詳細リスト
     * @param {Array.<String>} specs 実行されるspecファイルパスのリスト
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * テスト実行が開始される前に実行されます。この時点で、`browser`のようなすべてのグローバル変数に
     * アクセスできます。カスタムコマンドを定義するのに最適な場所です。
     * @param {Array.<Object>} capabilities capabilitiesの詳細リスト
     * @param {Array.<String>} specs        実行されるspecファイルパスのリスト
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
     * このフックはスイート内のすべてのフックが開始する_前_に実行されます。
     *（例えば、Mochaの`before`、`beforeEach`、`after`、`afterEach`を呼び出す前に実行されます）。
     * Cucumberでは`context`はWorldオブジェクトです。
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * スイート内のすべてのフックが終了した_後_に実行されるフック。
     *（例えば、Mochaの`before`、`beforeEach`、`after`、`afterEach`を呼び出した後に実行されます）。
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
     * @param {object}  result.retries   specに関連する再試行に関する情報、例えば `{ attempts: 0, limit: 0 }`
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
     * すべてのテストが完了した後に実行されます。テストからすべてのグローバル変数にアクセスできます。
     * @param {number} result 0 - テスト合格、1 - テスト失敗
     * @param {Array.<Object>} capabilities capabilitiesの詳細リスト
     * @param {Array.<String>} specs 実行されたspecファイルパスのリスト
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * webdriverセッションを終了した直後に実行されます。
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities capabilitiesの詳細リスト
     * @param {Array.<String>} specs 実行されたspecファイルパスのリスト
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * すべてのワーカーがシャットダウンしてプロセスが終了する直前に実行されます。
     * `onComplete`フックでエラーがスローされると、テスト実行が失敗します。
     * @param {object} exitCode 0 - 成功、1 - 失敗
     * @param {object} config wdio設定オブジェクト
     * @param {Array.<Object>} capabilities capabilitiesの詳細リスト
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
     * Cucumberフィーチャーの前に実行されます。
     * @param {string}                   uri      フィーチャーファイルへのパス
     * @param {GherkinDocument.IFeature} feature  Cucumberフィーチャーオブジェクト
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
     * Cucumberフィーチャーの後に実行されます。
     * @param {string}                   uri      フィーチャーファイルへのパス
     * @param {GherkinDocument.IFeature} feature  Cucumberフィーチャーオブジェクト
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * WebdriverIOアサーションライブラリがアサーションを行う前に実行されます。
     * @param commandName コマンド名
     * @param args コマンドが受け取る引数
     */
    beforeAssertion: function (params) {
    },
    /**
     * WebdriverIOコマンドが実行された後に実行されます
     * @param commandName コマンド名
     * @param args コマンドが受け取る引数
     * @param result コマンドの結果
     * @param error 何かが間違った場合のエラー
     */
    afterAssertion: function (params) {
    }
}
```

[exampleフォルダ](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js)で可能なすべてのオプションとバリエーションを含むファイルも見つけることができます。