---
id: redirect
title: umleiten
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Richtet eine Umleitung für einen bestimmten Mock ein. Dies ermöglicht es, eine Anfrage zu einer anderen URL umzuleiten.
Hinweis: Diese Umleitungen gelten nur für Anfragen, die von einem Skript im Browser gestellt werden, nicht wenn der `url`-Befehl aufgerufen wird.

##### Verwendung

```js
mock.redirect(url)
```

##### Parameter

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
      <td>Zielressource, an die Anfragen umgeleitet werden sollen</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```