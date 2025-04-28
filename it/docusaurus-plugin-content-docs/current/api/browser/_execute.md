---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

Inietta un frammento di JavaScript nella pagina per l'esecuzione nel contesto del frame attualmente selezionato.
Si presume che lo script eseguito sia sincrono e il risultato della valutazione dello script viene restituito al
client.

L'argomento script definisce lo script da eseguire sotto forma di corpo di una funzione. Il valore restituito da
quella funzione verrà restituito al client. La funzione verrà invocata con l'array di argomenti fornito e
i valori possono essere accessibili tramite l'oggetto arguments nell'ordine specificato.

Gli argomenti possono essere qualsiasi JSON-primitivo, array o oggetto JSON. Gli oggetti JSON che definiscono un riferimento WebElement
saranno convertiti nell'elemento DOM corrispondente. Allo stesso modo, qualsiasi WebElement nel risultato
dello script sarà restituito al client come oggetti JSON WebElement.

##### Utilizzo

```js
browser.execute(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>Lo script da eseguire.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`*`</td>
      <td>argomenti dello script</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Restituisce

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Il risultato dello script.