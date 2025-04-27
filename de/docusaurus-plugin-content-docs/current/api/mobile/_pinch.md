---
id: pinch
title: pinch
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

Führt eine Zusammenkneif-Geste (Pinch) auf dem angegebenen Element auf dem Bildschirm aus.

:::info

Das Zusammenkneifen basiert auf nativen mobilen Gesten. Es wird nur für die folgenden Treiber unterstützt:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture) für Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) für iOS

Dieser Befehl funktioniert nur mit den folgenden aktuellen Komponenten:
 - Appium Server (Version 2.0.0 oder höher)
 - `appium-uiautomator2-driver` (für Android)
 - `appium-xcuitest-driver` (für iOS)

Stellen Sie sicher, dass Ihre lokale oder Cloud-basierte Appium-Umgebung regelmäßig aktualisiert wird, um Kompatibilitätsprobleme zu vermeiden.

:::

##### Verwendung

```js
$(selector).pinch({ duration, scale })
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
      <td>`PinchOptions`</td>
      <td>Pinch-Optionen (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die Dauer in Millisekunden, wie schnell die Pinch-Geste ausgeführt werden soll, minimal 500 ms und maximal 10000 ms. Der Standardwert ist 1500 ms (1,5 Sekunden) (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die Skalierung, wie groß die Pinch-Geste im Verhältnis zum Bildschirm sein soll. Gültige Werte müssen Gleitkommazahlen im Bereich 0..1 sein, wobei 1,0 100% entspricht (optional)</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```
