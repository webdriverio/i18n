---
id: setValue
title: تنظیم مقدار
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

ارسال یک توالی از کلیدها به یک عنصر پس از پاک کردن ورودی قبلی. اگر عنصر نیازی به پاک شدن ابتدایی ندارد، از [`addValue`](/docs/api/element/addValue) استفاده کنید.

:::info

اگر می‌خواهید از کاراکترهای ویژه استفاده کنید، مثلاً برای کپی و پیست یک مقدار از یک ورودی به ورودی دیگر، از دستور 
[`keys`](/docs/api/browser/keys) استفاده کنید.

:::

##### استفاده

```js
$(selector).setValue(value)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>مقداری که باید اضافه شود</td>
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