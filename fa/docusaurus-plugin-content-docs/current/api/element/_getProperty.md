---
id: getProperty
title: دریافت خاصیت
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

دستور دریافت خاصیت عنصر، نتیجه دریافت یک خاصیت از یک عنصر را برمی‌گرداند.

##### استفاده

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>نام خاصیت عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### مقادیر بازگشتی

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** مقدار خاصیت عنصر انتخاب شده