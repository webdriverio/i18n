---
id: configuration
title: 配置
---

根据[安装类型](/docs/setuptypes)（例如使用原始协议绑定、WebdriverIO作为独立包或WDIO测试运行器），有不同的选项可用来控制环境。

## WebDriver 选项

使用[`webdriver`](https://www.npmjs.com/package/webdriver)协议包时，定义了以下选项：

### protocol

与驱动程序服务器通信时使用的协议。

类型：`String`<br />
默认值：`http`

### hostname

驱动程序服务器的主机。

类型：`String`<br />
默认值：`0.0.0.0`

### port

驱动程序服务器的端口。

类型：`Number`<br />
默认值：`undefined`

### path

驱动程序服务器端点的路径。

类型：`String`<br />
默认值：`/`

### queryParams

传播到驱动程序服务器的查询参数。

类型：`Object`<br />
默认值：`undefined`

### user

您的云服务用户名（仅适用于[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)或[LambdaTest](https://www.lambdatest.com)账户）。如果设置，WebdriverIO将自动为您设置连接选项。如果您不使用云提供商，这可以用于验证任何其他WebDriver后端。

类型：`String`<br />
默认值：`undefined`

### key

您的云服务访问密钥或密钥（仅适用于[Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com)或[LambdaTest](https://www.lambdatest.com)账户）。如果设置，WebdriverIO将自动为您设置连接选项。如果您不使用云提供商，这可以用于验证任何其他WebDriver后端。

类型：`String`<br />
默认值：`undefined`

### capabilities

定义您想在WebDriver会话中运行的功能。查看[WebDriver协议](https://w3c.github.io/webdriver/#capabilities)了解更多详情。如果您运行不支持WebDriver协议的旧驱动程序，则需要使用[JSONWireProtocol功能](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities)来成功运行会话。

除了基于WebDriver的功能外，您还可以应用浏览器和供应商特定的选项，这些选项允许对远程浏览器或设备进行更深入的配置。这些在相应的供应商文档中有记录，例如：

- `goog:chromeOptions`：适用于[Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`：适用于[Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`：适用于[Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`：适用于[Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`：适用于[BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`：适用于[Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

此外，Sauce Labs的[自动测试配置器](https://docs.saucelabs.com/basics/platform-configurator/)是一个有用的工具，它可以通过点击组合所需的功能来帮助您创建此对象。

类型：`Object`<br />
默认值：`null`

**示例：**

```js
{
    browserName: 'chrome', // 选项：`chrome`、`edge`、`firefox`、`safari`
    browserVersion: '27.0', // 浏览器版本
    platformName: 'Windows 10' // 操作系统平台
}
```

如果您在移动设备上运行Web或原生测试，`capabilities`与WebDriver协议不同。有关更多详情，请参阅[Appium文档](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)。

### logLevel

日志记录的详细程度。

类型：`String`<br />
默认值：`info`<br />
选项：`trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

存储所有测试运行器日志文件（包括报告器日志和`wdio`日志）的目录。如果未设置，所有日志都将流向`stdout`。由于大多数报告器都是向`stdout`输出日志，因此建议仅对特定报告器使用此选项，在这些情况下，将报告推送到文件更有意义（例如`junit`报告器）。

在独立模式下运行时，WebdriverIO生成的唯一日志将是`wdio`日志。

类型：`String`<br />
默认值：`null`

### connectionRetryTimeout

向驱动程序或网格发出任何WebDriver请求的超时时间。

类型：`Number`<br />
默认值：`120000`

### connectionRetryCount

向Selenium服务器请求重试的最大次数。

类型：`Number`<br />
默认值：`3`

### agent

允许您使用自定义的`http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent)发出请求。

类型：`Object`<br />
默认值：

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

指定要传递到每个WebDriver请求中的自定义`headers`。如果您的Selenium网格需要基本认证，我们建议通过此选项传递`Authorization`头来验证您的WebDriver请求，例如：

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// 从环境变量读取用户名和密码
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// 用冒号分隔符组合用户名和密码
const credentials = `${username}:${password}`;
// 使用Base64编码凭据
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

类型：`Object`<br />
默认值：`{}`

### transformRequest

在发出WebDriver请求之前拦截[HTTP请求选项](https://github.com/sindresorhus/got#options)的函数

类型：`(RequestOptions) => RequestOptions`<br />
默认值：*无*

### transformResponse

WebDriver响应到达后拦截HTTP响应对象的函数。该函数将原始响应对象作为第一个参数，将相应的`RequestOptions`作为第二个参数。

类型：`(Response, RequestOptions) => Response`<br />
默认值：*无*

### strictSSL

是否不要求SSL证书有效。
可以通过环境变量`STRICT_SSL`或`strict_ssl`设置。

类型：`Boolean`<br />
默认值：`true`

### enableDirectConnect

是否启用[Appium直接连接功能](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments)。
如果响应在启用标志的情况下没有适当的键，则不执行任何操作。

类型：`Boolean`<br />
默认值：`true`

### cacheDir

缓存目录的根路径。此目录用于存储在尝试启动会话时下载的所有驱动程序。

类型：`String`<br />
默认值：`process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

以下选项（包括上面列出的选项）可以与独立模式的WebdriverIO一起使用：

### automationProtocol

定义您想要用于浏览器自动化的协议。目前只支持[`webdriver`](https://www.npmjs.com/package/webdriver)，因为它是WebdriverIO使用的主要浏览器自动化技术。

如果您想使用不同的自动化技术来自动化浏览器，确保将此属性设置为解析到符合以下接口的模块的路径：

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * 启动自动化会话并返回一个具有相应自动化命令的WebdriverIO [单体](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * 请参考[webdriver](https://www.npmjs.com/package/webdriver)包作为参考实现
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO选项
     * @param {Function} hook 允许在客户端从函数释放之前修改客户端
     * @param {PropertyDescriptorMap} userPrototype 允许用户添加自定义协议命令
     * @param {Function} customCommandWrapper 允许修改命令执行
     * @returns 与WebdriverIO兼容的客户端实例
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * 允许用户附加到现有会话
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * 直接将新会话的实例会话ID和浏览器功能
     * 更改到传入的浏览器对象中
     *
     * @optional
     * @param   {object} instance  我们从新浏览器会话获取的对象。
     * @returns {string}           浏览器的新会话ID
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

类型：`String`<br />
默认值：`webdriver`

### baseUrl

通过设置基本URL来缩短`url`命令调用。
- 如果您的`url`参数以`/`开头，则会在前面加上`baseUrl`（除了`baseUrl`路径，如果有的话）。
- 如果您的`url`参数开头没有方案或`/`（如`some/path`），则会直接在前面加上完整的`baseUrl`。

类型：`String`<br />
默认值：`null`

### waitforTimeout

所有`waitFor*`命令的默认超时时间。（注意选项名称中的小写`f`。）此超时__仅__影响以`waitFor*`开头的命令及其默认等待时间。

要增加_测试_的超时时间，请参阅框架文档。

类型：`Number`<br />
默认值：`5000`

### waitforInterval

所有`waitFor*`命令检查预期状态（例如可见性）是否已更改的默认间隔。

类型：`Number`<br />
默认值：`100`

### region

如果在Sauce Labs上运行，您可以选择在不同的数据中心之间运行测试：美国或欧盟。
要将区域更改为欧盟，请在配置中添加`region: 'eu'`。

__注意：__这仅在您提供与Sauce Labs账户关联的`user`和`key`选项时才有效。

类型：`String`<br />
默认值：`us`

*（仅适用于vm和/或em/模拟器）*

---

## 测试运行器选项

以下选项（包括上面列出的选项）仅为使用WDIO测试运行器运行WebdriverIO而定义：

### specs

定义测试执行的规格。您可以指定一个glob模式来一次匹配多个文件，或者将glob或一组路径包装到数组中，以在单个工作进程中运行它们。所有路径都被视为相对于配置文件路径。

类型：`(String | String[])[]`<br />
默认值：`[]`

### exclude

从测试执行中排除规格。所有路径都被视为相对于配置文件路径。

类型：`String[]`<br />
默认值：`[]`

### suites

描述各种套件的对象，您可以在`wdio` CLI上使用`--suite`选项来指定。

类型：`Object`<br />
默认值：`{}`

### capabilities

与上面描述的`capabilities`部分相同，只是有选项可以指定[`multiremote`](/docs/multiremote)对象，或在数组中指定多个WebDriver会话以进行并行执行。

您可以应用上面定义的相同供应商和浏览器特定功能[上面](/docs/configuration#capabilities)。

类型：`Object`|`Object[]`<br />
默认值：`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

最大并行运行的工作线程总数。

__注意：__当测试在一些外部供应商（如Sauce Labs）的机器上执行时，这个数字可能高达`100`。在那里，测试不是在单台机器上测试，而是在多个虚拟机上。如果测试要在本地开发机器上运行，请使用更合理的数字，如`3`、`4`或`5`。本质上，这是将同时启动并同时运行测试的浏览器数量，因此取决于机器上有多少RAM以及机器上运行了多少其他应用程序。

您也可以使用`wdio:maxInstances`功能在您的功能对象中应用`maxInstances`。这将限制该特定功能的并行会话数量。

类型：`Number`<br />
默认值：`100`

### maxInstancesPerCapability

每个功能的最大并行运行工作线程数。

类型：`Number`<br />
默认值：`100`

### injectGlobals

将WebdriverIO的全局变量（例如`browser`、`$`和`$$`）插入到全局环境中。
如果设置为`false`，您应该从`@wdio/globals`导入，例如：

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

注意：WebdriverIO不处理测试框架特定全局变量的注入。

类型：`Boolean`<br />
默认值：`true`

### bail

如果您希望测试运行在特定数量的测试失败后停止，请使用`bail`。
（默认为`0`，无论如何都会运行所有测试。）**注意：**在这种情况下，测试是指单个规格文件（使用Mocha或Jasmine时）中的所有测试或特性文件（使用Cucumber时）中的所有步骤。如果您想控制单个测试文件中测试的保释行为，请查看可用的[框架](frameworks)选项。

类型：`Number`<br />
默认值：`0`（不保释；运行所有测试）

### specFileRetries

当整个规格文件作为一个整体失败时重试的次数。

类型：`Number`<br />
默认值：`0`

### specFileRetriesDelay

规格文件重试尝试之间的延迟秒数

类型：`Number`<br />
默认值：`0`

### specFileRetriesDeferred

是否应立即重试已重试的规格文件，或推迟到队列末尾。

类型：`Boolean`<br />
默认值：`true`

### groupLogsByTestSpec

选择日志输出视图。

如果设置为`false`，来自不同测试文件的日志将实时打印。请注意，当并行运行时，这可能导致来自不同文件的日志输出混合。

如果设置为`true`，日志输出将按测试规格分组，并仅在测试规格完成时打印。

默认情况下，它设置为`false`，因此日志会实时打印。

类型：`Boolean`<br />
默认值：`false`

### services

服务接管您不想处理的特定工作。它们几乎不需要任何努力就能增强您的测试设置。

类型：`String[]|Object[]`<br />
默认值：`[]`

### framework

定义WDIO测试运行器使用的测试框架。

类型：`String`<br />
默认值：`mocha`<br />
选项：`mocha` | `jasmine`

### mochaOpts, jasmineOpts 和 cucumberOpts

特定框架相关的选项。请参阅框架适配器文档了解可用的选项。在[框架](frameworks)中阅读更多相关信息。

类型：`Object`<br />
默认值：`{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

带有行号的黄瓜特性列表（当[使用cucumber框架](./Frameworks.md#using-cucumber)时）。

类型：`String[]`
默认值：`[]`

### reporters

要使用的报告器列表。报告器可以是字符串，也可以是
`['reporterName', { /* reporter options */}]`数组，其中第一个元素是带有报告器名称的字符串，第二个元素是带有报告器选项的对象。

类型：`String[]|Object[]`<br />
默认值：`[]`

示例：

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

确定报告器应在何时间间隔检查它们是否同步（如果它们异步报告其日志，例如，如果日志流式传输到第三方供应商）。

类型：`Number`<br />
默认值：`100`（毫秒）

### reporterSyncTimeout

确定报告器完成上传所有日志的最长时间，直到测试运行器抛出错误。

类型：`Number`<br />
默认值：`5000`（毫秒）

### execArgv

启动子进程时指定的Node参数。

类型：`String[]`<br />
默认值：`null`

### filesToWatch

一个支持glob模式的字符串列表，告诉测试运行器在使用`--watch`标志运行时另外监视其他文件，例如应用程序文件。默认情况下，测试运行器已经监视所有规格文件。

类型：`String[]`<br />
默认值：`[]`

### updateSnapshots

如果您想更新快照，请设置为true。理想情况下作为CLI参数的一部分使用，例如`wdio run wdio.conf.js --s`。

类型：`'new' | 'all' | 'none'`<br />
默认值：如果未提供且测试在CI中运行，则为`none`；如果未提供，则为`new`；否则为提供的值

### resolveSnapshotPath

覆盖默认快照路径。例如，将快照存储在测试文件旁边。

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

类型：`(testPath: string, snapExtension: string) => string`<br />
默认值：在测试文件旁边的`__snapshots__`目录中存储快照文件

### tsConfigPath

WDIO使用`tsx`来编译TypeScript文件。您的TSConfig会自动从当前工作目录中检测到，但您可以在此处指定自定义路径，也可以通过设置TSX_TSCONFIG_PATH环境变量来指定。

请参阅`tsx`文档：https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

类型：`String`<br />
默认值：`null`<br />

## 钩子

WDIO测试运行器允许您设置钩子，以便在测试生命周期的特定时间触发。这允许自定义操作（例如，如果测试失败，则截取屏幕截图）。

每个钩子都有关于生命周期的特定信息作为参数（例如，关于测试套件或测试的信息）。在[我们的示例配置](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326)中阅读有关所有钩子属性的更多信息。

**注意：**一些钩子（`onPrepare`、`onWorkerStart`、`onWorkerEnd`和`onComplete`）在不同的进程中执行，因此不能与工作进程中的其他钩子共享任何全局数据。

### onPrepare

在所有工作线程启动之前执行一次。

参数：

- `config`（`object`）：WebdriverIO配置对象
- `param`（`object[]`）：功能详情列表

### onWorkerStart

在工作进程生成之前执行，可用于初始化该工作线程的特定服务以及以异步方式修改运行时环境。

参数：

- `cid`（`string`）：功能ID（例如0-0）
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：要在工作进程中运行的规格
- `args`（`object`）：一旦工作线程初始化，将与主配置合并的对象
- `execArgv`（`string[]`）：传递给工作进程的字符串参数列表

### onWorkerEnd

在工作进程退出后立即执行。

参数：

- `cid`（`string`）：功能ID（例如0-0）
- `exitCode`（`number`）：0 - 成功，1 - 失败
- `specs`（`string[]`）：要在工作进程中运行的规格
- `retries`（`number`）：使用的规格级重试次数，如[_"按规格文件基础添加重试"_](./Retry.md#add-retries-on-a-per-specfile-basis)中定义

### beforeSession

在初始化webdriver会话和测试框架之前执行。它允许您根据功能或规格操作配置。

参数：

- `config`（`object`）：WebdriverIO配置对象
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：要在工作进程中运行的规格

### before

在测试执行开始之前执行。此时，您可以访问所有全局变量，如`browser`。这是定义自定义命令的完美地点。

参数：

- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：要在工作进程中运行的规格
- `browser`（`object`）：创建的浏览器/设备会话实例

### beforeSuite

在套件开始之前执行的钩子（仅在Mocha/Jasmine中）

参数：

- `suite`（`object`）：套件详情

### beforeHook

在套件内的钩子开始*之前*执行的钩子（例如，在Mocha中调用beforeEach之前运行）

参数：

- `test`（`object`）：测试详情
- `context`（`object`）：测试上下文（在Cucumber中表示World对象）

### afterHook

在套件内的钩子结束*之后*执行的钩子（例如，在Mocha中调用afterEach之后运行）

参数：

- `test`（`object`）：测试详情
- `context`（`object`）：测试上下文（在Cucumber中表示World对象）
- `result`（`object`）：钩子结果（包含`error`、`result`、`duration`、`passed`、`retries`属性）

### beforeTest

在测试之前执行的函数（仅在Mocha/Jasmine中）。

参数：

- `test`（`object`）：测试详情
- `context`（`object`）：测试执行的作用域对象

### beforeCommand

在执行WebdriverIO命令之前运行。

参数：

- `commandName`（`string`）：命令名称
- `args`（`*`）：命令将接收的参数

### afterCommand

在执行WebdriverIO命令之后运行。

参数：

- `commandName`（`string`）：命令名称
- `args`（`*`）：命令将接收的参数
- `result`（`number`）：0 - 命令成功，1 - 命令错误
- `error`（`Error`）：如果有错误，则为错误对象

### afterTest

在测试（在Mocha/Jasmine中）结束后要执行的函数。

参数：

- `test`（`object`）：测试详情
- `context`（`object`）：测试执行的作用域对象
- `result.error`（`Error`）：如果测试失败，则为错误对象，否则为`undefined`
- `result.result`（`Any`）：测试函数的返回对象
- `result.duration`（`Number`）：测试持续时间
- `result.passed`（`Boolean`）：如果测试通过则为true，否则为false
- `result.retries`（`Object`）：关于单个测试相关重试的信息，如为[Mocha和Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha)以及[Cucumber](./Retry.md#rerunning-in-cucumber)定义的那样，例如`{ attempts: 0, limit: 0 }`，参见
- `result`（`object`）：钩子结果（包含`error`、`result`、`duration`、`passed`、`retries`属性）

### afterSuite

在套件结束后执行的钩子（仅在Mocha/Jasmine中）

参数：

- `suite`（`object`）：套件详情

### after

在所有测试完成后执行。您仍然可以访问测试中的所有全局变量。

参数：

- `result`（`number`）：0 - 测试通过，1 - 测试失败
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：要在工作进程中运行的规格

### afterSession

在终止webdriver会话后立即执行。

参数：

- `config`（`object`）：WebdriverIO配置对象
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：要在工作进程中运行的规格

### onComplete

在所有工作线程关闭且进程即将退出后执行。在onComplete钩子中抛出的错误将导致测试运行失败。

参数：

- `exitCode`（`number`）：0 - 成功，1 - 失败
- `config`（`object`）：WebdriverIO配置对象
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `result`（`object`）：包含测试结果的结果对象

### onReload

在发生刷新时执行。

参数：

- `oldSessionId`（`string`）：旧会话的会话ID
- `newSessionId`（`string`）：新会话的会话ID

### beforeFeature

在Cucumber特性之前运行。

参数：

- `uri`（`string`）：特性文件的路径
- `feature`（[`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)）：Cucumber特性对象

### afterFeature

在Cucumber特性之后运行。

参数：

- `uri`（`string`）：特性文件的路径
- `feature`（[`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)）：Cucumber特性对象

### beforeScenario

在Cucumber场景之前运行。

参数：

- `world`（[`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)）：包含关于pickle和测试步骤信息的world对象
- `context`（`object`）：Cucumber World对象

### afterScenario

在Cucumber场景之后运行。

参数：

- `world`（[`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)）：包含关于pickle和测试步骤信息的world对象
- `result`（`object`）：包含场景结果的结果对象
- `result.passed`（`boolean`）：如果场景通过则为true
- `result.error`（`string`）：如果场景失败，则为错误堆栈
- `result.duration`（`number`）：场景持续时间（毫秒）
- `context`（`object`）：Cucumber World对象

### beforeStep

在Cucumber步骤之前运行。

参数：

- `step`（[`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)）：Cucumber步骤对象
- `scenario`（[`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)）：Cucumber场景对象
- `context`（`object`）：Cucumber World对象

### afterStep

在Cucumber步骤之后运行。

参数：

- `step`（[`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)）：Cucumber步骤对象
- `scenario`（[`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)）：Cucumber场景对象
- `result`：（`object`）：包含步骤结果的结果对象
- `result.passed`（`boolean`）：如果场景通过则为true
- `result.error`（`string`）：如果场景失败，则为错误堆栈
- `result.duration`（`number`）：场景持续时间（毫秒）
- `context`（`object`）：Cucumber World对象

### beforeAssertion

在WebdriverIO断言发生之前执行的钩子。

参数：

- `params`：断言信息
- `params.matcherName`（`string`）：匹配器名称（例如`toHaveTitle`）
- `params.expectedValue`：传递给匹配器的值
- `params.options`：断言选项

### afterAssertion

在WebdriverIO断言发生之后执行的钩子。

参数：

- `params`：断言信息
- `params.matcherName`（`string`）：匹配器名称（例如`toHaveTitle`）
- `params.expectedValue`：传递给匹配器的值
- `params.options`：断言选项
- `params.result`：断言结果