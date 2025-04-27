---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Sets one or more [cookies](https://w3c.github.io/webdriver/#cookies) for the current page. Make sure you are
on the page that should receive the cookie. You can't set a cookie for an arbitrary page without
being on that page.

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
      <td>cookie object or object array.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>The name of the cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>The cookie value.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>The cookie path. Defaults to "/" if omitted when adding a cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>The domain the cookie is visible to. Defaults to the current browsing context’s active document’s URL domain if omitted when adding a cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Whether the cookie is a secure cookie. Defaults to false if omitted when adding a cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Whether the cookie is an HTTP only cookie. Defaults to false if omitted when adding a cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>When the cookie expires, specified in seconds since Unix Epoch. Must not be set if omitted when adding a cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Whether the cookie applies to a SameSite policy. Defaults to None if omitted when adding a cookie. Can be set to either "Lax" or "Strict".</td>
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
        // domain: '.example.com', // The domain the cookie is visible to. Defaults to the current browsing context’s active document’s URL domain
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

