---
id: redirect
title: redirect
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Configura un reindirizzamento per un determinato mock. Ciò consente di reindirizzare una richiesta a un altro URL.
Nota: questi reindirizzamenti si applicano solo alle richieste effettuate da uno script nel browser, non quando si richiama il comando `url`.

##### Utilizzo

```js
mock.redirect(url)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>risorsa di destinazione a cui reindirizzare le richieste</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```