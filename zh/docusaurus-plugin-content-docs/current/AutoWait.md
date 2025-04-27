---
id: autowait
title: 自动等待
---

当使用直接与元素交互的命令时，WebdriverIO 会自动等待元素可见且可交互，使用这些命令时不需要手动等待（如 click、setValue 等）。
当满足 [isClickable](https://webdriver.io/docs/api/element/isClickable) 的条件时，元素被认为是可交互的。

虽然 WebdriverIO 会自动等待元素变得可交互，但在少数情况下，你可能需要手动等待。对于这些罕见的情况，我们提供了诸如 [`waitForDisplayed`](/docs/api/element/waitForDisplayed) 等命令。


## 隐式超时（不推荐）

虽然我们不推荐使用这种方法，但 WebDriver 协议提供了[隐式超时](https://w3c.github.io/webdriver/#timeouts)，允许指定驱动程序应该等待元素出现的时间。默认情况下，此超时设置为 `0`，因此如果在页面上找不到元素，驱动程序会立即返回 `no such element` 错误。使用 [`setTimeout`](/docs/api/browser/setTimeout) 增加此超时时间会使驱动程序等待，并增加元素最终显示的可能性。

:::note

在[超时指南](/docs/timeouts)中了解更多关于 WebDriver 和框架相关的超时信息

:::