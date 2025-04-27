---
id: redirect
title: redirect
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Sets up a redirect for a given mock. This allows you to redirect a request to another URL.
Note: these redirects only apply to requests made by a script in the browser, not when calling the `url` command.

##### Usage

```js
mock.redirect(url)
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>target resource to redirect requests to</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```

