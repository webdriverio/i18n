---
id: browserstack-service
title: Browserstack 服务
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> 一个为 BrowserStack 用户管理本地隧道和任务元数据的 WebdriverIO 服务。

## 安装

保持 `@wdio/browserstack-service` 作为 `package.json` 中的开发依赖是最简单的方法，通过：

```sh
npm install @wdio/browserstack-service --save-dev
```

关于如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置

WebdriverIO 内置了对 BrowserStack 的支持。你应该在 `wdio.conf.js` 文件中设置 `user` 和 `key`。这个服务插件提供对 [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing) 的支持。还要设置 `browserstackLocal: true` 来激活此功能。
BrowserStack 上的会话状态报告将遵循 Cucumber 选项的 `strict` 设置。

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## 选项

为了授权 BrowserStack 服务，你的配置需要包含 [`user`](https://webdriver.io/docs/options#user) 和 [`key`](https://webdriver.io/docs/options#key) 选项。

### testObservability

测试可观察性是一个高级测试报告工具，可提供改进自动化测试的洞察力，并帮助你更快地调试。对于所有 browserstack-service 用户，通过将 `testObservability`​ 标志设置为 `true` 默认启用。你可以通过将 `testObservability`​ 标志设置为 `false` 来禁用它。

测试完成后，你可以访问 [Test Observability](https://observability.browserstack.com/) 来调试你的构建，获取额外的洞察力，如唯一错误分析、自动检测不稳定测试等。

即使你不在 BrowserStack 基础设施上运行测试，也可以使用测试可观察性。即使你在 CI、本地机器或其他云服务提供商上运行测试，测试可观察性仍然可以为你的测试生成智能测试报告和高级分析。

如果你想在不在 BrowserStack 基础设施上运行测试的情况下使用测试可观察性，可以按如下设置配置：

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

你可以在[这个沙盒](https://observability-demo.browserstack.com/)中探索测试可观察性的所有功能，或者在[这里](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability)了解更多相关信息。

### browserstackLocal
设置为 true 以启用通过你的计算机路由来自 BrowserStack 云的连接。

类型：`Boolean`<br />
默认值：`false`

### forcedStop
设置为 true 以在完成时强制终止 BrowserStack Local 进程，而不等待 BrowserStack Local 停止回调被调用。这是实验性的，不应该被所有人使用。主要是作为[此问题](https://github.com/browserstack/browserstack-local-nodejs/issues/41)的解决方案。

类型：`Boolean`<br />
默认值：`false`

### app

[Appium](https://appium.io/) 设置本地机器上可用的应用程序文件路径，以将应用程序用作 Appium 会话的[测试应用程序](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app)。

类型：`String` 或 `JsonObject`<br />
默认值：`undefined`

可用的应用值列表：

#### path
使用本地可用的应用程序文件路径作为 Appium 的测试应用程序。

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // 或
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

在上传应用时传递 custom_id。

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
使用上传应用到 BrowserStack 后返回的应用 URL。

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // 或
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

使用已上传应用的 custom_id

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // 或
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

使用已上传应用的 shareable_id

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // 或
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

仅限 Cucumber。如果只运行单个场景，则将 BrowserStack Automate 会话名称设置为场景名称。
在与 [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution) 并行运行时很有用。

类型：`Boolean`<br />
默认值：`false`

### sessionNameFormat

自定义 BrowserStack Automate 会话名称格式。

类型：`Function`<br />
默认值 (Cucumber/Jasmine)：`(config, capabilities, suiteTitle) => suiteTitle`<br />
默认值 (Mocha)：`(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

仅限 Mocha。不要在 BrowserStack Automate 会话名称中附加测试标题。

类型：`Boolean`<br />
默认值：`false`

### sessionNamePrependTopLevelSuiteTitle

仅限 Mocha。在 BrowserStack Automate 会话名称前加上顶级套件标题。

类型：`Boolean`<br />
默认值：`false`

### setSessionName

自动设置 BrowserStack Automate 会话名称。

类型：`Boolean`<br />
默认值：`true`

### setSessionStatus

自动设置 BrowserStack Automate 会话状态（通过/失败）。

类型：`Boolean`<br />
默认值：`true`

### buildIdentifier

**buildIdentifier** 是一个唯一的 ID，用于区分每次执行，它会附加到 buildName。从可用表达式中选择你的 buildIdentifier 格式：
* `BUILD_NUMBER`：每次执行生成一个递增计数器
* `DATE_TIME`：每次执行生成一个时间戳。例如 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier 支持使用一个或两个表达式，以及任何其他字符，启用自定义格式选项。

### opts

BrowserStack Local 选项。

类型：`Object`<br />
默认值：`{}`

可以作为 opts 传递的可用本地测试修饰符列表：

#### Local Identifier

如果同时进行多个本地测试连接，为不同的进程唯一设置此值 -

```js
opts = { localIdentifier: "randomstring" };
```

#### 详细日志记录

启用详细日志记录 -

```js
opts = { verbose: "true" };
```

注意 - 'verbose' 修饰符的可能值为 '1', '2', '3' 和 'true'

#### Force Local

通过本地（你的）机器路由所有流量 -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

要测试本地文件夹而不是内部服务器，提供此选项的值为文件夹路径 -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

杀死其他正在运行的 BrowserStack Local 实例 -

```js
opts = { force: "true" };
```

#### Only Automate

禁用 Live 和 Screenshots 的本地测试，只启用 Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

使用代理进行本地测试 -

- proxyHost：代理的主机名/IP，如果此选项不存在，则忽略其余代理选项
- proxyPort：代理的端口，当使用 -proxyHost 时默认为 3128
- proxyUser：连接到代理的用户名（仅基本身份验证）
- proxyPass：USERNAME 的密码，如果 USERNAME 为空或未指定，将被忽略

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

在本地测试中使用本地代理 -

- localProxyHost：代理的主机名/IP，如果此选项不存在，则忽略其余代理选项
- localProxyPort：代理的端口，当使用 -localProxyHost 时默认为 8081
- localProxyUser：连接到代理的用户名（仅基本身份验证）
- localProxyPass：USERNAME 的密码，如果 USERNAME 为空或未指定，将被忽略

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

在本地测试中使用 PAC（代理自动配置）-

- pac-file：PAC（代理自动配置）文件的绝对路径

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

默认情况下，BrowserStack 本地封装器尝试按顺序下载并执行最新版本的 BrowserStack 二进制文件，保存在 ~/.browserstack 或当前工作目录或 tmp 文件夹中。但你可以通过传递 -binarypath 参数来覆盖这些。
指定本地二进制路径的路径 -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

要在运行时使用 '-v' 参数将日志保存到文件，你可以指定文件的路径。默认情况下，日志保存在当前工作目录中的 local.log 文件中。
指定将保存日志的文件路径 -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

有关 WebdriverIO 的更多信息，请参阅[主页](https://webdriver.io)。