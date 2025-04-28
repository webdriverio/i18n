---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

قم بإرجاع القيمة true أو false إذا كان عنصر DOM المحدد يحتوي على التركيز حالياً. إذا كان المحدد يطابق
عناصر متعددة، سيعود بقيمة true إذا كان أحد العناصر لديه التركيز.

##### الاستخدام

```js
$(selector).isFocused()
```

##### أمثلة

```html title="index.html"
<input name="login" autofocus="" />
```

```js title="hasFocus.js"
it('should detect the focus of an element', async () => {
    await browser.url('/');
    const loginInput = await $('[name="login"]');
    console.log(await loginInput.isFocused()); // outputs: false

    await loginInput.click();
    console.log(await loginInput.isFocused()); // outputs: true
})
```

##### العوائد

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          true إذا كان أحد العناصر المطابقة لديه التركيز