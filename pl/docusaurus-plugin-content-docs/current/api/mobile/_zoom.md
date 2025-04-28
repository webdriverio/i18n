---
id: zoom
title: zoom
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

Wykonuje gest powiększania na danym elemencie na ekranie.

:::info

Powiększanie jest wykonywane na podstawie natywnych gestów mobilnych. Jest obsługiwane tylko dla następujących sterowników:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) dla Androida
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) dla iOS

Ta komenda działa tylko z następującymi aktualnymi komponentami:
 - Serwer Appium (wersja 2.0.0 lub wyższa)
 - `appium-uiautomator2-driver` (dla Androida)
 - `appium-xcuitest-driver` (dla iOS)

Upewnij się, że Twoje lokalne lub oparte na chmurze środowisko Appium jest regularnie aktualizowane, aby uniknąć problemów z kompatybilnością.

:::

##### Użycie

```js
$(selector).zoom({ duration, scale })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`PinchAndZoomOptions`</td>
      <td>Opcje powiększania (opcjonalne)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Czas w milisekundach określający jak szybko powiększenie powinno zostać wykonane, minimalnie 500 ms i maksymalnie 10000 ms. Domyślnie 1500 ms (1,5 sekundy) (opcjonalnie)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Skala określająca jak duże powinno być powiększenie w stosunku do ekranu. Prawidłowe wartości muszą być liczbami zmiennoprzecinkowymi w zakresie 0..1, gdzie 1.0 to 100% (opcjonalnie)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```