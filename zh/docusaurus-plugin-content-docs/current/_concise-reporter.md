---
id: concise-reporter
title: 简洁报告器
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> 一个以简洁风格报告的WebdriverIO插件。

## 安装

最简单的方法是通过以下方式将`@wdio/concise-reporter`作为devDependency保存在你的`package.json`中：

```sh
npm install @wdio/concise-reporter --save-dev
```

关于如何安装`WebdriverIO`的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置

以下代码显示了默认的wdio测试运行器配置。只需将`'concise'`作为报告器添加到数组中即可。

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```