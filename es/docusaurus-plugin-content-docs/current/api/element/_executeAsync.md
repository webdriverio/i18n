---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
El comando `executeAsync` está obsoleto y será eliminado en una versión futura.
Por favor, utilice el comando `execute` en su lugar, ya que proporciona mejor soporte para
el manejo de errores a través de `async`/`await`.
:::

Inyecta un fragmento de JavaScript en la página para ejecutarlo en el contexto del marco actualmente seleccionado
utilizando el elemento dado como ámbito. Como está en el ámbito del elemento, significa que WebdriverIO
esperará automáticamente a que el elemento exista antes de ejecutar el script.
Se asume que el script ejecutado es asíncrono y debe señalar que ha terminado invocando
el callback proporcionado, que siempre se proporciona como el argumento final de la función. El valor
de este callback será devuelto al cliente.

Los comandos de script asíncronos no pueden abarcar cargas de página. Si se dispara un evento de descarga mientras se espera
un resultado del script, se debe devolver un error al cliente.

El argumento script define el script a ejecutar en forma de cuerpo de función. La función se
invocará con el array de args proporcionado y se puede acceder a los valores a través del objeto arguments
en el orden especificado. El argumento final siempre será una función de callback que debe ser invocada
para señalar que el script ha terminado.

Los argumentos pueden ser cualquier JSON-primitivo, array o objeto JSON. Los objetos JSON que definen una referencia WebElement
se convertirán en el elemento DOM correspondiente. Del mismo modo, cualquier WebElement en el resultado
del script se devolverá al cliente como objetos JSON WebElement.

:::caution

Por favor utilice `execute` en su lugar
:::

##### Uso

```js
$(selector).executeAsync(script, arguments)
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

##### Retorna

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              El resultado del script.