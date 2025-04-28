---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Zapisz nagranie wideo rozpoczęte przez komendę [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) do pliku.

:::info

Ta komenda jest obsługiwana tylko dla sesji mobilnych działających na [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### Użycie

```js
browser.saveRecordingScreen(filepath)
```

##### Parametry

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
      <td>pełna lub względna ścieżka do katalogu wykonania wygenerowanego wideo</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Zwraca

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             bufor wideo