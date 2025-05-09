---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

هذا الأمر للانتظار هو سلاحك الشامل إذا كنت ترغب في الانتظار لشيء ما. يتوقع شرطاً وينتظر حتى يتم استيفاء هذا الشرط بقيمة صحيحة يتم إرجاعها.

مثال شائع هو الانتظار حتى يحتوي عنصر معين على نص معين (انظر المثال).

##### الاستخدام

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>الشرط المراد الانتظار حتى يرجع قيمة صحيحة</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`WaitUntilOptions`</td>
      <td>خيارات الأمر</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الوقت بالمللي ثانية (الافتراضي معتمد على قيمة التكوين [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>رسالة الخطأ التي تظهر عند انتهاء مهلة waitUntil</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الفاصل الزمني بين فحوصات الشرط (الافتراضي معتمد على قيمة التكوين [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### العائد

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  صحيح إذا تم استيفاء الشرط