---
id: wdio-rerun-service
title: 重新运行服务
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service是第三方包，更多信息请查看[GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

此服务跟踪在[WebdriverIO](https://webdriver.io)测试框架内执行的失败的Mocha或Jasmine测试以及Cucumber场景。它将允许重新运行失败或不稳定的测试或场景。

_注意_：运行WebdriverIO版本`5.x`和`6.x`的Cucumber框架用户应使用版本`1.6.x`。如果您使用的是最新的主要版本`7.x`，请使用此服务的最新`1.7.x`版本。

## 重新运行 vs. 重试

WebdriverIO为Cucumber和Mocha/Jasmine内置的`retry`逻辑对处理Cucumber和Mocha/Jasmine中的不稳定步骤很有帮助。每个框架中的重试都有注意事项：
* Cucumber：它没有考虑到有些步骤可能无法在测试中间重试。两次运行一个步骤可能会破坏场景的其余部分，或者在测试上下文中可能不可行。
* Mocha/Jasmine：`retry`逻辑可能应用于单个测试，但是，这仍然是实时进行的，可能无法解决临时问题或网络连接问题。

`re-run`的主要区别：
* 将重新运行整个Cucumber场景，而不仅仅是单个步骤
* 允许在主测试执行完成后重新运行整个规格文件
* 可以在本地复制和执行（`retry`不能）
* 仍然可以与`retry`方法一起使用
* 不需要任何代码更改即可将`retry`逻辑应用于不稳定或有问题的测试

建议花一些时间评估可用选项。混合解决方案可能是提供最佳实际和可操作测试结果的最佳解决方案。

## 安装

最简单的方法是将`wdio-rerun-service`添加到您的`package.json`的`devDependencies`中。

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

可以使用`npm`安装：

```bash
npm install wdio-rerun-service
```

完成包安装后，将其添加到`wdio.conf.js`中的`services`数组中：

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

有关如何安装`WebdriverIO`的说明可以在[这里](https://webdriver.io/docs/gettingstarted.html)找到。

## 配置

以下选项可以添加到wdio.conf.js文件中。要为服务定义选项，您需要以以下方式将服务添加到`services`列表中：

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // 重新运行服务选项在这里...
        }]
    ],
    // ...
};
```

### rerunDataDir
执行期间将保存所有重新运行JSON数据的目录。

类型：`String`

默认值：`./results/rerun`

示例：
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
写入重新运行Bash脚本的路径。

类型：`String`

默认值：`./rerun.sh`

示例：
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
（仅Cucumber）要排除的Cucumber标签集。如果场景包含标签，重新运行服务将跳过分析。

类型：`Array`

默认值：`[]`

示例：
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
将添加到生成的重新运行命令前面的前缀。

类型：`String`

默认值：`''`

示例：
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----