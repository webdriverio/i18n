---
id: capabilities
title: 能力（Capabilities）
---

能力（capability）是远程接口的定义。它帮助WebdriverIO理解您想在哪种浏览器或移动环境中运行测试。在本地开发测试时，能力的重要性较低，因为您大多数时候只在一个远程接口上运行测试；但在CI/CD中运行大量集成测试时，能力变得更为重要。

:::info

能力对象的格式由[WebDriver规范](https://w3c.github.io/webdriver/#capabilities)明确定义。如果用户定义的能力不符合该规范，WebdriverIO测试运行器将提前失败。

:::

## 自定义能力

虽然固定定义的能力数量很少，但每个人都可以提供和接受特定于自动化驱动程序或远程接口的自定义能力：

### 浏览器特定的能力扩展

- `goog:chromeOptions`：[Chromedriver](https://chromedriver.chromium.org/capabilities)扩展，仅适用于Chrome测试
- `moz:firefoxOptions`：[Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)扩展，仅适用于Firefox测试
- `ms:edgeOptions`：[EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options)，用于使用EdgeDriver测试Chromium Edge时指定环境

### 云服务提供商能力扩展

- `sauce:options`：[Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`：[BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`：[TestingBot](https://testingbot.com/support/other/test-options)
- 以及更多...

### 自动化引擎能力扩展

- `appium:xxx`：[Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`：[Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- 以及更多...

### WebdriverIO管理浏览器驱动选项的能力

WebdriverIO为您管理浏览器驱动的安装和运行。WebdriverIO使用自定义能力，允许您向驱动程序传递参数。

#### `wdio:chromedriverOptions`

启动Chromedriver时传入的特定选项。

#### `wdio:geckodriverOptions`

启动Geckodriver时传入的特定选项。

#### `wdio:edgedriverOptions`

启动Edgedriver时传入的特定选项。

#### `wdio:safaridriverOptions`

启动Safari时传入的特定选项。

#### `wdio:maxInstances`

特定浏览器/能力的最大并行运行工作进程总数。优先于[maxInstances](#configuration#maxInstances)和[maxInstancesPerCapability](configuration/#maxinstancespercapability)。

类型：`number`

#### `wdio:specs`

为该浏览器/能力定义测试执行规范。与[常规`specs`配置选项](configuration#specs)相同，但特定于浏览器/能力。优先于`specs`。

类型：`(String | String[])[]`

#### `wdio:exclude`

从该浏览器/能力的测试执行中排除规范。与[常规`exclude`配置选项](configuration#exclude)相同，但特定于浏览器/能力。在应用全局`exclude`配置选项后排除。

类型：`String[]`

#### `wdio:enforceWebDriverClassic`

默认情况下，WebdriverIO尝试建立WebDriver Bidi会话。如果您不希望这样，可以设置此标志来禁用此行为。

类型：`boolean`

#### 通用驱动选项

虽然所有驱动都提供不同的配置参数，但有一些WebdriverIO理解并用于设置驱动或浏览器的通用选项：

##### `cacheDir`

缓存目录的根路径。此目录用于存储尝试启动会话时下载的所有驱动程序。

类型：`string`<br />
默认值：`process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

自定义驱动程序二进制文件的路径。如果设置，WebdriverIO不会尝试下载驱动程序，而是使用此路径提供的驱动程序。确保驱动程序与您使用的浏览器兼容。

您可以通过`CHROMEDRIVER_PATH`、`GECKODRIVER_PATH`或`EDGEDRIVER_PATH`环境变量提供此路径。

类型：`string`

:::caution

如果设置了驱动程序`binary`，WebdriverIO不会尝试下载驱动程序，而是使用此路径提供的驱动程序。确保驱动程序与您使用的浏览器兼容。

:::

#### 浏览器特定的驱动选项

为了将选项传播到驱动程序，您可以使用以下自定义能力：

- Chrome或Chromium：`wdio:chromedriverOptions`
- Firefox：`wdio:geckodriverOptions`
- Microsoft Edge：`wdio:edgedriverOptions`
- Safari：`wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
ADB驱动应运行的端口。

示例：`9515`

类型：`number`

##### urlBase
命令的基本URL路径前缀，例如`wd/url`。

示例：`/`

类型：`string`

##### logPath
将服务器日志写入文件而不是stderr，将日志级别增加到`INFO`

类型：`string`

##### logLevel
设置日志级别。可能的选项有`ALL`、`DEBUG`、`INFO`、`WARNING`、`SEVERE`、`OFF`。

类型：`string`

##### verbose
详细记录日志（相当于`--log-level=ALL`）

类型：`boolean`

##### silent
不记录任何内容（相当于`--log-level=OFF`）

类型：`boolean`

##### appendLog
追加日志文件而不是重写。

类型：`boolean`

##### replayable
详细记录日志且不截断长字符串，以便可以重放日志（实验性）。

类型：`boolean`

##### readableTimestamp
向日志添加可读时间戳。

类型：`boolean`

##### enableChromeLogs
显示浏览器日志（覆盖其他日志选项）。

类型：`boolean`

##### bidiMapperPath
自定义bidi映射器路径。

类型：`string`

##### allowedIps
允许连接到EdgeDriver的远程IP地址的逗号分隔白名单。

类型：`string[]`<br />
默认值：`['']`

##### allowedOrigins
允许连接到EdgeDriver的请求源的逗号分隔白名单。使用`*`允许任何主机源是危险的！

类型：`string[]`<br />
默认值：`['*']`

##### spawnOpts
要传递到驱动程序进程的选项。

类型：`SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
默认值：`undefined`

</TabItem>
<TabItem value="firefox">

在官方[驱动包](https://github.com/webdriverio-community/node-geckodriver#options)中查看所有Geckodriver选项。

</TabItem>
<TabItem value="msedge">

在官方[驱动包](https://github.com/webdriverio-community/node-edgedriver#options)中查看所有Edgedriver选项。

</TabItem>
<TabItem value="safari">

在官方[驱动包](https://github.com/webdriverio-community/node-safaridriver#options)中查看所有Safaridriver选项。

</TabItem>
</Tabs>

## 特定用例的特殊能力

这是一个示例列表，显示需要应用哪些能力来实现特定用例。

### 无头模式运行浏览器

无头模式运行浏览器意味着运行没有窗口或UI的浏览器实例。这主要用于不使用显示器的CI/CD环境中。要以无头模式运行浏览器，请应用以下能力：

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // 或 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Safari似乎[不支持](https://discussions.apple.com/thread/251837694)无头模式运行。

</TabItem>
</Tabs>

### 自动化不同的浏览器通道

如果您想测试尚未作为稳定版发布的浏览器版本，例如Chrome Canary，您可以通过设置能力并指向您想启动的浏览器来实现，例如：

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

在Chrome上测试时，WebdriverIO将根据定义的`browserVersion`自动为您下载所需的浏览器版本和驱动程序，例如：

```ts
{
    browserName: 'chrome', // 或 'chromium'
    browserVersion: '116' // 或 '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' 或 'latest'（与'canary'相同）
}
```

如果您想测试手动下载的浏览器，可以通过以下方式提供浏览器的二进制路径：

```ts
{
    browserName: 'chrome',  // 或 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

此外，如果您想使用手动下载的驱动程序，可以通过以下方式提供驱动程序的二进制路径：

```ts
{
    browserName: 'chrome', // 或 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

在Firefox上测试时，WebdriverIO将根据定义的`browserVersion`自动为您下载所需的浏览器版本和驱动程序，例如：

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // 或 'latest'
}
```

如果您想测试手动下载的版本，可以通过以下方式提供浏览器的二进制路径：

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

此外，如果您想使用手动下载的驱动程序，可以通过以下方式提供驱动程序的二进制路径：

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

在Microsoft Edge上测试时，确保您的机器上已安装所需的浏览器版本。您可以通过以下方式指向WebdriverIO要执行的浏览器：

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO将根据定义的`browserVersion`自动为您下载所需的驱动程序版本，例如：

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // 或 '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

此外，如果您想使用手动下载的驱动程序，可以通过以下方式提供驱动程序的二进制路径：

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

在Safari上测试时，确保您的机器上已安装[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)。您可以通过以下方式指向WebdriverIO该版本：

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## 扩展自定义能力

如果您想定义自己的一组能力，例如存储可用于特定能力测试的任意数据，您可以通过以下方式设置：

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // 自定义配置
        }
    }]
}
```

建议在能力命名方面遵循[W3C协议](https://w3c.github.io/webdriver/#dfn-extension-capability)，该协议要求使用`:`（冒号）字符，表示特定于实现的命名空间。在测试中，您可以通过以下方式访问自定义能力：

```ts
browser.capabilities['custom:caps']
```

为了确保类型安全，您可以通过以下方式扩展WebdriverIO的能力接口：

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```