---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

سيقوم أمر الحصول على خاصية العنصر بإرجاع نتيجة الحصول على خاصية من عنصر.

##### الاستخدام

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>اسم خاصية العنصر</td>
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

##### النتائج

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** قيمة خاصية العنصر المحدد