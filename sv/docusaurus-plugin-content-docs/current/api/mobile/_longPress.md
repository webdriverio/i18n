---
id: longPress
title: longPress
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

Utför en långt tryck-gest på det angivna elementet på skärmen.

Detta utfärdar ett WebDriver `action`-kommando för det valda elementet. Det är baserat på `click`-kommandot.

:::info

Detta kommando fungerar endast med följande uppdaterade komponenter:
 - Appium server (version 2.0.0 eller högre)
 - `appium-uiautomator2-driver` (för Android)
 - `appium-xcuitest-driver` (för iOS)

Se till att din lokala eller molnbaserade Appium-miljö uppdateras regelbundet för att undvika kompatibilitetsproblem.

:::

##### Användning

```js
$(selector).longPress({ x, y, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`LongPressOptions`</td>
      <td>Långt tryck-alternativ (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Nummer (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Nummer (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Varaktighet för tryckning i ms, standard är 1500 ms <br /><strong>ENDAST MOBIL</strong></td>
    </tr>
  </tbody>
</table>

##### Exempel

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