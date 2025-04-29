---
id: wdio-winappdriver-service
title: winappdriver 服务
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service 是一个第三方软件包，更多信息请参见 [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

当使用 [WDIO 测试运行器](https://webdriver.io/guide/testrunner/gettingstarted.html) 运行测试时，此服务可帮助您无缝运行 WinAppDriver 服务器。它在子进程中启动 [WinAppDriver](https://github.com/Microsoft/WinAppDriver)。

## 安装

```bash
npm install wdio-winappdriver-service --save-dev
```

有关如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted.html)找到。

## 配置

要使用该服务，您需要将 `winappdriver` 添加到您的服务数组中：

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## 选项

以下选项可以添加到 wdio.conf.js 文件中。要为服务定义选项，您需要按以下方式将服务添加到 `services` 列表中：

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            // WinAppDriver 服务选项在此处
            // ...
        }]
    ],
    // ...
};
```

### logPath

存储 winappdriver 服务器所有日志的路径。

类型：`String`

示例：

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

要使用您自己安装的 WinAppDriver，例如全局安装的，请指定应该启动的命令。

类型：`String`

示例：

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

直接传递给 `WinAppDriver` 的参数列表。

有关可能的参数，请参阅[文档](https://github.com/Microsoft/WinAppDriver)。

类型：`Array`

默认值：`[]`

示例：

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```