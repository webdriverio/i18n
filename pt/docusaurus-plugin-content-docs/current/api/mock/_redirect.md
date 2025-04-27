---
id: redirect
title: redirecionar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Configura um redirecionamento para um determinado mock. Isso permite redirecionar uma solicitação para outra URL.
Nota: esses redirecionamentos aplicam-se apenas a solicitações feitas por um script no navegador, não quando se chama o comando `url`.

##### Uso

```js
mock.redirect(url)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>recurso de destino para o qual redirecionar as solicitações</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```