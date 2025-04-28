---
id: waitUntil
title: صبرکردن تا
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

این دستور انتظار، سلاح همه‌منظوره شما است اگر می‌خواهید منتظر چیزی بمانید. این دستور یک شرط می‌گیرد و منتظر می‌ماند تا آن شرط با یک مقدار صحیح برآورده شود.

:::info

برخلاف سایر دستورات المان، WebdriverIO منتظر نمی‌ماند که المان وجود داشته باشد تا این دستور را اجرا کند.

:::

یک مثال رایج، انتظار تا زمانی است که یک المان خاص، شامل یک متن خاص شود (به مثال نگاه کنید).

##### استفاده

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td>شرط برای انتظار</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`WaitUntilOptions`</td>
      <td>گزینه‌های دستور</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>زمان به میلی‌ثانیه (مقدار پیش‌فرض بر اساس [`waitforTimeout`](/docs/configuration#waitfortimeout) در پیکربندی تنظیم شده است)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>پیام خطایی که هنگام اتمام زمان waitUntil نمایش داده می‌شود</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>فاصله زمانی بین بررسی‌های شرط (مقدار پیش‌فرض بر اساس [`waitforInterval`](/docs/configuration#waitforinterval) در پیکربندی تنظیم شده است)</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### خروجی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** صحیح اگر شرط برآورده شود