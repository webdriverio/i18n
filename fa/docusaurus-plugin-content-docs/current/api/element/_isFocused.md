---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

برگرداندن مقدار صحیح یا غلط اگر عنصر DOM انتخاب شده در حال حاضر فوکوس دارد. اگر انتخابگر با چندین عنصر مطابقت داشته باشد، در صورتی که یکی از عناصر فوکوس داشته باشد، مقدار صحیح برمی‌گرداند.

##### استفاده

```js
$(selector).isFocused()
```

##### مثال‌ها

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

##### برمی‌گرداند

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          صحیح اگر یکی از عناصر تطبیق داده شده فوکوس داشته باشد