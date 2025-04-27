---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Espera a que un elemento esté presente en el DOM durante la cantidad de
milisegundos proporcionada. Devuelve true si el selector
coincide con al menos un elemento que existe en el DOM, de lo contrario lanza un
error. Si la bandera reverse es true, el comando devolverá true
si el selector no coincide con ningún elemento.

:::info

A diferencia de otros comandos de elementos, WebdriverIO no esperará a que
el elemento exista para ejecutar este comando.

:::

##### Uso

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td>opciones de waitForEnabled (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>tiempo en ms (valor predeterminado basado en la configuración [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>si es true, espera lo contrario (predeterminado: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>si existe, anula el mensaje de error predeterminado</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>intervalo entre comprobaciones (predeterminado: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     si el elemento existe (o no existe si la bandera está establecida)