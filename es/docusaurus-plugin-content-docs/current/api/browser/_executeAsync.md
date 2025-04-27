---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
El comando `executeAsync` está obsoleto y será eliminado en una versión futura.
Por favor use el comando `execute` en su lugar, ya que proporciona mejor soporte para
manejo de errores a través de `async`/`await`.
:::

Inyecta un fragmento de JavaScript en la página para su ejecución en el contexto del marco actualmente seleccionado.
Se asume que el script ejecutado es asíncrono y debe indicar que ha terminado invocando
el callback proporcionado, que siempre se proporciona como el argumento final de la función. El valor
pasado a este callback será devuelto al cliente.

Los comandos de script asíncronos no pueden abarcar cargas de página. Si se dispara un evento de descarga mientras se espera
un resultado del script, se debe devolver un error al cliente.

El argumento script define el script a ejecutar en forma de cuerpo de función. La función se
invocará con el array de args proporcionado y se puede acceder a los valores a través del objeto arguments
en el orden especificado. El argumento final siempre será una función de callback que debe ser invocada
para indicar que el script ha terminado.

Los argumentos pueden ser cualquier JSON-primitivo, array u objeto JSON. Los objetos JSON que definen una referencia WebElement
se convertirán al elemento DOM correspondiente. Del mismo modo, cualquier WebElement en el resultado
del script se devolverá al cliente como objetos JSON WebElement.

:::caution

Por favor use `execute` en su lugar
:::

##### Uso

```js
browser.executeAsync(script, arguments)
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

##### Devuelve

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              El resultado del script.