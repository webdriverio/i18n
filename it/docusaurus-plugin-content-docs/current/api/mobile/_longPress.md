---
id: longPress
title: longPress
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

Esegue un gesto di pressione prolungata sull'elemento dato sullo schermo.

Questo emette un comando WebDriver `action` per l'elemento selezionato. È basato sul comando `click`.

:::info

Questo comando funziona solo con i seguenti componenti aggiornati:
 - Server Appium (versione 2.0.0 o superiore)
 - `appium-uiautomator2-driver` (per Android)
 - `appium-xcuitest-driver` (per iOS)

Assicurati che il tuo ambiente Appium locale o basato su cloud sia regolarmente aggiornato per evitare problemi di compatibilità.

:::

##### Utilizzo

```js
$(selector).longPress({ x, y, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`LongPressOptions`</td>
      <td>Opzioni di pressione prolungata (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Numero (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Numero (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Durata della pressione in ms, predefinita è 1500 ms <br /><strong>SOLO-MOBILE</strong></td>
    </tr>
  </tbody>
</table>

##### Esempi

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```