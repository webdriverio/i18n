---
id: execute
title: اجرا کردن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

تزریق تکه‌ای از جاوااسکریپت به صفحه برای اجرا در محتوای فریم فعلی انتخاب شده
با استفاده از عنصر داده شده به عنوان دامنه، زیرا در دامنه عنصر قرار دارد به این معنی است که WebdriverIO
به طور خودکار منتظر وجود عنصر می‌ماند قبل از اجرای اسکریپت.
اسکریپت اجرا شده، همگام در نظر گرفته می‌شود و نتیجه ارزیابی اسکریپت به کلاینت
برگردانده می‌شود.

آرگومان اسکریپت، اسکریپتی را برای اجرا در قالب بدنه تابع تعریف می‌کند. مقداری که توسط
آن تابع برگردانده می‌شود به کلاینت برگردانده خواهد شد. تابع با آرایه args ارائه شده فراخوانی می‌شود
و مقادیر می‌توانند از طریق شیء arguments به ترتیب مشخص شده دسترسی داشته باشند.

آرگومان‌ها می‌توانند هر نوع JSON-primitive، آرایه یا شیء JSON باشند. اشیاء JSON که یک مرجع WebElement را
تعریف می‌کنند به عنصر DOM مربوطه تبدیل می‌شوند. به همین ترتیب، هر WebElement در نتیجه اسکریپت
به عنوان اشیاء JSON WebElement به کلاینت برگردانده خواهند شد.

##### استفاده

```js
$(selector).execute(script, arguments)
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
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### مقادیر بازگشتی

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتیجه اسکریپت.