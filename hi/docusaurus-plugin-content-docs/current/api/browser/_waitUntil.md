---
id: waitUntil
title: waitUntil (प्रतीक्षा करें)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

यह प्रतीक्षा कमांड आपका सार्वभौमिक हथियार है अगर आप किसी चीज़ के लिए प्रतीक्षा करना चाहते हैं। यह एक शर्त की अपेक्षा करता है और तब तक प्रतीक्षा करता है जब तक वह शर्त एक सत्य मान के साथ पूरी नहीं हो जाती।

एक आम उदाहरण है किसी निश्चित एलिमेंट के किसी निश्चित टेक्स्ट को शामिल करने तक प्रतीक्षा करना (उदाहरण देखें)।

##### उपयोग

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td>सत्य मान लौटाने तक प्रतीक्षा करने की शर्त</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`WaitUntilOptions`</td>
      <td>कमांड विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>मिलीसेकंड में समय (डिफ़ॉल्ट [`waitforTimeout`](/docs/configuration#waitfortimeout) कॉन्फिग मान पर आधारित)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>त्रुटि संदेश जो तब फेंका जाता है जब waitUntil का समय समाप्त हो जाता है</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>शर्त जांच के बीच अंतराल (डिफ़ॉल्ट [`waitforInterval`](/docs/configuration#waitforinterval) कॉन्फिग मान पर आधारित)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  यदि शर्त पूरी हो जाती है तो true    