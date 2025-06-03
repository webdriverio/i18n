---
id: capabilities
title: 能力
---

能力是对远程接口的定义。它帮助 WebdriverIO 理解您希望在哪种浏览器或移动环境中运行测试。在本地开发测试时，能力不那么关键，因为大多数时候您只在一个远程接口上运行测试，但在 CI/CD 中运行大量集成测试时，能力变得更加重要。

:::info

能力对象的格式由 [WebDriver 规范](https://w3c.github.io/webdriver/#capabilities) 明确定义。如果用户定义的能力不符合该规范，WebdriverIO 测试运行器将提前失败。

:::

## 自定义能力

虽然固定定义的能力数量很少，但每个人都可以提供和接受特定于自动化驱动程序或远程接口的自定义能力：

### 浏览器特定的能力扩展

- `goog:chromeOptions`：[Chromedriver](https://chromedriver.chromium.org/capabilities) 扩展，仅适用于在 Chrome 中测试
- `moz:firefoxOptions`：[Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) 扩展，仅适用于在 Firefox 中测试
- `ms:edgeOptions`：[EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) 用于在使用 EdgeDriver 测试 Chromium Edge 时指定环境

### 云供应商能力扩展

- `sauce:options`：[Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`：[BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`：[TestingBot](https://testingbot.com/support/other/test-options)
- 以及更多...

### 自动化引擎能力扩展

- `appium:xxx`：[Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`：[Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- 以及更多...

### WebdriverIO 用于管理浏览器驱动程序选项的能力

WebdriverIO 为您管理安装和运行浏览器驱动程序。WebdriverIO 使用自定义能力，允许您向驱动程序传递参数。

#### `wdio:chromedriverOptions`

启动 Chromedriver 时传入的特定选项。

#### `wdio:geckodriverOptions`

启动 Geckodriver 时传入的特定选项。

#### `wdio:edgedriverOptions`

启动 Edgedriver 时传入的特定选项。

#### `wdio:safaridriverOptions`

启动 Safari 时传入的特定选项。

#### `wdio:maxInstances`

特定浏览器/能力的并行运行工作程序的最大总数。优先于 [maxInstances](#configuration#maxInstances) 和 [maxInstancesPerCapability](configuration/#maxinstancespercapability)。

类型：`number`

#### `wdio:specs`

为该浏览器/能力定义测试执行的规格。与[常规的 `specs` 配置选项](configuration#specs)相同，但特定于浏览器/能力。优先于 `specs`。

类型：`(String | String[])[]`

#### `wdio:exclude`

从该浏览器/能力的测试执行中排除规格。与[常规的 `exclude` 配置选项](configuration#exclude)相同，但特定于浏览器/能力。优先于 `exclude`。

类型：`String[]`

#### `wdio:enforceWebDriverClassic`

默认情况下，WebdriverIO 尝试建立 WebDriver Bidi 会话。如果您不喜欢这种行为，可以设置此标志来禁用它。

类型：`boolean`

#### 常见驱动程序选项

虽然所有驱动程序提供不同的配置参数，但有一些共同的参数，WebdriverIO 理解并用于设置驱动程序或浏览器：

##### `cacheDir`

缓存目录的根路径。此目录用于存储在尝试启动会话时下载的所有驱动程序。

类型：`string`<br />
默认：`process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

自定义驱动程序二进制文件的路径。如果设置，WebdriverIO 不会尝试下载驱动程序，而是使用此路径提供的驱动程序。确保驱动程序与您使用的浏览器兼容。

您可以通过 `CHROMEDRIVER_PATH`、`GECKODRIVER_PATH` 或 `EDGEDRIVER_PATH` 环境变量提供此路径。

类型：`string`

:::caution

如果设置了驱动程序 `binary`，WebdriverIO 不会尝试下载驱动程序，而是使用此路径提供的驱动程序。确保驱动程序与您使用的浏览器兼容。

:::

#### 浏览器特定驱动程序选项

为了将选项传播到驱动程序，您可以使用以下自定义能力：

- Chrome 或 Chromium：`wdio:chromedriverOptions`
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
ADB 驱动程序应运行的端口。

示例：`9515`

类型：`number`

##### urlBase
命令的基本 URL 路径前缀，例如 `wd/url`。

示例：`/`

类型：`string`

##### logPath
将服务器日志写入文件而不是标准错误，将日志级别增加到 `INFO`

类型：`string`

##### logLevel
设置日志级别。可能的选项 `ALL`、`DEBUG`、`INFO`、`WARNING`、`SEVERE`、`OFF`。

类型：`string`

##### verbose
详细记录日志（相当于 `--log-level=ALL`）

类型：`boolean`

##### silent
不记录任何内容（相当于 `--log-level=OFF`）

类型：`boolean`

##### appendLog
追加日志文件而不是重写。

类型：`boolean`

##### replayable
详细记录日志并且不截断长字符串，以便可以重放日志（实验性）。

类型：`boolean`

##### readableTimestamp
向日志添加可读时间戳。

类型：`boolean`

##### enableChromeLogs
显示来自浏览器的日志（覆盖其他日志选项）。

类型：`boolean`

##### bidiMapperPath
自定义 bidi 映射器路径。

类型：`string`

##### allowedIps
允许连接到 EdgeDriver 的远程 IP 地址的逗号分隔白名单。

类型：`string[]`<br />
默认：`['']`

##### allowedOrigins
允许连接到 EdgeDriver 的请求来源的逗号分隔白名单。使用 `*` 允许任何主机来源是危险的！

类型：`string[]`<br />
默认：`['*']`

##### spawnOpts
要传递到驱动程序进程的选项。

类型：`SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
默认：`undefined`

</TabItem>
<TabItem value="firefox">

在官方[驱动程序包](https://github.com/webdriverio-community/node-geckodriver#options)中查看所有 Geckodriver 选项。

</TabItem>
<TabItem value="msedge">

在官方[驱动程序包](https://github.com/webdriverio-community/node-edgedriver#options)中查看所有 Edgedriver 选项。

</TabItem>
<TabItem value="safari">

在官方[驱动程序包](https://github.com/webdriverio-community/node-safaridriver#options)中查看所有 Safaridriver 选项。

</TabItem>
</Tabs>

## 特定用例的特殊能力

这是一个示例列表，展示了为实现特定用例需要应用哪些能力。

### 以无头模式运行浏览器

以无头模式运行浏览器意味着运行没有窗口或 UI 的浏览器实例。这主要用于没有显示器的 CI/CD 环境中。要以无头模式运行浏览器，请应用以下能力：

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

似乎 Safari [不支持](https://discussions.apple.com/thread/251837694)以无头模式运行。

</TabItem>
</Tabs>

### 自动化不同的浏览器渠道

如果您想测试尚未作为稳定版发布的浏览器版本，例如 Chrome Canary，您可以通过设置能力并指向您想启动的浏览器来实现，例如：

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

在 Chrome 上测试时，WebdriverIO 会根据定义的 `browserVersion` 自动为您下载所需的浏览器版本和驱动程序，例如：

```ts
{
    browserName: 'chrome', // 或 'chromium'
    browserVersion: '116' // 或 '116.0.5845.96'、'stable'、'dev'、'canary'、'beta' 或 'latest'（与 'canary' 相同）
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

在 Firefox 上测试时，WebdriverIO 会根据定义的 `browserVersion` 自动为您下载所需的浏览器版本和驱动程序，例如：

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

在 Microsoft Edge 上测试时，确保您的机器上已安装所需的浏览器版本。您可以通过以下方式指示 WebdriverIO 执行的浏览器：

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO 会根据定义的 `browserVersion` 自动为您下载所需的驱动程序版本，例如：

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // 或 '109.0.1467.0'、'stable'、'dev'、'canary'、'beta'
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

在 Safari 上测试时，确保您的机器上已安装 [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)。您可以通过以下方式指向该版本：

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## 扩展自定义能力

如果您想定义自己的能力集，例如存储任意数据以在特定能力的测试中使用，您可以通过以下方式设置：

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

在能力命名方面，建议遵循 [W3C 协议](https://w3c.github.io/webdriver/#dfn-extension-capability)，该协议要求使用 `:` (冒号) 字符，表示特定于实现的命名空间。在测试中，您可以通过以下方式访问自定义能力：

```ts
browser.capabilities['custom:caps']
```

为了确保类型安全，您可以通过以下方式扩展 WebdriverIO 的能力接口：

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