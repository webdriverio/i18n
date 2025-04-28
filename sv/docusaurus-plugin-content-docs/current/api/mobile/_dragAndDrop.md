---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

Dra ett objekt till ett målelement eller position.

:::info

Funktionaliteten för detta kommando beror i hög grad på hur dra och släpp är
implementerat i din app. Om du upplever problem, vänligen dela ditt exempel
i [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

Se också till att elementet du drar och målet där du släpper båda är synliga på skärmen.

Detta kommando fungerar endast med följande uppdaterade komponenter:
 - Appium server (version 2.0.0 eller högre)
 - `appium-uiautomator2-driver` (för Android)
 - `appium-xcuitest-driver` (för iOS)

Se till att din lokala eller molnbaserade Appium-miljö uppdateras regelbundet för att undvika kompatibilitetsproblem.

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
      <td>målelement eller objekt med x- och y-egenskaper</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDrop kommandoalternativ</td>
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