---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Sätter en eller flera [cookies](https://w3c.github.io/webdriver/#cookies) för den aktuella sidan. Se till att du befinner dig
på den sida som ska ta emot cookien. Du kan inte sätta en cookie för en godtycklig sida utan
att befinna dig på den sidan.

##### Användning

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>cookie-objekt eller objektarray.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>Namnet på cookien.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>Cookie-värdet.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>Cookie-sökvägen. Standardvärdet är "/" om det utelämnas när en cookie läggs till.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>Domänen som cookien är synlig för. Standardvärdet är den aktuella bläddringssammanhangets aktiva dokumentets URL-domän om det utelämnas när en cookie läggs till.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>Om cookien är en säker cookie. Standardvärdet är false om det utelämnas när en cookie läggs till.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>Om cookien är en HTTP-only cookie. Standardvärdet är false om det utelämnas när en cookie läggs till.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>När cookien upphör att gälla, angivet i sekunder sedan Unix Epoch. Får inte anges om det utelämnas när en cookie läggs till.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>Om cookien tillämpar en SameSite-policy. Standardvärdet är None om det utelämnas när en cookie läggs till. Kan ställas in på antingen "Lax" eller "Strict".</td>
    </tr>
  </tbody>
</table>

##### Exempel

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