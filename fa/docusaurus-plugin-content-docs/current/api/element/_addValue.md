---
id: addValue
title: اضافه کردن مقدار
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

اضافه کردن مقدار به یک المنت ورودی یا متن که توسط انتخابگر مشخص شده است.

:::info

اگر می‌خواهید از کاراکترهای ویژه استفاده کنید، به عنوان مثال برای کپی و پیست کردن یک مقدار از یک ورودی به ورودی دیگر، از دستور
[`keys`](/docs/api/browser/keys) استفاده کنید.

:::

##### استفاده

```js
$(selector).addValue(value)
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

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```