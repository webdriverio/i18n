---
id: getLocation
title: الحصول على الموقع
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

تحديد موقع العنصر على الصفحة. النقطة (0, 0) تشير إلى
الزاوية العلوية اليسرى من الصفحة.

##### الاستخدام

```js
$(selector).getLocation(prop)
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
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>يمكن أن تكون "x" أو "y" للحصول على قيمة النتيجة مباشرة لتسهيل التأكيدات</td>
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

##### العائد

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   إحداثيات X و Y للعنصر على الصفحة `{x:number, y:number}`