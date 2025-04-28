---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$$.ts
---

دستور `react$$` یک دستور مفید برای پرس‌وجوی چندین کامپوننت React بر اساس نام واقعی آنها و فیلتر کردن آنها بر اساس props و state است.

:::info

این دستور فقط با برنامه‌هایی که از React نسخه ۱۶.x استفاده می‌کنند کار می‌کند. در مورد انتخاب‌گرهای React در راهنمای [Selectors](/docs/selectors#react-selectors) بیشتر بخوانید.

:::

##### استفاده

```js
$(selector).react$$(selector, { props, state })
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
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>کامپوننت React</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>گزینه‌های انتخاب‌گر React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Object`</td>
      <td>props های React که عنصر باید شامل آنها باشد</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>state های React که عنصر باید در آن باشد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');

    const orangeButtons = await browser.react$$('t', {
        props: { orange: true }
    })
    console.log(await orangeButtons.map((btn) => btn.getText()));
    // prints "[ '÷', 'x', '-', '+', '=' ]"
});
```

##### برگشتی

- **&lt;WebdriverIO.ElementArray&gt;**