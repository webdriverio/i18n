---
id: throttleCPU
title: सीपीयू थ्रॉटल करना
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

सीपीयू को थ्रॉटल करके धीमे प्रोसेसर का अनुकरण करता है।

:::info

ध्यान दें कि `throttleCPU` कमांड का उपयोग करने के लिए Chrome DevTools प्रोटोकॉल के लिए समर्थन की आवश्यकता होती है और उदाहरण के लिए
क्लाउड में स्वचालित परीक्षण चलाते समय इसका उपयोग नहीं किया जा सकता। Chrome DevTools प्रोटोकॉल डिफ़ॉल्ट रूप से इंस्टॉल नहीं है,
इसे इंस्टॉल करने के लिए `npm install puppeteer-core` का उपयोग करें।
[ऑटोमेशन प्रोटोकॉल्स](/docs/automationProtocols) अनुभाग में अधिक जानकारी प्राप्त करें।

:::

##### उपयोग

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>धीमा करने का कारक (1 का अर्थ है कोई थ्रॉटल नहीं, 2 का अर्थ है 2x धीमा, आदि)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```