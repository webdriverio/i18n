---
id: getCookies
title: getCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getCookies.ts
---

Retrieve a [cookie](https://w3c.github.io/webdriver/webdriver-spec.html#cookies)
visible to the current page. You can query a specific cookie by providing the cookie name or
retrieve all.

##### Usage

```js
browser.getCookies(filter)
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
      <td><code><var>filter</var></code></td>
      <td>`remote.StorageCookieFilter`</td>
      <td>an object that allows to filter for cookies with specific attributes</td>
    </tr>
  </tbody>
</table>

##### Example

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

##### Returns

- **&lt;Cookie[]&gt;**
            **<code><var>return</var></code>:**                            requested cookies    

