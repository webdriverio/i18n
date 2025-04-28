---
id: isEqual
title: متساوي
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEqual.ts
---

إرجاع القيمة "صحيح" إذا كان العنصر المحدد يتطابق مع العنصر المقدم.

##### الاستخدام

```js
$(selector).isEqual(el)
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>el</var></code></td>
      <td>`Element`</td>
      <td>العنصر المراد المقارنة معه</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="isEqual.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    const sameEl = await $('#el')
    const anotherEl = await $('#anotherEl')

    el.isEqual(sameEl) // outputs: true

    el.isEqual(anotherEl) // outputs: false
});
```

##### النتائج

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**    صحيح إذا كانت العناصر متساوية