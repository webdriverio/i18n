---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

زمان‌های انتظار مرتبط با نشست فعلی را تنظیم می‌کند. مدت زمان وقفه‌ها رفتارهایی مانند زمان انتظار برای تزریق اسکریپت، ناوبری سند و بازیابی عنصر را کنترل می‌کند.
برای اطلاعات بیشتر و مثال‌ها، [راهنمای زمان انتظار](https://webdriver.io/docs/timeouts#selenium-timeouts) را ببینید.

:::info

توصیه نمی‌شود که زمان انتظار `implicit` را تنظیم کنید زیرا بر رفتار WebdriverIO تأثیر می‌گذارد 
و می‌تواند در برخی دستورات باعث بروز خطا شود، مانند `waitForExist` با پرچم معکوس.

:::

##### استفاده

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>شیء حاوی مقادیر زمان انتظار نشست</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>زمان به میلی‌ثانیه برای تلاش مجدد استراتژی مکان‌یابی عنصر هنگام پیدا کردن یک عنصر.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>زمان به میلی‌ثانیه برای انتظار جهت تکمیل بارگذاری سند.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>اسکریپت‌هایی که با [`execute`](https://webdriver.io/docs/api/browser/execute) یا [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) تزریق می‌شوند تا زمانی که به مدت زمان وقفه اسکریپت برسند اجرا می‌شوند، که آن هم به میلی‌ثانیه داده می‌شود.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```