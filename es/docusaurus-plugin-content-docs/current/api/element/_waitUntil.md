---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

Este comando de espera es tu arma universal cuando quieres esperar por algo. Espera una condición
y aguarda hasta que esa condición se cumpla con un valor verdadero.

:::info

A diferencia de otros comandos de elementos, WebdriverIO no esperará a que el elemento exista para ejecutar
este comando.

:::

Un ejemplo común es esperar hasta que un determinado elemento contenga cierto texto (ver ejemplo).

##### Uso

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>condición a esperar</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`WaitUntilOptions`</td>
      <td>opciones del comando</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>tiempo en ms (valor predeterminado basado en la configuración [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>mensaje de error a lanzar cuando waitUntil agota el tiempo</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>intervalo entre verificaciones de condición (valor predeterminado basado en la configuración [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true si la condición se cumple