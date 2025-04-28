---
id: waitForExist
title: انتظار برای وجود
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

منتظر وجود یک عنصر در DOM برای مدت زمان مشخص شده به میلی‌ثانیه می‌ماند. اگر انتخابگر با حداقل یک عنصر موجود در DOM مطابقت داشته باشد، مقدار درست را برمی‌گرداند، در غیر این صورت خطا می‌دهد. اگر پرچم معکوس درست باشد، دستور در صورتی مقدار درست را برمی‌گرداند که انتخابگر با هیچ عنصری مطابقت نداشته باشد.

:::info

برخلاف سایر دستورات عنصر، WebdriverIO برای اجرای این دستور منتظر وجود عنصر نمی‌ماند.

:::

##### استفاده

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td>اگر درست باشد، منتظر حالت متضاد می‌ماند (پیش‌فرض: نادرست)</td>
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
  </tbody>
</table>

##### مثال

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### برگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  درست     اگر عنصر وجود داشته باشد (یا اگر پرچم تنظیم شده باشد، وجود نداشته باشد)