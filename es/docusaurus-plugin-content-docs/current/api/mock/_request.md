---
id: request
title: request
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

Permite modificar las solicitudes que el navegador realiza durante la sesión. Esto puede ser útil para los siguientes casos de uso:

- validar si tu aplicación envía cargas útiles de solicitud correctas
- pasar encabezados de autorización para probar recursos protegidos
- configurar cookies de sesión para probar la autenticación de usuarios
- modificar solicitudes para probar casos extremos

##### Uso

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>carga útil para sobrescribir la respuesta</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string,string>`</td>
      <td>sobrescribir encabezados específicos</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>sobrescribir cookies de solicitud</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>sobrescribir método de solicitud</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>sobrescribir URL de solicitud para iniciar una redirección</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`MockResponseParams`</td>
      <td>parámetros de respuesta adicionales para sobrescribir</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object`</td>
      <td>sobrescribir encabezados específicos</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>sobrescribir código de estado de respuesta</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>obtener respuesta real antes de responder con datos simulados</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="respond.js"
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```