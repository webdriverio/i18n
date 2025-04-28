---
id: zoom
title: zoom
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

Esegue un gesto di zoom sull'elemento dato sullo schermo.

:::info

Lo zoom si basa su gesti nativi per dispositivi mobili. È supportato solo per i seguenti driver:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) per Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) per iOS

Questo comando funziona solo con i seguenti componenti aggiornati:
 - Server Appium (versione 2.0.0 o superiore)
 - `appium-uiautomator2-driver` (per Android)
 - `appium-xcuitest-driver` (per iOS)

Assicurati che il tuo ambiente Appium locale o basato su cloud sia regolarmente aggiornato per evitare problemi di compatibilità.

:::

##### Utilizzo

```js
$(selector).zoom({ duration, scale })
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
      <td>`PinchAndZoomOptions`</td>
      <td>Opzioni di zoom (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>La durata in millisecondi di quanto velocemente deve essere eseguito lo zoom, il minimo è 500 ms e il massimo è 10000 ms. Il valore predefinito è 1500 ms (1,5 secondi) (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>La scala di quanto grande deve essere lo zoom rispetto allo schermo. I valori validi devono essere numeri in virgola mobile nell'intervallo 0..1, dove 1.0 è 100% (opzionale)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```