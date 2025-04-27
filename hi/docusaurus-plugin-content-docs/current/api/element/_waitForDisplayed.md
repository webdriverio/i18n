---
id: waitForDisplayed
title: प्रदर्शित होने की प्रतीक्षा करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

प्रदान की गई मिलीसेकंड की मात्रा के लिए किसी तत्व के प्रदर्शित होने या प्रदर्शित न होने की प्रतीक्षा करें।

:::info

अन्य एलिमेंट कमांड के विपरीत, WebdriverIO इस कमांड को निष्पादित करने के लिए एलिमेंट के मौजूद होने का इंतजार नहीं करेगा।

:::

##### उपयोग

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForDisplayed विकल्प (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>मिलीसेकंड में समय (डिफ़ॉल्ट [`waitforTimeout`](/docs/configuration#waitfortimeout) कॉन्फ़िगरेशन मान पर आधारित)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>यदि सत्य है तो यह विपरीत के लिए प्रतीक्षा करता है (डिफ़ॉल्ट: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>यदि मौजूद है तो यह डिफ़ॉल्ट त्रुटि संदेश को ओवरराइड करता है</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>जांच के बीच अंतराल (डिफ़ॉल्ट: `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>व्यूपोर्ट के भीतर तत्व प्रदर्शित होने तक प्रतीक्षा करने के लिए `true` पर सेट करें (डिफ़ॉल्ट: `false`)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### रिटर्न

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true    यदि तत्व प्रदर्शित है (या नहीं है यदि फ्लैग सेट है)    