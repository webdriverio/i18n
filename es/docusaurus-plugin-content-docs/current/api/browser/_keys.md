---
id: keys
title: keys
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

Envía una secuencia de pulsaciones de tecla al elemento "activo". Puedes hacer que un elemento de entrada sea activo simplemente haciendo clic en él. Para usar caracteres como "Flecha izquierda" o "Retroceso", importa el objeto `Key` del paquete WebdriverIO.

Los modificadores como `Control`, `Shift`, `Alt` y `Command` permanecerán presionados, por lo que debes activarlos nuevamente para liberarlos. Sin embargo, modificar un clic requiere que uses la API de Acciones de WebDriver a través del método [performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

Las teclas de control difieren según el sistema operativo en el que se ejecuta el navegador, por ejemplo, MacOS: `Command` y Windows: `Control`.
WebdriverIO proporciona una tecla de control modificadora compatible con todos los navegadores llamada `Ctrl` (ver ejemplo a continuación).

:::

##### Uso

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>La secuencia de teclas a escribir. Se debe proporcionar una matriz o cadena.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```