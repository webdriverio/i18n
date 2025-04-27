---
id: ocr-testing
title: OCR 测试
---

在移动原生应用和桌面网站上进行自动化测试时，当处理缺乏唯一标识符的元素时可能特别具有挑战性。标准的 [WebdriverIO 选择器](https://webdriver.io/docs/selectors) 可能并不总是能帮到你。这时就需要 `@wdio/ocr-service` 了，这是一项强大的服务，它利用 OCR（[光学字符识别](https://en.wikipedia.org/wiki/Optical_character_recognition)）来搜索、等待和与基于**可见文本**的屏幕元素进行交互。

以下自定义命令将被提供并添加到 `browser/driver` 对象中，这样你就能获得合适的工具来完成你的工作。

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### 它是如何工作的

这项服务将：

1. 创建屏幕/设备的截图。（如有需要，你可以提供一个搜索区域，可以是一个元素或矩形对象，以精确定位特定区域。请参阅每个命令的文档。）
1. 通过将截图转换为黑白高对比度的图像来优化 OCR 结果（高对比度是为了防止大量图像背景噪音。这可以根据每个命令进行自定义。）
1. 使用来自 [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) 的[光学字符识别](https://en.wikipedia.org/wiki/Optical_character_recognition)来获取屏幕上的所有文本，并在图像上高亮显示所有找到的文本。它可以支持多种语言，可以在[这里](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)找到。
1. 使用 [Fuse.js](https://fusejs.io/) 的模糊逻辑来查找与给定模式_大致相等_的字符串（而不是完全相等）。这意味着例如搜索值 `Username` 也可以找到文本 `Usename`，反之亦然。
1. 提供一个命令行向导（`npx ocr-service`）通过你的终端验证图像并获取文本

步骤 1、2 和 3 的示例可以在下图中找到

![处理步骤](/img/ocr/processing-steps.jpg)

它可以在**零**系统依赖（除了 WebdriverIO 使用的依赖）的情况下工作，但如果需要，它也可以与 [Tesseract](https://tesseract-ocr.github.io/tessdoc/) 的本地安装一起工作，这将大大减少执行时间！（另请参阅[测试执行优化](#test-execution-optimization)了解如何加速你的测试。）

感兴趣吗？今天就通过遵循[入门指南](./getting-started)开始使用它。

:::caution 重要
有很多原因可能导致你无法从 Tesseract 获得高质量的输出。与你的应用和此模块相关的最大原因之一可能是文本和背景之间缺乏适当的颜色区分。例如，深色背景上的白色文本_很容易_被找到，但白色背景上的浅色文本或深色背景上的深色文本几乎无法找到。

更多来自 Tesseract 的信息请参见[此页面](https://tesseract-ocr.github.io/tessdoc/ImproveQuality)。

另外别忘了阅读[常见问题](./ocr-faq)。
:::