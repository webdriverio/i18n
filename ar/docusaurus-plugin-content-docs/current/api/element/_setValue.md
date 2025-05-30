---
id: setValue
title: تحديد القيمة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

إرسال سلسلة من ضغطات المفاتيح إلى عنصر بعد مسح المُدخل أولاً. إذا لم يكن هناك حاجة لمسح العنصر أولاً، فاستخدم [`addValue`](/docs/api/element/addValue).

:::info

إذا كنت ترغب في استخدام أحرف خاصة، على سبيل المثال، لنسخ ولصق قيمة من حقل إدخال إلى آخر، استخدم الأمر
[`keys`](/docs/api/browser/keys).

:::

##### الاستخدام

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```