---
id: deleteCookies
title: حذف ملفات تعريف الارتباط
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/deleteCookies.ts
---

حذف ملفات تعريف الارتباط المرئية للصفحة الحالية. من خلال توفير اسم ملف تعريف ارتباط
يتم إزالة ملف تعريف الارتباط الفردي فقط أو أكثر عند تمرير أسماء متعددة.

##### الاستخدام

```js
browser.deleteCookies(filter)
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
      <td><code><var>filter</var></code></td>
      <td>`StorageCookieFilter[]`</td>
      <td>استخدم خاصية التصفية لتحديد وحذف ملفات تعريف الارتباط المحددة بناءً على معايير المطابقة.</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L9-L29
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L31-L35
```