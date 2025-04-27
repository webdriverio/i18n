---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

Inyecta un fragmento de JavaScript en la página para su ejecución en el contexto del marco seleccionado actualmente.
Se asume que el script ejecutado es síncrono y el resultado de evaluar el script se devuelve al
cliente.

El argumento script define el script a ejecutar en forma de un cuerpo de función. El valor devuelto por
esa función será devuelto al cliente. La función se invocará con el array de args proporcionado
y se puede acceder a los valores a través del objeto arguments en el orden especificado.

Los argumentos pueden ser cualquier JSON-primitivo, array u objeto JSON. Los objetos JSON que definen una referencia
WebElement se convertirán al elemento DOM correspondiente. Del mismo modo, cualquier WebElement en el resultado
del script se devolverá al cliente como objetos JSON WebElement.

##### Uso

```js
browser.execute(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>El script a ejecutar.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`*`</td>
      <td>argumentos del script</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

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

##### Retorna

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              El resultado del script.