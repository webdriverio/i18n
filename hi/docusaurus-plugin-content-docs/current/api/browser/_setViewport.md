---
id: setViewport
title: व्यूपोर्ट सेट करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

ब्राउज़र के भीतर ब्राउज़र व्यूपोर्ट का आकार बदलता है। `setWindowSize` के विपरीत, 
यह कमांड विंडो साइज़ नहीं बल्कि व्यूपोर्ट साइज़ को बदलता है।

##### उपयोग

```js
browser.setViewport({ width, height, devicePixelRatio })
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
      <td><code><var>options</var></code></td>
      <td>`SetViewportOptions`</td>
      <td>कमांड आर्गुमेंट्स</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>पिक्सेल में व्यूपोर्ट की चौड़ाई</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>पिक्सेल में व्यूपोर्ट की ऊंचाई</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>व्यूपोर्ट का पिक्सेल अनुपात</td>
    </tr>
  </tbody>
</table>

##### रिटर्न्स

- **&lt;`Promise<void>`&gt;**