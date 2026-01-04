---
id: globals
title: 全局变量
---

在你的测试文件中，WebdriverIO将这些方法和对象放入全局环境中。你不需要导入任何东西就能使用它们。但是，如果你更喜欢显式导入，你可以使用`import { browser, $, $$, expect } from '@wdio/globals'`并在你的WDIO配置中设置`injectGlobals: false`。

如果没有另外配置，以下全局对象将被设置：

- `browser`：WebdriverIO [Browser对象](https://webdriver.io/docs/api/browser)
- `driver`：`browser`的别名（在运行移动测试时使用）
- `multiRemoteBrowser`：`browser`或`driver`的别名，但仅针对[Multiremote](/docs/multiremote)会话设置
- `$`：获取元素的命令（更多信息请参见[API文档](/docs/api/browser/$)）
- `$$`：获取元素的命令（更多信息请参见[API文档](/docs/api/browser/$$)）
- `expect`：WebdriverIO的断言框架（参见[API文档](/docs/api/expect-webdriverio)）

__注意：__ WebdriverIO无法控制所使用的框架（例如Mocha或Jasmine）在引导其环境时设置的全局变量。