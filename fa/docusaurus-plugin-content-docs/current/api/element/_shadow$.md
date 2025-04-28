---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

دسترسی به یک عنصر داخل shadowRoot یک عنصر مشخص. اگر با تعداد زیادی از shadow root های تو در تو کار می‌کنید، روش جایگزین برای `shadow$` استفاده از [انتخابگر عمیق](https://webdriver.io/docs/selectors#deep-selectors) است.

:::info

WebdriverIO به طور خودکار از طریق shadow root ها عبور می‌کند هنگامی که از دستورات `$` یا `$$` استفاده می‌کنید.
این دستور فقط زمانی مورد نیاز است که شما در محیطی اتوماسیون انجام می‌دهید که هنوز از WebDriver Bidi پشتیبانی نمی‌کند، مانند تست وب موبایل با Appium.

:::

##### استفاده

```js
$(selector).shadow$(selector)
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
      <td>انتخابگر یا تابع JS برای دریافت یک عنصر خاص</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### برمی‌گرداند

- **&lt;WebdriverIO.Element&gt;**