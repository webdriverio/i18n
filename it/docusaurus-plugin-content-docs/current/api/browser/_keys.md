---
id: keys
title: keys
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

Invia una sequenza di battute di tasti all'elemento "attivo". Puoi rendere attivo un elemento input semplicemente cliccandoci sopra. Per utilizzare caratteri come "Freccia sinistra" o "Backspace", importa l'oggetto `Key` dal pacchetto WebdriverIO.

I modificatori come `Control`, `Shift`, `Alt` e `Command` rimarranno premuti, quindi è necessario attivarli nuovamente per rilasciarli. La modifica di un clic richiede invece l'utilizzo dell'API WebDriver Actions tramite il metodo [performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

I tasti di controllo differiscono in base al sistema operativo su cui è in esecuzione il browser, ad esempio MacOS: `Command` e Windows: `Control`.
WebdriverIO fornisce un tasto modificatore di controllo multipiattaforma chiamato `Ctrl` (vedi esempio sotto).

:::

##### Utilizzo

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>La sequenza di tasti da digitare. Deve essere fornito un array o una stringa.</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```