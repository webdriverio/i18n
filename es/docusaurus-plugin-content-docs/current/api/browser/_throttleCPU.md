---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Reduce la velocidad de la CPU para emular un procesador más lento.

:::info

Ten en cuenta que usar el comando `throttleCPU` requiere soporte para el protocolo Chrome DevTools y, por ejemplo,
no se puede usar cuando ejecutas pruebas automatizadas en la nube. El protocolo Chrome DevTools no está instalado por defecto,
usa `npm install puppeteer-core` para instalarlo.
Descubre más en la sección [Protocolos de Automatización](/docs/automationProtocols).

:::

##### Uso

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>factor de ralentización (1 es sin reducción, 2 es ralentización 2x, etc)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```