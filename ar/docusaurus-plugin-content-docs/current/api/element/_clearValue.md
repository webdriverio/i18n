---
id: clearValue
title: مسح القيمة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

مسح قيمة عنصر الإدخال أو منطقة النص. تأكد من أنك تستطيع التفاعل مع العنصر قبل استخدام هذا الأمر. لا يمكنك مسح عنصر إدخال معطل أو في وضع القراءة فقط.

##### الاستخدام

```js
$(selector).clearValue()
```

##### مثال

```js title="clearValue.js"
it('should demonstrate the clearValue command', async () => {
    const elem = await $('.input')
    await elem.setValue('test123')

    const value = await elem.getValue()
    console.log(value) // returns 'test123'

    await elem.clearValue()
    value = await elem.getValue()
    assert(value === ''); // true
})
```