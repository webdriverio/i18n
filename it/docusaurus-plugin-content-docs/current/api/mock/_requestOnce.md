---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

Modifica i parametri della richiesta una sola volta con la sovrascrittura specificata per la prossima richiesta. Puoi chiamare `requestOnce` più volte consecutive e verranno applicate le sovrascritture in ordine. Se utilizzi solo `requestOnce` e la risorsa viene chiamata più volte di quante ne siano state definite nel mock, si ritorna alla risorsa originale.

##### Utilizzo

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>payload per sovrascrivere la risposta</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>sovrascrive header specifici</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>sovrascrive i cookie della richiesta</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>sovrascrive il metodo della richiesta</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>sovrascrive l'URL della richiesta per avviare un reindirizzamento</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`MockResponseParams`</td>
      <td>parametri di risposta aggiuntivi da sovrascrivere</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Object`</td>
      <td>sovrascrive header specifici</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>sovrascrive il codice di stato della risposta</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>recupera la risposta reale prima di rispondere con dati simulati</td>
    </tr>
  </tbody>
</table>

##### Esempio

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