---
id: getSize
title: دریافت اندازه
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

دریافت عرض و ارتفاع برای یک عنصر DOM.

##### نحوه استفاده

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>اندازه‌ای که می‌خواهید دریافت کنید [اختیاری] ("width" یا "height")</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="getSize.js"
it('should demonstrate the getSize command', async () => {
    await browser.url('http://github.com')
    const logo = await $('.octicon-mark-github')

    const size = await logo.getSize()
    console.log(size) // outputs: { width: 32, height: 32 }

    const width = await logo.getSize('width')
    console.log(width) // outputs: 32

    const height = await logo.getSize('height')
    console.log(height) // outputs: 32
})
```

##### مقادیر بازگشتی

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     اندازه عنصر درخواست شده (`{ width: <Number>, height: <Number> }`) یا عرض/ارتفاع واقعی به صورت عدد اگر پارامتر prop داده شده باشد