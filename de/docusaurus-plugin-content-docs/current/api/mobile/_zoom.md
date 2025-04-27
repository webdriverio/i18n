---
id: zoom
title: zoom
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

Führt eine Zoom-Geste auf dem angegebenen Element auf dem Bildschirm aus.

:::info

Das Zoomen basiert auf nativen mobilen Gesten. Es wird nur für folgende Treiber unterstützt:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) für Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) für iOS

Dieser Befehl funktioniert nur mit den folgenden aktuellen Komponenten:
 - Appium Server (Version 2.0.0 oder höher)
 - `appium-uiautomator2-driver` (für Android)
 - `appium-xcuitest-driver` (für iOS)

Stellen Sie sicher, dass Ihre lokale oder Cloud-basierte Appium-Umgebung regelmäßig aktualisiert wird, um Kompatibilitätsprobleme zu vermeiden.

:::

##### Verwendung

```js
$(selector).zoom({ duration, scale })
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
      <td>`PinchAndZoomOptions`</td>
      <td>Zoom-Optionen (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die Dauer in Millisekunden, wie schnell der Zoom ausgeführt werden soll, minimal sind 500 ms und maximal 10000 ms. Der Standardwert beträgt 1500 ms (1,5 Sekunden) (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Der Skalierungsfaktor, wie groß der Zoom bezogen auf den Bildschirm sein soll. Gültige Werte müssen Fließkommazahlen im Bereich 0..1 sein, wobei 1.0 100% entspricht (optional)</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```
