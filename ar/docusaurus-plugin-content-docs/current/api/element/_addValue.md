---
id: addValue
title: إضافة قيمة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

إضافة قيمة إلى عنصر الإدخال أو منطقة النص التي تم العثور عليها بواسطة المحدد المعطى.

:::info

إذا كنت ترغب في استخدام أحرف خاصة، على سبيل المثال، لنسخ ولصق قيمة من مدخل إلى آخر، استخدم
أمر [`keys`](/docs/api/browser/keys).

:::

##### الاستخدام

```js
$(selector).addValue(value)
```

##### المعاملات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>القيمة المراد إضافتها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```