---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Guarda un video iniciado por el comando [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) en un archivo.

:::info

Este comando solo es compatible con sesiones móviles que se ejecutan en [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### Uso

```js
browser.saveRecordingScreen(filepath)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>ruta completa o relativa al directorio de ejecución para el video generado</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Devuelve

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             buffer de video