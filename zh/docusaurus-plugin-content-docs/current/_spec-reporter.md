---
id: spec-reporter
title: Spec 报告器
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> 一个以 spec 风格进行报告的 WebdriverIO 插件。

![Spec Reporter](/img/spec.png "Spec Reporter")

## 安装

最简单的方法是通过以下方式将 `@wdio/spec-reporter` 作为 devDependency 保留在你的 `package.json` 中：

```sh
npm install @wdio/spec-reporter --save-dev
```

关于如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置

以下代码显示了默认的 wdio 测试运行器配置。只需将 `'spec'` 作为报告器添加到数组中即可。

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Spec 报告器选项
### symbols
为 `passed`、`failed` 和 `skipped` 测试提供自定义符号

类型：`object`
默认值：`{passed: '✓', skipped: '-', failed: '✖'}`

#### 示例
```js
[
  "spec",
  {
    symbols: {
      passed: '[PASS]',
      failed: '[FAIL]',
    },
  },
]
```

### sauceLabsSharableLinks
默认情况下，Sauce Labs 中的测试结果只能由同一团队的成员查看，不能由不同团队的成员查看。此选项将默认启用[可共享链接](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links)，这意味着所有在 Sauce Labs 中执行的测试都可以被所有人查看。
只需在报告器选项中添加 `sauceLabsSharableLinks: false`，如下所示，即可禁用此功能。

类型：`boolean`
默认值：`true`

#### 示例
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
仅打印失败的规范结果。

类型：`boolean`
默认值：`false`

#### 示例
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
设置为 `true` 可在最终报告中显示步骤的控制台日志

类型：`boolean`
默认值：`false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
设置为 `true` 可实时显示测试状态，而不仅仅是在运行结束时显示

类型：`boolean`
默认值：`false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
设置为 `false` 可禁用报告中的 `[ MutliRemoteBrowser ... ]` 前言。

类型：`boolean`
默认值：`true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

将其设置为 `false` 时，你将看到如下输出：
```
Running: loremipsum (v50) on Windows 10
Session ID: foobar

» /foo/bar/loo.e2e.js
Foo test
   green ✓ foo
   green ✓ bar

» /bar/foo/loo.e2e.js
Bar test
   green ✓ some test
   red ✖ a failed test
   red ✖ a failed test with no stack
```

而使用 `true`（默认值）时，每行都会以前言为前缀：
```
[loremipsum 50 Windows 10 #0-0] Running: loremipsum (v50) on Windows 10
[loremipsum 50 Windows 10 #0-0] Session ID: foobar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /foo/bar/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Foo test
[loremipsum 50 Windows 10 #0-0]    green ✓ foo
[loremipsum 50 Windows 10 #0-0]    green ✓ bar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /bar/foo/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Bar test
[loremipsum 50 Windows 10 #0-0]    green ✓ some test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test with no stack
[loremipsum 50 Windows 10 #0-0]
```

### color
设置为 `true` 可在终端中显示彩色输出

类型：`boolean`
默认值：`true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## 环境选项

有一些选项可以通过环境变量设置：

### `FORCE_COLOR`

如果设置为 true，例如通过 `FORCE_COLOR=0 npx wdio run wdio.conf.js`，所有终端着色将被禁用。