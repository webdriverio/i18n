---
id: request
title: request (żądanie)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

Pozwala na modyfikację żądań, które przeglądarka wykonuje podczas sesji. Może to być przydatne w następujących przypadkach:

- walidacja, czy Twoja aplikacja wysyła poprawne dane w żądaniach
- przekazywanie nagłówków autoryzacji w celu testowania chronionych zasobów
- ustawianie ciasteczek sesji w celu testowania uwierzytelniania użytkownika
- modyfikacja żądań w celu testowania przypadków brzegowych

##### Użycie

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>`Record<string,string>`</td>
      <td>nadpisz określone nagłówki</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>nadpisz ciasteczka żądania</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>nadpisz metodę żądania</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>nadpisz adres URL żądania, aby zainicjować przekierowanie</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`MockResponseParams`</td>
      <td>dodatkowe parametry odpowiedzi do nadpisania</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Object`</td>
      <td>nadpisz określone nagłówki</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Number`</td>
      <td>nadpisz kod statusu odpowiedzi</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Boolean`</td>
      <td>pobierz rzeczywistą odpowiedź przed odpowiedzią z symulowanymi danymi</td>
    </tr>
  </tbody>
</table>

##### Przykład

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