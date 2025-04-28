---
id: selectByVisibleText
title: انتخاب بر اساس متن قابل مشاهده
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/selectByVisibleText.ts
---

انتخاب گزینه با متن نمایش داده شده که با آرگومان مطابقت دارد.

##### استفاده

```js
$(selector).selectByVisibleText(text)
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
      <td><code><var>text</var></code></td>
      <td>`String, Number`</td>
      <td>متن عنصر گزینه برای انتخاب</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```html title="example.html"
<select id="selectbox">
    <option value="someValue0">uno</option>
    <option value="someValue1">dos</option>
    <option value="someValue2">tres</option>
    <option value="someValue3">cuatro</option>
    <option value="someValue4">cinco</option>
    <option value="someValue5">seis</option>
</select>
```

```js title="selectByVisibleText.js"
it('demonstrate the selectByVisibleText command', async () => {
    const selectBox = await $('#selectbox');
    console.log(await selectBox.getText('option:checked')); // returns "uno"
    await selectBox.selectByVisibleText('cuatro');
    console.log(await selectBox.getText('option:checked')); // returns "cuatro"
})
```