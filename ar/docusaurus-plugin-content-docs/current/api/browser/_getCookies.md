---
id: getCookies
title: الحصول على ملفات تعريف الارتباط
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getCookies.ts
---

استرجاع [ملف تعريف الارتباط](https://w3c.github.io/webdriver/webdriver-spec.html#cookies)
مرئي للصفحة الحالية. يمكنك الاستعلام عن ملف تعريف ارتباط محدد من خلال توفير اسم ملف تعريف الارتباط أو
استرجاع الكل.

##### الاستخدام

```js
browser.getCookies(filter)
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filter</var></code></td>
      <td>`remote.StorageCookieFilter`</td>
      <td>كائن يسمح بتصفية ملفات تعريف الارتباط ذات السمات المحددة</td>
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

##### العوائد

- **&lt;Cookie[]&gt;**
            **<code><var>return</var></code>:**                            ملفات تعريف الارتباط المطلوبة