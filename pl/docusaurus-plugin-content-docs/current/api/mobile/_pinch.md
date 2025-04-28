---
id: pinch
title: pinch
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

Wykonuje gest uszczypnięcia na danym elemencie na ekranie.

:::info

Uszczypnięcie jest wykonywane w oparciu o natywne gesty mobilne. Jest obsługiwane tylko dla następujących sterowników:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture) dla Androida
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) dla iOS

Ta komenda działa tylko z następującymi aktualnymi komponentami:
 - Serwer Appium (wersja 2.0.0 lub wyższa)
 - `appium-uiautomator2-driver` (dla Androida)
 - `appium-xcuitest-driver` (dla iOS)

Upewnij się, że Twoje lokalne lub chmurowe środowisko Appium jest regularnie aktualizowane, aby uniknąć problemów z kompatybilnością.

:::

##### Użycie

```js
$(selector).pinch({ duration, scale })
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
      <td>`PinchOptions`</td>
      <td>opcje uszczypnięcia (opcjonalne)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Czas trwania w milisekundach określający jak szybko uszczypnięcie powinno zostać wykonane, minimum to 500 ms, a maksimum to 10000 ms. Domyślnie 1500 ms (1,5 sekundy) (opcjonalne)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Skala określająca jak duże powinno być uszczypnięcie w stosunku do ekranu. Poprawne wartości to liczby zmiennoprzecinkowe w zakresie 0..1, gdzie 1.0 to 100% (opcjonalne)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```