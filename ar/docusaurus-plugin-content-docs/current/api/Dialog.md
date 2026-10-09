---
id: dialog
title: كائن الحوار (Dialog)
---

يتم إرسال كائنات الحوار بواسطة [`browser`](/docs/api/browser) عبر حدث `browser.on('dialog')`.

مثال على استخدام كائن Dialog:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // المخرجات: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

يتم رفض مربعات الحوار تلقائيًا، ما لم يكن هناك مستمع واحد على الأقل من نوع `browser.on('dialog')` أو `browser.once('dialog')`. عند وجود مستمع، يجب عليه إما قبول الحوار عبر [`dialog.accept()`](/docs/api/dialog/accept) أو رفضه عبر [`dialog.dismiss()`](/docs/api/dialog/dismiss)، وإلا ستتجمد الصفحة في انتظار الحوار، ولن تكتمل الإجراءات مثل النقر أبدًا.

:::

:::info مربعات الحوار الأصلية على الأجهزة المحمولة

لا يتم إطلاق أحداث حوار المتصفح لمربعات حوار الأذونات الأصلية في iOS/Android. تعامل معها بدلاً من ذلك باستخدام [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) و[`browser.dismissDialog`](/docs/api/mobile/dismissDialog).

:::