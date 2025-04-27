---
id: saveRecordingScreen
title: திரைப்பதிவை சேமிக்கவும்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

[`startRecordingScreen`](/docs/api/appium#startrecordingscreen) கட்டளையால் தொடங்கப்பட்ட வீடியோவை கோப்பாக சேமிக்கவும்.

:::info

இந்த கட்டளை [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) இல் இயங்கும் மொபைல் அமர்வுகளுக்கு மட்டுமே ஆதரிக்கப்படுகிறது.

:::

##### பயன்பாடு

```js
browser.saveRecordingScreen(filepath)
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>உருவாக்கப்பட்ட வீடியோவிற்கான நிறைவான அல்லது செயல்படுத்தும் அடைவுக்கு தொடர்புடைய பாதை</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### திரும்பப்பெறுகிறது

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             வீடியோ பஃபர்