---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Spara en video som startats med [`startRecordingScreen`](/docs/api/appium#startrecordingscreen)-kommandot till fil.

:::info

Detta kommando stöds endast för mobila sessioner som körs på [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### Användning

```js
browser.saveRecordingScreen(filepath)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>fullständig eller relativ sökväg till körkatalogen för den genererade videon</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Returnerar

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             videobuffert