---
id: appium-service
title: Appium 服务
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

处理Appium服务器超出了实际WebdriverIO项目的范围。当使用[WDIO测试运行器](https://webdriver.io/docs/clioptions)运行测试时，此服务可帮助你无缝运行Appium服务器。它在子进程中启动[Appium服务器](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium)。

## 安装

最简单的方法是通过以下方式将`@wdio/appium-service`作为devDependency保留在你的`package.json`中：

```sh
npm install @wdio/appium-service --save-dev
```

关于如何安装`WebdriverIO`的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置

为了使用该服务，你需要将`appium`添加到你的服务数组中：

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // 默认appium端口
    services: ['appium'],
    // ...
};
```

## 选项

以下选项可以添加到wdio.conf.js文件中。要为服务定义选项，你需要按照以下方式将服务添加到`services`列表中：

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // 默认appium端口
    services: [
        ['appium', {
            // Appium服务选项在这里
            // ...
        }]
    ],
    // ...
};
```

### logPath
应存储Appium服务器所有日志的路径。

类型：`String`

示例：
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
要使用你安装的Appium，例如全局安装的，指定应该启动的命令。

类型：`String`

示例：
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Appium服务器的参数映射，直接传递给`appium`。

有关可能的参数，请参见[文档](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md)。
参数以小驼峰式提供。例如，`debugLogSpacing: true`转换为`--debug-log-spacing`，或者它们可以按照Appium文档中概述的方式提供。

类型：`Object`

默认值：`{}`

示例：
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**注意：** 不鼓励并且不支持使用别名。请使用小驼峰式的完整属性名称。

----

有关WebdriverIO的更多信息，请参见[主页](https://webdriver.io)。