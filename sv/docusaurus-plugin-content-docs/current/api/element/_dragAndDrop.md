---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

Dra ett objekt till ett destinationselement eller position.

:::info

Funktionaliteten för detta kommando beror i hög grad på hur dra och släpp är
implementerat i din app. Om du upplever problem, vänligen posta ditt exempel
i [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

:::

##### Användning

```js
$(selector).dragAndDrop(target, { duration })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>destinationselement eller objekt med x- och y-egenskaper</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDrop-kommandoalternativ</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>hur länge dragningen ska pågå</td>
    </tr>
  </tbody>
</table>

##### Exempel

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