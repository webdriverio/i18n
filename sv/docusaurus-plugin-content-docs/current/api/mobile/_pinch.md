---
id: pinch
title: nyp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

Utför en nypande gest på det angivna elementet på skärmen.

:::info

Nypning utförs baserat på inbyggda mobila gester. Det stöds endast för följande drivrutiner:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture) för Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) för iOS

Det här kommandot fungerar endast med följande uppdaterade komponenter:
 - Appium-server (version 2.0.0 eller högre)
 - `appium-uiautomator2-driver` (för Android)
 - `appium-xcuitest-driver` (för iOS)

Se till att din lokala eller molnbaserade Appium-miljö uppdateras regelbundet för att undvika kompatibilitetsproblem.

:::

##### Användning

```js
$(selector).pinch({ duration, scale })
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
      <td>`PinchOptions`</td>
      <td>nypningsalternativ (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Varaktigheten i millisekunder för hur snabbt nypningen ska utföras, minst 500 ms och max 10000 ms. Standard är 1500 ms (1,5 sekunder) (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Skalan för hur stor nypningen ska vara i förhållande till skärmen. Giltiga värden måste vara flyttal i intervallet 0..1, där 1.0 är 100% (valfritt)</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```