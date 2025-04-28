---
id: waitForDisplayed
title: انتظار العرض
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

انتظر ظهور أو عدم ظهور عنصر لمقدار معين من الميلي ثانية.

:::info

على عكس أوامر العناصر الأخرى، لن ينتظر WebdriverIO وجود العنصر لتنفيذ
هذا الأمر.

:::

##### الاستخدام

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`WaitForOptions`</td>
      <td>خيارات waitForDisplayed (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الوقت بالميلي ثانية (القيمة الافتراضية تستند إلى إعداد [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>إذا كانت القيمة صحيحة، فإنه ينتظر العكس (الافتراضي: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>إذا كانت موجودة فإنها تتجاوز رسالة الخطأ الافتراضية</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الفاصل الزمني بين الفحوصات (الافتراضي: `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>اضبط على `true` للانتظار حتى يتم عرض العنصر ضمن منفذ العرض (الافتراضي: `false`)</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### القيم المرجعة

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  صحيح    إذا تم عرض العنصر (أو لم يتم إذا تم تعيين العلامة)