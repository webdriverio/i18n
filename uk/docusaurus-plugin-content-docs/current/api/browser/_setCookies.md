---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Встановлює один або більше [cookies](https://w3c.github.io/webdriver/#cookies) для поточної сторінки. Переконайтеся, що ви перебуваєте на сторінці, яка повинна отримати cookie. Ви не можете встановити cookie для довільної сторінки, не перебуваючи на ній.

##### Usage

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>об'єкт cookie або масив об'єктів.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Назва cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Значення cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Шлях cookie. За замовчуванням має значення "/" якщо опущено при додаванні cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Домен, для якого cookie є видимим. За замовчуванням - домен URL поточного активного документа, якщо опущено при додаванні cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Чи є cookie захищеним. За замовчуванням має значення false, якщо опущено при додаванні cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Чи є cookie лише для HTTP. За замовчуванням має значення false, якщо опущено при додаванні cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Час закінчення терміну дії cookie, вказаний у секундах починаючи з Unix Epoch. Не повинен бути встановлений, якщо опущено при додаванні cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Чи застосовується до cookie політика SameSite. За замовчуванням має значення None, якщо опущено при додаванні cookie. Може бути встановлено на "Lax" або "Strict".</td>
    </tr>
  </tbody>
</table>

##### Example

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