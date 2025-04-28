---
id: execute
title: اجرا کردن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

تزریق قطعه‌ای از جاوا اسکریپت به صفحه برای اجرا در زمینه فریمی که در حال حاضر انتخاب شده است.
فرض بر این است که اسکریپت اجرا شده همگام است و نتیجه ارزیابی اسکریپت به مشتری برگردانده می‌شود.

آرگومان اسکریپت، اسکریپتی را برای اجرا به شکل یک بدنه تابع تعریف می‌کند. مقداری که توسط
آن تابع برگردانده می‌شود به مشتری برگردانده خواهد شد. تابع با آرایه args ارائه شده فراخوانی می‌شود
و به مقادیر می‌توان از طریق شیء arguments به ترتیب مشخص شده دسترسی پیدا کرد.

آرگومان‌ها می‌توانند هر نوع JSON-primitive، آرایه یا شیء JSON باشند. اشیاء JSON که یک ارجاع WebElement را
تعریف می‌کنند به عنصر DOM مربوطه تبدیل می‌شوند. به همین ترتیب، هر WebElement در نتیجه اسکریپت
به عنوان اشیاء JSON از نوع WebElement به مشتری برگردانده می‌شوند.

##### استفاده

```js
browser.execute(script, arguments)
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

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### مقادیر بازگشتی

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتیجه اسکریپت.