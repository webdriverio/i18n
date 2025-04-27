---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Speichern Sie ein mit dem Befehl [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) gestartetes Video in eine Datei.

:::info

Dieser Befehl wird nur für mobile Sitzungen unterstützt, die auf [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) laufen.

:::

##### Verwendung

```js
browser.saveRecordingScreen(filepath)
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
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>vollständiger oder relativer Pfad zum Ausführungsverzeichnis für das generierte Video</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Rückgabewert

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             Video-Puffer