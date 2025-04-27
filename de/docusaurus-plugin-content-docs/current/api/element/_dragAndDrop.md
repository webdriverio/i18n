---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

Ziehen Sie ein Element zu einem Zielelement oder einer Position.

:::info

Die Funktionalität dieses Befehls hängt stark davon ab, wie Drag-and-Drop in Ihrer Anwendung
implementiert ist. Wenn Sie Probleme feststellen, posten Sie bitte Ihr Beispiel
in [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

:::

##### Verwendung

```js
$(selector).dragAndDrop(target, { duration })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>Zielelement oder Objekt mit x- und y-Eigenschaften</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDrop-Befehlsoptionen</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>wie lange der Ziehvorgang dauern sollte</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```