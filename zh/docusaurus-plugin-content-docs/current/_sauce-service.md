---
id: sauce-service
title: Sauce 服务
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO服务，提供与Sauce Labs更好的集成。此服务可用于：

- Sauce Labs虚拟机云（桌面网页/模拟器/仿真器）
- Sauce Labs真机云（iOS和Android）

它可以更新任务元数据（'name'*、'passed'、'tags'、'public'、'build'、'custom-data'），并根据需要运行Sauce Connect。

此服务还能为您做什么：

- 默认情况下，Sauce服务会在任务开始时更新任务的"name"。这将使您能够在任何给定时间点更新名称。
- 您可以定义一个`setJobName`参数，并根据您的capabilities、选项和套件标题自定义任务名称
- Sauce服务还会将失败测试的错误堆栈推送到Sauce Labs的命令选项卡
- 它允许您自动配置和启动[Sauce Connect](https://docs.saucelabs.com/secure-connections/)
- 它会在您的命令列表中设置上下文点，以识别在哪个测试中执行了哪些命令

## 安装

最简单的方法是通过以下方式将`@wdio/sauce-service`作为devDependency保留在您的`package.json`中：

```sh
npm install @wdio/sauce-service --save-dev
```

有关如何安装`WebdriverIO`的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置

要使用虚拟桌面/模拟器/仿真器和真机云的服务，您需要在`wdio.conf.js`文件中设置`user`和`key`。它将自动使用Sauce Labs运行您的集成测试。如果您在Sauce Labs上运行测试，可以通过`region`属性指定要在其中运行测试的区域。区域的可用简称为`us`（默认）和`eu`。这些区域用于Sauce Labs VM云和Sauce Labs真机云。如果您不提供区域，则默认为`us`。

如果您希望WebdriverIO自动启动[Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)隧道，您需要设置`sauceConnect: true`。如果您想将数据中心更改为EU，请添加`region:'eu'`，因为US数据中心设置为默认值。

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // 或 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

如果您想使用现有的Sauce Connect隧道，您只需要提供一个`tunnelName`。如果您使用的是共享隧道，并且您不是创建隧道的用户，则必须识别创建隧道的Sauce Labs用户，以便在测试中使用它。在capabilities中包含`tunnelOwner`，如下所示：

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Sauce 服务选项

为了授权Sauce Labs服务，您的配置需要包含[`user`](https://webdriver.io/docs/options#user)和[`key`](https://webdriver.io/docs/options#key)选项。

### maxErrorStackLength

此服务将在测试失败时自动将错误堆栈推送到Sauce Labs。默认情况下，它只会推送前5行，但如果需要，可以更改这一点。请注意，更多行会导致更多WebDriver调用，这可能会减慢执行速度。

类型：`number`<br />
默认值：`5`

### sauceConnect

如果为`true`，它会运行Sauce Connect并在运行浏览器测试的Sauce Labs虚拟机之间打开安全连接。

类型：`Boolean`<br />
默认值：`false`

### sauceConnectOpts

应用Sauce Connect选项（例如更改端口号或logFile设置）。有关更多信息，请参阅[此列表](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/)。

注意：指定选项时，应省略`--`。它也可以转换为驼峰式（例如`shared-tunnel`或`sharedTunnel`）。

类型：`Object`<br />
默认值：`{ }`

### uploadLogs

如果为`true`，此选项将所有WebdriverIO日志文件上传到Sauce Labs平台以供进一步检查。确保您在wdio配置中设置了[`outputDir`](https://webdriver.io/docs/options#outputdir)以将日志写入文件，否则数据将流式传输到stdout，无法上传。

类型：`Boolean`<br />
默认值：`true`

### setJobName

允许用户根据工作参数（如WebdriverIO配置、使用的capabilities和原始套件标题）动态设置任务名称。

类型：`Function`<br />
默认值：`(config, capabilities, suiteTitle) => suiteTitle`

----

## 覆盖生成的名称元数据

服务会自动从套件名称、浏览器名称和其他信息生成每个测试的名称。

您可以通过提供所需capability的`name`值来覆盖此设置，但这将产生所有测试都具有相同名称的副作用。

----

有关WebdriverIO的更多信息，请参阅[主页](https://webdriver.io)。