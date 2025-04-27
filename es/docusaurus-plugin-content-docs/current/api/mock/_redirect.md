---
id: redirect
title: redireccionar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Configura una redirección para un mock dado. Esto permite redirigir una solicitud a otra URL.
Nota: estas redirecciones solo se aplican a solicitudes realizadas por un script en el navegador, no cuando se llama al comando `url`.

##### Uso

```js
mock.redirect(url)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>recurso objetivo al que redirigir las solicitudes</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```