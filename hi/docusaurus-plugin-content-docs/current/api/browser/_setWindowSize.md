---
id: setWindowSize
title: विंडो का आकार सेट करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

ब्राउज़र विंडो के बाहरी आकार को प्रदान की गई चौड़ाई और ऊंचाई के अनुसार पुनः आकार देता है। आपके ऑपरेटिंग सिस्टम के आधार पर कुछ ब्राउज़र विंडो आपको `500px` से कम चौड़ाई की अनुमति नहीं दे सकते हैं। यदि आप किसी डिवाइस जैसे iPhone के व्यूपोर्ट का अनुकरण करना चाहते हैं, तो आपको `setViewport` कमांड का उपयोग करने पर विचार करना चाहिए।

##### उपयोग

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>ब्राउज़र को प्रदान की गई चौड़ाई के अनुसार पुनः आकार दिया जाएगा</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>ब्राउज़र को प्रदान की गई ऊंचाई के अनुसार पुनः आकार दिया जाएगा</td>
    </tr>
  </tbody>
</table>

##### रिटर्न्स

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:** *NO*W3C ब्राउज़र के लिए Null और W3C ब्राउज़र के लिए Object `{x, y, width, height}`