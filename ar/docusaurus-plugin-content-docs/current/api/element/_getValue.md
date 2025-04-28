---
id: getValue
title: الحصول على القيمة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

الحصول على قيمة عنصر `<textarea>` أو `<select>` أو `<input>` نصي تم العثور عليه بواسطة المحدد المعطى.
إذا تم العثور على عدة عناصر عبر المحدد المعطى، يتم إرجاع مصفوفة من القيم بدلاً من ذلك.
بالنسبة للإدخال من نوع checkbox أو radio استخدم isSelected.

##### الاستخدام

```js
$(selector).getValue()
```

##### أمثلة

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

##### العائد

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   قيمة العنصر (العناصر) المطلوبة    
```