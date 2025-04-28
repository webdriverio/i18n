---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$.ts
---

دستور `react$` یک دستور مفید برای جستجوی کامپوننت‌های React با نام واقعی آنها و فیلتر کردن آنها بر اساس props و state است.

:::info

این دستور فقط با برنامه‌هایی که از React نسخه ۱۶.x استفاده می‌کنند کار می‌کند. اطلاعات بیشتر درباره انتخابگرهای React را در راهنمای [Selectors](/docs/selectors#react-selectors) بخوانید.

:::

##### استفاده

```js
browser.react$(selector, { props, state })
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
      <td>گزینه‌های انتخابگر React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Object`</td>
      <td>props های React که عنصر باید شامل آنها باشد</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>state ری‌اکت که عنصر باید در آن باشد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');
    const appWrapper = await $('div#root')

    await browser.react$('t', {
        props: { name: '7' }
    }).click()
    await browser.react$('t', {
        props: { name: 'x' }
    }).click()
    await browser.react$('t', {
        props: { name: '6' }
    }).click()
    await browser.react$('t', {
        props: { name: '=' }
    }).click()

    console.log(await $('.component-display').getText()); // چاپ می‌کند "42"
});
```

##### خروجی

- **&lt;WebdriverIO.Element&gt;**