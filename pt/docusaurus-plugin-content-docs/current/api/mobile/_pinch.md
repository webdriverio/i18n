---
id: pinch
title: pinch
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

Executa um gesto de pinça no elemento fornecido na tela.

:::info

O gesto de pinça é feito com base nos gestos nativos móveis. É suportado apenas para os seguintes drivers:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture) para Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) para iOS

Este comando funciona apenas com os seguintes componentes atualizados:
 - Servidor Appium (versão 2.0.0 ou superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Certifique-se de que seu ambiente Appium local ou baseado em nuvem seja atualizado regularmente para evitar problemas de compatibilidade.

:::

##### Uso

```js
$(selector).pinch({ duration, scale })
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
      <td>`PinchOptions`</td>
      <td>opções de pinça (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A duração em milissegundos de quão rápido o gesto de pinça deve ser executado, o mínimo é 500 ms e o máximo é 10000 ms. O padrão é 1500 ms (1,5 segundos) (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A escala de quão grande o gesto de pinça deve ser de acordo com a tela. Valores válidos devem ser números flutuantes no intervalo 0..1, onde 1.0 é 100% (opcional)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```