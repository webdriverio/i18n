---
id: getComputedLabel
title: دریافت برچسب محاسبه شده
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

دریافت برچسب WAI-ARIA محاسبه شده یک عنصر.

##### استفاده

```js
$(selector).getComputedLabel()
```

##### مثال

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### برگشت

- **&lt;String&gt;**
            **<code><var>return</var></code>:** برچسب WAI-ARIA محاسبه شده