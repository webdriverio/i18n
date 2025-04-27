---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Establece los tiempos de espera asociados con la sesión actual, las duraciones de los tiempos de espera controlan comportamientos como los tiempos de espera en la inyección de scripts, la navegación del documento y la recuperación de elementos.
Para más información y ejemplos, consulta la [guía de tiempos de espera](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

No se recomienda establecer tiempos de espera `implicit` ya que afectan al comportamiento de WebdriverIO y pueden causar errores en ciertos comandos, por ejemplo, `waitForExist` con el flag inverso.

:::

##### Uso

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Objeto que contiene los valores de tiempo de espera de la sesión</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Tiempo en milisegundos para reintentar la estrategia de localización de elementos al encontrar un elemento.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Tiempo en milisegundos para esperar a que el documento termine de cargarse.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Los scripts inyectados con [`execute`](https://webdriver.io/docs/api/browser/execute) o [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) se ejecutarán hasta que alcancen la duración del tiempo de espera del script, que también se especifica en milisegundos.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```