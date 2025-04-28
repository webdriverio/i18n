---
id: executeAsync
title: اجرای ناهمگام
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
دستور `executeAsync` منسوخ شده است و در نسخه‌های آینده حذف خواهد شد.
لطفاً به جای آن از دستور `execute` استفاده کنید زیرا پشتیبانی بهتری برای
مدیریت خطا از طریق `async`/`await` ارائه می‌دهد.
:::

یک قطعه کد جاوااسکریپت را در صفحه برای اجرا در زمینه فریم فعلی انتخاب شده تزریق می‌کند
با استفاده از المان داده شده به عنوان محدوده، از آنجایی که در محدوده المان است، به این معنی است که WebdriverIO 
به طور خودکار منتظر وجود المان می‌ماند قبل از اجرای اسکریپت.
اسکریپت اجرا شده به صورت ناهمگام فرض می‌شود و باید با فراخوانی callback ارائه شده،
که همیشه به عنوان آخرین آرگومان به تابع ارائه می‌شود، پایان کار خود را اعلام کند. مقدار
بازگشتی به این callback به کلاینت برگردانده خواهد شد.

دستورات اسکریپت ناهمگام ممکن است بارگذاری صفحه را در بر نگیرند. اگر رویداد unload در حین انتظار
برای نتیجه اسکریپت فعال شود، یک خطا به کلاینت برگردانده خواهد شد.

آرگومان اسکریپت، اسکریپت را برای اجرا به شکل بدنه تابع تعریف می‌کند. تابع با
آرایه args ارائه شده فراخوانی می‌شود و مقادیر ممکن است از طریق شیء arguments در ترتیب
مشخص شده دسترسی داشته باشند. آخرین آرگومان همیشه یک تابع callback خواهد بود که باید فراخوانی شود
تا نشان دهد که اسکریپت به پایان رسیده است.

آرگومان‌ها می‌توانند هر نوع JSON-primitive، آرایه یا شیء JSON باشند. اشیاء JSON که یک ارجاع WebElement را
تعریف می‌کنند به عنصر DOM مربوطه تبدیل خواهند شد. به همین ترتیب، هر WebElement در نتیجه
اسکریپت به کلاینت به عنوان اشیاء JSON WebElement برگردانده خواهد شد.

:::caution

لطفاً به جای آن از `execute` استفاده کنید
:::

##### استفاده

```js
$(selector).executeAsync(script, arguments)
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
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### مقادیر بازگشتی

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتیجه اسکریپت.