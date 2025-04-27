---
id: dialog
title: 对话框对象
---

对话框对象由[`browser`](/docs/api/browser)通过`browser.on('dialog')`事件分发。

使用对话框对象的示例：

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // 输出："Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

对话框会自动被关闭，除非存在`browser.on('dialog')`监听器。当存在监听器时，必须通过[`dialog.accept()`](/docs/api/dialog/accept)或[`dialog.dismiss()`](/docs/api/dialog/dismiss)来处理对话框 - 否则页面将冻结等待对话框，且像点击这样的操作将永远无法完成。

:::