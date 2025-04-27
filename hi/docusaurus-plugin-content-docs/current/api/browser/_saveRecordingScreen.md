---
id: saveRecordingScreen
title: स्क्रीन रिकॉर्डिंग सहेजें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

[`startRecordingScreen`](/docs/api/appium#startrecordingscreen) कमांड द्वारा शुरू की गई वीडियो को फाइल में सहेजें।

:::info

यह कमांड केवल [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) पर चलने वाले मोबाइल सेशन के लिए समर्थित है।

:::

##### उपयोग

```js
browser.saveRecordingScreen(filepath)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>जनरेट की गई वीडियो के लिए पूर्ण या एक्सीक्यूशन डायरेक्टरी से संबंधित पथ</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### रिटर्न्स

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             वीडियो बफर