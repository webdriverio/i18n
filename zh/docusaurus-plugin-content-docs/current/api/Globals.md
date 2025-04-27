---
id: globals
title: 全局变量
---

在你的测试文件中，WebdriverIO 会将以下方法和对象放入全局环境中。你无需导入任何内容即可使用它们。然而，如果你更喜欢显式导入，你可以使用 `import { browser, $, $$, expect } from '@wdio/globals'` 并在 WDIO 配置中设置 `injectGlobals: false`。

如果没有另外配置，将设置以下全局对象：

- `browser`：WebdriverIO [Browser 对象](https://webdriver.io/docs/api/browser)
- `driver`：`browser` 的别名（在运行移动测试时使用）
- `multiremotebrowser`：`browser` 或 `driver` 的别名，但仅为 [Multiremote](/docs/multiremote) 会话设置
- `$`：用于获取元素的命令（更多信息请参见 [API 文档](/docs/api/browser/$)）
- `$$`：用于获取元素的命令（更多信息请参见 [API 文档](/docs/api/browser/$$)）
- `expect`：WebdriverIO 的断言框架（参见 [API 文档](/docs/api/expect-webdriverio)）

__注意：__ WebdriverIO 无法控制所使用的框架（例如 Mocha 或 Jasmine）在引导其环境时设置的全局变量。