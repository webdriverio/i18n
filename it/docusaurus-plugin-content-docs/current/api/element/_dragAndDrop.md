---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

Trascina un elemento verso un elemento o una posizione di destinazione.

:::info

La funzionalità di questo comando dipende fortemente dal modo in cui il drag and drop è
implementato nella tua app. Se riscontri problemi, condividi il tuo esempio
in [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

:::

##### Utilizzo

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>elemento di destinazione o oggetto con proprietà x e y</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`DragAndDropOptions`</td>
      <td>opzioni del comando dragAndDrop</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>quanto tempo dovrebbe durare il trascinamento</td>
    </tr>
  </tbody>
</table>

##### Esempio

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