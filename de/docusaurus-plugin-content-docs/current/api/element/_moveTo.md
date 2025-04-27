---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Bewege die Maus um einen Offset des angegebenen Elements. Wenn kein Element angegeben ist,
erfolgt die Bewegung relativ zur aktuellen Mausposition. Wenn ein Element angegeben wird, aber
kein Offset, wird die Maus zur Mitte des Elements bewegt. Wenn das Element
nicht sichtbar ist, wird es in den sichtbaren Bereich gescrollt.

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
      <td>moveTo Befehlsoptionen</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>X-Offset, zu dem bewegt werden soll, relativ zur Mitte des Elements. Wenn nicht angegeben, bewegt sich die Maus zur Mitte des Elements.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Y-Offset, zu dem bewegt werden soll, relativ zur Mitte des Elements. Wenn nicht angegeben, bewegt sich die Maus zur Mitte des Elements.</td>
    </tr>
  </tbody>
</table>
