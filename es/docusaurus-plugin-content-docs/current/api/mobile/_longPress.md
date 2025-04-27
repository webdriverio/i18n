---
id: longPress
title: longPress
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

Realiza un gesto de pulsación larga en el elemento dado en la pantalla.

Esto emite un comando WebDriver `action` para el elemento seleccionado. Está basado en el comando `click`.

:::info

Este comando solo funciona con los siguientes componentes actualizados:
 - Servidor Appium (versión 2.0.0 o superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Asegúrate de que tu entorno Appium local o en la nube se actualice regularmente para evitar problemas de compatibilidad.

:::

##### Uso

```js
$(selector).longPress({ x, y, duration })
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
      <td>`LongPressOptions`</td>
      <td>Opciones de pulsación larga (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Número (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Número (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Duración de la pulsación en ms, el valor predeterminado es 1500 ms <br /><strong>SOLO PARA MÓVIL</strong></td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```