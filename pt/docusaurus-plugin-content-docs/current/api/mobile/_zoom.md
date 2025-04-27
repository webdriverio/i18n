---
id: zoom
title: zoom
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

Executa um gesto de zoom no elemento fornecido na tela.

:::info

O zoom é feito com base em gestos nativos para dispositivos móveis. É suportado apenas para os seguintes drivers:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) para Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) para iOS

Este comando funciona apenas com os seguintes componentes atualizados:
 - Servidor Appium (versão 2.0.0 ou superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Certifique-se de que seu ambiente Appium local ou baseado em nuvem seja regularmente atualizado para evitar problemas de compatibilidade.

:::

##### Uso

```js
$(selector).zoom({ duration, scale })
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`PinchAndZoomOptions`</td>
      <td>Opções de zoom (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A duração em milissegundos de quão rápido o zoom deve ser executado, o mínimo é 500 ms e o máximo é 10000 ms. O padrão é 1500 ms (1,5 segundos) (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A escala de quão grande o zoom deve ser em relação à tela. Valores válidos devem ser números de ponto flutuante no intervalo 0..1, onde 1.0 é 100% (opcional)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```