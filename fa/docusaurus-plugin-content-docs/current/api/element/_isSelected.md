---
id: isSelected
title: انتخاب شده است
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isSelected.ts
---

مقدار درست یا نادرست را باز می‌گرداند که آیا یک عنصر `<option>` یا `<input>` از نوع 
چک باکس یا رادیو در حال حاضر انتخاب شده است یا خیر.

##### استفاده

```js
$(selector).isSelected()
```

##### مثال‌ها

```html title="index.html"
<select name="selectbox" id="selectbox">
    <option value="John Doe">John Doe</option>
    <option value="Layla Terry" selected="selected">Layla Terry</option>
    <option value="Bill Gilbert">Bill Gilbert"</option>
</select>

```

```js title="isSelected.js"
it('should detect if an element is selected', async () => {
    let element = await $('[value="Layla Terry"]');
    console.log(await element.isSelected()); // outputs: true

    element = await $('[value="Bill Gilbert"]')
    console.log(await element.isSelected()); // outputs: false
});
```

##### بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  درست اگر عنصر انتخاب شده باشد