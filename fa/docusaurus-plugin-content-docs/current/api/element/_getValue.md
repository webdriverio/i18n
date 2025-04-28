---
id: getValue
title: getValue (دریافت مقدار)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

مقدار یک `<textarea>`، `<select>` یا `<input>` متنی که با انتخابگر مشخص شده پیدا می‌شود را دریافت می‌کند.
اگر چندین عنصر از طریق انتخابگر داده شده پیدا شوند، به جای آن یک آرایه از مقادیر برگردانده می‌شود.
برای ورودی‌های نوع چک‌باکس یا رادیو از isSelected استفاده کنید.

##### استفاده

```js
$(selector).getValue()
```

##### مثال‌ها

```html title="index.html"
<input type="text" value="John Doe" id="username">
```

```js title="getValue.js"
it('should demonstrate the getValue command', async () => {
    const inputUser = await $('#username');
    const value = await inputUser.getValue();
    console.log(value); // outputs: "John Doe"
});
```

##### برگشتی‌ها

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   مقدار عنصر(های) درخواست شده    