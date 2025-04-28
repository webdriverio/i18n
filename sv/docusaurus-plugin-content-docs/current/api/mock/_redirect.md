---
id: redirect
title: omdirigera
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Ställer in en omdirigering för en given mock. Detta gör det möjligt att omdirigera en förfrågan till en annan URL.
Observera: dessa omdirigeringar gäller endast förfrågningar som görs av ett skript i webbläsaren, inte när man anropar `url`-kommandot.

##### Användning

```js
mock.redirect(url)
```

##### Parametrar

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
      <td>målresurs att omdirigera förfrågningar till</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```