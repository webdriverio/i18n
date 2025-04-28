---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Imposta uno o più [cookies](https://w3c.github.io/webdriver/#cookies) per la pagina corrente. Assicurati di essere
sulla pagina che dovrebbe ricevere il cookie. Non puoi impostare un cookie per una pagina arbitraria senza
essere su quella pagina.

##### Utilizzo

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>oggetto cookie o array di oggetti.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>Il nome del cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>Il valore del cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>Il percorso del cookie. Predefinito a "/" se omesso quando si aggiunge un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>Il dominio in cui il cookie è visibile. Predefinito al dominio URL del documento attivo del contesto di navigazione corrente se omesso quando si aggiunge un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>Se il cookie è un cookie sicuro. Predefinito a false se omesso quando si aggiunge un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>Se il cookie è un cookie HTTP only. Predefinito a false se omesso quando si aggiunge un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>Quando il cookie scade, specificato in secondi dall'Epoca Unix. Non deve essere impostato se omesso quando si aggiunge un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>Se il cookie si applica a una politica SameSite. Predefinito a None se omesso quando si aggiunge un cookie. Può essere impostato a "Lax" o "Strict".</td>
    </tr>
  </tbody>
</table>

##### Esempio

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