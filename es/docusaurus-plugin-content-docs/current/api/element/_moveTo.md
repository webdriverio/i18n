---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Mueve el ratón según un desplazamiento del elemento especificado. Si no se especifica ningún elemento, el movimiento es relativo a la posición actual del cursor del ratón. Si se proporciona un elemento pero no un desplazamiento, el ratón se moverá al centro del elemento. Si el elemento no es visible, se desplazará a la vista.

##### Uso

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td>`MoveToOptions`</td>
      <td>opciones del comando moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Desplazamiento X al que moverse, relativo al centro del elemento. Si no se especifica, el ratón se moverá al centro del elemento.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Desplazamiento Y al que moverse, relativo al centro del elemento. Si no se especifica, el ratón se moverá al centro del elemento.</td>
    </tr>
  </tbody>
</table>