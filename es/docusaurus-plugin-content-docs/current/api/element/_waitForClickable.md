---
id: waitForClickable
title: waitForClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

Esperar a que un elemento sea clicable o no clicable durante la cantidad de milisegundos proporcionada.

:::info

A diferencia de otros comandos de elementos, WebdriverIO no esperará a que el elemento exista para ejecutar
este comando.

:::

##### Uso

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td>tiempo en ms (por defecto basado en el valor de configuración [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>si es verdadero espera lo opuesto (por defecto: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>si existe, reemplaza el mensaje de error predeterminado</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>intervalo entre comprobaciones (por defecto: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  `true` si el elemento es clicable (o no lo es si se establece la bandera)