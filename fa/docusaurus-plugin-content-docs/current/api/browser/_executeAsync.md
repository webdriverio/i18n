---
id: executeAsync
title: اجرای ناهمگام
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
دستور `executeAsync` منسوخ شده است و در نسخه‌های آینده حذف خواهد شد.
لطفا به جای آن از دستور `execute` استفاده کنید زیرا پشتیبانی بهتری برای
مدیریت خطا از طریق `async`/`await` ارائه می‌دهد.
:::

یک قطعه جاوااسکریپت را در صفحه تزریق می‌کند تا در زمینه فریم انتخاب شده فعلی اجرا شود. اسکریپت اجرا شده ناهمگام فرض می‌شود و باید با فراخوانی کال‌بک ارائه شده، که همیشه به عنوان آخرین آرگومان تابع فراهم می‌شود، پایان خود را اعلام کند. مقداری که به این کال‌بک داده می‌شود به کلاینت برگردانده خواهد شد.

دستورات اسکریپت ناهمگام نمی‌توانند بارگذاری صفحه را در بر بگیرند. اگر رویداد تخلیه (unload) در حین انتظار برای نتیجه اسکریپت فعال شود، یک خطا به کلاینت برگردانده خواهد شد.

آرگومان اسکریپت، اسکریپتی را که باید اجرا شود به شکل بدنه تابع تعریف می‌کند. تابع با آرایه `args` فراهم شده فراخوانی می‌شود و مقادیر می‌توانند از طریق شی `arguments` به ترتیب مشخص شده دسترسی پیدا کنند. آخرین آرگومان همیشه یک تابع کال‌بک خواهد بود که باید فراخوانی شود تا نشان دهد که اسکریپت به پایان رسیده است.

آرگومان‌ها می‌توانند هر نوع JSON-primitive، آرایه یا شی JSON باشند. اشیاء JSON که یک مرجع WebElement را تعریف می‌کنند به عنصر DOM متناظر تبدیل خواهند شد. به همین ترتیب، هر WebElement در نتیجه اسکریپت به عنوان اشیاء JSON WebElement به کلاینت برگردانده خواهد شد.

:::caution

لطفاً به جای آن از `execute` استفاده کنید
:::

##### استفاده

```js
browser.executeAsync(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>اسکریپتی که باید اجرا شود.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`*`</td>
      <td>آرگومان‌های اسکریپت</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### برگشت

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتیجه اسکریپت.