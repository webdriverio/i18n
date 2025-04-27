---
id: waitForEnabled
title: waitForEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Espera a que un elemento (seleccionado por selector css) durante la cantidad de
milisegundos proporcionada esté (des/hab)ilitado. Si se consultan múltiples elementos con el
selector dado, devuelve true si al menos un elemento está (des/hab)ilitado.

:::info

A diferencia de otros comandos de elementos, WebdriverIO no esperará a que el elemento
exista para ejecutar este comando.

:::

##### Uso

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`WaitForOptions`</td>
      <td>opciones waitForEnabled (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>tiempo en ms (por defecto se establece según el valor de configuración [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>si es true espera lo opuesto (por defecto: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>si existe, anula el mensaje de error predeterminado</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>intervalo entre comprobaciones (por defecto: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     si el elemento está (des/hab)ilitado