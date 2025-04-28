---
id: getComputedLabel
title: الحصول على التسمية المحسوبة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

الحصول على تسمية WAI-ARIA المحسوبة لعنصر ما.

##### الاستخدام

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

##### العائدات

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  تسمية WAI-ARIA المحسوبة