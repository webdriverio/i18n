---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Inyecta un fragmento de JavaScript en la página para ejecutarlo en el contexto del marco actualmente seleccionado
utilizando el elemento dado como alcance, ya que está en el alcance del elemento, significa que WebdriverIO
esperará automáticamente a que el elemento exista antes de ejecutar el script.
Se asume que el script ejecutado es síncrono y el resultado de la evaluación del script se devuelve al
cliente.

El argumento script define el script a ejecutar en forma de un cuerpo de función. El valor devuelto por
esa función se devolverá al cliente. La función se invocará con el array de args proporcionado
y se puede acceder a los valores a través del objeto arguments en el orden especificado.

Los argumentos pueden ser cualquier JSON-primitivo, array u objeto JSON. Los objetos JSON que definen una referencia WebElement
se convertirán al elemento DOM correspondiente. Del mismo modo, cualquier WebElement en el resultado
del script se devolverá al cliente como objetos JSON WebElement.

##### Uso

```js
$(selector).execute(script, arguments)
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
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Devuelve

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              El resultado del script.