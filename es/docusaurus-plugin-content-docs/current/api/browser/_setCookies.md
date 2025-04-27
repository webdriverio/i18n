---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Establece una o más [cookies](https://w3c.github.io/webdriver/#cookies) para la página actual. Asegúrate de que estás
en la página que debe recibir la cookie. No puedes establecer una cookie para una página arbitraria sin
estar en esa página.

##### Uso

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>objeto cookie o array de objetos.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>El nombre de la cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>El valor de la cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>La ruta de la cookie. El valor predeterminado es "/" si se omite al agregar una cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>El dominio en el que la cookie es visible. Por defecto es el dominio de la URL del documento activo del contexto de navegación actual si se omite al agregar una cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>Si la cookie es una cookie segura. El valor predeterminado es false si se omite al agregar una cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>Si la cookie es una cookie de solo HTTP. El valor predeterminado es false si se omite al agregar una cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Cuando expira la cookie, especificado en segundos desde Unix Epoch. No debe establecerse si se omite al agregar una cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>Si la cookie aplica una política SameSite. El valor predeterminado es None si se omite al agregar una cookie. Puede establecerse en "Lax" o "Strict".</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="setCookies.js"
it('should set a cookie for the page', async () => {
    await browser.url('/')

    // set a single cookie
    await browser.setCookies({
        name: 'test1',
        value: 'one'
        // The below options are optional
        // path: '/foo', // The cookie path. Defaults to "/"
        // domain: '.example.com', // The domain the cookie is visible to. Defaults to the current browsing context's active document's URL domain
        // secure: true, // Whether the cookie is a secure cookie. Defaults to false
        // httpOnly: true, // Whether the cookie is an HTTP only cookie. Defaults to false
        // expiry: 1551393875 // When the cookie expires, specified in seconds since Unix Epoch
    })

    // set multiple cookies
    await browser.setCookies([
        {name: 'test2', value: 'two'},
        {name: 'test3', value: 'three'}
    ])

    const cookies = await browser.getCookies()
    console.log(cookies);
    // outputs:
    // [
    //      {name: 'test1', value: 'one', domain: 'www.example.com'},
    //      {name: 'test2', value: 'two', domain: 'www.example.com'},
    //      {name: 'test3', value: 'three', domain: 'www.example.com'}
    // ]
});
```