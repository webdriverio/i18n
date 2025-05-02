---
id: dialog
title: Đối tượng Dialog
---

Các đối tượng Dialog được gửi đi bởi [`browser`](/docs/api/browser) thông qua sự kiện `browser.on('dialog')`.

Một ví dụ về việc sử dụng đối tượng Dialog:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // outputs: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Các hộp thoại được tự động đóng, trừ khi có trình lắng nghe `browser.on('dialog')`. Khi trình lắng nghe hiện diện, nó phải thực hiện [`dialog.accept()`](/docs/api/dialog/accept) hoặc [`dialog.dismiss()`](/docs/api/dialog/dismiss) cho hộp thoại - nếu không trang sẽ bị đóng băng khi chờ đợi hộp thoại, và các hành động như click sẽ không bao giờ hoàn thành.

:::