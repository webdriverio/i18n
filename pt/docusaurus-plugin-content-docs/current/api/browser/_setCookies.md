---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Define um ou mais [cookies](https://w3c.github.io/webdriver/#cookies) para a página atual. Certifique-se de que você está
na página que deve receber o cookie. Você não pode definir um cookie para uma página arbitrária sem
estar nessa página.

##### Uso

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>objeto cookie ou array de objetos.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>O nome do cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>O valor do cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>O caminho do cookie. O padrão é "/" se omitido ao adicionar um cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>O domínio no qual o cookie é visível. O padrão é o domínio URL do documento ativo do contexto de navegação atual se omitido ao adicionar um cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>Se o cookie é um cookie seguro. O padrão é false se omitido ao adicionar um cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>Se o cookie é um cookie HTTP only. O padrão é false se omitido ao adicionar um cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Quando o cookie expira, especificado em segundos desde o Unix Epoch. Não deve ser definido se omitido ao adicionar um cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>Se o cookie se aplica a uma política SameSite. O padrão é None se omitido ao adicionar um cookie. Pode ser definido como "Lax" ou "Strict".</td>
    </tr>
  </tbody>
</table>

##### Exemplo

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