---
id: request
title: request
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

Ermöglicht die Änderung von Anfragen, die der Browser während der Sitzung stellt. Dies kann für folgende Anwendungsfälle nützlich sein:

- Überprüfen, ob Ihre Anwendung korrekte Anfragenutzlasten sendet
- Weiterleiten von Autorisierungs-Headern zum Testen geschützter Ressourcen
- Setzen von Sitzungs-Cookies zum Testen der Benutzerauthentifizierung
- Ändern von Anfragen zum Testen von Randfällen

##### Verwendung

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>Payload zum Überschreiben der Antwort</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string,string>`</td>
      <td>Bestimmte Header überschreiben</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
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
      <td>Anfrage-URL überschreiben, um eine Umleitung einzuleiten</td>
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
