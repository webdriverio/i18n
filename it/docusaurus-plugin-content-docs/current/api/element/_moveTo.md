---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Muove il mouse di un offset rispetto all'elemento specificato. Se non viene specificato alcun elemento,
il movimento è relativo alla posizione attuale del cursore del mouse. Se viene fornito un elemento ma
nessun offset, il mouse verrà spostato al centro dell'elemento. Se l'elemento
non è visibile, verrà fatto scorrere nella vista.

##### Utilizzo

```js
$(selector).moveTo({ xOffset, yOffset })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`MoveToOptions`</td>
      <td>opzioni del comando moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>Offset X verso cui spostarsi, relativo al centro dell'elemento. Se non specificato, il mouse si sposterà al centro dell'elemento.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>Offset Y verso cui spostarsi, relativo al centro dell'elemento. Se non specificato, il mouse si sposterà al centro dell'elemento.</td>
    </tr>
  </tbody>
</table>