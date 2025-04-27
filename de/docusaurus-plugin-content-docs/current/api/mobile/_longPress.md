---
id: longPress
title: longPress
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

Führt eine lange Druckgeste auf dem angegebenen Element auf dem Bildschirm aus.

Dies sendet einen WebDriver `action`-Befehl für das ausgewählte Element. Es basiert auf dem `click`-Befehl.

:::info

Dieser Befehl funktioniert nur mit den folgenden aktuellen Komponenten:
 - Appium-Server (Version 2.0.0 oder höher)
 - `appium-uiautomator2-driver` (für Android)
 - `appium-xcuitest-driver` (für iOS)

Stellen Sie sicher, dass Ihre lokale oder Cloud-basierte Appium-Umgebung regelmäßig aktualisiert wird, um Kompatibilitätsprobleme zu vermeiden.

:::

##### Verwendung

```js
$(selector).longPress({ x, y, duration })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`LongPressOptions`</td>
      <td>Long-Press-Optionen (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Zahl (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Zahl (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Dauer des Drucks in ms, Standardwert ist 1500 ms <br /><strong>NUR FÜR MOBILE</strong></td>
    </tr>
  </tbody>
</table>

##### Beispiele

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
