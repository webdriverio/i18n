---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Salva un video avviato dal comando [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) in un file.

:::info

Questo comando è supportato solo per sessioni mobili in esecuzione su [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### Utilizzo

```js
browser.saveRecordingScreen(filepath)
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
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>percorso completo o relativo alla directory di esecuzione del video generato</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Restituisce

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             buffer video