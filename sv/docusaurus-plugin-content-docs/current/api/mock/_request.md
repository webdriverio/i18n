---
id: request
title: request
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

Tillåter dig att modifiera förfrågningar som webbläsaren gör under sessionen. Detta kan vara användbart för följande användningsfall:

- validera om din applikation skickar korrekta förfrågningsnyttolaster
- vidarebefordra auktoriseringshuvuden för att testa skyddade resurser
- ställa in sessionscookies för att testa användarautentisering
- modifiera förfrågningar för att testa gränsfall

##### Användning

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>nyttolast för att skriva över svaret</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string,string>`</td>
      <td>skriv över specifika headers</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>skriv över förfrågningscookies</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>skriv över förfrågningsmetod</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>skriv över förfrågnings-URL för att initiera en omdirigering</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`MockResponseParams`</td>
      <td>ytterligare svarsparametrar att skriva över</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Object`</td>
      <td>skriv över specifika headers</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>skriv över svarens statuskod</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>hämta verkligt svar innan det svaras med simulerad data</td>
    </tr>
  </tbody>
</table>

##### Exempel

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