---
id: getComputedRole
title: الحصول على الدور المحسوب
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

الحصول على تسمية WAI-ARIA المحسوبة للعنصر.

##### الاستخدام

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

##### النتائج

- **&lt;String&gt;**
            **<code><var>return</var></code>:** تسمية WAI-ARIA المحسوبة