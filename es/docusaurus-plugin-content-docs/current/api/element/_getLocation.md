---
id: getLocation
title: getLocation
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

Determinar la ubicación de un elemento en la página. El punto (0, 0) se refiere a
la esquina superior izquierda de la página.

##### Uso

```js
$(selector).getLocation(prop)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>puede ser "x" o "y" para obtener un valor de resultado directamente para afirmaciones más sencillas</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

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

##### Devuelve

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   Las coordenadas X e Y del elemento en la página `{x:number, y:number}`