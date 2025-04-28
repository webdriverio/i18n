---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

Zmiana parametrów żądania tylko raz z podanymi nadpisami dla następnego żądania. Możesz wywołać `requestOnce` wiele razy z rzędu, a nadpisania będą stosowane w kolejności. Jeśli używasz tylko `requestOnce` i zasób jest wywoływany więcej razy niż zdefiniowano mock, to powraca on do oryginalnego zasobu.

##### Użycie

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>dane do nadpisania odpowiedzi</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>nadpisanie określonych nagłówków</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>nadpisanie ciasteczek żądania</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>nadpisanie metody żądania</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>nadpisanie adresu URL żądania w celu zainicjowania przekierowania</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`MockResponseParams`</td>
      <td>dodatkowe parametry odpowiedzi do nadpisania</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`Object`</td>
      <td>nadpisanie określonych nagłówków</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`Number`</td>
      <td>nadpisanie kodu statusu odpowiedzi</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`Boolean`</td>
      <td>pobierz rzeczywistą odpowiedź przed odpowiedzią z symulowanymi danymi</td>
    </tr>
  </tbody>
</table>

##### Przykład

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