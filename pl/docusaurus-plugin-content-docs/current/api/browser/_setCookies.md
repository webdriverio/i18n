---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Ustawia jeden lub więcej [ciasteczek](https://w3c.github.io/webdriver/#cookies) dla bieżącej strony. Upewnij się, że jesteś
na stronie, która ma otrzymać ciasteczko. Nie możesz ustawić ciasteczka dla dowolnej strony bez
przebywania na tej stronie.

##### Użycie

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>obiekt cookie lub tablica obiektów.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`String`</td>
      <td>Nazwa ciasteczka.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`String`</td>
      <td>Wartość ciasteczka.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`String`</td>
      <td>Ścieżka ciasteczka. Domyślnie "/" jeśli pominięto podczas dodawania ciasteczka.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`String`</td>
      <td>Domena, dla której ciasteczko jest widoczne. Domyślnie domena URL aktywnego dokumentu bieżącego kontekstu przeglądania, jeśli pominięto podczas dodawania ciasteczka.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`Boolean`</td>
      <td>Czy ciasteczko jest bezpieczne. Domyślnie false, jeśli pominięto podczas dodawania ciasteczka.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`Boolean`</td>
      <td>Czy ciasteczko jest ciasteczkiem tylko dla HTTP. Domyślnie false, jeśli pominięto podczas dodawania ciasteczka.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`Number`</td>
      <td>Kiedy ciasteczko wygasa, określone w sekundach od początku epoki Unix. Nie może być ustawione, jeśli pominięto podczas dodawania ciasteczka.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`String`</td>
      <td>Czy ciasteczko stosuje się do polityki SameSite. Domyślnie None, jeśli pominięto podczas dodawania ciasteczka. Może być ustawione na "Lax" lub "Strict".</td>
    </tr>
  </tbody>
</table>

##### Przykład

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