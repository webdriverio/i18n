---
id: getLocation
title: دریافت موقعیت
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

تعیین موقعیت یک عنصر در صفحه. نقطه (0، 0) به گوشه بالا سمت چپ صفحه اشاره دارد.

##### استفاده

```js
$(selector).getLocation(prop)
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
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>می‌تواند "x" یا "y" باشد تا مستقیماً یک مقدار نتیجه برای سهولت در تأیید به دست آید</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="getLocation.js"
it('should demonstrate the getLocation function', async () => {
    await browser.url('http://github.com');
    const logo = await $('.octicon-mark-github')
    const location = await logo.getLocation();
    console.log(location); // outputs: { x: 150, y: 20 }

    const xLocation = await logo.getLocation('x')
    console.log(xLocation); // outputs: 150

    const yLocation = await logo.getLocation('y')
    console.log(yLocation); // outputs: 20
});
```

##### برگشت

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   مختصات X و Y برای عنصر در صفحه `{x:number, y:number}`