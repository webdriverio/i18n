---
id: setuptypes
title: 设置类型
---

WebdriverIO 可用于各种目的。它实现了 WebDriver 协议 API，并能够以自动化方式运行浏览器。该框架设计用于在任何环境中工作，适用于任何类型的任务。它独立于任何第三方框架，只需要 Node.js 即可运行。

## 协议绑定

对于与 WebDriver 和其他自动化协议的基本交互，WebdriverIO 使用基于 [`webdriver`](https://www.npmjs.com/package/webdriver) NPM 包的自有协议绑定：

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

所有[协议命令](api/webdriver)都会返回自动化驱动程序的原始响应。该包非常轻量级，__没有__智能逻辑（如自动等待）来简化与协议使用的交互。

应用于实例的协议命令取决于驱动程序的初始会话响应。例如，如果响应表明启动了移动会话，则该包会将所有 Appium 和 Mobile JSON Wire 协议命令应用于实例原型。

当导入 [`devtools`](https://www.npmjs.com/package/devtools) NPM 包时，您可以使用 Chrome DevTools 协议运行相同的命令集（移动命令除外）。它与 `webdriver` 包具有相同的接口，但基于 [Puppeteer](https://pptr.dev/) 运行其自动化。

有关这些包接口的更多信息，请参阅 [Modules API](/docs/api/modules)。

## 独立模式

为简化与 WebDriver 协议的交互，`webdriverio` 包在协议之上实现了各种命令（例如 [`dragAndDrop`](api/element/dragAndDrop) 命令）和核心概念，如[智能选择器](selectors)或[自动等待](autowait)。上面的示例可以简化为：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

在独立模式下使用 WebdriverIO 仍然可以访问所有协议命令，但提供了一套额外的命令，支持与浏览器进行更高级别的交互。它允许您将此自动化工具集成到您自己的（测试）项目中，创建新的自动化库。常见的例子包括 [Oxygen](https://github.com/oxygenhq/oxygen) 或 [CodeceptJS](http://codecept.io)。您还可以编写普通的 Node 脚本来抓取网页内容（或任何其他需要运行浏览器的任务）。

如果未设置特定选项，WebdriverIO 将始终尝试下载并设置与您的功能中 `browserName` 属性匹配的浏览器驱动程序。对于 Chrome 和 Firefox，它也可能会安装这些浏览器，这取决于它是否能在机器上找到相应的浏览器。

有关 `webdriverio` 包接口的更多信息，请参阅 [Modules API](/docs/api/modules)。

## WDIO 测试运行器

不过，WebdriverIO 的主要目的是大规模的端到端测试。因此，我们实现了一个测试运行器，帮助您构建易于阅读和维护的可靠测试套件。

测试运行器解决了使用普通自动化库时常见的许多问题。首先，它组织您的测试运行并拆分测试规范，以便您的测试可以以最大的并发性执行。它还处理会话管理，并提供许多功能来帮助您调试问题并在测试中发现错误。

以下是上面的相同示例，但作为测试规范编写并由 WDIO 执行：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

测试运行器是对流行测试框架（如 Mocha、Jasmine 或 Cucumber）的抽象。要使用 WDIO 测试运行器运行您的测试，请查看[入门](gettingstarted)部分了解更多信息。

有关 `@wdio/cli` 测试运行器包接口的更多信息，请参阅 [Modules API](/docs/api/modules)。