---
id: setWindowSize
title: تغيير حجم النافذة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

يعيد تحجيم الحجم الخارجي لنافذة المتصفح وفقًا للعرض والارتفاع المقدمين. بناءً على نظام التشغيل الخاص بك، قد لا تسمح بعض نوافذ المتصفح بعرض أقل من `500px`. إذا كنت ترغب في محاكاة طريقة عرض جهاز مثل iPhone، فعليك النظر في استخدام أمر `setViewport`.

##### الاستخدام

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>سيتم تغيير حجم المتصفح إلى العرض المقدم</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>سيتم تغيير حجم المتصفح إلى الارتفاع المقدم</td>
    </tr>
  </tbody>
</table>

##### القيم المرجعة

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  Null لمتصفحات *NO*W3C و Object `{x, y, width, height}` لمتصفحات W3C