---
id: zoom
title: zoom
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

Effectue un geste de zoom sur l'élément donné à l'écran.

:::info

Le zoom est basé sur les gestes mobiles natifs. Il n'est pris en charge que pour les pilotes suivants :
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) pour Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) pour iOS

Cette commande ne fonctionne qu'avec les composants à jour suivants :
 - Serveur Appium (version 2.0.0 ou supérieure)
 - `appium-uiautomator2-driver` (pour Android)
 - `appium-xcuitest-driver` (pour iOS)

Assurez-vous que votre environnement Appium local ou basé sur le cloud est régulièrement mis à jour pour éviter les problèmes de compatibilité.

:::

##### Utilisation

```js
$(selector).zoom({ duration, scale })
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`PinchAndZoomOptions`</td>
      <td>Options de zoom (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>La durée en millisecondes de la vitesse d'exécution du zoom, le minimum est de 500 ms et le maximum est de 10000 ms. La valeur par défaut est de 1500 ms (1,5 secondes) (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>L'échelle de la taille du zoom par rapport à l'écran. Les valeurs valides doivent être des nombres flottants dans la plage 0..1, où 1.0 correspond à 100% (optionnel)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```