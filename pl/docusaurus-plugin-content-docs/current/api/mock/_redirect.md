---
id: redirect
title: przekierowanie
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Konfiguruje przekierowanie dla danego mocka. Pozwala to na przekierowanie żądania na inny adres URL.
Uwaga: te przekierowania dotyczą tylko żądań wykonywanych przez skrypt w przeglądarce, a nie gdy wywołujesz polecenie `url`.

##### Użycie

```js
mock.redirect(url)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>docelowy zasób, do którego przekierowane będą żądania</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```