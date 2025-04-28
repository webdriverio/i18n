---
id: getCookies
title: گرفتن کوکی‌ها
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getCookies.ts
---

بازیابی یک [کوکی](https://w3c.github.io/webdriver/webdriver-spec.html#cookies)
قابل مشاهده در صفحه فعلی. شما می‌توانید با ارائه نام کوکی، یک کوکی خاص را جستجو کنید یا
همه آنها را بازیابی کنید.

##### استفاده

```js
browser.getCookies(filter)
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
      <td><code><var>filter</var></code></td>
      <td>`remote.StorageCookieFilter`</td>
      <td>یک شیء که اجازه می‌دهد برای کوکی‌هایی با ویژگی‌های خاص فیلتر کنید</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="getCookies.js"
it('should return a cookie for me', async () => {
    await browser.setCookies([
        {name: 'test', value: '123'},
        {name: 'test2', value: '456'}
    ])
    const testCookie = await browser.getCookies(['test'])
    console.log(testCookie); // outputs: [{ name: 'test', value: '123' }]

    const allCookies = await browser.getCookies()
    console.log(allCookies);
    // outputs:
    // [
    //    { name: 'test', value: '123' },
    //    { name: 'test2', value: '456' }
    // ]

    // filter cookies by domain
    const stagingCookies = await browser.getCookies({
        domain: 'staging.myapplication.com'
    })
})
```

##### مقادیر بازگشتی

- **&lt;Cookie[]&gt;**
            **<code><var>return</var></code>:**                            کوکی‌های درخواست شده