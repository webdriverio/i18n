---
id: configurationfile
title: 設定ファイル
description: "サポートされているすべてのテストランナーオプション、ケイパビリティ、フックを解説付きで記載した wdio.conf.js のサンプルを参照できます。"
---

設定ファイルには、テストスイートを実行するために必要なすべての情報が含まれています。これは JSON をエクスポートする NodeJS モジュールです。

以下は、サポートされているすべてのプロパティと追加情報を含む設定例です：

```js
export const config = {

    // ==================================
    // テストをどこで起動するか
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // サーバー設定
    // =====================
    // 実行中の Selenium サーバーのホストアドレス。WebdriverIO は自動的に localhost に
    // 接続するため、この情報は通常不要です。また、Sauce Labs、Browserstack、Testing Bot、
    // TestMu AI（旧 LambdaTest）などのサポートされているクラウドサービスを使用している場合も、
    // ホストとポートの情報を定義する必要はありません（WebdriverIO はユーザーとキーの情報から
    // それを判断できるためです）。ただし、プライベートな Selenium バックエンドを使用している
    // 場合は、ここで `hostname`、`port`、`path` を定義する必要があります。
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
    // WebdriverIO は Sauce Labs、Browserstack、Testing Bot、TestMu AI（旧 LambdaTest）を
    // サポートしています。（他のクラウドプロバイダーでも動作するはずです。）これらのサービスに
    // 接続するには、各サービスが定める特定の `user` と `key`（またはアクセスキー）の値を
    // ここに設定する必要があります。
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Sauce Labs でテストを実行する場合、`region` プロパティでテストを実行するリージョンを
    // 指定できます。利用可能なリージョンの短縮名は `us`（デフォルト）と `eu` です。
    // これらのリージョンは Sauce Labs VM クラウドと Sauce Labs Real Device Cloud で使用されます。
    // リージョンを指定しない場合、デフォルトは `us` です。
    region: 'us',
    //
    // Sauce Labs は [ヘッドレスオファリング](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // を提供しており、Chrome と Firefox のテストをヘッドレスで実行できます。
    //
    headless: false,
    //
    // ==================
    // テストファイルの指定
    // ==================
    // 実行するテストスペックを定義します。パターンは、実行される設定ファイルの
    // ディレクトリからの相対パスです。
    //
    // スペックはスペックファイルの配列として定義します（オプションで展開される
    // ワイルドカードを使用できます）。各スペックファイルのテストは個別のワーカー
    // プロセスで実行されます。複数のスペックファイルを同じワーカープロセスで実行するには、
    // specs 配列内でそれらを配列で囲みます。
    //
    // スペックファイルのパスは、絶対パスでない限り、設定ファイルのディレクトリからの
    // 相対パスとして解決されます。
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // 除外するパターン。
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // ケイパビリティ
    // ============
    // ここでケイパビリティを定義します。WebdriverIO は複数のケイパビリティを同時に実行
    // できます。ケイパビリティの数に応じて、WebdriverIO は複数のテストセッションを起動します。
    // `capabilities` 内では、`wdio:specs` と `wdio:exclude` で実行するファイルを上書きし、
    // 特定のスペックを特定のケイパビリティにグループ化できます。
    //
    // まず、同時に起動するインスタンスの数を定義できます。例えば、3 つの異なる
    // ケイパビリティ（Chrome、Firefox、Safari）があり、`maxInstances` を 1 に設定した
    // 場合、wdio は 3 つのプロセスを生成します。
    //
    // したがって、スペックファイルが 10 個あり、`maxInstances` を 10 に設定した場合、
    // すべてのスペックファイルが同時にテストされ、30 個のプロセスが生成されます。
    //
    // このプロパティは、同じテストから何個のケイパビリティでテストを実行するかを制御します。
    //
    maxInstances: 10,
    //
    // または、特定のケイパビリティでテストを実行する数の上限を設定します。
    maxInstancesPerCapability: 10,
    //
    // WebdriverIO のグローバル（例: `browser`、`$`、`$$`）をグローバル環境に挿入します。
    // `false` に設定した場合は、`@wdio/globals` からインポートする必要があります。注意: WebdriverIO は
    // テストフレームワーク固有のグローバルの注入は処理しません。
    //
    injectGlobals: true,
    //
    // 重要なケイパビリティをすべて揃えるのが難しい場合は、Sauce Labs の
    // プラットフォームコンフィギュレーターを確認してください。ケイパビリティを設定するための優れたツールです:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // chrome をヘッドレスで実行するには、以下のフラグが必要です
        // （https://developers.google.com/web/updates/2017/04/headless-chrome を参照）
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // デフォルトフラグの一部またはすべてを無視するためのパラメーター
        // - 値が true の場合: DevTools の「デフォルトフラグ」と Puppeteer の「デフォルト引数」をすべて無視
        // - 値が配列の場合: DevTools は指定されたデフォルト引数をフィルタリング
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances はケイパビリティごとに上書きできます。そのため、社内の Selenium
        // グリッドで利用可能な firefox インスタンスが 5 つしかない場合でも、同時に 5 つを
        // 超えるインスタンスが起動しないようにできます。
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // Firefox ヘッドレスモードを有効にするフラグ（moz:firefoxOptions の詳細は https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities を参照）
          // args: ['-headless']
        },
        // outputDir が指定されている場合、WebdriverIO はドライバーセッションのログを取得できます
        // 除外する logTypes を設定することが可能です。
        // excludeDriverLogs: ['*'], // すべてのドライバーセッションログを除外するには '*' を渡します
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Puppeteer のデフォルト引数の一部またはすべてを無視するためのパラメーター
        // ignoreDefaultArgs: ['-foreground'], // すべてのデフォルト引数を無視するには値を true に設定します
    }],
    //
    // 子プロセスを起動する際に使用する node 引数の追加リスト
    execArgv: [],
    //
    // ===================
    // テスト設定
    // ===================
    // WebdriverIO インスタンスに関連するすべてのオプションをここで定義します
    //
    // ログの詳細レベル: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // ロガーごとに特定のログレベルを設定します
    // ロガーを無効にするには 'silent' レベルを使用します
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // すべてのログを保存するディレクトリを設定します
    outputDir: __dirname,
    //
    // 特定の数のテストが失敗するまでのみテストを実行したい場合は bail を使用します
    // （デフォルトは 0 - bail せず、すべてのテストを実行）。
    bail: 0,
    //
    // `url()` コマンドの呼び出しを短くするためにベース URL を設定します。`url` パラメーターが
    // `/` で始まる場合、`baseUrl` のパス部分を除いたものが先頭に付加されます。
    //
    // `url` パラメーターがスキームや `/` なしで始まる場合（`some/path` のように）、`baseUrl`
    // がそのまま先頭に付加されます。
    baseUrl: 'http://localhost:8080',
    //
    // すべての waitForXXX コマンドのデフォルトタイムアウト。
    waitforTimeout: 1000,
    //
    // `wdio` コマンドを `--watch` フラグ付きで実行する際に監視するファイル
    // （例: アプリケーションコードやページオブジェクト）を追加します。グロブがサポートされています。
    filesToWatch: [
        // 例: アプリケーションコードを変更したらテストを再実行する
        // './app/**/*.js'
    ],
    //
    // スペックを実行するフレームワーク。
    // サポートされているのは 'mocha'、'jasmine'、'cucumber' です
    // 参照: https://webdriver.io/docs/frameworks.html
    //
    // テストを実行する前に、特定のフレームワーク用の wdio アダプターパッケージがインストールされていることを確認してください。
    framework: 'mocha',
    //
    // スペックファイル全体が失敗した場合に、そのスペックファイル全体を再試行する回数
    specFileRetries: 1,
    // スペックファイルの再試行間の遅延（秒）
    specFileRetriesDelay: 0,
    // 再試行されるスペックファイルを即座に再試行するか、キューの最後に延期するか
    specFileRetriesDeferred: false,
    //
    // stdout 用のテストレポーター。
    // デフォルトでサポートされているのは 'dot' のみです
    // 参照: https://webdriver.io/docs/dot-reporter.html 、および左列の "Reporters" をクリック
    reporters: [
        'dot',
        ['allure', {
            //
            // "allure" レポーターを使用している場合は、WebdriverIO がすべての
            // allure レポートを保存するディレクトリを定義する必要があります。
            outputDir: './'
        }]
    ],
    //
    // Mocha に渡すオプション。
    // 完全なリストは http://mochajs.org を参照してください
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Jasmine に渡すオプション。
    // 参照: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmine のデフォルトタイムアウト
        defaultTimeoutInterval: 5000,
        //
        // Jasmine フレームワークでは、各アサーションをインターセプトして、結果に応じて
        // アプリケーションやウェブサイトの状態をログに記録できます。例えば、アサーションが
        // 失敗するたびにスクリーンショットを撮るのに非常に便利です。
        expectationResultHandler: function(passed, assertion) {
            // 何らかの処理を行う
        },
        //
        // Jasmine 固有の grep 機能を利用する
        grep: null,
        invertGrep: null
    },
    //
    // Cucumber を使用している場合は、ステップ定義の場所を指定する必要があります。
    // 参照: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) フィーチャーを実行する前にファイルを require する
        backtrace: false,   // <boolean> エラーの完全なバックトレースを表示する
        compiler: [],       // <string[]> ("extension:module") MODULE を require した後、指定された EXTENSION のファイルを require する（繰り返し可能）
        dryRun: false,      // <boolean> ステップを実行せずにフォーマッターを呼び出す
        failFast: false,    // <boolean> 最初の失敗で実行を中止する
        snippets: true,     // <boolean> 保留中のステップのステップ定義スニペットを非表示にする
        source: true,       // <boolean> ソース URI を非表示にする
        strict: false,      // <boolean> 未定義または保留中のステップがある場合に失敗させる
        tags: '',           // <string> (expression) 式に一致するタグを持つフィーチャーまたはシナリオのみを実行する
        timeout: 20000,     // <number> ステップ定義のタイムアウト
        ignoreUndefinedDefinitions: false, // <boolean> 未定義の定義を警告として扱うには、この設定を有効にします。
        scenarioLevelReporter: false // これを有効にすると、webdriver.io はステップではなくシナリオをテストとして扱うように動作します。
    },
    // カスタムの tsconfig パスを指定します - WDIO は TypeScript ファイルのコンパイルに `tsx` を使用します
    // TSConfig は現在の作業ディレクトリから自動的に検出されますが、
    // ここで、または TSX_TSCONFIG_PATH 環境変数を設定することでカスタムパスを指定できます
    // `tsx` のドキュメントを参照: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // 注意: TSX_TSCONFIG_PATH 環境変数や CLI の --tsConfigPath 引数が指定されている場合、この設定はそれらによって上書きされます。
    // node が tsx の助けなしに wdio.conf.ts ファイルを解析できない場合、この設定は無視されます。例えば、
    // tsconfig.json でパスエイリアスを設定し、wdio.config.ts ファイル内でそのパスエイリアスを使用している場合などです。
    // .js の設定ファイルを使用している場合、または .ts の設定ファイルが有効な JavaScript である場合にのみ使用してください。
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // フック
    // =====
    // WebdriverIO は、テストプロセスに介入して機能を拡張したり、その周辺にサービスを
    // 構築したりするために使用できるいくつかのフックを提供しています。単一の関数または
    // メソッドの配列を適用できます。いずれかが promise を返す場合、WebdriverIO はその
    // promise が解決されるまで待ってから処理を続行します。
    //
    /**
     * すべてのワーカーが起動される前に一度だけ実行されます。
     * @param {object} config wdio 設定オブジェクト
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * ワーカープロセスが生成される前に実行され、そのワーカー用の特定のサービスを初期化したり、
     * 非同期でランタイム環境を変更したりするために使用できます。
     * @param  {string} cid      ケイパビリティ ID（例: 0-0）
     * @param  {object} caps     ワーカーで生成されるセッションのケイパビリティを含むオブジェクト
     * @param  {object} specs    ワーカープロセスで実行されるスペック
     * @param  {object} args     ワーカーが初期化されるとメイン設定にマージされるオブジェクト
     * @param  {object} execArgv ワーカープロセスに渡される文字列引数のリスト
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * ワーカープロセスが終了した後に実行されます。
     * @param  {string} cid      ケイパビリティ ID（例: 0-0）
     * @param  {number} exitCode 0 - 成功、1 - 失敗
     * @param  {object} specs    ワーカープロセスで実行されるスペック
     * @param  {number} retries  使用された再試行回数
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * webdriver セッションとテストフレームワークを初期化する前に実行されます。
     * ケイパビリティやスペックに応じて設定を操作できます。
     * @param {object} config wdio 設定オブジェクト
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     * @param {Array.<String>} specs 実行されるスペックファイルパスのリスト
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * テスト実行が開始される前に実行されます。この時点で、`browser` などのすべての
     * グローバル変数にアクセスできます。カスタムコマンドを定義するのに最適な場所です。
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     * @param {Array.<String>} specs        実行されるスペックファイルパスのリスト
     * @param {object}         browser      作成されたブラウザ/デバイスセッションのインスタンス
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * スイートが開始される前に実行されます（Mocha/Jasmine のみ）。
     * @param {object} suite スイートの詳細
     */
    beforeSuite: function (suite) {
    },
    /**
     * このフックは、スイート内のすべてのフックが開始される _前_ に実行されます。
     * （例えば、Mocha で `before`、`beforeEach`、`after`、`afterEach` を呼び出す前に実行されます。）Cucumber では `context` は World オブジェクトです。
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * スイート内のすべてのフックが終了した _後_ に実行されるフック。
     * （例えば、Mocha で `before`、`beforeEach`、`after`、`afterEach` を呼び出した後に実行されます。）Cucumber では `context` は World オブジェクトです。
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * テストの前に実行される関数（Mocha/Jasmine のみ）
     * @param {object} test    テストオブジェクト
     * @param {object} context テストが実行されたスコープオブジェクト
     */
    beforeTest: function (test, context) {
    },
    /**
     * WebdriverIO コマンドが実行される前に実行されます。
     * @param {string} commandName フックするコマンド名
     * @param {Array} args コマンドが受け取る引数
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * WebdriverIO コマンドが実行された後に実行されます
     * @param {string} commandName フックするコマンド名
     * @param {Array} args コマンドが受け取る引数
     * @param {*} result コマンドの結果
     * @param {Error} error エラーオブジェクト（存在する場合）
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * テストの後に実行される関数（Mocha/Jasmine のみ）
     * @param {object}  test             テストオブジェクト
     * @param {object}  context          テストが実行されたスコープオブジェクト
     * @param {Error}   result.error     テストが失敗した場合のエラーオブジェクト、それ以外は `undefined`
     * @param {*}       result.result    テスト関数の戻りオブジェクト
     * @param {number}  result.duration  テストの所要時間
     * @param {boolean} result.passed    テストが成功した場合は true、それ以外は false
     * @param {object}  result.retries   スペック関連の再試行に関する情報、例: `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * スイートが終了した後に実行されるフック（Mocha/Jasmine のみ）。
     * @param {object} suite スイートの詳細
     */
    afterSuite: function (suite) {
    },
    /**
     * すべてのテストが完了した後に実行されます。テストのすべてのグローバル変数に
     * 引き続きアクセスできます。
     * @param {number} result 0 - テスト成功、1 - テスト失敗
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     * @param {Array.<String>} specs 実行されたスペックファイルパスのリスト
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * webdriver セッションを終了した直後に実行されます。
     * @param {object} config wdio 設定オブジェクト
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     * @param {Array.<String>} specs 実行されたスペックファイルパスのリスト
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * すべてのワーカーがシャットダウンし、プロセスが終了しようとしているときに実行されます。
     * `onComplete` フックでエラーがスローされると、テスト実行は失敗となります。
     * @param {object} exitCode 0 - 成功、1 - 失敗
     * @param {object} config wdio 設定オブジェクト
     * @param {Array.<Object>} capabilities ケイパビリティ詳細のリスト
     * @param {<Object>} results テスト結果を含むオブジェクト
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * リフレッシュが発生したときに実行されます。
    * @param {string} oldSessionId 古いセッションのセッション ID
    * @param {string} newSessionId 新しいセッションのセッション ID
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber フック
     *
     * Cucumber フィーチャーの前に実行されます。
     * @param {string}                   uri      フィーチャーファイルへのパス
     * @param {GherkinDocument.IFeature} feature  Cucumber フィーチャーオブジェクト
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Cucumber シナリオの前に実行されます。
     * @param {ITestCaseHookParameter} world    pickle とテストステップに関する情報を含む world オブジェクト
     * @param {object}                 context  Cucumber World オブジェクト
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Cucumber ステップの前に実行されます。
     * @param {Pickle.IPickleStep} step     ステップデータ
     * @param {IPickle}            scenario シナリオ pickle
     * @param {object}             context  Cucumber World オブジェクト
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Cucumber ステップの後に実行されます。
     * @param {Pickle.IPickleStep} step             ステップデータ
     * @param {IPickle}            scenario         シナリオ pickle
     * @param {object}             result           シナリオの結果を含む結果オブジェクト
     * @param {boolean}            result.passed    シナリオが成功した場合は true
     * @param {string}             result.error     シナリオが失敗した場合のエラースタック
     * @param {number}             result.duration  シナリオの所要時間（ミリ秒）
     * @param {object}             context          Cucumber World オブジェクト
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Cucumber シナリオの後に実行されます。
     * @param {ITestCaseHookParameter} world            pickle とテストステップに関する情報を含む world オブジェクト
     * @param {object}                 result           シナリオの結果を含む結果オブジェクト `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    シナリオが成功した場合は true
     * @param {string}                 result.error     シナリオが失敗した場合のエラースタック
     * @param {number}                 result.duration  シナリオの所要時間（ミリ秒）
     * @param {object}                 context          Cucumber World オブジェクト
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Cucumber フィーチャーの後に実行されます。
     * @param {string}                   uri      フィーチャーファイルへのパス
     * @param {GherkinDocument.IFeature} feature  Cucumber フィーチャーオブジェクト
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * WebdriverIO アサーションライブラリがアサーションを行う前に実行されます。
     * @param {object} params                 アサーション情報
     * @param {string} params.matcherName     テストが呼び出したマッチャーの名前（エイリアスの場合はエイリアス名）
     * @param {*}      params.expectedValue   マッチャーに渡される値
     * @param {object} params.options         アサーションオプション
     */
    beforeAssertion: function (params) {
    },
    /**
     * WebdriverIO アサーションライブラリがアサーションを行った後に実行されます。
     * @param {object} params                 アサーション情報（`beforeAssertion` と同じ）
     * @param {object} params.result          マッチャーの結果。`pass`（boolean）と `message()` を含みます。
     *                                        値が一致する場合、`.not` 使用時も含めて `pass` は true になります
     */
    afterAssertion: function (params) {
    }
}
```

すべての可能なオプションとバリエーションを含むファイルは、[example フォルダー](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js)でも確認できます。