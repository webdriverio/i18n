---
id: dot-reporter
title: 点状报告器
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> 一个以点状风格进行报告的WebdriverIO插件。

![Dot Reporter](/img/dot.png "Dot Reporter")

## 安装

最简单的方法是通过以下方式将`@wdio/dot-reporter`作为devDependency保存在你的`package.json`中：

```sh
npm install @wdio/dot-reporter --save-dev
```

关于如何安装`WebdriverIO`的说明可以在[这里](/docs/gettingstarted)找到。

## 配置

以下代码显示了默认的wdio测试运行器配置。只需将`'dot'`作为报告器添加到数组中。

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

有关WebdriverIO的更多信息，请参阅[主页](https://webdriver.io)。