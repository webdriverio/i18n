---
id: waitForEnabled
title: منتظر فعال شدن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

منتظر ماندن برای یک عنصر (انتخاب شده توسط انتخابگر css) به مدت زمان مشخص شده
به میلی‌ثانیه تا (غیر/فعال) شود. اگر چندین عنصر با انتخابگر داده شده پرس و جو شوند، اگر حداقل یک عنصر (غیر/فعال) باشد، مقدار true برمی‌گرداند.

:::info

برخلاف سایر دستورات عنصر، WebdriverIO برای اجرای این دستور منتظر وجود عنصر
نمی‌ماند.

:::

##### استفاده

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td>زمان به میلی‌ثانیه (مقدار پیش‌فرض بر اساس مقدار پیکربندی [`waitforTimeout`](/docs/configuration#waitfortimeout) تنظیم می‌شود)</td>
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

##### مثال‌ها

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** true اگر عنصر (غیر/فعال) باشد