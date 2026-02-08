---
id: configurationfile
title: 配置文件
---

配置文件包含运行测试套件所需的所有信息。它是一个导出JSON的NodeJS模块。

以下是包含所有支持属性和附加信息的示例配置：

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
    // 运行Selenium服务器的主机地址。这些信息通常是多余的，因为
    // WebdriverIO会自动连接到localhost。另外，如果你使用的是
    // 支持的云服务之一，如Sauce Labs、Browserstack、Testing Bot或TestMu AI（原LambdaTest），你也不
    // 需要定义主机和端口信息（因为WebdriverIO可以从
    // 你的用户和密钥信息中推断出来）。然而，如果你使用的是私有的Selenium
    // 后端，你应该在这里定义`hostname`、`port`和`path`。
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // 服务提供商
    // =================
    // WebdriverIO支持Sauce Labs、Browserstack、Testing Bot和TestMu AI（原LambdaTest）。（其他云提供商
    // 也应该可以工作。）这些服务定义了特定的`user`和`key`（或访问密钥）
    // 你必须在这里填写，以便连接到这些服务。
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // 如果你在Sauce Labs上运行测试，你可以通过`region`属性指定要在哪个区域运行测试
    // 可用的区域简写是`us`（默认）和`eu`。
    // 这些区域用于Sauce Labs VM云和Sauce Labs真实设备云。
    // 如果你不提供区域，它默认为`us`。
    region: 'us',
    //
    // Sauce Labs提供[headless服务](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // 允许你运行Chrome和Firefox的headless测试。
    //
    headless: false,
    //
    // ==================
    // 指定测试文件
    // ==================
    // 定义应该运行哪些测试规范。模式相对于
    // 正在运行的配置文件的目录。
    //
    // 规范被定义为规范文件的数组（可以使用通配符
    // 进行扩展）。每个规范文件的测试将在一个单独的
    // 工作进程中运行。为了让一组规范文件在同一个工作
    // 进程中运行，将它们包含在规范数组内的一个数组中。
    //
    // 规范文件的路径将相对于配置文件的目录解析
    // 除非它是绝对路径。
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // 要排除的模式。
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // 能力
    // ============
    // 在这里定义你的能力。WebdriverIO可以同时运行多个能力。
    // 根据能力的数量，WebdriverIO启动多个测试
    // 会话。在`capabilities`内，你可以覆盖`spec`和`exclude`
    // 选项，以便将特定的规范分组到特定的能力。
    //
    // 首先，你可以定义应该同时启动多少个实例。假设
    // 你有3个不同的能力（Chrome，Firefox和Safari），并且
    // 设置`maxInstances`为1。wdio将生成3个进程。
    //
    // 因此，如果你有10个规范文件，并且将`maxInstances`设置为10，所有规范文件
    // 将同时测试，并且将生成30个进程。
    //
    // 该属性处理来自同一测试的多少个能力应该运行测试。
    //
    maxInstances: 10,
    //
    // 或者设置限制以使用特定能力运行测试。
    maxInstancesPerCapability: 10,
    //
    // 将WebdriverIO的全局变量（例如`browser`、`$`和`$$`）插入到全局环境中。
    // 如果设置为`false`，你应该从`@wdio/globals`导入。注意：WebdriverIO不
    // 处理测试框架特定全局变量的注入。
    //
    injectGlobals: true,
    //
    // 如果你在获取所有重要能力方面有困难，请查看
    // Sauce Labs平台配置器 - 一个配置能力的好工具：
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // 运行chrome headless需要以下标志
        // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // 忽略某些或所有默认标志的参数
        // - 如果值为true：忽略所有DevTools"默认标志"和Puppeteer"默认参数"
        // - 如果值是数组：DevTools过滤给定的默认参数
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances可以每个能力被覆盖。所以如果你有一个内部的Selenium
        // 网格，只有5个Firefox实例可用，你可以确保不超过
        // 5个实例同时启动。
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // 激活Firefox headless模式的标志（有关moz:firefoxOptions的更多详细信息，请参见https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities）
          // args: ['-headless']
        },
        // 如果提供了outputDir，WebdriverIO可以捕获驱动程序会话日志
        // 可以配置要排除哪些logTypes。
        // excludeDriverLogs: ['*'], // 传递'*'排除所有驱动程序会话日志
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // 忽略一些或所有Puppeteer默认参数的参数
        // ignoreDefaultArgs: ['-foreground'], // 设置值为true以忽略所有默认参数
    }],
    //
    // 启动子进程时使用的附加节点参数列表
    execArgv: [],
    //
    // ===================
    // 测试配置
    // ===================
    // 在这里定义与WebdriverIO实例相关的所有选项
    //
    // 日志级别详细程度：trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // 为每个记录器设置特定的日志级别
    // 使用'silent'级别禁用记录器
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // 设置存储所有日志的目录
    outputDir: __dirname,
    //
    // 如果你只想运行测试直到特定数量的测试失败，使用
    // bail（默认为0 - 不中止，运行所有测试）。
    bail: 0,
    //
    // 设置基本URL以缩短`url()`命令调用。如果你的`url`参数以
    // `/`开头，则会在前面加上`baseUrl`，但不包括`baseUrl`的路径部分。
    //
    // 如果你的`url`参数没有方案或`/`开头（如`some/path`），`baseUrl`
    // 会直接加在前面。
    baseUrl: 'http://localhost:8080',
    //
    // 所有waitForXXX命令的默认超时。
    waitforTimeout: 1000,
    //
    // 使用`wdio`命令和`--watch`标志运行时要监视的文件（例如应用程序代码或页面对象）。
    // 支持通配符。
    filesToWatch: [
        // 例如，如果我更改应用程序代码，重新运行测试
        // './app/**/*.js'
    ],
    //
    // 你想用来运行规范的框架。
    // 支持以下框架：'mocha'、'jasmine'和'cucumber'
    // 参见：https://webdriver.io/docs/frameworks.html
    //
    // 在运行任何测试之前，确保安装了特定框架的wdio适配器包。
    framework: 'mocha',
    //
    // 当整个规范文件作为一个整体失败时重试的次数
    specFileRetries: 1,
    // 规范文件重试尝试之间的延迟（秒）
    specFileRetriesDelay: 0,
    // 是否应立即重试失败的规范文件，或推迟到队列末尾
    specFileRetriesDeferred: false,
    //
    // 用于stdout的测试报告器。
    // 默认支持的唯一一个是'dot'
    // 参见：https://webdriver.io/docs/dot-reporter.html，并在左列点击"Reporters"
    reporters: [
        'dot',
        ['allure', {
            //
            // 如果你使用"allure"报告器，你应该定义WebdriverIO应保存所有allure报告的目录。
            outputDir: './'
        }]
    ],
    //
    // 传递给Mocha的选项。
    // 完整列表见：http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // 传递给Jasmine的选项。
    // 参见：https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmine默认超时
        defaultTimeoutInterval: 5000,
        //
        // Jasmine框架允许它拦截每个断言，以便记录应用程序
        // 或网站的状态，取决于结果。例如，每次断言失败时
        // 截图非常方便。
        expectationResultHandler: function(passed, assertion) {
            // 做些什么
        },
        //
        // 使用Jasmine特定的grep功能
        grep: null,
        invertGrep: null
    },
    //
    // 如果你使用Cucumber，你需要指定步骤定义的位置。
    // 参见：https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]>（文件/目录）在执行功能之前需要文件
        backtrace: false,   // <boolean>显示错误的完整回溯
        compiler: [],       // <string[]>（"extension:module"）在需要MODULE之后需要带有给定EXTENSION的文件（可重复）
        dryRun: false,      // <boolean>不执行步骤就调用格式化程序
        failFast: false,    // <boolean>在第一次失败时中止运行
        snippets: true,     // <boolean>隐藏待处理步骤的步骤定义片段
        source: true,       // <boolean>隐藏源URI
        strict: false,      // <boolean>如果有任何未定义或待处理的步骤，则失败
        tagExpression: '',  // <string>（表达式）只执行标签与表达式匹配的功能或场景
        timeout: 20000,     // <number>步骤定义的超时
        ignoreUndefinedDefinitions: false, // <boolean>启用此配置将未定义的定义视为警告。
        scenarioLevelReporter: false // 启用此选项使webdriver.io表现得好像场景而不是步骤是测试。
    },
    // 指定自定义tsconfig路径 - WDIO使用`tsx`编译TypeScript文件
    // 你的TSConfig会从当前工作目录自动检测
    // 但你可以在这里指定自定义路径或通过设置TSX_TSCONFIG_PATH环境变量
    // 参见`tsx`文档：https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // 注意：此设置将被TSX_TSCONFIG_PATH环境变量和/或命令行参数--tsConfigPath覆盖，如果它们被指定。
    // 如果node无需tsx的帮助就无法解析你的wdio.conf.ts文件，则此设置将被忽略，例如，如果你在tsconfig.json中设置了路径别名，
    // 并且你在wdio.config.ts文件中使用这些路径别名。
    // 只有在使用.js配置文件或.ts配置文件是有效的JavaScript时才使用这个。
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // 钩子
    // =====
    // WebdriverIO提供了几个钩子，你可以用来干预测试过程，以增强
    // 它并围绕它构建服务。你可以应用单个函数或一系列
    // 方法。如果其中一个返回promise，WebdriverIO将等待该promise
    // 解决后再继续。
    //
    /**
     * 在所有工作进程启动前执行一次。
     * @param {object} config wdio配置对象
     * @param {Array.<Object>} capabilities 能力详情列表
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * 在工作进程生成前执行，可用于初始化该工作进程的特定服务
     * 以及以异步方式修改运行时环境。
     * @param  {string} cid      能力id（例如0-0）
     * @param  {object} caps     包含将在工作进程中生成的会话能力的对象
     * @param  {object} specs    在工作进程中运行的规范
     * @param  {object} args     一旦工作进程初始化，将与主配置合并的对象
     * @param  {object} execArgv 传递给工作进程的字符串参数列表
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * 在工作进程退出后执行。
     * @param  {string} cid      能力id（例如0-0）
     * @param  {number} exitCode 0 - 成功，1 - 失败
     * @param  {object} specs    在工作进程中运行的规范
     * @param  {number} retries  使用的重试次数
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * 在初始化webdriver会话和测试框架之前执行。它允许你
     * 根据能力或规范操作配置。
     * @param {object} config wdio配置对象
     * @param {Array.<Object>} capabilities 能力详情列表
     * @param {Array.<String>} specs 要运行的规范文件路径列表
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * 在测试执行开始前执行。此时你可以访问所有全局
     * 变量，如`browser`。这是定义自定义命令的完美位置。
     * @param {Array.<Object>} capabilities 能力详情列表
     * @param {Array.<String>} specs        要运行的规范文件路径列表
     * @param {object}         browser      创建的浏览器/设备会话实例
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * 在套件开始前执行（仅在Mocha/Jasmine中）。
     * @param {object} suite 套件详情
     */
    beforeSuite: function (suite) {
    },
    /**
     * 这个钩子在套件内的每个钩子开始_前_执行。
     *（例如，在Mocha中，这在调用`before`，`beforeEach`，`after`，`afterEach`之前运行。）在Cucumber中，`context`是World对象。
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * 在套件内的每个钩子结束_后_执行的钩子。
     *（例如，在Mocha中，这在调用`before`，`beforeEach`，`after`，`afterEach`之后运行。）在Cucumber中，`context`是World对象。
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * 在测试之前执行的函数（仅在Mocha/Jasmine中）
     * @param {object} test    测试对象
     * @param {object} context 测试执行的作用域对象
     */
    beforeTest: function (test, context) {
    },
    /**
     * 在执行WebdriverIO命令之前运行。
     * @param {string} commandName 钩子命令名称
     * @param {Array} args 命令将接收的参数
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * 在WebdriverIO命令执行后运行
     * @param {string} commandName 钩子命令名称
     * @param {Array} args 命令将接收的参数
     * @param {*} result 命令的结果
     * @param {Error} error 错误对象，如果有的话
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * 在测试后执行的函数（仅在Mocha/Jasmine中）
     * @param {object}  test             测试对象
     * @param {object}  context          测试执行的作用域对象
     * @param {Error}   result.error     测试失败时的错误对象，否则为`undefined`
     * @param {*}       result.result    测试函数的返回对象
     * @param {number}  result.duration  测试持续时间
     * @param {boolean} result.passed    如果测试通过为true，否则为false
     * @param {object}  result.retries   关于规范相关重试的信息，例如`{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * 在套件结束后执行的钩子（仅在Mocha/Jasmine中）。
     * @param {object} suite 套件详情
     */
    afterSuite: function (suite) {
    },
    /**
     * 在所有测试完成后执行。你仍然可以访问测试中的所有全局变量。
     * @param {number} result 0 - 测试通过，1 - 测试失败
     * @param {Array.<Object>} capabilities 能力详情列表
     * @param {Array.<String>} specs 运行的规范文件路径列表
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * 在终止webdriver会话后立即执行。
     * @param {object} config wdio配置对象
     * @param {Array.<Object>} capabilities 能力详情列表
     * @param {Array.<String>} specs 运行的规范文件路径列表
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * 在所有工作进程关闭且进程即将退出后执行。
     * 在`onComplete`钩子中抛出的错误将导致测试运行失败。
     * @param {object} exitCode 0 - 成功，1 - 失败
     * @param {object} config wdio配置对象
     * @param {Array.<Object>} capabilities 能力详情列表
     * @param {<Object>} results 包含测试结果的对象
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * 在刷新发生时执行。
    * @param {string} oldSessionId 旧会话的会话ID
    * @param {string} newSessionId 新会话的会话ID
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber钩子
     *
     * 在Cucumber功能之前运行。
     * @param {string}                   uri      功能文件路径
     * @param {GherkinDocument.IFeature} feature  Cucumber功能对象
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * 在Cucumber场景之前运行。
     * @param {ITestCaseHookParameter} world    包含pickle和测试步骤信息的world对象
     * @param {object}                 context  Cucumber World对象
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * 在Cucumber步骤之前运行。
     * @param {Pickle.IPickleStep} step     步骤数据
     * @param {IPickle}            scenario 场景pickle
     * @param {object}             context  Cucumber World对象
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * 在Cucumber步骤之后运行。
     * @param {Pickle.IPickleStep} step             步骤数据
     * @param {IPickle}            scenario         场景pickle
     * @param {object}             result           包含场景结果的结果对象
     * @param {boolean}            result.passed    如果场景通过为true
     * @param {string}             result.error     如果场景失败，则为错误堆栈
     * @param {number}             result.duration  场景持续时间（毫秒）
     * @param {object}             context          Cucumber World对象
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * 在Cucumber场景之后运行。
     * @param {ITestCaseHookParameter} world            包含pickle和测试步骤信息的world对象
     * @param {object}                 result           包含场景结果的结果对象`{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    如果场景通过为true
     * @param {string}                 result.error     如果场景失败，则为错误堆栈
     * @param {number}                 result.duration  场景持续时间（毫秒）
     * @param {object}                 context          Cucumber World对象
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * 在Cucumber功能之后运行。
     * @param {string}                   uri      功能文件路径
     * @param {GherkinDocument.IFeature} feature  Cucumber功能对象
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * 在WebdriverIO断言库进行断言之前运行。
     * @param commandName 命令名称
     * @param args        命令将接收的参数
     */
    beforeAssertion: function (params) {
    },
    /**
     * 在WebdriverIO命令执行后运行
     * @param commandName  命令名称
     * @param args         命令将接收的参数
     * @param result       命令的结果
     * @param error        如果出错，则为错误
     */
    afterAssertion: function (params) {
    }
}
```

你也可以在[示例文件夹](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js)中找到包含所有可能选项和变体的文件。