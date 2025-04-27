---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Définit un ou plusieurs [cookies](https://w3c.github.io/webdriver/#cookies) pour la page actuelle. Assurez-vous d'être
sur la page qui doit recevoir le cookie. Vous ne pouvez pas définir un cookie pour une page arbitraire sans
être sur cette page.

##### Usage

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>objet cookie ou tableau d'objets.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Le nom du cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>La valeur du cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Le chemin du cookie. Par défaut à "/" si omis lors de l'ajout d'un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Le domaine pour lequel le cookie est visible. Par défaut, c'est le domaine de l'URL du document actif du contexte de navigation actuel si omis lors de l'ajout d'un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Si le cookie est un cookie sécurisé. Par défaut à false si omis lors de l'ajout d'un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Si le cookie est un cookie HTTP uniquement. Par défaut à false si omis lors de l'ajout d'un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Quand le cookie expire, spécifié en secondes depuis l'époque Unix. Ne doit pas être défini si omis lors de l'ajout d'un cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Si le cookie applique une politique SameSite. Par défaut à None si omis lors de l'ajout d'un cookie. Peut être défini à "Lax" ou "Strict".</td>
    </tr>
  </tbody>
</table>

##### Example

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