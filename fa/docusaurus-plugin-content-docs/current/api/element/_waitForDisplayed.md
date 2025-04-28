---
id: waitForDisplayed
title: انتظار برای نمایش
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

منتظر بماند تا یک عنصر برای مدت زمان مشخص شده به میلی‌ثانیه نمایش داده شود یا نمایش داده نشود.

:::info

برخلاف سایر دستورات عنصر، WebdriverIO برای اجرای این دستور منتظر وجود عنصر نخواهد ماند.

:::

##### استفاده

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`WaitForOptions`</td>
      <td>گزینه‌های waitForDisplayed (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>زمان به میلی‌ثانیه (پیش‌فرض بر اساس مقدار پیکربندی [`waitforTimeout`](/docs/configuration#waitfortimeout) تنظیم می‌شود)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>اگر true باشد منتظر حالت مخالف می‌ماند (پیش‌فرض: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>اگر وجود داشته باشد، پیام خطای پیش‌فرض را جایگزین می‌کند</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>فاصله بین بررسی‌ها (پیش‌فرض: `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>برای انتظار تا زمانی که عنصر در ویوپورت نمایش داده شود، به `true` تنظیم کنید (پیش‌فرض: `false`)</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true    اگر عنصر نمایش داده شود (یا نشود اگر پرچم تنظیم شده باشد)    