---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

دسترسی به عناصر داخل shadowRoot یک عنصر مشخص. اگر با تعداد زیادی shadow root تودرتو کار می‌کنید، یک روش جایگزین برای `shadow$$` استفاده از [انتخابگر عمیق](https://webdriver.io/docs/selectors#deep-selectors) است.

:::info

WebdriverIO به طور خودکار از طریق shadow roots عبور می‌کند هنگامی که از دستورات `$` یا `$$` استفاده می‌کنید.
این دستور فقط زمانی مورد نیاز است که در محیطی اتوماسیون انجام می‌دهید که هنوز از WebDriver Bidi پشتیبانی نمی‌کند، 
مانند تست وب موبایل با Appium.

:::

##### استفاده

```js
$(selector).shadow$$(selector)
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
      <td>`String, Function`</td>
      <td>انتخابگر یا تابع JS برای واکشی یک عنصر خاص</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### مقادیر بازگشتی

- **&lt;WebdriverIO.ElementArray&gt;**