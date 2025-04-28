---
id: saveScreenshot
title: حفظ لقطة الشاشة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

احفظ لقطة شاشة لعنصر ما كملف PNG على نظام التشغيل الخاص بك.

##### الاستخدام

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>المسار إلى الصورة المنشأة (لاحقة `.png` مطلوبة) بالنسبة إلى دليل التنفيذ</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### الإرجاع

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             مخزن لقطة الشاشة