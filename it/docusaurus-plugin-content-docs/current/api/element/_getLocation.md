---
id: getLocation
title: getLocation
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

Determina la posizione di un elemento sulla pagina. Il punto (0, 0) si riferisce 
all'angolo superiore sinistro della pagina.

##### Utilizzo

```js
$(selector).getLocation(prop)
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
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>può essere "x" o "y" per ottenere direttamente un valore di risultato per asserzioni più facili</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="getLocation.js"
it('should demonstrate the getLocation function', async () => {
    await browser.url('http://github.com');
    const logo = await $('.octicon-mark-github')
    const location = await logo.getLocation();
    console.log(location); // outputs: { x: 150, y: 20 }

    const xLocation = await logo.getLocation('x')
    console.log(xLocation); // outputs: 150

    const yLocation = await logo.getLocation('y')
    console.log(yLocation); // outputs: 20
});
```

##### Restituisce

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   Le coordinate X e Y dell'elemento sulla pagina `{x:number, y:number}`