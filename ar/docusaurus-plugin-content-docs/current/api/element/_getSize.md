---
id: getSize
title: الحصول على الحجم
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

الحصول على العرض والارتفاع لعنصر DOM.

##### الاستخدام

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>الحجم المراد استلامه [اختياري] ("width" أو "height")</td>
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

##### القيم المرجعة

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     حجم العنصر المطلوب (`{ width: <Number>, height: <Number> }`) أو العرض/الارتفاع الفعلي كرقم إذا تم تقديم معلمة prop