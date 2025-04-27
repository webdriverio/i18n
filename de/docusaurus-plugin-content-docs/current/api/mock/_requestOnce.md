---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

Ändert die Anfrageparameter nur einmal mit der angegebenen Überschreibung für die nächste Anfrage. Sie können `requestOnce` mehrmals hintereinander aufrufen, und es werden die Überschreibungen der Reihe nach angewendet. Wenn Sie nur `requestOnce` verwenden und die Ressource öfter aufgerufen wird, als ein Mock definiert wurde, wird auf die ursprüngliche Ressource zurückgegriffen.

##### Verwendung

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>Nutzdaten zum Überschreiben der Antwort</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>Bestimmte Header überschreiben</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>Anfrage-Cookies überschreiben</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>Anfragemethode überschreiben</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>Anfrage-URL überschreiben, um eine Weiterleitung zu initiieren</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`MockResponseParams`</td>
      <td>Zusätzliche Antwortparameter zum Überschreiben</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>Bestimmte Header überschreiben</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Antwort-Statuscode überschreiben</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Echte Antwort abrufen, bevor mit simulierten Daten geantwortet wird</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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