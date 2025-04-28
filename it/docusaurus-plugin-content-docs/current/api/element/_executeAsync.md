---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
Il comando `executeAsync` è deprecato e sarà rimosso in una versione futura.
Si prega di utilizzare il comando `execute` al suo posto, poiché fornisce un migliore supporto per
la gestione degli errori tramite `async`/`await`.
:::

Inietta un frammento di JavaScript nella pagina per l'esecuzione nel contesto del frame
attualmente selezionato usando l'elemento dato come ambito, poiché è nell'ambito dell'elemento significa che WebdriverIO
attenderà automaticamente che l'elemento esista prima di eseguire lo script.
Si presume che lo script eseguito sia asincrono e deve segnalare che è terminato invocando
la callback fornita, che è sempre fornita come argomento finale alla funzione. Il valore
di questa callback sarà restituito al client.

I comandi di script asincroni non possono estendersi oltre i caricamenti di pagina. Se viene attivato un evento di scaricamento durante l'attesa
del risultato di uno script, un errore dovrebbe essere restituito al client.

L'argomento script definisce lo script da eseguire sotto forma di corpo di una funzione. La funzione sarà
invocata con l'array di argomenti fornito e i valori possono essere accessibili tramite l'oggetto arguments
nell'ordine specificato. L'argomento finale sarà sempre una funzione di callback che deve essere invocata
per segnalare che lo script è terminato.

Gli argomenti possono essere qualsiasi primitiva JSON, array o oggetto JSON. Gli oggetti JSON che definiscono un riferimento WebElement
saranno convertiti nell'elemento DOM corrispondente. Allo stesso modo, qualsiasi WebElements nel risultato
dello script sarà restituito al client come oggetti JSON WebElement.

:::caution

Per favore, usa `execute` invece
:::

##### Utilizzo

```js
$(selector).executeAsync(script, arguments)
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
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Restituisce

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Il risultato dello script.