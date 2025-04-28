---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

Przeciągnij element do docelowego elementu lub pozycji.

:::info

Funkcjonalność tej komendy w dużym stopniu zależy od sposobu implementacji przeciągania i upuszczania
w Twojej aplikacji. Jeśli napotkasz problemy, opublikuj swój przykład
w [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

:::

##### Użycie

```js
$(selector).dragAndDrop(target, { duration })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>element docelowy lub obiekt z właściwościami x i y</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`DragAndDropOptions`</td>
      <td>opcje komendy dragAndDrop</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Number`</td>
      <td>jak długo powinno trwać przeciąganie</td>
    </tr>
  </tbody>
</table>

##### Przykład

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