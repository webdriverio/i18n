---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

Ändra förfrågansparameter endast en gång med given överskrivning för nästa förfrågan. Du kan anropa `requestOnce` flera gånger i följd och den kommer att tillämpa överskrivningarna i ordning. Om du endast använder `requestOnce` och resursen anropas fler gånger än en mock har definierats så återgår den till originalresursen.

##### Användning

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>payload för att skriva över svaret</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>skriv över specifika headers</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>skriv över förfrågans cookies</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>skriv över förfrågans metod</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>skriv över förfrågans url för att initiera en omdirigering</td>
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
      <td>skriv över svarets statuskod</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>hämta riktigt svar innan du svarar med mockad data</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```