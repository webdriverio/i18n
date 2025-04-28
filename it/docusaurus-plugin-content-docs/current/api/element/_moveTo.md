---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Sposta il mouse di un offset rispetto all'elemento specificato. Se non viene specificato alcun elemento, 
lo spostamento è relativo alla posizione corrente del cursore del mouse. Se viene fornito un elemento ma
nessun offset, il mouse verrà spostato al centro dell'elemento. Se l'elemento
non è visibile, verrà fatto scorrere in vista.

##### Usage

```js
$(selector).moveTo({ xOffset, yOffset })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`MoveToOptions`</td>
      <td>opzioni del comando moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Offset X verso cui spostarsi, relativamente al centro dell'elemento. Se non specificato, il mouse si sposterà al centro dell'elemento.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Offset Y verso cui spostarsi, relativamente al centro dell'elemento. Se non specificato, il mouse si sposterà al centro dell'elemento.</td>
    </tr>
  </tbody>
</table>