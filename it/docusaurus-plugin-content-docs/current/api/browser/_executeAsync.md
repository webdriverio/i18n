---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
Il comando `executeAsync` è deprecato e sarà rimosso in una versione futura.
Si prega di utilizzare il comando `execute` invece, poiché fornisce un migliore supporto per
la gestione degli errori tramite `async`/`await`.
:::

Inserisce un frammento di JavaScript nella pagina per l'esecuzione nel contesto del frame attualmente selezionato.
Si presume che lo script eseguito sia asincrono e deve segnalare la sua conclusione invocando
il callback fornito, che è sempre fornito come argomento finale alla funzione. Il valore
passato a questo callback sarà restituito al client.

I comandi di script asincroni non possono estendersi su più caricamenti di pagina. Se viene attivato un evento di scaricamento mentre si attende
il risultato di uno script, un errore dovrebbe essere restituito al client.

L'argomento script definisce lo script da eseguire sotto forma di corpo della funzione. La funzione sarà
invocata con l'array di argomenti fornito e i valori possono essere accessibili tramite l'oggetto arguments
nell'ordine specificato. L'argomento finale sarà sempre una funzione di callback che deve essere invocata
per segnalare che lo script è terminato.

Gli argomenti possono essere qualsiasi JSON-primitivo, array o oggetto JSON. Gli oggetti JSON che definiscono un riferimento WebElement
saranno convertiti nell'elemento DOM corrispondente. Allo stesso modo, qualsiasi WebElement nel risultato
dello script sarà restituito al client come oggetti JSON WebElement.

:::caution

Si prega di utilizzare `execute` invece
:::

##### Utilizzo

```js
browser.executeAsync(script, arguments)
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

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Restituisce

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Il risultato dello script.