---
id: isEnabled
title: isEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEnabled.ts
---

إرجاع القيمة صحيح أو خطأ إذا كان عنصر DOM المحدد ممكّنًا.

##### الاستخدام

```js
$(selector).isEnabled()
```

##### أمثلة

```html title="index.html"
<input type="text" name="inputField" class="input1">
<input type="text" name="inputField" class="input2" disabled>
<input type="text" name="inputField" class="input3" disabled="disabled">

```

```js title="isEnabled.js"
it('should detect if an element is enabled', async () => {
    let elem = await $('.input1')
    let isEnabled = await elem.isEnabled();
    console.log(isEnabled); // outputs: true

    elem = await $('.input2')
    isEnabled = await elem.isEnabled();
    console.log(isEnabled2); // outputs: false

    elem = await $('.input3')
    isEnabled = await elem.isEnabled();
    console.log(isEnabled3); // outputs: false
});
```

##### القيم المرجعة

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  صحيح إذا كان العنصر/العناصر ممكّنًا/ممكّنة