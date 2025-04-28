---
id: waitForClickable
title: منتظر ماندن برای قابل کلیک شدن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

منتظر باشید تا یک عنصر برای مدت میلی ثانیه های مشخص شده قابل کلیک یا غیرقابل کلیک شود.

:::info

برخلاف سایر دستورات عنصر، WebdriverIO برای اجرای این دستور منتظر وجود عنصر نمی‌ماند.

:::

##### استفاده

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td>گزینه‌های waitForEnabled (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>زمان به میلی‌ثانیه (پیش‌فرض بر اساس مقدار پیکربندی [`waitforTimeout`](/docs/configuration#waitfortimeout) تنظیم می‌شود)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>اگر درست باشد، منتظر حالت مخالف می‌ماند (پیش‌فرض: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>اگر وجود داشته باشد، پیام خطای پیش‌فرض را لغو می‌کند</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>فاصله بین بررسی‌ها (پیش‌فرض: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** `true` اگر عنصر قابل کلیک باشد (یا نباشد اگر پرچم تنظیم شده باشد)