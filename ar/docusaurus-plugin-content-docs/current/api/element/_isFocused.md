---
id: isFocused
title: هل في التركيز
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

إرجاع صواب أو خطأ إذا كان عنصر DOM المحدد في حالة تركيز حاليًا. إذا كان المحدد يطابق
عناصر متعددة، فسيعيد صواب إذا كان أحد العناصر في حالة تركيز.

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
            **<code><var>return</var></code>:**          صواب إذا كان أحد العناصر المطابقة في حالة تركيز