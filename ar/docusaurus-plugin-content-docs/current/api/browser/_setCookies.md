---
id: setCookies
title: وضع ملفات تعريف الارتباط
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

يضبط ملف تعريف ارتباط واحد أو أكثر [cookies](https://w3c.github.io/webdriver/#cookies) للصفحة الحالية. تأكد من أنك على الصفحة التي يجب أن تستقبل ملف تعريف الارتباط. لا يمكنك تعيين ملف تعريف ارتباط لصفحة عشوائية دون أن تكون على تلك الصفحة.

##### الاستخدام

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>كائن ملف تعريف الارتباط أو مصفوفة كائنات.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>اسم ملف تعريف الارتباط.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>قيمة ملف تعريف الارتباط.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>مسار ملف تعريف الارتباط. القيمة الافتراضية هي "/" إذا تم حذفها عند إضافة ملف تعريف ارتباط.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>المجال الذي يكون فيه ملف تعريف الارتباط مرئيًا. يتم تعيينه افتراضيًا إلى مجال URL للمستند النشط في سياق التصفح الحالي إذا تم حذفه عند إضافة ملف تعريف ارتباط.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>ما إذا كان ملف تعريف الارتباط آمنًا. القيمة الافتراضية هي false إذا تم حذفها عند إضافة ملف تعريف ارتباط.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>ما إذا كان ملف تعريف الارتباط هو ملف HTTP فقط. القيمة الافتراضية هي false إذا تم حذفها عند إضافة ملف تعريف ارتباط.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>متى ينتهي ملف تعريف الارتباط، محدد بالثواني منذ عصر يونكس. يجب عدم تعيينه إذا تم حذفه عند إضافة ملف تعريف ارتباط.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>ما إذا كان ملف تعريف الارتباط ينطبق على سياسة SameSite. القيمة الافتراضية هي None إذا تم حذفها عند إضافة ملف تعريف ارتباط. يمكن تعيينها إما على "Lax" أو "Strict".</td>
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