---
id: configurationfile
title: 配置文件
---

配置文件包含运行测试套件所需的所有必要信息。它是一个导出 JSON 的 NodeJS 模块。

以下是一个包含所有支持属性和附加信息的示例配置：

```js
export const config = {

    // ==================================
    // 测试应该在哪里启动
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // 服务器配置
    // =====================
    // 运行 Selenium 服务器的主机地址。这些信息通常是多余的，因为
    // WebdriverIO 自动连接到 localhost。此外，如果你使用的是其中一个
    // 支持的云服务，如 Sauce Labs、Browserstack、Testing Bot 或 LambdaTest，你也不需要
    // 定义主机和端口信息（因为 WebdriverIO 可以从你的用户和密钥信息中找出这些信息）。
    // 但是，如果你使用的是私有的 Selenium 后端，你应该在这里定义 `hostname`、`port` 和 `path`。
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // 协议: http | https
    // protocol: 'http',
    //
    // =================
    // 服务提供商
    // =================
    // WebdriverIO 支持 Sauce Labs、Browserstack、Testing Bot 和 LambdaTest。（其他云提供商
    // 也应该可以正常工作。）这些服务定义了特定的 `user` 和 `key`（或访问密钥）
    // 值，你必须在这里填写，以便连接到这些服务。
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // 如果你在 Sauce Labs 上运行测试，你可以通过 `region` 属性指定你想要在哪个区域运行测试。
    // 可用的区域短代码是 `us`（默认）和 `eu`。
    // 这些区域用于 Sauce Labs VM 云和 Sauce Labs 真机云。
    // 如果你不提供区域，默认为 `us`。
    region: 'us',
    //
    // Sauce Labs 提供[无头测试](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // 允许你以无头方式运行 Chrome 和 Firefox 测试。
    //
    headless: false,
    //
    // ==================
    // 指定测试文件
    // ==================
    // 定义应该运行哪些测试规范。模式相对于配置文件运行的目录。
    //
    // 规范被定义为一个规范文件数组（可以使用通配符
    // 来展开）。每个规范文件的测试将在单独的
    // 工作进程中运行。为了让一组规范文件在相同的工作
    // 进程中运行，在规范数组中将它们包含在一个数组内。
    //
    // 除非是绝对路径，否则规范文件的路径将相对于配置文件的目录进行解析。
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // 排除的模式。
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // 能力
    // ============
    // 在这里定义你的能力。WebdriverIO 可以同时运行多个能力。
    // 根据能力的数量，WebdriverIO 启动多个测试会话。
    // 在你的 `capabilities` 中，你可以覆盖 `spec` 和 `exclude`
    // 选项，以便将特定的规范分组到特定的能力。
    //
    // 首先，你可以定义同时应该启动多少个实例。假设
    // 你有 3 种不同的能力（Chrome、Firefox 和 Safari），并且
    // 设置 `maxInstances` 为 1。wdio 将生成 3 个进程。
    //
    // 因此，如果你有 10 个规范文件，并设置 `maxInstances` 为 10，所有规范文件
    // 将同时测试，并会生成 30 个进程。
    //
    // 该属性处理同一测试中应该运行测试的能力数量。
    //
    maxInstances: 10,
    //
    // 或设置限制以使用特定能力运行测试。
    maxInstancesPerCapability: 10,
    //
    // 将 WebdriverIO 的全局变量（如 `browser`、`$` 和 `$$`）注入全局环境。
    // 如果设置为 `false`，你应该从 `@wdio/globals` 导入。注意：WebdriverIO 不
    // 处理测试框架特定全局变量的注入。
    //
    injectGlobals: true,
    //
    // 如果你在获取所有重要能力时遇到问题，请查看
    // Sauce Labs 平台配置器 - 配置你的能力的绝佳工具：
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // 要运行无头 Chrome，需要以下标志
        // (参见 https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // 忽略部分或全部默认标志的参数
        // - 如果值为 true：忽略所有 DevTools 的"默认标志"和 Puppeteer 的"默认参数"
        // - 如果值是数组：DevTools 过滤给定的默认参数
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances 可以按每种能力进行覆盖。所以如果你有一个内部 Selenium
        // 网格，只有 5 个 Firefox 实例可用，你可以确保不会同时启动超过
        // 5 个实例。
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // 激活 Firefox 无头模式的标志（有关 moz:firefoxOptions 的更多详情，参见 https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities）
          // args: ['-headless']
        },
        // 如果提供了 outputDir，WebdriverIO 可以捕获驱动程序会话日志
        // 可以配置要排除哪些日志类型。
        excludeDriverLogs: ['bugreport', 'server'], // 传递 '*' 排除所有驱动程序会话日志
        // excludeDriverLogs: ['*'], // 传递 '*' 排除所有驱动程序会话日志
        //
        // 忽略部分或所有 Puppeteer 默认参数的参数
        // ignoreDefaultArgs: ['-foreground'], // 将值设置为 true 以忽略所有默认参数
    }],
    //
    // 启动子进程时使用的额外 node 参数列表
    execArgv: [],
    //
    // ===================
    // 测试配置
    // ===================
    // 在此定义所有与 WebdriverIO 实例相关的选项
    //
    // 日志记录的详细程度: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // 为每个记录器设置特定的日志级别
    // 使用 'silent' 级别禁用记录器
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // 设置存储所有日志的目录
    outputDir: __dirname,
    //
    // 如果你只想运行测试直到特定数量的测试失败，使用
    // bail（默认为 0 - 不中止，运行所有测试）。
    bail: 0,
    //
    // 设置基础 URL 以缩短 `url()` 命令调用。如果你的 `url` 参数以
    // `/` 开头，则会在前面添加 `baseUrl`，不包括 `baseUrl` 的路径部分。
    //
    // 如果你的 `url` 参数不以 scheme 或 `/` 开头（如 `some/path`），则
    // 直接在前面添加 `baseUrl`。
    baseUrl: 'http://localhost:8080',
    //
    // 所有 waitForXXX 命令的默认超时时间。
    waitforTimeout: 1000,
    //
    // 使用 `wdio` 命令和 `--watch` 标志运行时要监视的文件（例如应用程序代码或页面对象）。
    // 支持通配符。
    filesToWatch: [
        // 例如，如果我更改应用程序代码，则重新运行测试
        // './app/**/*.js'
    ],
    //
    // 你想要用来运行规范的框架。
    // 支持以下框架: 'mocha', 'jasmine', 和 'cucumber'
    // 另请参阅: https://webdriver.io/docs/frameworks.html
    //
    // 确保在运行任何测试之前已安装特定框架的 wdio 适配器包。
    framework: 'mocha',
    //
    // 当整个规范文件作为一个整体失败时，重试整个规范文件的次数
    specFileRetries: 1,
    // 规范文件重试尝试之间的延迟秒数
    specFileRetriesDelay: 0,
    // 重试的规范文件是立即重试还是推迟到队列末尾
    specFileRetriesDeferred: false,
    //
    // 标准输出的测试报告器。
    // 默认仅支持 'dot'
    // 另请参阅: https://webdriver.io/docs/dot-reporter.html，并点击左列的"报告器"
    reporters: [
        'dot',
        ['allure', {
            //
            // 如果你使用"allure"报告器，你应该定义目录，
            // WebdriverIO 应该保存所有 allure 报告的位置。
            outputDir: './'
        }]
    ],
    //
    // 传递给 Mocha 的选项。
    // 查看完整列表: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // 传递给 Jasmine 的选项。
    // 另请参阅: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmine 默认超时
        defaultTimeoutInterval: 5000,
        //
        // Jasmine 框架允许它拦截每个断言，以便根据结果记录应用程序
        // 或网站的状态。例如，在每次断言失败时截图非常方便。
        expectationResultHandler: function(passed, assertion) {
            // 做些什么
        },
        //
        // 使用 Jasmine 特定的 grep 功能
        grep: null,
        invertGrep: null
    },
    //
    // 如果你使用 Cucumber，你需要指定步骤定义的位置。
    // 另请参阅: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (文件/目录) 执行功能前需要的文件
        backtrace: false,   // <boolean> 显示错误的完整回溯
        compiler: [],       // <string[]> ("extension:module") 在需要 MODULE 后需要具有给定 EXTENSION 的文件 (可重复)
        dryRun: false,      // <boolean> 调用格式化程序而不执行步骤
        failFast: false,    // <boolean> 第一次失败时中止运行
        snippets: true,     // <boolean> 隐藏待定步骤的步骤定义片段
        source: true,       // <boolean> 隐藏源 URI
        strict: false,      // <boolean> 如果有任何未定义或待定步骤则失败
        tagExpression: '',  // <string> (表达式) 只执行标签匹配表达式的功能或场景
        timeout: 20000,     // <number> 步骤定义的超时时间
        ignoreUndefinedDefinitions: false, // <boolean> 启用此配置将未定义的定义视为警告。
        scenarioLevelReporter: false // 启用此功能使 webdriver.io 行为就像场景而非步骤是测试一样。
    },
    // 指定自定义 tsconfig 路径 - WDIO 使用 `tsx` 编译 TypeScript 文件
    // 系统会自动从当前工作目录检测你的 TSConfig
    // 但你可以在这里指定自定义路径或通过设置 TSX_TSCONFIG_PATH 环境变量
    // 查看 `tsx` 文档: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // 注意: 如果指定了 TSX_TSCONFIG_PATH 环境变量和/或 cli --tsConfigPath 参数，此设置将被覆盖。
    // 如果 node 无法在没有 tsx 帮助的情况下解析 wdio.conf.ts 文件，此设置将被忽略，例如，如果你在 tsconfig.json 中设置了路径
    // 别名并在 wdio.config.ts 文件中使用这些路径别名。
    // 仅在使用 .js 配置文件或 .ts 配置文件是有效的 JavaScript 时使用此选项。
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // 钩子
    // =====
    // WebdriverIO 提供了几个钩子，你可以用它们干预测试过程，以增强
    // 它并围绕它构建服务。你可以应用单个函数或一组
    // 方法。如果其中一个返回 promise，WebdriverIO 将等待直到该 promise 
    // 解决后才继续。
    //
    /**
     * 在所有工作进程启动之前执行一次。
     * @param {object} config wdio 配置对象
     * @param {Array.<Object>} capabilities 能力详细信息列表
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * 在工作进程生成前执行，可用于为该工作进程初始化特定服务
     * 以及以异步方式修改运行时环境。
     * @param  {string} cid      能力 id (例如 0-0)
     * @param  {object} caps     包含将在工作进程中生成的会话能力的对象
     * @param  {object} specs    在工作进程中运行的规范
     * @param  {object} args     一旦工作进程初始化将与主配置合并的对象
     * @param  {object} execArgv 传递给工作进程的字符串参数列表
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * 工作进程退出后执行。
     * @param  {string} cid      能力 id (例如 0-0)
     * @param  {number} exitCode 0 - 成功, 1 - 失败
     * @param  {object} specs    在工作进程中运行的规范
     * @param  {number} retries  使用的重试次数
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * 在初始化 webdriver 会话和测试框架之前执行。它允许你
     * 根据能力或规范操作配置。
     * @param {object} config wdio 配置对象
     * @param {Array.<Object>} capabilities 能力详细信息列表
     * @param {Array.<String>} specs 要运行的规范文件路径列表
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * 在测试执行开始前执行。在这一点上，你可以访问所有全局
     * 变量，如 `browser`。这是定义自定义命令的理想位置。
     * @param {Array.<Object>} capabilities 能力详细信息列表
     * @param {Array.<String>} specs        要运行的规范文件路径列表
     * @param {object}         browser      已创建的浏览器/设备会话实例
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * 在套件启动前执行 (仅适用于 Mocha/Jasmine)。
     * @param {object} suite 套件详情
     */
    beforeSuite: function (suite) {
    },
    /**
     * 此钩子在套件内每个钩子开始_之前_执行。
     * (例如，这在 Mocha 中在调用 `before`、`beforeEach`、`after`、`afterEach` 之前运行)。在 Cucumber 中，`context` 是 World 对象。
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * 在套件内每个钩子结束_之后_执行的钩子。
     * (例如，这在 Mocha 中在调用 `before`、`beforeEach`、`after`、`afterEach` 之后运行)。在 Cucumber 中，`context` 是 World 对象。
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * 在测试前执行的函数 (仅适用于 Mocha/Jasmine)
     * @param {object} test    测试对象
     * @param {object} context 执行测试的作用域对象
     */
    beforeTest: function (test, context) {
    },
    /**
     * 在执行 WebdriverIO 命令前运行。
     * @param {string} commandName 钩子命令名称
     * @param {Array} args 命令将接收的参数
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * 在 WebdriverIO 命令执行后运行
     * @param {string} commandName 钩子命令名称
     * @param {Array} args 命令将接收的参数
     * @param {*} result 命令的结果
     * @param {Error} error 错误对象（如果有）
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * 测试后执行的函数 (仅适用于 Mocha/Jasmine)
     * @param {object}  test             测试对象
     * @param {object}  context          执行测试的作用域对象
     * @param {Error}   result.error     测试失败时的错误对象，否则为 `undefined`
     * @param {*}       result.result    测试函数的返回对象
     * @param {number}  result.duration  测试持续时间
     * @param {boolean} result.passed    如果测试通过则为 true，否则为 false
     * @param {object}  result.retries   有关规范相关重试的信息，例如 `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * 在套件结束后执行的钩子 (仅适用于 Mocha/Jasmine)。
     * @param {object} suite 套件详情
     */
    afterSuite: function (suite) {
    },
    /**
     * 所有测试完成后执行。你仍然可以访问测试中的所有全局变量。
     * @param {number} result 0 - 测试通过, 1 - 测试失败
     * @param {Array.<Object>} capabilities 能力详细信息列表
     * @param {Array.<String>} specs 运行的规范文件路径列表
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * 在终止 webdriver 会话后立即执行。
     * @param {object} config wdio 配置对象
     * @param {Array.<Object>} capabilities 能力详细信息列表
     * @param {Array.<String>} specs 运行的规范文件路径列表
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * 在所有工作进程关闭后且进程即将退出时执行。
     * `onComplete` 钩子中抛出的错误将导致测试运行失败。
     * @param {object} exitCode 0 - 成功, 1 - 失败
     * @param {object} config wdio 配置对象
     * @param {Array.<Object>} capabilities 能力详细信息列表
     * @param {<Object>} results 包含测试结果的对象
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * 在刷新发生时执行。
    * @param {string} oldSessionId 旧会话的会话 ID
    * @param {string} newSessionId 新会话的会话 ID
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber 钩子
     *
     * 在 Cucumber Feature 之前运行。
     * @param {string}                   uri      feature 文件的路径
     * @param {GherkinDocument.IFeature} feature  Cucumber feature 对象
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * 在 Cucumber Scenario 之前运行。
     * @param {ITestCaseHookParameter} world    包含有关 pickle 和测试步骤信息的 world 对象
     * @param {object}                 context  Cucumber World 对象
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * 在 Cucumber Step 之前运行。
     * @param {Pickle.IPickleStep} step     步骤数据
     * @param {IPickle}            scenario 场景 pickle
     * @param {object}             context  Cucumber World 对象
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * 在 Cucumber Step 之后运行。
     * @param {Pickle.IPickleStep} step             步骤数据
     * @param {IPickle}            scenario         场景 pickle
     * @param {object}             result           包含场景结果的结果对象
     * @param {boolean}            result.passed    如果场景通过则为 true
     * @param {string}             result.error     如果场景失败则返回错误堆栈
     * @param {number}             result.duration  场景持续时间（毫秒）
     * @param {object}             context          Cucumber World 对象
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * 在 Cucumber Scenario 之后运行。
     * @param {ITestCaseHookParameter} world            包含有关 pickle 和测试步骤信息的 world 对象
     * @param {object}                 result           包含场景结果的结果对象 `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    如果场景通过则为 true
     * @param {string}                 result.error     如果场景失败则返回错误堆栈
     * @param {number}                 result.duration  场景持续时间（毫秒）
     * @param {object}                 context          Cucumber World 对象
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * 在 Cucumber Feature 之后运行。
     * @param {string}                   uri      feature 文件的路径
     * @param {GherkinDocument.IFeature} feature  Cucumber feature 对象
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * 在 WebdriverIO 断言库进行断言之前运行。
     * @param commandName 命令名称
     * @param args        命令将接收的参数
     */
    beforeAssertion: function (params) {
    },
    /**
     * 在 WebdriverIO 命令执行后运行
     * @param commandName  命令名称
     * @param args         命令将接收的参数
     * @param result       命令的结果
     * @param error        如果出现问题的错误
     */
    afterAssertion: function (params) {
    }
}
```

你还可以在[示例文件夹](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js)中找到包含所有可能选项和变体的文件。