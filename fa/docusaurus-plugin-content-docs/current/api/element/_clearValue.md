---
id: clearValue
title: پاک کردن مقدار
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

مقدار یک عنصر ورودی یا منطقه متنی را پاک کنید. اطمینان حاصل کنید که قبل از استفاده از این دستور می‌توانید با عنصر تعامل داشته باشید. شما نمی‌توانید عنصر ورودی که غیرفعال است یا در حالت فقط-خواندنی قرار دارد را پاک کنید.

##### استفاده

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