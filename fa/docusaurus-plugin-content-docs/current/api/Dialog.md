---
id: dialog
title: شیء Dialog
---

اشیاء Dialog توسط [`browser`](/docs/api/browser) از طریق رویداد `browser.on('dialog')` ارسال می‌شوند.

نمونه‌ای از استفاده از شیء Dialog:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // خروجی: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

دیالوگ‌ها به‌طور خودکار رد می‌شوند، مگر اینکه حداقل یک شنونده `browser.on('dialog')` یا `browser.once('dialog')` وجود داشته باشد. هنگامی که یک شنونده وجود دارد، باید دیالوگ را با [`dialog.accept()`](/docs/api/dialog/accept) بپذیرد یا با [`dialog.dismiss()`](/docs/api/dialog/dismiss) رد کند - در غیر این صورت صفحه در انتظار دیالوگ متوقف می‌شود و اقداماتی مانند کلیک هرگز به پایان نمی‌رسند.

:::

:::info دیالوگ‌های بومی موبایل

رویدادهای دیالوگ مرورگر برای دیالوگ‌های مجوز بومی iOS/Android منتشر نمی‌شوند. به جای آن، این دیالوگ‌ها را با [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) و [`browser.dismissDialog`](/docs/api/mobile/dismissDialog) مدیریت کنید.

:::