---
id: setViewport
title: تعيين منفذ العرض
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

يغير حجم منفذ العرض في المتصفح. على عكس `setWindowSize`، هذا الأمر يغير حجم منفذ العرض، وليس حجم النافذة.

##### الاستخدام

```js
browser.setViewport({ width, height, devicePixelRatio })
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
      <td><code><var>options</var></code></td>
      <td>`SetViewportOptions`</td>
      <td>معلمات الأمر</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>عرض منفذ العرض بالبكسل</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>ارتفاع منفذ العرض بالبكسل</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>نسبة البكسل لمنفذ العرض</td>
    </tr>
  </tbody>
</table>

##### القيمة المرجعة

- **&lt;`Promise<void>`&gt;**