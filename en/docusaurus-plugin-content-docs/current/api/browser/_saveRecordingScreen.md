---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Save a video started by [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) command to file.

:::info

This command is only supported for mobile sessions running on [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### Usage

```js
browser.saveRecordingScreen(filepath)
```

##### Parameters

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
      <td>full or relative to the execution directory path to the generated video</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Returns

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             video buffer    

