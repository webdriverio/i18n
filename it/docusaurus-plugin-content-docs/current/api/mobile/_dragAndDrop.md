---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

Trascina un elemento verso un elemento o una posizione di destinazione.

:::info

La funzionalità di questo comando dipende fortemente dal modo in cui il drag and drop è
implementato nella tua app. Se riscontri problemi, pubblica il tuo esempio
in [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

Assicurati inoltre che l'elemento che stai trascinando e l'obiettivo dove lo stai rilasciando siano entrambi visibili sullo schermo.

Questo comando funziona solo con i seguenti componenti aggiornati:
 - Server Appium (versione 2.0.0 o superiore)
 - `appium-uiautomator2-driver` (per Android)
 - `appium-xcuitest-driver` (per iOS)

Assicurati che il tuo ambiente Appium locale o basato su cloud sia regolarmente aggiornato per evitare problemi di compatibilità.

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