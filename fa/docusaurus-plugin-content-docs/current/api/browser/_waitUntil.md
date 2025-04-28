---
id: waitUntil
title: انتظار تا
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

این دستور انتظار، اسلحه جهانی شما است اگر می‌خواهید برای چیزی منتظر بمانید. انتظار دارد یک شرط را بگیرد و منتظر می‌ماند تا آن شرط با یک مقدار درست محقق شود.

یک مثال رایج، انتظار تا زمانی است که یک عنصر خاص حاوی متن خاصی باشد (به مثال مراجعه کنید).

##### استفاده

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>شرطی که باید منتظر ماند تا مقدار درستی برگرداند</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`WaitUntilOptions`</td>
      <td>گزینه‌های دستور</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>زمان به میلی‌ثانیه (پیش‌فرض بر اساس مقدار پیکربندی [`waitforTimeout`](/docs/configuration#waitfortimeout) تنظیم می‌شود)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>پیام خطایی که هنگام اتمام زمان waitUntil نمایش داده می‌شود</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>فاصله بین بررسی‌های شرط (پیش‌فرض بر اساس مقدار پیکربندی [`waitforInterval`](/docs/configuration#waitforinterval) تنظیم می‌شود)</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  درست اگر شرط محقق شود