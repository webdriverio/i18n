---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Setzt einen oder mehrere [Cookies](https://w3c.github.io/webdriver/#cookies) für die aktuelle Seite. Stellen Sie sicher, dass Sie
auf der Seite sind, die das Cookie erhalten soll. Sie können kein Cookie für eine beliebige Seite setzen, ohne
auf dieser Seite zu sein.

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
      <td>Cookie-Objekt oder Objekt-Array.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Der Name des Cookies.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Der Cookie-Wert.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Der Cookie-Pfad. Standardwert ist "/", wenn beim Hinzufügen eines Cookies nicht angegeben.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Die Domain, für die das Cookie sichtbar ist. Standardwert ist die Domain der URL des aktiven Dokuments des aktuellen Browsing-Kontexts, wenn beim Hinzufügen eines Cookies nicht angegeben.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Ob das Cookie ein sicheres Cookie ist. Standardwert ist false, wenn beim Hinzufügen eines Cookies nicht angegeben.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Ob das Cookie ein HTTP-Only-Cookie ist. Standardwert ist false, wenn beim Hinzufügen eines Cookies nicht angegeben.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Wann das Cookie abläuft, angegeben in Sekunden seit Unix Epoch. Darf nicht gesetzt werden, wenn beim Hinzufügen eines Cookies nicht angegeben.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Ob das Cookie für eine SameSite-Richtlinie gilt. Standardwert ist None, wenn beim Hinzufügen eines Cookies nicht angegeben. Kann auf "Lax" oder "Strict" gesetzt werden.</td>
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
