---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

Drag an item to a destination element or position.

:::info

The functionality of this command highly depends on the way drag and drop is
implemented in your app. If you experience issues please post your example
in [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

:::

##### Usage

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>destination element or object with x and y properties</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDrop command options</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>how long the drag should take place</td>
    </tr>
  </tbody>
</table>

##### Example

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

