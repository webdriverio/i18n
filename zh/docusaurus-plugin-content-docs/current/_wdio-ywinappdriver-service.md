---
id: wdio-ywinappdriver-service
title: ywinappdriver 服务
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

这个服务帮助您在使用 [WDIO 测试运行器](https://webdriver.io/guide/testrunner/gettingstarted.html) 运行测试时无缝地运行 ywinappdriver 服务器。它在子进程中启动 [ywinappdriver](https://github.com/licanhua/YWinAppDriver)。

## 安装

```bash
npm install wdio-ywinappdriver-service --save-dev
```

关于如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted.html)找到。

## 配置

为了使用这个服务，您需要将 `ywinappdriver` 添加到您的服务数组中：

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## 选项

以下选项可以添加到 wdio.conf.js 文件中。要为服务定义选项，您需要以以下方式将服务添加到 `services` 列表中：

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // ywinappdriver 服务选项在这里
            // ...
        }]
    ],
    // ...
};
```

### logPath

应存储所有来自 ywinappdriver 服务器的日志的路径。

类型：`String`

示例：

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

要使用您自己安装的 winappdriver，例如全局安装的，请指定应该启动的命令。

类型：`String`

示例：

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

直接传递给 `ywinappdriver` 的参数列表。

查看[文档](https://github.com/licanhua/ywinappdriver)了解可能的参数。

类型：`Array`

默认值：`[]`

示例：

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```