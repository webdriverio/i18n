---
id: getLocation
title: getLocation
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

Determinar a localização de um elemento na página. O ponto (0, 0) refere-se ao
canto superior esquerdo da página.

##### Uso

```js
$(selector).getLocation(prop)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>pode ser "x" ou "y" para obter um valor de resultado diretamente para afirmações mais fáceis</td>
    </tr>
  </tbody>
</table>

##### Exemplo

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

##### Retorna

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   As coordenadas X e Y para o elemento na página `{x:number, y:number}`