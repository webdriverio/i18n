---
id: configuration
title: 配置
---

根据[设置类型](/docs/setuptypes)（例如使用原始协议绑定、WebdriverIO 作为独立包或 WDIO 测试运行器），有不同的选项可用于控制环境。

## WebDriver 选项

使用 [`webdriver`](https://www.npmjs.com/package/webdriver) 协议包时定义了以下选项：

### protocol

与驱动服务器通信时使用的协议。

类型：`String`<br />
默认值：`http`

### hostname

驱动服务器的主机。

类型：`String`<br />
默认值：`0.0.0.0`

### port

驱动服务器的端口。

类型：`Number`<br />
默认值：`undefined`

### path

驱动服务器端点的路径。

类型：`String`<br />
默认值：`/`

### queryParams

传播到驱动服务器的查询参数。

类型：`Object`<br />
默认值：`undefined`

### user

您的云服务用户名（仅适用于 [Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com) 或 [LambdaTest](https://www.lambdatest.com) 账户）。如果设置，WebdriverIO 将自动为您设置连接选项。如果您不使用云提供商，可以用它来验证任何其他 WebDriver 后端。

类型：`String`<br />
默认值：`undefined`

### key

您的云服务访问密钥或密钥（仅适用于 [Sauce Labs](https://saucelabs.com)、[Browserstack](https://www.browserstack.com)、[TestingBot](https://testingbot.com) 或 [LambdaTest](https://www.lambdatest.com) 账户）。如果设置，WebdriverIO 将自动为您设置连接选项。如果您不使用云提供商，可以用它来验证任何其他 WebDriver 后端。

类型：`String`<br />
默认值：`undefined`

### capabilities

定义您想在 WebDriver 会话中运行的功能。查看 [WebDriver 协议](https://w3c.github.io/webdriver/#capabilities) 了解更多详情。如果您运行的驱动程序不支持 WebDriver 协议，则需要使用 [JSONWireProtocol capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) 来成功运行会话。

除了基于 WebDriver 的功能外，您还可以应用浏览器和供应商特定的选项，这些选项允许对远程浏览器或设备进行更深入的配置。这些在相应的供应商文档中有记录，例如：

- `goog:chromeOptions`：适用于 [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`：适用于 [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`：适用于 [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`：适用于 [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`：适用于 [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`：适用于 [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

此外，Sauce Labs 的 [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) 是一个有用的工具，可以通过点击组合您所需的功能来帮助您创建此对象。

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

如果您在移动设备上运行 Web 或原生测试，`capabilities` 与 WebDriver 协议有所不同。有关更多详细信息，请参阅 [Appium 文档](https://appium.io/docs/en/latest/guides/caps/)。

### logLevel

日志记录的详细级别。

类型：`String`<br />
默认值：`info`<br />
选项：`trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

存储所有测试运行器日志文件（包括报告器日志和 `wdio` 日志）的目录。如果未设置，所有日志都将流式传输到 `stdout`。由于大多数报告器都是为日志记录到 `stdout` 而设计的，因此建议仅对特定报告器使用此选项，在这些报告器中，将报告推送到文件更有意义（例如 `junit` 报告器）。

在独立模式下运行时，WebdriverIO 生成的唯一日志将是 `wdio` 日志。

类型：`String`<br />
默认值：`null`

### connectionRetryTimeout

对驱动程序或网格的任何 WebDriver 请求的超时时间。

类型：`Number`<br />
默认值：`120000`

### connectionRetryCount

向 Selenium 服务器请求重试的最大次数。

类型：`Number`<br />
默认值：`3`

### agent

允许您使用自定义的 `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) 发出请求。

类型：`Object`<br />
默认值：

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

指定传入每个 WebDriver 请求的自定义 `headers`。如果您的 Selenium Grid 需要基本身份验证，我们建议通过此选项传入 `Authorization` 头来验证您的 WebDriver 请求，例如：

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
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

在发出 WebDriver 请求之前拦截 [HTTP 请求选项](https://github.com/sindresorhus/got#options) 的函数

类型：`(RequestOptions) => RequestOptions`<br />
默认值：*无*

### transformResponse

WebDriver 响应到达后拦截 HTTP 响应对象的函数。该函数将原始响应对象作为第一个参数，将相应的 `RequestOptions` 作为第二个参数传递。

类型：`(Response, RequestOptions) => Response`<br />
默认值：*无*

### strictSSL

是否不要求 SSL 证书有效。
可以通过环境变量 `STRICT_SSL` 或 `strict_ssl` 设置。

类型：`Boolean`<br />
默认值：`true`

### enableDirectConnect

是否启用 [Appium 直接连接功能](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments)。
如果响应在启用标志的情况下没有适当的键，则不执行任何操作。

类型：`Boolean`<br />
默认值：`true`

### cacheDir

缓存目录的根路径。此目录用于存储在尝试启动会话时下载的所有驱动程序。

类型：`String`<br />
默认值：`process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

为了更安全的日志记录，用 `maskingPatterns` 设置的正则表达式可以混淆日志中的敏感信息。
 - 字符串格式是带有或不带有标志的正则表达式（例如 `/.../i`），多个正则表达式用逗号分隔。
 - 有关遮蔽模式的更多详细信息，请参阅 [WDIO Logger README 中的遮蔽模式部分](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)。

类型：`String`<br />
默认值：`undefined`

**示例：**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

以下选项（包括上面列出的选项）可以与 WebdriverIO 独立使用：

### automationProtocol

定义要用于浏览器自动化的协议。目前只支持 [`webdriver`](https://www.npmjs.com/package/webdriver)，因为它是 WebdriverIO 使用的主要浏览器自动化技术。

如果您想使用不同的自动化技术来自动化浏览器，请将此属性设置为解析为符合以下接口的模块的路径：

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
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

通过设置基本 URL 来缩短 `url` 命令调用。
- 如果您的 `url` 参数以 `/` 开头，则会在前面添加 `baseUrl`（除了 `baseUrl` 路径，如果它有的话）。
- 如果您的 `url` 参数不以方案或 `/` 开头（如 `some/path`），则会直接在前面添加完整的 `baseUrl`。

类型：`String`<br />
默认值：`null`

### waitforTimeout

所有 `waitFor*` 命令的默认超时时间。（注意选项名称中的小写 `f`。）此超时时间__仅__影响以 `waitFor*` 开头的命令及其默认等待时间。

要增加_测试_的超时时间，请参阅框架文档。

类型：`Number`<br />
默认值：`5000`

### waitforInterval

所有 `waitFor*` 命令的默认间隔，用于检查预期状态（例如可见性）是否已更改。

类型：`Number`<br />
默认值：`100`

### region

如果在 Sauce Labs 上运行，您可以选择在不同的数据中心之间运行测试：美国或欧盟。
要将您的区域更改为欧盟，请在配置中添加 `region: 'eu'`。

__注意：__ 这仅在您提供与 Sauce Labs 账户关联的 `user` 和 `key` 选项时有效。

类型：`String`<br />
默认值：`us`

*（仅适用于虚拟机和/或 em/模拟器）*

---

## 测试运行器选项

以下选项（包括上面列出的选项）仅适用于使用 WDIO 测试运行器运行 WebdriverIO：

### specs

定义测试执行的规范。您可以指定一个 glob 模式来一次匹配多个文件，或者将 glob 或一组路径包装到数组中，以在单个工作进程中运行它们。所有路径都被视为相对于配置文件路径。

类型：`(String | String[])[]`<br />
默认值：`[]`

### exclude

从测试执行中排除规范。所有路径都被视为相对于配置文件路径。

类型：`String[]`<br />
默认值：`[]`

### suites

描述各种套件的对象，您可以使用 `wdio` CLI 上的 `--suite` 选项指定。

类型：`Object`<br />
默认值：`{}`

### capabilities

与上面描述的 `capabilities` 部分相同，但可以选择指定 [`multiremote`](/docs/multiremote) 对象，或多个 WebDriver 会话的数组以进行并行执行。

您可以应用与上面定义的相同的供应商和浏览器特定功能[capabilities](/docs/configuration#capabilities)。

类型：`Object`|`Object[]`<br />
默认值：`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

并行运行的工作进程的最大总数。

__注意：__ 当测试在 Sauce Labs 等外部供应商的机器上执行时，这个数字可能高达 `100`。在那里，测试不是在单个机器上测试，而是在多个虚拟机上。如果要在本地开发机器上运行测试，请使用更合理的数字，如 `3`、`4` 或 `5`。本质上，这是将同时启动并同时运行测试的浏览器数量，因此它取决于您的机器上有多少 RAM 以及您的机器上运行了多少其他应用程序。

您还可以使用 `wdio:maxInstances` 功能在您的功能对象中应用 `maxInstances`。这将限制该特定功能的并行会话数量。

类型：`Number`<br />
默认值：`100`

### maxInstancesPerCapability

每个功能的并行运行的工作进程的最大总数。

类型：`Number`<br />
默认值：`100`

### injectGlobals

将 WebdriverIO 的全局变量（例如 `browser`、`$` 和 `$$`）插入到全局环境中。
如果您设置为 `false`，则应从 `@wdio/globals` 导入，例如：

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

注意：WebdriverIO 不处理测试框架特定全局变量的注入。

类型：`Boolean`<br />
默认值：`true`

### bail

如果您希望测试运行在特定数量的测试失败后停止，请使用 `bail`。
（默认为 `0`，无论如何都会运行所有测试。）**注意：** 在这种情况下，测试是指单个规范文件中的所有测试（在使用 Mocha 或 Jasmine 时）或功能文件中的所有步骤（在使用 Cucumber 时）。如果您想在单个测试文件的测试中控制中止行为，请查看可用的[框架](frameworks)选项。

类型：`Number`<br />
默认值：`0`（不中止；运行所有测试）

### specFileRetries

当整个规范文件作为一个整体失败时重试的次数。

类型：`Number`<br />
默认值：`0`

### specFileRetriesDelay

规范文件重试尝试之间的延迟（以秒为单位）

类型：`Number`<br />
默认值：`0`

### specFileRetriesDeferred

重试的规范文件是立即重试还是推迟到队列末尾。

类型：`Boolean`<br />
默认值：`true`

### groupLogsByTestSpec

选择日志输出视图。

如果设置为 `false`，来自不同测试文件的日志将实时打印。请注意，这可能会导致并行运行时来自不同文件的日志输出混合在一起。

如果设置为 `true`，日志输出将按测试规范分组，并仅在测试规范完成时打印。

默认情况下，它设置为 `false`，因此日志是实时打印的。

类型：`Boolean`<br />
默认值：`false`

### autoAssertOnTestEnd

控制 WebdriverIO 是否在每个测试结束时自动断言所有软断言。当设置为 `true` 时，任何积累的软断言都将自动检查，如果有任何断言失败，将导致测试失败。当设置为 `false` 时，您必须手动调用断言方法来检查软断言。

类型：`Boolean`<br />
默认值：`true`

### services

服务接管您不想关心的特定工作。它们几乎不需要任何努力就能增强您的测试设置。

类型：`String[]|Object[]`<br />
默认值：`[]`

### framework

定义 WDIO 测试运行器要使用的测试框架。

类型：`String`<br />
默认值：`mocha`<br />
选项：`mocha` | `jasmine`

### mochaOpts, jasmineOpts 和 cucumberOpts

特定于框架的选项。有关可用选项，请参阅框架适配器文档。在[框架](frameworks)中阅读更多相关信息。

类型：`Object`<br />
默认值：`{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

带有行号的 cucumber 功能列表（[使用 cucumber 框架时](./Frameworks.md#using-cucumber)）。

类型：`String[]`
默认值：`[]`

### reporters

要使用的报告器列表。报告器可以是字符串，也可以是
`['reporterName', { /* reporter options */}]` 数组，其中第一个元素是带有报告器名称的字符串，第二个元素是带有报告器选项的对象。

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

确定报告器在异步报告其日志时应该检查它们是否同步的间隔（例如，如果日志流式传输到第三方供应商）。

类型：`Number`<br />
默认值：`100`（毫秒）

### reporterSyncTimeout

确定报告器完成上传所有日志的最长时间，直到测试运行器抛出错误。

类型：`Number`<br />
默认值：`5000`（毫秒）

### execArgv

启动子进程时指定的 Node 参数。

类型：`String[]`<br />
默认值：`null`

### filesToWatch

一个支持 glob 的字符串模式列表，告诉测试运行器在使用 `--watch` 标志运行时额外监视其他文件，例如应用程序文件。默认情况下，测试运行器已经监视所有规范文件。

类型：`String[]`<br />
默认值：`[]`

### updateSnapshots

如果要更新快照，请设置为 true。理想情况下，作为 CLI 参数的一部分使用，例如 `wdio run wdio.conf.js --s`。

类型：`'new' | 'all' | 'none'`<br />
默认值：如果未提供且测试在 CI 中运行，则为 `none`，如果未提供，则为 `new`，否则为提供的值

### resolveSnapshotPath

覆盖默认快照路径。例如，将快照存储在测试文件旁边。

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

类型：`(testPath: string, snapExtension: string) => string`<br />
默认值：在测试文件旁边的 `__snapshots__` 目录中存储快照文件

### tsConfigPath

WDIO 使用 `tsx` 来编译 TypeScript 文件。您的 TSConfig 会自动从当前工作目录检测，但您可以在此处指定自定义路径或通过设置 TSX_TSCONFIG_PATH 环境变量来指定。

请参阅 `tsx` 文档：https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

类型：`String`<br />
默认值：`null`<br />

## 钩子

WDIO 测试运行器允许您设置钩子，以在测试生命周期的特定时间触发。这允许自定义操作（例如，如果测试失败则截屏）。

每个钩子都有关于生命周期的特定信息作为参数（例如，关于测试套件或测试的信息）。在[我们的示例配置](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326)中阅读有关所有钩子属性的更多信息。

**注意：** 某些钩子（`onPrepare`、`onWorkerStart`、`onWorkerEnd` 和 `onComplete`）在不同的进程中执行，因此不能与工作进程中的其他钩子共享任何全局数据。

### onPrepare

在所有工作进程启动之前执行一次。

参数：

- `config`（`object`）：WebdriverIO 配置对象
- `param`（`object[]`）：功能详情列表

### onWorkerStart

在工作进程生成之前执行，可用于初始化该工作进程的特定服务以及以异步方式修改运行时环境。

参数：

- `cid`（`string`）：功能 ID（例如 0-0）
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：在工作进程中运行的规范
- `args`（`object`）：一旦工作进程初始化，将与主配置合并的对象
- `execArgv`（`string[]`）：传递给工作进程的字符串参数列表

### onWorkerEnd

在工作进程退出后立即执行。

参数：

- `cid`（`string`）：功能 ID（例如 0-0）
- `exitCode`（`number`）：0 - 成功，1 - 失败
- `specs`（`string[]`）：在工作进程中运行的规范
- `retries`（`number`）：如[_"在每个规范文件的基础上添加重试"_](./Retry.md#add-retries-on-a-per-specfile-basis)中定义的那样使用的规范级别重试次数

### beforeSession

在初始化 webdriver 会话和测试框架之前执行。它允许您根据功能或规范操作配置。

参数：

- `config`（`object`）：WebdriverIO 配置对象
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：在工作进程中运行的规范

### before

在测试执行开始之前执行。此时您可以访问所有全局变量，如 `browser`。这是定义自定义命令的完美位置。

参数：

- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：在工作进程中运行的规范
- `browser`（`object`）：创建的浏览器/设备会话实例

### beforeSuite

在套件开始之前执行的钩子（仅在 Mocha/Jasmine 中）

参数：

- `suite`（`object`）：套件详情

### beforeHook

在套件内的钩子开始*之前*执行的钩子（例如，在 Mocha 中在调用 beforeEach 之前运行）

参数：

- `test`（`object`）：测试详情
- `context`（`object`）：测试上下文（在 Cucumber 中代表 World 对象）

### afterHook

在套件内的钩子结束*之后*执行的钩子（例如，在 Mocha 中在调用 afterEach 之后运行）

参数：

- `test`（`object`）：测试详情
- `context`（`object`）：测试上下文（在 Cucumber 中代表 World 对象）
- `result`（`object`）：钩子结果（包含 `error`、`result`、`duration`、`passed`、`retries` 属性）

### beforeTest

在测试之前执行的函数（仅在 Mocha/Jasmine 中）。

参数：

- `test`（`object`）：测试详情
- `context`（`object`）：测试执行的作用域对象

### beforeCommand

在执行 WebdriverIO 命令之前运行。

参数：

- `commandName`（`string`）：命令名称
- `args`（`*`）：命令将接收的参数

### afterCommand

在执行 WebdriverIO 命令后运行。

参数：

- `commandName`（`string`）：命令名称
- `args`（`*`）：命令将接收的参数
- `result`（`number`）：0 - 命令成功，1 - 命令错误
- `error`（`Error`）：如果有的话，错误对象

### afterTest

在测试（Mocha/Jasmine 中）结束后执行的函数。

参数：

- `test`（`object`）：测试详情
- `context`（`object`）：测试执行的作用域对象
- `result.error`（`Error`）：如果测试失败，则为错误对象，否则为 `undefined`
- `result.result`（`Any`）：测试函数的返回对象
- `result.duration`（`Number`）：测试持续时间
- `result.passed`（`Boolean`）：如果测试通过则为 true，否则为 false
- `result.retries`（`Object`）：有关单个测试相关重试的信息，如[Mocha 和 Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha)以及[Cucumber](./Retry.md#rerunning-in-cucumber)中定义的那样，例如 `{ attempts: 0, limit: 0 }`，参见
- `result`（`object`）：钩子结果（包含 `error`、`result`、`duration`、`passed`、`retries` 属性）

### afterSuite

在套件结束后执行的钩子（仅在 Mocha/Jasmine 中）

参数：

- `suite`（`object`）：套件详情

### after

在所有测试完成后执行。您仍然可以访问测试中的所有全局变量。

参数：

- `result`（`number`）：0 - 测试通过，1 - 测试失败
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：在工作进程中运行的规范

### afterSession

在终止 webdriver 会话后立即执行。

参数：

- `config`（`object`）：WebdriverIO 配置对象
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `specs`（`string[]`）：在工作进程中运行的规范

### onComplete

在所有工作进程关闭且进程即将退出后执行。在 onComplete 钩子中抛出的错误将导致测试运行失败。

参数：

- `exitCode`（`number`）：0 - 成功，1 - 失败
- `config`（`object`）：WebdriverIO 配置对象
- `caps`（`object`）：包含将在工作进程中生成的会话功能
- `result`（`object`）：包含测试结果的结果对象

### onReload

在刷新发生时执行。

参数：

- `oldSessionId`（`string`）：旧会话的会话 ID
- `newSessionId`（`string`）：新会话的会话 ID

### beforeFeature

在 Cucumber 功能之前运行。

参数：

- `uri`（`string`）：功能文件的路径
- `feature`（[`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)）：Cucumber 功能对象

### afterFeature

在 Cucumber 功能之后运行。

参数：

- `uri`（`string`）：功能文件的路径
- `feature`（[`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)）：Cucumber 功能对象

### beforeScenario

在 Cucumber 场景之前运行。

参数：

- `world`（[`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)）：包含关于 pickle 和测试步骤信息的 world 对象
- `context`（`object`）：Cucumber World 对象

### afterScenario

在 Cucumber 场景之后运行。

参数：

- `world`（[`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)）：包含关于 pickle 和测试步骤信息的 world 对象
- `result`（`object`）：包含场景结果的结果对象
- `result.passed`（`boolean`）：如果场景通过则为 true
- `result.error`（`string`）：如果场景失败则为错误堆栈
- `result.duration`（`number`）：场景持续时间（毫秒）
- `context`（`object`）：Cucumber World 对象

### beforeStep

在 Cucumber 步骤之前运行。

参数：

- `step`（[`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)）：Cucumber 步骤对象
- `scenario`（[`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)）：Cucumber 场景对象
- `context`（`object`）：Cucumber World 对象

### afterStep

在 Cucumber 步骤之后运行。

参数：

- `step`（[`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)）：Cucumber 步骤对象
- `scenario`（[`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)）：Cucumber 场景对象
- `result`：（`object`）：包含步骤结果的结果对象
- `result.passed`（`boolean`）：如果场景通过则为 true
- `result.error`（`string`）：如果场景失败则为错误堆栈
- `result.duration`（`number`）：场景持续时间（毫秒）
- `context`（`object`）：Cucumber World 对象

### beforeAssertion

在 WebdriverIO 断言发生之前执行的钩子。

参数：

- `params`：断言信息
- `params.matcherName`（`string`）：匹配器的名称（例如 `toHaveTitle`）
- `params.expectedValue`：传递给匹配器的值
- `params.options`：断言选项

### afterAssertion

在 WebdriverIO 断言发生之后执行的钩子。

参数：

- `params`：断言信息
- `params.matcherName`（`string`）：匹配器的名称（例如 `toHaveTitle`）
- `params.expectedValue`：传递给匹配器的值
- `params.options`：断言选项
- `params.result`：断言结果