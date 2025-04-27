---
id: throttleNetwork
title: throttleNetwork (नेटवर्क थ्रॉटल)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

ब्राउज़र की नेटवर्क क्षमताओं को थ्रॉटल करें। यह ऐसे परिदृश्यों का अनुकरण करने में मदद कर सकता है जहां उपयोगकर्ता अपने इंटरनेट कनेक्शन को खो देता है और आपके ऐप को उसे संबोधित करने की आवश्यकता होती है।

उपयोग की सहजता के लिए डिफ़ॉल्ट कॉन्फ़िगरेशन के साथ कई प्रीसेट उपलब्ध हैं।
वे `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online` हैं।

आप इन प्रीसेट के मान [सोर्स कोड में देख सकते हैं](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29)।

:::info

ध्यान दें कि `throttleNetwork` कमांड का उपयोग करने के लिए Chrome DevTools प्रोटोकॉल के लिए समर्थन की आवश्यकता होती है और उदाहरण के लिए
क्लाउड में स्वचालित परीक्षण चलाते समय इसका उपयोग नहीं किया जा सकता है। Chrome DevTools प्रोटोकॉल डिफ़ॉल्ट रूप से स्थापित नहीं है,
इसे स्थापित करने के लिए `npm install puppeteer-core` का उपयोग करें।
[ऑटोमेशन प्रोटोकॉल](/docs/automationProtocols) अनुभाग में अधिक जानकारी प्राप्त करें।

:::

##### उपयोग

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>थ्रॉटलिंग के लिए पैरामीटर</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>इंटरनेट डिस्कनेक्शन का अनुकरण करने के लिए सत्य।</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>अनुरोध भेजने से प्रतिक्रिया हेडर प्राप्त होने तक न्यूनतम विलंबता (मिलीसेकंड)।</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>अधिकतम समग्र डाउनलोड थ्रूपुट (बाइट्स/सेक)। -1 डाउनलोड थ्रॉटलिंग को अक्षम करता है।</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>अधिकतम समग्र अपलोड थ्रूपुट (बाइट्स/सेक)। -1 अपलोड थ्रॉटलिंग को अक्षम करता है।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // via static string preset
    await browser.throttleNetwork('Regular3G')

    // via custom values
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```