---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

Only change request parameter once with given overwrite for the next request. You can call `requestOnce` multiple
consecutive times and it will apply the overwrites in order. If you only use `requestOnce` and the resource is called
more times a mock has been defined than it defaults back to the original resource.

##### Usage

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>payload to overwrite the response</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>overwrite specific headers</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>overwrite request cookies</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>overwrite request method</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>overwrite request url to initiate a redirect</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`MockResponseParams`</td>
      <td>additional respond parameters to overwrite</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>overwrite specific headers</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>overwrite response status code</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>fetch real response before responding with mocked data</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```

