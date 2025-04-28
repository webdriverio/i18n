---
id: setCookies
title: تنظیم کوکی‌ها
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

یک یا چند [کوکی](https://w3c.github.io/webdriver/#cookies) را برای صفحه فعلی تنظیم می‌کند. مطمئن شوید که در صفحه‌ای هستید که باید کوکی را دریافت کند. شما نمی‌توانید یک کوکی را برای یک صفحه دلخواه بدون حضور در آن صفحه تنظیم کنید.

##### استفاده

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>آبجکت کوکی یا آرایه‌ای از آبجکت‌ها.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>نام کوکی.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>مقدار کوکی.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>مسیر کوکی. در صورت حذف هنگام افزودن کوکی، به طور پیش‌فرض "/" تنظیم می‌شود.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>دامنه‌ای که کوکی در آن قابل مشاهده است. در صورت حذف هنگام افزودن کوکی، به طور پیش‌فرض به دامنه URL سند فعال زمینه مرورگر فعلی تنظیم می‌شود.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>آیا کوکی، یک کوکی امن است. در صورت حذف هنگام افزودن کوکی، به طور پیش‌فرض false تنظیم می‌شود.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>آیا کوکی، یک کوکی فقط HTTP است. در صورت حذف هنگام افزودن کوکی، به طور پیش‌فرض false تنظیم می‌شود.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>زمان انقضای کوکی، که به ثانیه از زمان یونیکس اپوک مشخص شده است. در صورت حذف هنگام افزودن کوکی، نباید تنظیم شود.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>آیا کوکی برای سیاست SameSite اعمال می‌شود. در صورت حذف هنگام افزودن کوکی، به طور پیش‌فرض None تنظیم می‌شود. می‌تواند به "Lax" یا "Strict" تنظیم شود.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="setCookies.js"
it('should set a cookie for the page', async () => {
    await browser.url('/')

    // set a single cookie
    await browser.setCookies({
        name: 'test1',
        value: 'one'
        // The below options are optional
        // path: '/foo', // The cookie path. Defaults to "/"
        // domain: '.example.com', // The domain the cookie is visible to. Defaults to the current browsing context's active document's URL domain
        // secure: true, // Whether the cookie is a secure cookie. Defaults to false
        // httpOnly: true, // Whether the cookie is an HTTP only cookie. Defaults to false
        // expiry: 1551393875 // When the cookie expires, specified in seconds since Unix Epoch
    })

    // set multiple cookies
    await browser.setCookies([
        {name: 'test2', value: 'two'},
        {name: 'test3', value: 'three'}
    ])

    const cookies = await browser.getCookies()
    console.log(cookies);
    // outputs:
    // [
    //      {name: 'test1', value: 'one', domain: 'www.example.com'},
    //      {name: 'test2', value: 'two', domain: 'www.example.com'},
    //      {name: 'test3', value: 'three', domain: 'www.example.com'}
    // ]
});
```