---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

Ziehen Sie ein Element zu einem Zielelement oder einer Position.

:::info

Die Funktionalität dieses Befehls hängt stark davon ab, wie Drag-and-Drop in Ihrer App
implementiert ist. Wenn Sie Probleme haben, posten Sie bitte Ihr Beispiel
in [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

Stellen Sie außerdem sicher, dass sowohl das Element, das Sie ziehen, als auch das Ziel, auf das Sie es ablegen, auf dem Bildschirm sichtbar sind.

Dieser Befehl funktioniert nur mit den folgenden aktuellen Komponenten:
 - Appium Server (Version 2.0.0 oder höher)
 - `appium-uiautomator2-driver` (für Android)
 - `appium-xcuitest-driver` (für iOS)

Stellen Sie sicher, dass Ihre lokale oder Cloud-basierte Appium-Umgebung regelmäßig aktualisiert wird, um Kompatibilitätsprobleme zu vermeiden.

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
      <td>wie lange der Ziehvorgang dauern soll</td>
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
