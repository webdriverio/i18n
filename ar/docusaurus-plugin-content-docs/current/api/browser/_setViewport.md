---
id: setViewport
title: ضبط عرض الشاشة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

يعيد تحجيم واجهة عرض المتصفح داخل المتصفح. على عكس `setWindowSize`،
يغير هذا الأمر حجم منفذ العرض، وليس حجم النافذة.

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
      <td>وسائط الأمر</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>عرض العرض بالبكسل</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>ارتفاع العرض بالبكسل</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>نسبة البكسل لمنفذ العرض</td>
    </tr>
  </tbody>
</table>

##### العائد

- **&lt;`Promise<void>`&gt;**