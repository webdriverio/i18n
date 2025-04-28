---
id: getComputedRole
title: دریافت نقش محاسبه شده
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

دریافت برچسب WAI-ARIA محاسبه شده یک عنصر.

##### استفاده

```js
$(selector).getComputedRole()
```

##### مثال

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### مقادیر بازگشتی

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  برچسب WAI-ARIA محاسبه شده