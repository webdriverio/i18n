---
id: sumologic-reporter
title: Sumologic 报告器
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> 一个 WebdriverIO 报告器，可将测试结果发送到 [Sumologic](https://www.sumologic.com/) 进行数据分析

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## 安装

最简单的方法是通过以下方式将 `@wdio/sumologic-reporter` 保留为 `package.json` 中的开发依赖：

```sh
npm install @wdio/sumologic-reporter --save-dev
```

有关如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置

首先，我们必须创建一个新的收集器来收集测试的所有日志。要做到这一点，请点击导航栏中的 __Manage__，然后转到 __Collection__。在那里，您需要添加一个新的"Hosted Collector"。应用一个合适的名称，例如"test integration logs"，描述和类别，例如"wdio"。点击保存创建收集器。

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

下一步是添加一个源。为每个环境（例如分支构建，集成）拥有自己的源是有意义的。点击收集器旁边的"Add Source"链接，并添加一个 __HTTP Source__。再次应用一个合适的名称和描述，并设置一个反映环境的"Source Category"。保持其他选项为默认状态，然后点击保存。

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

一个包含源端点的模态框会弹出。复制该 url 并将其粘贴到您的 wdio.conf.js 中，以便报告器知道将数据发送到哪里。

以下代码显示了默认的 wdio 测试运行器配置。只需将 `'sumologic'` 作为报告器添加到数组中，并添加您的源端点：

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

使用报告器运行第一批测试后，您应该能够使用以下查询检查测试日志：

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

我将很快为 Sumologic 提供一些有用的仪表板模板。

----

有关 WebdriverIO 的更多信息，请参阅[主页](https://webdriver.io)。