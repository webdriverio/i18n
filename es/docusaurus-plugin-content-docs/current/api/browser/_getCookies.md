---
id: getCookies
title: getCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getCookies.ts
---

Recupera una [cookie](https://w3c.github.io/webdriver/webdriver-spec.html#cookies)
visible para la página actual. Puedes consultar una cookie específica proporcionando el nombre de la cookie o
recuperar todas.

##### Uso

```js
browser.getCookies(filter)
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
      <td><code><var>filter</var></code></td>
      <td>`remote.StorageCookieFilter`</td>
      <td>un objeto que permite filtrar cookies con atributos específicos</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="getCookies.js"
it('should return a cookie for me', async () => {
    await browser.setCookies([
        {name: 'test', value: '123'},
        {name: 'test2', value: '456'}
    ])
    const testCookie = await browser.getCookies(['test'])
    console.log(testCookie); // outputs: [{ name: 'test', value: '123' }]

    const allCookies = await browser.getCookies()
    console.log(allCookies);
    // outputs:
    // [
    //    { name: 'test', value: '123' },
    //    { name: 'test2', value: '456' }
    // ]

    // filter cookies by domain
    const stagingCookies = await browser.getCookies({
        domain: 'staging.myapplication.com'
    })
})
```

##### Retorna

- **&lt;Cookie[]&gt;**
            **<code><var>return</var></code>:**                            cookies solicitadas