---
id: emulate
title: इमुलेट (emulate)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO आपको `emulate` कमांड का उपयोग करके वेब APIs का इमुलेशन करने की अनुमति देता है। ये वेब APIs तब वैसे ही व्यवहार कर सकते हैं जैसे आप निर्दिष्ट करते हैं। निम्नलिखित स्कोप्स समर्थित हैं:

- `geolocation`: जियोलोकेशन API का इमुलेट करें
- `userAgent`: यूजर एजेंट का इमुलेट करें
- `colorScheme`: कलर स्कीम का इमुलेट करें
- `onLine`: ऑनलाइन स्थिति का इमुलेट करें
- `device`: एक विशिष्ट मोबाइल या डेस्कटॉप डिवाइस का इमुलेट करें
- `clock`: सिस्टम क्लॉक का इमुलेट करें

`emulate` कमांड एक फ़ंक्शन रिटर्न करता है जिसे इमुलेशन को रीसेट करने के लिए कॉल किया जा सकता है। यह तब उपयोगी होता है जब आप किसी टेस्ट या टेस्ट्स के समूह के बाद इमुलेशन को रीसेट करना चाहते हैं।

इस पर अधिक जानकारी [इमुलेशन](/docs/emulation) दिशानिर्देशों में पढ़ें।

:::info

`clock` स्कोप को छोड़कर, पेज को रीलोड किए बिना इमुलेटेड वैल्यू को बदलना संभव नहीं है।

:::

:::info

इस फीचर के लिए ब्राउज़र के लिए WebDriver Bidi सपोर्ट की आवश्यकता होती है। जबकि Chrome, Edge और Firefox के हालिया वर्शन्स में ऐसा सपोर्ट है, Safari __नहीं__ है। अपडेट के लिए [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned) का अनुसरण करें।
इसके अलावा, यदि आप ब्राउज़र स्पॉन करने के लिए क्लाउड वेंडर का उपयोग करते हैं, तो सुनिश्चित करें कि आपका वेंडर भी WebDriver Bidi का समर्थन करता है।

:::

स्कोप के आधार पर `EmulationOptions` ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज हो सकती हैं:

| स्कोप         | विकल्प                                          |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### उपयोग

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>ब्राउज़र की वह विशेषता जिसे आप इमुलेट करना चाहते हैं, या तो `clock`, `geolocation`, `userAgent`, `colorScheme` या `onLine` हो सकती है</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>विशिष्ट स्कोप के लिए इमुलेशन विकल्प</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### रिटर्न्स

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   इमुलेशन को रीसेट करने के लिए एक फ़ंक्शन