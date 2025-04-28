---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Inietta un frammento di JavaScript nella pagina per l'esecuzione nel contesto del frame attualmente selezionato
utilizzando l'elemento dato come ambito, poiché è nell'ambito dell'elemento significa che WebdriverIO
attenderà automaticamente che l'elemento esista prima di eseguire lo script.
Si presume che lo script eseguito sia sincrono e il risultato della valutazione dello script viene restituito al
client.

L'argomento script definisce lo script da eseguire sotto forma di corpo di una funzione. Il valore restituito da
quella funzione sarà restituito al client. La funzione verrà invocata con l'array args fornito
e i valori possono essere accessibili tramite l'oggetto arguments nell'ordine specificato.

Gli argomenti possono essere qualsiasi JSON-primitivo, array o oggetto JSON. Gli oggetti JSON che definiscono un riferimento WebElement
saranno convertiti nell'elemento DOM corrispondente. Allo stesso modo, qualsiasi WebElement nel risultato
dello script sarà restituito al client come oggetti JSON WebElement.

##### Utilizzo

```js
$(selector).execute(script, arguments)
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
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Restituisce

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Il risultato dello script.