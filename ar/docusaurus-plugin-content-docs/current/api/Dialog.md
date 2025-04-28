---
id: dialog
title: كائن الحوار
---

يتم إرسال كائنات الحوار بواسطة [`browser`](/docs/api/browser) عبر حدث `browser.on('dialog')`.

مثال على استخدام كائن الحوار:

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

يتم رفض مربعات الحوار تلقائيًا، ما لم يكن هناك مستمع `browser.on('dialog')`. عندما يكون المستمع موجودًا، يجب عليه إما قبول الحوار باستخدام [`dialog.accept()`](/docs/api/dialog/accept) أو رفضه باستخدام [`dialog.dismiss()`](/docs/api/dialog/dismiss) - وإلا ستتجمد الصفحة بانتظار الحوار، ولن تكتمل أبدًا إجراءات مثل النقر.

:::