---
id: dialog
title: شیء گفتگو
---

اشیاء گفتگو توسط [`browser`](/docs/api/browser) از طریق رویداد `browser.on('dialog')` ارسال می‌شوند.

مثالی از استفاده از شیء Dialog:

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

گفتگوها به صورت خودکار رد می‌شوند، مگر اینکه یک شنونده `browser.on('dialog')` وجود داشته باشد. وقتی شنونده حاضر است، باید گفتگو را یا با [`dialog.accept()`](/docs/api/dialog/accept) یا با [`dialog.dismiss()`](/docs/api/dialog/dismiss) پاسخ دهد - در غیر این صورت صفحه در انتظار گفتگو منجمد می‌شود، و اقداماتی مانند کلیک هرگز تمام نخواهند شد.

:::