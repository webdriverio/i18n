---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

Drag an item to a destination element or position.

:::info

The functionality of this command highly depends on the way drag and drop is
implemented in your app. If you experience issues please post your example
in [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

Also make sure that the element you are dragging and the target where you are dropping are both visible on the screen.

This command only works with the following up-to-date components:
 - Appium server (version 2.0.0 or higher)
 - `appium-uiautomator2-driver` (for Android)
 - `appium-xcuitest-driver` (for iOS)

Make sure your local or cloud-based Appium environment is regularly updated to avoid compatibility issues.

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

