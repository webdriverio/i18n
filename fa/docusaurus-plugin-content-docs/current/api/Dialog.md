---
id: dialog
title: شی دیالوگ
---

اشیاء دیالوگ توسط [`browser`](/docs/api/browser) از طریق رویداد `browser.on('dialog')` ارسال می‌شوند.

مثالی از استفاده از شی دیالوگ:

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

دیالوگ‌ها به طور خودکار رد می‌شوند، مگر اینکه شنونده `browser.on('dialog')` وجود داشته باشد. هنگامی که شنونده حاضر است، باید دیالوگ را یا با [`dialog.accept()`](/docs/api/dialog/accept) یا با [`dialog.dismiss()`](/docs/api/dialog/dismiss) پاسخ دهد - در غیر این صورت صفحه منتظر دیالوگ منجمد می‌شود، و اقداماتی مانند کلیک هرگز به پایان نمی‌رسند.

:::