---
id: downloadFile
title: கோப்பைப் பதிவிறக்கு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

செலினியம் நோடை இயக்கும் தொலைதூர கணினியிலிருந்து உள்ளூர் கோப்பு முறைமைக்கு [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile) கட்டளையைப் பயன்படுத்தி கோப்பை பதிவிறக்கவும்.

:::info
இந்த கட்டளை [செலினியம் கிரிட்](https://www.selenium.dev/documentation/en/grid/) உடன் Chrome, Edge அல்லது Firefox ஐப் பயன்படுத்தி, விவரக்குறிப்புகளில் `se:downloadsEnabled` கொடியை அமைத்திருந்தால் மட்டுமே ஆதரிக்கப்படுகிறது என்பதை கவனிக்கவும்.
:::

##### பயன்பாடு

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>தொலைதூர கோப்பு பாதை</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>உள்ளூர் கணினியில் இலக்கு இருப்பிடம்</td>
    </tr>
  </tbody>
</table>