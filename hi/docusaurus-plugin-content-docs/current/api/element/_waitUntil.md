---
id: waitUntil
title: प्रतीक्षा करें जब तक
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

यह प्रतीक्षा कमांड आपका सार्वभौमिक हथियार है यदि आप किसी चीज़ के लिए प्रतीक्षा करना चाहते हैं। यह एक शर्त की उम्मीद करता है और तब तक प्रतीक्षा करता है जब तक कि वह शर्त सत्य मान के साथ पूरी नहीं हो जाती।

:::info

अन्य तत्व कमांड के विपरीत, WebdriverIO इस कमांड को निष्पादित करने के लिए तत्व के मौजूद होने की प्रतीक्षा नहीं करेगा।

:::

एक सामान्य उदाहरण यह है कि कोई निश्चित तत्व किसी निश्चित टेक्स्ट को धारण करे, तब तक प्रतीक्षा करना (उदाहरण देखें)।

##### उपयोग

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>प्रतीक्षा करने की शर्त</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`WaitUntilOptions`</td>
      <td>कमांड विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>मिलीसेकंड में समय (डिफ़ॉल्ट [`waitforTimeout`](/docs/configuration#waitfortimeout) कॉन्फ़िग मान के आधार पर सेट किया गया)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>त्रुटि संदेश जिसे तब फेंका जाए जब waitUntil का समय समाप्त हो जाता है</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>शर्त जांच के बीच अंतराल (डिफ़ॉल्ट [`waitforInterval`](/docs/configuration#waitforinterval) कॉन्फ़िग मान के आधार पर सेट किया गया)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  यदि शर्त पूरी होती है तो true