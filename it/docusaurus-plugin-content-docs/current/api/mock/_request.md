---
id: request
title: request
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

Consente di modificare le richieste che il browser effettua durante la sessione. Questo può essere utile per i seguenti casi d'uso:

- validare se la tua applicazione invia payload di richiesta corretti
- passare intestazioni di autorizzazione per testare risorse protette
- impostare cookie di sessione per testare l'autenticazione dell'utente
- modificare le richieste per testare casi limite

##### Utilizzo

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>`Record<string,string>`</td>
      <td>sovrascrivere intestazioni specifiche</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>sovrascrivere i cookie della richiesta</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>sovrascrivere il metodo della richiesta</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>sovrascrivere l'URL della richiesta per avviare un reindirizzamento</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`MockResponseParams`</td>
      <td>parametri di risposta aggiuntivi da sovrascrivere</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Object`</td>
      <td>sovrascrivere intestazioni specifiche</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>sovrascrivere il codice di stato della risposta</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>recuperare la risposta reale prima di rispondere con i dati simulati</td>
    </tr>
  </tbody>
</table>

##### Esempio

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